const Currency = require("../models/currency.js");
const Language = require("../models/language.js");
const converter = require("../api/currencyConverter.js");
const responseFn = require('./responseFn.js');


exports.index = async function (request, response) {
    let STATE = {};
    const client = request.app.locals.dbClient;
    const currencies = request.app.locals.collection;
    STATE['text'] = await Language.getText(request.app.locals.texts, 'id');
    STATE["text"]["title"] = STATE["text"]["index_title"];
    STATE['currencies'] = await Currency.getAll(currencies);
    STATE['languages'] = await Language.getAll(request.app.locals.languages);
    STATE['language'] = await Language.getLanguage(request.app.locals.languages, 'id');
    STATE['currency_from'] = await Currency.getCurrencyToLanguage(currencies, "en");
    STATE['currency_to']  = await Currency.getCurrencyToLanguage(currencies, STATE['language']['code']);

    STATE["currencies_pairs"] = [];
    let several_currencies = await Currency.getSeveral(currencies, ['CAD', 'EUR', 'RUB', 'GBP', 'CHF']);
    let rates = await converter.getCurrencyRate(client, 'USD', 'EUR');
    for (let currency of several_currencies){
        let rate = ((1 / rates.rates[STATE["currency_from"]['code']]) * rates.rates[currency.code]).toFixed(4);
        STATE["currencies_pairs"].push({
            from: STATE["currency_from"],
            to: currency,
            rate: rate,
            amount: 1
        });
    }
    
    const URL = request.url;
    responseFn(URL, STATE, response);
};
