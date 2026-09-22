class GameManager extends Phaser.Events.EventEmitter {
  constructor() {
    super();
    if (!GameManager.instance) {
      this.state = {
        currentLevel: 1,
        totalEnemyKilled: 0,
        totalRetry: 0,
        elapsedTime: 0,
        isDead: false,
      };
      GameManager.instance = this;
    }
    return GameManager.instance;
  }

  updateTotalKills() {
    this.state.totalEnemyKilled += 1;
  }

  updateTotalRetry() {
    this.state.totalRetry += 1;
  }

  resetGame() {
    this.state.currentLevel = 1;
    this.state.totalEnemyKilled = 0;
    this.state.totalRetry = 0;
    this.state.isDead = false;

    this.removeAllListeners();
  }

  retryGame() {
    // add states for last score here
    this.state.isDead = false;
    this.removeAllListeners();
  }
}

const GDM = new GameManager();
export default GDM;
