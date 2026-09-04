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
});
