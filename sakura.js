const canvas = document.getElementById('sakuraCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');

  // Setze die Canvas-Größe
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const maxPetals = 50;
  const petals = [];

  const sakuraImage = new Image();
  sakuraImage.src = 'images/petal.png';
 

  class Petal {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * -canvas.height;
      this.size = Math.random() * 12 + 8;
      this.speed = Math.random() * 1.5 + 0.5;
      this.swing = Math.random() * 2 - 1;
      this.angle = Math.random() * Math.PI * 2;
      this.rotationSpeed = Math.random() * 0.02 - 0.01;
    }

    update() {
      this.y += this.speed;
      this.x += Math.sin(this.angle) * 0.5;
      this.angle += this.rotationSpeed;

      if (this.y > canvas.height + this.size) {
        this.reset();
        this.y = -this.size;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.drawImage(sakuraImage, -this.size / 2, -this.size / 2, this.size, this.size);
      ctx.restore();
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
      petal.draw();
    }
    requestAnimationFrame(animatePetals);
  }

  sakuraImage.onload = () => {
    initPetals();
    animatePetals();
  };
}
