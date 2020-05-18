const config =  {
  PORT: 5000,
  is_debug: false,
  jwt_secret: "339rama",
  mongo_server: {
    dev_url: "mongodb://localhost:27017/",
    prod_url:
      "mongodb+srv://Currency_converter:Climber63@converter-imadp.mongodb.net/currenciesdb?retryWrites=true&w=majority",
    username: "Currency_converter",
    password: "Climber63",
  },
  YANDEX: {
    TRANSLATE_API_KEY:
      "trnsl.1.1.20200215T150230Z.fdf0eafe808fa171.3907a8b503814fb45a2da63aa14f9cdc23058795",
    TRANSLATE_API_URL:
      "https://translate.yandex.net/api/v1.5/tr.json/translate",
  },
  CONVERTER_RAPID_API: {
    KEY: "cab84dd7bdmshe24bdbf20a938a4p131f8bjsn4e2ad0a858c8",
    CURRENCY_URL: "https://currency-converter5.p.rapidapi.com/currency/convert",
    HISTORICAL_URL:
      "https://currency-converter5.p.rapidapi.com/currency/historical/",
    LIST_URL: "https://currency-converter5.p.rapidapi.com/currency/list",
  },
};


module.exports = config;