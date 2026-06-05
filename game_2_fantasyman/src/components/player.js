export class Player {
  constructor(scene) {
    this.scene = scene;
    this.isAttacking = false;
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

    this.player.body.onWorldBounds = true;

    // create invisible hitbox for attacks
    this.attackZone = this.scene.add.zone(0, 0, 8, 8);
    this.scene.physics.add.existing(this.attackZone);
    this.attackZone.body.setAllowGravity(false);
    this.attackZone.body.debugShowBody = true;
    this.attackZone.body.enable = false;
    this.attackZone.setVisible(false);
  }

  handlePlayerDeath() {
    this.scene.cameras.main.shake(500, 0.01);
    this.scene.cameras.main.fade(500, 0, 0, 0);
    this.scene.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.scene.restart();
    });
  }

  playerAttack() {
    if (this.isAttacking) return;

    this.isAttacking = true;
    this.player.anims.play('basic-attack', true);

    this.player.setVelocityX(0);

    const offsetX = this.player.flipX ? -6 : 6;

    this.attackZone.x = this.player.x + offsetX;
    this.attackZone.y = this.player.y;

    this.attackZone.body.enable = true;

    this.scene.time.delayedCall(150, () => {
      this.attackZone.body.enable = false;
      this.attackZone.setVisible(false);
      this.isAttacking = false;
    });
  }

  update(cursor, isClimbing) {
    if (Phaser.Input.Keyboard.JustDown(cursor.keyZ)) {
      this.playerAttack();
    }

    if (
      this.isAttacking ||
      (this.player.anims.currentAnim &&
        this.player.anims.currentAnim.key === 'basic-attack' &&
        this.player.anims.isPlaying)
    ) {
      if (this.player.body.blocked.down || this.player.body.touching.down) {
        this.player.setVelocityX(0);
      }
      return;
    }

    if (isClimbing) {
      if (cursor.up.isDown) {
        this.player.setVelocityY(-80);
        this.player.anims.play('climb', true);
      } else if (cursor.down.isDown) {
        this.player.setVelocityY(80);
        this.player.anims.play('climb', true);
      } else {
        this.player.setVelocityY(0);
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

    if (Phaser.Input.Keyboard.JustDown(cursor.keyZ)) {
      this.playerAttack();
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
