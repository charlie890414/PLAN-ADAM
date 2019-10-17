import * as PIXI from 'pixi.js';
import { DropShadowFilter } from 'pixi-filters';

const Parse = require('parse');

export default class HUD extends PIXI.Container {
  constructor() {
    super();

    PIXI.Loader.shared.add('helmet', 'helmet.png');
    PIXI.Loader.shared.add('battery', 'battery-full.png');
    PIXI.Loader.shared.add('oxygen', 'diving.png');

    this.helmet = this.newBar({ x: -460, y: -200, icon: 'helmet' });
    this.battery = this.newBar({
      x: -420, y: -150, color: 0x2ecc71, icon: 'battery',
    });
    this.oxygen = this.newBar({
      x: -380, y: -100, color: 0xf1c40f, icon: 'oxygen',
    });
    this.map = this.newMap({ x: 80, y: -80, radius: 120 });
    this.panel = this.newPenal();
    this.alert = this.newAlert();

    this.addChild(this.helmet.view, this.battery.view, this.oxygen.view, this.map.view, this.panel.view);

    this.tester();
  }

  loaded(resources) {
    this.helmet.loadIcon(resources);
    this.battery.loadIcon(resources);
    this.oxygen.loadIcon(resources);
  }

  newBar(param = {}) {
    const {
      x, y, width = 200, height = 30, color = 0x3498db, alpha = 0.7, icon,
    } = param;
    const HUD = this;

    return new (function () {
      let value = 100;

      this.init = function () {
        this.view = new PIXI.Graphics();
        this.bar = {
          back: new PIXI.Graphics(),
          front: new PIXI.Graphics(),
        };
        this.rightText = new PIXI.Text(`${value} %`, {
          fontFamily: 'Arial',
          fontSize: 28,
          fontStyle: 'italic',
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

        this.view.addChild(this.bar.back, this.bar.front, this.rightText);

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

      this.loadIcon = function (resources) {
        const pic = new PIXI.Sprite(resources[icon].texture);
        pic.y = -5;
        pic.width = 45;
        pic.height = 45;
        this.view.addChild(pic);
      };

      this.init();
    })();
  }

  newMap(param = {}) {
    const {
      x, y, radius = 80, color = 0x2c3e50, alpha = 0.9,
    } = param;
    const HUD = this;

    return new (function () {
      this.init = function () {
        this.view = new PIXI.Graphics();

        this.view.x = x < 0 ? app.screen.width + x : x;
        this.view.y = y < 0 ? app.screen.height + y : y;
        this.view.lineStyle(7, color, alpha);
        this.view.beginFill(0xecf0f1, 0.7);
        this.view.drawCircle(x, y, radius);
        this.view.endFill();

        this.view.alpha = alpha;
      };

      this.init();
    })();
  }

  newPenal(param = {}) {
    const { color = 0x2c3e50, alpha = 0.9 } = param;
    const HUD = this;

    return new (function () {
      this.init = function () {
        this.view = new PIXI.Graphics();

        this.unit = { w: app.screen.width / 16, h: app.screen.height / 16 };

        this.view.lineStyle(5, color, alpha);
        // #region 1
        this.view.beginFill(0xecf0f1, 0.5);
        this.view.moveTo(this.unit.w * 0, this.unit.h * 0);
        this.view.lineTo(this.unit.w * 1, this.unit.h * 1);
        this.view.lineTo(this.unit.w * 1, this.unit.h * 1.5);
        this.view.lineTo(this.unit.w * 0, this.unit.h * 2);
        this.view.lineTo(this.unit.w * 0, this.unit.h * 0);
        this.view.endFill();
        // #endregion
        // #region 2
        this.view.beginFill(0xecf0f1, 0.9);
        this.view.moveTo(this.unit.w * 0, this.unit.h * 0);
        this.view.lineTo(this.unit.w * 6, this.unit.h * 0);
        this.view.lineTo(this.unit.w * 5, this.unit.h * 0.5);
        this.view.lineTo(this.unit.w * 2, this.unit.h * 0.5);
        this.view.lineTo(this.unit.w * 1, this.unit.h * 1);
        this.view.lineTo(this.unit.w * 0, this.unit.h * 0);
        this.view.endFill();
        // #endregion
        // #region 3
        this.view.beginFill(0xecf0f1, 0.8);
        this.view.moveTo(this.unit.w * 1, this.unit.h * 1);
        this.view.lineTo(this.unit.w * 2, this.unit.h * 0.5);
        this.view.lineTo(this.unit.w * 5, this.unit.h * 0.5);
        this.view.lineTo(this.unit.w * 4.6, this.unit.h * 1);
        this.view.lineTo(this.unit.w * 5, this.unit.h * 2);
        this.view.lineTo(this.unit.w * 2, this.unit.h * 2);
        this.view.lineTo(this.unit.w * 1, this.unit.h * 1.5);
        this.view.lineTo(this.unit.w * 1, this.unit.h * 1);
        this.view.endFill();
        // #endregion

        // #region 4
        this.view.beginFill(0xecf0f1, 0.9);
        this.view.moveTo(this.unit.w * 6, this.unit.h * 0.3);
        this.view.lineTo(this.unit.w * 5, this.unit.h * 1.5);
        this.view.lineTo(this.unit.w * 6, this.unit.h * 2.5);
        this.view.lineTo(this.unit.w * 10, this.unit.h * 2.5);
        this.view.lineTo(this.unit.w * 11, this.unit.h * 1.5);
        this.view.lineTo(this.unit.w * 10, this.unit.h * 0.3);
        this.view.lineTo(this.unit.w * 6, this.unit.h * 0.3);
        this.view.endFill();
        // #endregion

        // #region 5
        this.view.beginFill(0xecf0f1, 0.5);
        this.view.moveTo(this.unit.w * 16, this.unit.h * 0);
        this.view.lineTo(this.unit.w * 15, this.unit.h * 1);
        this.view.lineTo(this.unit.w * 15, this.unit.h * 1.5);
        this.view.lineTo(this.unit.w * 16, this.unit.h * 2);
        this.view.lineTo(this.unit.w * 16, this.unit.h * 0);
        this.view.endFill();
        // #endregion
        // #region 6
        this.view.beginFill(0xecf0f1, 0.9);
        this.view.moveTo(this.unit.w * 16, this.unit.h * 0);
        this.view.lineTo(this.unit.w * 10, this.unit.h * 0);
        this.view.lineTo(this.unit.w * 11, this.unit.h * 0.5);
        this.view.lineTo(this.unit.w * 14, this.unit.h * 0.5);
        this.view.lineTo(this.unit.w * 15, this.unit.h * 1);
        this.view.lineTo(this.unit.w * 16, this.unit.h * 0);
        this.view.endFill();
        // #endregion
        // #region 7
        this.view.beginFill(0xecf0f1, 0.8);
        this.view.moveTo(this.unit.w * 15, this.unit.h * 1);
        this.view.lineTo(this.unit.w * 14, this.unit.h * 0.5);
        this.view.lineTo(this.unit.w * 11, this.unit.h * 0.5);
        this.view.lineTo(this.unit.w * 11.6, this.unit.h * 1);
        this.view.lineTo(this.unit.w * 11, this.unit.h * 2);
        this.view.lineTo(this.unit.w * 14, this.unit.h * 2);
        this.view.lineTo(this.unit.w * 15, this.unit.h * 1.5);
        this.view.lineTo(this.unit.w * 15, this.unit.h * 1);
        this.view.endFill();
        // #endregion
      };

      this.init();
    })();
  }

  newAlert(param = {}) {
    const { color = 0xe74c3c } = param;
    const HUD = this;
    return new (function () {
      this.init = function () {
        this.view = new PIXI.Graphics();

        this.label = new PIXI.Text('', {
          fontFamily: 'Arial Black',
          fontSize: 24,
          fill: `#${color.toString(16)}`,
          letterSpacing: 0.5,
          wordWrap: true,
          wordWrapWidth: 440,
        });

        this.anime = {
          time: 0.015,
          ToTime: 0,
          tick: app.ticker.add(() => {
            if (Date.now() <= this.anime.ToTime) {
              HUD.alert.view.alpha = HUD.alert.view.alpha + this.anime.time;
              if (HUD.alert.view.alpha >= 1 || HUD.alert.view.alpha <= 0) {
                this.anime.time *= -1;
              }
            } else {
              HUD.alert.label.text = '';
            }
          }),
        };

        this.view.addChild(this.label);
        this.view.x = app.screen.width - HUD.panel.unit.w * 4.15;
        this.view.y = 50;
        HUD.panel.view.addChild(this.view);

        Object.defineProperty(this, 'text', {
          get() {
            return this.label.text;
          },
          set(val) {
            let { str, sec, color = this.label.fill } = val;

            if (str.length > 17) {
              str = `${str.substr(0, 17)}\n${str.substr(17)}`;
            }

            this.anime.ToTime = Date.now() + sec * 1000;
            this.anime.tick.start();

            this.label.text = str;
            this.label.style.fill = color;
          },
        });
      };

      this.init();
    })();
  }

  tester() {
    const helmetTester = setInterval(() => { if (--this.helmet.value < 1) { clearInterval(helmetTester); } }, Math.random() * 1000);
    const batteryTester = setInterval(() => { if (--this.battery.value < 1) { clearInterval(batteryTester); } }, Math.random() * 1000);
    const oxygenTester = setInterval(() => { if (--this.oxygen.value < 1) { clearInterval(oxygenTester); } }, Math.random() * 1000);

    this.alert.text = { str: 'Enemy Attack !!!', sec: 10, color: 0xe74c3c };
  }
}
