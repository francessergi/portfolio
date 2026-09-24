const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const year = document.getElementById('year');
const lightbox = document.getElementById('case-lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxClose = document.querySelector('.lightbox-close');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.site-nav a');

if (sections.length && navLinks.length) {
  const linkByHash = new Map(Array.from(navLinks).map((link) => [link.getAttribute('href'), link]));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const activeLink = linkByHash.get(`#${entry.target.id}`);
        navLinks.forEach((link) => link.removeAttribute('aria-current'));
        if (activeLink) {
          activeLink.setAttribute('aria-current', 'page');
        }
      });
    },
    { rootMargin: '-35% 0px -55% 0px', threshold: 0.1 },
  );

  sections.forEach((section) => observer.observe(section));
}

const openLightbox = (src, title) => {
  if (!lightbox || !lightboxImage || !lightboxTitle) {
    return;
  }

  lightboxImage.src = src;
  lightboxImage.alt = title;
  lightboxTitle.textContent = title;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  if (!lightbox) {
    return;
  }

  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

document.querySelectorAll('.case-card-visual').forEach((button) => {
  button.addEventListener('click', () => {
    const src = button.dataset.lightbox;
    const title = button.dataset.title || button.querySelector('img')?.alt || 'Case study';

    if (src) {
      openLightbox(src, title);
    }
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.dataset.closeLightbox === 'true') {
      closeLightbox();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) {
    closeLightbox();
  }
});
