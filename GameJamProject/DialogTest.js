var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameJam;
(function (GameJam) {
    var DialogTest = (function (_super) {
        __extends(DialogTest, _super);
        function DialogTest() {
            _super.apply(this, arguments);
        }
        DialogTest.prototype.create = function () {
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
        };
        DialogTest.prototype.nextScene = function () {
            if (this.index <= this.json.script.length - 1) {
                this.waiting = false;
            }
        };
        DialogTest.prototype.update = function () {
            if (!this.waiting) {
                var dialog = this.json.script[this.index];
                var sprite = this.characterSprites[dialog.id];
                if (dialog.new) {
                    var positionX = this.json.characters[dialog.id].position === "left" ? -300 : -70;
                    this.add.tween(sprite).to({ x: this.world.centerX + positionX }, 200, Phaser.Easing.Back.Out, true, 200);
                }
                this.text.setText(dialog.text);
                this.characterName.setText(this.json.characters[dialog.id].name);
                this.waiting = true;
                this.index++;
            }
        };
        return DialogTest;
    })(Phaser.State);
    GameJam.DialogTest = DialogTest;
})(GameJam || (GameJam = {}));
