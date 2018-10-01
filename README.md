<img src="icon.png" align="right" />

# TextShield

> Protect sensitive information aganist unwanted web crawling and scraping bots.

## Demo

Basic features and functionalities are introduced in demo:
[TextShield Demo](https://agemor.github.io/textshield/)

## Getting started

Prebuilt TextShield library `textshield.js` is available in _releases_. Once the script is included in the page, you're all set!

### NPM Install

TextShield can be installed with npm with TypeScript support.

```
$ npm install textshield
```

Modules like `Encoder` are reachable as named module while default export indicates `TextShield` module.

```javascript
import TextShield, { Encoder, Decoder } from "textshield";
```

## Usage

With the presence of TextShield plugin, texts that contain sensitive information can protected from bots with following steps.

### 1. Text encoding

Suppose that we have HTML text like below and we would like to protect the email part.

```
Please email me at example@example.com
```

Using the TextShield [web encoder](https://agemor.github.io/textshield/), we can convert `example@example.com` to protected code.

```xml
Please email me at <shield>oIeOu5qmeBX0YXHpLZNWN/6BcAwf/j8KJ3LXcEWOE7VacvgSGOsskNLrALw=XU1QHTg0PHA9OgQ=AVkQYQYmAg==</shield>
```

Or by using server-side TextShield encoding libaray, desired text can be encoded dynamically. Currently, [Node.js](https://github.com/agemor/textshield-node/) plugin is supported.

```html
Please email me at <shield>
<%= TextShield.encode("example@example.com", DecodeCost.Low); %>
</shield>
```

### 2. Text rendering

Three text rendering options are available.

- `PLAIN`: Display text as normal page text. Best in user experience but cannot protect bots with JavaScript engine.
- `NORMAL`: Render text in `canvas` element. Can protect most bots.
- `DISTORT`: Apply live distortion effect to canvas rendered text. It is able to protect rare bots that integrates OCR technology.

Rendering options are set through `mode` attribute in `<shield>` tag.

```xml
<shield mode="distort"> ... </shield>
```

## Contribution

Any kind of contributions or questions are heartly welcomed.

## License

TextShield is released under the [MIT License](http://opensource.org/licenses/MIT).
