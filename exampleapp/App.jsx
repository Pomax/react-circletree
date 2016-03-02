var React = require('react');
var ReactDOM = require('react-dom');
var CircleTree = require('../circletree');
var data = require('./cats');
var color = require('./colors');

var App = React.createClass({

  getInitialState() {
    return {
      data: data,
      color: color,
      radius: 80,
      spacing: 3,
      strokeWidth: 1,
      leafRadius: 7,
      leafSpacing: 2
    };
  },

  changeRadius(evt) { this.setState({ radius: parseInt(evt.target.value) }); },
  changeSpacing(evt) { this.setState({ spacing: parseInt(evt.target.value) }); },
  changeStrokeWidth(evt) { this.setState({ strokeWidth: parseInt(evt.target.value) }); },
  changeLeafRadius(evt) { this.setState({ leafRadius: parseInt(evt.target.value) }); },
  changeLeafSpacing(evt) { this.setState({ leafSpacing: parseInt(evt.target.value) }); },

  render: function() {
    return (
      <div>
        <CircleTree {...this.state} />

        <form style={{float:'right'}}>
          <fieldset><label>radius:</label><input type="range" min="0" max="200" step="1" value={this.state.radius} onChange={this.changeRadius}/></fieldset>
          <fieldset><label>spacing:</label><input type="range" min="0" max="50" step="1" value={this.state.spacing} onChange={this.changeSpacing}/></fieldset>
          <fieldset><label>strokeWidth:</label><input type="range" min="0" max="20" step="1" value={this.state.strokeWidth} onChange={this.changeStrokeWidth}/></fieldset>
          <fieldset><label>leafRadius:</label><input type="range" min="0" max="20" step="1" value={this.state.leafRadius} onChange={this.changeLeafRadius}/></fieldset>
          <fieldset><label>leafSpacing:</label><input type="range" min="0" max="20" step="1" value={this.state.leafSpacing} onChange={this.changeLeafSpacing}/></fieldset>
        </form>
      </div>
    );
  }

});

module.exports = App;

ReactDOM.render(<App/>, document.getElementById('app'));