"use strict";

/* /////////////////////////////////////////////////////////////////////////////
 Objects
 register classes with classFactory if they are to be instanced
///////////////////////////////////////////////////////////////////////////// */

// dependencies
import {classFactory, BaseClass} from '../engine/base_class.js';

////////////////////////////////////////////////////////////////////////////////

export class TDObject extends BaseClass {
  doRender = true;
  doProcess = true;
  hidden = false;
}

export const testObject = classFactory.register(
  class testObject extends TDObject {
    initialLifespan = 3.0;
    lifespan = 3.0;

    constructor() {
      // this.initialLifespan = 1.0;
      super();
      this.x = Math.random()*512 - 256;
      this.y = Math.random()*128 - 128;
      // this.lifespan = 1.0;
      // console.log(`${this.id} instanced`, this.lifespan, this.initialLifespan);
    }

    fixedProcess(dt) {
      super.fixedProcess(dt);
      const newX = this.x + 30*dt;
      const newY = this.y - 100*dt;

      if(newX < this.x) {
        console.log('x anomaly');
      }
      if(newY > this.y) {
        console.log('y anomaly');
      }
      this.x = newX;
      this.y = newY;
      // console.log(`lifespan ${this.lifespan}`);
    }
  }
);

export const Moveable = classFactory.register(
  class Moveable extends TDObject {

  }
);

export const Enemy = classFactory.register(
  class Enemy extends Moveable {

  }
);

export const Particle = classFactory.register(
  class Particle extends Moveable {

  }
);

export const Projectile = classFactory.register(
  class Projectile extends Moveable {

  }
);

export const Stationary = classFactory.register(
  class Stationary extends TDObject {

  }
);

export const Placeable = classFactory.register(
  class Placeable extends Stationary {

  }
);

export const Tower = classFactory.register(
  class Tower extends Placeable {

  }
);

export const Turret = classFactory.register(
  class Tower extends Stationary {

  }
);

////////////////////////////////////////////////////////////////////////////////
