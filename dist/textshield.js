!function(r){var n={};function o(t){if(n[t])return n[t].exports;var e=n[t]={i:t,l:!1,exports:{}};return r[t].call(e.exports,e,e.exports,o),e.l=!0,e.exports}o.m=r,o.c=n,o.d=function(t,e,r){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=6)}([function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});
/**
 * Basic implementation of base64 encoder/decoder
 *
 * @version 1.0.0
 * @author HyunJun Kim
 * @license MIT
 */
var n=function(){function c(){}return c.encode=function(t){var e=c.CharacterTable,r="",n=0;do{var o=t.charCodeAt(n++),i=t.charCodeAt(n++),a=t.charCodeAt(n++),u=(o=o||0)>>2&63,s=(3&o)<<4|(i=i||0)>>4&15,f=(15&i)<<2|(a=a||0)>>6&3,l=63&a;i?a||(l=64):f=l=64,r+=e.charAt(u)+e.charAt(s)+e.charAt(f)+e.charAt(l)}while(n<t.length);return r},c.decode=function(t){var e=c.CharacterTable,r="",n=0;do{var o=e.indexOf(t.charAt(n++)),i=e.indexOf(t.charAt(n++)),a=e.indexOf(t.charAt(n++)),u=(63&o)<<2|i>>4&3,s=(15&i)<<4|a>>2&15,f=(3&a)<<6|63&e.indexOf(t.charAt(n++));r+=String.fromCharCode(u)+(s?String.fromCharCode(s):"")+(f?String.fromCharCode(f):"")}while(n<t.length);return r},c.CharacterTable="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",c}();e.Base64=n,e.default=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function n(t,e,r){this.salt=t,this.lock=e,this.message=r}return n.prototype.toString=function(){return this.salt+this.lock+this.message},n.parse=function(t,e,r){return void 0===e&&(e=16),void 0===r&&(r=44),t.length<=e+r?null:new n(t.slice(0,e),t.slice(e,e+r),t.slice(e+r))},n}();e.EncodedMessage=n,e.default=n},function(t,e,r){"use strict";var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=n(r(3)),i=n(r(4)),a=function(){function n(){}return n.prototype.decode=function(t){var e=this.resolveHash(t.salt,t.lock);if(e<0)return null;var r=t.salt+e,n=this.reverseString(r);return i.default.decrypt(t.message,n)},n.prototype.resolveHash=function(t,e){for(var r=0;r<n.MAX_ATTEMPTS;){if(o.default.hash(t+r)==e)return r;r++}return-1},n.prototype.reverseString=function(t){return t.split("").reverse().join("")},n.MAX_ATTEMPTS=1e8,n}();e.Decoder=a,e.default=a},function(t,e,r){"use strict";var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var b=n(r(0)),o=function(){function x(){}return x.hash=function(t){t+=String.fromCharCode(128);for(var e=Math.ceil((t.length/4+2)/16),r=new Uint32Array(16*e),n=0;n<e;n++)for(var o=0;o<16;o++)r[16*n+o]=t.charCodeAt(64*n+4*o+0)<<24|t.charCodeAt(64*n+4*o+1)<<16|t.charCodeAt(64*n+4*o+2)<<8|t.charCodeAt(64*n+4*o+3)<<0;var i=Math.floor(8*(t.length-1)/Math.pow(2,32)),a=8*(t.length-1)|0;r[16*(e-1)+14]=i,r[16*(e-1)+15]=a;var u,s,f,l,c,d,h,v,p,y,g,m,_=new Uint32Array([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]);for(n=0;n<e;n++){for(var C=new Uint32Array(64),S=0;S<16;S++)C[S]=r[16*n+S];for(S=16;S<64;S++)p=((p=C[S-2])>>>17|p<<15)^(p>>>19|p<<13)^p>>>10,y=((y=C[S-15])>>>7|y<<25)^(y>>>18|y<<14)^y>>>3,C[S]=p+C[S-7]+y+C[S-16]|0;u=_[0],s=_[1],f=_[2],l=_[3],c=_[4],d=_[5],h=_[6],v=_[7];for(S=0;S<64;S++)g=(u>>>2|u<<30)^(u>>>13|u<<19)^(u>>>22|u<<10),m=u&s|f&(u^s),p=v+((c>>>6|c<<26)^(c>>>11|c<<21)^(c>>>25|c<<7))+(h^c&(d^h))+x.K[S]+C[S],v=h,h=d,d=c,c=l+p|0,l=f,f=s,s=u,u=p+(y=g+m)|0;_[0]=_[0]+u|0,_[1]=_[1]+s|0,_[2]=_[2]+f|0,_[3]=_[3]+l|0,_[4]=_[4]+c|0,_[5]=_[5]+d|0,_[6]=_[6]+h|0,_[7]=_[7]+v|0}var w=new Uint8Array(4*_.length),M="";for(n=0;n<_.length;n++)w[4*n]=(4278190080&_[n])>>24,w[4*n+1]=(16711680&_[n])>>16,w[4*n+2]=(65280&_[n])>>8,w[4*n+3]=255&_[n];for(n=0;n<w.byteLength;n++)M+=String.fromCharCode(w[n]);return b.default.encode(M)},x.K=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),x}();
/**
 * Practical implementation of SHA-256 algorithm
 * based on FIPS PUB 180-2 specification
 *
 * @version 1.0.0
 * @author HyunJun Kim
 * @license MIT
 */e.Sha256=o,e.default=o},function(t,e,r){"use strict";var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=n(r(0)),i=n(r(8)),a=function(){function t(){}return t.encrypt=function(t,e){return o.default.encode(i.default.encode(this.encode(t,e)))},t.decrypt=function(t,e){return this.encode(i.default.decode(o.default.decode(t)),e)},t.encode=function(t,e){var r="";e=this.trimKey(e,t.length);for(var n=0;n<t.length;n++)r+=String.fromCharCode(t.charCodeAt(n)^e.charCodeAt(n));return r},t.trimKey=function(t,e){if(t.length>e)t=t.substring(0,e);else for(var r=t.length;r<e;r++)t+=t.charAt(r-t.length);return t},t}();e.XorCipher=a,e.default=a},function(t,e,r){"use strict";var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=n(r(9)),i=function(){function t(t,e){this.devicePixelRatio=window.devicePixelRatio||2,this.text=t,this.style=e,this.createCanvas(),this.initializeCanvas()}return t.prototype.applyDistortion=function(){this.filter=new o.default(this.canvas,.5)},t.prototype.createCanvas=function(){this.canvas=document.createElement("canvas"),this.canvasContext=this.canvas.getContext("2d")},t.prototype.initializeCanvas=function(){var t=this.canvasContext;t.font=this.style.getCanvasFont();var e=t.measureText(this.text).width,r=1.1*this.style.fontSize;t.canvas.width=e*this.devicePixelRatio,t.canvas.height=r*this.devicePixelRatio,t.fillStyle=this.style.fontColor,t.font=this.style.getCanvasFont(this.devicePixelRatio),t.textBaseline="bottom",t.fillText(this.text,0,r*this.devicePixelRatio),t.canvas.style.width=e+"px",t.canvas.style.height=r+"px",t.canvas.style.verticalAlign="text-bottom"},t.prototype.getCanvas=function(){return this.canvas},t}();
/**
 * TextShield Text Display
 *
 * Renders decoded text into bot-safe formats.
 * It automatically detects and formulates text style based on the context
 * the original text is located.
 *
 * Canvas filter is supported for protect OCR based bots.
 *
 * @version 1.0.0
 * @author HyunJun Kim
 * @license MIT
 */e.TextDisplay=i,e.default=i},function(t,e,r){"use strict";var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=n(r(7)),i=n(r(12));e.Encoder=i.default;var a=n(r(2));e.Decoder=a.default;var u=n(r(1));e.EncodedMessage=u.default;var s=n(r(5));function f(){new o.default(document.body,null)}e.TextDisplay=s.default,window.TextShieldEncoder=new i.default,window.TextShieldDecoder=new a.default,window.TextShieldEncodedMessage=u.default,window.TextShieldLoad=f,window.onload=function(){f()},e.default=o.default},function(t,e,r){"use strict";var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=n(r(2)),f=n(r(1)),l=n(r(5)),c=n(r(11)),i=function(){function t(t,e){this.body=t,this.decoder=new o.default,this.initialize()}return t.prototype.initialize=function(){for(var t=0,e=this.getShieldedElements();t<e.length;t++){var r=e[t],n=(r.getAttribute("value")||"").trim(),o=(r.getAttribute("mode")||"normal").toLowerCase().trim(),i=f.default.parse(n);if(i){var a=this.decoder.decode(i);if("plain"==o)r.textContent=a;else{var u=new c.default(window.getComputedStyle(r)),s=new l.default(a,u);r.parentNode.replaceChild(s.getCanvas(),r),"distort"==o&&s.applyDistortion()}}}},t.prototype.getShieldedElements=function(){var t=this.body.getElementsByTagName("shield");return Array.prototype.slice.call(t)},t}();e.TextShield=i,e.default=i},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});
