import { Actions } from "./Actions.js";
import { Component } from "./Component.js";
export class Results extends Component {
    static result1(result) {
        console.clear();
        if (!Number(result)) {
            console.log("Index invalid !\n");
            return Actions.summary();
        }
    }
}
