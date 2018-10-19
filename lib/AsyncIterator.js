"use strict";

const {AsyncGeneratorFunction} = require('./AsyncGeneratorFunction');

if (AsyncGeneratorFunction !== undefined) {
  function AsyncIterator() {}
  AsyncIterator.prototype = Object.getPrototypeOf(
    AsyncGeneratorFunction.prototype.prototype);
  module.exports = {AsyncIterator};
}
