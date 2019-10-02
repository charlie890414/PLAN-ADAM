/* Init Parse SDK */
Parse.initialize("YOUR_APP_ID", "YOUR_JAVASCRIPT_KEY");
Parse.serverURL = 'http://YOUR_PARSE_SERVER:1337/parse';

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