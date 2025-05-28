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

  let aboutTextBox = null;

  petalImg.onload = () => {
    const textElement = document.querySelector('.about-text');
    if (textElement) {
      aboutTextBox = textElement.getBoundingClientRect();
    }

    for (let i = 0; i < TOTAL; i++) {
      petalArray.push(new Petal());
    }
    render();
  };

  function render() {
    resizeCanvas();
    if (document.querySelector('.about-text')) {
      aboutTextBox = document.querySelector('.about-text').getBoundingClientRect();
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petalArray.forEach(petal => petal.animate());
    requestAnimationFrame(render);
  }

  const sakuraImage = new Image();
  sakuraImage.src = 'images/petal.png';
 

  class Petal {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;

      this.y = Math.random() * canvas.height * 2 - canvas.height;
      this.w = 20 + Math.random() * 10; // kleiner
      this.h = 12 + Math.random() * 6;
      this.opacity = this.w / 40;
      this.xSpeed = 0.3 + Math.random() * 0.4; // eleganter
      this.ySpeed = 0.1 + Math.random() * 0.2;
      this.flip = Math.random();
      this.flipSpeed = Math.random() * 0.02;
    }

    draw() {
      if (this.y > canvas.height || this.x > canvas.width) {
        this.reset();
        this.x = -petalImg.width;
      }


      const petalLeft = this.x;
      const petalRight = this.x + this.w;
      const petalTop = this.y;
      const petalBottom = this.y + this.h;

      const isOverText =
        aboutTextBox &&
        petalRight > aboutTextBox.left &&
        petalLeft < aboutTextBox.right &&
        petalBottom > aboutTextBox.top &&
        petalTop < aboutTextBox.bottom;

      if (isOverText) return; // Blüte über Text? -> nicht zeichnen

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

