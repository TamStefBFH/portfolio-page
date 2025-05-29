// Menu 

const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navList.classList.toggle('active');
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

// Beim Laden: gespeicherten Modus anwenden
const savedMode = localStorage.getItem('theme') || 'light';
applyTheme(savedMode);
darkModeButton.checked = savedMode !== 'dark';

// Beim Wechsel speichern
darkModeButton.addEventListener('change', () => {
  const mode = darkModeButton.checked ? 'light' : 'dark';
  localStorage.setItem('theme', mode);
  applyTheme(mode);
});


// Typed.js nur ausführen, wenn das Element existiert
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


