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
}

export const testObject = classFactory.register(
  class testObject extends TDObject {
    lifespan = 1.0;
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
