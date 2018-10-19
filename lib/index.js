"use strict";

module.exports = Object.assign({
  Iterator: require('./Iterator'),
  GeneratorFunction: require('./GeneratorFunction'),
  is: Object.assign(
    require('./is-sync'),
    {async: require('./is-async')})
},
  require('./AsyncIterator'),
  require('./AsyncGeneratorFunction')
);
