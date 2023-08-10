"use strict";

//import * as Maps from './td_maps.js';
import SpriteRender from './sprite_render.js';
import AssetManager from './asset_manager.js';
import TurretDefenseGame from './td_game.js';
import InputManager from './input_manager.js';
import engine from './td_engine.js';

engine.init({
  inputClass: InputManager,
  renderClass: SpriteRender,
  assetClass: AssetManager,
  gameClass: TurretDefenseGame,
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
];

engine.notify('asset', 'loadingFinished', () => {
  console.log('loading completed');
  engine.start();
});

engine.loadAssets(assets);
