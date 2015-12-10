var global = {
    XMLHttpRequest: XMLHttpRequest,
    location: {},
};
var setTimeout = function(fn, interval) {
    console.error('setTimeout not setup');
};

var clearTimeout = function(id) {
    console.error('clearTimeout not setup');
};

function setupTimeout(timer) {
    setTimeout = function(fn, interval) {
        timer.interval = interval ? interval : 0;
        timer.repeat = false;
        timer.running = true;
        timer.callback = fn;
    };

    clearTimeout = function(id) {
        timer.running = false;
        timer.callback = function() {};
    }
}
//QML Browserify - original prelude from browser-pack
var modules = (function outer (modules, cache, entry) {
    var previousRequire = typeof require == "function" && require;
    function newRequire(name, jumped){
        if(!cache[name]) {
            if(!modules[name]) {
                var currentRequire = typeof require == "function" && require;

                if (!jumped && currentRequire) return currentRequire(name, true);

                if (previousRequire) return previousRequire(name, true);

                var err = new Error('Cannot find module \'' + name + '\'');
                err.code = 'MODULE_NOT_FOUND';
                throw err;

            }

            var m = cache[name] = {exports:{}};
            modules[name][0].call(m.exports, function(x){
                var id = modules[name][1][x];
                return newRequire(id ? id : x);
            },m,m.exports,outer,modules,cache,entry);
        }

        return cache[name].exports;
    }

    for(var i=0;i<entry.length;i++) newRequire(entry[i]);

    return newRequire(entry[0]);
})
({1:[function(require,module,exports){
module.exports = {"uniq": require("uniq"),}
},{"uniq":2}],2:[function(require,module,exports){
"use strict"

function unique_pred(list, compare) {
  var ptr = 1
    , len = list.length
    , a=list[0], b=list[0]
  for(var i=1; i<len; ++i) {
    b = a
    a = list[i]
    if(compare(a, b)) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique_eq(list) {
  var ptr = 1
    , len = list.length
    , a=list[0], b = list[0]
  for(var i=1; i<len; ++i, b=a) {
    b = a
    a = list[i]
    if(a !== b) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique(list, compare, sorted) {
  if(list.length === 0) {
    return list
  }
  if(compare) {
    if(!sorted) {
      list.sort(compare)
    }
    return unique_pred(list, compare)
  }
  if(!sorted) {
    list.sort()
  }
  return unique_eq(list)
}

module.exports = unique

},{}]},{},[1]);
