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

    show(resources) {
        this.map = new PIXI.Sprite(resources.basemap.texture);
        this.addChild(this.map);

        this.addChild(this.player);
        this.player.show(resources);

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
