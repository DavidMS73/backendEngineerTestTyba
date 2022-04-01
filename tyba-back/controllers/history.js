const { mongoUtils, dataBase } = require("../utils/mongo.js");
const COLLECTION_NAME_HISTORY = "history";

/**
 * Función para obtener el historial de transacciones
 * @returns información de las transacciones
 */
async function getHistory() {
  return mongoUtils.conn().then(async (client) => {
    const history = await client
      .db(dataBase)
      .collection(COLLECTION_NAME_HISTORY)
      .find({})
      .toArray()
      .finally(() => client.close());

    return history;
  });
}

/**
 * Función para crear una entrada en el historial
 * @param {json} createHistory History information
 * @returns información de la creación
 */
async function createHistory(createHistory, userInfo) {
  userInfo.userid = userInfo._id;
  delete userInfo._id;
  let obj_unidos = Object.assign(userInfo, createHistory);
  return mongoUtils.conn().then(async (client) => {
    const newUser = await client
      .db(dataBase)
      .collection(COLLECTION_NAME_HISTORY)
      .insertOne(obj_unidos)
      .finally(() => client.close());
    return newUser;
  });
}

module.exports = { getHistory, createHistory };
