import * as PIXI from 'pixi.js';
import Playground from './playground';
import HUD from './hud';
import Welcome from './welcome';
import DrawPlanet from './draw';
import * as $ from 'jquery';
import 'bootstrap';

function startGame() {

    global.drawPlanet = new DrawPlanet({
        resolution: 1024,
        width: 1980,
        height: 1080,
        callback: [() => {
            /* Init PIXI JS */
            const type = PIXI.utils.isWebGLSupported() ? 'WebGL' : 'canvas';
            PIXI.utils.sayHello(type);

            global.app = new PIXI.Application({
                antialias: true,
                transparent: false,
                resolution: 1,
                resizeTo: window
            });

            cancelAnimationFrame(global.drawPlanet.frameid);
            cancelAnimationFrame(global.drawStar.frameid);
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
        }]
    }, drawPlanet.controls);



}

global.drawPlanet = new DrawPlanet({
    resolution: 128,
    width: 250,
    height: 250
}, { waterLevel: .68 });

global.drawStar = new DrawPlanet({
    resolution: 128,
    width: 250,
    height: 250
}, { waterLevel: 0 })

document.querySelector('#planet .model').appendChild(drawPlanet.solid);
document.querySelector('#star .model').appendChild(drawStar.solid);

$('.elm').each((idx, el) => {
    el.addEventListener('input', function (e) {
        let sum = 0;
        $('.elm').each((idx, el) => sum += el.id === this.id ? 0 : parseInt(el.value));
        if (sum + parseInt(this.value) > 100) {
            this.value = 100 - sum;
            return false;
        }
    })
})

$('.dropdown-toggle').dropdown();

Welcome.welcome(startGame);
