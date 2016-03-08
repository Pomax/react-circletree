var React = require('react');
var CircleSegment = require('./CircleSegment.jsx');
var BBox = require('./bbox');

var defaultProps = {
  data: {},
  radius: 80,
  spacing: 3,
  leafRadius: 7,
  leafSpacing: 2
};

var CircleTree = React.createClass({
  getDefaultProps() {
    return defaultProps;
  },

  getInitialState() {
    this.bbox = (new BBox()).grow({x: 0, y: 0});
    return {
      data: this.props.data,
      label: Object.keys(this.props.data)[0],
      bbox: this.bbox
    };
  },

  updateBBox(bbox) {
    this.bbox.expand(bbox);
    if (this.isMounted()) {
      this.setState({ bbox: this.bbox });
    }
  },

  formSegments() {
    var segmentProps = {
          r2: this.props.radius,
          label: this.state.label,
          data: this.props.data[this.state.label],
          updateBBox: this.updateBBox,
          toggle: this.toggle
        },
        props = Object.assign({}, this.props, segmentProps);
    return <CircleSegment {...props}/>;
  },

  toggle(labels) {
    labels = labels || [];
    if (this.props.onToggle) {
      this.props.onToggle(labels);
    }
  },

  render() {
    var bbox = this.state.bbox;
    var svgProps = {
      className: "circletree",
      style: { overflow: "visible" },
      viewBox: [bbox.x, bbox.y, bbox.w, bbox.h].join(' ')
    };
    return <svg {...svgProps}>{ this.formSegments() }</svg>;
  }
});

module.exports = CircleTree;
