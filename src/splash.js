import * as PIXI from 'pixi.js';
import { TextInput } from "pixi-textinput-v5";
const Parse = require('parse');

export default class Splash extends PIXI.Container {
    constructor() {
        super();

        this.loading = new PIXI.Text('Traveling to moon... ', { fill: 0xffffff });
        this.loaded = 0;
    }

    register(loader) {
        loader.onStart.add(() => {
            this.addChild(this.loading);
        });

        loader.onLoad.add(() => {
            this.loaded++;
            this.loading.text = 'Traveling to moon... ' + this.loaded + " days";
        });
    }

    showLogin() {
        this.loading.destroy();
        const namefield = new TextInput({
            input: {
                color: '#26272E'
            },
            box: {
                default: { fill: 0xE8E9F3, stroke: { color: 0xCBCEE0, width: 3 } }
            }
        });
        namefield.placeholder = 'nickname';
        this.addChild(namefield);

        const login = new PIXI.Text('Login', { fill: 0xff1010, align: 'center' });

        login.anchor.set(0.5);
        login.x = app.screen.width / 2;
        login.y = app.screen.height / 2;
        login.interactive = true;
        login.buttonMode = true;

        login.on('pointerdown', () => {
            if (true) {
                this.destroy();
                ground.show();
                panel.show();
            }
        });

        this.addChild(login);
    }

    login(name) {
        if (name === "") {
            return false;
        }

        var Player = Parse.Object.extend("Player");
        var current = new Player();
        current.set("nickname", name);
        current.set("position", new Parse.GeoPoint({ latitude: 0.0, longitude: 0.0 }));
        current.save();
        global.currentPlayer = current;

        return true;
    }
}