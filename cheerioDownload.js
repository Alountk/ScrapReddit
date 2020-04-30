const linkDown = 'https://drive.google.com/uc?id=1rSOIKtNTIF7sToW3PGerMoAkBwNxK56S&export=download';
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs')
const atob = require("atob");

const primUrl = 'https://old.reddit.com/';
const url = 'https://old.reddit.com/r/SwitchNSPs/';
let linkList = []
let dlinkList = []


const getWebsiteLinks = async (url) => {
  try {
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)
    $('.title').each(function (i, elem) {  
      let link = $(elem).find('a').attr('href')
      if ( link !== undefined){
        linkList.push(primUrl + link)
      }
    });
  } catch (error) {
    console.error(error)
  }
}


const downloadLinks = async (linkList) => {
  for (const link of linkList) {
    //console.log(link);
    const response = await axios.get(link);
    const $ = cheerio.load(response.data);
    let title = $('.title').find('a').text();
    let infoUrl = $('.usertext-body').slice(1).eq(0).text().split(' ');
    infoUrl = infoUrl.map(e => atob(e)).filter(e=>e.includes('https://'));
    let patt = new RegExp(/^[A-Za-z0-9\s]+$/g);
    if (infoUrl.length!=0 || infoUrl.includes('drive')){
        console.log('titulo: ',title);
        infoUrl[0].replace(':\n','').split(`\n`);
        // infoUrl =infoUrl.map(e=>{
        //     return e.includes(/https://drive.google.com/g);
        // });
        console.log(infoUrl);
    }
    //console.log('info: ',infoUrl.replace());
    //let deco = $(infoUrl);
    //console.log(deco);
        // $('.usertext-body').last().each(async (index, element) => {
        //     let a = $(element);
        //     let f = a.find('.md').find('p').first().text().toString();
        //     console.log(f);
        //     let decoUrl = atob(f).split('https://');
        //     decoUrl.map(async (e) => {
        //         try{
        //             let obj ={};
        //             if (!e.indexOf('drive' || !e.length===0)) {
        //                 const urlGoogle= `https://drive.google.com/uc?id=${e.split('id=')[1].trim()}&export=download`;
        //                 obj={title,url:urlGoogle}
        //                 dlinkList.push(obj);
        //                 console.log(obj);
        //             }
        //         }
        //         catch(e){
        //             console.error(e);
        //         }
                
        //     })
        // });
    // let name = $('.download').attr("onclick")
    // name = name.match(/location\.href\s*=\s*['"]([^'"]*)['"]/)
    // let dlink = link + name[1]
    // dlinkList.push({
    //   name: name[1],
    //   dlink: dlink
    // })
  }

}


const downloadFiles = async (dlinkList) => {
  for (const link of dlinkList) {
    let name = link.name + '.rar'
    let url = link.dlink
    let file = fs.createWriteStream(name)
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    })
    response.data.pipe(file)
  }
}


(async () => {
  await getWebsiteLinks(url)
  //console.log(linkList);
  await downloadLinks(linkList)
  console.log(dlinkList);
  //await downloadFiles(dlinkList)
})()
