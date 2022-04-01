var express = require("express");
var router = express.Router();
const auth = require("../utils/auth");
const { roles } = require("../roles");

const historyController = require("../controllers/history");

/* GET history */
router.get("/", auth.checkToken, async function (req, res, next) {
  const permission = roles.can(req.decoded.role).readAny("history");
  if (permission.granted) {
    const history = await historyController.getHistory();
    res.send(history);
  } else {
    res.sendStatus(403).end();
  }
});

module.exports = router;
