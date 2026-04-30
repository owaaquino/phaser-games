import GDM from '../GameManager.js';

class TransitionScene extends Phaser.Scene {
  constructor() {
    super('TransitionScene');
  }

  create() {
    this.scene.stop('UIScene'); // Stop the UI scene to prevent overlap

    this.add
      .text(400, 300, 'Stage Complete', {
        fontSize: '48px',
        fill: '#f5f5fa',
      })
      .setOrigin(0.5);

    this.add
      .text(400, 370, `Score: ${GDM.state.score}`, {
        fontSize: '24px',
        fill: '#fff',
      })
      .setOrigin(0.5);

    let nextLevelButton = this.add
      .text(400, 450, `Go to Next Level ${GDM.state.currentLevel}`, {
        fontSize: '24px',
        fill: '#fff',
      })
      .setOrigin(0.5)
      .setInteractive();

    nextLevelButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });
  }
}

export default TransitionScene;
