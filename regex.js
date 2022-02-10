function getMatchingValue(equation, regx) {
    if (regx === 'ERROR') return 0;
    const _equation = equation;
    const charOccurance = _equation.search(regx);
    let counter = 0;
    let coefficient = '';
    while (counter < charOccurance) {
        coefficient = coefficient + equation.charAt(counter);
        counter++;
    }
    return (coefficient === '-')
        ? '-1'
        : (coefficient === '+' || coefficient === '')
            ? '1'
            : coefficient;
}

var str = "5X^0-4X^1"
var str1 = "5"
console.log(str.match(/[+-]?([0-9]+)(\.[0-9]+)?X\^1/g))

// entry can be n or +-n * X or +-n * X^m or X^m or X

// without coefficient prob

// 1 (* x^2)
//(1 *) X^2

//5 + 4x = 0
// x = -5/4 