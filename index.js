const {hasValue} = require('@taufik-nurrohman/has');
const {isArray, isObject, isSet} = require('@taufik-nurrohman/is');
const {toCount, toObjectCount, toValue} = require('@taufik-nurrohman/to');

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
const fromHTML = (x, escapeQuote) => {
    x = x.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;');
    if (escapeQuote) {
        x = x.replace(/'/g, '&apos;').replace(/"/g, '&quot;');
    }
    return x;
};
const fromJSON = x => {
    let value = null;
    try {
        value = JSON.parse(x);
    } catch(e) {}
    return value;
};
const fromNumber = x => {};
function _fromQueryDeep(o, props, value) {
    let prop = props.split('['), i, j = toCount(prop), k;
    for (i = 0; i < j - 1; ++i) {
        k = ']' === prop[i].slice(-1) ? prop[i].slice(0, -1) : prop[i];
        k = "" === k ? toObjectCount(k) : k;
        o = o[k] || (o[k] = {});
    }
    k = ']' === prop[i].slice(-1) ? prop[i].slice(0, -1) : prop[i];
    o["" === k ? toObjectCount(o) : k] = value;
}
const fromQuery = (x, parseValue = true, defaultValue = true) => {
    let out = {}, q = x && '?' === x[0] ? x.slice(1) : x;
    if ("" === q) {
        return out;
    }
    q.split('&').forEach(v => {
        let a = v.split('='),
            key = fromURL(a[0]),
            value = isSet(a[1]) ? fromURL(a[1]) : defaultValue;
        value = parseValue ? toValue(value) : value;
        // `a[b]=c`
        if (']' === key.slice(-1)) {
            _fromQueryDeep(out, key, value);
        // `a=b`
        } else {
            out[key] = value;
        }
    });
    return out;
};
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
const fromURL = x => decodeURIComponent(x);
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
    fromQuery,
    fromStates,
    fromString,
    fromURL,
    fromValue
});