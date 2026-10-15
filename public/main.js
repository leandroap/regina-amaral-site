document.getElementById('year').textContent = new Date().getFullYear();

const navbar = document.getElementById('navbar');
const onScroll = () => {
  const scrolled = window.scrollY > 20;
  navbar.classList.toggle('is-scrolled', scrolled);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
  const open = mobileMenu.hidden;
  mobileMenu.hidden = !open;
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
mobileMenu.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    mobileMenu.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Abrir menu');
  })
);

const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }),
  { threshold: 0.15 }
);
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
