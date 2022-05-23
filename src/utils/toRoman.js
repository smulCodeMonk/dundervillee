export const toRoman = (number) => {
    const romanMatrix = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1
    };
    let roman = '';
    if (number === 0) {
        roman = '';
    }
    for (var i of Object.keys(romanMatrix)) {
        const q = Math.floor(number / romanMatrix[i]);
        number -= q * romanMatrix[i];
        roman += i.repeat(q);
    }

    return roman;
};
