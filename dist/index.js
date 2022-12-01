import { Actions } from "./cli/Actions.js";
import { CLI } from "./cli/CLI.js";
import { Results } from "./cli/Results.js";
const myCLI = CLI.getInstance();
const actions = Actions.getInstance(myCLI);
const results = Results.getInstance(myCLI, actions);
myCLI
    .setPromptCli({ font: "Cyan" });
const summaryResult = await actions
    .instruction("Bonjour et bienvenue", "perso")
    .prompt_Ordonned_List(["Random subject", "Categories", "Keywords"]);
results.summary(summaryResult);
//# sourceMappingURL=index.js.map