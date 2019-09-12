class Entity extends Phaser.GameObjects.Sprite{
  constructor(scene, x, y, key, type) {
    super(scene, x, y, key);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setData("type", type);
    this.setData("isDead", false);
  }


}

class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, "Player");
    this.setData("speed", 300);
    this.body.setSize(12);
    this.displayWidth = config.width *.07;
    this.scaleY = this.scaleX;
    this.setData("isShooting", false);
    this.setData("numberOfShotsAllowed", 1);
    this.setData("numberOfShotsFired", 0);
    this.setData("isActive", false);
    this.setData("bulletHit", false);

  }

  playerExplode(canDestroy) {
    if(!this.getData("isDead")){
      this.setTexture("playerCollision");
      this.play("playerCollision");
    }

      this.setAngle(0);
      this.body.setVelocity(0,0);

      this.on('animationcomplete', function() {

        if (canDestroy) {
          this.destroy();
        }
        else {
          this.setVisible(false);
        }
      }, this);
      this.setData("isDead", true);
    }

  onDestroy(){
    this.scene.time.addEvent({
      delay: 750,
      callback: function(){
        this.scene.scene.start("SceneGameOver");
      },
      callbackScope: this,
      loop: false
    });
  }

  moveUp(){
    this.body.velocity.y = -this.getData("speed");
  }

  moveDown() {
    this.body.velocity.y = this.getData("speed");
  }

  moveLeft() {
    this.body.velocity.x = -this.getData("speed");
  }

  moveRight() {
    this.body.velocity.x = this.getData("speed");
  }

  update(){
    this.body.setVelocity(0,0);

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    if(this.getData("isShooting") === true ){
      if (this.getData("isActive") === false && this.getData("numberOfShotsAllowed") > 0) {
        var bullets = new PlayerBullets(
          this.scene,
          this.x,
          this.y,
        );
        this.scene.playerBullets.add(bullets);
        this.setData("numberOfShotsAllowed", this.getData("numberOfShotsAllowed") -1);
        this.setData("isShooting", false);
        }
      }

  }

}

class RedEnemy extends Entity {
  constructor(scene, x, y){
    super(scene, x, y, "enemyOne", "RedEnemy");
    this.flipX = true;
    this.body.setSize(12);
    this.displayWidth = config.width *.05;
    this.scaleY = this.scaleX;
    this.body.velocity.x = -Phaser.Math.Between(75, 110);
  }
  enemyExplode(canDestroy) {
    if(!this.getData("isDead")){
      this.setTexture("enemyShot");
      this.play("enemyShot");
    }

      this.setAngle(0);
      this.body.setVelocity(0,0);

      this.on('animationcomplete', function() {

        if (canDestroy) {
          this.destroy();
        }
        else {
          this.setVisible(false);
        }
      }, this);
      this.setData("isDead", true);
    }

}

class PlayerBullets extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "bullet", "PlayerBullets");
    this.body.velocity.x = 300;
  }
}

class BossOne extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, "bossOne", "BossOne");
    this.body.velocity.x = -Phaser.Math.Between(0, 150);
    this.body.velocity.y = Phaser.Math.Between(-150, 150);
  }
}
