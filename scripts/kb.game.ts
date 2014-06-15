//
//  kb.game.ts
//  KBTOS
//
//  Created by Egor Chiglintsev on 14.06.14.
//  Copyright (c) 2014 Egor Chiglintsev. All rights reserved.
//

/// <reference path="kb.ts" />
/// <reference path="input/kb.input.mouse.kiwi.ts" />

module KB {
  export class Game {
    game;

    constructor() {
      this.game = new Kiwi.Game();
      this._mouse = new KB.Input.KiwiMouse(this.game.input);
    }

    public get mouse(): KB.Input.Mouse {
      return this._mouse;
    }

    private _mouse: KB.Input.KiwiMouse;
  }
}