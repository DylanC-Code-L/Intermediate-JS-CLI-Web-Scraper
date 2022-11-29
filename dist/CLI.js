import { GlobalColors } from "./utils/Colors.js";
export class CLI {
    formatedColors = "\x1b[0m";
    constructor() { }
    start(message, colors) {
        this.translateColor(colors);
        console.log(`${this.formatedColors}${message}`);
    }
    translateColor(colors) {
        this.formatedColors += GlobalColors[colors.bg] ? GlobalColors[colors.bg] : "";
        this.formatedColors += GlobalColors[colors.font] ? GlobalColors[colors.font] : "";
        this.formatedColors += GlobalColors[colors.settings] ? GlobalColors[colors.settings] : "";
    }
}
