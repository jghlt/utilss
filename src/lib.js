const fs = require('fs');
const config = require('./config');


function list(value) {
  return value.split(',');
}

function getClassnames(input) {
  const regex = /(?:class|className)=["']?([\d\w-_ :@#%]+)+["']?/g;
  let match = null;
  let classNames = [];
  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(input)) !== null) {
    classNames = classNames.concat(match[1].split(' '));
  }
  return classNames.filter((value, index) => classNames.indexOf(value) === index);
}

function getFileContents(file) {
  const filesExists = fs.existsSync(file);
  const fileContents = (filesExists) ? fs.readFileSync(file, 'utf8') : false;
  if (!filesExists) console.log(`${file} does not exist`);
  return fileContents;
}

function getClassNamesFromFile(file) {
  const fileContents = getFileContents(file);
  const classNamesFromFile = getClassnames(fileContents);
  return classNamesFromFile;
}

function getClassNamesFromFiles(files) {
  return Promise.all(files.map(file => getClassNamesFromFile(file)));
}

function getFlattenedSelectors(selectors) {
  const flattenedSelectors = selectors.reduce((current, next) => current.concat(next), []);
  return flattenedSelectors;
}

function getUniqueSelectors(selectors) {
  const uniqueSelectors = selectors.filter((value, index) => selectors.indexOf(value) === index);
  return uniqueSelectors;
}

function getutilssSelectors(selectors) {
  const customKeys = Object.keys(config.custom);
  const propertyKeys = Object.keys(config.properties);
  const allKeys = [].concat(...customKeys, ...propertyKeys);
  const utilssSelectors = selectors.filter((selector) => {
    const selectorKey = selector.split(/:|--/)[0];
    return allKeys.indexOf(selectorKey) !== -1;
  });
  return utilssSelectors;
}

function getSelectorProperty(selector) {
  const selectorKey = selector.split(/:|--/)[0];
  const selectorProperty = selectorKey;
  return selectorProperty;
}

function getSelectorModifier(selector) {
  const hasModifier = selector.includes('--');
  let selectorModifier = false;
  if (hasModifier) {
    const regex = /(?:--)(.*?)(?:@|:)/;
    const match = selector.match(regex);
    if (match) {
      selectorModifier = match[1];
    } else {
      selectorModifier = selector.split('--')[1];
    }
  }
  return selectorModifier;
}

function getSelectorValue(selector) {
  const hasValue = selector.includes(':');
  let selectorValue = false;
  if (hasValue) {
    const regex = /:(.*)/;
    const removeBreakpoint = selector.split('@')[0];
    const match = removeBreakpoint.match(regex);
    if (match) {
      selectorValue = match[1];
    }
  }
  return selectorValue;
}

function getSelectorBreakpoint(selector) {
  const hasBreakpoint = selector.includes('@');
  let selectorBreakpoint = false;
  if (hasBreakpoint) {
    const regex = /@(.*)/;
    const match = selector.match(regex);
    if (match) {
      selectorBreakpoint = match[1];
    }
  }
  return selectorBreakpoint;
}

function getSelectorParts(selector) {
  const selectorProperty = getSelectorProperty(selector);
  const selectorModifier = getSelectorModifier(selector);
  const selectorValue = getSelectorValue(selector);
  const selectorBreakpoint = getSelectorBreakpoint(selector);
  const selectorParts = {
    property: selectorProperty,
    modifier: selectorModifier,
    value: selectorValue,
    breakpoint: selectorBreakpoint
  };
  return selectorParts;
}

function getSelectorObjects(selectors) {
  const selectorObjects = [];
  selectors.forEach((selector) => {
    const selectorParts = getSelectorParts(selector);
    selectorObjects.push(selectorParts);
  });
  return selectorObjects;
}

function getRuleSetObjects(objects) {
  const ruleSetObjects = [];
}

function utilss(files) {
  const classNamesFromFiles = getClassNamesFromFiles(files);
  classNamesFromFiles
    .then((result) => {
      const flattenSelectors = getFlattenedSelectors(result);
      const uniqueSelectors = getUniqueSelectors(flattenSelectors);
      const utilssSelectors = getutilssSelectors(uniqueSelectors);
      const utilssSelectorsObjects = getSelectorObjects(utilssSelectors);
      //console.log('utilssSelectorsObjects');
      console.log(utilssSelectorsObjects);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  list,
  utilss
};
