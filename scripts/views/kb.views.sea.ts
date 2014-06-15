//
//  kb.views.sea.ts
//  KBTOS
//
//  Created by Egor Chiglintsev on 14.06.14.
//  Copyright (c) 2014 Egor Chiglintsev. All rights reserved.
//

/// <reference path="../kb.ts" />

module KB.Views {
  export class Sea extends Kiwi.Group {
    constructor(state: Kiwi.State, frame: Graphics.Rect) {
      super(state);
      this.x = frame.origin.x;
      this.y = frame.origin.y;

      var planeFrame = rect(point.zero, frame.size);

      var tintColor: KB.Graphics.Color = rgb(48,48,255);

      this.botPlane = new KB.Views.Plane(state, state.textures['sea.bottom'], planeFrame);
      this.midPlane = new KB.Views.Plane(state, state.textures['sea.top'], planeFrame);
      this.topPlane = new KB.Views.Plane(state, state.textures['sea.top'], planeFrame);

      this.botPlane.tintColor =
      this.midPlane.tintColor =
      this.topPlane.tintColor = tintColor;

      this.midPlane.alpha = 64/255;
      this.topPlane.alpha = 64/255;

      this.botPlane.scale = 3;
      this.midPlane.scale =
      this.topPlane.scale = 2;

      this.offset = point.zero;

      this.midPlaneOffset = point.zero;
      this.topPlaneOffset = point(64, 64);

      this.time = state.game.time;

      this.addChild(this.botPlane);
      this.addChild(this.midPlane);
      this.addChild(this.topPlane);
    }

    public offset: KB.Graphics.Point;

    public update() {
      var time: number = this.time.now()/1000;

      this.botPlane.offset = point(-this.offset.x, -this.offset.y);

      this.midPlane.offset = point(-this.offset.x+Math.cos(time)*8.0+this.midPlaneOffset.x,
                                   -this.offset.y+Math.sin(time*2)*2.0+this.midPlaneOffset.y);

      this.topPlane.offset = point(-this.offset.x+Math.sin(time)*2.0+this.topPlaneOffset.x,
                                   -this.offset.y+Math.cos(time)*6.0+this.topPlaneOffset.y);
    }

    private botPlane: KB.Views.Plane;
    private midPlane: KB.Views.Plane;
    private topPlane: KB.Views.Plane;

    private time: Kiwi.Time.ClockManager;

    private midPlaneOffset: KB.Graphics.Point;
    private topPlaneOffset: KB.Graphics.Point;
  }
}