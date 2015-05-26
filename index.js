/* jshint node: true */
'use strict';

var CssAddon = require('./lib/css-addon.js');
var HtmlbarsAddon = require('./lib/htmlbars-addon.js');

module.exports = {

  name: 'ember-cli-pod-styles',

  included: function(app) {
    var options = app.options.podStyleOptions;
    app.registry.add('css', new CssAddon(options));
    app.registry.add('htmlbars-ast-plugin', HtmlbarsAddon);
  }

};
