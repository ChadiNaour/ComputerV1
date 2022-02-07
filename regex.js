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

var str = "+1.15678X^0"
console.log(str.match(/[-+]?([0-9]+)?X\^([0-9]+)/g))