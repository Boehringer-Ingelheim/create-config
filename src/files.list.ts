import type { ConfigFile } from "./files.list.types";

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

// Using a prefix to avoid conflicts with other files
export const FILE_PREFIX = "__"
