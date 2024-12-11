import Puck from "./Puck.js";
import Score from "./Score.js";
import Paddle from "./paddle.js";
import logger from "./logger.js";
import HighScore from "./HighScore.js";

// Set to true to turn on debug logs
window.debugMode = false;

const canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

// Initialise canvas context
ctx.canvas.width = canvas.width = 900;
ctx.canvas.height = canvas.height = 600;
logger.log(
  `Canvas Width: ${ctx.canvas.width} | Canvas Height: ${ctx.canvas.height}`
);

// Initialise game objects
const paddle = new Paddle();
const puck = new Puck();

// Initialise scoring system
const score = new Score();
const highScore = new HighScore();
// const scoreCounter = document.getElementById("score");

// Initialise start button
const startButton = document
  .getElementById("start-button")
  .addEventListener("click", onStartButtonClick);

// Start button handler
function onStartButtonClick() {
  puck.reset();
  paddle.reset();
  score.reset();
  animate();
}

// Set paddle starting position
paddle.x = (ctx.canvas.width - paddle.width) / 2;

// Event handlers
function keyDownHandler(event) {
  if (event.key === "ArrowLeft" || event.key === "a") {
    paddle.moveLeft = true;
  } else if (event.key === "ArrowRight" || event.key === "d") {
    paddle.moveRight = true;
  }
}

function keyUpHandler(event) {
  if (event.key === "ArrowLeft" || event.key === "a") {
    paddle.moveLeft = false;
  } else if (event.key === "ArrowRight" || event.key === "d") {
    paddle.moveRight = false;
  }
}

// Event listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Game loop
function animate() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = "#046E8F";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  paddle.drawPaddle(ctx);
  paddle.movePaddle(ctx);
  puck.drawPuck(ctx);
  puck.movePuck(ctx, paddle, score, highScore);
  if (puck.y > ctx.canvas.height) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#046E8F";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = "60px Silkscreen";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Game Over!", ctx.canvas.width / 2, ctx.canvas.height / 2);
    return;
  }
  requestAnimationFrame(animate);
}
