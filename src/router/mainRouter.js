const { Router } = require("express");
const router = Router();

const mainController = require("../controller/mainController");
const registerValidator = require("../validations/register");
const registerMiddleware = require("../middleware/register");
const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware, mainController.index);
router.post("/", authMiddleware, mainController.postUrl);
router.get("/signin", mainController.login);
router.get("/signup", mainController.register);
router.post(
  "/signup",
  registerValidator,
  registerMiddleware,
  mainController.processRegister
);
router.post("/signin", mainController.proccesLogin);
router.post("/logout", mainController.logout);

module.exports = router;
