/// <reference path="../kiwi/src/Kiwi.ts" />
/// <reference path="../utils/kb.math.ts" />

module KB.Views {
  export class Plane extends Kiwi.Entity {

    constructor(state: Kiwi.State, atlas: Kiwi.Textures.TextureAtlas,
      x: number = 0, y: number = 0, width: number = 200, height: number = 200) {
      super(state, x, y);

      //Texture atlas error check.
      if (typeof atlas == "undefined") {
        console.error('A Texture Atlas was not passed when instantiating a new KB.Views.Plane.');
        this.willRender = false;
        this.active = false;
        return;
      }

      this.atlas = atlas;
      this.cellIndex = this.atlas.cellIndex;
      this.width = width;
      this.height = height;
      this.alpha = 1.0;
      this.offsetX = 0;
      this.offsetY = 0;
      this.scale = 1;

      this.box = this.components.add(new Kiwi.Components.Box(this, x, y, this.width, this.height));
    }


    public objType(): string {
      return "Views.Plane";
    }

    public box: Kiwi.Components.Box;

    public alpha: number;
    public offsetX: number;
    public offsetY: number;
    public scale: number;

    public render(camera: Kiwi.Camera) {

      if (this.alpha <= 0 || !this.visible) {
        return;
      }

      var ctx: CanvasRenderingContext2D = this.game.stage.ctx;
      ctx.save();

      ctx.globalAlpha = this.alpha;

      //get entity/view matrix
      var t: Kiwi.Geom.Transform = this.transform;
      var m: Kiwi.Geom.Matrix = t.getConcatenatedMatrix();

      var ct: Kiwi.Geom.Transform = camera.transform;

      ctx.transform(m.a, m.b, m.c, m.d, m.tx + t.rotPointX - ct.rotPointX, m.ty + t.rotPointY - ct.rotPointY);

      ctx.beginPath();
      ctx.rect(0, 0, this.width, this.height);
      ctx.clip();

      var cell = this.atlas.cells[this.cellIndex];

      var cw = cell.w * this.scale;
      var ch = cell.h * this.scale;

      var ox = xMath.fmod(this.offsetX, cw);
      var oy = xMath.fmod(this.offsetY, ch);

      var tilesX: number = Math.ceil(this.width/cell.w)+1;
      var tilesY: number = Math.ceil(this.height/cell.h)+1;

      for (var y: number = 0; y < tilesY; ++y) {
        for (var x: number = 0; x < tilesX; ++x) {
          ctx.drawImage(this.atlas.image, cell.x, cell.y, cell.w, cell.h,
            -t.rotPointX+x*cw-ox, -t.rotPointY+y*ch-oy, cw, ch);
        }
      }

      ctx.restore();
    }
  }
}