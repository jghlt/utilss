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
  const propertyKeys = Object.keys(config.properties);
  const utilssSelectors = selectors.filter((selector) => {
    const selectorKey = selector.split(/:|--/)[0];
    return propertyKeys.indexOf(selectorKey) !== -1;
  });
  return utilssSelectors;
}

function utilss(files) {
  const classNamesFromFiles = getClassNamesFromFiles(files);
  classNamesFromFiles
    .then((result) => {
      const flattenSelectors = getFlattenedSelectors(result);
      const uniqueSelectors = getUniqueSelectors(flattenSelectors);
      const utilssSelectors = getutilssSelectors(uniqueSelectors);
      console.log('utilssSelectors');
      //console.log(utilssSelectors);
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  list,
  utilss
};
