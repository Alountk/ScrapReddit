
const Nightmare = require('nightmare');



const urlDrive = 'https://drive.google.com/file/d/1rSOIKtNTIF7sToW3PGerMoAkBwNxK56S';
const urlDrive2 = 'https://drive.google.com/open?id=13k-gTJuGzd_4VRW_eWoLyWgkDDaBW62S';
const urlDownload = 'https://drive.google.com/uc?id=1rSOIKtNTIF7sToW3PGerMoAkBwNxK56S&export=download'

const getAddress = async id => {
    console.log(`Ahora checkeamos la id: ${id}`);
    const nightmare = new Nightmare({ show: true });
    //go to start page, navigate to Detail
    try {
        await nightmare
            .goto(urlDownload)
            .wait('#uc-download-link')
            .type('#uc-download-link')
            .click()
    }
    catch (e) {
        console.error(e);
    }
}

console.log(getAddress())