import React, { Component } from 'react';
import autoBind from 'react-autobind';
import Defiant from 'defiant';
import now from 'performance-now';

import Header from './Header';
import PaletteWrapper from './PaletteWrapper';

import palettes from '../data/palettes.json';

class App extends Component {
  constructor() {
    super();
    this.data = palettes.data;

    this.state = {
      character: {
        heroID: null,
        heroName: '',
        palette: null,
        imgURL: null,
      },
      snapshot: null
    };

    autoBind(this);
  }

  componentWillMount() {
    this.getSnapshot()
    .then(snap => {
      this.setState({snapshot: snap});
      console.log('Snapshot loaded');
    });
  }

  componentDidMount() {
    this.pickRandomPalette();
  }

  getSnapshot() {
    return new Promise((resolve) => {
      let snapshot = Defiant.getSnapshot(this.data);
      resolve(snapshot);
    });
  }

  snapshotSearch(val) {
    let start = now();
    let results = JSON.search(this.state.snapshot, `//*[contains(name, "${val}")]`);
    console.log('Finished search in ' + (now() - start) + ' ms.');
    return results;
  }

  pickPalette(id) {
    const ph = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/';
    if(this.data[id]) {
      let selection = this.data[id];
      this.setState({
        character: {
          heroID: selection.id,
          heroName: selection.name,
          palette: selection.palette,
          imgURL: (selection.url ? selection.url : ph) + '/portrait_uncanny.jpg' // 250x250px square. other options at https://developer.marvel.com/documentation/images
        }
      });
    }
  }

  pickRandomPalette() {
    const keys = Object.keys(this.data);
    let randomPalette = {};
    // some characters do not have image data added yet, only randomly choose complete character palettes
    while (!randomPalette.palette) {
      randomPalette = this.data[keys[Math.floor(Math.random() * keys.length)]];
    }
    this.setState({
      character: {
        heroID: randomPalette.id,
        heroName: randomPalette.name,
        palette: randomPalette.palette,
        imgURL: randomPalette.url + '/portrait_uncanny.jpg' // 250x250px square. other options at https://developer.marvel.com/documentation/images
      }
    });
  }

  render() {
    let { palette } = this.state.character;
    let cols;

    return (
      <div>
        <Header randomPalette={this.pickRandomPalette}/>
        <PaletteWrapper palette={this.state.character.palette} imgURL={this.state.character.imgURL}/>
      </div>
    );
  }
}

export default App;
