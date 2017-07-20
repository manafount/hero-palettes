import React, { Component } from 'react';
import { Grid, Icon } from 'semantic-ui-react';
import autoBind from 'react-autobind';

class ColorColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    autoBind(this);
  }

  handleItemClick(e, { name }) {
    e.preventDefault();
  }

  render() {
    let rgb = this.props.rgb.join(', ');
    console.log(this.props);
    return(
      <Grid.Column width={2}>
        {this.props.color}
        <div style={{backgroundColor: `rgb(${rgb})`, width: 'auto', height: 'auto'}}>
          Color!
        </div>
      </Grid.Column>
    );
  }
}

export default ColorColumn;