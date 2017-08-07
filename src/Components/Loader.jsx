import React, { Component } from 'react';

class Loader extends Component {
  render() {
    return (
      <div className="loader">
        <div className="gradient-spinner"></div>
      </div>
    );
  }
}

export default Loader;