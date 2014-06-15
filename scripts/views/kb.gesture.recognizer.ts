//
//  kb.gesture.recognizer.ts
//  KBTOS
//
//  Created by Egor Chiglintsev on 14.06.14.
//  Copyright (c) 2014 Egor Chiglintsev. All rights reserved.
//

/// <reference path="../kb.ts" />

module KB.Views {

  export interface GestureRecognizerCallback {
    (gesture: GestureRecognizer);
  }

  export interface GestureRecognizersArray {
    [index: number]: GestureRecognizer;
  }

  export class GestureRecognizer {
    constructor(mouse: Input.Mouse) {
      this.mouse = mouse;
    }

    public view: KB.Views.View;
    public callback: GestureRecognizerCallback;

    public update() {
      this.updateMouse(this.mouse);
    }

    public updateMouse(mouse: Input.Mouse) {

    }

    public locationInView(view: View): Graphics.Point {
      return undefined;
    }

    public dispatchCallback() {
      if (this.callback == undefined) {
        return;
      }

      this.callback(this);
    }

    private mouse: KB.Input.Mouse;
  }
}