import { Player } from '../components/player.js';
import { Diamonds } from '../components/collectibles.js';

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }
  create() {
    // Create level
    const map = this.make.tilemap({ key: 'level1' });
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

    // Create diamonds object
    const diamondsInstance = new Diamonds(this);
    diamondsInstance.createDiamonds(map);
    this.diamonds = diamondsInstance.diamonds; // Store group on scene
    this.totalDiamonds = this.diamonds.getChildren().length; // Store initial count

    // Object layers collisions

    frame.setCollisionByProperty({ collides: true });
    platforms.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, frame);
    this.physics.add.collider(this.player, platforms);

    this.physics.add.overlap(this.player, this.diamonds, (player, diamond) => {
      diamond.destroy(); // Remove the diamond from the game
    });
  }

  update() {
    this.playerController.update(this.cursors);
  }
}

export default GameScene;
