"use strict";

/* /////////////////////////////////////////////////////////////////////////////
 Basic sprite rendering
///////////////////////////////////////////////////////////////////////////// */

// dependencies

////////////////////////////////////////////////////////////////////////////////

class SpriteRender {
  // using an array for the drawlist as i likely need z-sorting later
  // this will need in-place sorting or sorting every frame
  // TODO: performance check needed
  #drawList = [];

  visibilityCheck(obj) {
    // this runs after all other engine draw checks
    // perform more advanced checks here like size, opacity, off-screen etc
    return true;
  }

  draw(dt) {
    for(const obj of this.#drawList) {
      if(obj.doSelfDraw === true) {
        obj.selfDraw(dt);
        break;
      }
    }

    this.#drawList.length = 0;
  }

  add(obj) {
    this.#drawList.push(obj);
  }

  init(options) {
  }
}

////////////////////////////////////////////////////////////////////////////////

export default SpriteRender;
