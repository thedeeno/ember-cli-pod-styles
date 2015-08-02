/* jshint node: true */

var postcss = require('postcss');
var merge = require('broccoli-merge-trees');
var funnel = require('broccoli-funnel');
var concat = require('broccoli-concat');
var stew = require('broccoli-stew');
var namespacify = require('./postcss/namespacer.js');
var postcssFilter = require('./postcss/filter.js');

function CssAddon(options) {
  this.name = 'ember-cli-pod-styles';
  this.options = options;
  this.processor = postcss(this.options.plugins);
  this.parser = postcss;
}

CssAddon.prototype.toTree = function(tree) {

  // select component styles
  var component = funnel('app', {
    srcDir: 'components',
    include: ['**/style.css']
  });

  // namespace component styles
  component = namespacify(component, {
    processor: this.processor,
    parser: this.parser
  });

  // select app styles
  var app = funnel('app', {
    srcDir: 'styles',
    files: ['app.css']
  });

  // merge component and app
  var styles = merge([component, app]);

  // process through postcss
  styles = postcssFilter(styles, {
    processor: this.processor
  });

  // collapse styles into single output file
  style = concat(styles, {
    inputFiles: [
      '**/*.css'
    ],
    outputFile: this.options.outputFile,
    wrapInFunction: false
  });

  return style;
};

module.exports = CssAddon;
