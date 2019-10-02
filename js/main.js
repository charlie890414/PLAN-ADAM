/* Init Parse SDK */
Parse.initialize("NASA_2019_SEAL", "SBsm7FTJdh4TdgDt");
Parse.serverURL = 'http://140.115.50.100:1337/parse';

/* Init PIXI JS */
let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
}

PIXI.utils.sayHello(type)

let app = new PIXI.Application({ 
    width: 256,
    height: 256,
    antialias: true,
    transparent: false,
    resolution: 1
  }
);