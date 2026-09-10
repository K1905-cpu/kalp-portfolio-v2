/**
 * Kalp Shah Portfolio V2 - Main JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Elements
  const navbar = document.getElementById('navbar');
  const desktopLinks = document.querySelectorAll('.nav-links .nav-item');
  const mobileLinks = document.querySelectorAll('.mobile-nav-bar a');
  const themeToggle = document.getElementById('theme-toggle');
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  // 2. Sticky Navbar blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  // 3. Scroll Spy (Active Nav Indicator)
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNavLink() {
    const scrollY = window.scrollY + 140;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });

        mobileLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // 4. Dark / Light Theme Toggle (Matches SreeStats toggle pill)
  const savedTheme = localStorage.getItem('kalp-portfolio-theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.body.classList.contains('light-theme');
      const newTheme = isLight ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('kalp-portfolio-theme', newTheme);
    });
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.body.classList.remove('light-theme');
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    if (themeToggle) {
      const icon = themeToggle.querySelector('i');
      if (icon) {
        icon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      }
    }
  }

  // 5. Smooth Scrolling for all Internal Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 6. Contact Form Handling
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      if (submitBtn) {
        submitBtn.innerHTML = '<span><i class="fa-solid fa-spinner fa-spin"></i> Preparing...</span>';
      }

      // Open email client with prefilled details
      const mailtoUrl = `mailto:shahkalp0303@gmail.com?subject=${encodeURIComponent(`[Portfolio Inquiry] ${subject}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      
      setTimeout(() => {
        window.location.href = mailtoUrl;

        if (formStatus) {
          formStatus.style.display = 'block';
          formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Email client opened! You can also email Kalp directly at <strong>shahkalp0303@gmail.com</strong>';
        }

        if (submitBtn) {
          submitBtn.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane" style="font-size: 11px;"></i>';
        }
        contactForm.reset();
      }, 500);
    });
  }

  // 7. Certificate Lightbox Modal Controller
  const certModal = document.getElementById('cert-modal');
  const modalCertTitle = document.getElementById('modal-cert-title');
  const modalCertOrg = document.getElementById('modal-cert-org');
  const modalCertImg = document.getElementById('modal-cert-img');
  const modalCertDocLink = document.getElementById('modal-cert-download-link');
  const certModalCloseBtn = document.getElementById('cert-modal-close-btn');
  const certModalDismissBtn = document.getElementById('cert-modal-dismiss-btn');

  function openCertModal(title, org, imgSrc, docSrc) {
    if (!certModal) return;
    if (modalCertTitle) modalCertTitle.textContent = title || 'Certificate';
    if (modalCertOrg) modalCertOrg.textContent = org || 'Verified Credential';
    if (modalCertImg) {
      modalCertImg.src = imgSrc || '';
      modalCertImg.alt = title || 'Certificate Preview';
    }
    if (modalCertDocLink) {
      modalCertDocLink.href = docSrc || imgSrc || '#';
    }
    certModal.classList.add('open');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCertModal() {
    if (!certModal) return;
    certModal.classList.remove('open');
    certModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Bind click to all certificate triggers (thumbnail and View Certificate button)
  document.querySelectorAll('.cert-trigger-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.getAttribute('data-cert-title');
      const org = btn.getAttribute('data-cert-org');
      const img = btn.getAttribute('data-cert-img');
      const doc = btn.getAttribute('data-cert-doc');
      openCertModal(title, org, img, doc);
    });
  });

  if (certModalCloseBtn) {
    certModalCloseBtn.addEventListener('click', closeCertModal);
  }
  if (certModalDismissBtn) {
    certModalDismissBtn.addEventListener('click', closeCertModal);
  }
  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        closeCertModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('open')) {
      closeCertModal();
    }
  });

  // 8. Skills Section Category Filter Tabs (Creative Developer Portfolio)
  const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-creative-card');

  if (skillFilterBtns.length && skillCards.length) {
    skillFilterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        skillFilterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        skillCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              card.style.transition = 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 30);
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // 9. Smooth Photo Transition Animation (Hero Home -> About Section)
  const heroAvatarBox = document.getElementById('hero-avatar-box');
  const heroAvatarImg = document.getElementById('hero-avatar-img');
  const aboutImgBox = document.getElementById('about-img-box');
  const aboutAvatarImg = document.getElementById('about-avatar-img');
  const homeSection = document.getElementById('home');
  const aboutSection = document.getElementById('about');

  let ticking = false;

  function updateAvatarTransition() {
    if (!heroAvatarImg || !aboutAvatarImg || !heroAvatarBox || !aboutImgBox || !aboutSection) {
      return;
    }

    const scrollY = window.scrollY;
    const homeRect = homeSection.getBoundingClientRect();
    const aboutRect = aboutSection.getBoundingClientRect();
    
    // Starting scroll point (when user starts scrolling down from top)
    const startScroll = 0;
    // Target scroll point (when about section center reaches viewport center)
    const aboutTopDoc = aboutSection.offsetTop;
    const endScroll = Math.max(aboutTopDoc - 80, 200);

    // Calculate progress 0 (Home) -> 1 (About)
    let progress = (scrollY - startScroll) / (endScroll - startScroll);
    progress = Math.max(0, Math.min(1, progress));

    // Smooth Ease In Out
    const easeProgress = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    if (progress <= 0.001) {
      // Exactly at Home Hero
      heroAvatarImg.style.transform = 'none';
      heroAvatarImg.style.opacity = '1';
      heroAvatarImg.style.filter = 'drop-shadow(0 20px 50px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 35px rgba(255, 42, 42, 0.25))';
      heroAvatarBox.style.zIndex = '10';
      aboutAvatarImg.style.opacity = '0';
    } else if (progress >= 0.999) {
      // Exactly at or past About Section
      heroAvatarImg.style.opacity = '0';
      heroAvatarImg.style.transform = 'none';
      aboutAvatarImg.style.opacity = '1';
      aboutAvatarImg.style.transform = 'none';
    } else {
      // In flight between Home and About!
      aboutAvatarImg.style.opacity = '0';
      heroAvatarImg.style.opacity = '1';
      heroAvatarBox.style.zIndex = '35';

      // Measure current bounding rects
      const heroBoxRect = heroAvatarBox.getBoundingClientRect();
      const aboutBoxRect = aboutImgBox.getBoundingClientRect();

      // Horizontal and vertical deltas in viewport
      const currentHeroCenterX = heroBoxRect.left + heroBoxRect.width / 2;
      const currentHeroBottomY = heroBoxRect.top + heroBoxRect.height;

      const targetAboutCenterX = aboutBoxRect.left + aboutBoxRect.width / 2;
      const targetAboutBottomY = aboutBoxRect.top + aboutBoxRect.height;

      const deltaX = (targetAboutCenterX - currentHeroCenterX) * easeProgress;
      const deltaY = (targetAboutBottomY - currentHeroBottomY) * easeProgress;

      // Calculate scale difference
      const initialHeight = heroBoxRect.height || 500;
      const targetHeight = aboutBoxRect.height || 460;
      const scaleRatio = targetHeight / initialHeight;
      const currentScale = 1 + (scaleRatio - 1) * easeProgress;

      // Slight dynamic tilt during transition for creative flair
      const tiltAngle = (targetAboutCenterX < currentHeroCenterX ? -4 : 4) * Math.sin(easeProgress * Math.PI);

      // Red glow boost during transition
      const glowSpread = 25 + 25 * Math.sin(easeProgress * Math.PI);
      const glowOpacity = 0.25 + 0.35 * Math.sin(easeProgress * Math.PI);

      heroAvatarImg.style.transform = `translate3d(${deltaX.toFixed(2)}px, ${deltaY.toFixed(2)}px, 0) scale(${currentScale.toFixed(4)}) rotate(${tiltAngle.toFixed(2)}deg)`;
      heroAvatarImg.style.filter = `drop-shadow(0 20px 45px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 ${glowSpread.toFixed(1)}px rgba(255, 42, 42, ${glowOpacity.toFixed(2)}))`;
    }

    ticking = false;
  }

  function requestAvatarUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateAvatarTransition);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestAvatarUpdate, { passive: true });
  window.addEventListener('resize', requestAvatarUpdate);
  
  // Initial run
  updateAvatarTransition();
});
