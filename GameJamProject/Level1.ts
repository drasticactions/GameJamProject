module GameJam {

    export class Level1 extends Phaser.State {

        background: Phaser.Sprite;
        music: Phaser.Sound;

        create() {

            this.background = this.add.sprite(0, 0, 'level1');
            // TODO: Add Player
            //this.player = new Ninja(this.game, 130, 284);
        }

    }

} 