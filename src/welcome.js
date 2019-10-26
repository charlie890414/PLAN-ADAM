import * as $ from 'jquery';
import { Star, Planet } from './planet';

export default class welcome {
  static welcome(app) {
    console.log("Test CI");
    var rangeSlider = function () {
      var slider = $('.range-slider'),
        range = $('.range-slider input[type="range"]'),
        value = $('.range-value');
      slider.each(function () {
        value.each(function () {
          var value = $(this).prev().attr('value');
          $(this).find('.range-val').html(value);
        });
        range.on('input', function () {
          $(this).next(value).find('.range-val').html(this.value);
        });
      });
    };
    rangeSlider();

    this.preview = {
      star: new Star({ w: 500, h: 250 }),
      planet: new Planet({ w: 500, h: 250 })
    }

    let calcPercent = (min, max, i) => Math.floor((i - min) / (max - min) * 100 * 1000) / 1000;

    let config = (T, Mass, Radius, NT = 2200, MT = 15000, NMass = 0.08, MMass = 3, NRadius = 0.2, MRadius = 2.2) => {
      let Color;
      if (Mass < 0.45) {
        Color = 0xFF3333;
        Radius = {
          range: [0.2, 0.7],
          background: `linear-gradient(90deg, #ddd 0%, #ddd ${calcPercent(NRadius, MRadius, 0.2)}%, var(--star) ${calcPercent(NRadius, MRadius, 0.2)}%, var(--star) ${calcPercent(NRadius, MRadius, 0.7)}%, #ddd ${calcPercent(NRadius, MRadius, 0.7)}%)`
        };
        T = {
          range: [2200, 3700],
          background: `linear-gradient(90deg, #ddd 0%, #ddd ${calcPercent(NT, MT, 2200)}%, var(--star) ${calcPercent(NT, MT, 2200)}%, var(--star) ${calcPercent(NT, MT, 3700)}%, #ddd ${calcPercent(NT, MT, 3700)}%)`
        };
      } else if (Mass >= 0.45 && Mass < 0.8) {
        Color = 0xFF5511;
        Radius = {
          range: [0.7, 0.96],
          background:  `linear-gradient(90deg, #ddd 0%, #ddd ${calcPercent(NRadius, MRadius, 0.7)}%, var(--star) ${calcPercent(NRadius, MRadius, 0.7)}%, var(--star) ${calcPercent(NRadius, MRadius, 0.96)}%, #ddd ${calcPercent(NRadius, MRadius, 0.96)}%)`
        };
        T = {
          range: [3700, 5200],
          background: `linear-gradient(90deg, #ddd 0%, #ddd ${calcPercent(NT, MT, 3700)}%, var(--star) ${calcPercent(NT, MT, 3700)}%, var(--star) ${calcPercent(NT, MT, 5200)}%, #ddd ${calcPercent(NT, MT, 5200)}%)`
        };
      } else if (Mass >= 0.8 && Mass < 1.04) {
        Color = 0xFFFF00;
        Radius = {
          range: [0.96, 1.15],
          background:  `linear-gradient(90deg, #ddd 0%, #ddd ${calcPercent(NRadius, MRadius, 0.96)}%, var(--star) ${calcPercent(NRadius, MRadius, 0.96)}%, var(--star) ${calcPercent(NRadius, MRadius, 1.15)}%, #ddd ${calcPercent(NRadius, MRadius, 1.15)}%)`
        };
        T = {
          range: [5200, 6000],
          background: `linear-gradient(90deg, #ddd 0%, #ddd ${calcPercent(NT, MT, 5200)}%, var(--star) ${calcPercent(NT, MT, 5200)}%, var(--star) ${calcPercent(NT, MT, 6000)}%, #ddd ${calcPercent(NT, MT, 6000)}%)`
        };

      } else if (Mass >= 1.04 && Mass < 1.4) {
        Color = 0xFFFFFF;
        Radius = {
          range: [1.15, 1.4],
          background:  `linear-gradient(90deg, #ddd 0%, #ddd ${calcPercent(NRadius, MRadius, 1.15)}%, var(--star) ${calcPercent(NRadius, MRadius, 1.15)}%, var(--star) ${calcPercent(NRadius, MRadius, 1.4)}%, #ddd ${calcPercent(NRadius, MRadius, 1.4)}%)`
        };
        T = {
          range: [6000, 7500],
          background: `linear-gradient(90deg, #ddd 0%, #ddd ${calcPercent(NT, MT, 6000)}%, var(--star) ${calcPercent(NT, MT, 6000)}%, var(--star) ${calcPercent(NT, MT, 7500)}%, #ddd ${calcPercent(NT, MT, 7500)}%)`
        };

      } else if (Mass >= 1.4 && Mass < 2.1) {
        Color = 0xBBFFEE;
        Radius = {
          range: [1.4, 1.8],
          background:  `linear-gradient(90deg, #ddd 0%, #ddd ${calcPercent(NRadius, MRadius, 1.4)}%, var(--star) ${calcPercent(NRadius, MRadius, 1.4)}%, var(--star) ${calcPercent(NRadius, MRadius, 1.8)}%, #ddd ${calcPercent(NRadius, MRadius, 1.8)}%)`
        };
        T = {
          range: [7500, 10000],
          background: `linear-gradient(90deg, #ddd 0%, #ddd ${calcPercent(NT, MT, 7500)}%, var(--star) ${calcPercent(NT, MT, 7500)}%, var(--star) ${calcPercent(NT, MT, 10000)}%, #ddd ${calcPercent(NT, MT, 10000)}%)`
        };

      } else if (Mass >= 2.1 && Mass <= 3) {
        Color = 0x00FFFF;
        Radius = {
          range: [1.8, 2.2],
          background:  `linear-gradient(90deg, #ddd 0%, #ddd ${calcPercent(NRadius, MRadius, 1.8)}%, var(--star) ${calcPercent(NRadius, MRadius, 1.8)}%, var(--star) ${calcPercent(NRadius, MRadius, 2.2)}%, #ddd ${calcPercent(NRadius, MRadius, 2.2)}%)`
        };
        T = {
          range: [10000, 15000],
          background: `linear-gradient(90deg, #ddd 0%, #ddd ${calcPercent(NT, MT, 10000)}%, var(--star) ${calcPercent(NT, MT, 10000)}%, var(--star) ${calcPercent(NT, MT, 15000)}%, #ddd ${calcPercent(NT, MT, 15000)}%)`
        };
      }

      return { color: Color, temperature: T, radius: Radius };
    }
    let ttime, rtime;
    $('#star').on('change input', 'input[type=range]', () => {
      let data = config(parseFloat($('#star-temperature').val()), parseFloat($('#star-mass').val()), parseFloat($('#star-radius').val()));
      $('#star-temperature').attr('style', 'background: ' + data.temperature.background);
      $('#star-radius').attr('style', 'background: ' + data.radius.background);

      if (parseFloat($('#star-temperature').val()) < data.temperature.range[0] || parseFloat($('#star-temperature').val()) > data.temperature.range[1]) {
        if(parseFloat($('#star-temperature').val()) < data.temperature.range[0]) {
          $('#star-temperature').val(data.temperature.range[0]);
          $('#star-temperature').next().find('.range-val').text(data.temperature.range[0])
        } else {
          $('#star-temperature').val(data.temperature.range[1]);
          $('#star-temperature').next().find('.range-val').text(data.temperature.range[1])
        }
        clearTimeout(ttime);
        $('#st-hint')
        .text(`The mass is ${parseFloat($('#star-mass').val())}, So temperature range must be ${data.temperature.range[0]} to ${data.temperature.range[1]}`)
        .fadeIn(200, undefined, () => ttime = setTimeout(() => $('#st-hint').fadeOut(300), 3000));
      }

      if (parseFloat($('#star-radius').val()) < data.radius.range[0] || parseFloat($('#star-radius').val()) > data.radius.range[1]) {
        if(parseFloat($('#star-radius').val()) < data.radius.range[0]) {
          $('#star-radius').val(data.radius.range[0]);
          $('#star-radius').next().find('.range-val').text(data.radius.range[0])
        } else {
          $('#star-radius').val(data.radius.range[1]);
          $('#star-radius').next().find('.range-val').text(data.radius.range[1])
        }

        clearTimeout(rtime);
        $('#sr-hint')
        .text(`The mass is ${parseFloat($('#star-mass').val())}, So radius range must be ${data.radius.range[0]} to ${data.radius.range[1]}`)
        .fadeIn(200, undefined, () => rtime = setTimeout(() => $('#sr-hint').fadeOut(300), 3000));
      }
      Star.update({
        temperature: parseFloat($('#star-temperature').val()),
        mass: parseFloat($('#star-mass').val()),
        radius: parseFloat($('#star-radius').val()),
        color: data.color
      });
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

      for (const item of ['solid', 'liquid', 'gas']) {
        let sum = 0;
        $(`.big-${item} input[type=range]`).each((idx, el) => sum += parseInt(el.value));
        $(`.big-${item} .range-value:eq(0)`).text(sum + ' %');
      }
    })

    $('#planet input[type=range], #star input[type=range]').change();
    $('#submit').on('click', function () {
      app();
    })
  }
}