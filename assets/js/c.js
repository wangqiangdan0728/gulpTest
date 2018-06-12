module.exports = function() {
    var info = {
        name: 'lxy',
        age: 24
    };
    this.setAge = function(key, value) {
        return info[key] = value;
    };
};