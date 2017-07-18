const MarvelApi = require('marvel-api');
const Promise = require('bluebird');
const Progress = require('progress');
const request = require('request');
const fs = require('fs');

let Marvel = MarvelApi.createClient({
  // replace these values with your marvel API public and private keys
  // keys can be generated with your developer account at https://developer.marvel.com/account
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
      return characterData.map(c => { return { id: c.id, url: c.thumbnail.path }; });
    }
  );
};

let download = (url, target) => {
  return new Promise(function (resolve, reject) {
    request(url).pipe(fs.createWriteStream(target))
      .on('finish', () => {
        console.log('Finished downloading ' + target);
        resolve();
      })
      .on('error', reject);
  });
};

let downloadAll = (urlArray) => {
  console.log(`Downloading ${urlArray.length} character images...`);
  let basePath = 'images/';
  let ext = '/standard_fantastic.jpg'; // 250x250 pixel square images

  fs.mkdir(basePath);
  return Promise.all(urlArray.map((item) => {
      return download(item.url + ext, basePath + item.id + '.jpg');
  }));
};

getAllCharacters()
.then((data) => {
  downloadAll(data);
})
.then(() => console.log('done!'));
