const {Router} = require("express");
const router = Router();
const homeController = require("../controllers/homeController.js");

router.get("/", homeController.index);

module.exports = router;