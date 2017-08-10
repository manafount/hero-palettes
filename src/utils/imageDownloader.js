const MarvelApi = require('marvel-api');
const Promise = require('bluebird');
const request = require('request');
const fs = require('fs');
const gm = require('gm');

class ImageDownloader {

  constructor(){
    this.Marvel = MarvelApi.createClient({
      // replace these values with your marvel API public and private keys
      // keys can be generated with your developer account at https://developer.marvel.com/account
      publicKey: process.env.MARVEL_PUBLIC,
      privateKey: process.env.MARVEL_PRIVATE
    });
  }

  getAllCharacters() {
    const LIMIT = 100;
    const TOTAL = 1485; //number of characters in marvel API
    let offset = 0;
    let promiseQueue = [];

    console.log('Getting character info from Marvel API...');
    for(let i=0; i<TOTAL; i+=LIMIT) {
      promiseQueue.push(this.Marvel.characters.findAll(LIMIT, i));
    }

    return Promise.all(promiseQueue)
    .then(values => {
      let characterData = [];
      for(let i=0; i<values.length; i++) {
        characterData = characterData.concat(values[i].data);
      }
      return characterData.map(c => { return { id: c.id, name: c.name, url: c.thumbnail.path }; });
    });
  }

  cleanCorruptImages(basePath) {
    const IMAGE_NOT_FOUND_SIZE = 97861; // size of placeholder marvel image when character image is not available
    let allFiles = fs.readdirSync(basePath);
    let unlinkedFiles = 0;
    allFiles.forEach(currentItem => {
      let size = fs.statSync(basePath + currentItem);
      if (size === 0 || size === IMAGE_NOT_FOUND_SIZE) {
        fs.unlinkSync(basePath + currentItem);
        unlinkedFiles++;
      }
    });

    return unlinkedFiles;
  }

  download(url, target) {
    return new Promise((resolve, reject) => {
      request(url).pipe(fs.createWriteStream(target))
        .on('finish', () => {
          console.log('Finished downloading ' + target);
          resolve();
        })
        .on('error', reject);
    });
  }

  downloadAll(urlArray, basePath='images/', ext='') {
    console.log(`Downloading ${urlArray.length} character images...`);
    
    fs.mkdir(basePath);
    return Promise.all(urlArray.map((item) => {
        return this.download(item.url + ext, basePath + item.id + '.jpg');
    }));
  }
}

module.exports = ImageDownloader;

