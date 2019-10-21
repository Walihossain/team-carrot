const puppeteer = require('puppeteer');
const browserPromise = require('./browser');
const fs = require('fs');
const preloadFile = fs.readFileSync(__dirname + '/preload.js', 'utf8');

const getProductContent = (siteUrl) => {
    let promise = new Promise(async(resolve, reject) => {
        const browser = await browserPromise.getInstance();
        console.log("SCRAPING URL", siteUrl);
        const page = await browser.newPage();
        await page.evaluateOnNewDocument(preloadFile);
        await page.goto(siteUrl, { timeout: 600000 });
        // await page.waitFor(Math.floor(Math.random() * 7) * 1000);
        await page.waitFor("#productTitle");
        const productTitle = await page.evaluate(() => {
            const ele = document.querySelector("#productTitle");
            if (!ele) {
                console.log(window.location.href, 'no name found');
                return '';
            }
            return ele.innerText;
        });
        let productPrice;
        let pictureURL = '';
        try {
            productPrice = await page.evaluate(() => {
                if (document.querySelector('#priceblock_dealprice') !== null) {
                    return document.querySelector('#priceblock_dealprice').innerText;
                } else if (document.querySelector('#priceblock_ourprice') !== null) {
                    return document.querySelector('#priceblock_ourprice').innerText;
                } else if (document.querySelector('#olp-new .a-color-price') != null) {
                    return document.querySelector('#olp-new .a-color-price').innerText;
                } else if (document.querySelector('#priceblock_saleprice') != null) {
                    return document.querySelector('#priceblock_saleprice').innerText;
                } else {
                    return '';
                }
            });

        } catch (err) {
            console.log(err);
        }
        try {
            pictureURL = await page.evaluate(() => {
                const ele = document.querySelector("#imgTagWrapperId img");
                if (!ele) {
                    console.log(window.location.href, 'no image found');
                    return '';
                }
                return ele.src;
            });;
        } catch (err) {
            console.log(err);
        }
        await page.close();
        // await browser.close();
        const product = {
            name: productTitle,
            prices: [{
                value: productPrice.replace(/^\D+/g, ''),
                date: new Date()
            }],
            pictureUrl: pictureURL
        };
        console.log(product);
        resolve(product);
    });
    return promise;
}


module.exports = {
    getProductContent: getProductContent
};