# react-circletree
A circle tree component for React applications

## Get the component

```
npm install react-circletree --save
```

## Use the component

If you're using an ES6-capable build system, simply use `react-circletree`:

```
var CircleTree = require('react-circletree');
```

Or if you're using an ES5 build system:

```
var CircleTree = require('react-circletree/es5');
```

## An example app

See the [exampleapp](https://github.com/Pomax/react-circletree/blob/gh-pages/exampleapp/App.jsx) for an example

## API

```
<CircleTree
  radius={number: width of each segment, defaults to 80}
  spacing={number: spacing between segments, defaults to 3}
  leafRadius={number: width of each leaf segment, defaults to 7},
  leafSpacing={numbe: spacing between leaves in a leaf stack, defaults to 2}
  data={object: nested, keyed data. Leaf stacks encoded as arrays}
  onToggle={function: see note below, no default}
/>
```
For an example of `data`, see [this object](https://github.com/Pomax/react-circletree/blob/gh-pages/exampleapp/cats.js).

### passing a onToggle() handler

As segments in the circle tree can be clicked, you might want to do something based on that interaction.

As such, passing a `onToggle` function as a property to the `<CircleTree>` component will give you a way to know what the user clicked:

```
  ...
  onToggle(labels) {
    // labels is an array of all the applicable labels in the chain
    // from the tree's root to the segment that was clicked by the
    // user. As such, labels[0] is always the root label, and
    // labels.slice(-1)[0] is always the segment the user clicked.
  },
  ...
  render() {
    return <CircleTree onToggle={this.onToggle}/>
  },
  ...
```

## Demo

https://pomax.github.io/react-circletree
