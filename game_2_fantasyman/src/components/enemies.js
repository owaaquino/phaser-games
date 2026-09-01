export class Enemies {
  constructor(scene) {
    this.scene = scene;
    this.attackRange = 10;
    this.detectionRange = 20;
  }

  createEnemies(map) {
    const enemies = map.getObjectLayer('lizards')['objects'];
    this.enemyObjects = this.scene.physics.add.group();

    enemies.forEach((object) => {
      const enemy = this.enemyObjects.create(
        object.x,
        object.y,
        'lizard',
        'lizard_idle_01.png',
      );
      enemy.isAttacking = false;
      enemy.setSize(5, 8);
      enemy.setOrigin(0.5, 0);
      enemy.setOffset(4, 7);

      // create invisible hitbox for attacks
      enemy.attackZone = this.scene.add.zone(0, 0, 4, 8);
      this.scene.physics.add.existing(enemy.attackZone);
      enemy.attackZone.body.setAllowGravity(false);
      enemy.attackZone.body.debugShowBody = true;
      enemy.attackZone.body.enable = false;
      enemy.attackZone.setVisible(false);

      this.scene.physics.add.overlap(
        enemy.attackZone,
        this.scene.player,
        (attackZone, playerBody) => {
          this.scene.playerController.handlePlayerDeath();
        },
      );
    });
  }

  triggerEnemyAttack(player, enemy) {
    enemy.isAttacking = true;
    enemy.body.setVelocityX(0, 0);
    enemy.anims.play('lizard-attack', true);

    enemy.on('animationupdate', (anims, frame) => {
      if (anims.key === 'lizard-attack') {
        enemy.setOffset(4, 2);

        if (frame.index === 2) {
          const bodyCenterX = enemy.body.center.x;
          const bodyCenterY = enemy.body.center.y;
          const attackOffsetX = enemy.flipX ? -8 : 8;

          enemy.attackZone.setPosition(
            bodyCenterX + attackOffsetX,
            bodyCenterY,
          );

          enemy.attackZone.body.enable = true;
          enemy.attackZone.setVisible(true);
        }
      }
    });

    enemy.once('animationcomplete-lizard-attack', () => {
      if (!enemy.active) return;
      enemy.isAttacking = false;
      enemy.setOffset(4, 7);

      enemy.off('animationupdate');
    });
  }

  update(player) {
    const enemyList = this.enemyObjects
      .getChildren()
      .filter((enemy) => enemy.active);

    enemyList.forEach((enemy) => {
      if (enemy.isAttacking) return;

      const distance = Phaser.Math.Distance.BetweenPoints(
        player.body,
        enemy.body,
      );

      if (distance < this.attackRange) {
        this.triggerEnemyAttack(player, enemy);
      } else if (distance <= this.detectionRange) {
        console.log('Enemy detected player');
        this.scene.physics.moveToObject(enemy, player);

        if (enemy.body.velocity.x < 0) {
          enemy.setFlipX(true);
        } else {
          enemy.setFlipX(false);
        }
        enemy.anims.play('lizard-walk', true);
      } else {
        enemy.body.setVelocityX(0);
        enemy.anims.play('lizard-idle', true);
      }
    });
  }
}
