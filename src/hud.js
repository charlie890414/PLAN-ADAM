import * as PIXI from 'pixi.js'
import {
  DropShadowFilter
} from 'pixi-filters'
import {
  Planet, Star
} from './planet'

export default class HUD extends PIXI.Container {
  constructor() {
    super();
    PIXI.Loader.shared
      .add('boom', 'boom.png')

    PIXI.Loader.shared.add('planetball', 'miniplanet.png');
    PIXI.Loader.shared.add('starball', 'ministar.png');
    PIXI.Loader.shared.add('pathdot','pathdot.png');
  }

  show(resources) {
    const param = Planet.fetch();
    this.resources = resources;
    this.meta = new PIXI.Text('', { fill: 0xFFFFFF });
    this.meta.x = 5;
    this.meta.y = 5;
    this.addChild(this.meta);

    this.map = new MiniMap(new PIXI.Point(0, param.distance), new PIXI.Point(param.angular, 0));
    this.addChild(this.map);
    this.map.show(resources);
    this.power = new Bar({
      x: -400,
      y: -50
    });
    this.degree = new Bar({
      x: -400,
      y: -100,
      symbols: '度',
      leftText: '仰角',
      color: 0xd515a1
    });
    this.addChild(this.power.view, this.degree.view);
    app.ticker.add(() => {
      this.update();
    });
  }
  endgame() {
    this.boom = new PIXI.Sprite();
    this.boom.texture = this.resources.boom.texture;
    this.boom.x = app.screen.width / 2 - this.boom.width * 2 / 2;
    this.boom.y = app.screen.height / 2 - this.boom.height * 2 / 2;
    this.boom.alpha = 0;
    this.boom.scale.x = 2;
    this.boom.scale.y = 2;
    this.boom.interactive = true;
    this.boom.cursor = "pointer";
    this.boom.on('click', (event) => {
      window.location.reload("index.html")
      console.log("cl");
    });
    this.addChild(this.boom);
    var sh = setInterval(() => {
      this.boom.alpha += 0.008;
      // this.boom.scale.x += 0.03;
      // this.boom.scale.y += 0.03;
      // this.boom.x = app.screen.width / 2 - this.boom.width * this.boom.scale.x / 2;
      // this.boom.y = app.screen.height / 2 - this.boom.height * this.boom.scale.y / 2;
      if (this.boom.alpha >= 1) clearInterval(sh);
    }, 1)
  }


  update() {
    const star = Star.fetch(), planet = Planet.fetch();
    var speed = Math.sqrt(Math.pow(this.map.vec.x, 2) + Math.pow(this.map.vec.y, 2));
    var r = this.map.getcurrentDistance();
    r = Math.round(speed * 1e3) / 1e3;
    speed = Math.round(speed * 1e3) / 1e3;
    this.meta.text =
      "恆星\n" +
      "半徑 = " + star.radius + "\n" +
      "質量 = " + star.mass + "\n" +
      "溫度 = " + star.temperature + "\n" +
      "行星\n" +
      "半徑 = " + planet.radius + "\n" +
      "質量 = " + planet.mass + "\n" +
      "自轉速度 = " + planet.spin + "\n" +
      "與恆星距離 = " + r + "\n" +
      "公角速度 = " + planet.angular + "\n";
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

  /**
   * @returns {number} The distnace between planet and star
   */
  getcurrentDistance() {
    return Math.sqrt(Math.pow(this.pos.x, 2) + Math.pow(this.pos.y, 2));
  }

  show(resources) {
    this.pathdot = resources.pathdot.texture;
    const Bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    Bg.width = 300;
    Bg.height = 300;
    this.addChild(Bg);
    this.width = Bg.width;
    this.height = Bg.height;
    this.x = app.screen.width - this.width - 5;
    this.y = 5;

    const center = this.center = new PIXI.Point(this.width / 2, this.height / 2);

    this.planet = new PIXI.Sprite(resources.planetball.texture);
    this.planet.anchor.set(0.5);
    this.planet.height = this.planet.width = 10;

    this.addChild(this.planet);

    var star = new PIXI.Sprite(resources.starball.texture);
    star.anchor.set(0.5);
    star.position = center;
    star.height = star.width = 20;

    this.addChild(star);

    app.ticker.add((delta) => this.move(delta));
  }

  move(delta) {
    const EPS = Planet.fetch().mass;
    const pos = this.pos;
    const vel = this.vec;

    const r = Math.sqrt(Math.pow(pos.x, 2) + Math.pow(pos.y, 2));
    let r3 = 1 / Math.pow(r, 3);
    const acl = new PIXI.Point(pos.x * -r3, pos.y * -r3);
    vel.x += acl.x * EPS / delta / 60;
    vel.y += acl.y * EPS / delta / 60;
    pos.x += vel.x / delta / 60;
    pos.y += vel.y / delta / 60;

    this.planet.position.set(pos.x + this.center.x, pos.y + this.center.y);

    var follow = new PIXI.Sprite(this.pathdot);
    follow.position = this.planet.position;
    this.addChildAt(follow, 1);

    if (panel.map.getcurrentDistance() < 13) {
      panel.endgame();
    }
  }
}

class Bar extends PIXI.Graphics {
  constructor(param = {}) {
    super();
    const {
      x,
      y,
      width = 200,
      height = 30,
      color = 0x3498db,
      alpha = 0.7,
      leftText = '蓄力',
      symbols = '%'
    } = param;

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