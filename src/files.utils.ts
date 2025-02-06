/* eslint-disable no-console */

import { exec } from "node:child_process";
import fs from "node:fs";

import { FILE_PREFIX } from "./files.list";
import type { ConfigFile, ConfigPackage } from "./files.list.types";

export function copyFile(filesLocation: string, file: ConfigFile, location: string) {
  const from = `${filesLocation}/${FILE_PREFIX}${file.name}`;
  const toFolder = getTo(location, file.targetFolder);
  const to = getTo(location, file.targetFolder, file.name);

  try {
    if (!fs.existsSync(toFolder)) {
      fs.mkdirSync(toFolder, { recursive: true });
    }
    fs.copyFileSync(from, to);
    console.log(`Copied file ${file.name} to ${to}`); // Tell the user what is happening
  } catch (err) {
    console.warn(err);
  }
}

export function doesFileExist(file: ConfigFile, location: string) {
  const to = getTo(location, file.targetFolder, file.name);
  return fs.existsSync(to);
}

export function installSharedPackages(packageManager: string, packages: ConfigPackage[]) {
  console.log(`Detected "${packageManager}" as your package manager`);

  switch (packageManager) {
    case "npm":
      installPackage("npm install", packages, "-D");
      break;
    case "yarn":
      installPackage("yarn add", packages, "-D");
      break;

    default:
      console.log(`Sorry, your package manager "${packageManager}" is not (yet) supported. Please reach out if you think this is a mistake.`);
      break;
  }
}

export function pkgFromUserAgent(userAgent: string | undefined) {
  if (!userAgent) { return undefined; }

  const pkgSpec = userAgent.split(" ")[0];
  const pkgSpecArr = pkgSpec.split("/");

  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}

export function sayGoodbye() {
  console.log("\nThank you for using shared configuration files of Boehringer Ingelheim!\n");
}

export function welcomeUser() {
  console.log("\nWelcome to shared configuration files of Boehringer Ingelheim!\n");
}

function bulkifyPackages(packages: ConfigPackage[]): string {
  return packages.map((p) => p.packages.join(" ")).join(" ");
}

function getTo(targetRootPath: string, targetFolder: string, fileName?: string) {
  const folder = targetFolder === "." ? targetRootPath : `${targetRootPath}/${targetFolder}`;
  const file = fileName ? `/${fileName}` : "";
  return folder + file;
}

function installPackage(baseCmd: string, packs: ConfigPackage[], suffix: string) {
  const toInstall = bulkifyPackages(packs);

  console.log(`Installing packages "${toInstall}" now ... please wait`);

  // Install all packages at once
  const cmd = `${baseCmd} ${toInstall} ${suffix}`;

  console.log(`Running command: ${cmd}`);

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.warn(err.message);
    }
    if (stderr) {
      console.warn(stderr);
    }
    console.log(stdout);
  });
}
