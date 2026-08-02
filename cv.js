const body = document.body;
const themeToggle = document.querySelector('#theme-toggle');
const menuToggle = document.querySelector('#menu-toggle');
const nav = document.querySelector('.desktop-nav');
const languageButtons = document.querySelectorAll('.language-button');
const languageContents = document.querySelectorAll('[data-lang-content]');

const savedTheme = localStorage.getItem('umar-theme');
if (savedTheme === 'light') body.classList.add('light');
themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  localStorage.setItem('umar-theme', body.classList.contains('light') ? 'light' : 'dark');
  themeToggle.setAttribute('aria-label', body.classList.contains('light') ? 'Aktifkan mode gelap' : 'Aktifkan mode terang');
});

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

function detectedLanguage() {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (typeof timezone !== 'string' || timezone.length < 3 || timezone === 'UTC' || timezone.startsWith('Etc/')) return 'id';
    new Intl.DateTimeFormat('en', { timeZone: timezone }).format();
    return ['Asia/Jakarta', 'Asia/Makassar', 'Asia/Jayapura'].includes(timezone) ? 'id' : 'en';
  } catch (error) {
    return 'id';
  }
}

function setLanguage(language, persist = false) {
  const selected = language === 'en' ? 'en' : 'id';
  document.documentElement.lang = selected;
  body.dataset.language = selected;
  languageButtons.forEach(button => button.classList.toggle('is-active', button.dataset.language === selected));
  document.querySelectorAll('[data-id][data-en]').forEach(element => {
    element.textContent = element.dataset[selected];
  });
  languageContents.forEach(content => { content.hidden = content.dataset.langContent !== selected; });
  if (persist) localStorage.setItem('umar-language', selected);
}

const savedLanguage = localStorage.getItem('umar-language');
setLanguage(savedLanguage === 'id' || savedLanguage === 'en' ? savedLanguage : detectedLanguage());
languageButtons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language, true)));
document.querySelector('#year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.cv-block, .cv-side-card, .cv-cta').forEach(element => {
  element.classList.add('reveal');
  observer.observe(element);
});
