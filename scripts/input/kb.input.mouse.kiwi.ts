//
//  kb.input.mouse.ts
//  KBTOS
//
//  Created by Egor Chiglintsev on 14.06.14.
//  Copyright (c) 2014 Egor Chiglintsev. All rights reserved.
//

/// <reference path="../kiwi/src/Kiwi.ts" />
/// <reference path="../kiwi/src/input/Mouse.ts" />

module KB.Input {
  export class KiwiMouse implements KB.Input.Mouse {
    constructor(impl: Kiwi.Input.Mouse) {
      this._impl = impl;
    }

    public get position(): Graphics.Point {
      return point(this._impl.x, this._impl.y);
    }

    public get isDown(): boolean {
      return this._impl.isDown;
    }

    public reset() {
      this._impl.reset();
    }

    private _impl: Kiwi.Input.Mouse;
  }
}