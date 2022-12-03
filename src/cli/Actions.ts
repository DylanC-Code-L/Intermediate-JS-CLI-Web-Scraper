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
    this.instruction("Please chose an index below and press Enter.\n\n")
    const text = this.format_Ordonned_List_With_Color_Settings(items)

    output.write(text + '\n')

    // 2. Get the key pressed by the user and control if its number
    const { name: keypressed } = await this.keypressed_Handler()

    const numberOrFalse = this.valid_Number(keypressed, items.length)

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

  valid_Number(value: string, max: number) {
    const isNumber = Number.isNaN(Number(value))
    const isInRange = +value <= max - 1 && +value >= 0

    if (!isNumber) {
      this.instruction(`It's not a valid index !\n\n`, "error")
      return false
    } else if (isInRange) {
      this.instruction(`It's not a valid index !\n\n`, "error")
      return false
    }

    return +value
  }

  async get_Value_From_User(message: string): Promise<string> {
    this.instruction(message)
    return await this.multiple_Keypressed_Handler()
  }
}