import React, { Component } from 'react';
import { Input, Icon, Menu, Grid, Dropdown } from 'semantic-ui-react';
import autoBind from 'react-autobind';

class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    autoBind(this);
  }

  handleGenerate(e) {
    e.preventDefault();
    this.props.pickRandomPalette();
  }

  render() {
    return(
      <Grid.Row>
        <Menu fluid stackable size='huge' attached='top' borderless>
          <Menu.Item header>HeroPalettes</Menu.Item>
          <Menu.Item>
            <Input className='icon' icon='search' placeholder='Search Marvel characters...'/>
          </Menu.Item>
          <Menu.Item name='generate' onClick={this.handleGenerate}>
            Random
          </Menu.Item>
          <Dropdown item text='More'>
            <Dropdown.Menu>
              <Dropdown.Item>Export</Dropdown.Item>
              <Dropdown.Item>Share</Dropdown.Item>
              <Dropdown.Item>Hero Info</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item header position='right'><Icon name='github'/></Menu.Item>
          <Menu.Item header><Icon name='linkedin'/></Menu.Item>
        </Menu>
      </Grid.Row>
    );
  }
}

export default MainMenu;