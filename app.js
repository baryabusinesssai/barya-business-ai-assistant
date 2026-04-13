(() => {
  const cards = document.querySelectorAll('.glass');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.animate(
            [
              { opacity: 0, transform: 'translateY(18px)' },
              { opacity: 1, transform: 'translateY(0)' }
            ],
            { duration: 550, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'forwards' }
          );
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  cards.forEach((card) => {
    card.style.opacity = '0';
    observer.observe(card);
  });
})();
