// SPA Navigation
document.querySelectorAll('nav a[href^="pages/"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const fullHref = this.getAttribute('href');
    const [page, hash] = fullHref.split('#');

    fetch(page)
      .then(response => response.text())
      .then(html => {
        document.getElementById('content').innerHTML = html;

        initTabs();

        // Menü schließen nach Navigation
        hamburger.classList.remove('active');
        navList.classList.remove('active');

        if (hash) {
          setTimeout(() => {
            const target = document.getElementById(hash);
            if (target) target.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      });
  });
});


// Menu
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navList.classList.toggle('active');
});

// Schließe das mobile Menü beim Klick auf einen Navigationslink
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', () => {
    if (navList.classList.contains('active')) {
      navList.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });
});

// Dark - Light Mode
const darkModeButton = document.getElementById('darkModeButton');
const body = document.body;

function applyTheme(mode) {
  if (mode === 'dark') {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }
}

const savedMode = localStorage.getItem('theme') || 'light';
applyTheme(savedMode);
darkModeButton.checked = savedMode !== 'dark';

darkModeButton.addEventListener('change', () => {
  const mode = darkModeButton.checked ? 'light' : 'dark';
  localStorage.setItem('theme', mode);
  applyTheme(mode);
});

// Typed.js
const typedElement = document.querySelector('.multiple');
if (typedElement) {
  const typed = new Typed('.multiple', {
    strings: ['Business Analystin', 'Requirements Engineer', 'IT Business Consultant'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
  });
}
