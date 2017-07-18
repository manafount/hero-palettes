var fs = require('fs');
var request = require('request');
var Promise = require('bluebird');

let urlList = [
  { id: 1011163, url: 'http://i.annihil.us/u/prod/marvel/i/mg/5/90/4c002f38d0e05'},
  { id: 1010716, url: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available'}
];

fs.mkdir('test/');

let download = (url, target) => {
  return new Promise(function (resolve, reject) {
    request(url).pipe(fs.createWriteStream(target))
      .on('finish', resolve)
      .on('error', reject);
  });
};

let downloadAll = (urlArray) => {
  let ext = '/standard_fantastic.jpg';
  return Promise.all(urlArray.map((item) => {
      return download(item.url.concat(ext), `test/${item.id}.jpg`);
  }));
};

downloadAll(urlList)
  .then(() => console.log('finished'));