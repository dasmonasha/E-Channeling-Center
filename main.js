const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
menuBtn.onclick = () => {
  const isOpen = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', isOpen);
};

document.getElementById('year').textContent = new Date().getFullYear();

const heroForm = document.getElementById('heroSearch');
if (heroForm) {
  heroForm.onsubmit = e => {
    e.preventDefault();
    const word = document.getElementById('hq').value;
    location.href = 'doctors.html?q=' + encodeURIComponent(word);
  };
}

const centerList = document.getElementById('centerList');
if (centerList) {
  centerList.innerHTML = centers.map(c => `
    <article class="card center">
      <img src="${c.img}" alt="${c.name} building" loading="lazy" onerror="this.onerror=null;this.src='${c.alt}'">
      <h3>${c.name}</h3>
      <p>${c.addr}</p>
      <p>📞 ${c.phone}</p>
    </article>`).join('');
}

document.querySelectorAll('.faq-q').forEach(btn => {
  btn.onclick = () => {
    const answer = btn.nextElementSibling;
    answer.hidden = !answer.hidden;
    btn.setAttribute('aria-expanded', !answer.hidden);
  };
});
/* ===== Background animation + reveal ===== */
document.querySelectorAll('.hero, .page-title').forEach(el => {
  el.insertAdjacentHTML('afterbegin',
    '<span class="blob b1"></span><span class="blob b2"></span><span class="blob b3"></span>' +
    '<svg class="ecg" viewBox="0 0 1200 70" preserveAspectRatio="none" aria-hidden="true">' +
    '<path d="M0 40 H360 L390 40 L410 8 L440 64 L465 24 L480 40 H760 L790 40 L810 8 L840 64 L865 24 L880 40 H1200"/></svg>');
});

const revealEls = document.querySelectorAll('main section:not(.hero) .container');
revealEls.forEach(el => el.classList.add('reveal'));
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}
