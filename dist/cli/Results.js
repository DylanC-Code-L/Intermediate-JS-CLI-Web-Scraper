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
        let response = {};
        switch (result) {
            case 0:
                response = await this.scrapper.random();
                break;
            case 1:
                console.log("Subject => categories");
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
        this.displayResponse(response);
    }
    displayResponse(response) {
        this.output.write(response.h1);
        this.output.write(response.p);
    }
}
//# sourceMappingURL=Results.js.map