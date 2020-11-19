export const fromHTML = x => {
    return x
        .replace(/&/g, '&amp;')
        .replace(/>/g, '&gt;')
        .replace(/</g, '&lt;');
};
export const fromJSON = x => JSON.parse(x);
export const fromURL = x => encodeURIComponent(x);
