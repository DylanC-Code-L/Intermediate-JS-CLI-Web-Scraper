import { Scrapper } from "../web/Scrapper.js";
import { Actions } from "./Actions.js";
import { Component } from "./Component.js";
export class Results extends Component {
    instantiedCLI;
    static instance;
    constructor(instantiedCLI) {
        super(instantiedCLI);
        this.instantiedCLI = instantiedCLI;
    }
    static getInstance(instantiedCLI) {
        if (this.instance)
            return this.instance;
        this.instance = new Results(instantiedCLI);
        return this.instance;
    }
    static scrapper = Scrapper.getInstance();
    async summary(result) {
        console.clear();
        if (typeof +result !== "number") {
            this.instruction("Index invalid !\n", true);
            return Actions.summary();
        }
        let response = {};
        switch (+result) {
            case 0:
                response = await this.scrapper.random();
                break;
            case 1:
                console.log("Subject => categories");
                break;
            case 2:
                console.log("Subject => keywords");
                break;
            default:
                this.instruction(`Subject => ${result} inexistant!`, true);
                Actions.summary();
                break;
        }
        this.displayResponse(response);
    }
    displayResponse(response) {
        this.output.write(response.h1);
        this.output.write(response.p);
    }
}