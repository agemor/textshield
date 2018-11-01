!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=6)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});
/**
 * Basic implementation of base64 encoder/decoder
 *
 * @version 1.0.0
 * @author HyunJun Kim
 * @license MIT
 */
var r=function(){function t(){}return t.encode=function(e){var n=t.CharacterTable,r="",o=0;do{var i=e.charCodeAt(o++),a=e.charCodeAt(o++),u=e.charCodeAt(o++),s=(i=i||0)>>2&63,f=(3&i)<<4|(a=a||0)>>4&15,c=(15&a)<<2|(u=u||0)>>6&3,l=63&u;a?u||(l=64):c=l=64,r+=n.charAt(s)+n.charAt(f)+n.charAt(c)+n.charAt(l)}while(o<e.length);return r},t.decode=function(e){var n=t.CharacterTable,r="",o=0;do{var i=n.indexOf(e.charAt(o++)),a=n.indexOf(e.charAt(o++)),u=n.indexOf(e.charAt(o++)),s=(63&i)<<2|a>>4&3,f=(15&a)<<4|u>>2&15,c=(3&u)<<6|63&n.indexOf(e.charAt(o++));r+=String.fromCharCode(s)+(f?String.fromCharCode(f):"")+(c?String.fromCharCode(c):"")}while(o<e.length);return r},t.CharacterTable="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",t}();e.Base64=r,e.default=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e,n){this.salt=t,this.lock=e,this.message=n}return t.prototype.toString=function(){return this.salt+this.lock+this.message},t.parse=function(e,n,r){return void 0===n&&(n=16),void 0===r&&(r=44),e.length<=n+r?null:new t(e.slice(0,n),e.slice(n,n+r),e.slice(n+r))},t}();e.EncodedMessage=r,e.default=r},function(t,e,n){"use strict";var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=r(n(3)),i=r(n(4)),a=function(){function t(){}return t.prototype.decode=function(t){var e=this.resolveHash(t.salt,t.lock);if(e<0)return null;var n=t.salt+e,r=this.reverseString(n);return i.default.decrypt(t.message,r)},t.prototype.resolveHash=function(e,n){for(var r=0;r<t.MAX_ATTEMPTS;){if(o.default.hash(e+r)==n)return r;r++}return-1},t.prototype.reverseString=function(t){return t.split("").reverse().join("")},t.MAX_ATTEMPTS=1e8,t}();e.Decoder=a,e.default=a},function(t,e,n){"use strict";var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=r(n(0)),i=function(){function t(){}return t.hash=function(e){e+=String.fromCharCode(128);for(var n=Math.ceil((e.length/4+2)/16),r=new Uint32Array(16*n),i=0;i<n;i++)for(var a=0;a<16;a++)r[16*i+a]=e.charCodeAt(64*i+4*a+0)<<24|e.charCodeAt(64*i+4*a+1)<<16|e.charCodeAt(64*i+4*a+2)<<8|e.charCodeAt(64*i+4*a+3)<<0;var u=Math.floor(8*(e.length-1)/Math.pow(2,32)),s=8*(e.length-1)|0;r[16*(n-1)+14]=u,r[16*(n-1)+15]=s;var f,c,l,d,h,v,p,y,g,m,_,C,S=new Uint32Array([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]);for(i=0;i<n;i++){for(var w=new Uint32Array(64),M=0;M<16;M++)w[M]=r[16*i+M];for(M=16;M<64;M++)g=((g=w[M-2])>>>17|g<<15)^(g>>>19|g<<13)^g>>>10,m=((m=w[M-15])>>>7|m<<25)^(m>>>18|m<<14)^m>>>3,w[M]=g+w[M-7]+m+w[M-16]|0;f=S[0],c=S[1],l=S[2],d=S[3],h=S[4],v=S[5],p=S[6],y=S[7];for(M=0;M<64;M++)_=(f>>>2|f<<30)^(f>>>13|f<<19)^(f>>>22|f<<10),C=f&c|l&(f^c),g=y+((h>>>6|h<<26)^(h>>>11|h<<21)^(h>>>25|h<<7))+(p^h&(v^p))+t.K[M]+w[M],y=p,p=v,v=h,h=d+g|0,d=l,l=c,c=f,f=g+(m=_+C)|0;S[0]=S[0]+f|0,S[1]=S[1]+c|0,S[2]=S[2]+l|0,S[3]=S[3]+d|0,S[4]=S[4]+h|0,S[5]=S[5]+v|0,S[6]=S[6]+p|0,S[7]=S[7]+y|0}var x=new Uint8Array(4*S.length),b="";for(i=0;i<S.length;i++)x[4*i]=(4278190080&S[i])>>24,x[4*i+1]=(16711680&S[i])>>16,x[4*i+2]=(65280&S[i])>>8,x[4*i+3]=255&S[i];for(i=0;i<x.byteLength;i++)b+=String.fromCharCode(x[i]);return o.default.encode(b)},t.K=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),t}();
/**
 * Practical implementation of SHA-256 algorithm
 * based on FIPS PUB 180-2 specification
 *
 * @version 1.0.0
 * @author HyunJun Kim
 * @license MIT
 */e.Sha256=i,e.default=i},function(t,e,n){"use strict";var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=r(n(0)),i=r(n(8)),a=function(){function t(){}return t.encrypt=function(t,e){return o.default.encode(i.default.encode(this.encode(t,e)))},t.decrypt=function(t,e){return this.encode(i.default.decode(o.default.decode(t)),e)},t.encode=function(t,e){var n="";e=this.trimKey(e,t.length);for(var r=0;r<t.length;r++)n+=String.fromCharCode(t.charCodeAt(r)^e.charCodeAt(r));return n},t.trimKey=function(t,e){if(t.length>e)t=t.substring(0,e);else for(var n=t.length;n<e;n++)t+=t.charAt(n-t.length);return t},t}();e.XorCipher=a,e.default=a},function(t,e,n){"use strict";var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=r(n(9)),i=function(){function t(t,e){this.devicePixelRatio=window.devicePixelRatio||2,this.text=t,this.style=e,this.createCanvas(),this.initializeCanvas()}return t.prototype.applyDistortion=function(){this.filter=new o.default(this.canvas,.5)},t.prototype.createCanvas=function(){this.canvas=document.createElement("canvas"),this.canvasContext=this.canvas.getContext("2d")},t.prototype.initializeCanvas=function(){var t=this.canvasContext;t.font=this.style.getCanvasFont();var e=t.measureText(this.text).width,n=1.1*this.style.fontSize;t.canvas.width=e*this.devicePixelRatio,t.canvas.height=n*this.devicePixelRatio,t.fillStyle=this.style.fontColor,t.font=this.style.getCanvasFont(this.devicePixelRatio),t.textBaseline="bottom",t.fillText(this.text,0,n*this.devicePixelRatio),t.canvas.style.width=e+"px",t.canvas.style.height=n+"px",t.canvas.style.verticalAlign="text-bottom"},t.prototype.getCanvas=function(){return this.canvas},t}();
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
 */e.TextDisplay=i,e.default=i},function(t,e,n){"use strict";var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=r(n(7)),i=r(n(12));e.Encoder=i.default;var a=r(n(2));e.Decoder=a.default;var u=r(n(1));e.EncodedMessage=u.default;var s=r(n(5));function f(){new o.default(document.body,null)}e.TextDisplay=s.default,window.TextShieldEncoder=new i.default,window.TextShieldDecoder=new a.default,window.TextShieldEncodedMessage=u.default,window.TextShieldLoad=f,window.onload=function(){f()},e.default=o.default},function(t,e,n){"use strict";var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o=r(n(2)),i=r(n(1)),a=r(n(5)),u=r(n(11)),s=function(){function t(t,e){this.body=t,this.decoder=new o.default,this.initialize()}return t.prototype.initialize=function(){for(var t=0,e=this.getShieldedElements();t<e.length;t++){var n=e[t],r=i.default.parse(n.textContent),o=(n.getAttribute("mode")||"normal").toLowerCase().trim();if(console.log(o),r){var s=this.decoder.decode(r);if("plain"==o)n.textContent=s;else{var f=new u.default(window.getComputedStyle(n)),c=new a.default(s,f);n.parentNode.replaceChild(c.getCanvas(),n),"distort"==o&&c.applyDistortion()}}}},t.prototype.getShieldedElements=function(){var t=this.body.getElementsByTagName("shield");return Array.prototype.slice.call(t)},t}();e.TextShield=s,e.default=s},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});
