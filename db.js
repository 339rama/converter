const config_json = require('./src/config.json');
const config = config_json[0];
const MongoClient = require("mongodb").MongoClient;
const fs = require("fs");
const converter = require("./src/api/currency-rapid_api.js");
const SEO_text = require("./text.json");
const translator = require("./src/api/translator.js");
const mongoose = require("mongoose");


const url = (config.is_debug) ? config.mongo_server.dev_url : config.mongo_server.prod_url;
// const url = "mongodb://localhost:27017/";

async function mongoseConnect(url) {
  return await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}


const mongoClient = new MongoClient(url, { useUnifiedTopology: true });

mongoClient.connect(function (err, client) {

    const db = client.db("currenciesdb");
    const collection = db.collection("currencies");

    // let currencies = fs.readFileSync("currencies.json", "utf8");
    // currencies = JSON.parse(currencies);


    // async function InsertInDB() {
    //     let arr = new Array();
    //     let list = await converter.getCurrencyList();
    //     let i = 1;
    //     for (el in list) {
    //         arr.push({'_id': el.toLowerCase(), id: i, code: el, name: list[el], image: `/currencies/${el}.svg`});
    //         i+=1;
    //     }
    //     console.log(arr);
    //     collection.insertMany(arr, function (err, results) {
    //         console.log(results);
    //         client.close();
    //     });
    // }

    // // InsertInDB();


    let lng = [
        { code: 'ru', name: 'Russian' },
        { code: 'de', name: 'German' },
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'fr', name: 'French' },
        { code: 'hi', name: 'Hindi' },
        { code: 'ja', name: 'Japanese' },
        { code: 'id', name: 'Indonesian' },
        { code: 'zh', name: 'Chinese' }
    ]

    let _lng = [];
    lng.concat().map((el)=>{
        el._id = el.code;
        el.image = `/languages/${el.code}.svg`;
        _lng.push(el);
        console.log(el);
    })
    console.log(_lng);
    
    // async function InsertLNG(arr) {
    //     client.db("currenciesdb").collection("languages").insertMany(arr, function (err, results) {
    //         console.log(results);
    //         client.close();
    //     });
    // }

    // // InsertLNG(_lng);

    async function prepareText(textsJSON) {
        let arr = [];
        for (let el of Object.keys(_lng)){
                console.log(_lng[el].code);
                let obj = {};
                obj['language'] = _lng[el].code;
                for (let key of Object.keys(textsJSON) ){
                    if (typeof textsJSON[key] === 'object'){
                        let inner = {};
                        for (let k of Object.keys(textsJSON[key]) ){
                            // inner[k] = textsJSON[key][k];
                            inner[k] = await translator.translateText(textsJSON[key][k], _lng[el].code);
                        }
                        obj[key] = inner;
                    } else {
                        // obj[key] = textsJSON[key];
                        obj[key] = await translator.translateText(textsJSON[key], _lng[el].code);
                    }
                }
                arr.push(obj);
        }
        console.log(arr);

        return arr;
    }

    let texts = prepareText(SEO_text[0]);

    console.log(texts);

    async function InsertTextInDB(arr) {
        let texts = await prepareText(arr)
        client.db("currenciesdb").collection("texts").insertMany(texts, function (err, results) {
            console.log(results);
            client.close();
        });
    }
    InsertTextInDB(SEO_text[0]);

    // async function InsertHistoricalRates(rates) {
    //     client.db("currenciesdb").collection("historical_rates").insertMany(rates, function (err, results) {
    //         console.log(results);
    //         client.close();
    //     });
    // }
    // const rates_json = require("./rates.json"); 
    // InsertHistoricalRates(rates_json);
    
    // let currency = { code: "USD", name: "Доллар США" };
    // collection.insertMany(currencies, function (err, result) {
        
    //     if (err) {
    //         return console.log(err);
    //     }
    //     console.log(result.ops);
    //     client.close();
    // });

    // collection.find().toArray(function (err, results) {
    //     function compareNumbers(a, b) {
    //         return a.id - b.id;
    //     }
    //     console.log(typeof (Array.from(results)), Array.from(results));
    //     let arr = Array.from(results);
    //     arr.sort(function(a, b) {
    //         return a.id - b.id;
    //     });
    //     console.log(arr);
    //     // for (let item in results){
    //     //     console.log(results[item].code);
    //     // }
    //     client.close();
    // });

    // let res = collection.findOne({ code: "CNY" }, function (err, doc) {
    //     console.log(doc);
    //     client.close();
    // });
    // let res = collection.findOne({ code: "CNY" });
    // (async () =>{
    //     await res();
    // });
    
    // collection.drop(function (err, result) {

    //     console.log(result);
    //     client.close();
    // });
});