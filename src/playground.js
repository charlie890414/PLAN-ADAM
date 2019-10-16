import * as PIXI from 'pixi.js';
import Player from './player';

export default class extends PIXI.Container {
    constructor() {
        super();
        // Chainable `add` to enqueue a resource
        PIXI.Loader.shared
            .add('basemap', 'basemap.jpg')

        this.player = new Player();
    }

    loaded(resources) {
        let map = new PIXI.Sprite(resources.basemap.texture);
        this.addChild(map);

        this.player.loaded(resources);
        this.addChild(this.player);
    }

    setTicker(ticker) {
        this.player.setTicker(ticker);

        ticker.add(() => {
            var position = this.player.toGlobal(panel);
            this.x -= position.x - window.innerWidth / 2;
            this.y -= position.y - window.innerHeight / 2;
        });
    }
}
