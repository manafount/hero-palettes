const api = require('marvel-api');
const async = require('async');
const progress = require('progress');


let marvel = api.createClient({
  publicKey: process.env.MARVEL_PUBLIC,
  privateKey: process.env.MARVEL_PRIVATE
});

let getUrlBatch = (offset) => {
  marvel.characters.findAll(100, offset)
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
  })
  .fail(console.error)
  .done();
};

let getAllCharacterImageUrls = {};

async.waterfall([
  getAllCharacterImageUrls
], function (err, result) {
    if (err) {
      console.log(err);
    }else{
      console.log(result);
    }
});

