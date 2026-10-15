import { logEvent } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js';
import { analyticsReady } from './firebase-init.js';

const analyticsPromise = analyticsReady.catch(() => null);

function getLinkType(url) {
  if (url.origin !== window.location.origin) return 'outbound';
  if (url.hash) return 'section';
  return 'internal';
}

function getPlacement(link) {
  const section = link.closest('section[id]');
  if (section) return section.id;
  if (link.closest('header')) return 'header';
  if (link.closest('footer')) return 'footer';
  return 'page';
}

function track(name, parameters) {
  analyticsPromise.then((analytics) => {
    if (analytics) logEvent(analytics, name, parameters);
  });
}

document.addEventListener('click', (event) => {
  const menuButton = event.target.closest('#menu-btn');
  if (menuButton) {
    track('menu_toggle', {
      menu_state: menuButton.getAttribute('aria-expanded') === 'true' ? 'open' : 'closed',
    });
    return;
  }

  const link = event.target.closest('a[href]');
  if (!link) return;

  let destination;
  try {
    destination = new URL(link.href, window.location.href);
  } catch {
    return;
  }

  const isCta = link.classList.contains('button');
  const isNavigation = Boolean(link.closest('.site-header, .site-footer'));
  const eventName = isCta ? 'cta_click' : isNavigation ? 'navigation_click' : 'link_click';
  const label = (link.getAttribute('aria-label') || link.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80);

  track(eventName, {
    link_label: label,
    link_type: getLinkType(destination),
    link_domain: destination.hostname,
    link_placement: getPlacement(link),
  });
});
