var React = require('react');
var Keyy = require('../util/Keyy');
var KeyCode = require('../util/Keys');

var FilterInProgress = React.createClass({
  propTypes: {
      add: React.PropTypes.func,
      up: React.PropTypes.func,
      down: React.PropTypes.func,
      onChange: React.PropTypes.func,
      getFilterFromSearch: React.PropTypes.func,
      isResultPaneOpen: React.PropTypes.bool
  },
  getInitialState: function() {
        return {
          "filter": null,
          "value": null
        };
    },
    resetProgressField: function() {
        this.state.filter = null;
        this.state.value = null;
        this.setState(this.state);
    },
    addNewFilter: function(filterName, filterValue) {
        this.props.add({
          "filter": filterName,
          "value": filterValue
        });
    },
    onFilterChange: function(e) {

      Keyy.Key(e.keyCode)
          .When(KeyCode.Enter, function(){
              if(e.target.value.lastIndexOf('#', 0) === 0) {
                  if(this.props.isResultPaneOpen){
                      this.state.filter = this.props.getFilterFromSearch();
                      this.setState(this.state);
                  }
                  else {
                      this.state.filter = e.target.value;
                      this.setState(this.state);
                  }
              }
               this.props.closeSearchResults();
          }.bind(this))
          .When(KeyCode.UpArrow, this.props.up)
          .When(KeyCode.DownArrow, this.props.down)
          .When(KeyCode.Backspace, this.props.removeLastFiter)
          .When(KeyCode.Escape, this.props.closeSearchResults)
          .WhenNotAnyOf(KeyCode.UpArrow, KeyCode.DownArrow, KeyCode.RightArrow, KeyCode.LeftArrow, KeyCode.Enter, KeyCode.Escape, function(){
              this.props.onChange({
                "filter": e.target.value,
                "value": null
              });
          }.bind(this));
    },
    onValueChange: function(e) {
      Keyy.Key(e.keyCode)
          .When(KeyCode.Enter, function() {
                if(this.props.isResultPaneOpen) {
                    this.addNewFilter(this.state.filter, this.props.getFilterFromSearch());
                    this.props.closeSearchResults();
                }
                else {
                    this.addNewFilter(this.state.filter, e.target.value);
                }

                this.resetProgressField();
          }.bind(this))
          .When(KeyCode.Backspace, function() {
              if( e.target.value === '') {
                  this.resetProgressField();
              }
          }.bind(this))
          .When(KeyCode.UpArrow, this.props.up)
          .When(KeyCode.DownArrow, this.props.down)
          .WhenNotAnyOf(KeyCode.UpArrow, KeyCode.DownArrow, KeyCode.RightArrow, KeyCode.LeftArrow, function() {
            this.props.onChange({
              "filter":this.state.filter,
              "value": e.target.value
            });
          }.bind(this));
    },
    componentDidMount: function() {
        React.findDOMNode(this.refs.valueBox).focus();
    },
    componentDidUpdate: function() {
        React.findDOMNode(this.refs.valueBox).focus();
    },
    render: function () {
      var filter,
          value = null;

      if(this.state.filter === null){
        // Render a text box if user is entring a filter
        filter = <input className={this.props.inputBoxClass} ref="valueBox" type="text" onKeyDown={this.onFilterChange} />;
      }
      else if(this.state.value === null){
        // If user is entering a value for the filter, show the filter and show a text box
        filter = <div className="filter filter_name">{this.state.filter}</div>;
        value = <input className="inProgress_input_value" ref="valueBox" type="text" onKeyDown={this.onValueChange}/>;
      }

      return (<div>
                {filter}
                {value}
              </div>);
    }
});

module.exports =  FilterInProgress;
