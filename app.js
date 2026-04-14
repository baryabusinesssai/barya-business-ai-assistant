(() => {
  const REQUIRED_SECTIONS = [
    'home',
    'what-is-barya',
    'what-you-can-do',
    'features',
    'how-it-works',
    'trust',
    'business-planning',
    'pricing',
    'blog',
    'contact',
    'faq',
    'privacy-policy',
    'terms-of-service'
  ];

  REQUIRED_SECTIONS.forEach((id) => {
    const section = document.getElementById(id);
    if (!section) return;

    const computed = window.getComputedStyle(section);
    if (computed.display === 'none') section.style.display = 'block';
    if (computed.visibility === 'hidden') section.style.visibility = 'visible';
    section.hidden = false;
  });

  const offset = 96;
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(y, 0), behavior: 'smooth' });
    });
  });
})();
