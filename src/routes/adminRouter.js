const { Router } = require("express");
const router = Router();
const adminController = require("../controllers/adminController.js");


router.get('/texts/:language_code', adminController.text);
router.post("/texts/:language_code", adminController.textUpdate);
router.get("/texts", adminController.allTexts);
router.get("/", adminController.main);


module.exports = router;
