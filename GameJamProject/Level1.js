var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var GameJam;
(function (GameJam) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            _super.apply(this, arguments);
        }
        Level1.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'level1');
            // TODO: Add Player
            //this.player = new Ninja(this.game, 130, 284);
        };
        return Level1;
    })(Phaser.State);
    GameJam.Level1 = Level1;
})(GameJam || (GameJam = {}));
//# sourceMappingURL=Level1.js.map