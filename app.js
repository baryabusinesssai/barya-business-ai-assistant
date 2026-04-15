(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const offset = 96;

  const REQUIRED_SECTIONS = [
    'home','what-is-barya','what-you-can-do','features','how-it-works','trust','business-planning','pricing','blog','contact','faq','privacy-policy','terms-of-service'
  ];

  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  REQUIRED_SECTIONS.forEach((id) => {
    const section = document.getElementById(id);
    if (!section) return;
    const computed = window.getComputedStyle(section);
    if (computed.display === 'none') section.style.display = 'block';
    if (computed.visibility === 'hidden') section.style.visibility = 'visible';
    section.hidden = false;
  });

  document.querySelectorAll('main > section').forEach((section) => {
    if (!section.classList.contains('anim-section')) section.classList.add('anim-section');
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(y, 0), behavior: reducedMotion ? 'auto' : 'smooth' });
    });
  });

  const progressBar = document.getElementById('scroll-progress');
  const updateProgress = () => {
    if (!progressBar) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? window.scrollY / max : 0;
    progressBar.style.transform = `scaleX(${clamp(ratio, 0, 1)})`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const startCounter = (node) => {
    if (!node || node.dataset.counted) return;
    node.dataset.counted = 'true';
    const target = Number(node.dataset.target || 0);
    const decimals = Number(node.dataset.decimals || 0);
    const suffix = node.dataset.suffix || '';
    if (reducedMotion) {
      node.textContent = `${target.toFixed(decimals)}${suffix}`;
      return;
    }
    const duration = 360;
    const start = performance.now();
    const tick = (now) => {
      const t = clamp((now - start) / duration, 0, 1);
      const val = target * easeOutCubic(t);
      node.textContent = `${val.toFixed(decimals)}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const staggerChildren = (root) => {
    const groups = root.querySelectorAll('[data-stagger], .grid, .flex');
    groups.forEach((group) => {
      [...group.children].forEach((child, index) => {
        if (!child.classList.contains('anim-item')) child.classList.add('anim-item');
        child.style.transitionDelay = `${Math.min(index * 55, 280)}ms`;
      });
    });
  };

  document.querySelectorAll('main > section').forEach(staggerChildren);

  if (!reducedMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const section = entry.target;
        section.classList.add('is-visible');
        section.querySelectorAll('.anim-item').forEach((item, index) => {
          item.style.transitionDelay = item.style.transitionDelay || `${Math.min(index * 45, 280)}ms`;
          item.classList.add('is-visible');
        });
        section.querySelectorAll('[data-counter]').forEach(startCounter);
        io.unobserve(section);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -10% 0px' });

    document.querySelectorAll('.anim-section').forEach((section) => io.observe(section));
  } else {
    document.querySelectorAll('.anim-section, .anim-item').forEach((el) => el.classList.add('is-visible'));
    document.querySelectorAll('[data-counter]').forEach(startCounter);
  }

  const title = document.getElementById('hero-title');
  if (title && !reducedMotion) {
    const text = title.textContent || '';
    title.textContent = '';
    const frag = document.createDocumentFragment();
    [...text].forEach((ch, i) => {
      const span = document.createElement('span');
      span.className = 'hero-letter';
      span.style.transitionDelay = `${Math.min(i * 14, 320)}ms`;
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      frag.appendChild(span);
    });
    title.appendChild(frag);
    requestAnimationFrame(() => {
      title.querySelectorAll('.hero-letter').forEach((letter) => letter.classList.add('reveal'));
    });
  }

  const magneticButtons = document.querySelectorAll('.magnetic-btn, .primary-btn');
  magneticButtons.forEach((btn) => {
    if (reducedMotion) return;
    btn.addEventListener('mousemove', (event) => {
      const rect = btn.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
      btn.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.02)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  const heroVisual = document.getElementById('hero-visual');
  const heroImage = heroVisual?.querySelector('.hero-image');
  if (heroVisual && heroImage && !reducedMotion) {
    heroVisual.addEventListener('mousemove', (event) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (event.clientY - rect.top - rect.height / 2) / rect.height;
      heroImage.style.transform = `translate3d(${x * -8}px, ${y * -8}px, 0) scale(1.02)`;
      document.body.style.backgroundPosition = `${50 + x * 2}% ${y * 2}%`;
    });
    heroVisual.addEventListener('mouseleave', () => {
      heroImage.style.transform = '';
      document.body.style.backgroundPosition = '';
    });
  }

  document.querySelectorAll('.feature-card').forEach((card) => {
    if (reducedMotion) return;
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const tiltX = (0.5 - py) * 6;
      const tiltY = (px - 0.5) * 8;
      card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate3d(0,-3px,0)`;
      card.style.boxShadow = '0 20px 40px rgba(15,23,42,.14)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });

  const magicInput = document.getElementById('magic-input');
  if (magicInput && !reducedMotion) {
    magicInput.addEventListener('focus', () => magicInput.classList.add('ring-1'));
    magicInput.addEventListener('blur', () => magicInput.classList.remove('ring-1'));
    const text = magicInput.value;
    magicInput.value = '';
    const total = Math.min(text.length, 24);
    let i = 0;
    const typeFrame = () => {
      i += 1;
      magicInput.value = text.slice(0, Math.ceil((i / total) * text.length));
      if (i < total) requestAnimationFrame(typeFrame);
    };
    requestAnimationFrame(typeFrame);
  }

  document.querySelectorAll('.workspace-btn').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      if (reducedMotion) return;
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      const size = Math.max(rect.width, rect.height) * 1.1;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 380);

      for (let i = 0; i < 6; i += 1) {
        const dot = document.createElement('span');
        dot.className = 'ripple';
        dot.style.width = '7px';
        dot.style.height = '7px';
        dot.style.left = `${50 + (Math.random() * 50 - 25)}%`;
        dot.style.top = `${50 + (Math.random() * 50 - 25)}%`;
        dot.style.animationDuration = '320ms';
        btn.appendChild(dot);
        setTimeout(() => dot.remove(), 330);
      }
    }, { passive: true });
  });
})();
