import React, { Component } from 'react';
import autoBind from 'react-autobind';

class Menu extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  render() {
    return (
      <figure className="banner-menu">
        <a href="#home"><h2>Hero Palettes</h2></a>
        <div>
          
          <a href="#more" className="dropdown">More</a>
        </div>
      </figure>
    );
  }
}

export default Menu;