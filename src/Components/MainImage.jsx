import React, { Component } from 'react';

class MainImage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <img id="bg-main" src={this.props.src} alt={this.props.heroName} onLoad={this.props.animateAppear}/>
    );
  }
}

export default MainImage;