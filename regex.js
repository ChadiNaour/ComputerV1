var regex3 = new RegExp(/([+-])?([0-9]+)?X/g);
equation = "-10X"

firstProb = equation.match(regex3);
console.log(firstProb)