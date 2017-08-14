import React, { Component } from 'react';
import PieChart from 'react-simple-pie-chart';

class Pie extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="color-chart">
        <PieChart slices={this.props.slices}/>
      </div>
    );
  }
}

export default Pie;