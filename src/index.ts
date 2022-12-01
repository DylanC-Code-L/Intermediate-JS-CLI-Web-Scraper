import { CLI } from "./cli/CLI.js"

const myCLI = CLI.getInstance()

myCLI
  .setPromptCli({ font: "Cyan" })
  .start("Bonjour et bienvenue")