import BaseMenuScene from '../BaseMenuScene.js';

class MenuScene extends BaseMenuScene {
  constructor() {
    super('MenuScene');
  }
  create() {
    this.add
      .text(400, 300, 'Astro Man', {
        fontSize: '48px',
        fill: '#f5f5fa',
      })
      .setOrigin(0.5);

    this.initMenu(['Start Game', 'Options', 'Credits']);
  }

  confirmSelection() {
    const selectedOption = this.menuOptions[this.selectedIndex];

    if (selectedOption === 'Start Game') {
      this.scene.start('GameScene');
    } else if (selectedOption === 'Options') {
      console.log('Options Menu...soon be implemented');
    } else if (selectedOption === 'Credits') {
      console.log('Credits...');
    }
  }
}

export default MenuScene;
