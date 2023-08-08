"use strict";

import SpriteRender from './sprite_render.js';
import engine from './td_engine.js';

engine.init({
  renderClass: SpriteRender
});

engine.start();
