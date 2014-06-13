/// <reference path="kb.views.plane.ts" />

module KB.Views {
  export class Sea extends Kiwi.Group {
    constructor(state: Kiwi.State, x: number, y: number) {
      super(state);
      this.x = x;
      this.y = y;
      
      this.botPlane = new KB.Views.Plane(state, state.textures['sea.bottom'], 0, 0, 800, 600);
      this.midPlane = new KB.Views.Plane(state, state.textures['sea.top'], 0, 0, 800, 600);
      this.topPlane = new KB.Views.Plane(state, state.textures['sea.top'], 0, 0, 800, 600);

      this.midPlane.alpha = 64/255;
      this.topPlane.alpha = 64/255;

      this.botPlane.scale = 2;
      this.midPlane.scale = 2;
      this.topPlane.scale = 2;

      this.offsetX = 0;
      this.offsetY = 0;

      this.midPlaneOffsetX = 0;
      this.midPlaneOffsetY = 0;
      this.topPlaneOffsetX = 64;
      this.topPlaneOffsetY = 64;

      this.time = state.game.time;

      this.addChild(this.botPlane);
      this.addChild(this.midPlane);
      this.addChild(this.topPlane);
    }

    public offsetX: number;
    public offsetY: number;

    public update() {
      var time: number = this.time.now()/1000;

      this.botPlane.offsetX = this.offsetX;
      this.botPlane.offsetY = this.offsetY;

      this.midPlane.offsetX = this.offsetX+Math.cos(time)*8.0+this.midPlaneOffsetX;
      this.midPlane.offsetY = this.offsetY+Math.sin(time*2)*2.0+this.midPlaneOffsetY;

      this.topPlane.offsetX = this.offsetX+Math.sin(time)*2.0+this.topPlaneOffsetX;
      this.topPlane.offsetY = this.offsetY+Math.cos(time)*6.0+this.topPlaneOffsetY;
    }

    private botPlane: KB.Views.Plane;
    private midPlane: KB.Views.Plane;
    private topPlane: KB.Views.Plane;

    private time: Kiwi.Time.ClockManager;

    private midPlaneOffsetX: number;
    private midPlaneOffsetY: number;
    private topPlaneOffsetX: number;
    private topPlaneOffsetY: number;
  }
}