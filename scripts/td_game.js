"use strict";

/* /////////////////////////////////////////////////////////////////////////////
 Turret Defense Game

 possible states:
 mainMenu
 gameplay
 victory
///////////////////////////////////////////////////////////////////////////// */

// dependencies

////////////////////////////////////////////////////////////////////////////////

class dummyState {
  constructor() {

  }

  process() {
    console.log(`${this.constructor.name} state process`)
  }
}

class TurretDefenseGame {
  #gameState = null;
  constructor() {
    console.log(`${this.constructor.name} created`);
  }

  draw() {
    console.log('game draw');
  }

  process() {
    console.log('game process');
    this.processState();
  }

  processState() {
    // process game logic here
    // food for thought: redirect game logic to the current state object;
    if(this.#gameState) {
      this.#gameState.process();
    }
  }

  changeState() {

  }

  init() {
    this.#gameState = new dummyState();
    console.log(`${this.constructor.name} init`);
  }
}

////////////////////////////////////////////////////////////////////////////////

export default TurretDefenseGame;
