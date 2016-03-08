'use strict';

var React = require('react');
var CircleSegment = require('./CircleSegment.js');
var BBox = require('./bbox');

var defaultProps = {
  data: {},
  radius: 80,
  spacing: 3,
  leafRadius: 7,
  leafSpacing: 2
};

var CircleTree = React.createClass({
  displayName: 'CircleTree',
  getDefaultProps: function getDefaultProps() {
    return defaultProps;
  },
  getInitialState: function getInitialState() {
    this.bbox = new BBox().grow({ x: 0, y: 0 });
    return {
      data: this.props.data,
      label: Object.keys(this.props.data)[0],
      bbox: this.bbox
    };
  },
  updateBBox: function updateBBox(bbox) {
    this.bbox.expand(bbox);
    if (this.isMounted()) {
      this.setState({ bbox: this.bbox });
    }
  },
  formSegments: function formSegments() {
    var segmentProps = {
      r2: this.props.radius,
      label: this.state.label,
      data: this.props.data[this.state.label],
      updateBBox: this.updateBBox,
      toggle: this.toggle
    },
        props = Object.assign({}, this.props, segmentProps);
    return React.createElement(CircleSegment, props);
  },
  toggle: function toggle(labels) {
    labels = labels || [];
    if (this.props.onToggle) {
      this.props.onToggle(labels);
    }
  },
  render: function render() {
    var bbox = this.state.bbox;
    var svgProps = {
      className: "circletree",
      style: { overflow: "visible" },
      viewBox: [bbox.x, bbox.y, bbox.w, bbox.h].join(' ')
    };
    return React.createElement(
      'svg',
      svgProps,
      this.formSegments()
    );
  }
});

module.exports = CircleTree;