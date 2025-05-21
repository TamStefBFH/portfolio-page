const canvas = document.getElementById('sakuraCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const maxPetals = 50;
  const petals = [];

  class Petal {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.r = Math.random() * 5 + 2;
      this.d = Math.random() * maxPetals;
      this.color = "rgba(255, 182, 193, 0.8)";
      this.tilt = Math.floor(Math.random() * 5) - 5;
      this.tiltAngleIncremental = (Math.random() * 0.07) + 0.05;
      this.tiltAngle = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      this.tiltAngle += this.tiltAngleIncremental;
      this.y += (Math.cos(this.d) + 3 + this.r / 2) / 2;
      this.x += Math.sin(this.tiltAngle) * 2;
      if (this.y > canvas.height) {
        this.x = Math.random() * canvas.width;
        this.y = -10;
      }
      this.draw();
    }
  }

  function initPetals() {
    for (let i = 0; i < maxPetals; i++) {
      petals.push(new Petal());
    }
  }

  function animatePetals() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let petal of petals) {
      petal.update();
    }
    requestAnimationFrame(animatePetals);
  }

  initPetals();
  animatePetals();
}
