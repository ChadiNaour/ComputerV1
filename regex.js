const regexp = /[0-9]X\^0/g;
const str = '5X^0+2X^0+X^0=4X^2';

const array = str.match(regexp);
var str2 = str.replace(/[0-9]X\^0/g, '');

console.log(array);
// console.log(str2);