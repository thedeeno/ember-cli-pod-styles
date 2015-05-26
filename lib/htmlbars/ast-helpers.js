/* jshint node: true */

var ClassAttribute = require('./class-attribute');
/*/
 * Returns first item matching given function in array
 */
function find(items, match) {
  for (var i = 0; i < items.length; i++) {
    if (match(items[i])) {
      return items[i];
    }
  }
}

module.exports = function(node) {
  return {

    findOrCreateClassAttribute: function() {
      var attr = this.findAttribute('class');
      if (!attr) {
        attr = this.createAttribute('class');
      }
      return new ClassAttribute(attr);
    },

    findAttribute: function(name) {
      return find(node.attributes, function(attr) {
        return attr.name === name;
      });
    },

    createAttribute: function(name) {
      var attr = {
        name: name,
        type: 'AttrNode',
        value: {
          chars: '',
          type: 'TextNode'
        }
      };
      node.attributes.push(attr);
      return attr;
    }
  };
};
