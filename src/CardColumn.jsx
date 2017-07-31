import React, { Component } from 'react';
import { Grid, Card, Icon, Popup } from 'semantic-ui-react';
import autoBind from 'react-autobind';
import clipboard from 'clipboard';
import ntc from 'ntc';

class CardColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupOpen: false,
      hover: false,
      text: null
    };
    autoBind(this);
  }

  handleItemClick(e, { name }) {
    e.preventDefault();
    console.log(name);
  }

  toggleHover() {
    this.setState({hover: !this.state.hover});
  }

  render() {
    const rgb = this.props.rgb.map(i => Math.round(i));
    const hex = rgb.map((val) => {
      return ("0" + parseInt(val,10).toString(16)).slice(-2);
    }).join('');
    // "Name That Color" makes an educated guess about a color's name based on its hex value
    const ntcMatch = ntc.name(hex); // => [ rgb value, color name, exact match?]
    // now we need to figure out whether the text on hover should be white or black based on the
    // background's YIQ value. https://24ways.org/2010/calculating-color-contrast
    const yiq = ((rgb[0]*299)+(rgb[1]*587)+(rgb[2]*114))/1000;
    const colorStyles = { backgroundColor: 'rgb(' + rgb.join(', ') + ')',
                          paddingLeft: '0px',
                          paddingRight: '0px',
                          height: '30vh',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        };
    const textStyles = { fontSize: '16px',
                         color: (yiq >= 128 ? 'black' : 'white'),
                         visibility: (this.state.hover ? 'visible' : 'hidden')
                       };

    return(
      <Grid.Column style={{minWidth: '187px'}}>
        <Card raised={this.state.hover} 
              className={this.props.color}>
          <Card.Content className='clickable'
                        style={colorStyles}
                        onMouseEnter={this.toggleHover}
                        onMouseLeave={this.toggleHover}>
            <span style={textStyles}>Copy</span>
          </Card.Content>
          <Card.Content extra>
            <a>{this.state.text ? this.state.text : ntcMatch[1]}</a>
          </Card.Content>
        </Card>
      </Grid.Column>
    );
  }
}

export default CardColumn;