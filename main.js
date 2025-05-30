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

        // Füge dies hinzu:
        const pageContent = html.toLowerCase();
        const isAboutPage = pageContent.includes('<section class="about">');

        // Sterne-Animation aktivieren
        if (isAboutPage) {
          if (!document.querySelector('.falling-stars')) {
            const starsContainer = document.createElement("div");
            starsContainer.className = "falling-stars";
            document.body.appendChild(starsContainer);
          }

          if (!document.querySelector('script[src="under_construction.js"]')) {
          const script = document.createElement("script");
          script.src = "under_construction.js";
          script.onload = () => {
            if (typeof initFallingStars === "function") {
              initFallingStars();
            }
            if (typeof initMusicToggle === "function") {
              initMusicToggle();
            }
            if (typeof applySavedTheme === "function") {
              applySavedTheme();
            }
          };
          document.body.appendChild(script);
        } else {
          if (typeof initFallingStars === "function") {
            initFallingStars();
          }
          if (typeof initMusicToggle === "function") {
            initMusicToggle();
          }
          if (typeof applySavedTheme === "function") {
            applySavedTheme();
          }
        }
        }

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

document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.getElementById("projects");
  if (projectsContainer) {
    fetch("https://api.github.com/users/TamStefBFH/repos")
      .then(response => response.json())
      .then(repos => {
        projectsContainer.innerHTML = "";
        repos.forEach(repo => {
          const div = document.createElement("div");
          div.className = "project";
          div.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || "No description available."}</p>
            <a href="${repo.html_url}" target="_blank">View on GitHub</a>
          `;
          projectsContainer.appendChild(div);
        });
      })
      .catch(error => {
        projectsContainer.textContent = "Failed to load projects.";
        console.error("GitHub API error:", error);
      });
  }
});

function createStar() {
  const container = document.querySelector(".falling-stars");
  if (!container) return;

  const star = document.createElement("div");
  star.className = "star";
  const size = Math.random() * 3 + 2;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.left = `${Math.random() * 100}%`;
  star.style.animationDuration = `${Math.random() * 3 + 2}s`;
  container.appendChild(star);

  setTimeout(() => star.remove(), 5000);
}

