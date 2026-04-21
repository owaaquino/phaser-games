class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }

  create() {
    this.add
      .text(400, 300, 'Game Over', {
        fontSize: '48px',
        fill: '#ff0000',
      })
      .setOrigin(0.5);

    let retryButton = this.add
      .text(400, 450, 'RETRY', { fontSize: '24px', fill: '#fff' })
      .setOrigin(0.5)
      .setInteractive();

    retryButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });
  }
}

export default GameOver;
