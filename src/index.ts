import path from "node:path";
import { fileURLToPath } from "node:url";
import prompts from "prompts";
import { configFileDict } from "./files.list";
import type { AnswersType, ConfigFile, ConfigPackage, ExpectedResult } from "./files.list.types";
import {
  copyFile,
  doesFileExist,
  installSharedPackages,
  pkgFromUserAgent,
  sayGoodbye,
  welcomeUser,
} from "./files.utils";
import { packageFileDict } from "./packages.list";

const cwd = process.cwd();

async function init() {
  let result: prompts.Answers<AnswersType>;

  welcomeUser();

  // PROMPTS
  try {
    result = await prompts(
      [
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
          type: (prev: ConfigFile[]) => (prev.length ? "text" : null),
        },
        {
          message: "Overwrite existing files?",
          name: "overwrite",
          type: (prev: string) => (prev.length ? "confirm" : null),
        },
        {
          choices: packageFileDict.map((p) => ({ title: p.formName, value: p })),
          message: "Choose packages to install",
          name: "packages",
          type: "multiselect",
        },
      ],
      {
        onCancel: () => {
          throw new Error("✖ Operation cancelled");
        },
      },
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.warn(err.message);
      return;
    }
    console.warn(err);
    return;
  }

  // Destructure results of prompts
  const { files, location, overwrite, packages } = result as ExpectedResult;

  const filesChosen = files.length > 0;
  const packagesChosen = packages.length > 0;

  if (filesChosen) {
    processFiles(location, overwrite, files);
  }

  if (packagesChosen) {
    processPackages(packages);
  }

  sayGoodbye();
}

function processFiles(location: string, overwrite: boolean, files: ConfigFile[]) {
  // Get location of create-config and files directory
  const filesLocation = path.resolve(fileURLToPath(import.meta.url), "../..", "files");

  // Get path where create command was called from
  const targetRootPath = path.join(cwd, location);

  // Check if overwrite is true
  if (overwrite) {
    // Write each file
    files.forEach((file) => {
      copyFile(filesLocation, file, targetRootPath);
    });
  } else {
    files.forEach((file) => {
      // Check if file exists
      if (doesFileExist(file, targetRootPath)) {
        return;
      }
      copyFile(filesLocation, file, targetRootPath);
    });
  }
}

function processPackages(packages: ConfigPackage[]) {
  // Get which package manager
  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
  const pkgManager = pkgInfo ? pkgInfo.name : "npm";
  // const isYarn1 = pkgManager === 'yarn' && pkgInfo?.version.startsWith('1.')

  // Write files to filesystem
  installSharedPackages(pkgManager, packages);
}

init().catch((e: unknown) => { console.error(e); });
