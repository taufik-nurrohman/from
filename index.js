const {hasValue} = require('@taufik-nurrohman/has');
const {isArray, isObject, isSet} = require('@taufik-nurrohman/is');
const {toCount} = require('@taufik-nurrohman/to');

const fromArray = x => {
    if (isArray(x)) {
        if (0 === toCount(x)) {
            return null;
        }
        if (1 === toCount(x)) {
            return x[0];
        }
    }
    return x;
};
const fromBoolean = x => {};
const fromHTML = x => {
    return x
        .replace(/&/g, '&amp;')
        .replace(/>/g, '&gt;')
        .replace(/</g, '&lt;');
};
const fromJSON = x => {
    let value = null;
    try {
        value = JSON.parse(x);
    } catch(e) {}
    return value;
};
const fromNumber = x => {};
const fromStates = (...lot) => {
    let out = lot.shift();
    for (let i = 0, j = toCount(lot); i < j; ++i) {
        for (let k in lot[i]) {
            // Assign value
            if (!isSet(out[k])) {
                out[k] = lot[i][k];
                continue;
            }
            // Merge array
            if (isArray(out[k]) && isArray(lot[i][k])) {
                out[k] = [/* Clone! */].concat(out[k]);
                for (let ii = 0, jj = toCount(lot[i][k]); ii < jj; ++ii) {
                    if (!hasValue(lot[i][k][ii], out[k])) {
                        out[k].push(lot[i][k][ii]);
                    }
                }
            // Merge object recursive
            } else if (isObject(out[k]) && isObject(lot[i][k])) {
                out[k] = fromStates({/* Clone! */}, out[k], lot[i][k]);
            // Replace value
            } else {
                out[k] = lot[i][k];
            }
        }
    }
    return out;
};
const fromString = x => {};
const fromURL = x => encodeURIComponent(x);
const fromValue = x => {
    if (isArray(x)) {
        return x.map(v => fromValue(x));
    }
    if (isObject(x)) {
        for (let k in x) {
            x[k] = fromValue(x[k]);
        }
        return x;
    }
    if (false === x) {
        return 'false';
    }
    if (null === x) {
        return 'null';
    }
    if (true === x) {
        return 'true';
    }
    return "" + x;
};

Object.assign(exports, {
    fromArray,
    fromBoolean,
    fromHTML,
    fromNumber,
    fromStates,
    fromString,
    fromURL,
    fromValue
});