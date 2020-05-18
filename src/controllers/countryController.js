const Currency = require("../models/currency.js");
const Language = require("../models/language.js");
const Rate = require("../models/Rate.js");
const {translateText} = require("../api/translator.js");
const converter = require("../api/currencyConverter.js");
const responseFn = require('./responseFn');

exports.index_country = async function (request, response) {
    let STATE = {};
    const client = request.app.locals.dbClient;
    const currencies = request.app.locals.collection;
    STATE["text"] = request.app.locals.text;
    STATE["text"]["title"] = STATE["text"]["index_title"];
    STATE["currencies"] = await Currency.getAll(currencies);
    STATE["languages"] = await Language.getAll(request.app.locals.languages);
    STATE["language"] = request.app.locals.language;
    STATE["currency_from"] = await Currency.getCurrencyToLanguage(currencies, 'en');
    STATE["currency_to"] = await Currency.getCurrencyToLanguage(currencies, STATE["language"]['code']) || STATE["currency_from"];
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
    const URL = `/${STATE["languages"]["code"]}`;
    responseFn(URL, STATE, response);
};

exports.currencies_page = async function (request, response) {
    let STATE = {};
    const collection = request.app.locals.collection;
    STATE['text'] = request.app.locals.text;
    STATE["text"]["title"] = STATE["text"]["currencies_title"];
    STATE["language"] = request.app.locals.language;
    STATE["languages"] = await Language.getAll(request.app.locals.languages);
    STATE["currencies"] = await Currency.getAll(collection);
    let URL = `/${STATE["language"]["code"]}/currency`;
    responseFn(URL, STATE, response);
}

exports.country_currency = async function (request, response) {
    let STATE = {};
    const client = request.app.locals.dbClient;
    const collection = request.app.locals.collection;
    STATE['text'] = request.app.locals.text;
    STATE['country_code'] = request.app.locals.country_code;
    STATE['currency_code'] = request.params.currency_code;
    STATE["language"] = request.app.locals.language;
    STATE["languages"] = await Language.getAll(request.app.locals.languages);
    STATE["currencies"] = await Currency.getAll(collection);
    let currency = await Currency.getCurrency(collection, STATE['currency_code']);    

    STATE['text']['h1'] = ` — Exchange rate of ${currency.name} today`;
    STATE['text']['p_after_h1'] = `The course of ${currency.name} today`;
    // STATE['text']['h1'] = STATE['currency_code'] + await translateText(STATE['text']text['h1'], STATE["language"].code);
    // STATE['text']['p_after_h1'] = await translateText(STATE['text']['p_after_h1'], STATE["language"].code);

    STATE['several_currencies'] = await Currency.getSeveral(collection, ['GBP', 'EUR', 'RUB', 'CAD', 'CHF']);
    let rates = await converter.getCurrencyRate(client, 'USD', 'EUR');
    for (let currency of STATE['several_currencies']){
        let rate = ((1 / rates.rates[STATE["currency_code"]]) * rates.rates[currency.code]);
        currency["rate"] = rate.toFixed(4);
        currency['rate_reverse'] = (1/rate).toFixed(4);
    }
    const URL = `/${STATE["country_code"]}/currency/${STATE["currency_code"]}`;
    responseFn(URL, STATE, response);
};

exports.country_currency_to = async function (request, response) {
    const client = request.app.locals.dbClient;
    const collection = request.app.locals.collection;
    const text = request.app.locals.text;
    const language = request.app.locals.language;
    const country_code = request.app.locals.country_code;
    const currency_code = request.params.currency_code;
    const currency_code_to = request.params.currency_code_to;
    
    const currency_from_obj = await Currency.getCurrency(collection, currency_code);
    const currency_to_obj = await Currency.getCurrency(collection, currency_code_to);
    const amount = request.params.amount || '1';
    let rate = await converter.getCurrencyRate(client, currency_code, currency_code_to, amount);
    const rate_for_amount = (Number(amount)>1) ? rate.rate_for_amount : rate.rate;
    
    text["title"] = `${amount} ${currency_code} to ${currency_code_to} rate = ${rate_for_amount} ${currency_to_obj.name}`;
    text["meta_desc"] = `
        Updated ${currency_code} to ${currency_code_to} rate. 
        Calculate your amounts in the calculator to correctly and without loss transfer the currency from ${currency_code} to ${currency_code}.`;
    if(request.params.amount){
        text["title"] = `How much is ${amount} ${currency_from_obj.sign || currency_from_obj.code} in ${currency_to_obj.sign || currency_to_obj.code}`;
        text["meta_desc"] = `
        How much will be ${amount} ${currency_from_obj.name} in ${currency_to_obj.name}. 
        Use the calculator to convert from ${amount} ${currency_from_obj.sign} to ${currency_to_obj.sign} correctly.`;
    }

    text['h1'] = `${amount} ${currency_code} to ${currency_code_to} = ${rate_for_amount} ${currency_to_obj.name}`;
    text['p_after_h1'] = `The course of ${amount} ${currency_from_obj.name} to the ${currency_to_obj.name} is ${rate_for_amount} ${currency_to_obj.name}`;
    text['rates_text'] = `Convert ${currency_code} to ${currency_code_to}`;
    text['rates_text_reverse'] = `Convert ${currency_code_to} to ${currency_code}`;
    text['chart_header'] = `Chart of rates changes of ${amount} ${currency_from_obj.name} to the ${currency_to_obj.name}`;

    // text['chart_header'] =  await translateText(text['chart_header'], language.code);
    // text['title'] = await translateText(text['title'], language.code);
    // text['meta_desc'] = await translateText(text['meta_desc'], language.code);
    // text['h1'] = await translateText(text['h1'], language.code);
    // text['p_after_h1'] = await translateText(text['p_after_h1'], language.code);
    // text['rates_text'] = await translateText(text['rates_text'], language.code);
    // text['rates_text_reverse'] = await translateText(text['rates_text_reverse'], language.code);

    let options = { year: "numeric", month: "2-digit", day: "2-digit" };
    let formatedDate = new Date().toLocaleDateString(undefined, options);
    
    const historic = await Rate.getAllRates(client, currency_code, currency_code_to, formatedDate);

    const languages = await Language.getAll(request.app.locals.languages);
    let currencies = await Currency.getAll(collection);

    let STATE = {
        text: text,
        language: language,
        languages: languages,
        currencies: currencies,
        country_code: country_code,
        currency_code: currency_code,
        currency_code_to: currency_code_to,
        currency_from: currency_from_obj,
        currency_to: currency_to_obj,
        rate: rate,
        historic:historic
    };
    const URL = `/${country_code}/currency/${currency_code}/${currency_code_to}`;
    responseFn(URL, STATE, response);
};

