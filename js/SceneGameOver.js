class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: "SceneGameOver" })
  }
  preload(){
    this.load.image('restartButton', 'assets/sprBtnRestart.png');
    this.load.image('restartButtonHover', 'assets/sprBtnRestartHover.png');
    this.load.image('restartButtonDown', 'assets/sprBtnRestartDown.png');

  }
  create () {
    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "restartButton"
    );

    this.btnRestart.setInteractive();

    this.btnRestart.on("pointerover", function(){
      this.btnRestart.setTexture("restartButtonHover");
    }, this);

    this.btnRestart.on("pointerout", function(){
      this.btnRestart.setTexture("restartButton");
    }, this);

    this.btnRestart.on("pointerdown", function(){
      this.btnRestart.setTexture("restartButtonDown");
    }, this);

    this.btnRestart.on("pointerup", function(){
      this.btnRestart.setTexture("restartButton");
      this.scene.start("SceneMain");
    }, this);

    this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER", {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.title.setOrigin(0.5);
  }
}
