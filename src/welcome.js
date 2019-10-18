import * as $ from 'jquery';
import {PreviewSolar, PreviewPlanet} from './preview';

export default class welcome {
  static welcome(app) {
    var rangeSlider = function(){
        var slider = $('.range-slider'),
            range = $('.range-slider input[type="range"]'),
            value = $('.range-value');
        slider.each(function(){
            value.each(function(){
                var value = $(this).prev().attr('value');
                $(this).html(value);
            });
            range.on('input', function(){
                $(this).next(value).html(this.value);
            });
        });
    };
    rangeSlider();

    this.preview = {
      star: new PreviewSolar(),
      planet: new PreviewPlanet()
    }

    $('#star').on('input', 'input[type=range]', () => {
      this.preview.star.update({
        radius: $('#star-radius').val(),
        mass: $('#star-mass').val(),
        water: $('#star-water').val(),
        temperature: $('#star-temperature').val(),
        spin: $('#star-spin').val()
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
        spin: $('#planet-spin').val()
      })
    })
  }
}