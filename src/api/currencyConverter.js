const config = require("../config.js");
const Rate = require("../models/Rate");
const { layerHistoricalRates } = require("./currencyLayerAPI");
const {makeSingleRequest, getCurrenciesRates} = require('./currencyRapidAPI');


//Format Date functions
function formatDateObj(date) {
  let dateToWrite = date;
  let [year, month, day] = date.split("-");
  return { dateToWrite, year, month, day };
}
function makeNewDateObj() {
  let options = { year: "numeric", month: "2-digit", day: "2-digit" };
  let dateToWrite = new Date().toLocaleDateString(undefined, options);
  let [year, month, day] = dateToWrite.split("-");
  return { dateToWrite, year, month, day };
}

const getCurrencyRate = async (dbClient, fromCurrency, toCurrency, amount = 1, date = "") => {
    // Placeholder for debug mode
    if (config.is_debug) {
        return require("./placeholder").debugPlaceholder;
    }
    let { dateToWrite: dateForSearch } = (date==='') ? makeNewDateObj() : formatDateObj(date);
    console.log('DATE FOR SEARCH: ', dateForSearch);
    
    const rateFromDB = await Rate.getRateByDate(dbClient, dateForSearch);
    console.log('rateFromDB:', rateFromDB ? 'Ok!' : rateFromDB);
    
    if (rateFromDB){
        let rateObj = prepareResponseObj(rateFromDB.rates[fromCurrency], rateFromDB.rates[toCurrency], amount, rateFromDB.rates);

        if (!rateObj.rate || rateObj.rate === Infinity){
            return await updateRate(fromCurrency, toCurrency, amount, date);
        }        
        return rateObj;
    }

    console.log('NEW RATE');
    return await createNewRate(fromCurrency, toCurrency, amount, date);
};

async function createNewRate(from, to, amount, date) {
  let rates;
  let rate_from;
  let rate_to;

  try {
    if (date) {
      rates = await layerHistoricalRates(date);
    } else {
      rates = await getCurrenciesRates();
    }
    rate_from = rates[from];
    rate_to = rates[to];

    const { dateToWrite, year, month, day } = date === "" ? makeNewDateObj() : formatDateObj(date);
    let newRate = new Rate(dateToWrite, year, month, day, rates);
    await newRate.save();
  } catch (error) {
    console.log("ERROR in createNewRate", error);
    rates = require("./placeholder").placeholder;
    rates[from] = await makeSingleRequest(from, amount, date);
    rates[to] = await makeSingleRequest(to, amount, date);
  } finally {
    return prepareResponseObj(rates[from], rates[to], amount, rates);
  }
}

async function updateRate(from, to, amount, date) {
  try {
    const { dateToWrite } = date === "" ? makeNewDateObj() : formatDateObj(date);
    const rates = {};
    rates[from] = await makeSingleRequest(from, amount, date);
    rates[to] = await makeSingleRequest(to, amount, date);
    await Rate.update(dateToWrite, rates);
    return prepareResponseObj(rates[from], rates[to], amount, rates);
  } catch (error) {
    throw new Error(`${from} - ${to} - ${amount} Something Wrong`, error);
  }
}

function prepareResponseObj(rate_from, rate_to, amount, rates) {
  let rate = ((1 / rate_from) * rate_to).toFixed(6);
  return {
    rate: rate,
    rate_for_amount: rate * amount,
    amount: amount,
    rates: rates,
  };
};

async function updateRates(){
  try {
    let rates = await getCurrenciesRates();
    let { dateToWrite, year, month, day } = makeNewDateObj();
    let newRate = new Rate(dateToWrite, year, month, day, rates);
    await newRate.save();
    return true;
  } catch (error) {
    return error;
  }
}

// getCurrencyRate('USD', 'RUB', '10', "")
// .then(resp => log(resp))
// .catch(error => log(error));


module.exports.getCurrencyRate = getCurrencyRate;
module.exports.updateRates = updateRates;

