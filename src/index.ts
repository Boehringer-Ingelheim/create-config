import prompts from "prompts";
import { files } from "./files.list";

async function init() {
  let result: prompts.Answers<'files' | 'location' | 'overwrite'>

  welcomeUser()

  try {
    result = await prompts([
      {
        type: 'multiselect',
        name: 'files',
        message: 'Choose config files',
        // choices: [{title: '.editorconfig', value: 'editorconfig'}, {title: 'vscode settings.json', value: 'vscode-settings'}]
        choices: files.map(f => ({title: f.formName, value: f.fileName}))
      },
      {
        type: 'text',
        name: 'location',
        initial: '.',
        message: 'Where to put them (filepath)'
      },
      {
        type: 'confirm',
        name: 'overwrite',
        message: 'Overwrite existing files?'
      }
    ])
  } catch (err) {
    console.warn(err);
    return
  }

  console.log(result)
}

function welcomeUser() {
  console.log('\nWelcome to shared configs of Boehringer Ingelheim!\n')
}

init().catch((e) => console.error(e))
