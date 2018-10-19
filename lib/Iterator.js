"use strict";

function Iterator() {}
Iterator.prototype = Object.getPrototypeOf(
  require('./GeneratorFunction').prototype.prototype);

Iterator.is = function(x) {
  return typeof x[Symbol.iterator] === "function";
};

module.exports = Iterator;
