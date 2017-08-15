import React, { Component } from 'react';
import autoBind from 'react-autobind';

class Menu extends Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  render() {
    return (
      <figure className="banner-menu" style={{color: this.props.textColor}}>
        <a href="#home"><h2>Hero Palettes</h2></a>
        <div>

        </div>
      </figure>
    );
  }
}

export default Menu;
