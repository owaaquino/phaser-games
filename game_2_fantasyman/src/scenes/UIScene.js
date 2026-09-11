import { Timer } from '../components/timer.js';

class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene');
  }

  create() {
    // Create Timer
    const timeInstance = new Timer(this);
    timeInstance.createTimer();
    this.timer = timeInstance.timerText;
  }
}

export default UIScene;
