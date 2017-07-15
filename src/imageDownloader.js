const api = require('marvel-api');
const async = require('async');
const progress = require('progress');


let marvel = api.createClient({
  publicKey: process.env.MARVEL_PUBLIC,
  privateKey: process.env.MARVEL_PRIVATE
});

let example = (callback) => {
  let bar = new progress(':bar', { total: 10 });
  let timer = setInterval(function () {
    bar.tick();
    if (bar.complete) {
      clearInterval(timer);
    }
  }, 100);
  // callback(null, 'complete');
};

async.waterfall([
  example
], function (err, result) {
    if (err) {
      console.log(err);
    }else{
      console.log(result);
    }
});



// marvel.characters.findAll(100)
//   .then((res) => {
//     let chars = [];
//     console.log(res.meta.total);
//     res.data.forEach(item => {
//       chars.push({name: item.name, image: item.thumbnail});
//     });
//     return chars;
//   })
//   .then((data) => {
//     console.log(data.length);
//   })
//   .fail(console.error)
//   .done();