/**
 * Basic Utf-8 encoder
 *
 * @version 1.0.0
 * @author HyunJun Kim
 * @license MIT
 */
var r=function(){function t(){}return t.encode=function(t){t=t.replace(/\r\n/g,"\n");for(var e="",n=0;n<t.length;n++){var r=t.charCodeAt(n);r<128?e+=String.fromCharCode(r):r>127&&r<2048?(e+=String.fromCharCode(r>>6|192),e+=String.fromCharCode(63&r|128)):(e+=String.fromCharCode(r>>12|224),e+=String.fromCharCode(r>>6&63|128),e+=String.fromCharCode(63&r|128))}return e},t.decode=function(t){for(var e="",n=0,r=0,o=0,i=0;n<t.length;)(r=t.charCodeAt(n))<128?(e+=String.fromCharCode(r),n++):r>191&&r<224?(o=t.charCodeAt(n+1),e+=String.fromCharCode((31&r)<<6|63&o),n+=2):(o=t.charCodeAt(n+1),i=t.charCodeAt(n+2),e+=String.fromCharCode((15&r)<<12|(63&o)<<6|63&i),n+=3);return e},t}();e.Utf8=r,e.default=r},function(t,e,n){"use strict";var r=this&&this.__extends||function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),o=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var i=function(t){function e(e,n,r){void 0===r&&(r=60);var o=t.call(this,e)||this;return o.frames=0,o.amplitude=Math.max(o.canvas.height/30,0),o.frequency=n,o.frameRate=r,o.apply(),o}return r(e,t),e.prototype.apply=function(){var t=this;if(this.frames%3==0){for(var e=this.target.data,n=this.source.data,r=void 0,o=void 0,i=void 0,a=this.amplitude,u=Math.floor(a),s=this.canvas.width,f=this.canvas.height,c=this.frames*this.frequency/this.frameRate,l=2*Math.PI,d=u;d<s-u;++d){r=Math.round(a*Math.cos(l*(3*d/s+c)));for(var h=u;h<f-u;++h)i=(h+r)*s*4+4*(d+Math.round(a*Math.sin(l*(3*h/f+c)))),e[o=h*s*4+4*d]=n[i],e[o+1]=n[i+1],e[o+2]=n[i+2],e[o+3]=n[i+3]}this.context.putImageData(this.target,0,0)}this.frames++,window.requestAnimationFrame(function(){return t.apply()})},e}(o(n(10)).default);
/**
 * Sinusoidal distortion effect filter
 * that renders liquid-like motions to given canvas
 * Main advantage of using sinusoidal distortion filter is that
 * text boundaries are not affected while protecting OCR.
 *
 * @version 1.0.0
 * @author HyunJun Kim
 * @license MIT
 */e.SinusoidalDistortionFilter=i,e.default=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});
