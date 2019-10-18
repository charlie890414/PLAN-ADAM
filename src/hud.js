import * as PIXI from 'pixi.js'

export default class HUD extends PIXI.Container {
  constructor() {
    super();
  }

  show() {
    this.meta = new PIXI.Text();
    this.meta.x = 5;
    this.meta.y = 5;

    var metaBg = new PIXI.Sprite(PIXI.Texture.WHITE);
    metaBg.x = this.meta.x;
    metaBg.y = this.meta.y;
    metaBg.width = 160;
    metaBg.height = 100;

    this.addChild(metaBg);
    this.addChild(this.meta);

    this.map = new MiniMap(new PIXI.Point(4, 4), new PIXI.Point(2, 0));
    this.addChild(this.map);
    this.map.show();
  }

  update(param) {
    if (param.speed) this.speed = param.speed;
    if (param.omega) this.omega = param.omega;
    if (param.period) this.period = param.period;

    this.meta.text =
      "v = " + this.speed + "\n" +
      "w = " + this.omega + "\n" +
      "t = " + this.period + "\n";
  }
}

class MiniMap extends PIXI.Container {
  /**
   * 
   * @param {PIXI.Point} pos position 
   * @param {PIXI.Point} vec velocity
   */
  constructor(pos, vec) {
    super();

    this.pos = pos;
    this.vec = vec;
  }

  show() {
    this.width = 200;
    this.height = 180;
    this.x = app.screen.width - 205;
    this.y = 5;

    this.center = new PIXI.Point(
      (this.x + this.width) / 2,
      (this.y + this.height) / 2
    );

    this.planet = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.planet.tint = 0x335544;
    this.planet.height = this.planet.width = 5;
    this.addChild(this.planet);

    var star = new PIXI.Sprite(PIXI.Texture.WHITE);
    star.position = this.center;
    star.width = star.height = 20;
    star.tint = 0xff0000;
    this.addChild(star);

    app.ticker.add((delta) => this.move(delta));
  }

  move(delta) {
    const EPS = 0.001;
    const pos = this.pos;
    const vel = this.vec;

    var r = Math.sqrt(Math.pow(pos.x, 2) + Math.pow(pos.y, 2));
    var r3 = 1 / Math.pow(r, 3);
    var acl = new PIXI.Point(pos.x * -r3, pos.y * -r3);
    vel.x += acl.x * EPS / delta / 60;
    vel.y += acl.y * EPS / delta / 60;
    pos.x += vel.x * EPS / delta / 60;
    pos.y += vel.y * EPS / delta / 60;

    this.planet.position.set(pos.x + this.center.x, this.y + this.center.y);
  }
}
