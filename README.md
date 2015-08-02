# ember-cli-pod-styles

This ember addon makes it easy to write component-namespaced css.

It will automatically namespace each component's style.css and
concatenate the results into `app.css`.

At runtime, when ember inserts elements into the DOM this addon will add
`style-scope` marker classes to ensure the proper specificity for the
namespaced styles. 

This addon requires `postcss`

Input:
```
// my-component/template.hbs
<div class='foo'>
</div>

// my-component/style.css
:host { background: blue; }
.foo { color: red; }
```

Runtime output:

```
<my-component>
  <div class='foo style-scope my-component'>
  </div>
</my-component>

my-component { background: blue; }
.foo.my-component { color: red; }
```

## Installation

```
npm install ember-cli-pod-styles
```

## Usage

Add at least one postcss plugin to `podStyleOptions`:

```
// ember-cli-build.js
var app = new EmberApp(defaults, {
  podStyleOptions: {
    plugins: [
      require('postcss-nested'),
      // additional postcss plugins here
    ]
  }
});
```

In your component's pod directory add a style.css file with styles you
want automatically namespaced:

```
// app/components/foo-bar/style.css
:host {}             // => foo-bar
.baz {}              // => .baz.foo-bar
.baz:nth-child(1) {} // => .baz.foo-bar:nth-child(1)
```

Make sure to change the `tagName` for your component:

export default Ember.Component.extend({
  tagName: 'foo-bar'
});

