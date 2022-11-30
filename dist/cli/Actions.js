import { stdout as output } from "node:process";
import { Component } from "./Component.js";
import { Results } from "./Results.js";
export class Actions extends Component {
    static async summary() {
        const choice = ["Random subject", "Categories", "Keywords"];
        this.instruction("Please chose an index below and press Enter.");
        const text = this.formatText(choice);
        output.write(text);
        const { name: keypressed } = await this.keypressHandler();
        Results.summary(keypressed);
    }
}
