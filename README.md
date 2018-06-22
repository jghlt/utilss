# utilss

CLI tool for generating functional css utility classes.

## Install
```
npm i -s utilss
```

## Usage
```
utilss --help

  Usage: utilss [options]

  Options:

    -i, --input <input>    input
    -o, --output <output>  output
    -c, --config <config>  config
```


## Features

utilss is CLI tool for generating functional css utility classes. It allows you to write functional declarative styles directly within your templates.

Pass in some html:

```html
<div class="p:relative w:100%">
  <div class="pa--vertical:1rem@medium">
    <div class="pa--lateral:2rem">
      <div class="pa:2rem">
        <h1 class="f-s:24px l-h:1">
          utilss
        </h1>
      </div>
    </div>
  </div>
</div>
```

or jsx:

```js
function Header(props) {
  const { title } = props;
  return (
    <div className="p:relative w:100%">
      <div className="pa--vertical:1rem@medium">
        <div className="pa--lateral:2rem">
          <div className="pa:2rem pa:4rem@medium">
            <h1 className="f-s:24px l-h:1">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
```

Get back some css:

```css
.p\:relative{
  position:relative;
}

.w-100\%{
  width:100%;
}

.pa--vertical\:1rem{
  padding-top:1rem;
  padding-bottom:1rem;
}

.pa--lateral\:2rem{
  padding-left:2rem;
  padding-left:2rem;
}

.pa\:2rem{
  padding:2rem;
}

.pa\:4rem{
  padding:4rem;
}

.f-s\:24px{
  font-size:24px;
}

.l-h\:1{
  line-height:1;
}
```

## Examples

### Basic

input.html
```html
<h1 class="font-size:2rem color:#1a1a1a">
  Basic
</h1>
```

output.css
```css
.font-size\:2rem{
  font-size:2rem;
}

.color\:\#1a1a1a{
  color:#1a1a1a;
}
```

### Shorthand

input.html
```html
<h1 class="f-s:2rem c:#1a1a1a">
  Shorthand
</h1>
```

output.css
```css
.font-size\:2rem{
  font-size:2rem;
}

.color\:\#1a1a1a{
  color:#1a1a1a;
}
```

### Breakpoints

config.json
```json
{
  "breakpoints": {
    "medium": "(min-width:48em)"
  }
}
```

input.html
```html
<h1 class="f-s:2rem f-s:2rem@medium c:#1a1a1a">
  Breakpoints
</h1>
```

output.css
```css
.font-size\:2rem{
  font-size:2rem;
}

.color\:\#1a1a1a{
  color:#1a1a1a;
}

@media screen and (min-width:48em) {
  .font-size\:4rem{
    font-size:4rem;
  }
}
```

### Modifiers

config.json
```json
{
  "breakpoints": {
    "medium": "(min-width:48em)"
  },
  "modifiers": {
    "pa": {
      "lateral": {
        "padding-left": "$value",
        "padding-right": "$value"
      },
      "vertical": {
        "padding-top": "$value",
        "padding-bottom": "$value"
      }
    },
    "f-s": {
      "body": {
        "font-size": "16px"
      },
      "title": {
        "font-size": "24px"
      }
    }
  }
}
```

input.html
```html
<div class="pa--lateral:2rem pa--lateral:4rem@medium pa--vertical:20px">
  <h2 class="f-s--title c:#1a1a1a">
    Modifiers
  </h2>
</div>
<div class="pa--lateral:2rem pa--lateral:4rem@medium pa--vertical:20px">
  <p class="f-s--body c:#1a1a1a">
    Modifiers
  </p>
</div>
```

output.css
```css
.pa--lateral\:2rem{
  padding-left:2rem;
  padding-left:2rem;
}

.pa--vertical\:20px{
  padding-top:20px;
  padding-bottom:20px;
}

@media screen and (min-width:48em) {
  .pa--lateral\:4rem{
    padding-left:4rem;
    padding-left:4rem;
  }
}
```

### Custom
config.json
```json
{
  "custom": {
    "ff-mono": {
      "font-family": "'Space Mono', monospace",
      "font-weight": "400"
    },
    "ff-mono-bold": {
      "font-family": "'Space Mono', monospace",
      "font-weight": "700"
    },
    "fill-parent":{
      "position": "absolute",
      "top": "$value",
      "right": "$value",
      "bottom": "$value",
      "left": "$value"
    }
  }
}
```

input.html
```html
<div class="p:relative">
  <div class="fill-parent:0">
    <h2 class="ff-mono">
      <span class="ff-mono-bold d:block">
        ff mono bold
      </span>
      <span class="d:block">
        ff mono
      </span>
    </h2>
  </div>
</div>
```

output.css
```css
.p\:relative{
  position:relative;
}

.fill-parent\:0{
  position:absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
}

.fill-parent\:20px{
  position:absolute;
  top:20px;
  right:20px;
  bottom:20px;
  left:20px;
}
```


### Colors

config.json
```json
{
  "colors": {
    "black": "#1a1a1a",
    "white": "#fefefe",
    "smoke": "#f6f6f6",
    "grey": "#4E4E4E"
  }
}
```

input.html
```html
<div class="bg-c:smoke">
  <h1 class="font-size:2rem color:black">
    <span class="d:block">
      Color black
    </span>
    <span class="d:block c:grey">
      Color grey
    </span>
  </h1>
</div>
```

output.css
```css
.bg-c\:smoke{
  background-color:#f6f6f6;
}

.font-size\:2rem{
  font-size:2rem;
}

.color\:black{
  color:#1a1a1a;
}

.d\:block{
  display:block;
}

.c\:grey{
  color:#4E4E4E;
}
```

### More
See examples folder for more use cases


## Todo
- [ ] generate css
- [ ] merge & move media queries to end of css file
- [ ] merge config.json & props.json
- [ ] add jsdoc comments
- [ ] publish to npm
- [ ] webpack plugin

## Acknowledgments

* Tachyons
* Basecss
* UnCss
* Atomic CSS
* svbstrate
* shed-css

## License

MIT
