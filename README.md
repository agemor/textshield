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

Modules like `Encoder` is reachable as named module while default export indicates `TextShield` module.

```javascript
import TextShield, { Encoder, Decoder } from "textshield";
```

## Usage

With the presence of TextShield plugin, texts that contains sensitive information can protected from bots with following steps.

### 1. Text encoding

Suppose that we have HTML text like below and we would like to protect the email part.

```
Please email me at example@example.com
```

Using the TextShield [web encoder](https://agemor.github.io/textshield/), we can convert `example@example.com` to protected code.

```xml
Please email me at <shield>oIeOu5qmeBX0YXHpLZNWN/6BcAwf/j8KJ3LXcEWOE7VacvgSGOsskNLrALw=XU1QHTg0PHA9OgQ=AVkQYQYmAg==</shield>
```

Or by using server-side TextShield encoding libaray, desired text can be encoded dynamically. Currently, [Node.js](https://github.com/agemor/textshield-node/) and [PHP](https://agemor.github.io/textshield-php) plugin is supported.

```php
Please email me at
<?
echo "<shield>";
echo TextShield.encode("example@example.com", TextShield.Cost.Low);
echo "</shield>";
?>
```

### 2. Text rendering

Three text rendering options are available.

- `PLAIN`
- `NORMAL`
- `DISTORT`

## License

TextShield is released under the [MIT License](http://opensource.org/licenses/MIT).
