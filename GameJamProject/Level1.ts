module GameJam {

    export class Level1 extends Phaser.State {

        background: Phaser.Sprite;
        music: Phaser.Sound;
        player: GameJam.Player;

        create() {
            // TODO: Add Player
            this.player = new Player(this.game, 60, 200);
        }

    }

} 