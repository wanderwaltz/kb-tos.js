//
//  kb.image.ts
//  KBTOS
//
//  Created by Egor Chiglintsev on 14.06.14.
//  Copyright (c) 2014 Egor Chiglintsev. All rights reserved.
//

/// <reference path="../kb.ts" />

module KB.Image {
  export class Tintable {
    constructor(image, color: KB.Graphics.Color) {
      this._rgbks = this.generateRGBKs(image);
      this._width = image.width;
      this._height = image.height;
      this.tintColor = color;
    }

    public get width(): number {
      return this._width;
    }

    public get height(): number {
      return this._height;
    }

    public get image() {
      return this._tinted;
    }

    public get tintColor(): KB.Graphics.Color {
      return this._tintColor;
    }

    public set tintColor(color: KB.Graphics.Color) {
      this._tintColor = color;
      this._tinted = this.generateTintImage(this._rgbks, color.r, color.g, color.b);
    }

    private generateTintImage(rgbks, red, green, blue) {
        var buff = document.createElement("canvas");
        buff.width  = this.width;
        buff.height = this.height;

        var ctx  = buff.getContext("2d");

        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'copy';
        ctx.drawImage(rgbks[3], 0, 0);

        ctx.globalCompositeOperation = 'lighter';
        if (red > 0) {
            ctx.globalAlpha = red/255.0;
            ctx.drawImage(rgbks[0], 0, 0);
        }
        if (green > 0) {
            ctx.globalAlpha = green/255.0;
            ctx.drawImage(rgbks[1], 0, 0);
        }
        if (blue > 0) {
            ctx.globalAlpha = blue/255.0;
            ctx.drawImage(rgbks[2], 0, 0);
        }

        return buff;
    }

    private generateRGBKs(img) {
      var w = img.width;
      var h = img.height;
      var rgbks = [];

      var canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;

      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      var pixels = ctx.getImageData(0, 0, w, h).data;

      // 4 is used to ask for 3 images: red, green, blue and
      // black in that order.
      for (var rgbI = 0; rgbI < 4; rgbI++) {
        var canvas = document.createElement("canvas");
        canvas.width  = w;
        canvas.height = h;

        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        var to = ctx.getImageData(0, 0, w, h);
        var toData = to.data;

        for (var i = 0, len = pixels.length; i < len; i += 4) {
          toData[i  ] = (rgbI === 0) ? pixels[i  ] : 0;
          toData[i+1] = (rgbI === 1) ? pixels[i+1] : 0;
          toData[i+2] = (rgbI === 2) ? pixels[i+2] : 0;
          toData[i+3] =                pixels[i+3];
        }
        ctx.putImageData(to, 0, 0);
        rgbks.push(canvas);
      }

      return rgbks;
    }

    private _tintColor: KB.Graphics.Color;
    private _tinted;
    private _width: number;
    private _height: number;
    private _rgbks;
  }
}