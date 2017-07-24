let Vibrant = require('node-vibrant');
let jsonfile = require('jsonfile');
let Promise = require('bluebird');
let MarvelApi = require('marvel-api');
let fs = require('fs');

let imageDownloader = require('./imageDownloader');

class PaletteGenerator {

  constructor(output) {
    this.output = output;
    this.palettes = {};
  }

  generateFromDirectory(basePath) {
    return fs.readdir(basePath)
    .then((filenames) => {
      return Promise.map(filenames, (filename) => {
        return this.generateFromFile(basePath, filename);
      });
    });
  }


  generateFromFile(basePath, filename) {
    return Vibrant.from(basePath + filename).getPalette()
    .then(data => {
      return {
        id: filename.slice(0, -4),
        palette: data
      };
    });
  }

  // quick and dirty fix to merge palette info from images to Marvel API character data
  // this function should be run after generateFromDirectory
  mergeCharacterAndPaletteData(charData) {
    // charData should be an array of objects
    console.log('Merging Character Data with Palette Data...');
    console.log(this.palettes);
    for(let i=0; i<charData.length; i++) {
      let id = charData[i].id;
      console.log(id);
      console.log(charData[i].name);
      this.palettes[id].name = charData.name;
      // potentially useful for finding and fixing broken image links later on
      this.palettes[id].url = charData.url;
    }
  }

  writeToFile(json) {
    console.log('Writing data to json file...');
    if (json === 'undefined') {
      json = this.palettes;
    }

    let obj = {
      timestamp: Date.now(),
      data: json
    };
    jsonfile.writeFile(this.output, obj);
  }
}

module.exports = PaletteGenerator;

let path = './images/';
let out = './data/palettes.json';
let pg = new PaletteGenerator(out);
let imgDown = new imageDownloader();
let start = Date.now();

pg.generateFromDirectory(path)
  .then(() => {
    return imgDown.getAllCharacters();
  })
  .then((data) => {
    pg.mergeCharacterAndPaletteData(data);
    pg.writeToFile();
    console.log(`Completed all operations in ${Date.now() - start} ms!`);
  })
  .catch(e => {
    throw e;
  });