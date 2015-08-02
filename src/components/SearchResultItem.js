var React = require('react');

var SearchResultItem = React.createClass({

    render: function () {
      var classes = "searchItem";

      if(this.props.isActive){
         classes += " activeSearchResult";          
      }

      return (<div ref="itemContainer" className={classes}>
               <p>{this.props.text}</p>
            </div> );
    }
});

module.exports =  SearchResultItem;
