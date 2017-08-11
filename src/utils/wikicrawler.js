let Crawler = require('crawler');
let request = require('request');
let Promise = require('bluebird');
let jsonfile = require('jsonfile');
let Vibrant = require('node-vibrant');
let fs = require('fs');

class WikiCrawler {
    constructor() {
        this.imgCrawler = new Crawler({
            encoding: null,
            jQuery: false,// set false to suppress warning message.
            callback: (err, res, done) => {
                if(err){
                    console.error(err.stack);
                }else{
                    fs.createWriteStream(res.options.filename).write(res.body);
                }
                
                done();
            }
        });
    }

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

    findBackupImage(url) {
        
    }
}

export default WikiCrawler;

// TEST CASES
test.queue('http://marvel.wikia.com/wiki/Peter_Parker_(Earth-616');

let wc = new WikiCrawler;

wc.wikidata('http://marvel.wikia.com/api/v1/Articles/Top?expand=1&namespaces=0&category=Characters&limit=250')
.then((data) => {
    return wc.mapCharacterData(data);
})
.then(arr => {
    return wc.arrToObj(arr);
})
.then(palettes => {
    return wc.writeToFile(palettes);
});



// imgCrawler.queue({
//     uri:"https://nodejs.org/static/images/logos/nodejs-1920x1200.png",
//     filename:"./test/nodejs-1920x1200.png"
// });