'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = function () {
    this.params = ['aaaa', true, 7];
    this.other = [1, 2].concat(_toConsumableArray(this.params));
    this.getVal = function () {
        return this.other;
    };
};