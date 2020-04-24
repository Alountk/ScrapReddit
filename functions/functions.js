async function saveDBLink(e){
    
    await Page.findOneAndUpdate({consola:'Switch'},{$set:{pages:e}},{upsert:true,new: true, setDefaultsOnInsert: true});
    mongoose.connection.close();
}
getPage(url,6)

async function saveDBDownload(e){
    
    await Page.findOneAndUpdate({consola:'Switch'},{$set:{download:e}},{upsert:true,new: true, setDefaultsOnInsert: true});
    mongoose.connection.close();
}