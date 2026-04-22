export class Player {
  constructor(scene, fuel) {
    this.scene = scene;
    this.isDead = false;
    this.fuel = fuel;
  }

  createPlayer(map) {
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

  playerDeath() {
    this.isDead = true;

    this.scene.physics.world.pause();

    this.player.anims.play('player-death', true);

    this.scene.tweens.add({
      targets: this.player,
      y: this.player.y - 10, // Jump up slightly
      angle: 180, // Flip upside down
      duration: 1000,
      ease: 'Power2',
      onComplete: () => {
        this.scene.scene.start('GameOverScene');
      },
    });
  }

  update(cursors, fuel) {
    if (this.isDead) {
      return;
    }

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

    // jetpack boost
    if (cursors.space.isDown && this.fuel > 0) {
      this.player.setVelocityY(-100);
      this.fuel -= 1; // Decrease fuel
    } else if (this.player.body.blocked.down) {
      if (this.fuel < 100) {
        this.fuel += 10; // Regenerate fuel when on the ground
      } // Ensure fuel doesn't go negative
    }

    if (!this.player.body.blocked.down) {
      this.player.anims.play('player-jump', true);
    } else if (this.player.body.velocity.x !== 0) {
      this.player.anims.play('player-walk', true);
    } else {
      this.player.anims.play('player-idle', true);
    }
  }
}
