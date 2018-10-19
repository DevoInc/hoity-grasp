"use strict";

var agf;
try {
  agf = require('./async-gen-fun');
} catch (error) {
  agf = undefined;
}

if (agf !== undefined) {
  module.exports = {
    AsyncGeneratorFunction: Object.getPrototypeOf(agf).constructor
  };
}
