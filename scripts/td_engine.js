"use strict";

/* /////////////////////////////////////////////////////////////////////////////
 Using a singleton pattern here rather than an actual class
 The engine doesnt need to be instanced, the assumption is that only one will
 ever be running at any given time.

 Other modular components (coming soon!) such as renderer, input, etc will be
 modular classes so they can be instanced and swapped out as necessary
///////////////////////////////////////////////////////////////////////////// */

// dependencies

////////////////////////////////////////////////////////////////////////////////

const engine = ((env, doc) => {

  // use set for efficiency and automatic duplicate handling.
  // don't really care what order objects are processed in
  let initialized = false;
  let processObjects = new Set();

  const main = () => {
    for(const obj of processObjects) {
      obj.process();
    }

    env.requestAnimationFrame(main);
  };

  const init = (options = {}) => {

    processObjects.add(
      {
        process: () => {
          console.log(`processing object`);
        }
      }
    );

    initialized = true;
  };

  const start = () => {
    if(!initialized) return;

    main();
  };

  return {
    init: init,
    start: start,
  };

})(window, document);

////////////////////////////////////////////////////////////////////////////////

export default engine;
