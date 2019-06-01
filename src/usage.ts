import chalk from "chalk";

const heading = chalk.bold.underline.green;
const line = chalk.green("-".repeat(64));
const { bold, inverse } = chalk;
const npmrc = inverse(".npmrc");
const npmrcname = inverse(".npmrc.[name]");
const usage = `
${heading("npmcu:")}

  A cli tool to manage multiple ${npmrc} files with a single command
${line}
${heading("usage:")}

  ${bold("npmcu [name]")}    :   replace ${npmrc} with ${npmrcname}
  ${bold("npmcu -l")}        :   list all ${npmrc} profiles
  ${bold("npmcu -n [name]")} :   copy current ${npmrc} file to ${npmrcname}
  ${bold("npmcu -h")}        :   display this message
`;

const printUsage = () => {
  console.log(usage);
  process.exit(1);
};

module.exports = printUsage;
