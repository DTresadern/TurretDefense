"use strict";

//import * as Maps from './td_maps.js';
import SpriteRender from './engine/sprite_render.js';
import AssetManager from './engine/asset_manager.js';
import TurretDefenseGame from './game/td_game.js';
import InputManager from './engine/input_manager.js';
// import ObjectManager from './td';
import engine from './engine/engine.js';

engine.init({
  viewport: {canvas: '#viewport', w: 1024, h: 768},
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

  './images/fx/fire_ball.png',
  './images/fx/flashb.png',
  './images/fx/sheeld.png',
];

engine.notify('asset', 'loadingFinished', () => {
  console.log('loading completed');
  engine.start();
});

engine.loadAssets(assets);
