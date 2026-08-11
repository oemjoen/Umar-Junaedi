const body = document.body;
const themeToggle = document.querySelector('#theme-toggle');
const menuToggle = document.querySelector('#menu-toggle');
const nav = document.querySelector('.desktop-nav');
const languageButtons = document.querySelectorAll('.language-button');
const languageContents = document.querySelectorAll('[data-lang-content]');

const oemjoeCvProjects = [
  {
    number: '19',
    kickerClass: '',
    title: 'ERP TMS — Laravel Modernization',
    descriptionId: 'Modernisasi ERP/TMS operasional transportasi ke PHP 8.2 dan Laravel 12. Cakupan meliputi P2H, mechanical inspection, maintenance, procurement, purchase order, finance, invoice, approval flow, export PDF/Excel, QR code, audit trail, Docker, dan staging deployment.',
    descriptionEn: 'Modernization of a transportation ERP/TMS to PHP 8.2 and Laravel 12, covering P2H, mechanical inspection, maintenance, procurement, purchase orders, finance, invoicing, approval flows, PDF/Excel exports, QR codes, audit trails, Docker, and staging deployment.',
    roleId: 'Project / System Modernization',
    roleEn: 'Project / System Modernization',
    tags: ['Laravel 12', 'PHP 8.2', 'MariaDB', 'Docker', 'Nginx', 'Tailwind CSS 4'],
    url: 'https://github.com/oemjoe/tms-erp-php82'
  },
  {
    number: '20',
    kickerClass: 'project-cyan',
    title: 'Tirta AI Data & System Analysis Dashboard',
    descriptionId: 'Platform Laravel untuk analisis data dan sistem terpusat, executive summary, Ask Data, database catalog, source-code analysis, health endpoint, role/permission, serta abstraction AI provider untuk Groq, Gemini, dan Ollama. Menyediakan baseline Docker untuk app, Nginx, database, dan Redis.',
    descriptionEn: 'A Laravel platform for centralized data and system analysis, executive summaries, Ask Data, database cataloging, source-code analysis, health endpoints, roles/permissions, and AI-provider abstraction for Groq, Gemini, and Ollama, with a Docker baseline for app, Nginx, database, and Redis.',
    roleId: 'Architecture / Development',
    roleEn: 'Architecture / Development',
    tags: ['Laravel 13', 'AI', 'Groq', 'Gemini', 'Ollama', 'Redis', 'Docker'],
    url: 'https://github.com/oemjoe/ai-dashboard'
  }
];

const savedTheme = localStorage.getItem('umar-theme');
if (savedTheme === 'light') body.classList.add('light');

themeToggle?.addEventListener('click', () => {
  body.classList.toggle('light');
  localStorage.setItem('umar-theme', body.classList.contains('light') ? 'light' : 'dark');
  updateControlLabels(body.dataset.language || 'id');
});

menuToggle?.addEventListener('click', () => {
  const open = nav?.classList.toggle('is-open') || false;
  menuToggle?.setAttribute('aria-expanded', String(open));
  updateControlLabels(body.dataset.language || 'id');
});

nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  updateControlLabels(body.dataset.language || 'id');
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

function ensureOemjoeCvProfileLink(language) {
  const contactCard = document.querySelector('.cv-contact-card');
  if (!contactCard) return;
  let link = contactCard.querySelector('[data-oemjoe-profile]');
  if (!link) {
    link = document.createElement('a');
    link.href = 'https://github.com/oemjoe';
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.dataset.oemjoeProfile = 'true';
    contactCard.appendChild(link);
  }
  link.textContent = language === 'en' ? 'GitHub Projects · oemjoe ↗' : 'Project GitHub · oemjoe ↗';
}

