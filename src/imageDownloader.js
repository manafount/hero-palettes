const MarvelApi = require('marvel-api');
const Async = require('async');
const Promise = require('bluebird');
const Progress = require('progress');
const request = require('request');
const fs = require('fs');

let Marvel = MarvelApi.createClient({
  publicKey: process.env.MARVEL_PUBLIC,
  privateKey: process.env.MARVEL_PRIVATE
});

let getAllCharacters = () => {
  const LIMIT = 100;
  const TOTAL = 1486; //number of characters in marvel API
  let offset = 0;
  let promiseQueue = [];

  console.log('Getting character info from Marvel API...');
  for(let i=0; i<TOTAL; i+=LIMIT) {
    promiseQueue.push(Marvel.characters.findAll(LIMIT, i));
  }

  return Promise.all(promiseQueue)
    .then(values => {
      let characterData = [];
      for(let i=0; i<values.length; i++) {
        characterData = characterData.concat(values[i].data);
      }
      return characterData;
    }
  );
};

let download = (url, target) => {
  return new Promise(function (resolve, reject) {
    request(url).pipe(fs.createWriteStream(target))
      .on('finish', resolve)
      .on('error', reject);
  });
};

let downloadAll = (urlArray) => {
  let basePath = 'images/';
  let ext = '/standard_fantastic.jpg';
  return Promise.all(urlArray.map((item) => {
      return download(item.url + ext, basePath + item.id + '.jpg');
  }));
};

Async.waterfall([
  getAllCharacters,
  downloadAll
], function (err, result) {
    if (err) {
      console.log(err);
    }else{
      console.log(result);
    }
});

