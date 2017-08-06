import React, { Component } from 'react';
import autoBind from 'react-autobind';

class Search extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  render() {
    return (
      <div className="input-wrapper">
        <label id="search-placeholder" style={{display: 'none'}}>Shows, Movies, People...</label>
        <input id="q" name="q" type="text" autocomplete="off" className="ui-autocomplete-input"/>
        <span id="search-icon"></span>
      </div>
    );
  }
}

export default Search;

