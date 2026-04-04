/* ============================================================
   ROMANTIK HOTEL – JavaScript
   Navigation, Scroll Reveal, Lightbox, Smooth interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Navigation: scroll effect --- */
  const nav = document.querySelector('.nav-wrap');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Mobile menu toggle --- */
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      links.classList.toggle('open');
      document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        links.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Scroll reveal --- */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));
  }

  /* --- Lightbox --- */
  const lightbox     = document.getElementById('lightbox');
  const lbImg        = document.getElementById('lb-img');
  const lbClose      = document.querySelector('.lightbox-close');
  const lbPrev       = document.querySelector('.lightbox-prev');
  const lbNext       = document.querySelector('.lightbox-next');
  const galleryItems = document.querySelectorAll('.gallery-item');
  let currentIndex   = 0;

  function openLightbox(index) {
    currentIndex = index;
    const src = galleryItems[currentIndex].querySelector('img').src;
    lbImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigateLightbox(direction) {
    currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
    const src = galleryItems[currentIndex].querySelector('img').src;
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src = src;
      lbImg.style.opacity = '1';
    }, 200);
  }

  if (lightbox) {
    galleryItems.forEach((item, i) => {
      item.addEventListener('click', () => openLightbox(i));
    });
    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', () => navigateLightbox(-1));
    lbNext.addEventListener('click', () => navigateLightbox(1));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    lbImg.style.transition = 'opacity .25s ease';
  }

  /* --- Active nav link highlight --- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* --- Smooth form focus labels --- */
  document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('focus', () => input.parentElement.classList.add('focused'));
    input.addEventListener('blur', () => {
      if (!input.value) input.parentElement.classList.remove('focused');
    });
  });

});
