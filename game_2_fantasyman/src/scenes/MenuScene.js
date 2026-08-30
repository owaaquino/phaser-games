import BaseMenuScene from '../BaseMenuScene.js';

class MenuScene extends BaseMenuScene {
  constructor() {
    super('MenuScene');
  }
  create() {
    this.add.bitmapText(50, 30, 'bubbleMad', 'FANTASYMAN', 16);
    this.initMenu(['START GAME', 'OPTIONS', 'CREDITS']);
  }
  confirmSelection() {
    const selectedOption = this.menuOptions[this.selectedIndex];

    if (selectedOption === 'START GAME') {
      this.scene.start('GameScene');
    } else if (selectedOption === 'OPTIONS') {
      console.log('Options');
    } else if (selectedOption === 'CREDITS') {
      console.log('Credits');
    }
  }
}

export default MenuScene;
