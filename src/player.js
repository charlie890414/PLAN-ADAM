import * as PIXI from 'pixi.js';
import Parse from 'parse';
import Keyboard from 'pixi.js-keyboard';

export default class extends PIXI.Sprite {
    constructor(app, HUD) {
        super();

        PIXI.Loader.shared
            .add('astronaut_0', 'astronaut_0.png')

        this.app = app;
        this.HUD = HUD;
    }

    loader(resources) {
        this.texture = resources.astronaut_0.texture;
    }

    show() {
        this.height = 100;
        this.width = 100;
        this.anchor.set(0.5);

        this.setTicker(this.app.ticker);
    }

    setTicker(ticker) {
        ticker.add(() => {
            const mouse = this.app.renderer.plugins.interaction.mouse.global;
            var position = this.toGlobal(this.HUD);
            this.rotation = Math.atan2(position.y - mouse.y, position.x - mouse.x);

            this.walk();
            Keyboard.update();
        });
    }

    walk() {
        const speed = 5;
        var nextX = this.x, nextY = this.y;

        if (Keyboard.isKeyDown('ArrowLeft', 'KeyA'))
            nextX -= speed;
        if (Keyboard.isKeyDown('ArrowRight', 'KeyD'))
            nextX += speed;
        if (Keyboard.isKeyDown('ArrowUp', 'KeyW'))
            nextY -= speed;
        if (Keyboard.isKeyDown('ArrowDown', 'KeyS'))
            nextY += speed;

        if (nextX != this.x || nextY != this.y) {
            this.x = nextX;
            this.y = nextY;

            currentPlayer.set("x", this.x);
            currentPlayer.set("y", this.y);
            currentPlayer.save();
        }
    }
}