let romanList = [
    "I", "IV", "V", "IX", "X", "XL", "L", "XC", "C"
].reverse()

let arabicList = [
    1, 4, 5, 9, 10, 40, 50, 90, 100
].reverse()

/**
 * Transform any integer from 1 to 255 to roman numeral string
 * 
 * @param {number} num - integer to be transform
 * @returns {string}
 * @throws {RangeError} 
 */
exports.convertIntegerToRoman = function (num) {
    if (num <= 0 || num > 255) {
        throw new RangeError("The argument must be between 1 and 255.")
    }

    let romanNumeral = '';
    while(num > 0) {
        for (var i = 0; i < arabicList.length; i++) {
            if (num >= arabicList[i]) {
                romanNumeral += romanList[i];
                num -= arabicList[i];
                break;
            }
        }
    }
    
    return romanNumeral;
}
