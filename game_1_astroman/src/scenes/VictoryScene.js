import BaseMenuScene from '../BaseMenuScene.js';
import GDM from '../GameManager.js';

class VictoryScene extends BaseMenuScene {
  constructor() {
    super('VictoryScene');
  }

  create() {
    this.scene.stop('UIScene'); // Stop the UI scene to prevent overlap

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

    this.initMenu(['Play Again', 'Main Menu']);
  }

  confirmSelection() {
    const selectedOption = this.menuOptions[this.selectedIndex];

    if (selectedOption === 'Play Again') {
      GDM.resetGame();
      this.scene.start('GameScene');
    } else if (selectedOption === 'Main Menu') {
      GDM.resetGame();
      this.scene.start('MenuScene');
    }
  }
}

export default VictoryScene;
