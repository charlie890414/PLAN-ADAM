import * as PIXI from 'pixi.js';
import Player from './player';
import { Planet, Star } from './planet';
export default class extends PIXI.Container {
    constructor() {
        super();

        this.land = new PIXI.Sprite(PIXI.Texture.WHITE)
        this.land.width = 16000;
        this.land.height = 4000;
        this.land.tint = 0xcd7f32;

        this.player = new Player();
        this.player.x = this.land.width / 4;
        this.player.y = this.land.height / 2;
    }
    maskmove(delta) {
        this.mask_mx = (this.width / ((this.hour / this.timespeed) * 3600)) / delta / 60;
        this.mask_pos_x += this.mask_mx;
        if (this.mask_pos_x > this.land.width + (this.land.width * 1) / 4) this.mask_pos_x = -(this.land.width * 1) / 4;
        if ((this.land.width / 4) > Math.abs(this.player.x - this.mask_pos_x)) {
            this.sunmask.alpha = 1 - (Math.abs(this.player.x - this.mask_pos_x) / (this.land.width / 4));
        }
        else {
            this.sunmask.alpha = 0;
        }
    }
    newmask() {
        this.sunmask = new PIXI.Graphics();
        this.sunmask.beginFill(0x000000); // 遮罩使用不透明色塊
        this.sunmask.drawRect(0, 0, this.land.width, this.land.height);
        this.sunmask.endFill();
        this.sunmask.alpha = 0;
        this.hour = 1;
        this.timespeed = 24 / Planet.fetch().spin;
        this.mask_pos_x = (this.land.width * 3) / 4;
        this.addChild(this.sunmask);
    }
    show(resources) {
        this.addChild(this.land);
        this.addChild(this.player);
        this.newmask();
        this.player.show(resources);
        this.setTicker(app.ticker);
    }


    setTicker(ticker) {
        ticker.add(() => {
            var position = this.player.toGlobal(panel);
            this.x -= position.x - app.screen.width / 2;
            this.y -= position.y - app.screen.height / 2;
        });
        ticker.add((delta) => {
            this.maskmove(delta);
        });
    }
}
