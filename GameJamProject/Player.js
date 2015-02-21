var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameJam;
(function (GameJam) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            _super.call(this, game, x, y, 'rockman');
            this.game.physics.arcade.enableBody(this);
            this.body.bounce.y = 0.2;
            this.body.gravity.y = 300;
            this.body.collideWorldBounds = true;
            this.anchor.setTo(0.5, 0);
            this.isJumping = false;
            this.animations.add('idle', [
                'player/idle/0001.png',
                'player/idle/0002.png',
                'player/idle/0003.png'
            ], 10, true);
            this.animations.add('dash', [
                'player/dash/0001.png',
                'player/dash/0002.png',
                'player/dash/0003.png'
            ], 10, true, false);
            this.animations.add('jump', [
                'player/jump/0001.png',
                'player/jump/0002.png',
                'player/jump/0003.png',
                'player/jump/0004.png',
                'player/jump/0005.png',
                'player/jump/0006.png',
                'player/jump/0007.png'
            ], 10, false, false);
            this.animations.add('walk', [
                'player/walk/0003.png',
                'player/walk/0004.png',
                'player/walk/0005.png',
                'player/walk/0006.png',
                'player/walk/0007.png',
                'player/walk/0008.png',
                'player/walk/0009.png',
                'player/walk/0010.png',
                'player/walk/0011.png',
                'player/walk/0012.png'
            ], 10, true, false);
            this.animations.play('idle');
            game.add.existing(this);
        }
        Player.prototype.isDoubleTap = function () {
        };
        Player.prototype.update = function () {
            this.body.velocity.x = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -150;
                if (!this.isJumping)
                    this.animations.play('walk');
                if (this.scale.x === 1) {
                    this.scale.x = -1;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = 150;
                if (!this.isJumping)
                    this.animations.play('walk');
                if (this.scale.x === -1) {
                    this.scale.x = 1;
                }
            }
            else {
                if (!this.isJumping)
                    this.animations.play('idle');
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.isJumping = true;
                this.body.velocity.y = -150;
                this.animations.play('jump');
            }
            else {
                this.isJumping = false;
            }
            this.currentY = this.body.y;
        };
        return Player;
    })(Phaser.Sprite);
    GameJam.Player = Player;
})(GameJam || (GameJam = {}));
