/* Init Parse SDK */
Parse.initialize("NASA_2019_SEAL", "SBsm7FTJdh4TdgDt");
Parse.serverURL = 'http://140.115.50.100:1337/parse';

/* Init PIXI JS */
let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas";
}

PIXI.utils.sayHello(type);

let app = new PIXI.Application({ 
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true,
    transparent: false,
    resolution: 1
  }
);
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
});