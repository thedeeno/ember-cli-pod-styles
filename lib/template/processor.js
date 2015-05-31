/* jshint node: true */

var Filter = require('broccoli-filter');

function getComponentName(path) {
  var parts = path.split('/');
  return parts[parts.length - 2];
}

/**
 * Injects a comment with the component name pragma for our htmlbars ast plugin
 */
function PragmaFilter(inputTree, options) {
  if (!(this instanceof PragmaFilter)) {
    return new PragmaFilter(inputTree, options);
  }

  this.inputTree = inputTree;
  this.extensions = ['hbs'];
  this.targetExtension = 'hbs';
}

var podTemplatePattern = /.*\/components\/\S+\/template\.hbs/;

PragmaFilter.prototype = Object.create(Filter.prototype);
PragmaFilter.prototype.constructor = PragmaFilter;
PragmaFilter.prototype.processString = function(string, relativePath) {
  if (relativePath.match(podTemplatePattern)) {
    var pragma = '<!-- @component:' + getComponentName(relativePath) + ' -->';
    return pragma + '\n' + string;
  }
  return string;
};

module.exports = PragmaFilter;

