import React, { Component } from 'react';
import PieChart from 'react-simple-pie-chart';

class Pie extends Component {

  render() {
    return (
      <div className="color-chart">
        <PieChart slices={this.props.slices}/>
      </div>
    );
  }
}

export default Pie;