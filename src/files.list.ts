import type { ConfigFile } from "./files.list.types";

export const configFileDict: ConfigFile[] = [
  {
    formName: "Editorconfig",
    name: ".editorconfig",
    targetFolder: ".",
  },
  {
    formName: "settings.json (VSCode)",
    name: "settings.json",
    targetFolder: ".vscode",
  },
  {
    formName: "Eslint config",
    name: "eslint.config.mjs",
    targetFolder: ".",
  },
  {
    formName: "Prettier config",
    name: ".prettierrc.cjs",
    targetFolder: ".",
  },
];

// Using a prefix to avoid conflicts with other files
export const FILE_PREFIX = "__"
