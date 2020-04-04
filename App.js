//Dependencia externa
const cheerio = require('cheerio');
const $ = require('cheerio');
const axios = require('axios');
const url = 'https://old.reddit.com/r/SwitchNSPs/';
const gameUrl = 'https://old.reddit.com/r/Romstorage/comments/fqd7wk/copperbell_0100c5a0115c4000_nsp/'
const primUrl = 'https://old.reddit.com';
const atob = require("atob");

const outputFile = 'data.json';
const parsedResults = [];
const pageLimit = 5;
let pageCounter = 0;
let resultCount = 0;



const getUrl = async (url) => {
    let href = [];
    let nextButton = [];
    await axios.get(url).then(async (res) => {
        const $ = cheerio.load(res.data, { decodeEntities: false });
        $('.title').each(async (index, element) => {
            let a = $(element);
            let f = a.find('a').attr('href');
            // let next = a.find('span.nav-button').text();
            // console.log(next);
            // console.log(f);
            if (f !== undefined) {
                href.push(primUrl + f);
            }
            // console.log(eachChildren);
        });
    })

    console.log(href);
    console.log(nextButton);
}
const getBase64Game = async (url) => {
    let href = [];
    let nextButton = [];
    await axios.get(url).then(async (res) => {
        const $ = cheerio.load(res.data, { decodeEntities: false });
        let title = $('.title').find('a').text();
        let urlDrive;
        // console.log(title);
        $('.usertext-body').last().each(async (index, element) => {
            let a = $(element);
            let f = a.find('.md').find('p').first().text().toString();
            let decoUrl = atob(f).split('https://');
            const urlDrive = decoUrl.map((e) => {
                if (!e.indexOf('drive')) {
                    console.log('-', e);
                    href.push({ title, url: 'https://' + e.replace(`\n`, '') })
                }
            })
        });
    })
    console.log(href);
}

const getPage = async (url) => {
    await axios.get(url).then(async (res) => {
        const $ = cheerio.load(res.data, { decodeEntities: false });
        $('span.next-button').each(async (index, e) => {
            let j = $(e);
            let next = j.find('a').attr('href');
            parsedResults.push(next);
            await axios.get(next).then(async (res) => {
                const $ = cheerio.load(res.data, { decodeEntities: false });
                $('span.next-button').each(async (index, e) => {
                    let j = $(e);
                    let next = j.find('a').attr('href');
                    parsedResults.push(next);
                    console.log(parsedResults);
                })
            })
        })
        
    }
    )}
// const pageReddit = async () =>{
//     if (pageCounter === 0) {
//         console.log('llego')
//         Promise.resolve(await getPage(url));
//         console.log(pageCounter)
//         pageCounter++;
//     } else if (pageCounter <= pageLimit) {
//         console.log(llego2)
//         let page = pageCounter;
//         let pageUrl = parsedResults[page]
//         console.log(pageUrl)
//         Promise.resolve(await getPage(pageUrl));
//         pageCounter++;
//     } else {
//         console.log('STOP', pageCounter)
//         console.log(3)
//     }
// }

// getUrl(url)
getPage(url)
// getBase64Game(gameUrl)




// rpBJOHq2PR60pnwJlUyP0