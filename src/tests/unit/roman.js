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

    describe('Extension1: expand limit to 3999', function() {
        it('Should return roman  number between 1 and 3999', function() {
            assert.strictEqual(convertIntegerToRoman(1, 1), 'I');
            assert.strictEqual(convertIntegerToRoman(256, 1), 'CCLVI');
            assert.strictEqual(convertIntegerToRoman(3999, 1), 'MMMCMXCIX');
        })
    
        it('Should throw range error when number is out of bound', function() {
            assert.throws(() => convertIntegerToRoman(-1, 1), RangeError)
            assert.throws(() => convertIntegerToRoman(4000, 1), RangeError)
            assert.throws(() => convertIntegerToRoman(0, 1), RangeError)
        });
    });

    describe('Extension2: expand limit to 3999', function() {
        it('Should return roman  number between 1 and 3999', function() {
            assert.strictEqual(convertIntegerToRoman(1, 2), 'I');
            assert.strictEqual(convertIntegerToRoman(256, 2), 'CCLVI');
            assert.strictEqual(convertIntegerToRoman(3999, 2), 'MMMCMXCIX');
            assert.strictEqual(convertIntegerToRoman(4000, 2), 'I̅V̅');
            assert.strictEqual(convertIntegerToRoman(3999999, 2), 'M̅M̅M̅C̅M̅X̅C̅I̅X̅CMXCIX');
            assert.strictEqual(convertIntegerToRoman(4000000, 2), 'I̿V̿');
            assert.strictEqual(convertIntegerToRoman(4002999, 2), 'I̿V̿MMCMXCIX');
            assert.strictEqual(convertIntegerToRoman(2200000000, 2), 'M̿M̿C̿C̿');
        })
    
        it('Should throw range error when number is out of bound', function() {
            assert.throws(() => convertIntegerToRoman(-1, 2), RangeError)
            assert.throws(() => convertIntegerToRoman(2200000001, 2), RangeError)
            assert.throws(() => convertIntegerToRoman(0, 2), RangeError)
        });
    });
});
