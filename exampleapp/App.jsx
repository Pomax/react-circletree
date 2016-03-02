var React = require('react');
var ReactDOM = require('react-dom');
var CircleTree = require('../circletree');
var props = {
  data: require('./cats'),
  color: require('./colors'),
  radius: 80,
  spacing: 3,
  leafRadius: 7,
  leafSpacing: 2
};
ReactDOM.render(<CircleTree {...props} />, document.getElementById('app'));
