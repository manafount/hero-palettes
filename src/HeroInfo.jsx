import React, { Component } from 'react';
import { Grid, Item, Image, Card} from 'semantic-ui-react';
import autoBind from 'react-autobind';

class HeroInfo extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    let { heroName, imgURL } = this.props.character;
    let heroMeta = '\n'; //necessary to preserve whitespace and prevent height collapse when meta element is blank

    const reg = /\([^)]*\)/g; //regex matcher for substrings inside paretheses
    if(heroName.match(reg)) {
      heroMeta = heroName.match(reg)[0];
      heroName = heroName.replace(reg, '');
    }

    return(
      <Card raised>
        <Image src={imgURL} />
        <Card.Content>
          <Card.Header>
            {heroName}  
          </Card.Header>
          <Card.Meta style={{whiteSpace: 'pre-line'}}>
            {heroMeta}
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