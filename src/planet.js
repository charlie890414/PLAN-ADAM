import * as PIXI from 'pixi.js';
import {
    MIX_COLOR
} from './color';
import {
    Application
} from './draw';

export class Star {

    /**
     * 更新預覽
     * @param {Object} param - 星球的屬性集合
     * @param {number} param.radius - 半徑
     * @param {number} param.mass - 質量
     * @param {number} param.water - 水
     * @param {number} param.temperature - 溫度
     * @param {number} param.spin - 自轉速度
     */
    static update(data) {
        this.param = data;
        drawStar.controls.cloudColor = '#' + data.color.toString(16).padStart(6, '0');
        drawStar.controls.landColor1 = '#' + data.color.toString(16).padStart(6, '0');
        drawStar.controls.landColor2 = '#' + data.color.toString(16).padStart(6, '0');
        drawStar.controls.render();
    }

    /**
     * @returns {Objec} Object same as update
     */
    static fetch() {
        this.param.g = (this.param.mass) / Math.pow(this.param.radius, 2);//(Math.pow(6.67 * 10, -11) *
        return this.param;
    }
}

export class Planet {

    /**
     * 更新預覽
     * @param {Object} param - 星球的屬性集合
     * @param {number} param.radius - 半徑
     * @param {number} param.mass - 質量
     * @param {number} param.O2 - 氧氣
     * @param {number} param.N - 氮氣
     * @param {number} param.H2 - 氫氣
     * @param {number} param.Cl - 氯氣
     * @param {number} param.NO2 - 二氧化氮
     * @param {number} param.CO2 - 二氧化碳
     * @param {number} param.CH4 - 甲烷
     * @param {number} param.Fe - 鐵
     * @param {number} param.Cu - 銅
     * @param {number} param.spin - 自轉速度
     * @param {number} param.H2O - 水
     * @param {number} param.distance - 距離
     * @param {number} param.angular - 公轉速度
     */
    static update(param) {
        for (let item in param) {
            param[item] = parseInt(param[item]);
        }
        this.param = param;
        let {
            SOLID_COLOR,
            LIQUID_COLOR,
            GAS_COLOR
        } = MIX_COLOR(param);
        drawPlanet.controls.cloudColor = GAS_COLOR;
        drawPlanet.controls.waterDeep = LIQUID_COLOR;
        drawPlanet.controls.landColor1 = SOLID_COLOR;
        drawPlanet.controls.landColor2 = SOLID_COLOR;
        drawPlanet.controls.render();
    }

    /**
     * @returns {Objec} Object same as update
     */
    static fetch() {
        this.param.g = (this.param.mass) / Math.pow(this.param.radius, 2);//(Math.pow(6.67 * 10, -11) *
        console.log(this.param.g);
        console.log(this.param.mass);
        console.log(this.param.radius);
        return this.param;
    }

}