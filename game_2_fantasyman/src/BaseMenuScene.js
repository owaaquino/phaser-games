export default class BaseMenuScene extends Phaser.Scene {
  constructor(key) {
    super(key);
  }

  initMenu(options, startY = 70) {
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

    this.menuOptions = options;
    this.menuItems = [];
    this.selectedIndex = 0;

    this.menuOptions.forEach((option, index) => {
      const text = this.add
        .bitmapText(125, startY + index * 15, 'bubbleMad', option, 8)
        .setOrigin(0.5)
        .setInteractive();

      this.menuItems.push(text);
    });

    this.setupInputs();
    this.updateMenuVisual();
  }

  setupInputs() {
    this.input.keyboard.on('keydown-UP', () => this.changeSelection(-1));
    this.input.keyboard.on('keydown-DOWN', () => this.changeSelection(1));
    this.input.keyboard.on('keydown-ENTER', () => this.confirmSelection());
  }

  changeSelection(direction) {
    this.selectedIndex += direction;

    if (this.selectedIndex < 0)
      this.selectedIndex = this.menuOptions.length - 1;
    if (this.selectedIndex >= this.menuOptions.length) this.selectedIndex = 0;

    this.updateMenuVisual();
  }

  updateMenuVisual() {
    this.menuItems.forEach((item, index) => {
      if (index === this.selectedIndex) {
        item.setTint(0xbada55);
      } else {
        item.setTint(0xffffff);
      }
    });
  }

  confirmSelection() {
    console.warn('confirm not yet implemented in this scene');
  }
}
