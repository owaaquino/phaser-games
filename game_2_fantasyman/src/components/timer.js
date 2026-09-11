export class Timer {
  constructor(scene) {
    this.scene = scene;
  }

  createTimer() {
    this.timerText = this.scene.add.bitmapText(210, 2, 'bubbleMad', '00:00', 8);

    this.elapsedSeconds = 0;

    this.scene.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });
  }

  updateTimer() {
    this.elapsedSeconds++;

    const minutes = Math.floor(this.elapsedSeconds / 60);
    const seconds = this.elapsedSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    this.timerText.setText(`${formattedMinutes}:${formattedSeconds}`);
  }
}
