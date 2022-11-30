import { GlobalColors } from "../utils/Colors.js"
import { stdin as input, stdout as output } from "node:process"

interface Keypressed {
  sequence: string
  name: string
  ctrl: boolean
  meta: boolean
  shift: boolean
}

export abstract class Component {
  protected static formatText(text: string[]): string {
    const beforeNum = GlobalColors.Reset + GlobalColors.Red
    const afterNum = GlobalColors.Green
    const beforeTxt = GlobalColors.Yellow

    const formatedText =
      text.map((t, k) => `${beforeNum}${k}${afterNum} --${beforeTxt} ${t}\n`).join('')
    return formatedText
  }

  protected static instruction(text: string, error?: boolean): void {
    const textColor = error ? GlobalColors.Red : GlobalColors.White
    output.write(textColor + text + "\n\n")
  }

  protected static keypressHandler() {
    return new Promise<Keypressed>((resolve) =>
      input.once("keypress", (_, key) => { resolve(key) })
    )
  }
}