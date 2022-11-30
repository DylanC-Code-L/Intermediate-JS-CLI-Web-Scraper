import { stdin as input, stdout as output } from "node:process";
import { GlobalColors } from "../utils/Colors.js";
export class Actions {
    static summary() {
        const choice = ["Random subject", "Categories", "Keywords"];
        const instruction = this.instruction("Please chose an index below and press Enter.");
        const text = instruction + this.formatText(choice);
        output.write(text);
        input.once("data", (d, k) => console.log(k));
    }
    static formatText(text) {
        const beforeNum = GlobalColors.Reset + GlobalColors.Red;
        const afterNum = GlobalColors.Green;
        const beforeTxt = GlobalColors.Yellow;
        const formatedText = text.map((t, k) => `${beforeNum}${k}${afterNum} --${beforeTxt} ${t}\n`).join('');
        return formatedText;
    }
    static instruction(text) {
        return GlobalColors.White + text + "\n\n";
    }
}
