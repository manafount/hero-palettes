let api = require('marvel-api');
let vibrant = require('node-vibrant');
var async = require("async");
 
let marvel = api.createClient({
  publicKey: process.env.MARVEL_PUBLIC,
  privateKey: process.env.MARVEL_PRIVATE
});

marvel.characters.findAll(100)
  .then((res) => {
    let chars = [];
    console.log(res.meta.total);
    res.data.forEach(item => {
      chars.push({name: item.name, image: item.thumbnail});
    });
    return chars;
  })
  .then((data) => {
    console.log(data.length);
    let imgExt = 'standard_fantastic';
    let fileExt = '.jpg';
    // vibrant.from(data[0].image.path.concat(imgExt)).getPalette()
    //   .then((palette) => console.log(palette));
  })
  .fail(console.error)
  .done();

