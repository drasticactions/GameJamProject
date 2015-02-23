module GameJam {

    export class MainMenu extends Phaser.State {

        background: Phaser.Sprite;
        logo: Phaser.Sprite;

        create() {

            // TODO: Turn into real menu, instead of just a click through.
            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);

            this.add.tween(this.logo).to({ y: 125 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);

            this.input.onDown.addOnce(this.fadeOut, this);

        }

        fadeOut() {

            var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);

            tween.onComplete.add(this.startGame, this);

        }

        startGame() {

            this.game.state.start('DialogTest', true, false);

        }

    }

}