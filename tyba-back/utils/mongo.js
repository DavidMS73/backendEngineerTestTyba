const mongoClient = require("mongodb").MongoClient;

const uri = process.env.DB_HOST;
const dataBase = process.env.DB_NAME;

/**
 * Función para crear la conexión hacia Mongo
 * @returns variable de conexión a Mongo
 */
function mongoUtils() {
  const mu = {};

  // Almacena la conexión a MongoDB.
  mu.conn = () => {
    const client = new mongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return client.connect();
  };
  return mu;
}

process.on("SIGINT", async function () {
  console.log("connection ended");
  const client = await mongoUtils().conn();
  client.close().then((data) => console.log("conn ended"));
});

exports.mongoUtils = mongoUtils();
exports.dataBase = dataBase;
