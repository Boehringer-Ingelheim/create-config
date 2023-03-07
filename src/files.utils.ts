/* eslint-disable no-console */

import fs from "node:fs";

import { sync } from "cross-spawn";
import { ConfigFile, ConfigPackage } from "./files.list.types";

export function welcomeUser() {
  console.log("\nWelcome to shared configuration files of Boehringer Ingelheim!\n");
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

function installPackage(baseCmd: string, packs: string[], suffix: string) {
  packs.forEach((p) => {
    const cmd = `${baseCmd} ${p} ${suffix}`;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const { status } = sync(cmd, {
      stdio: "inherit",
    });

    if (typeof status === "number") {
      console.log(`Installing package "${p}" finished with status "${status}"`);
    }
  });
}

export function installSharedPackages(packageManager: string, packages: ConfigPackage[]) {
  console.log("Installing your packages now ...");

  switch (packageManager) {
    case "npm":
      packages.forEach((p) => {
        // Install packages
        console.log(`Installing packages with npm`);

        installPackage("npm install", p.packages, "-D");
      });
      break;
    case "yarn":
      packages.forEach((p) => {
        // Install packages
        console.log(`Installing packages with yarn`);

        installPackage(`yarn add`, p.packages, "-D");
      });
      break;

    default:
      console.log(`We are sorry, but your package manager "${packageManager}" is not (yet) supported.`);
      break;
  }
}
