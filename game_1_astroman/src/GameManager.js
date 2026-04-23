class GameManager extends Phaser.Events.EventEmitter {
  constructor() {
    super();
    if (!GameManager.instance) {
      this.state = {
        score: 0,
        fuel: 100,
        isDead: false,
      };
      GameManager.instance = this;
    }
    return GameManager.instance;
  }

  updateFuel(amount) {
    this.state.fuel = Phaser.Math.Clamp(this.state.fuel + amount, 0, 100);

    this.emit('FUEL_CHANGED', this.state.fuel);

    if (this.state.fuel <= 0) {
      this.emit('OUT_OF_FUEL');
    }
  }

  updateScore(amount) {
    this.state.score += amount;
    this.emit('SCORE_CHANGED', this.state.score);
  }

  resetGame() {
    this.state.fuel = 100;
    this.state.score = 0;
    this.state.isDead = false;
    this.emit('FUEL_CHANGED', 100);
  }
}

const GDM = new GameManager();
export default GDM;
