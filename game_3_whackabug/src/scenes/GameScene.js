class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.score = 0;
    this.initialTime = 10;
  }

  create() {
    const randX = Phaser.Math.RND.integerInRange(50, 800);
    const randY = Phaser.Math.RND.integerInRange(100, 500);
    this.bug = this.add.image(randX, randY, 'bug').setInteractive();
    this.bug.setDisplaySize(80, 80);

    this.scoreLabel = this.add.text(50, 50, `Score: ${this.score}`);
    this.timerLabel = this.add.text(50, 70, 'Time:');

    this.bug.on('pointerdown', () => {
      this.changeBugPosition(this.bug);
      this.score = this.score + 1;
      this.scoreLabel.setText(`Score: ${this.score}`);
    });

    this.countdownTimer = this.time.addEvent({
      delay: this.initialTime * 1000,
      callback: this.onCountdownComplete,
      callbackScope: this,
      loop: false,
    });
  }

  update() {
    if (this.countdownTimer && !this.countdownTimer.hasDispatched) {
      let timeRemaining = Math.ceil(this.countdownTimer.getRemainingSeconds());
      this.timerLabel.setText(`Time: ${timeRemaining > 0 ? timeRemaining : 0}`);
    }
  }

  changeBugPosition(bug) {
    const randX = Phaser.Math.RND.integerInRange(50, 800);
    const randY = Phaser.Math.RND.integerInRange(100, 500);

    bug.setPosition(randX, randY);
  }

  onCountdownComplete() {
    this.scoreLabel.setText(`Time's Up! Your final score is ${this.score}`);
    this.timerLabel.setText('Time: 0');
    this.bug.disableInteractive();
  }
}

export default GameScene;
