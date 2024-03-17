const convert = require('./convertBCD.js');

// Single Precision: 1
// Double Precision: 2
// Quadruple Precision: 4
let precision = 2;

let inputNum = "512";
let expDegree = 0;
let isNegative = 0;

let bitSize = precision * 32;
let hexSize = bitSize / 4;
let combiBit = 5;
let coefBit = bitSize - (bitSize % 10) - 10;
let strLen = ((coefBit / 10) * 3) + 1;

let expSize = bitSize - coefBit - combiBit - 1;

let expLim = ((Math.pow(2, expSize + 2) - Math.pow(2, expSize))) - 1;
let expOffset = Math.pow(2, precision + (precision % 3) + (precision % 2)) - (4 - precision);
let expBias = expLim - parseInt(expLim / 2) + expOffset;


let IEEE754 = new convert(inputNum, bitSize, hexSize, expBias, expSize, coefBit, combiBit, strLen, expDegree, isNegative);
if (IEEE754) {
    IEEE754.process();
} else {
    console.log("Conversion failed.");
}