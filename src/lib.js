
const extractClassesFromInput = (input) => {
  const regex = /(?:class|className)=["']?([\d\w-_ @]+)+["']?/g;
  let classes = [];
  let result;
  while (true) {
    result = regex.exec(input);
    if (!result) {
      break;
    }
    classes = classes.concat(result[1].split(' '));
  }
  if (classes.length <= 1) {
    return classes;
  }
  return classes;
};


const getClassesFromInputFiles = (inputs) => {
  const classes = [];
  inputs.forEach((input) => {
    const found = extractClassesFromInput(input);
    classes.push(found);
  });
  return classes;
};


const filterUniqueClasses = (classes) => {
  return classes.filter((value, index) => classes.indexOf(value) === index);
};


module.exports = {
  getClassesFromInputFiles
};
