import * as PIXI from 'pixi.js';
import { MIX_COLOR } from './color';
import { Application } from './draw';

export class Star {

    /**
     * 更新預覽
     * @param {Objec} param - 星球的屬性集合
     * @param {number} param.radius - 半徑
     * @param {number} param.mass - 質量
     * @param {number} param.water - 水
     * @param {number} param.temperature - 溫度
     * @param {number} param.spin - 自轉速度
     */
    static update(param) {
        this.param = param;
        console.log(param);
    }

    /**
     * @returns {Objec} Object same as update
     */
    static fetch() {
        this.param.g = (((6.67 * 10) ^ -11) * this.param.mass) / this.radius ^ 2
        return this.param;
    }
}

export class Planet {

    /**
     * 更新預覽
     * @param {Objec} param - 星球的屬性集合
     * @param {number} param.radius - 半徑
     * @param {number} param.mass - 質量
     * @param {number} param.oxygen - 氧氣
     * @param {number} param.nitro - 氮氣
     * @param {number} param.hydrogen - 氫氣
     * @param {number} param.chlorine - 氯氣
     * @param {number} param.nto - 二氧化氮
     * @param {number} param.cot - 二氧化碳
     * @param {number} param.methane - 甲烷
     * @param {number} param.iron - 鐵
     * @param {number} param.copper - 銅
     * @param {number} param.spin - 自轉速度
     * @param {number} param.water - 水
     * @param {number} param.distance - 距離
     * @param {number} param.angular - 角速度
     */
    static update(param) {
        this.param = param;
        console.log(param);
        let SOLID_COLOR, LIQUID_COLOR, GAS_COLOR = MIX_COLOR(param);
        drawPlanet.controls.cloudColor = GAS_COLOR;
        drawPlanet.controls.render();
    }

    /**
     * @returns {Objec} Object same as update
     */
    static fetch() {
        this.param.g = (((6.67 * 10) ^ -11) * this.param.mass) / this.radius ^ 2;
        return this.param;
    }
}