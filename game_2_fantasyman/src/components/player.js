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
    this.player.setSize(8, 8);
    this.player.setOffset(6);
  }

  update(cursor) {
    if (cursor.left.isDown) {
      this.player.setVelocityX(-100);
      this.player.flipX = true;
    } else if (cursor.right.isDown) {
      this.player.setVelocityX(80);
      this.player.flipX = false;
    } else {
      this.player.setVelocityX(0);
    }

    if (cursor.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-120);
    }

    if (!this.player.body.blocked.down) {
      this.player.anims.play('jump', true);
    } else if (this.player.body.velocity.x !== 0) {
      this.player.anims.play('walk', true);
    } else {
      this.player.anims.play('idle', true);
    }
  }
}
