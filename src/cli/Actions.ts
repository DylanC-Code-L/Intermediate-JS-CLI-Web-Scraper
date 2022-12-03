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

  async prompt_Ordonned_List(lists: string[]): Promise<number> {
    this.instruction("Please chose an index below and press Enter.\n\n")
    const text = this.format_Ordonned_List_With_Color_Settings(lists)

    output.write(text + '\n')

    return this.keypressed_For_Ordonned_List(lists)
  }

  async keypressed_For_Ordonned_List(lists: string[]): Promise<number> {
    const { name: keypressed } = await this.keypressed_Handler()

    const isNumber = this.valid_Number(keypressed, lists.length)

    if (isNumber) return +keypressed
    return this.prompt_Ordonned_List(lists)
  }

  protected format_Ordonned_List_With_Color_Settings(texts: string[]): string {
    const beforeIndex = GlobalColors.Reset + GlobalColors.Red
    const afterIndex = GlobalColors.Green
    const beforeText = GlobalColors.Yellow

    const formatedOrdonnedList =
      texts.map((text, index) => `${beforeIndex}${index}${afterIndex} --${beforeText} ${text}\n`).join('')
    return formatedOrdonnedList
  }

  valid_Number(value: string, max: number): boolean {
    const isNumber = Number.isNaN(Number(value))
    const isInRange = +value <= max - 1 && +value >= 0

    if (!isNumber) {
      this.instruction(`It's not a valid index !\n\n`, "error")
      return false
    } else if (isInRange) {
      this.instruction(`It's not a valid index !\n\n`, "error")
      return false
    }

    return true
  }

  async get_Value_From_User(message: string): Promise<string> {
    this.instruction(message)
    return await this.multiple_Keypressed_Handler()
  }
}