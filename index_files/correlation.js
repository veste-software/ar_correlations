var calculateAverage = values =>
    values.reduce((sum, v) => sum + v, 0) / values.length
var isNumber = n =>
    typeof n === 'number' && n === Number(n) && Number.isFinite(n);
var calculateStdDev = values => {
    var µ = calculateAverage(values);
    var addedSquareDiffs = values
        .map(val => val - µ)
        .map(diff => diff ** 2)
        .reduce((sum, v) => sum + v, 0);
    var variance = addedSquareDiffs / (values.length - 1);
    return Math.sqrt(variance);
};
var checkInput = args => {
    // only two inputs exist
    if (args.length !== 2) return false;
    var [x, y] = args;
    // inputs are not falsy
    if (!x || !y) return false;
    // they are arrays
    if (!Array.isArray(x) || !Array.isArray(y)) return false;
    // length is not 0
    if (!x.length || !y.length) return false;
    // length is the same
    if (x.length !== y.length) return false;
    // all the elems in the arrays are numbers
    if (x.concat(y).find(el => !isNumber(el))) return false;
    // 👌 all good!
    return true;
};
var preciseRound = (num, dec) =>
    Math.round(num * 10 ** dec + (num >= 0 ? 1 : -1) * 0.0001) / 10 ** dec;
var isObject = obj =>
    typeof obj === 'object' && obj !== null && !Array.isArray(obj);

var manageInput = input => {
    var arrays = input;
    var options = {};

    if (input.length > 2) {
        /* eslint-disable-next-line prefer-destructuring */
        if (isObject(input[2])) options = input[2];
        arrays = input.slice(0, 2);
    }

    var opts = {
        returnString: options.string || false,
        returnDecimals: options.decimals || 9,
    };

    return [arrays, opts];
};

function calculateCorrelation (arrays) {
    // var [arrays, options] = manageInput(args);

    var options = {
        returnString: false,
        returnDecimals: 2,
    };

    var isInputValid = checkInput(arrays);
    if (!isInputValid) throw new Error('Input not valid');

    var [x, y] = arrays;

    var µ = { x: calculateAverage(x), y: calculateAverage(y) };
    var s = { x: calculateStdDev(x), y: calculateStdDev(y) };

    var addedMultipliedDifferences = x
        .map((val, i) => (val - µ.x) * (y[i] - µ.y))
        .reduce((sum, v) => sum + v, 0);

    var dividedByDevs = addedMultipliedDifferences / (s.x * s.y);

    var r = dividedByDevs / (x.length - 1);

    // return string?
    if (options.returnString === true) return r.toFixed(options.returnDecimals);
    // default return
    return preciseRound(r, options.returnDecimals);
};
