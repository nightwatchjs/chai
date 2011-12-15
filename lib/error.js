
module.exports = AssertionError;

function AssertionError (options) {
  options = options || {};
  this.name = 'AssertionError';
  this.message = options.message;
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  var stackStartFunction = options.stackStartFunction || fail;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  }
};

AssertionError.prototype.__proto__ = Error.prototype;

AssertionError.prototype.summary = function() {
  return this.name + (this.message ? ': ' + this.message : '');
};

AssertionError.prototype.details = function() {
  return 'In "' + this.operator + '":\n\tExpected: ' + this.expected + '\n\tFound: ' + this.actual;
};

AssertionError.prototype.toString = function() {
  return this.summary();
};

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}