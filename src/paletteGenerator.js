let Vibrant = require('node-vibrant');
let fs = require('fs');

let dir = './images';
// count number of images in directory (should be 1485)
fs.readdir(dir, (err, files) => {
  console.log(files.length);
});