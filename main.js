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

// Recursive function that returns
// square root of a number with
// precision upto 5 decimal places
function Square(n, i, j) {
    var mid = ((i + j) / 2);
    var mul = mid * mid;

    // If mid itself is the square root,
    // return mid
    if ((mul == n) || (AbsValue(mul - n) < 0.00001))
        return mid;

    // If mul is less than n,
    // recur second half
    else if (mul < n)
        return Square(n, mid, j);

    // Else recur first half
    else
        return Square(n, i, mid);
}

// Function to find the square root of n
function findSqrt(n) {
    var i = 1;

    // While the square root is not found
    var found = false;
    while (!found) {

        // If n is a perfect square
        if (i * i == n) {
            //  console.log("i is :",i);
            found = true;
            return (i);
        }

        else if (i * i > n) {

            // Square root will lie in the
            // interval i-1 and i
            var res = Square(n, i - 1, i);
            //  console.log("result is : ",res.toFixed(5));
            found = true;
            return (res);
        }
        i++;
    }
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

const checZeroCoeffs = (Coeffs, i) =>{
    for (var j = 0; j < i; j++) {
        if(Coeffs[j]  != 0)
            return 0;
    }
    return 1;
}

const GetEquFromCoefs = (reducedCoefs, degree) => {
    var equ = "";
    for (var i = 0; i <= degree; i++) {
        var temp;
        if (i == 0)
            temp = (reducedCoefs[i] ? (reducedCoefs[i] >= 0 ? reducedCoefs[i] : "- " + AbsValue(reducedCoefs[i])) : "")
        else {
            temp = (reducedCoefs[i] ? (i != 1 ? (reducedCoefs[i] >= 0 ? (checZeroCoeffs(reducedCoefs, i) ? "" : " + ") + reducedCoefs[i] + " * X^" + i : " - " + AbsValue(reducedCoefs[i]) + " * X^" + i) : (reducedCoefs[i] >= 0 ? (checZeroCoeffs(reducedCoefs, i) ? "" : " + ") + reducedCoefs[i] + " * X" : " - " + AbsValue(reducedCoefs[i]) + " * X")) : "");
        }
        equ = equ + temp;
    }
    if (equ === "")
        equ = "0";
    equ = equ + " = 0"
    return (equ);
}

//reduce the dergee if the coeff is 0
const getFinaldegree = (coeffs, degree) => {
    var i = degree;
    while (i >= 0 && !coeffs[i]) {
        degree--
        i--;
    }
    return (degree);
}

function getNumber(str) {
    var charOccurance = str.length;
    let counter = 0;
    let coefficient = '';
    while (counter < charOccurance) {
        coefficient = coefficient + str.charAt(counter);
        counter++;
    }
    return (coefficient === '-')
        ? '-1'
        : (coefficient === '+' || coefficient === '')
            ? '1'
            : coefficient;
}

const reduceOneSidedCoeffs = (equation, order) => {
    const array = [];
    var i = order;

    while (i >= 0) {
        var regex1 = new RegExp("[+-]?([0-9]+)(\\.[0-9]+)?X\\^" + i, "g");
        var regex2 = new RegExp("[+-]?X\\^" + i, "g");
        var regex3 = new RegExp("X\\^" + i, "g");

        firstProb = equation.match(regex1) ? equation.match(regex1) : [];
        if (firstProb) {
            equation = equation.replace(regex1, '')
        }
        secondProb = equation.match(regex2) ? equation.match(regex2) : [];
        if (secondProb) {
            equation = equation.replace(regex2, '')
        }
        if (!firstProb && !secondProb) {
            array[i] = [0];
        }
        else if (secondProb) {
            array[i] = firstProb.concat(secondProb);
        }
        else
            array[i] = firstProb;
        var value = 0;
        if (firstProb || secondProb) {
            array[i].forEach(row => {

                row = eval(getMatchingValue(row, regex3))
                value = value + row;
            })
        };
        array[i] = value;
        i--;
    }
    var regexForX = new RegExp(/([+-])?([0-9]+)?X/g);
    var Xcoeffs = equation.match(regexForX);
    if (!array[1])
        array[1] = 0;
    if (Xcoeffs) {
        Xcoeffs.forEach(coeff => {
            array[1] = array[1] + eval(getMatchingValue(coeff, /X/g))
        })
        equation = equation.replace(regexForX, '');
    }
    if (!array[2])
        array[2] = 0;
    var regex4 = /[-+]?[0-9]+(\.[1-9]+)?/g;
    var integers = equation.match(regex4);
    if (!array[0])
        array[0] = 0;
    if (integers) {
        integers.forEach(integer => {
            array[0] = array[0] + eval(getNumber(integer));
        })
    }
    return array;
}

const defineOrder = (oneSidedEquation) => {
    var orderX = 0;
    var r = /X\^([0-9]+)/g;
    var order;

    if (oneSidedEquation.match(/[-+]?([0-9]+)?X([+-])/g) || oneSidedEquation.match(/[-+]?([0-9]+)?X$/g))
        orderX = 1;
    var NormalOrder = ((oneSidedEquation && oneSidedEquation.match(r)) ? oneSidedEquation.match(r).reduce((m, d) => {
        var ex = d.split('^')[1];
        if (ex && eval(ex) > eval(m)) {
            return ex;
        }
        return m;
    }, 0) : 0);
    if (NormalOrder > orderX)
        order = NormalOrder;
    else
        order = orderX;
    return (order);
}


if (process.argv.length == 3 && process.argv[2] && process.argv[2].match(/^((?:\-?\+?(?:\s+)?(\d+(?:\.\d+)?)?(?:\s+)?((\*)?(?:\s+)?X(\^\d+|\d+(?:\.\d+)?)?)?)(?:(?:\s+)?\+(?:\s+)?|(?:\s+)?\-(?:\s+)?)?)+(?:\s+)?=(?:\s+)?((?:[+-]?(\d+(?:\.\d+)?)?(?:\s+)?((\*)?(?:\s+)?X(\^\d+|\-?\d+(?:\.\d+)?)?)?)(?:(?:\s+)?\+(?:\s+)?|(?:\s+)?\-(?:\s+)?)?)+$/g)) {
    var textField = process.argv[2];
    var sttripped = removeStar(removeSpaces(process.argv[2]));
    var tab = sttripped.split("=");
    var r = /X(\^\d)?/g;
    var r2 = /[^\d]/g;
    var findXRegex = RegExp(/[-+]?([0-9]+)?X([+-])/g);
    var XorderLeft = 0;

    //finding degree without reducing
    var orderLeft = eval(defineOrder(tab[0]));
    var orderRight = eval(defineOrder(tab[1]));
    var degree = orderRight > orderLeft ? orderRight : orderLeft;
    console.log("order left :", orderLeft, " | order right :", orderRight);
    console.log("degree : ", degree);

    //finding each side coeffs with the none reduced degree
    var ret = reduceOneSidedCoeffs(tab[0], degree);
    var ret1 = reduceOneSidedCoeffs(tab[1], degree);
    console.log("left side coeffs :", ret)
    console.log("right side coeffs :", ret1)
    var ReducCoefs = getReducedCoefs(ret, ret1, degree);
    console.log("reduced coeffs : ", ReducCoefs);
    degree = getFinaldegree(ReducCoefs, degree);
    console.log("the final degree is :", degree);

    //reduce the equation format and finding the reduced degree
    const ReducedEquation = GetEquFromCoefs(ReducCoefs, degree);
    console.log("Reduced form:", ReducedEquation);
    console.log("Polynomial degree:", degree);

    //equation solutions
    if (degree > 2) {
        console.log("The polynomial degree is stricly greater than 2, I can't solve.")
    }
    else {
        var coeffs = ReducCoefs;
        for (var j = 0; j <= 2; j++) {
            if (!coeffs[j])
                coeffs[j] = 0;
        }
        console.log(coeffs);
        let root1;
        let root2;

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
        if (a == 0 && (degree == 1)) {
            console.log("The solution is:")
            console.log((-c / b).toFixed(2))
            return (0);
        }

        console.log("a is : ", a, "\nb is : ", b, "\nc is : ", c)

        // calculate discriminant
        let discriminant = (b * b) - (4 * a * c);

        console.log("the discriminant is : ", discriminant)
        if (discriminant > 0) {
            console.log("Discriminant is strictly positive, the two solutions are:")
            root1 = ((-b + findSqrt(discriminant)) / (2 * a)).toFixed(6);
            root2 = ((-b - findSqrt(discriminant)) / (2 * a)).toFixed(6);

            console.log(root2);
            console.log(root1);
        }

        // condition for real and equal roots
        else if (discriminant == 0) {
            console.log("Discriminant is null, the only solution is:")
            root1 = root2 = (-b / (2 * a)).toFixed(6);
            console.log(root1);
        }

        // if roots are not real
        else {
            console.log("Discriminant is strictly negative, the two solutions are:")
            let realPart = (-b / (2 * a)).toFixed(2);
            let imagPart = (findSqrt(-discriminant) / (2 * a)).toFixed(2);
            console.log(realPart + " + " + imagPart + "i");
            console.log(realPart + " - " + imagPart + "i");
        }
    }
}
else
    console.log("Syntax Error");
