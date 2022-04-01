var express = require("express");
var router = express.Router();
const auth = require("../utils/auth");

const historyController = require("../controllers/history");

/* GET history */
router.get("/", auth.checkToken, async function (req, res, next) {
  const history = await historyController.getHistory();
  res.send(history);
});

module.exports = router;
