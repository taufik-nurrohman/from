import {isArray, isObject} from '@taufik-nurrohman/is';

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
