import { Player } from '../components/player.js';
import { Keys } from '../components/key.js';

class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }
  create() {
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

    // Get texts object
    //TODO - maybe I can refactor this to separate utility function
    const textsObject = map.getObjectLayer('texts')['objects'];

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

    textsObject.forEach((text) => {
      const textObject = this.add
        .bitmapText(text.x, text.y, 'bubbleMad', text.text.text, 8)
        .setAlpha(0.3);

      textObject.setOrigin(0, 0);
    });

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

    // Create Player
    const playerInstance = new Player(this);
    playerInstance.createPlayer(map);
    this.player = playerInstance.player;
    this.playerController = playerInstance;

    // Set up collisions
    platforms.setCollisionByProperty({ collides: true });
    this.platformCollider = this.physics.add.collider(this.player, platforms);
    this.physics.add.overlap(this.player, this.keys, (player, key) => {
      this.doorOpened = true;
      key.disableBody(true, true);
    });

    this.physics.add.collider(
      this.player,
      this.ladderObject,
      null,
      this.onLadderTop,
      this,
    );

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
