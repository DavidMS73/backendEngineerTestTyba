const { mongoUtils, dataBase } = require("../utils/mongo.js");
const COLLECTION_NAME_USERS = "users";
const COLLECTION_NAME_REFRESH_TOKENS = "refreshtokens";
const bcrypt = require("bcrypt");
const auth = require("../utils/auth");

const saltRounds = 10;

/**
 * Login for a user
 * @param {json} user
 * @returns user information
 */
async function login(user) {
  const requestedUser = await getUserByUsername(user);

  const isValid = await bcrypt.compare(user.password, requestedUser.password);
  let currentUser = { ...requestedUser };
  if (isValid) {
    delete currentUser.password;
    let token = auth.createToken(currentUser, 0);
    let refreshToken = auth.createToken(currentUser, 1);
    currentUser.token = token;
    currentUser.refreshToken = refreshToken;
    currentUser.status = "Logged in";
    const response = {
      status: "Logged in",
      token: token,
      refreshToken: refreshToken,
    };

    mongoUtils.conn().then(async (client) => {
      await client
        .db(dataBase)
        .collection(COLLECTION_NAME_REFRESH_TOKENS)
        .insertOne(response)
        .finally(() => client.close());
    });

    return currentUser;
  } else {
    throw new Error("Authentication failed");
  }
}

/**
 * Función para hacer logout
 * @param {json} refreshToken
 * @returns informacion
 */
async function logout(refreshToken) {
  const reqRefreshToken = await mongoUtils.conn().then(async (client) => {
    return await client
      .db(dataBase)
      .collection(COLLECTION_NAME_REFRESH_TOKENS)
      .findOne({ refreshToken: refreshToken.refreshToken })
      .finally(() => client.close());
  });

  if (refreshToken.refreshToken && reqRefreshToken != null) {
    mongoUtils.conn().then(async (client) => {
      await client
        .db(dataBase)
        .collection(COLLECTION_NAME_REFRESH_TOKENS)
        .deleteOne({ _id: reqRefreshToken._id })
        .finally(() => client.close());
    });

    return { message: "Sign out successful" };
  } else {
    return {
      message: "You were not logged in or your session had already expired",
    };
  }
}

/**
 * Función para refrescar el token
 * @param {json} postData información para refrescar el token
 * @returns nuevo token
 */
async function refreshToken(postData) {
  let userInfo = auth.decodeRefreshToken(postData.refreshToken);

  return mongoUtils.conn().then(async (client) => {
    const reqRefreshToken = await client
      .db(dataBase)
      .collection(COLLECTION_NAME_REFRESH_TOKENS)
      .findOne({ refreshToken: postData.refreshToken })
      .finally(() => client.close());

    if (postData.refreshToken && reqRefreshToken != null) {
      const data = await getUserByUsername(userInfo);

      if (data == null) {
        throw new Error("Problems with the refresh token");
      }
      delete data.password;

      let token = auth.createToken(data, 0);

      const response = {
        token: token,
      };

      mongoUtils.conn().then(async (client) => {
        await client
          .db(dataBase)
          .collection(COLLECTION_NAME_REFRESH_TOKENS)
          .updateOne(
            { refreshToken: postData.refreshToken },
            { $set: { token: token } }
          )
          .finally(() => client.close());
      });

      return response;
    } else {
      throw new Error("Problems refreshing token");
    }
  });
}

/**
 * Función para crear un usuario
 * @param {json} user User information
 * @returns información de la creación
 */
async function createUser(user) {
  const reqUsername = await getUserByUsername(user);
  console.log(reqUsername);
  if (reqUsername == null) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, saltRounds);
    }
    if (user.repeat_password) {
      delete user.repeat_password;
    }
    if (!user.role) {
      user.role = "none";
    }
    return mongoUtils.conn().then(async (client) => {
      const newUser = await client
        .db(dataBase)
        .collection(COLLECTION_NAME_USERS)
        .insertOne(user)
        .finally(() => client.close());
      return newUser;
    });
  } else {
    throw new Error("User already exists");
  }
}

/**
 * Función para obtener la información de los usuarios
 * @returns información de los usuarios
 */
async function getUsers() {
  return mongoUtils.conn().then(async (client) => {
    const usuarios = await client
      .db(dataBase)
      .collection(COLLECTION_NAME_USERS)
      .find({})
      .project({ username: 1, role: 1 })
      .toArray()
      .finally(() => client.close());

    return usuarios;
  });
}

/**
 * Función para obtener la información de un usuario por nombre de usuario
 * @returns información del usuario
 */
async function getUserByUsername(body) {
  return await mongoUtils.conn().then(async (client) => {
    return await client
      .db(dataBase)
      .collection(COLLECTION_NAME_USERS)
      .findOne({ username: body.username })
      .finally(() => client.close());
  });
}

module.exports = { login, logout, refreshToken, createUser, getUsers };
