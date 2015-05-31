/* jshint node: true */

var $ = require('./ast-helpers');
var pragma_pattern = /\s*@component:([\w-]+)/;
// TODO: make this configurable and shared across addons
var delimeter = '__';

function Transformer() {
  this.syntax = null;
}

Transformer.prototype.transform = function(ast) {
  var walker = new this.syntax.Walker();
  var component = extractComponentName(ast);
  var prefix = component + delimeter;

  if (!component) {
    return ast;
  }

  walker.visit(ast, function(node) {
    var attr;
    if (node.type === 'ElementNode') {
      attr = $(node).findOrCreateClassAttribute();
      attr.addClass(node.tag);
      attr.prefixEachClass(prefix);
    }
  });

  return ast;
};

/**
 * Returns the component name found in the first-line-comment
 */
function extractComponentName(ast) {
  var firstNode = ast.body[0];
  if (firstNode && firstNode.type === 'CommentStatement') {
    var match = pragma_pattern.exec(firstNode.value);
    if (match) {
      ast.body.splice(0, 1);
      return match[1];
    }
  }
}

module.exports = Transformer;
