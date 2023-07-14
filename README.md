Converter Utility
=================

Convert from X to Y.

### CommonJS

~~~ js
const {fromHTML} = require('@taufik-nurrohman/from');

console.log(fromHTML('<a>'));
~~~

### ECMAScript

~~~ js
import {fromHTML} from '@taufik-nurrohman/from';

console.log(fromHTML('<a>'));
~~~

Methods
-------

### fromArray(array)

### fromHTML(string, escapeQuote = false)

### fromJSON(string)

### fromQuery(string, parseValue = true, defaultValue = true)

### fromStates(...object)

### fromURL(string)

### fromValue(any)