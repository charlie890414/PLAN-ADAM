const Parse = require('parse');
import * as PIXI from 'pixi.js';
import Playground from './playground';
import HUD from './hud';
import Splash from './splash';

class Game {
    constructor() {
        /* Init Parse SDK */
        Parse.initialize("NASA_2019_SEAL", "SBsm7FTJdh4TdgDt");
        Parse.serverURL = 'http://140.115.50.100:1337/parse';

        /* Init PIXI JS */
        this.type = PIXI.utils.isWebGLSupported() ? 'WebGL' : 'canvas';
        this.app = new PIXI.Application({
            antialias: true,
            transparent: false,
            resolution: 1,
            resizeTo: window
        });

        PIXI.utils.sayHello(this.type);
        document.body.appendChild(this.app.view);

        /* Setup game */
        this.HUD = new HUD(this.app);
        this.splash = new Splash(this.app);
        this.ground = new Playground(this.app, this.HUD);

        this.app.stage.addChild(this.HUD);
        this.app.stage.addChild(this.splash);
        this.app.stage.addChild(this.ground);

        /* Load resources */
        const loader = PIXI.Loader.shared;
        loader.load((loader, resources) => {
            this.HUD.loader(resources);
            this.ground.loader(resources);
        });
    }

    start() {
        this.HUD.show();
        this.ground.show();
    }
}

let game = new Game();

game.start();