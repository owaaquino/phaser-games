export class Keys {
  constructor(scene) {
    this.scene = scene;
  }

  createKeys(map) {
    const keyObjects = map.getObjectLayer('key')['objects'];
    this.keys = this.scene.physics.add.staticGroup();

    keyObjects.forEach((key) => {
      let obj = this.keys.create(key.x, key.y - 2, 'items', 'key_gold.png');

      obj.setOrigin(0, 0);
    });
  }
}
