import { stdout as output } from "node:process"
import { GlobalColors } from "../utils/Colors.js"
import { CLI } from "./CLI.js"
import { Component } from "./Component.js"

export class Actions extends Component {
  private static instance: Actions

  private constructor(protected instantiedCLI: CLI) {
    super(instantiedCLI)
  }

  static getInstance(instantiedCLI: CLI): Actions {
    if (this.instance) return this.instance

    this.instance = new Actions(instantiedCLI)
    return this.instance
  }

  async prompt_Ordonned_List(items: string[]): Promise<string> {
    this.instruction("Please chose an index below and press Enter.")
    const text = this.format_Ordonned_List_With_Color_Settings(items)

    output.write(text)

    const { name: keypressed } = await this.keypressHandler()
    const valid = this.validKeyPress(keypressed, items.length)

    if (valid) return keypressed
    this.prompt_Ordonned_List(items)
  }

  protected format_Ordonned_List_With_Color_Settings(texts: string[]): string {
    const beforeIndex = GlobalColors.Reset + GlobalColors.Red
    const afterIndex = GlobalColors.Green
    const beforeText = GlobalColors.Yellow

    const formatedOrdonnedList =
      texts.map((text, index) => `${beforeIndex}${index}${afterIndex} --${beforeText} ${text}\n`).join('')
    return formatedOrdonnedList
  }

  play_One_Result_Of_An_Ordonned_List(index: number, actions: Function[]) {
    actions[index]()
  }

  validKeyPress(key: string, max: number): boolean {
    if (Number.isNaN(Number(key))) {
      this.instruction(`It's not a valid index !`, "error")
      return false
    } else if (+key > max - 1 || +key < 0) {
      this.instruction(`It's not a valid index !`, "error")
      return false
    }

    return true
  }
}