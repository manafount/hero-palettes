const MarvelApi = require('marvel-api');
const Async = require('async');
const Promise = require('bluebird');
const Progress = require('progress');


let Marvel = MarvelApi.createClient({
  publicKey: process.env.MARVEL_PUBLIC,
  privateKey: process.env.MARVEL_PRIVATE
});

let getAllCharacters = () => {
  const LIMIT = 100;
  const TOTAL = 1486; //number of characters in marvel API
  let offset = 0;
  let promiseStack = [];

  for(let i=0; i<TOTAL; i+=LIMIT) {
    promiseStack.push(Marvel.characters.findAll(LIMIT, i));
  }

  return Promise.all(promiseStack)
    .then(values => {
      let characterData = [];
      for(let i=0; i<values.length; i++) {
        characterData = characterData.concat(values[i].data);
      }
      return characterData;
    }
  );
};

Async.waterfall([
  getAllCharacters
], function (err, result) {
    if (err) {
      console.log(err);
    }else{
      console.log(result);
    }
});

