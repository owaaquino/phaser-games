class GameManager extends Phaser.Events.EventEmitter {
  constructor() {
    super();
    if (!GameManager.instance) {
      this.state = {
        score: 0,
        fuel: 100,
        isDead: false,
        currentLevel: 1, // starting level
        diamondsCollected: 0, // track collected diamonds
        totalDiamonds: 0, // check how many diamonds in the level
        totalLevels: 5, // total number of levels in the game
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

  collectedDiamond() {
    this.state.diamondsCollected++;
    this.emit('DIAMOND_COLLECTED', this.state.diamondsCollected);

    if (this.state.diamondsCollected >= this.state.totalDiamonds) {
      this.emit('LEVEL_COMPLETE');
    }
  }

  resetGame() {
    this.state.fuel = 100;
    this.state.score = 0;
    this.state.isDead = false;
    this.emit('FUEL_CHANGED', 100);
    this.emit('SCORE_CHANGED', 0);
    this.emit('DIAMOND_COLLECTED', 0);
    this.state.diamondsCollected = 0;
    this.state.totalDiamonds = 0;
    this.state.currentLevel = 1;

    this.removeAllListeners(); // Clear all listeners to prevent duplicates on restart
  }
}

const GDM = new GameManager();
export default GDM;
