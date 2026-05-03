import BaseMenuScene from '../BaseMenuScene.js';
import GDM from '../GameManager.js';

class GameOver extends BaseMenuScene {
  constructor() {
    super('GameOverScene');
  }

  create() {
    this.scene.stop('UIScene'); // Stop the UI scene to prevent overlap

    this.add
      .text(400, 300, 'Game Over', {
        fontSize: '48px',
        fill: '#ff0000',
      })
      .setOrigin(0.5);

    this.add
      .text(400, 340, `Final Score: ${GDM.state.score}`, {
        fontSize: '24px',
        fill: '#fff',
      })
      .setOrigin(0.5);

    this.initMenu(['Retry Level', 'Main Menu']);
  }

  confirmSelection() {
    const selectedOption = this.menuOptions[this.selectedIndex];

    if (selectedOption === 'Retry Level') {
      GDM.resetGame();
      this.scene.start('GameScene');
    } else if (selectedOption === 'Main Menu') {
      console.log('Main menu ');
    }
  }
}

export default GameOver;
