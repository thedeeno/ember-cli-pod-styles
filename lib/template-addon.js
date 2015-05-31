/* jshint node: true */

var mark = require('./template/processor.js');

function TemplateAddon(options) {
  this.name = 'ember-cli-pod-styles-template';
  this.options = options;
}

TemplateAddon.prototype.toTree = function(tree) {
  return mark(tree);
};

module.exports = TemplateAddon;
