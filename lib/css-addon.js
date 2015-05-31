/* jshint node: true */

var postcss = require('postcss');
var merge = require('broccoli-merge-trees');
var funnel = require('broccoli-funnel');
var concat = require('broccoli-concat');
var namespacify = require('./postcss/processor.js');

function CssAddon(optionsFn) {
  this.name = 'ember-cli-pod-styles';
  this.getOptions = optionsFn;
}

CssAddon.prototype.toTree = function(tree) {
  var options = this.getOptions();

  // select all component style.css
  var podStyles = funnel('app', {
    srcDir: 'components',
    include: ['**/style.css']
  });

  // namespace component styles
  podStyles = namespacify(podStyles, {
    processor: postcss(options.plugins),
    parser: postcss
  });

  // collapse styles into pod.css
  podStyles = concat(podStyles, {
    inputFiles: [
      '**/style.css'
    ],
    outputFile: '/app/styles/pod.css',
    wrapInFunction: false
  });

  // merge with original tree
  return merge([podStyles, tree]);
};

module.exports = CssAddon;
