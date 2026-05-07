import BaseMenuScene from '../BaseMenuScene.js';
import GDM from '../GameManager.js';

class TransitionScene extends BaseMenuScene {
  constructor() {
    super('TransitionScene');
  }

  create() {
    this.scene.stop('UIScene'); // Stop the UI scene to prevent overlap

    this.add
      .text(400, 300, 'Level Complete', {
        fontSize: '48px',
        fill: '#f5f5fa',
      })
      .setOrigin(0.5);

    this.initMenu(['Next Level', 'Main Menu']);
  }

  confirmSelection() {
    const selectedOption = this.menuOptions[this.selectedIndex];

    if (selectedOption === 'Next Level') {
      this.scene.start('GameScene');
    } else if (selectedOption === 'Main Menu') {
      GDM.resetGame();
      this.scene.start('MenuScene');
    }
  }
}

export default TransitionScene;
