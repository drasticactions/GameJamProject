var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameJam;
(function (GameJam) {
    var Tomato = (function (_super) {
        __extends(Tomato, _super);
        function Tomato(game, x, y) {
            _super.call(this, game, x, y, 'rockman');
            this.hitPoints = 5;
            this.game.physics.arcade.enableBody(this);
            this.body.bounce.y = 0.2;
            this.body.gravity.y = 300;
            this.body.collideWorldBounds = true;
            this.animations.add('idle', [
                'tomato/0001.png',
                'tomato/0002.png',
                'tomato/0003.png'
            ], 5, true);
            this.animations.play('idle');
            game.add.existing(this);
        }
        return Tomato;
    })(Phaser.Sprite);
    GameJam.Tomato = Tomato;
})(GameJam || (GameJam = {}));
