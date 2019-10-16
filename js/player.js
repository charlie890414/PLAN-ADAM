class Player extends PIXI.Sprite {
    constructor() {
        super();

        PIXI.Loader.shared
            .add('astronaut_0', 'mat/astronaut_0.png')
    }

    loaded(resources) {
        this.texture = resources.astronaut_0.texture;
        this.height = 100;
        this.width = 100;
        this.anchor.set(0.5);
    }

    setTicker(ticker) {
        ticker.add(() => {
            const mouse = app.renderer.plugins.interaction.mouse.global;
            var position = this.toGlobal(panel);
            this.rotation = Math.atan2(position.y - mouse.y, position.x - mouse.x);
        });
    }
}