
const Nightmare = require('nightmare');



const urlDrive = 'https://drive.google.com/open?id=13k-gTJuGzd_4VRW_eWoLyWgkDDaBW62S';

const getAddress = async id => {
    console.log(`Ahora checkeamos la id: ${id}`);
    const nightmare = new Nightmare({ show: true });
    //go to start page, navigate to Detail
    try {
        await nightmare
            .goto(urlDrive)
    }
    catch (e) {
        console.error(e);
    }
}

console.log(getAddress())