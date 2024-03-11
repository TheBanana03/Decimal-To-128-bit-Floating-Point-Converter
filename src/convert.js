let expDegree = 0;
let inputNum = 0.0934;

console.log(inputNum);

// Normalize inputs
if (inputNum < 10 && inputNum > 0) {
    expDegree = 0;
}
while (inputNum >= 10) {
    inputNum /= 10;
    expDegree++;
}
while (inputNum < 1) {
    inputNum *= 10;
    expDegree--;
}

// Get binary representation for integer portion
let intPart = parseInt(inputNum);
let intBits = convertToBin (4, intPart);

// Get binary representation for exponent
let expBits = convertToBin (15, expDegree + 16383);

// Print binary representations
for (i = 0; i < 4; i++) {
    process.stdout.write(intBits.pop().toString());
}

console.log();

for (i = 0; i < 15; i++) {
    process.stdout.write(expBits.pop().toString());
}

console.log("\nNumber: " + inputNum + " * 10^" + expDegree);


// Convert integer to binary
function convertToBin (bitSize, srcNum) {
    let dstArr = [];
    for (i = 0; i < bitSize; i++) {
        dstArr.push(srcNum % 2);
        srcNum = parseInt(srcNum / 2);
    }
    return dstArr
}