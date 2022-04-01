const maps = require("../utils/maps");

/**
 * Función para obtener la información de los usuarios
 * @returns información de los usuarios
 */
async function getRestaurants(query) {
  const mapsRequest = await maps.callMapApi(
    query.latitude,
    query.longitude,
    "restaurant",
    query.pagetoken
  );

  if (mapsRequest.data.status !== "OK") {
    throw new Error(mapsRequest.data.error_message);
  }

  return {
    results: mapsRequest.data.results,
    next_page_token: mapsRequest.data.next_page_token,
  };
}

module.exports = { getRestaurants };
