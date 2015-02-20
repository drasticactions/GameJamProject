module GameJam {

    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;

        preload() {
 
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(50, 125, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
 
            //  Load our actual games assets
            this.load.image('logo', 'assets/logo.png');

            // Load JSON Sprite Atlas
            this.load.atlasJSONHash('rockman', 'sample.png', 'sample.json');
        }

        create() {

            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);

        }

        startMainMenu() {

            this.game.state.start('MainMenu', true, false);

        }

    }

}