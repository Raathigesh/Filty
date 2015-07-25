var React = require('react');
var Filter = require('./Filter');
var FilterInProgress = require('./FilterInProgress');

var SearchBox = React.createClass({
  getInitialState: function(){
      return {
        "filters": new Array()
      };
  },
  addFilter: function(filter){
      this.state.filters.push(filter);
      this.setState(this.state)
  },
  removeFilter: function(filterName){
      for(var i = 0; i < this.state.filters.length; i++){
        if(this.state.filters[i].filter === filterName){
          this.state.filters.splice(i, 1);
        }
      }

      this.setState(this.state);
  },
  render: function () {
      var filters;

      filters = this.state.filters.map(function(a){
        return <Filter filter={a.filter} value={a.value}  remove={this.removeFilter}/>
      }, this)

      return <div className="searchBoxDiv">
               {filters}
               <FilterInProgress add={this.addFilter} />
            </div>;
    }
});

module.exports =  SearchBox;
