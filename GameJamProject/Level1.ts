module GameJam {

    export class Level1 extends Phaser.State {

        background: Phaser.Sprite;
        music: Phaser.Sound;
        player: GameJam.Player;
        blockedLayer: Phaser.TilemapLayer;
        map: Phaser.Tilemap;
        backgroundlayer: Phaser.TilemapLayer;

        create() {
            this.map = this.game.add.tilemap('level1Tiles');
            this.map.addTilesetImage('tiles_spritesheet', 'gameTiles');
            this.backgroundlayer = this.map.createLayer('backgroundLayer');

            this.blockedLayer = this.map.createLayer('blockedLayer');
            this.map.setCollisionBetween(1, 100000, true, 'blockedLayer');
 
            this.backgroundlayer.resizeWorld();
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.player = new Player(this.game, 60, this.game.world.height - 150);

            this.game.camera.follow(this.player);
        }

        playerHit() {
            
        }

        update() {
            this.game.physics.arcade.collide(this.player, this.blockedLayer, this.playerHit, null, this);
        }
    }

} 