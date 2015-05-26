/* jshint node: true */

var cssSelectorParser = require('css-selector-parser').CssSelectorParser;
var selectorParser = new cssSelectorParser();

var Filter = require('broccoli-filter');

function isClass(selector) {
  return !!selectorParser.parse(selector).rule.classNames;
}

function NamespaceFilter(inputTree, options) {
  if (!(this instanceof NamespaceFilter)) {
    return new NamespaceFilter(inputTree, options);
  }

  this.inputTree = inputTree;
  this.processor = options.processor;
  this.parse = options.parser.parse;
  this.delimiter = options.prefix || '__';
  this.extensions = ['css'];
  this.targetExtension = 'css';
}

NamespaceFilter.prototype = Object.create(Filter.prototype);
NamespaceFilter.prototype.constructor = NamespaceFilter;
NamespaceFilter.prototype.processString = function(string, relativePath) {
  var pod = relativePath.split('/')[0];
  var css = this.processor.process(string).css;
  var ast = this.parse(css);

  ast.eachRule(function(rule) {
    var newSelectors = [];
    rule.selectors.forEach(function(selector) {
      if (selector.indexOf('#') === 0 || selector.indexOf(':') === 0) {
        newSelectors.push(selector);
        return;
      }
      var parts = selector.split(' ');
      var newParts = [];
      parts.forEach(function(part) {
        newParts.push('.' + pod + '__' + part.replace(/^\./,''));
      });
      newSelectors.push(newParts.join(' '));
    });
    rule.selector = newSelectors.join(',\n');
  });

  console.log();
  console.log(ast.toString());

  return ast.toString();
};

module.exports = NamespaceFilter;
