/* jshint node: true */
'use strict';

var CssAddon = require('./lib/css-addon.js');
var HtmlbarsAddon = require('./lib/htmlbars-addon.js');
var TemplateAddon = require('./lib/template-addon.js');

module.exports = {

  name: 'ember-cli-pod-styles',

  lazyLoadOptions: function() {
    return this.app.options.podStyleOptions;
  },

  setupPreprocessorRegistry: function(type, registry) {
    var optionsFn = this.lazyLoadOptions.bind(this);
    registry.add('css', new CssAddon(optionsFn));
    registry.add('template', new TemplateAddon());
    registry.add('htmlbars-ast-plugin', HtmlbarsAddon);
  },

  included: function(app) {
    this.app = app;
  }

};
