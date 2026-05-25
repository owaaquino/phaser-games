class Preload extends Phaser.Scene {
  constructor() {
    super('Preload');
  }
  preload() {
    // 1. Create a progress bar (visuals)
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    // 2. Listen for the 'progress' event
    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      // value is a decimal from 0 to 1
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('complete', () => {
      console.log('PreloadScene: All assets loaded!');
    });

    // 3. Load assets
    this.load.pack('asset_pack', 'assets/data/assets.json');
  }

  create() {
    this.scene.start('GameScene');
  }
}

export default Preload;
