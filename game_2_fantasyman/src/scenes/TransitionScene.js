import GDM from '../GameManager.js';
import BaseMenuScene from '../BaseMenuScene.js';

class TransitionScene extends BaseMenuScene {
  constructor() {
    super('TransitionScene');
  }

  create() {
    const config = {
      image: 'bubble_font',
      width: 8,
      height: 8,
      chars:
        '!"#$•%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZÀÁÂÃÇÉÊÍÎÓÔÕŒÚÛÜ :¿',
      charsPerRow: 81,
      spacing: { x: 0, y: 0 },
    };

    const parsedFont = Phaser.GameObjects.RetroFont.Parse(this, config);
    this.cache.bitmapFont.add('bubbleMad', parsedFont);

    this.add.bitmapText(70, 30, 'bubbleMad', 'LEVEL COMPLETE', 8);

    this.initMenu(['NEXT LEVEL', 'RETRY LEVEL', 'MAIN MENU']);
  }

  confirmSelection() {
    const selectedOption = this.menuOptions[this.selectedIndex];

    if (selectedOption === 'NEXT LEVEL') {
      this.scene.start('GameScene');
    } else if (selectedOption === 'MAIN MENU') {
      GDM.resetGame();
      this.scene.start('GameScene');
    } else if (selectedOption === 'RETRY LEVEL') {
      this.scene.start('GameScene');
    }
  }
}

export default TransitionScene;
