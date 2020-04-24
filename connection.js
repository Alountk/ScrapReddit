const mongoose = require('mongoose');
// const { MongoClient } = require('mongodb');

// // Nombre de bd
// const dbName = `${process.env.DBNAME}`;
// // Conexión URL (estas corriendo en local :D)
// const url = 'mongodb://localhost:27017';

// const client = new MongoClient(url, {
//   useUnifiedTopology: true
// });

// module.exports = async () => {
//   // Conectamos al servidor
//   await client.connect();

//   return client.db(dbName); // retornamos la conexión con el nombre de la bd a usar
// };
mongoose
  .connect(`mongodb://localhost:27017/${process.env.DBNAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })

