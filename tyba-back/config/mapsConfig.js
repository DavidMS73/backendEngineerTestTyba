module.exports = {
  privateKeyTokenApi: process.env.PRIVATEKEYTOKENAPI || "secret2",
  urlMapsAPI:
    process.env.URlMAPSAPI ||
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
  radius: process.env.RADIUS || "1000",
};
