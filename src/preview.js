import * as PIXI from 'pixi.js';

export class PreviewSolar extends  PIXI.Application {
    /**
     *
     * @param {number} w - 寬度
     * @param {number} h - 高度
     */
    constructor(w,h){
        super({
            width: w,
            height: h,
            antialias: true,
            transparent: false,
            resolution: 1
        });
    }

    /**
     * 更新預覽
     * @param {Objec} param - 星球的屬性集合
     * @param {number} param.radius - 半徑
     * @param {number} param.mass - 質量
     * @param {number} param.water - 水
     * @param {number} param.temperature - 溫度
     * @param {number} param.spin - 自轉速度
     */
    update(param) {
        console.log(param);
    }
}

export class PreviewPlanet extends  PIXI.Application {
    /**
     *
     * @param {number} w - 寬度
     * @param {number} h - 高度
     */
    constructor(w,h){
        super({
            width: w,
            height: h,
            antialias: true,
            transparent: false,
            resolution: 1
        });
    }

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
     */
    update(param) {
        console.log(param);
    }
}