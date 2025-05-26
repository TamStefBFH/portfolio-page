window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('sakuraCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const TOTAL = 150;
  const petalArray = [];
  const petalImg = new Image();
  petalImg.src = 'images/petal.png';

  petalImg.onload = () => {
    for (let i = 0; i < TOTAL; i++) {
      petalArray.push(new Petal());
    }
    render();
  };

  function render() {
    resizeCanvas();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petalArray.forEach(petal => petal.animate());
    requestAnimationFrame(render);
  }

  class Petal {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height * 2 - canvas.height;
      this.w = 30 + Math.random() * 15;
      this.h = 20 + Math.random() * 10;
      this.opacity = this.w / 45;
      this.xSpeed = 2 + Math.random();
      this.ySpeed = 0.2 + Math.random() * 0.2;
      this.flip = Math.random();
      this.flipSpeed = Math.random() * 0.03;
    }

    draw() {
      if (this.y > canvas.height || this.x > canvas.width) {
        this.reset();
        this.x = -petalImg.width;
      }

      // Prüfen ob sich die Blüte über .about-text befindet
      const el = document.elementFromPoint(this.x, this.y);
      const isOverText = el && el.closest('.about-text');

      if (isOverText) return; // nicht zeichnen

      ctx.globalAlpha = this.opacity;
      ctx.drawImage(
        petalImg,
        this.x,
        this.y,
        this.w * (0.66 + (Math.abs(Math.cos(this.flip)) / 3)),
        this.h * (0.8 + (Math.abs(Math.sin(this.flip)) / 2)),
      );
    }

    animate() {
      this.x += this.xSpeed;
      this.y += this.ySpeed;
      this.draw();
      this.flip += this.flipSpeed;
    }
  }
});
