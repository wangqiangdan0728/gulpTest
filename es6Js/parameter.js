module.exports = function() {
    this.params = ['aaaa', true, 7];
    this.other = [
        1, 2, ...this.params
    ];
    this.getVal = function() {
        return this.other;
    }
};