export class Door {
  constructor(scene) {
    this.scene = scene;
  }

  createDoor(map) {
    const doorObject = map.getObjectLayer('closed_door')['objects'];
    this.doorObject = this.scene.physics.add.staticGroup();
    if (doorObject) {
      doorObject.forEach((door) => {
        const zone = this.scene.add
          .zone(
            Math.round(door.x),
            Math.round(door.y),
            Math.round(door.width),
            Math.round(door.height - 1),
          )
          .setOrigin(0);
        this.scene.physics.add.existing(zone, true);
        zone.body.debugShowBody = true;
        this.doorObject.add(zone);
      });
    }
  }
}
