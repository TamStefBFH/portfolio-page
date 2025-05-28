const container = document.querySelector('.falling-stars');

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

const btn = document.getElementById("toggleMusic");
const player = document.getElementById("spotifyPlayer");

btn.addEventListener("click", () => {
  player.style.display = player.style.display === "none" ? "block" : "none";
});
