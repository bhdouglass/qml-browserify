var qbrowserify = require('../src/index.js');
var assert = require('assert');
var fs = require('fs');

describe('qml-browserify', function() {
  describe('autobundle', function() {
    it('should bundle without error', function(done) {
      var actualFile = __dirname + '/test-autobundle.actual';
      var expectedFile = __dirname + '/test-autobundle.expected';
      qbrowserify.autobundle({
        dirname: __dirname + '/test-module',
        output: actualFile,
        preludes: {
          globals: true,
          timer: false,
          promise: false,
        },
      }, function(err, src) {
        if (err) {
          throw err;
        }

        fs.readFile(actualFile, 'utf8', function(err, actual) {
          if (err) {
            throw err;
          }

          fs.readFile(expectedFile, 'utf8', function(err, expected) {
            if (err) {
              throw err;
            }

            fs.unlink(actualFile, function(err) {
              if (err) {
                throw err;
              }

              assert.equal(expected, actual);
              assert.equal(expected, src);
              done();
            });
          });
        });
      });
    });
  });

  describe('bundle', function() {
    it('should bundle without error', function(done) {
      var actualFile = __dirname + '/test-bundle.actual';
      var expectedFile = __dirname + '/test-bundle.expected';
      qbrowserify.bundle({
        input: __dirname + '/test-module/index.js',
        output: actualFile,
      }, function(err, src) {
        if (err) {
          throw err;
        }

        fs.readFile(actualFile, 'utf8', function(err, actual) {
          if (err) {
            throw err;
          }

          fs.readFile(expectedFile, 'utf8', function(err, expected) {
            if (err) {
              throw err;
            }

            fs.unlink(actualFile, function(err) {
              if (err) {
                throw err;
              }

              assert.equal(expected, actual);
              assert.equal(expected, src);
              done();
            });
          });
        });
      });
    });
  });
});
