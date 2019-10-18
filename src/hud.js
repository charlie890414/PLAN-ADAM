import * as PIXI from 'pixi.js'

import { DropShadowFilter } from 'pixi-filters'

export default class HUD extends PIXI.Container {
  constructor(app) {
    super();

    PIXI.Loader.shared.add('helmet', 'helmet.png');
    PIXI.Loader.shared.add('battery', 'battery-full.png');
    PIXI.Loader.shared.add('oxygen', 'diving.png');

    this.app = app;

    this.unit = { w: app.screen.width / 16, h: app.screen.height / 16 };
    this.helmet = this.newBar({ x: -460, y: -200, icon: 'helmet' });
    this.battery = this.newBar({ x: -420, y: -150, color: 0x2ecc71, icon: 'battery' });
    this.oxygen = this.newBar({ x: -380, y: -100, color: 0xf1c40f, icon: 'oxygen' });
    this.map = this.newMap({ x: 55, y: 55 });
    this.alert = this.newAlert();
    this.dialog = this.newDialog();


  }

  show(resources) {
    this.helmet.loadIcon(resources);
    this.battery.loadIcon(resources);
    this.oxygen.loadIcon(resources);

    this.addChild(
      this.helmet.view,
      this.battery.view,
      this.oxygen.view,
      this.map.view,
      this.alert.view,
      this.dialog.view
    );

    this.tester();
  }

  newBar(param = {}) {
    const { x, y, width = 200, height = 30, color = 0x3498db, alpha = 0.7, icon } = param;
    const app = this.app;
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
    let { x, y, radius = 80, color = 0x34495e, alpha = 0.9 } = param;
    const HUD = this;
    return new (function () {
      this.init = function () {
        radius = HUD.unit.w * .01 * radius;
        this.view = new PIXI.Graphics();

        this.view.x = x < 0 ? app.screen.width + x : x;
        this.view.y = y < 0 ? app.screen.height + y : y;
        this.view.lineStyle(7, color, alpha);
        this.view.beginFill(color, 0.7);
        this.view.drawCircle(x, y, radius);
        this.view.endFill();

        this.view.alpha = alpha;
      };

      this.init();
    })();
  }

