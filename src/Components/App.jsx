import React, { Component } from 'react';
import autoBind from 'react-autobind';
import Defiant from 'defiant';
import Vibrant from 'node-vibrant';

import Header from './Header';
import PaletteWrapper from './PaletteWrapper';

import palettes from '../data/palettes.json';
import wikidata from '../data/wikidata.json';


class App extends Component {
  constructor() {
    super();
    this.sortedIndex = wikidata.sortedIndex;
    this.data = wikidata.data;

    this.state = {
      currentIndex: 0,
      characters: {
        current: this.data[this.sortedIndex[0]],
        prev: this.data[this.sortedIndex[this.sortedIndex.length - 1]],
        next: this.data[this.sortedIndex[1]]
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

  next() {
    if (this.state.currentIndex >= this.sortedIndex.length - 1) {
      this.pickPalette(this.sortedIndex[0]);
    }else{
      this.pickPalette(this.sortedIndex[this.state.currentIndex + 1]);
    }
  }

  prev() {
    if (this.state.currentIndex > 0) {
      this.pickPalette(this.sortedIndex[this.state.currentIndex - 1]);
    }else{
      this.pickPalette(this.sortedIndex[this.sortedIndex.length - 1]);
    }
  }

  pickPalette(id) {
    let index = this.sortedIndex.indexOf(id);
    let nextId = index < (this.sortedIndex.length - 1) ? this.sortedIndex[index + 1] : this.sortedIndex[0];
    let prevId = index > 0 ? this.sortedIndex[index - 1] : this.sortedIndex[this.sortedIndex.length - 1];
    this.animateHide();
    this.setState({
      currentIndex: index,
      characters: {
        current: this.data[id],
        next: this.data[nextId],
        prev: this.data[prevId]
      }
    });
  }

  pickRandomPalette() {
    let indices = this.sortedIndex;
    console.log(this.state);
    let randomId = indices[Math.floor(Math.random() * indices.length)];
    this.pickPalette(randomId);
  }

  render() {
    return (
      <div>
        <Header randomPalette={this.pickRandomPalette} 
                loading={this.state.loadingHeader}
                next={this.state.characters.next}
                prev={this.state.characters.prev}/>
        <PaletteWrapper character={this.state.characters.current}
                        loading={this.state.loadingPalette}
                        animateAppear={this.animateAppear}/>
      </div>
    );
  }
}

export default App;
