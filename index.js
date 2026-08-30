function add(a, b) { return a + b }
function sub(a, b) { return a - b }
function mul(a, b) { return a * b }
function div(a, b) { return a / b }

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

function composeu(f1, f2) {
  return function (i) {
    return f2(f1(i));
  };
}

function composeb(f1, f2) {
  return function (x, y, z) {
    return f2(f1(x, y), z);
  };
}

function limit(f, count) {
  return function (a, b) {
    if (count == 0) { return; }
    count = count - 1;
    return f(a, b);
  };
}

function from(count) {
  return function () {
    return count++;
  };
}

function to(f, limit) {
  return function () {
    var o = f();
    if (o >= limit) { return; }
    return o;
  };
}

function fromTo(s, e) {
  return to(from(s), e);
}

function element(arr, gen) {
  if (gen === undefined) {
    gen = fromTo(0, arr.length);
  }
  return function () {
    var o = gen();
    if (o !== undefined) {
      return arr[o];
    }
  };
}

function collect(gen, arr) {
  return function () {
    var o = gen();
    if (o !== undefined) {
      arr.push(o);
      return o;
    }
  };
}

function filter(gen, p) {
  return function recur() {
    var o = gen();
    if (o === undefined || p(o) === true) {
      return o;
    }
    return recur();
  };
}

function concat(g1, g2) {
  var g = g1;
  return function () {
    var o = g();
    if (o === undefined) { 
      g = g2;
      return g();
    }
    return o;
  };
}

function gensymf(c) {
  var counter = 1;
  return function () {
    var cur = counter;
    counter += 1;
    return `c{cur}`;
  };
}

function counter(c) {
  return {
    up: function() { 
      c += 1;
      return c;
    },
    down: function() { 
      c -= 1;
      return c; 
    }
  };
}

function revocable(f) {
  return {
    invoke: function (x, y) {
      if (f !== undefined) {
        return f(x, y);
      }
    },
    revoke: function () {
      f = undefined;
    }
  }
}

// var three = identifyf(3);
// console.log(three());

// console.log(liftf(add)(3)(4));
// console.log(curry(add, 3)(4));

// var inc = curry(add, 1);
// console.log(inc(5)); // => should be 6
// console.log(inc(inc(5))); // => should be 6

var doubl = twice(add);
console.log(doubl(11)); // 22
var sqrt = twice(mul);
console.log(sqrt(11)); // 121

console.log(composeu(doubl, sqrt)(5));

// var add_lmt = limit(add, 1);
// console.log(add_lmt(2, 3));
// console.log(add_lmt(2, 3));
//
// var index = to(from(0), 3);
// console.log(index());
// console.log(index());
// console.log(index());
// console.log(index());
//
// var ele = element(['a', 'b', 'c', 'd'], fromTo(1, 3));
// console.log(ele());
// console.log(ele());
// console.log(ele());
// console.log(ele());
//
// var arr = [], col = collect(fromTo(0, 2), arr);
// console.log(col());
// console.log(col());
// console.log(col());
// console.log(arr);

// console.log("filter");
// var fil = filter(fromTo(0, 5), function third(v) { return (v % 3) === 0; });
// console.log(fil());
// console.log(fil());
// console.log(fil());
// console.log("concat");
// var con = concat(fromTo(0, 3), fromTo(0, 2));
// console.log(con());
// console.log(con());
// console.log(con());
// console.log(con());
// console.log(con());
// console.log(con());

// var obj = counter (10)
// var u = obj.up;
// var d = obj.down;
//
// console.log(u());
// console.log(d());
// console.log(d());
// console.log(u());
console.log("REV");
var rev = revocable(add), add_rev = rev.invoke;

console.log(add_rev(3, 4));
rev.revoke();
console.log(add_rev(3, 4));
