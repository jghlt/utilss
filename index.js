#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const glob = require('glob')
const pjson = require('./package')
const config = require('./config')
const program = require('commander')

program
  .version(pjson.version)
  .option('-i, --input <input>', 'input')
  .option('-o, --output <output>', 'output')
  .parse(process.argv)

fs.readFile(program.input, 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  const classes = extract(data)
  const filtered = filter(classes)
  console.log(classes)
})

function extract (file) {
  let regex = /(?:class|className)=["']?([\d\w-_ @]+)+["']?/g
  let array = []
  let result

  while (true) {
    result = regex.exec(file)
    if (!result) {
      break
    }
    array = array.concat(result[1].split(' '))
  }

  if (array.length <= 1) {
    return array
  }

  return array.filter(function (value, index) {
    return array.indexOf(value) === index
  })
}

//
function filter (classes) {
}

//
function create () {
}

//
function save () {
}
