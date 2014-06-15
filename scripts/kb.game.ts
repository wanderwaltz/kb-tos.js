//
//  kb.game.ts
//  KBTOS
//
//  Created by Egor Chiglintsev on 14.06.14.
//  Copyright (c) 2014 Egor Chiglintsev. All rights reserved.
//

/// <reference path="kb.ts" />
module KB {
  export class Game {
    game;

    constructor() {
      this.game = new Kiwi.Game();
    }
  }
}