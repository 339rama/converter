const config = require("../config.js");
const mongooseConnect = require("./mongooseConnect");

const url =
  config.is_debug === true
    ? config.mongo_server.dev_url
    : config.mongo_server.prod_url;

module.exports = class Rate {
  constructor(id, year, month, day, rates) {
    (this.id = id),
      (this.year = year),
      (this.month = month),
      (this.day = day),
      (this.rates = rates);
  }
  async save() {
    const client = await mongooseConnect(url);
    const new_historic_rate = {
      id: this.id.toString(),
      year: this.year.toString(),
      month: this.month.toString(),
      day: this.day.toString(),
      rates: this.rates,
    };
    const collection = await client.connection
      .collection("historical_rates")
      .insertOne(new_historic_rate);
  }

  static async update(date, rates) {
    const client = await mongooseConnect(url);
    try {
      let setPh = {};
      for (let key in rates) {
        let ratePh = "rates." + key;
        setPh[ratePh] = rates[key];
      }
      const collection = await client.connection
        .collection("historical_rates")
        .updateOne({ id: date }, { $set: setPh });
    } catch (error) {
      throw new Error("Update Error", error);
    }
  }

  static async getRateByDate(client, date) {
    const rate = await client.connection
      .collection("historical_rates")
      .findOne({ id: date });
    return rate;
  }

  static async getAllRates(client, from, to, date = "") {
    let rates = await client.connection
      .collection("historical_rates")
      .find({}, { fields: { _id: 0, id: 1, rates: 1 } })
      .toArray();

    if (date) {
      const moment = require("moment");
      moment.defaultFormat = "YYYY-MM-DD";

      function diffDates(day_one, day_two, diffNumber = 1) {
        [day_one, day_two] = [moment(day_one), moment(day_two)];
        let result = day_one.diff(day_two, "years", true);
        return result >= 0 && result <= diffNumber;
      }
      
      let [year, month, day] = date.split("-");
      month = month === "00" ? "01" : month;
      day = day === "00" ? "01" : day;
      rates = rates.filter((rate) =>
        diffDates(`${year}-${month}-${day}`, rate["id"], 1)
      );
    }

    let result = {};
    rates.forEach(
      (rate) => (result[rate["id"]] = (1 / rate.rates[from]) * rate.rates[to])
    );
    return result;
  }

  static async getMinMax(client, from, to, date){
    let allRates = await this.getAllRates(client, from, to);
    const [YEAR, MONTH, DAY] = date.split('-');

    const yearRates = Object.keys(allRates).filter(key => {
        return key.indexOf(YEAR) !== -1;
    });
    const yearMonthsRates = {};
    yearRates.forEach(key => {
        let [year, month, day] = key.split('-');
        yearMonthsRates[`${year}-${month}`] = {min: '', max: ''};
    });
    Object.keys(yearMonthsRates).forEach(key=>{
        let monthsRate = [];
        yearRates.forEach(date => {
            if(date.indexOf(key) !== -1){
                monthsRate.push(allRates[date]);
            }
        });
        let min = Math.min(...monthsRate).toFixed(4);
        let max = Math.max(...monthsRate).toFixed(4);
        yearMonthsRates[key]['min'] = min;
        yearMonthsRates[key]["max"] = max;
    });

    let yearsRates = {};
    Object.keys(allRates).forEach(key=>{
        let [y, m, d] = key.split('-');
        yearsRates[y] = {min: '', max: ''}
    });
    Object.keys(yearsRates).forEach(key=>{
        let yR = []
        Object.keys(allRates).forEach(date=>{
            if(date.indexOf(key) !== -1){
                yR.push(allRates[date]);
            }
        })
        let min = Math.min(...yR).toFixed(4);
        let max = Math.max(...yR).toFixed(4);
        yearsRates[key]["min"] = min;
        yearsRates[key]["max"] = max;
    })

    return {
      yearsRates: yearsRates,
      yearMonthsRates: yearMonthsRates
    }

  }
};
