export const createAnimations = (scene, animationData) => {
  animationData.forEach((animation) => {
    scene.anims.create({
      key: animation.key,
      frames: scene.anims.generateFrameNumbers(animation.assetKey, {
        start: 0,
        end: 3,
      }),
      frameRate: animation.frameRate,
      repeat: animation.repeat,
    });
  });
};
