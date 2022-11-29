import { stdin as input, stdout as output } from "node:process"
import readline from "node:readline"
import { CLI } from "./CLI.js"

const myCLI = new CLI()

myCLI.start("Bienvenue", { font: "Cyan" })