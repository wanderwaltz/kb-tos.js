/**
 *  @module KB
 *  @submodule Views
 */
var KB;
(function(KB) {
    (function(Views) {
        var Sea = (function() {
            function Sea() {
                this.protoype = new Kiwi.Group();
                this.seaTest = new Kiwi.GameObjects.StaticImage(this, this.textures['sea.bottom'], 0, 0, true);
                this.addChild(this.seaTest);
            };
            return Sea;
        })();
    })(KB.Views || (KB.Views = {}));
})(KB || (KB = {}));