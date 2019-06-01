import chalk from "chalk";
import { exec } from "child_process";
import fs from "fs";

const { bold } = chalk;

const { HOME } = process.env;
const prefix = /.npmrc./;

const getPath = (name = ""): string => {
  return `${HOME}/.npmrc${name ? `.${name}` : ""}`;
};

const npmrcExists = (name = ""): boolean => {
  return fs.existsSync(getPath(name));
};

export const create = (name: string) => {
  if (!HOME) {
    console.log("$HOME is undefined");
    return;
  }

  if (!npmrcExists()) {
    console.log(`${bold(`.npmrc`)} does not exist in ${bold(HOME)}`);
    return;
  }

  if (npmrcExists(name)) {
    console.log(`${bold(`.npmrc.${name}`)} already exists!`);
  }

  fs.copyFileSync(getPath(), getPath(name));
  console.log(`created ${bold(getPath(name))}`);
};

export const list = () => {
  if (!HOME) {
    console.log("$HOME is undefined");
    return;
  }
  fs.readdir(HOME, (err, files) => {
    if (err) {
      console.log(err);
      return;
    }
    files.forEach(file => {
      if (prefix.test(file)) {
        console.log(file.replace(prefix, ""));
      }
    });
  });
};

export const npmcu = (name: string) => {
  if (!HOME) {
    console.log("$HOME is undefined");
    return;
  }

  if (!npmrcExists(name)) {
    console.log(`${bold(`.npmrc.${name}`)} does not exist in ${bold(HOME)}`);
    return;
  }

  fs.copyFileSync(getPath(name), getPath());
  console.log(chalk(bold("npm whoami")));
  exec(`npm whoami`, (error, stdout, stderr) => {
    if (error) {
      console.error(stderr);
      return;
    }
    console.log(stdout);
  });
};
