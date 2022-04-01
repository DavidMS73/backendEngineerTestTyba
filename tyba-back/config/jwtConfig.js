module.exports = {
  tokenSecret: process.env.TOKENSECRET || "secret1",
  refreshTokenSecret: process.env.REFRESHTOKENSECRET || "secret2",
  tokenLife: 600,
  refreshTokenLife: 86400,
};
