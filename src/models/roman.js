const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

const romanList = [
    "I", "IV", "V", "IX", "X", "XL", "L", "XC", "C", "CD", "D", "CM", "M"
].reverse()

const arabicList = [
    1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000
].reverse()

const romanScaleMultiplier = [1, 1000, 1000000];
const romanScaleLowerLimit = [0, 3999, 3999999];

const extensionLimit = [255, 3999, 2200000000];


/**
 * Transform to roman numeral within scale
 * 
 * @param {number} num - integer over 0
 * @param {(0, 1, 2)} scale - scale for vinculum compute
 * @returns {[number, string]} remaining and romanValue
 */
function toRomanNumeral(num, scale = 0) {
    let romanNumeral = '';

    let limit = romanScaleLowerLimit[scale];
    let multiplier = romanScaleMultiplier[scale];

    while(num > limit) {
        for (var i = 0; i < arabicList.length; i++) {
            let arabic = arabicList[i] * multiplier;
            if (num >= arabic) {
                romanNumeral += romanList[i];
                num -= arabic;
                break;
            }
        }
    }
    
    return [num, romanNumeral];
}



/**
 * Transform any integer from 1 to 255 to roman numeral string
 * 
 * @param {number} num - integer to be transform
 * @param {(0, 1)} extension - extension to be used, change the limit of maximun num value 0 => 255 1 => 3999 2 => 2200000000
 * @returns {string} roman numeral
 * @throws {RangeError} 
 */
exports.convertIntegerToRoman = function (num, extension = 0) {

    if (num <= 0 || num > extensionLimit[extension]) {
        throw new RangeError(`The argument must be between 1 and ${extensionLimit[extension]}.`)
    }

    let [_, romanNumeral] = toRomanNumeral(num);

    return romanNumeral;
}
