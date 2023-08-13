"use strict";

/* /////////////////////////////////////////////////////////////////////////////
 maybe make this a general purpose object manager / class & instance manager with extendable base class
 Object
 Thing
 Entity
 Actor
 Thingamajig
 Doohickey
 Gizmo
 Whatchamacallit
 Doodad
 Inanimatron
 Automaton
 Atom
///////////////////////////////////////////////////////////////////////////// */

// dependencies

////////////////////////////////////////////////////////////////////////////////

export const classFactory = (() => {
  // classFactory holds a mapping of defined classes so that we can instance them dynamically or by string reference
  const classMap = new Map();
  const idMap = new Map();

  const assignId = (obj) => {
    const className = obj.constructor.name;
    let id = idMap.get(className) || 0;
    obj.setId(`${obj.constructor.name}_${id}`);
    idMap.set(className, ++id);
  };

  const fetch = (className) => {
    return classMap.get(className);
  };

  const register = (classDef) => {
    const className = classDef.name;
    classMap.set(className, classDef);
    console.log(`registered class '${className}' with classFactory`);
    return classDef;
  };

  const factoryInterface = {
    fetch: fetch,
    register: register,
    assignId: assignId,
  };

  return factoryInterface;
})();

class Thing {
  constructor() {}
}

export class BaseClass extends Thing {
  static engine = null;

  #doHibernate = false; // dont process when not visible
  #detailLevel = 1.0;
  #position = {x: 0, y: 0, z: 0};
  #sprite = null;
  #id = null;
  initialLifespan = 0;
  lifespan = 0;

  doRender = false;
  doProcess = false;
  doSelfDraw = false;
  isDestroyed = false;
  hidden = true;

  constructor() {
    super();

    // this.initialLifespan = 0;
    // this.lifespan = 0;

    // this.doRender = false;
    // this.lifespan = this.initialLifespan;
    classFactory.assignId(this);
    // console.log(`${this.id} instanced, lifespan=${this.lifespan}`);
  }
  // get lifespan() {
  //   return this.#lifespan;
  // }
  // get initialLifespan() {
  //   return this.#initialLifespan;
  // }
  // set initialLifespan(newLifespan) {
  //   this.#initialLifespan = newLifespan;
  // }

  // set lifespan(newLifespan) {
  //   console.log('setting lifespan');
  //   this.initialLifespan = newLifespan;
  //   this.#lifespan = newLifespan;
  // }

  get id() {
    return this.#id;
  }

  setId(newId) {
    this.#id = newId;
  }

  spawn(className) {
    return BaseClass.spawn(className);
  }

  static spawn(objectClass) {
    let objClass = null;
    let newInstance = null;

    if(typeof objectClass === 'string') {
      objClass = classFactory.fetch(objectClass);
    } else if(objectClass?.prototype instanceof BaseClass) {
      objClass =  objectClass;
    }

    if(objClass) {
      newInstance = new objClass();
      BaseClass.engine.addObject(newInstance);
      return newInstance;
    } else {
      console.log(`failed to instance ${objectClass?.name || objectClass}`);
    }
  }

  get x() { return this.#position.x; }
  get y() { return this.#position.y; }

  set x(x) { this.#position.x = x; }
  set y(y) { this.#position.y = y; }
  set z(z) { this.#position.z = z; }
  set xy(v) { [this.#position.x, this.#position.y] = [v.x, v.y]; }

  process(dt) {
  }

  fixedProcess(dt) {
    // console.log(`fixedProcess on ${this.id} lifespan=${this.lifespan}`);
    if(this.lifespan > 0 && (this.lifespan -= dt) <= 0) {
      this.lifespan = 0;
      this.isDestroyed = true;
      this.expired();
    }
  }

  selfDraw(dt) {
  }

  init() {

  }

  destroy() {
    this.isDestroyed = true;
    this.destroyed();
  }

  cleanup() {

  }

  destroyed() {

  }

  expired() {
    // console.log(`${this.id} expired`);
  }

  // instances need a way to communicate with the engine
  // setEngine should be called once at the beginning of game initialisation
  // it sets the global game context so that object instances can statically reference the engine interface
  static setEngine(engineInterface = {}) {
    BaseClass.engine = engineInterface;
  }

  get engine() {
    return BaseClass.engine;
  }
};

////////////////////////////////////////////////////////////////////////////////

export default BaseClass;
