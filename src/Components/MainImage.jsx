import React, { Component } from 'react';

import Loader from './Loader';

class MainImage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <img id="bg-main" src={this.props.src} onLoad={this.props.animateAppear}/>
    );
  }
}

export default MainImage;