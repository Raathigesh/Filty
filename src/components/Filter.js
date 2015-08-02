var React = require('react');

var Filter = React.createClass({
  remove: function() {
      this.props.remove(this.props.filter);
  },
  render: function () {
      return (<div className="filterContainer">
                <div className="filter filter_name">{this.props.filter}</div>
                <div className="filter filter_value">{this.props.value}</div>
                <div className="filter filter_close" onClick={this.remove}>x</div>
              </div>);
  }
});

module.exports =  Filter;
