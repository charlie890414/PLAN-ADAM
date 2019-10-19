import * as PIXI from 'pixi.js';
import Playground from './playground';
import HUD from './hud';
import Welcome from './welcome';
import DrawPlanet from './draw';
import * as $ from 'jquery';

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

    drawPlanet = new DrawPlanet({
        resolution: 1024,
        width: 1980,
        height: 1080
    }, drawPlanet.controls);

}

global.drawPlanet = new DrawPlanet({
    resolution: 512,
    width: 250,
    height: 250
});

global.drawStar = new DrawPlanet({
    resolution: 512,
    width: 250,
    height: 250
}, { waterLevel: 0})

document.querySelector('#planet .model').appendChild(drawPlanet.solid);
document.querySelector('#star .model').appendChild(drawStar.solid);

$('#planet input[type=range]').on('input', function() {

});

$('#planet input[type=range]').on('input', function() {

});


Welcome.welcome(startGame);
