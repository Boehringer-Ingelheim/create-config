import { ConfigFile } from "./files.list.types";

export const configFileDict: ConfigFile[] = [
  {
    formName: "editorconfig",
    name: ".editorconfig",
    targetFolder: ".",
  },
  {
    formName: "settings.json (VSCode)",
    name: "settings.json",
    targetFolder: ".vscode",
  },
  {
    formName: "eslintrc.cjs",
    name: ".eslintrc.cjs",
    targetFolder: ".",
  },
  {
    formName: "prettierrc.cjs",
    name: ".prettierrc.cjs",
    targetFolder: ".",
  },
];
