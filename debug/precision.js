const BigNumber = require('bignumber.js');
const convert = require('../js/convert.js');

// Single Precision: 1
// Double Precision: 2
// Quadruple Precision: 4
let precision = 1;
let expSize = 0;

let inputNum = "-435340.549387389473748738473843344345345345345345";

let bitSize = precision * 32;
let hexSize = bitSize / 4;

if (precision == 1) {
    expBias = 127;
    expSize = 8;
}
else if (precision == 2) {
    expBias = 1023;
    expSize = 11;
}
else if (precision == 4) {
    expBias = 16383;
    expSize = 15;
}

let IEEE754 = new convert(inputNum, bitSize, hexSize, expBias, expSize);
if (IEEE754) {
    IEEE754.process();
} else {
    console.log("Conversion failed.");
}