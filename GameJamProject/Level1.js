var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameJam;
(function (GameJam) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            _super.apply(this, arguments);
        }
        Level1.prototype.create = function () {
            this.map = this.game.add.tilemap('level1Tiles');
            this.map.addTilesetImage('tiles_spritesheet', 'gameTiles');
            this.backgroundlayer = this.map.createLayer('backgroundLayer');
            this.blockedLayer = this.map.createLayer('blockedLayer');
            this.map.setCollisionBetween(1, 100000, true, 'blockedLayer');
            this.backgroundlayer.resizeWorld();
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.player = new GameJam.Player(this.game, 60, this.game.world.height - 150);
            this.game.camera.follow(this.player);
        };
        Level1.prototype.playerHit = function () {
        };
        Level1.prototype.update = function () {
            this.game.physics.arcade.collide(this.player, this.blockedLayer, this.playerHit, null, this);
        };
        return Level1;
    })(Phaser.State);
    GameJam.Level1 = Level1;
})(GameJam || (GameJam = {}));
