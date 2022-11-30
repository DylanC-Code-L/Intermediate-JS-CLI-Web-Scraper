import { stdin as input, stdout as output } from "node:process"
import readline from "node:readline"
import { Colors_Background, Colors_Font, Colors_Settings, GlobalColors } from "./utils/Colors.js"

interface CLIInterface {
  start(message: string, colors?: CLIColor): void
}

type CLIColor = {
  settings?: Colors_Settings
  font?: Colors_Font
  bg?: Colors_Background
}

export class CLI implements CLIInterface {
  private formatedColors: string = "\x1b[0m"
  private separator: string = GlobalColors.Magenta + "\n--------------------------\n\n"
  private static instance: CLI

  private constructor() { }

  static getInstance() {
    if (this.instance) return this.instance
    this.instance = new CLI()
    return this.instance
  }

  async start(message: string, colors?: CLIColor) {
    this.translateColor(colors)

    console.clear()
    output.write(`${this.formatedColors}${message}${this.separator}`);

    this.action1()
  }

  private action1() {
    const choice = ["Random subject", "Categories", "Keywords"]

    const instruction = this.instruction("Please chose an index below and press Enter.")
    const text = instruction + this.formatText(choice)
    output.write(text)
  }

  private translateColor(colors: CLIColor): void {
    this.formatedColors += GlobalColors[colors.bg] || ""
    this.formatedColors += GlobalColors[colors.font] || ""
    this.formatedColors += GlobalColors[colors.settings] || ""
  }

  private formatText(text: string[]): string {
    const beforeNum = GlobalColors.Reset + GlobalColors.Red
    const afterNum = GlobalColors.Green
    const beforeTxt = GlobalColors.Yellow

    const formatedText =
      text.map((t, k) => `${beforeNum}${k}${afterNum} --${beforeTxt} ${t}\n`).join('')
    return formatedText
  }

  private instruction(text: string): string {
    return GlobalColors.White + text + "\n\n"
  }
}

