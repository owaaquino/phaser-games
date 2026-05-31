export class Player {
  constructor(scene) {
    this.scene = scene;
  }

  createPlayer(map) {
    const startingPoint = map.findObject('spawnpoint', (obj) => true);

    this.player = this.scene.physics.add.sprite(
      startingPoint.x,
      startingPoint.y,
      'player',
      'basic_idle_01.png',
    );
    this.player.setCollideWorldBounds(true);
    this.player.setSize(5, 8);
    this.player.setOffset(5, 6);
  }

  update(cursor, isClimbing) {
    if (isClimbing) {
      this.player.setVelocityX(0);
      this.player.setAccelerationY(0);

      if (cursor.up.isDown) {
        this.player.setVelocityY(-80);
      } else if (cursor.down.isDown) {
        this.player.setVelocityY(80);
      } else {
        this.player.setVelocityY(0);
      }

      if (cursor.up.down || cursor.down.isDown) {
        this.player.anims.play('climb', true);
      }

      return;
    }

    if (cursor.left.isDown) {
      this.player.setVelocityX(-60);
      this.player.flipX = true;
    } else if (cursor.right.isDown) {
      this.player.setVelocityX(60);
      this.player.flipX = false;
    } else {
      this.player.setVelocityX(0);
    }

    if (
      Phaser.Input.Keyboard.JustDown(cursor.space) &&
      (this.player.body.blocked.down || this.player.body.touching.down)
    ) {
      this.player.setVelocityY(-90);
    }

    if (!(this.player.body.blocked.down || this.player.body.touching.down)) {
      this.player.anims.play('jump', true);
    } else if (this.player.body.velocity.x !== 0) {
      this.player.anims.play('walk', true);
    } else {
      this.player.anims.play('idle', true);
    }
  }
}
