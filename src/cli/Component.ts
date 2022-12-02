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
    else if (type === "error") {
      console.clear()
      textColor = GlobalColors.Red
    }
    else textColor = GlobalColors.White

    this.output.write(textColor + text)
    return this
  }

  protected keypressed_Handler(): Promise<Keypressed> {
    return new Promise<Keypressed>((resolve) =>
      this.input.once("keypress", (_, key) => { resolve(key) })
    )
  }

  protected multiple_Keypressed_Handler(): Promise<string> {
    return new Promise<string>(resolve =>
      this.input.on("data", (data) => { resolve(data.toString()) })
    )
  }
}