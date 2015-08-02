var React = require('react');
var SearchResultItem = require('./SearchResultItem');

var SearchResult = React.createClass({
  propTypes: {
    results: React.PropTypes.array
  },
  getInitialState: function(){
     return {
       currentActiveItemIndex: -1,
       activeitem: null,
       isSearchPanelOpen: true

     };
  },
  up: function(){
    if(this.state.currentActiveItemIndex > 0){
        this.state.currentActiveItemIndex--;
        this.setState(this.state);
    }
  },
  down: function(){
    if(this.state.currentActiveItemIndex < this.props.results.length -1){
        this.state.currentActiveItemIndex++;
        this.setState(this.state);
    }
  },
  getSelected: function(){
      return this.state.activeitem;
  },
  closeResultsPane: function(){
    this.state.isSearchPanelOpen = false;
    this.setState(this.state);
  },
  openResultsPane: function(){
    if(this.props.results.length > 0){
      this.state.isSearchPanelOpen = true;
      this.setState(this.state);
    }
  },
  render: function () {
    var dom = null;

    if(this.state.isSearchPanelOpen){

          var results = this.props.results.map(function(result, i) {
                var isActive = i === this.state.currentActiveItemIndex;
                if(isActive){
                    this.state.activeitem = result;
                }

                return <SearchResultItem text={result} isActive={isActive}/>
          }, this);

          var dom = <div className="searchResults">
                    <div>
                        <ul>
                            {results}
                        </ul>
                    </div>
                  </div>;
      }

      return dom;
    }
});

module.exports =  SearchResult;
