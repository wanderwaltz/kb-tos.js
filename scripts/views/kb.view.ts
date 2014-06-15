//
//  kb.view.ts
//  KBTOS
//
//  Created by Egor Chiglintsev on 14.06.14.
//  Copyright (c) 2014 Egor Chiglintsev. All rights reserved.
//

/// <reference path="../kb.ts" />

module KB.Views {
  export class View extends Kiwi.Group {
    constructor(state: Kiwi.State) {
      super(state);
      this._gestureRecognizers = [];
    }

    public addGestureRecognizer(gesture: GestureRecognizer) {
      if (gesture.view != undefined) {
        gesture.view.removeGestureRecognizer(gesture);
      }

      gesture.view = this;
      this._gestureRecognizers.push(gesture);
    }

    public removeGestureRecognizer(gesture: GestureRecognizer) {
      var index: number = this._gestureRecognizers.indexOf(gesture);

      if (index > 0) {
        this._gestureRecognizers.splice(index, 1);
      }
      gesture.view = undefined;
    }

    public get gestureRecognizers(): GestureRecognizersArray {
      return this._gestureRecognizers;
    }

    public update() {
      this.updateGestureRecognizers();
    }

    private updateGestureRecognizers() {
      this.foreachGestureRecognizer(function (gesture: GestureRecognizer) {
        gesture.update();
      });
    }

    private foreachGestureRecognizer(callback: (gesture: GestureRecognizer)=>void) {
      this._gestureRecognizers.forEach(function (gesture, index, array) {
        callback(gesture);
      });
    }

    private _gestureRecognizers: Array<GestureRecognizer>;
  }
}