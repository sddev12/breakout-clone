import logger from "./logger.js";

export default class Puck {
  radius = 10;
  startAngle = 0;
  endAngle = Math.PI * 2;
  clockwise = false;
  x = 1;
  y = 1;
  dx = 4;
  dy = 4;

  reset() {
    this.radius = 10;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2;
    this.clockwise = false;
    this.x = 11;
    this.y = 11;
    this.dx = 4;
    this.dy = 4;
  }

  drawPuck(ctx) {
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      this.startAngle,
      this.endAngle,
      this.clockwise
    );
    ctx.fillStyle = "#20BF55";
    ctx.fill();

    // ctx.drawImage(
    //   this.sprite,
    //   this.x,
    //   this.y,
    //   this.spriteWidth,
    //   this.spriteHeight,
    //   0,
    //   0,
    //   30,
    //   30
    // );
  }

  adjustPuckSpeed() {
    if (this.dx < 0) {
      this.dx -= 1;
    }
    if (this.dx > 0) {
      this.dx += 1;
    }
    if (this.dy < 0) {
      this.dy -= 1;
    }
    if (this.dy > 0) {
      this.dy += 1;
    }
  }

  movePuck(ctx, paddle, score, highScore) {
    this.x += this.dx;
    this.y += this.dy;

    /**
     * when puck hits left or right edge of screen, flip it's x direction
     */
    if (this.x + this.radius > ctx.canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
      logger.log(`Puck dx: ${this.dx}`);
    }

    /**
     * When the puck hits the padde, flip it's y direction. If it doesn't hit the paddle, it keeps going through the botton edge of the screen which will trigger a game over.
     * Each time the puck hits the paddle, the score is increased by 5
     * Each time the score is a multiple of 10, the paddles width is reduced by 5
     */
    if (
      this.y + this.radius > ctx.canvas.height - paddle.height * 1.5 &&
      this.x >= paddle.x &&
      this.x <= paddle.x + paddle.width
    ) {
      this.dy = -this.dy;
      logger.log(`Puck dy: ${this.dy}`);
      score.incrementScore(5);
      highScore.update(score);
      logger.log(`Score: ${score.total}`);
      // scoreCounter.textContent = `Score: ${score.total}`;
      if (score.total > 0 && score.total % 10 === 0) {
        if (paddle.width > 30) {
          paddle.decreaseWidth(5);
          logger.log(`Paddle Width: ${paddle.width}`);
        }
        this.adjustPuckSpeed();
      }
    }

    /**
     * When the paddle hits the top edge of the screen, flip it's y direction
     */
    if (this.y - this.radius < 0) {
      this.dy = -this.dy;
      logger.log(`Puck dy: ${this.dy}`);
    }
  }
}
