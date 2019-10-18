import * as PIXI from 'pixi.js';
import Playground from './playground';
import HUD from './hud';
import Welcome from './welcome';

function startGame() {

    /* Init PIXI JS */
    const type = PIXI.utils.isWebGLSupported() ? 'WebGL' : 'canvas';
    PIXI.utils.sayHello(type);

    global.app = new PIXI.Application({
        antialias: true,
        transparent: false,
        resolution: 1,
        resizeTo: window
    });

    document.body.appendChild(app.view);

    /* Setup game */
    global.panel = new HUD();
    global.ground = new Playground();

    app.stage.addChild(ground);
    app.stage.addChild(panel);

    /* Load resources */
    const loader = PIXI.Loader.shared;
    loader.load((loader, resources) => {
        panel.show(resources);
        ground.show(resources);
    });
}

Welcome.welcome(startGame);
