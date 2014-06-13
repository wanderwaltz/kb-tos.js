/**
 *  @module KB
 */
var KB;
(function(KB) {
    var Game = (function() {
        function Game() {
            this.game = new Kiwi.Game();
        }
        return Game;
    })();
    KB.Game = Game;
})(KB || (KB = {}));