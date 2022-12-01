import { Scrapper, ScrapperResponse } from "../web/Scrapper.js";
import { Actions } from "./Actions.js";
import { Component } from "./Component.js";

export class Results extends Component {
  static scrapper = Scrapper.getInstance()

  static async summary(result: string) {
    console.clear()

    if (typeof +result !== "number") {
      this.instruction("Index invalid !\n", true)
      return Actions.summary()
    }

    let response = {} as ScrapperResponse

    switch (+result) {
      case 0: response = await this.scrapper.random()
        break
      case 1: console.log("Subject => categories");
        break
      case 2: console.log("Subject => keywords");
        break;
      default: this.instruction(`Subject => ${result} inexistant!`, true);
        Actions.summary()
        break;
    }

    this.displayResponse(response)
  }

  private static displayResponse(response: ScrapperResponse) {
    this.output.write(response.h1)
    this.output.write(response.p)
  }
}