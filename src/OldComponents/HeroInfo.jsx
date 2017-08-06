import React, { Component } from 'react';
import { Image, Card} from 'semantic-ui-react';
import autoBind from 'react-autobind';

class HeroInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
    autoBind(this);
  }

  toggleHover() {
    this.setState({hover: !this.state.hover});
  }

  render() {
    let { heroName, imgURL } = this.props.character;
    let heroMeta = '\n'; //necessary to preserve whitespace and prevent height collapse when meta element is blank

    const reg = /\([^)]*\)/; //regex matcher for substrings inside paretheses
    if(heroName.match(reg)) {
      heroMeta = heroName.match(reg)[0];
      heroName = heroName.replace(reg, '');
    }

    return(
      <Card raised={this.state.hover}
            onMouseEnter={this.toggleHover}
            onMouseLeave={this.toggleHover}>
        <Image src={imgURL} />
        <Card.Content>
          <Card.Header>
            {heroName}  
          </Card.Header>
          <Card.Meta style={{whiteSpace: 'pre-line'}}>
            {heroMeta}
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}

export default HeroInfo;