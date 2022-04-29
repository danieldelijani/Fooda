// NEW
const axios = require('axios'); 
const webScrapingApiClient = require('webscrapingapi');
const cheerio = require('cheerio');

const client = new webScrapingApiClient("R0YDeuj4qe21H1q996Qgn03HBQ7utex8");


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
        // console.log("SUCCESS WOOHOO");
        // console.log(response);
        // console.log(response.response);
        // let html_file = Buffer.from(response.response.data, "utf-8");
        // fs.writeFileSync("test_html.html", html_file, {encoding: 'utf8',flag: 'w'});
        let html = response.response.data;
        
        const $ = cheerio.load(html);
        const list_of_items = $('.ProductPrice_productPrice__price__3-50j');
        let output = list_of_items.html();
        output = parseFloat(output.slice(1));
        console.log(output);
        return output;
    } else {
        console.log("API CALL ERROR");
        console.log(response.error);
    }
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
        'country': 'us',
        'wait_for': 7000,// 8000,
        // 'proxy_type': 'residential',
        'disable_stealth':1,
        'timeout': 10000
    }, {
        
    });
    if (response.success) {
        console.log("SUCCESS WOOHOO");
        // console.log(response);
        // console.log(response.response);
        // var fs = require('fs');
        // let html_file = Buffer.from(response.response.data, "utf-8");
        // fs.writeFileSync("test_html.html", html_file, {encoding: 'utf8',flag: 'w'});

        let html = response.response.data;
        
        const $ = cheerio.load(html);
        const list_of_items = $($('.h-padding-r-tiny'));
        let output = list_of_items.text();
        output = parseFloat(output.split("$")[1])
        console.log(output);
        return output;
    } else {
        console.log("API CALL ERROR");
        console.log(response.error);
    }
}

async function getUnimplementedPrices(names) {
    prices = []

    for (let i = 0; i < names.length; i++) {
        random_price = Math.floor(Math.random() * 1000) / 100;
        prices.push(random_price);
    }
    return prices
}

// getTraderJoesPrice("Milk");
// getTargetPrice("Turkey Bacon");

export {getTargetPrice, getTraderJoesPrice, getUnimplementedPrices};


// async function scrapeProductTarget(url) {
//     const puppeteer = require('puppeteer');
//     const browser = await puppeteer.launch({
//         headless:false
//     });
//     const page = await browser.newPage();
//     await page.goto(url);
//     await page.waitForSelector('.ProductCardImageWrapper-sc-5fgvkn-0');

//     const [el] = await page.$x('//*[@id="pageBodyContainer"]/div[1]/div/div[4]/div/div[1]/div[2]/div/section/div/div[1]/div/div/div[2]/div/div/div[2]/div/div[1]/div/span');
//     const price = await el.getProperty('textContent')
//     const rawTxt = await price.jsonValue();
//     priceInt = parseFloat(rawTxt.slice(1));
//     console.log(priceInt);
//     browser.close()
//     return priceInt;
// }

// async function getTargetPrice(name) {
//     url = convertTargetItemNameToUrl(name);
//     return scrapeProductTarget(url);
// }

// scrapeProductTarget("https://www.target.com/s?searchTerm=milk");

// multiple items

// async function getTargetPrices(names) {
//     // URL: array of strings
//     // Returns: an array of prices
//     urls = convertTargetItemNamesToUrls(names);
//     prices = [];
    
//     const browser = await puppeteer.launch({
//         headless:true
//     });
//     const page = await browser.newPage();

//     for (let i = 0; i < urls.length; i++) {
//         url = urls[i];
//         const promise = page.waitForNavigation({ waitUntil: 'networkidle2' });
//         await page.goto(url);
//         await promise;
//         const [el] = await page.$x('//*[@id="pageBodyContainer"]/div[1]/div/div[4]/div/div[1]/div[2]/div/section/div/div[1]/div/div/div[2]/div/div/div[2]/div/div[1]/div/span');
//         const price = await el.getProperty('textContent');
//         const rawTxt = await price.jsonValue();
//         priceInt = await parseFloat(rawTxt.slice(1));
//         await prices.push(priceInt);
//     }
//     browser.close()
//     console.log(prices)
//     return prices
// }

// TRADER JOES

// async function getTraderJoesPrices(names) {
//     // URL: array of strings
//     // Returns: an array of prices
//     urls = convertTraderJoesNamesToUrls(names);
//     prices = [];
    
//     const browser = await puppeteer.launch({
//         headless:true
//     });
//     const page = await browser.newPage();

//     for (let i = 0; i < urls.length; i++) {
//         url = urls[i];
//         const promise = page.waitForNavigation({ waitUntil: 'domcontentloaded' });
//         await page.goto(url);
//         await promise;
//         await page.waitForSelector('.Section_section__oNcdC');
//         const [el] = await page.$x('//*[@id="spa-root"]/div[1]/div[1]/div[2]/div[1]/div/div[2]/main/div/div/div/div[1]/ul/li/div/article[1]/div/div/div/span[1]');
//         const price = await el.getProperty('textContent')
//         const rawTxt = await price.jsonValue();
//         priceInt = await parseFloat(rawTxt.slice(1));
//         await prices.push(priceInt);
//     }
//     browser.close();
//     console.log(prices);
//     return prices;
// }

// console.log(convertTraderJoesNamesToUrls(["Orange Juice", "Turkey Bacon", "Water"]));
// getTargetPrices(["Orange Juice", "Turkey Bacon", "Milk"])
// getTraderJoesPrices(["Orange Juice", "Turkey Bacon", "Milk", "Salmon"]);
// console.log(getUnimplementedPrices(["Orange Juice", "Turkey Bacon", "Milk", "Salmon"]))

// export {getTargetPrices, getTraderJoesPrices, getUnimplementedPrices};

// export {getTraderJoesPrice, getUnimplementedPrices};

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