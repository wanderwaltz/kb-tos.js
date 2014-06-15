//
//  kb.gesture.recognizer.ts
//  KBTOS
//
//  Created by Egor Chiglintsev on 14.06.14.
//  Copyright (c) 2014 Egor Chiglintsev. All rights reserved.
//

/// <reference path="../kb.ts" />

module KB.Views {
  export class ClickGestureRecognizer extends GestureRecognizer {
    constructor(mouse: Input.Mouse) {
      super(mouse);
    }

    public updateMouse(mouse: Input.Mouse) {
      if (mouse.isDown) {
        this._clickLocation = mouse.position;
        this.dispatchCallback();
        mouse.reset();
      }
      else {
        this._clickLocation = undefined;
      }
    }

    public locationInView(view: View) {
      return this._clickLocation;
    }

    private _clickLocation: Graphics.Point;
  }
}