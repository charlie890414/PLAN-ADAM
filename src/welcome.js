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

      return { color: Color, mass: Mass, radius: Radius };
    }

    $('#star').on('change', 'input[type=range]', () => {
      let data = config(parseInt($('#star-temperature').val()), parseInt($('#star-mass').val()), parseInt($('#star-radius').val()));
      if (parseInt($('#star-mass').val()) > data.mass) {
        $('#star-mass').val(data.mass).trigger('input');
      }
      if (parseInt($('#star-radius').val()) < data.radius) {
        $('#star-radius').val(data.radius).trigger('input');
      }

      Star.update(data);
    })

    $('#planet input[type=range]').on('change', () => {
      Planet.update({
        radius: parseFloat($('#planet-radius').val()),
        mass: parseFloat($('#planet-mass').val()),
        H2O: parseFloat($('#planet-water').val()),
        O2: parseFloat($('#planet-oxygen').val()),
        N2: parseFloat($('#planet-nitro').val()),
        H2: parseFloat($('#planet-hydrogen').val()),
        Cl: parseFloat($('#planet-chlorine').val()),
        NO2: parseFloat($('#planet-nto').val()),
        CO2: parseFloat($('#planet-cot').val()),
        CH4: parseFloat($('#planet-methane').val()),
        Fe: parseFloat($('#planet-iron').val()),
        Cu: parseFloat($('#planet-copper').val()),
        Fe2O3: parseFloat($('#planet-Fe2O3').val()),
        CuOH2: parseFloat($('#planet-CuOH2').val()),
        CuSO4: parseFloat($('#planet-CuSO4').val()),
        KMnO4: parseFloat($('#planet-KMnO4').val()),
        S: parseFloat($('#planet-S').val()),
        ice: parseFloat($('#planet-ice').val()),
        Au: parseFloat($('#planet-Au').val()),
        Mg: parseFloat($('#planet-Mg').val()),
        Hg: parseFloat($('#planet-Hg').val()),
        C: parseFloat($('#planet-C').val()),
        CuO: parseFloat($('#planet-CuO').val()),
        MnO2: parseFloat($('#planet-MnO2').val()),
        Fe3O4: parseFloat($('#planet-Fe3O4').val()),
        FeS: parseFloat($('#planet-FeS').val()),
        FeOH3: parseFloat($('#planet-FeOH3').val()),
        NaCl: parseFloat($('#planet-NaCl').val()),
        NaHCO3: parseFloat($('#planet-NaHCO3').val()),
        NaOH: parseFloat($('#planet-NaOH').val()),
        CaOH: parseFloat($('#planet-CaOH').val()),
        CaCO3: parseFloat($('#planet-CaCO3').val()),
        CaO: parseFloat($('#planet-CaO').val()),
        MgO: parseFloat($('#planet-MgO').val()),
        Al: parseFloat($('#planet-Al').val()),
        H2O2: parseFloat($('#planet-H2O2').val()),
        CuCl2: parseFloat($('#planet-CuCl2').val()),
        CuNO32: parseFloat($('#planet-CuNO32').val()),
        FeSO4: parseFloat($('#planet-FeSO4').val()),
        FeCl3: parseFloat($('#planet-FeCl3').val()),
        H2SO4: parseFloat($('#planet-H2SO4').val()),
        KMnO4: parseFloat($('#planet-KMnO4').val()),
        C7H7O4N: parseFloat($('#planet-C7H7O4N').val()),
        CO: parseFloat($('#planet-CO').val()),
        SO2: parseFloat($('#planet-SO2').val()),
        HCl: parseFloat($('#planet-HCl').val()),
        spin: parseFloat($('#planet-spin').val()),
        distance: parseFloat($('#planet-distance').val()),
        angular: parseFloat($('#planet-angular').val())
      })

      for(const item of ['solid', 'liquid', 'gas']) {
        let sum = 0;
        $(`.big-${item} input[type=range]`).each((idx, el) => sum += parseInt(el.value));
        $(`.big-${item} .range-value:eq(0)`).text(sum + '%');
      }
    })

    $('#planet input[type=range], #star input[type=range]').change();
    $('#submit').on('click', function () {
      app();
    })
  }
}