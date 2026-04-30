import { Player } from '../components/player.js';
import { Diamonds } from '../components/collectibles.js';
import { Enemies } from '../components/enemies.js';

import GDM from '../GameManager.js';
import { transitionToNextLevel } from '../utils/transitionToNextLevel.js';

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }
  create() {
    const levelNumber = GDM.state.currentLevel;
    const levelKey = `level${levelNumber}`;

    // UI Score display
    if (!this.scene.isActive('UIScene')) {
      this.scene.launch('UIScene');
    }
    this.scene.bringToTop('UIScene');

    // Create level
    const map = this.make.tilemap({ key: levelKey });
    const tileset = map.addTilesetImage('runner-asset-sheet', 'tileimage');

    map.createLayer('background1', tileset, 0, 0);
    map.createLayer('background2', tileset, 0, 0);
    console.log(GDM.state);

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
    GDM.state.totalDiamonds = this.diamonds.getChildren().length; // Store initial count

    // Create enemies object
    const enemyInstance = new Enemies(this);
    enemyInstance.createEnemies(map);
    this.enemies = enemyInstance.enemyObjects; // Store group on scene
    this.enemyObjects = enemyInstance; // Store controller for updates
    this.enemyLimits = enemyInstance.enemyLimits; // Store controller for updates

    // Object layers collisions

    frame.setCollisionByProperty({ collides: true });
    platforms.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, frame);
    this.physics.add.collider(this.player, platforms);

    this.physics.add.collider(this.enemies, frame);
    this.physics.add.collider(this.enemies, platforms);
    this.physics.add.collider(this.enemies, this.enemyLimits, (enemy, wall) => {
      enemy.setVelocityX(enemy.body.velocity.x * -1); // Reverse direction});
    });
    this.physics.add.collider(this.enemyLimits, frame);
    this.physics.add.collider(this.enemyLimits, platforms);

    this.physics.add.overlap(this.player, this.diamonds, (player, diamond) => {
      GDM.updateScore(10); // Increase score
      GDM.collectedDiamond(); // Update diamond count and check for level completion
      diamond.destroy(); // Remove the diamond from the game
    });
    this.physics.add.collider(this.player, this.enemies, () => {
      playerInstance.playerDeath();
      GDM.state.isDead = true;
    });

    const levelCompleteHandler = () => {
      const transition = new transitionToNextLevel(this);
      transition.transition();
    };

    GDM.once('LEVEL_COMPLETE', levelCompleteHandler, this);

    this.events.once('shutdown', () => {
      GDM.off('LEVEL_COMPLETE', levelCompleteHandler, this);
    });
  }

  update() {
    if (GDM.state.isDead) return;

    this.playerController.update(this.cursors);
    this.enemyObjects.update();
  }
}

export default GameScene;
