const {Router, json} = require("express");
const router = Router();
const currencyController = require("../controllers/currencyController.js");
const jsonParser = json();

router.post("/convert", jsonParser, currencyController.currency_convert);
router.post('/min-max', currencyController.minMaxRates);
router.post('/historic', currencyController.historic);
router.get("/:code", currencyController.currency_main);

module.exports = router;