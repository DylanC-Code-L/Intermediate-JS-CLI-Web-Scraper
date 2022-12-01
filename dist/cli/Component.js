import { GlobalColors } from "../utils/Colors.js";
import { stdin, stdout } from "node:process";
export class Component {
    static output = stdout;
    static input = stdin;
    static formatText(text) {
        const beforeNum = GlobalColors.Reset + GlobalColors.Red;
        const afterNum = GlobalColors.Green;
        const beforeTxt = GlobalColors.Yellow;
        const formatedText = text.map((t, k) => `${beforeNum}${k}${afterNum} --${beforeTxt} ${t}\n`).join('');
        return formatedText;
    }
    static instruction(text, error) {
        const textColor = error ? GlobalColors.Red : GlobalColors.White;
        this.output.write(textColor + text + "\n\n");
    }
    static keypressHandler() {
        return new Promise((resolve) => this.input.once("keypress", (_, key) => { resolve(key); }));
    }
}
