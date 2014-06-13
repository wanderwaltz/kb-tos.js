//
//  kb.graphics.geometry.ts
//  KBTOS
//
//  Created by Egor Chiglintsev on 14.06.14.
//  Copyright (c) 2014 Egor Chiglintsev. All rights reserved.
//

////////////////////////////////////////////////////////////////////////////////////////////////////
// KB.Graphics.Geometry
////////////////////////////////////////////////////////////////////////////////////////////////////
module KB.Graphics {
  export class Point {
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    public copy(): Point {
      return new Point(this.x, this.y);
    }

    public x: number;
    public y: number;
  }



  export class Size {
    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
    }

    public copy(): Size {
      return new Size(this.width, this.height);
    }

    public width: number;
    public height: number;
  }



  export class Rect {
    constructor(origin: Point, size: Size) {
      this._origin = origin.copy();
      this._size = size.copy();
    }

    public copy(): Rect {
      return new Rect(this._origin, this._size);
    }

    public get origin(): Point {
      return this._origin;
    }

    public get size(): Size {
      return this._size;
    }

    public set origin(o: Point) {
      this._origin = o.copy();
    }

    public set size(s: Size) {
      this._size = s.copy();
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
    zero: Size;
  }


  export interface RectFactory {
    (origin: Point, size: Size): Rect;
    empty: Rect;
    zero: Rect;
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////
// KB.Graphics.Point factory
////////////////////////////////////////////////////////////////////////////////////////////////////
var point = <KB.Graphics.PointFactory>function(x: number, y: number): KB.Graphics.Point {
  return new KB.Graphics.Point(x, y);
}

point.zero = new KB.Graphics.Point(0,0);
////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////////
// KB.Graphics.Size factory
////////////////////////////////////////////////////////////////////////////////////////////////////
var size = <KB.Graphics.SizeFactory>function(width: number, height: number): KB.Graphics.Size {
  return new KB.Graphics.Size(width, height);
}

size.zero = new KB.Graphics.Size(0,0);
////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////////
// KB.Graphics.Rect factory
////////////////////////////////////////////////////////////////////////////////////////////////////
var rect = <KB.Graphics.RectFactory>function(origin: KB.Graphics.Point,
                                             size: KB.Graphics.Size): KB.Graphics.Rect {
  return new KB.Graphics.Rect(origin, size);
}

rect.empty = new KB.Graphics.Rect(point.zero, size.zero);
rect.zero = rect.empty;
////////////////////////////////////////////////////////////////////////////////////////////////////