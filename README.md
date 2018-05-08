# utilss

Generate utility classes via your templates.

## Features

todo

## Requirements

todo

## Usage

todo

## License

todo

## Acknowledgments

* Tachyons
* Basecss
* UnCss

w:100%@xlarge
bg-c:smoke
pa--vertical:1rem@medium
fill-parent:0@medium

// remove breakpoint
// does string contain : ?
// everything before : property (split agin for modifier)
// everything after : value

w:100%@xlarge
{
  selector: w:100%@xlarge,
  selectorParts: {
    property: "w",
    modifier: false,
    value: "100%",
    breakpoint: "xlarge"
  },
  isCustom: false,
  isModifier: false,
  isBreakpoint: true,
  declarations: [
    {
      property: "width",
      isColor: false, // if property name contains 'color' lookup color in config, else set value based on selectorParts if hex value
      isDynamic: false // if is modifier or custom & value contains $ getValue from selectorParts
      value: "100%", // set via passed in value for custom/modifiers, or if dynamic, set via selectorParts
    }
  ]
}

@media (min-width:80em) {
  .w\:100\%\@xlarge{
    width:100%;
  }
}

bg-c:smoke
{
  selector: bg-c:smoke,
  selectorParts: {
    property: "bg-c",
    modifier: false,
    value: "smoke",
    breakpoint: false
  },
  isCustom: false,
  isModifier: false,
  isBreakpoint: false,
  declarations: [
    {
      property: "background-color",
      isColor: true, // if property name contains 'color' lookup color in config, else set value based on selectorParts if hex value
      isDynamic: false // if is modifier or custom & value contains $ getValue from selectorParts
      value: "#f6f6f6", // if dynamic > set via selectorParts / if color => look up hex / set by passed in values
    }
  ]
}

.bg-c\:smoke{
  background-color:#f6f6f6;
}


pa--vertical:1rem@medium
{
  selector: pa--vertical:1em@medium,
  selectorParts: {
    property: "pa",
    modifier: "vertical",
    value: "1em",
    breakpoint: "medium"
  },
  isCustom: false,
  isModifier: true,
  isBreakpoint: true,
  declarations: [
    {
      property: "padding-left",
      isColor: false, // if property name contains 'color' lookup color in config, else set value based on selectorParts if hex value
      isDynamic: true // if is modifier or custom & value contains $ getValue from selectorParts
      value: "1em", // set via passed in value for custom/modifiers, or if dynamic, set via selectorParts
    }
  ]
}

@media (min-width:48em) {
  .pa--vertical\:1rem\@medium{
    background-top:1rem;
    background-bottom:1rem;
  }
}

fill-parent:0@medium
{
  selector: fill-parent:0@medium,
  selectorParts: {
    property: "fill-parent",
    modifier: false,
    value: "0",
    breakpoint: "medium"
  },
  isCustom: true,
  isModifier: false,
  isBreakpoint: true,
  declarations: [
    {
      property: "position",
      isColor: false, // if property name contains 'color' lookup color in config, else set value based on selectorParts if hex value
      isDynamic: true // if is modifier or custom & value contains $ getValue from selectorParts
      value: "absolute", // set via passed in value for custom/modifiers, or if dynamic, set via selectorParts
    },
    {
      property: "top",
      isColor: false, // if property name contains 'color' lookup color in config, else set value based on selectorParts if hex value
      isDynamic: true // if is modifier or custom & value contains $ getValue from selectorParts
      value: "0", // set via passed in value for custom/modifiers, or if dynamic, set via selectorParts
    },
    {
      property: "right",
      isColor: false, // if property name contains 'color' lookup color in config, else set value based on selectorParts if hex value
      isDynamic: true // if is modifier or custom & value contains $ getValue from selectorParts
      value: "0", // set via passed in value for custom/modifiers, or if dynamic, set via selectorParts
    },
    {
      property: "bottom",
      isColor: false, // if property name contains 'color' lookup color in config, else set value based on selectorParts if hex value
      isDynamic: true // if is modifier or custom & value contains $ getValue from selectorParts
      value: "0", // set via passed in value for custom/modifiers, or if dynamic, set via selectorParts
    },
    {
      property: "left",
      isColor: false, // if property name contains 'color' lookup color in config, else set value based on selectorParts if hex value
      isDynamic: true // if is modifier or custom & value contains $ getValue from selectorParts
      value: "0", // set via passed in value for custom/modifiers, or if dynamic, set via selectorParts
    }
  ]
}

@media (min-width:48em) {
  .fill-parent\:0\@medium{
    position:absolute;
    top:0;
    right:0;
    bottom:0;
    left:0;
  }
}

// generate
${ruleset.selector}{
  forEach.declarations as declaration{
    ${declaration.property}: ${declaration.value};
  }
};
