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
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
            }
            else {
            }
            var arrow = this.game.input.keyboard.createCursorKeys();
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
    var Celery = (function (_super) {
        __extends(Celery, _super);
        function Celery(game, x, y) {
            _super.call(this, game, x, y, 'rockman');
            this.hitPoints = 5;
            this.scale.x = .6;
            this.scale.y = .6;
            this.game.physics.arcade.enableBody(this);
            this.body.bounce.y = 0.2;
            this.body.gravity.y = 300;
            this.body.collideWorldBounds = true;
            this.animations.add('idle', [
                'celery/0001.png',
                'celery/0002.png'
            ], 5, true);
            this.animations.play('idle');
            game.add.existing(this);
        }
        return Celery;
    })(Phaser.Sprite);
    GameJam.Celery = Celery;
})(GameJam || (GameJam = {}));
var GameJam;
(function (GameJam) {
    var Cherry = (function (_super) {
        __extends(Cherry, _super);
        function Cherry(game, x, y) {
            _super.call(this, game, x, y, 'rockman');
            this.hitPoints = 5;
            this.scale.x = .6;
            this.scale.y = .6;
            this.game.physics.arcade.enableBody(this);
            this.body.bounce.y = 0.2;
            this.body.gravity.y = 0;
            this.body.collideWorldBounds = true;
            this.animations.add('idle', [
                'cherry/0001.png',
                'cherry/0002.png'
            ], 5, true);
            this.animations.play('idle');
            game.add.existing(this);
        }
        return Cherry;
    })(Phaser.Sprite);
    GameJam.Cherry = Cherry;
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
    var Enemy = (function (_super) {
        __extends(Enemy, _super);
        function Enemy(game, x, y, key) {
            _super.call(this, game, x, y, key);
            this.game.physics.arcade.enableBody(this);
            this.body.bounce.y = 0.2;
            this.body.gravity.y = 300;
            this.body.collideWorldBounds = true;
            this.anchor.setTo(0.5, 0);
        }
        return Enemy;
    })(Phaser.Sprite);
    GameJam.Enemy = Enemy;
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
            this.game.physics.arcade.checkCollision.down = false;
            this.player = new GameJam.Player(this.game, 60, this.game.world.height - 150);
            this.enemies = this.game.add.group();
            this.enemies.enableBody = true;
            this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
            this.player.events.onOutOfBounds.add(this.killPlayer, this);
            this.enemies.add(new GameJam.BananaEnemy(this.game, 160, this.game.world.height - 200));
            this.enemies.add(new GameJam.Tomato(this.game, 100, this.game.world.height - 180));
            this.enemies.add(new GameJam.Onion(this.game, 200, this.game.world.height - 260));
            this.enemies.add(new GameJam.Cherry(this.game, 250, this.game.world.height - 260));
            this.enemies.add(new GameJam.Celery(this.game, 280, this.game.world.height - 260));
            this.game.add.existing(this.enemies);
            this.game.camera.follow(this.player);
        };
        Level1.prototype.killPlayer = function () {
            this.input.disabled = true;
        };
        Level1.prototype.onHit = function (damage) {
            if (!this.player.invincible) {
                this.player.health -= damage;
                this.toggleInvincible();
                this.game.time.events.add(2000, this.toggleInvincible, this);
            }
        };
        Level1.prototype.toggleInvincible = function () {
            this.player.invincible = !this.player.invincible;
        };
        Level1.prototype.playerHit = function () {
            this.onHit(1);
        };
        Level1.prototype.enemyHit = function (obj1, obj2) {
            if (obj2.hitPoints <= 0) {
                obj2.destroy();
            }
            else {
                obj2.hitPoints--;
            }
        };
        Level1.prototype.update = function () {
            this.game.physics.arcade.collide(this.player, this.blockedLayer, null, null, this);
            this.game.physics.arcade.collide(this.player, this.enemies, this.playerHit, null, this);
            this.game.physics.arcade.collide(this.player.bullets, this.enemies, this.enemyHit, null, this);
            this.game.physics.arcade.collide(this.enemies, this.blockedLayer, null, null, this);
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
var GameJam;
(function (GameJam) {
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(game, x, y) {
            this.fireRate = 100;
            this.nextFire = 0;
            _super.call(this, game, x, y, 'rockman');
            this.duration = game.time.now;
            this.game.physics.arcade.enableBody(this);
            this.body.bounce.y = 0.2;
            this.body.gravity.y = 300;
            this.checkWorldBounds = true;
            this.body.collideWorldBounds = true;
            this.cursors = this.game.input.keyboard.createCursorKeys();
            this.anchor.setTo(0.5, 0);
            this.isJumping = false;
            this.bullets = game.add.group();
            this.bullets.enableBody = true;
            this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
            this.bullets.createMultiple(50, 'bullet');
            this.bullets.setAll('checkWorldBounds', true);
            this.bullets.setAll('outOfBoundsKill', true);
            this.animations.add('idle', [
                'rockman/player/idle/0001.png',
                'rockman/player/idle/0002.png',
                'rockman/player/idle/0003.png'
            ], 10, true);
            this.animations.add('dash', [
                'rockman/player/dash/0001.png',
                'rockman/player/dash/0002.png',
                'rockman/player/dash/0003.png'
            ], 10, true, false);
            this.animations.add('jump', [
                'rockman/player/jump/0001.png',
                'rockman/player/jump/0002.png',
                'rockman/player/jump/0003.png',
                'rockman/player/jump/0004.png',
                'rockman/player/jump/0005.png',
                'rockman/player/jump/0006.png',
                'rockman/player/jump/0007.png'
            ], 10, false, false);
            this.animations.add('walk', [
                'rockman/player/walk/0003.png',
                'rockman/player/walk/0004.png',
                'rockman/player/walk/0005.png',
                'rockman/player/walk/0006.png',
                'rockman/player/walk/0007.png',
                'rockman/player/walk/0008.png',
                'rockman/player/walk/0009.png',
                'rockman/player/walk/0010.png',
                'rockman/player/walk/0011.png',
                'rockman/player/walk/0012.png'
            ], 10, true, false);
            this.animations.add('shoot', [
                'rockman/player/shoot/0001.png',
                'rockman/player/shoot/0002.png'
            ], 10, true, false);
            this.animations.add('shootjump', [
                'rockman/player/shootjump/0001.png',
                'rockman/player/shootjump/0002.png',
                'rockman/player/shootjump/0003.png',
                'rockman/player/shootjump/0004.png',
                'rockman/player/shootjump/0005.png',
                'rockman/player/shootjump/0006.png',
                'rockman/player/shootjump/0007.png'
            ], 10, false, false);
            this.animations.add('shootrun', [
                'rockman/player/shootrun/0001.png',
                'rockman/player/shootrun/0002.png',
                'rockman/player/shootrun/0003.png',
                'rockman/player/shootrun/0004.png',
                'rockman/player/shootrun/0005.png',
                'rockman/player/shootrun/0006.png',
                'rockman/player/shootrun/0007.png',
                'rockman/player/shootrun/0008.png',
                'rockman/player/shootrun/0009.png',
                'rockman/player/shootrun/0010.png'
            ], 10, true, false);
            this.animations.play('idle');
            game.add.existing(this);
        }
        Player.prototype.fire = function () {
            if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
                this.nextFire = this.game.time.now + this.fireRate;
                var bullet = this.bullets.getFirstDead();
                if (bullet === null || bullet === undefined)
                    return;
                bullet.revive();
                bullet.checkWorldBounds = true;
                bullet.outOfBoundsKill = true;
                bullet.reset(this.x, this.y);
                bullet.rotation = this.rotation;
                var bulletSpeed = this.facingRight ? 700 : -700;
                bullet.body.velocity.x = Math.cos(bullet.rotation) * bulletSpeed;
                bullet.body.velocity.y = Math.sin(bullet.rotation) * bulletSpeed;
            }
        };
        Player.prototype.isDoubleTap = function () {
        };
        Player.prototype.update = function () {
            this.body.velocity.x = 0;
            this.playerLeftRight();
            this.playerJump();
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                this.fire();
            }
        };
        Player.prototype.playerLeftRight = function () {
            if (this.cursors.left.isDown && this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                this.facingRight = false;
                this.body.velocity.x = -150;
                if (!this.isJumping)
                    this.animations.play('shootrun');
                else
                    this.animations.play('shootjump');
                if (this.scale.x === 1) {
                    this.scale.x = -1;
                }
            }
            else if (this.cursors.left.isDown) {
                this.facingRight = false;
                this.body.velocity.x = -150;
                if (!this.isJumping)
                    this.animations.play('walk');
                if (this.scale.x === 1) {
                    this.scale.x = -1;
                }
            }
            else if (this.cursors.right.isDown && this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
                this.body.velocity.x = 150;
                this.facingRight = true;
                if (!this.isJumping)
                    this.animations.play('shootrun');
                else
                    this.animations.play('shootjump');
                if (this.scale.x === -1) {
                    this.scale.x = 1;
                }
            }
            else if (this.cursors.right.isDown) {
                this.facingRight = true;
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
//# sourceMappingURL=game.js.map