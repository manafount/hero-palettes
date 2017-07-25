import React, { Component } from 'react';
import { Grid, Item } from 'semantic-ui-react';
import autoBind from 'react-autobind';

class HeroInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    autoBind(this);
  }

  render() {
    console.log(this.props);
    return(
      <Grid.Row centered>
        <div>
          {this.props.character.heroName}
        </div>
      </Grid.Row>
    );
  }
}

export default HeroInfo;