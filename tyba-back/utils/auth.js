let jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwtConfig");

/**
 * Función para crear un token con JWT
 * @param {json} data
 * @param {number} life
 * @returns
 */
function createToken(data, type) {
  let secret = jwtConfig.tokenSecret;
  let life = jwtConfig.tokenLife;
  if (type == 1) {
    secret = jwtConfig.refreshTokenSecret;
    life = jwtConfig.refreshTokenLife;
  }
  return jwt.sign(data, secret, {
    algorithm: "HS256",
    expiresIn: life,
  });
}

/**
 * Función para verificar el token que manda el usuario, actúa como middleware en peticiones
 * @param {json} req request object
 * @param {json} res response object
 * @param {function} next next function
 * @returns null or error
 */
function checkToken(req, res, next) {
  // Extrae el token de la solicitud enviado a través de alguno de los headers especificados
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  // Si hay valor para el token se analiza
  // de lo contrario, se retorna mensaje de error
  if (token) {
    // Si el token incluye el prefijo 'Bearer ' se elimina
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
      // Llama la función verify del paquete jsonwebtoken que se encarga de realizar la validación del token con el secret proporcionado
      jwt.verify(token, jwtConfig.tokenSecret, (err, decoded) => {
        // Si no pasa la validación, un mensaje de error es retornado
        // de lo contrario, permite a la solicitud continuar
        if (err) {
          return res.json({
            success: false,
            message: "Token is not valid",
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied",
    });
  }
}

function decodeToken(token) {
  return jwt.verify(token, jwtConfig.tokenSecret, (err, decoded) => {
    // Si no pasa la validación, un mensaje de error es retornado
    // de lo contrario, permite a la solicitud continuar
    if (err) {
      throw new Error("Token no longer available");
    } else {
      return decoded;
    }
  });
}

function decodeRefreshToken(token) {
  return jwt.verify(token, jwtConfig.refreshTokenSecret, (err, decoded) => {
    // Si no pasa la validación, un mensaje de error es retornado
    // de lo contrario, permite a la solicitud continuar
    if (err) {
      throw new Error("Token for refresh no longer available");
    } else {
      return decoded;
    }
  });
}

module.exports = {
  createToken: createToken,
  checkToken: checkToken,
  decodeToken: decodeToken,
  decodeRefreshToken: decodeRefreshToken,
};
