module GameJam {
    export class Enemy extends Phaser.Sprite {
        constructor(game: Phaser.Game, x: number, y: number, key: string) {
            super(game, x, y, key);
            this.game.physics.arcade.enableBody(this);
            this.body.bounce.y = 0.2;
            this.body.gravity.y = 300;
            this.body.collideWorldBounds = true;
            this.anchor.setTo(0.5, 0);
        }
    }
}