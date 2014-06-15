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
    }

    public get mouse(): KB.Input.Mouse {
      if (this.game.input.mouse == undefined) {
        return undefined;
      }

      if (this._mouse == undefined) {
        this._mouse = new KB.Input.KiwiMouse(this.game.input.mouse);
      }

      return this._mouse;
    }

    private _mouse: KB.Input.KiwiMouse;
  }
}