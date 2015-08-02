//TODO: exract a broccoli plugin helper so this is easier to read
var Filter = require('broccoli-filter');

function PostcssFilter(inputTree, options) {
  if (!(this instanceof PostcssFilter)) {
    return new PostcssFilter(inputTree, options);
  }

  this.extensions = ['css'];
  this.inputTree = inputTree;
  this.processor = options.processor;
}

PostcssFilter.prototype = Object.create(Filter.prototype);
PostcssFilter.prototype.constructor = PostcssFilter;
PostcssFilter.prototype.processString = function(string, relativePath) {
  return this.processor.process(string).css;
}

module.exports = PostcssFilter;
