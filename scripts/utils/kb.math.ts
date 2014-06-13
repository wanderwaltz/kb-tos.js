//
//  kb.math.ts
//  KBTOS
//
//  Created by Egor Chiglintsev on 14.06.14.
//  Copyright (c) 2014 Egor Chiglintsev. All rights reserved.
//

module KB.xMath {
  export function fmod(a: number,b: number): number {
    return Number((a - (Math.floor(a / b) * b)).toPrecision(8));
  }
}