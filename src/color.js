let SOLID_COLOR_MAP = {
    "銅": 0xFF0000,
    "鐵": 0xC0C0C0,
    "碳": 0x000000,
    "氧化鐵": 0xA52A2A, //Fe2O3
};

let LIQUID_COLOR_MAP = {
    "水": 0x00FF00
};

let GAS_COLOR_MAP = {
    "氫": -1,
    "氧": -1,
    "氮": -1,
    "氯": 0x7FFF00,
};

/* 
composition = {
    "氮": 70,
    "氧": 30
}
*/

function HEX_TO_COLOR(HEX) {
    return "#" + HEX.toString(16).replace("0x", "");
}
// HEX_TO_COLOR(0xffffff);

function CHEMICAL(composition) {
    return composition;
}

function MIX_COLOR(composition) {
    colorless = 0;
    percentage = 0;
    COLOR = null;
    composition = CHEMICAL(composition);
    for (let key in composition) {
        if (SOLID_COLOR_MAP[key] == -1 || GAS_COLOR_MAP[key] == -1 || LIQUID_COLOR_MAP[key] == -1) {
            colorless += composition[key];
            delete composition[key];
        } else {
            percentage += composition[key];
        }
    }
    for (let key in composition) {
        composition[key] += composition[key] / percentage * colorless;
    }
    for (let key in composition) {
        console.log(key, composition[key]);
        if (GAS_COLOR_MAP[key]) {
            COLOR += GAS_COLOR_MAP[key] * composition[key] / 100;
        }
    }
    COLOR = Math.floor(COLOR);
    console.log(HEX_TO_COLOR(COLOR));
    return HEX_TO_COLOR(COLOR);
}