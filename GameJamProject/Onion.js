var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameJam;
(function (GameJam) {
    var Onion = (function (_super) {
        __extends(Onion, _super);
        function Onion(game, x, y) {
            _super.call(this, game, x, y, 'rockman');
            this.hitPoints = 5;
            this.scale.x = .6;
            this.scale.y = .6;
            this.game.physics.arcade.enableBody(this);
            this.body.bounce.y = 0.2;
            this.body.gravity.y = 0;
            this.body.collideWorldBounds = true;
            this.animations.add('idle', [
                'onion/0001.png',
                'onion/0003.png'
            ], 5, true);
            this.animations.play('idle');
            game.add.existing(this);
        }
        return Onion;
    })(Phaser.Sprite);
    GameJam.Onion = Onion;
})(GameJam || (GameJam = {}));
