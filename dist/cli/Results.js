import { Content } from "../utils/Content.js";
import { Scrapper } from "../web/Scrapper.js";
import { Component } from "./Component.js";
export class Results extends Component {
    instantiedCLI;
    instantiedAction;
    static instance;
    scrapperInstance;
    constructor(instantiedCLI, instantiedAction) {
        super(instantiedCLI);
        this.instantiedCLI = instantiedCLI;
        this.instantiedAction = instantiedAction;
        this.scrapperInstance = Scrapper.getInstance();
    }
    static getInstance(instantiedCLI, instantiedAction) {
        if (this.instance)
            return this.instance;
        this.instance = new Results(instantiedCLI, instantiedAction);
        return this.instance;
    }
    async summary(result) {
        this.clear_And_Prompt(Content.wait);
        let response;
        switch (result) {
            case 0:
                response = await this.scrapperInstance.random();
                break;
            case 1:
                response = await this.scrapperInstance.categories();
                break;
            case 2:
                response = await this.wait_Input_And_Make_Research();
                break;
            default: {
                this.replay_Summary(Content.indexInvalid, "error");
                return;
            }
        }
        this.replay_Summary(Content.result(response), "classic");
    }
    async wait_Input_And_Make_Research() {
        this.clear_And_Prompt(Content.typeSomething);
        const input = await this.multiple_Keypressed_Handler();
        return await this.scrapperInstance.research(input);
    }
    async replay_Summary(reason, type) {
        this.clear_And_Prompt(reason, type);
        const summaryResult = await this.instantiedAction.prompt_Ordonned_List(Content.summaryChoice);
        this.summary(summaryResult);
    }
}
//# sourceMappingURL=Results.js.map