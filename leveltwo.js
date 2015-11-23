  var leveltwo = function(game) {
  var platforms;
  var player;
  var stars;
  var scoreText; 
  var background;
  var gameOver;
  var emitter1;
  var emitter2;
  var score;
  var restartButton;
  this.started_game = false;
}

leveltwo.prototype = {
  create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE.BOTTOM_TOP);
      background = this.game.add.tileSprite(0, 0, 800, 5000, 'sky');
      this.game.world.setBounds(0, 0, 800, 5000);
      platforms = this.game.add.group();
      platforms.enableBody = true;
      restartButton = this.game.add.button(735, 5, 'buttonRestart', this.actionOnClick, this);
      restartButton.fixedToCamera = true;
      
      this.game.add.text(400, 100, 'Stiga tolkova');
      
      var ground = platforms.create(0, this.game.world.height - 64, 'ground');
      ground.scale.setTo(2, 2);
      ground.body.immovable = true;
      for (var i = this.game.world.height; i > 0; i -= 256) {
        var randomX = 0;
        do {
          randomX = this.game.world.randomX;
        } while (randomX > this.game.world.width * 0.8);
        
        var ledge = null;

        if (Math.random() > 0.5) {
          ledge = platforms.create(randomX, i, 'ledge2');
          ledge.body.immovable = false;
        }
        else {
          ledge = platforms.create(randomX, i, 'ledge1');
          ledge.body.immovable = true;
        }
        
        ledge.body.checkCollision.up = true;
        ledge.body.checkCollision.down = false;
        ledge.body.checkCollision.left = false;
        ledge.body.checkCollision.right = false;
      }
      player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');
      this.game.physics.arcade.enable(player);
      player.body.bounce.y = 0;
      player.body.gravity.y = 3000;
      player.body.collideWorldBounds = true;
      
      this.game.camera.focusOn(player);
      this.game.camera.follow(player);
      this.game.camera.deadzone = new Phaser.Rectangle(0, 100, 800, 600);
      
      player.animations.add('left', [0, 1, 2, 3], 10, true);
      player.animations.add('right', [5, 6, 7, 8], 10, true);
      
      emitter = this.game.add.emitter(10, 10, 50);
      emitter2 = this.game.add.emitter(799, 10, 50);
      emitter.makeParticles('star');
      emitter.minParticleSpeed.setTo(-300,-300);
      emitter.minParticleSpeed.setTo(300, 300);
  
      emitter2.makeParticles('star');
      emitter2.minParticleSpeed.setTo(300,300);
      emitter2.minParticleSpeed.setTo(-300, -300);
},
        update: function() {
        background.tilePosition.y += 0.1;
        
        scoreText = this.game.add.text(0, 0, 'Score: ');
        scoreText.fixedToCamera = true;
        this.game.physics.arcade.collide(player, platforms);//, null, function(object1, object2) { //collision detection za platformite i choveka
          //return object1.body.position.y < object2.body.position.y;
        //});
        cursors = this.game.input.keyboard.createCursorKeys();
        
        player.body.velocity.x = 0;
        
        if (cursors.left.isDown) {
          player.body.velocity.x = -550;
          player.animations.play('left');
        } 
        else if(cursors.right.isDown) {
          player.body.velocity.x = 550;
          player.animations.play('right');
        }
        
        else if(cursors.down.isDown) {
          player.body.velocity.y = 550;
        }
        else {
          player.animations.stop();
          player.frame = 4; 
        }
        if(cursors.up.isDown && player.body.touching.down) {
          player.body.velocity.y = -1500;
          this.started_game = true;
        }
        
        if (this.started_game && !player.inCamera) {
          player.kill();
          restartButton.kill(); 
          this.game.camera.unfollow(player);
          this.game.camera.focusOnXY(100, 400);
          gameOver = this.game.add.text(100, 400, 'Game over');
          var pressme = this.game.add.button(100, 500, 'button', this.actionOnClick, this);
          this.game.add.button(100, 600, 'buttonReturn', this.actionOnClick2, this);         
        }
        
        if (player.body.position.y <= 256 && player.body.touching.down){
          nextLevel();
        }
        
        },

      actionOnClick: function() {
        this.started_game = false;
        this.game.state.start('Leveltwo');
      },
      actionOnClick2: function() {
        this.started_game = false;
        this.game.state.start('GameTitle');
      },
      nextLevel() {
        //this.game.state.start('level');
      }
}
