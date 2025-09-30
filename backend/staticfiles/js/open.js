(() => {
  const q = document.getElementById('q');
  const cards = [...document.querySelectorAll('.book-card')];

  if (!q || !cards.length) return;

  const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu,'');

  q.addEventListener('input', () => {
    const term = norm(q.value.trim());
    cards.forEach(card => {
      const haystack = [
        card.dataset.title,
        card.dataset.author,
        card.dataset.tags,
        card.dataset.pages
      ].join(' ');
      card.style.display = haystack.includes(term) ? '' : 'none';
    });
  });
})();
