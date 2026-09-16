import BaseMenuScene from '../BaseMenuScene.js';
import GDM from '../GameManager.js';

class VictoryScene extends BaseMenuScene {
  constructor() {
    super('VictoryScene');
  }

  create() {
    this.scene.stop('UIScene');

    this.add.bitmapText(70, 20, 'bubbleMad', 'VICTORY', 16);

    this.add.bitmapText(30, 50, 'bubbleMad', 'TOTAL KILLS', 8);
    this.add.bitmapText(
      170,
      50,
      'bubbleMad',
      `${GDM.state.totalEnemyKilled}`,
      8,
    );
    this.add.bitmapText(30, 60, 'bubbleMad', 'TOTAL RETRY', 8);
    this.add.bitmapText(170, 60, 'bubbleMad', `${GDM.state.totalRetry}`, 8);
    const minutes = Math.floor(GDM.state.elapsedTime / 60);
    const seconds = GDM.state.elapsedTime % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    this.add.bitmapText(30, 70, 'bubbleMad', 'TIME', 8);
    this.add.bitmapText(
      170,
      70,
      'bubbleMad',
      `${formattedMinutes}:${formattedSeconds}`,
      8,
    );

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
