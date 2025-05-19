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

const enableDarkMode = () => {
    body.classList.add('dark-mode');
    } 

const disableDarkMode = () => {
    body.classList.remove('dark-mode');
}

darkModeButton.addEventListener('change', () => {
    if (darkModeButton.checked) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
});

const typed = new Typed('.multiple', {
    strings:['Business Analystin', 'Requirements Engineer', 'IT Business Consultant'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

document.getElementById("openContactModal").addEventListener("click", function(e) {
  e.preventDefault();
  document.getElementById("contactModal").style.display = "flex";
});

document.querySelector(".close-button").addEventListener("click", function() {
  document.getElementById("contactModal").style.display = "none";
});

window.addEventListener("click", function(e) {
  if (e.target === document.getElementById("contactModal")) {
    document.getElementById("contactModal").style.display = "none";
  }
});

document.getElementById("contactForm").addEventListener("submit", function(e) {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  if (!name || !email || !message) {
    e.preventDefault();
    alert("Bitte alle Felder ausfüllen.");
  } else {
    alert("Nachricht erfolgreich versendet! (Demonstration)");
    e.preventDefault();
    document.getElementById("contactModal").style.display = "none";
    document.getElementById("contactForm").reset();
  }
});
