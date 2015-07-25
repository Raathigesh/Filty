var React = require('react');

var FilterInProgress = React.createClass({
    getInitialState: function(){
        return {
          "isFilter" : true,
          "isValue": false,
          "filter": null,
          "value": null
        };
    },
    onFinishContent: function(e){
      if(e.keyCode === 13){
        var x = e.target.value;
        var state = this.state;
        state.filter = x;
        state.isFilter = false;
        state.isValue = true;
        this.setState(state);

      }

    },
    onFinishValue: function(e){
        var x = e.target.value;
      if(e.keyCode === 13){

        var state = this.state;
        state.value = x;
        state.isFilter = true;
        state.isValue = false;

        this.props.add({
          "filter": this.state.filter,
          "value": this.state.value
        });

        this.setState(state);
      }
      else if(e.keyCode === 8){
          if(x === ''){
            var state = this.state;
            state.value = x;
            state.isFilter = true;
            state.isValue = false;
            this.setState(this.state);
          }
      }

    },
    componentDidMount: function(){
      React.findDOMNode(this.refs.valueBox).focus();
    },
    componentDidUpdate: function(){
        React.findDOMNode(this.refs.valueBox).focus();
    },
    render: function () {
      var content;
      var value = null;
      if(this.state.isFilter){
         content = <input className="inProgress_input" ref="valueBox" type="text" onKeyDown={this.onFinishContent} />;
      }
      else if(this.state.isValue){
        content = <div className="filter filter_name">{this.state.filter}</div>;
        value = <input className="inProgress_input_value" ref="valueBox" type="text" onKeyDown={this.onFinishValue}/>;
      }
      else{
        content = <div className="filter filter_name">{this.state.filter}</div>;
        value = <div className="filter filter_name">{this.state.value}</div>;
      }

      return (<div>
                {content}
                {value}
              </div>);
    }
  });

module.exports =  FilterInProgress;
