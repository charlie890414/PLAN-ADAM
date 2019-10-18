import * as PIXI from 'pixi.js';
import Keyboard from 'pixi.js-keyboard';

export default class extends PIXI.Sprite {
    constructor() {
        super();

        PIXI.Loader.shared
            .add('astronaut_0', 'astronaut_0.png')
        this.vx = this.vy = 0;
    }

    show(resources) {
        this.texture = resources.astronaut_0.texture;

        this.width = this.texture.width / 10;
        this.height = this.texture.height / 10;
        this.anchor.set(0.5);

        this.setTicker(app.ticker);
    }

    setTicker(ticker) {
        ticker.add((delta) => {
            const mouse = app.renderer.plugins.interaction.mouse.global;
            var position = this.toGlobal(panel);
            this.rotation = Math.atan2(position.y - mouse.y, position.x - mouse.x);

            this.walk(delta);
            Keyboard.update();
        });
    }

    walk(delta) {
        const speed = 100 / delta / 60;

        if (Keyboard.isKeyDown('ArrowLeft', 'KeyA'))
            this.vx -= speed;
        if (Keyboard.isKeyDown('ArrowRight', 'KeyD'))
            this.vx += speed;
        if (Keyboard.isKeyDown('ArrowUp', 'KeyW'))
            this.vy -= speed;
        if (Keyboard.isKeyDown('ArrowDown', 'KeyS'))
            this.vy += speed;

        this.x += this.vx / delta / 60;
        this.y += this.vy / delta / 60;
    }
}