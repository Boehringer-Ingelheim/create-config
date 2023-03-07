/* eslint-disable no-console */

import { exec } from "node:child_process";
import fs from "node:fs";

import { ConfigFile, ConfigPackage } from "./files.list.types";

export function welcomeUser() {
  console.log("\nWelcome to shared configuration files of Boehringer Ingelheim!\n");
}

export function sayGoodbye() {
  console.log("\nThank you for using shared configuration files of Boehringer Ingelheim!\n");
}

function getTo(targetRootPath: string, targetFolder: string, fileName?: string) {
  const folder = `${targetRootPath}/${targetFolder}`;
  const file = fileName ? `/${fileName}` : "";
  return folder + file;
}

export function doesFileExist(file: ConfigFile, location: string) {
  const to = getTo(location, file.targetFolder, file.name);
  return fs.existsSync(to);
}

export function copyFile(filesLocation: string, file: ConfigFile, location: string) {
  const from = `${filesLocation}/${file.name}`;
  const toFolder = getTo(location, file.targetFolder);
  const to = getTo(location, file.targetFolder, file.name);

  try {
    if (!fs.existsSync(toFolder)) {
      fs.mkdirSync(toFolder, { recursive: true });
    }
    fs.copyFileSync(from, to);
  } catch (err) {
    console.warn(err);
  }
}

export function pkgFromUserAgent(userAgent: string | undefined) {
  if (!userAgent) return undefined;

  const pkgSpec = userAgent.split(" ")[0];
  const pkgSpecArr = pkgSpec.split("/");

  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}

function installPackage(baseCmd: string, packs: ConfigPackage[], suffix: string) {
  const toInstall = bulkifyPackages(packs);

  // Install all packages at once
  const cmd = `${baseCmd} ${toInstall} ${suffix}`;

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

function bulkifyPackages(packages: ConfigPackage[]): string {
  return packages.map((p) => p.packages.join(" ")).join(" ");
}

export function installSharedPackages(packageManager: string, packages: ConfigPackage[]) {
  console.log("Installing your packages now ...");

  switch (packageManager) {
    case "npm":
      console.log(`Installing packages with npm`);
      installPackage("npm install", packages, "-D");
      break;
    case "yarn":
      console.log(`Installing packages with yarn`);
      installPackage("yarn add", packages, "-D");
      break;

    default:
      console.log(`We are sorry, but your package manager "${packageManager}" is not (yet) supported.`);
      break;
  }
}
