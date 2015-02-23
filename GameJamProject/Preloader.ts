module GameJam {

    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;

        preload() {
 
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(50, 125, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);
 
            //  Load our actual games assets
            this.load.image('logo', 'assets/logo.png');
            this.load.image('ground', 'assets/platform.png');
            this.load.image('captain', 'assets/captain/01.png');
            this.load.image('love', 'assets/love/01.png');

            // Load JSON Sprite Atlas
            this.load.atlasJSONHash('rockman', 'sample.png', 'sample.json');
            this.game.load.json('dialog1', 'assets/dialog/level1/scene1.json');
            this.load.tilemap('level1Tiles', 'assets/tileset/level1.json', null, Phaser.Tilemap.TILED_JSON);

            this.load.image('gameTiles', 'assets/tiles_spritesheet.png');
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