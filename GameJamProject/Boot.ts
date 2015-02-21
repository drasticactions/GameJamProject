module GameJam {

    export class Boot extends Phaser.State {

        preload() {

            this.load.image('preloadBar', 'assets/loader.png');

        }

        create() {
 
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;
 
            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;

            if (this.game.device.desktop) {
                //  If you have any desktop specific settings, they can go in here
                //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            }
            else {
                //  Same goes for mobile settings.
            }
            //Assigning Up, Down, Left and Right to a variable
            var arrow = this.game.input.keyboard.createCursorKeys();
            //This will stop the arrow keys from scrolling the page
            this.game.input.keyboard.addKeyCapture(arrow);
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.state.start('Preloader', true, false);

        }

    }

}