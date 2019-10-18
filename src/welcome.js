import * as $ from 'jquery';
import { Solar, Planet } from './';

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
      star: new PreviewSolar({w: 500, h: 250}),
      planet: new PreviewPlanet({w: 500, h: 250})
    }

    let el1 = document.createElement('canvas');
    let el2 = document.createElement('canvas');
    $('#star .model').append(el1);
    $('#planet .model').append(el2);
    el1.width = el2.width = 500;
    el1.height = el2.height = 250;

    $('#star').on('input', 'input[type=range]', () => {
      this.preview.star.update({
        radius: $('#star-radius').val(),
        mass: $('#star-mass').val(),
        water: $('#star-water').val(),
        temperature: $('#star-temperature').val(),
        spin: $('#star-spin').val(),
        el: el1
      })
    })

    $('#planet input[type=range]').on('input', () => {
      this.preview.planet.update({
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
        el: el2
      })
    })

    $('#submit').on('click', function () {
      $('#app').remove();
      app();
    })
  }
}