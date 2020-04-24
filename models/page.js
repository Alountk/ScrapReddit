const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const pageSchema = new Schema({
    consola:{type:String},
  pages:[],
  download:[]
},{timestamps: true});

const Page = mongoose.model('Page', pageSchema);
module.exports = Page;