const Parse = require('parse');
import * as PIXI from 'pixi.js';
import Playground from './playground';
import HUD from './hud';

function startGame() {
    /* Init Parse SDK */
    Parse.initialize("NASA_2019_SEAL", "SBsm7FTJdh4TdgDt");
    Parse.serverURL = 'http://140.115.50.100:1337/parse';

    /* Init PIXI JS */
    this.type = PIXI.utils.isWebGLSupported() ? 'WebGL' : 'canvas';
    PIXI.utils.sayHello(this.type);

    this.app = new PIXI.Application({
        antialias: true,
        transparent: false,
        resolution: 1,
        resizeTo: window
    });

    document.body.appendChild(this.app.view);

    /* Setup game */
    this.HUD = new HUD(this.app);
    this.ground = new Playground(this.app, this.HUD);

    this.app.stage.addChild(this.ground);
    this.app.stage.addChild(this.HUD);

    /* Load resources */
    const loader = PIXI.Loader.shared;
    loader.load((loader, resources) => {
        this.HUD.show(resources);
        this.ground.show(resources);
    });
}

startGame();