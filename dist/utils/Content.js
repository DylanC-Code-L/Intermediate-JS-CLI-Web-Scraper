import { GlobalColors } from "./Colors.js";
export const Content = {
    start: `${GlobalColors.Red}__________________________${GlobalColors.Underscore}\n|--- CLI Web Scrapper ---|\n\n${GlobalColors.Reset}${GlobalColors.Blue}This CLI application allow to get article from wikipedia.\n\n`,
    wait: `${GlobalColors.Reset}${GlobalColors.Yellow}\nWaiting...`,
    noContent: "No content has been find...",
    typeSomething: `${GlobalColors.White}Taper quelque chose à rechercher :${GlobalColors.Yellow}\n -->${GlobalColors.Reset} `,
    summaryChoice: ["Random subject", "Categories", "Keywords"],
    choseIndex: "Please chose an index below and press Enter.\n\n",
    indexInvalid: `It's not a valid index !\n\n`,
    indexWithText(text, index) {
        return `${GlobalColors.Reset + GlobalColors.Red}${index}${GlobalColors.Green} --${GlobalColors.Yellow} ${text}\n`;
    },
    result(response) {
        return `\n\n${GlobalColors.Blue}____________________________________________________\n\n${response}\n\n____________________________________________________\n\n${GlobalColors.Red}${GlobalColors.Underscore}Menu${GlobalColors.Reset}\n\n`;
    },
    article({ name, description, url }) {
        return `${GlobalColors.Red + GlobalColors.Underscore}Article\n\n${GlobalColors.Reset}${GlobalColors.Blue}Title : ${GlobalColors.Reset}${name}${GlobalColors.Blue}\nShort Description : ${GlobalColors.Reset}${description.slice(0, 75)}...\n\n${GlobalColors.Green}See the article :${GlobalColors.Reset}${GlobalColors.White} ${GlobalColors.Underscore}${url}${GlobalColors.Reset}${GlobalColors.Blue}`;
    },
    shortArticle({ name, url }, type) {
        return `${GlobalColors.Yellow}${type} : ${GlobalColors.White}${name}\n${GlobalColors.Green}See the page : ${GlobalColors.White}${GlobalColors.Underscore}${url}${GlobalColors.Reset}${GlobalColors.Blue}`;
    },
    articlesList(list, type) {
        const pluralType = type === "Category" ? "Categories" : "Articles";
        return `${GlobalColors.Red}${GlobalColors.Underscore}${pluralType}\n\n${GlobalColors.Reset}${list.join("\n\n")}`;
    },
};
//# sourceMappingURL=Content.js.map