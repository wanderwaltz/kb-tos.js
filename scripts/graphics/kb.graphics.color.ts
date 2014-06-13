//
//  kb.graphics.color.ts
//  KBTOS
//
//  Created by Egor Chiglintsev on 14.06.14.
//  Copyright (c) 2014 Egor Chiglintsev. All rights reserved.
//

module KB.Graphics {
  export class Color {
    constructor(r: number, g: number, b: number, a: number) {
      this._r = r;
      this._g = g;
      this._b = b;
      this._a = a;
    }

    public get r(): number {
      return this._r;
    }

    public get g(): number {
      return this._g;
    }

    public get b(): number {
      return this._b;
    }

    public get a(): number {
      return this._a;
    }

    private _r: number;
    private _g: number;
    private _b: number;
    private _a: number;
  }
}

function rgba(r: number, g: number, b: number, a: number): KB.Graphics.Color {
  return new KB.Graphics.Color(r,g,b,a);
}

function rgb(r: number, g: number, b: number): KB.Graphics.Color {
  return new KB.Graphics.Color(r,g,b,255);
}