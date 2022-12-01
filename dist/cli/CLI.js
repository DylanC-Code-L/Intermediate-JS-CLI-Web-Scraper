import { stdin as input } from "node:process";
import readline from "node:readline";
import { GlobalColors } from "../utils/Colors.js";
export class CLI {
    static instance;
    promptConfig = "\x1b[0m";
    separator = GlobalColors.Magenta + "\n--------------------------\n\n";
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
    setPromptCli(configs) {
        for (const config of Object.values(configs))
            config ? this.promptConfig += GlobalColors[config] : null;
        return this;
    }
}
