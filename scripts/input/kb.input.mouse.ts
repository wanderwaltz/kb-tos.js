//
//  kb.input.mouse.ts
//  KBTOS
//
//  Created by Egor Chiglintsev on 14.06.14.
//  Copyright (c) 2014 Egor Chiglintsev. All rights reserved.
//

/// <reference path="../kb.ts" />

module KB.Input {
  export interface Mouse {
    position: Graphics.Point;
    isDown: boolean;

    reset();
  }
}