/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/crypto/Hash.ts":
/*!****************************!*\
  !*** ./src/crypto/Hash.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n/**\n * Fast SHA256 Hash algorithm from Dmitry Chestnykh's implementation\n * https://github.com/dchest/fast-sha256-js\n */\nvar SHA256 = /** @class */ (function () {\n    function SHA256() {\n        this.digestLength = 32;\n        this.finished = false;\n        this.state = new Int32Array(8);\n        this.temp = new Int32Array(64);\n        this.buffer = new Uint8Array(128);\n        this.bufferLength = 0;\n        this.bytesHashed = 0;\n        this.initialize();\n    }\n    /**\n     * Cleans internal buffers and re-initializes hash state.\n     **/\n    SHA256.prototype.initialize = function () {\n        this.bufferLength = 0;\n        this.bytesHashed = 0;\n        this.finished = false;\n        for (var i = 0; i < this.buffer.length; i++) {\n            this.buffer[i] = 0;\n        }\n        for (var i = 0; i < this.temp.length; i++) {\n            this.temp[i] = 0;\n        }\n        this.state[0] = 0x6a09e667;\n        this.state[1] = 0xbb67ae85;\n        this.state[2] = 0x3c6ef372;\n        this.state[3] = 0xa54ff53a;\n        this.state[4] = 0x510e527f;\n        this.state[5] = 0x9b05688c;\n        this.state[6] = 0x1f83d9ab;\n        this.state[7] = 0x5be0cd19;\n    };\n    /**\n     * Updates hash state with the given data.\n     *\n     * @param data\n     * @param dataLength\n     */\n    SHA256.prototype.update = function (data, dataLength) {\n        if (dataLength === void 0) { dataLength = data.length; }\n        if (!this.finished) {\n            var dataPos = 0;\n            this.bytesHashed += dataLength;\n            if (this.bufferLength > 0) {\n                while (this.bufferLength < 64 && dataLength > 0) {\n                    this.buffer[this.bufferLength++] = data[dataPos++];\n                    dataLength--;\n                }\n                if (this.bufferLength === 64) {\n                    this.hashBlocks(this.temp, this.state, this.buffer, 0, 64);\n                    this.bufferLength = 0;\n                }\n            }\n            if (dataLength >= 64) {\n                dataPos = this.hashBlocks(this.temp, this.state, data, dataPos, dataLength);\n                dataLength %= 64;\n            }\n            while (dataLength > 0) {\n                this.buffer[this.bufferLength++] = data[dataPos++];\n                dataLength--;\n            }\n        }\n    };\n    /**\n     * Finalizes hash state and puts hash into out.\n     *\n     * @param output\n     */\n    SHA256.prototype.finish = function () {\n        var output = new Uint8Array(this.digestLength);\n        if (!this.finished) {\n            var bytesHashed = this.bytesHashed;\n            var left = this.bufferLength;\n            var bitLenHi = (bytesHashed / 0x20000000) | 0;\n            var bitLenLo = bytesHashed << 3;\n            var padLength = bytesHashed % 64 < 56 ? 64 : 128;\n            this.buffer[left] = 0x80;\n            for (var i = left + 1; i < padLength - 8; i++) {\n                this.buffer[i] = 0;\n            }\n            this.buffer[padLength - 8] = (bitLenHi >>> 24) & 0xff;\n            this.buffer[padLength - 7] = (bitLenHi >>> 16) & 0xff;\n            this.buffer[padLength - 6] = (bitLenHi >>> 8) & 0xff;\n            this.buffer[padLength - 5] = (bitLenHi >>> 0) & 0xff;\n            this.buffer[padLength - 4] = (bitLenLo >>> 24) & 0xff;\n            this.buffer[padLength - 3] = (bitLenLo >>> 16) & 0xff;\n            this.buffer[padLength - 2] = (bitLenLo >>> 8) & 0xff;\n            this.buffer[padLength - 1] = (bitLenLo >>> 0) & 0xff;\n            this.hashBlocks(this.temp, this.state, this.buffer, 0, padLength);\n            this.finished = true;\n        }\n        for (var i = 0; i < 8; i++) {\n            output[i * 4 + 0] = (this.state[i] >>> 24) & 0xff;\n            output[i * 4 + 1] = (this.state[i] >>> 16) & 0xff;\n            output[i * 4 + 2] = (this.state[i] >>> 8) & 0xff;\n            output[i * 4 + 3] = (this.state[i] >>> 0) & 0xff;\n        }\n        return output;\n    };\n    /**\n     * Digest string to hashed hex string\n     * @param message\n     */\n    SHA256.prototype.digest = function (message) {\n        this.initialize();\n        this.update(this.stringToBuffer(message));\n        return this.bufferToHex(this.finish());\n    };\n    SHA256.prototype.hashBlocks = function (w, v, p, pos, len) {\n        var a, b, c, d, e, f, g, h, u, i, j;\n        var t1, t2;\n        while (len >= 64) {\n            a = v[0];\n            b = v[1];\n            c = v[2];\n            d = v[3];\n            e = v[4];\n            f = v[5];\n            g = v[6];\n            h = v[7];\n            for (i = 0; i < 16; i++) {\n                j = pos + i * 4;\n                w[i] =\n                    ((p[j] & 0xff) << 24) |\n                        ((p[j + 1] & 0xff) << 16) |\n                        ((p[j + 2] & 0xff) << 8) |\n                        (p[j + 3] & 0xff);\n            }\n            for (i = 16; i < 64; i++) {\n                u = w[i - 2];\n                t1 =\n                    ((u >>> 17) | (u << (32 - 17))) ^\n                        ((u >>> 19) | (u << (32 - 19))) ^\n                        (u >>> 10);\n                u = w[i - 15];\n                t2 =\n                    ((u >>> 7) | (u << (32 - 7))) ^\n                        ((u >>> 18) | (u << (32 - 18))) ^\n                        (u >>> 3);\n                w[i] = ((t1 + w[i - 7]) | 0) + ((t2 + w[i - 16]) | 0);\n            }\n            for (i = 0; i < 64; i++) {\n                t1 =\n                    ((((((e >>> 6) | (e << (32 - 6))) ^\n                        ((e >>> 11) | (e << (32 - 11))) ^\n                        ((e >>> 25) | (e << (32 - 25)))) +\n                        ((e & f) ^ (~e & g))) |\n                        0) +\n                        ((h + ((SHA256.K[i] + w[i]) | 0)) | 0)) |\n                        0;\n                t2 =\n                    ((((a >>> 2) | (a << (32 - 2))) ^\n                        ((a >>> 13) | (a << (32 - 13))) ^\n                        ((a >>> 22) | (a << (32 - 22)))) +\n                        ((a & b) ^ (a & c) ^ (b & c))) |\n                        0;\n                h = g;\n                g = f;\n                f = e;\n                e = (d + t1) | 0;\n                d = c;\n                c = b;\n                b = a;\n                a = (t1 + t2) | 0;\n            }\n            v[0] += a;\n            v[1] += b;\n            v[2] += c;\n            v[3] += d;\n            v[4] += e;\n            v[5] += f;\n            v[6] += g;\n            v[7] += h;\n            pos += 64;\n            len -= 64;\n        }\n        return pos;\n    };\n    SHA256.prototype.stringToBuffer = function (string) {\n        var buffer = new ArrayBuffer(string.length);\n        var bufferView = new Uint8Array(buffer);\n        for (var i = 0, strLen = string.length; i < strLen; i++) {\n            bufferView[i] = string.charCodeAt(i);\n        }\n        return bufferView;\n    };\n    SHA256.prototype.bufferToHex = function (buffer) {\n        return Array.prototype.map\n            .call(buffer, function (byte) {\n            return (\"0\" + (byte & 0xff).toString(16)).slice(-2);\n        })\n            .join(\"\");\n    };\n    SHA256.K = new Uint32Array([\n        0x428a2f98,\n        0x71374491,\n        0xb5c0fbcf,\n        0xe9b5dba5,\n        0x3956c25b,\n        0x59f111f1,\n        0x923f82a4,\n        0xab1c5ed5,\n        0xd807aa98,\n        0x12835b01,\n        0x243185be,\n        0x550c7dc3,\n        0x72be5d74,\n        0x80deb1fe,\n        0x9bdc06a7,\n        0xc19bf174,\n        0xe49b69c1,\n        0xefbe4786,\n        0x0fc19dc6,\n        0x240ca1cc,\n        0x2de92c6f,\n        0x4a7484aa,\n        0x5cb0a9dc,\n        0x76f988da,\n        0x983e5152,\n        0xa831c66d,\n        0xb00327c8,\n        0xbf597fc7,\n        0xc6e00bf3,\n        0xd5a79147,\n        0x06ca6351,\n        0x14292967,\n        0x27b70a85,\n        0x2e1b2138,\n        0x4d2c6dfc,\n        0x53380d13,\n        0x650a7354,\n        0x766a0abb,\n        0x81c2c92e,\n        0x92722c85,\n        0xa2bfe8a1,\n        0xa81a664b,\n        0xc24b8b70,\n        0xc76c51a3,\n        0xd192e819,\n        0xd6990624,\n        0xf40e3585,\n        0x106aa070,\n        0x19a4c116,\n        0x1e376c08,\n        0x2748774c,\n        0x34b0bcb5,\n        0x391c0cb3,\n        0x4ed8aa4a,\n        0x5b9cca4f,\n        0x682e6ff3,\n        0x748f82ee,\n        0x78a5636f,\n        0x84c87814,\n        0x8cc70208,\n        0x90befffa,\n        0xa4506ceb,\n        0xbef9a3f7,\n        0xc67178f2\n    ]);\n    return SHA256;\n}());\nexports.SHA256 = SHA256;\n\n\n//# sourceURL=webpack:///./src/crypto/Hash.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar Hash_1 = __webpack_require__(/*! ./crypto/Hash */ \"./src/crypto/Hash.ts\");\nvar hash = new Hash_1.SHA256();\nconsole.log(hash.digest(\"qegqeg111\"));\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });