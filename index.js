/* jshint node: true */
'use strict';

var CssAddon = require('./lib/css-addon.js');

module.exports = {

  name: 'ember-cli-pod-styles',

  included: function(app) {
    this.app = app;

    // Initialize options if none were passed
    var options = app.options.podStyleOptions || {};

    // Set defaults if none were passed
    options.map = options.map || {};
    options.plugins = options.plugins || [];
    options.outputFile = options.outputFile || '/assets/' + this.project.name() + '.css';

    app.registry.add('css', new CssAddon(options));
  }

};