exports.country_currency_by_date = async function(request, response){
    let {year, month, day} = request.params;
    const client = request.app.locals.dbClient;
    const collection = request.app.locals.collection;
    const languages = await Language.getAll(request.app.locals.languages);
    let currencies = await Currency.getAll(collection);
    const text = request.app.locals.text;
    const language = request.app.locals.language;
    const country_code = request.app.locals.country_code;
    const currency_code = request.params.currency_code;
    const currency_code_to = request.params.currency_code_to;
    
    const currency_from_obj = await Currency.getCurrency(collection, currency_code);
    const currency_to_obj = await Currency.getCurrency(collection, currency_code_to);

    const historic = await Rate.getAllRates(client, currency_code, currency_code_to, `${year}-${month}-${day}`);
    let rate = (day !== '00') 
        ? await converter.getCurrencyRate(client, currency_code, currency_code_to, '1' , `${year}-${month}-${day}`)
        : { rate: Object.values(historic)[0], rate_for_amount: Object.values(historic)[0]};

    const minMax = await Rate.getMinMax(client, currency_code, currency_code_to,`${year}-${month}-${day}`);
    
    let amount = '1';
    if (day==='00' && month==='00'){
      text["title"] = `${currency_code} to ${currency_code_to} rates on ${year} year`;
      text["h1"] = `
      The 1 ${currency_code} to ${currency_code_to} rate on ${year} year is ${rate.rate} ${currency_to_obj.code}`;
    } else if(day==='00' && month!=='00'){
      text["title"] = `${currency_code} to ${currency_code_to} rates on ${month}/${year}`;
      text["h1"] = `
      The 1 ${currency_code} to ${currency_code_to} rate on ${month}/${year} is ${rate.rate} ${currency_to_obj.code}`;
    } else {
      text["title"] = `${currency_code} to ${currency_code_to} rates on ${day}/${month}/${year}`;
      text["h1"] = `
      The 1 ${currency_code} to ${currency_code_to} rate on ${day}/${month}/${year} is ${rate.rate} ${currency_to_obj.code}`;
    }
    text["meta_desc"] = "";
    text['p_after_h1'] = '';
    text['rates_text'] = `Convert ${currency_code} to ${currency_code_to}`;
    text['rates_text_reverse'] = `Convert ${currency_code_to} to ${currency_code}`;
    text['chart_header'] = `Chart of rates changes of ${amount} ${currency_from_obj.name} to the ${currency_to_obj.name}`;
    
    text['chart_header'] =  await translateText(text['chart_header'], language.code);
    text['title'] = await translateText(text['title'], language.code);
    // text['meta_desc'] = await translateText(text['meta_desc'], language.code);
    text['h1'] = await translateText(text['h1'], language.code);
    // text['p_after_h1'] = await translateText(text['p_after_h1'], language.code);
    text['rates_text'] = await translateText(text['rates_text'], language.code);
    text['rates_text_reverse'] = await translateText(text['rates_text_reverse'], language.code);

    let STATE = {
        date: `${year}-${month}-${day}`,
        text: text,
        language: language,
        languages: languages,
        currencies: currencies,
        country_code: country_code,
        currency_code: currency_code,
        currency_code_to: currency_code_to,
        currency_from: currency_from_obj,
        currency_to: currency_to_obj,
        rate: rate,
        historic: historic,
        minMax: minMax
    };
    const URL = `/${country_code}/currency/${currency_code}/${currency_code_to}/${year}-${month}-${day}`;    
    responseFn(URL, STATE, response);
}
