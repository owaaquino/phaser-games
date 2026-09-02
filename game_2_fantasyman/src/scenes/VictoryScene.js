import BaseMenuScene from '../BaseMenuScene.js';
import GDM from '../GameManager.js';

class VictoryScene extends BaseMenuScene {
  constructor() {
    super('VictoryScene');
  }

  create() {
    this.add.bitmapText(70, 20, 'bubbleMad', 'VICTORY', 16);

    this.add.bitmapText(30, 50, 'bubbleMad', 'TOTAL KILLS', 8);
    this.add.bitmapText(170, 50, 'bubbleMad', '000000', 8);
    this.add.bitmapText(30, 60, 'bubbleMad', 'TOTAL RETRY', 8);
    this.add.bitmapText(170, 60, 'bubbleMad', '789123', 8);
    this.add.bitmapText(30, 70, 'bubbleMad', 'TOTAL TIME', 8);
    this.add.bitmapText(170, 70, 'bubbleMad', '123456', 8);

    this.initMenu(['PLAY AGAIN', 'MAIN MENU'], 100);
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
