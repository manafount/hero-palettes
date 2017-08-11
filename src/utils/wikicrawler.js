let request = require('request');
let rp = require('request-promise');
let Promise = require('bluebird');
let jsonfile = require('jsonfile');
let Vibrant = require('node-vibrant');
let cheerio = require('cheerio');
let now = require('performance-now');
let fs = require('fs');

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

    mapCharacterData(dataArr) {
        let charArr = dataArr.map((page) => {
            let img;
            try {
                img = page.thumbnail.match(/(^.*(\.jpg|\.png))/)[0]; //clean image url of extra query strings
            }
            catch(err){
                console.error("Valid image link not supplied by API for " + page.url);
            }
            return {
                id: page.id,
                name: page.title,
                url: 'https://marvel.wikia.com' + page.url,
                img
            };
        });

        return this.arrToObj(charArr);
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

    getAllPalettes(dataObj) {
        console.log('Generating Vibrant palettes...');
        return Promise.map(Object.keys(dataObj), (id) => {
            return this.addVibrantPalette(dataObj[id]);
        })
        .then(arr => {
            return this.arrToObj(arr);
        });
    }

    arrToObj(arr) {
        return arr.reduce((map, obj) => {
            map[obj.id] = obj;
            return map;
        }, {});
    }

    objToArr(obj) {
        return Object.keys(obj).map((id) => {
            return obj[id];
        });
    }

    writeToFile(json) {
        console.log('Writing ' + Object.keys(json).length + ' items to json file...');
        let alphabeticalIndex = this.createSortedIndex(json);
        let obj = {
            timestamp: Date.now(),
            sortedIndex: alphabeticalIndex,
            data: json
        };
        jsonfile.writeFile('../data/wikidata.json', obj);
    }

    findBackupImages(dataObj) {
        let queue = [];
        Object.keys(dataObj).forEach(id => {
            if(!dataObj[id].img){
                queue.push(dataObj[id]);
            }
        });
        console.log('Crawling wiki for backup images for ' + queue.length + ' characters...');
        return Promise.map(queue, (char) => {
            return this.crawlForImage(char)
            .then(img => {
                if(!img) {
                    console.log("Couldn't find an image for " + char.name + " at " + char.url);
                }
                char.img = img;
                return char;
            });
        })
        .then(res => {
            let resObj = this.arrToObj(res);
            let mergedObj =  Object.assign({}, dataObj, resObj);
            return this.deleteNoImage(mergedObj);
        });
    }

    crawlForImage(char) {
        return new Promise((resolve, reject) => {
            rp
            .get(char.url)
            .then(response => {
                let $ = cheerio.load(response);
                let imgURL = $('.pi-image-thumbnail').attr('src');
                resolve(imgURL);
            })
            .catch(err => console.error(err));
        });
    }

    // Some pages don't have any valid images to choose from. Delete those from our saved data.
    deleteNoImage(dataObj) {
        let idsToDelete = [];
        for(let id in dataObj) {
            let char = dataObj[id];
            if(!char.img) {
                idsToDelete.push(id);
            }
        }
        console.log('Deleting ' + idsToDelete.length + ' items with no available image.');
        idsToDelete.forEach(id => delete dataObj[id]);
        return dataObj;
    }

    createSortedIndex(dataObj) {
        let sorted = 
            this.objToArr(dataObj)
            .sort((a, b) => {
                let nameA = a.name.toLowerCase();
                let nameB = b.name.toLowerCase();

                if(nameA > nameB) {
                    return 1;
                }else if(nameB > nameA) {
                    return -1;
                }else{
                    return 0;
                }
            });
        return sorted.map(el => el.id);
    }

    bootstrapFromURL(url) {
        let start = now();
        return this.wikidata(url)
        .then(dataArr => {
            return this.mapCharacterData(dataArr);
        })
        .then(dataObj => {
            return this.findBackupImages(dataObj);
        })
        .then(dataObj => {
            return this.getAllPalettes(dataObj);
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
wc.bootstrapFromURL('http://marvel.wikia.com/api/v1/Articles/Top?expand=1&namespaces=0&category=Characters&limit=100');