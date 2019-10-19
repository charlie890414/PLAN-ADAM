let SOLID_COLOR_MAP = {
    "copper": 0xFF0000,
    "iron": 0xC0C0C0,
    "carbon": 0x000000,
    "ferric_oxide": 0xA52A2A, //Fe2O3
};

let LIQUID_COLOR_MAP = {
    "water": 0x61a3ff
};

let GAS_COLOR_MAP = {
    "Hydrogen": -1,
    "oxygen": -1,
    "nitro": -1,
    "Chlorine": 0x7FFF00,
};

function HEX_TO_COLOR(HEX) {
    return "#" + HEX.toString(16).replace("0x", "");
}
// HEX_TO_COLOR(0xffffff);

function CHEMICAL(composition) {
    let ferric_oxide = 0;
    let iron = composition.iron / 56;
    let oxygen = composition.oxygen / 32;
    let water = composition.water / 18;

    let minist = Math.min(iron / 4, oxygen / 3, water / 2);
    if (iron / 4 == minist) {
        ferric_oxide = iron / 4 * 2;
        oxygen -= iron / 4 * 3;
        iron = 0;
    } else if (oxygen / 3 == minist) {
        ferric_oxide = oxygen / 3 * 2;
        iron -= oxygen / 3 * 4;
        oxygen = 0;
    } else if (water / 2 == minist) {
        water = water;
    }
    composition.ferric_oxide = ferric_oxide * 160;
    composition.iron = iron * 56;
    composition.oxygen = oxygen * 32;
    composition.water = water * 18;
    return composition;
}

export function MIX_COLOR(composition) {
    let SOLID_COLOR = null;
    let LIQUID_COLOR = null;
    let GAS_COLOR = null;

    let SOLID_padding = 0;
    let SOLID_percentage = 0;

    let LIQUID_padding = 0;
    let LIQUID_percentage = 0;

    let GAS_padding = 0;
    let GAS_percentage = 0;

    composition = CHEMICAL(composition);

    for (let key in composition) {
        if ((SOLID_COLOR_MAP[key] == -1 || GAS_COLOR_MAP[key] == -1 || LIQUID_COLOR_MAP[key] == -1) && key != "el") {
            SOLID_padding += parseInt(composition[key]);
            LIQUID_padding += parseInt(composition[key]);
            GAS_padding += parseInt(composition[key]);
            delete composition[key];
        } else if (SOLID_COLOR_MAP[key]) {
            SOLID_percentage += parseInt(composition[key]);
            LIQUID_padding += parseInt(composition[key]);
            GAS_padding += parseInt(composition[key]);
        } else if (LIQUID_COLOR_MAP[key]) {
            SOLID_padding += parseInt(composition[key]);
            LIQUID_percentage += parseInt(composition[key]);
            GAS_padding += parseInt(composition[key]);
        } else if (GAS_COLOR_MAP[key]) {
            SOLID_padding += parseInt(composition[key]);
            LIQUID_padding += parseInt(composition[key]);
            GAS_percentage += parseInt(composition[key]);
        }
    }

    for (let key in composition) {
        if (SOLID_COLOR_MAP[key]) {
            console.log(key, (composition[key] + composition[key] / SOLID_percentage * SOLID_padding));
            SOLID_COLOR += SOLID_COLOR_MAP[key] * (composition[key] + composition[key] / SOLID_percentage * SOLID_padding) / 100;
        }
    }

    for (let key in composition) {
        if (LIQUID_COLOR_MAP[key]) {
            console.log(key, (composition[key] + composition[key] / LIQUID_percentage * LIQUID_padding));
            LIQUID_COLOR += LIQUID_COLOR_MAP[key] * (composition[key] + composition[key] / LIQUID_percentage * LIQUID_padding) / 100;
        }
    }

    for (let key in composition) {
        if (GAS_COLOR_MAP[key]) {
            console.log(key, (composition[key] + composition[key] / GAS_percentage * GAS_padding));
            GAS_COLOR += GAS_COLOR_MAP[key] * (composition[key] + composition[key] / GAS_percentage * GAS_padding) / 100;
        }
    }

    SOLID_COLOR = Math.floor(SOLID_COLOR);
    LIQUID_COLOR = Math.floor(LIQUID_COLOR);
    GAS_COLOR = Math.floor(GAS_COLOR);
    console.log(HEX_TO_COLOR(SOLID_COLOR), HEX_TO_COLOR(LIQUID_COLOR), HEX_TO_COLOR(GAS_COLOR));
    return HEX_TO_COLOR(SOLID_COLOR), HEX_TO_COLOR(LIQUID_COLOR), HEX_TO_COLOR(GAS_COLOR);
}