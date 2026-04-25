export class Animate {
  constructor(scene, animationData) {
    this.scene = scene;
    this.data = animationData;
  }

  create() {
    this.data.forEach((animation) => {
      this.scene.anims.create({
        key: animation.key,
        frames: this.scene.anims.generateFrameNumbers(animation.assetKey, {
          start: 0,
          end: 3,
        }),
        frameRate: animation.frameRate,
        repeat: animation.repeat,
      });
    });
  }
}
