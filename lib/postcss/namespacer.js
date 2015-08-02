/* jshint node: true */

// var cssSelectorParser = require('css-selector-parser').CssSelectorParser;
// var selectorParser = new cssSelectorParser();
var selectorParser = require('postcss-selector-parser');

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

var hostPattern = /^:host/;
// TODO: this pattern isn't very safe
var pseudoPattern = /(:\S+)/;

// TODO: make test cases
// :host => namespace
// a:hover => a.namespace:hover
// header => header.namespace
// .foo => .foo.namespace
// :host:nth-child(3n + 1) => namespace:nth-child(3n + 1)
// function namespace(selector, namespace) {
//   var a = selector.split(' ');
//   var b = [];
//   var match;
//   console.log(selector);
//   a.forEach(function(part) {
//     if (hostPattern.test(part)) {
//       b.push(namespace);
//     } else if (pseudoPattern.test(part)) {
//       b.push(part.replace(pseudoPattern, '.' + namespace + '$1'));
//     } else {
//       b.push(part + '.' + namespace);
//     }
//   });
//   return b.join(' ');
// }

function namespacer(namespace) {
  return function(selectors) {
    selectors.at(0).nodes.forEach(function(selector) {
      if (selector.type === 'tag') {
        selector.replaceWith(selector.toString() + '.' + namespace);
      }
      if (selector.type === 'pseudo' && selector.toString() === ':host') {
        selector.replaceWith(namespace);
      }
      if (selector.type === 'class') {
        selector.replaceWith(selector.toString() + '.' + namespace);
      }
    });
  };
}

function namespacify(selector, pod) {
  return selectorParser(namespacer(pod)).process(selector).result;
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
      newSelectors.push(namespacify(selector, pod));
    });

    rule.selector = newSelectors.join(',\n');
  });

  return ast.toString();
};

module.exports = NamespaceFilter;
