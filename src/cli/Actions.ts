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

  async prompt_Ordonned_List(items: string[]): Promise<number> {
    // 1. Print generic instruction and the ordonned list of strings
    this.instruction("Please chose an index below and press Enter.")
    const text = this.format_Ordonned_List_With_Color_Settings(items)

    output.write(text)

    // 2. Get the key pressed by the user and control if its number
    const { name: keypressed } = await this.keypressHandler()

    const numberOrFalse = this.valid_Number_Press(keypressed, items.length)

    // 3. If valid return the key pressed and if isn't, replay the method
    if (typeof numberOrFalse === "number") return numberOrFalse
    return this.prompt_Ordonned_List(items)
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

  valid_Number_Press(keypressed: string, max: number) {
    if (Number.isNaN(Number(keypressed))) {
      this.instruction(`It's not a valid index !`, "error")
      return false
    } else if (+keypressed > max - 1 || +keypressed < 0) {
      this.instruction(`It's not a valid index !`, "error")
      return false
    }

    return +keypressed
  }
}