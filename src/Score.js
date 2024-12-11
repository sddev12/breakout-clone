export default class Score {
  total = 0;
  scoreCounter = document.getElementById("score");

  incrementScore(value) {
    this.total += value;
    this.scoreCounter.textContent = `Score: ${this.total}`;
  }

  reset() {
    this.total = 0;
    this.scoreCounter.textContent = `Score: ${this.total}`;
  }
}
