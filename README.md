<img src="https://raw.githubusercontent.com/Raathigesh/Filty/master/wiki/Filty%20Logo.fw.png" width="200">

Search Bar UI With Filters for React JS

# Demo
Demo of the developement build. It's rough man. Very Rough! : http://raathigesh.com/filty

# General Usage
Filty is a UI component developed in React JS. Filty could be used to provide search functionlities with filters. Filters are in the format of "FilterName | FilterValue". Users can add filters by using '#'.

## Features
- Ability to add multiple filters
- Autocomplete dropdown

# Documentation 
##Properties
###results
Results that should be shown in the auto complete dropdown list. Please note that filty will not handle filtering of the results set. Filty just acts as a UI with rich capabilities so filtering should be impemented by using the APIs exposed by filty.

## Events
###onChange
Will fier when ever something changes in the search box.

###onFinalResultSelected
Will fire when user selects the search result from the suggestions after adding all the filters.

###onNewFilterChange
Will fire as soon as user starts to add a new filter. Usually as soon as user adds a '#'.

###onNewFilterValueChange
Will fire as soon as user starts typing a value to a filter.

###onNewFilterAdded
Will fire as soon a new filter is added to search box.

