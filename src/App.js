import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import './App.css';
import autoBind from 'react-autobind';

import MainMenu from './Menu';
import ColorColumn from './ColorColumn';
import palettes from './data/palettes.json';

class App extends Component {
  constructor() {
    super();
    //randomize initial palette
    this.data = palettes.data;
    this.initialPalette = this.data[Math.floor(Math.random() * this.data.length)];

    this.state = {
      heroID: this.initialPalette.id,
      palette: this.initialPalette.palette
    };
    console.log(this.state.palette);
    autoBind(this);
  }

  render() {
    const cols = Object.keys(this.state.palette).map(color => {
        return <ColorColumn color={color} rgb={this.state.palette[color]._rgb}/>;
      }
    );
    return (
      <Grid>
        <MainMenu/>
        <Grid.Row stretched centered>
            {cols}
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
