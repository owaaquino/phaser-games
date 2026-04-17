export class Diamonds {
  constructor(scene) {
    this.scene = scene;
  }

  createDiamonds(map) {
    const diamondObjects = map.getObjectLayer('diamonds')['objects'];
    this.diamonds = this.scene.physics.add.staticGroup();

    diamondObjects.forEach((object) => {
      let obj = this.diamonds.create(object.x, object.y, 'diamond');

      // Set origin to Bottom-Left to match Tiled's logic
      obj.setOrigin(0, 1);

      // Set the specific frame for the diamond (gid 75 is usually frame 74)
      obj.setFrame(74);

      // Refresh the physics body to match the new origin/size
      obj.refreshBody();
    });
  }
}
