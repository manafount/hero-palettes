import React, { Component } from 'react';

class MainImage extends Component {
  constructor(props) {
    super(props);
  }

  preloader() {
    return <div className="loader">Loading..</div>;
  }

  render() {
    return(
      <img id="bg-main" src={this.props.src}/>
    );
  }
}

export default MainImage;