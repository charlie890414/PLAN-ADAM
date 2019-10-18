import * as PIXI from 'pixi.js'

export default class HUD extends PIXI.Container {
  constructor() {
    super();
    this.meta = new MetaData();
  }

  show() {
    this.addChild(this.meta);
  }
}

class MetaData extends PIXI.Container {
  constructor() {
    super();
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