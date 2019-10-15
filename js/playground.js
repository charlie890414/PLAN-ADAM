class Playground extends PIXI.Container {
    constructor() {
        super();
        // Chainable `add` to enqueue a resource
        PIXI.Loader.shared
            .add('basemap', 'mat/basemap.jpg')

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
    }
}
