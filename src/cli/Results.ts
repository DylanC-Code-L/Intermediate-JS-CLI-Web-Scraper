import { Scrapper, ScrapperResponse } from "../web/Scrapper.js";
import { Actions } from "./Actions.js";
import { CLI } from "./CLI.js";
import { Component } from "./Component.js";

export class Results extends Component {
  private static instance: Results

  private constructor(protected instantiedCLI: CLI, private instantiedAction: Actions) {
    super(instantiedCLI)
  }

  static getInstance(instantiedCLI: CLI, instantiedAction: Actions): Results {
    if (this.instance) return this.instance

    this.instance = new Results(instantiedCLI, instantiedAction)
    return this.instance
  }

  scrapper = Scrapper.getInstance()

  public async summary(result: number) {
    console.clear()

    let response = {} as ScrapperResponse

    switch (result) {
      case 0: response = await this.scrapper.random()
        break
      case 1: console.log("Subject => categories");
        break
      case 2: console.log("Subject => keywords");
        break;
      default: {
        this.instruction(`Subject => ${result} inexistant!`, "error");
        const summaryResult = await this.instantiedAction.prompt_Ordonned_List(["Random subject", "Categories", "Keywords"])
        this.summary(summaryResult)
        return;
      }
    }

    this.displayResponse(response)
  }

  private displayResponse(response: ScrapperResponse) {
    this.output.write(response.h1)
    this.output.write(response.p)
  }
}