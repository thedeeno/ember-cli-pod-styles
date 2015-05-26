/* jshint node: true */

var postcss = require('postcss');
var merge = require('broccoli-merge-trees');
var funnel = require('broccoli-funnel');
var namespacify = require('./postcss/processor.js');

function CssAddon(options) {
  this.name = 'ember-cli-pod-styles';
  this.options = options;
}

CssAddon.prototype.toTree = function(tree) {
  var podStyles = funnel('app', {
    srcDir: 'components',
    include: ['**/style.css']
  });

  podStyles = namespacify(podStyles, {
    processor: postcss(this.options.plugins),
    parser: postcss
  });

  return merge([podStyles, tree]);
};

module.exports = CssAddon;
