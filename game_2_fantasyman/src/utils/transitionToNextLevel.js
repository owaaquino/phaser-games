import GDM from '../GameManager.js';

export class transitionToNextLevel {
  constructor(scene) {
    this.scene = scene;
  }

  transition() {
    this.scene.player.body.enable = false;
    this.scene.cameras.main.fadeOut(1000, 0, 0, 0);

    this.scene.cameras.main.once('camerafadeoutcomplete', () => {
      //TODO: If done all levels victory scene before else uses transtion scene
      if (GDM.state.currentLevel === 5) {
        this.scene.start('VictoryScene');
      } else {
        this.scene.scene.start('TransitionScene');
        GDM.state.currentLevel = GDM.state.currentLevel + 1;
      }
    });
  }
}
