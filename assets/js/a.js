module.exports = function() {
    var info = {
        name: 'wqd',
        age: '26'
    };
    this.getAge = function(key) {
        return info[key];
    };
};