const config = require('../config.js');
const axios = require('axios');

const RAPID_API_KEY = config.CONVERTER_RAPID_API.KEY;
let currency_url = config.CONVERTER_RAPID_API.CURRENCY_URL;
let historical_url = config.CONVERTER_RAPID_API.HISTORICAL_URL;
let list_url = config.CONVERTER_RAPID_API.LIST_URL;

async function makeSingleRequest(to, amount, date) {
    let url = date === "" ? currency_url : historical_url + date;
    const params = {
        "format": "json",
            "from": "USD",
            "to": to,
            "amount": Number(amount)
    }
    try {
        const response = await axios({
            "method": "GET",
            "url": url,
            "headers": {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
            "x-rapidapi-key": RAPID_API_KEY
            },
            "params": params
        });        
        return response.data.rates[to].rate;
    } catch (error) {
        throw new Error('Rapid API ERROR ( in makeSingleRequest', error);
    }

}

const getCurrencyList = async () => {
    try {
        const response = await axios({
            "method": "GET",
            "url": list_url,
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
                "x-rapidapi-key": RAPID_API_KEY
            },
            "params": {
                "format": "json"
            }
        });
        return response.data.currencies;
    } catch (error){
        throw new Error("Can't get currencies list");
    }
};

const getCurrenciesRates = async () => {
    try {
        const response = await axios({
            "method": "GET",
            "url": "https://currency-value.p.rapidapi.com/global/currency_rates",
            "headers": {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "currency-value.p.rapidapi.com",
                "x-rapidapi-key": "cab84dd7bdmshe24bdbf20a938a4p131f8bjsn4e2ad0a858c8"
            }
        });
        let rates = {};
        Object.keys(response.data.currency_rates).forEach(key=>{
            rates[key] = (1 / response.data.currency_rates[key]).toFixed(6);
        });
        return rates;
    } catch (error) {
        throw new Error("Rapid API error (in getCurrenciesRates)", error);
    }
};

// getCurrenciesRates()
//     .then(data => log(data))
//     .catch(error => log(error));

module.exports.makeSingleRequest = makeSingleRequest;
module.exports.getCurrenciesRates = getCurrenciesRates;
module.exports.getCurrencyList = getCurrencyList;
module.exports.getCurrencyAnother = getCurrenciesRates;

