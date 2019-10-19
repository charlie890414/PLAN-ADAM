import * as $ from 'jquery';
import { Star, Planet } from './planet';

export default class welcome {
  static welcome(app) {
    var rangeSlider = function () {
      var slider = $('.range-slider'),
        range = $('.range-slider input[type="range"]'),
        value = $('.range-value');
      slider.each(function () {
        value.each(function () {
          var value = $(this).prev().attr('value');
          $(this).html(value);
        });
        range.on('input', function () {
          $(this).next(value).html(this.value);
        });
      });
    };
    rangeSlider();

    this.preview = {
      star: new Star({ w: 500, h: 250 }),
      planet: new Planet({ w: 500, h: 250 })
    }

    let config = (T, Mass, Radius) => {
      let Color;

      if (T >= 2200 && T < 3700) {
        Color = 0xFF3333;
        if (Mass < 0.08 || Mass > 0.45) {
          Mass = 0.08;
        }
        if (Radius < 0.2 || Radius > 0.7) {
          Radius = 0.2;
        }
      } else if (T >= 3700 && T < 5200) {
        Color = 0xFF5511;
        if (Mass < 0.08 || Mass > 0.45) {
          Mass = 0.08;
        }
        if (Radius < 0.7 || Radius > 0.96) {
          Radius = 0.7;
        }
      } else if (T >= 5200 && T < 6000) {
        Color = 0xFFFF00;
        if (Mass < 0.45 || Mass > 0.8) {
          Mass = 0.45;
        }
        if (Radius < 0.96 || Radius > 1.15) {
          Radius = 0.96;
        }
      } else if (T >= 6000 && T < 7500) {
        Color = 0xFFFFFF;
        if (Mass < 0.8 || Mass > 1.4) {
          Mass = 0.8;
        }
        if (Radius < 1.15 || Radius > 1.4) {
          Radius = 1.15;
        }
      } else if (T >= 7500 && T < 10000) {
        Color = 0xBBFFEE;
        if (Mass < 1.4 || Mass > 2.1) {
          Mass = 1.4;
        }
        if (Radius < 1.4 || Radius > 1.8) {
          Radius = 1.4;
        }
      } else if (T >= 10000 && T < 30000) {
        Color = 0x00FFFF;
        if (Mass < 2.1 || Mass > 16) {
          Mass = 0.08;
        }
        if (Radius < 1.8 || Radius > 6.6) {
          Radius = 1.8;
        }
      } else if (T >= 30000) {
        Color = 0x0066FF;
        if (Mass < 16) Mass = 16;
        if (Radius < 6.6) Radius = 6.6;
      }

      return {color: Color, mass: Mass, radius: Radius};
    }

    $('#star').on('change', 'input[type=range]', () => {
      let data = config(parseInt($('#star-temperature').val()), parseInt($('#star-mass').val()), parseInt($('#star-radius').val()));
      if(parseInt($('#star-mass').val()) > data.mass) {
        $('#star-mass').val(data.mass).trigger('input');
      }
      if(parseInt($('#star-radius').val()) < data.radius) {
        $('#star-radius').val(data.radius).trigger('input');
      }

      Star.update(data);
    })

    $('#planet input[type=range]').on('change', () => {
      Planet.update({
        radius: $('#planet-radius').val(),
        mass: $('#planet-mass').val(),
        water: $('#planet-water').val(),
        oxygen: $('#planet-oxygen').val(),
        nitro: $('#planet-nitro').val(),
        hydrogen: $('#planet-hydrogen').val(),
        chlorine: $('#planet-chlorine').val(),
        nto: $('#planet-nto').val(),
        cot: $('#planet-cot').val(),
        methane: $('#planet-methane').val(),
        iron: $('#planet-iron').val(),
        copper: $('#planet-copper').val(),
        spin: $('#planet-spin').val(),
        distance: $('#planet-distance').val(),
        angular: $('#planet-angular').val()
      })
    })
    $('#planet input[type=range], #star input[type=range]').change();
    $('#submit').on('click', function () {
      app();
    })
  }
}