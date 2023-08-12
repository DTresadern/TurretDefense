## Turret Defense

### To-Do List
everything. in no particular order:

- [x] rudimentary landing page with canvas

- [ ] assets
  - [x] towers
  - [x] turrets: gun, cannon, gauss, tesla
  - [ ] turrets: flamethrower, grenade
  - [ ] utility tower: munitions(?), fire control(?), recycler(?), drone(?)
  - [ ] wasteland map
    - [x] map image
    - [ ] map data

- [x] basic engine and main loop framework
  - [x] split mainloop into two processes: process (integration) and draw (rendering)
  - [ ] make a better event system
  - [ ] extend engine framework to parse options

- [x] basic sprite rendering framework
  - [ ] actually draw something to the screen
  - [ ] sprite data structure
  - [ ] animation system (animation params, control interface)

- [x] basic asset manager framework
  - [x] add progress and completion notifiers for engine

- [x] game class framework
  - [x] timer system
  - [ ] extend timer system to allow looping and one-shot timers
  - [ ] maybe split timer system into a reuseable class module (toolbox?) if the need arises
  - [ ] create game states to handle game game logic

- [x] user input framework
  - [ ] handle mouse input
  - [ ] handle keyed input
  - [ ] handle keybinding

- [ ] game object and class handling
  - [x] controlled instance spawning via BaseClass (bit fragmented, tidy up needed)
  - [ ] allow passing options to spawned instances for more control
  - [x] provide link to engineInterface for engine modules
  - [x] classFactory to hold class map and allow class loading
  - [x] class instancing via baseClass
  - [x] extend baseClass with a few necessities
  - [ ] make instances destroyable, engine to handle
  - [ ] refactor base_class module into a class & instance manager

- [ ] game objects and classes
  - [ ] moveable
  - [ ] static
  - [ ] placeable
  - [ ] tower
  - [ ] enemy
  - [ ] projectile
  - [ ] particle

- [x] map data structure
- [ ] basic ui system
- [ ] vector3 class & helpers
- [ ] matrix class & helpers
- [ ] math and helpers
- [ ] event system
- [ ] camera system and panning (maybe)
