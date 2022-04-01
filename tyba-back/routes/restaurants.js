var express = require("express");
var router = express.Router();
const auth = require("../utils/auth");
const restaurantController = require("../controllers/restaurant");
const historyController = require("../controllers/history");
const restaurantLogic = require("../logic/restaurant");
const errorLogic = require("../utils/errorLogicCommon");
const { roles } = require("../roles");

/* GET restaurants listing */
router.get("/", auth.checkToken, async function (req, res, next) {
  const permission = roles.can(req.decoded.role).readAny("restaurants");
  if (permission.granted) {
    let dateUTC = new Date();
    let history = {
      url: req.url,
      dateRequestAPI: dateUTC.toISOString(),
    };

    await historyController.createHistory(history, req.decoded);

    const { error } = restaurantLogic.validateGetRestaurant(req.query);
    if (error) {
      return errorLogic.errorLogic(res, error);
    }

    try {
      const restaurants = await restaurantController.getRestaurants(req.query);
      res.send(restaurants);
    } catch (error) {
      res.status(403).send({
        success: false,
        message: error.message,
      });
    }
  } else {
    res.sendStatus(403).end();
  }
});

module.exports = router;
