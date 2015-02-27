module GameJam {

    export class Level1 extends Phaser.State {

        background: Phaser.Sprite;
        music: Phaser.Sound;
        player: GameJam.Player;
        blockedLayer: Phaser.TilemapLayer;
        map: Phaser.Tilemap;
        backgroundlayer: Phaser.TilemapLayer;
        enemies: Phaser.Group;
        create() {
            this.map = this.game.add.tilemap('level1Tiles');
            this.map.addTilesetImage('tiles_spritesheet', 'gameTiles');
            this.backgroundlayer = this.map.createLayer('backgroundLayer');

            this.blockedLayer = this.map.createLayer('blockedLayer');
            this.map.setCollisionBetween(1, 100000, true, 'blockedLayer');
 
            this.backgroundlayer.resizeWorld();
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.checkCollision.down = false;

            this.player = new Player(this.game, 60, this.game.world.height - 150);
            this.enemies = this.game.add.group();
            this.enemies.enableBody = true;
            this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
            this.player.events.onOutOfBounds.add(this.killPlayer, this);
            this.enemies.add(new BananaEnemy(this.game, 160, this.game.world.height - 200));
            this.enemies.add(new Tomato(this.game, 100, this.game.world.height - 180));
            this.enemies.add(new Onion(this.game, 200, this.game.world.height - 260));
            this.enemies.add(new Cherry(this.game, 250, this.game.world.height - 260));
            this.enemies.add(new Celery(this.game, 280, this.game.world.height - 260));
            this.game.add.existing(this.enemies);

            this.game.camera.follow(this.player);
        }

        killPlayer() {
            // TODO: Show game over screen. Stop Movement.
            this.input.disabled = true;
        }

        onHit(damage) {
            if (!this.player.invincible) { //We only damage the player if not invincible
                this.player.health -= damage;

                //we toggle invincibility
                this.toggleInvincible(); 
      
                //and then we add a timer to restore the player to a vulnerable state
                this.game.time.events.add(2000, this.toggleInvincible, this);
            }
        }

        toggleInvincible() {
            this.player.invincible = !this.player.invincible;
        }

        playerHit() {
            this.onHit(1);
        }

        enemyHit(obj1, obj2: BananaEnemy) {
            //obj1.destroy();
            if (obj2.hitPoints <= 0) {
                obj2.destroy();
            } else {
                obj2.hitPoints--;
            }
        }

        update() {
            this.game.physics.arcade.collide(this.player, this.blockedLayer, null, null, this);
            this.game.physics.arcade.collide(this.player, this.enemies, this.playerHit, null, this);
            this.game.physics.arcade.collide(this.player.bullets, this.enemies, this.enemyHit, null, this);
            this.game.physics.arcade.collide(this.enemies, this.blockedLayer, null, null, this);
        }
    }

} 