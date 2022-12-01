import { Actions } from "./cli/Actions.js";
import { CLI } from "./cli/CLI.js";
const myCLI = CLI.getInstance();
const actions = Actions.getInstance(myCLI);
myCLI
    .setPromptCli({ font: "Cyan" });
actions
    .instruction("Bonjour et bienvenue", "perso")
    .prompt_Ordonned_List(["Random subject", "Categories", "Keywords"]);
