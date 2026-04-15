import { Player } from '../components/player.js';

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }
  create() {
    // Create level
    const map = this.make.tilemap({ key: 'level5' });
    const tileset = map.addTilesetImage('runner-asset-sheet', 'tileimage');

    map.createLayer('background1', tileset, 0, 0);
    map.createLayer('background2', tileset, 0, 0);

    const movingplatforms = map.createLayer('moving-platform', tileset, 0, 0);

    const frame = map.createLayer('framebound', tileset, 0, 0);
    const platforms = map.createLayer('platforms', tileset, 0, 0);

    // Create input keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // Create player
    const playerInstance = new Player(this);
    playerInstance.createPlayer(map);
    this.player = playerInstance.player; // Store sprite on scene
    this.playerController = playerInstance; // Store controller for updates

    // Object layers collisions

    frame.setCollisionByProperty({ collides: true });
    platforms.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, frame);
    this.physics.add.collider(this.player, platforms);
  }

  update() {
    this.playerController.update(this.cursors);
  }
}

export default GameScene;
