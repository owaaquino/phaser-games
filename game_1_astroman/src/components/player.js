export class Player {
  constructor(scene, startingPoint) {
    this.scene = scene;
    this.startingPoint = startingPoint;
  }

  createPlayer() {
    this.scene.anims.create({
      key: 'walk',
      frames: this.scene.anims.generateFrameNumbers('astronaut-run', {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'idle',
      frames: this.scene.anims.generateFrameNumbers('astronaut-idle', {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'jump',
      frames: this.scene.anims.generateFrameNumbers('astronaut-jump', {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.player = this.scene.physics.add.sprite(
      this.startingPoint.x,
      this.startingPoint.y - this.startingPoint.height,
      'astronaut-idle',
    );
    this.player.setCollideWorldBounds(true);
  }

  update(cursors) {
    if (cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.flipX = true;
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.flipX = false;
    } else {
      this.player.setVelocityX(0);
    }

    if (cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-350);
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
