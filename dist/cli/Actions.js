import { stdout as output } from "node:process";
import { GlobalColors } from "../utils/Colors.js";
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
    async prompt_Ordonned_List(items) {
        // 1. Print generic instruction and the ordonned list of strings
        this.instruction("Please chose an index below and press Enter.\n\n");
        const text = this.format_Ordonned_List_With_Color_Settings(items);
        output.write(text + '\n');
        // 2. Get the key pressed by the user and control if its number
        const { name: keypressed } = await this.keypressed_Handler();
        const numberOrFalse = this.valid_Number_Press(keypressed, items.length);
        // 3. If valid return the key pressed and if isn't, replay the method
        if (typeof numberOrFalse === "number")
            return numberOrFalse;
        return this.prompt_Ordonned_List(items);
    }
    format_Ordonned_List_With_Color_Settings(texts) {
        const beforeIndex = GlobalColors.Reset + GlobalColors.Red;
        const afterIndex = GlobalColors.Green;
        const beforeText = GlobalColors.Yellow;
        const formatedOrdonnedList = texts.map((text, index) => `${beforeIndex}${index}${afterIndex} --${beforeText} ${text}\n`).join('');
        return formatedOrdonnedList;
    }
    play_One_Result_Of_An_Ordonned_List(index, actions) {
        actions[index]();
    }
    valid_Number_Press(keypressed, max) {
        if (Number.isNaN(Number(keypressed))) {
            this.instruction(`It's not a valid index !\n\n`, "error");
            return false;
        }
        else if (+keypressed > max - 1 || +keypressed < 0) {
            this.instruction(`It's not a valid index !\n\n`, "error");
            return false;
        }
        return +keypressed;
    }
    async get_Value_From_User(message) {
        this.instruction(message);
        return await this.multiple_Keypressed_Handler();
    }
}
//# sourceMappingURL=Actions.js.map