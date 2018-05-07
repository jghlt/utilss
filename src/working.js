
/**
 * @function  [filterUniqueClasses]
 * @returns {array} classes
 */

function filterProperties(classes, ) {
  const properties = config.properties;
  const customProperties = Object.keys(config.custom);
  const shorthandProperties = Object.keys(config.shorthand);
  const allProperties = properties.concat(customProperties, shorthandProperties);
  const array = classes.filter((className) => {
    const value = className.split('--')[0];
    if (allProperties.indexOf(value) > -1) {
      return className;
    }
  });
  return array;
}

function createRules(classes) {
  const rules = [];
  classes.forEach((value) => {
    const className = value;
    const classNameArray = className.split('--');
    const propertyKey = classNameArray[0];
    const propertyType = getPropertyType(propertyKey);
    const property = getProperty(propertyType, classNameArray);
    const propertyValue = getPropertyValue(propertyType, property);
    const breakpoint = getBreakpoint(classNameArray);
    if (classNameArray.length > 1) {
      const rule = {
        className,
        classNameArray,
        property,
        values: propertyValue,
        breakpoint
      };
      rules.push(rule);
    } else {
      console.log(`You have provided a property without a value: ${className}`);
    }
  });
  return rules;
}

function getPropertyType(propertyKey) {
  const propertyType = false;
  return propertyType;
}

function getProperty(propertyType) {
  const propertyType = false;
  return propertyType;
}

function getPropertyValue(propertyType, property) {
  return propertyType;
}

function getBreakpoint(classNameArray) {
  let key = false;
  const last = classNameArray[classNameArray.length - 1];
  const hasBreakpoint = last.indexOf('@') === 0;
  if (hasBreakpoint) {
    const breakpointArray = last.split('@');
    const breakpointKey = breakpointArray[1];
    // check if key exists in config here ...
    // let breakpointKeyExists = (true) ? breakpointKey : false
    key = breakpointKey;
  }
  return key;
}
wo
