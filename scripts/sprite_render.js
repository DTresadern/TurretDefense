"use strict";

/* /////////////////////////////////////////////////////////////////////////////
 Basic sprite rendering
///////////////////////////////////////////////////////////////////////////// */

// dependencies

////////////////////////////////////////////////////////////////////////////////

class SpriteRender {
  // using an array for the drawlist as i likely need z-sorting later
  // this will need in-place sorting or sorting before every frame
  #drawList = [];

  constructor() {
  }

  draw() {
    for(const obj of this.#drawList) {
      obj.draw();
    }

    this.#drawList.length = 0;
  }

  add(objects) {
    this.#drawList.push(...objects);
  }

  init(options) {

  }
}

////////////////////////////////////////////////////////////////////////////////

export default SpriteRender;
