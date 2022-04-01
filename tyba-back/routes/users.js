var express = require("express");
var router = express.Router();
const auth = require("../utils/auth");
const userController = require("../controllers/user");
const userLogic = require("../logic/user");
const errorLogic = require("../utils/errorLogicCommon");
const { roles } = require("../roles");

router.get("/", auth.checkToken, async function (req, res, next) {
  const permission = roles.can(req.decoded.role).readAny("users");
  if (permission.granted) {
    const users = await userController.getUsers();
    res.send(users);
  } else {
    res.sendStatus(403).end();
  }
});

router.post("/login", async function (req, res, next) {
  const { error } = userLogic.validateUserLogin(req.body);
  if (error) {
    return errorLogic.errorLogic(res, error);
  }

  try {
    const authUser = await userController.login(req.body);
    res.send(authUser);
  } catch (error) {
    res.status(403).send({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/logout", async function (req, res, next) {
  const { error } = userLogic.validateUserLogoutOrRefresh(req.body);
  if (error) {
    return errorLogic.errorLogic(res, error);
  }

  try {
    const authUser = await userController.logout(req.body);
    res.send(authUser);
  } catch (error) {
    console.log(error);
    res.status(403).send({
      success: false,
      message: error.message,
    });
  }
});

router.post("/token", async function (req, res) {
  const { error } = userLogic.validateUserLogoutOrRefresh(req.body);
  if (error) {
    return errorLogic.errorLogic(res, error);
  }

  // Refresh the token
  try {
    const authUser = await userController.refreshToken(req.body);
    res.send(authUser);
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/register", async function (req, res, next) {
  const { error } = userLogic.validateUserCreate(req.body);
  if (error) {
    return errorLogic.errorLogic(res, error);
  }

  try {
    const newUser = await userController.createUser(req.body);
    res.send(newUser);
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
