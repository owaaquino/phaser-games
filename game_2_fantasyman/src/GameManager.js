class GameManager extends Phaser.Events.EventEmitter {
  constructor() {
    super();
    if (!GameManager.instance) {
      this.state = {
        currentLevel: 1,
        totalEnemyKilled: 0,
        totalRetry: 0,
      };
      GameManager.instance = this;
    }
    return GameManager.instance;
  }

  resetGame() {
    this.state.currentLevel = 1;

    this.removeAllListeners();
  }

  retryGame() {
    // add states for last score here

    this.removeAllListeners();
  }
}

const GDM = new GameManager();
export default GDM;
