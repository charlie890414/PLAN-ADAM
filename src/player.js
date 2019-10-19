import * as PIXI from 'pixi.js';
import Keyboard from 'pixi.js-keyboard';
//import { Planet, Star } from './planet';

export default class extends PIXI.AnimatedSprite {
    constructor(textures) {
        super(textures);

        //this.Planet_param = Planet.fetch();
        this.vx = this.vy = 0;
        this.f = 0;
        this.v = 1.1;
        this.g = 0.98 / 6;
        this.g_scale = 1000;
        this.up = true;
        this.t = this.v / (3.0 * this.g);
        //this.maxf = this.v ^ 2 / 2 * this.Planet_param.g;
        this.maxf = (this.v * this.v / (2.0 * this.g));
        this.mf = this.maxf / (this.t * 30)
        this.ms = (Math.abs((1.05 * (this.maxf) / 10))) / (this.t * 30);
        this.nowscale = 1;
        console.log(this.maxf);
        // console.log(this.mf);
        console.log(this.ms);
        console.log(Math.abs((this.v * (this.maxf) / 10)) + 1);
    }

    show(resources) {

        this.width = this.texture.width / 10;
        this.height = this.texture.height / 10;
        this.original_width = this.width;
        this.original_height = this.height;
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
        const speed = 100 / this.t;

        //console.log(this.nowscale);
        if (this.f == 0) {
            if (Keyboard.isKeyDown('ArrowLeft', 'KeyA')) {
                this.vx -= speed;
            }
            if (Keyboard.isKeyDown('ArrowRight', 'KeyD'))
                this.vx += speed;
            if (Keyboard.isKeyDown('ArrowUp', 'KeyW'))
                this.vy -= speed;
            if (Keyboard.isKeyDown('ArrowDown', 'KeyS'))
                this.vy += speed;
        }
        this.x += this.vx / delta / 60;
        this.y += this.vy / delta / 60;
        if (Math.abs(this.vx) != 0 || Math.abs(this.vy) != 0) {
            if (this.up) {
                this.f += this.mf;
                this.nowscale += this.ms;
                if (this.maxf < this.f) {
                    this.up = false;
                    this.f = this.maxf;
                    this.nowscale = (Math.abs((1.05 * (this.maxf) / 10)) + 1);
                }
            }
            else {
                this.f -= this.mf;
                this.nowscale -= this.ms;
                if (this.f < 0) {
                    this.up = true;
                    this.f = 0;
                    this.nowscale = 1;
                }
            }
        }
        if (this.f == 0) {
            if (this.vx != 0) {
                if (this.vx > 0 && this.vx - (this.g) * this.g_scale < 0)
                    this.vx = 0;
                else if (this.vx < 0 && this.vx + (this.g) * this.g_scale > 0)
                    this.vx = 0;
                else
                    this.vx += this.vx > 0 ? -(this.g) * this.g_scale : (this.g) * this.g_scale;
            }
            if (this.vy != 0) {
                if (this.vy > 0 && this.vy - (this.g) * this.g_scale < 0)
                    this.vy = 0;
                else if (this.vy < 0 && this.vy + (this.g) * this.g_scale > 0)
                    this.vy = 0;
                else
                    this.vy += this.vy > 0 ? -(this.g) * this.g_scale : (this.g) * this.g_scale;
            }

        }
        // if (this.vx < 300 && this.vx > -300) this.vx = 0;
        // if (this.vy < 300 && this.vy > -300) this.vy = 0;
        this.width = this.original_width * this.nowscale;
        this.height = this.original_height * this.nowscale;
    }
}