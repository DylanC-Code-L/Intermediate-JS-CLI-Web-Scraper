import { stdin as input, stdout as output } from "node:process";
import { Component } from "./Component.js";
export class Actions extends Component {
    static summary() {
        const choice = ["Random subject", "Categories", "Keywords"];
        const instruction = this.instruction("Please chose an index below and press Enter.");
        const text = instruction + this.formatText(choice);
        output.write(text);
        input.once("data", (d, k) => console.log(k));
    }
}
