import { stdin as input, stdout as output } from "node:process";
import readline from "node:readline";
import { Actions } from "./Actions.js";
import { GlobalColors } from "../utils/Colors.js";
import { Results } from "./Results.js";
export class CLI {
    static instance;
    formatedColors = "\x1b[0m";
    separator = GlobalColors.Magenta + "\n--------------------------\n\n";
    static teton = "teton";
    constructor() {
        this.config();
    }
    config() {
        readline.emitKeypressEvents(input);
        if (input.isTTY)
            input.setRawMode(true);
    }
    static getInstance() {
        if (this.instance)
            return this.instance;
        this.instance = new CLI();
        return this.instance;
    }
    keypressHandler() {
        return new Promise((resolve, reject) => input.once("keypress", (_, key) => { resolve(key); }));
    }
    async start(message, colors) {
        this.translateColor(colors);
        console.clear();
        output.write(`${this.formatedColors}${message}${this.separator}`);
        Actions.summary();
        const { name: keypressed } = await this.keypressHandler();
        Results.result1(keypressed);
    }
    translateColor(colors) {
        this.formatedColors += GlobalColors[colors.bg] || "";
        this.formatedColors += GlobalColors[colors.font] || "";
        this.formatedColors += GlobalColors[colors.settings] || "";
    }
}
