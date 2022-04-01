const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant("none").readAny("restaurants");

  ac.grant("admin").extend("none").readAny("history").readAny("users");

  return ac;
})();
