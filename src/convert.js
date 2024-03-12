class convert {
    constructor(inputNum, bitSize, hexSize, expBias, expSize) {
        this.inputNum = inputNum;
        this.expDegree = 0;
        this.outputArr = [];
        this.hexLib = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

        this.bitSize = bitSize;
        this.hexSize = hexSize;
        this.expBias = expBias;
        this.expSize = expSize;
    }
    
    process () {
        let tempNum = this.inputNum;
        let countBits = 1;
        let i = 0;

        console.log(this.inputNum);

        // Count the number of bits used for the integer
        while (Math.abs(tempNum) >= 2) {
            tempNum /= 2;
            countBits++;
        }

        // Get binary representation for integer portion
        let intPart = parseInt(this.inputNum);
        let intBitsTemp = this.convertToBin(countBits, intPart);
        let intBits = []

        // Get binary representation for fractional portion
        let frcPart = this.inputNum - parseInt(this.inputNum);
        let frcBitsTemp = this.convertFract(frcPart);
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
            this.expDegree++;
        }

        // Get binary representation for exponent
        let expBits = this.convertToBin(this.expSize, this.expDegree + this.expBias);

        this.pushToOutput (expBits, frcBits);
        this.printOutput ();
    }

    // Print
    printOutput () {
        let i = 0;

        for (i = 0; i < this.bitSize; i++) {
            process.stdout.write(this.outputArr[i].toString());
        }
        console.log();
        for (i = 0; i < this.hexSize; i++) {
            process.stdout.write(this.convertToHex(this.outputArr[i*4], this.outputArr[i*4+1], this.outputArr[i*4+2], this.outputArr[i*4+3]));
        }
    }

    // Fill up output array
    pushToOutput (expArr, mtsArr) {
        let i = 0;

        // Push sign bit
        if (this.inputNum < 0) {
            this.outputArr.push(1);
        }
        else if (this.inputNum > 0) {
            this.outputArr.push(0);
        }

        // Push exponent and integer to output
        for (i = 0; i < this.expSize; i++) {
            this.outputArr.push(expArr.pop());
        }
        for (i = 0; i < this.bitSize - (this.expSize + 1); i++) {
            if (mtsArr.length > 0) {
                this.outputArr.push(mtsArr.pop());
            }
            else {
                this.outputArr.push(0);
            }
        }
    }

    // Convert integer to binary
    convertToBin (bitSize, srcNum) {
        let i = 0;
        let dstArr = [];
        for (i = 0; i < bitSize; i++) {
            dstArr.push(srcNum % 2);
            srcNum = parseInt(srcNum / 2);
        }

        return dstArr
    }

    // Convert fractional to binary
    convertFract (srcNum) {
        let i = 0;
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
    convertToHex (bit1, bit2, bit3, bit4) {
        let hexIndex = bit4;
        hexIndex += bit3 * 2;
        hexIndex += bit2 * 4;
        hexIndex += bit1 * 8;

        return this.hexLib[hexIndex];
    }
}

module.exports = convert;