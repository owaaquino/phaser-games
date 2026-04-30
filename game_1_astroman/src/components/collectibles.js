export class Diamonds {
  constructor(scene) {
    this.scene = scene;
  }

  createDiamonds(map) {
    const diamondObjects = map.getObjectLayer('diamonds')['objects'];
    this.diamonds = this.scene.physics.add.staticGroup();

    diamondObjects.forEach((object) => {
      let obj = this.diamonds.create(object.x, object.y, 'diamond');

      obj.setOrigin(0, 1);
      obj.refreshBody();
      this.scene.tweens.add({
        targets: obj,
        y: '+=5',
        duration: 1000,
        yoyo: true,
        ease: 'Sine.easeInOut',
        repeat: -1,
      });
    });
  }
}
