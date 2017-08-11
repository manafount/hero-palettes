let request = require('request');
let Promise = require('bluebird');
let jsonfile = require('jsonfile');
let Vibrant = require('node-vibrant');
let now = require('performance-now');
let fs = require('fs');
let wikijson = require('../data/wikidata.json');

class WikiCrawler {
    wikidata(url) {
        return new Promise ((resolve, reject) => {
            request(url, (error, response, body) => {
                console.log('getting popular character articles from marvel.wikia.com...');
                if(error) {
                    reject(error); 
                }
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                let data = JSON.parse(body).items;
                console.log('items found:', data.length);
                resolve(data);
            });
        });
    }

    mapCharacterData(data) {
        return data.map((page) => {
            let img;
            try {
                img = page.thumbnail.match(/^.*\/latest/)[0]; //clean image url of extra query strings
            }
            catch(err){
                console.error("Couldn't find a valid image link for " + page.url);
            }
            return {
                id: page.id,
                name: page.title,
                url: 'marvel.wikia.com' + page.url,
                img
            };
        });
    }

    addVibrantPalette(char) {
        if(char.img) {
            return Vibrant.from(char.img)
            .getPalette()
            .then(pal => {
            char['palette'] = pal;
            return char;
            });
        }else{
            char['palette'] = null;
            return char;
        }
    }

    getAllPalettes(data) {
        return Promise.map(Object.keys(data), (id) => {
            return this.addVibrantPalette(data[id]);
        });
    }

    arrToObj(arr) {
        return arr.reduce(function(map, obj) {
            map[obj.id] = obj;
            return map;
        }, {});
    }

    writeToFile(json) {
        console.log('Writing data to json file...');
        let obj = {
            timestamp: Date.now(),
            data: json
        };
        jsonfile.writeFile('../data/wikidata.json', obj);
    }

    findBackupImages(data) {
        let queue = [];
        data.forEach(char => {
            if(!char.img){
                queue.push(char);
            }
        });
        
        return Promise.map(queue, (char) => {
            return this.crawlForImage(char)
            .then(img => {
                char.img = img;
                return char;
            });
        });
    }

    crawlForImage(char) {
        console.log('I crawled at ' + char.url + ' for another image.');
        return Promise.resolve('google.com');
    }

    bootstrapFromURL(url) {
        let start = now();
        return this.wikidata('http://marvel.wikia.com/api/v1/Articles/Top?expand=1&namespaces=0&category=Characters&limit=250')
        .then(data => {
            return this.mapCharacterData(data);
        })
        .then(data => {
            return this.getAllPalettes(data);
        })
        .then(arr => {
            return this.arrToObj(arr);
        })
        .then(json => {
            return this.writeToFile(json);
        })
        .then(() => console.log('All operations complete in ' + (now() - start) + ' ms.'));
    }
}

module.exports = WikiCrawler;

// TEST CASES

let wc = new WikiCrawler;
let dataArr = Object.keys(wikijson.data).map(id => wikijson.data[id]);
wc.findBackupImages(dataArr);



// imgCrawler.queue({
//     uri:"https://nodejs.org/static/images/logos/nodejs-1920x1200.png",
//     filename:"./test/nodejs-1920x1200.png"
// });