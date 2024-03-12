let expDegree = 0;
let countBits = 1;
let inputNum = 69.125;

let outputArr = [];
let hexLib = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

let tempNum = inputNum;

console.log(inputNum);

// Count the number of bits used for the integer
while (Math.abs(tempNum) >= 2) {
    tempNum /= 2;
    countBits++;
}

// Get binary representation for integer portion
let intPart = parseInt(inputNum);
let intBitsTemp = convertToBin(countBits, intPart);
let intBits = []

// Get binary representation for fractional portion
let frcPart = inputNum - parseInt(inputNum);
let frcBitsTemp = convertFract(frcPart);
let frcBits = [];

// Flip arrays
for (i = 0; i <= frcBitsTemp.length + 1; i++) {
    frcBits.push(frcBitsTemp.pop());
}
for (i = 0; i < countBits; i++) {
    intBits.push(intBitsTemp.pop());
}
// Normalize input
for (i = 0; i < countBits - 1; i++) {
    frcBits.push(intBits.pop());
    
    expDegree++;
}


// Get binary representation for exponent
let expBits = convertToBin (8, expDegree + 127);


// Push sign bit
if (inputNum < 0) {
    outputArr.push(1);
}
else if (inputNum > 0) {
    outputArr.push(0);
}


// Push exponent and integer to output
for (i = 0; i < 8; i++) {
    outputArr.push(expBits.pop());
}
for (i = 0; i < 23; i++) {
    if (frcBits.length > 0) {
        outputArr.push(frcBits.pop());
    }
    else {
        outputArr.push(0);
    }
}


// Print
for (i = 0; i < 32; i++) {
    process.stdout.write(outputArr[i].toString());
}
console.log();
for (i = 0; i < 8; i++) {
    process.stdout.write(convertToHex (outputArr[i * 4], outputArr[i * 4 + 1], outputArr[i * 4 + 2], outputArr[i * 4 + 3]));
}


// Convert integer to binary
function convertToBin (bitSize, srcNum) {
    let dstArr = [];
    for (i = 0; i < bitSize; i++) {
        dstArr.push(srcNum % 2);
        srcNum = parseInt(srcNum / 2);
    }
    return dstArr
}

// Convert fractional to binary
function convertFract (srcNum) {
    let dstArr = [];

    while (srcNum != 0) {
        srcNum *= 2;
        dstArr.push(parseInt(srcNum));
        if (parseInt(srcNum) > 0) {
            srcNum--;
        }
    }

    return dstArr;
}

// Convert nibble to hex
function convertToHex (bit1, bit2, bit3, bit4) {
    let hexIndex = bit4;
    hexIndex += bit3 * 2;
    hexIndex += bit2 * 4;
    hexIndex += bit1 * 8;

    return hexLib[hexIndex];
}