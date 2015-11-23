  var theGame = function(game) {
  var platforms;
  var player;
  var stars;
  var scoreText; 
  var background;
  var gameOver;
  var emitter1;
  var emitter2;
  var score;
  this.started_game = false;
}

theGame.prototype = {
  create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE.BOTTOM_TOP);
      background = this.game.add.tileSprite(0, 0, 800, 5000, 'sky');
      this.game.world.setBounds(0, 0, 800, 5000);
      platforms = this.game.add.group();
      platforms.enableBody = true;
      //this.game.physics.enable(plat)
      
      this.game.add.text(400, 100, 'Stiga tolkova');
      
      var ground = platforms.create(0, this.game.world.height - 64, 'ground');
      ground.scale.setTo(2, 2);
      ground.body.immovable = true;
      for (var i = this.game.world.height; i > 0; i -= 300) {
        var randomX = 0;
        do {
          randomX = this.game.world.randomX;
        } while (randomX > this.game.world.width * 0.8);
        if (Math.random() > 0.5) {
        var ledge = platforms.create(randomX, i, 'ledge1');
        }
        else var ledge = platforms.create(randomX, i, 'ledge2');
        ledge.body.immovable = true;
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
 
      /*timer = this.game.time.create(false);
      timer.loop(0.1, this.scoreUpdate, this);
      timer.start();*/
      
      player.animations.add('left', [0, 1, 2, 3], 10, true);
      player.animations.add('right', [5, 6, 7, 8], 10, true);
      
      stars = this.game.add.group();
      stars.enableBody = true;
      
      emitter = this.game.add.emitter(10, 10, 50);
      emitter2 = this.game.add.emitter(799, 10, 50);
      emitter.makeParticles('star');
      emitter.minParticleSpeed.setTo(-300,-300);
      emitter.minParticleSpeed.setTo(300, 300);
  
      emitter2.makeParticles('star');
      emitter2.minParticleSpeed.setTo(300,300);
      emitter2.minParticleSpeed.setTo(-300, -300);
      
      for (var i = 0; i < 12; i++) {
          var star = stars.create(i* 70, 0, 'star');
          star.body.gravity.y = 200;
          star.body.bounce.y = 0 + Math.random() * 0.2;
          star.body.velocity.y = 20;
      }
},
        update: function() {
        
        scoreText = this.game.add.text(0, 0, 'Score: ');
        scoreText.fixedToCamera = true;
        this.game.physics.arcade.collide(player, platforms);//, null, function(object1, object2) { //collision detection za platformite i choveka
          //return object1.body.position.y < object2.body.position.y;
        //});
        this.game.physics.arcade.collide(stars, platforms);
        //game.physics.arcade.collide(stars, player);
        //game.physics.arcade.overlap(player, stars, collectStar, null, this); // tva tuka da subira zvezdi
        cursors = this.game.input.keyboard.createCursorKeys();
        player.body.velocity.x = 0;
        //player.body.velocity.y = 0;
        
        if (cursors.left.isDown) {
          player.body.velocity.x = -550;
          player.animations.play('left');
        } 
        else if(cursors.right.isDown) {
          player.body.velocity.x = 550;
          player.animations.play('right');
        }
        
        /*if(cursors.up.isDown) {
          player.body.velocity.y = -550;
        }*/
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
    
      /*scoreUpdate: function() {
          if(!player.body.touching.down){
            score += 10;
            scoreText.content = this.score;
          }
      },*/
      
      actionOnClick: function() {
        this.started_game = false;
        this.game.state.start('TheGame');
      },
      actionOnClick2: function() {
        this.started_game = false;
        this.game.state.start('GameTitle');
      },
      nextLevel() {
        this.game.state.start('level2');
      }
}
