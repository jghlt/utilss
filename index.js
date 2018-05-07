#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const async = require('async');
const config = require('./config');
const program = require('commander');

function listInput(value) {
  return value.split(',');
}

function extractClassnames(input) {
  const regex = /(?:class|className)=["']?([\d\w-_ @#]+)+["']?/g;
  let matches = [];
  let match = null;
  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(input)) !== null) {
    matches = matches.concat(match[1].split(' '));
  }
  return matches;
}

function getFileContents(file) {
  const exists = fs.existsSync(file);
  const content = (exists) ? fs.readFileSync(file, 'utf8') : false;
  if (!content) console.log(`${file} does not exist`);
  return content;
}

function getClassesFromFile(file) {
  const content = getFileContents(file);
  const classes = extractClassnames(content);
  return classes;
}

function getClassesFromFiles(files) {
  return Promise.all(files.map(file => getClassesFromFile(file)));
}

function run(files) {
  const classes = getClassesFromFiles(files);
  classes
    .then((values) => {
      console.log(values);
    })
    .catch((error) => {
      console.log(error);
    });
}

program
  .option('-i, --input <input>', 'input', listInput)
  .option('-o, --output <output>', 'output')
  .parse(process.argv);

run(program.input, program.output);
