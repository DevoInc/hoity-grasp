"use strict";

const {expect} = require('chai');

const hoityGrasp = require('..');

describe('Hoity grasping', function() {
  describe('of sync generators', function() {
    it('must return a sensible GeneratorFunction class', function() {
      const {GeneratorFunction} = hoityGrasp;
      expect(GeneratorFunction).to.be.a('function');
      expect(GeneratorFunction).to.be.instanceof(Function);
      expect(function*(){}).to.be.instanceof(GeneratorFunction);
    });

    it('must return a sensible Iterator class', function() {
      const {Iterator} = hoityGrasp;
      expect(Iterator).to.be.a('function');
      expect(Iterator.prototype).to.have.property(Symbol.iterator);
      expect(Iterator.prototype).to.have.ownPropertyDescriptor(Symbol.iterator);
      expect(function*(){}()).to.be.instanceof(Iterator);
    });

    it('detects iterable objects', function() {
      const {is} = hoityGrasp;
      const ARE = [
        "hello",
        [],
        new Set(),
        new Map(),
        function*f(){}()
      ];
      const ARENOT = [
        true,
        10,
        {a: 1},
        new WeakSet(),
        new WeakMap()
      ];
      for (const x of ARE) expect(is.iterable(x)).to.be.true;
      for (const x of ARENOT) expect(is.iterable(x)).to.be.false;
    });

    it('detects iterators', function() {
      const {is} = hoityGrasp;
      const ARE = [
        function *f(){}(),
        [][Symbol.iterator](),
        new Set().entries(),
        new Map().keys(), new Map().values(), new Map().entries(),
      ];
      const ARENOT = [
        true, 10, "hello", [], {a: 1},
        new Set(), new Map(), new WeakSet(), new WeakMap()
      ];
      for (const x of ARE) expect(is.iterator(x)).to.be.true;
      for (const x of ARENOT) expect(is.iterator(x)).to.be.false;
    });

    it('detects generators', function() {
      const {is} = hoityGrasp;
      const ARE = [
        function*f(){},
      ];
      const ARENOT = [
        function*f(){}(),
      ];
      for (const x of ARE) expect(is.generator(x)).to.be.true;
      for (const x of ARENOT) expect(is.generator(x)).to.be.false;
    });
  });

  const testWhen = x => x ? it : it.skip;

  const expectingIt = testWhen(
    typeof process === 'object'
    && process.versions
    && typeof process.versions.node === 'string'
    && 10 <= +/^(\d+)/.exec(process.versions.node)[1]);

  const mustIt = testWhen('AsyncGeneratorFunction' in hoityGrasp);

  describe('of async generators', function() {
    expectingIt('should be successful', function() {
      expect(hoityGrasp.AsyncGeneratorFunction).to.exist;
    });

    mustIt('must return a sensible AsyncGeneratorFunction class', function() {
      const {AsyncGeneratorFunction} = hoityGrasp;
      expect(AsyncGeneratorFunction).to.be.a('function');
      expect(AsyncGeneratorFunction).to.be.instanceof(Function);
      expect(eval("(async function*(){})")).to.be.instanceof(
        AsyncGeneratorFunction);
    });

    mustIt('must return a sensible AsyncIterator class', function() {
      const {AsyncIterator} = hoityGrasp;
      expect(AsyncIterator).to.be.a('function');
      expect(AsyncIterator.prototype).to.have.property(Symbol.asyncIterator);
      expect(AsyncIterator.prototype).to.have.ownPropertyDescriptor(
        Symbol.asyncIterator);
      expect(eval("(async function*(){})")()).to.be.instanceof(AsyncIterator);
    });

    mustIt('detects async-iterable objects', function() {
      const {is} = hoityGrasp;
      const ARE = [
        async function*f(){}()
      ];
      const ARENOT = [
        true,
        10,
        "hello",
        [],
        {a: 1},
        new Set(),
        new Map(),
        new WeakSet(),
        new WeakMap()
      ];
      for (const x of ARE) expect(is.async.iterable(x)).to.be.true;
      for (const x of ARENOT) expect(is.async.iterable(x)).to.be.false;
    });

    mustIt('detects async-iterators', function() {
      const {is} = hoityGrasp;
      const ARE = [
        async function*f(){}(),
      ];
      const ARENOT = [
        true, 10, "hello", [], {a: 1},
        [][Symbol.iterator](),
        new Set().entries(),
        new Map().keys(), new Map().values(), new Map().entries(),
        new Set(), new Map(), new WeakSet(), new WeakMap()
      ];
      for (const x of ARE) expect(is.async.iterator(x)).to.be.true;
      for (const x of ARENOT) expect(is.async.iterator(x)).to.be.false;
    });

    mustIt('detects async-generators', function() {
      const {is} = hoityGrasp;
      const ARE = [
        async function*f(){},
      ];
      const ARENOT = [
        function*f(){},
        async function*f(){}(),
      ];
      for (const x of ARE) expect(is.async.generator(x)).to.be.true;
      for (const x of ARENOT) expect(is.async.generator(x)).to.be.false;
    });
  });
});
