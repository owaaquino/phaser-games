import GDM from '../GameManager.js';

export class Timer {
  constructor(scene) {
    this.scene = scene;
  }

  createTimer() {
    this.elapsedSeconds = GDM.state.elapsedTime;

    this.scene.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });
  }

  updateTimer() {
    this.elapsedSeconds++;

    GDM.state.elapsedTime = this.elapsedSeconds;
  }
}
