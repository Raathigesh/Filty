var React = require('react');
var Filter = require('./Filter');
var FilterInProgress = require('./FilterInProgress');
var SearchResult = require('./SearchResult');

var SearchBox = React.createClass({
  propTypes: {
    results: React.PropTypes.array,
    onChange: React.PropTypes.func,
    onFinalResultSelected: React.PropTypes.func,
    onNewFilterChange : React.PropTypes.func,
    onNewFilterValueChange: React.PropTypes.func,
    onNewFilterAdded: React.PropTypes.func
  },
  onFilterChange: function(inProgressFilter){
      // Reopen the search result pane when user starts typing again.
      this.refs.searchResult.openResultsPane();

      // Create the output object and send out.
      var output = {
          "filters" : this.state.filters,
          "inProgressFilter": inProgressFilter.filter,
          "inProgressValue": inProgressFilter.value
      };
      this.props.onChange(output);
  },
  getInitialState: function(){
    return {
      "filters": new Array()
    };
  },
  componentDidMount: function(){
      this.refs.searchResult.closeResultsPane();
  },
  addFilter: function(filter){
    // Add a new filter to the search bar
    this.state.filters.push(filter);
    this.setState(this.state);
  },
  removeFilter: function(filterName){
    // Remove an existing filter from the search bar
    for(var i = 0; i < this.state.filters.length; i++){
      if(this.state.filters[i].filter === filterName){
        this.state.filters.splice(i, 1);
      }
    }
    this.setState(this.state);
  },
  up:function(){
    // Move up in the search result pane
    this.refs.searchResult.up();
  },
  down: function(){
    // Move down in the search result pane
    this.refs.searchResult.down();
  },
  getFilterFromSearch: function(){
    // Get the filer object that is actively selected from the search pane.
    return this.refs.searchResult.getSelected();
  },
  removeLastFiter: function(){
    // Remove the last filter from the search box.
    this.state.filters.splice(this.state.filters.length - 1, 1);
    this.setState(this.state);
  },
  closeSearchResults: function(){
    // Close the search pane.
    this.refs.searchResult.closeResultsPane();
  },
  openSearchResults: function(){
    // Open the search pane.
    this.refs.searchResult.openResultsPane();
  },
  render: function () {
    var filters = this.state.filters.map(function(a){
                    return <Filter filter={a.filter} value={a.value}  remove={this.removeFilter}/>
                  }, this);

    return (<div>
              <div className={this.props.outerContainerClass}>
                {filters}
                <FilterInProgress
                        inputBoxClass = {this.props.inputBoxClass}
                        add={this.addFilter}
                        onChange={this.onFilterChange}
                        up={this.up}
                        down={this.down}
                        isResultPaneOpen={this.props.results.length > 0}
                        getFilterFromSearch = {this.getFilterFromSearch}
                        removeLastFiter = {this.removeLastFiter}
                        closeSearchResults = {this.closeSearchResults} />
              </div>
              <SearchResult ref="searchResult" results={this.props.results}/>
          </div>);
    }
});

module.exports =  SearchBox;
