
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

function MySqrt(t) {
    var r = t / 2.0
    var t = parseFloat(t)
    var i = 0
    while (i < 10) {
        r = ((r + t) / r) / 2.0
        i += 1
    }
    return (r)
}


function getCoefficients(equation, order) {
    // Used eval instead of parseFloat to support Fractions
    var _equation = equation;
    const ret = [];

    for (var i = 0; i <= order; i++) {
        var regex1 = new RegExp("[0-9]X\\^" + i, "g");
        var regex2 = new RegExp("X\\^" + i, "g");
        const regxForElement =
            (_equation.search(regex1) !== -1)
                ? regex2
                : (_equation.search(regex2) !== -1)
                    ? regex2
                    : "ERROR";
        ret[i] = (regxForElement === "ERROR") ? 0 : eval(getMatchingValue(_equation, regxForElement));
        _equation =
            (regxForElement === 'ERROR')
                ? _equation
                : _equation.split(getRegexSource(regxForElement))[1];
    }
    return (ret);
}

const getReducedCoefs = (ret, ret1, degree) => {
    var reducedCoefs = [];
    for (var i = 0; i <= degree; i++) {
        reducedCoefs[i] = ret[i] - ret1[i];
    }
    return (reducedCoefs);
}

const AbsValue = (value) => {
    var ret = value >= 0 ? value : (value * -1);
    return (ret);
}

const GetEquFromCoefs = (reducedCoefs, degree) => {
    var equ = "";
    for (var i = 0; i <= degree; i++) {
        var temp;
        if (i == 0)
            temp = reducedCoefs[i] >= 0 ? reducedCoefs[i] + " * X^0" : "- " + AbsValue(reducedCoefs[i]) + " * X^0";
        else {
            temp = reducedCoefs[i] >= 0 ? " + " + reducedCoefs[i] + " * X^" + i : " - " + AbsValue(reducedCoefs[i]) + " * X^" + i;
        }
        equ = equ + temp;
    }
    equ = equ + " = 0"
    return (equ);
}


if (process.argv.length == 3 && process.argv[2] && process.argv[2].match(/^((?:\-?\+?(?:\s+)?\d+(?:\.\d+)?(?:\s+)?\*(?:\s+)?X\^\d+|\d+(?:\.\d+)?)(?:(?:\s+)?\+(?:\s+)?|(?:\s+)?\-(?:\s+)?)?)+(?:\s+)?=(?:\s+)?((?:[+-]?\d+(?:\.\d+)?(?:\s+)?\*(?:\s+)?X\^\d+|\-?\d+(?:\.\d+)?)(?:(?:\s+)?\+(?:\s+)?|(?:\s+)?\-(?:\s+)?)?)+$/g)) {
    var textField = process.argv[2];
    var sttripped = removeStar(removeSpaces(process.argv[2]));
    var tab = sttripped.split("=");
    var r = /X(\^\d)?/g;
    var orderRight = tab[0].match(r).reduce((m, d) => {
        var ex = d.split('^')[1];
        if (ex && (ex > m)) {
            return ex;
        }
        return m;
    }, 0);

    var orderLeft = tab[1].match(r).reduce((m, d) => {
        var ex = d.split('^')[1];
        if (ex && (ex > m)) {
            return ex;
        }
        return m;
    }, 0);

    var degree = orderRight > orderLeft ? orderRight : orderLeft;
    var ret = getCoefficients(tab[0], degree);
    var ret1 = getCoefficients(tab[1], degree);
    var ReducCoefs = getReducedCoefs(ret, ret1, degree);
    const ReducedEquation = GetEquFromCoefs(ReducCoefs, degree);

    console.log("Reduced form:", ReducedEquation);
    console.log("Polynomial degree:", degree);
    if (degree > 2) {
        console.log("The polynomial degree is stricly greater than 2, I can't solve.")
    }
    else {
        var coeffs = getCoefficients(removeStar(removeSpaces(ReducedEquation)), 2);
        // program to solve quadratic equation
        let root1;
        let root2;

        // // take input from the user
        let a = coeffs[2];
        let b = coeffs[1];
        let c = coeffs[0];

        if (a == 0 && b == 0 && c == 0) {
            console.log("all real numbers are solutions")
            return (0);
        }
        else if (a == 0 && b == 0 && c != 0) {
            console.log("there is no solutions.")
            return (0);
        }
        if (a == 0 && degree == 1) {
            console.log("The solution is:")
            console.log((-c / b).toFixed(2))
            return (0);
        }

        // console.log(a, b, c)

        // calculate discriminant
        let discriminant = (b * b) - (4 * a * c);

        // console.log("the discriminant is : ",discriminant)
        // console.log("te discrimanat root is : ", Math.sqrt(discriminant))

        //condition for real and different roots
        if (discriminant > 0) {
            console.log("Discriminant is strictly positive, the two solutions are:")
            root1 = ((-b + MySqrt(discriminant)) / (2 * a)).toFixed(6);
            root2 = ((-b - MySqrt(discriminant)) / (2 * a)).toFixed(6);

            console.log(root2);
            console.log(root1);
            // result
            // console.log(`The roots of quadratic equation are ${root1} and ${root2}`);
        }

        // condition for real and equal roots
        else if (discriminant == 0) {
            console.log("Discriminant is null, the only solution is:")
            root1 = root2 = (-b / (2 * a)).toFixed(6);

            // result
            console.log(root1);
        }

        // if roots are not real
        else {
            console.log("Discriminant is strictly negative, the two solutions are:")
            let realPart = (-b / (2 * a)).toFixed(2);
            let imagPart = (MySqrt(-discriminant) / (2 * a)).toFixed(2);

            // result
            console.log(realPart + " + " + imagPart + "i");
            console.log(realPart + " - " + imagPart + "i");
        }
    }
}
else
    console.log("Syntax Error");
