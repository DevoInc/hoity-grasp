Hoity (High Order ITerators Yielded) predefined classes grasping
======================================================================

This is the very beginning of the Hoity project:
it grasps (**and gives names to**) the predefined classes
related to iterators and generators.

For some reason the EcmaScript standards defines a set of classes
and prototypes that any implementation must have,
but non of them are accesible through a name.
Nevertheless, JavaScript is so powerful that it is trivial
to find those clases and prototypes,
to create classes when absent,
and to make then available.

This package (re)exports the following classes:

- `Iterator`.
Neither this class nor its prototype exists in EcmaScript.
But the ES hierarchy has a prototype that deserves a class with this name.
So, this package introduces such a class.

All predefined iterators extends from this class
(have its prototype in theirs prototype chains).
So any method added to this class will be available to any standar iterator.

This class has a predefined method `@@iterator` that returns itself.
This is what makes possible to use an iterator where an iterable is expected.

When defining an **iterator** by hand,
better extend this class to get for free at least `@@iterator` method,
but any other method introduced by other Hoity modules
(see hoity-core).

- `GeneratorFunction`.
This is **the class** of all generators functions.
Because generators functions are build with the `function*` syntax,
no class will extend GeneratorFunction.
But can be used to test if something is a generator with
`gen instanceof GeneratorFunction`.

- `AsyncIterator` and `AsyncGeneratorFunction`.
Similar classes for the async side of the generators.
They only exist if the JavaScript implementation support async generators.
