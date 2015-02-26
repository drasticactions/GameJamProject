var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameJam;
(function (GameJam) {
    var BananaEnemy = (function (_super) {
        __extends(BananaEnemy, _super);
        function BananaEnemy(game, x, y) {
            _super.call(this, game, x, y, 'enemy');
            this.hitPoints = 5;
            this.game.physics.arcade.enableBody(this);
            this.body.bounce.y = 0.2;
            this.body.gravity.y = 300;
            this.body.collideWorldBounds = true;
            game.add.existing(this);
        }
        return BananaEnemy;
    })(Phaser.Sprite);
    GameJam.BananaEnemy = BananaEnemy;
})(GameJam || (GameJam = {}));
