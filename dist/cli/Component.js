import { GlobalColors } from "../utils/Colors.js";
import { stdin, stdout } from "node:process";
export class Component {
    instantiedCLI;
    output = stdout;
    input = stdin;
    constructor(instantiedCLI) {
        this.instantiedCLI = instantiedCLI;
    }
    instruction(text, type) {
        let textColor;
        if (type === "perso")
            textColor = this.instantiedCLI.promptConfig;
        else if (type === "error") {
            console.clear();
            textColor = GlobalColors.Red;
        }
        else
            textColor = GlobalColors.White;
        this.output.write(textColor + text + "\n\n");
        return this;
    }
    keypressHandler() {
        return new Promise((resolve) => this.input.once("keypress", (_, key) => { resolve(key); }));
    }
}
