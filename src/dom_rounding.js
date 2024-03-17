const roundTo = 10
let input = "239621.23213213"
let exponent = 0
let positive = true
// const rounding = "truncate"
// const rounding = "ceil"
// const rounding = "floor"
const rounding = "nearesttiestoeven"

if (validateInput(input)) {
    // check sign
    if (input[0] === "-") {
        input = input.slice(1)
        positive = false
    }

    // get integer portion, remove leading zeros
    let integer = input.split(".")[0]
    integer = integer.replace(/^0+/, "")

    // get fraction portion, and remove insignificant zeros
    let fraction = input.split(".")[1]
    // if no fraction, remove trailing zeros from integer and adjust exponent
    if (fraction === undefined) {
        fraction = ""
        integer = integer.replace(/0+$/, (match) => {
            exponent += match.length
            return ""
        })
    // if fraction, remove trailing zeros from fraction
    } else {
        fraction = fraction.replace(/0+$/, "")
        // but check in case fraction is now empty
        if (fraction === "") {
            integer = integer.replace(/0+$/, (match) => {
                exponent += match.length
                return ""
            })
        }
        exponent -= fraction.length
        integer += fraction
    }

    // rounding logic
    if (integer.length > roundTo) {
        if (rounding === "truncate") {
            integer = integer.slice(0, roundTo)

        } else if (rounding === "ceil") {
            overflow = integer.substring(roundTo)
            integer = integer.slice(0, roundTo)
            if (positive) {
                if (overflow.length !== "") {
                    integer = addCarry(integer)
                    integer = integer.replace(/0+$/, (match) => {
                        exponent += match.length
                        return ""
                    })
                }
            } else {
                integer = integer.slice(0, roundTo)
            }
            exponent += overflow.length
            
        } else if (rounding === "floor") {
            overflow = integer.substring(roundTo)
            integer = integer.slice(0, roundTo)
            if (!positive) {
                if (overflow.length !== "") {
                    integer = addCarry(integer)
                    integer = integer.replace(/0+$/, (match) => {
                        exponent += match.length
                        return ""
                    })
                }
            } else {
                integer = integer.slice(0, roundTo)
            }
            exponent += overflow.length

        } else if (rounding === "nearesttiestoeven") {
            overflow = integer.substring(roundTo)
            integer = integer.slice(0, roundTo)
            if (overflow.length !== "") {
                if (overflow === "5") {
                    if (parseInt(integer[integer.length - 1]) % 2 !== 0) {
                        integer = addCarry(integer)
                        integer = integer.replace(/0+$/, (match) => {
                            exponent += match.length
                            return ""
                        })
                    }
                } else if (!(parseInt(overflow[0]) < 5)) {
                    integer = addCarry(integer)
                    integer = integer.replace(/0+$/, (match) => {
                        exponent += match.length
                        return ""
                    })
                }
            }
            exponent += overflow.length
        }
    }

    // debug stuff
    if (!positive) {
        console.log("-" + integer)
    } else {
        console.log(integer)
    }
    console.log(exponent)
}


function validateInput(input) {
    const regex = /^-?(\d*|\d+\.?\d+\d*)$/
    return regex.test(input)
}

function addCarry(integer) {
    let carry = 1
    for (let i = integer.length - 1; i >= 0; i--) {
        let num = parseInt(integer[i]) + carry
        if (num === 10) {
            integer = integer.slice(0, i) + "0" + integer.slice(i + 1)  
            carry = 1
        } else {
            integer = integer.slice(0, i) + num + integer.slice(i + 1)
            carry = 0
            break
        }
    }
    if (carry === 1) {
        integer = "1" + integer
    }
    return integer
}

// Export
window.validateInput = validateInput;

console.log("hello world!")