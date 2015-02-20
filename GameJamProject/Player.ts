module GameJam {

    export class Player extends Phaser.Sprite {


        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'rockman');
            this.game.physics.arcade.enableBody(this);
            this.anchor.setTo(0.5, 0);
            this.isJumping = false;
            this.animations.add('idle',[
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

        update() {

            this.body.velocity.x = 0;

            // TODO: Add logic for actually handling jumping.
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                //this.isJumping = true;
                //this.body.velocity.y = -150;
                //this.animations.play('jump');
            }


            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {

                this.body.velocity.x = -150;
                this.animations.play('walk');

                if (this.scale.x === 1) {
                    this.scale.x = -1;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {

                this.body.velocity.x = 150;
                this.animations.play('walk');

                if (this.scale.x === -1) {
                    this.scale.x = 1;
                }
            }
            else {
                this.animations.play('idle');
            }

        }

        isDashing: boolean;
        isJumping: boolean;
    }

}