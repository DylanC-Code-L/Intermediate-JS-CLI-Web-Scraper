import { Scrapper } from "../web/Scrapper.js";
import { Actions } from "./Actions.js";
import { CLI } from "./CLI.js";
import { Component, Instruction } from "./Component.js";

export class Results extends Component {
  private static instance: Results
  private scrapperInstance: Scrapper

  private constructor(protected instantiedCLI: CLI, private instantiedAction: Actions) {
    super(instantiedCLI)
    this.scrapperInstance = Scrapper.getInstance()
  }

  static getInstance(instantiedCLI: CLI, instantiedAction: Actions): Results {
    if (this.instance) return this.instance

    this.instance = new Results(instantiedCLI, instantiedAction)
    return this.instance
  }

  public async summary(result: number) {
    this.clear_And_Prompt("Waiting...")

    let response: string

    switch (result) {
      case 0: response = await this.scrapperInstance.random()
        break
      case 1: response = await this.scrapperInstance.categories()
        break
      case 2: response = await this.wait_Input_And_Make_Research()
        break;
      default: {
        this.replay_Summary(`Subject => ${result} inexistant!\n\n`, "error")
        return;
      }
    }

    this.replay_Summary(`${response}\n\nMenu\n\n`, "classic")
  }

  private async wait_Input_And_Make_Research() {
    this.clear_And_Prompt("Taper quelque chose à rechercher :\n --> ")

    const input = await this.multiple_Keypressed_Handler()
    return await this.scrapperInstance.research(input)
  }

  private async replay_Summary(reason: string, type?: Instruction) {
    this.clear_And_Prompt(reason, type)

    const summaryResult = await this.instantiedAction.prompt_Ordonned_List(["Random subject", "Categories", "Keywords"])
    this.summary(summaryResult)
  }
}