var React = require('react');
var computer = require('./segment-computer.jsx');
var differ = require('./differ');
var assign = require('react/lib/Object.assign');
var dispatcher = require('./dispatcher');
var classnames = require('classnames');

var defaultProps = {
  label: '',
  // inner and outer radius, and segment padding
  r1: 0,
  r2: 1,
  spacing: 1,
  // start and end angle
  start: -computer.kappa,
  end: -computer.kappa + computer.tau,
  // total number of segments, and id of this segment
  depth: 0,
  id: 0,
  total: 1,
  // leaf settings
  leafRadius: 7,
  leafSpacing: 2,
  // optional key:value object for filtering which leaves to _not_ render
  filter: {}
};

var CircleSegment = React.createClass({
  getDefaultProps() {
    return defaultProps;
  },

  getInitialState() {
    var tvalues = computer.getSegmentInformation(this.props);
    tvalues.highlight = false;
    if (this.props.depth === 0) {
      tvalues.status = "active primary";
    }
    return tvalues;
  },

  componentWillUpdate(nextProps, nextState) {
    if(differ(nextProps, this.props)) {
      this.setState(computer.getSegmentInformation(nextProps));
    }
  },

  componentWillMount() {
    this.highlightFunctions = {
      highlight: this.highlight,
      restore: this.restore,
      toggle: this.toggle,
      activate: this.activate
    };
  },

  componentWillUnmount() {
    dispatcher.off('react-circletree:click', this.onActivate);
  },

  componentDidMount() {
    this.props.updateBBox(this.state.bbox);
    dispatcher.on('react-circletree:click', this.onActivate);
  },

  updateBBox(bbox) {
    var sbox = this.state.bbox.expand(bbox);
    this.setState({ bbox: sbox }, () => {
      this.props.updateBBox(sbox);
    });
  },

  highlight() {
    this.setState({ highlight: true });
    if (this.props.highlight) { this.props.highlight(); }
  },

  restore() {
    this.setState({ highlight: false });
    if (this.props.restore) { this.props.restore(); }
  },

  toggle(labels) {
    labels = labels || [];
    if (this.props.toggle) {
      this.props.toggle([this.props.label].concat(labels));
    }
  },

  onActivate(e) {
    this.setState({
      status: false
    }, () => {
      if (e.detail.origin === this) {
        this.activate("active primary");
      }
    });
  },

  activate(status) {
    this.setState({ status });
    if (this.props.activate) {
      this.props.activate("active");
    }
  },

  render() {
    return (
      <g className={classnames(this.state.status, this.props.leaf ? "leaf" : "")}>
        { this.getPath(this.state) }
        { this.getLabel(this.state) }
        { this.props.leaf? null : this.setupChildren(this.state) }
      </g>
    );
  },

  getPath(tvalues) {
    return computer.getSVGPath(tvalues.points, assign({}, this.props, {
      angleDelta: tvalues.angleDelta,
      highlight: tvalues.highlight
    }),{
      onMouseEnter: this.highlight,
      onMouseLeave: this.restore,
      onClick: () => {
        dispatcher.dispatch('react-circletree:click', {origin: this});
        this.toggle();
      }
    });
  },

  getLabel(tvalues) {
    return computer.getSVGLabel(this.props, tvalues.center);
  },


  setupChildren(tvalues) {
    var data = this.props.data;

    // Leaf nodes are encoded as array
    if(data.map) return this.formLeaves(tvalues);

    // real nodes are encoded as "more CircleSegments"
    var nr1 = this.props.r2 + this.props.spacing,
        nr2 = nr1 + (this.props.r2 - this.props.r1),
        keys = Object.keys(data),
        total = keys.length,
        props = assign({}, this.props, {
          total: total,
          r1: nr1,
          r2: nr2,
          start: tvalues.startAngle,
          end: tvalues.startAngle + tvalues.angleDelta,
          depth: this.props.depth + 1,
          updateBBox: this.updateBBox,
          fontSize: 14
        });

    // generate the set of child segments
    return keys.map( (label, position) => {
      var childProps = assign({}, props, this.highlightFunctions, {
        label: label,
        id: position,
        data: data[label]
      });
      return <CircleSegment {...childProps} key={label}/>;
    });
  },

  formLeaves(tvalues) {
    var baseProps = {
      leaf: true,
      start: tvalues.startAngle,
      updateBBox: this.updateBBox
    };

    return this.props.data.filter(type => !this.props.filter[type] ).map( (type, pos) => {
      var radius = this.props.r2,
          leafRadius = this.props.leafRadius,
          leafSpacing = this.props.leafSpacing,
          spacing = this.props.spacing,
          r1 = radius + spacing + pos * (leafSpacing + leafRadius),
          r2 = r1 + leafRadius,

          leafProps = assign({}, baseProps, this.highlightFunctions, {
            r1: r1,
            r2: r2,
            end: tvalues.startAngle + tvalues.angleDelta - tvalues.angleOffset,
            label: type
          });

      return <CircleSegment {...leafProps} key={type}/>;
    });
  }
});

module.exports = CircleSegment;
