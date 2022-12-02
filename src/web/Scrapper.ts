import puppeteer, { Page } from "puppeteer";
import { GlobalColors } from "../utils/Colors.js";

export class Scrapper {
  private static instance: Scrapper
  private page: Page

  constructor() {
    this.start()
  }

  static getInstance(): Scrapper {
    if (this.instance) return this.instance

    this.instance = new Scrapper()
    return this.instance
  }

  private async start() {
    const browser = await puppeteer.launch()
    this.page = await browser.newPage()
  }

  async random(): Promise<string> {
    await this.page.goto("https://fr.wikipedia.org/wiki/Sp%C3%A9cial:Page_au_hasard", { waitUntil: "domcontentloaded" })
    await this.page.pdf({ path: "./acceuil.pdf", format: "A4" })

    const h1El = await this.page.$("#firstHeading")
    const h1 = await (await h1El.getProperty('textContent')).jsonValue()

    const p1El = await this.page.$$("#mw-content-text > div > p")
    let p: string

    for (const el of p1El) {
      const text = await (await el.getProperty("textContent")).jsonValue()

      if (text.trim() !== "") {
        p = text
        break
      }
    }

    const result = `Title : ${h1}\nShort Description : ${p.slice(0, 75)}...\n\nSee the article : ${this.page.url()}`
    return result
  }

  async categories() {
    await this.page.goto("https://fr.wikipedia.org/wiki/Cat%C3%A9gorie:Accueil")
    const categoriesElements = await this.page.$$("#mw-content-text > div > div:nth-child(3) b > a")

    const categories = categoriesElements.map(async el => {
      const categoryName = await (await el.getProperty("textContent")).jsonValue()
      const url = await (await el.getProperty("href")).jsonValue()

      return `${GlobalColors.Yellow}Category : ${GlobalColors.White}${categoryName}\n${GlobalColors.Green}See the page : ${GlobalColors.White}${GlobalColors.Underscore}${url}${GlobalColors.Reset}`
    })

    const result = await Promise.all(categories)

    return result.join("\n\n")
  }
}