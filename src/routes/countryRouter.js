const {Router} = require('express');
const router = Router();
const countryController = require("../controllers/countryController.js");

router.get("/", countryController.index_country);
router.get("/currency", countryController.currencies_page);
router.get("/currency/:currency_code([A-Za-z]{3})", countryController.country_currency);
router.get("/currency/:currency_code([A-Za-z]{3})/:currency_code_to([A-Za-z]{3})", countryController.country_currency_to);
router.get("/currency/:currency_code([A-Za-z]{3})/:currency_code_to([A-Za-z]{3})/:amount([0-9]+)", countryController.country_currency_to);
router.get(
  "/currency/:currency_code([A-Za-z]{3})/:currency_code_to([A-Za-z]{3})/:year([0-9]{4})-:month(0[0-9]|1[0-2])-:day([0-9]{2})",
  countryController.country_currency_by_date
);


module.exports = router;