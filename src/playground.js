import * as PIXI from 'pixi.js';
import Player from './player';

export default class extends PIXI.Container {
    constructor(app, HUD) {
        super();
        // Chainable `add` to enqueue a resource
        PIXI.Loader.shared
            .add('basemap', 'basemap.jpg')

        this.player = new Player(app, HUD);
        this.app = app;
        this.HUD = HUD;
    }

    loader(resources) {
        this.map = new PIXI.Sprite(resources.basemap.texture);
        this.player.loader(resources);
        this.addChild(this.map);
    }

    show() {
        this.addChild(this.player);
        this.player.show();

        this.setTicker(this.app.ticker);
    }

    setTicker(ticker) {
        ticker.add(() => {
            var position = this.player.toGlobal(this.HUD);
            this.x -= position.x - this.app.screen.width / 2;
            this.y -= position.y - this.app.screen.height / 2;
        });
    }
}
