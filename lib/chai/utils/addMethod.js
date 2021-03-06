/*!
 * Based on chai library
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

const config = require('../config');

/**
 * ### .addMethod (ctx, name, method)
 *
 * Adds a method to the prototype of an object.
 *
 *     utils.addMethod(chai.Assertion.prototype, 'foo', function (str) {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.equal(str);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addMethod('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(fooStr).to.be.foo('bar');
 *
 * @param {Object} ctx object to which the method is added
 * @param {String} name of method to add
 * @param {Function} method function to be used for name
 * @name addMethod
 * @api public
 */
const flag = require('./flag');

module.exports = function (ctx, name, method) {
  ctx[name] = function () {
    const old_ssfi = flag(this, 'ssfi');

    if (old_ssfi && config.includeStack === false) {
      flag(this, 'ssfi', ctx[name]);
    }

    const result = method.apply(this, arguments);

    return result === undefined ? this : result;
  };
};
