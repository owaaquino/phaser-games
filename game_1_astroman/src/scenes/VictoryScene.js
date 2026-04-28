import GDM from '../GameManager.js';

class VictoryScene extends Phaser.Scene {
  constructor() {
    super('VictoryScene');
  }

  create() {
    this.add
      .text(400, 300, 'Victory!', {
        fontSize: '48px',
        fill: '#25a355',
      })
      .setOrigin(0.5);

    this.add
      .text(400, 370, `Final Score: ${GDM.state.score}`, {
        fontSize: '24px',
        fill: '#fff',
      })
      .setOrigin(0.5);

    let playAgainButton = this.add
      .text(400, 450, 'PLAY AGAIN', { fontSize: '24px', fill: '#fff' })
      .setOrigin(0.5)
      .setInteractive();

    playAgainButton.on('pointerdown', () => {
      GDM.resetGame();
      this.scene.start('GameScene');
    });
  }
}

export default VictoryScene;
