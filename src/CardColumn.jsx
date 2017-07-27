import React, { Component } from 'react';
import { Grid, Card, Icon, Popup, Button } from 'semantic-ui-react';
import autoBind from 'react-autobind';

class CardColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupOpen: false
    };
    autoBind(this);
  }

  handleItemClick(e, { name }) {
    e.preventDefault();
  }

  render() {
    const rgb = this.props.rgb.map(i => Math.round(i));
    const hex = rgb.map((val) => {
      return ("0" + parseInt(val,10).toString(16)).slice(-2);
    }).join('');
    const styles = {backgroundColor: 'rgb(' + rgb.join(', ') + ')',
                     textAlign: 'center',
                     paddingLeft: '0px',
                     paddingRight: '0px',
                     height: '30vh'
                   };
    return(
      <Grid.Column>
        <Card raised className={this.props.color}>
          <Card.Content style={styles}>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Popup
                trigger={<Icon name='download' />}
                content='Color added to clipboard!'
                on='click'
              />
            </a>
            {'#' + hex}
          </Card.Content>
        </Card>
      </Grid.Column>
    );
  }
}

export default CardColumn;