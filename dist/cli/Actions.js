import { stdout as output } from "node:process";
import { Content } from "../utils/Content.js";
import { Component } from "./Component.js";
export class Actions extends Component {
    instantiedCLI;
    static instance;
    constructor(instantiedCLI) {
        super(instantiedCLI);
        this.instantiedCLI = instantiedCLI;
    }
    static getInstance(instantiedCLI) {
        if (this.instance)
            return this.instance;
        this.instance = new Actions(instantiedCLI);
        return this.instance;
    }
    async prompt_Ordonned_List(lists) {
        this.instruction(Content.choseIndex);
        const text = lists.map(Content.indexWithText).join("");
        output.write(text + "\n");
        return this.keypressed_For_Ordonned_List(lists);
    }
    async keypressed_For_Ordonned_List(lists) {
        const { name: keypressed } = await this.keypressed_Handler();
        const isNumber = this.valid_Number(keypressed, lists.length);
        if (isNumber)
            return +keypressed;
        return this.prompt_Ordonned_List(lists);
    }
    valid_Number(value, max) {
        const isNumber = !Number.isNaN(Number(value));
        const isInRange = +value <= max - 1 && +value >= 0;
        if (!isNumber || !isInRange) {
            this.instruction(Content.indexInvalid, "error");
            return false;
        }
        return true;
    }
    async get_Value_From_User(message) {
        this.instruction(message);
        return await this.multiple_Keypressed_Handler();
    }
}
//# sourceMappingURL=Actions.js.map