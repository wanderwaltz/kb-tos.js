//
//  kb.views.plane.ts
//  KBTOS
//
//  Created by Egor Chiglintsev on 14.06.14.
//  Copyright (c) 2014 Egor Chiglintsev. All rights reserved.
//

/// <reference path="../kb.ts" />

module KB.Views {
  export class Plane extends Kiwi.Entity {

    constructor(state: Kiwi.State, atlas: Kiwi.Textures.TextureAtlas, frame: KB.Graphics.Rect) {
      super(state, frame.origin.x, frame.origin.y);

      //Texture atlas error check.
      if (typeof atlas == "undefined") {
        console.error('A Texture Atlas was not passed when instantiating a new KB.Views.Plane.');
        this.willRender = false;
        this.active = false;
        return;
      }

      this.atlas = atlas;
      this.cellIndex = this.atlas.cellIndex;
      this.width = frame.size.width;
      this.height = frame.size.height;
      this.alpha = 1.0;
      this.offset = point.zero;
      this.scale = 1;
      this.tintColor = rgb(255, 255, 255);

      this.box = this.components.add(new Kiwi.Components.Box(this, frame.origin.x, frame.origin.y, this.width, this.height));
    }


    public objType(): string {
      return "Views.Plane";
    }

    public box: Kiwi.Components.Box;

    public offset: KB.Graphics.Point;
    public scale: number;

    public get tintColor(): KB.Graphics.Color {
      return this._tintColor;
    }


    public set tintColor(color: KB.Graphics.Color) {
      this._tintColor = color;

      if (this._tintedImage == undefined) {
        this._tintedImage = new KB.Image.Tintable(this.atlas.image, color);
        return;
      }

      this._tintedImage.tintColor = color;
    }


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

      var ti: KB.Image.Tintable = this._tintedImage;

      var cw = ti.width * this.scale;
      var ch = ti.height * this.scale;

      var ox = xMath.fmod(this.offset.x, cw);
      var oy = xMath.fmod(this.offset.y, ch);

      var tilesX: number = Math.ceil(this.width/cw)+1;
      var tilesY: number = Math.ceil(this.height/ch)+1;

      for (var y: number = 0; y < tilesY; ++y) {
        for (var x: number = 0; x < tilesX; ++x) {
          ctx.drawImage(ti.image, 0, 0, ti.width, ti.height,
            -t.rotPointX+x*cw-ox, -t.rotPointY+y*ch-oy, cw, ch);
        }
      }

      ctx.restore();
    }

    private _tintedImage: KB.Image.Tintable;
    private _tintColor: KB.Graphics.Color;
  }
}