import { GlobalColors } from "../utils/Colors.js"
import { stdin, stdout } from "node:process"
import { CLI } from "./CLI.js"

interface Keypressed {
  sequence: string
  name: string
  ctrl: boolean
  meta: boolean
  shift: boolean
}

type Instruction = "classic" | "error" | "perso"

export abstract class Component {
  protected output = stdout
  protected input = stdin
  constructor(protected instantiedCLI: CLI) { }

  public instruction(text: string, type?: Instruction): this {
    let textColor: string

    if (type === "perso") textColor = this.instantiedCLI.promptConfig
    else if (type === "error") textColor = GlobalColors.Red
    else textColor = GlobalColors.White

    this.output.write(textColor + text + "\n\n")
    return this
  }

  protected keypressHandler() {
    return new Promise<Keypressed>((resolve) =>
      this.input.once("keypress", (_, key) => { resolve(key) })
    )
  }
}