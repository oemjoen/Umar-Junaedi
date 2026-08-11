const body = document.body;
const themeToggle = document.querySelector('#theme-toggle');
const menuToggle = document.querySelector('#menu-toggle');
const nav = document.querySelector('.desktop-nav');
const languageButtons = document.querySelectorAll('.language-button');

const translations = new Map([
  ['Tentang', 'About'],
  ['Pengalaman', 'Experience'],
  ['Karya', 'Work'],
  ['CV Lengkap', 'Full CV'],
  ['Kontak', 'Contact'],
  ['Terhubung ↗', 'Connect ↗'],
  ['Mengubah kebutuhan bisnis menjadi', 'Turning business needs into'],
  ['sistem yang bekerja.', 'systems that work.'],
  ['Saya Umar Junaedi, Senior IT Manager yang membangun enterprise systems, memimpin tim, dan menghubungkan teknologi dengan operasi nyata.', 'I am Umar Junaedi, a Senior IT Manager who builds enterprise systems, leads teams, and connects technology with real-world operations.'],
  ['Jelajahi karya ↓', 'Explore my work ↓'],
  ['Lihat LinkedIn ↗', 'View LinkedIn ↗'],
  ['tahun di IT', 'years in IT'],
  ['tahun memimpin', 'years in leadership'],
  ['Cimahi, Jawa Barat', 'Cimahi, West Java'],
  ['01 / Tentang saya', '01 / About me'],
  ['Teknologi yang dekat dengan', 'Technology close to'],
  ['operasi.', 'operations.'],
  ['Peran saya berada di antara strategi, produk, dan eksekusi teknis. Saya membantu organisasi memetakan proses, memilih pendekatan yang tepat, lalu mengantarkannya menjadi sistem yang bisa dipakai sehari-hari.', 'My role sits between strategy, product, and technical execution. I help organizations map processes, choose the right approach, and turn them into systems people can use every day.'],
  ['Berbasis di Cimahi, Jawa Barat, saya terbiasa bekerja pada lingkungan logistik, distribusi, fleet, warehouse, sumber daya manusia, dan aplikasi pendidikan.', 'Based in Cimahi, West Java, I work across logistics, distribution, fleet, warehouse, human resources, and education technology environments.'],
  ['Pendidikan', 'Education'],
  ['S1 Teknik Informatika', 'Bachelor of Informatics Engineering'],
  ['Lokasi', 'Location'],
  ['Terbuka untuk peluang remote atau on-site', 'Open to remote or on-site opportunities'],
  ['Lihat profil Jobstreet ↗', 'View Jobstreet profile ↗'],
  ['Email saya ↗', 'Email me ↗'],
  ['Memahami hubungan proses bisnis, data, manusia, dan teknologi.', 'Understand the relationships between business processes, data, people, and technology.'],
  ['Solusi yang baik membantu pengguna menyelesaikan pekerjaan lebih sederhana.', 'Good solutions help users get work done more simply.'],
  ['Menyatukan arah tim melalui prioritas, komunikasi, dan keputusan terukur.', 'Align teams through priorities, communication, and measurable decisions.'],
  ['Membangun sistem sebagai proses berkelanjutan, bukan proyek sekali selesai.', 'Build systems as a continuous process, not a one-off project.'],
  ['02 / Pengalaman', '02 / Experience'],
  ['Lintasan yang membentuk', 'A journey that shaped'],
  ['cara saya bekerja.', 'how I work.'],
  ['Ringkasan dari pengalaman profesional yang tercantum pada profil publik dan CV.', 'A summary of professional experience listed in my public profiles and CV.'],
  ['Mar 2021 — Sekarang', 'Mar 2021 — Present'],
  ['Memimpin arah teknologi dan pengembangan sistem untuk mendukung operasi bisnis, enterprise application, infrastruktur, serta transformasi digital.', 'Lead technology direction and systems development supporting business operations, enterprise applications, infrastructure, and digital transformation.'],
  ['Mengelola kebutuhan IT dan pengembangan aplikasi dengan fokus pada kesinambungan layanan, efektivitas proses, dan dukungan pengguna bisnis.', 'Managed IT needs and application delivery with a focus on service continuity, process effectiveness, and business-user support.'],
  ['Sebelumnya', 'Earlier'],
  ['Berbagai lingkungan bisnis', 'Various business environments'],
  ['Membangun fondasi pengalaman melalui implementasi aplikasi, analisis kebutuhan, pengembangan sistem, dan pemecahan masalah operasional.', 'Built a foundation through application implementation, requirements analysis, system development, and operational problem solving.'],
  ['03 / Karya terpilih', '03 / Selected work'],
  ['Beberapa hal yang', 'Some of the things'],
  ['sedang saya bangun.', 'I am building.'],
  ['Semua', 'All'],
  ['Platform bimbingan dan konseling sekolah dengan pendekatan multi-school, modul pemetaan siswa, dan fondasi pengembangan produk berkelanjutan.', 'A school counseling platform with a multi-school approach, student-mapping modules, and a foundation for continuous product development.'],
  ['Integrasi sistem untuk sales, finance, payroll, fleet, warehouse, attendance, dan operasi distribusi.', 'Integrated systems for sales, finance, payroll, fleet, warehouse, attendance, and distribution operations.'],
  ['Gateway percakapan untuk akses informasi operasional, reminder approval, dan integrasi workflow.', 'A conversational gateway for operational information, approval reminders, and workflow integration.'],
  ['Monitoring performa server, service availability, keamanan, dan pelaporan terjadwal untuk operasi yang lebih siap.', 'Server performance, service availability, security, and scheduled reporting for more resilient operations.'],
  ['04 / Kapabilitas', '04 / Capabilities'],
  ['Stack yang saya gunakan', 'The stack I use'],
  ['untuk menggerakkan ide.', 'to move ideas forward.'],
  ['05 / Mari terhubung', "05 / Let's connect"],
  ['Siap membangun sesuatu', 'Ready to build something'],
  ['yang berarti?', 'meaningful?'],
  ['Terbuka untuk percakapan tentang kepemimpinan IT, enterprise systems, transformasi digital, dan kolaborasi produk.', 'Open to conversations about IT leadership, enterprise systems, digital transformation, and product collaboration.'],
  ['Foto profil Umar Junaedi', 'Profile photo of Umar Junaedi']
]);

