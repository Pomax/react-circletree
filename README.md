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

See the [exampleapp](exampleapp/App.jsx) for an example

## API

```
<CircleTree
  radius={number: width of each segment, defaults to 80}
  spacing={number: spacing between segments, defaults to 3}
  leafRadius={number: width of each leaf segment, defaults to 7},
  leafSpacing={numbe: spacing between leaves in a leaf stack, defaults to 2}
  data={object: nested, keyed data. Leaf stacks encoded as arrays}
/>
```
For an example of `data`, see [this object](exampleapp/cats.js).

## Demo

https://pomax.github.io/react-circletree
