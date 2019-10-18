import * as PIXI from 'pixi.js';
import Player from './player';

export default class extends PIXI.Container {
    constructor() {
        super();

        this.land = new PIXI.Sprite(PIXI.Texture.WHITE)
        this.land.width = 16000;
        this.land.height = 4000;
        this.land.tint = 0xcd7f32;

        this.player = new Player();
    }

    show(resources) {
        this.addChild(this.land);

        this.addChild(this.player);
        this.player.show(resources);

        this.setTicker(app.ticker);
    }

    setTicker(ticker) {
        ticker.add(() => {
            var position = this.player.toGlobal(panel);
            this.x -= position.x - app.screen.width / 2;
            this.y -= position.y - app.screen.height / 2;

            panel.meta.update({ speed: this.x, omega: this.y, period: 100 });
        });
    }
}
