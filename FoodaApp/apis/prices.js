const webScrapingApiClient = require('webscrapingapi');
const cheerio = require('cheerio');

const client = new webScrapingApiClient("R0YDeuj4qe21H1q996Qgn03HBQ7utex8");

// TRADER JOES

function convertTraderJoesNameToUrl(name) {
    baseURL = "https://www.traderjoes.com/home/search?q=";
    nameString = name.replace(" ", "+");
    afterURL = "&section=products&global=no";
    return baseURL + nameString + afterURL;
}

function convertTraderJoesNamesToUrls(names) {
    return names.map(convertTraderJoesNameToUrl);
}

async function getTraderJoesPrice(productName) {
    let url = convertTraderJoesNameToUrl(productName);
    console.log(url);

    let response = await client.get(url, {
        'render_js': 1,
        'wait_until': 'domcontentloaded',
        'wait_for_css': '.Section_section__oNcdC'
    }, {
    });
    if (response.success) {
        let html = response.response.data;

        const $ = cheerio.load(html);
        const list_of_items = $('.ProductPrice_productPrice__price__3-50j');
        let output = list_of_items.html();
        output = parseFloat(output.slice(1));
        console.log(output);
        if (isNaN(output)) {
            return 2.99;
        }
        return output;
    } else {
        console.log("API CALL ERROR");
        console.log(response.error);
    }
}

async function getTraderJoesPrices(productNames) {
    console.log("Calling trader joes prices...");
    let promises = await Promise.all(productNames.map(getTraderJoesPrice));
    console.log(promises);
    for (var i = 0; i < promises.length; i++) {
        if (!promises[i]) {
            promises[i] = 3.99;
        }
    }
    console.log(promises);
    return promises;
}

// TARGET

function convertTargetItemNameToUrl(name) {
    // URL: name of a product
    // Returns: url for the product for Target.com 
    nameString = name.replace(" ", "+");
    baseURL = "https://www.target.com/s?searchTerm=";
    return baseURL + nameString;
}

function convertTargetItemNamesToUrls(names) {
    return names.map(convertTargetItemNameToUrl);
}

async function getTargetPrice(productName) {
    let url = convertTargetItemNameToUrl(productName);
    console.log("URL:")
    console.log(url);
    let wait_for = '.ProductCardImageWrapper-sc-5fgvkn-0';// '.ProductCardImageWrapper-sc-5fgvkn-0';

    let response = await client.get(url, {
        'render_js': 1,
        'wait_until': 'domcontentloaded',
        // 'wait_for_css': wait_for,
        // 'country': 'us',
        'wait_for': 15000,// 8000,
        // 'proxy_type': 'residential',
        'disable_stealth': 1,
        'timeout': 20000
    }, {

    });
    if (response.success) {
        console.log("SUCCESS WOOHOO");
        let html = response.response.data;

        const $ = cheerio.load(html);
        const list_of_items = $($('.h-padding-r-tiny'));
        let output = list_of_items.text();
        output = parseFloat(output.split("$")[1])
        console.log(output);
        if (isNaN(output)) {
            return 2.99;
        }
        return output;
    } else {
        console.log("API CALL ERROR");
        console.log(response.error);
    }
}

async function getTargetPrices(productNames) {
    console.log("Calling target prices...");
    let promises = await Promise.all(productNames.map(getTargetPrice));
    console.log(promises);
    for (var i = 0; i < promises.length; i++) {
        if (!promises[i]) {
            promises[i] = 3.99;
        }
    }
    return promises;
}

async function getUnimplementedPrices(names) {
    console.log("Calling unimplented prices...");
    prices = []

    for (let i = 0; i < names.length; i++) {
        let random_price = Math.floor(Math.random() * 1000) / 100;
        prices.push(random_price);
    }
    return prices
}


export { getTargetPrices, getTraderJoesPrices, getUnimplementedPrices };