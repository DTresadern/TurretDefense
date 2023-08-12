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
  doRender = false;
  doProcess = false;
  doSelfDraw = false;
  #doHibernate = false; // dont process when not visible
  #detailLevel = 1.0;
  #position = {x: 0, y: 0, z: 0};
  #sprite = null;
  #id = null;

  static engine = null;

  constructor() {
    super();
    classFactory.assignId(this);
  }

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

  set x(x) { this.#position.x = x; }
  set y(y) { this.#position.y = y; }
  set z(z) { this.#position.z = z; }
  set xy(v) { [this.#position.x, this.#position.y] = [v.x, v.y]; }

  process(dt) {

  }

  fixedProcess(dt) {
    // console.log(`${this.id} fixedProcess`);
  }

  selfDraw(dt) {
  }

  init() {

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
