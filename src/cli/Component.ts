import { Colors_Background, Colors_Font, Colors_Settings, GlobalColors } from "../utils/Colors.js"

export abstract class Component {
  protected static formatText(text: string[]): string {
    const beforeNum = GlobalColors.Reset + GlobalColors.Red
    const afterNum = GlobalColors.Green
    const beforeTxt = GlobalColors.Yellow

    const formatedText =
      text.map((t, k) => `${beforeNum}${k}${afterNum} --${beforeTxt} ${t}\n`).join('')
    return formatedText
  }

  protected static instruction(text: string, error?: boolean): string {
    const textColor = error ? GlobalColors.Red : GlobalColors.White
    return textColor + text + "\n\n"
  }
}