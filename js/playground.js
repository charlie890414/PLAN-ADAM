class Playground extends PIXI.Container{
    constructor(){
        super();
        // Chainable `add` to enqueue a resource
        PIXI.Loader.shared
        .add('basemap','mat/basemap.jpg');
    }

    loaded(resources){
        let map = new PIXI.Sprite(resources.basemap.texture);
        this.addChild(map);
    }
}