  newAlert(param = {}) {
    const { color = 0xe74c3c } = param;
    const HUD = this;
    const app = this.app;
    return new (function () {
      this.init = function () {
        this.view = new PIXI.Graphics();

        this.background = new PIXI.Graphics();
        //#region background
        this.background.beginFill(0x34495e, 0.8);
        this.background.moveTo(HUD.unit.w * 3, HUD.unit.h * .5);
        this.background.lineTo(HUD.unit.w * 2.5, HUD.unit.h * .2);
        this.background.lineTo(HUD.unit.w * .2, HUD.unit.h * 0);
        this.background.lineTo(HUD.unit.w * .5, HUD.unit.h * 1);
        this.background.lineTo(HUD.unit.w * 0, HUD.unit.h * 1.7);
        this.background.lineTo(HUD.unit.w * 2, HUD.unit.h * 1.7);
        this.background.lineTo(HUD.unit.w * 3, HUD.unit.h * 1.2);
        this.background.lineTo(HUD.unit.w * 3, HUD.unit.h * .5);
        this.background.endFill();
        //#endregion

        this.label = new PIXI.Text('', {
          fontFamily: 'Arial Black',
          fontSize: HUD.unit.w * .2,
          fill: `#${color.toString(16)}`,
          letterSpacing: 0.5,
          wordWrap: true,
          wordWrapWidth: 440,
        });

        this.anime = {
          time: 0.013,
          ToTime: 0,
          tick: app.ticker.add(() => {
            if (Date.now() <= this.anime.ToTime) {
              this.view.alpha += (this.anime.time *= (this.view.alpha >= 1 || this.view.alpha <= .7 ? -1 : 1));
            } else {
              this.label.text = '';
              this.view.alpha = 0;
            }
          }),
        };

        this.label.x = HUD.unit.w * 0.666667;
        this.label.y = HUD.unit.h * 0.457610;

        this.view.x = app.screen.width - HUD.unit.w * 3.3;
        this.view.y = 35;
        this.view.alpha = 0;

        this.view.addChild(this.background, this.label);

        this.show = (param) => {
          let { str, sec, color = this.label.fill } = param;

          if (str.length > 17) {
            str = `${str.substr(0, 17)}\n${str.substr(17)}`;
          }

          this.view.alpha = 1;

          this.anime.ToTime = Date.now() + sec * 1000;
          this.anime.tick.start();

          this.label.text = str;
          this.label.style.fill = color;
        }

        Object.defineProperty(this, 'text', {
          get() {
            return this.label.text;
          },
          set(val) {
            let { str, sec, color = this.label.fill } = val;

            if (str.length > 17) {
              str = `${str.substr(0, 17)}\n${str.substr(17)}`;
            }

            this.view.alpha = 1;

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

  newDialog(param = {}) {
    const { color = 0xecf0f1, alpha = 0.9 } = param;
    const HUD = this;

    return new (function () {
      this.init = function () {
        this.says = [];

        this.view = new PIXI.Graphics();

        this.box = new PIXI.Graphics();

        let mask = new PIXI.Graphics();
        mask.drawRect(0, 0, HUD.unit.w * 3.8, HUD.unit.h * 3);
        mask.cacheAsBitmap = true;
        this.box.addChild(mask)
        this.box.mask = mask;

        this.background = new PIXI.Graphics();
        //#region background
        this.background.beginFill(0x34495e, 0.9);
        this.background.moveTo(HUD.unit.w * .5, HUD.unit.h * 0.3);
        this.background.lineTo(HUD.unit.w * 0, HUD.unit.h * 1);
        this.background.lineTo(HUD.unit.w * .3, HUD.unit.h * 2.45);
        this.background.lineTo(HUD.unit.w * 4.5, HUD.unit.h * 2.5);
        this.background.lineTo(HUD.unit.w * 5.1, HUD.unit.h * 1.8);
        this.background.lineTo(HUD.unit.w * 4.5, HUD.unit.h * 0.5);
        this.background.lineTo(HUD.unit.w * .5, HUD.unit.h * 0.3);
        this.background.endFill();
        //#endregion

        this.push = (param) => {
          let say = new PIXI.Graphics();

          let name = new PIXI.Text(param.name, {
            fontFamily: 'Arial Black',
            fontSize: HUD.unit.w * .2 / (24 / param.fontSize),
            fill: `#${param.color.name.toString(16)}`,
            letterSpacing: 0.5,
            wordWrap: true,
            wordWrapWidth: 440
          });

          let symbol = new PIXI.Text(':', {
            fontFamily: 'Arial Black',
            fontSize: HUD.unit.w * .2 / (24 / param.fontSize),
            fill: `#${param.color.symbol.toString(16)}`,
            letterSpacing: 0.5,
            wordWrap: true,
            wordWrapWidth: 440
          });

          let content = new PIXI.Text(param.content, {
            fontFamily: 'Arial Black',
            fontSize: HUD.unit.w * .2 / (24 / param.fontSize),
            fill: `#${param.color.content.toString(16)}`,
            letterSpacing: 0.5,
            wordWrap: true,
            breakWords: true,
            wordWrapWidth: HUD.unit.w * 2.9,
          });

          symbol.x = name.width + 5;
          content.x = symbol.x + 20;

          say.addChild(name, symbol, content);
          say.y = HUD.unit.h * 2 - say.height - 10;


          for (let w = 0; w < this.says.length; ++w) {
            this.says[w].y -= say.height + 10;
          }

          this.says.push(say);
          this.box.addChild(say);
        }

        this.box.x = HUD.unit.w * 0.5;
        this.box.y = HUD.unit.h * 0.5;

        this.view.x = HUD.unit.w * 5.7;
        this.view.y = HUD.unit.h * .05;

        this.view.addChild(this.background, this.box)
      };

      this.init();
    })();
  }

  tester() {
    const helmetTester = setInterval(() => { if (--this.helmet.value < 1) { clearInterval(helmetTester); } }, Math.random() * 1000);
    const batteryTester = setInterval(() => { if (--this.battery.value < 1) { clearInterval(batteryTester); } }, Math.random() * 1000);
    const oxygenTester = setInterval(() => { if (--this.oxygen.value < 1) { clearInterval(oxygenTester); } }, Math.random() * 1000);

    setTimeout(() => this.alert.show({ str: 'Enemy Attack !!!!!!!!!!!!!!!!', sec: Math.random() * 100, color: 0xe74c3c }), Math.random() * 5000)
    for (let w = 0; w < 5; ++w) {
      this.dialog.push({
        name: `Cliff-${w}`,
        content: `${w} No Sign.. In Moon${'.'.repeat(Math.random() * 50)}`,
        fontSize: Math.max(Math.random() * 40, 5),
        color: {
          name: Math.floor(Math.random() * 0xffffff),
          symbol: Math.floor(Math.random() * 0xffffff),
          content: Math.floor(Math.random() * 0xffffff)
        }
      });
    }
  }
}
