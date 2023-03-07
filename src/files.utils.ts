/* eslint-disable no-console */

import fs from "node:fs";

import { sync } from "cross-spawn";
import { ConfigFile } from "./files.list.types";

export function welcomeUser() {
  console.log("\nWelcome to shared configuration files of Boehringer Ingelheim!\n");
}

function getTo(targetRootPath: string, targetFolder: string, fileName: string) {
  return `${targetRootPath}/${targetFolder}/${fileName}`;
}

export function doesFileExist(file: ConfigFile, location: string) {
  const to = getTo(location, file.targetFolder, file.name);
  return fs.existsSync(to);
}

export function copyFile(file: ConfigFile, location: string) {
  const from = `./files/${file.name}`;
  const to = getTo(location, file.targetFolder, file.name);

  try {
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

function installPackage(cmd: string, pack: string) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const { status } = sync(cmd, {
    stdio: "inherit",
  });

  if (typeof status === "number") {
    console.log(`Installing package "${pack}" finished with status "${status}"`);
  }
}

export function installSharedPackages(packageManager: string, packages: string[]) {
  console.log("Installing your packages now ...");

  switch (packageManager) {
    case "npm":
      packages.forEach((p) => {
        // Install package
        console.log(`Installing "${p}" with npm`);

        installPackage(`npm install ${p} -D`, p);
      });
      break;
    case "yarn":
      packages.forEach((p) => {
        // Install package
        console.log(`Installing "${p}" with yarn`);

        installPackage(`yarn add ${p} -D`, p);
      });
      break;

    default:
      console.log(`We are sorry, but your package manager "${packageManager}" is not (yet) supported.`);
      break;
  }
}
