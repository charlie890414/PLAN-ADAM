import * as PIXI from 'pixi.js';
import Keyboard from 'pixi.js-keyboard';

export default class extends PIXI.Sprite {
    constructor() {
        super();

        PIXI.Loader.shared
            .add('astronaut_0', 'astronaut_0.png')
        this.nx = this.ny = 0;
    }

    show(resources) {
        this.texture = resources.astronaut_0.texture;

        this.width = this.texture.width / 10;
        this.height = this.texture.height / 10;
        this.anchor.set(0.5);

        this.setTicker(app.ticker);
    }

    setTicker(ticker) {
        ticker.add(() => {
            const mouse = app.renderer.plugins.interaction.mouse.global;
            var position = this.toGlobal(panel);
            this.rotation = Math.atan2(position.y - mouse.y, position.x - mouse.x);

            this.walk();
            Keyboard.update();
        });
    }

    walk() {
        const speed = 100;

        if (Keyboard.isKeyDown('ArrowLeft', 'KeyA'))
            this.nx -= speed;
        if (Keyboard.isKeyDown('ArrowRight', 'KeyD'))
            this.nx += speed;
        if (Keyboard.isKeyDown('ArrowUp', 'KeyW'))
            this.ny -= speed;
        if (Keyboard.isKeyDown('ArrowDown', 'KeyS'))
            this.ny += speed;

        this.x += this.nx;
        this.y += this.ny;

        this.nx /= 980;
        this.ny /= 980;
    }
}