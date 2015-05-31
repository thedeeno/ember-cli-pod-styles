# Ember-cli-component-sass-marker

```
// original
<ul class='foo'>
</ul>

// template: filesystem pragma injection step
<!-- @component: my-component-name -->
<ul class='foo'>
</ul>

// htmlbars: ast tranform plugin
1) find the first comment: <!-- @component: my-component-name -->
2) extract the component name from comment: my-component-name
3) delete the comment
4) to use the component name to walk the nodes and namespace the styles
<ul class='my-component-name__foo'>
</ul>
```

This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
