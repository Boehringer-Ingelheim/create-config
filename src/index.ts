/* eslint-disable import/no-unused-modules */
/* eslint-disable no-console */

import path from "node:path";
// eslint-disable-next-line import/no-named-as-default
import prompts from "prompts";
import { configFileDict } from "./files.list";
import { AnswersType, ExpectedResult } from "./files.list.types";
import { copyFile, doesFileExist, installSharedPackages, pkgFromUserAgent, welcomeUser } from "./files.utils";
import { packageFileDict } from "./packages.list";

const cwd = process.cwd();

async function init() {
  let result: prompts.Answers<AnswersType>;

  welcomeUser();

  try {
    result = await prompts([
      {
        choices: configFileDict.map((f) => ({ title: f.formName, value: f })),
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
      {
        choices: packageFileDict.map((p) => ({ title: p, value: p })),
        message: "Choose packages to install",
        name: "packages",
        type: "multiselect",
      },
    ]);
  } catch (err) {
    console.warn(err);
    return;
  }

  // console.log(result);

  const { overwrite, files, location, packages } = result as ExpectedResult;

  const targetRootPath = path.join(cwd, location);

  if (!(files instanceof Array)) {
    return;
  }

  // Check if overwrite is true
  if (overwrite) {
    // Write each file
    files.forEach((file) => {
      copyFile(file, targetRootPath);
    });
  } else {
    files.forEach((file) => {
      // Check if file exists
      if (doesFileExist(file, targetRootPath)) {
        return;
      }
      copyFile(file, targetRootPath);
    });
  }

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
  const pkgManager = pkgInfo ? pkgInfo.name : "npm";
  // const isYarn1 = pkgManager === 'yarn' && pkgInfo?.version.startsWith('1.')

  installSharedPackages(pkgManager, packages);

  // TODO: For each file write to filesystem
}

init().catch((e) => console.error(e));
