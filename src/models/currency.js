const config = require('../config.js');
const mongooseConnect = require("./mongooseConnect");



const url = (config.is_debug === true) ? config.mongo_server.dev_url : config.mongo_server.prod_url;

module.exports = class Currency {

    constructor(_id, code, name, id=10, image='') {
        this._id = _id;
        this.code = code;
        this.name = name;
        this.id = id;
        this.image = image;
    }
    async save() {
        const client = await mongooseConnect(url);
        const collection = client.connection.collection("currencies");
        const new_currency = { _id: this._id, code: this.code, name: this.name, id: this.id, image: this.image };
        const exist = await collection.findOne({code: new_currency.code});
        if (exist){
            console.log(`${exist} already exist!`);
        } else {
            const new_ = await collection.insertOne(new_currency);
            console.log("NEW_:", new_.ops);
            client.disconnect();
            return new_.ops;
        }
    }

    async update(_code) {
        const client = await mongooseConnect(url);
        let updates = { code: this.code, name: this.name, id: this.id, image: this.image };
        const collection = await client.connection
            .collection("currencies")
            .findOneAndUpdate(
                { code: _code },
                { $set: updates },
                { returnOriginal: false });
        client.disconnect();
    }
    static async getCurrency(collection, currency_code) {
        return await collection.findOne({code: currency_code});
    }
    static async getCurrencyToLanguage(collection, language) {
        return await collection.findOne({ language: language });
    }
    static async getSeveral(collection, currency_codes) {
        return await collection.find({ code: { $in: currency_codes} }).toArray();
    }
    static async getAll(collection) {
        return await collection.find().toArray();
    }
}