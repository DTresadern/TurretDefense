"use strict";

/* /////////////////////////////////////////////////////////////////////////////
 Using a singleton pattern here rather than an actual class
 The engine doesnt need to be instanced, the assumption is that only one will
 ever be running at any given time.

 Other modular components (coming soon!) such as renderer, input, etc will be
 modular classes so they can be instanced and swapped out as necessary

 random thoughts:
 make a better event system that can be hooked into
 things like render, asset etc can dispatch events to engine if hooks exist
 event hooks could be one-shot or repeating, should allow multiple hooks
 event:
  source - source object
  dest - dest object
  data - event data
 the engine should automagically handle linking and distribution
///////////////////////////////////////////////////////////////////////////// */

// dependencies

////////////////////////////////////////////////////////////////////////////////

const engine = ((env, doc) => {

  let render = null;
  let asset = null;

  // use set for efficiency and automatic duplicate handling.
  // don't really care what order objects are processed in
  let initialized = false;
  let processObjects = new Set();

  const main = () => {
    render.draw();

    render.add([...processObjects]);
    for(const obj of processObjects) {
      obj.process();
    }

    env.requestAnimationFrame(main);
  };

  const notify = (objName, eventName, callback) => {
    const notifyObject = null;

    if(objName == 'asset') asset.notify(eventName, callback);
  };

  const loadAssets = (assetPaths = []) => {
    asset.load(assetPaths);
  };

  const initEngineComponents = (options = {}) => {
    render = new options.renderClass();
    asset = new options.assetClass();

    render.init();
    asset.init();
  };

  const start = () => {
    if(!initialized) return;

    console.log('engine starting');

    main();
  };

  const init = (options = {}) => {

    initEngineComponents(options);

    processObjects.add(
      {
        name: 'A',
        process: function() {
          // console.log(`process object ${this.name}`);
        },
        draw: function() {
          // console.log(`draw object ${this.name}`);
        }
      },
    );

    processObjects.add(
      {
        name: 'B',
        process: function() {
          // console.log(`process object ${this.name}`);
        },
        draw: function() {
          // console.log(`draw object ${this.name}`);
        }
      },
    );

    initialized = true;
  };

  return {
    init: init,
    start: start,
    loadAssets: loadAssets,
    notify: notify
  };

})(window, document);

////////////////////////////////////////////////////////////////////////////////

export default engine;
