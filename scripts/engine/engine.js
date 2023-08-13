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
import {now, int} from '../toolbox.js';
import BaseClass from '../engine/base_class.js';

////////////////////////////////////////////////////////////////////////////////

const engine = ((env, doc) => {

  let input = null;
  let render = null;
  let asset = null;
  let game = null;

  let canvas = null;
  let ctx = null;

  // use set for efficiency and automatic duplicate handling.
  // don't really care what order objects are processed in
  // let initialized = false;
  let processObjects = new Set();

  // mainloop stuff
  const fixedProcessRate = 20;
  const fixedDeltaTimeMs = int(1000 / fixedProcessRate);
  const fixedDeltaTimeS = int(1000 / fixedProcessRate) / 1000.0;
  let elapsedTime = 0;
  let processSteps = 0;
  let lastFrameTimestamp = 0;
  let frameTimeAccumulator = 0;
  let processAlpha = 0;

  const processInput = (dt) => {
    input.process(dt);
  };

  const draw = (dt, fa) => {
    render.draw(dt, fa);
    game.draw(dt);
  };

  const canDraw = (obj) => {
    if(!obj.doRender) return false;
    //if(obj.destroyed) return false; // shouldnt need to check this as its checked in process loop
    // if(!obj.sprite) return false;
    if(obj.hidden) return false;

    if(!render.visibilityCheck(obj)) return false;

    return true;
  };

  const canProcess = (obj) => {
    if(!obj.doProcess) return false;
    // if(obj.isDestroyed) return false; // shouldnt need to check this as its checked in process loop

    return true;
  };

  const fixedProcess = (dt) => {
    game.fixedProcess(dt);
  };

  const process = (dt) => {
    game.process(dt);

    // let i = 0;
    for(const obj of processObjects) {
      if(obj.isDestroyed) {
        // const oid = obj.id;
        obj.cleanup();
        processObjects.delete(obj);
        // console.log(`removing ${oid} from process chain, processObjects count = ${processObjects.size}`);
        continue;
      }

      if(canDraw(obj)) {
        render.add(obj);
      }

      if(canProcess(obj)) {
        let steps = processSteps;
        obj.process(dt);

        while(steps-- > 0) {
          obj.fixedProcess(fixedDeltaTimeS);
        }
      }
      // i += 1;
    }
    processSteps = 0;
  };

  const main = (skip = false) => {
    const frameTime = now();
    const deltaTime = frameTime - lastFrameTimestamp;

    if(deltaTime > 0) {
      const deltaTimeS = deltaTime / 1000.0;
      lastFrameTimestamp = frameTime;
      frameTimeAccumulator += deltaTime;
      elapsedTime += deltaTimeS;

      if(deltaTime > 1500) {
        console.log(`deltatime anomaly detected or main loop locked. deltaTime = ${deltaTimeS}`);
      } else {
        processInput(deltaTimeS);
        draw(deltaTimeS, processAlpha);
        // processAlpha can be used to optionally smoothly interpolate in the render even if processing is intermittent
        processAlpha = frameTimeAccumulator / 1000.0;
        process(deltaTimeS);

        while(frameTimeAccumulator > fixedDeltaTimeMs) {
          frameTimeAccumulator -= fixedDeltaTimeMs;
          processSteps += 1;
          fixedProcess(fixedDeltaTimeS);
        }
      }
    }

    env.requestAnimationFrame(main);
  };

  const notify = (objName, eventName, callback) => {
    if(objName == 'asset') asset.notify(eventName, callback);
  };

  const addObject = (obj) => {
    processObjects.add(obj);
    // console.log(`${obj.id} added to process chain, processObjects count = ${processObjects.size}`);
  };

  const loadAssets = (assetPaths = []) => {
    asset.load(assetPaths);
  };

  const start = () => {
    console.log('engine starting');

    game.start();
    // render.start();

    lastFrameTimestamp = now();
    main();
  };

  const setViewport = (viewportData = {}) => {
    canvas = doc.querySelector(viewportData.canvas);
    canvas.width = viewportData.w;
    canvas.height = viewportData.h;
    ctx = canvas.getContext('2d');
    render.viewportUpdate(canvas, ctx);
  };

  const initEngineComponents = (options = {}) => {
    input = engineInterface.modules.input = new options.inputClass();
    asset = engineInterface.modules.asset = new options.assetClass();
    render = engineInterface.modules.render = new options.renderClass();
    game = engineInterface.modules.game = new options.gameClass();

    // expose engine interface to BaseClass so objects can communicate if necessary
    BaseClass.setEngine(engineInterface);

    input.init(engineInterface);
    asset.init(engineInterface);
    render.init(engineInterface);

    game.init(engineInterface);
  };

  const init = (options = {}) => {
    initEngineComponents(options);
    setViewport(options.viewport);
  };

  // const engineInterface = (x => ({
  const engineInterface = {
    addObject: addObject,
    init: init,
    start: start,
    loadAssets: loadAssets,
    notify: notify,
    modules: {
      input: input,
      render: render,
      asset: asset,
      game: game,
    },
  };
  // }));

  return engineInterface;

})(window, document);

////////////////////////////////////////////////////////////////////////////////

export default engine;
