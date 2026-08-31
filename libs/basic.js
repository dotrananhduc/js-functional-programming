function identifyf(i) {
  return function() {
    return i;
  };
}

function liftf(f) {
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

function curry(f, a) {
  return function(b) {
    return f(a, b);
  };
}

function twice(f) {
  return function(i) {
    return f(i, i);
  };
}

function reverse(f) {
  return function(a, b) {
    return f(b, a);
  };
}

module.exports = {
  identifyf,
  liftf,
  curry,
  twice,
  reverse
};
