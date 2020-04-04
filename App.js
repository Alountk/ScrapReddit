const cheerio = require('cheerio');
const $ = require('cheerio');
const axios = require('axios');
const url = 'https://old.reddit.com/r/SwitchNSPs/';
const primUrl = 'https://old.reddit.com';

const getUrl = async (url) => {
    let href = [];
    let nextButton = [];
    await axios.get(url).then(async (res) => {
        const $ = cheerio.load(res.data, { decodeEntities: false });
        $('span.next-button').each(async (index, e) => {
            let j = $(e);
            let next = j.find('a').attr('href');
            nextButton.push(next);
        })
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

const getPage = async (url) => {
    let nextButton = [];
    await axios.get(url).then(async (res) => {
        const $ = cheerio.load(res.data, { decodeEntities: false });
        $('span.next-button').each(async (index, e) => {
            let j = $(e);
            let next = j.find('a').attr('href');
            nextButton.push(next);
        })
    })
    console.log(nextButton);
}

// getUrl(url)
getPage(url)



// rpBJOHq2PR60pnwJlUyP0