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
        this.output.write(textColor + text);
        return this;
    }
    clear_And_Prompt(message, type) {
        console.clear();
        this.instruction(message, type);
    }
    keypressed_Handler() {
        return new Promise((resolve) => this.input.once("keypress", (_, key) => { resolve(key); }));
    }
    multiple_Keypressed_Handler() {
        return new Promise(resolve => this.input.on("data", (data) => { resolve(data.toString()); }));
    }
}
//# sourceMappingURL=Component.js.map