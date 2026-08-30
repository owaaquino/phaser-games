import BaseMenuScene from '../BaseMenuScene.js';
import GDM from '../GameManager.js';

class VictoryScene extends BaseMenuScene {
  constructor() {
    super('VictoryScene');
  }
  create() {
    this.add.bitmapText(70, 30, 'bubbleMad', 'VICTORY', 16);
    this.initMenu(['PLAY AGAIN', 'MAIN MENU']);
  }

  confirmSelection() {
    const selectedOption = this.menuOptions[this.selectedIndex];

    if (selectedOption === 'PLAY AGAIN') {
      GDM.resetGame();
      this.scene.start('GameScene');
    } else if (selectedOption === 'MAIN MENU') {
      GDM.resetGame();
      this.scene.start('MenuScene');
    }
  }
}

export default VictoryScene;
