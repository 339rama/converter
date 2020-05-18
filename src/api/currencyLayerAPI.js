const axios = require('axios');

const LAYER_API_KEY = '272d65b93913a45cea3b6b377059fe01';

function log(toshow) {
    return console.log(toshow);
}

const getExchangeRate = async (fromCurrency, toCurrency) => {
    try {
        const response = await axios.get('http://www.apilayer.net/api/live?access_key='+LAYER_API_KEY);
        
        const rate = response.data.quotes;

        const baseCurrency = response.data.source;

        const usd = 1 / rate[`${baseCurrency}${fromCurrency}`];

        const exchangeRate = usd * rate[`${baseCurrency}${toCurrency}`];
        log(exchangeRate);
        return exchangeRate;
    } catch (error) {
        throw new Error(`Невозможно получить курс валют по ${fromCurrency} и ${toCurrency}`);
    }
};

const getCountries = async (currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);

        return response.data.map(country => country.name);
    } catch (error) {
        throw new Error(`Невозможно загрузить страны, которые используют ${currencyCode}`);
    };
};

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    const countries  = await getCountries(toCurrency);
    const convertedAmount = (amount * exchangeRate).toFixed(2);

    return `${amount} ${fromCurrency} равно ${convertedAmount} ${toCurrency}. Принимают в ${countries}`;
};

const getHistoicalRates = async (date) => {
    try {
        const response = await axios.get(`http://api.currencylayer.com/historical?access_key=${LAYER_API_KEY}&date=${date}`);
        let rates = {'USD': 1};
        Object.keys(response.data.quotes).forEach(rate=>rates[rate.replace("USD", "")] = response.data.quotes[rate]);
        return rates;
    } catch (error) {
        throw new Error('Layer API error (in getHistoricalRates)', error);
    }
};


// getHistoicalRates('2020-04-10').then(mes => console.log(mes)).catch(e=>console.log(e));

// convertCurrency('EUR', 'USD', 20)
//     .then((message) => {
//         console.log(message);
//     }).catch((error) => {
//         console.log(error.message);
//     });


module.exports.convertCurrency = convertCurrency;
module.exports.layerHistoricalRates = getHistoicalRates;