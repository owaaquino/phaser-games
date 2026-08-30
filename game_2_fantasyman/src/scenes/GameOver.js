import BaseMenuScene from '../BaseMenuScene.js';
import GDM from '../GameManager.js';

class GameOver extends BaseMenuScene {
  constructor() {
    super('GameOver');
  }
  create() {
    this.add.bitmapText(60, 30, 'bubbleMad', 'GAME OVER', 16);
    this.initMenu(['RETRY LEVEL', 'RESTART GAME', 'MAIN MENU']);
  }
  confirmSelection() {
    const selectedOption = this.menuOptions[this.selectedIndex];

    if (selectedOption === 'MAIN MENU') {
      GDM.resetGame();
      this.scene.start('MenuScene');
    } else if (selectedOption === 'RESTART GAME') {
      GDM.resetGame();
      this.scene.start('GameScene');
    } else if (selectedOption === 'RETRY LEVEL') {
      GDM.retryGame();
      this.scene.start('GameScene');
    }
  }
}

export default GameOver;
