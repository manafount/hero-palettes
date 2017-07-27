import React, { Component } from 'react';
import { Grid, Item, Image, Card} from 'semantic-ui-react';
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
      <Card>
        <Image src={this.props.character.imgURL} />
        <Card.Content>
          <Card.Header>
            {this.props.character.heroName}
          </Card.Header>
          <Card.Meta>
            Hero
          </Card.Meta>
          <Card.Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in erat rhoncus, pretium nunc ac, egestas ante. Ut fermentum orci ut pretium lacinia.
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

export default HeroInfo;