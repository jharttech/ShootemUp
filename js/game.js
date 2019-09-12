var config = {
  type: Phaser.WEBGL,
  width: 640,
  height: 420,
  backgroundColor: 'black',
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0},
      debug: true
    }
  },
  scene: [
    SceneMainMenu,
    SceneMain,
    SceneGameOver
  ]
}

var game = new Phaser.Game(config);
