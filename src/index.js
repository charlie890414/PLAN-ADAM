import * as PIXI from 'pixi.js';
import Playground from './playground';
import HUD from './hud';
import Welcome from './welcome';
import DrawPlanet from './draw';

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

    document.getElementById('app').remove();
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

global.drawPlanet = new DrawPlanet();
document.querySelector('#planet .model').appendChild(drawPlanet.solid);
Welcome.welcome(startGame);
