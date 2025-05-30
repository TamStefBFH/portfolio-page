function initFallingStars() {
  const container = document.querySelector('.falling-stars');
  if (container) {
    for (let i = 0; i < 50; i++) {
      const star = document.createElement('span');
      star.classList.add('star');

      const size = Math.random() * 2 + 1;
      const left = Math.random() * 100;
      const duration = Math.random() * 5 + 5;
      const delay = Math.random() * 10;

      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${left}%`;
      star.style.animationDuration = `${duration}s`;
      star.style.animationDelay = `${delay}s`;

      container.appendChild(star);
    }
  }
}

// Musik-Button
function initMusicToggle() {
  const btn = document.getElementById("toggleMusic");
  const player = document.getElementById("spotifyPlayer");

  if (btn && player) {
    btn.addEventListener("click", () => {
      player.style.display = player.style.display === "none" ? "block" : "none";
    });
  }
}

// Theme anwenden
function applySavedTheme() {
  const savedMode = localStorage.getItem("theme") || "light";
  document.body.classList.remove("dark-mode", "light-mode");
  document.body.classList.add(savedMode === "dark" ? "dark-mode" : "light-mode");
}


// Optionaler Auto-Start bei statischem Laden
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initFallingStars();
    initMusicToggle();
  });
} else {
  initFallingStars();
  initMusicToggle();
}
