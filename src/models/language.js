const config = require('../config.js');

// const url = (config.is_debug === true) ? config.mongo_server.dev_url : config.mongo_server.prod_url;
const url = config.mongo_server.dev_url;

module.exports = class Language {

    constructor(code, name, id = 10) {
        this.code = code;
        this.name = name;
        this.id = id;
    }

    static async getLanguage(collection, language_code) {
        return await collection.findOne({ code: language_code });
    }

    static async getText(collection, language_code) {
        return await collection.findOne({ language: language_code });
    }

    static async getAll(collection) {
        return await collection.find().toArray();
    }
}