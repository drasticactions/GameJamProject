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
            this.game.physics.arcade.checkCollision.down = false;
            this.player = new GameJam.Player(this.game, 60, this.game.world.height - 150);
            this.enemies = this.game.add.group();
            this.enemies.enableBody = true;
            this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
            this.player.events.onOutOfBounds.add(this.killPlayer, this);
            this.enemies.add(new GameJam.BananaEnemy(this.game, 160, this.game.world.height - 150));
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
