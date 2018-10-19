"use strict";

const Iterator = require('./Iterator');
const GeneratorFunction = require('./GeneratorFunction');

module.exports = {
  iterable: x => typeof x[Symbol.iterator] === 'function',
  iterator: x => x instanceof Iterator,
  generator: x => x instanceof GeneratorFunction
};
