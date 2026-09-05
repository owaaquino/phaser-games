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

  updateTotalKills() {
    this.state.totalEnemyKilled += 1;
    this.emit('KILLS_SCORE_CHANGED', this.state.totalEnemyKilled);
  }

  updateTotalRetry() {
    this.state.totalRetry += 1;
    this.emit('RETRY_SCORE_CHANGED', this.state.totalRetry);
  }

  resetGame() {
    this.state.currentLevel = 1;
    this.state.totalEnemyKilled = 0;
    this.state.totalRetry = 0;
    this.emit('RETRY_SCORE_CHANGED', 0);
    this.emit('KILLS_SCORE_CHNAGED', 0);

    this.removeAllListeners();
  }

  retryGame() {
    // add states for last score here

    this.removeAllListeners();
  }
}

const GDM = new GameManager();
export default GDM;
