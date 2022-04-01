const axios = require("axios");
const mapsConfig = require("../config/mapsConfig");

/**
 * Función para hacer llamado a la API de Google Maps
 * @param {string} latitude latitud
 * @param {string, number} longitude logitud
 * @param {string} type
 * @param {string} pagetoken
 * @returns información de los lugares cercanos
 */
async function callMapApi(latitude, longitude, type, pagetoken) {
  const params = new URLSearchParams();
  params.append("location", `${latitude},${longitude}`);
  params.append("key", mapsConfig.privateKeyTokenApi);
  params.append("radius", mapsConfig.radius);
  params.append("type", type);
  if (pagetoken) params.append("pagetoken", pagetoken);

  return await axios.get(`${mapsConfig.urlMapsAPI}?${params.toString()}`);
}

exports.callMapApi = callMapApi;
