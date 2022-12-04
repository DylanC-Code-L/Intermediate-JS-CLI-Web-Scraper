import puppeteer, { Page, ElementHandle } from "puppeteer";
import { Content } from "../utils/Content.js";

export type ArticleContent = {
  name: string;
  description?: string;
  url: string;
};

export type ListType = "Article" | "Category";

export class Scrapper {
  private static instance: Scrapper;
  private page: Page;
  private WK_URL = "https://fr.wikipedia.org/wiki/";

  constructor() {
    this.start();
  }

  static getInstance(): Scrapper {
    if (this.instance) return this.instance;

    this.instance = new Scrapper();
    return this.instance;
  }

  private async start() {
    const browser = await puppeteer.launch();
    this.page = await browser.newPage();
  }

  async random(): Promise<string> {
    await this.page.goto(`${this.WK_URL}Sp%C3%A9cial:Page_au_hasard`);

    const h1Element = await this.page.$("#firstHeading");
    const h1Content = await (
      await h1Element.getProperty("textContent")
    ).jsonValue();

    const paragrapheElements = await this.page.$$("#mw-content-text > div > p");
    let pContent = await this.find_First_Element_With_Text_Content(
      paragrapheElements
    );

    return Content.article({
      name: h1Content,
      description: pContent,
      url: this.page.url(),
    });
  }

  private async find_First_Element_With_Text_Content(
    elements: ElementHandle[]
  ): Promise<string> {
    for (const element of elements) {
      const text = await (await element.getProperty("textContent")).jsonValue();
      const isEmpty = text.trim() === "";

      if (!isEmpty) return text;
    }
    return Content.noContent;
  }

  async categories(): Promise<string> {
    await this.page.goto(`${this.WK_URL}Cat%C3%A9gorie:Accueil`);
    const categoriesElements = await this.page.$$(
      "#mw-content-text > div > div:nth-child(3) b > a"
    );

    return await this.extract_And_Format_Data(categoriesElements, "Category");
  }

  async research(search: string): Promise<string> {
    await this.page.goto(`${this.WK_URL}Sp%C3%A9cial:Recherche`);

    await this.page.$eval(
      "input[id='ooui-php-1']",
      (el, value) => (el.value = value),
      search
    );
    await this.page.click("#search button[type='submit']");
    await this.page.waitForNavigation();

    const articlesElements = await this.page.$$(
      ".mw-search-results li:nth-child(-n+3) .searchResultImage-text a"
    );

    return await this.extract_And_Format_Data(articlesElements, "Article");
  }

  async extract_And_Format_Data(
    data: ElementHandle[],
    type: ListType
  ): Promise<string> {
    // 1. Extract each name and url and format them in string
    const formatData = data.map(async (el) => {
      const articleName = await (
        await el.getProperty("textContent")
      ).jsonValue();
      const url = (await (await el.getProperty("href")).jsonValue()) as string;

      return Content.shortArticle({ name: articleName, url }, type);
    });

    // 3. Return string that contain all data previously formated
    const result = await Promise.all(formatData);
    return Content.articlesList(result, type);
  }
}