/**
 * Superclass for all filter effects
 *
 * @version 1.0.0
 * @author HyunJun Kim
 * @license MIT
 */
var r=function(){function t(t){this.canvas=t,this.context=t.getContext("2d"),this.initialize()}return t.prototype.initialize=function(){var t=this.canvas.width,e=this.canvas.height;this.source=this.context.getImageData(0,0,t,e),this.target=this.context.createImageData(t,e),this.context.imageSmoothingEnabled=!1},t}();e.Filter=r,e.default=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});
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
var r=function(){function t(t){null!=t&&this.loadCssStyle(t)}return t.prototype.loadCssStyle=function(t){var e=function(e){return t.getPropertyValue(e)};this.fontStyle=e("font-style"),this.fontVariant=e("font-variant"),this.fontWeight=e("font-weight"),this.fontSize=function(t){return Number(t.split("px")[0])}(e("font-size")),this.fontFamily=e("font-family"),this.fontColor=e("color")},t.prototype.getCanvasFont=function(t){void 0===t&&(t=1);return this.fontStyle+" "+this.fontVariant+" "+this.fontWeight+" "+this.fontSize*t+"px "+this.fontFamily},t}();e.TextStyle=r,e.default=r},function(t,e,n){"use strict";var r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var o,i=r(n(1)),a=r(n(3)),u=r(n(4)),s=r(n(0));!function(t){t[t.Zero=0]="Zero",t[t.Low=.2]="Low",t[t.Medium=1]="Medium",t[t.High=5]="High",t[t.VeryHigh=25]="VeryHigh",t[t.Infinite=125]="Infinite"}(o=e.DecodeCost||(e.DecodeCost={}));
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
var f=function(){function t(t,e){void 0===t&&(t=o.Low),this.decodeCost=t,this.salt=e||this.generateRandomSalt()}return t.prototype.encode=function(t,e){void 0===e&&(e=!1),e&&(this.salt=this.generateRandomSalt());var n=this.salt+this.generateKey(),r=this.reverseString(n),o=a.default.hash(n),s=u.default.encrypt(t,r);return new i.default(this.salt,o,s)},t.prototype.generateKey=function(){var e=this.decodeCost*t.NORMAL_HPS;return this.randomIntegerBetween(Math.sqrt(e),e)},t.prototype.generateRandomSalt=function(t){void 0===t&&(t=16);for(var e="",n=0;n<t;n++)e+=s.default.CharacterTable.charAt(this.randomIntegerBetween(0,64));return e},t.prototype.reverseString=function(t){return t.split("").reverse().join("")},t.prototype.randomIntegerBetween=function(t,e){return Math.floor(Math.random()*(e+1-t)+t)},t.NORMAL_HPS=200,t}();e.Encoder=f,e.default=f}]);