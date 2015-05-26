/* jshint node: true */

      // // prefix each class with component name
      // v = v.split(' ').map(function(klass) {
      //   return component + delimeter + klass;
      // }).join(' ');
      //
      // node.value.chars = value;

function ClassAttribute(node) {
  this.node = node;
}

ClassAttribute.prototype.addClass = function(klass) {
  var value = this.node.value.chars;
  value = value + ' ' + klass;
  value = value.trim();
  this.node.value.chars = value;
};

ClassAttribute.prototype.prefixEachClass = function(prefix) {
  var value = this.node.value.chars;
  value = value
    .split(' ')
    .map(function(klass) { return prefix + klass; })
    .join(' ');
  this.node.value.chars = value;
};

module.exports = ClassAttribute;
