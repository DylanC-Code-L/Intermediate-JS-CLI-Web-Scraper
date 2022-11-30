import { Scrapper } from "../web/Scrapper.js";
import { Actions } from "./Actions.js";
import { Component } from "./Component.js";
export class Results extends Component {
    static scrapper = Scrapper.getInstance();
    static summary(result) {
        // console.clear()
        // console.log(result);
        if (typeof +result !== "number") {
            this.instruction("Index invalid !\n", true);
            return Actions.summary();
        }
        switch (+result) {
            case 0:
                this.scrapper.random();
                break;
            case 1:
                console.log("Subject => categories");
                break;
            case 2:
                console.log("Subject => keywords");
                break;
            default:
                this.instruction(`Subject => ${result} inexistant !`, true);
                Actions.summary();
                break;
        }
    }
}
