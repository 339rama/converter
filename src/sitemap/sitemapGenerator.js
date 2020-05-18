const Language = require("../models/language");
const Currency = require("../models/currency");
const Rate = require("../models/Rate");
const mongooseConnect = require("../models/mongooseConnect");
const config = require("../config");
const fs = require("fs");
const path = require("path");

let xmlStartFile = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

function makeNewDateObj() {
  let options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date().toLocaleDateString(undefined, options);
}
async function collectionArray(client, collectionName){
  return await client.connection.collection(collectionName).find().toArray();
}
function urlSet(url, changefreq, lastMod, priority = 0.5) {
  return `<url>\n
    <loc>https://wm-ex.com/${url}</loc>\n
    <lastmod>${lastMod}</lastmod>\n
    <changefreq>${changefreq}</changefreq>\n
    <priority>${priority}</priority>\n
    </url>\n`;
}
function sitemapSet(lngCode) {
  return `<sitemap>\n
    <loc>https://wm-ex.com/sitemap/sitemap-${lngCode}.xml</loc>\n
    </sitemap>\n`;
}

async function generateSitemap() {
  const client = await mongooseConnect(config.mongo_server.prod_url);
  let languages = await collectionArray(client, 'languages');
  let currencies = await collectionArray(client, "currencies");
  let allRates = await collectionArray(client, "historical_rates");

  let langCodes = languages.map((language) => language["code"]);
  let currenciesCodes = currencies.map((currency) => currency["code"]);
  let allDates = allRates.map((rate) => rate["date"]);
  let amounts = [
    1,
    5,
    10,
    20,
    50,
    100,
    500,
    1000,
    5000,
    100000,
    500000,
    1000000,
  ];
  console.log(path.resolve(__dirname));

  langCodes.forEach((code) => {
    // fs.appendFileSync(`${__dirname}/sitemap.xml`, sitemapSet(code));
    let langStream = fs.createWriteStream(`${__dirname}/sitemap-${code}.xml`, {flags: 'a'});
    langStream.write(xmlStartFile);

    langStream.write(urlSet(code, "daily", "2020-04-10", "0.8"));

    langStream.write(urlSet(`${code}/currency`, "monthly", "2020-04-10", "0.7"));

    currenciesCodes.forEach(currencyCode => {
      langStream.write(urlSet(`${code}/currency/${currencyCode}`, "daily", "2020-04-10", "0.8"));

      currenciesCodes.forEach(codeTo => {
        langStream.write(urlSet(`${code}/currency/${currencyCode}/${codeTo}`,"daily","2020-04-10","0.8"));
      });
    });

    langStream.write('</urlset>');
    langStream.end();
  });

  await client.disconnect();
}

generateSitemap();