/**
 * Basic Utf-8 encoder
 *
 * @version 1.0.0
 * @author HyunJun Kim
 * @license MIT
 */
var n=function(){function t(){}return t.encode=function(t){t=t.replace(/\r\n/g,"\n");for(var e="",r=0;r<t.length;r++){var n=t.charCodeAt(r);n<128?e+=String.fromCharCode(n):(127<n&&n<2048?e+=String.fromCharCode(n>>6|192):(e+=String.fromCharCode(n>>12|224),e+=String.fromCharCode(n>>6&63|128)),e+=String.fromCharCode(63&n|128))}return e},t.decode=function(t){for(var e="",r=0,n=0,o=0,i=0;r<t.length;)(n=t.charCodeAt(r))<128?(e+=String.fromCharCode(n),r++):191<n&&n<224?(o=t.charCodeAt(r+1),e+=String.fromCharCode((31&n)<<6|63&o),r+=2):(o=t.charCodeAt(r+1),i=t.charCodeAt(r+2),e+=String.fromCharCode((15&n)<<12|(63&o)<<6|63&i),r+=3);return e},t}();e.Utf8=n,e.default=n},function(t,e,r){"use strict";var n,i=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var a=function(o){function t(t,e,r){void 0===r&&(r=60);var n=o.call(this,t)||this;return n.frames=0,n.amplitude=Math.max(n.canvas.height/30,0),n.frequency=e,n.frameRate=r,n.apply(),n}return i(t,o),t.prototype.apply=function(){var t=this;if(this.frames%3==0){for(var e=this.target.data,r=this.source.data,n=void 0,o=void 0,i=void 0,a=this.amplitude,u=Math.floor(a),s=this.canvas.width,f=this.canvas.height,l=this.frames*this.frequency/this.frameRate,c=2*Math.PI,d=u;d<s-u;++d){n=Math.round(a*Math.cos(c*(3*d/s+l)));for(var h=u;h<f-u;++h)i=(h+n)*s*4+4*(d+Math.round(a*Math.sin(c*(3*h/f+l)))),e[o=h*s*4+4*d]=r[i],e[o+1]=r[i+1],e[o+2]=r[i+2],e[o+3]=r[i+3]}this.context.putImageData(this.target,0,0)}this.frames++,window.requestAnimationFrame(function(){return t.apply()})},t}(o(r(10)).default);
/**
 * Sinusoidal distortion effect filter
 * that renders liquid-like motions to given canvas
 * Main advantage of using sinusoidal distortion filter is that
 * text boundaries are not affected while protecting OCR.
 *
 * @version 1.0.0
 * @author HyunJun Kim
 * @license MIT
 */e.SinusoidalDistortionFilter=a,e.default=a},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});
