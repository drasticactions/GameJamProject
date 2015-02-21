var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameJam;
(function (GameJam) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 500, 300, Phaser.AUTO, 'content', null);
            this.state.add('Boot', GameJam.Boot, false);
            this.state.add('Preloader', GameJam.Preloader, false);
            this.state.add('MainMenu', GameJam.MainMenu, false);
            this.state.add('Level1', GameJam.Level1, false);
            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    GameJam.Game = Game;
})(GameJam || (GameJam = {}));
