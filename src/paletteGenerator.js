let Vibrant = require('node-vibrant');
let fs = require('fs');
let jsonfile = require('jsonfile');
let Promise = require('bluebird');

let basePath = './images/';
let output = './data/palettes.json';

fs.readdir(basePath, (err, files) => {
  let palettes = [];
  console.log(`Generating ${files.length} palettes...`);
  Promise.all(files.map((file) => {
    return Vibrant.from(basePath + files[0]).getPalette()
      .then((palette) => {
        palettes.push({id: files[0].slice(0, -3), palette });
      });
  }))
  .then(() => {
    let obj = {
      timestamp: Date.now(),
      data: palettes
    };
    jsonfile.writeFile(output, obj);
    console.log('Complete!');
  });
});