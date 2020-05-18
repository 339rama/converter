const converter = require('../api/currencyConverter.js');
const Rate = require("../models/Rate.js");

exports.currency_main =  function (request, response) {
    const code = request.params.code;
    const collection = request.app.locals.collection;
    collection.find().toArray(function (err, currencies) {
        let currency;
        currencies.forEach(element => {
            currency = element.code === code ? element.code : 'USD';
        });
        if (err) return console.log(err);
        response.render('currency.hbs', {
            currencies: currencies,
            currency: currency
        });
    });
};
exports.currency_convert = function (request, response) {
    console.log(request.body, 'post');
    let fromCurrency = request.body.fromCurrency;
    let toCurrency = request.body.toCurrency;
    let amount = request.body.amount;
    converter.getCurrencyRate(fromCurrency, toCurrency, amount)
        .then((message) => {
            console.log(message);
            response.send(message);
        })
        .catch((error) => {
            console.log(error.message);
        });
};

exports.historic = async function(request, response){
    const client = request.app.locals.dbClient;
    let { from, to, date } = request.body;
    try {
        const historic = await Rate.getAllRates(client, from, to, date);
        response.json(historic);
    } catch (error) {
        response.status(500).json(error);
    }
}

exports.minMaxRates = async function (request, response) {
    const client = request.app.locals.dbClient;
    let {from, to, date} = request.body;
    try {
        const rates = await Rate.getMinMax(client, from, to, date);
        response.json(rates);
    } catch (error) {
        response.status(500).json(error);
    }
}