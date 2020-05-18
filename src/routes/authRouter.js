const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController.js");

router.get('/login',  authController.loginGet);
router.post("/login", authController.login);


module.exports = router;
