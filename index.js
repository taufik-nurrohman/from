// This file is in sync with `index.mjs` file to enable CommonJS module loader feature.
// If you want to add/remove something here, make sure to do it in `index.mjs` file first.
($$ => {
    const fromHTML = x => {
        return x
            .replace(/&/g, '&amp;')
            .replace(/>/g, '&gt;')
            .replace(/</g, '&lt;');
    };
    const fromJSON = x => JSON.parse(x);
    const fromURL = x => encodeURIComponent(x);
    $$.fromHTML = fromHTML;
    $$.fromJSON = fromJSON;
    $$.fromURL = fromURL;
})(exports || window || {});
