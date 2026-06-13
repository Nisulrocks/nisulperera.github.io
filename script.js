document.addEventListener("DOMContentLoaded", function () {


  const progressBar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progressBar.style.width = (window.scrollY / winHeight * 100) + '%';
  });


  const sections = document.querySelectorAll('section');
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('fade-in');
    });
  }, { threshold: 0.1 });
  sections.forEach(s => fadeObserver.observe(s));


  const navLinks = document.querySelectorAll('#mainNav a');
  function updateNav() {
    const scrollPos = window.scrollY + 140;
    let current = sections[0]?.id || '';
    sections.forEach(s => {
      if (scrollPos >= s.offsetTop) current = s.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', updateNav);
  updateNav();


  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });


  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });


  const nameEl = document.getElementById('typedName');
  if (nameEl) {
    const text = nameEl.textContent;
    nameEl.textContent = '';
    let i = 0;
    setTimeout(() => {
      const type = () => {
        if (i < text.length) {
          nameEl.textContent += text[i++];
          setTimeout(type, 60);
        }
      };
      type();
    }, 300);
  }


  const bars = document.querySelectorAll('.progress');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const width = target.style.width;
        target.style.width = '0';
        setTimeout(() => { target.style.width = width; }, 100);
        barObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });
  bars.forEach(b => barObserver.observe(b));


  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  document.querySelectorAll('.screenshot-row img, .screenshot-placeholder img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });


  const videoModal = document.getElementById('videoModal');
  const videoModalFrame = document.getElementById('videoModalFrame');
  const videoModalClose = document.querySelector('.video-modal-close');

  document.querySelectorAll('.video-wrap').forEach(wrap => {
    const iframe = wrap.querySelector('iframe');
    if (!iframe) return;

    const overlay = document.createElement('div');
    overlay.className = 'video-overlay';
    overlay.innerHTML = '<div class="video-overlay-icon"><i class="fas fa-expand"></i></div>';
    wrap.appendChild(overlay);

    overlay.addEventListener('click', () => {
      videoModalFrame.src = iframe.src;
      videoModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeVideoModal() {
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
    videoModalFrame.src = '';
  }

  videoModalClose.addEventListener('click', closeVideoModal);
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeVideoModal();
  });

});
