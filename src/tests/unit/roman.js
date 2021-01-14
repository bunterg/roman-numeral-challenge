const assert = require('assert');

const { convertIntegerToRoman } = require('../../models/roman');

describe('convertIntegerToRoman', function () {
    it('Should return roman  number between 1 and 255', function() {
        assert.strictEqual(convertIntegerToRoman(1), 'I');
        assert.strictEqual(convertIntegerToRoman(56), 'LVI');
        assert.strictEqual(convertIntegerToRoman(255), 'CCLV');
    })

    it('Should throw range error when number is out of bound', function() {
        assert.throws(() => convertIntegerToRoman(-1), RangeError)
        assert.throws(() => convertIntegerToRoman(256), RangeError)
        assert.throws(() => convertIntegerToRoman(0), RangeError)
    });
})