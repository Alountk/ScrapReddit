//Dependencia externa
require('dotenv').config();
const mongoose = require('mongoose');
const connection = require('./connection');
const Nightmare = require('nightmare');
// const {saveDBLink,saveDBDownload} = require('./functions/functions');
const Page = require('./models/page');
const cheerio = require('cheerio');
const $ = require('cheerio');
const axios = require('axios');
const url = 'https://old.reddit.com/r/SwitchNSPs/';
const gameUrl = 'https://old.reddit.com/r/Romstorage/comments/fqd7wk/copperbell_0100c5a0115c4000_nsp/'
const primUrl = 'https://old.reddit.com';
const atob = require("atob");

const parsedResults = [];
// const page = new Page({ consola: 'switch' }); // crea la entidad
// page.save(); // guarda en bd

const getPage = async (url, page) => {
    await axios.get(url).then(async (res) => {
        const $ = cheerio.load(res.data, { decodeEntities: false });
        $('span.next-button').each(async (index, e) => {
            let j = $(e);
            let next = j.find('a').attr('href');
            parsedResults.push(next);
            let pagina = next;
            for (i = 0; i < page + 1; i++) {
                await axios.get(pagina).then(async (res) => {
                    const $ = cheerio.load(res.data, { decodeEntities: false });
                    $('span.next-button').each(async (index, e) => {
                        let j = $(e);
                        let next2 = j.find('a').attr('href');
                        parsedResults.push(next2);
                        pagina = next2
                    })
                })
            }
            saveDBLink(parsedResults)
        })

    }
    )
}

async function saveDBLink(e) {

    await Page.findOneAndUpdate({ consola: 'Switch' }, { $set: { pages: e } }, { upsert: true, new: true, setDefaultsOnInsert: true });
    mongoose.connection.close();
}
// getPage(url,6)

async function saveDBDownload(e) {

    await Page.findOneAndUpdate({ consola: 'Switch' }, { $set: { download: e } }, { upsert: true, new: true, setDefaultsOnInsert: true });
    mongoose.connection.close();
}

async function getUrlGame() {
    const urlGame = await Page.findOne({ consola: 'Switch' });
    await urlGame.pages.map(async (e) => await getUrl(e))
}

getUrlGame();

//este consigue todas las url de pagina de descarga
const getUrl = async (url) => {
    let href = [];
    await axios.get(url).then(async (res) => {
        const $ = cheerio.load(res.data, { decodeEntities: false });
        $('.title').each(async (index, element) => {
            let a = $(element);
            let f = a.find('a').attr('href');
            if (f !== undefined) {
                href.push(primUrl + f);
            }
        });
    })
    await href.map(async (e) => {
        await getBase64Game(e)
    })
    // mongoose.connection.close();

}

//este consigue la url de dentro de la pagina 
const getBase64Game = async (url) => {
    //console.log(url);
    //const urlNew=[];
    axios.get(url).then(async (res) => {
        const $ = cheerio.load(res.data, { decodeEntities: false });
        let title = $('.title').find('a').text();
        $('.usertext-body').last().each(async (index, element) => {
            let a = $(element);
            let f = a.find('.md').find('p').first().text().toString();
            let decoUrl = atob(f).split('https://');
            // const urlDrive = 
            const urlDownload = [];
            decoUrl.map(async (e) => {
                let obj ={};
                if (!e.indexOf('drive' || !e.length===0)) {
                    console.log(e);
                    obj={title,url:e}
                    urlDownload.push(obj);
                    //console.log('url:',urlDownload);
                    // urlDownload.push({ title, url: 'https://' + e.replace(`\n`, '') }) 
                    //await Page.findOneAndUpdate({ consola: 'Switch' }, { $addToSet: { download: obj } }, { upsert: true, new: true, setDefaultsOnInsert: true }); <-Vuelca a base de datos
                    //const urlDrive = `https://${e}`
                    const urlDrive= 'https://drive.google.com/open?id=13k-gTJuGzd_4VRW_eWoLyWgkDDaBW62S';
                    console.log(urlDrive);
                    const getAddress = async id => {
                        console.log(`Ahora checkeamos la id: ${id}`);
                        const nightmare = new Nightmare({ show:true });
                        //go to start page, navigate to Detail
                        try{
                            await nightmare
                            .goto(urlDrive)
                        }
                        catch(e){
                            console.error(e);
                        }
                    }
                }
            })
            mongoose.connection.close();
        });
    })
}

// getUrl(url)
// getPage(url,10)
// getBase64Game(gameUrl)




// rpBJOHq2PR60pnwJlUyP0