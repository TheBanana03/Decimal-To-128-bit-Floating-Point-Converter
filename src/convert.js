let expDegree = 0;

let bitArray = [];

let inputNum = 0.4;

console.log(inputNum + "\n");

// Normalize inputs
function normalizeInput () {
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
}

console.log("Number: " + inputNum + " * 10^" + expDegree);