module GameJam {
    export class DialogTest extends Phaser.State {
        characterSprites: any[];
        json: any;
        waiting: boolean;
        index: number;
        text: Phaser.Text;
        characterName: Phaser.Text;
        line: string;
        dialogIndex: number;
        create() {
            this.index = 0;
            this.dialogIndex = 0;
            this.waiting = false;
            this.characterSprites = [];
            this.json = this.game.cache.getJSON('dialog1');
            for (var i = 0; i < this.json.characters.length; i++) {
                var positionX = this.json.characters[i].position === "left" ? -600 : 300;
                var sprite = this.add.sprite(this.world.centerX + positionX, this.world.centerY - 100, this.json.characters[i].image);
                this.characterSprites[i] = sprite;
            }
            this.characterName = this.game.add.text(32, 200, '', { font: "10pt \"Lucida Console\"", fill: "#fff", stroke: "#000", strokeThickness: 2, wordWrap: true, wordWrapWidth: 350 });
            this.text = this.game.add.text(32, 220, '', { font: "15pt \"Lucida Console\"", fill: "#fff", stroke: "#000", strokeThickness: 2, wordWrap: true, wordWrapWidth: 350 });
            this.input.onDown.add(this.nextScene, this);

        }

        nextScene() {
            if (this.index <= this.json.script.length - 1) {
                this.waiting = false;
            }
        }

        update() {
            if (!this.waiting) {
                var dialog = this.json.script[this.index];
                var sprite = this.characterSprites[dialog.id];
                if (dialog.new) {
                    var positionX = this.json.characters[dialog.id].position === "left" ? -300 : -70;
                    this.add.tween(sprite).to({ x: this.world.centerX + positionX}, 200, Phaser.Easing.Back.Out, true, 200);
                }
                this.text.setText(dialog.text);
                this.characterName.setText(this.json.characters[dialog.id].name);
                this.waiting = true;
                this.index++;
            }
        }
    }
}