var React = require('react');
var ReactDOM = require('react-dom');
var data = require('./cats');
var colors = require('./colors');
var CircleTree = require('../circletree');
var tree = <CircleTree data={data} color={colors} />;

ReactDOM.render(tree, document.getElementById('app'));
