import { Scrapper } from "../web/Scrapper.js";
import { Component } from "./Component.js";
export class Results extends Component {
    instantiedCLI;
    instantiedAction;
    static instance;
    constructor(instantiedCLI, instantiedAction) {
        super(instantiedCLI);
        this.instantiedCLI = instantiedCLI;
        this.instantiedAction = instantiedAction;
    }
    static getInstance(instantiedCLI, instantiedAction) {
        if (this.instance)
            return this.instance;
        this.instance = new Results(instantiedCLI, instantiedAction);
        return this.instance;
    }
    scrapper = Scrapper.getInstance();
    async summary(result) {
        console.clear();
        this.output.write("Waiting...");
        let response;
        switch (result) {
            case 0:
                response = await this.scrapper.random();
                break;
            case 1:
                response = await this.scrapper.categories();
                break;
            case 2:
                console.log("Subject => keywords");
                break;
            default: {
                this.instruction(`Subject => ${result} inexistant!`, "error");
                const summaryResult = await this.instantiedAction.prompt_Ordonned_List(["Random subject", "Categories", "Keywords"]);
                this.summary(summaryResult);
                return;
            }
        }
        console.clear();
        this.instruction(response);
    }
}
//# sourceMappingURL=Results.js.map