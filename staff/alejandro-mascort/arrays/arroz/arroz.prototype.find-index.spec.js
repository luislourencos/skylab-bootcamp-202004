'use strict';

describe('Arroz.prototype.findIndex', function () {
    it('should iterate on each element and return 2 which is the position of the element we want to findIndex, element 3', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6);

        var result = array.findIndex(function(element, index) {
            if (element === 3) {
                return index;
            }
        });

        expect(result).toBe(2);
    });

    it('should iterate on each element and return undefined because we want to findIndex, element 24 which does not exist', function () {
        var array = new Arroz(1, 2, 3, 4, 5, 6);

        var result = array.findIndex(function(element, index) {
            if (element === 24) {
                return index;
            }
        });

        expect(result).toBe(undefined);
    });

    it('should iterate on each element provide the index from the second argument of the expression (callback)', function () {
        var array = new Arroz(1, 2, 3);
        var result = new Arroz();

        array.findIndex(function(element, index, array) {
            result[index] = index;
        });

        expect(result[0]).toBe(0);
        expect(result[1]).toBe(1);
        expect(result[2]).toBe(2);
    });

    it('should iterate on each element provide the full array from the third argument of the expression (callback)', function () {
        var array = new Arroz(1, 2, 3);
        var result = new Arroz();

        array.findIndex(function(element, index, array) {
            result[index] = array;
        });

        expect(result[0]).toBe(array);
        expect(result[1]).toBe(array);
        expect(result[2]).toBe(array);
    });

    it('try to verify that no function argument throws the next error \' <arguments> is not a function', function () {
        var array = new Arroz(1, 2, 3);
        var result;

        try {
            array.findIndex();

        } catch(error) {
            result = error;
        }

        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();
        expect(result.message).toBe('undefined is not a function');

        result = undefined;

        try {
            array.findIndex(1);
        } catch(error) {
            result = error;
        }

        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();
        expect(result.message).toBe('1 is not a function');

        result = undefined;

        try {
            array.findIndex(true);
        } catch(error) {
            result = error;
        }

        expect(result).toBeDefined();
        expect(result instanceof TypeError).toBeTruthy();
        expect(result.message).toBe('true is not a function');
    });
});