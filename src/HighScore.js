export default class HighScore {
  total = 0;
  highScoreCounter = document.getElementById("high-score");

  update(score) {
    console.log(`High Score: ${this.total}`);
    if (score.total > this.total) {
      this.total = score.total;
    }
    this.highScoreCounter.textContent = `High Score: ${this.total}`;
  }
}
