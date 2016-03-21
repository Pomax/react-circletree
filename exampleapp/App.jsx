var React = require('react');
var ReactDOM = require('react-dom');
var CircleTree = require('../circletree');
var data = require('./cats');
var categories = require('./categories');

var App = React.createClass({

  getInitialState() {
    return {
      data: data,
      radius: 80,
      spacing: 3,
      leafRadius: 7,
      leafSpacing: 2,
      filter: {}
    };
  },

  changeRadius(evt)      { this.setState({ radius: parseInt(evt.target.value) });      },
  changeSpacing(evt)     { this.setState({ spacing: parseInt(evt.target.value) });     },
  changeLeafRadius(evt)  { this.setState({ leafRadius: parseInt(evt.target.value) });  },
  changeLeafSpacing(evt) { this.setState({ leafSpacing: parseInt(evt.target.value) }); },

  categoryCheckboxUpdated(checkbox, checked) {
    var filter = this.state.filter;
    filter[checkbox] = !checked;
    this.setState({ filter });
  },

  generateCheckboxes() {
    return Object.keys(categories).map(cat => {
      var category = categories[cat];
      var checked = this.state.filter[category] || false;
      return (
        <fieldset key={cat}>
          <input onChange={() => {
            this.categoryCheckboxUpdated(category, checked);
          }} checked={checked} className="checkbox-input" type="checkbox" id={category + "-checkbox"}/>
          <label htmlFor={category + "-checkbox"}>
            { category }
          </label>
        </fieldset>
      );
    });
  },

  onToggle(labels) { console.log(labels); },

  render() {
    return (
      <div>
        <CircleTree {...this.state} onToggle={this.onToggle} />

        <div style={{float:'right'}}>
          <form>
            <h2>Change some settings:</h2>
            <fieldset>
              <label>radius:</label>
              <input type="range" min="0" max="200" step="1" value={this.state.radius} onChange={this.changeRadius}/>
            </fieldset>

            <fieldset>
              <label>spacing:</label>
              <input type="range" min="0" max="50" step="1" value={this.state.spacing} onChange={this.changeSpacing}/>
            </fieldset>

            <fieldset>
              <label>leafRadius:</label>
              <input type="range" min="0" max="20" step="1" value={this.state.leafRadius} onChange={this.changeLeafRadius}/>
            </fieldset>

            <fieldset>
              <label>leafSpacing:</label>
              <input type="range" min="0" max="20" step="1" value={this.state.leafSpacing} onChange={this.changeLeafSpacing}/>
            </fieldset>

            <h2>Change some filters:</h2>
            {this.generateCheckboxes()}
          </form>
        </div>
      </div>
    );
  }

});

module.exports = App;

ReactDOM.render(<App/>, document.getElementById('app'));
