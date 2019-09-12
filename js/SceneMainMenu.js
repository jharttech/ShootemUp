class SceneMainMenu extends Phaser.Scene {
  constructor(){
    super({ key: "SceneMainMenu" });
  }

  preload(){
    this.load.image('playButton', 'assets/sprBtnPlay.png');
    this.load.image('playButtonHover', 'assets/sprBtnPlayHover.png');
    this.load.image('playButtonDown', 'assets/sprBtnPlayDown.png');
  }

  create() {
    //this.scene.start("SceneMain");
    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "playButton"
    );
    this.btnPlay.setInteractive();

    this.btnPlay.on("pointerover", function(){
      this.btnPlay.setTexture("playButtonHover");
    }, this);

    this.btnPlay.on("pointerout", function(){
      this.btnPlay.setTexture("playButton");
    }, this);

    this.btnPlay.on("pointerdown", function(){
      this.btnPlay.setTexture("playButtonDown");
    }, this);

    this.btnPlay.on("pointerup", function(){
      this.btnPlay.setTexture("playButton");
      this.scene.start("SceneMain");
    }, this);

    this.title = this.add.text(this.game.config.width * 0.5, 128, "ShootemUp", {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.title.setOrigin(0.5);
  }
}
