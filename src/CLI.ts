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
  constructor() { }

  start(message: string, colors?: CLIColor) {
    this.translateColor(colors)

    console.log(`${this.formatedColors}${message}`);
  }

  private translateColor(colors: CLIColor) {
    this.formatedColors += GlobalColors[colors.bg] ? GlobalColors[colors.bg] : ""
    this.formatedColors += GlobalColors[colors.font] ? GlobalColors[colors.font] : ""
    this.formatedColors += GlobalColors[colors.settings] ? GlobalColors[colors.settings] : ""
  }
}

