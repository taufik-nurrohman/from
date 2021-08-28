import {hasValue} from '@taufik-nurrohman/has';
import {isArray, isObject, isSet} from '@taufik-nurrohman/is';
import {toCount} from '@taufik-nurrohman/to';

export const fromArray = x => {
    if (isArray(x)) {
        if (0 === x.length) {
            return null;
        }
        if (1 === x.length) {
            return x[0];
        }
    }
    return x;
};
export const fromBoolean = x => {};
export const fromHTML = x => {
    return x
        .replace(/&/g, '&amp;')
        .replace(/>/g, '&gt;')
        .replace(/</g, '&lt;');
};
export const fromJSON = x => {
    let value = null;
    try {
        value = JSON.parse(x);
    } catch(e) {}
    return value;
};
export const fromNumber = x => {};
export const fromStates = (...lot) => {
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
export const fromString = x => {};
export const fromURL = x => encodeURIComponent(x);
export const fromValue = x => {
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