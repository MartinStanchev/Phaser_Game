var preload = function(game) {}

preload.prototype = {
  preload: function() {
    var loadingBar = this.add.sprite(160,240,"loading");
    loadingBar.anchor.setTo(0.5,0.5);
    this.load.setPreloadSprite(loadingBar);
    //this.load.load.imag();
    this.game.load.image('sky', 'assets/clouds2x.png');
    this.game.load.image('ground', 'assets/platform.png');
    this.game.load.image('ledge1', 'assets/ledge1.png');
    this.game.load.image('ledge2', 'assets/ledge2.png');
    this.game.load.image('star', 'assets/star.png');
    this.game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    this.game.load.image('button', 'assets/button.png');
    this.game.load.image('buttonSettings', 'assets/button_settings.png');
    this.game.load.image('buttonReturn', 'assets/button_return.png');
    this.game.load.image('buttonRestart', 'assets/button_restart.png');
  },
  create: function() {
    this.game.state.start('GameTitle');
  }
}