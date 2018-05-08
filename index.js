#!/usr/bin/env node
const program = require('commander');

const {
  list,
  utilss
} = require('./src/lib.js');

program
  .option('-i, --input <input>', 'input', list)
  .option('-o, --output <output>', 'output')
  .parse(process.argv);

utilss(program.input, program.output);
