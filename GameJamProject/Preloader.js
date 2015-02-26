var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameJam;
(function (GameJam) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            this.preloadBar = this.add.sprite(50, 125, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            this.load.image('logo', 'assets/logo.png');
            this.load.image('ground', 'assets/platform.png');
            this.load.image('captain', 'assets/captain/01.png');
            this.load.image('love', 'assets/love/01.png');
            this.load.image('enemy', 'assets/enemy.png');
            this.load.atlasJSONHash('rockman', 'sample.png', 'sample.json');
            this.game.load.json('dialog1', 'assets/dialog/level1/scene1.json');
            this.load.tilemap('level1Tiles', 'assets/tileset/level1.json', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('bullet', 'assets/purple_ball.png');
            this.game.load.image('bullet2', 'assets/other_ball.png');
            this.load.image('gameTiles', 'assets/tiles_spritesheet.png');
        };
        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };
        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    })(Phaser.State);
    GameJam.Preloader = Preloader;
})(GameJam || (GameJam = {}));
