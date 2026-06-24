export class Enemies {
  constructor(scene) {
    this.scene = scene;
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
      enemy.setSize(3, 8);
      enemy.setOrigin(0, 0);
      enemy.setOffset(7);
    });
  }

  triggerEnemyAttack() {}

  update() {
    this.enemyObjects.children.iterate(function (child) {
      child.anims.play('lizard-idle', true);
    });
  }
}
