const config = require('./config.js');
const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");
const Language = require("./models/language.js");
const mongooseConnect = require('./models/mongooseConnect')
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const compression = require('compression');


const app = express();
app.use(compression());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ extended: true }));

const url = (config.is_debug) ? config.mongo_server.dev_url : config.mongo_server.prod_url;
const PORT = process.env.PORT || config.PORT;



app.use("/", require("./routes/homeRouter.js"));

app.use("/auth", urlencodedParser, require("./routes/authRouter.js"));
app.use('/admin', urlencodedParser, require('./routes/adminRouter.js'));

app.param("country_code", async function (req, res, next, country_code) {
    app.locals.country_code = req.params.country_code;
    app.locals.language = await Language.getLanguage(req.app.locals.languages, country_code);
    app.locals.text = await Language.getText(app.locals.texts, country_code);
    next();
})

app.use("/:country_code([A-Za-z]{2})", urlencodedParser, require("./routes/countryRouter.js"));

app.use("/currency", require("./routes/currencyRouter.js"));

app.get("*", function (request, response) {
    response.status(404).send('Page not found');
});

// Cron Scheduler
const cron = require("node-cron");
cron.schedule("* */1 * * *", function () {
    require('./api/currencyConverter').updateRates();
});


async function start() {
    try {
        const client = await mongooseConnect(url);
        app.locals.dbClient = await client;
        app.locals.texts = await client.connection.collection('texts');        
        app.locals.languages = await client.connection.collection('languages');
        app.locals.collection = await client.connection.collection('currencies');
        app.listen(PORT, function () {
            console.log(`Сервер ожидает подключения ${PORT}...`);
        });
    } catch (error) {
        throw new Error('Проблемы с подключением к серверу', error);
    }
}
start();

process.on('SIGINT', () => {
    app.locals.dbClient.disconnect();
    process.exit();
});