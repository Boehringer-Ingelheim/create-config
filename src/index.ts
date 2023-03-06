/* eslint-disable no-console */
/* eslint-disable import/no-unused-modules */
// eslint-disable-next-line import/no-named-as-default
import prompts from "prompts";
import { files } from "./files.list";

async function init() {
  let result: prompts.Answers<"files" | "location" | "overwrite">;

  welcomeUser();

  try {
    result = await prompts([
      {
        // choices: [{title: '.editorconfig', value: 'editorconfig'}, {title: 'vscode settings.json', value: 'vscode-settings'}]
        choices: files.map((f) => ({ title: f.formName, value: f.fileName })),
        message: "Choose config files",
        name: "files",
        type: "multiselect",
      },
      {
        initial: ".",
        message: "Where to put them (filepath)",
        name: "location",
        type: "text",
      },
      {
        message: "Overwrite existing files?",
        name: "overwrite",
        type: "confirm",
      },
    ]);
  } catch (err) {
    console.warn(err);
    return;
  }

  console.log(result);

  // TODO: Check if overwrite is true
  // TODO: For each file write to filesystem
}

function welcomeUser() {
  console.log("\nWelcome to shared configuration files of Boehringer Ingelheim!\n");
}

init().catch((e) => console.error(e));
