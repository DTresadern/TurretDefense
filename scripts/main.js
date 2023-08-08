"use strict";

import SpriteRender from './sprite_render.js';
import AssetManager from './asset_manager.js';
import engine from './td_engine.js';

engine.init({
  renderClass: SpriteRender,
  assetClass: AssetManager,
});

let assets = [
  './images/tower/base.png',
  './images/tower/gun_l1_idle.png',
  './images/tower/gun_l2_idle.png',
  './images/tower/gun_l3_idle.png',
  './images/tower/cannon_l1_idle.png',
  './images/tower/cannon_l2_idle.png',
  './images/tower/cannon_l3_idle.png',
  './images/tower/gauss_l1_idle.png',
  './images/tower/gauss_l2_idle.png',
  './images/tower/gauss_l3_idle.png',
  './images/tower/buzz_l1_idle.png',
  './images/tower/buzz_l2_idle.png',
  './images/tower/buzz_l3_idle.png',
  './images/tower/gun_l1_idle.png'
];

engine.loadAssets(assets);

engine.start();
