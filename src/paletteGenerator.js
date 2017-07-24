let Vibrant = require('node-vibrant');
let jsonfile = require('jsonfile');
let Promise = require('bluebird');
let MarvelApi = require('marvel-api');
let readdirAsync = Promise.promisify(require("fs").readdir);

let imageDownloader = require('./imageDownloader');

class PaletteGenerator {

  constructor(output) {
    this.output = output;
    this.palettes = {};
  }

  generateFromDirectory(basePath) {
    return readdirAsync(basePath)
    .then((files) => {
      // files.length should equal 1485
      console.log(`Generating ${files.length} palettes...`);

      // Promise.mapSeries(files)
      let promiseQueue = [];
      for(let i=0; i<25; i++) {
        promiseQueue.push(new Promise(Vibrant.from(basePath + files[i])
        .getPalette()));
        // .then((palette) => {
        //   // remove '.jpg' to obtain character id
        //   let id = files[i].slice(0, -4);
        //   this.palettes[id] = {id, palette };
        // }));
      }

      return Promise.each(promiseQueue, (palette, i) => {
        // remove '.jpg' to obtain character id
        let id = files[i].slice(0, -4);
        this.palettes[id] = {id, palette};
        console.log('Constructed palette for ' + id + ' ' + palette.Vibrant);
      });
    });
  }

  genFile(pathToFile) {
    return function(value) {
      return new Promise(function(resolve, reject) {
          setTimeout(function() {
              console.log('time', time);
              resolve(time);
          }, time);
      });
    };
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

// module.exports = PaletteGenerator;

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