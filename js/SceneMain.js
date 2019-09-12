class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMain" });
  }
  preload() {
    this.load.image('background', 'assets/ShootemUpBackg.png');
    this.load.image('comet', 'assets/comet.png');
    this.load.image('bullet', 'assets/bullet.png');
    //this.load.image('bulletTwo', 'assets/bullet.png');
    this.load.image('boundbox', 'assets/boundbox.png');
    this.load.image('boundboxTopBottom', 'assets/boundboxTopBottom.png');
    this.load.image('bossOne', 'assets/ships/bossOne.png');
    this.load.image('bossShot', 'assets/bossShot.png');
    this.load.spritesheet('player', 'assets/ships/playerShip.png', {frameWidth: 20, frameHeight: 15});
    this.load.spritesheet('enemyOne', 'assets/ships/enemyRedOne.png', {frameWidth:20, frameHeight: 20});
    this.load.spritesheet('playerShipExplosion', 'assets/ships/playerShipExplosion.png', {frameWidth:20, frameHeight: 20});
    this.load.spritesheet('enemyRedShipExplosion', 'assets/ships/enemyRedShipExplosion.png', {frameWidth:20, frameHeight: 20});
    this.load.spritesheet('powerUpDual', 'assets/powerUps/powerUpDual.png', {frameWidth: 20, frameHeight: 20});
  }
  create() {
    this.anims.create({
      key: 'playerCollision',
      frames: this.anims.generateFrameNumbers('playerShipExplosion', {frames: [1,2,3,4,5]}),
      frameRate: 10,
      repeat: 0
    });

    //enemy Shot animation
    this.anims.create({
      key: 'enemyShot',
      frames: this.anims.generateFrameNumbers('enemyRedShipExplosion', {frames: [1,2,3,4,5]}),
      frameRate: 7,
      repeat: 0
    });

    //powerup animation
    this.anims.create({
      key: 'powerUpDualAnim',
      frames: this.anims.generateFrameNumbers('powerUpDual', {frames: [1,2,3,4,5,6,7,8]}),
      frameRate: 7,
      repeat: -1
    });

    //create player
    this.player = new Player(
      this,
      50,
      100,
      "player",
      0
    );

    this.redEnemies = this.add.group();
    //this.bossBullets = this.add.group();
    this.playerBullets = this.add.group();

    this.time.addEvent({
      delay: 750,
      callback: function () {
        var enemy = new RedEnemy(
          this,
          this.game.config.width + 10,
          Phaser.Math.Between(0, this.game.config.height)
        );
        this.redEnemies.add(enemy);
      },
      callbackScope: this,
      loop: true
    });

    this.physics.add.collider(this.playerBullets, this.redEnemies, function(bullets, enemy) {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
        enemy.enemyExplode(true);
        bullets.destroy();
      }
    });

    this.physics.add.collider(this.player, this.redEnemies, function(player, enemy){
      if(!player.getData("isDead") && !enemy.getData("isDead")){
        player.playerExplode(false);
        player.onDestroy();
        enemy.enemyExplode(true);
      }
    });


    this.cursors = this.input.keyboard.createCursorKeys();
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

  }
  update(){
    if (!this.player.getData("isDead")){
      this.player.update();

      if (this.cursors.up.isDown) {
        this.player.moveUp();
      }
      else if (this.cursors.down.isDown) {
        this.player.moveDown();
      }

      if (this.cursors.left.isDown){
        this.player.moveLeft();
      }
      else if (this.cursors.right.isDown){
        this.player.moveRight();
      }

      if (this.spacebar.isDown){
        this.player.setData("isShooting", true);
        console.log("isShooting on space" + this.player.getData("isShooting"));
      }
    }

    for(let i = 0; i< this.redEnemies.getChildren().length; i++){
      var enemy = this.redEnemies.getChildren()[i];
      enemy.update();
      if(enemy.x < -enemy.displayWidth){
        if(enemy){
          if(enemy.onDestroy !== undefined){
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }
    for (let i = 0; i < this.playerBullets.getChildren().length; i++){
      var bullets = this.playerBullets.getChildren()[i];
      //this.player.setData("numberOfShotsFired", this.playerBullets.getChildren().length);
      bullets.update();
      if(bullets.x - bullets.displayWidth*.25 > this.game.config.width){
        if(bullets){
          if(bullets.onDestroy !== undefined){
            bullets.onDestroy();
          }
          bullets.destroy();
          this.player.setData("numberOfShotsAllowed", this.player.getData("numberOfShotsAllowed") +1);
          this.player.setData("isActive", false);
          this.player.setData("isShooting", false);
          console.log("isActive is " + this.player.getData("isActive"));
          console.log("isShooting is " + this.player.getData("isShooting"));
          console.log("numberOfShotsAllowed is " + this.player.getData("numberOfShotsAllowed"));
          console.log("numberOfShotsFired is " + this.player.getData("numberOfShotsFired"));
          console.log("on destroy is " + bullets.onDestroy);
        }
      }
    }

  }
}
