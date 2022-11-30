import { GlobalColors } from "../utils/Colors.js";
import { stdin as input, stdout as output } from "node:process";
export class Component {
    static formatText(text) {
        const beforeNum = GlobalColors.Reset + GlobalColors.Red;
        const afterNum = GlobalColors.Green;
        const beforeTxt = GlobalColors.Yellow;
        const formatedText = text.map((t, k) => `${beforeNum}${k}${afterNum} --${beforeTxt} ${t}\n`).join('');
        return formatedText;
    }
    static instruction(text, error) {
        const textColor = error ? GlobalColors.Red : GlobalColors.White;
        output.write(textColor + text + "\n\n");
    }
    static keypressHandler() {
        return new Promise((resolve) => input.once("keypress", (_, key) => { resolve(key); }));
    }
}
