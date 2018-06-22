#!/usr/bin/env node

const program = require('commander');
const {
  list,
  utilss
} = require('./utilss.js');

program
  .option('-i, --input <input>', 'input', list)
  .option('-o, --output <output>', 'output')
  .option('-c, --config <config>', 'config')
  .parse(process.argv);

utilss(program.input, program.output, program.config);
