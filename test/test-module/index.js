var uniq = require('uniq');
var asort = require('alpha-sort');


module.exports = function(arr) {
  return asort(uniq(arr));
};