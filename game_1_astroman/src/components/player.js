export class Player {
  constructor(scene) {
    this.scene = scene;
  }

  createPlayer(map) {
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

    const startingPoint = map.findObject(
      'player_starting_point',
      (obj) => true,
    );

    this.player = this.scene.physics.add.sprite(
      startingPoint.x,
      startingPoint.y - startingPoint.height,
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
      this.player.setVelocityY(-200);
    }

    if (cursors.space.isDown) {
      this.player.setVelocityY(-100);
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
