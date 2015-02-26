module GameJam {
    import BitmapText = PIXI.BitmapText;

    export class PausePanel extends Phaser.Group {
        pauseText: BitmapText;
        panel: any;
        btnPlay: Phaser.Button;
        constructor(game: Phaser.Game, parent?: any) {
            super(game, parent);
            this.panel = this.create(this.game.width / 2, 10, 'panel');
            this.pauseText = this.game.add.bitmapText(100, 20, "kenpixelblocks", 'Game paused', 24);
            this.add(this.pauseText);
            this.btnPlay = this.game.add.button(20, 20, 'btnPlay', function () {
                    this.game.state.getCurrentState().playGame();
                }
                , this);
            this.add(this.btnPlay);

            // Place it out of bounds
            this.x = 0;
            this.y = -100;
        }

        show() {
            this.game.add.tween(this).to({ y: 0 }, 500, Phaser.Easing.Bounce.Out, true);
        }

        hide() {
            this.game.add.tween(this).to({ y: -100 }, 200, Phaser.Easing.Linear.None, true);
        }
    }
}