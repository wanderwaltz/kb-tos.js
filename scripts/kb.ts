//
//  kb.ts
//  KBTOS
//
//  Created by Egor Chiglintsev on 14.06.14.
//  Copyright (c) 2014 Egor Chiglintsev. All rights reserved.
//

/// <reference path="kiwi/src/Kiwi.ts" />

/// <reference path="kb.constants.ts" />

/// <reference path="graphics/kb.graphics.geometry.ts" />
/// <reference path="graphics/kb.graphics.color.ts" />

/// <reference path="input/kb.input.mouse.ts" />

/// <reference path="utils/kb.math.ts" />
/// <reference path="utils/kb.image.ts" />

/// <reference path="views/kb.views.plane.ts" />
/// <reference path="views/kb.views.sea.ts" />
/// <reference path="kb.game.ts" />

var myState = new Kiwi.State('myState');
var loadingState = new Kiwi.State('loadingState');
var preloader = new Kiwi.State('preloader');


myState.preload = function() {
    Kiwi.State.prototype.preload.call(this);
}


myState.create = function() {
    this.seaPlane = new KB.Views.Sea(this, rect(point.zero, KB.Constants.GAME_SIZE));

    Kiwi.State.prototype.create.call(this);

    this.addChild(this.seaPlane);
}


myState.update = function() {
    Kiwi.State.prototype.update.call(this);

    if (kb.mouse.isDown) {
        this.seaPlane.offset = kb.mouse.position;
    }
}


//////////////////////////////////////////////////////
//LOADING ASSETS
preloader.preload = function() {
    Kiwi.State.prototype.preload.call(this);
    this.addImage('loadingImage', 'loadingImage.png', true);
}


preloader.create = function() {
    Kiwi.State.prototype.create.call(this);

    this.game.stage.resize(KB.Constants.GAME_SIZE.width,
                           KB.Constants.GAME_SIZE.height);

    this.game.states.switchState('loadingState');
}


loadingState.preload = function() {
    Kiwi.State.prototype.preload.call(this);

    this.game.states.rebuildLibraries();
    this.game.stage.color = 'E0EDF1';
    this.logo = new Kiwi.GameObjects.StaticImage(this, this.textures['loadingImage'], 150, 50);

    this.addChild(this.logo);

    this.logo.alpha = 0;

    this.tweenIn = this.game.tweens.create(this.logo);

    this.tweenIn.to({
        alpha: 1
    }, 1000, Kiwi.Animations.Tweens.Easing.Linear.None, false);

    this.tweenIn.start();

    ////////////////
    //ASSETS TO LOAD
    this.addImage('sea.bottom', 'resources/graphics/sea/kb.textures.sea.0.png');
    this.addImage('sea.top', 'resources/graphics/sea/kb.textures.sea.1.png');

}


loadingState.update = function() {
    Kiwi.State.prototype.update.call(this);
}


loadingState.create = function() {
    Kiwi.State.prototype.create.call(this);
    console.log("inside create of loadingState");

    this.tweenOut = this.game.tweens.create(this.logo);

    this.tweenOut.to({
        alpha: 0
    }, 1000, Kiwi.Animations.Tweens.Easing.Linear.None, false);

    this.tweenOut.onComplete(this.switchToMain, this);
    this.tweenOut.start();

}

loadingState['switchToMain'] = function() {
    this.game.states.switchState('myState');
}

var kb = new KB.Game();

kb.game.states.addState(myState);
kb.game.states.addState(loadingState);
kb.game.states.addState(preloader);
kb.game.states.switchState('preloader');