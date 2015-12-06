var browserify = require('browserify');
var fs = require('fs');
var path = require('path');
var assign = require('lodash.assign');

function bundle(options, callback) {
  options = assign({
    output: '',
    input: 'index.js',
    browserify: {},
  }, options);

  fs.readFile(path.join(__dirname, 'prelude'), 'utf8', function(err, prelude) {
    var args = assign(options.browserify, {
      entries: options.input,
      prelude: prelude,
    });

    var b = browserify(args);
    b.bundle(function(err, src) {
      if (err) {
        callback(err);
      }
      else {
        src = src.toString();
        if (options.output) {
          fs.writeFile(options.output, src, function(err) {
            callback(err, src);
          });
        }
        else {
          callback(null, src);
        }
      }
    });
  });
}

function autobundle(options, callback) {
  options = assign({
    dirname: '.',
    tmpfilename: '.qml-browserify',
  }, options);

  fs.readFile(path.join(options.dirname, 'package.json'), 'utf8', function(err, data) {
    if (err) {
      callback(err);
    }
    else {
      var pkg = JSON.parse(data);
      if (!pkg.dependencies) {
        callback('No dependencies to bundle');
      }
      else {
        var req = '';
        for (var dep in pkg.dependencies) {
          req += '"' + dep + '": require("' + dep + '"),';
        }

        var tmp = 'module.exports = {' + req + '}';
        var tmpfile = path.join(options.dirname, options.tmpfilename);
        fs.writeFile(tmpfile, tmp, function(err) {
          if (err) {
            callback(err);
          }
          else {
            options.input = tmpfile;
            bundle(options, function(err, src) {
              fs.unlink(tmpfile, function() {
                callback(err, src);
              });
            });
          }
        });
      }
    }
  });
}

exports.bundle = bundle;
exports.autobundle = autobundle;