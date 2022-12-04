import { stdin as input } from "node:process"
import readline from "node:readline"
import { Colors_Background, Colors_Font, Colors_Settings, GlobalColors } from "../utils/Colors.js"

interface CLIColor {
  settings?: Colors_Settings
  font?: Colors_Font
  bg?: Colors_Background
}

export class CLI {
  private static instance: CLI
  public promptConfig: string = "\x1b[0m"

  private constructor() {
    this.config()
  }

  private config() {
    readline.emitKeypressEvents(input)
    if (input.isTTY)
      input.setRawMode(true)
  }

  static getInstance(): CLI {
    if (this.instance) return this.instance

    this.instance = new CLI()
    return this.instance
  }

  public setPromptCli(configs: CLIColor): CLI {
    for (const config of Object.values(configs))
      config ? this.promptConfig += GlobalColors[config] : null

    return this
  }
}

