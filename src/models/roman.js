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

const vinculumUTF8 = [
    Buffer.from([0xCC, 0x85]), //single vinculum
    Buffer.from([0xCC, 0xBF]) //double vinculum
]


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

    while (num > limit) {
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
 * Add vinculum to character
 * 
 * @param {string} char character to modify
 * @param {(0, 1)} vinculumType (0, single) or (1, double) vinculum
 */
function addVinculumToCharracter(char, vinculumType) {
    const vinculum = vinculumUTF8[vinculumType];

    const charBuff = Buffer.from(char, 'utf-8');
    const buff = Buffer.concat([charBuff, vinculum]);
    return decoder.write(buff);
}


/**
 * Transform any integer from 1 to 255 to roman numeral string
 * 
 * @param {number} num - integer to be transform
 * @param {(0, 1, 2)} extension - extension to be used, change the limit of maximun num value 0 => 255 1 => 3999 2 => 2200000000
 * @returns {string} roman numeral
 * @throws {RangeError} 
 */
exports.convertIntegerToRoman = function (num, extension = 0) {

    if (num <= 0 || num > extensionLimit[extension]) {
        throw new RangeError(`The argument must be between 1 and ${extensionLimit[extension]}.`)
    }

    let romanNumeral = '';

    if (num > romanScaleLowerLimit[2]) {
        let [remaining, romanNumeralSegment] = toRomanNumeral(num, 2);
        num = remaining;
        romanNumeral += romanNumeralSegment.split('').map(x => addVinculumToCharracter(x, 1)).join('')
    }

    if (num > romanScaleLowerLimit[1]) {
        let [remaining, romanNumeralSegment] = toRomanNumeral(num, 1);
        num = remaining;
        romanNumeral += romanNumeralSegment.split('').map(x => addVinculumToCharracter(x, 0)).join('')
    }

    let [_, romanNumeralSegment] = toRomanNumeral(num);
    romanNumeral += romanNumeralSegment;

    return romanNumeral;
}
