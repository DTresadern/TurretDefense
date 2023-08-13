## Turret Defense JS

### What is it
It will be a tower defense game designed to run in the browser, the core gameplay will be typical of any tower defense type game.

I have ideas for a few features that will (hopefully) provide a unique twist later on, but this is entirely dependent on whether i can get a playable and performant core game engine running in javascript and rendered via canvas.

### Why
I enjoy game design and have had this idea in my head for a long time, my goals here are not necessarily to create a successful game but expand on my knowledge of game flow and architecture.

The major challenge here will be the fact that i am hand rolling everything from scratch, a deliberate decision to help me understand the numerous challenges involved in building a complex and realtime application in a resource-limited environment.

I've had experience using numerous game engines, my current favourites have been the Unreal Engine and GoDot.

If this experimental project reaches a working and fully featured state (even poorly) i plan to rebuild it in a 3D game engine, which is a more familiar environment to me.

### Pics

![image](https://dtresadern.github.io/TurretDefense/images/web/readme_turrets.jpg)

### To-Do List
more for my reference than anything else.

TODO: everything. in no particular order:

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
  - [x] actually draw something to the screen
  - [ ] draw actual sprites to the screen
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
  - [x] make instances destroyable, engine to handle
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
