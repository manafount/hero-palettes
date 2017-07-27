import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import './App.css';
import autoBind from 'react-autobind';

import MainMenu from './Menu';
import ColorColumn from './ColorColumn';
import HeroInfo from './HeroInfo';
import CardColumn from './CardColumn';
import palettes from './data/palettes.json';

class App extends Component {
  constructor() {
    super();
    this.data = palettes.data;

    this.state = {
      heroID: null,
      heroName: '',
      palette: null,
      imgURL: null
    };

    autoBind(this);
  }

  componentDidMount() {
    this.pickRandomPalette();
  }

  pickRandomPalette() {
    console.log('pickRandomPalette called');
    const keys = Object.keys(this.data);
    let randomPalette = {};
    // some characters do not have image data added yet, only randomly choose complete character palettes
    while (!randomPalette.palette) {
      randomPalette = this.data[keys[Math.floor(Math.random() * keys.length)]];
    }
    this.setState({
      heroID: randomPalette.id,
      heroName: randomPalette.name,
      palette: randomPalette.palette,
      imgURL: randomPalette.url + '/standard_fantastic.jpg' // 250x250px square. other options at https://developer.marvel.com/documentation/images
    });
  }

  render() {
    let cols;
    if(this.state.palette) {
      cols = Object.keys(this.state.palette).map(color => {
        return <CardColumn key={`cc${color}`} 
                            color={color} 
                            rgb={this.state.palette[color] ? this.state.palette[color]._rgb 
                            : [255, 255, 255]}/>;
      });
    }

    return (
      <Grid>
        <MainMenu pickRandomPalette={this.pickRandomPalette}/>
        <Grid.Row centered>
          <HeroInfo character={this.state}/>
        </Grid.Row>
        <Grid.Row>
          <Grid container columns={6} textAlign='center'>
            <Grid.Row>
              {cols ? cols : ''}
            </Grid.Row>
          </Grid>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
