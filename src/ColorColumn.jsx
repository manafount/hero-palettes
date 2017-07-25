import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
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
    const rgb = this.props.rgb.map(i => Math.round(i));
    const styles = {backgroundColor: 'rgb(' + rgb.join(', ') + ')',
                     textAlign: 'center',
                     paddingLeft: '0px',
                     paddingRight: '0px'
                   };
    console.log(styles);
    return(
      <Grid.Column>
        {this.props.color}
        <div style={styles}>
          rgb({rgb.join(', ')})
        </div>
      </Grid.Column>
    );
  }
}

export default ColorColumn;