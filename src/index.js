/* Init Parse SDK */
Parse.initialize("NASA_2019_SEAL", "SBsm7FTJdh4TdgDt");
Parse.serverURL = 'http://140.115.50.100:1337/parse';

/* Init PIXI JS */
let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}

PIXI.utils.sayHello(type);

let app = new PIXI.Application({
    antialias: true,
    transparent: false,
    resolution: 1,
    resizeTo: window
});
document.body.appendChild(app.view);


/* Setup game */
let ground = new Playground();
let panel = new HUD();
app.stage.addChild(ground);
app.stage.addChild(panel);

/* Load resources */
const loader = PIXI.Loader.shared;

loader.load((loader, resources) => {
    ground.loaded(resources);
    panel.loaded(resources);

    ground.setTicker(app.ticker);
    panel.setTicker(app.ticker);
});

/* Keyboard */
document.addEventListener('keydown', onKeyDown);

function onKeyDown(key) {
    const player = ground.player;
    // W Key is 87
    // Up arrow is 87
    if (key.keyCode === 87 || key.keyCode === 38) {
        player.y -= 5;
    }

    // S Key is 83
    // Down arrow is 40
    if (key.keyCode === 83 || key.keyCode === 40) {
        player.y += 5;
    }

    // A Key is 65
    // Left arrow is 37
    if (key.keyCode === 65 || key.keyCode === 37) {
        player.x -= 5;
    }

    // D Key is 68
    // Right arrow is 39
    if (key.keyCode === 68 || key.keyCode === 39) {
        player.x += 5;
    }
}