function renderOemjoeCvProjects(language) {
  const cta = document.querySelector('.cv-cta');
  if (!cta) return;

  let section = document.querySelector('[data-oemjoe-cv-projects]');
  if (!section) {
    section = document.createElement('section');
    section.className = 'section-shell cv-project-archive';
    section.dataset.oemjoeCvProjects = 'true';
    cta.parentNode.insertBefore(section, cta);
  }

  const heading = language === 'en' ? 'Current GitHub projects' : 'Project GitHub terkini';
  const subheading = language === 'en'
    ? 'Public repositories that demonstrate current modernization, AI, data, and enterprise-system work.'
    : 'Repository publik yang menunjukkan pekerjaan terkini pada modernisasi, AI, data, dan enterprise system.';

  section.innerHTML = `
    <div class="section-heading split-heading">
      <div><p class="eyebrow">06 / GitHub · oemjoe</p><h2>${heading}</h2></div>
      <p class="heading-note">${subheading}</p>
    </div>
    <div class="cv-project-archive-grid">
      ${oemjoeCvProjects.map(project => {
        const description = language === 'en' ? project.descriptionEn : project.descriptionId;
        const role = language === 'en' ? project.roleEn : project.roleId;
        const labelDescription = language === 'en' ? 'Description' : 'Deskripsi';
        const labelRole = language === 'en' ? 'Role' : 'Peran';
        const labelRepo = language === 'en' ? 'View repository' : 'Lihat repository';
        return `<article class="cv-project-record">
          <div class="cv-record-head"><div><span class="cv-project-kicker ${project.kickerClass}">${project.number}</span><h3>${project.title}</h3></div><span class="cv-record-date">GitHub · oemjoe</span></div>
          <p><strong>${labelDescription}</strong>: ${description}</p>
          <p><strong>${labelRole}</strong>: ${role}</p>
          <div class="tag-row">${project.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
          <a class="text-link" href="${project.url}" target="_blank" rel="noreferrer">${labelRepo} ↗</a>
        </article>`;
      }).join('')}
    </div>`;

  ensureOemjoeCvProfileLink(language);
}

function updateControlLabels(language) {
  const isEnglish = language === 'en';
  const lightMode = body.classList.contains('light');
  const menuOpen = nav?.classList.contains('is-open');
  document.querySelector('.language-switcher')?.setAttribute('aria-label', isEnglish ? 'Choose language' : 'Pilih bahasa');
  nav?.setAttribute('aria-label', isEnglish ? 'Main navigation' : 'Navigasi utama');
  themeToggle?.setAttribute('aria-label', isEnglish
    ? (lightMode ? 'Enable dark mode' : 'Enable light mode')
    : (lightMode ? 'Aktifkan mode gelap' : 'Aktifkan mode terang'));
  menuToggle?.setAttribute('aria-label', isEnglish
    ? (menuOpen ? 'Close menu' : 'Open menu')
    : (menuOpen ? 'Tutup menu' : 'Buka menu'));
}

function setLanguage(language, persist = false) {
  const selected = language === 'en' ? 'en' : 'id';
  document.documentElement.lang = selected;
  body.dataset.language = selected;
  languageButtons.forEach(button => {
    const active = button.dataset.language === selected;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('[data-id][data-en]').forEach(element => {
    element.textContent = element.dataset[selected];
  });
  languageContents.forEach(content => { content.hidden = content.dataset.langContent !== selected; });
  renderOemjoeCvProjects(selected);
  updateControlLabels(selected);
  if (persist) localStorage.setItem('umar-language', selected);
}

const queryLanguage = new URLSearchParams(window.location.search).get('lang');
const savedLanguage = localStorage.getItem('umar-language');
const initialLanguage = queryLanguage === 'id' || queryLanguage === 'en'
  ? queryLanguage
  : (savedLanguage === 'id' || savedLanguage === 'en' ? savedLanguage : detectedLanguage());
setLanguage(initialLanguage, queryLanguage === 'id' || queryLanguage === 'en');
languageButtons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language, true)));

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll('.cv-block, .cv-side-card, .cv-cta, [data-oemjoe-cv-projects]').forEach(element => {
    element.classList.add('reveal');
    observer.observe(element);
  });
} else {
  document.querySelectorAll('.cv-block, .cv-side-card, .cv-cta, [data-oemjoe-cv-projects]').forEach(element => element.classList.add('visible'));
}
