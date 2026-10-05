// Estate & Co. interactions: mobile navigation, property search and inquiry actions.
const menu = document.querySelector('.menu');
const nav = document.querySelector('#nav-links');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  menu.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  nav.classList.toggle('open', !open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation');
}));

const cards = [...document.querySelectorAll('.card')];
function filterHomes() {
  const location = document.querySelector('#location').value;
  const maxPrice = Number(document.querySelector('#price').value) || Infinity;
  const intent = document.querySelector('#intent').value;
  let count = 0;
  cards.forEach(card => {
    const match = (!location || card.dataset.location === location) && Number(card.dataset.price) <= maxPrice && card.dataset.type === intent;
    card.classList.toggle('filter-hidden', !match); if (match) count++;
  });
  document.querySelector('#filter-status').textContent = count ? `${count} ${count === 1 ? 'home' : 'homes'} match your search.` : 'No homes match those filters. Try a different location or price range.';
  document.querySelector('#properties').scrollIntoView({behavior:'smooth'});
}
document.querySelector('#search-form').addEventListener('submit', event => { event.preventDefault(); filterHomes(); });
document.querySelectorAll('.place').forEach(place => place.addEventListener('click', event => {
  event.preventDefault(); document.querySelector('#location').value = place.dataset.place; filterHomes();
}));
document.querySelectorAll('.save').forEach(button => button.addEventListener('click', () => {
  const saved = button.getAttribute('aria-pressed') === 'true';
  button.setAttribute('aria-pressed', String(!saved)); button.textContent = saved ? '♡' : '♥';
  const address = button.getAttribute('aria-label').replace(/^(Save|Remove saved) /, '');
  button.setAttribute('aria-label', `${saved ? 'Save' : 'Remove saved'} ${address}`);
}));
document.querySelectorAll('.details').forEach(button => button.addEventListener('click', () => {
  const address = button.closest('.card').querySelector('h3').textContent;
  const message = document.querySelector('[name="message"]'); message.value = `I'm interested in ${address}.`;
  document.querySelector('#contact').scrollIntoView({behavior:'smooth'}); message.focus({preventScroll:true});
}));
document.querySelector('#contact-form').addEventListener('submit', event => {
  event.preventDefault(); const form = event.currentTarget; const name = form.elements.name.value.trim();
  document.querySelector('#form-feedback').textContent = `Thanks, ${name}. Your inquiry is ready — our team will be in touch soon.`;
  form.reset();
});
