module GameJam {
    export class Tomato extends Phaser.Sprite {
        hitPoints: number;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'rockman');
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

    }
}