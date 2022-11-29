import readline from "readline";
import { Colors } from "./utils/Colors.js";
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question(Colors.FgCyan + " What's your name ?\n", (res) => {
    console.log("Salut " + res);
    rl.close();
});
