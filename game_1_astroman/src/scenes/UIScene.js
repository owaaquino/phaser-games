import GDM from '../GameManager.js';

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene');
  }

  create() {
    this.score = GDM.state.score;
    this.fuel = GDM.state.fuel;

    this.fuelText = this.add
      .text(650, 16, `Fuel: ${this.fuel}`, {
        fontSize: '24px',
        fill: '#fff',
      })
      .setScrollFactor(0);

    this.scoreText = this.add
      .text(16, 16, `Score: ${this.score}`, {
        fontSize: '24px',
        fill: '#fff',
      })
      .setScrollFactor(0);

    GDM.on('SCORE_CHANGED', (newScore) => {
      this.score = newScore;
      this.scoreText.setText(`Score: ${this.score}`);
    });

    GDM.on('FUEL_CHANGED', (newFuel) => {
      this.fuel = newFuel;
      this.fuelText.setText(`Fuel: ${Math.trunc(this.fuel)}`);
    });
    this.events.on('shutdown', () => {
      GDM.removeAllListeners('SCORE_CHANGED');
      GDM.removeAllListeners('FUEL_CHANGED');
    });
  }
}
