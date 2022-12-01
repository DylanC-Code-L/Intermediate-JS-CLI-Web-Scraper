import puppeteer, { Page } from "puppeteer";

export type ScrapperResponse = { h1: string, p: string }

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

  async random(): Promise<ScrapperResponse> {
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

    return { h1, p }
  }
}