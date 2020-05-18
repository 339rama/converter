const Text = require('../models/Text');
const Language = require('../models/language');
const responseFn = require("./responseFn");

exports.main = async function(request, response){
    const STATE = { admin: true, text: {} };

    const URL = '/admin';
    responseFn(URL, STATE, response);
}

exports.text = async function(request, response){
    const client = request.app.locals.dbClient;
    const STATE = { admin: true, text: {} };
    STATE['language'] = await Language.getLanguage(request.app.locals.languages, request.params.language_code);
    STATE["texts"] = await Text.getTextsByLanguage(client, STATE["language"].code);
    delete STATE["texts"]._id;
    delete STATE["texts"].language;
    STATE["text"]["title"] = `Редактирование текстов ${STATE["language"].code}`;

    const URL = `/admin/texts/${STATE["language"]["code"]}`;
    responseFn(URL, STATE, response);
}

exports.textUpdate = async function(request, response){
    const client = request.app.locals.dbClient;
    if (request.method === "POST") {
        Text.update(client, request.params.language_code, request.body);
    }
    response.status(202).json({message:'Изменения сохранены'})
}

exports.allTexts = async function(request, response) {
    const client = request.app.locals.dbClient;
    const STATE = { admin: true, text: {} };
    STATE["languages"] = await Language.getAll(request.app.locals.languages);
    STATE["text"]["title"] =  'Выбор текстов языка';
    const URL = '/admin/texts/';
    responseFn(URL, STATE, response);
} 