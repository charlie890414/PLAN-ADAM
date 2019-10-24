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
    PIXI.Loader.shared.add('pathdot', 'pathdot.png');
  }

  show(resources) {
    const star = Star.fetch(), planet = Planet.fetch();
    this.resources = resources;
    this.throwdistance = new PIXI.Text('', { fill: 0xFFFFFF });
    this.throwdistance.x = app.screen.width - 431;
    this.throwdistance.y = app.screen.height - 150;
    this.throwdistance.text = "distance:0m"
    this.leftMeta = new PIXI.Text('', { fill: 0xFFFFFF });
    this.leftMeta.x = 5;
    this.leftMeta.y = 5;
    this.leftMeta.text =
      "Star:\n" +
      "radius = " + star.radius + "\n" +
      "mass = " + star.mass + "\n" +
      "temperature = " + star.temperature + "\n" +
      "\nPlanet:\n" +
      "radius = " + planet.radius + "\n" +
      "mass = " + planet.mass + "\n" +
      "spining speed = " + planet.spin + "\n" +
      "gravity = " + planet.g.toFixed(3) * 10 + "\n";
    this.addChild(this.leftMeta);

    this.rightMeta = new PIXI.Text('', { fill: 0XFFFFFF });
    this.rightMeta.x = app.screen.width - 305;
    this.rightMeta.y = 305;
    this.addChild(this.rightMeta);
    this.addChild(this.throwdistance);
    this.map = new MiniMap(new PIXI.Point(0, planet.distance), new PIXI.Point(planet.angular, 0));
    this.addChild(this.map);
    this.map.show(resources);
    this.power = new Bar({
      x: -400,
      y: -50
    });
    this.degree = new Bar({
      x: -400,
      y: -100,
      //symbols: 'degree',
      leftText: 'Angle',
      color: 0xd515a1
    });
    this.addChild(this.power.view, this.degree.view);
    app.ticker.add(() => {
      this.update();
    });

    var Htip = new PIXI.Text('press H for help', { fill: 0xFFFFFF });
    Htip.position.set(0, app.screen.height - 30);
    this.addChild(Htip);
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
    var speed = Math.sqrt(Math.pow(this.map.vec.x, 2) + Math.pow(this.map.vec.y, 2)) * this.map.au;
    var r = this.map.getcurrentDistance();
    r = Math.round(r * 1e3) / 1e3;
    speed = Math.round(speed * 1e3) / 1e3;
    this.rightMeta.text =
      "distance = " + r + "\n" +
      "speed = " + speed + "\n";
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
    this.au = 1.496E8; // au in km
    this.vec = new PIXI.Point(vec.x / this.au, vec.y / this.au);
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
    star.height = star.width = 15

    this.addChild(star);

    app.ticker.add((delta) => this.move(delta));
  }

  move(delta) {
    const speed = 1e4;
    const pos = this.pos;
    const vel = this.vec;

    const solar_mass = 2E30;
    const earth_mass = 6E24;
    const au = 1.5E11;
    const G = 6.67E-11;

    const r = this.getcurrentDistance() * au;
    const star = Star.fetch().mass * solar_mass;
    const planet = Planet.fetch().mass * earth_mass;
    var d = G * planet * star / Math.pow(r, 2) / planet;
    d /= au; //convert from m/s^2 to au
    const sum = Math.abs(pos.x) + Math.abs(pos.y);
    const acl = new PIXI.Point(pos.x / sum * -d, pos.y / sum * -d);
    vel.x += acl.x * delta * speed;
    vel.y += acl.y * delta * speed;
    pos.x += vel.x * delta * speed;
    pos.y += vel.y * delta * speed;

    console.log(acl, vel , delta);

    const zoom = 20;
    this.planet.position.set(pos.x * zoom + this.center.x, pos.y * zoom + this.center.y);

    var follow = new PIXI.Sprite(this.pathdot);
    follow.position = this.planet.position;
    this.addChildAt(follow, 1);

    if (this.getcurrentDistance() < 0.1) {
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
      leftText = 'Power',
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
