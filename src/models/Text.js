const config = require("../config.js");
const mongooseConnect = require("./mongooseConnect");

const url = config.mongo_server.prod_url

module.exports = class Text {

    static async update(client, language, updates){
        const updated = await client.connection
            .collection("texts")
            .updateOne({ language: language }, { $set: updates });
        return null;
    }

    static async getTextsByLanguage(client, language){
        const languageTexts = await client.connection.collection('texts').findOne({language: language});
        return languageTexts;
    }
}