const fs = require('fs');
const props = require('./props');

let config = {
  breakpoints: {},
  properties: props,
  modifiers: {},
  custom: {},
  colors: {}
};

function list(value) {
  return value.split(',');
}

function escapeSelectorString(selector) {
  return selector
    .replace(/[\\^:@#%\s]/g, '\\$&');
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

function getUtilssSelectors(selectors) {
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
  const selectorProperty = config.properties[selectorKey] || selectorKey;
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
  const isColor = (selector.includes('bg-c:') || selector.includes('c:'));
  let selectorValue = false;
  if (hasValue) {
    const regex = /:(.*)/;
    const removeBreakpoint = selector.split('@')[0];
    const match = removeBreakpoint.match(regex);
    if (match) {
      selectorValue = match[1];
    }
    if (isColor) {
      selectorValue = (
        (selectorValue in config.colors) ? config.colors[selectorValue] : selectorValue
      );
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

function getSelectorBreakpointValue(breakpoint) {
  const breakpointKey = breakpoint;
  let breakpointValue = false;
  if (breakpointKey) {
    breakpointValue = config.breakpoints[breakpointKey];
  }
  return breakpointValue;
}

function getSelectorParts(selector) {
  const selectorProperty = getSelectorProperty(selector);
  const selectorModifier = getSelectorModifier(selector);
  const selectorValue = getSelectorValue(selector);
  const selectorBreakpoint = getSelectorBreakpoint(selector);
  const selectorBreakpointValue = getSelectorBreakpointValue(selectorBreakpoint);
  const selectorParts = {
    selector,
    property: selectorProperty,
    modifier: selectorModifier,
    value: selectorValue,
    breakpoint: selectorBreakpoint,
    breakpointValue: selectorBreakpointValue
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

function getRulesetIsCustom(selectorObject) {
  const configKey = selectorObject.property;
  const rulesetIsCustom = (configKey && (configKey in config.custom)) || false;
  return rulesetIsCustom;
}

function getRulesetIsModifier(selectorObject) {
  const propertyKey = selectorObject.property;
  const modifierKey = selectorObject.modifier;
  const rulesetIsModifier = (
    (propertyKey && (propertyKey in config.modifiers)) &&
    (modifierKey && (modifierKey in config.modifiers[propertyKey]))
  ) || false;
  return rulesetIsModifier;
}

function getRulesetIsBreakpoint(selectorObject) {
  const configKey = selectorObject.breakpoint;
  const rulesetIsBreakpoint = (configKey && (configKey in config.breakpoints)) || false;
  return rulesetIsBreakpoint;
}

function getRulesetDeclarations(selectorObject, rulesetIsCustom, rulesetIsModifier) {
  const rulesetDeclarations = [];
  if (rulesetIsCustom) {
    rulesetDeclarations.push('custom');
  } else if (rulesetIsModifier) {
    rulesetDeclarations.push('modifier');
  } else {
    rulesetDeclarations.push('normal');
  }
  return rulesetDeclarations;
}

function getRulesetObject(selectorObject) {
  const rulesetIsCustom = getRulesetIsCustom(selectorObject);
  const rulesetIsModifier = getRulesetIsModifier(selectorObject);
  const rulesetIsBreakpoint = getRulesetIsBreakpoint(selectorObject);
  const rulesetDeclarations = getRulesetDeclarations(selectorObject, rulesetIsCustom, rulesetIsModifier);
  const rulesetObject = {
    selector: selectorObject.selector,
    escapedSelector: escapeSelectorString(selectorObject.selector),
    selectorParts: { ...selectorObject },
    isCustom: rulesetIsCustom,
    isModifier: rulesetIsModifier,
    isBreakpoint: rulesetIsBreakpoint,
    declarations: rulesetDeclarations,
    isValidUtilssObject: (rulesetIsModifier || rulesetIsCustom || (selectorObject.value !== false))
  };
  return rulesetObject;
}

function getRulesetObjects(objects) {
  const ruleSetObjects = [];
  objects.forEach((object) => {
    const rulesetObject = getRulesetObject(object);
    ruleSetObjects.push(rulesetObject);
  });
  return ruleSetObjects;
}

function utilss(userInput, userOutput, userConfig) {
  const userConfigObject = (userConfig) ? JSON.parse(getFileContents(userConfig)) : {};
  config = Object.assign(config, userConfigObject);
  const classNamesInputFiles = getClassNamesFromFiles(userInput);
  classNamesInputFiles
    .then((result) => {
      const flattenSelectors = getFlattenedSelectors(result);
      const uniqueSelectors = getUniqueSelectors(flattenSelectors);
      const utilssSelectors = getUtilssSelectors(uniqueSelectors);
      const utilssSelectorsObjects = getSelectorObjects(utilssSelectors);
      const utilssRulesetObjects = getRulesetObjects(utilssSelectorsObjects);
      let cssString = '';
      utilssRulesetObjects.forEach((object) => {
        const {
          escapedSelector,
          selectorParts
        } = object;
        if (selectorParts.breakpoint && selectorParts.breakpointValue) {
          cssString += `
            @media screen and ${selectorParts.breakpointValue} {
              .${escapedSelector} {
                ${selectorParts.property}: ${selectorParts.value};
              }
            }
          `;
        } else {
          cssString += `
            .${escapedSelector} {
              ${selectorParts.property}: ${selectorParts.value};
            }
          `;
        }
      });
      fs.writeFile(userOutput, cssString, (error) => {
        if (error) {
          return console.log(error);
        }
        return console.log('finished');
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  list,
  utilss
};
