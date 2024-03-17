// Get all elements
var input_form = document.getElementById("input_form");

var input_decimal_element = document.getElementById("input_decimal");
var input_exponent_element = document.getElementById("input_exponent");
var input_rounding_element = document.getElementById("input_rounding");
var input_representation_element = document.getElementById("input_representation");
var input_precision_element = document.getElementById("input_precision");

var input_error_element = document.getElementById("input_error");

var output_binary_element = document.getElementById("output_binary");
var output_sign_element = document.getElementById("output_sign");
var output_combination_element = document.getElementById("output_combination");
var output_exponent_element = document.getElementById("output_exponent");
var output_mantissa_element = document.getElementById("output_mantissa");
var output_hex_element = document.getElementById("output_hex");

var combination_field_element = document.getElementById("combination_field");
var exponent_field_element = document.getElementById("exponent_field");

// Declare all element values
var input_decimal = input_decimal_element.value;
var input_exponent = input_exponent_element.value;
var input_rounding = input_rounding_element.value;
var input_representation = input_representation_element.value;
var input_precision = input_precision_element.value;

var output_binary = output_binary_element.value;
var output_sign = output_sign_element.value;
var output_combination = output_combination_element.value;
var output_exponent = output_exponent_element.value;
var output_mantissa = output_mantissa_element.value;
var output_hex = output_hex_element.value;



// Get Inputs and Put Outputs
function getInputs() {

    // Get all element values
    input_decimal = input_decimal_element.value;
    input_exponent = input_exponent_element.value;
    input_rounding = input_rounding_element.value;
    input_representation = input_representation_element.value;
    input_precision = input_precision_element.value;
}

function putOutputs() {
    // Put all element values
    output_binary_element.value = output_binary;
    output_sign_element.value = output_sign;
    output_combination_element.value = output_combination;
    output_exponent_element.value = output_exponent;
    output_mantissa_element.value = output_mantissa;
    output_hex_element.value = output_hex;
}



// Split and Format Outputs
function splitBinary() {

    output_sign = output_binary.substring(0, 1);

    switch (input_representation) {

        case "binary":
            switch (input_precision) {
                case "single":
                    output_exponent = output_binary.substring(1, 9);
                    output_mantissa = output_binary.substring(9, 32);
                    break;
                case "double":
                    output_exponent = output_binary.substring(1, 12);
                    output_mantissa = output_binary.substring(12, 64);
                    break;
                case "quadruple":
                    output_exponent = output_binary.substring(1, 16);
                    output_mantissa = output_binary.substring(16, 128);
                    break;
            }
            break;
        
        case "decimal":
            output_combination = output_binary.substring(1, 6);

            switch (input_precision) {
                case "single":
                    output_exponent = output_binary.substring(6, 12);
                    output_mantissa = output_binary.substring(12, 32);
                    break;
                case "double":
                    output_exponent = output_binary.substring(6, 14);
                    output_mantissa = output_binary.substring(14, 64);
                    break;
                case "quadruple":
                    output_exponent = output_binary.substring(6, 18);
                    output_mantissa = output_binary.substring(18, 128);
                    break;
            }
            break;
    }
}

function splitBinaryBinComponents() {

    // Reverse output_exponent and split into groups of 4 then reverse again
    let reversed_exponent = output_exponent.split("").reverse().join("");
    let exponent_groups = [];
    for (let i = 0; i < reversed_exponent.length / 4; i++) {
        exponent_groups.push(reversed_exponent.substring(i * 4, (i + 1) * 4));
    }
    output_exponent = exponent_groups.join(" ").split("").reverse().join("");

    // Reverse output_mantissa and split into groups of 4 then reverse again
    let reversed_mantissa = output_mantissa.split("").reverse().join("");
    let mantissa_groups = [];
    for (let i = 0; i < reversed_mantissa.length / 4; i++) {
        mantissa_groups.push(reversed_mantissa.substring(i * 4, (i + 1) * 4));
    }
    output_mantissa = mantissa_groups.join(" ").split("").reverse().join("");

    output_binary = output_sign + " " + output_exponent + " " + output_mantissa;
}

function splitDecimalBinComponents() {

    // Reverse output_exponent and split into groups of 4 then reverse again
    let reversed_exponent = output_exponent.split("").reverse().join("");
    let exponent_groups = [];
    for (let i = 0; i < reversed_exponent.length / 4; i++) {
        exponent_groups.push(reversed_exponent.substring(i * 4, (i + 1) * 4));
    }
    output_exponent = exponent_groups.join(" ").split("").reverse().join("");

    // Reverse output_mantissa and split into groups of 10 then reverse again
    let reversed_mantissa = output_mantissa.split("").reverse().join("");
    let mantissa_groups = [];
    for (let i = 0; i < reversed_mantissa.length / 10; i++) {
        mantissa_groups.push(reversed_mantissa.substring(i * 10, (i + 1) * 10));
    }
    output_mantissa = mantissa_groups.join(" ").split("").reverse().join("");

    output_binary = output_sign + " " + output_combination + " " + output_exponent + " " + output_mantissa;
}

