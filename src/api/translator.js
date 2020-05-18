const config = require('../config.js');
const axios = require('axios');
const YANDEX_API_KEY = config.YANDEX.TRANSLATE_API_KEY;
const YANDEX_API_URL = config.YANDEX.TRANSLATE_API_URL;

const translateText = async (text, to = 'en') => {
    if (config.is_debug){
        return text;
    }
    try {
        const response = await axios({
            'method': 'GET',
            'url': YANDEX_API_URL,
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            'params': {
                'key': YANDEX_API_KEY,
                'text': text,
                'lang': `en-${to}`,
                'format': 'plain'
            }
        });

        return response.data.text[0];
    } catch (err) {
        return text;
    }
};


const getLngList = async (lng='en') => {
    try {
        const response = await axios({
            'method': 'GET',
            'url': 'https://translate.yandex.net/api/v1.5/tr.json/getLangs',
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            'params': {
                'key': YANDEX_API_KEY,
                'ui': lng
            }
        });

        return response;
    } catch (error) {
        throw new Error(err);
    }
}

// translateText('`${amount} ${currency_code} to ${currency_code_to} rate = ${rate_for_amount} ${currency_to_obj.name}s`', 'ru')
//     .then(response => console.log(response))
//     .catch(error => log(error));

// getLngList('en')
//     .then(response => console.log(response))
//     .catch(error => log(error));


module.exports.translateText = translateText;