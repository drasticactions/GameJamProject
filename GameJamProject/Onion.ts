module GameJam {
    export class Onion extends Phaser.Sprite {
        hitPoints: number;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'rockman');
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
    }
}