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
  #canvas = null;
  #ctx = null;
  #defaultSprite = null;
  #engine = null;

  viewportUpdate(canvas, context) {
    this.#canvas = canvas;
    this.#ctx = context;
    console.log(`render viewport updated ${canvas} / ${context}`);
  }

  visibilityCheck(obj) {
    // this runs after all other engine draw checks
    // perform more advanced checks here like size, opacity, off-screen etc
    return true;
  }

  draw(dt, fa) {
    if(this.#drawList.length > 0 && !this.#defaultSprite) {
      this.#defaultSprite = this.#engine.modules.asset.fetch('fx.flashb');
      return;
    }

    this.#ctx.setTransform(1, 0, 0, 1.0, 0, 0);
    this.#ctx.globalAlpha = 1.0;
    this.#ctx.globalCompositeOperation = 'source-over';
    this.#ctx.fillStyle = '#202020';
    this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);

    for(const obj of this.#drawList) {
      if(obj.doSelfDraw === true) {
        obj.selfDraw(dt);
        break;
      }

      this.#ctx.setTransform(1.0, 0, 0, 1.0, this.#canvas.width/2 + obj.x + (30*fa), this.#canvas.height/2 + obj.y - (100*fa));
      this.#ctx.fillStyle = '#ff0000';

      // drawimg img sourcex sourcey sourcewidth sourceheight destx desty destwidth destheight
      this.#ctx.globalAlpha = obj.lifespan / obj.initialLifespan;
      this.#ctx.globalCompositeOperation = 'lighter';

      this.#ctx.drawImage(
        this.#defaultSprite,
        0,
        0,
        64,
        64,
        -32,
        -32,
        64,
        64
      );

      // interpolation debugging dot
      // this.#ctx.setTransform(1.0, 0, 0, 1.0, this.#canvas.width/2 + obj.x + (0*fa), this.#canvas.height/2 + obj.y - (100*fa));
      // this.#ctx.fillStyle = '#ff0000';
      // this.#ctx.globalAlpha = 1.0;
      // this.#ctx.globalCompositeOperation = 'source-over';
      // this.#ctx.fillRect(-2, -2, 4, 4);
      // console.log(`clear canvas`, this.#canvas.width);
      // console.log(`draw object ${obj.id}`);
    }

    this.#drawList.length = 0;
  }

  add(obj) {
    this.#drawList.push(obj);
  }

  init(engineInterface) {
    this.#engine = engineInterface;
    // this.#defaultSprite = engineInterface.modules.asset.fetch('fx.fire_ball');
    console.log(`sprite render initialised, engineInterface = `, engineInterface, this.#defaultSprite);
  }
}

////////////////////////////////////////////////////////////////////////////////

export default SpriteRender;
