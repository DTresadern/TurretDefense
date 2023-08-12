"use strict";

/* /////////////////////////////////////////////////////////////////////////////
 Turret Defense Game

 possible states:
 mainMenu
 gameplay
 victory
///////////////////////////////////////////////////////////////////////////// */

// dependencies
import {BaseClass} from '../engine/base_class.js';
import * as TDO from '../game/td_object.js';

////////////////////////////////////////////////////////////////////////////////

class dummyState {
  constructor() {
  }

  process() {
  }
}

class TurretDefenseGame {
  #engine = null;
  #input = null;

  #gameState = null;
  #timers = new Map();

  constructor() {
  }

  setTimer(name, interval) {
    this.#timers.set(name, {count: 0, max: interval});
  }

  unsetTimer(name) {
    this.#timers.delete(name);
  }

  timerEvent(name) {
    switch(name) {
      case '4 second timer':
        console.log(`timer '${name}' triggered`);
        BaseClass.spawn('testObject');
    }
  }

  draw(dt) {
  }

  fixedProcess(dt) {
  }

  processTimers(dt) {
    for (let [timerName, timer] of this.#timers) {
      timer.count += dt;
      if(timer.count >= timer.max) {
        timer.count -= timer.max;
        this.timerEvent(timerName);
      }
    }
  }

  process(dt) {
    this.processTimers(dt);
    this.processState();
  }

  processState() {
    // TODO: redirect game logic to the current state object;
    if(this.#gameState) {
      this.#gameState.process();
    }
  }

  changeState() {

  }

  start() {
    this.setTimer('4 second timer', 4.0);
  }

  init(engineInterface) {
  }
}

////////////////////////////////////////////////////////////////////////////////

export default TurretDefenseGame;