/**
 * Superclass for all filter effects
 *
 * @version 1.0.0
 * @author HyunJun Kim
 * @license MIT
 */
var n=function(){function t(t){this.canvas=t,this.context=t.getContext("2d"),this.initialize()}return t.prototype.initialize=function(){var t=this.canvas.width,e=this.canvas.height;this.source=this.context.getImageData(0,0,t,e),this.target=this.context.createImageData(t,e),this.context.imageSmoothingEnabled=!1},t}();e.Filter=n,e.default=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});
/**
 * TextShield Text Style
 *
 * Parse required text style to reconstruct canvas text that matches original appereances.
 * Usually, given css style is calculated by getComputedStyle() function.
 *
 * @version 1.0.0
 * @author HyunJun Kim
 * @license MIT
 */
var n=function(){function t(t){null!=t&&this.loadCssStyle(t)}return t.prototype.loadCssStyle=function(e){var t,r=function(t){return e.getPropertyValue(t)};this.fontStyle=r("font-style"),this.fontVariant=r("font-variant"),this.fontWeight=r("font-weight"),this.fontSize=(t=r("font-size"),Number(t.split("px")[0])),this.fontFamily=r("font-family"),this.fontColor=r("color")},t.prototype.getCanvasFont=function(t){void 0===t&&(t=1);return this.fontStyle+" "+this.fontVariant+" "+this.fontWeight+" "+this.fontSize*t+"px "+this.fontFamily},t}();e.TextStyle=n,e.default=n},function(t,e,r){"use strict";var n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o,i,a=n(r(1)),u=n(r(3)),s=n(r(4)),f=n(r(0));(i=o=e.DecodeCost||(e.DecodeCost={}))[i.Zero=0]="Zero",i[i.Low=.2]="Low",i[i.Medium=1]="Medium",i[i.High=5]="High",i[i.VeryHigh=25]="VeryHigh",i[i.Infinite=125]="Infinite";
/**
 * TextShield Text Encoder
 *
 * Generates random seed and natural number N based on given decode cost.
 * By these values, lock = H(seed + N) and payload = E(message, reverse(seed + N))
 * is calculated.
 *
 * @version 1.0.0
 * @author HyunJun Kim
 * @license MIT
 */
var l=function(){function e(t,e){void 0===t&&(t=o.Low),this.decodeCost=t,this.salt=e||this.generateRandomSalt()}return e.prototype.encode=function(t,e){void 0===e&&(e=!1),e&&(this.salt=this.generateRandomSalt());var r=this.salt+this.generateKey(),n=this.reverseString(r),o=u.default.hash(r),i=s.default.encrypt(t,n);return new a.default(this.salt,o,i)},e.prototype.generateKey=function(){var t=this.decodeCost*e.NORMAL_HPS;return this.randomIntegerBetween(Math.sqrt(t),t)},e.prototype.generateRandomSalt=function(t){void 0===t&&(t=16);for(var e="",r=0;r<t;r++)e+=f.default.CharacterTable.charAt(this.randomIntegerBetween(0,64));return e},e.prototype.reverseString=function(t){return t.split("").reverse().join("")},e.prototype.randomIntegerBetween=function(t,e){return Math.floor(Math.random()*(e+1-t)+t)},e.NORMAL_HPS=200,e}();e.Encoder=l,e.default=l}]);