const Parse = require('parse');
import * as PIXI from 'pixi.js';
import Playground from './playground';
import HUD from './hud';
import Splash from './splash';

/* Init Parse SDK */
Parse.initialize("NASA_2019_SEAL", "SBsm7FTJdh4TdgDt");
Parse.serverURL = 'http://140.115.50.100:1337/parse';

/* Init PIXI JS */
let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}

PIXI.utils.sayHello(type);

const app = global.app = new PIXI.Application({
    antialias: true,
    transparent: false,
    resolution: 1,
    resizeTo: window
});
document.body.appendChild(app.view);


/* Setup game */
const ground = global.ground = new Playground();
const panel = global.panel = new HUD();
const splash = new Splash();

app.stage.addChild(ground);
app.stage.addChild(panel);
app.stage.addChild(splash);

/* Load resources */
const loader = PIXI.Loader.shared;

splash.register(loader);
loader.load((loader, resources) => {
    ground.loaded(resources);
    panel.loaded(resources);

    ground.setTicker(app.ticker);
    panel.setTicker(app.ticker);
});