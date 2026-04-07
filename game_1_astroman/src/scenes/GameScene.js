class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }
  create() {
    // Create menu elements
    const map = this.make.tilemap({ key: 'level5' });
    const tileset = map.addTilesetImage('runner-asset-sheet', 'tileimage');

    const background1 = map.createLayer('background1', tileset, 0, 0);
    const background2 = map.createLayer('background2', tileset, 0, 0);

    const movingplatforms = map.createLayer('moving-platform', tileset, 0, 0);

    const frame = map.createLayer('framebound', tileset, 0, 0);
    const platforms = map.createLayer('platforms', tileset, 0, 0);

    platforms.createLevel;
  }
}

export default GameScene;
