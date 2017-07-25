let Vibrant = require('node-vibrant');
let jsonfile = require('jsonfile');
let Promise = require('bluebird');
let MarvelApi = require('marvel-api');
var fs = Promise.promisifyAll(require("fs"));

let imageDownloader = require('./imageDownloader');

class PaletteGenerator {

  constructor(output, palettes = {}) {
    this.output = output;
    this.palettes = palettes;
  }

  generateFromDirectory(basePath) {
    return fs.readdirAsync(basePath)
    .then((filenames) => {
      console.log('Generating ' + filenames.length + ' Vibrant palettes...');
      return Promise.map(filenames, (filename) => {
        return this.generateFromFile(basePath, filename);
      });
    })
    .then((data) => {
      let result = {};
      data.forEach(obj => {
        result[obj.id] = obj;
      });
      return result;
    });
  }


  generateFromFile(basePath, filename) {
    return Vibrant.from(basePath + filename).getPalette()
    .then(data => {
      let id = parseInt(filename.slice(0, -4));
      return {
        id,
        palette: data
      };
    });
  }

  // quick and dirty fix to merge palette info from images to Marvel API character data
  // this function should be run after generateFromDirectory
  mergeCharacterAndPaletteData(charData, paletteData) {
    console.log('Merging Character Data with Palette Data...');
    let mergedData = Object.assign({}, paletteData);

    charData.forEach((char) => {
      let id = char.id;
      if (mergedData[id]) {
        mergedData[id].name = char.name;
        mergedData[id].url = char.url; // potentially useful for finding and fixing broken image links later on
      }else{
        mergedData[id] = {
          id,
          name: char.name,
          url: char.url
        };
      }
    });
    return mergedData;
  }

  writeToFile(json) {
    console.log('Writing data to json file...');
    if (!json) {
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

// REMOVE THIS
// Generate palettes and character data and save them as json locally
let path = './images/';
let out = './data/palettes.json';
let pg = new PaletteGenerator(out);
let imgDown = new imageDownloader();
let start = Date.now();

Promise.all([imgDown.getAllCharacters(), pg.generateFromDirectory(path)])
.then((data) => {
  let charData = data[0];
  let palData = data[1];
  return pg.mergeCharacterAndPaletteData(charData, palData);
})
.then((data) => {
  pg.writeToFile(data);
  console.log('Completed all operations in ' + (Date.now() - start) + ' ms.');
})
.catch((e) => {
  console.log(e);
});