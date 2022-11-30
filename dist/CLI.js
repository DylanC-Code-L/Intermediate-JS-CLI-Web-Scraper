import { stdout as output } from "node:process";
import { GlobalColors } from "./utils/Colors.js";
export class CLI {
    formatedColors = "\x1b[0m";
    separator = GlobalColors.Magenta + "\n--------------------------\n\n";
    static instance;
    constructor() { }
    static getInstance() {
        if (this.instance)
            return this.instance;
        this.instance = new CLI();
        return this.instance;
    }
    async start(message, colors) {
        this.translateColor(colors);
        console.clear();
        output.write(`${this.formatedColors}${message}${this.separator}`);
        this.action1();
    }
    action1() {
        const choice = ["Random subject", "Categories", "Keywords"];
        const instruction = this.instruction("Please chose an index below and press Enter.");
        const text = instruction + this.formatText(choice);
        output.write(text);
    }
    translateColor(colors) {
        this.formatedColors += GlobalColors[colors.bg] || "";
        this.formatedColors += GlobalColors[colors.font] || "";
        this.formatedColors += GlobalColors[colors.settings] || "";
    }
    formatText(text) {
        const beforeNum = GlobalColors.Reset + GlobalColors.Red;
        const afterNum = GlobalColors.Green;
        const beforeTxt = GlobalColors.Yellow;
        const formatedText = text.map((t, k) => `${beforeNum}${k}${afterNum} --${beforeTxt} ${t}\n`).join('');
        return formatedText;
    }
    instruction(text) {
        return GlobalColors.White + text + "\n\n";
    }
}
