class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }
  create() {
    console.log('GameScene: create method called');
    const map = this.make.tilemap({ key: 'intro_1' });
    const tileset = map.addTilesetImage('platformer', 'tileimage');

    map.createLayer('background', tileset);
    map.createLayer('decorations', tileset);

    map.createLayer('ladders', tileset);
    map.createLayer('spikes', tileset);

    // const frame = map.createLayer('framebound', tileset, 0, 0);
    const platforms = map.createLayer('platforms', tileset, 0, 0);

    this.player = this.physics.add.sprite(
      100,
      10,
      'player',
      'basic_idle_01.png',
    );
    // this.player.setCollideworldbounds(true);

    platforms.setCollisionByProperty({ collides: true });
    this.physics.add.collider(this.player, platforms);
    //
    // 2. Set the physics boundaries to the exact size of your Tiled map
    // This stops the player from walking off the left/right edges of your massive level
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // 3. Set the camera boundaries to the exact size of your Tiled map
    // This stops the camera from showing the empty black void past the edges of your map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // 4. Tell the camera to track your player
    // True = rounds pixels to prevent jitter in your 8x8 game!
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
  }
  update() {}
}

export default GameScene;
