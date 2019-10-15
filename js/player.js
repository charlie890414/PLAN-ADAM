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
            const bound = this.getBounds();
            const centerX = (bound.left + bound.right) / 2;
            const centerY = (bound.top + bound.bottom) / 2;
            this.rotation = Math.atan2(centerY - mouse.y, centerX - mouse.x);
        });
    }
}