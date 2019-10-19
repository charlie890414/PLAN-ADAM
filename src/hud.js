import * as PIXI from 'pixi.js'
<<<<<<< HEAD
import {
  Planet
} from './planet'
=======
import { DropShadowFilter } from 'pixi-filters'
import { Planet } from './planet'
>>>>>>> 315b888dffd5b0919c4f72bb95238c55943e76a3

export default class HUD extends PIXI.Container {
  constructor() {
    super();
  }

  show() {
    const param = Planet.fetch();

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

    this.map = new MiniMap(new PIXI.Point(0, param.distance), new PIXI.Point(param.angular, 0));
    this.addChild(this.map);
    this.map.show();

<<<<<<< HEAD
    app.ticker.add(() => {
      this.update();
    });
=======
    this.power = new Bar({x: -400, y: -50});
    this.degree = new Bar({x: -400, y: -100, symbols: '度', leftText: '仰角', color: 0xd515a1});
    this.addChild(this.power.view, this.degree.view);
    app.ticker.add(() => { this.update(); });
>>>>>>> 315b888dffd5b0919c4f72bb95238c55943e76a3
  }

  update() {
    console.log(this.map.vec, this.map.pos);
    const speed = Math.sqrt(Math.pow(this.map.vec.x, 2) + Math.pow(this.map.vec.y, 2));
    const r = Math.sqrt(Math.pow(this.map.pos.x, 2) + Math.pow(this.map.pos.y, 2));
    const omega = Math.sqrt(speed * r);

    this.meta.text =
      "v = " + speed + "\n" +
      "w = " + omega + "\n";
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
    this.planet.position.set(this.pos.x * 7 + center.x, this.pos.y * 7 + center.y);
    console.log(this.planet.position);
    this.planet.height = this.planet.width = 20;
    this.addChild(this.planet);

    var star = new PIXI.Sprite(PIXI.Texture.WHITE);
    star.anchor.set(0.5);
    star.position = center;
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
    const r3 = 1 / Math.pow(r, 3);
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

class Bar extends PIXI.Graphics {
  constructor(param = {}) {
    super();
    const { x, y, width = 200, height = 30, color = 0x3498db, alpha = 0.7, leftText = '蓄力', symbols = '%' } = param;

    return new (function () {
      let value = 0;

      this.init = function () {
        this.view = new PIXI.Graphics();
        this.bar = {
          back: new PIXI.Graphics(),
          front: new PIXI.Graphics(),
        };
        this.rightText = new PIXI.Text(`${value} ${symbols}`, {
          fontFamily: 'Arial',
          fontSize: 28,
          fontWeight: 'bold',
          fill: '#ecf0f1',
          stroke: `#${color.toString(16)}`,
          strokeThickness: 5,
          dropShadow: true,
          dropShadowColor: '#000000',
          dropShadowBlur: 8,
          dropShadowAngle: Math.PI / 3,
          dropShadowDistance: 6,
          wordWrap: true,
          wordWrapWidth: 440,
        });
        this.leftText = new PIXI.Text(leftText, {
          fontFamily: 'Arial',
          fontSize: 28,
          fontWeight: 'bold',
          fill: '#ecf0f1',
          stroke: `#${color.toString(16)}`,
          strokeThickness: 5,
          dropShadow: true,
          dropShadowColor: '#000000',
          dropShadowBlur: 8,
          dropShadowAngle: Math.PI / 3,
          dropShadowDistance: 6,
          wordWrap: true,
          wordWrapWidth: 440,
        });

        this.view.x = x < 0 ? app.screen.width + x : x;
        this.view.y = y < 0 ? app.screen.height + y : y;
        this.view.alpha = alpha;

        this.bar.back.lineStyle(3, color);
        this.bar.back.beginFill(0xecf0f1);
        this.bar.back.drawRoundedRect(60, 0, width, height, 5);
        this.bar.back.endFill();
        this.bar.back.filters = [new DropShadowFilter()];

        this.rightText.x = width + 80;
        this.rightText.y = -5;

        this.leftText.x = -30;
        this.leftText.y = -5;

        this.view.addChild(this.bar.back, this.bar.front, this.rightText, this.leftText);

        Object.defineProperty(this, 'value', {
          get() {
            return value;
          },
          set(val) {
            value = val;

            this.bar.front.clear();
            this.bar.front.beginFill(color);
            this.bar.front.drawRoundedRect(60, 0, width * val / 100, 30, 5);
            this.rightText.text = `${val} %`;
          },
        });
      };

      this.init();
    })();
  }
}