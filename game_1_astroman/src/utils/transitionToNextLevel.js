import GDM from '../GameManager.js';

export class transitionToNextLevel {
  constructor(scene) {
    this.scene = scene;
  }

  transition() {
    this.scene.player.body.enable = false; // Disable player physics
    this.scene.cameras.main.fadeOut(1000, 0, 0, 0); // Fade out effect

    this.scene.cameras.main.once('camerafadeoutcomplete', () => {
      if (GDM.state.currentLevel >= GDM.state.totalLevels) {
        // If all levels are completed, go to Victory scene
        this.scene.scene.start('VictoryScene');
        return;
      } else {
        this.scene.scene.start('TransitionScene');
        GDM.state.currentLevel = GDM.state.currentLevel + 1; // Increment level
        GDM.state.diamondsCollected = 0; // Reset for next level
      }
    });
  }
}
