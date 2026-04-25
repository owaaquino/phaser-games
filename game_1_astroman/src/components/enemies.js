export class Enemies {
  constructor(scene) {
    this.scene = scene;
  }

  createEnemies(map) {
    const enemyObjects = map.getObjectLayer('aliens')['objects'];
    this.enemyObjects = this.scene.physics.add.group();

    const enemyLimits = map.getObjectLayer('enemy_limits')['objects'];
    this.enemyLimits = this.scene.physics.add.group();

    enemyObjects.forEach((object) => {
      const obj = this.enemyObjects.create(object.x, object.y, 'alien-idle');
      obj.setSize(15, 15);
      obj.setOffset(8, 10);
    });

    enemyLimits.forEach((object) => {
      const wall = this.enemyLimits.create(object.x, object.y, null);
      wall.setOrigin(0, 0); // Set origin to top-left corner
      wall.setSize(object.width, object.height); // Set the size of the wall to match the object
      wall.setVisible(false); // Hide the wall

      wall.body.immovable = true; // Make the wall immovable
    });
  }

  update() {
    this.enemyObjects.children.iterate(function (child) {
      if (child.body.velocity.x === 0) {
        const direction = Phaser.Math.RND.pick([-50, 50]); // randomly pick left or right
        child.setVelocityX(direction);
        child.anims.play('alien-walk', true);
        if (child.body.velocity.x < 0) {
          child.flipX = true;
        } else {
          child.flipX = false;
        }
      }
    });
  }
}
