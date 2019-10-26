import * as PIXI from 'pixi.js';
import Playground from './playground';
import HUD from './hud';
import Welcome from './welcome';
import DrawPlanet from './draw';
import * as $ from 'jquery';
import 'bootstrap';

function startGame() {
    $(document).unbind('keydown');
    loading(document.body)

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
                $('#loading').remove();
                $('#exampleModalCenter1').modal();
                $('#carouselExampleIndicators1').carousel(0);
            });



        }]
    }, drawPlanet.controls);

    $(document).on('keydown', function(e) {
      if(e.keyCode === 72) {
        if($('#exampleModalCenter1').hasClass('show')) {
          $('#exampleModalCenter1').modal('hide');
        } else {
          $('#exampleModalCenter1').modal();
          $('#carouselExampleIndicators1').carousel(0);
        }
      }
    })
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


$('.range-slider').click(function(e) {
  if(($(this).parent().parent().parent().parent().attr('id') !== "star") && e.target.tagName !== 'INPUT' && !$(this).parent().hasClass('big-solid') && !$(this).parent().hasClass('big-liquid') && !$(this).parent().hasClass('big-gas')) {
    if($(this).hasClass('expand')) {
      if($(this).hasClass('range-slider-even')) {
        $(this).parent().prev().animate({
          opacity: 1,
          marginLeft: 0
        }, 700);
      } else if($(this).hasClass('range-slider-odd')) {
        $(this).parent().next().show().animate({
          opacity: 1,
          marginLeft: 550 - $(this).parent().width()
        }, 700);
      }
      $(this).removeClass('expand');
    } else {
      $(this).addClass('expand');
      if($(this).hasClass('range-slider-even')) {
        $(this).parent().prev().animate({
          opacity: 0,
          marginLeft: -$(this).parent().prev().width()
        });
      } else if($(this).hasClass('range-slider-odd')) {
        $(this).parent().next().animate({
          opacity: 0,
          marginLeft: -$(this).parent().next().width()
        }, undefined, undefined, () => {
          $(this).parent().next().hide();
        });
      }
    }
  }

})

$('#carouselExampleIndicators').carousel();
$('#exampleModalCenter').modal();

$(document).on('keydown', function (e) {
  if(e.keyCode === 72) {
    if($('#exampleModalCenter2').hasClass('show')) {
      $('#exampleModalCenter2').modal('hide');
    } else {
      $('#carouselExampleIndicators2').carousel(0);
      $('#exampleModalCenter2').modal();
    }
  }
})

$('#about').click(function() {
  $('#exampleModalCenter').modal();
  $('#carouselExampleIndicators').carousel(0);
})

$('#planet-mass').on('input', function () {
  if(parseFloat(this.value) < 100) {
    this.step = 0.01;
    this.min = 0.1;
  } else {
    this.step = 1;
    this.min = 0;
  }
})

$('.range-val').on('keydown', function (e) {
  if((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode === 46 || e.keyCode === 8 || (e.keyCode >= 37 && e.keyCode <= 40) || e.keyCode === 110 || e.keyCode === 190 || (e.keyCode >= 96 && e.keyCode <= 105)) {
  } else {
    return false;
  }
})

$('.range-val').on('input', function (params) {
  $(this).parent().prev().val(parseFloat($(this).text())).change();
})

$('.range-val').on('focus focusout', function () {
  $(this).text($(this).parent().prev().val());
})

$('.reset-elem').on('click', function () {
  if(this.id !== '#planet-reset' || this.id !== '#star-reset') {
    $(this).siblings('.dropdown-menu').find('input[type=range]').val(0).change();
  }
})

$('#star-reset, #planet-reset').on('click', function () {
  $(this).parent().siblings('.configs').find('input[type=range]').each((idx, el) => {
    $(el).val($(el).attr('value')).change();
  })
})

Welcome.welcome(startGame);


function loading(el) {
    let html = `<div id="loading"><div id="div-loading"><div id="loading-background"></div><div id="loading-text"></div></div></div>`;
    $(el).append(html);
}