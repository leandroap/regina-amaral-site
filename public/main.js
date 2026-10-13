document.getElementById('year').textContent = new Date().getFullYear();

const navbar = document.getElementById('navbar');
const onScroll = () => {
  const scrolled = window.scrollY > 20;
  navbar.classList.toggle('bg-white/90', scrolled);
  navbar.classList.toggle('backdrop-blur', scrolled);
  navbar.classList.toggle('shadow-sm', scrolled);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('hidden') === false;
  menuBtn.setAttribute('aria-expanded', String(open));
});
mobileMenu.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuBtn.setAttribute('aria-expanded', 'false');
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
