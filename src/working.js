
function getSelectorProperty(selector) {
  let selectorProperty = false;
  return selectorProperty;
}

function getSelectorModifier(selector) {
  let selectorModifier = false;
  return selectorModifier;
}

function getSelectorValue(selector) {
  let selectorValue = false;
  return selectorValue;
}

function getSelectorBreakpoint(selector) {
  let selectorBreakpoint = false;
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
