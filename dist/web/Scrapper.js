import puppeteer from "puppeteer";
import { GlobalColors } from "../utils/Colors.js";
export class Scrapper {
    static instance;
    page;
    constructor() {
        this.start();
    }
    static getInstance() {
        if (this.instance)
            return this.instance;
        this.instance = new Scrapper();
        return this.instance;
    }
    async start() {
        const browser = await puppeteer.launch();
        this.page = await browser.newPage();
    }
    async random() {
        // 1. Request to the url below that redirect to random article 
        await this.page.goto("https://fr.wikipedia.org/wiki/Sp%C3%A9cial:Page_au_hasard", { waitUntil: "domcontentloaded" });
        // 2. Get h1 and multiple p elements, then extract them text 
        const h1El = await this.page.$("#firstHeading");
        const h1 = await (await h1El.getProperty('textContent')).jsonValue();
        const p1El = await this.page.$$("#mw-content-text > div > p");
        let p;
        // 3. Control if the p isn't empty and return formatted string
        for (const el of p1El) {
            const text = await (await el.getProperty("textContent")).jsonValue();
            if (text.trim() !== "") {
                p = text;
                break;
            }
        }
        const result = `Title : ${h1}\nShort Description : ${p.slice(0, 75)}...\n\nSee the article : ${this.page.url()}`;
        return result;
    }
    async categories() {
        // 1. Open page 'Categorie' and get categories' ancre
        await this.page.goto("https://fr.wikipedia.org/wiki/Cat%C3%A9gorie:Accueil");
        const categoriesElements = await this.page.$$("#mw-content-text > div > div:nth-child(3) b > a");
        // 2. Extract each name and url and format them in string 
        const categories = categoriesElements.map(async (el) => {
            const categoryName = await (await el.getProperty("textContent")).jsonValue();
            const url = await (await el.getProperty("href")).jsonValue();
            return `${GlobalColors.Yellow}Category : ${GlobalColors.White}${categoryName}\n${GlobalColors.Green}See the page : ${GlobalColors.White}${GlobalColors.Underscore}${url}${GlobalColors.Reset}`;
        });
        // 3. Return string that contain all category previously formated
        const result = await Promise.all(categories);
        return result.join("\n\n");
    }
    async research(search) {
        await this.page.goto("https://fr.wikipedia.org/wiki/Sp%C3%A9cial:Recherche");
        await this.page.$eval("input[id='ooui-php-1']", (el, value) => el.value = value, search);
        await this.page.click("#search button[type='submit']");
        await this.page.waitForNavigation();
        const articlesElements = await this.page.$$(".mw-search-results li:nth-child(-n+3) .searchResultImage-text a");
        const articles = articlesElements.map(async (el) => {
            const articleName = await (await el.getProperty("textContent")).jsonValue();
            const url = await (await el.getProperty("href")).jsonValue();
            return `${GlobalColors.Yellow}Article : ${GlobalColors.White}${articleName}\n${GlobalColors.Green}See the page : ${GlobalColors.White}${GlobalColors.Underscore}${url}${GlobalColors.Reset}`;
        });
        const result = await Promise.all(articles);
        return result.join("\n\n");
    }
}
//# sourceMappingURL=Scrapper.js.map