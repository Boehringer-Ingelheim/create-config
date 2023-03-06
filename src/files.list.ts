import { ConfigFile } from "./files.list.types";

export const files: ConfigFile[] = [
  {
    fileName: ".editorconfig",
    formName: "editorconfig",
    targetPath: ".",
  },
  {
    fileName: "settings.json",
    formName: "settings.json (VSCode)",
    targetPath: ".vscode/",
  },
  {
    fileName: ".eslintrc.cjs",
    formName: "eslintrc.cjs",
    targetPath: ".",
  },
  {
    fileName: ".prettierrc.cjs",
    formName: "prettierrc.cjs",
    targetPath: ".",
  },
];
