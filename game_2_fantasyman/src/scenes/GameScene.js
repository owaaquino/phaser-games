import { Player } from '../components/player.js';

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }
  create() {
    console.log('GameScene: create method called');
    const map = this.make.tilemap({ key: 'intro_1' });
    const tileset = map.addTilesetImage('platformer', 'tileimage');

    console.log(map);

    map.createLayer('background', tileset);
    map.createLayer('decorations', tileset);

    map.createLayer('ladders', tileset);
    map.createLayer('spikes', tileset);
    map.createLayer('doors', tileset);

    const platforms = map.createLayer('platforms', tileset, 0, 0);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Create input keys
    this.cursor = this.input.keyboard.createCursorKeys();

    // Create Player

    const playerInstance = new Player(this);
    playerInstance.createPlayer(map);
    this.player = playerInstance.player;
    this.playerController = playerInstance;

    // Set up collisions
    platforms.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, platforms);

    // Camera setup
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(1);
  }
  update() {
    this.playerController.update(this.cursor);
  }
}

export default GameScene;
