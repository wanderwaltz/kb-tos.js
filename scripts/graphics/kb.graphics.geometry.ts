//
//  kb.graphics.geometry.ts
//  KBTOS
//
//  Created by Egor Chiglintsev on 14.06.14.
//  Copyright (c) 2014 Egor Chiglintsev. All rights reserved.
//

module KB.Graphics {
  export class Point {
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    public x: number;
    public y: number;
  }

  export class Size {
    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
    }

    public width: number;
    public height: number;
  }


  export class Rect {
    constructor(origin: Point, size: Size) {
      this._origin = new Point(origin.x, origin.y);
      this._size = new Size(size.width, size.height);
    }

    public get origin(): Point {
      return this._origin;
    }

    public get size(): Size {
      return this._size;
    }

    public set origin(o: Point) {
      this._origin = new Point(o.x, o.y);
    }

    public set size(s: Size) {
      this._size = new Size(s.width, s.height);
    }

    private _origin: Point;
    private _size: Size;
  }

  export interface PointFactory {
    (x: number, y: number): Point;
    zero: Point;
  }

  export interface SizeFactory {
    (width: number, height: number): Size;
  }

  export interface RectFactory {
    (origin: Point, size: Size): Rect;
  }
}

var point = <KB.Graphics.PointFactory>function(x: number, y: number): KB.Graphics.Point {
  return new KB.Graphics.Point(x, y);
}

point.zero = new KB.Graphics.Point(0,0);



var size = <KB.Graphics.SizeFactory>function(width: number, height: number): KB.Graphics.Size {
  return new KB.Graphics.Size(width, height);
}


var rect = <KB.Graphics.RectFactory>function(origin: KB.Graphics.Point, size: KB.Graphics.Size): KB.Graphics.Rect {
  return new KB.Graphics.Rect(origin, size);
}