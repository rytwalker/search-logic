import React, { Component } from 'react';
import Search from './Search';

class SearchView extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Search here</h1>
        <Search />
      </div>
    );
  }
}

export default SearchView;
