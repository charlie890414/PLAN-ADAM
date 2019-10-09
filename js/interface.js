function setupInterface(){
    const loader = PIXI.Loader.shared;

    // Chainable `add` to enqueue a resource
    loader
    .add('basemap','mat/basemap.jpg');

    // The `load` method loads the queue of resources, and calls the passed in callback called once all
    // resources have loaded.
    loader.load((loader, resources) => {
        let map = new PIXI.Sprite(resources.basemap.texture);
        app.stage.addChild(map);
    });
}
