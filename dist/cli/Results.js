import { Actions } from "./Actions.js";
import { Component } from "./Component.js";
export class Results extends Component {
    static summary(result) {
        console.clear();
        if (!Number(result)) {
            this.instruction("Index invalid !\n", true);
            return Actions.summary();
        }
        switch (+result) {
            case 0:
                console.log("Subject => random subject");
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
