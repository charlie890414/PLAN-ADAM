let SOLID_COLOR_MAP = {
    "Fe2O3": 0x8B0000,
    "Cu": 0xD2691E,
    "CuOH2": 0x1E90FF,
    "CuSO4": 0x0000CD,
    "KMnO4": 0x660077,
    "S": 0xFFBB00,
    "ice": 0xFFFFFF,
    "Au": 0xDDDDDD,
    "Fe": 0xDDDDDD,
    "Mg": 0xDDDDDD,
    "Al": 0xDDDDDD,
    "Hg": 0xDDDDDD,
    "C": 0x000000,
    "CuO": 0x000000,
    "MnO2": 0x000000,
    "Fe3O4": 0x000000,
    "FeS": 0x000000,
    "FeOH3": 0x880000,
    "NaCl": 0xDDDDDD,
    "NaHCO3": 0xDDDDDD,
    "NaOH": 0xDDDDDD,
    "CaOH": 0xDDDDDD,
    "CaCO3": 0xDDDDDD,
    "CaO": 0xDDDDDD,
    "MgO": 0xDDDDDD
};

let LIQUID_COLOR_MAP = {
    "H2O": 0x00C5FC,
    "H2O2": 0x00C5FC,
    "CuCl2": 0x00DDDD,
    "CuNO32": 0x0066FF,
    "FeSO4": 0x00FFFF,
    "FeCl3": 0x1F1F01,
    "H2SO4": 0xFFDD55,
    "KMnO4": 0xC71585,
    "C7H7O4N": 0xFF00FF,
};

let GAS_COLOR_MAP = {
    "CH4": 0x00DDAA,
    "NO2": 0xBB5500,
    "Cl": 0xBBBB00,
    "O2": 0x00C5FC,
    "N2": 0x00C5FC,
    "H2": 0x00C5FC,
    "CO2": 0x00C5FC,
    "CO": 0x00C5FC,
    "SO2": 0x00C5FC,
    "HCl": 0x00C5FC,
};

function HEX_TO_COLOR(HEX) {
    console.log(HEX);
    if (isNaN(HEX)) return null;
    return "#" + parseInt(HEX).toString(16).padStart(6, '0').replace("0x", "");
}
// HEX_TO_COLOR(0xffffff);

function CHEMICAL(composition) {
    let Fe2O3 = 0;
    let Fe = composition.Fe / 56;
    let O2 = composition.O2 / 32;
    let H2O = composition.H2O / 18;

    let minist = Math.min(Fe / 4, O2 / 3, H2O / 2);
    if (Fe / 4 == minist) {
        Fe2O3 = Fe / 4 * 2;
        O2 -= Fe / 4 * 3;
        Fe = 0;
    } else if (O2 / 3 == minist) {
        Fe2O3 = O2 / 3 * 2;
        Fe -= O2 / 3 * 4;
        O2 = 0;
    } else if (H2O / 2 == minist) {
        H2O = H2O;
    }
    composition.Fe2O3 = Fe2O3 * 160;
    composition.Fe = Fe * 56;
    composition.O2 = O2 * 32;
    composition.H2O = H2O * 18;
    return composition;
}

export function MIX_COLOR(composition) {
    console.log(composition);
    let SOLID_COLOR = null;
    let LIQUID_COLOR = null;
    let GAS_COLOR = null;

    let SOLID_percentage = 0;

    let LIQUID_percentage = 0;

    let GAS_percentage = 0;

    composition = CHEMICAL(composition);

    for (let key in composition) {
        if (SOLID_COLOR_MAP[key]) {
            SOLID_percentage += parseInt(composition[key]);
        } else if (LIQUID_COLOR_MAP[key]) {
            LIQUID_percentage += parseInt(composition[key]);
        } else if (GAS_COLOR_MAP[key]) {
            GAS_percentage += parseInt(composition[key]);
        }
    }

    console.log("SOLID");

    for (let key in composition) {
        if (SOLID_COLOR_MAP[key]) {
            console.log(key, (composition[key] / SOLID_percentage));
            SOLID_COLOR += SOLID_COLOR_MAP[key] * (composition[key] / SOLID_percentage);
        }
    }

    console.log("LIQUID");

    for (let key in composition) {
        if (LIQUID_COLOR_MAP[key]) {
            console.log(key, (composition[key] / LIQUID_percentage));
            LIQUID_COLOR += LIQUID_COLOR_MAP[key] * (composition[key] / LIQUID_percentage);
        }
    }

    console.log("GAS");

    for (let key in composition) {
        if (GAS_COLOR_MAP[key]) {
            console.log(key, (composition[key] / GAS_percentage));
            GAS_COLOR += GAS_COLOR_MAP[key] * (composition[key] / GAS_percentage);
        }
    }

    SOLID_COLOR = isNaN(Math.floor(SOLID_COLOR)) ? NaN : Math.floor(SOLID_COLOR);
    LIQUID_COLOR = isNaN(Math.floor(LIQUID_COLOR)) ? NaN : Math.floor(LIQUID_COLOR);
    GAS_COLOR = isNaN(Math.floor(GAS_COLOR)) ? NaN : Math.floor(GAS_COLOR);
    console.log('>>>>', HEX_TO_COLOR(SOLID_COLOR), HEX_TO_COLOR(LIQUID_COLOR), HEX_TO_COLOR(GAS_COLOR));
    return {
        SOLID_COLOR: HEX_TO_COLOR(SOLID_COLOR),
        LIQUID_COLOR: HEX_TO_COLOR(LIQUID_COLOR),
        GAS_COLOR: HEX_TO_COLOR(GAS_COLOR)
    };
}