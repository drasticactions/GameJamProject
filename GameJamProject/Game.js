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
            //Assigning Up, Down, Left and Right to a variable
            var arrow = this.game.input.keyboard.createCursorKeys();
            //This will stop the arrow keys from scrolling the page
            this.game.input.keyboard.addKeyCapture(arrow);
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    GameJam.Boot = Boot;
})(GameJam || (GameJam = {}));
var GameJam;
(function (GameJam) {
    var DialogTest = (function (_super) {
        __extends(DialogTest, _super);
        function DialogTest() {
            _super.apply(this, arguments);
        }
        DialogTest.prototype.create = function () {
            this.index = 0;
            this.dialogIndex = 0;
            this.waiting = false;
            this.characterSprites = [];
            this.json = this.game.cache.getJSON('dialog1');
            for (var i = 0; i < this.json.characters.length; i++) {
                var positionX = this.json.characters[i].position === "left" ? -600 : 300;
                var sprite = this.add.sprite(this.world.centerX + positionX, this.world.centerY - 100, this.json.characters[i].image);
                this.characterSprites[i] = sprite;
            }
            this.characterName = this.game.add.text(32, 200, '', { font: "10pt \"Lucida Console\"", fill: "#fff", stroke: "#000", strokeThickness: 2, wordWrap: true, wordWrapWidth: 350 });
            this.text = this.game.add.text(32, 220, '', { font: "15pt \"Lucida Console\"", fill: "#fff", stroke: "#000", strokeThickness: 2, wordWrap: true, wordWrapWidth: 350 });
            this.input.onDown.add(this.nextScene, this);
        };
        DialogTest.prototype.nextScene = function () {
            if (this.index <= this.json.script.length - 1) {
                this.waiting = false;
            }
        };
        DialogTest.prototype.update = function () {
            if (!this.waiting) {
                var dialog = this.json.script[this.index];
                var sprite = this.characterSprites[dialog.id];
                if (dialog.new) {
                    var positionX = this.json.characters[dialog.id].position === "left" ? -300 : -70;
                    this.add.tween(sprite).to({ x: this.world.centerX + positionX }, 200, Phaser.Easing.Back.Out, true, 200);
                }
                this.text.setText(dialog.text);
                this.characterName.setText(this.json.characters[dialog.id].name);
                this.waiting = true;
                this.index++;
            }
        };
        return DialogTest;
    })(Phaser.State);
    GameJam.DialogTest = DialogTest;
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
            //this.state.add('Level1', Level1, false);
            this.state.add('DialogTest', GameJam.DialogTest, false);
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
            this.game.state.start('DialogTest', true, false);
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
            this.duration = game.time.now;
            this.game.physics.arcade.enableBody(this);
            this.body.bounce.y = 0.2;
            this.body.gravity.y = 300;
            this.body.collideWorldBounds = true;
            this.cursors = this.game.input.keyboard.createCursorKeys();
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
            this.animations.add('shoot', [
                'player/shoot/0001.png',
                'player/shoot/0002.png'
            ], 10, true, false);
            this.animations.add('shootjump', [
                'player/shootjump/0001.png',
                'player/shootjump/0002.png',
                'player/shootjump/0003.png',
                'player/shootjump/0004.png',
                'player/shootjump/0005.png',
                'player/shootjump/0006.png',
                'player/shootjump/0007.png'
            ], 10, false, false);
            this.animations.add('shootrun', [
                'player/shootrun/0001.png',
                'player/shootrun/0002.png',
                'player/shootrun/0003.png',
                'player/shootrun/0004.png',
                'player/shootrun/0005.png',
                'player/shootrun/0006.png',
                'player/shootrun/0007.png',
                'player/shootrun/0008.png',
                'player/shootrun/0009.png',
                'player/shootrun/0010.png'
            ], 10, true, false);
            this.animations.play('idle');
            game.add.existing(this);
        }
        Player.prototype.isDoubleTap = function () {
        };
        Player.prototype.update = function () {
            this.body.velocity.x = 0;
            this.playerLeftRight();
            this.playerJump();
        };
        Player.prototype.playerLeftRight = function () {
            if (this.cursors.left.isDown && this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                this.body.velocity.x = -150;
                // If we're jumping, don't fire the shoot animation.
                if (!this.isJumping)
                    this.animations.play('shootrun');
                else
                    this.animations.play('shootjump');
                if (this.scale.x === 1) {
                    this.scale.x = -1;
                }
            }
            else if (this.cursors.left.isDown) {
                this.body.velocity.x = -150;
                // If we're jumping, don't fire the walk animation.
                if (!this.isJumping)
                    this.animations.play('walk');
                if (this.scale.x === 1) {
                    this.scale.x = -1;
                }
            }
            else if (this.cursors.right.isDown && this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                this.body.velocity.x = 150;
                // If we're jumping, don't fire the shoot animation.
                if (!this.isJumping)
                    this.animations.play('shootrun');
                else
                    this.animations.play('shootjump');
                if (this.scale.x === -1) {
                    this.scale.x = 1;
                }
            }
            else if (this.cursors.right.isDown) {
                this.body.velocity.x = 150;
                if (!this.isJumping)
                    this.animations.play('walk');
                if (this.scale.x === -1) {
                    this.scale.x = 1;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                if (!this.isJumping)
                    this.animations.play('shoot');
                else {
                    this.animations.play('shootjump');
                }
            }
            else {
                if (!this.isJumping)
                    this.animations.play('idle');
            }
        };
        Player.prototype.playerJump = function () {
            if (this.cursors.up.isDown && this.body.blocked.down) {
                this.isJumping = true;
                this.body.velocity.y = -150;
                this.animations.play('jump');
                this.duration = this.game.time.now + 750;
            }
            else if (!this.body.blocked.down) {
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
            this.load.image('ground', 'assets/platform.png');
            this.load.image('captain', 'assets/captain/01.png');
            this.load.image('love', 'assets/love/01.png');
            // Load JSON Sprite Atlas
            this.load.atlasJSONHash('rockman', 'sample.png', 'sample.json');
            this.game.load.json('dialog1', 'assets/dialog/level1/scene1.json');
            this.load.tilemap('level1Tiles', 'assets/tileset/level1.json', null, Phaser.Tilemap.TILED_JSON);
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
//# sourceMappingURL=game.js.map