function preserveWhitespace(original, replacement) {
  const leading = original.match(/^\s*/)?.[0] || '';
  const trailing = original.match(/\s*$/)?.[0] || '';
  return `${leading}${replacement}${trailing}`;
}

const translationNodes = [];
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
let currentNode;
while ((currentNode = walker.nextNode())) {
  const trimmed = currentNode.nodeValue.trim();
  if (translations.has(trimmed)) {
    translationNodes.push({
      node: currentNode,
      id: currentNode.nodeValue,
      en: preserveWhitespace(currentNode.nodeValue, translations.get(trimmed))
    });
  }
}

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

  const profileImage = document.querySelector('.avatar img');
  if (profileImage) profileImage.alt = isEnglish ? 'Profile photo of Umar Junaedi' : 'Foto profil Umar Junaedi';

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.content = isEnglish
      ? 'Umar Junaedi portfolio — Senior IT Manager, enterprise systems architect, and digital transformation leader.'
      : 'Portofolio Umar Junaedi — Senior IT Manager, enterprise systems architect, dan pemimpin transformasi digital.';
  }
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

  translationNodes.forEach(item => {
    item.node.nodeValue = selected === 'en' ? item.en : item.id;
  });

  updateControlLabels(selected);
  if (persist) localStorage.setItem('umar-language', selected);
}

const savedTheme = localStorage.getItem('umar-theme');
if (savedTheme === 'light') body.classList.add('light');

themeToggle?.addEventListener('click', () => {
  body.classList.toggle('light');
  localStorage.setItem('umar-theme', body.classList.contains('light') ? 'light' : 'dark');
  updateControlLabels(body.dataset.language || 'id');
});

menuToggle?.addEventListener('click', () => {
  const open = nav?.classList.toggle('is-open') || false;
  menuToggle.setAttribute('aria-expanded', String(open));
  updateControlLabels(body.dataset.language || 'id');
});

nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  updateControlLabels(body.dataset.language || 'id');
}));

document.querySelectorAll('.filter-button').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter-button').forEach(item => item.classList.remove('is-active'));
  button.classList.add('is-active');
  const filter = button.dataset.filter;
  document.querySelectorAll('.project-card').forEach(card => {
    card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter);
  });
}));

const queryLanguage = new URLSearchParams(window.location.search).get('lang');
const savedLanguage = localStorage.getItem('umar-language');
const initialLanguage = queryLanguage === 'id' || queryLanguage === 'en'
  ? queryLanguage
  : (savedLanguage === 'id' || savedLanguage === 'en' ? savedLanguage : detectedLanguage());
setLanguage(initialLanguage, queryLanguage === 'id' || queryLanguage === 'en');
languageButtons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language, true)));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
