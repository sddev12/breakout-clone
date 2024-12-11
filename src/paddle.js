export default class Paddle {
  width = 200;
  height = 10;
  x = 0;
  speed = 10;
  direction = 1;
  moveLeft = false;
  moveRight = false;

  drawPaddle(ctx) {
    ctx.fillStyle = "#B20D30";
    ctx.fillRect(
      this.x,
      ctx.canvas.height - this.height * 1.5,
      this.width,
      this.height
    );
  }

  movePaddle(ctx) {
    if (this.moveLeft) {
      this.x -= this.speed;
      if (this.x < 0) {
        this.x = 0;
      }
    }
    if (this.moveRight) {
      this.x += this.speed;
      if (this.x + this.width > ctx.canvas.width) {
        this.x = ctx.canvas.width - this.width;
      }
    }
  }

  decreaseWidth(value) {
    this.width -= value;
  }

  reset() {
    this.width = 200;
    this.height = 10;
    this.x = 0;
    this.speed = 10;
    this.direction = 1;
    this.moveLeft = false;
    this.moveRight = false;
  }
}
