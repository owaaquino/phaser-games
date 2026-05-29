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

    // Get ladder object
    const ladderObject = map.getObjectLayer('ladders')['objects'];
    this.ladderObject = this.physics.add.staticGroup();

    if (ladderObject) {
      ladderObject.forEach((ladder) => {
        const zone = this.add
          .zone(ladder.x, ladder.y, ladder.width, ladder.height)
          .setOrigin(0);
        this.physics.add.existing(zone, true);
        zone.body.debugShowBody = true;
        this.ladderObject.add(zone);
      });
    }

    // Create input keys
    this.cursor = this.input.keyboard.createCursorKeys();

    // Create Player

    const playerInstance = new Player(this);
    playerInstance.createPlayer(map);
    this.player = playerInstance.player;
    this.playerController = playerInstance;

    // Set up collisions
    platforms.setCollisionByProperty({ collides: true });
    this.platformCollider = this.physics.add.collider(this.player, platforms);
    // this.physics.add.overlap(this.player, this.ladderObject, () => {
    //   console.log('Player is on ladder');
    // });

    // Camera setup
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(1);
  }

  update() {
    // 1. Direct bounding box overlap check
    const overlappingLadder = this.physics.overlap(
      this.player,
      this.ladderObject,
    );

    let playerIsWithinLadderBuffer = false;
    let standingAtLadderTop = false;
    let targetLadderX = 0;
    let ladderWidth = 0;

    if (overlappingLadder) {
      this.ladderObject.children.iterate((ladder) => {
        const playerBody = this.player.body;

        // ADD A BUFFER TELERANCE WINDOW (e.g., allow 4 pixels of overlap leeway)
        const withinLeftEdge = playerBody.left >= ladder.x - 10;
        const withinRightEdge = playerBody.right <= ladder.x + ladder.width + 4;

        if (withinLeftEdge && withinRightEdge) {
          playerIsWithinLadderBuffer = true;
          targetLadderX = ladder.x; // Save this to snap the player center
          ladderWidth = ladder.width;
        }
      });
    }

    // 2. Scan for the top lip cushion check
    this.ladderObject.children.iterate((ladder) => {
      const playerFeet = this.player.body.bottom;
      if (
        Math.abs(playerFeet - ladder.y) <= 4 &&
        this.player.body.left >= ladder.x - 4 &&
        this.player.body.right <= ladder.x + ladder.width + 4
      ) {
        standingAtLadderTop = true;
        targetLadderX = ladder.x;
        ladderWidth = ladder.width;
      }
    });

    const touchingFloor =
      this.player.body.blocked.down || this.player.body.touching.down;
    const pressingJump = this.cursor.up.isDown;

    // --- STATE ENGINE WITH SNAP LOCKING ---

    if (overlappingLadder && pressingJump && !touchingFloor) {
      // Eject player via jump
      this.platformCollider.active = true;
      this.player.body.setAllowGravity(true);
      this.playerController.update(this.cursor, false);
    } else if (overlappingLadder && touchingFloor && !this.cursor.up.isDown) {
      // Hold steady on the ground floor base
      this.platformCollider.active = true;
      this.player.body.setAllowGravity(true);
      this.playerController.update(this.cursor, false);

      // TRIGGER CLIMBING SYSTEM IF WITHIN THE ACCEPTABLE BUFFER
    } else if (overlappingLadder && playerIsWithinLadderBuffer) {
      // AUTO-SNAP MECHANIC: If they press an input, lock their X coordinate to the ladder center line
      if (this.cursor.up.isDown || this.cursor.down.isDown) {
        // Aligns player center with the center of the ladder
        const ladderCenter = targetLadderX + ladderWidth / 2;
        this.player.setX(ladderCenter);
      }

      this.platformCollider.active = false;
      this.player.body.setAllowGravity(false);
      this.player.setAccelerationY(0);

      if (this.cursor.up.isDown) {
        this.player.setVelocityY(-60);
      } else if (this.cursor.down.isDown && !touchingFloor) {
        this.player.setVelocityY(60);
      } else {
        this.player.setVelocityY(0); // Perfect mid-air lock
      }

      this.playerController.update(this.cursor, true);
    } else if (standingAtLadderTop && this.cursor.down.isDown) {
      // Snap to center when entering from the top roof
      const ladderCenter = targetLadderX + ladderWidth / 2;
      this.player.setX(ladderCenter);

      this.platformCollider.active = false;
      this.player.y += 5;
      this.player.body.setAllowGravity(false);
      this.playerController.update(this.cursor, true);
    } else if (standingAtLadderTop && !touchingFloor) {
      this.platformCollider.active = false;
      this.player.setVelocityY(0);
      this.player.body.setAllowGravity(false);
      this.playerController.update(this.cursor, true);
    } else {
      // Default out-of-bounds state
      this.platformCollider.active = true;
      this.player.body.setAllowGravity(true);
      this.playerController.update(this.cursor, false);
    }
  }
}
export default GameScene;
