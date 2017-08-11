import React, { Component } from 'react';
import autoBind from 'react-autobind';
import Defiant from 'defiant';
import Vibrant from 'node-vibrant';

import Header from './Header';
import PaletteWrapper from './PaletteWrapper';

import palettes from '../data/palettes.json';
import wiki from '../data/wikidata.json';


class App extends Component {
  constructor() {
    super();
    // this.data = palettes.data;
    console.log(wiki);
    this.data = wiki.data;

    this.state = {
      character: {
        heroID: null,
        heroName: '',
        palette: null,
        imgURL: null,
      },
      prev: {
        heroID: null,
        heroName: '',
        palette: null,
        imgURL: null,
      },
      next: {
        heroID: null,
        heroName: '',
        palette: null,
        imgURL: null,
      },
      snapshot: null,
      loadingHeader: true,
      loadingPalette: true
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
    this.animateAppear();
  }

  getSnapshot() {
    return new Promise((resolve) => {
      let snapshot = Defiant.getSnapshot(this.data);
      resolve(snapshot);
    });
  }

  animateHide() {
    console.log('called hide');
    this.setState({loadingHeader:true});
    setTimeout(() => {
      this.setState({loadingPalette: true});
    }, 300);
  }

  animateAppear() {
    console.log(this.state);
    this.setState({loadingPalette: false});
    setTimeout(() => {
      this.setState({loadingHeader: false});
    }, 300);
  }

  snapshotSearch(val) {
    let results = JSON.search(this.state.snapshot, `//*[contains(name, "${val}")]`);
    return results;
  }

  getPaletteData(id) {
    const ph = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/';
    if(this.data[id]) {
      let selection = this.data[id];
      let imgURL = selection.img ? selection.img : ph;
      return {
        heroID: selection.id,
        heroName: selection.name,
        palette: selection.palette,
        url: selection.url,
        imgURL: selection.img
      };
    }
  }

  next() {
    let current = this.state.character.heroID;
    let character = this.getPaletteData(current+1);
    let next = this.getPaletteData(current+2);
    let prev = this.state.character;
    this.setState({
      character: character,
      next: next,
      prev: prev
    });
  }

  prev() {
    let current = this.state.character.heroID;
    let character = this.getPaletteData(current-1);
    let next = this.state.character;
    let prev = this.getPaletteData(current-2);
    this.setState({
      character: character,
      next: next,
      prev: prev
    });
  }

  pickPalette(id) {
    let character = this.getPaletteData(id);
    let next = this.getPaletteData(id+1);
    let prev = this.getPaletteData(id-1);
    this.animateHide();
    this.setState({
      character: character,
      next: next,
      prev: prev
    });
  }

  pickRandomPalette() {
    const keys = Object.keys(this.data);
    let randomPalette = {};
    // some characters do not have image data added yet, only randomly choose complete character palettes
    while (!randomPalette.palette) {
      randomPalette = this.data[keys[Math.floor(Math.random() * keys.length)]];
    }
    this.pickPalette(randomPalette.id);
  }

  render() {
    return (
      <div>
        <Header randomPalette={this.pickRandomPalette} 
                loading={this.state.loadingHeader}
                next={this.state.next}
                prev={this.state.prev}/>
        <PaletteWrapper character={this.state.character}
                        loading={this.state.loadingPalette}
                        animateAppear={this.animateAppear}/>
      </div>
    );
  }
}

export default App;
