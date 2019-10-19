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

    this.map = new MiniMap(new PIXI.Point(0, 3), new PIXI.Point(0.5, 0));
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
    const Bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    Bg.width = 200;
    Bg.height = 180;
    this.addChild(Bg);

    this.width = Bg.width;
    this.height = Bg.height;
    this.x = app.screen.width - 205;
    this.y = 5;

    const center = new PIXI.Point(this.width / 2, this.height / 2);

    this.planet = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.planet.anchor.set(0.5);
    this.planet.tint = 0x335544;
    this.planet.height = this.planet.width = 20;
    this.addChild(this.planet);

    var star = new PIXI.Sprite(PIXI.Texture.WHITE);
    star.anchor.set(0.5);
    star.x = center.x;
    star.y = center.y;
    //star.width = star.height = 30;
    star.tint = 0xff0000;
    this.addChild(star);

    app.ticker.add((delta) => this.move(delta));
  }

  move(delta) {
    const EPS = 0.5;
    const pos = this.pos;
    const vel = this.vec;

    const r = Math.sqrt(Math.pow(pos.x, 2) + Math.pow(pos.y, 2));
    let r3 = 1 / Math.pow(r, 3);
    const acl = new PIXI.Point(pos.x * -r3, pos.y * -r3);
    vel.x += acl.x * EPS / delta / 60;
    vel.y += acl.y * EPS / delta / 60;
    pos.x += vel.x / delta / 60;
    pos.y += vel.y / delta / 60;

    //console.log(pos, vel, acl);
    const center = new PIXI.Point(this.width / 2, this.height / 2);
    this.planet.position.set(pos.x * 7 + center.x, pos.y * 7 + center.y);
  }
}