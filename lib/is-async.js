"use strict";

const {AsyncIterator} = require('./AsyncIterator');
const {AsyncGeneratorFunction} = require('./AsyncGeneratorFunction');

module.exports = {
  iterable: x => typeof x[Symbol.asyncIterator] === "function",
  iterator: x => x instanceof AsyncIterator,
  generator: x => x instanceof AsyncGeneratorFunction
};
