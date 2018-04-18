#!/usr/bin/env node

const fs = require('fs')
const _ = require('lodash')
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
  const css = create(filtered)
  console.log(classes)
  console.log(filtered)
  console.log(css)
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

function filter (classes) {
  let properties = config.properties
  let array = classes.filter(function (className) {
    let value = className.split('--')[0]
    if (properties.indexOf(value) > -1) {
      return className
    }
  })
  return array
}

function create (filtered) {
  let css = ''
  let breakpoints = []
  filtered.forEach(function (className, index) {
    let array = className.split('--')
    let property = array[0]
    let value = array[1]
    let unit = (array[2]) ? array[2] : null
    let rule = `
      .${className}{
        ${property}:${value}${unit ? unit : ''};
      }`
    css = css += rule
  })
  return css
}
