//angular = require('angular');
var A = require('./a');
var C = require('./c');
var Parameter = require('../../babel/parameter');
var newA = new A();
var newC = new C();
var newParameter = new Parameter();
console.log(newA.getAge('age'));
console.log(newC.setAge('age', 12345));
console.log(newParameter.getVal());