function splitHex() {

    let hex_groups = [];
    for (let i = 0; i < output_hex.length / 4; i++) {
        hex_groups.push(output_hex.substring(i * 4, (i + 1) * 4));
    }
    output_hex = hex_groups.join(" ");
}



// Toggle Combination Field
function toggleCombinationField() {

    if (input_representation === "binary") {
        combination_field_element.style.display = "none";
        exponent_field_element.style.width = `${100 - 16.5}%`
    } else {
        combination_field_element.style.display = "flex";
        exponent_field_element.style.width = `${100 - (32 + 16.5)}%`
    }
}



// Conversion Logic
function convertToBinaryIEEE754() {

    // Round Decimal Input
    switch (input_precision) {
        case "single":
            break
        case "double":
            break
        case "quadruple":
            break
    }

    // Convert to Binary Float
    var IEEE754_Converter = new window.convert(input_decimal, input_exponent, input_precision);
    if (IEEE754_Converter) {
        let output = IEEE754_Converter.process();
        output_binary = output.binStr;
        output_hex = output.hexStr;
    } else {
        console.log("Conversion failed");
        output_binary = "Conversion failed";
        output_hex = "Conversion failed";
    }
}

function convertToDecimalIEEE754() {

    let output;

    // Round Decimal Input
    switch (input_precision) {
        case "single":
            output = window.roundDecimal(input_decimal, 7, input_rounding);
            break
        case "double":
            output = window.roundDecimal(input_decimal, 16, input_rounding);
            break
        case "quadruple":
            output = window.roundDecimal(input_decimal, 34, input_rounding);
            break
    }
    input_decimal = output.integer;
    input_exponent += output.exponent;

    // Convert to Decimal Float
    var IEEE754_Converter = new window.convertBCD(input_decimal, input_exponent, (input_decimal.charAt(0) === "-"), input_precision);
    if (IEEE754_Converter) {
        output = IEEE754_Converter.process();
        output_binary = output.binStr;
        output_hex = output.hexStr;
    } else {
        console.log("Conversion failed");
        output_binary = "Conversion failed";
        output_hex = "Conversion failed";
    }
}



// On form submit
input_form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get inputs
    getInputs();

    // Validate input
    if (!window.validateInput(input_decimal)) {
        input_error_element.style.display = "block";
        return;
    }
    else {
        input_error_element.style.display = "none";
    }

    // TODO: Convert Logic Here
    switch (input_representation) {
        case "binary":
            convertToBinaryIEEE754();
            break;
        case "decimal":
            convertToDecimalIEEE754();
            break;
    }

    // Toggle Combination Field
    toggleCombinationField();

    // Split and format outputs
    splitBinary();
    switch (input_representation) {
        case "binary":
            splitBinaryBinComponents();
            break;
        case "decimal":
            splitDecimalBinComponents();
            break;
    }
    splitHex();

    // Display outputs
    putOutputs();
});



// Download as Text
var download_txt = document.getElementById("download_txt");
download_txt.addEventListener("click", function () {
    event.preventDefault();

    // Get representation title and precision number
    var representation_title = input_representation.charAt(0).toUpperCase() + input_representation.slice(1);
    var precision_number;
    switch (input_precision) {
        case "single":
            precision_number = "32";
            break;
        case "double":
            precision_number = "64";
            break;
        case "quadruple":
            precision_number = "128"
            break;;
    }

    // Declare filename
    var filename = `IEEE-754 ${representation_title}-${precision_number} Floating-Point Representation.txt`

    // Correct Enum Values
    switch (input_rounding) {
        case "nearest_even":
            input_rounding = "round to nearest, ties to even";
            break;
        default:
            input_rounding = input_rounding.replace("_", " ");
            input_rounding = input_rounding.charAt(0).toUpperCase() + input_rounding.slice(1);
            break;
    }
    switch (input_precision) {
        case "single":
            input_precision = "Single (32-bit)";
            break;
        case "double":
            input_precision = "Double (64-bit)";
            break;
        case "quadruple":
            input_precision = "Quadruple (128-bit)";
            break;
    }
    
    // Declare text
    var text = "";
    text += `Decimal: ${input_decimal} x 10 ^ ${input_exponent}\n`;
    text += `Rounding Method: ${input_rounding}\n`;
    text += `Representation: ${input_representation.charAt(0).toUpperCase() + input_representation.slice(1)}\n`;
    text += `Precision: ${input_precision}\n`;
    text += `\n`;
    text += `Binary: ${output_binary}\n`;
    text += `\tSign: ${output_sign}\n`;
    if (input_representation === "decimal") { text += `\tCombination: ${output_combination}\n`; }
    text += `\tExponent: ${output_exponent}\n`;
    text += `\tMantissa: ${output_mantissa}\n`;
    text += `Hexadecimal: ${output_hex}`;

    // Download Logic
    // Create download link element
    let downloadLink = document.createElement("a");
    // File name
    downloadLink.download = filename;
    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(
        new Blob([text], { type: "text;charset=utf-8;" })
    );
    // Hide download link
    downloadLink.style.display = "none";
    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();

    // Delete the link from DOM
    document.body.removeChild(downloadLink);
});