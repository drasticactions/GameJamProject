window.onload = function () {
    var game = new GameJam.Game();
};
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameJam;
(function (GameJam) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'assets/loader.png');
        };
        Boot.prototype.create = function () {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;
            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
            }
            else {
            }
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    GameJam.Boot = Boot;
})(GameJam || (GameJam = {}));
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
var GameJam;
(function (GameJam) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            _super.apply(this, arguments);
        }
        Level1.prototype.create = function () {
            // TODO: Add Player
            this.player = new GameJam.Player(this.game, 60, this.game.world.height - 150);
        };
        return Level1;
    })(Phaser.State);
    GameJam.Level1 = Level1;
})(GameJam || (GameJam = {}));
var GameJam;
(function (GameJam) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            // TODO: Turn into real menu, instead of just a click through.
            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
            this.add.tween(this.logo).to({ y: 125 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);
            this.input.onDown.addOnce(this.fadeOut, this);
        };
        MainMenu.prototype.fadeOut = function () {
            var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('Level1', true, false);
        };
        return MainMenu;
    })(Phaser.State);
    GameJam.MainMenu = MainMenu;
})(GameJam || (GameJam = {}));
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
        Player.prototype.update = function () {
            this.body.velocity.x = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -150;
                // If we're jumping, don't fire the walk animation.
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
            // If we're on the ground, let the player jump.
            // TODO: Move to "OnDown" event, rather than check on update.
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.body.blocked.down) {
                this.isJumping = true;
                this.body.velocity.y = -150;
                this.animations.play('jump');
            }
            else if (!this.body.blocked.down) {
                // Still in the air, so still jumping.
                this.isJumping = true;
            }
            else {
                this.isJumping = false;
            }
        };
        return Player;
    })(Phaser.Sprite);
    GameJam.Player = Player;
})(GameJam || (GameJam = {}));
var GameJam;
(function (GameJam) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(50, 125, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
            //  Load our actual games assets
            this.load.image('logo', 'assets/logo.png');
            // Load JSON Sprite Atlas
            this.load.atlasJSONHash('rockman', 'sample.png', 'sample.json');
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
//# sourceMappingURL=game.js.map