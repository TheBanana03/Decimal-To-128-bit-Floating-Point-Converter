const BigNumber = window.BigNumber;

class convert {
    constructor(inputNum, expDegree, precision) {
        this.inputNum = new BigNumber(inputNum);
        this.expDegree = expDegree;
        this.outputArr = [];
        this.hexLib = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
        this.negNum = 0;

        switch (precision) {

            case "single":
                precision = 1;
                this.expBias = 127;
                this.expSize = 8;
                break;

            case "double":
                precision = 2;
                this.expBias = 1023;
                this.expSize = 11;
                break;

            case "quadruple":
                precision = 4;
                this.expBias = 16383;
                this.expSize = 15;
                break;
        }

        this.bitSize = precision * 32;
        this.hexSize = this.bitSize / 4;
    }
    
    process () {
        // If negative
        if (this.inputNum < 0) {
            this.negNum = 1;
            this.inputNum = this.inputNum.abs();
        }

        let tempNum = new BigNumber(this.inputNum.toString());
        let countBits = 1;
        let i = 0;
        let lessOne = 0;
        let temp = 0;

        console.log(this.inputNum.toString());

        // Count the number of bits used for the integer
        while (tempNum >= 2) {
            tempNum = tempNum.dividedBy(2);
            countBits++;
        }

        // Flag if input is less than one
        if (tempNum < 1) {
            lessOne = 1;
        }

        // Get binary representation for integer portion
        let intPart = this.inputNum.integerValue(BigNumber.ROUND_FLOOR);
        let intBitsTemp = this.convertToBin(countBits, intPart);
        let intBits = [];

        // Get binary representation for fractional portion
        let frcPart = this.inputNum.abs() - this.inputNum.abs().integerValue(BigNumber.ROUND_FLOOR);
        let frcBitsTemp = this.convertFract(frcPart);
        let frcBits = [];

        // Flip arrays
        for (i = frcBitsTemp.length; i > 0; i--) {
            frcBits.push(frcBitsTemp.pop());
        }
        for (i = 0; i < countBits; i++) {
            intBits.push(intBitsTemp.pop());
        }
        
        // Normalize input
        if (lessOne != 1) {
            for (i = 0; i < countBits - 1; i++) {
                frcBits.push(intBits.pop());
                this.expDegree++;
            }
        }
        else {
            while (lessOne == 1) {
                temp = frcBits.pop()
                if (temp == 1) {
                    lessOne = 0
                }
                this.expDegree--;
            }
        }

        // Get binary representation for exponent
        let expBits = this.convertToBin(this.expSize, this.expDegree + this.expBias);

        this.pushToOutput (expBits, frcBits);
        // this.printOutput ();

        // Return binary and hex strings
        var {binStr, hexStr} = this.getOutputStr();

        console.log(binStr);
        console.log(hexStr);
        return {binStr, hexStr};
    }

    getOutputStr () {
        var binStr = "";
        var hexStr = "";
        for (var i = 0; i < this.bitSize; i++) {
            binStr += this.outputArr[i].toString();
        }
        for (var i = 0; i < this.hexSize; i++) {
            hexStr += this.convertToHex(this.outputArr[i*4], this.outputArr[i*4+1], this.outputArr[i*4+2], this.outputArr[i*4+3]);
        }
        return {binStr, hexStr};
    }

    // Fill up output array
    pushToOutput (expArr, mtsArr) {
        let i = 0;

        // Push sign bit
        this.outputArr.push(this.negNum);

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

    // Convert integer to binary
    convertToBin (bitSize, tempNum) {
        let i = 0;
        let dstArr = [];
        let srcNum = new BigNumber(tempNum.toString());
        
        for (i = 0; i < bitSize; i++) {
            dstArr.push(srcNum % 2);
            srcNum = srcNum.dividedBy(2).integerValue(BigNumber.ROUND_FLOOR);
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

// Export
window.convert = convert;