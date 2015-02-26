module GameJam {
    export class BananaEnemy extends Phaser.Sprite {
        hitPoints: number;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'enemy');
            this.hitPoints = 5;
            this.game.physics.arcade.enableBody(this);
            this.body.bounce.y = 0.2;
            this.body.gravity.y = 300;
            this.body.collideWorldBounds = true;
            game.add.existing(this);
        }

    }
}