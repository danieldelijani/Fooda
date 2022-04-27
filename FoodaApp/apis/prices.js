// NEW
const axios = require('axios'); 

// async function callAxios() {
//     const res = await axios.get("https://www.target.com/s?searchTerm=milk");
//     console.log("DATA");
//     console.log(res.data);
// }

// const getArticlesFromApi = async () => {
//     try {
//       let response = await fetch(
//         'https://www.target.com/s?searchTerm=milk'
//       );
//       let data = await response.data;
//       console.log(data);
//     } catch (error) {
//        console.error(error);
//     }
//   };
  

// const res = await axios.get('https://api.webscrapingapi.com/v1', { params: { answer: 42 } });


// async function useAPI() {
//     const searchParams = {
//         api_key: 'R0YDeuj4qe21H1q996Qgn03HBQ7utex8',
//         url: 'https://www.target.com/s?searchTerm=milk'
//       };
//     const res = await axios.get('https://api.webscrapingapi.com/v1', searchParams);
//     console.log(res.data)
// }

const webScrapingApiClient = require('webscrapingapi');

const client = new webScrapingApiClient("R0YDeuj4qe21H1q996Qgn03HBQ7utex8");
// const xpath = require("xpath-html");
// var fs = require('fs');
const cheerio = require('cheerio');

async function getWebPageTraderJoes(productName) {
    let url = convertTraderJoesNameToUrl(productName);
    // url = "https://www.traderjoes.com/home/search?q=milk&section=products&global=no";

    let response = await client.get(url, {
        'render_js': 1,
        'wait_until': 'domcontentloaded',
        'wait_for_css': '.Section_section__oNcdC',
        // 'wait_for': 6000
        // 'device': 'desktop'
    }, {
        // API Headers
        // 'authorization': 'bearer test',
        // Specify custom cookies to be passed to the request.
        // 'cookie': 'test_cookie=abc; cookie_2=def'
    });
    if (response.success) {
        console.log("SUCCESS WOOHOO");
        // console.log(response.response);
        // let html_file = Buffer.from(response.response.data, "utf-8");
        // fs.writeFileSync("test_html.html", html_file, {encoding: 'utf8',flag: 'w'});
        let html = response.response.data;
        
        const $ = cheerio.load(html);
        const list_of_items = $('.ProductPrice_productPrice__price__3-50j');
        let output = list_of_items.html();
        output = parseFloat(output.slice(1));
        console.log(output);
        
        // const node = xpath.fromPageSource(html).findElement('//*[@id="spa-root"]/div[1]/div[1]/div[2]/div[1]/div/div[2]/main/div/div/div/div[1]/ul/li/div/article[1]/div/div/div/span[1]');
        // console.log(node);
        // console.log(node.getTagName());
        // console.log(node.getText());
        return response.response;
    } else {
        console.log("API CALL ERROR");
        console.log(response.error);
    }
}

getWebPageTraderJoes("Turkey Bacon");

// OLD

// const puppeteer = require('puppeteer')

// TARGET


// single item

function convertTargetItemNameToUrl(name) {
    // URL: name of a product
    // Returns: url for the product for Target.com 
    nameString = name.replace(" ", "+");
    baseURL = "https://www.target.com/s?searchTerm=";
    return baseURL + nameString;
}

async function scrapeProductTarget(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="pageBodyContainer"]/div[1]/div/div[4]/div/div[1]/div[2]/div/section/div/div[1]/div/div/div[2]/div/div/div[2]/div/div[1]/div/span');
    const price = await el.getProperty('textContent')
    const rawTxt = await price.jsonValue();
    priceInt = parseFloat(rawTxt.slice(1));
    console.log(priceInt);
    browser.close()
    return priceInt;
}

async function getTargetPrice(name) {
    url = convertTargetItemNameToUrl(name);
    return scrapeProductTarget(url);
}

// multiple items

function convertTargetItemNamesToUrls(names) {
    return names.map(convertTargetItemNameToUrl);
}

async function getTargetPrices(names) {
    // URL: array of strings
    // Returns: an array of prices
    urls = convertTargetItemNamesToUrls(names);
    prices = [];
    
    const browser = await puppeteer.launch({
        headless:true
    });
    const page = await browser.newPage();

    for (let i = 0; i < urls.length; i++) {
        url = urls[i];
        const promise = page.waitForNavigation({ waitUntil: 'networkidle2' });
        await page.goto(url);
        await promise;
        const [el] = await page.$x('//*[@id="pageBodyContainer"]/div[1]/div/div[4]/div/div[1]/div[2]/div/section/div/div[1]/div/div/div[2]/div/div/div[2]/div/div[1]/div/span');
        const price = await el.getProperty('textContent');
        const rawTxt = await price.jsonValue();
        priceInt = await parseFloat(rawTxt.slice(1));
        await prices.push(priceInt);
    }
    browser.close()
    console.log(prices)
    return prices
}

// TRADER JOES


// Single Item

function convertTraderJoesNameToUrl(name) {
    baseURL = "https://www.traderjoes.com/home/search?q=";
    nameString = name.replace(" ", "+");
    afterURL = "&section=products&global=no";
    return baseURL + nameString + afterURL;
}

// Multiple Items

function convertTraderJoesNamesToUrls(names) {
    return names.map(convertTraderJoesNameToUrl);
}

async function getTraderJoesPrices(names) {
    // URL: array of strings
    // Returns: an array of prices
    urls = convertTraderJoesNamesToUrls(names);
    prices = [];
    
    const browser = await puppeteer.launch({
        headless:true
    });
    const page = await browser.newPage();

    for (let i = 0; i < urls.length; i++) {
        url = urls[i];
        const promise = page.waitForNavigation({ waitUntil: 'domcontentloaded' });
        await page.goto(url);
        await promise;
        await page.waitForSelector('.Section_section__oNcdC');
        const [el] = await page.$x('//*[@id="spa-root"]/div[1]/div[1]/div[2]/div[1]/div/div[2]/main/div/div/div/div[1]/ul/li/div/article[1]/div/div/div/span[1]');
        const price = await el.getProperty('textContent')
        const rawTxt = await price.jsonValue();
        priceInt = await parseFloat(rawTxt.slice(1));
        await prices.push(priceInt);
    }
    browser.close();
    console.log(prices);
    return prices;
}

// RANDOM, FOR CONSISTENCY

async function getUnimplementedPrices(names) {
    prices = []

    for (let i = 0; i < names.length; i++) {
        random_price = Math.floor(Math.random() * 1000) / 100;
        prices.push(random_price);
    }
    console.log(prices);
    return prices
}

// console.log(convertTraderJoesNamesToUrls(["Orange Juice", "Turkey Bacon", "Water"]));
// getTargetPrices(["Orange Juice", "Turkey Bacon", "Milk"])
// getTraderJoesPrices(["Orange Juice", "Turkey Bacon", "Milk", "Salmon"]);
// console.log(getUnimplementedPrices(["Orange Juice", "Turkey Bacon", "Milk", "Salmon"]))

// export {getTargetPrices, getTraderJoesPrices, getUnimplementedPrices};

export {getWebPageTraderJoes, getUnimplementedPrices};