import GDM from '../GameManager.js';
import { Player } from '../components/player.js';
import { Keys } from '../components/key.js';
import { Door } from '../components/door.js';
import { Enemies } from '../components/enemies.js';
import { transitionToNextLevel } from '../utils/transitionToNextLevel.js';

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }
  create() {
    const levelNumber = GDM.state.currentLevel;
    const map = this.make.tilemap({ key: `intro_${levelNumber}` });
    const tileset = map.addTilesetImage('platformer', 'tileimage');

    map.createLayer('background', tileset);
    map.createLayer('decorations', tileset);

    map.createLayer('ladders', tileset);
    const spikes = map.createLayer('spikes', tileset);
    map.createLayer('doors', tileset);

    const platforms = map.createLayer('platforms', tileset, 0, 0);

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    const lizardLayer = map.getObjectLayer('lizards');

    // Get texts object
    const textsObject = map.getObjectLayer('texts');

    if (textsObject && textsObject.objects) {
      textsObject.objects.forEach((text) => {
        const textObject = this.add
          .bitmapText(text.x, text.y, 'bubbleMad', text.text.text, 8)
          .setAlpha(0.3);

        textObject.setOrigin(0, 0);
      });
    }

    // Get ladder object
    const ladderObject = map.getObjectLayer('ladders')['objects'];
    this.ladderObject = this.physics.add.staticGroup();

    if (ladderObject) {
      ladderObject.forEach((ladder) => {
        const zone = this.add
          .zone(
            Math.round(ladder.x),
            Math.round(ladder.y),
            Math.round(ladder.width),
            Math.round(ladder.height - 1),
          )
          .setOrigin(0);
        this.physics.add.existing(zone, true);
        zone.body.debugShowBody = true;
        this.ladderObject.add(zone);
      });
    }

    // Create input keys
    this.cursor = this.input.keyboard.createCursorKeys();
    this.cursor.keyZ = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.Z,
    );

    this.doorOpened = false;

    // Create Keys
    const keysInstance = new Keys(this);
    keysInstance.createKeys(map);
    this.keys = keysInstance.keys;

    //Create Door
    const doorInstance = new Door(this);
    doorInstance.createDoor(map);
    this.doorObject = doorInstance.doorObject;

    // Create Player
    const playerInstance = new Player(this);
    playerInstance.createPlayer(map);
    this.player = playerInstance.player;
    this.playerController = playerInstance;

    // Create Enemeis

    this.enemies = this.physics.add.group();
    this.enemyObjects = null;

    if (lizardLayer && lizardLayer.objects) {
      const enemiesInstance = new Enemies(this);
      enemiesInstance.createEnemies(map);
      this.enemies = enemiesInstance.enemyObjects;
      this.enemyObjects = enemiesInstance;
    }
    // Set up collisions

    // platform and player
    platforms.setCollisionByProperty({ collides: true });
    this.platformCollider = this.physics.add.collider(this.player, platforms);
    // platform and enemies
    this.physics.add.collider(this.enemies, platforms);

    // player attack zone and enemies
    this.physics.add.overlap(
      this.playerController.attackZone,
      this.enemies,
      (attackZone, enemy) => {
        enemy.disableBody(true, true); // Disable enemy when hit
        enemy.anims.stop(); // Stop enemy animation
        enemy.visible = false; // Hide enemy sprite
        // enemy.setTint(0xff0000); // Highlight enemy when hit
        // this.time.delayedCall(100, () => {
        //   enemy.clearTint(); // Remove highlight after delay
        // });
      },
    );

    // key and player
    this.physics.add.overlap(this.player, this.keys, (player, key) => {
      this.doorOpened = true;
      const doorZone = this.doorObject.getChildren()[0];
      const doorSprite = doorZone.getData('visual');
      doorSprite.anims.play('door-open');

      key.disableBody(true, true);
    });
    // door and player
    this.physics.add.overlap(this.player, this.doorObject, (player, door) => {
      if (this.doorOpened && this.cursor.up.isDown) {
        console.log('Level Complete!');
        const transition = new transitionToNextLevel(this);
        transition.transition();
      }
    });
    // ladder and player
    this.physics.add.collider(
      this.player,
      this.ladderObject,
      null,
      this.onLadderTop,
      this,
    );

    // player and spikes
    spikes.setCollisionByProperty({ collides: true });
    spikes.forEachTile((tile) => {
      if (tile.properties.collides) {
        tile.setCollision(false, false, false, false);
      }
    });

    this.physics.add.overlap(this.player, spikes, (player, tile) => {
      if (tile.index === -1) return; // Skip if no tile is present
      console.log('Player hit spikes');
      playerInstance.handlePlayerDeath();
    });

    this.physics.world.on('worldbounds', (body) => {
      if (body.gameObject === this.player && body.blocked.down) {
        console.log('Player has hit the world bounds');
        playerInstance.handlePlayerDeath();
      }
    });

    // initialize climbing state
    this.isClimbing = false;

    // Camera setup
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(1);
  }

  update() {
    const touchingLadder = this.physics.overlap(this.player, this.ladderObject);
    const pressingLeave = this.cursor.left.isDown || this.cursor.right.isDown;

    this.isClimbing = touchingLadder && !pressingLeave;

    if (this.isClimbing) {
      this.player.body.setAllowGravity(false);
      this.player.body.setVelocityX(0);
    } else {
      this.player.body.setAllowGravity(true);
    }

    this.playerController.update(this.cursor, this.isClimbing);

    if (!this.enemyObjects) {
      return;
    } else {
      this.enemyObjects.update(this.player);
    }
  }

  onLadderTop(player, ladder) {
    if (
      player.body.bottom - player.body.deltaY() <= ladder.body.top &&
      !this.cursor.down.isDown
    ) {
      console.log('Player is on top of the ladder');
      return true;
    } else {
      return false;
    }
  }
}
export default GameScene;
