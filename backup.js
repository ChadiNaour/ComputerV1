
function removeSpaces(equation) {
    const _equation = equation;
    return _equation.replace(/\s/g, '');
}
function removeStar(equation) {
    const _equation = equation;
    return _equation.replace(/\*/g, '');
}
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
function getRegexSource(regex) {
    const _regex = regex;
    return (_regex.source).toString().replace(/\\/g, '');
}

8
0
-6 0 -5.6


function getCoefficients(equation) {
    // Used eval instead of parseFloat to support Fractions
    const _equation = equation;
    // const regxForA =
    //     (_equation.search(/[0-9]x\^2/g) !== -1)
    //         ? /x\^2/g
    //         : (_equation.search(/x\^2/g) !== -1)
    //             ? /x\^2/g
    //             : (_equation.search(/[0-9]xx/g) !== -1)
    //                 ? /xx/g
    //                 : (_equation.search(/xx/g) !== -1)
    //                     ? /xx/g
    //                     : "ERROR"
    const regxForA =
        (_equation.search(/[0-9]X\^0/g) !== -1)
            ? /X\^0/g
            : (_equation.search(/X\^0/g) !== -1)
                ? /X\^0/g
                : "ERROR";
    const a = eval(getMatchingValue(_equation, regxForA));
    // console.log(a)
    const equationForB =
        (regxForA === 'ERROR')
            ? _equation
            : _equation.split(getRegexSource(regxForA))[1];
    // console.log("equation for b is : ", equationForB);
    const regxForB =
        (equationForB.search(/[0-9]X\^1/g) !== -1)
            ? /X\^1/g
            : (equationForB.search(/X\^1/g) !== -1)
                ? /X\^1/g
                : "ERROR";
    const b = (regxForB === "ERROR") ? 0 : eval(getMatchingValue(equationForB, regxForB));
    // console.log(b)
    const equationForC =
        (regxForB === 'ERROR')
            ? equationForB
            : equationForB.split(getRegexSource(regxForB))[1];
    // console.log("equation for c is : ", equationForC);
    const regxForC =
        (_equation.search(/[0-9]X\^2/g) !== -1)
            ? /X\^2/g
            : (_equation.search(/X\^2/g) !== -1)
                ? /X\^2/g
                : (_equation.search(/[0-9]XX/g) !== -1)
                    ? /XX/g
                    : (_equation.search(/XX/g) !== -1)
                        ? /XX/g
                        : "ERROR"
    const c = (b === 0)
        ? eval(getMatchingValue(equationForC, regxForC))
        : !isNaN(eval(getMatchingValue(equationForC, regxForC)))
            ? eval(getMatchingValue(equationForC, regxForC))
            : 0;
    return [a, b, c];
}
// console.log("args length is : ", process.argv.length);
// console.log("argv[2] is : ", process.argv[2]);
// if (process.argv[2] && process.argv[2].match(/^((?:\-?\d+(?:\.\d+)?(?:\s+)?\*(?:\s+)?X\^\d+|\d+(?:\.\d+)?)(?:(?:\s+)?\+(?:\s+)?|(?:\s+)?\-(?:\s+)?)?)+(?:\s+)?=(?:\s+)?((?:[+-]?\d+(?:\.\d+)?(?:\s+)?\*(?:\s+)?X\^\d+|\-?\d+(?:\.\d+)?)(?:(?:\s+)?\+(?:\s+)?|(?:\s+)?\-(?:\s+)?)?)+$/g))
//     console.log("mzn");
// else
//     console.log("nn");
var textField = process.argv[2];
var sttripped = removeStar(removeSpaces(process.argv[2]));
//reducing the form
// console.log(sttripped);
var r = /X(\^\d)?/g;
// var t = 'x^2+x^3+x+1';
var order = sttripped.match(r).reduce((m, d) => {
    var ex = d.split('^')[1];
    if (ex && (ex > m)) {
        return ex;
    }
    return m;
}, 0);
console.log("Polynomial degree:", order);
if (order <= 2) {
    var ret = getCoefficients(sttripped);
    console.log("coeffs are : ", ret[0], ret[1], ret[2])
}
else
    console.log("The polynomial degree is stricly greater than 2, I can't solve.")
// var r = /a(\^\d)?/g;
// var order = sttripped.match(r).reduce((m, d) => {
// 	var ex = d.split('^')[1];
// 	if(ex && (ex > m)){
// 		return ex;
// 	}
// 	return m;
// },0);

// console.log(order);
// var ret = getCoefficients(sttripped);
// console.log(ret);
// console.log("degree is : ", ret[3]);
// console.log("coeffs are : ", ret[0], ret[1], ret[2])

// if (process.argv[2] && process.argv[2].match(/^((?:\-?\d+(?:\.\d+)?(?:\s+)?\*(?:\s+)?X\^\d+|\d+(?:\.\d+)?)(?:(?:\s+)?\+(?:\s+)?|(?:\s+)?\-(?:\s+)?)?)+(?:\s+)?=(?:\s+)?((?:[+-]?\d+(?:\.\d+)?(?:\s+)?\*(?:\s+)?X\^\d+|\-?\d+(?:\.\d+)?)(?:(?:\s+)?\+(?:\s+)?|(?:\s+)?\-(?:\s+)?)?)+$/g))
//     console.log("mzn");
// else
//     console.log("nn");
// textField = textField.replace("/\s+/g","");
// console.log("argv[2] without white spaces is :",textField)
// var textField = "h g f g d g"
// quadratic_equation_matcher = re.compile('(-?\d+)x\^2 ([+-]\d+)x ([+-]\d+)')
// console.log("stripped argv[2] is :",stripped)
