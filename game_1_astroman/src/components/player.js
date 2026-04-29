import GDM from '../GameManager.js';

export class Player {
  constructor(scene) {
    this.scene = scene;
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
    this.player.body.setSize(15, 15); // Adjust the size as needed
    this.player.body.setOffset(5, 5); // Adjust the offset as needed
    this.player.setCollideWorldBounds(true);
  }

  playerDeath() {
    this.scene.physics.pause();
    this.player.body.enable = false; // Disable physics to prevent further movement
    GDM.state.isDead = true;

    this.scene.tweens.add({
      targets: this.player,
      y: this.player.y - 10, // Jump up slightly
      angle: 180, // Flip upside down
      duration: 1000,
      ease: 'Power2',
      onComplete: () => {
        this.scene.scene.stop('UIScene'); // Stop the UI scene to prevent overlap
        this.scene.scene.start('GameOverScene');
      },
    });
  }

  update(cursors, fuel) {
    if (GDM.state.isDead) {
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
    if (cursors.space.isDown && GDM.state.fuel > 0) {
      this.player.setVelocityY(-150);
      GDM.updateFuel(-1); // Decrease fuel
    } else if (this.player.body.blocked.down) {
      if (GDM.state.fuel < 100) {
        GDM.updateFuel(0.5); // Regenerate fuel when on the ground
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
