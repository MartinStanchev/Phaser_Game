var gameTitle = function(game) {}

gameTitle.prototype = {
  create: function() {
    var playbutton = this.game.add.button(400, 300, 'button', this.startGame, this);
    var settingsButton = this.game.add.button(400, 400, 'buttonSettings', this.settingsMenu, this);
    playbutton.anchor.setTo(0.5, 0.5);
    settingsButton.anchor.setTo(0.5, 0.5);
  },
  startGame: function() {
    this.game.state.start("TheGame");
  },
  settingsMenu: function() {
    this.game.state.start("Settings");
  }
}