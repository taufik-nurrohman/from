// This file is in sync with `index.mjs` file to enable CommonJS module loader feature.
// If you want to add/remove something here, make sure to do it in `index.mjs` file first.
($$ => {
    const {
        isArray,
        isObject
    } = require('@taufik-nurrohman/is');
    const fromArray = x => {
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
    const fromBoolean = x => {};
    const fromHTML = x => {
        return x
            .replace(/&/g, '&amp;')
            .replace(/>/g, '&gt;')
            .replace(/</g, '&lt;');
    };
    const fromJSON = x => JSON.parse(x);
    const fromNumber = x => {};
    const fromString = x => {};
    const fromURL = x => encodeURIComponent(x);
    const fromValue = x => {
        if (isArray(x)) {
            return x.map(v => fromValue(x));
        }
        if (isObject(x, true)) {
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
    $$.fromArray = fromArray;
    $$.fromBoolean = fromBoolean;
    $$.fromHTML = fromHTML;
    $$.fromJSON = fromJSON;
    $$.fromNumber = fromNumber;
    $$.fromString = fromString;
    $$.fromURL = fromURL;
})(exports || window || {});
