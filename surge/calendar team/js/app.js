"use strict";

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);throw new Error("Cannot find module '" + o + "'");
      }var f = n[o] = { exports: {} };t[o][0].call(f.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, f, f.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
})({ 1: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

      ;(function (exports) {
        'use strict';

        var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

        var PLUS = '+'.charCodeAt(0);
        var SLASH = '/'.charCodeAt(0);
        var NUMBER = '0'.charCodeAt(0);
        var LOWER = 'a'.charCodeAt(0);
        var UPPER = 'A'.charCodeAt(0);
        var PLUS_URL_SAFE = '-'.charCodeAt(0);
        var SLASH_URL_SAFE = '_'.charCodeAt(0);

        function decode(elt) {
          var code = elt.charCodeAt(0);
          if (code === PLUS || code === PLUS_URL_SAFE) return 62; // '+'
          if (code === SLASH || code === SLASH_URL_SAFE) return 63; // '/'
          if (code < NUMBER) return -1; //no match
          if (code < NUMBER + 10) return code - NUMBER + 26 + 26;
          if (code < UPPER + 26) return code - UPPER;
          if (code < LOWER + 26) return code - LOWER + 26;
        }

        function b64ToByteArray(b64) {
          var i, j, l, tmp, placeHolders, arr;

          if (b64.length % 4 > 0) {
            throw new Error('Invalid string. Length must be a multiple of 4');
          }

          // the number of equal signs (place holders)
          // if there are two placeholders, than the two characters before it
          // represent one byte
          // if there is only one, then the three characters before it represent 2 bytes
          // this is just a cheap hack to not do indexOf twice
          var len = b64.length;
          placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0;

          // base64 is 4/3 + up to two characters of the original data
          arr = new Arr(b64.length * 3 / 4 - placeHolders);

          // if there are placeholders, only get up to the last complete 4 chars
          l = placeHolders > 0 ? b64.length - 4 : b64.length;

          var L = 0;

          function push(v) {
            arr[L++] = v;
          }

          for (i = 0, j = 0; i < l; i += 4, j += 3) {
            tmp = decode(b64.charAt(i)) << 18 | decode(b64.charAt(i + 1)) << 12 | decode(b64.charAt(i + 2)) << 6 | decode(b64.charAt(i + 3));
            push((tmp & 0xFF0000) >> 16);
            push((tmp & 0xFF00) >> 8);
            push(tmp & 0xFF);
          }

          if (placeHolders === 2) {
            tmp = decode(b64.charAt(i)) << 2 | decode(b64.charAt(i + 1)) >> 4;
            push(tmp & 0xFF);
          } else if (placeHolders === 1) {
            tmp = decode(b64.charAt(i)) << 10 | decode(b64.charAt(i + 1)) << 4 | decode(b64.charAt(i + 2)) >> 2;
            push(tmp >> 8 & 0xFF);
            push(tmp & 0xFF);
          }

          return arr;
        }

        function uint8ToBase64(uint8) {
          var i,
              extraBytes = uint8.length % 3,

          // if we have 1 byte left, pad 2 bytes
          output = "",
              temp,
              length;

          function encode(num) {
            return lookup.charAt(num);
          }

          function tripletToBase64(num) {
            return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F);
          }

          // go through the array every three bytes, we'll deal with trailing stuff later
          for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
            temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
            output += tripletToBase64(temp);
          }

          // pad the end with zeros, but make sure to not forget the extra bytes
          switch (extraBytes) {
            case 1:
              temp = uint8[uint8.length - 1];
              output += encode(temp >> 2);
              output += encode(temp << 4 & 0x3F);
              output += '==';
              break;
            case 2:
              temp = (uint8[uint8.length - 2] << 8) + uint8[uint8.length - 1];
              output += encode(temp >> 10);
              output += encode(temp >> 4 & 0x3F);
              output += encode(temp << 2 & 0x3F);
              output += '=';
              break;
          }

          return output;
        }

        exports.toByteArray = b64ToByteArray;
        exports.fromByteArray = uint8ToBase64;
      })(typeof exports === 'undefined' ? undefined.base64js = {} : exports);
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/..\\..\\node_modules\\base64-js\\lib\\b64.js", "/..\\..\\node_modules\\base64-js\\lib");
  }, { "buffer": 2, "e/U+97": 4 }], 2: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
        return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
      };

      /*!
       * The buffer module from node.js, for the browser.
       *
       * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
       * @license  MIT
       */

      var base64 = require('base64-js');
      var ieee754 = require('ieee754');

      exports.Buffer = Buffer;
      exports.SlowBuffer = Buffer;
      exports.INSPECT_MAX_BYTES = 50;
      Buffer.poolSize = 8192;

      /**
       * If `Buffer._useTypedArrays`:
       *   === true    Use Uint8Array implementation (fastest)
       *   === false   Use Object implementation (compatible down to IE6)
       */
      Buffer._useTypedArrays = function () {
        // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
        // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
        // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
        // because we need to be able to add all the node Buffer API methods. This is an issue
        // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
        try {
          var buf = new ArrayBuffer(0);
          var arr = new Uint8Array(buf);
          arr.foo = function () {
            return 42;
          };
          return 42 === arr.foo() && typeof arr.subarray === 'function'; // Chrome 9-10 lack `subarray`
        } catch (e) {
          return false;
        }
      }();

      /**
       * Class: Buffer
       * =============
       *
       * The Buffer constructor returns instances of `Uint8Array` that are augmented
       * with function properties for all the node `Buffer` API functions. We use
       * `Uint8Array` so that square bracket notation works as expected -- it returns
       * a single octet.
       *
       * By augmenting the instances, we can avoid modifying the `Uint8Array`
       * prototype.
       */
      function Buffer(subject, encoding, noZero) {
        if (!(this instanceof Buffer)) return new Buffer(subject, encoding, noZero);

        var type = typeof subject === 'undefined' ? 'undefined' : _typeof(subject);

        // Workaround: node's base64 implementation allows for non-padded strings
        // while base64-js does not.
        if (encoding === 'base64' && type === 'string') {
          subject = stringtrim(subject);
          while (subject.length % 4 !== 0) {
            subject = subject + '=';
          }
        }

        // Find the length
        var length;
        if (type === 'number') length = coerce(subject);else if (type === 'string') length = Buffer.byteLength(subject, encoding);else if (type === 'object') length = coerce(subject.length); // assume that object is array-like
        else throw new Error('First argument needs to be a number, array or string.');

        var buf;
        if (Buffer._useTypedArrays) {
          // Preferred: Return an augmented `Uint8Array` instance for best performance
          buf = Buffer._augment(new Uint8Array(length));
        } else {
          // Fallback: Return THIS instance of Buffer (created by `new`)
          buf = this;
          buf.length = length;
          buf._isBuffer = true;
        }

        var i;
        if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
          // Speed optimization -- use set if we're copying from a typed array
          buf._set(subject);
        } else if (isArrayish(subject)) {
          // Treat array-ish objects as a byte array
          for (i = 0; i < length; i++) {
            if (Buffer.isBuffer(subject)) buf[i] = subject.readUInt8(i);else buf[i] = subject[i];
          }
        } else if (type === 'string') {
          buf.write(subject, 0, encoding);
        } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
          for (i = 0; i < length; i++) {
            buf[i] = 0;
          }
        }

        return buf;
      }

      // STATIC METHODS
      // ==============

      Buffer.isEncoding = function (encoding) {
        switch (String(encoding).toLowerCase()) {
          case 'hex':
          case 'utf8':
          case 'utf-8':
          case 'ascii':
          case 'binary':
          case 'base64':
          case 'raw':
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return true;
          default:
            return false;
        }
      };

      Buffer.isBuffer = function (b) {
        return !!(b !== null && b !== undefined && b._isBuffer);
      };

      Buffer.byteLength = function (str, encoding) {
        var ret;
        str = str + '';
        switch (encoding || 'utf8') {
          case 'hex':
            ret = str.length / 2;
            break;
          case 'utf8':
          case 'utf-8':
            ret = utf8ToBytes(str).length;
            break;
          case 'ascii':
          case 'binary':
          case 'raw':
            ret = str.length;
            break;
          case 'base64':
            ret = base64ToBytes(str).length;
            break;
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            ret = str.length * 2;
            break;
          default:
            throw new Error('Unknown encoding');
        }
        return ret;
      };

      Buffer.concat = function (list, totalLength) {
        assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' + 'list should be an Array.');

        if (list.length === 0) {
          return new Buffer(0);
        } else if (list.length === 1) {
          return list[0];
        }

        var i;
        if (typeof totalLength !== 'number') {
          totalLength = 0;
          for (i = 0; i < list.length; i++) {
            totalLength += list[i].length;
          }
        }

        var buf = new Buffer(totalLength);
        var pos = 0;
        for (i = 0; i < list.length; i++) {
          var item = list[i];
          item.copy(buf, pos);
          pos += item.length;
        }
        return buf;
      };

      // BUFFER INSTANCE METHODS
      // =======================

      function _hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        var remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }

        // must be an even number of digits
        var strLen = string.length;
        assert(strLen % 2 === 0, 'Invalid hex string');

        if (length > strLen / 2) {
          length = strLen / 2;
        }
        for (var i = 0; i < length; i++) {
          var byte = parseInt(string.substr(i * 2, 2), 16);
          assert(!isNaN(byte), 'Invalid hex string');
          buf[offset + i] = byte;
        }
        Buffer._charsWritten = i * 2;
        return i;
      }

      function _utf8Write(buf, string, offset, length) {
        var charsWritten = Buffer._charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length);
        return charsWritten;
      }

      function _asciiWrite(buf, string, offset, length) {
        var charsWritten = Buffer._charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length);
        return charsWritten;
      }

      function _binaryWrite(buf, string, offset, length) {
        return _asciiWrite(buf, string, offset, length);
      }

      function _base64Write(buf, string, offset, length) {
        var charsWritten = Buffer._charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length);
        return charsWritten;
      }

      function _utf16leWrite(buf, string, offset, length) {
        var charsWritten = Buffer._charsWritten = blitBuffer(utf16leToBytes(string), buf, offset, length);
        return charsWritten;
      }

      Buffer.prototype.write = function (string, offset, length, encoding) {
        // Support both (string, offset, length, encoding)
        // and the legacy (string, encoding, offset, length)
        if (isFinite(offset)) {
          if (!isFinite(length)) {
            encoding = length;
            length = undefined;
          }
        } else {
          // legacy
          var swap = encoding;
          encoding = offset;
          offset = length;
          length = swap;
        }

        offset = Number(offset) || 0;
        var remaining = this.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        encoding = String(encoding || 'utf8').toLowerCase();

        var ret;
        switch (encoding) {
          case 'hex':
            ret = _hexWrite(this, string, offset, length);
            break;
          case 'utf8':
          case 'utf-8':
            ret = _utf8Write(this, string, offset, length);
            break;
          case 'ascii':
            ret = _asciiWrite(this, string, offset, length);
            break;
          case 'binary':
            ret = _binaryWrite(this, string, offset, length);
            break;
          case 'base64':
            ret = _base64Write(this, string, offset, length);
            break;
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            ret = _utf16leWrite(this, string, offset, length);
            break;
          default:
            throw new Error('Unknown encoding');
        }
        return ret;
      };

      Buffer.prototype.toString = function (encoding, start, end) {
        var self = this;

        encoding = String(encoding || 'utf8').toLowerCase();
        start = Number(start) || 0;
        end = end !== undefined ? Number(end) : end = self.length;

        // Fastpath empty strings
        if (end === start) return '';

        var ret;
        switch (encoding) {
          case 'hex':
            ret = _hexSlice(self, start, end);
            break;
          case 'utf8':
          case 'utf-8':
            ret = _utf8Slice(self, start, end);
            break;
          case 'ascii':
            ret = _asciiSlice(self, start, end);
            break;
          case 'binary':
            ret = _binarySlice(self, start, end);
            break;
          case 'base64':
            ret = _base64Slice(self, start, end);
            break;
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            ret = _utf16leSlice(self, start, end);
            break;
          default:
            throw new Error('Unknown encoding');
        }
        return ret;
      };

      Buffer.prototype.toJSON = function () {
        return {
          type: 'Buffer',
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };

      // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
      Buffer.prototype.copy = function (target, target_start, start, end) {
        var source = this;

        if (!start) start = 0;
        if (!end && end !== 0) end = this.length;
        if (!target_start) target_start = 0;

        // Copy 0 bytes; we're done
        if (end === start) return;
        if (target.length === 0 || source.length === 0) return;

        // Fatal error conditions
        assert(end >= start, 'sourceEnd < sourceStart');
        assert(target_start >= 0 && target_start < target.length, 'targetStart out of bounds');
        assert(start >= 0 && start < source.length, 'sourceStart out of bounds');
        assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds');

        // Are we oob?
        if (end > this.length) end = this.length;
        if (target.length - target_start < end - start) end = target.length - target_start + start;

        var len = end - start;

        if (len < 100 || !Buffer._useTypedArrays) {
          for (var i = 0; i < len; i++) {
            target[i + target_start] = this[i + start];
          }
        } else {
          target._set(this.subarray(start, start + len), target_start);
        }
      };

      function _base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }

      function _utf8Slice(buf, start, end) {
        var res = '';
        var tmp = '';
        end = Math.min(buf.length, end);

        for (var i = start; i < end; i++) {
          if (buf[i] <= 0x7F) {
            res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i]);
            tmp = '';
          } else {
            tmp += '%' + buf[i].toString(16);
          }
        }

        return res + decodeUtf8Char(tmp);
      }

      function _asciiSlice(buf, start, end) {
        var ret = '';
        end = Math.min(buf.length, end);

        for (var i = start; i < end; i++) {
          ret += String.fromCharCode(buf[i]);
        }return ret;
      }

      function _binarySlice(buf, start, end) {
        return _asciiSlice(buf, start, end);
      }

      function _hexSlice(buf, start, end) {
        var len = buf.length;

        if (!start || start < 0) start = 0;
        if (!end || end < 0 || end > len) end = len;

        var out = '';
        for (var i = start; i < end; i++) {
          out += toHex(buf[i]);
        }
        return out;
      }

      function _utf16leSlice(buf, start, end) {
        var bytes = buf.slice(start, end);
        var res = '';
        for (var i = 0; i < bytes.length; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }

      Buffer.prototype.slice = function (start, end) {
        var len = this.length;
        start = clamp(start, len, 0);
        end = clamp(end, len, len);

        if (Buffer._useTypedArrays) {
          return Buffer._augment(this.subarray(start, end));
        } else {
          var sliceLen = end - start;
          var newBuf = new Buffer(sliceLen, undefined, true);
          for (var i = 0; i < sliceLen; i++) {
            newBuf[i] = this[i + start];
          }
          return newBuf;
        }
      };

      // `get` will be removed in Node 0.13+
      Buffer.prototype.get = function (offset) {
        console.log('.get() is deprecated. Access using array indexes instead.');
        return this.readUInt8(offset);
      };

      // `set` will be removed in Node 0.13+
      Buffer.prototype.set = function (v, offset) {
        console.log('.set() is deprecated. Access using array indexes instead.');
        return this.writeUInt8(v, offset);
      };

      Buffer.prototype.readUInt8 = function (offset, noAssert) {
        if (!noAssert) {
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset < this.length, 'Trying to read beyond buffer length');
        }

        if (offset >= this.length) return;

        return this[offset];
      };

      function _readUInt16(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 1 < buf.length, 'Trying to read beyond buffer length');
        }

        var len = buf.length;
        if (offset >= len) return;

        var val;
        if (littleEndian) {
          val = buf[offset];
          if (offset + 1 < len) val |= buf[offset + 1] << 8;
        } else {
          val = buf[offset] << 8;
          if (offset + 1 < len) val |= buf[offset + 1];
        }
        return val;
      }

      Buffer.prototype.readUInt16LE = function (offset, noAssert) {
        return _readUInt16(this, offset, true, noAssert);
      };

      Buffer.prototype.readUInt16BE = function (offset, noAssert) {
        return _readUInt16(this, offset, false, noAssert);
      };

      function _readUInt32(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'Trying to read beyond buffer length');
        }

        var len = buf.length;
        if (offset >= len) return;

        var val;
        if (littleEndian) {
          if (offset + 2 < len) val = buf[offset + 2] << 16;
          if (offset + 1 < len) val |= buf[offset + 1] << 8;
          val |= buf[offset];
          if (offset + 3 < len) val = val + (buf[offset + 3] << 24 >>> 0);
        } else {
          if (offset + 1 < len) val = buf[offset + 1] << 16;
          if (offset + 2 < len) val |= buf[offset + 2] << 8;
          if (offset + 3 < len) val |= buf[offset + 3];
          val = val + (buf[offset] << 24 >>> 0);
        }
        return val;
      }

      Buffer.prototype.readUInt32LE = function (offset, noAssert) {
        return _readUInt32(this, offset, true, noAssert);
      };

      Buffer.prototype.readUInt32BE = function (offset, noAssert) {
        return _readUInt32(this, offset, false, noAssert);
      };

      Buffer.prototype.readInt8 = function (offset, noAssert) {
        if (!noAssert) {
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset < this.length, 'Trying to read beyond buffer length');
        }

        if (offset >= this.length) return;

        var neg = this[offset] & 0x80;
        if (neg) return (0xff - this[offset] + 1) * -1;else return this[offset];
      };

      function _readInt16(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 1 < buf.length, 'Trying to read beyond buffer length');
        }

        var len = buf.length;
        if (offset >= len) return;

        var val = _readUInt16(buf, offset, littleEndian, true);
        var neg = val & 0x8000;
        if (neg) return (0xffff - val + 1) * -1;else return val;
      }

      Buffer.prototype.readInt16LE = function (offset, noAssert) {
        return _readInt16(this, offset, true, noAssert);
      };

      Buffer.prototype.readInt16BE = function (offset, noAssert) {
        return _readInt16(this, offset, false, noAssert);
      };

      function _readInt32(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'Trying to read beyond buffer length');
        }

        var len = buf.length;
        if (offset >= len) return;

        var val = _readUInt32(buf, offset, littleEndian, true);
        var neg = val & 0x80000000;
        if (neg) return (0xffffffff - val + 1) * -1;else return val;
      }

      Buffer.prototype.readInt32LE = function (offset, noAssert) {
        return _readInt32(this, offset, true, noAssert);
      };

      Buffer.prototype.readInt32BE = function (offset, noAssert) {
        return _readInt32(this, offset, false, noAssert);
      };

      function _readFloat(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset + 3 < buf.length, 'Trying to read beyond buffer length');
        }

        return ieee754.read(buf, offset, littleEndian, 23, 4);
      }

      Buffer.prototype.readFloatLE = function (offset, noAssert) {
        return _readFloat(this, offset, true, noAssert);
      };

      Buffer.prototype.readFloatBE = function (offset, noAssert) {
        return _readFloat(this, offset, false, noAssert);
      };

      function _readDouble(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset + 7 < buf.length, 'Trying to read beyond buffer length');
        }

        return ieee754.read(buf, offset, littleEndian, 52, 8);
      }

      Buffer.prototype.readDoubleLE = function (offset, noAssert) {
        return _readDouble(this, offset, true, noAssert);
      };

      Buffer.prototype.readDoubleBE = function (offset, noAssert) {
        return _readDouble(this, offset, false, noAssert);
      };

      Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset < this.length, 'trying to write beyond buffer length');
          verifuint(value, 0xff);
        }

        if (offset >= this.length) return;

        this[offset] = value;
      };

      function _writeUInt16(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 1 < buf.length, 'trying to write beyond buffer length');
          verifuint(value, 0xffff);
        }

        var len = buf.length;
        if (offset >= len) return;

        for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
          buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
        }
      }

      Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
        _writeUInt16(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
        _writeUInt16(this, value, offset, false, noAssert);
      };

      function _writeUInt32(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'trying to write beyond buffer length');
          verifuint(value, 0xffffffff);
        }

        var len = buf.length;
        if (offset >= len) return;

        for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
          buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
        }
      }

      Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
        _writeUInt32(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
        _writeUInt32(this, value, offset, false, noAssert);
      };

      Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset < this.length, 'Trying to write beyond buffer length');
          verifsint(value, 0x7f, -0x80);
        }

        if (offset >= this.length) return;

        if (value >= 0) this.writeUInt8(value, offset, noAssert);else this.writeUInt8(0xff + value + 1, offset, noAssert);
      };

      function _writeInt16(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 1 < buf.length, 'Trying to write beyond buffer length');
          verifsint(value, 0x7fff, -0x8000);
        }

        var len = buf.length;
        if (offset >= len) return;

        if (value >= 0) _writeUInt16(buf, value, offset, littleEndian, noAssert);else _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert);
      }

      Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
        _writeInt16(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
        _writeInt16(this, value, offset, false, noAssert);
      };

      function _writeInt32(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'Trying to write beyond buffer length');
          verifsint(value, 0x7fffffff, -0x80000000);
        }

        var len = buf.length;
        if (offset >= len) return;

        if (value >= 0) _writeUInt32(buf, value, offset, littleEndian, noAssert);else _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert);
      }

      Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
        _writeInt32(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
        _writeInt32(this, value, offset, false, noAssert);
      };

      function _writeFloat(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'Trying to write beyond buffer length');
          verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38);
        }

        var len = buf.length;
        if (offset >= len) return;

        ieee754.write(buf, value, offset, littleEndian, 23, 4);
      }

      Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
        _writeFloat(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
        _writeFloat(this, value, offset, false, noAssert);
      };

      function _writeDouble(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 7 < buf.length, 'Trying to write beyond buffer length');
          verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308);
        }

        var len = buf.length;
        if (offset >= len) return;

        ieee754.write(buf, value, offset, littleEndian, 52, 8);
      }

      Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
        _writeDouble(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
        _writeDouble(this, value, offset, false, noAssert);
      };

      // fill(value, start=0, end=buffer.length)
      Buffer.prototype.fill = function (value, start, end) {
        if (!value) value = 0;
        if (!start) start = 0;
        if (!end) end = this.length;

        if (typeof value === 'string') {
          value = value.charCodeAt(0);
        }

        assert(typeof value === 'number' && !isNaN(value), 'value is not a number');
        assert(end >= start, 'end < start');

        // Fill 0 bytes; we're done
        if (end === start) return;
        if (this.length === 0) return;

        assert(start >= 0 && start < this.length, 'start out of bounds');
        assert(end >= 0 && end <= this.length, 'end out of bounds');

        for (var i = start; i < end; i++) {
          this[i] = value;
        }
      };

      Buffer.prototype.inspect = function () {
        var out = [];
        var len = this.length;
        for (var i = 0; i < len; i++) {
          out[i] = toHex(this[i]);
          if (i === exports.INSPECT_MAX_BYTES) {
            out[i + 1] = '...';
            break;
          }
        }
        return '<Buffer ' + out.join(' ') + '>';
      };

      /**
       * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
       * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
       */
      Buffer.prototype.toArrayBuffer = function () {
        if (typeof Uint8Array !== 'undefined') {
          if (Buffer._useTypedArrays) {
            return new Buffer(this).buffer;
          } else {
            var buf = new Uint8Array(this.length);
            for (var i = 0, len = buf.length; i < len; i += 1) {
              buf[i] = this[i];
            }return buf.buffer;
          }
        } else {
          throw new Error('Buffer.toArrayBuffer not supported in this browser');
        }
      };

      // HELPER FUNCTIONS
      // ================

      function stringtrim(str) {
        if (str.trim) return str.trim();
        return str.replace(/^\s+|\s+$/g, '');
      }

      var BP = Buffer.prototype;

      /**
       * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
       */
      Buffer._augment = function (arr) {
        arr._isBuffer = true;

        // save reference to original Uint8Array get/set methods before overwriting
        arr._get = arr.get;
        arr._set = arr.set;

        // deprecated, will be removed in node 0.13+
        arr.get = BP.get;
        arr.set = BP.set;

        arr.write = BP.write;
        arr.toString = BP.toString;
        arr.toLocaleString = BP.toString;
        arr.toJSON = BP.toJSON;
        arr.copy = BP.copy;
        arr.slice = BP.slice;
        arr.readUInt8 = BP.readUInt8;
        arr.readUInt16LE = BP.readUInt16LE;
        arr.readUInt16BE = BP.readUInt16BE;
        arr.readUInt32LE = BP.readUInt32LE;
        arr.readUInt32BE = BP.readUInt32BE;
        arr.readInt8 = BP.readInt8;
        arr.readInt16LE = BP.readInt16LE;
        arr.readInt16BE = BP.readInt16BE;
        arr.readInt32LE = BP.readInt32LE;
        arr.readInt32BE = BP.readInt32BE;
        arr.readFloatLE = BP.readFloatLE;
        arr.readFloatBE = BP.readFloatBE;
        arr.readDoubleLE = BP.readDoubleLE;
        arr.readDoubleBE = BP.readDoubleBE;
        arr.writeUInt8 = BP.writeUInt8;
        arr.writeUInt16LE = BP.writeUInt16LE;
        arr.writeUInt16BE = BP.writeUInt16BE;
        arr.writeUInt32LE = BP.writeUInt32LE;
        arr.writeUInt32BE = BP.writeUInt32BE;
        arr.writeInt8 = BP.writeInt8;
        arr.writeInt16LE = BP.writeInt16LE;
        arr.writeInt16BE = BP.writeInt16BE;
        arr.writeInt32LE = BP.writeInt32LE;
        arr.writeInt32BE = BP.writeInt32BE;
        arr.writeFloatLE = BP.writeFloatLE;
        arr.writeFloatBE = BP.writeFloatBE;
        arr.writeDoubleLE = BP.writeDoubleLE;
        arr.writeDoubleBE = BP.writeDoubleBE;
        arr.fill = BP.fill;
        arr.inspect = BP.inspect;
        arr.toArrayBuffer = BP.toArrayBuffer;

        return arr;
      };

      // slice(start, end)
      function clamp(index, len, defaultValue) {
        if (typeof index !== 'number') return defaultValue;
        index = ~~index; // Coerce to integer.
        if (index >= len) return len;
        if (index >= 0) return index;
        index += len;
        if (index >= 0) return index;
        return 0;
      }

      function coerce(length) {
        // Coerce length to a number (possibly NaN), round up
        // in case it's fractional (e.g. 123.456) then do a
        // double negate to coerce a NaN to 0. Easy, right?
        length = ~~Math.ceil(+length);
        return length < 0 ? 0 : length;
      }

      function isArray(subject) {
        return (Array.isArray || function (subject) {
          return Object.prototype.toString.call(subject) === '[object Array]';
        })(subject);
      }

      function isArrayish(subject) {
        return isArray(subject) || Buffer.isBuffer(subject) || subject && (typeof subject === 'undefined' ? 'undefined' : _typeof(subject)) === 'object' && typeof subject.length === 'number';
      }

      function toHex(n) {
        if (n < 16) return '0' + n.toString(16);
        return n.toString(16);
      }

      function utf8ToBytes(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; i++) {
          var b = str.charCodeAt(i);
          if (b <= 0x7F) byteArray.push(str.charCodeAt(i));else {
            var start = i;
            if (b >= 0xD800 && b <= 0xDFFF) i++;
            var h = encodeURIComponent(str.slice(start, i + 1)).substr(1).split('%');
            for (var j = 0; j < h.length; j++) {
              byteArray.push(parseInt(h[j], 16));
            }
          }
        }
        return byteArray;
      }

      function asciiToBytes(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; i++) {
          // Node's code seems to be doing this and not & 0x7F..
          byteArray.push(str.charCodeAt(i) & 0xFF);
        }
        return byteArray;
      }

      function utf16leToBytes(str) {
        var c, hi, lo;
        var byteArray = [];
        for (var i = 0; i < str.length; i++) {
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }

        return byteArray;
      }

      function base64ToBytes(str) {
        return base64.toByteArray(str);
      }

      function blitBuffer(src, dst, offset, length) {
        var pos;
        for (var i = 0; i < length; i++) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }

      function decodeUtf8Char(str) {
        try {
          return decodeURIComponent(str);
        } catch (err) {
          return String.fromCharCode(0xFFFD); // UTF 8 invalid char
        }
      }

      /*
       * We have to make sure that the value is a valid integer. This means that it
       * is non-negative. It has no fractional component and that it does not
       * exceed the maximum allowed value.
       */
      function verifuint(value, max) {
        assert(typeof value === 'number', 'cannot write a non-number as a number');
        assert(value >= 0, 'specified a negative value for writing an unsigned value');
        assert(value <= max, 'value is larger than maximum value for type');
        assert(Math.floor(value) === value, 'value has a fractional component');
      }

      function verifsint(value, max, min) {
        assert(typeof value === 'number', 'cannot write a non-number as a number');
        assert(value <= max, 'value larger than maximum allowed value');
        assert(value >= min, 'value smaller than minimum allowed value');
        assert(Math.floor(value) === value, 'value has a fractional component');
      }

      function verifIEEE754(value, max, min) {
        assert(typeof value === 'number', 'cannot write a non-number as a number');
        assert(value <= max, 'value larger than maximum allowed value');
        assert(value >= min, 'value smaller than minimum allowed value');
      }

      function assert(test, message) {
        if (!test) throw new Error(message || 'Failed assertion');
      }
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/..\\..\\node_modules\\buffer\\index.js", "/..\\..\\node_modules\\buffer");
  }, { "base64-js": 1, "buffer": 2, "e/U+97": 4, "ieee754": 3 }], 3: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      exports.read = function (buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];

        i += d;

        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };

      exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

        value = Math.abs(value);

        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }

          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }

        for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

        buffer[offset + i - d] |= s * 128;
      };
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/..\\..\\node_modules\\ieee754\\index.js", "/..\\..\\node_modules\\ieee754");
  }, { "buffer": 2, "e/U+97": 4 }], 4: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      // shim for using process in browser

      var process = module.exports = {};

      process.nextTick = function () {
        var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
        var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;

        if (canSetImmediate) {
          return function (f) {
            return window.setImmediate(f);
          };
        }

        if (canPost) {
          var queue = [];
          window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
              ev.stopPropagation();
              if (queue.length > 0) {
                var fn = queue.shift();
                fn();
              }
            }
          }, true);

          return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
          };
        }

        return function nextTick(fn) {
          setTimeout(fn, 0);
        };
      }();

      process.title = 'browser';
      process.browser = true;
      process.env = {};
      process.argv = [];

      function noop() {}

      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;

      process.binding = function (name) {
        throw new Error('process.binding is not supported');
      };

      // TODO(shtylman)
      process.cwd = function () {
        return '/';
      };
      process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
      };
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/..\\..\\node_modules\\process\\browser.js", "/..\\..\\node_modules\\process");
  }, { "buffer": 2, "e/U+97": 4 }], 5: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      // import Router from './utils/router';
      /*import User from './utils/User';
      import DB from './utils/DB';
      
      import { index } from './routes/index';
      import { login } from './routes/login';
      
      import { calendar } from './routes/calendar/calendar';
      import { day } from './routes/calendar/day';
      import { event } from './routes/calendar/event';
      import { list } from './routes/calendar/list';
      
      const routes = [index, login, calendar, day, event, list];
      
      const user = new User();
      const db = new DB('https://firebase.com');*/

      // возможно нужен будет ивент бас
      // new Router({routes, user, db});
      /**
       * Class representing a calendar
       * @class
       */

      var Calendar = function () {
        /**
         * Create a calendar object
         * @constructor
         * @param {Object} element - DOM element
         */

        function Calendar(element) {
          _classCallCheck(this, Calendar);

          //поменять в разметке, чтобы Header + table были обернуты в див
          this.element = element; //сюда передается обертка - пустой див

          this.currentDate = new Date();
          this.render();
          this.hide();
        }

        /**
         * Change month
         */

        _createClass(Calendar, [{
          key: 'goPrevMonth',
          value: function goPrevMonth() {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.render();
            // проверить на какую стрелку нажали
            // и добавить или отнять один месяц
          }
        }, {
          key: 'goNextMonth',
          value: function goNextMonth() {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.render();
            // проверить на какую стрелку нажали
            // и добавить или отнять один месяц
          }

          /**
           * Render calendar header
           */

        }, {
          key: 'renderCalendarHeader',
          value: function renderCalendarHeader() {
            var headerBody = document.createElement('DIV');
            headerBody.innerHTML = ' \
        <div class="calendar-header"> \
            <button><i class="material-icons prev-month-arrow">keyboard_arrow_left</i></button> \
              <div> \
                <span class="month">Июль</span> \
                <span class="year">2017</span> \
              </div> \
            <button><i class="material-icons next-month-arrow">keyboard_arrow_right</i></button> \
        </div>';

            headerBody.querySelector('.month').innerHTML = this.currentDate.getMonth();
            headerBody.querySelector('.year').innerHTML = this.currentDate.getFullYear();
            var self = this;
            headerBody.querySelector('.prev-month-arrow').addEventListener('click', function () {
              self.goPrevMonth();
            });
            headerBody.querySelector('.next-month-arrow').addEventListener('click', function () {
              self.goNextMonth();
            });
            this.element.appendChild(headerBody);

            // нарисовать стрелки и месяц/год
            // повесить на них changeMonth
          }

          /**
           * Render calendar
           */

        }, {
          key: 'renderCalendar',
          value: function renderCalendar() {
            var table = document.createElement('TABLE');
            table.className = 'table-responsive';
            var year = this.currentDate.getFullYear();
            var month = this.currentDate.getMonth();

            var d = new Date(year, month, 1);
            var lastD = new Date(year, month + 1, 0);
            var tableRow = table.insertRow();
            for (var i = 0; i < this.getDay(d); i++) {
              var tableCell = tableRow.insertCell();
              tableCell.className = 'calendar-day';
            }

            while (d.getMonth() == month) {
              var tableCell = tableRow.insertCell();
              tableCell.innerHTML = d.getDate();
              tableCell.id = d.getTime();
              tableCell.className = 'calendar-day';
              new EventsList(tableCell, d);

              if (this.getDay(d) % 7 === 6) {
                tableRow = table.insertRow();
              }
              d.setDate(d.getDate() + 1);
            }

            if (this.getDay(d) !== 0) {
              for (i = this.getDay(lastD); i < 6; i++) {
                var tableCell = tableRow.insertCell();
                tableCell.className = 'calendar-day';
              }
            }

            this.element.appendChild(table);

            var self = this;
            table.addEventListener('click', function () {
              self.selectCell(event);
            });

            // нарисовать сам календарь
          }

          /**
           * Render calendar header and body
           */

        }, {
          key: 'render',
          value: function render() {
            this.element.innerHTML = '';
            this.renderCalendarHeader();
            this.renderCalendar();
            db.loadEventsFromDB();
          }
        }, {
          key: 'show',
          value: function show() {
            this.element.style.display = 'block';
          }
        }, {
          key: 'hide',
          value: function hide() {
            this.element.style.display = 'none';
          }
        }, {
          key: 'getDay',
          value: function getDay(date) {
            // weekdays Monday (0) to Sunday (6)
            var weekDay = date.getDay();
            if (weekDay === 0) weekDay = 7;
            return weekDay - 1;
          }
        }, {
          key: 'selectCell',
          value: function selectCell(event) {
            var table = document.getElementsByTagName('TABLE');
            var target = event.target;

            while (target !== table && target.innerHTML !== '') {
              if (target.tagName == 'TD') {
                evEditForm.showEventCreateForm(target.id);
                return;
              }

              if (target.classList.contains('event')) {
                evEditForm.showEventEditForm(target.id);
                return;
              }

              if (target.tagName == 'BUTTON') {
                db.deleteEvent(target.parentNode.id);
                cal.render();
                return;
              }

              target = target.parentNode;
            }
          }
        }]);

        return Calendar;
      }();

      //export default Calendar;
      /**
       * Class representing a comment
       * @class
       */

      var Comment = function () {
        /**
         * Create a comment
         * @constructor
         * @param {Object} element - DOM element
         * @param {Object} commentData - Comment data
         */
        function Comment(element, commentData) {
          _classCallCheck(this, Comment);

          this.element = element; // элемент = ячейка?
          this.commentData = commentData;
          this.renderComment();
        }

        /**
         * Render comment
         */

        _createClass(Comment, [{
          key: 'renderComment',
          value: function renderComment() {
            var comment = document.createElement('DIV');
            comment.innerHTML = '\
  	<div class="comments"> \
	  <h4>Comments</h4> \
	  <ul class="list-group"> \
	    <li class="list-group-item">rerel</li> \
	    <li class="list-group-item">fkdlfdkfl</li> \
	  </ul> \
	</div>';
            comment.contentEditable = 'true';
            this.element.appendChild(comment);
          }
        }]);

        return Comment;
      }();

      //export default Comment;
      /**
       * Class representing a event
       * @class
       */

      var EventsList = function () {
        /**
         * Create a event
         * @constructor
         * @param {Object} element - DOM element
         * @param {Object} eventData - Event data
         */
        function EventsList(element) {
          _classCallCheck(this, EventsList);

          this.element = element;
          //this.date = date;
          this.renderEventsList();
        }

        /**
         * Render event
         */

        _createClass(EventsList, [{
          key: 'renderEventsList',
          value: function renderEventsList() {
            var events = db.loadEventsByDate(this.element.id);
            if (!events || !events.length) return;

            var eventsList = document.createElement('DIV');
            eventsList.className = 'events';
            eventsList.innerHTML = '\
    <div class="panel panel-info"> \
        <div class="panel-heading"> \
          <h3 class="panel-title">Your events</h3> \
        </div> \
        <div class="panel-body"> \
        </div> \
    </div>';
            var eventsListContainer = eventsList.querySelector('.panel-body');
            /*new Event(eventsListContainer, 'hello');
            new Event(eventsListContainer, 'hello world');*/

            events.forEach(function (elem) {
              new Event(eventsListContainer, elem);
            });

            this.element.appendChild(eventsList);
            // добавить событие в переданный DOM элемент
            // повесить на кнопку deleteEvent
          }
        }]);

        return EventsList;
      }();

      //export default Event;
      /**
       * Class representing a event
       * @class
       */

      var Event = function () {
        /**
         * Create a event
         * @constructor
         * @param {Object} element - DOM element
         * @param {Object} eventData - Event data
         */
        function Event(element, eventData, db) {
          _classCallCheck(this, Event);

          this.element = element;
          this.eventData = eventData;
          this.renderEvent();
        }

        /**
          * Delete event
          */

        _createClass(Event, [{
          key: 'deleteEvent',
          value: function deleteEvent() {}
          // db.deleteEvent(id)
          // id взять из eventData


          /**
           * Render event
           */

        }, {
          key: 'renderEvent',
          value: function renderEvent() {
            // добавить событие в переданный DOM элемент
            // повесить на кнопку deleteEvent
            var event = document.createElement('DIV');

            event.className = 'event alert alert-dismissible alert-success';

            event.innerHTML = '\
      <button class="close">×</button> \
      <div class="alert-link"></div>';

            event.querySelector('.alert-link').innerHTML = this.eventData.text;
            event.id = this.eventData.id;

            this.element.appendChild(event);
          }
        }]);

        return Event;
      }();

      //export default Event;
      /**
        * Class representing app header
        * @class
        */

      var Header = function () {
        /**
          * Create a header
          * @param {Object} element - DOM element
          * @param {Object} user - User object
          */
        function Header(element, user) {
          _classCallCheck(this, Header);

          this.element = element;
          this.user = user;
          this.renderHeader();
          //  this.rewriteOnLogin();
        }

        /**
         * Render header
         */

        _createClass(Header, [{
          key: 'renderHeader',
          value: function renderHeader() {

            // отображает хеадер с разными кнопками в зависимости
            // от того залогинен юзер или нет
            // при нажатии на кнопки переходить на страницу регистрации или вылогинивать юзера
            // user.logout();
            // и тд

            // возможно оптимально его отрендерить один раз, и менять состояние через event bus,
            // но пока не понятно))

            this.header = document.createElement('DIV');
            this.header.className = 'navbar navbar-default';
            this.header.innerHTML = '<div class="container-fluid"> \
        <div class="navbar-header"> \
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-responsive-collapse"> \
            <span class="icon-bar"></span> \
            <span class="icon-bar"></span> \
            <span class="icon-bar"></span> \
          </button> \
          <a class="navbar-brand" href="#">Home</a> \
        </div> \
        <div class="navbar-collapse collapse navbar-responsive-collapse"> \
          <ul class="nav navbar-nav"> \
            <li class="active"><a href="javascript:void(0)">Active</a></li> \
            <li><a href="javascript:void(0)">Link</a></li> \
          </ul> \
          <ul class="nav navbar-nav navbar-right my-top-buttons"> \
            <li><button class="btn btn-raised btn-danger my-top-btn">View All</button></li> \
            <li><button class="btn btn-raised btn-danger my-top-btn my-top-login-btn">Logout</button></li> \
          </ul> \
        </div> \
      </div>';

            this.element.insertBefore(this.header, this.element.childNodes[0]);
            this.element.querySelector('.my-top-buttons').style.display = 'none';

            var self = this;
            this.element.querySelector('.my-top-login-btn').addEventListener('click', function () {
              self.rewriteOnLogout();
            });
          }
        }, {
          key: 'rewriteOnLogin',
          value: function rewriteOnLogin() {
            //this.element.querySelector('.my-top-login-btn').innerHTML = 'Logout';
            this.element.querySelector('.my-top-buttons').style.display = 'block';
          }
        }, {
          key: 'rewriteOnLogout',
          value: function rewriteOnLogout() {
            //this.element.querySelector('.my-top-login-btn').innerHTML = 'Login';
            //document.querySelector('.form-signin').reset();
            this.element.querySelector('.my-top-buttons').style.display = 'none';
            document.querySelector('.login').style.display = 'block';
            cal.hide();
            document.querySelector('.form-signin').reset();
          }
        }]);

        return Header;
      }();

      //export default Header;
      /**
        * Class representing app footer
        * @class
        */

      var Footer = function () {
        /**
          * Create a footer
          * @param {Object} element - DOM element
          */
        function Footer(element, user) {
          _classCallCheck(this, Footer);

          this.element = element;
          this.renderFooter();
        }

        /**
         * Render footer
         */

        _createClass(Footer, [{
          key: 'renderFooter',
          value: function renderFooter() {
            this.footer = document.createElement('FOOTER');
            this.footer.innerHTML = '&copy; 2017 My team JS calendar. All rights reserved. Make with love <span>❤</span>';
            this.element.appendChild(this.footer);
          }
        }]);

        return Footer;
      }();
      /**
       * Class representing login form
       * @class
       */

      var LoginForm = function () {

        /**
         * Create a login form
         * @constructor
         */
        function LoginForm(element, db) {
          _classCallCheck(this, LoginForm);

          this.element = element;
          this.db = db;
          this.renderLoginForm();
          this.show();
        }

        /**
         * Handle login form
         */

        _createClass(LoginForm, [{
          key: 'handleSubmit',
          value: function handleSubmit() {
            var _this = this;

            var email = this.loginForm.querySelector('input[name="username"]').value;
            var pass = this.loginForm.querySelector('input[name="password"]').value;

            Promise.resolve().then(function () {
              return firebase.auth().signInWithEmailAndPassword(email, pass);
            }).catch(function () {
              return firebase.auth().createUserWithEmailAndPassword(email, pass);
            }).then(function () {
              var user = firebase.auth().currentUser;
              var uid = void 0;
              uid = user.uid;
              var calendarContainer = document.querySelector('.calendar-container');
              var cal = new Calendar(calendarContainer);
              cal.show();
              _this.hide();
              //location.hash = "monthlyView";
              sessionStorage.setItem("currentUser", email);
              sessionStorage.setItem("key", uid);
              return;
            }).catch(function () {
              _this.handleWrongPassword();
              document.querySelector('.form-signin').reset();
            });

            // if (user.login(userName, userPassword)) {
            //   db = new DB(userName);


            //   this.handleCorrectPassword();
            // } else {
            //   this.handleWrongPassword();
            //   document.querySelector('.form-signin').reset();
            // }
          }
        }, {
          key: 'handleWrongPassword',
          value: function handleWrongPassword() {
            this.element.querySelector('input[name="password"]').placeholder = 'Wrong password! Try again';
            this.element.querySelector('input[name="password"]').className = 'form-control my-login wrong-pass';
          }
        }, {
          key: 'handleCorrectPassword',
          value: function handleCorrectPassword() {
            this.element.querySelector('input[name="password"]').placeholder = 'Password';
            this.element.querySelector('input[name="password"]').className = 'form-control my-login';
          }
        }, {
          key: 'renderLoginForm',
          value: function renderLoginForm() {
            // отрендерить форму
            // повесить на форму handleSubmit
            this.loginForm = document.createElement('DIV');
            this.loginForm.className = 'container login';
            this.loginForm.innerHTML = '<form class="form-signin"> \
    <h2 class="form-signin-heading">Log In</h2> \
    <input type="text" class="form-control my-login" name="username" placeholder="Email Address" required="" autofocus=""/> \
    <input type="password" class="form-control my-login" name="password" placeholder="Password" required=""/> \
    <button class="btn btn-lg btn-block my-login-btn" type="button">Login</button> \
    </form>';
            this.element.appendChild(this.loginForm);
            var self = this;
            this.element.querySelector('.my-login-btn').addEventListener('click', function (event) {
              event.preventDefault();
              self.handleSubmit();
            });
          }
        }, {
          key: 'show',
          value: function show() {
            this.loginForm.style.display = 'block';
            header.rewriteOnLogout();
          }
        }, {
          key: 'hide',
          value: function hide() {
            this.loginForm.style.display = 'none';
            header.rewriteOnLogin();
          }
        }]);

        return LoginForm;
      }();

      //export default CommentForm;
      /**
        * Class representing comment form
        * @class
        */

      var EventEditForm = function () {

        /**
          * Create a comment form
          * @constructor
          */
        function EventEditForm(element, db) {
          _classCallCheck(this, EventEditForm);

          this.element = element;
          this.db = db;
          //this.eventId = eventId;
          this.renderEventEditForm();
        }

        /**
          * Handle submit form
          */

        _createClass(EventEditForm, [{
          key: 'handleSubmit',
          value: function handleSubmit() {
            //debugger;
            this.event.text = this.eventForm.querySelector('.content').innerHTML;
            if (this.event.id) {
              db.updateEvent(this.event);
            } else {
              db.saveEventInDB(this.event.text, this.event.cellId);
              // db.addEvent(this.event);
            }
            this.eventForm.style.display = 'none';
            cal.render();
            // собрать данные с формы
            // отправить их
            // db.addComment()
            // отчистить форму
            // обновлять список комментариев вроде не нужно, firebase обновит их сама
          }
        }, {
          key: 'handleDelete',
          value: function handleDelete() {
            this.eventForm.style.display = 'none';
            cal.render();
          }
        }, {
          key: 'showEventCreateForm',
          value: function showEventCreateForm(cellId) {
            this.eventForm.style.display = 'block';
            this.event = { text: '', cellId: cellId };
            this.eventForm.querySelector('.content').innerHTML = this.event.text;
          }
        }, {
          key: 'showEventEditForm',
          value: function showEventEditForm(eventId) {
            this.eventForm.style.display = 'block';
            this.event = db.loadEvent(eventId);
            this.eventForm.querySelector('.content').innerHTML = this.event.text;
          }
        }, {
          key: 'renderEventEditForm',
          value: function renderEventEditForm() {
            // отрендерить форму
            // повесить на форму handleSubmit
            this.eventForm = document.createElement('DIV');
            this.eventForm.className = 'event-detail panel panel-info event-form';
            this.eventForm.style.display = 'none';
            this.eventForm.innerHTML = ' \
    <div class="panel-heading"> \
      <h3 class="panel-title">My important event</h3> \
    </div> \
    <div class="panel-body"> \
      <header> \
          <button class="btn btn-raised btn-danger">Delete</button> \
          <button class="btn btn-raised btn-info">Save</button> \
      </header> \
      <div class="content" contenteditable></div>\
    </div>';

            this.element.appendChild(this.eventForm);
            var self = this;
            this.eventForm.querySelector('.btn-info').addEventListener('click', function () {
              self.handleSubmit();
            });
            this.eventForm.querySelector('.btn-danger').addEventListener('click', function () {
              self.handleDelete();
            });
          }
        }]);

        return EventEditForm;
      }();

      //export default CommentForm;
      /**
       * Class representing database
       * @class
       */

      var DB = function () {
        /**
         * Create a database object
         * @constructor
         * @param {String} API - API for requests
         */
        function DB(user) {
          _classCallCheck(this, DB);

          this.eventsStorageItem = "MYEVNT_" + user;
        }

        /**
         * Load all events
         * @returns {Promise}
         */

        _createClass(DB, [{
          key: 'loadEvents',
          value: function loadEvents() {
            //debugger;
            var json = localStorage.getItem(this.eventsStorageItem);
            var data = JSON.parse(json || "[]");
            return data;
          }

          /**
           * Load event by ID
           * @param {String} id - ID of event
           * @returns {Promise}
           */

        }, {
          key: 'loadEvent',
          value: function loadEvent(id) {
            var all = this.loadEvents();
            return all.find(function (p) {
              return p.id == id;
            });
          }
        }, {
          key: 'loadEventsByDate',
          value: function loadEventsByDate(date) {
            //debugger;
            return this.loadEvents().filter(function (p) {
              return p.cellId === date;
            });
          }
        }, {
          key: 'saveAll',
          value: function saveAll(events) {
            localStorage.setItem(this.eventsStorageItem, JSON.stringify(events));
          }

          /**
           * Add new event
           * @param {Object} eventData - title, description, date, status, comments...
           * @returns {Promise}
           */

        }, {
          key: 'addEvent',
          value: function addEvent(eventData) {
            var all = this.loadEvents() || [];
            eventData.id = new Date().getTime();
            all.push(eventData);
            this.saveAll(all);
          }
        }, {
          key: 'saveEventInDB',
          value: function saveEventInDB(taskTitle, dateDay) {
            var _this2 = this;

            var key = sessionStorage.getItem("key");
            var ref = firebase.database().ref();
            var obj = void 0;
            Promise.resolve().then(function () {
              return _this2.chekUser(key, ref, obj);
            }).catch(function () {
              return _this2.createStructure(key, ref, obj);
            }).then(function () {
              return _this2.addData(key, ref, obj, taskTitle, dateDay);
            }).catch(function (err) {
              return console.error(err);
            });
          }
        }, {
          key: 'chekUser',
          value: function chekUser(key, ref, obj) {
            return new Promise(function (resolve, reject) {
              ref.on("value", function (snapshot) {
                obj = snapshot.val();
                obj = obj['' + key];
                if (!obj || obj == null) return reject();
                resolve();
              });
            });
          }
        }, {
          key: 'createStructure',
          value: function createStructure(key, ref, obj) {
            return new Promise(function (resolve, reject) {
              obj = {};
              obj = JSON.stringify(obj);
              ref = firebase.database().ref(key + '/');
              ref.set(obj);
              return resolve();
            });
          }
        }, {
          key: 'addData',
          value: function addData(key, ref, obj, taskTitle, dateDay) {
            ref.on("value", function (snapshot) {
              obj = snapshot.val();
            }, function (error) {
              console.log("Error: " + error.code);
            });
            obj = obj['' + key];
            obj = JSON.parse(obj);
            var arrTitle = obj['' + dateDay];
            if (!arrTitle) {
              obj['' + dateDay] = {
                title: [],
                text: [],
                done: []
              };
              arrTitle = obj['' + dateDay].title;
            } else {
              arrTitle = obj['' + dateDay].title;
            }
            // let arrText = obj[`${dateDay}`].text;
            arrTitle.push(taskTitle);
            //arrText.push(taskDescription);
            obj = JSON.stringify(obj);
            ref = firebase.database().ref('' + key);
            ref.set(obj);
            return resolve();
          }
        }, {
          key: 'loadEventsFromDB',
          value: function loadEventsFromDB() {
            var _this3 = this;

            var key = sessionStorage.getItem("key");
            var ref = firebase.database().ref();
            var obj = void 0;
            Promise.resolve().then(function () {
              return _this3.loadDataForCalenedarRendar(key, ref, obj);
            }).catch(function () {
              return alert("загрузка");
            });
          }
        }, {
          key: 'loadDataForCalenedarRendar',
          value: function loadDataForCalenedarRendar(key, ref, obj) {
            return new Promise(function (resolve, reject) {
              ref.on("value", function (snapshot) {
                obj = snapshot.val();
                obj = obj['' + key];
                obj = JSON.parse(obj);
                var cal = document.querySelector("table");
                for (var dateLoad in obj) {
                  var loadData = obj['' + dateLoad].title;
                  var res = cal.querySelector('#' + dateLoad);
                  if (res != null) {
                    if (loadData.length - 1 == 0) {
                      res.innerHTML += '<div>' + loadData + '<button class="cross">[x]</button></div>';
                    } else {
                      for (var i = 0; i < loadData.length; i++) {
                        var dbArr = loadData;
                        res.innerHTML += '<div>' + dbArr[i] + '<button class="cross">[x]</button></div>';
                      }
                    }
                  }
                }
                resolve();
              }, function (error) {
                reject();
              });
            });
          }
        }, {
          key: 'deleteEventInDB',
          value: function deleteEventInDB(dateDay, text) {
            var _this4 = this;

            if (dateDay == "") return;
            var key = sessionStorage.getItem("key");
            var ref = firebase.database().ref();
            var obj = void 0;
            Promise.resolve().then(function () {
              return _this4.delEventFromDB(key, ref, obj, dateDay, text);
            }).catch(function () {
              return alert("удаление");
            });
          }
        }, {
          key: 'delEventFromDB',
          value: function delEventFromDB(key, ref, obj, dateDay, text) {
            return new Promise(function (resolve, reject) {
              ref.on("value", function (snapshot) {
                obj = snapshot.val();
              }, function (error) {
                console.log("Error: " + error.code);
              });
              obj = obj['' + key];
              obj = JSON.parse(obj);
              var index = obj['' + dateDay].title.indexOf(text);
              obj['' + dateDay].title.splice(index, 1);
              obj['' + dateDay].text.splice(index, 1);
              // obj[`${dateDay}`].done.splice(index, 1);
              obj = JSON.stringify(obj);
              ref = firebase.database().ref('' + key);
              ref.set(obj);
              console.log(obj);
              return resolve();
            });
          }
        }, {
          key: 'updateEvent',
          value: function updateEvent(event) {
            var all = this.loadEvents();
            var found = all.find(function (p) {
              return p.id == event.id;
            });
            if (found) {
              var index = all.indexOf(found);
              all.splice(index, 1);
              all.push(event);
              this.saveAll(all);
            }
          }

          /**
           * Delete event by ID
           * @param {String} id - ID of event
           * @returns {Promise}
           */

        }, {
          key: 'deleteEvent',
          value: function deleteEvent(id) {
            var all = this.loadEvents();
            var found = all.find(function (p) {
              return p.id == id;
            });
            if (found) {
              var index = all.indexOf(found);
              all.splice(index, 1);
              this.saveAll(all);
            }
          }

          /**
           * Add new comment
           * @param {Object} commentData - comment data
           * @returns {Promise}
           */

        }, {
          key: 'addComment',
          value: function addComment(commentData) {}

          /**
           * Load all event's comments
           * @param {String} eventID
           * @returns {Promise}
           */

        }, {
          key: 'loadComments',
          value: function loadComments(eventID) {}
        }]);

        return DB;
      }();

      //export default DB;
      /**
      * Class representing a user
      * @class
      */

      var User = function () {
        /**
         * Create a user
         * @constructor
         */
        function User() {
          _classCallCheck(this, User);

          this.isUserLogin = false;
          this.name = "";
        }

        /**
         * Login user
         * @param {String} name - Username
         * @param {String} password - User password
         * @returns {Promise} Returns promise
         */

        _createClass(User, [{
          key: 'login',
          value: function login(name, password) {
            var users = this.loadUsers();
            var user = users.find(function (p) {
              return p.name === name;
            });
            if (user) {
              this.isUserLogin = user.password === password;
            } else {
              user = { name: name, password: password };
              users.push(user);
              this.saveUsers(users);
              this.isUserLogin = true;
            }
            if (this.isUserLogin) {
              this.name = user.name;
            }
            return this.isUserLogin;
            // if true - isUserLogin = true
            // if not registered - create new user
          }

          /**
           * Logout user
           *
           *
           */

        }, {
          key: 'logout',
          value: function logout() {
            this.isUserLogin = false;
            this.name = "";
          }
        }, {
          key: 'loadUsers',
          value: function loadUsers() {
            var json = localStorage.getItem('MYUSERS');
            var data = JSON.parse(json || "[]");
            return data;
          }
        }, {
          key: 'saveUsers',
          value: function saveUsers(users) {
            localStorage.setItem('MYUSERS', JSON.stringify(users));
          }
        }]);

        return User;
      }();

      //export default User;


      var db = new DB();

      var calendarContainer = document.querySelector('.calendar-container');
      var cal = new Calendar(calendarContainer);

      var evEditForm = new EventEditForm(document.body, '');
      var user = new User();

      var header = new Header(document.body, '');
      var login = new LoginForm(document.body, '');
      var footer = new Footer(document.body);
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_75cdf7af.js", "/");
  }, { "buffer": 2, "e/U+97": 4 }] }, {}, [5]);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL0xvTC9EZXNrdG9wL2pzLWNhbGVuZGFyLXNwYS10ZWFtL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9Vc2Vycy9Mb0wvRGVza3RvcC9qcy1jYWxlbmRhci1zcGEtdGVhbS9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2xpYi9iNjQuanMiLCJDOi9Vc2Vycy9Mb0wvRGVza3RvcC9qcy1jYWxlbmRhci1zcGEtdGVhbS9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwiQzovVXNlcnMvTG9ML0Rlc2t0b3AvanMtY2FsZW5kYXItc3BhLXRlYW0vbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanMiLCJDOi9Vc2Vycy9Mb0wvRGVza3RvcC9qcy1jYWxlbmRhci1zcGEtdGVhbS9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwiQzovVXNlcnMvTG9ML0Rlc2t0b3AvanMtY2FsZW5kYXItc3BhLXRlYW0vc3JjL2pzL2Zha2VfNzVjZGY3YWYuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQSxBQUNBOztBQUNBLG1CQUNBOztBQUNBLDJCQUNBO0FBQ0EsQUFDQTs7bUVBQ0EsQUFDQTs7a0NBQ0E7bUNBQ0E7b0NBQ0E7bUNBQ0E7bUNBQ0E7MkNBQ0E7NENBQ0EsQUFDQTs7NkJBQ0E7b0NBQ0E7a0VBQ0E7b0VBQ0E7d0NBQ0E7OERBQ0E7K0NBQ0E7dURBQ0E7QUFDQSxBQUNBOztxQ0FDQTswQ0FDQSxBQUNBOztrQ0FDQTs0QkFDQTtBQUNBLEFBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTt3QkFDQTs2RkFDQSxBQUNBOztBQUNBOzZDQUNBLEFBQ0E7O0FBQ0E7c0RBQ0EsQUFDQTs7a0JBQ0EsQUFDQTs7MkJBQ0E7dUJBQ0E7QUFDQSxBQUNBOztvREFDQTt5SUFDQTtxQ0FDQTttQ0FDQTt1QkFDQTtBQUNBLEFBQ0E7O2tDQUNBOzRFQUNBO3VCQUNB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LHVDQUNBLEFBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBsb29rdXAgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG5cbjsoZnVuY3Rpb24gKGV4cG9ydHMpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBBcnIgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgPyBVaW50OEFycmF5IDogQXJyYXk7XG5cblx0dmFyIFBMVVMgPSAnKycuY2hhckNvZGVBdCgwKTtcblx0dmFyIFNMQVNIID0gJy8nLmNoYXJDb2RlQXQoMCk7XG5cdHZhciBOVU1CRVIgPSAnMCcuY2hhckNvZGVBdCgwKTtcblx0dmFyIExPV0VSID0gJ2EnLmNoYXJDb2RlQXQoMCk7XG5cdHZhciBVUFBFUiA9ICdBJy5jaGFyQ29kZUF0KDApO1xuXHR2YXIgUExVU19VUkxfU0FGRSA9ICctJy5jaGFyQ29kZUF0KDApO1xuXHR2YXIgU0xBU0hfVVJMX1NBRkUgPSAnXycuY2hhckNvZGVBdCgwKTtcblxuXHRmdW5jdGlvbiBkZWNvZGUoZWx0KSB7XG5cdFx0dmFyIGNvZGUgPSBlbHQuY2hhckNvZGVBdCgwKTtcblx0XHRpZiAoY29kZSA9PT0gUExVUyB8fCBjb2RlID09PSBQTFVTX1VSTF9TQUZFKSByZXR1cm4gNjI7IC8vICcrJ1xuXHRcdGlmIChjb2RlID09PSBTTEFTSCB8fCBjb2RlID09PSBTTEFTSF9VUkxfU0FGRSkgcmV0dXJuIDYzOyAvLyAnLydcblx0XHRpZiAoY29kZSA8IE5VTUJFUikgcmV0dXJuIC0xOyAvL25vIG1hdGNoXG5cdFx0aWYgKGNvZGUgPCBOVU1CRVIgKyAxMCkgcmV0dXJuIGNvZGUgLSBOVU1CRVIgKyAyNiArIDI2O1xuXHRcdGlmIChjb2RlIDwgVVBQRVIgKyAyNikgcmV0dXJuIGNvZGUgLSBVUFBFUjtcblx0XHRpZiAoY29kZSA8IExPV0VSICsgMjYpIHJldHVybiBjb2RlIC0gTE9XRVIgKyAyNjtcblx0fVxuXG5cdGZ1bmN0aW9uIGI2NFRvQnl0ZUFycmF5KGI2NCkge1xuXHRcdHZhciBpLCBqLCBsLCB0bXAsIHBsYWNlSG9sZGVycywgYXJyO1xuXG5cdFx0aWYgKGI2NC5sZW5ndGggJSA0ID4gMCkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0Jyk7XG5cdFx0fVxuXG5cdFx0Ly8gdGhlIG51bWJlciBvZiBlcXVhbCBzaWducyAocGxhY2UgaG9sZGVycylcblx0XHQvLyBpZiB0aGVyZSBhcmUgdHdvIHBsYWNlaG9sZGVycywgdGhhbiB0aGUgdHdvIGNoYXJhY3RlcnMgYmVmb3JlIGl0XG5cdFx0Ly8gcmVwcmVzZW50IG9uZSBieXRlXG5cdFx0Ly8gaWYgdGhlcmUgaXMgb25seSBvbmUsIHRoZW4gdGhlIHRocmVlIGNoYXJhY3RlcnMgYmVmb3JlIGl0IHJlcHJlc2VudCAyIGJ5dGVzXG5cdFx0Ly8gdGhpcyBpcyBqdXN0IGEgY2hlYXAgaGFjayB0byBub3QgZG8gaW5kZXhPZiB0d2ljZVxuXHRcdHZhciBsZW4gPSBiNjQubGVuZ3RoO1xuXHRcdHBsYWNlSG9sZGVycyA9ICc9JyA9PT0gYjY0LmNoYXJBdChsZW4gLSAyKSA/IDIgOiAnPScgPT09IGI2NC5jaGFyQXQobGVuIC0gMSkgPyAxIDogMDtcblxuXHRcdC8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuXHRcdGFyciA9IG5ldyBBcnIoYjY0Lmxlbmd0aCAqIDMgLyA0IC0gcGxhY2VIb2xkZXJzKTtcblxuXHRcdC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcblx0XHRsID0gcGxhY2VIb2xkZXJzID4gMCA/IGI2NC5sZW5ndGggLSA0IDogYjY0Lmxlbmd0aDtcblxuXHRcdHZhciBMID0gMDtcblxuXHRcdGZ1bmN0aW9uIHB1c2godikge1xuXHRcdFx0YXJyW0wrK10gPSB2O1xuXHRcdH1cblxuXHRcdGZvciAoaSA9IDAsIGogPSAwOyBpIDwgbDsgaSArPSA0LCBqICs9IDMpIHtcblx0XHRcdHRtcCA9IGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAxOCB8IGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPDwgMTIgfCBkZWNvZGUoYjY0LmNoYXJBdChpICsgMikpIDw8IDYgfCBkZWNvZGUoYjY0LmNoYXJBdChpICsgMykpO1xuXHRcdFx0cHVzaCgodG1wICYgMHhGRjAwMDApID4+IDE2KTtcblx0XHRcdHB1c2goKHRtcCAmIDB4RkYwMCkgPj4gOCk7XG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpO1xuXHRcdH1cblxuXHRcdGlmIChwbGFjZUhvbGRlcnMgPT09IDIpIHtcblx0XHRcdHRtcCA9IGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAyIHwgZGVjb2RlKGI2NC5jaGFyQXQoaSArIDEpKSA+PiA0O1xuXHRcdFx0cHVzaCh0bXAgJiAweEZGKTtcblx0XHR9IGVsc2UgaWYgKHBsYWNlSG9sZGVycyA9PT0gMSkge1xuXHRcdFx0dG1wID0gZGVjb2RlKGI2NC5jaGFyQXQoaSkpIDw8IDEwIHwgZGVjb2RlKGI2NC5jaGFyQXQoaSArIDEpKSA8PCA0IHwgZGVjb2RlKGI2NC5jaGFyQXQoaSArIDIpKSA+PiAyO1xuXHRcdFx0cHVzaCh0bXAgPj4gOCAmIDB4RkYpO1xuXHRcdFx0cHVzaCh0bXAgJiAweEZGKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYXJyO1xuXHR9XG5cblx0ZnVuY3Rpb24gdWludDhUb0Jhc2U2NCh1aW50OCkge1xuXHRcdHZhciBpLFxuXHRcdCAgICBleHRyYUJ5dGVzID0gdWludDgubGVuZ3RoICUgMyxcblx0XHQgICAgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcblx0XHRvdXRwdXQgPSBcIlwiLFxuXHRcdCAgICB0ZW1wLFxuXHRcdCAgICBsZW5ndGg7XG5cblx0XHRmdW5jdGlvbiBlbmNvZGUobnVtKSB7XG5cdFx0XHRyZXR1cm4gbG9va3VwLmNoYXJBdChudW0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NChudW0pIHtcblx0XHRcdHJldHVybiBlbmNvZGUobnVtID4+IDE4ICYgMHgzRikgKyBlbmNvZGUobnVtID4+IDEyICYgMHgzRikgKyBlbmNvZGUobnVtID4+IDYgJiAweDNGKSArIGVuY29kZShudW0gJiAweDNGKTtcblx0XHR9XG5cblx0XHQvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG5cdFx0Zm9yIChpID0gMCwgbGVuZ3RoID0gdWludDgubGVuZ3RoIC0gZXh0cmFCeXRlczsgaSA8IGxlbmd0aDsgaSArPSAzKSB7XG5cdFx0XHR0ZW1wID0gKHVpbnQ4W2ldIDw8IDE2KSArICh1aW50OFtpICsgMV0gPDwgOCkgKyB1aW50OFtpICsgMl07XG5cdFx0XHRvdXRwdXQgKz0gdHJpcGxldFRvQmFzZTY0KHRlbXApO1xuXHRcdH1cblxuXHRcdC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcblx0XHRzd2l0Y2ggKGV4dHJhQnl0ZXMpIHtcblx0XHRcdGNhc2UgMTpcblx0XHRcdFx0dGVtcCA9IHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDFdO1xuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKHRlbXAgPj4gMik7XG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUodGVtcCA8PCA0ICYgMHgzRik7XG5cdFx0XHRcdG91dHB1dCArPSAnPT0nO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgMjpcblx0XHRcdFx0dGVtcCA9ICh1aW50OFt1aW50OC5sZW5ndGggLSAyXSA8PCA4KSArIHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDFdO1xuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKHRlbXAgPj4gMTApO1xuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKHRlbXAgPj4gNCAmIDB4M0YpO1xuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKHRlbXAgPDwgMiAmIDB4M0YpO1xuXHRcdFx0XHRvdXRwdXQgKz0gJz0nO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHRyZXR1cm4gb3V0cHV0O1xuXHR9XG5cblx0ZXhwb3J0cy50b0J5dGVBcnJheSA9IGI2NFRvQnl0ZUFycmF5O1xuXHRleHBvcnRzLmZyb21CeXRlQXJyYXkgPSB1aW50OFRvQmFzZTY0O1xufSkodHlwZW9mIGV4cG9ydHMgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkLmJhc2U2NGpzID0ge30gOiBleHBvcnRzKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltSTJOQzVxY3lKZExDSnVZVzFsY3lJNld5SnNiMjlyZFhBaUxDSmxlSEJ2Y25Seklpd2lRWEp5SWl3aVZXbHVkRGhCY25KaGVTSXNJa0Z5Y21GNUlpd2lVRXhWVXlJc0ltTm9ZWEpEYjJSbFFYUWlMQ0pUVEVGVFNDSXNJazVWVFVKRlVpSXNJa3hQVjBWU0lpd2lWVkJRUlZJaUxDSlFURlZUWDFWU1RGOVRRVVpGSWl3aVUweEJVMGhmVlZKTVgxTkJSa1VpTENKa1pXTnZaR1VpTENKbGJIUWlMQ0pqYjJSbElpd2lZalkwVkc5Q2VYUmxRWEp5WVhraUxDSmlOalFpTENKcElpd2lhaUlzSW13aUxDSjBiWEFpTENKd2JHRmpaVWh2YkdSbGNuTWlMQ0poY25JaUxDSnNaVzVuZEdnaUxDSkZjbkp2Y2lJc0lteGxiaUlzSW1Ob1lYSkJkQ0lzSWt3aUxDSndkWE5vSWl3aWRpSXNJblZwYm5RNFZHOUNZWE5sTmpRaUxDSjFhVzUwT0NJc0ltVjRkSEpoUW5sMFpYTWlMQ0p2ZFhSd2RYUWlMQ0owWlcxd0lpd2laVzVqYjJSbElpd2liblZ0SWl3aWRISnBjR3hsZEZSdlFtRnpaVFkwSWl3aWRHOUNlWFJsUVhKeVlYa2lMQ0ptY205dFFubDBaVUZ5Y21GNUlpd2lZbUZ6WlRZMGFuTWlYU3dpYldGd2NHbHVaM01pT2lJN08wRkJRVUVzU1VGQlNVRXNVMEZCVXl4clJVRkJZanM3UVVGRlFTeERRVUZGTEZkQlFWVkRMRTlCUVZZc1JVRkJiVUk3UVVGRGNFSTdPMEZCUlVNc1MwRkJTVU1zVFVGQlR5eFBRVUZQUXl4VlFVRlFMRXRCUVhOQ0xGZEJRWFpDTEVkQlEwNUJMRlZCUkUwc1IwRkZUa01zUzBGR1NqczdRVUZKUkN4TFFVRkpReXhQUVVGVExFbEJRVWxETEZWQlFVb3NRMEZCWlN4RFFVRm1MRU5CUVdJN1FVRkRRU3hMUVVGSlF5eFJRVUZUTEVsQlFVbEVMRlZCUVVvc1EwRkJaU3hEUVVGbUxFTkJRV0k3UVVGRFFTeExRVUZKUlN4VFFVRlRMRWxCUVVsR0xGVkJRVW9zUTBGQlpTeERRVUZtTEVOQlFXSTdRVUZEUVN4TFFVRkpSeXhSUVVGVExFbEJRVWxJTEZWQlFVb3NRMEZCWlN4RFFVRm1MRU5CUVdJN1FVRkRRU3hMUVVGSlNTeFJRVUZUTEVsQlFVbEtMRlZCUVVvc1EwRkJaU3hEUVVGbUxFTkJRV0k3UVVGRFFTeExRVUZKU3l4blFrRkJaMElzU1VGQlNVd3NWVUZCU2l4RFFVRmxMRU5CUVdZc1EwRkJjRUk3UVVGRFFTeExRVUZKVFN4cFFrRkJhVUlzU1VGQlNVNHNWVUZCU2l4RFFVRmxMRU5CUVdZc1EwRkJja0k3TzBGQlJVRXNWVUZCVTA4c1RVRkJWQ3hEUVVGcFFrTXNSMEZCYWtJc1JVRkJjMEk3UVVGRGNrSXNUVUZCU1VNc1QwRkJUMFFzU1VGQlNWSXNWVUZCU2l4RFFVRmxMRU5CUVdZc1EwRkJXRHRCUVVOQkxFMUJRVWxUTEZOQlFWTldMRWxCUVZRc1NVRkRRVlVzVTBGQlUwb3NZVUZFWWl4RlFVVkRMRTlCUVU4c1JVRkJVQ3hEUVVwdlFpeERRVWxXTzBGQlExZ3NUVUZCU1Vrc1UwRkJVMUlzUzBGQlZDeEpRVU5CVVN4VFFVRlRTQ3hqUVVSaUxFVkJSVU1zVDBGQlR5eEZRVUZRTEVOQlVHOUNMRU5CVDFZN1FVRkRXQ3hOUVVGSlJ5eFBRVUZQVUN4TlFVRllMRVZCUTBNc1QwRkJUeXhEUVVGRExFTkJRVklzUTBGVWIwSXNRMEZUVmp0QlFVTllMRTFCUVVsUExFOUJRVTlRTEZOQlFWTXNSVUZCY0VJc1JVRkRReXhQUVVGUFR5eFBRVUZQVUN4TlFVRlFMRWRCUVdkQ0xFVkJRV2hDTEVkQlFYRkNMRVZCUVRWQ08wRkJRMFFzVFVGQlNVOHNUMEZCVDB3c1VVRkJVU3hGUVVGdVFpeEZRVU5ETEU5QlFVOUxMRTlCUVU5TUxFdEJRV1E3UVVGRFJDeE5RVUZKU3l4UFFVRlBUaXhSUVVGUkxFVkJRVzVDTEVWQlEwTXNUMEZCVDAwc1QwRkJUMDRzUzBGQlVDeEhRVUZsTEVWQlFYUkNPMEZCUTBRN08wRkJSVVFzVlVGQlUwOHNZMEZCVkN4RFFVRjVRa01zUjBGQmVrSXNSVUZCT0VJN1FVRkROMElzVFVGQlNVTXNRMEZCU2l4RlFVRlBReXhEUVVGUUxFVkJRVlZETEVOQlFWWXNSVUZCWVVNc1IwRkJZaXhGUVVGclFrTXNXVUZCYkVJc1JVRkJaME5ETEVkQlFXaERPenRCUVVWQkxFMUJRVWxPTEVsQlFVbFBMRTFCUVVvc1IwRkJZU3hEUVVGaUxFZEJRV2xDTEVOQlFYSkNMRVZCUVhkQ08wRkJRM1pDTEZOQlFVMHNTVUZCU1VNc1MwRkJTaXhEUVVGVkxHZEVRVUZXTEVOQlFVNDdRVUZEUVRzN1FVRkZSRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNUVUZCU1VNc1RVRkJUVlFzU1VGQlNVOHNUVUZCWkR0QlFVTkJSaXhwUWtGQlpTeFJRVUZSVEN4SlFVRkpWU3hOUVVGS0xFTkJRVmRFTEUxQlFVMHNRMEZCYWtJc1EwRkJVaXhIUVVFNFFpeERRVUU1UWl4SFFVRnJReXhSUVVGUlZDeEpRVUZKVlN4TlFVRktMRU5CUVZkRUxFMUJRVTBzUTBGQmFrSXNRMEZCVWl4SFFVRTRRaXhEUVVFNVFpeEhRVUZyUXl4RFFVRnVSanM3UVVGRlFUdEJRVU5CU0N4UlFVRk5MRWxCUVVseVFpeEhRVUZLTEVOQlFWRmxMRWxCUVVsUExFMUJRVW9zUjBGQllTeERRVUZpTEVkQlFXbENMRU5CUVdwQ0xFZEJRWEZDUml4WlFVRTNRaXhEUVVGT096dEJRVVZCTzBGQlEwRkdMRTFCUVVsRkxHVkJRV1VzUTBGQlppeEhRVUZ0UWt3c1NVRkJTVThzVFVGQlNpeEhRVUZoTEVOQlFXaERMRWRCUVc5RFVDeEpRVUZKVHl4TlFVRTFRenM3UVVGRlFTeE5RVUZKU1N4SlFVRkpMRU5CUVZJN08wRkJSVUVzVjBGQlUwTXNTVUZCVkN4RFFVRmxReXhEUVVGbUxFVkJRV3RDTzBGQlEycENVQ3hQUVVGSlN5eEhRVUZLTEVsQlFWZEZMRU5CUVZnN1FVRkRRVHM3UVVGRlJDeFBRVUZMV2l4SlFVRkpMRU5CUVVvc1JVRkJUME1zU1VGQlNTeERRVUZvUWl4RlFVRnRRa1FzU1VGQlNVVXNRMEZCZGtJc1JVRkJNRUpHTEV0QlFVc3NRMEZCVEN4RlFVRlJReXhMUVVGTExFTkJRWFpETEVWQlFUQkRPMEZCUTNwRFJTeFRRVUZQVWl4UFFVRlBTU3hKUVVGSlZTeE5RVUZLTEVOQlFWZFVMRU5CUVZnc1EwRkJVQ3hMUVVGNVFpeEZRVUV4UWl4SFFVRnBRMHdzVDBGQlQwa3NTVUZCU1ZVc1RVRkJTaXhEUVVGWFZDeEpRVUZKTEVOQlFXWXNRMEZCVUN4TFFVRTJRaXhGUVVFNVJDeEhRVUZ4UlV3c1QwRkJUMGtzU1VGQlNWVXNUVUZCU2l4RFFVRlhWQ3hKUVVGSkxFTkJRV1lzUTBGQlVDeExRVUUyUWl4RFFVRnNSeXhIUVVGMVIwd3NUMEZCVDBrc1NVRkJTVlVzVFVGQlNpeERRVUZYVkN4SlFVRkpMRU5CUVdZc1EwRkJVQ3hEUVVFM1J6dEJRVU5CVnl4UlFVRkxMRU5CUVVOU0xFMUJRVTBzVVVGQlVDeExRVUZ2UWl4RlFVRjZRanRCUVVOQlVTeFJRVUZMTEVOQlFVTlNMRTFCUVUwc1RVRkJVQ3hMUVVGclFpeERRVUYyUWp0QlFVTkJVU3hSUVVGTFVpeE5RVUZOTEVsQlFWZzdRVUZEUVRzN1FVRkZSQ3hOUVVGSlF5eHBRa0ZCYVVJc1EwRkJja0lzUlVGQmQwSTdRVUZEZGtKRUxGTkJRVTlTTEU5QlFVOUpMRWxCUVVsVkxFMUJRVW9zUTBGQlYxUXNRMEZCV0N4RFFVRlFMRXRCUVhsQ0xFTkJRVEZDTEVkQlFXZERUQ3hQUVVGUFNTeEpRVUZKVlN4TlFVRktMRU5CUVZkVUxFbEJRVWtzUTBGQlppeERRVUZRTEV0QlFUWkNMRU5CUVc1Rk8wRkJRMEZYTEZGQlFVdFNMRTFCUVUwc1NVRkJXRHRCUVVOQkxFZEJTRVFzVFVGSFR5eEpRVUZKUXl4cFFrRkJhVUlzUTBGQmNrSXNSVUZCZDBJN1FVRkRPVUpFTEZOQlFVOVNMRTlCUVU5SkxFbEJRVWxWTEUxQlFVb3NRMEZCVjFRc1EwRkJXQ3hEUVVGUUxFdEJRWGxDTEVWQlFURkNMRWRCUVdsRFRDeFBRVUZQU1N4SlFVRkpWU3hOUVVGS0xFTkJRVmRVTEVsQlFVa3NRMEZCWml4RFFVRlFMRXRCUVRaQ0xFTkJRVGxFTEVkQlFXOUZUQ3hQUVVGUFNTeEpRVUZKVlN4TlFVRktMRU5CUVZkVUxFbEJRVWtzUTBGQlppeERRVUZRTEV0QlFUWkNMRU5CUVhaSE8wRkJRMEZYTEZGQlFVMVNMRTlCUVU4c1EwRkJVaXhIUVVGaExFbEJRV3hDTzBGQlEwRlJMRkZCUVV0U0xFMUJRVTBzU1VGQldEdEJRVU5CT3p0QlFVVkVMRk5CUVU5RkxFZEJRVkE3UVVGRFFUczdRVUZGUkN4VlFVRlRVU3hoUVVGVUxFTkJRWGRDUXl4TFFVRjRRaXhGUVVFclFqdEJRVU01UWl4TlFVRkpaQ3hEUVVGS08wRkJRVUVzVFVGRFEyVXNZVUZCWVVRc1RVRkJUVklzVFVGQlRpeEhRVUZsTEVOQlJEZENPMEZCUVVFc1RVRkRaME03UVVGREwwSlZMRmRCUVZNc1JVRkdWanRCUVVGQkxFMUJSME5ETEVsQlNFUTdRVUZCUVN4TlFVZFBXQ3hOUVVoUU96dEJRVXRCTEZkQlFWTlpMRTFCUVZRc1EwRkJhVUpETEVkQlFXcENMRVZCUVhOQ08wRkJRM0pDTEZWQlFVOXlReXhQUVVGUE1rSXNUVUZCVUN4RFFVRmpWU3hIUVVGa0xFTkJRVkE3UVVGRFFUczdRVUZGUkN4WFFVRlRReXhsUVVGVUxFTkJRVEJDUkN4SFFVRXhRaXhGUVVFclFqdEJRVU01UWl4VlFVRlBSQ3hQUVVGUFF5eFBRVUZQTEVWQlFWQXNSMEZCV1N4SlFVRnVRaXhKUVVFeVFrUXNUMEZCVDBNc1QwRkJUeXhGUVVGUUxFZEJRVmtzU1VGQmJrSXNRMEZCTTBJc1IwRkJjMFJFTEU5QlFVOURMRTlCUVU4c1EwRkJVQ3hIUVVGWExFbEJRV3hDTEVOQlFYUkVMRWRCUVdkR1JDeFBRVUZQUXl4TlFVRk5MRWxCUVdJc1EwRkJka1k3UVVGRFFUczdRVUZGUkR0QlFVTkJMRTlCUVV0dVFpeEpRVUZKTEVOQlFVb3NSVUZCVDAwc1UwRkJVMUVzVFVGQlRWSXNUVUZCVGl4SFFVRmxVeXhWUVVGd1F5eEZRVUZuUkdZc1NVRkJTVTBzVFVGQmNFUXNSVUZCTkVST0xFdEJRVXNzUTBGQmFrVXNSVUZCYjBVN1FVRkRia1ZwUWl4VlFVRlBMRU5CUVVOSUxFMUJRVTFrTEVOQlFVNHNTMEZCV1N4RlFVRmlMRXRCUVc5Q1l5eE5RVUZOWkN4SlFVRkpMRU5CUVZZc1MwRkJaMElzUTBGQmNFTXNTVUZCTUVOakxFMUJRVTFrTEVsQlFVa3NRMEZCVml4RFFVRnFSRHRCUVVOQlowSXNZVUZCVlVrc1owSkJRV2RDU0N4SlFVRm9RaXhEUVVGV08wRkJRMEU3TzBGQlJVUTdRVUZEUVN4VlFVRlJSaXhWUVVGU08wRkJRME1zVVVGQlN5eERRVUZNTzBGQlEwTkZMRmRCUVU5SUxFMUJRVTFCTEUxQlFVMVNMRTFCUVU0c1IwRkJaU3hEUVVGeVFpeERRVUZRTzBGQlEwRlZMR05CUVZWRkxFOUJRVTlFTEZGQlFWRXNRMEZCWml4RFFVRldPMEZCUTBGRUxHTkJRVlZGTEU5QlFWRkVMRkZCUVZFc1EwRkJWQ3hIUVVGakxFbEJRWEpDTEVOQlFWWTdRVUZEUVVRc1kwRkJWU3hKUVVGV08wRkJRMEU3UVVGRFJDeFJRVUZMTEVOQlFVdzdRVUZEUTBNc1YwRkJUeXhEUVVGRFNDeE5RVUZOUVN4TlFVRk5VaXhOUVVGT0xFZEJRV1VzUTBGQmNrSXNTMEZCTWtJc1EwRkJOVUlzU1VGQmEwTlJMRTFCUVUxQkxFMUJRVTFTTEUxQlFVNHNSMEZCWlN4RFFVRnlRaXhEUVVGNlF6dEJRVU5CVlN4alFVRlZSU3hQUVVGUFJDeFJRVUZSTEVWQlFXWXNRMEZCVmp0QlFVTkJSQ3hqUVVGVlJTeFBRVUZSUkN4UlFVRlJMRU5CUVZRc1IwRkJZeXhKUVVGeVFpeERRVUZXTzBGQlEwRkVMR05CUVZWRkxFOUJRVkZFTEZGQlFWRXNRMEZCVkN4SFFVRmpMRWxCUVhKQ0xFTkJRVlk3UVVGRFFVUXNZMEZCVlN4SFFVRldPMEZCUTBFN1FVRmlSanM3UVVGblFrRXNVMEZCVDBFc1RVRkJVRHRCUVVOQk96dEJRVVZFYWtNc1UwRkJVWE5ETEZkQlFWSXNSMEZCYzBKMlFpeGpRVUYwUWp0QlFVTkJaaXhUUVVGUmRVTXNZVUZCVWl4SFFVRjNRbFFzWVVGQmVFSTdRVUZEUVN4RFFYcElReXhGUVhsSVFTeFBRVUZQT1VJc1QwRkJVQ3hMUVVGdFFpeFhRVUZ1UWl4SFFVRnJReXhWUVVGTGQwTXNVVUZCVEN4SFFVRm5RaXhGUVVGc1JDeEhRVUYzUkhoRExFOUJla2g0UkN4RFFVRkVJaXdpWm1sc1pTSTZJbUkyTkM1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJblpoY2lCc2IyOXJkWEFnUFNBblFVSkRSRVZHUjBoSlNrdE1UVTVQVUZGU1UxUlZWbGRZV1ZwaFltTmtaV1puYUdscWEyeHRibTl3Y1hKemRIVjJkM2g1ZWpBeE1qTTBOVFkzT0Rrckx5YzdYRzVjYmpzb1puVnVZM1JwYjI0Z0tHVjRjRzl5ZEhNcElIdGNibHgwSjNWelpTQnpkSEpwWTNRbk8xeHVYRzRnSUhaaGNpQkJjbklnUFNBb2RIbHdaVzltSUZWcGJuUTRRWEp5WVhrZ0lUMDlJQ2QxYm1SbFptbHVaV1FuS1Z4dUlDQWdJRDhnVldsdWREaEJjbkpoZVZ4dUlDQWdJRG9nUVhKeVlYbGNibHh1WEhSMllYSWdVRXhWVXlBZ0lEMGdKeXNuTG1Ob1lYSkRiMlJsUVhRb01DbGNibHgwZG1GeUlGTk1RVk5JSUNBOUlDY3ZKeTVqYUdGeVEyOWtaVUYwS0RBcFhHNWNkSFpoY2lCT1ZVMUNSVklnUFNBbk1DY3VZMmhoY2tOdlpHVkJkQ2d3S1Z4dVhIUjJZWElnVEU5WFJWSWdJRDBnSjJFbkxtTm9ZWEpEYjJSbFFYUW9NQ2xjYmx4MGRtRnlJRlZRVUVWU0lDQTlJQ2RCSnk1amFHRnlRMjlrWlVGMEtEQXBYRzVjZEhaaGNpQlFURlZUWDFWU1RGOVRRVVpGSUQwZ0p5MG5MbU5vWVhKRGIyUmxRWFFvTUNsY2JseDBkbUZ5SUZOTVFWTklYMVZTVEY5VFFVWkZJRDBnSjE4bkxtTm9ZWEpEYjJSbFFYUW9NQ2xjYmx4dVhIUm1kVzVqZEdsdmJpQmtaV052WkdVZ0tHVnNkQ2tnZTF4dVhIUmNkSFpoY2lCamIyUmxJRDBnWld4MExtTm9ZWEpEYjJSbFFYUW9NQ2xjYmx4MFhIUnBaaUFvWTI5a1pTQTlQVDBnVUV4VlV5QjhmRnh1WEhSY2RDQWdJQ0JqYjJSbElEMDlQU0JRVEZWVFgxVlNURjlUUVVaRktWeHVYSFJjZEZ4MGNtVjBkWEp1SURZeUlDOHZJQ2NySjF4dVhIUmNkR2xtSUNoamIyUmxJRDA5UFNCVFRFRlRTQ0I4ZkZ4dVhIUmNkQ0FnSUNCamIyUmxJRDA5UFNCVFRFRlRTRjlWVWt4ZlUwRkdSU2xjYmx4MFhIUmNkSEpsZEhWeWJpQTJNeUF2THlBbkx5ZGNibHgwWEhScFppQW9ZMjlrWlNBOElFNVZUVUpGVWlsY2JseDBYSFJjZEhKbGRIVnliaUF0TVNBdkwyNXZJRzFoZEdOb1hHNWNkRngwYVdZZ0tHTnZaR1VnUENCT1ZVMUNSVklnS3lBeE1DbGNibHgwWEhSY2RISmxkSFZ5YmlCamIyUmxJQzBnVGxWTlFrVlNJQ3NnTWpZZ0t5QXlObHh1WEhSY2RHbG1JQ2hqYjJSbElEd2dWVkJRUlZJZ0t5QXlOaWxjYmx4MFhIUmNkSEpsZEhWeWJpQmpiMlJsSUMwZ1ZWQlFSVkpjYmx4MFhIUnBaaUFvWTI5a1pTQThJRXhQVjBWU0lDc2dNallwWEc1Y2RGeDBYSFJ5WlhSMWNtNGdZMjlrWlNBdElFeFBWMFZTSUNzZ01qWmNibHgwZlZ4dVhHNWNkR1oxYm1OMGFXOXVJR0kyTkZSdlFubDBaVUZ5Y21GNUlDaGlOalFwSUh0Y2JseDBYSFIyWVhJZ2FTd2dhaXdnYkN3Z2RHMXdMQ0J3YkdGalpVaHZiR1JsY25Nc0lHRnljbHh1WEc1Y2RGeDBhV1lnS0dJMk5DNXNaVzVuZEdnZ0pTQTBJRDRnTUNrZ2UxeHVYSFJjZEZ4MGRHaHliM2NnYm1WM0lFVnljbTl5S0NkSmJuWmhiR2xrSUhOMGNtbHVaeTRnVEdWdVozUm9JRzExYzNRZ1ltVWdZU0J0ZFd4MGFYQnNaU0J2WmlBMEp5bGNibHgwWEhSOVhHNWNibHgwWEhRdkx5QjBhR1VnYm5WdFltVnlJRzltSUdWeGRXRnNJSE5wWjI1eklDaHdiR0ZqWlNCb2IyeGtaWEp6S1Z4dVhIUmNkQzh2SUdsbUlIUm9aWEpsSUdGeVpTQjBkMjhnY0d4aFkyVm9iMnhrWlhKekxDQjBhR0Z1SUhSb1pTQjBkMjhnWTJoaGNtRmpkR1Z5Y3lCaVpXWnZjbVVnYVhSY2JseDBYSFF2THlCeVpYQnlaWE5sYm5RZ2IyNWxJR0o1ZEdWY2JseDBYSFF2THlCcFppQjBhR1Z5WlNCcGN5QnZibXg1SUc5dVpTd2dkR2hsYmlCMGFHVWdkR2h5WldVZ1kyaGhjbUZqZEdWeWN5QmlaV1p2Y21VZ2FYUWdjbVZ3Y21WelpXNTBJRElnWW5sMFpYTmNibHgwWEhRdkx5QjBhR2x6SUdseklHcDFjM1FnWVNCamFHVmhjQ0JvWVdOcklIUnZJRzV2ZENCa2J5QnBibVJsZUU5bUlIUjNhV05sWEc1Y2RGeDBkbUZ5SUd4bGJpQTlJR0kyTkM1c1pXNW5kR2hjYmx4MFhIUndiR0ZqWlVodmJHUmxjbk1nUFNBblBTY2dQVDA5SUdJMk5DNWphR0Z5UVhRb2JHVnVJQzBnTWlrZ1B5QXlJRG9nSnowbklEMDlQU0JpTmpRdVkyaGhja0YwS0d4bGJpQXRJREVwSUQ4Z01TQTZJREJjYmx4dVhIUmNkQzh2SUdKaGMyVTJOQ0JwY3lBMEx6TWdLeUIxY0NCMGJ5QjBkMjhnWTJoaGNtRmpkR1Z5Y3lCdlppQjBhR1VnYjNKcFoybHVZV3dnWkdGMFlWeHVYSFJjZEdGeWNpQTlJRzVsZHlCQmNuSW9ZalkwTG14bGJtZDBhQ0FxSURNZ0x5QTBJQzBnY0d4aFkyVkliMnhrWlhKektWeHVYRzVjZEZ4MEx5OGdhV1lnZEdobGNtVWdZWEpsSUhCc1lXTmxhRzlzWkdWeWN5d2diMjVzZVNCblpYUWdkWEFnZEc4Z2RHaGxJR3hoYzNRZ1kyOXRjR3hsZEdVZ05DQmphR0Z5YzF4dVhIUmNkR3dnUFNCd2JHRmpaVWh2YkdSbGNuTWdQaUF3SUQ4Z1lqWTBMbXhsYm1kMGFDQXRJRFFnT2lCaU5qUXViR1Z1WjNSb1hHNWNibHgwWEhSMllYSWdUQ0E5SURCY2JseHVYSFJjZEdaMWJtTjBhVzl1SUhCMWMyZ2dLSFlwSUh0Y2JseDBYSFJjZEdGeWNsdE1LeXRkSUQwZ2RseHVYSFJjZEgxY2JseHVYSFJjZEdadmNpQW9hU0E5SURBc0lHb2dQU0F3T3lCcElEd2diRHNnYVNBclBTQTBMQ0JxSUNzOUlETXBJSHRjYmx4MFhIUmNkSFJ0Y0NBOUlDaGtaV052WkdVb1lqWTBMbU5vWVhKQmRDaHBLU2tnUER3Z01UZ3BJSHdnS0dSbFkyOWtaU2hpTmpRdVkyaGhja0YwS0drZ0t5QXhLU2tnUER3Z01USXBJSHdnS0dSbFkyOWtaU2hpTmpRdVkyaGhja0YwS0drZ0t5QXlLU2tnUER3Z05pa2dmQ0JrWldOdlpHVW9ZalkwTG1Ob1lYSkJkQ2hwSUNzZ015a3BYRzVjZEZ4MFhIUndkWE5vS0NoMGJYQWdKaUF3ZUVaR01EQXdNQ2tnUGo0Z01UWXBYRzVjZEZ4MFhIUndkWE5vS0NoMGJYQWdKaUF3ZUVaR01EQXBJRDQrSURncFhHNWNkRngwWEhSd2RYTm9LSFJ0Y0NBbUlEQjRSa1lwWEc1Y2RGeDBmVnh1WEc1Y2RGeDBhV1lnS0hCc1lXTmxTRzlzWkdWeWN5QTlQVDBnTWlrZ2UxeHVYSFJjZEZ4MGRHMXdJRDBnS0dSbFkyOWtaU2hpTmpRdVkyaGhja0YwS0drcEtTQThQQ0F5S1NCOElDaGtaV052WkdVb1lqWTBMbU5vWVhKQmRDaHBJQ3NnTVNrcElENCtJRFFwWEc1Y2RGeDBYSFJ3ZFhOb0tIUnRjQ0FtSURCNFJrWXBYRzVjZEZ4MGZTQmxiSE5sSUdsbUlDaHdiR0ZqWlVodmJHUmxjbk1nUFQwOUlERXBJSHRjYmx4MFhIUmNkSFJ0Y0NBOUlDaGtaV052WkdVb1lqWTBMbU5vWVhKQmRDaHBLU2tnUER3Z01UQXBJSHdnS0dSbFkyOWtaU2hpTmpRdVkyaGhja0YwS0drZ0t5QXhLU2tnUER3Z05Da2dmQ0FvWkdWamIyUmxLR0kyTkM1amFHRnlRWFFvYVNBcklESXBLU0ErUGlBeUtWeHVYSFJjZEZ4MGNIVnphQ2dvZEcxd0lENCtJRGdwSUNZZ01IaEdSaWxjYmx4MFhIUmNkSEIxYzJnb2RHMXdJQ1lnTUhoR1JpbGNibHgwWEhSOVhHNWNibHgwWEhSeVpYUjFjbTRnWVhKeVhHNWNkSDFjYmx4dVhIUm1kVzVqZEdsdmJpQjFhVzUwT0ZSdlFtRnpaVFkwSUNoMWFXNTBPQ2tnZTF4dVhIUmNkSFpoY2lCcExGeHVYSFJjZEZ4MFpYaDBjbUZDZVhSbGN5QTlJSFZwYm5RNExteGxibWQwYUNBbElETXNJQzh2SUdsbUlIZGxJR2hoZG1VZ01TQmllWFJsSUd4bFpuUXNJSEJoWkNBeUlHSjVkR1Z6WEc1Y2RGeDBYSFJ2ZFhSd2RYUWdQU0JjSWx3aUxGeHVYSFJjZEZ4MGRHVnRjQ3dnYkdWdVozUm9YRzVjYmx4MFhIUm1kVzVqZEdsdmJpQmxibU52WkdVZ0tHNTFiU2tnZTF4dVhIUmNkRngwY21WMGRYSnVJR3h2YjJ0MWNDNWphR0Z5UVhRb2JuVnRLVnh1WEhSY2RIMWNibHh1WEhSY2RHWjFibU4wYVc5dUlIUnlhWEJzWlhSVWIwSmhjMlUyTkNBb2JuVnRLU0I3WEc1Y2RGeDBYSFJ5WlhSMWNtNGdaVzVqYjJSbEtHNTFiU0ErUGlBeE9DQW1JREI0TTBZcElDc2daVzVqYjJSbEtHNTFiU0ErUGlBeE1pQW1JREI0TTBZcElDc2daVzVqYjJSbEtHNTFiU0ErUGlBMklDWWdNSGd6UmlrZ0t5QmxibU52WkdVb2JuVnRJQ1lnTUhnelJpbGNibHgwWEhSOVhHNWNibHgwWEhRdkx5Qm5ieUIwYUhKdmRXZG9JSFJvWlNCaGNuSmhlU0JsZG1WeWVTQjBhSEpsWlNCaWVYUmxjeXdnZDJVbmJHd2daR1ZoYkNCM2FYUm9JSFJ5WVdsc2FXNW5JSE4wZFdabUlHeGhkR1Z5WEc1Y2RGeDBabTl5SUNocElEMGdNQ3dnYkdWdVozUm9JRDBnZFdsdWREZ3ViR1Z1WjNSb0lDMGdaWGgwY21GQ2VYUmxjenNnYVNBOElHeGxibWQwYURzZ2FTQXJQU0F6S1NCN1hHNWNkRngwWEhSMFpXMXdJRDBnS0hWcGJuUTRXMmxkSUR3OElERTJLU0FySUNoMWFXNTBPRnRwSUNzZ01WMGdQRHdnT0NrZ0t5QW9kV2x1ZERoYmFTQXJJREpkS1Z4dVhIUmNkRngwYjNWMGNIVjBJQ3M5SUhSeWFYQnNaWFJVYjBKaGMyVTJOQ2gwWlcxd0tWeHVYSFJjZEgxY2JseHVYSFJjZEM4dklIQmhaQ0IwYUdVZ1pXNWtJSGRwZEdnZ2VtVnliM01zSUdKMWRDQnRZV3RsSUhOMWNtVWdkRzhnYm05MElHWnZjbWRsZENCMGFHVWdaWGgwY21FZ1lubDBaWE5jYmx4MFhIUnpkMmwwWTJnZ0tHVjRkSEpoUW5sMFpYTXBJSHRjYmx4MFhIUmNkR05oYzJVZ01UcGNibHgwWEhSY2RGeDBkR1Z0Y0NBOUlIVnBiblE0VzNWcGJuUTRMbXhsYm1kMGFDQXRJREZkWEc1Y2RGeDBYSFJjZEc5MWRIQjFkQ0FyUFNCbGJtTnZaR1VvZEdWdGNDQStQaUF5S1Z4dVhIUmNkRngwWEhSdmRYUndkWFFnS3owZ1pXNWpiMlJsS0NoMFpXMXdJRHc4SURRcElDWWdNSGd6UmlsY2JseDBYSFJjZEZ4MGIzVjBjSFYwSUNzOUlDYzlQU2RjYmx4MFhIUmNkRngwWW5KbFlXdGNibHgwWEhSY2RHTmhjMlVnTWpwY2JseDBYSFJjZEZ4MGRHVnRjQ0E5SUNoMWFXNTBPRnQxYVc1ME9DNXNaVzVuZEdnZ0xTQXlYU0E4UENBNEtTQXJJQ2gxYVc1ME9GdDFhVzUwT0M1c1pXNW5kR2dnTFNBeFhTbGNibHgwWEhSY2RGeDBiM1YwY0hWMElDczlJR1Z1WTI5a1pTaDBaVzF3SUQ0K0lERXdLVnh1WEhSY2RGeDBYSFJ2ZFhSd2RYUWdLejBnWlc1amIyUmxLQ2gwWlcxd0lENCtJRFFwSUNZZ01IZ3pSaWxjYmx4MFhIUmNkRngwYjNWMGNIVjBJQ3M5SUdWdVkyOWtaU2dvZEdWdGNDQThQQ0F5S1NBbUlEQjRNMFlwWEc1Y2RGeDBYSFJjZEc5MWRIQjFkQ0FyUFNBblBTZGNibHgwWEhSY2RGeDBZbkpsWVd0Y2JseDBYSFI5WEc1Y2JseDBYSFJ5WlhSMWNtNGdiM1YwY0hWMFhHNWNkSDFjYmx4dVhIUmxlSEJ2Y25SekxuUnZRbmwwWlVGeWNtRjVJRDBnWWpZMFZHOUNlWFJsUVhKeVlYbGNibHgwWlhod2IzSjBjeTVtY205dFFubDBaVUZ5Y21GNUlEMGdkV2x1ZERoVWIwSmhjMlUyTkZ4dWZTaDBlWEJsYjJZZ1pYaHdiM0owY3lBOVBUMGdKM1Z1WkdWbWFXNWxaQ2NnUHlBb2RHaHBjeTVpWVhObE5qUnFjeUE5SUh0OUtTQTZJR1Y0Y0c5eWRITXBLVnh1SWwxOVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcYmFzZTY0LWpzXFxcXGxpYlxcXFxiNjQuanNcIixcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcYmFzZTY0LWpzXFxcXGxpYlwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG4vKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbnZhciBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKTtcbnZhciBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpO1xuXG5leHBvcnRzLkJ1ZmZlciA9IEJ1ZmZlcjtcbmV4cG9ydHMuU2xvd0J1ZmZlciA9IEJ1ZmZlcjtcbmV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMgPSA1MDtcbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTI7XG5cbi8qKlxuICogSWYgYEJ1ZmZlci5fdXNlVHlwZWRBcnJheXNgOlxuICogICA9PT0gdHJ1ZSAgICBVc2UgVWludDhBcnJheSBpbXBsZW1lbnRhdGlvbiAoZmFzdGVzdClcbiAqICAgPT09IGZhbHNlICAgVXNlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiAoY29tcGF0aWJsZSBkb3duIHRvIElFNilcbiAqL1xuQnVmZmVyLl91c2VUeXBlZEFycmF5cyA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gRGV0ZWN0IGlmIGJyb3dzZXIgc3VwcG9ydHMgVHlwZWQgQXJyYXlzLiBTdXBwb3J0ZWQgYnJvd3NlcnMgYXJlIElFIDEwKywgRmlyZWZveCA0KyxcbiAgLy8gQ2hyb21lIDcrLCBTYWZhcmkgNS4xKywgT3BlcmEgMTEuNissIGlPUyA0LjIrLiBJZiB0aGUgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGFkZGluZ1xuICAvLyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YCBpbnN0YW5jZXMsIHRoZW4gdGhhdCdzIHRoZSBzYW1lIGFzIG5vIGBVaW50OEFycmF5YCBzdXBwb3J0XG4gIC8vIGJlY2F1c2Ugd2UgbmVlZCB0byBiZSBhYmxlIHRvIGFkZCBhbGwgdGhlIG5vZGUgQnVmZmVyIEFQSSBtZXRob2RzLiBUaGlzIGlzIGFuIGlzc3VlXG4gIC8vIGluIEZpcmVmb3ggNC0yOS4gTm93IGZpeGVkOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02OTU0MzhcbiAgdHJ5IHtcbiAgICB2YXIgYnVmID0gbmV3IEFycmF5QnVmZmVyKDApO1xuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheShidWYpO1xuICAgIGFyci5mb28gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gNDI7XG4gICAgfTtcbiAgICByZXR1cm4gNDIgPT09IGFyci5mb28oKSAmJiB0eXBlb2YgYXJyLnN1YmFycmF5ID09PSAnZnVuY3Rpb24nOyAvLyBDaHJvbWUgOS0xMCBsYWNrIGBzdWJhcnJheWBcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufSgpO1xuXG4vKipcbiAqIENsYXNzOiBCdWZmZXJcbiAqID09PT09PT09PT09PT1cbiAqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGFyZSBhdWdtZW50ZWRcbiAqIHdpdGggZnVuY3Rpb24gcHJvcGVydGllcyBmb3IgYWxsIHRoZSBub2RlIGBCdWZmZXJgIEFQSSBmdW5jdGlvbnMuIFdlIHVzZVxuICogYFVpbnQ4QXJyYXlgIHNvIHRoYXQgc3F1YXJlIGJyYWNrZXQgbm90YXRpb24gd29ya3MgYXMgZXhwZWN0ZWQgLS0gaXQgcmV0dXJuc1xuICogYSBzaW5nbGUgb2N0ZXQuXG4gKlxuICogQnkgYXVnbWVudGluZyB0aGUgaW5zdGFuY2VzLCB3ZSBjYW4gYXZvaWQgbW9kaWZ5aW5nIHRoZSBgVWludDhBcnJheWBcbiAqIHByb3RvdHlwZS5cbiAqL1xuZnVuY3Rpb24gQnVmZmVyKHN1YmplY3QsIGVuY29kaW5nLCBub1plcm8pIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEJ1ZmZlcikpIHJldHVybiBuZXcgQnVmZmVyKHN1YmplY3QsIGVuY29kaW5nLCBub1plcm8pO1xuXG4gIHZhciB0eXBlID0gdHlwZW9mIHN1YmplY3QgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHN1YmplY3QpO1xuXG4gIC8vIFdvcmthcm91bmQ6IG5vZGUncyBiYXNlNjQgaW1wbGVtZW50YXRpb24gYWxsb3dzIGZvciBub24tcGFkZGVkIHN0cmluZ3NcbiAgLy8gd2hpbGUgYmFzZTY0LWpzIGRvZXMgbm90LlxuICBpZiAoZW5jb2RpbmcgPT09ICdiYXNlNjQnICYmIHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgc3ViamVjdCA9IHN0cmluZ3RyaW0oc3ViamVjdCk7XG4gICAgd2hpbGUgKHN1YmplY3QubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgICAgc3ViamVjdCA9IHN1YmplY3QgKyAnPSc7XG4gICAgfVxuICB9XG5cbiAgLy8gRmluZCB0aGUgbGVuZ3RoXG4gIHZhciBsZW5ndGg7XG4gIGlmICh0eXBlID09PSAnbnVtYmVyJykgbGVuZ3RoID0gY29lcmNlKHN1YmplY3QpO2Vsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSBsZW5ndGggPSBCdWZmZXIuYnl0ZUxlbmd0aChzdWJqZWN0LCBlbmNvZGluZyk7ZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpIGxlbmd0aCA9IGNvZXJjZShzdWJqZWN0Lmxlbmd0aCk7IC8vIGFzc3VtZSB0aGF0IG9iamVjdCBpcyBhcnJheS1saWtlXG4gIGVsc2UgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCBuZWVkcyB0byBiZSBhIG51bWJlciwgYXJyYXkgb3Igc3RyaW5nLicpO1xuXG4gIHZhciBidWY7XG4gIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgLy8gUHJlZmVycmVkOiBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIGJ1ZiA9IEJ1ZmZlci5fYXVnbWVudChuZXcgVWludDhBcnJheShsZW5ndGgpKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIFRISVMgaW5zdGFuY2Ugb2YgQnVmZmVyIChjcmVhdGVkIGJ5IGBuZXdgKVxuICAgIGJ1ZiA9IHRoaXM7XG4gICAgYnVmLmxlbmd0aCA9IGxlbmd0aDtcbiAgICBidWYuX2lzQnVmZmVyID0gdHJ1ZTtcbiAgfVxuXG4gIHZhciBpO1xuICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cyAmJiB0eXBlb2Ygc3ViamVjdC5ieXRlTGVuZ3RoID09PSAnbnVtYmVyJykge1xuICAgIC8vIFNwZWVkIG9wdGltaXphdGlvbiAtLSB1c2Ugc2V0IGlmIHdlJ3JlIGNvcHlpbmcgZnJvbSBhIHR5cGVkIGFycmF5XG4gICAgYnVmLl9zZXQoc3ViamVjdCk7XG4gIH0gZWxzZSBpZiAoaXNBcnJheWlzaChzdWJqZWN0KSkge1xuICAgIC8vIFRyZWF0IGFycmF5LWlzaCBvYmplY3RzIGFzIGEgYnl0ZSBhcnJheVxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdWJqZWN0KSkgYnVmW2ldID0gc3ViamVjdC5yZWFkVUludDgoaSk7ZWxzZSBidWZbaV0gPSBzdWJqZWN0W2ldO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgIGJ1Zi53cml0ZShzdWJqZWN0LCAwLCBlbmNvZGluZyk7XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicgJiYgIUJ1ZmZlci5fdXNlVHlwZWRBcnJheXMgJiYgIW5vWmVybykge1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgYnVmW2ldID0gMDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmO1xufVxuXG4vLyBTVEFUSUMgTUVUSE9EU1xuLy8gPT09PT09PT09PT09PT1cblxuQnVmZmVyLmlzRW5jb2RpbmcgPSBmdW5jdGlvbiAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3Jhdyc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIChiKSB7XG4gIHJldHVybiAhIShiICE9PSBudWxsICYmIGIgIT09IHVuZGVmaW5lZCAmJiBiLl9pc0J1ZmZlcik7XG59O1xuXG5CdWZmZXIuYnl0ZUxlbmd0aCA9IGZ1bmN0aW9uIChzdHIsIGVuY29kaW5nKSB7XG4gIHZhciByZXQ7XG4gIHN0ciA9IHN0ciArICcnO1xuICBzd2l0Y2ggKGVuY29kaW5nIHx8ICd1dGY4Jykge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoIC8gMjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIHJldCA9IHV0ZjhUb0J5dGVzKHN0cikubGVuZ3RoO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAncmF3JzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGg7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgcmV0ID0gYmFzZTY0VG9CeXRlcyhzdHIpLmxlbmd0aDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoICogMjtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2RpbmcnKTtcbiAgfVxuICByZXR1cm4gcmV0O1xufTtcblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIChsaXN0LCB0b3RhbExlbmd0aCkge1xuICBhc3NlcnQoaXNBcnJheShsaXN0KSwgJ1VzYWdlOiBCdWZmZXIuY29uY2F0KGxpc3QsIFt0b3RhbExlbmd0aF0pXFxuJyArICdsaXN0IHNob3VsZCBiZSBhbiBBcnJheS4nKTtcblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcigwKTtcbiAgfSBlbHNlIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBsaXN0WzBdO1xuICB9XG5cbiAgdmFyIGk7XG4gIGlmICh0eXBlb2YgdG90YWxMZW5ndGggIT09ICdudW1iZXInKSB7XG4gICAgdG90YWxMZW5ndGggPSAwO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICB0b3RhbExlbmd0aCArPSBsaXN0W2ldLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICB2YXIgYnVmID0gbmV3IEJ1ZmZlcih0b3RhbExlbmd0aCk7XG4gIHZhciBwb3MgPSAwO1xuICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICBpdGVtLmNvcHkoYnVmLCBwb3MpO1xuICAgIHBvcyArPSBpdGVtLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gYnVmO1xufTtcblxuLy8gQlVGRkVSIElOU1RBTkNFIE1FVEhPRFNcbi8vID09PT09PT09PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIF9oZXhXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMDtcbiAgdmFyIHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXQ7XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nO1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpO1xuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZztcbiAgICB9XG4gIH1cblxuICAvLyBtdXN0IGJlIGFuIGV2ZW4gbnVtYmVyIG9mIGRpZ2l0c1xuICB2YXIgc3RyTGVuID0gc3RyaW5nLmxlbmd0aDtcbiAgYXNzZXJ0KHN0ckxlbiAlIDIgPT09IDAsICdJbnZhbGlkIGhleCBzdHJpbmcnKTtcblxuICBpZiAobGVuZ3RoID4gc3RyTGVuIC8gMikge1xuICAgIGxlbmd0aCA9IHN0ckxlbiAvIDI7XG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHZhciBieXRlID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KTtcbiAgICBhc3NlcnQoIWlzTmFOKGJ5dGUpLCAnSW52YWxpZCBoZXggc3RyaW5nJyk7XG4gICAgYnVmW29mZnNldCArIGldID0gYnl0ZTtcbiAgfVxuICBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9IGkgKiAyO1xuICByZXR1cm4gaTtcbn1cblxuZnVuY3Rpb24gX3V0ZjhXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID0gYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKTtcbiAgcmV0dXJuIGNoYXJzV3JpdHRlbjtcbn1cblxuZnVuY3Rpb24gX2FzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9IGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpO1xuICByZXR1cm4gY2hhcnNXcml0dGVuO1xufVxuXG5mdW5jdGlvbiBfYmluYXJ5V3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBfYXNjaWlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpO1xufVxuXG5mdW5jdGlvbiBfYmFzZTY0V3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9IGJsaXRCdWZmZXIoYmFzZTY0VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKTtcbiAgcmV0dXJuIGNoYXJzV3JpdHRlbjtcbn1cblxuZnVuY3Rpb24gX3V0ZjE2bGVXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID0gYmxpdEJ1ZmZlcih1dGYxNmxlVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKTtcbiAgcmV0dXJuIGNoYXJzV3JpdHRlbjtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICAvLyBTdXBwb3J0IGJvdGggKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKVxuICAvLyBhbmQgdGhlIGxlZ2FjeSAoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0LCBsZW5ndGgpXG4gIGlmIChpc0Zpbml0ZShvZmZzZXQpKSB7XG4gICAgaWYgKCFpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aDtcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gbGVnYWN5XG4gICAgdmFyIHN3YXAgPSBlbmNvZGluZztcbiAgICBlbmNvZGluZyA9IG9mZnNldDtcbiAgICBvZmZzZXQgPSBsZW5ndGg7XG4gICAgbGVuZ3RoID0gc3dhcDtcbiAgfVxuXG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDA7XG4gIHZhciByZW1haW5pbmcgPSB0aGlzLmxlbmd0aCAtIG9mZnNldDtcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmc7XG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aCk7XG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nO1xuICAgIH1cbiAgfVxuICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZyB8fCAndXRmOCcpLnRvTG93ZXJDYXNlKCk7XG5cbiAgdmFyIHJldDtcbiAgc3dpdGNoIChlbmNvZGluZykge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgICByZXQgPSBfaGV4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSBfdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYXNjaWknOlxuICAgICAgcmV0ID0gX2FzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdiaW5hcnknOlxuICAgICAgcmV0ID0gX2JpbmFyeVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IF9iYXNlNjRXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXQgPSBfdXRmMTZsZVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZycpO1xuICB9XG4gIHJldHVybiByZXQ7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZyB8fCAndXRmOCcpLnRvTG93ZXJDYXNlKCk7XG4gIHN0YXJ0ID0gTnVtYmVyKHN0YXJ0KSB8fCAwO1xuICBlbmQgPSBlbmQgIT09IHVuZGVmaW5lZCA/IE51bWJlcihlbmQpIDogZW5kID0gc2VsZi5sZW5ndGg7XG5cbiAgLy8gRmFzdHBhdGggZW1wdHkgc3RyaW5nc1xuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuICcnO1xuXG4gIHZhciByZXQ7XG4gIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gX2hleFNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgICAgcmV0ID0gX3V0ZjhTbGljZShzZWxmLCBzdGFydCwgZW5kKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIHJldCA9IF9hc2NpaVNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgIHJldCA9IF9iaW5hcnlTbGljZShzZWxmLCBzdGFydCwgZW5kKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICByZXQgPSBfYmFzZTY0U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gX3V0ZjE2bGVTbGljZShzZWxmLCBzdGFydCwgZW5kKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2RpbmcnKTtcbiAgfVxuICByZXR1cm4gcmV0O1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0J1ZmZlcicsXG4gICAgZGF0YTogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyIHx8IHRoaXMsIDApXG4gIH07XG59O1xuXG4vLyBjb3B5KHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQ9MCwgc291cmNlU3RhcnQ9MCwgc291cmNlRW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiAodGFyZ2V0LCB0YXJnZXRfc3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHNvdXJjZSA9IHRoaXM7XG5cbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwO1xuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoO1xuICBpZiAoIXRhcmdldF9zdGFydCkgdGFyZ2V0X3N0YXJ0ID0gMDtcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybjtcbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgc291cmNlLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgYXNzZXJ0KGVuZCA+PSBzdGFydCwgJ3NvdXJjZUVuZCA8IHNvdXJjZVN0YXJ0Jyk7XG4gIGFzc2VydCh0YXJnZXRfc3RhcnQgPj0gMCAmJiB0YXJnZXRfc3RhcnQgPCB0YXJnZXQubGVuZ3RoLCAndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpO1xuICBhc3NlcnQoc3RhcnQgPj0gMCAmJiBzdGFydCA8IHNvdXJjZS5sZW5ndGgsICdzb3VyY2VTdGFydCBvdXQgb2YgYm91bmRzJyk7XG4gIGFzc2VydChlbmQgPj0gMCAmJiBlbmQgPD0gc291cmNlLmxlbmd0aCwgJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJyk7XG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKSBlbmQgPSB0aGlzLmxlbmd0aDtcbiAgaWYgKHRhcmdldC5sZW5ndGggLSB0YXJnZXRfc3RhcnQgPCBlbmQgLSBzdGFydCkgZW5kID0gdGFyZ2V0Lmxlbmd0aCAtIHRhcmdldF9zdGFydCArIHN0YXJ0O1xuXG4gIHZhciBsZW4gPSBlbmQgLSBzdGFydDtcblxuICBpZiAobGVuIDwgMTAwIHx8ICFCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRfc3RhcnRdID0gdGhpc1tpICsgc3RhcnRdO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQuX3NldCh0aGlzLnN1YmFycmF5KHN0YXJ0LCBzdGFydCArIGxlbiksIHRhcmdldF9zdGFydCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIF9iYXNlNjRTbGljZShidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF91dGY4U2xpY2UoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXMgPSAnJztcbiAgdmFyIHRtcCA9ICcnO1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpO1xuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgaWYgKGJ1ZltpXSA8PSAweDdGKSB7XG4gICAgICByZXMgKz0gZGVjb2RlVXRmOENoYXIodG1wKSArIFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKTtcbiAgICAgIHRtcCA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0bXAgKz0gJyUnICsgYnVmW2ldLnRvU3RyaW5nKDE2KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzICsgZGVjb2RlVXRmOENoYXIodG1wKTtcbn1cblxuZnVuY3Rpb24gX2FzY2lpU2xpY2UoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJztcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKTtcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSk7XG4gIH1yZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBfYmluYXJ5U2xpY2UoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHJldHVybiBfYXNjaWlTbGljZShidWYsIHN0YXJ0LCBlbmQpO1xufVxuXG5mdW5jdGlvbiBfaGV4U2xpY2UoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuXG4gIGlmICghc3RhcnQgfHwgc3RhcnQgPCAwKSBzdGFydCA9IDA7XG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW47XG5cbiAgdmFyIG91dCA9ICcnO1xuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIG91dCArPSB0b0hleChidWZbaV0pO1xuICB9XG4gIHJldHVybiBvdXQ7XG59XG5cbmZ1bmN0aW9uIF91dGYxNmxlU2xpY2UoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGJ1Zi5zbGljZShzdGFydCwgZW5kKTtcbiAgdmFyIHJlcyA9ICcnO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyBieXRlc1tpICsgMV0gKiAyNTYpO1xuICB9XG4gIHJldHVybiByZXM7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGg7XG4gIHN0YXJ0ID0gY2xhbXAoc3RhcnQsIGxlbiwgMCk7XG4gIGVuZCA9IGNsYW1wKGVuZCwgbGVuLCBsZW4pO1xuXG4gIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5fYXVnbWVudCh0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2xpY2VMZW4gPSBlbmQgLSBzdGFydDtcbiAgICB2YXIgbmV3QnVmID0gbmV3IEJ1ZmZlcihzbGljZUxlbiwgdW5kZWZpbmVkLCB0cnVlKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWNlTGVuOyBpKyspIHtcbiAgICAgIG5ld0J1ZltpXSA9IHRoaXNbaSArIHN0YXJ0XTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld0J1ZjtcbiAgfVxufTtcblxuLy8gYGdldGAgd2lsbCBiZSByZW1vdmVkIGluIE5vZGUgMC4xMytcbkJ1ZmZlci5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKG9mZnNldCkge1xuICBjb25zb2xlLmxvZygnLmdldCgpIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB1c2luZyBhcnJheSBpbmRleGVzIGluc3RlYWQuJyk7XG4gIHJldHVybiB0aGlzLnJlYWRVSW50OChvZmZzZXQpO1xufTtcblxuLy8gYHNldGAgd2lsbCBiZSByZW1vdmVkIGluIE5vZGUgMC4xMytcbkJ1ZmZlci5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKHYsIG9mZnNldCkge1xuICBjb25zb2xlLmxvZygnLnNldCgpIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB1c2luZyBhcnJheSBpbmRleGVzIGluc3RlYWQuJyk7XG4gIHJldHVybiB0aGlzLndyaXRlVUludDgodiwgb2Zmc2V0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XTtcbn07XG5cbmZ1bmN0aW9uIF9yZWFkVUludDE2KGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICB2YXIgdmFsO1xuICBpZiAobGl0dGxlRW5kaWFuKSB7XG4gICAgdmFsID0gYnVmW29mZnNldF07XG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pIHZhbCB8PSBidWZbb2Zmc2V0ICsgMV0gPDwgODtcbiAgfSBlbHNlIHtcbiAgICB2YWwgPSBidWZbb2Zmc2V0XSA8PCA4O1xuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKSB2YWwgfD0gYnVmW29mZnNldCArIDFdO1xuICB9XG4gIHJldHVybiB2YWw7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDE2KHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MTYodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuZnVuY3Rpb24gX3JlYWRVSW50MzIoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuICBpZiAob2Zmc2V0ID49IGxlbikgcmV0dXJuO1xuXG4gIHZhciB2YWw7XG4gIGlmIChsaXR0bGVFbmRpYW4pIHtcbiAgICBpZiAob2Zmc2V0ICsgMiA8IGxlbikgdmFsID0gYnVmW29mZnNldCArIDJdIDw8IDE2O1xuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKSB2YWwgfD0gYnVmW29mZnNldCArIDFdIDw8IDg7XG4gICAgdmFsIHw9IGJ1ZltvZmZzZXRdO1xuICAgIGlmIChvZmZzZXQgKyAzIDwgbGVuKSB2YWwgPSB2YWwgKyAoYnVmW29mZnNldCArIDNdIDw8IDI0ID4+PiAwKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbikgdmFsID0gYnVmW29mZnNldCArIDFdIDw8IDE2O1xuICAgIGlmIChvZmZzZXQgKyAyIDwgbGVuKSB2YWwgfD0gYnVmW29mZnNldCArIDJdIDw8IDg7XG4gICAgaWYgKG9mZnNldCArIDMgPCBsZW4pIHZhbCB8PSBidWZbb2Zmc2V0ICsgM107XG4gICAgdmFsID0gdmFsICsgKGJ1ZltvZmZzZXRdIDw8IDI0ID4+PiAwKTtcbiAgfVxuICByZXR1cm4gdmFsO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQzMih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDMyKHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICB2YXIgbmVnID0gdGhpc1tvZmZzZXRdICYgMHg4MDtcbiAgaWYgKG5lZykgcmV0dXJuICgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMTtlbHNlIHJldHVybiB0aGlzW29mZnNldF07XG59O1xuXG5mdW5jdGlvbiBfcmVhZEludDE2KGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICB2YXIgdmFsID0gX3JlYWRVSW50MTYoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgdHJ1ZSk7XG4gIHZhciBuZWcgPSB2YWwgJiAweDgwMDA7XG4gIGlmIChuZWcpIHJldHVybiAoMHhmZmZmIC0gdmFsICsgMSkgKiAtMTtlbHNlIHJldHVybiB2YWw7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQxNih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQxNih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5mdW5jdGlvbiBfcmVhZEludDMyKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICB2YXIgdmFsID0gX3JlYWRVSW50MzIoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgdHJ1ZSk7XG4gIHZhciBuZWcgPSB2YWwgJiAweDgwMDAwMDAwO1xuICBpZiAobmVnKSByZXR1cm4gKDB4ZmZmZmZmZmYgLSB2YWwgKyAxKSAqIC0xO2Vsc2UgcmV0dXJuIHZhbDtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDMyKHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDMyKHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbmZ1bmN0aW9uIF9yZWFkRmxvYXQoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgfVxuXG4gIHJldHVybiBpZWVlNzU0LnJlYWQoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdExFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRmxvYXQodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRmxvYXQodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuZnVuY3Rpb24gX3JlYWREb3VibGUoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDcgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgfVxuXG4gIHJldHVybiBpZWVlNzU0LnJlYWQoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZERvdWJsZSh0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRG91YmxlKHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAndHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gICAgdmVyaWZ1aW50KHZhbHVlLCAweGZmKTtcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICB0aGlzW29mZnNldF0gPSB2YWx1ZTtcbn07XG5cbmZ1bmN0aW9uIF93cml0ZVVJbnQxNihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpO1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAndHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gICAgdmVyaWZ1aW50KHZhbHVlLCAweGZmZmYpO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihsZW4gLSBvZmZzZXQsIDIpOyBpIDwgajsgaSsrKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlICYgMHhmZiA8PCA4ICogKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkpID4+PiAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSAqIDg7XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5mdW5jdGlvbiBfd3JpdGVVSW50MzIoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKTtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ3RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICAgIHZlcmlmdWludCh2YWx1ZSwgMHhmZmZmZmZmZik7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGxlbiAtIG9mZnNldCwgNCk7IGkgPCBqOyBpKyspIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSB2YWx1ZSA+Pj4gKGxpdHRsZUVuZGlhbiA/IGkgOiAzIC0gaSkgKiA4ICYgMHhmZjtcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgICB2ZXJpZnNpbnQodmFsdWUsIDB4N2YsIC0weDgwKTtcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICBpZiAodmFsdWUgPj0gMCkgdGhpcy53cml0ZVVJbnQ4KHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KTtlbHNlIHRoaXMud3JpdGVVSW50OCgweGZmICsgdmFsdWUgKyAxLCBvZmZzZXQsIG5vQXNzZXJ0KTtcbn07XG5cbmZ1bmN0aW9uIF93cml0ZUludDE2KGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJyk7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgICB2ZXJpZnNpbnQodmFsdWUsIDB4N2ZmZiwgLTB4ODAwMCk7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICBpZiAodmFsdWUgPj0gMCkgX3dyaXRlVUludDE2KGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCk7ZWxzZSBfd3JpdGVVSW50MTYoYnVmLCAweGZmZmYgKyB2YWx1ZSArIDEsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCk7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5mdW5jdGlvbiBfd3JpdGVJbnQzMihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpO1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gICAgdmVyaWZzaW50KHZhbHVlLCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMCk7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICBpZiAodmFsdWUgPj0gMCkgX3dyaXRlVUludDMyKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCk7ZWxzZSBfd3JpdGVVSW50MzIoYnVmLCAweGZmZmZmZmZmICsgdmFsdWUgKyAxLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuZnVuY3Rpb24gX3dyaXRlRmxvYXQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKTtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICAgIHZlcmlmSUVFRTc1NCh2YWx1ZSwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuZnVuY3Rpb24gX3dyaXRlRG91YmxlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJyk7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgNyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgICB2ZXJpZklFRUU3NTQodmFsdWUsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbi8vIGZpbGwodmFsdWUsIHN0YXJ0PTAsIGVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gKHZhbHVlLCBzdGFydCwgZW5kKSB7XG4gIGlmICghdmFsdWUpIHZhbHVlID0gMDtcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwO1xuICBpZiAoIWVuZCkgZW5kID0gdGhpcy5sZW5ndGg7XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWx1ZSA9IHZhbHVlLmNoYXJDb2RlQXQoMCk7XG4gIH1cblxuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJiAhaXNOYU4odmFsdWUpLCAndmFsdWUgaXMgbm90IGEgbnVtYmVyJyk7XG4gIGFzc2VydChlbmQgPj0gc3RhcnQsICdlbmQgPCBzdGFydCcpO1xuXG4gIC8vIEZpbGwgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuO1xuICBpZiAodGhpcy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICBhc3NlcnQoc3RhcnQgPj0gMCAmJiBzdGFydCA8IHRoaXMubGVuZ3RoLCAnc3RhcnQgb3V0IG9mIGJvdW5kcycpO1xuICBhc3NlcnQoZW5kID49IDAgJiYgZW5kIDw9IHRoaXMubGVuZ3RoLCAnZW5kIG91dCBvZiBib3VuZHMnKTtcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIHRoaXNbaV0gPSB2YWx1ZTtcbiAgfVxufTtcblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gKCkge1xuICB2YXIgb3V0ID0gW107XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIG91dFtpXSA9IHRvSGV4KHRoaXNbaV0pO1xuICAgIGlmIChpID09PSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTKSB7XG4gICAgICBvdXRbaSArIDFdID0gJy4uLic7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuICc8QnVmZmVyICcgKyBvdXQuam9pbignICcpICsgJz4nO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGBBcnJheUJ1ZmZlcmAgd2l0aCB0aGUgKmNvcGllZCogbWVtb3J5IG9mIHRoZSBidWZmZXIgaW5zdGFuY2UuXG4gKiBBZGRlZCBpbiBOb2RlIDAuMTIuIE9ubHkgYXZhaWxhYmxlIGluIGJyb3dzZXJzIHRoYXQgc3VwcG9ydCBBcnJheUJ1ZmZlci5cbiAqL1xuQnVmZmVyLnByb3RvdHlwZS50b0FycmF5QnVmZmVyID0gZnVuY3Rpb24gKCkge1xuICBpZiAodHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICAgIHJldHVybiBuZXcgQnVmZmVyKHRoaXMpLmJ1ZmZlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGJ1ZiA9IG5ldyBVaW50OEFycmF5KHRoaXMubGVuZ3RoKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBidWYubGVuZ3RoOyBpIDwgbGVuOyBpICs9IDEpIHtcbiAgICAgICAgYnVmW2ldID0gdGhpc1tpXTtcbiAgICAgIH1yZXR1cm4gYnVmLmJ1ZmZlcjtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdCdWZmZXIudG9BcnJheUJ1ZmZlciBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlcicpO1xuICB9XG59O1xuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIHN0cmluZ3RyaW0oc3RyKSB7XG4gIGlmIChzdHIudHJpbSkgcmV0dXJuIHN0ci50cmltKCk7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xufVxuXG52YXIgQlAgPSBCdWZmZXIucHJvdG90eXBlO1xuXG4vKipcbiAqIEF1Z21lbnQgYSBVaW50OEFycmF5ICppbnN0YW5jZSogKG5vdCB0aGUgVWludDhBcnJheSBjbGFzcyEpIHdpdGggQnVmZmVyIG1ldGhvZHNcbiAqL1xuQnVmZmVyLl9hdWdtZW50ID0gZnVuY3Rpb24gKGFycikge1xuICBhcnIuX2lzQnVmZmVyID0gdHJ1ZTtcblxuICAvLyBzYXZlIHJlZmVyZW5jZSB0byBvcmlnaW5hbCBVaW50OEFycmF5IGdldC9zZXQgbWV0aG9kcyBiZWZvcmUgb3ZlcndyaXRpbmdcbiAgYXJyLl9nZXQgPSBhcnIuZ2V0O1xuICBhcnIuX3NldCA9IGFyci5zZXQ7XG5cbiAgLy8gZGVwcmVjYXRlZCwgd2lsbCBiZSByZW1vdmVkIGluIG5vZGUgMC4xMytcbiAgYXJyLmdldCA9IEJQLmdldDtcbiAgYXJyLnNldCA9IEJQLnNldDtcblxuICBhcnIud3JpdGUgPSBCUC53cml0ZTtcbiAgYXJyLnRvU3RyaW5nID0gQlAudG9TdHJpbmc7XG4gIGFyci50b0xvY2FsZVN0cmluZyA9IEJQLnRvU3RyaW5nO1xuICBhcnIudG9KU09OID0gQlAudG9KU09OO1xuICBhcnIuY29weSA9IEJQLmNvcHk7XG4gIGFyci5zbGljZSA9IEJQLnNsaWNlO1xuICBhcnIucmVhZFVJbnQ4ID0gQlAucmVhZFVJbnQ4O1xuICBhcnIucmVhZFVJbnQxNkxFID0gQlAucmVhZFVJbnQxNkxFO1xuICBhcnIucmVhZFVJbnQxNkJFID0gQlAucmVhZFVJbnQxNkJFO1xuICBhcnIucmVhZFVJbnQzMkxFID0gQlAucmVhZFVJbnQzMkxFO1xuICBhcnIucmVhZFVJbnQzMkJFID0gQlAucmVhZFVJbnQzMkJFO1xuICBhcnIucmVhZEludDggPSBCUC5yZWFkSW50ODtcbiAgYXJyLnJlYWRJbnQxNkxFID0gQlAucmVhZEludDE2TEU7XG4gIGFyci5yZWFkSW50MTZCRSA9IEJQLnJlYWRJbnQxNkJFO1xuICBhcnIucmVhZEludDMyTEUgPSBCUC5yZWFkSW50MzJMRTtcbiAgYXJyLnJlYWRJbnQzMkJFID0gQlAucmVhZEludDMyQkU7XG4gIGFyci5yZWFkRmxvYXRMRSA9IEJQLnJlYWRGbG9hdExFO1xuICBhcnIucmVhZEZsb2F0QkUgPSBCUC5yZWFkRmxvYXRCRTtcbiAgYXJyLnJlYWREb3VibGVMRSA9IEJQLnJlYWREb3VibGVMRTtcbiAgYXJyLnJlYWREb3VibGVCRSA9IEJQLnJlYWREb3VibGVCRTtcbiAgYXJyLndyaXRlVUludDggPSBCUC53cml0ZVVJbnQ4O1xuICBhcnIud3JpdGVVSW50MTZMRSA9IEJQLndyaXRlVUludDE2TEU7XG4gIGFyci53cml0ZVVJbnQxNkJFID0gQlAud3JpdGVVSW50MTZCRTtcbiAgYXJyLndyaXRlVUludDMyTEUgPSBCUC53cml0ZVVJbnQzMkxFO1xuICBhcnIud3JpdGVVSW50MzJCRSA9IEJQLndyaXRlVUludDMyQkU7XG4gIGFyci53cml0ZUludDggPSBCUC53cml0ZUludDg7XG4gIGFyci53cml0ZUludDE2TEUgPSBCUC53cml0ZUludDE2TEU7XG4gIGFyci53cml0ZUludDE2QkUgPSBCUC53cml0ZUludDE2QkU7XG4gIGFyci53cml0ZUludDMyTEUgPSBCUC53cml0ZUludDMyTEU7XG4gIGFyci53cml0ZUludDMyQkUgPSBCUC53cml0ZUludDMyQkU7XG4gIGFyci53cml0ZUZsb2F0TEUgPSBCUC53cml0ZUZsb2F0TEU7XG4gIGFyci53cml0ZUZsb2F0QkUgPSBCUC53cml0ZUZsb2F0QkU7XG4gIGFyci53cml0ZURvdWJsZUxFID0gQlAud3JpdGVEb3VibGVMRTtcbiAgYXJyLndyaXRlRG91YmxlQkUgPSBCUC53cml0ZURvdWJsZUJFO1xuICBhcnIuZmlsbCA9IEJQLmZpbGw7XG4gIGFyci5pbnNwZWN0ID0gQlAuaW5zcGVjdDtcbiAgYXJyLnRvQXJyYXlCdWZmZXIgPSBCUC50b0FycmF5QnVmZmVyO1xuXG4gIHJldHVybiBhcnI7XG59O1xuXG4vLyBzbGljZShzdGFydCwgZW5kKVxuZnVuY3Rpb24gY2xhbXAoaW5kZXgsIGxlbiwgZGVmYXVsdFZhbHVlKSB7XG4gIGlmICh0eXBlb2YgaW5kZXggIT09ICdudW1iZXInKSByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICBpbmRleCA9IH5+aW5kZXg7IC8vIENvZXJjZSB0byBpbnRlZ2VyLlxuICBpZiAoaW5kZXggPj0gbGVuKSByZXR1cm4gbGVuO1xuICBpZiAoaW5kZXggPj0gMCkgcmV0dXJuIGluZGV4O1xuICBpbmRleCArPSBsZW47XG4gIGlmIChpbmRleCA+PSAwKSByZXR1cm4gaW5kZXg7XG4gIHJldHVybiAwO1xufVxuXG5mdW5jdGlvbiBjb2VyY2UobGVuZ3RoKSB7XG4gIC8vIENvZXJjZSBsZW5ndGggdG8gYSBudW1iZXIgKHBvc3NpYmx5IE5hTiksIHJvdW5kIHVwXG4gIC8vIGluIGNhc2UgaXQncyBmcmFjdGlvbmFsIChlLmcuIDEyMy40NTYpIHRoZW4gZG8gYVxuICAvLyBkb3VibGUgbmVnYXRlIHRvIGNvZXJjZSBhIE5hTiB0byAwLiBFYXN5LCByaWdodD9cbiAgbGVuZ3RoID0gfn5NYXRoLmNlaWwoK2xlbmd0aCk7XG4gIHJldHVybiBsZW5ndGggPCAwID8gMCA6IGxlbmd0aDtcbn1cblxuZnVuY3Rpb24gaXNBcnJheShzdWJqZWN0KSB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoc3ViamVjdCkge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ViamVjdCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH0pKHN1YmplY3QpO1xufVxuXG5mdW5jdGlvbiBpc0FycmF5aXNoKHN1YmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXkoc3ViamVjdCkgfHwgQnVmZmVyLmlzQnVmZmVyKHN1YmplY3QpIHx8IHN1YmplY3QgJiYgKHR5cGVvZiBzdWJqZWN0ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihzdWJqZWN0KSkgPT09ICdvYmplY3QnICYmIHR5cGVvZiBzdWJqZWN0Lmxlbmd0aCA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIHRvSGV4KG4pIHtcbiAgaWYgKG4gPCAxNikgcmV0dXJuICcwJyArIG4udG9TdHJpbmcoMTYpO1xuICByZXR1cm4gbi50b1N0cmluZygxNik7XG59XG5cbmZ1bmN0aW9uIHV0ZjhUb0J5dGVzKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGIgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICBpZiAoYiA8PSAweDdGKSBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSk7ZWxzZSB7XG4gICAgICB2YXIgc3RhcnQgPSBpO1xuICAgICAgaWYgKGIgPj0gMHhEODAwICYmIGIgPD0gMHhERkZGKSBpKys7XG4gICAgICB2YXIgaCA9IGVuY29kZVVSSUNvbXBvbmVudChzdHIuc2xpY2Uoc3RhcnQsIGkgKyAxKSkuc3Vic3RyKDEpLnNwbGl0KCclJyk7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGgubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgYnl0ZUFycmF5LnB1c2gocGFyc2VJbnQoaFtqXSwgMTYpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheTtcbn1cblxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gTm9kZSdzIGNvZGUgc2VlbXMgdG8gYmUgZG9pbmcgdGhpcyBhbmQgbm90ICYgMHg3Ri4uXG4gICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKTtcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5O1xufVxuXG5mdW5jdGlvbiB1dGYxNmxlVG9CeXRlcyhzdHIpIHtcbiAgdmFyIGMsIGhpLCBsbztcbiAgdmFyIGJ5dGVBcnJheSA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICBoaSA9IGMgPj4gODtcbiAgICBsbyA9IGMgJSAyNTY7XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pO1xuICAgIGJ5dGVBcnJheS5wdXNoKGhpKTtcbiAgfVxuXG4gIHJldHVybiBieXRlQXJyYXk7XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMoc3RyKSB7XG4gIHJldHVybiBiYXNlNjQudG9CeXRlQXJyYXkoc3RyKTtcbn1cblxuZnVuY3Rpb24gYmxpdEJ1ZmZlcihzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIHBvcztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmIChpICsgb2Zmc2V0ID49IGRzdC5sZW5ndGggfHwgaSA+PSBzcmMubGVuZ3RoKSBicmVhaztcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV07XG4gIH1cbiAgcmV0dXJuIGk7XG59XG5cbmZ1bmN0aW9uIGRlY29kZVV0ZjhDaGFyKHN0cikge1xuICB0cnkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoMHhGRkZEKTsgLy8gVVRGIDggaW52YWxpZCBjaGFyXG4gIH1cbn1cblxuLypcbiAqIFdlIGhhdmUgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIHZhbHVlIGlzIGEgdmFsaWQgaW50ZWdlci4gVGhpcyBtZWFucyB0aGF0IGl0XG4gKiBpcyBub24tbmVnYXRpdmUuIEl0IGhhcyBubyBmcmFjdGlvbmFsIGNvbXBvbmVudCBhbmQgdGhhdCBpdCBkb2VzIG5vdFxuICogZXhjZWVkIHRoZSBtYXhpbXVtIGFsbG93ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHZlcmlmdWludCh2YWx1ZSwgbWF4KSB7XG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLCAnY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlcicpO1xuICBhc3NlcnQodmFsdWUgPj0gMCwgJ3NwZWNpZmllZCBhIG5lZ2F0aXZlIHZhbHVlIGZvciB3cml0aW5nIGFuIHVuc2lnbmVkIHZhbHVlJyk7XG4gIGFzc2VydCh2YWx1ZSA8PSBtYXgsICd2YWx1ZSBpcyBsYXJnZXIgdGhhbiBtYXhpbXVtIHZhbHVlIGZvciB0eXBlJyk7XG4gIGFzc2VydChNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUsICd2YWx1ZSBoYXMgYSBmcmFjdGlvbmFsIGNvbXBvbmVudCcpO1xufVxuXG5mdW5jdGlvbiB2ZXJpZnNpbnQodmFsdWUsIG1heCwgbWluKSB7XG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLCAnY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlcicpO1xuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlJyk7XG4gIGFzc2VydCh2YWx1ZSA+PSBtaW4sICd2YWx1ZSBzbWFsbGVyIHRoYW4gbWluaW11bSBhbGxvd2VkIHZhbHVlJyk7XG4gIGFzc2VydChNYXRoLmZsb29yKHZhbHVlKSA9PT0gdmFsdWUsICd2YWx1ZSBoYXMgYSBmcmFjdGlvbmFsIGNvbXBvbmVudCcpO1xufVxuXG5mdW5jdGlvbiB2ZXJpZklFRUU3NTQodmFsdWUsIG1heCwgbWluKSB7XG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLCAnY2Fubm90IHdyaXRlIGEgbm9uLW51bWJlciBhcyBhIG51bWJlcicpO1xuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgbGFyZ2VyIHRoYW4gbWF4aW11bSBhbGxvd2VkIHZhbHVlJyk7XG4gIGFzc2VydCh2YWx1ZSA+PSBtaW4sICd2YWx1ZSBzbWFsbGVyIHRoYW4gbWluaW11bSBhbGxvd2VkIHZhbHVlJyk7XG59XG5cbmZ1bmN0aW9uIGFzc2VydCh0ZXN0LCBtZXNzYWdlKSB7XG4gIGlmICghdGVzdCkgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgJ0ZhaWxlZCBhc3NlcnRpb24nKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltbHVaR1Y0TG1weklsMHNJbTVoYldWeklqcGJJbUpoYzJVMk5DSXNJbkpsY1hWcGNtVWlMQ0pwWldWbE56VTBJaXdpWlhod2IzSjBjeUlzSWtKMVptWmxjaUlzSWxOc2IzZENkV1ptWlhJaUxDSkpUbE5RUlVOVVgwMUJXRjlDV1ZSRlV5SXNJbkJ2YjJ4VGFYcGxJaXdpWDNWelpWUjVjR1ZrUVhKeVlYbHpJaXdpWW5WbUlpd2lRWEp5WVhsQ2RXWm1aWElpTENKaGNuSWlMQ0pWYVc1ME9FRnljbUY1SWl3aVptOXZJaXdpYzNWaVlYSnlZWGtpTENKbElpd2ljM1ZpYW1WamRDSXNJbVZ1WTI5a2FXNW5JaXdpYm05YVpYSnZJaXdpZEhsd1pTSXNJbk4wY21sdVozUnlhVzBpTENKc1pXNW5kR2dpTENKamIyVnlZMlVpTENKaWVYUmxUR1Z1WjNSb0lpd2lSWEp5YjNJaUxDSmZZWFZuYldWdWRDSXNJbDlwYzBKMVptWmxjaUlzSW1raUxDSmZjMlYwSWl3aWFYTkJjbkpoZVdsemFDSXNJbWx6UW5WbVptVnlJaXdpY21WaFpGVkpiblE0SWl3aWQzSnBkR1VpTENKcGMwVnVZMjlrYVc1bklpd2lVM1J5YVc1bklpd2lkRzlNYjNkbGNrTmhjMlVpTENKaUlpd2lkVzVrWldacGJtVmtJaXdpYzNSeUlpd2ljbVYwSWl3aWRYUm1PRlJ2UW5sMFpYTWlMQ0ppWVhObE5qUlViMEo1ZEdWeklpd2lZMjl1WTJGMElpd2liR2x6ZENJc0luUnZkR0ZzVEdWdVozUm9JaXdpWVhOelpYSjBJaXdpYVhOQmNuSmhlU0lzSW5CdmN5SXNJbWwwWlcwaUxDSmpiM0I1SWl3aVgyaGxlRmR5YVhSbElpd2ljM1J5YVc1bklpd2liMlptYzJWMElpd2lUblZ0WW1WeUlpd2ljbVZ0WVdsdWFXNW5JaXdpYzNSeVRHVnVJaXdpWW5sMFpTSXNJbkJoY25ObFNXNTBJaXdpYzNWaWMzUnlJaXdpYVhOT1lVNGlMQ0pmWTJoaGNuTlhjbWwwZEdWdUlpd2lYM1YwWmpoWGNtbDBaU0lzSW1Ob1lYSnpWM0pwZEhSbGJpSXNJbUpzYVhSQ2RXWm1aWElpTENKZllYTmphV2xYY21sMFpTSXNJbUZ6WTJscFZHOUNlWFJsY3lJc0lsOWlhVzVoY25sWGNtbDBaU0lzSWw5aVlYTmxOalJYY21sMFpTSXNJbDkxZEdZeE5teGxWM0pwZEdVaUxDSjFkR1l4Tm14bFZHOUNlWFJsY3lJc0luQnliM1J2ZEhsd1pTSXNJbWx6Um1sdWFYUmxJaXdpYzNkaGNDSXNJblJ2VTNSeWFXNW5JaXdpYzNSaGNuUWlMQ0psYm1RaUxDSnpaV3htSWl3aVgyaGxlRk5zYVdObElpd2lYM1YwWmpoVGJHbGpaU0lzSWw5aGMyTnBhVk5zYVdObElpd2lYMkpwYm1GeWVWTnNhV05sSWl3aVgySmhjMlUyTkZOc2FXTmxJaXdpWDNWMFpqRTJiR1ZUYkdsalpTSXNJblJ2U2xOUFRpSXNJbVJoZEdFaUxDSkJjbkpoZVNJc0luTnNhV05sSWl3aVkyRnNiQ0lzSWw5aGNuSWlMQ0owWVhKblpYUWlMQ0owWVhKblpYUmZjM1JoY25RaUxDSnpiM1Z5WTJVaUxDSnNaVzRpTENKbWNtOXRRbmwwWlVGeWNtRjVJaXdpY21Weklpd2lkRzF3SWl3aVRXRjBhQ0lzSW0xcGJpSXNJbVJsWTI5a1pWVjBaamhEYUdGeUlpd2labkp2YlVOb1lYSkRiMlJsSWl3aWIzVjBJaXdpZEc5SVpYZ2lMQ0ppZVhSbGN5SXNJbU5zWVcxd0lpd2ljMnhwWTJWTVpXNGlMQ0p1WlhkQ2RXWWlMQ0puWlhRaUxDSmpiMjV6YjJ4bElpd2liRzluSWl3aWMyVjBJaXdpZGlJc0luZHlhWFJsVlVsdWREZ2lMQ0p1YjBGemMyVnlkQ0lzSWw5eVpXRmtWVWx1ZERFMklpd2liR2wwZEd4bFJXNWthV0Z1SWl3aWRtRnNJaXdpY21WaFpGVkpiblF4Tmt4Rklpd2ljbVZoWkZWSmJuUXhOa0pGSWl3aVgzSmxZV1JWU1c1ME16SWlMQ0p5WldGa1ZVbHVkRE15VEVVaUxDSnlaV0ZrVlVsdWRETXlRa1VpTENKeVpXRmtTVzUwT0NJc0ltNWxaeUlzSWw5eVpXRmtTVzUwTVRZaUxDSnlaV0ZrU1c1ME1UWk1SU0lzSW5KbFlXUkpiblF4TmtKRklpd2lYM0psWVdSSmJuUXpNaUlzSW5KbFlXUkpiblF6TWt4Rklpd2ljbVZoWkVsdWRETXlRa1VpTENKZmNtVmhaRVpzYjJGMElpd2ljbVZoWkNJc0luSmxZV1JHYkc5aGRFeEZJaXdpY21WaFpFWnNiMkYwUWtVaUxDSmZjbVZoWkVSdmRXSnNaU0lzSW5KbFlXUkViM1ZpYkdWTVJTSXNJbkpsWVdSRWIzVmliR1ZDUlNJc0luWmhiSFZsSWl3aWRtVnlhV1oxYVc1MElpd2lYM2R5YVhSbFZVbHVkREUySWl3aWFpSXNJbmR5YVhSbFZVbHVkREUyVEVVaUxDSjNjbWwwWlZWSmJuUXhOa0pGSWl3aVgzZHlhWFJsVlVsdWRETXlJaXdpZDNKcGRHVlZTVzUwTXpKTVJTSXNJbmR5YVhSbFZVbHVkRE15UWtVaUxDSjNjbWwwWlVsdWREZ2lMQ0oyWlhKcFpuTnBiblFpTENKZmQzSnBkR1ZKYm5ReE5pSXNJbmR5YVhSbFNXNTBNVFpNUlNJc0luZHlhWFJsU1c1ME1UWkNSU0lzSWw5M2NtbDBaVWx1ZERNeUlpd2lkM0pwZEdWSmJuUXpNa3hGSWl3aWQzSnBkR1ZKYm5Rek1rSkZJaXdpWDNkeWFYUmxSbXh2WVhRaUxDSjJaWEpwWmtsRlJVVTNOVFFpTENKM2NtbDBaVVpzYjJGMFRFVWlMQ0ozY21sMFpVWnNiMkYwUWtVaUxDSmZkM0pwZEdWRWIzVmliR1VpTENKM2NtbDBaVVJ2ZFdKc1pVeEZJaXdpZDNKcGRHVkViM1ZpYkdWQ1JTSXNJbVpwYkd3aUxDSmphR0Z5UTI5a1pVRjBJaXdpYVc1emNHVmpkQ0lzSW1wdmFXNGlMQ0owYjBGeWNtRjVRblZtWm1WeUlpd2lZblZtWm1WeUlpd2lkSEpwYlNJc0luSmxjR3hoWTJVaUxDSkNVQ0lzSWw5blpYUWlMQ0owYjB4dlkyRnNaVk4wY21sdVp5SXNJbWx1WkdWNElpd2laR1ZtWVhWc2RGWmhiSFZsSWl3aVkyVnBiQ0lzSWs5aWFtVmpkQ0lzSW00aUxDSmllWFJsUVhKeVlYa2lMQ0p3ZFhOb0lpd2lhQ0lzSW1WdVkyOWtaVlZTU1VOdmJYQnZibVZ1ZENJc0luTndiR2wwSWl3aVl5SXNJbWhwSWl3aWJHOGlMQ0owYjBKNWRHVkJjbkpoZVNJc0luTnlZeUlzSW1SemRDSXNJbVJsWTI5a1pWVlNTVU52YlhCdmJtVnVkQ0lzSW1WeWNpSXNJbTFoZUNJc0ltWnNiMjl5SWl3aWRHVnpkQ0lzSW0xbGMzTmhaMlVpWFN3aWJXRndjR2x1WjNNaU9pSTdPenM3UVVGQlFUczdPenM3T3p0QlFVOUJMRWxCUVVsQkxGTkJRVk5ETEZGQlFWRXNWMEZCVWl4RFFVRmlPMEZCUTBFc1NVRkJTVU1zVlVGQlZVUXNVVUZCVVN4VFFVRlNMRU5CUVdRN08wRkJSVUZGTEZGQlFWRkRMRTFCUVZJc1IwRkJhVUpCTEUxQlFXcENPMEZCUTBGRUxGRkJRVkZGTEZWQlFWSXNSMEZCY1VKRUxFMUJRWEpDTzBGQlEwRkVMRkZCUVZGSExHbENRVUZTTEVkQlFUUkNMRVZCUVRWQ08wRkJRMEZHTEU5QlFVOUhMRkZCUVZBc1IwRkJhMElzU1VGQmJFSTdPMEZCUlVFN096czdPMEZCUzBGSUxFOUJRVTlKTEdWQlFWQXNSMEZCTUVJc1dVRkJXVHRCUVVOd1F6dEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1RVRkJTVHRCUVVOR0xGRkJRVWxETEUxQlFVMHNTVUZCU1VNc1YwRkJTaXhEUVVGblFpeERRVUZvUWl4RFFVRldPMEZCUTBFc1VVRkJTVU1zVFVGQlRTeEpRVUZKUXl4VlFVRktMRU5CUVdWSUxFZEJRV1lzUTBGQlZqdEJRVU5CUlN4UlFVRkpSU3hIUVVGS0xFZEJRVlVzV1VGQldUdEJRVUZGTEdGQlFVOHNSVUZCVUR0QlFVRlhMRXRCUVc1RE8wRkJRMEVzVjBGQlR5eFBRVUZQUml4SlFVRkpSU3hIUVVGS0xFVkJRVkFzU1VGRFNDeFBRVUZQUml4SlFVRkpSeXhSUVVGWUxFdEJRWGRDTEZWQlJEVkNMRU5CU2tVc1EwRkxjVU03UVVGRGVFTXNSMEZPUkN4RFFVMUZMRTlCUVU5RExFTkJRVkFzUlVGQlZUdEJRVU5XTEZkQlFVOHNTMEZCVUR0QlFVTkVPMEZCUTBZc1EwRm1kMElzUlVGQmVrSTdPMEZCYVVKQk96czdPenM3T3pzN096czdRVUZaUVN4VFFVRlRXQ3hOUVVGVUxFTkJRV2xDV1N4UFFVRnFRaXhGUVVFd1FrTXNVVUZCTVVJc1JVRkJiME5ETEUxQlFYQkRMRVZCUVRSRE8wRkJRekZETEUxQlFVa3NSVUZCUlN4blFrRkJaMEprTEUxQlFXeENMRU5CUVVvc1JVRkRSU3hQUVVGUExFbEJRVWxCTEUxQlFVb3NRMEZCVjFrc1QwRkJXQ3hGUVVGdlFrTXNVVUZCY0VJc1JVRkJPRUpETEUxQlFUbENMRU5CUVZBN08wRkJSVVlzVFVGQlNVTXNZMEZCWTBnc1QwRkJaQ3g1UTBGQlkwRXNUMEZCWkN4RFFVRktPenRCUVVWQk8wRkJRMEU3UVVGRFFTeE5RVUZKUXl4aFFVRmhMRkZCUVdJc1NVRkJlVUpGTEZOQlFWTXNVVUZCZEVNc1JVRkJaMFE3UVVGRE9VTklMR05CUVZWSkxGZEJRVmRLTEU5QlFWZ3NRMEZCVmp0QlFVTkJMRmRCUVU5QkxGRkJRVkZMTEUxQlFWSXNSMEZCYVVJc1EwRkJha0lzUzBGQmRVSXNRMEZCT1VJc1JVRkJhVU03UVVGREwwSk1MR2RDUVVGVlFTeFZRVUZWTEVkQlFYQkNPMEZCUTBRN1FVRkRSanM3UVVGRlJEdEJRVU5CTEUxQlFVbExMRTFCUVVvN1FVRkRRU3hOUVVGSlJpeFRRVUZUTEZGQlFXSXNSVUZEUlVVc1UwRkJVME1zVDBGQlQwNHNUMEZCVUN4RFFVRlVMRU5CUkVZc1MwRkZTeXhKUVVGSlJ5eFRRVUZUTEZGQlFXSXNSVUZEU0VVc1UwRkJVMnBDTEU5QlFVOXRRaXhWUVVGUUxFTkJRV3RDVUN4UFFVRnNRaXhGUVVFeVFrTXNVVUZCTTBJc1EwRkJWQ3hEUVVSSExFdEJSVUVzU1VGQlNVVXNVMEZCVXl4UlFVRmlMRVZCUTBoRkxGTkJRVk5ETEU5QlFVOU9MRkZCUVZGTExFMUJRV1lzUTBGQlZDeERRVVJITEVOQlF6WkNPMEZCUkRkQ0xFOUJSMGdzVFVGQlRTeEpRVUZKUnl4TFFVRktMRU5CUVZVc2RVUkJRVllzUTBGQlRqczdRVUZGUml4TlFVRkpaaXhIUVVGS08wRkJRMEVzVFVGQlNVd3NUMEZCVDBrc1pVRkJXQ3hGUVVFMFFqdEJRVU14UWp0QlFVTkJReXhWUVVGTlRDeFBRVUZQY1VJc1VVRkJVQ3hEUVVGblFpeEpRVUZKWWl4VlFVRktMRU5CUVdWVExFMUJRV1lzUTBGQmFFSXNRMEZCVGp0QlFVTkVMRWRCU0VRc1RVRkhUenRCUVVOTU8wRkJRMEZhTEZWQlFVMHNTVUZCVGp0QlFVTkJRU3hSUVVGSldTeE5RVUZLTEVkQlFXRkJMRTFCUVdJN1FVRkRRVm9zVVVGQlNXbENMRk5CUVVvc1IwRkJaMElzU1VGQmFFSTdRVUZEUkRzN1FVRkZSQ3hOUVVGSlF5eERRVUZLTzBGQlEwRXNUVUZCU1haQ0xFOUJRVTlKTEdWQlFWQXNTVUZCTUVJc1QwRkJUMUVzVVVGQlVVOHNWVUZCWml4TFFVRTRRaXhSUVVFMVJDeEZRVUZ6UlR0QlFVTndSVHRCUVVOQlpDeFJRVUZKYlVJc1NVRkJTaXhEUVVGVFdpeFBRVUZVTzBGQlEwUXNSMEZJUkN4TlFVZFBMRWxCUVVsaExGZEJRVmRpTEU5QlFWZ3NRMEZCU2l4RlFVRjVRanRCUVVNNVFqdEJRVU5CTEZOQlFVdFhMRWxCUVVrc1EwRkJWQ3hGUVVGWlFTeEpRVUZKVGl4TlFVRm9RaXhGUVVGM1FrMHNSMEZCZUVJc1JVRkJOa0k3UVVGRE0wSXNWVUZCU1haQ0xFOUJRVTh3UWl4UlFVRlFMRU5CUVdkQ1pDeFBRVUZvUWl4RFFVRktMRVZCUTBWUUxFbEJRVWxyUWl4RFFVRktMRWxCUVZOWUxGRkJRVkZsTEZOQlFWSXNRMEZCYTBKS0xFTkJRV3hDTEVOQlFWUXNRMEZFUml4TFFVZEZiRUlzU1VGQlNXdENMRU5CUVVvc1NVRkJVMWdzVVVGQlVWY3NRMEZCVWl4RFFVRlVPMEZCUTBnN1FVRkRSaXhIUVZKTkxFMUJVVUVzU1VGQlNWSXNVMEZCVXl4UlFVRmlMRVZCUVhWQ08wRkJRelZDVml4UlFVRkpkVUlzUzBGQlNpeERRVUZWYUVJc1QwRkJWaXhGUVVGdFFpeERRVUZ1UWl4RlFVRnpRa01zVVVGQmRFSTdRVUZEUkN4SFFVWk5MRTFCUlVFc1NVRkJTVVVzVTBGQlV5eFJRVUZVTEVsQlFYRkNMRU5CUVVObUxFOUJRVTlKTEdWQlFUZENMRWxCUVdkRUxFTkJRVU5WTEUxQlFYSkVMRVZCUVRaRU8wRkJRMnhGTEZOQlFVdFRMRWxCUVVrc1EwRkJWQ3hGUVVGWlFTeEpRVUZKVGl4TlFVRm9RaXhGUVVGM1FrMHNSMEZCZUVJc1JVRkJOa0k3UVVGRE0wSnNRaXhWUVVGSmEwSXNRMEZCU2l4SlFVRlRMRU5CUVZRN1FVRkRSRHRCUVVOR096dEJRVVZFTEZOQlFVOXNRaXhIUVVGUU8wRkJRMFE3TzBGQlJVUTdRVUZEUVRzN1FVRkZRVXdzVDBGQlR6WkNMRlZCUVZBc1IwRkJiMElzVlVGQlZXaENMRkZCUVZZc1JVRkJiMEk3UVVGRGRFTXNWVUZCVVdsQ0xFOUJRVTlxUWl4UlFVRlFMRVZCUVdsQ2EwSXNWMEZCYWtJc1JVRkJVanRCUVVORkxGTkJRVXNzUzBGQlREdEJRVU5CTEZOQlFVc3NUVUZCVER0QlFVTkJMRk5CUVVzc1QwRkJURHRCUVVOQkxGTkJRVXNzVDBGQlREdEJRVU5CTEZOQlFVc3NVVUZCVER0QlFVTkJMRk5CUVVzc1VVRkJURHRCUVVOQkxGTkJRVXNzUzBGQlREdEJRVU5CTEZOQlFVc3NUVUZCVER0QlFVTkJMRk5CUVVzc1QwRkJURHRCUVVOQkxGTkJRVXNzVTBGQlREdEJRVU5CTEZOQlFVc3NWVUZCVER0QlFVTkZMR0ZCUVU4c1NVRkJVRHRCUVVOR08wRkJRMFVzWVVGQlR5eExRVUZRTzBGQlpFbzdRVUZuUWtRc1EwRnFRa1E3TzBGQmJVSkJMMElzVDBGQlR6QkNMRkZCUVZBc1IwRkJhMElzVlVGQlZVMHNRMEZCVml4RlFVRmhPMEZCUXpkQ0xGTkJRVThzUTBGQlF5eEZRVUZGUVN4TlFVRk5MRWxCUVU0c1NVRkJZMEVzVFVGQlRVTXNVMEZCY0VJc1NVRkJhVU5FTEVWQlFVVldMRk5CUVhKRExFTkJRVkk3UVVGRFJDeERRVVpFT3p0QlFVbEJkRUlzVDBGQlQyMUNMRlZCUVZBc1IwRkJiMElzVlVGQlZXVXNSMEZCVml4RlFVRmxja0lzVVVGQlppeEZRVUY1UWp0QlFVTXpReXhOUVVGSmMwSXNSMEZCU2p0QlFVTkJSQ3hSUVVGTlFTeE5RVUZOTEVWQlFWbzdRVUZEUVN4VlFVRlJja0lzV1VGQldTeE5RVUZ3UWp0QlFVTkZMRk5CUVVzc1MwRkJURHRCUVVORmMwSXNXVUZCVFVRc1NVRkJTV3BDTEUxQlFVb3NSMEZCWVN4RFFVRnVRanRCUVVOQk8wRkJRMFlzVTBGQlN5eE5RVUZNTzBGQlEwRXNVMEZCU3l4UFFVRk1PMEZCUTBWclFpeFpRVUZOUXl4WlFVRlpSaXhIUVVGYUxFVkJRV2xDYWtJc1RVRkJka0k3UVVGRFFUdEJRVU5HTEZOQlFVc3NUMEZCVER0QlFVTkJMRk5CUVVzc1VVRkJURHRCUVVOQkxGTkJRVXNzUzBGQlREdEJRVU5GYTBJc1dVRkJUVVFzU1VGQlNXcENMRTFCUVZZN1FVRkRRVHRCUVVOR0xGTkJRVXNzVVVGQlREdEJRVU5GYTBJc1dVRkJUVVVzWTBGQlkwZ3NSMEZCWkN4RlFVRnRRbXBDTEUxQlFYcENPMEZCUTBFN1FVRkRSaXhUUVVGTExFMUJRVXc3UVVGRFFTeFRRVUZMTEU5QlFVdzdRVUZEUVN4VFFVRkxMRk5CUVV3N1FVRkRRU3hUUVVGTExGVkJRVXc3UVVGRFJXdENMRmxCUVUxRUxFbEJRVWxxUWl4TlFVRktMRWRCUVdFc1EwRkJia0k3UVVGRFFUdEJRVU5HTzBGQlEwVXNXVUZCVFN4SlFVRkpSeXhMUVVGS0xFTkJRVlVzYTBKQlFWWXNRMEZCVGp0QlFYWkNTanRCUVhsQ1FTeFRRVUZQWlN4SFFVRlFPMEZCUTBRc1EwRTNRa1E3TzBGQkswSkJia01zVDBGQlQzTkRMRTFCUVZBc1IwRkJaMElzVlVGQlZVTXNTVUZCVml4RlFVRm5Ra01zVjBGQmFFSXNSVUZCTmtJN1FVRkRNME5ETEZOQlFVOURMRkZCUVZGSUxFbEJRVklzUTBGQlVDeEZRVUZ6UWl4blJFRkRiRUlzTUVKQlJFbzdPMEZCUjBFc1RVRkJTVUVzUzBGQlMzUkNMRTFCUVV3c1MwRkJaMElzUTBGQmNFSXNSVUZCZFVJN1FVRkRja0lzVjBGQlR5eEpRVUZKYWtJc1RVRkJTaXhEUVVGWExFTkJRVmdzUTBGQlVEdEJRVU5FTEVkQlJrUXNUVUZGVHl4SlFVRkpkVU1zUzBGQlMzUkNMRTFCUVV3c1MwRkJaMElzUTBGQmNFSXNSVUZCZFVJN1FVRkROVUlzVjBGQlQzTkNMRXRCUVVzc1EwRkJUQ3hEUVVGUU8wRkJRMFE3TzBGQlJVUXNUVUZCU1doQ0xFTkJRVW83UVVGRFFTeE5RVUZKTEU5QlFVOXBRaXhYUVVGUUxFdEJRWFZDTEZGQlFUTkNMRVZCUVhGRE8wRkJRMjVEUVN4clFrRkJZeXhEUVVGa08wRkJRMEVzVTBGQlMycENMRWxCUVVrc1EwRkJWQ3hGUVVGWlFTeEpRVUZKWjBJc1MwRkJTM1JDTEUxQlFYSkNMRVZCUVRaQ1RTeEhRVUUzUWl4RlFVRnJRenRCUVVOb1EybENMSEZDUVVGbFJDeExRVUZMYUVJc1EwRkJUQ3hGUVVGUlRpeE5RVUYyUWp0QlFVTkVPMEZCUTBZN08wRkJSVVFzVFVGQlNWb3NUVUZCVFN4SlFVRkpUQ3hOUVVGS0xFTkJRVmQzUXl4WFFVRllMRU5CUVZZN1FVRkRRU3hOUVVGSlJ5eE5RVUZOTEVOQlFWWTdRVUZEUVN4UFFVRkxjRUlzU1VGQlNTeERRVUZVTEVWQlFWbEJMRWxCUVVsblFpeExRVUZMZEVJc1RVRkJja0lzUlVGQk5rSk5MRWRCUVRkQ0xFVkJRV3RETzBGQlEyaERMRkZCUVVseFFpeFBRVUZQVEN4TFFVRkxhRUlzUTBGQlRDeERRVUZZTzBGQlEwRnhRaXhUUVVGTFF5eEpRVUZNTEVOQlFWVjRReXhIUVVGV0xFVkJRV1Z6UXl4SFFVRm1PMEZCUTBGQkxGZEJRVTlETEV0QlFVc3pRaXhOUVVGYU8wRkJRMFE3UVVGRFJDeFRRVUZQV2l4SFFVRlFPMEZCUTBRc1EwRXhRa1E3TzBGQk5FSkJPMEZCUTBFN08wRkJSVUVzVTBGQlUzbERMRk5CUVZRc1EwRkJiMEo2UXl4SFFVRndRaXhGUVVGNVFqQkRMRTFCUVhwQ0xFVkJRV2xEUXl4TlFVRnFReXhGUVVGNVF5OUNMRTFCUVhwRExFVkJRV2xFTzBGQlF5OURLMElzVjBGQlUwTXNUMEZCVDBRc1RVRkJVQ3hMUVVGclFpeERRVUV6UWp0QlFVTkJMRTFCUVVsRkxGbEJRVmszUXl4SlFVRkpXU3hOUVVGS0xFZEJRV0VyUWl4TlFVRTNRanRCUVVOQkxFMUJRVWtzUTBGQlF5OUNMRTFCUVV3c1JVRkJZVHRCUVVOWVFTeGhRVUZUYVVNc1UwRkJWRHRCUVVORUxFZEJSa1FzVFVGRlR6dEJRVU5NYWtNc1lVRkJVMmRETEU5QlFVOW9ReXhOUVVGUUxFTkJRVlE3UVVGRFFTeFJRVUZKUVN4VFFVRlRhVU1zVTBGQllpeEZRVUYzUWp0QlFVTjBRbXBETEdWQlFWTnBReXhUUVVGVU8wRkJRMFE3UVVGRFJqczdRVUZGUkR0QlFVTkJMRTFCUVVsRExGTkJRVk5LTEU5QlFVODVRaXhOUVVGd1FqdEJRVU5CZDBJc1UwRkJUMVVzVTBGQlV5eERRVUZVTEV0QlFXVXNRMEZCZEVJc1JVRkJlVUlzYjBKQlFYcENPenRCUVVWQkxFMUJRVWxzUXl4VFFVRlRhME1zVTBGQlV5eERRVUYwUWl4RlFVRjVRanRCUVVOMlFteERMR0ZCUVZOclF5eFRRVUZUTEVOQlFXeENPMEZCUTBRN1FVRkRSQ3hQUVVGTExFbEJRVWsxUWl4SlFVRkpMRU5CUVdJc1JVRkJaMEpCTEVsQlFVbE9MRTFCUVhCQ0xFVkJRVFJDVFN4SFFVRTFRaXhGUVVGcFF6dEJRVU12UWl4UlFVRkpOa0lzVDBGQlQwTXNVMEZCVTA0c1QwRkJUMDhzVFVGQlVDeERRVUZqTDBJc1NVRkJTU3hEUVVGc1FpeEZRVUZ4UWl4RFFVRnlRaXhEUVVGVUxFVkJRV3RETEVWQlFXeERMRU5CUVZnN1FVRkRRV3RDTEZkQlFVOHNRMEZCUTJNc1RVRkJUVWdzU1VGQlRpeERRVUZTTEVWQlFYRkNMRzlDUVVGeVFqdEJRVU5CTDBNc1VVRkJTVEpETEZOQlFWTjZRaXhEUVVGaUxFbEJRV3RDTmtJc1NVRkJiRUk3UVVGRFJEdEJRVU5FY0VRc1UwRkJUM2RFTEdGQlFWQXNSMEZCZFVKcVF5eEpRVUZKTEVOQlFUTkNPMEZCUTBFc1UwRkJUMEVzUTBGQlVEdEJRVU5FT3p0QlFVVkVMRk5CUVZOclF5eFZRVUZVTEVOQlFYRkNjRVFzUjBGQmNrSXNSVUZCTUVJd1F5eE5RVUV4UWl4RlFVRnJRME1zVFVGQmJFTXNSVUZCTUVNdlFpeE5RVUV4UXl4RlFVRnJSRHRCUVVOb1JDeE5RVUZKZVVNc1pVRkJaVEZFTEU5QlFVOTNSQ3hoUVVGUUxFZEJRMnBDUnl4WFFVRlhka0lzV1VGQldWY3NUVUZCV2l4RFFVRllMRVZCUVdkRE1VTXNSMEZCYUVNc1JVRkJjVU15UXl4TlFVRnlReXhGUVVFMlF5OUNMRTFCUVRkRExFTkJSRVk3UVVGRlFTeFRRVUZQZVVNc1dVRkJVRHRCUVVORU96dEJRVVZFTEZOQlFWTkZMRmRCUVZRc1EwRkJjMEoyUkN4SFFVRjBRaXhGUVVFeVFqQkRMRTFCUVROQ0xFVkJRVzFEUXl4TlFVRnVReXhGUVVFeVF5OUNMRTFCUVRORExFVkJRVzFFTzBGQlEycEVMRTFCUVVsNVF5eGxRVUZsTVVRc1QwRkJUM2RFTEdGQlFWQXNSMEZEYWtKSExGZEJRVmRGTEdGQlFXRmtMRTFCUVdJc1EwRkJXQ3hGUVVGcFF6RkRMRWRCUVdwRExFVkJRWE5ETWtNc1RVRkJkRU1zUlVGQk9FTXZRaXhOUVVFNVF5eERRVVJHTzBGQlJVRXNVMEZCVDNsRExGbEJRVkE3UVVGRFJEczdRVUZGUkN4VFFVRlRTU3haUVVGVUxFTkJRWFZDZWtRc1IwRkJka0lzUlVGQk5FSXdReXhOUVVFMVFpeEZRVUZ2UTBNc1RVRkJjRU1zUlVGQk5FTXZRaXhOUVVFMVF5eEZRVUZ2UkR0QlFVTnNSQ3hUUVVGUE1rTXNXVUZCV1haRUxFZEJRVm9zUlVGQmFVSXdReXhOUVVGcVFpeEZRVUY1UWtNc1RVRkJla0lzUlVGQmFVTXZRaXhOUVVGcVF5eERRVUZRTzBGQlEwUTdPMEZCUlVRc1UwRkJVemhETEZsQlFWUXNRMEZCZFVJeFJDeEhRVUYyUWl4RlFVRTBRakJETEUxQlFUVkNMRVZCUVc5RFF5eE5RVUZ3UXl4RlFVRTBReTlDTEUxQlFUVkRMRVZCUVc5RU8wRkJRMnhFTEUxQlFVbDVReXhsUVVGbE1VUXNUMEZCVDNkRUxHRkJRVkFzUjBGRGFrSkhMRmRCUVZkMFFpeGpRVUZqVlN4TlFVRmtMRU5CUVZnc1JVRkJhME14UXl4SFFVRnNReXhGUVVGMVF6SkRMRTFCUVhaRExFVkJRU3RETDBJc1RVRkJMME1zUTBGRVJqdEJRVVZCTEZOQlFVOTVReXhaUVVGUU8wRkJRMFE3TzBGQlJVUXNVMEZCVTAwc1lVRkJWQ3hEUVVGM1FqTkVMRWRCUVhoQ0xFVkJRVFpDTUVNc1RVRkJOMElzUlVGQmNVTkRMRTFCUVhKRExFVkJRVFpETDBJc1RVRkJOME1zUlVGQmNVUTdRVUZEYmtRc1RVRkJTWGxETEdWQlFXVXhSQ3hQUVVGUGQwUXNZVUZCVUN4SFFVTnFRa2NzVjBGQlYwMHNaVUZCWld4Q0xFMUJRV1lzUTBGQldDeEZRVUZ0UXpGRExFZEJRVzVETEVWQlFYZERNa01zVFVGQmVFTXNSVUZCWjBRdlFpeE5RVUZvUkN4RFFVUkdPMEZCUlVFc1UwRkJUM2xETEZsQlFWQTdRVUZEUkRzN1FVRkZSREZFTEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDZEVNc1MwRkJha0lzUjBGQmVVSXNWVUZCVlcxQ0xFMUJRVllzUlVGQmEwSkRMRTFCUVd4Q0xFVkJRVEJDTDBJc1RVRkJNVUlzUlVGQmEwTktMRkZCUVd4RExFVkJRVFJETzBGQlEyNUZPMEZCUTBFN1FVRkRRU3hOUVVGSmMwUXNVMEZCVTI1Q0xFMUJRVlFzUTBGQlNpeEZRVUZ6UWp0QlFVTndRaXhSUVVGSkxFTkJRVU50UWl4VFFVRlRiRVFzVFVGQlZDeERRVUZNTEVWQlFYVkNPMEZCUTNKQ1NpeHBRa0ZCVjBrc1RVRkJXRHRCUVVOQlFTeGxRVUZUWjBJc1UwRkJWRHRCUVVORU8wRkJRMFlzUjBGTVJDeE5RVXRQTzBGQlFVYzdRVUZEVWl4UlFVRkpiVU1zVDBGQlQzWkVMRkZCUVZnN1FVRkRRVUVzWlVGQlYyMURMRTFCUVZnN1FVRkRRVUVzWVVGQlV5OUNMRTFCUVZRN1FVRkRRVUVzWVVGQlUyMUVMRWxCUVZRN1FVRkRSRHM3UVVGRlJIQkNMRmRCUVZORExFOUJRVTlFTEUxQlFWQXNTMEZCYTBJc1EwRkJNMEk3UVVGRFFTeE5RVUZKUlN4WlFVRlpMRXRCUVV0cVF5eE5RVUZNTEVkQlFXTXJRaXhOUVVFNVFqdEJRVU5CTEUxQlFVa3NRMEZCUXk5Q0xFMUJRVXdzUlVGQllUdEJRVU5ZUVN4aFFVRlRhVU1zVTBGQlZEdEJRVU5FTEVkQlJrUXNUVUZGVHp0QlFVTk1ha01zWVVGQlUyZERMRTlCUVU5b1F5eE5RVUZRTEVOQlFWUTdRVUZEUVN4UlFVRkpRU3hUUVVGVGFVTXNVMEZCWWl4RlFVRjNRanRCUVVOMFFtcERMR1ZCUVZOcFF5eFRRVUZVTzBGQlEwUTdRVUZEUmp0QlFVTkVja01zWVVGQlYybENMRTlCUVU5cVFpeFpRVUZaTEUxQlFXNUNMRVZCUVRKQ2EwSXNWMEZCTTBJc1JVRkJXRHM3UVVGRlFTeE5RVUZKU1N4SFFVRktPMEZCUTBFc1ZVRkJVWFJDTEZGQlFWSTdRVUZEUlN4VFFVRkxMRXRCUVV3N1FVRkRSWE5DTEZsQlFVMVhMRlZCUVZVc1NVRkJWaXhGUVVGblFrTXNUVUZCYUVJc1JVRkJkMEpETEUxQlFYaENMRVZCUVdkREwwSXNUVUZCYUVNc1EwRkJUanRCUVVOQk8wRkJRMFlzVTBGQlN5eE5RVUZNTzBGQlEwRXNVMEZCU3l4UFFVRk1PMEZCUTBWclFpeFpRVUZOYzBJc1YwRkJWeXhKUVVGWUxFVkJRV2xDVml4TlFVRnFRaXhGUVVGNVFrTXNUVUZCZWtJc1JVRkJhVU12UWl4TlFVRnFReXhEUVVGT08wRkJRMEU3UVVGRFJpeFRRVUZMTEU5QlFVdzdRVUZEUld0Q0xGbEJRVTE1UWl4WlFVRlpMRWxCUVZvc1JVRkJhMEppTEUxQlFXeENMRVZCUVRCQ1F5eE5RVUV4UWl4RlFVRnJReTlDTEUxQlFXeERMRU5CUVU0N1FVRkRRVHRCUVVOR0xGTkJRVXNzVVVGQlREdEJRVU5GYTBJc1dVRkJUVEpDTEdGQlFXRXNTVUZCWWl4RlFVRnRRbVlzVFVGQmJrSXNSVUZCTWtKRExFMUJRVE5DTEVWQlFXMURMMElzVFVGQmJrTXNRMEZCVGp0QlFVTkJPMEZCUTBZc1UwRkJTeXhSUVVGTU8wRkJRMFZyUWl4WlFVRk5ORUlzWVVGQllTeEpRVUZpTEVWQlFXMUNhRUlzVFVGQmJrSXNSVUZCTWtKRExFMUJRVE5DTEVWQlFXMURMMElzVFVGQmJrTXNRMEZCVGp0QlFVTkJPMEZCUTBZc1UwRkJTeXhOUVVGTU8wRkJRMEVzVTBGQlN5eFBRVUZNTzBGQlEwRXNVMEZCU3l4VFFVRk1PMEZCUTBFc1UwRkJTeXhWUVVGTU8wRkJRMFZyUWl4WlFVRk5Oa0lzWTBGQll5eEpRVUZrTEVWQlFXOUNha0lzVFVGQmNFSXNSVUZCTkVKRExFMUJRVFZDTEVWQlFXOURMMElzVFVGQmNFTXNRMEZCVGp0QlFVTkJPMEZCUTBZN1FVRkRSU3haUVVGTkxFbEJRVWxITEV0QlFVb3NRMEZCVlN4clFrRkJWaXhEUVVGT08wRkJlRUpLTzBGQk1FSkJMRk5CUVU5bExFZEJRVkE3UVVGRFJDeERRWFpFUkRzN1FVRjVSRUZ1UXl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUWtjc1VVRkJha0lzUjBGQk5FSXNWVUZCVlhoRUxGRkJRVllzUlVGQmIwSjVSQ3hMUVVGd1FpeEZRVUV5UWtNc1IwRkJNMElzUlVGQlowTTdRVUZETVVRc1RVRkJTVU1zVDBGQlR5eEpRVUZZT3p0QlFVVkJNMFFzWVVGQlYybENMRTlCUVU5cVFpeFpRVUZaTEUxQlFXNUNMRVZCUVRKQ2EwSXNWMEZCTTBJc1JVRkJXRHRCUVVOQmRVTXNWVUZCVVhKQ0xFOUJRVTl4UWl4TFFVRlFMRXRCUVdsQ0xFTkJRWHBDTzBGQlEwRkRMRkZCUVU5QkxGRkJRVkYwUXl4VFFVRlVMRWRCUTBablFpeFBRVUZQYzBJc1IwRkJVQ3hEUVVSRkxFZEJSVVpCTEUxQlFVMURMRXRCUVV0MlJDeE5RVVptT3p0QlFVbEJPMEZCUTBFc1RVRkJTWE5FTEZGQlFWRkVMRXRCUVZvc1JVRkRSU3hQUVVGUExFVkJRVkE3TzBGQlJVWXNUVUZCU1c1RExFZEJRVW83UVVGRFFTeFZRVUZSZEVJc1VVRkJVanRCUVVORkxGTkJRVXNzUzBGQlREdEJRVU5GYzBJc1dVRkJUWE5ETEZWQlFWVkVMRWxCUVZZc1JVRkJaMEpHTEV0QlFXaENMRVZCUVhWQ1F5eEhRVUYyUWl4RFFVRk9PMEZCUTBFN1FVRkRSaXhUUVVGTExFMUJRVXc3UVVGRFFTeFRRVUZMTEU5QlFVdzdRVUZEUlhCRExGbEJRVTExUXl4WFFVRlhSaXhKUVVGWUxFVkJRV2xDUml4TFFVRnFRaXhGUVVGM1FrTXNSMEZCZUVJc1EwRkJUanRCUVVOQk8wRkJRMFlzVTBGQlN5eFBRVUZNTzBGQlEwVndReXhaUVVGTmQwTXNXVUZCV1Vnc1NVRkJXaXhGUVVGclFrWXNTMEZCYkVJc1JVRkJlVUpETEVkQlFYcENMRU5CUVU0N1FVRkRRVHRCUVVOR0xGTkJRVXNzVVVGQlREdEJRVU5GY0VNc1dVRkJUWGxETEdGQlFXRktMRWxCUVdJc1JVRkJiVUpHTEV0QlFXNUNMRVZCUVRCQ1F5eEhRVUV4UWl4RFFVRk9PMEZCUTBFN1FVRkRSaXhUUVVGTExGRkJRVXc3UVVGRFJYQkRMRmxCUVUwd1F5eGhRVUZoVEN4SlFVRmlMRVZCUVcxQ1JpeExRVUZ1UWl4RlFVRXdRa01zUjBGQk1VSXNRMEZCVGp0QlFVTkJPMEZCUTBZc1UwRkJTeXhOUVVGTU8wRkJRMEVzVTBGQlN5eFBRVUZNTzBGQlEwRXNVMEZCU3l4VFFVRk1PMEZCUTBFc1UwRkJTeXhWUVVGTU8wRkJRMFZ3UXl4WlFVRk5Na01zWTBGQlkwNHNTVUZCWkN4RlFVRnZRa1lzUzBGQmNFSXNSVUZCTWtKRExFZEJRVE5DTEVOQlFVNDdRVUZEUVR0QlFVTkdPMEZCUTBVc1dVRkJUU3hKUVVGSmJrUXNTMEZCU2l4RFFVRlZMR3RDUVVGV0xFTkJRVTQ3UVVGNFFrbzdRVUV3UWtFc1UwRkJUMlVzUjBGQlVEdEJRVU5FTEVOQmVrTkVPenRCUVRKRFFXNURMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENZU3hOUVVGcVFpeEhRVUV3UWl4WlFVRlpPMEZCUTNCRExGTkJRVTg3UVVGRFRHaEZMRlZCUVUwc1VVRkVSRHRCUVVWTWFVVXNWVUZCVFVNc1RVRkJUV1lzVTBGQlRpeERRVUZuUW1kQ0xFdEJRV2hDTEVOQlFYTkNReXhKUVVGMFFpeERRVUV5UWl4TFFVRkxReXhKUVVGTUxFbEJRV0VzU1VGQmVFTXNSVUZCT0VNc1EwRkJPVU03UVVGR1JDeEhRVUZRTzBGQlNVUXNRMEZNUkRzN1FVRlBRVHRCUVVOQmNFWXNUMEZCVDJ0RkxGTkJRVkFzUTBGQmFVSnlRaXhKUVVGcVFpeEhRVUYzUWl4VlFVRlZkME1zVFVGQlZpeEZRVUZyUWtNc1dVRkJiRUlzUlVGQlowTm9RaXhMUVVGb1F5eEZRVUYxUTBNc1IwRkJka01zUlVGQk5FTTdRVUZEYkVVc1RVRkJTV2RDTEZOQlFWTXNTVUZCWWpzN1FVRkZRU3hOUVVGSkxFTkJRVU5xUWl4TFFVRk1MRVZCUVZsQkxGRkJRVkVzUTBGQlVqdEJRVU5hTEUxQlFVa3NRMEZCUTBNc1IwRkJSQ3hKUVVGUlFTeFJRVUZSTEVOQlFYQkNMRVZCUVhWQ1FTeE5RVUZOTEV0QlFVdDBSQ3hOUVVGWU8wRkJRM1pDTEUxQlFVa3NRMEZCUTNGRkxGbEJRVXdzUlVGQmJVSkJMR1ZCUVdVc1EwRkJaanM3UVVGRmJrSTdRVUZEUVN4TlFVRkpaaXhSUVVGUlJDeExRVUZhTEVWQlFXMUNPMEZCUTI1Q0xFMUJRVWxsTEU5QlFVOXdSU3hOUVVGUUxFdEJRV3RDTEVOQlFXeENMRWxCUVhWQ2MwVXNUMEZCVDNSRkxFMUJRVkFzUzBGQmEwSXNRMEZCTjBNc1JVRkJaMFE3TzBGQlJXaEVPMEZCUTBGM1FpeFRRVUZQT0VJc1QwRkJUMFFzUzBGQlpDeEZRVUZ4UWl4NVFrRkJja0k3UVVGRFFUZENMRk5CUVU4MlF5eG5Ra0ZCWjBJc1EwRkJhRUlzU1VGQmNVSkJMR1ZCUVdWRUxFOUJRVTl3UlN4TlFVRnNSQ3hGUVVOSkxESkNRVVJLTzBGQlJVRjNRaXhUUVVGUE5rSXNVMEZCVXl4RFFVRlVMRWxCUVdOQkxGRkJRVkZwUWl4UFFVRlBkRVVzVFVGQmNFTXNSVUZCTkVNc01rSkJRVFZETzBGQlEwRjNRaXhUUVVGUE9FSXNUMEZCVHl4RFFVRlFMRWxCUVZsQkxFOUJRVTluUWl4UFFVRlBkRVVzVFVGQmFrTXNSVUZCZVVNc2VVSkJRWHBET3p0QlFVVkJPMEZCUTBFc1RVRkJTWE5FTEUxQlFVMHNTMEZCUzNSRUxFMUJRV1lzUlVGRFJYTkVMRTFCUVUwc1MwRkJTM1JFTEUxQlFWZzdRVUZEUml4TlFVRkpiMFVzVDBGQlQzQkZMRTFCUVZBc1IwRkJaMEp4UlN4WlFVRm9RaXhIUVVFclFtWXNUVUZCVFVRc1MwRkJla01zUlVGRFJVTXNUVUZCVFdNc1QwRkJUM0JGTEUxQlFWQXNSMEZCWjBKeFJTeFpRVUZvUWl4SFFVRXJRbWhDTEV0QlFYSkRPenRCUVVWR0xFMUJRVWxyUWl4TlFVRk5ha0lzVFVGQlRVUXNTMEZCYUVJN08wRkJSVUVzVFVGQlNXdENMRTFCUVUwc1IwRkJUaXhKUVVGaExFTkJRVU40Uml4UFFVRlBTU3hsUVVGNlFpeEZRVUV3UXp0QlFVTjRReXhUUVVGTExFbEJRVWx0UWl4SlFVRkpMRU5CUVdJc1JVRkJaMEpCTEVsQlFVbHBSU3hIUVVGd1FpeEZRVUY1UW1wRkxFZEJRWHBDTzBGQlEwVTRSQ3hoUVVGUE9VUXNTVUZCU1N0RUxGbEJRVmdzU1VGQk1rSXNTMEZCU3k5RUxFbEJRVWtyUXl4TFFVRlVMRU5CUVROQ08wRkJSRVk3UVVGRlJDeEhRVWhFTEUxQlIwODdRVUZEVEdVc1YwRkJUemRFTEVsQlFWQXNRMEZCV1N4TFFVRkxaQ3hSUVVGTUxFTkJRV00wUkN4TFFVRmtMRVZCUVhGQ1FTeFJRVUZSYTBJc1IwRkJOMElzUTBGQldpeEZRVUVyUTBZc1dVRkJMME03UVVGRFJEdEJRVU5HTEVOQmFFTkVPenRCUVd0RFFTeFRRVUZUVkN4WlFVRlVMRU5CUVhWQ2VFVXNSMEZCZGtJc1JVRkJORUpwUlN4TFFVRTFRaXhGUVVGdFEwTXNSMEZCYmtNc1JVRkJkME03UVVGRGRFTXNUVUZCU1VRc1ZVRkJWU3hEUVVGV0xFbEJRV1ZETEZGQlFWRnNSU3hKUVVGSldTeE5RVUV2UWl4RlFVRjFRenRCUVVOeVF5eFhRVUZQY2tJc1QwRkJUelpHTEdGQlFWQXNRMEZCY1VKd1JpeEhRVUZ5UWl4RFFVRlFPMEZCUTBRc1IwRkdSQ3hOUVVWUE8wRkJRMHdzVjBGQlQxUXNUMEZCVHpaR0xHRkJRVkFzUTBGQmNVSndSaXhKUVVGSk5rVXNTMEZCU2l4RFFVRlZXaXhMUVVGV0xFVkJRV2xDUXl4SFFVRnFRaXhEUVVGeVFpeERRVUZRTzBGQlEwUTdRVUZEUmpzN1FVRkZSQ3hUUVVGVFJ5eFZRVUZVTEVOQlFYRkNja1VzUjBGQmNrSXNSVUZCTUVKcFJTeExRVUV4UWl4RlFVRnBRME1zUjBGQmFrTXNSVUZCYzBNN1FVRkRjRU1zVFVGQlNXMUNMRTFCUVUwc1JVRkJWanRCUVVOQkxFMUJRVWxETEUxQlFVMHNSVUZCVmp0QlFVTkJjRUlzVVVGQlRYRkNMRXRCUVV0RExFZEJRVXdzUTBGQlUzaEdMRWxCUVVsWkxFMUJRV0lzUlVGQmNVSnpSQ3hIUVVGeVFpeERRVUZPT3p0QlFVVkJMRTlCUVVzc1NVRkJTV2hFTEVsQlFVa3JReXhMUVVGaUxFVkJRVzlDTDBNc1NVRkJTV2RFTEVkQlFYaENMRVZCUVRaQ2FFUXNSMEZCTjBJc1JVRkJhME03UVVGRGFFTXNVVUZCU1d4Q0xFbEJRVWxyUWl4RFFVRktMRXRCUVZVc1NVRkJaQ3hGUVVGdlFqdEJRVU5zUW0xRkxHRkJRVTlKTEdWQlFXVklMRWRCUVdZc1NVRkJjMEkzUkN4UFFVRlBhVVVzV1VGQlVDeERRVUZ2UWpGR0xFbEJRVWxyUWl4RFFVRktMRU5CUVhCQ0xFTkJRVGRDTzBGQlEwRnZSU3haUVVGTkxFVkJRVTQ3UVVGRFJDeExRVWhFTEUxQlIwODdRVUZEVEVFc1lVRkJUeXhOUVVGTmRFWXNTVUZCU1d0Q0xFTkJRVW9zUlVGQlR6aERMRkZCUVZBc1EwRkJaMElzUlVGQmFFSXNRMEZCWWp0QlFVTkVPMEZCUTBZN08wRkJSVVFzVTBGQlQzRkNMRTFCUVUxSkxHVkJRV1ZJTEVkQlFXWXNRMEZCWWp0QlFVTkVPenRCUVVWRUxGTkJRVk5vUWl4WFFVRlVMRU5CUVhOQ2RFVXNSMEZCZEVJc1JVRkJNa0pwUlN4TFFVRXpRaXhGUVVGclEwTXNSMEZCYkVNc1JVRkJkVU03UVVGRGNrTXNUVUZCU1hCRExFMUJRVTBzUlVGQlZqdEJRVU5CYjBNc1VVRkJUWEZDTEV0QlFVdERMRWRCUVV3c1EwRkJVM2hHTEVsQlFVbFpMRTFCUVdJc1JVRkJjVUp6UkN4SFFVRnlRaXhEUVVGT096dEJRVVZCTEU5QlFVc3NTVUZCU1doRUxFbEJRVWtyUXl4TFFVRmlMRVZCUVc5Q0wwTXNTVUZCU1dkRUxFZEJRWGhDTEVWQlFUWkNhRVFzUjBGQk4wSTdRVUZEUlZrc1YwRkJUMHdzVDBGQlQybEZMRmxCUVZBc1EwRkJiMEl4Uml4SlFVRkphMElzUTBGQlNpeERRVUZ3UWl4RFFVRlFPMEZCUkVZc1IwRkZRU3hQUVVGUFdTeEhRVUZRTzBGQlEwUTdPMEZCUlVRc1UwRkJVM2xETEZsQlFWUXNRMEZCZFVKMlJTeEhRVUYyUWl4RlFVRTBRbWxGTEV0QlFUVkNMRVZCUVcxRFF5eEhRVUZ1UXl4RlFVRjNRenRCUVVOMFF5eFRRVUZQU1N4WlFVRlpkRVVzUjBGQldpeEZRVUZwUW1sRkxFdEJRV3BDTEVWQlFYZENReXhIUVVGNFFpeERRVUZRTzBGQlEwUTdPMEZCUlVRc1UwRkJVMFVzVTBGQlZDeERRVUZ2UW5CRkxFZEJRWEJDTEVWQlFYbENhVVVzUzBGQmVrSXNSVUZCWjBORExFZEJRV2hETEVWQlFYRkRPMEZCUTI1RExFMUJRVWxwUWl4TlFVRk5ia1lzU1VGQlNWa3NUVUZCWkRzN1FVRkZRU3hOUVVGSkxFTkJRVU54UkN4TFFVRkVMRWxCUVZWQkxGRkJRVkVzUTBGQmRFSXNSVUZCZVVKQkxGRkJRVkVzUTBGQlVqdEJRVU42UWl4TlFVRkpMRU5CUVVORExFZEJRVVFzU1VGQlVVRXNUVUZCVFN4RFFVRmtMRWxCUVcxQ1FTeE5RVUZOYVVJc1IwRkJOMElzUlVGQmEwTnFRaXhOUVVGTmFVSXNSMEZCVGpzN1FVRkZiRU1zVFVGQlNWRXNUVUZCVFN4RlFVRldPMEZCUTBFc1QwRkJTeXhKUVVGSmVrVXNTVUZCU1N0RExFdEJRV0lzUlVGQmIwSXZReXhKUVVGSlowUXNSMEZCZUVJc1JVRkJOa0pvUkN4SFFVRTNRaXhGUVVGclF6dEJRVU5vUTNsRkxGZEJRVTlETEUxQlFVMDFSaXhKUVVGSmEwSXNRMEZCU2l4RFFVRk9MRU5CUVZBN1FVRkRSRHRCUVVORUxGTkJRVTk1UlN4SFFVRlFPMEZCUTBRN08wRkJSVVFzVTBGQlUyeENMR0ZCUVZRc1EwRkJkMEo2UlN4SFFVRjRRaXhGUVVFMlFtbEZMRXRCUVRkQ0xFVkJRVzlEUXl4SFFVRndReXhGUVVGNVF6dEJRVU4yUXl4TlFVRkpNa0lzVVVGQlVUZEdMRWxCUVVrMlJTeExRVUZLTEVOQlFWVmFMRXRCUVZZc1JVRkJhVUpETEVkQlFXcENMRU5CUVZvN1FVRkRRU3hOUVVGSmJVSXNUVUZCVFN4RlFVRldPMEZCUTBFc1QwRkJTeXhKUVVGSmJrVXNTVUZCU1N4RFFVRmlMRVZCUVdkQ1FTeEpRVUZKTWtVc1RVRkJUV3BHTEUxQlFURkNMRVZCUVd0RFRTeExRVUZMTEVOQlFYWkRMRVZCUVRCRE8wRkJRM2hEYlVVc1YwRkJUelZFTEU5QlFVOXBSU3haUVVGUUxFTkJRVzlDUnl4TlFVRk5NMFVzUTBGQlRpeEpRVUZYTWtVc1RVRkJUVE5GTEVsQlFVVXNRMEZCVWl4SlFVRmhMRWRCUVRWRExFTkJRVkE3UVVGRFJEdEJRVU5FTEZOQlFVOXRSU3hIUVVGUU8wRkJRMFE3TzBGQlJVUXhSaXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRbWRDTEV0QlFXcENMRWRCUVhsQ0xGVkJRVlZhTEV0QlFWWXNSVUZCYVVKRExFZEJRV3BDTEVWQlFYTkNPMEZCUXpkRExFMUJRVWxwUWl4TlFVRk5MRXRCUVV0MlJTeE5RVUZtTzBGQlEwRnhSQ3hWUVVGUk5rSXNUVUZCVFRkQ0xFdEJRVTRzUlVGQllXdENMRWRCUVdJc1JVRkJhMElzUTBGQmJFSXNRMEZCVWp0QlFVTkJha0lzVVVGQlRUUkNMRTFCUVUwMVFpeEhRVUZPTEVWQlFWZHBRaXhIUVVGWUxFVkJRV2RDUVN4SFFVRm9RaXhEUVVGT096dEJRVVZCTEUxQlFVbDRSaXhQUVVGUFNTeGxRVUZZTEVWQlFUUkNPMEZCUXpGQ0xGZEJRVTlLTEU5QlFVOXhRaXhSUVVGUUxFTkJRV2RDTEV0QlFVdFlMRkZCUVV3c1EwRkJZelJFTEV0QlFXUXNSVUZCY1VKRExFZEJRWEpDTEVOQlFXaENMRU5CUVZBN1FVRkRSQ3hIUVVaRUxFMUJSVTg3UVVGRFRDeFJRVUZKTmtJc1YwRkJWemRDTEUxQlFVMUVMRXRCUVhKQ08wRkJRMEVzVVVGQlNTdENMRk5CUVZNc1NVRkJTWEpITEUxQlFVb3NRMEZCVjI5SExGRkJRVmdzUlVGQmNVSnVSU3hUUVVGeVFpeEZRVUZuUXl4SlFVRm9ReXhEUVVGaU8wRkJRMEVzVTBGQlN5eEpRVUZKVml4SlFVRkpMRU5CUVdJc1JVRkJaMEpCTEVsQlFVazJSU3hSUVVGd1FpeEZRVUU0UWpkRkxFZEJRVGxDTEVWQlFXMURPMEZCUTJwRE9FVXNZVUZCVHpsRkxFTkJRVkFzU1VGQldTeExRVUZMUVN4SlFVRkpLME1zUzBGQlZDeERRVUZhTzBGQlEwUTdRVUZEUkN4WFFVRlBLMElzVFVGQlVEdEJRVU5FTzBGQlEwWXNRMEZtUkRzN1FVRnBRa0U3UVVGRFFYSkhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENiME1zUjBGQmFrSXNSMEZCZFVJc1ZVRkJWWFJFTEUxQlFWWXNSVUZCYTBJN1FVRkRka04xUkN4VlFVRlJReXhIUVVGU0xFTkJRVmtzTWtSQlFWbzdRVUZEUVN4VFFVRlBMRXRCUVVzM1JTeFRRVUZNTEVOQlFXVnhRaXhOUVVGbUxFTkJRVkE3UVVGRFJDeERRVWhFT3p0QlFVdEJPMEZCUTBGb1JDeFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFuVkRMRWRCUVdwQ0xFZEJRWFZDTEZWQlFWVkRMRU5CUVZZc1JVRkJZVEZFTEUxQlFXSXNSVUZCY1VJN1FVRkRNVU4xUkN4VlFVRlJReXhIUVVGU0xFTkJRVmtzTWtSQlFWbzdRVUZEUVN4VFFVRlBMRXRCUVV0SExGVkJRVXdzUTBGQlowSkVMRU5CUVdoQ0xFVkJRVzFDTVVRc1RVRkJia0lzUTBGQlVEdEJRVU5FTEVOQlNFUTdPMEZCUzBGb1JDeFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFuWkRMRk5CUVdwQ0xFZEJRVFpDTEZWQlFWVnhRaXhOUVVGV0xFVkJRV3RDTkVRc1VVRkJiRUlzUlVGQk5FSTdRVUZEZGtRc1RVRkJTU3hEUVVGRFFTeFJRVUZNTEVWQlFXVTdRVUZEWW01RkxGZEJRVTlQTEZkQlFWZG1MRk5CUVZnc1NVRkJkMEpsTEZkQlFWY3NTVUZCTVVNc1JVRkJaMFFzWjBKQlFXaEVPMEZCUTBGUUxGZEJRVTlQTEZOQlFWTXNTMEZCU3k5Q0xFMUJRWEpDTEVWQlFUWkNMSEZEUVVFM1FqdEJRVU5FT3p0QlFVVkVMRTFCUVVrclFpeFZRVUZWTEV0QlFVc3ZRaXhOUVVGdVFpeEZRVU5GT3p0QlFVVkdMRk5CUVU4c1MwRkJTeXRDTEUxQlFVd3NRMEZCVUR0QlFVTkVMRU5CVmtRN08wRkJXVUVzVTBGQlV6WkVMRmRCUVZRc1EwRkJjMEo0Unl4SFFVRjBRaXhGUVVFeVFqSkRMRTFCUVROQ0xFVkJRVzFET0VRc1dVRkJia01zUlVGQmFVUkdMRkZCUVdwRUxFVkJRVEpFTzBGQlEzcEVMRTFCUVVrc1EwRkJRMEVzVVVGQlRDeEZRVUZsTzBGQlEySnVSU3hYUVVGUExFOUJRVTl4UlN4WlFVRlFMRXRCUVhkQ0xGTkJRUzlDTEVWQlFUQkRMREpDUVVFeFF6dEJRVU5CY2tVc1YwRkJUMDhzVjBGQlYyWXNVMEZCV0N4SlFVRjNRbVVzVjBGQlZ5eEpRVUV4UXl4RlFVRm5SQ3huUWtGQmFFUTdRVUZEUVZBc1YwRkJUMDhzVTBGQlV5eERRVUZVTEVkQlFXRXpReXhKUVVGSldTeE5RVUY0UWl4RlFVRm5ReXh4UTBGQmFFTTdRVUZEUkRzN1FVRkZSQ3hOUVVGSmRVVXNUVUZCVFc1R0xFbEJRVWxaTEUxQlFXUTdRVUZEUVN4TlFVRkpLMElzVlVGQlZYZERMRWRCUVdRc1JVRkRSVHM3UVVGRlJpeE5RVUZKZFVJc1IwRkJTanRCUVVOQkxFMUJRVWxFTEZsQlFVb3NSVUZCYTBJN1FVRkRhRUpETEZWQlFVMHhSeXhKUVVGSk1rTXNUVUZCU2l4RFFVRk9PMEZCUTBFc1VVRkJTVUVzVTBGQlV5eERRVUZVTEVkQlFXRjNReXhIUVVGcVFpeEZRVU5GZFVJc1QwRkJUekZITEVsQlFVa3lReXhUUVVGVExFTkJRV0lzUzBGQmJVSXNRMEZCTVVJN1FVRkRTQ3hIUVVwRUxFMUJTVTg3UVVGRFRDdEVMRlZCUVUweFJ5eEpRVUZKTWtNc1RVRkJTaXhMUVVGbExFTkJRWEpDTzBGQlEwRXNVVUZCU1VFc1UwRkJVeXhEUVVGVUxFZEJRV0YzUXl4SFFVRnFRaXhGUVVORmRVSXNUMEZCVHpGSExFbEJRVWt5UXl4VFFVRlRMRU5CUVdJc1EwRkJVRHRCUVVOSU8wRkJRMFFzVTBGQlR5dEVMRWRCUVZBN1FVRkRSRHM3UVVGRlJDOUhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENPRU1zV1VGQmFrSXNSMEZCWjBNc1ZVRkJWV2hGTEUxQlFWWXNSVUZCYTBJMFJDeFJRVUZzUWl4RlFVRTBRanRCUVVNeFJDeFRRVUZQUXl4WlFVRlpMRWxCUVZvc1JVRkJhMEkzUkN4TlFVRnNRaXhGUVVFd1FpeEpRVUV4UWl4RlFVRm5RelJFTEZGQlFXaERMRU5CUVZBN1FVRkRSQ3hEUVVaRU96dEJRVWxCTlVjc1QwRkJUMnRGTEZOQlFWQXNRMEZCYVVJclF5eFpRVUZxUWl4SFFVRm5ReXhWUVVGVmFrVXNUVUZCVml4RlFVRnJRalJFTEZGQlFXeENMRVZCUVRSQ08wRkJRekZFTEZOQlFVOURMRmxCUVZrc1NVRkJXaXhGUVVGclFqZEVMRTFCUVd4Q0xFVkJRVEJDTEV0QlFURkNMRVZCUVdsRE5FUXNVVUZCYWtNc1EwRkJVRHRCUVVORUxFTkJSa1E3TzBGQlNVRXNVMEZCVTAwc1YwRkJWQ3hEUVVGelFqZEhMRWRCUVhSQ0xFVkJRVEpDTWtNc1RVRkJNMElzUlVGQmJVTTRSQ3haUVVGdVF5eEZRVUZwUkVZc1VVRkJha1FzUlVGQk1rUTdRVUZEZWtRc1RVRkJTU3hEUVVGRFFTeFJRVUZNTEVWQlFXVTdRVUZEWW01RkxGZEJRVThzVDBGQlQzRkZMRmxCUVZBc1MwRkJkMElzVTBGQkwwSXNSVUZCTUVNc01rSkJRVEZETzBGQlEwRnlSU3hYUVVGUFR5eFhRVUZYWml4VFFVRllMRWxCUVhkQ1pTeFhRVUZYTEVsQlFURkRMRVZCUVdkRUxHZENRVUZvUkR0QlFVTkJVQ3hYUVVGUFR5eFRRVUZUTEVOQlFWUXNSMEZCWVRORExFbEJRVWxaTEUxQlFYaENMRVZCUVdkRExIRkRRVUZvUXp0QlFVTkVPenRCUVVWRUxFMUJRVWwxUlN4TlFVRk5ia1lzU1VGQlNWa3NUVUZCWkR0QlFVTkJMRTFCUVVrclFpeFZRVUZWZDBNc1IwRkJaQ3hGUVVORk96dEJRVVZHTEUxQlFVbDFRaXhIUVVGS08wRkJRMEVzVFVGQlNVUXNXVUZCU2l4RlFVRnJRanRCUVVOb1FpeFJRVUZKT1VRc1UwRkJVeXhEUVVGVUxFZEJRV0YzUXl4SFFVRnFRaXhGUVVORmRVSXNUVUZCVFRGSExFbEJRVWt5UXl4VFFVRlRMRU5CUVdJc1MwRkJiVUlzUlVGQmVrSTdRVUZEUml4UlFVRkpRU3hUUVVGVExFTkJRVlFzUjBGQllYZERMRWRCUVdwQ0xFVkJRMFYxUWl4UFFVRlBNVWNzU1VGQlNUSkRMRk5CUVZNc1EwRkJZaXhMUVVGdFFpeERRVUV4UWp0QlFVTkdLMFFzVjBGQlR6RkhMRWxCUVVreVF5eE5RVUZLTEVOQlFWQTdRVUZEUVN4UlFVRkpRU3hUUVVGVExFTkJRVlFzUjBGQllYZERMRWRCUVdwQ0xFVkJRMFYxUWl4TlFVRk5RU3hQUVVGUE1VY3NTVUZCU1RKRExGTkJRVk1zUTBGQllpeExRVUZ0UWl4RlFVRnVRaXhMUVVFd1FpeERRVUZxUXl4RFFVRk9PMEZCUTBnc1IwRlNSQ3hOUVZGUE8wRkJRMHdzVVVGQlNVRXNVMEZCVXl4RFFVRlVMRWRCUVdGM1F5eEhRVUZxUWl4RlFVTkZkVUlzVFVGQlRURkhMRWxCUVVreVF5eFRRVUZUTEVOQlFXSXNTMEZCYlVJc1JVRkJla0k3UVVGRFJpeFJRVUZKUVN4VFFVRlRMRU5CUVZRc1IwRkJZWGRETEVkQlFXcENMRVZCUTBWMVFpeFBRVUZQTVVjc1NVRkJTVEpETEZOQlFWTXNRMEZCWWl4TFFVRnRRaXhEUVVFeFFqdEJRVU5HTEZGQlFVbEJMRk5CUVZNc1EwRkJWQ3hIUVVGaGQwTXNSMEZCYWtJc1JVRkRSWFZDTEU5QlFVOHhSeXhKUVVGSk1rTXNVMEZCVXl4RFFVRmlMRU5CUVZBN1FVRkRSaXRFTEZWQlFVMUJMRTlCUVU4eFJ5eEpRVUZKTWtNc1RVRkJTaXhMUVVGbExFVkJRV1lzUzBGQmMwSXNRMEZCTjBJc1EwRkJUanRCUVVORU8wRkJRMFFzVTBGQlR5dEVMRWRCUVZBN1FVRkRSRHM3UVVGRlJDOUhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENhVVFzV1VGQmFrSXNSMEZCWjBNc1ZVRkJWVzVGTEUxQlFWWXNSVUZCYTBJMFJDeFJRVUZzUWl4RlFVRTBRanRCUVVNeFJDeFRRVUZQVFN4WlFVRlpMRWxCUVZvc1JVRkJhMEpzUlN4TlFVRnNRaXhGUVVFd1FpeEpRVUV4UWl4RlFVRm5RelJFTEZGQlFXaERMRU5CUVZBN1FVRkRSQ3hEUVVaRU96dEJRVWxCTlVjc1QwRkJUMnRGTEZOQlFWQXNRMEZCYVVKclJDeFpRVUZxUWl4SFFVRm5ReXhWUVVGVmNFVXNUVUZCVml4RlFVRnJRalJFTEZGQlFXeENMRVZCUVRSQ08wRkJRekZFTEZOQlFVOU5MRmxCUVZrc1NVRkJXaXhGUVVGclFteEZMRTFCUVd4Q0xFVkJRVEJDTEV0QlFURkNMRVZCUVdsRE5FUXNVVUZCYWtNc1EwRkJVRHRCUVVORUxFTkJSa1E3TzBGQlNVRTFSeXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRbTFFTEZGQlFXcENMRWRCUVRSQ0xGVkJRVlZ5UlN4TlFVRldMRVZCUVd0Q05FUXNVVUZCYkVJc1JVRkJORUk3UVVGRGRFUXNUVUZCU1N4RFFVRkRRU3hSUVVGTUxFVkJRV1U3UVVGRFltNUZMRmRCUVU5UExGZEJRVmRtTEZOQlFWZ3NTVUZCZDBKbExGZEJRVmNzU1VGQk1VTXNSVUZEU1N4blFrRkVTanRCUVVWQlVDeFhRVUZQVHl4VFFVRlRMRXRCUVVzdlFpeE5RVUZ5UWl4RlFVRTJRaXh4UTBGQk4wSTdRVUZEUkRzN1FVRkZSQ3hOUVVGSkswSXNWVUZCVlN4TFFVRkxMMElzVFVGQmJrSXNSVUZEUlRzN1FVRkZSaXhOUVVGSmNVY3NUVUZCVFN4TFFVRkxkRVVzVFVGQlRDeEpRVUZsTEVsQlFYcENPMEZCUTBFc1RVRkJTWE5GTEVkQlFVb3NSVUZEUlN4UFFVRlBMRU5CUVVNc1QwRkJUeXhMUVVGTGRFVXNUVUZCVEN4RFFVRlFMRWRCUVhOQ0xFTkJRWFpDTEVsQlFUUkNMRU5CUVVNc1EwRkJjRU1zUTBGRVJpeExRVWRGTEU5QlFVOHNTMEZCUzBFc1RVRkJUQ3hEUVVGUU8wRkJRMGdzUTBGbVJEczdRVUZwUWtFc1UwRkJVM1ZGTEZWQlFWUXNRMEZCY1VKc1NDeEhRVUZ5UWl4RlFVRXdRakpETEUxQlFURkNMRVZCUVd0RE9FUXNXVUZCYkVNc1JVRkJaMFJHTEZGQlFXaEVMRVZCUVRCRU8wRkJRM2hFTEUxQlFVa3NRMEZCUTBFc1VVRkJUQ3hGUVVGbE8wRkJRMkp1UlN4WFFVRlBMRTlCUVU5eFJTeFpRVUZRTEV0QlFYZENMRk5CUVM5Q0xFVkJRVEJETERKQ1FVRXhRenRCUVVOQmNrVXNWMEZCVDA4c1YwRkJWMllzVTBGQldDeEpRVUYzUW1Vc1YwRkJWeXhKUVVFeFF5eEZRVUZuUkN4blFrRkJhRVE3UVVGRFFWQXNWMEZCVDA4c1UwRkJVeXhEUVVGVUxFZEJRV0V6UXl4SlFVRkpXU3hOUVVGNFFpeEZRVUZuUXl4eFEwRkJhRU03UVVGRFJEczdRVUZGUkN4TlFVRkpkVVVzVFVGQlRXNUdMRWxCUVVsWkxFMUJRV1E3UVVGRFFTeE5RVUZKSzBJc1ZVRkJWWGRETEVkQlFXUXNSVUZEUlRzN1FVRkZSaXhOUVVGSmRVSXNUVUZCVFVZc1dVRkJXWGhITEVkQlFWb3NSVUZCYVVJeVF5eE5RVUZxUWl4RlFVRjVRamhFTEZsQlFYcENMRVZCUVhWRExFbEJRWFpETEVOQlFWWTdRVUZEUVN4TlFVRkpVU3hOUVVGTlVDeE5RVUZOTEUxQlFXaENPMEZCUTBFc1RVRkJTVThzUjBGQlNpeEZRVU5GTEU5QlFVOHNRMEZCUXl4VFFVRlRVQ3hIUVVGVUxFZEJRV1VzUTBGQmFFSXNTVUZCY1VJc1EwRkJReXhEUVVFM1FpeERRVVJHTEV0QlIwVXNUMEZCVDBFc1IwRkJVRHRCUVVOSU96dEJRVVZFTDBjc1QwRkJUMnRGTEZOQlFWQXNRMEZCYVVKelJDeFhRVUZxUWl4SFFVRXJRaXhWUVVGVmVFVXNUVUZCVml4RlFVRnJRalJFTEZGQlFXeENMRVZCUVRSQ08wRkJRM3BFTEZOQlFVOVhMRmRCUVZjc1NVRkJXQ3hGUVVGcFFuWkZMRTFCUVdwQ0xFVkJRWGxDTEVsQlFYcENMRVZCUVN0Q05FUXNVVUZCTDBJc1EwRkJVRHRCUVVORUxFTkJSa1E3TzBGQlNVRTFSeXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRblZFTEZkQlFXcENMRWRCUVN0Q0xGVkJRVlY2UlN4TlFVRldMRVZCUVd0Q05FUXNVVUZCYkVJc1JVRkJORUk3UVVGRGVrUXNVMEZCVDFjc1YwRkJWeXhKUVVGWUxFVkJRV2xDZGtVc1RVRkJha0lzUlVGQmVVSXNTMEZCZWtJc1JVRkJaME0wUkN4UlFVRm9ReXhEUVVGUU8wRkJRMFFzUTBGR1JEczdRVUZKUVN4VFFVRlRZeXhWUVVGVUxFTkJRWEZDY2tnc1IwRkJja0lzUlVGQk1FSXlReXhOUVVFeFFpeEZRVUZyUXpoRUxGbEJRV3hETEVWQlFXZEVSaXhSUVVGb1JDeEZRVUV3UkR0QlFVTjRSQ3hOUVVGSkxFTkJRVU5CTEZGQlFVd3NSVUZCWlR0QlFVTmlia1VzVjBGQlR5eFBRVUZQY1VVc1dVRkJVQ3hMUVVGM1FpeFRRVUV2UWl4RlFVRXdReXd5UWtGQk1VTTdRVUZEUVhKRkxGZEJRVTlQTEZkQlFWZG1MRk5CUVZnc1NVRkJkMEpsTEZkQlFWY3NTVUZCTVVNc1JVRkJaMFFzWjBKQlFXaEVPMEZCUTBGUUxGZEJRVTlQTEZOQlFWTXNRMEZCVkN4SFFVRmhNME1zU1VGQlNWa3NUVUZCZUVJc1JVRkJaME1zY1VOQlFXaERPMEZCUTBRN08wRkJSVVFzVFVGQlNYVkZMRTFCUVUxdVJpeEpRVUZKV1N4TlFVRmtPMEZCUTBFc1RVRkJTU3RDTEZWQlFWVjNReXhIUVVGa0xFVkJRMFU3TzBGQlJVWXNUVUZCU1hWQ0xFMUJRVTFITEZsQlFWazNSeXhIUVVGYUxFVkJRV2xDTWtNc1RVRkJha0lzUlVGQmVVSTRSQ3haUVVGNlFpeEZRVUYxUXl4SlFVRjJReXhEUVVGV08wRkJRMEVzVFVGQlNWRXNUVUZCVFZBc1RVRkJUU3hWUVVGb1FqdEJRVU5CTEUxQlFVbFBMRWRCUVVvc1JVRkRSU3hQUVVGUExFTkJRVU1zWVVGQllWQXNSMEZCWWl4SFFVRnRRaXhEUVVGd1FpeEpRVUY1UWl4RFFVRkRMRU5CUVdwRExFTkJSRVlzUzBGSFJTeFBRVUZQUVN4SFFVRlFPMEZCUTBnN08wRkJSVVF2Unl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW5sRUxGZEJRV3BDTEVkQlFTdENMRlZCUVZVelJTeE5RVUZXTEVWQlFXdENORVFzVVVGQmJFSXNSVUZCTkVJN1FVRkRla1FzVTBGQlQyTXNWMEZCVnl4SlFVRllMRVZCUVdsQ01VVXNUVUZCYWtJc1JVRkJlVUlzU1VGQmVrSXNSVUZCSzBJMFJDeFJRVUV2UWl4RFFVRlFPMEZCUTBRc1EwRkdSRHM3UVVGSlFUVkhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENNRVFzVjBGQmFrSXNSMEZCSzBJc1ZVRkJWVFZGTEUxQlFWWXNSVUZCYTBJMFJDeFJRVUZzUWl4RlFVRTBRanRCUVVONlJDeFRRVUZQWXl4WFFVRlhMRWxCUVZnc1JVRkJhVUl4UlN4TlFVRnFRaXhGUVVGNVFpeExRVUY2UWl4RlFVRm5RelJFTEZGQlFXaERMRU5CUVZBN1FVRkRSQ3hEUVVaRU96dEJRVWxCTEZOQlFWTnBRaXhWUVVGVUxFTkJRWEZDZUVnc1IwRkJja0lzUlVGQk1FSXlReXhOUVVFeFFpeEZRVUZyUXpoRUxGbEJRV3hETEVWQlFXZEVSaXhSUVVGb1JDeEZRVUV3UkR0QlFVTjRSQ3hOUVVGSkxFTkJRVU5CTEZGQlFVd3NSVUZCWlR0QlFVTmlia1VzVjBGQlR5eFBRVUZQY1VVc1dVRkJVQ3hMUVVGM1FpeFRRVUV2UWl4RlFVRXdReXd5UWtGQk1VTTdRVUZEUVhKRkxGZEJRVTlQTEZOQlFWTXNRMEZCVkN4SFFVRmhNME1zU1VGQlNWa3NUVUZCZUVJc1JVRkJaME1zY1VOQlFXaERPMEZCUTBRN08wRkJSVVFzVTBGQlQyNUNMRkZCUVZGblNTeEpRVUZTTEVOQlFXRjZTQ3hIUVVGaUxFVkJRV3RDTWtNc1RVRkJiRUlzUlVGQk1FSTRSQ3haUVVFeFFpeEZRVUYzUXl4RlFVRjRReXhGUVVFMFF5eERRVUUxUXl4RFFVRlFPMEZCUTBRN08wRkJSVVE1Unl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUWpaRUxGZEJRV3BDTEVkQlFTdENMRlZCUVZVdlJTeE5RVUZXTEVWQlFXdENORVFzVVVGQmJFSXNSVUZCTkVJN1FVRkRla1FzVTBGQlQybENMRmRCUVZjc1NVRkJXQ3hGUVVGcFFqZEZMRTFCUVdwQ0xFVkJRWGxDTEVsQlFYcENMRVZCUVN0Q05FUXNVVUZCTDBJc1EwRkJVRHRCUVVORUxFTkJSa1E3TzBGQlNVRTFSeXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRamhFTEZkQlFXcENMRWRCUVN0Q0xGVkJRVlZvUml4TlFVRldMRVZCUVd0Q05FUXNVVUZCYkVJc1JVRkJORUk3UVVGRGVrUXNVMEZCVDJsQ0xGZEJRVmNzU1VGQldDeEZRVUZwUWpkRkxFMUJRV3BDTEVWQlFYbENMRXRCUVhwQ0xFVkJRV2RETkVRc1VVRkJhRU1zUTBGQlVEdEJRVU5FTEVOQlJrUTdPMEZCU1VFc1UwRkJVM0ZDTEZkQlFWUXNRMEZCYzBJMVNDeEhRVUYwUWl4RlFVRXlRakpETEUxQlFUTkNMRVZCUVcxRE9FUXNXVUZCYmtNc1JVRkJhVVJHTEZGQlFXcEVMRVZCUVRKRU8wRkJRM3BFTEUxQlFVa3NRMEZCUTBFc1VVRkJUQ3hGUVVGbE8wRkJRMkp1UlN4WFFVRlBMRTlCUVU5eFJTeFpRVUZRTEV0QlFYZENMRk5CUVM5Q0xFVkJRVEJETERKQ1FVRXhRenRCUVVOQmNrVXNWMEZCVDA4c1UwRkJVeXhEUVVGVUxFZEJRV0V6UXl4SlFVRkpXU3hOUVVGNFFpeEZRVUZuUXl4eFEwRkJhRU03UVVGRFJEczdRVUZGUkN4VFFVRlBia0lzVVVGQlVXZEpMRWxCUVZJc1EwRkJZWHBJTEVkQlFXSXNSVUZCYTBJeVF5eE5RVUZzUWl4RlFVRXdRamhFTEZsQlFURkNMRVZCUVhkRExFVkJRWGhETEVWQlFUUkRMRU5CUVRWRExFTkJRVkE3UVVGRFJEczdRVUZGUkRsSExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ1owVXNXVUZCYWtJc1IwRkJaME1zVlVGQlZXeEdMRTFCUVZZc1JVRkJhMEkwUkN4UlFVRnNRaXhGUVVFMFFqdEJRVU14UkN4VFFVRlBjVUlzV1VGQldTeEpRVUZhTEVWQlFXdENha1lzVFVGQmJFSXNSVUZCTUVJc1NVRkJNVUlzUlVGQlowTTBSQ3hSUVVGb1F5eERRVUZRTzBGQlEwUXNRMEZHUkRzN1FVRkpRVFZITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDYVVVc1dVRkJha0lzUjBGQlowTXNWVUZCVlc1R0xFMUJRVllzUlVGQmEwSTBSQ3hSUVVGc1FpeEZRVUUwUWp0QlFVTXhSQ3hUUVVGUGNVSXNXVUZCV1N4SlFVRmFMRVZCUVd0Q2FrWXNUVUZCYkVJc1JVRkJNRUlzUzBGQk1VSXNSVUZCYVVNMFJDeFJRVUZxUXl4RFFVRlFPMEZCUTBRc1EwRkdSRHM3UVVGSlFUVkhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENlVU1zVlVGQmFrSXNSMEZCT0VJc1ZVRkJWWGxDTEV0QlFWWXNSVUZCYVVKd1JpeE5RVUZxUWl4RlFVRjVRalJFTEZGQlFYcENMRVZCUVcxRE8wRkJReTlFTEUxQlFVa3NRMEZCUTBFc1VVRkJUQ3hGUVVGbE8wRkJRMkp1UlN4WFFVRlBNa1lzVlVGQlZXNUhMRk5CUVZZc1NVRkJkVUp0Unl4VlFVRlZMRWxCUVhoRExFVkJRVGhETEdWQlFUbERPMEZCUTBFelJpeFhRVUZQVHl4WFFVRlhaaXhUUVVGWUxFbEJRWGRDWlN4WFFVRlhMRWxCUVRGRExFVkJRV2RFTEdkQ1FVRm9SRHRCUVVOQlVDeFhRVUZQVHl4VFFVRlRMRXRCUVVzdlFpeE5RVUZ5UWl4RlFVRTJRaXh6UTBGQk4wSTdRVUZEUVc5SUxHTkJRVlZFTEV0QlFWWXNSVUZCYVVJc1NVRkJha0k3UVVGRFJEczdRVUZGUkN4TlFVRkpjRVlzVlVGQlZTeExRVUZMTDBJc1RVRkJia0lzUlVGQk1rSTdPMEZCUlROQ0xFOUJRVXNyUWl4TlFVRk1MRWxCUVdWdlJpeExRVUZtTzBGQlEwUXNRMEZZUkRzN1FVRmhRU3hUUVVGVFJTeFpRVUZVTEVOQlFYVkNha2tzUjBGQmRrSXNSVUZCTkVJclNDeExRVUUxUWl4RlFVRnRRM0JHTEUxQlFXNURMRVZCUVRKRE9FUXNXVUZCTTBNc1JVRkJlVVJHTEZGQlFYcEVMRVZCUVcxRk8wRkJRMnBGTEUxQlFVa3NRMEZCUTBFc1VVRkJUQ3hGUVVGbE8wRkJRMkp1UlN4WFFVRlBNa1lzVlVGQlZXNUhMRk5CUVZZc1NVRkJkVUp0Unl4VlFVRlZMRWxCUVhoRExFVkJRVGhETEdWQlFUbERPMEZCUTBFelJpeFhRVUZQTEU5QlFVOXhSU3haUVVGUUxFdEJRWGRDTEZOQlFTOUNMRVZCUVRCRExESkNRVUV4UXp0QlFVTkJja1VzVjBGQlQwOHNWMEZCVjJZc1UwRkJXQ3hKUVVGM1FtVXNWMEZCVnl4SlFVRXhReXhGUVVGblJDeG5Ra0ZCYUVRN1FVRkRRVkFzVjBGQlQwOHNVMEZCVXl4RFFVRlVMRWRCUVdFelF5eEpRVUZKV1N4TlFVRjRRaXhGUVVGblF5eHpRMEZCYUVNN1FVRkRRVzlJTEdOQlFWVkVMRXRCUVZZc1JVRkJhVUlzVFVGQmFrSTdRVUZEUkRzN1FVRkZSQ3hOUVVGSk5VTXNUVUZCVFc1R0xFbEJRVWxaTEUxQlFXUTdRVUZEUVN4TlFVRkpLMElzVlVGQlZYZERMRWRCUVdRc1JVRkRSVHM3UVVGRlJpeFBRVUZMTEVsQlFVbHFSU3hKUVVGSkxFTkJRVklzUlVGQlYyZElMRWxCUVVrelF5eExRVUZMUXl4SFFVRk1MRU5CUVZOTUxFMUJRVTE0UXl4TlFVRm1MRVZCUVhWQ0xFTkJRWFpDTEVOQlFYQkNMRVZCUVN0RGVrSXNTVUZCU1dkSUxFTkJRVzVFTEVWQlFYTkVhRWdzUjBGQmRFUXNSVUZCTWtRN1FVRkRla1JzUWl4UlFVRkpNa01zVTBGQlUzcENMRU5CUVdJc1NVRkRTU3hEUVVGRE5rY3NVVUZCVXl4UlFVRlRMRXRCUVV0MFFpeGxRVUZsZGtZc1EwRkJaaXhIUVVGdFFpeEpRVUZKUVN4RFFVRTFRaXhEUVVGdVFpeE5RVU5KTEVOQlFVTjFSaXhsUVVGbGRrWXNRMEZCWml4SFFVRnRRaXhKUVVGSlFTeERRVUY0UWl4SlFVRTJRaXhEUVVaeVF6dEJRVWRFTzBGQlEwWTdPMEZCUlVSMlFpeFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFuTkZMR0ZCUVdwQ0xFZEJRV2xETEZWQlFWVktMRXRCUVZZc1JVRkJhVUp3Uml4TlFVRnFRaXhGUVVGNVFqUkVMRkZCUVhwQ0xFVkJRVzFETzBGQlEyeEZNRUlzWlVGQllTeEpRVUZpTEVWQlFXMUNSaXhMUVVGdVFpeEZRVUV3UW5CR0xFMUJRVEZDTEVWQlFXdERMRWxCUVd4RExFVkJRWGRETkVRc1VVRkJlRU03UVVGRFJDeERRVVpFT3p0QlFVbEJOVWNzVDBGQlQydEZMRk5CUVZBc1EwRkJhVUoxUlN4aFFVRnFRaXhIUVVGcFF5eFZRVUZWVEN4TFFVRldMRVZCUVdsQ2NFWXNUVUZCYWtJc1JVRkJlVUkwUkN4UlFVRjZRaXhGUVVGdFF6dEJRVU5zUlRCQ0xHVkJRV0VzU1VGQllpeEZRVUZ0UWtZc1MwRkJia0lzUlVGQk1FSndSaXhOUVVFeFFpeEZRVUZyUXl4TFFVRnNReXhGUVVGNVF6UkVMRkZCUVhwRE8wRkJRMFFzUTBGR1JEczdRVUZKUVN4VFFVRlRPRUlzV1VGQlZDeERRVUYxUW5KSkxFZEJRWFpDTEVWQlFUUkNLMGdzUzBGQk5VSXNSVUZCYlVOd1JpeE5RVUZ1UXl4RlFVRXlRemhFTEZsQlFUTkRMRVZCUVhsRVJpeFJRVUY2UkN4RlFVRnRSVHRCUVVOcVJTeE5RVUZKTEVOQlFVTkJMRkZCUVV3c1JVRkJaVHRCUVVOaWJrVXNWMEZCVHpKR0xGVkJRVlZ1Unl4VFFVRldMRWxCUVhWQ2JVY3NWVUZCVlN4SlFVRjRReXhGUVVFNFF5eGxRVUU1UXp0QlFVTkJNMFlzVjBGQlR5eFBRVUZQY1VVc1dVRkJVQ3hMUVVGM1FpeFRRVUV2UWl4RlFVRXdReXd5UWtGQk1VTTdRVUZEUVhKRkxGZEJRVTlQTEZkQlFWZG1MRk5CUVZnc1NVRkJkMEpsTEZkQlFWY3NTVUZCTVVNc1JVRkJaMFFzWjBKQlFXaEVPMEZCUTBGUUxGZEJRVTlQTEZOQlFWTXNRMEZCVkN4SFFVRmhNME1zU1VGQlNWa3NUVUZCZUVJc1JVRkJaME1zYzBOQlFXaERPMEZCUTBGdlNDeGpRVUZWUkN4TFFVRldMRVZCUVdsQ0xGVkJRV3BDTzBGQlEwUTdPMEZCUlVRc1RVRkJTVFZETEUxQlFVMXVSaXhKUVVGSldTeE5RVUZrTzBGQlEwRXNUVUZCU1N0Q0xGVkJRVlYzUXl4SFFVRmtMRVZCUTBVN08wRkJSVVlzVDBGQlN5eEpRVUZKYWtVc1NVRkJTU3hEUVVGU0xFVkJRVmRuU0N4SlFVRkpNME1zUzBGQlMwTXNSMEZCVEN4RFFVRlRUQ3hOUVVGTmVFTXNUVUZCWml4RlFVRjFRaXhEUVVGMlFpeERRVUZ3UWl4RlFVRXJRM3BDTEVsQlFVbG5TQ3hEUVVGdVJDeEZRVUZ6UkdoSUxFZEJRWFJFTEVWQlFUSkVPMEZCUTNwRWJFSXNVVUZCU1RKRExGTkJRVk42UWl4RFFVRmlMRWxCUTBzMlJ5eFZRVUZWTEVOQlFVTjBRaXhsUVVGbGRrWXNRMEZCWml4SFFVRnRRaXhKUVVGSlFTeERRVUY0UWl4SlFVRTJRaXhEUVVGNFF5eEhRVUUyUXl4SlFVUnFSRHRCUVVWRU8wRkJRMFk3TzBGQlJVUjJRaXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRbmxGTEdGQlFXcENMRWRCUVdsRExGVkJRVlZRTEV0QlFWWXNSVUZCYVVKd1JpeE5RVUZxUWl4RlFVRjVRalJFTEZGQlFYcENMRVZCUVcxRE8wRkJRMnhGT0VJc1pVRkJZU3hKUVVGaUxFVkJRVzFDVGl4TFFVRnVRaXhGUVVFd1FuQkdMRTFCUVRGQ0xFVkJRV3RETEVsQlFXeERMRVZCUVhkRE5FUXNVVUZCZUVNN1FVRkRSQ3hEUVVaRU96dEJRVWxCTlVjc1QwRkJUMnRGTEZOQlFWQXNRMEZCYVVJd1JTeGhRVUZxUWl4SFFVRnBReXhWUVVGVlVpeExRVUZXTEVWQlFXbENjRVlzVFVGQmFrSXNSVUZCZVVJMFJDeFJRVUY2UWl4RlFVRnRRenRCUVVOc1JUaENMR1ZCUVdFc1NVRkJZaXhGUVVGdFFrNHNTMEZCYmtJc1JVRkJNRUp3Uml4TlFVRXhRaXhGUVVGclF5eExRVUZzUXl4RlFVRjVRelJFTEZGQlFYcERPMEZCUTBRc1EwRkdSRHM3UVVGSlFUVkhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENNa1VzVTBGQmFrSXNSMEZCTmtJc1ZVRkJWVlFzUzBGQlZpeEZRVUZwUW5CR0xFMUJRV3BDTEVWQlFYbENORVFzVVVGQmVrSXNSVUZCYlVNN1FVRkRPVVFzVFVGQlNTeERRVUZEUVN4UlFVRk1MRVZCUVdVN1FVRkRZbTVGTEZkQlFVOHlSaXhWUVVGVmJrY3NVMEZCVml4SlFVRjFRbTFITEZWQlFWVXNTVUZCZUVNc1JVRkJPRU1zWlVGQk9VTTdRVUZEUVROR0xGZEJRVTlQTEZkQlFWZG1MRk5CUVZnc1NVRkJkMEpsTEZkQlFWY3NTVUZCTVVNc1JVRkJaMFFzWjBKQlFXaEVPMEZCUTBGUUxGZEJRVTlQTEZOQlFWTXNTMEZCU3k5Q0xFMUJRWEpDTEVWQlFUWkNMSE5EUVVFM1FqdEJRVU5CTmtnc1kwRkJWVllzUzBGQlZpeEZRVUZwUWl4SlFVRnFRaXhGUVVGMVFpeERRVUZETEVsQlFYaENPMEZCUTBRN08wRkJSVVFzVFVGQlNYQkdMRlZCUVZVc1MwRkJTeTlDTEUxQlFXNUNMRVZCUTBVN08wRkJSVVlzVFVGQlNXMUlMRk5CUVZNc1EwRkJZaXhGUVVORkxFdEJRVXQ2UWl4VlFVRk1MRU5CUVdkQ2VVSXNTMEZCYUVJc1JVRkJkVUp3Uml4TlFVRjJRaXhGUVVFclFqUkVMRkZCUVM5Q0xFVkJSRVlzUzBGSFJTeExRVUZMUkN4VlFVRk1MRU5CUVdkQ0xFOUJRVTk1UWl4TFFVRlFMRWRCUVdVc1EwRkJMMElzUlVGQmEwTndSaXhOUVVGc1F5eEZRVUV3UXpSRUxGRkJRVEZETzBGQlEwZ3NRMEZtUkRzN1FVRnBRa0VzVTBGQlUyMURMRmRCUVZRc1EwRkJjMEl4U1N4SFFVRjBRaXhGUVVFeVFpdElMRXRCUVROQ0xFVkJRV3REY0VZc1RVRkJiRU1zUlVGQk1FTTRSQ3haUVVFeFF5eEZRVUYzUkVZc1VVRkJlRVFzUlVGQmEwVTdRVUZEYUVVc1RVRkJTU3hEUVVGRFFTeFJRVUZNTEVWQlFXVTdRVUZEWW01RkxGZEJRVTh5Uml4VlFVRlZia2NzVTBGQlZpeEpRVUYxUW0xSExGVkJRVlVzU1VGQmVFTXNSVUZCT0VNc1pVRkJPVU03UVVGRFFUTkdMRmRCUVU4c1QwRkJUM0ZGTEZsQlFWQXNTMEZCZDBJc1UwRkJMMElzUlVGQk1FTXNNa0pCUVRGRE8wRkJRMEZ5UlN4WFFVRlBUeXhYUVVGWFppeFRRVUZZTEVsQlFYZENaU3hYUVVGWExFbEJRVEZETEVWQlFXZEVMR2RDUVVGb1JEdEJRVU5CVUN4WFFVRlBUeXhUUVVGVExFTkJRVlFzUjBGQllUTkRMRWxCUVVsWkxFMUJRWGhDTEVWQlFXZERMSE5EUVVGb1F6dEJRVU5CTmtnc1kwRkJWVllzUzBGQlZpeEZRVUZwUWl4TlFVRnFRaXhGUVVGNVFpeERRVUZETEUxQlFURkNPMEZCUTBRN08wRkJSVVFzVFVGQlNUVkRMRTFCUVUxdVJpeEpRVUZKV1N4TlFVRmtPMEZCUTBFc1RVRkJTU3RDTEZWQlFWVjNReXhIUVVGa0xFVkJRMFU3TzBGQlJVWXNUVUZCU1RSRExGTkJRVk1zUTBGQllpeEZRVU5GUlN4aFFVRmhha2tzUjBGQllpeEZRVUZyUWl0SUxFdEJRV3hDTEVWQlFYbENjRVlzVFVGQmVrSXNSVUZCYVVNNFJDeFpRVUZxUXl4RlFVRXJRMFlzVVVGQkwwTXNSVUZFUml4TFFVZEZNRUlzWVVGQllXcEpMRWRCUVdJc1JVRkJhMElzVTBGQlV5dElMRXRCUVZRc1IwRkJhVUlzUTBGQmJrTXNSVUZCYzBOd1JpeE5RVUYwUXl4RlFVRTRRemhFTEZsQlFUbERMRVZCUVRSRVJpeFJRVUUxUkR0QlFVTklPenRCUVVWRU5VY3NUMEZCVDJ0RkxGTkJRVkFzUTBGQmFVSTRSU3haUVVGcVFpeEhRVUZuUXl4VlFVRlZXaXhMUVVGV0xFVkJRV2xDY0VZc1RVRkJha0lzUlVGQmVVSTBSQ3hSUVVGNlFpeEZRVUZ0UXp0QlFVTnFSVzFETEdOQlFWa3NTVUZCV2l4RlFVRnJRbGdzUzBGQmJFSXNSVUZCZVVKd1JpeE5RVUY2UWl4RlFVRnBReXhKUVVGcVF5eEZRVUYxUXpSRUxGRkJRWFpETzBGQlEwUXNRMEZHUkRzN1FVRkpRVFZITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDSzBVc1dVRkJha0lzUjBGQlowTXNWVUZCVldJc1MwRkJWaXhGUVVGcFFuQkdMRTFCUVdwQ0xFVkJRWGxDTkVRc1VVRkJla0lzUlVGQmJVTTdRVUZEYWtWdFF5eGpRVUZaTEVsQlFWb3NSVUZCYTBKWUxFdEJRV3hDTEVWQlFYbENjRVlzVFVGQmVrSXNSVUZCYVVNc1MwRkJha01zUlVGQmQwTTBSQ3hSUVVGNFF6dEJRVU5FTEVOQlJrUTdPMEZCU1VFc1UwRkJVM05ETEZkQlFWUXNRMEZCYzBJM1NTeEhRVUYwUWl4RlFVRXlRaXRJTEV0QlFUTkNMRVZCUVd0RGNFWXNUVUZCYkVNc1JVRkJNRU00UkN4WlFVRXhReXhGUVVGM1JFWXNVVUZCZUVRc1JVRkJhMFU3UVVGRGFFVXNUVUZCU1N4RFFVRkRRU3hSUVVGTUxFVkJRV1U3UVVGRFltNUZMRmRCUVU4eVJpeFZRVUZWYmtjc1UwRkJWaXhKUVVGMVFtMUhMRlZCUVZVc1NVRkJlRU1zUlVGQk9FTXNaVUZCT1VNN1FVRkRRVE5HTEZkQlFVOHNUMEZCVDNGRkxGbEJRVkFzUzBGQmQwSXNVMEZCTDBJc1JVRkJNRU1zTWtKQlFURkRPMEZCUTBGeVJTeFhRVUZQVHl4WFFVRlhaaXhUUVVGWUxFbEJRWGRDWlN4WFFVRlhMRWxCUVRGRExFVkJRV2RFTEdkQ1FVRm9SRHRCUVVOQlVDeFhRVUZQVHl4VFFVRlRMRU5CUVZRc1IwRkJZVE5ETEVsQlFVbFpMRTFCUVhoQ0xFVkJRV2RETEhORFFVRm9RenRCUVVOQk5rZ3NZMEZCVlZZc1MwRkJWaXhGUVVGcFFpeFZRVUZxUWl4RlFVRTJRaXhEUVVGRExGVkJRVGxDTzBGQlEwUTdPMEZCUlVRc1RVRkJTVFZETEUxQlFVMXVSaXhKUVVGSldTeE5RVUZrTzBGQlEwRXNUVUZCU1N0Q0xGVkJRVlYzUXl4SFFVRmtMRVZCUTBVN08wRkJSVVlzVFVGQlNUUkRMRk5CUVZNc1EwRkJZaXhGUVVORlRTeGhRVUZoY2trc1IwRkJZaXhGUVVGclFpdElMRXRCUVd4Q0xFVkJRWGxDY0VZc1RVRkJla0lzUlVGQmFVTTRSQ3haUVVGcVF5eEZRVUVyUTBZc1VVRkJMME1zUlVGRVJpeExRVWRGT0VJc1lVRkJZWEpKTEVkQlFXSXNSVUZCYTBJc1lVRkJZU3RJTEV0QlFXSXNSMEZCY1VJc1EwRkJka01zUlVGQk1FTndSaXhOUVVFeFF5eEZRVUZyUkRoRUxGbEJRV3hFTEVWQlFXZEZSaXhSUVVGb1JUdEJRVU5JT3p0QlFVVkVOVWNzVDBGQlQydEZMRk5CUVZBc1EwRkJhVUpwUml4WlFVRnFRaXhIUVVGblF5eFZRVUZWWml4TFFVRldMRVZCUVdsQ2NFWXNUVUZCYWtJc1JVRkJlVUkwUkN4UlFVRjZRaXhGUVVGdFF6dEJRVU5xUlhORExHTkJRVmtzU1VGQldpeEZRVUZyUW1Rc1MwRkJiRUlzUlVGQmVVSndSaXhOUVVGNlFpeEZRVUZwUXl4SlFVRnFReXhGUVVGMVF6UkVMRkZCUVhaRE8wRkJRMFFzUTBGR1JEczdRVUZKUVRWSExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ2EwWXNXVUZCYWtJc1IwRkJaME1zVlVGQlZXaENMRXRCUVZZc1JVRkJhVUp3Uml4TlFVRnFRaXhGUVVGNVFqUkVMRkZCUVhwQ0xFVkJRVzFETzBGQlEycEZjME1zWTBGQldTeEpRVUZhTEVWQlFXdENaQ3hMUVVGc1FpeEZRVUY1UW5CR0xFMUJRWHBDTEVWQlFXbERMRXRCUVdwRExFVkJRWGRETkVRc1VVRkJlRU03UVVGRFJDeERRVVpFT3p0QlFVbEJMRk5CUVZONVF5eFhRVUZVTEVOQlFYTkNhRW9zUjBGQmRFSXNSVUZCTWtJclNDeExRVUV6UWl4RlFVRnJRM0JHTEUxQlFXeERMRVZCUVRCRE9FUXNXVUZCTVVNc1JVRkJkMFJHTEZGQlFYaEVMRVZCUVd0Rk8wRkJRMmhGTEUxQlFVa3NRMEZCUTBFc1VVRkJUQ3hGUVVGbE8wRkJRMkp1UlN4WFFVRlBNa1lzVlVGQlZXNUhMRk5CUVZZc1NVRkJkVUp0Unl4VlFVRlZMRWxCUVhoRExFVkJRVGhETEdWQlFUbERPMEZCUTBFelJpeFhRVUZQTEU5QlFVOXhSU3haUVVGUUxFdEJRWGRDTEZOQlFTOUNMRVZCUVRCRExESkNRVUV4UXp0QlFVTkJja1VzVjBGQlQwOHNWMEZCVjJZc1UwRkJXQ3hKUVVGM1FtVXNWMEZCVnl4SlFVRXhReXhGUVVGblJDeG5Ra0ZCYUVRN1FVRkRRVkFzVjBGQlQwOHNVMEZCVXl4RFFVRlVMRWRCUVdFelF5eEpRVUZKV1N4TlFVRjRRaXhGUVVGblF5eHpRMEZCYUVNN1FVRkRRWEZKTEdsQ1FVRmhiRUlzUzBGQllpeEZRVUZ2UWl4elFrRkJjRUlzUlVGQk5FTXNRMEZCUXl4elFrRkJOME03UVVGRFJEczdRVUZGUkN4TlFVRkpOVU1zVFVGQlRXNUdMRWxCUVVsWkxFMUJRV1E3UVVGRFFTeE5RVUZKSzBJc1ZVRkJWWGRETEVkQlFXUXNSVUZEUlRzN1FVRkZSakZHTEZWQlFWRTRRaXhMUVVGU0xFTkJRV04yUWl4SFFVRmtMRVZCUVcxQ0swZ3NTMEZCYmtJc1JVRkJNRUp3Uml4TlFVRXhRaXhGUVVGclF6aEVMRmxCUVd4RExFVkJRV2RFTEVWQlFXaEVMRVZCUVc5RUxFTkJRWEJFTzBGQlEwUTdPMEZCUlVRNVJ5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFuRkdMRmxCUVdwQ0xFZEJRV2RETEZWQlFWVnVRaXhMUVVGV0xFVkJRV2xDY0VZc1RVRkJha0lzUlVGQmVVSTBSQ3hSUVVGNlFpeEZRVUZ0UXp0QlFVTnFSWGxETEdOQlFWa3NTVUZCV2l4RlFVRnJRbXBDTEV0QlFXeENMRVZCUVhsQ2NFWXNUVUZCZWtJc1JVRkJhVU1zU1VGQmFrTXNSVUZCZFVNMFJDeFJRVUYyUXp0QlFVTkVMRU5CUmtRN08wRkJTVUUxUnl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW5OR0xGbEJRV3BDTEVkQlFXZERMRlZCUVZWd1FpeExRVUZXTEVWQlFXbENjRVlzVFVGQmFrSXNSVUZCZVVJMFJDeFJRVUY2UWl4RlFVRnRRenRCUVVOcVJYbERMR05CUVZrc1NVRkJXaXhGUVVGclFtcENMRXRCUVd4Q0xFVkJRWGxDY0VZc1RVRkJla0lzUlVGQmFVTXNTMEZCYWtNc1JVRkJkME0wUkN4UlFVRjRRenRCUVVORUxFTkJSa1E3TzBGQlNVRXNVMEZCVXpaRExGbEJRVlFzUTBGQmRVSndTaXhIUVVGMlFpeEZRVUUwUWl0SUxFdEJRVFZDTEVWQlFXMURjRVlzVFVGQmJrTXNSVUZCTWtNNFJDeFpRVUV6UXl4RlFVRjVSRVlzVVVGQmVrUXNSVUZCYlVVN1FVRkRha1VzVFVGQlNTeERRVUZEUVN4UlFVRk1MRVZCUVdVN1FVRkRZbTVGTEZkQlFVOHlSaXhWUVVGVmJrY3NVMEZCVml4SlFVRjFRbTFITEZWQlFWVXNTVUZCZUVNc1JVRkJPRU1zWlVGQk9VTTdRVUZEUVROR0xGZEJRVThzVDBGQlQzRkZMRmxCUVZBc1MwRkJkMElzVTBGQkwwSXNSVUZCTUVNc01rSkJRVEZETzBGQlEwRnlSU3hYUVVGUFR5eFhRVUZYWml4VFFVRllMRWxCUVhkQ1pTeFhRVUZYTEVsQlFURkRMRVZCUVdkRUxHZENRVUZvUkR0QlFVTkJVQ3hYUVVGUFR5eFRRVUZUTEVOQlFWUXNSMEZCWVRORExFbEJRVWxaTEUxQlFYaENMRVZCUTBrc2MwTkJSRW83UVVGRlFYRkpMR2xDUVVGaGJFSXNTMEZCWWl4RlFVRnZRaXgxUWtGQmNFSXNSVUZCTmtNc1EwRkJReXgxUWtGQk9VTTdRVUZEUkRzN1FVRkZSQ3hOUVVGSk5VTXNUVUZCVFc1R0xFbEJRVWxaTEUxQlFXUTdRVUZEUVN4TlFVRkpLMElzVlVGQlZYZERMRWRCUVdRc1JVRkRSVHM3UVVGRlJqRkdMRlZCUVZFNFFpeExRVUZTTEVOQlFXTjJRaXhIUVVGa0xFVkJRVzFDSzBnc1MwRkJia0lzUlVGQk1FSndSaXhOUVVFeFFpeEZRVUZyUXpoRUxGbEJRV3hETEVWQlFXZEVMRVZCUVdoRUxFVkJRVzlFTEVOQlFYQkVPMEZCUTBRN08wRkJSVVE1Unl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW5kR0xHRkJRV3BDTEVkQlFXbERMRlZCUVZWMFFpeExRVUZXTEVWQlFXbENjRVlzVFVGQmFrSXNSVUZCZVVJMFJDeFJRVUY2UWl4RlFVRnRRenRCUVVOc1JUWkRMR1ZCUVdFc1NVRkJZaXhGUVVGdFFuSkNMRXRCUVc1Q0xFVkJRVEJDY0VZc1RVRkJNVUlzUlVGQmEwTXNTVUZCYkVNc1JVRkJkME0wUkN4UlFVRjRRenRCUVVORUxFTkJSa1E3TzBGQlNVRTFSeXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRbmxHTEdGQlFXcENMRWRCUVdsRExGVkJRVlYyUWl4TFFVRldMRVZCUVdsQ2NFWXNUVUZCYWtJc1JVRkJlVUkwUkN4UlFVRjZRaXhGUVVGdFF6dEJRVU5zUlRaRExHVkJRV0VzU1VGQllpeEZRVUZ0UW5KQ0xFdEJRVzVDTEVWQlFUQkNjRVlzVFVGQk1VSXNSVUZCYTBNc1MwRkJiRU1zUlVGQmVVTTBSQ3hSUVVGNlF6dEJRVU5FTEVOQlJrUTdPMEZCU1VFN1FVRkRRVFZITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDTUVZc1NVRkJha0lzUjBGQmQwSXNWVUZCVlhoQ0xFdEJRVllzUlVGQmFVSTVSQ3hMUVVGcVFpeEZRVUYzUWtNc1IwRkJlRUlzUlVGQk5rSTdRVUZEYmtRc1RVRkJTU3hEUVVGRE5rUXNTMEZCVEN4RlFVRlpRU3hSUVVGUkxFTkJRVkk3UVVGRFdpeE5RVUZKTEVOQlFVTTVSQ3hMUVVGTUxFVkJRVmxCTEZGQlFWRXNRMEZCVWp0QlFVTmFMRTFCUVVrc1EwRkJRME1zUjBGQlRDeEZRVUZWUVN4TlFVRk5MRXRCUVV0MFJDeE5RVUZZT3p0QlFVVldMRTFCUVVrc1QwRkJUMjFJTEV0QlFWQXNTMEZCYVVJc1VVRkJja0lzUlVGQkswSTdRVUZETjBKQkxGbEJRVkZCTEUxQlFVMTVRaXhWUVVGT0xFTkJRV2xDTEVOQlFXcENMRU5CUVZJN1FVRkRSRHM3UVVGRlJIQklMRk5CUVU4c1QwRkJUekpHTEV0QlFWQXNTMEZCYVVJc1VVRkJha0lzU1VGQk5rSXNRMEZCUXpkRkxFMUJRVTAyUlN4TFFVRk9MRU5CUVhKRExFVkJRVzFFTEhWQ1FVRnVSRHRCUVVOQk0wWXNVMEZCVHpoQ0xFOUJRVTlFTEV0QlFXUXNSVUZCY1VJc1lVRkJja0k3TzBGQlJVRTdRVUZEUVN4TlFVRkpReXhSUVVGUlJDeExRVUZhTEVWQlFXMUNPMEZCUTI1Q0xFMUJRVWtzUzBGQlMzSkVMRTFCUVV3c1MwRkJaMElzUTBGQmNFSXNSVUZCZFVJN08wRkJSWFpDZDBJc1UwRkJUelpDTEZOQlFWTXNRMEZCVkN4SlFVRmpRU3hSUVVGUkxFdEJRVXR5UkN4TlFVRnNReXhGUVVFd1F5eHhRa0ZCTVVNN1FVRkRRWGRDTEZOQlFVODRRaXhQUVVGUExFTkJRVkFzU1VGQldVRXNUMEZCVHl4TFFVRkxkRVFzVFVGQkwwSXNSVUZCZFVNc2JVSkJRWFpET3p0QlFVVkJMRTlCUVVzc1NVRkJTVTBzU1VGQlNTdERMRXRCUVdJc1JVRkJiMEl2UXl4SlFVRkpaMFFzUjBGQmVFSXNSVUZCTmtKb1JDeEhRVUUzUWl4RlFVRnJRenRCUVVOb1F5eFRRVUZMUVN4RFFVRk1MRWxCUVZVMlJ5eExRVUZXTzBGQlEwUTdRVUZEUml4RFFYUkNSRHM3UVVGM1FrRndTU3hQUVVGUGEwVXNVMEZCVUN4RFFVRnBRalJHTEU5QlFXcENMRWRCUVRKQ0xGbEJRVms3UVVGRGNrTXNUVUZCU1RsRUxFMUJRVTBzUlVGQlZqdEJRVU5CTEUxQlFVbFNMRTFCUVUwc1MwRkJTM1pGTEUxQlFXWTdRVUZEUVN4UFFVRkxMRWxCUVVsTkxFbEJRVWtzUTBGQllpeEZRVUZuUWtFc1NVRkJTV2xGTEVkQlFYQkNMRVZCUVhsQ2FrVXNSMEZCZWtJc1JVRkJPRUk3UVVGRE5VSjVSU3hSUVVGSmVrVXNRMEZCU2l4SlFVRlRNRVVzVFVGQlRTeExRVUZMTVVVc1EwRkJUQ3hEUVVGT0xFTkJRVlE3UVVGRFFTeFJRVUZKUVN4TlFVRk5lRUlzVVVGQlVVY3NhVUpCUVd4Q0xFVkJRWEZETzBGQlEyNURPRVlzVlVGQlNYcEZMRWxCUVVrc1EwRkJVaXhKUVVGaExFdEJRV0k3UVVGRFFUdEJRVU5FTzBGQlEwWTdRVUZEUkN4VFFVRlBMR0ZCUVdGNVJTeEpRVUZKSzBRc1NVRkJTaXhEUVVGVExFZEJRVlFzUTBGQllpeEhRVUUyUWl4SFFVRndRenRCUVVORUxFTkJXRVE3TzBGQllVRTdPenM3UVVGSlFTOUtMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENPRVlzWVVGQmFrSXNSMEZCYVVNc1dVRkJXVHRCUVVNelF5eE5RVUZKTEU5QlFVOTRTaXhWUVVGUUxFdEJRWE5DTEZkQlFURkNMRVZCUVhWRE8wRkJRM0pETEZGQlFVbFNMRTlCUVU5SkxHVkJRVmdzUlVGQk5FSTdRVUZETVVJc1lVRkJVU3hKUVVGSlNpeE5RVUZLTEVOQlFWY3NTVUZCV0N4RFFVRkVMRU5CUVcxQ2FVc3NUVUZCTVVJN1FVRkRSQ3hMUVVaRUxFMUJSVTg3UVVGRFRDeFZRVUZKTlVvc1RVRkJUU3hKUVVGSlJ5eFZRVUZLTEVOQlFXVXNTMEZCUzFNc1RVRkJjRUlzUTBGQlZqdEJRVU5CTEZkQlFVc3NTVUZCU1Uwc1NVRkJTU3hEUVVGU0xFVkJRVmRwUlN4TlFVRk5ia1lzU1VGQlNWa3NUVUZCTVVJc1JVRkJhME5OTEVsQlFVbHBSU3hIUVVGMFF5eEZRVUV5UTJwRkxFdEJRVXNzUTBGQmFFUTdRVUZEUld4Q0xGbEJRVWxyUWl4RFFVRktMRWxCUVZNc1MwRkJTMEVzUTBGQlRDeERRVUZVTzBGQlJFWXNUMEZGUVN4UFFVRlBiRUlzU1VGQlNUUktMRTFCUVZnN1FVRkRSRHRCUVVOR0xFZEJWRVFzVFVGVFR6dEJRVU5NTEZWQlFVMHNTVUZCU1RkSkxFdEJRVW9zUTBGQlZTeHZSRUZCVml4RFFVRk9PMEZCUTBRN1FVRkRSaXhEUVdKRU96dEJRV1ZCTzBGQlEwRTdPMEZCUlVFc1UwRkJVMG9zVlVGQlZDeERRVUZ4UW10Q0xFZEJRWEpDTEVWQlFUQkNPMEZCUTNoQ0xFMUJRVWxCTEVsQlFVbG5TU3hKUVVGU0xFVkJRV01zVDBGQlQyaEpMRWxCUVVsblNTeEpRVUZLTEVWQlFWQTdRVUZEWkN4VFFVRlBhRWtzU1VGQlNXbEpMRTlCUVVvc1EwRkJXU3haUVVGYUxFVkJRVEJDTEVWQlFURkNMRU5CUVZBN1FVRkRSRHM3UVVGRlJDeEpRVUZKUXl4TFFVRkxjRXNzVDBGQlQydEZMRk5CUVdoQ096dEJRVVZCT3pzN1FVRkhRV3hGTEU5QlFVOXhRaXhSUVVGUUxFZEJRV3RDTEZWQlFWVmtMRWRCUVZZc1JVRkJaVHRCUVVNdlFrRXNUVUZCU1dVc1UwRkJTaXhIUVVGblFpeEpRVUZvUWpzN1FVRkZRVHRCUVVOQlppeE5RVUZKT0Vvc1NVRkJTaXhIUVVGWE9Vb3NTVUZCU1N0R0xFZEJRV1k3UVVGRFFTOUdMRTFCUVVscFFpeEpRVUZLTEVkQlFWZHFRaXhKUVVGSmEwY3NSMEZCWmpzN1FVRkZRVHRCUVVOQmJFY3NUVUZCU1N0R0xFZEJRVW9zUjBGQlZUaEVMRWRCUVVjNVJDeEhRVUZpTzBGQlEwRXZSaXhOUVVGSmEwY3NSMEZCU2l4SFFVRlZNa1FzUjBGQlJ6TkVMRWRCUVdJN08wRkJSVUZzUnl4TlFVRkpjVUlzUzBGQlNpeEhRVUZaZDBrc1IwRkJSM2hKTEV0QlFXWTdRVUZEUVhKQ0xFMUJRVWs0UkN4UlFVRktMRWRCUVdVclJpeEhRVUZITDBZc1VVRkJiRUk3UVVGRFFUbEVMRTFCUVVrclNpeGpRVUZLTEVkQlFYRkNSaXhIUVVGSEwwWXNVVUZCZUVJN1FVRkRRVGxFTEUxQlFVbDNSU3hOUVVGS0xFZEJRV0Z4Uml4SFFVRkhja1lzVFVGQmFFSTdRVUZEUVhoRkxFMUJRVWx6UXl4SlFVRktMRWRCUVZkMVNDeEhRVUZIZGtnc1NVRkJaRHRCUVVOQmRFTXNUVUZCU1RKRkxFdEJRVW9zUjBGQldXdEdMRWRCUVVkc1JpeExRVUZtTzBGQlEwRXpSU3hOUVVGSmIwSXNVMEZCU2l4SFFVRm5RbmxKTEVkQlFVZDZTU3hUUVVGdVFqdEJRVU5CY0VJc1RVRkJTWGxITEZsQlFVb3NSMEZCYlVKdlJDeEhRVUZIY0VRc1dVRkJkRUk3UVVGRFFYcEhMRTFCUVVrd1J5eFpRVUZLTEVkQlFXMUNiVVFzUjBGQlIyNUVMRmxCUVhSQ08wRkJRMEV4Unl4TlFVRkpORWNzV1VGQlNpeEhRVUZ0UW1sRUxFZEJRVWRxUkN4WlFVRjBRanRCUVVOQk5VY3NUVUZCU1RaSExGbEJRVW9zUjBGQmJVSm5SQ3hIUVVGSGFFUXNXVUZCZEVJN1FVRkRRVGRITEUxQlFVazRSeXhSUVVGS0xFZEJRV1VyUXl4SFFVRkhMME1zVVVGQmJFSTdRVUZEUVRsSExFMUJRVWxwU0N4WFFVRktMRWRCUVd0Q05FTXNSMEZCUnpWRExGZEJRWEpDTzBGQlEwRnFTQ3hOUVVGSmEwZ3NWMEZCU2l4SFFVRnJRakpETEVkQlFVY3pReXhYUVVGeVFqdEJRVU5CYkVnc1RVRkJTVzlJTEZkQlFVb3NSMEZCYTBKNVF5eEhRVUZIZWtNc1YwRkJja0k3UVVGRFFYQklMRTFCUVVseFNDeFhRVUZLTEVkQlFXdENkME1zUjBGQlIzaERMRmRCUVhKQ08wRkJRMEZ5U0N4TlFVRkpkMGdzVjBGQlNpeEhRVUZyUW5GRExFZEJRVWR5UXl4WFFVRnlRanRCUVVOQmVFZ3NUVUZCU1hsSUxGZEJRVW9zUjBGQmEwSnZReXhIUVVGSGNFTXNWMEZCY2tJN1FVRkRRWHBJTEUxQlFVa3lTQ3haUVVGS0xFZEJRVzFDYTBNc1IwRkJSMnhETEZsQlFYUkNPMEZCUTBFelNDeE5RVUZKTkVnc1dVRkJTaXhIUVVGdFFtbERMRWRCUVVkcVF5eFpRVUYwUWp0QlFVTkJOVWdzVFVGQlNXOUhMRlZCUVVvc1IwRkJhVUo1UkN4SFFVRkhla1FzVlVGQmNFSTdRVUZEUVhCSExFMUJRVWxwU1N4aFFVRktMRWRCUVc5Q05FSXNSMEZCUnpWQ0xHRkJRWFpDTzBGQlEwRnFTU3hOUVVGSmEwa3NZVUZCU2l4SFFVRnZRakpDTEVkQlFVY3pRaXhoUVVGMlFqdEJRVU5CYkVrc1RVRkJTVzlKTEdGQlFVb3NSMEZCYjBKNVFpeEhRVUZIZWtJc1lVRkJka0k3UVVGRFFYQkpMRTFCUVVseFNTeGhRVUZLTEVkQlFXOUNkMElzUjBGQlIzaENMR0ZCUVhaQ08wRkJRMEZ5U1N4TlFVRkpjMGtzVTBGQlNpeEhRVUZuUW5WQ0xFZEJRVWQyUWl4VFFVRnVRanRCUVVOQmRFa3NUVUZCU1hsSkxGbEJRVW9zUjBGQmJVSnZRaXhIUVVGSGNFSXNXVUZCZEVJN1FVRkRRWHBKTEUxQlFVa3dTU3haUVVGS0xFZEJRVzFDYlVJc1IwRkJSMjVDTEZsQlFYUkNPMEZCUTBFeFNTeE5RVUZKTkVrc1dVRkJTaXhIUVVGdFFtbENMRWRCUVVkcVFpeFpRVUYwUWp0QlFVTkJOVWtzVFVGQlNUWkpMRmxCUVVvc1IwRkJiVUpuUWl4SFFVRkhhRUlzV1VGQmRFSTdRVUZEUVRkSkxFMUJRVWxuU2l4WlFVRktMRWRCUVcxQ1lTeEhRVUZIWWl4WlFVRjBRanRCUVVOQmFFb3NUVUZCU1dsS0xGbEJRVW9zUjBGQmJVSlpMRWRCUVVkYUxGbEJRWFJDTzBGQlEwRnFTaXhOUVVGSmJVb3NZVUZCU2l4SFFVRnZRbFVzUjBGQlIxWXNZVUZCZGtJN1FVRkRRVzVLTEUxQlFVbHZTaXhoUVVGS0xFZEJRVzlDVXl4SFFVRkhWQ3hoUVVGMlFqdEJRVU5CY0Vvc1RVRkJTWEZLTEVsQlFVb3NSMEZCVjFFc1IwRkJSMUlzU1VGQlpEdEJRVU5CY2tvc1RVRkJTWFZLTEU5QlFVb3NSMEZCWTAwc1IwRkJSMDRzVDBGQmFrSTdRVUZEUVhaS0xFMUJRVWw1U2l4aFFVRktMRWRCUVc5Q1NTeEhRVUZIU2l4aFFVRjJRanM3UVVGRlFTeFRRVUZQZWtvc1IwRkJVRHRCUVVORUxFTkJiRVJFT3p0QlFXOUVRVHRCUVVOQkxGTkJRVk0wUml4TFFVRlVMRU5CUVdkQ2IwVXNTMEZCYUVJc1JVRkJkVUl2UlN4SFFVRjJRaXhGUVVFMFFtZEdMRmxCUVRWQ0xFVkJRVEJETzBGQlEzaERMRTFCUVVrc1QwRkJUMFFzUzBGQlVDeExRVUZwUWl4UlFVRnlRaXhGUVVFclFpeFBRVUZQUXl4WlFVRlFPMEZCUXk5Q1JDeFZRVUZSTEVOQlFVTXNRMEZCUTBFc1MwRkJWaXhEUVVaM1F5eERRVVYwUWp0QlFVTnNRaXhOUVVGSlFTeFRRVUZUTDBVc1IwRkJZaXhGUVVGclFpeFBRVUZQUVN4SFFVRlFPMEZCUTJ4Q0xFMUJRVWtyUlN4VFFVRlRMRU5CUVdJc1JVRkJaMElzVDBGQlQwRXNTMEZCVUR0QlFVTm9Ra0VzVjBGQlV5OUZMRWRCUVZRN1FVRkRRU3hOUVVGSkswVXNVMEZCVXl4RFFVRmlMRVZCUVdkQ0xFOUJRVTlCTEV0QlFWQTdRVUZEYUVJc1UwRkJUeXhEUVVGUU8wRkJRMFE3TzBGQlJVUXNVMEZCVTNKS0xFMUJRVlFzUTBGQmFVSkVMRTFCUVdwQ0xFVkJRWGxDTzBGQlEzWkNPMEZCUTBFN1FVRkRRVHRCUVVOQlFTeFhRVUZUTEVOQlFVTXNRMEZCUXpKRkxFdEJRVXMyUlN4SlFVRk1MRU5CUVZVc1EwRkJRM2hLTEUxQlFWZ3NRMEZCV0R0QlFVTkJMRk5CUVU5QkxGTkJRVk1zUTBGQlZDeEhRVUZoTEVOQlFXSXNSMEZCYVVKQkxFMUJRWGhDTzBGQlEwUTdPMEZCUlVRc1UwRkJVM2xDTEU5QlFWUXNRMEZCYTBJNVFpeFBRVUZzUWl4RlFVRXlRanRCUVVONlFpeFRRVUZQTEVOQlFVTnhSU3hOUVVGTmRrTXNUMEZCVGl4SlFVRnBRaXhWUVVGVk9VSXNUMEZCVml4RlFVRnRRanRCUVVNeFF5eFhRVUZQT0Vvc1QwRkJUM2hITEZOQlFWQXNRMEZCYVVKSExGRkJRV3BDTEVOQlFUQkNZeXhKUVVFeFFpeERRVUVyUW5aRkxFOUJRUzlDTEUxQlFUUkRMR2RDUVVGdVJEdEJRVU5FTEVkQlJrMHNSVUZGU2tFc1QwRkdTU3hEUVVGUU8wRkJSMFE3TzBGQlJVUXNVMEZCVTJFc1ZVRkJWQ3hEUVVGeFFtSXNUMEZCY2tJc1JVRkJPRUk3UVVGRE5VSXNVMEZCVHpoQ0xGRkJRVkU1UWl4UFFVRlNMRXRCUVc5Q1dpeFBRVUZQTUVJc1VVRkJVQ3hEUVVGblFtUXNUMEZCYUVJc1EwRkJjRUlzU1VGRFNFRXNWMEZCVnl4UlFVRlBRU3hQUVVGUUxIbERRVUZQUVN4UFFVRlFMRTlCUVcxQ0xGRkJRVGxDTEVsQlEwRXNUMEZCVDBFc1VVRkJVVXNzVFVGQlppeExRVUV3UWl4UlFVWTVRanRCUVVkRU96dEJRVVZFTEZOQlFWTm5SaXhMUVVGVUxFTkJRV2RDTUVVc1EwRkJhRUlzUlVGQmJVSTdRVUZEYWtJc1RVRkJTVUVzU1VGQlNTeEZRVUZTTEVWQlFWa3NUMEZCVHl4TlFVRk5RU3hGUVVGRmRFY3NVVUZCUml4RFFVRlhMRVZCUVZnc1EwRkJZanRCUVVOYUxGTkJRVTl6Unl4RlFVRkZkRWNzVVVGQlJpeERRVUZYTEVWQlFWZ3NRMEZCVUR0QlFVTkVPenRCUVVWRUxGTkJRVk5xUXl4WFFVRlVMRU5CUVhOQ1JpeEhRVUYwUWl4RlFVRXlRanRCUVVONlFpeE5RVUZKTUVrc1dVRkJXU3hGUVVGb1FqdEJRVU5CTEU5QlFVc3NTVUZCU1hKS0xFbEJRVWtzUTBGQllpeEZRVUZuUWtFc1NVRkJTVmNzU1VGQlNXcENMRTFCUVhoQ0xFVkJRV2REVFN4SFFVRm9ReXhGUVVGeFF6dEJRVU51UXl4UlFVRkpVeXhKUVVGSlJTeEpRVUZKTWtnc1ZVRkJTaXhEUVVGbGRFa3NRMEZCWml4RFFVRlNPMEZCUTBFc1VVRkJTVk1zUzBGQlN5eEpRVUZVTEVWQlEwVTBTU3hWUVVGVlF5eEpRVUZXTEVOQlFXVXpTU3hKUVVGSk1rZ3NWVUZCU2l4RFFVRmxkRWtzUTBGQlppeERRVUZtTEVWQlJFWXNTMEZGU3p0QlFVTklMRlZCUVVrclF5eFJRVUZSTDBNc1EwRkJXanRCUVVOQkxGVkJRVWxUTEV0QlFVc3NUVUZCVEN4SlFVRmxRU3hMUVVGTExFMUJRWGhDTEVWQlFXZERWRHRCUVVOb1F5eFZRVUZKZFVvc1NVRkJTVU1zYlVKQlFXMUNOMGtzU1VGQlNXZEVMRXRCUVVvc1EwRkJWVm9zUzBGQlZpeEZRVUZwUWk5RExFbEJRVVVzUTBGQmJrSXNRMEZCYmtJc1JVRkJNRU1yUWl4TlFVRXhReXhEUVVGcFJDeERRVUZxUkN4RlFVRnZSREJJTEV0QlFYQkVMRU5CUVRCRUxFZEJRVEZFTEVOQlFWSTdRVUZEUVN4WFFVRkxMRWxCUVVsNlF5eEpRVUZKTEVOQlFXSXNSVUZCWjBKQkxFbEJRVWwxUXl4RlFVRkZOMG9zVFVGQmRFSXNSVUZCT0VKelNDeEhRVUU1UWp0QlFVTkZjVU1zYTBKQlFWVkRMRWxCUVZZc1EwRkJaWGhJTEZOQlFWTjVTQ3hGUVVGRmRrTXNRMEZCUml4RFFVRlVMRVZCUVdVc1JVRkJaaXhEUVVGbU8wRkJSRVk3UVVGRlJEdEJRVU5HTzBGQlEwUXNVMEZCVDNGRExGTkJRVkE3UVVGRFJEczdRVUZGUkN4VFFVRlRMMGNzV1VGQlZDeERRVUYxUWpOQ0xFZEJRWFpDTEVWQlFUUkNPMEZCUXpGQ0xFMUJRVWt3U1N4WlFVRlpMRVZCUVdoQ08wRkJRMEVzVDBGQlN5eEpRVUZKY2tvc1NVRkJTU3hEUVVGaUxFVkJRV2RDUVN4SlFVRkpWeXhKUVVGSmFrSXNUVUZCZUVJc1JVRkJaME5OTEVkQlFXaERMRVZCUVhGRE8wRkJRMjVETzBGQlEwRnhTaXhqUVVGVlF5eEpRVUZXTEVOQlFXVXpTU3hKUVVGSk1rZ3NWVUZCU2l4RFFVRmxkRWtzUTBGQlppeEpRVUZ2UWl4SlFVRnVRenRCUVVORU8wRkJRMFFzVTBGQlQzRktMRk5CUVZBN1FVRkRSRHM3UVVGRlJDeFRRVUZUTTBjc1kwRkJWQ3hEUVVGNVFpOUNMRWRCUVhwQ0xFVkJRVGhDTzBGQlF6VkNMRTFCUVVrclNTeERRVUZLTEVWQlFVOURMRVZCUVZBc1JVRkJWME1zUlVGQldEdEJRVU5CTEUxQlFVbFFMRmxCUVZrc1JVRkJhRUk3UVVGRFFTeFBRVUZMTEVsQlFVbHlTaXhKUVVGSkxFTkJRV0lzUlVGQlowSkJMRWxCUVVsWExFbEJRVWxxUWl4TlFVRjRRaXhGUVVGblEwMHNSMEZCYUVNc1JVRkJjVU03UVVGRGJrTXdTaXhSUVVGSkwwa3NTVUZCU1RKSUxGVkJRVW9zUTBGQlpYUkpMRU5CUVdZc1EwRkJTanRCUVVOQk1rb3NVMEZCUzBRc1MwRkJTeXhEUVVGV08wRkJRMEZGTEZOQlFVdEdMRWxCUVVrc1IwRkJWRHRCUVVOQlRDeGpRVUZWUXl4SlFVRldMRU5CUVdWTkxFVkJRV1k3UVVGRFFWQXNZMEZCVlVNc1NVRkJWaXhEUVVGbFN5eEZRVUZtTzBGQlEwUTdPMEZCUlVRc1UwRkJUMDRzVTBGQlVEdEJRVU5FT3p0QlFVVkVMRk5CUVZOMlNTeGhRVUZVTEVOQlFYZENTQ3hIUVVGNFFpeEZRVUUyUWp0QlFVTXpRaXhUUVVGUGRFTXNUMEZCVDNkTUxGZEJRVkFzUTBGQmJVSnNTaXhIUVVGdVFpeERRVUZRTzBGQlEwUTdPMEZCUlVRc1UwRkJVM2xDTEZWQlFWUXNRMEZCY1VJd1NDeEhRVUZ5UWl4RlFVRXdRa01zUjBGQk1VSXNSVUZCSzBKMFNTeE5RVUV2UWl4RlFVRjFReTlDTEUxQlFYWkRMRVZCUVN0RE8wRkJRemRETEUxQlFVa3dRaXhIUVVGS08wRkJRMEVzVDBGQlN5eEpRVUZKY0VJc1NVRkJTU3hEUVVGaUxFVkJRV2RDUVN4SlFVRkpUaXhOUVVGd1FpeEZRVUUwUWswc1IwRkJOVUlzUlVGQmFVTTdRVUZETDBJc1VVRkJTMEVzU1VGQlNYbENMRTFCUVVvc1NVRkJZM05KTEVsQlFVbHlTeXhOUVVGdVFpeEpRVUVyUWswc1MwRkJTemhLTEVsQlFVbHdTeXhOUVVFMVF5eEZRVU5GTzBGQlEwWnhTeXhSUVVGSkwwb3NTVUZCU1hsQ0xFMUJRVklzU1VGQmEwSnhTU3hKUVVGSk9Vb3NRMEZCU2l4RFFVRnNRanRCUVVORU8wRkJRMFFzVTBGQlQwRXNRMEZCVUR0QlFVTkVPenRCUVVWRUxGTkJRVk4xUlN4alFVRlVMRU5CUVhsQ05VUXNSMEZCZWtJc1JVRkJPRUk3UVVGRE5VSXNUVUZCU1R0QlFVTkdMRmRCUVU5eFNpeHRRa0ZCYlVKeVNpeEhRVUZ1UWl4RFFVRlFPMEZCUTBRc1IwRkdSQ3hEUVVWRkxFOUJRVTl6U2l4SFFVRlFMRVZCUVZrN1FVRkRXaXhYUVVGUE1Vb3NUMEZCVDJsRkxGbEJRVkFzUTBGQmIwSXNUVUZCY0VJc1EwRkJVQ3hEUVVSWkxFTkJRM1ZDTzBGQlEzQkRPMEZCUTBZN08wRkJSVVE3T3pzN08wRkJTMEVzVTBGQlUzTkRMRk5CUVZRc1EwRkJiMEpFTEV0QlFYQkNMRVZCUVRKQ2NVUXNSMEZCTTBJc1JVRkJaME03UVVGRE9VSm9TaXhUUVVGUExFOUJRVTh5Uml4TFFVRlFMRXRCUVdsQ0xGRkJRWGhDTEVWQlFXdERMSFZEUVVGc1F6dEJRVU5CTTBZc1UwRkJUekpHTEZOQlFWTXNRMEZCYUVJc1JVRkJiVUlzTUVSQlFXNUNPMEZCUTBFelJpeFRRVUZQTWtZc1UwRkJVM0ZFTEVkQlFXaENMRVZCUVhGQ0xEWkRRVUZ5UWp0QlFVTkJhRW9zVTBGQlQyMUVMRXRCUVVzNFJpeExRVUZNTEVOQlFWZDBSQ3hMUVVGWUxFMUJRWE5DUVN4TFFVRTNRaXhGUVVGdlF5eHJRMEZCY0VNN1FVRkRSRHM3UVVGRlJDeFRRVUZUVlN4VFFVRlVMRU5CUVc5Q1ZpeExRVUZ3UWl4RlFVRXlRbkZFTEVkQlFUTkNMRVZCUVdkRE5VWXNSMEZCYUVNc1JVRkJjVU03UVVGRGJrTndSQ3hUUVVGUExFOUJRVTh5Uml4TFFVRlFMRXRCUVdsQ0xGRkJRWGhDTEVWQlFXdERMSFZEUVVGc1F6dEJRVU5CTTBZc1UwRkJUekpHTEZOQlFWTnhSQ3hIUVVGb1FpeEZRVUZ4UWl4NVEwRkJja0k3UVVGRFFXaEtMRk5CUVU4eVJpeFRRVUZUZGtNc1IwRkJhRUlzUlVGQmNVSXNNRU5CUVhKQ08wRkJRMEZ3UkN4VFFVRlBiVVFzUzBGQlN6aEdMRXRCUVV3c1EwRkJWM1JFTEV0QlFWZ3NUVUZCYzBKQkxFdEJRVGRDTEVWQlFXOURMR3REUVVGd1F6dEJRVU5FT3p0QlFVVkVMRk5CUVZOclFpeFpRVUZVTEVOQlFYVkNiRUlzUzBGQmRrSXNSVUZCT0VKeFJDeEhRVUU1UWl4RlFVRnRRelZHTEVkQlFXNURMRVZCUVhkRE8wRkJRM1JEY0VRc1UwRkJUeXhQUVVGUE1rWXNTMEZCVUN4TFFVRnBRaXhSUVVGNFFpeEZRVUZyUXl4MVEwRkJiRU03UVVGRFFUTkdMRk5CUVU4eVJpeFRRVUZUY1VRc1IwRkJhRUlzUlVGQmNVSXNlVU5CUVhKQ08wRkJRMEZvU2l4VFFVRlBNa1lzVTBGQlUzWkRMRWRCUVdoQ0xFVkJRWEZDTERCRFFVRnlRanRCUVVORU96dEJRVVZFTEZOQlFWTndSQ3hOUVVGVUxFTkJRV2xDYTBvc1NVRkJha0lzUlVGQmRVSkRMRTlCUVhaQ0xFVkJRV2RETzBGQlF6bENMRTFCUVVrc1EwRkJRMFFzU1VGQlRDeEZRVUZYTEUxQlFVMHNTVUZCU1haTExFdEJRVW9zUTBGQlZYZExMRmRCUVZjc2EwSkJRWEpDTEVOQlFVNDdRVUZEV2lJc0ltWnBiR1VpT2lKcGJtUmxlQzVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklpOHFJVnh1SUNvZ1ZHaGxJR0oxWm1abGNpQnRiMlIxYkdVZ1puSnZiU0J1YjJSbExtcHpMQ0JtYjNJZ2RHaGxJR0p5YjNkelpYSXVYRzRnS2x4dUlDb2dRR0YxZEdodmNpQWdJRVpsY205emN5QkJZbTkxYTJoaFpHbHFaV2dnUEdabGNtOXpjMEJtWlhKdmMzTXViM0puUGlBOGFIUjBjRG92TDJabGNtOXpjeTV2Y21jK1hHNGdLaUJBYkdsalpXNXpaU0FnVFVsVVhHNGdLaTljYmx4dWRtRnlJR0poYzJVMk5DQTlJSEpsY1hWcGNtVW9KMkpoYzJVMk5DMXFjeWNwWEc1MllYSWdhV1ZsWlRjMU5DQTlJSEpsY1hWcGNtVW9KMmxsWldVM05UUW5LVnh1WEc1bGVIQnZjblJ6TGtKMVptWmxjaUE5SUVKMVptWmxjbHh1Wlhod2IzSjBjeTVUYkc5M1FuVm1abVZ5SUQwZ1FuVm1abVZ5WEc1bGVIQnZjblJ6TGtsT1UxQkZRMVJmVFVGWVgwSlpWRVZUSUQwZ05UQmNia0oxWm1abGNpNXdiMjlzVTJsNlpTQTlJRGd4T1RKY2JseHVMeW9xWEc0Z0tpQkpaaUJnUW5WbVptVnlMbDkxYzJWVWVYQmxaRUZ5Y21GNWMyQTZYRzRnS2lBZ0lEMDlQU0IwY25WbElDQWdJRlZ6WlNCVmFXNTBPRUZ5Y21GNUlHbHRjR3hsYldWdWRHRjBhVzl1SUNobVlYTjBaWE4wS1Z4dUlDb2dJQ0E5UFQwZ1ptRnNjMlVnSUNCVmMyVWdUMkpxWldOMElHbHRjR3hsYldWdWRHRjBhVzl1SUNoamIyMXdZWFJwWW14bElHUnZkMjRnZEc4Z1NVVTJLVnh1SUNvdlhHNUNkV1ptWlhJdVgzVnpaVlI1Y0dWa1FYSnlZWGx6SUQwZ0tHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ0x5OGdSR1YwWldOMElHbG1JR0p5YjNkelpYSWdjM1Z3Y0c5eWRITWdWSGx3WldRZ1FYSnlZWGx6TGlCVGRYQndiM0owWldRZ1luSnZkM05sY25NZ1lYSmxJRWxGSURFd0t5d2dSbWx5WldadmVDQTBLeXhjYmlBZ0x5OGdRMmh5YjIxbElEY3JMQ0JUWVdaaGNta2dOUzR4S3l3Z1QzQmxjbUVnTVRFdU5pc3NJR2xQVXlBMExqSXJMaUJKWmlCMGFHVWdZbkp2ZDNObGNpQmtiMlZ6SUc1dmRDQnpkWEJ3YjNKMElHRmtaR2x1WjF4dUlDQXZMeUJ3Y205d1pYSjBhV1Z6SUhSdklHQlZhVzUwT0VGeWNtRjVZQ0JwYm5OMFlXNWpaWE1zSUhSb1pXNGdkR2hoZENkeklIUm9aU0J6WVcxbElHRnpJRzV2SUdCVmFXNTBPRUZ5Y21GNVlDQnpkWEJ3YjNKMFhHNGdJQzh2SUdKbFkyRjFjMlVnZDJVZ2JtVmxaQ0IwYnlCaVpTQmhZbXhsSUhSdklHRmtaQ0JoYkd3Z2RHaGxJRzV2WkdVZ1FuVm1abVZ5SUVGUVNTQnRaWFJvYjJSekxpQlVhR2x6SUdseklHRnVJR2x6YzNWbFhHNGdJQzh2SUdsdUlFWnBjbVZtYjNnZ05DMHlPUzRnVG05M0lHWnBlR1ZrT2lCb2RIUndjem92TDJKMVozcHBiR3hoTG0xdmVtbHNiR0V1YjNKbkwzTm9iM2RmWW5WbkxtTm5hVDlwWkQwMk9UVTBNemhjYmlBZ2RISjVJSHRjYmlBZ0lDQjJZWElnWW5WbUlEMGdibVYzSUVGeWNtRjVRblZtWm1WeUtEQXBYRzRnSUNBZ2RtRnlJR0Z5Y2lBOUlHNWxkeUJWYVc1ME9FRnljbUY1S0dKMVppbGNiaUFnSUNCaGNuSXVabTl2SUQwZ1puVnVZM1JwYjI0Z0tDa2dleUJ5WlhSMWNtNGdORElnZlZ4dUlDQWdJSEpsZEhWeWJpQTBNaUE5UFQwZ1lYSnlMbVp2YnlncElDWW1YRzRnSUNBZ0lDQWdJSFI1Y0dWdlppQmhjbkl1YzNWaVlYSnlZWGtnUFQwOUlDZG1kVzVqZEdsdmJpY2dMeThnUTJoeWIyMWxJRGt0TVRBZ2JHRmpheUJnYzNWaVlYSnlZWGxnWEc0Z0lIMGdZMkYwWTJnZ0tHVXBJSHRjYmlBZ0lDQnlaWFIxY200Z1ptRnNjMlZjYmlBZ2ZWeHVmU2tvS1Z4dVhHNHZLaXBjYmlBcUlFTnNZWE56T2lCQ2RXWm1aWEpjYmlBcUlEMDlQVDA5UFQwOVBUMDlQVDFjYmlBcVhHNGdLaUJVYUdVZ1FuVm1abVZ5SUdOdmJuTjBjblZqZEc5eUlISmxkSFZ5Ym5NZ2FXNXpkR0Z1WTJWeklHOW1JR0JWYVc1ME9FRnljbUY1WUNCMGFHRjBJR0Z5WlNCaGRXZHRaVzUwWldSY2JpQXFJSGRwZEdnZ1puVnVZM1JwYjI0Z2NISnZjR1Z5ZEdsbGN5Qm1iM0lnWVd4c0lIUm9aU0J1YjJSbElHQkNkV1ptWlhKZ0lFRlFTU0JtZFc1amRHbHZibk11SUZkbElIVnpaVnh1SUNvZ1lGVnBiblE0UVhKeVlYbGdJSE52SUhSb1lYUWdjM0YxWVhKbElHSnlZV05yWlhRZ2JtOTBZWFJwYjI0Z2QyOXlhM01nWVhNZ1pYaHdaV04wWldRZ0xTMGdhWFFnY21WMGRYSnVjMXh1SUNvZ1lTQnphVzVuYkdVZ2IyTjBaWFF1WEc0Z0tseHVJQ29nUW5rZ1lYVm5iV1Z1ZEdsdVp5QjBhR1VnYVc1emRHRnVZMlZ6TENCM1pTQmpZVzRnWVhadmFXUWdiVzlrYVdaNWFXNW5JSFJvWlNCZ1ZXbHVkRGhCY25KaGVXQmNiaUFxSUhCeWIzUnZkSGx3WlM1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnUW5WbVptVnlJQ2h6ZFdKcVpXTjBMQ0JsYm1OdlpHbHVaeXdnYm05YVpYSnZLU0I3WEc0Z0lHbG1JQ2doS0hSb2FYTWdhVzV6ZEdGdVkyVnZaaUJDZFdabVpYSXBLVnh1SUNBZ0lISmxkSFZ5YmlCdVpYY2dRblZtWm1WeUtITjFZbXBsWTNRc0lHVnVZMjlrYVc1bkxDQnViMXBsY204cFhHNWNiaUFnZG1GeUlIUjVjR1VnUFNCMGVYQmxiMllnYzNWaWFtVmpkRnh1WEc0Z0lDOHZJRmR2Y210aGNtOTFibVE2SUc1dlpHVW5jeUJpWVhObE5qUWdhVzF3YkdWdFpXNTBZWFJwYjI0Z1lXeHNiM2R6SUdadmNpQnViMjR0Y0dGa1pHVmtJSE4wY21sdVozTmNiaUFnTHk4Z2QyaHBiR1VnWW1GelpUWTBMV3B6SUdSdlpYTWdibTkwTGx4dUlDQnBaaUFvWlc1amIyUnBibWNnUFQwOUlDZGlZWE5sTmpRbklDWW1JSFI1Y0dVZ1BUMDlJQ2R6ZEhKcGJtY25LU0I3WEc0Z0lDQWdjM1ZpYW1WamRDQTlJSE4wY21sdVozUnlhVzBvYzNWaWFtVmpkQ2xjYmlBZ0lDQjNhR2xzWlNBb2MzVmlhbVZqZEM1c1pXNW5kR2dnSlNBMElDRTlQU0F3S1NCN1hHNGdJQ0FnSUNCemRXSnFaV04wSUQwZ2MzVmlhbVZqZENBcklDYzlKMXh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJQzh2SUVacGJtUWdkR2hsSUd4bGJtZDBhRnh1SUNCMllYSWdiR1Z1WjNSb1hHNGdJR2xtSUNoMGVYQmxJRDA5UFNBbmJuVnRZbVZ5SnlsY2JpQWdJQ0JzWlc1bmRHZ2dQU0JqYjJWeVkyVW9jM1ZpYW1WamRDbGNiaUFnWld4elpTQnBaaUFvZEhsd1pTQTlQVDBnSjNOMGNtbHVaeWNwWEc0Z0lDQWdiR1Z1WjNSb0lEMGdRblZtWm1WeUxtSjVkR1ZNWlc1bmRHZ29jM1ZpYW1WamRDd2daVzVqYjJScGJtY3BYRzRnSUdWc2MyVWdhV1lnS0hSNWNHVWdQVDA5SUNkdlltcGxZM1FuS1Z4dUlDQWdJR3hsYm1kMGFDQTlJR052WlhKalpTaHpkV0pxWldOMExteGxibWQwYUNrZ0x5OGdZWE56ZFcxbElIUm9ZWFFnYjJKcVpXTjBJR2x6SUdGeWNtRjVMV3hwYTJWY2JpQWdaV3h6WlZ4dUlDQWdJSFJvY205M0lHNWxkeUJGY25KdmNpZ25SbWx5YzNRZ1lYSm5kVzFsYm5RZ2JtVmxaSE1nZEc4Z1ltVWdZU0J1ZFcxaVpYSXNJR0Z5Y21GNUlHOXlJSE4wY21sdVp5NG5LVnh1WEc0Z0lIWmhjaUJpZFdaY2JpQWdhV1lnS0VKMVptWmxjaTVmZFhObFZIbHdaV1JCY25KaGVYTXBJSHRjYmlBZ0lDQXZMeUJRY21WbVpYSnlaV1E2SUZKbGRIVnliaUJoYmlCaGRXZHRaVzUwWldRZ1lGVnBiblE0UVhKeVlYbGdJR2x1YzNSaGJtTmxJR1p2Y2lCaVpYTjBJSEJsY21admNtMWhibU5sWEc0Z0lDQWdZblZtSUQwZ1FuVm1abVZ5TGw5aGRXZHRaVzUwS0c1bGR5QlZhVzUwT0VGeWNtRjVLR3hsYm1kMGFDa3BYRzRnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdMeThnUm1Gc2JHSmhZMnM2SUZKbGRIVnliaUJVU0VsVElHbHVjM1JoYm1ObElHOW1JRUoxWm1abGNpQW9ZM0psWVhSbFpDQmllU0JnYm1WM1lDbGNiaUFnSUNCaWRXWWdQU0IwYUdselhHNGdJQ0FnWW5WbUxteGxibWQwYUNBOUlHeGxibWQwYUZ4dUlDQWdJR0oxWmk1ZmFYTkNkV1ptWlhJZ1BTQjBjblZsWEc0Z0lIMWNibHh1SUNCMllYSWdhVnh1SUNCcFppQW9RblZtWm1WeUxsOTFjMlZVZVhCbFpFRnljbUY1Y3lBbUppQjBlWEJsYjJZZ2MzVmlhbVZqZEM1aWVYUmxUR1Z1WjNSb0lEMDlQU0FuYm5WdFltVnlKeWtnZTF4dUlDQWdJQzh2SUZOd1pXVmtJRzl3ZEdsdGFYcGhkR2x2YmlBdExTQjFjMlVnYzJWMElHbG1JSGRsSjNKbElHTnZjSGxwYm1jZ1puSnZiU0JoSUhSNWNHVmtJR0Z5Y21GNVhHNGdJQ0FnWW5WbUxsOXpaWFFvYzNWaWFtVmpkQ2xjYmlBZ2ZTQmxiSE5sSUdsbUlDaHBjMEZ5Y21GNWFYTm9LSE4xWW1wbFkzUXBLU0I3WEc0Z0lDQWdMeThnVkhKbFlYUWdZWEp5WVhrdGFYTm9JRzlpYW1WamRITWdZWE1nWVNCaWVYUmxJR0Z5Y21GNVhHNGdJQ0FnWm05eUlDaHBJRDBnTURzZ2FTQThJR3hsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnSUNCcFppQW9RblZtWm1WeUxtbHpRblZtWm1WeUtITjFZbXBsWTNRcEtWeHVJQ0FnSUNBZ0lDQmlkV1piYVYwZ1BTQnpkV0pxWldOMExuSmxZV1JWU1c1ME9DaHBLVnh1SUNBZ0lDQWdaV3h6WlZ4dUlDQWdJQ0FnSUNCaWRXWmJhVjBnUFNCemRXSnFaV04wVzJsZFhHNGdJQ0FnZlZ4dUlDQjlJR1ZzYzJVZ2FXWWdLSFI1Y0dVZ1BUMDlJQ2R6ZEhKcGJtY25LU0I3WEc0Z0lDQWdZblZtTG5keWFYUmxLSE4xWW1wbFkzUXNJREFzSUdWdVkyOWthVzVuS1Z4dUlDQjlJR1ZzYzJVZ2FXWWdLSFI1Y0dVZ1BUMDlJQ2R1ZFcxaVpYSW5JQ1ltSUNGQ2RXWm1aWEl1WDNWelpWUjVjR1ZrUVhKeVlYbHpJQ1ltSUNGdWIxcGxjbThwSUh0Y2JpQWdJQ0JtYjNJZ0tHa2dQU0F3T3lCcElEd2diR1Z1WjNSb095QnBLeXNwSUh0Y2JpQWdJQ0FnSUdKMVpsdHBYU0E5SURCY2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCeVpYUjFjbTRnWW5WbVhHNTlYRzVjYmk4dklGTlVRVlJKUXlCTlJWUklUMFJUWEc0dkx5QTlQVDA5UFQwOVBUMDlQVDA5UFZ4dVhHNUNkV1ptWlhJdWFYTkZibU52WkdsdVp5QTlJR1oxYm1OMGFXOXVJQ2hsYm1OdlpHbHVaeWtnZTF4dUlDQnpkMmwwWTJnZ0tGTjBjbWx1WnlobGJtTnZaR2x1WnlrdWRHOU1iM2RsY2tOaGMyVW9LU2tnZTF4dUlDQWdJR05oYzJVZ0oyaGxlQ2M2WEc0Z0lDQWdZMkZ6WlNBbmRYUm1PQ2M2WEc0Z0lDQWdZMkZ6WlNBbmRYUm1MVGduT2x4dUlDQWdJR05oYzJVZ0oyRnpZMmxwSnpwY2JpQWdJQ0JqWVhObElDZGlhVzVoY25rbk9seHVJQ0FnSUdOaGMyVWdKMkpoYzJVMk5DYzZYRzRnSUNBZ1kyRnpaU0FuY21GM0p6cGNiaUFnSUNCallYTmxJQ2QxWTNNeUp6cGNiaUFnSUNCallYTmxJQ2QxWTNNdE1pYzZYRzRnSUNBZ1kyRnpaU0FuZFhSbU1UWnNaU2M2WEc0Z0lDQWdZMkZ6WlNBbmRYUm1MVEUyYkdVbk9seHVJQ0FnSUNBZ2NtVjBkWEp1SUhSeWRXVmNiaUFnSUNCa1pXWmhkV3gwT2x4dUlDQWdJQ0FnY21WMGRYSnVJR1poYkhObFhHNGdJSDFjYm4xY2JseHVRblZtWm1WeUxtbHpRblZtWm1WeUlEMGdablZ1WTNScGIyNGdLR0lwSUh0Y2JpQWdjbVYwZFhKdUlDRWhLR0lnSVQwOUlHNTFiR3dnSmlZZ1lpQWhQVDBnZFc1a1pXWnBibVZrSUNZbUlHSXVYMmx6UW5WbVptVnlLVnh1ZlZ4dVhHNUNkV1ptWlhJdVlubDBaVXhsYm1kMGFDQTlJR1oxYm1OMGFXOXVJQ2h6ZEhJc0lHVnVZMjlrYVc1bktTQjdYRzRnSUhaaGNpQnlaWFJjYmlBZ2MzUnlJRDBnYzNSeUlDc2dKeWRjYmlBZ2MzZHBkR05vSUNobGJtTnZaR2x1WnlCOGZDQW5kWFJtT0NjcElIdGNiaUFnSUNCallYTmxJQ2RvWlhnbk9seHVJQ0FnSUNBZ2NtVjBJRDBnYzNSeUxteGxibWQwYUNBdklESmNiaUFnSUNBZ0lHSnlaV0ZyWEc0Z0lDQWdZMkZ6WlNBbmRYUm1PQ2M2WEc0Z0lDQWdZMkZ6WlNBbmRYUm1MVGduT2x4dUlDQWdJQ0FnY21WMElEMGdkWFJtT0ZSdlFubDBaWE1vYzNSeUtTNXNaVzVuZEdoY2JpQWdJQ0FnSUdKeVpXRnJYRzRnSUNBZ1kyRnpaU0FuWVhOamFXa25PbHh1SUNBZ0lHTmhjMlVnSjJKcGJtRnllU2M2WEc0Z0lDQWdZMkZ6WlNBbmNtRjNKenBjYmlBZ0lDQWdJSEpsZENBOUlITjBjaTVzWlc1bmRHaGNiaUFnSUNBZ0lHSnlaV0ZyWEc0Z0lDQWdZMkZ6WlNBblltRnpaVFkwSnpwY2JpQWdJQ0FnSUhKbGRDQTlJR0poYzJVMk5GUnZRbmwwWlhNb2MzUnlLUzVzWlc1bmRHaGNiaUFnSUNBZ0lHSnlaV0ZyWEc0Z0lDQWdZMkZ6WlNBbmRXTnpNaWM2WEc0Z0lDQWdZMkZ6WlNBbmRXTnpMVEluT2x4dUlDQWdJR05oYzJVZ0ozVjBaakUyYkdVbk9seHVJQ0FnSUdOaGMyVWdKM1YwWmkweE5teGxKenBjYmlBZ0lDQWdJSEpsZENBOUlITjBjaTVzWlc1bmRHZ2dLaUF5WEc0Z0lDQWdJQ0JpY21WaGExeHVJQ0FnSUdSbFptRjFiSFE2WEc0Z0lDQWdJQ0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9KMVZ1YTI1dmQyNGdaVzVqYjJScGJtY25LVnh1SUNCOVhHNGdJSEpsZEhWeWJpQnlaWFJjYm4xY2JseHVRblZtWm1WeUxtTnZibU5oZENBOUlHWjFibU4wYVc5dUlDaHNhWE4wTENCMGIzUmhiRXhsYm1kMGFDa2dlMXh1SUNCaGMzTmxjblFvYVhOQmNuSmhlU2hzYVhOMEtTd2dKMVZ6WVdkbE9pQkNkV1ptWlhJdVkyOXVZMkYwS0d4cGMzUXNJRnQwYjNSaGJFeGxibWQwYUYwcFhGeHVKeUFyWEc0Z0lDQWdJQ0FuYkdsemRDQnphRzkxYkdRZ1ltVWdZVzRnUVhKeVlYa3VKeWxjYmx4dUlDQnBaaUFvYkdsemRDNXNaVzVuZEdnZ1BUMDlJREFwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdibVYzSUVKMVptWmxjaWd3S1Z4dUlDQjlJR1ZzYzJVZ2FXWWdLR3hwYzNRdWJHVnVaM1JvSUQwOVBTQXhLU0I3WEc0Z0lDQWdjbVYwZFhKdUlHeHBjM1JiTUYxY2JpQWdmVnh1WEc0Z0lIWmhjaUJwWEc0Z0lHbG1JQ2gwZVhCbGIyWWdkRzkwWVd4TVpXNW5kR2dnSVQwOUlDZHVkVzFpWlhJbktTQjdYRzRnSUNBZ2RHOTBZV3hNWlc1bmRHZ2dQU0F3WEc0Z0lDQWdabTl5SUNocElEMGdNRHNnYVNBOElHeHBjM1F1YkdWdVozUm9PeUJwS3lzcElIdGNiaUFnSUNBZ0lIUnZkR0ZzVEdWdVozUm9JQ3M5SUd4cGMzUmJhVjB1YkdWdVozUm9YRzRnSUNBZ2ZWeHVJQ0I5WEc1Y2JpQWdkbUZ5SUdKMVppQTlJRzVsZHlCQ2RXWm1aWElvZEc5MFlXeE1aVzVuZEdncFhHNGdJSFpoY2lCd2IzTWdQU0F3WEc0Z0lHWnZjaUFvYVNBOUlEQTdJR2tnUENCc2FYTjBMbXhsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnZG1GeUlHbDBaVzBnUFNCc2FYTjBXMmxkWEc0Z0lDQWdhWFJsYlM1amIzQjVLR0oxWml3Z2NHOXpLVnh1SUNBZ0lIQnZjeUFyUFNCcGRHVnRMbXhsYm1kMGFGeHVJQ0I5WEc0Z0lISmxkSFZ5YmlCaWRXWmNibjFjYmx4dUx5OGdRbFZHUmtWU0lFbE9VMVJCVGtORklFMUZWRWhQUkZOY2JpOHZJRDA5UFQwOVBUMDlQVDA5UFQwOVBUMDlQVDA5UFQwOVhHNWNibVoxYm1OMGFXOXVJRjlvWlhoWGNtbDBaU0FvWW5WbUxDQnpkSEpwYm1jc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1NCN1hHNGdJRzltWm5ObGRDQTlJRTUxYldKbGNpaHZabVp6WlhRcElIeDhJREJjYmlBZ2RtRnlJSEpsYldGcGJtbHVaeUE5SUdKMVppNXNaVzVuZEdnZ0xTQnZabVp6WlhSY2JpQWdhV1lnS0NGc1pXNW5kR2dwSUh0Y2JpQWdJQ0JzWlc1bmRHZ2dQU0J5WlcxaGFXNXBibWRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0JzWlc1bmRHZ2dQU0JPZFcxaVpYSW9iR1Z1WjNSb0tWeHVJQ0FnSUdsbUlDaHNaVzVuZEdnZ1BpQnlaVzFoYVc1cGJtY3BJSHRjYmlBZ0lDQWdJR3hsYm1kMGFDQTlJSEpsYldGcGJtbHVaMXh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJQzh2SUcxMWMzUWdZbVVnWVc0Z1pYWmxiaUJ1ZFcxaVpYSWdiMllnWkdsbmFYUnpYRzRnSUhaaGNpQnpkSEpNWlc0Z1BTQnpkSEpwYm1jdWJHVnVaM1JvWEc0Z0lHRnpjMlZ5ZENoemRISk1aVzRnSlNBeUlEMDlQU0F3TENBblNXNTJZV3hwWkNCb1pYZ2djM1J5YVc1bkp5bGNibHh1SUNCcFppQW9iR1Z1WjNSb0lENGdjM1J5VEdWdUlDOGdNaWtnZTF4dUlDQWdJR3hsYm1kMGFDQTlJSE4wY2t4bGJpQXZJREpjYmlBZ2ZWeHVJQ0JtYjNJZ0tIWmhjaUJwSUQwZ01Ec2dhU0E4SUd4bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ2RtRnlJR0o1ZEdVZ1BTQndZWEp6WlVsdWRDaHpkSEpwYm1jdWMzVmljM1J5S0drZ0tpQXlMQ0F5S1N3Z01UWXBYRzRnSUNBZ1lYTnpaWEowS0NGcGMwNWhUaWhpZVhSbEtTd2dKMGx1ZG1Gc2FXUWdhR1Y0SUhOMGNtbHVaeWNwWEc0Z0lDQWdZblZtVzI5bVpuTmxkQ0FySUdsZElEMGdZbmwwWlZ4dUlDQjlYRzRnSUVKMVptWmxjaTVmWTJoaGNuTlhjbWwwZEdWdUlEMGdhU0FxSURKY2JpQWdjbVYwZFhKdUlHbGNibjFjYmx4dVpuVnVZM1JwYjI0Z1gzVjBaamhYY21sMFpTQW9ZblZtTENCemRISnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9LU0I3WEc0Z0lIWmhjaUJqYUdGeWMxZHlhWFIwWlc0Z1BTQkNkV1ptWlhJdVgyTm9ZWEp6VjNKcGRIUmxiaUE5WEc0Z0lDQWdZbXhwZEVKMVptWmxjaWgxZEdZNFZHOUNlWFJsY3loemRISnBibWNwTENCaWRXWXNJRzltWm5ObGRDd2diR1Z1WjNSb0tWeHVJQ0J5WlhSMWNtNGdZMmhoY25OWGNtbDBkR1Z1WEc1OVhHNWNibVoxYm1OMGFXOXVJRjloYzJOcGFWZHlhWFJsSUNoaWRXWXNJSE4wY21sdVp5d2diMlptYzJWMExDQnNaVzVuZEdncElIdGNiaUFnZG1GeUlHTm9ZWEp6VjNKcGRIUmxiaUE5SUVKMVptWmxjaTVmWTJoaGNuTlhjbWwwZEdWdUlEMWNiaUFnSUNCaWJHbDBRblZtWm1WeUtHRnpZMmxwVkc5Q2VYUmxjeWh6ZEhKcGJtY3BMQ0JpZFdZc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1Z4dUlDQnlaWFIxY200Z1kyaGhjbk5YY21sMGRHVnVYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOWlhVzVoY25sWGNtbDBaU0FvWW5WbUxDQnpkSEpwYm1jc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1NCN1hHNGdJSEpsZEhWeWJpQmZZWE5qYVdsWGNtbDBaU2hpZFdZc0lITjBjbWx1Wnl3Z2IyWm1jMlYwTENCc1pXNW5kR2dwWEc1OVhHNWNibVoxYm1OMGFXOXVJRjlpWVhObE5qUlhjbWwwWlNBb1luVm1MQ0J6ZEhKcGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0tTQjdYRzRnSUhaaGNpQmphR0Z5YzFkeWFYUjBaVzRnUFNCQ2RXWm1aWEl1WDJOb1lYSnpWM0pwZEhSbGJpQTlYRzRnSUNBZ1lteHBkRUoxWm1abGNpaGlZWE5sTmpSVWIwSjVkR1Z6S0hOMGNtbHVaeWtzSUdKMVppd2diMlptYzJWMExDQnNaVzVuZEdncFhHNGdJSEpsZEhWeWJpQmphR0Z5YzFkeWFYUjBaVzVjYm4xY2JseHVablZ1WTNScGIyNGdYM1YwWmpFMmJHVlhjbWwwWlNBb1luVm1MQ0J6ZEhKcGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0tTQjdYRzRnSUhaaGNpQmphR0Z5YzFkeWFYUjBaVzRnUFNCQ2RXWm1aWEl1WDJOb1lYSnpWM0pwZEhSbGJpQTlYRzRnSUNBZ1lteHBkRUoxWm1abGNpaDFkR1l4Tm14bFZHOUNlWFJsY3loemRISnBibWNwTENCaWRXWXNJRzltWm5ObGRDd2diR1Z1WjNSb0tWeHVJQ0J5WlhSMWNtNGdZMmhoY25OWGNtbDBkR1Z1WEc1OVhHNWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVkM0pwZEdVZ1BTQm1kVzVqZEdsdmJpQW9jM1J5YVc1bkxDQnZabVp6WlhRc0lHeGxibWQwYUN3Z1pXNWpiMlJwYm1jcElIdGNiaUFnTHk4Z1UzVndjRzl5ZENCaWIzUm9JQ2h6ZEhKcGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0xDQmxibU52WkdsdVp5bGNiaUFnTHk4Z1lXNWtJSFJvWlNCc1pXZGhZM2tnS0hOMGNtbHVaeXdnWlc1amIyUnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9LVnh1SUNCcFppQW9hWE5HYVc1cGRHVW9iMlptYzJWMEtTa2dlMXh1SUNBZ0lHbG1JQ2doYVhOR2FXNXBkR1VvYkdWdVozUm9LU2tnZTF4dUlDQWdJQ0FnWlc1amIyUnBibWNnUFNCc1pXNW5kR2hjYmlBZ0lDQWdJR3hsYm1kMGFDQTlJSFZ1WkdWbWFXNWxaRnh1SUNBZ0lIMWNiaUFnZlNCbGJITmxJSHNnSUM4dklHeGxaMkZqZVZ4dUlDQWdJSFpoY2lCemQyRndJRDBnWlc1amIyUnBibWRjYmlBZ0lDQmxibU52WkdsdVp5QTlJRzltWm5ObGRGeHVJQ0FnSUc5bVpuTmxkQ0E5SUd4bGJtZDBhRnh1SUNBZ0lHeGxibWQwYUNBOUlITjNZWEJjYmlBZ2ZWeHVYRzRnSUc5bVpuTmxkQ0E5SUU1MWJXSmxjaWh2Wm1aelpYUXBJSHg4SURCY2JpQWdkbUZ5SUhKbGJXRnBibWx1WnlBOUlIUm9hWE11YkdWdVozUm9JQzBnYjJabWMyVjBYRzRnSUdsbUlDZ2hiR1Z1WjNSb0tTQjdYRzRnSUNBZ2JHVnVaM1JvSUQwZ2NtVnRZV2x1YVc1blhHNGdJSDBnWld4elpTQjdYRzRnSUNBZ2JHVnVaM1JvSUQwZ1RuVnRZbVZ5S0d4bGJtZDBhQ2xjYmlBZ0lDQnBaaUFvYkdWdVozUm9JRDRnY21WdFlXbHVhVzVuS1NCN1hHNGdJQ0FnSUNCc1pXNW5kR2dnUFNCeVpXMWhhVzVwYm1kY2JpQWdJQ0I5WEc0Z0lIMWNiaUFnWlc1amIyUnBibWNnUFNCVGRISnBibWNvWlc1amIyUnBibWNnZkh3Z0ozVjBaamduS1M1MGIweHZkMlZ5UTJGelpTZ3BYRzVjYmlBZ2RtRnlJSEpsZEZ4dUlDQnpkMmwwWTJnZ0tHVnVZMjlrYVc1bktTQjdYRzRnSUNBZ1kyRnpaU0FuYUdWNEp6cGNiaUFnSUNBZ0lISmxkQ0E5SUY5b1pYaFhjbWwwWlNoMGFHbHpMQ0J6ZEhKcGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0tWeHVJQ0FnSUNBZ1luSmxZV3RjYmlBZ0lDQmpZWE5sSUNkMWRHWTRKenBjYmlBZ0lDQmpZWE5sSUNkMWRHWXRPQ2M2WEc0Z0lDQWdJQ0J5WlhRZ1BTQmZkWFJtT0ZkeWFYUmxLSFJvYVhNc0lITjBjbWx1Wnl3Z2IyWm1jMlYwTENCc1pXNW5kR2dwWEc0Z0lDQWdJQ0JpY21WaGExeHVJQ0FnSUdOaGMyVWdKMkZ6WTJscEp6cGNiaUFnSUNBZ0lISmxkQ0E5SUY5aGMyTnBhVmR5YVhSbEtIUm9hWE1zSUhOMGNtbHVaeXdnYjJabWMyVjBMQ0JzWlc1bmRHZ3BYRzRnSUNBZ0lDQmljbVZoYTF4dUlDQWdJR05oYzJVZ0oySnBibUZ5ZVNjNlhHNGdJQ0FnSUNCeVpYUWdQU0JmWW1sdVlYSjVWM0pwZEdVb2RHaHBjeXdnYzNSeWFXNW5MQ0J2Wm1aelpYUXNJR3hsYm1kMGFDbGNiaUFnSUNBZ0lHSnlaV0ZyWEc0Z0lDQWdZMkZ6WlNBblltRnpaVFkwSnpwY2JpQWdJQ0FnSUhKbGRDQTlJRjlpWVhObE5qUlhjbWwwWlNoMGFHbHpMQ0J6ZEhKcGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0tWeHVJQ0FnSUNBZ1luSmxZV3RjYmlBZ0lDQmpZWE5sSUNkMVkzTXlKenBjYmlBZ0lDQmpZWE5sSUNkMVkzTXRNaWM2WEc0Z0lDQWdZMkZ6WlNBbmRYUm1NVFpzWlNjNlhHNGdJQ0FnWTJGelpTQW5kWFJtTFRFMmJHVW5PbHh1SUNBZ0lDQWdjbVYwSUQwZ1gzVjBaakUyYkdWWGNtbDBaU2gwYUdsekxDQnpkSEpwYm1jc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1Z4dUlDQWdJQ0FnWW5KbFlXdGNiaUFnSUNCa1pXWmhkV3gwT2x4dUlDQWdJQ0FnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2RWYm10dWIzZHVJR1Z1WTI5a2FXNW5KeWxjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdjbVYwWEc1OVhHNWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVkRzlUZEhKcGJtY2dQU0JtZFc1amRHbHZiaUFvWlc1amIyUnBibWNzSUhOMFlYSjBMQ0JsYm1RcElIdGNiaUFnZG1GeUlITmxiR1lnUFNCMGFHbHpYRzVjYmlBZ1pXNWpiMlJwYm1jZ1BTQlRkSEpwYm1jb1pXNWpiMlJwYm1jZ2ZId2dKM1YwWmpnbktTNTBiMHh2ZDJWeVEyRnpaU2dwWEc0Z0lITjBZWEowSUQwZ1RuVnRZbVZ5S0hOMFlYSjBLU0I4ZkNBd1hHNGdJR1Z1WkNBOUlDaGxibVFnSVQwOUlIVnVaR1ZtYVc1bFpDbGNiaUFnSUNBL0lFNTFiV0psY2lobGJtUXBYRzRnSUNBZ09pQmxibVFnUFNCelpXeG1MbXhsYm1kMGFGeHVYRzRnSUM4dklFWmhjM1J3WVhSb0lHVnRjSFI1SUhOMGNtbHVaM05jYmlBZ2FXWWdLR1Z1WkNBOVBUMGdjM1JoY25RcFhHNGdJQ0FnY21WMGRYSnVJQ2NuWEc1Y2JpQWdkbUZ5SUhKbGRGeHVJQ0J6ZDJsMFkyZ2dLR1Z1WTI5a2FXNW5LU0I3WEc0Z0lDQWdZMkZ6WlNBbmFHVjRKenBjYmlBZ0lDQWdJSEpsZENBOUlGOW9aWGhUYkdsalpTaHpaV3htTENCemRHRnlkQ3dnWlc1a0tWeHVJQ0FnSUNBZ1luSmxZV3RjYmlBZ0lDQmpZWE5sSUNkMWRHWTRKenBjYmlBZ0lDQmpZWE5sSUNkMWRHWXRPQ2M2WEc0Z0lDQWdJQ0J5WlhRZ1BTQmZkWFJtT0ZOc2FXTmxLSE5sYkdZc0lITjBZWEowTENCbGJtUXBYRzRnSUNBZ0lDQmljbVZoYTF4dUlDQWdJR05oYzJVZ0oyRnpZMmxwSnpwY2JpQWdJQ0FnSUhKbGRDQTlJRjloYzJOcGFWTnNhV05sS0hObGJHWXNJSE4wWVhKMExDQmxibVFwWEc0Z0lDQWdJQ0JpY21WaGExeHVJQ0FnSUdOaGMyVWdKMkpwYm1GeWVTYzZYRzRnSUNBZ0lDQnlaWFFnUFNCZlltbHVZWEo1VTJ4cFkyVW9jMlZzWml3Z2MzUmhjblFzSUdWdVpDbGNiaUFnSUNBZ0lHSnlaV0ZyWEc0Z0lDQWdZMkZ6WlNBblltRnpaVFkwSnpwY2JpQWdJQ0FnSUhKbGRDQTlJRjlpWVhObE5qUlRiR2xqWlNoelpXeG1MQ0J6ZEdGeWRDd2daVzVrS1Z4dUlDQWdJQ0FnWW5KbFlXdGNiaUFnSUNCallYTmxJQ2QxWTNNeUp6cGNiaUFnSUNCallYTmxJQ2QxWTNNdE1pYzZYRzRnSUNBZ1kyRnpaU0FuZFhSbU1UWnNaU2M2WEc0Z0lDQWdZMkZ6WlNBbmRYUm1MVEUyYkdVbk9seHVJQ0FnSUNBZ2NtVjBJRDBnWDNWMFpqRTJiR1ZUYkdsalpTaHpaV3htTENCemRHRnlkQ3dnWlc1a0tWeHVJQ0FnSUNBZ1luSmxZV3RjYmlBZ0lDQmtaV1poZFd4ME9seHVJQ0FnSUNBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0NkVmJtdHViM2R1SUdWdVkyOWthVzVuSnlsY2JpQWdmVnh1SUNCeVpYUjFjbTRnY21WMFhHNTlYRzVjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1ZEc5S1UwOU9JRDBnWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0J5WlhSMWNtNGdlMXh1SUNBZ0lIUjVjR1U2SUNkQ2RXWm1aWEluTEZ4dUlDQWdJR1JoZEdFNklFRnljbUY1TG5CeWIzUnZkSGx3WlM1emJHbGpaUzVqWVd4c0tIUm9hWE11WDJGeWNpQjhmQ0IwYUdsekxDQXdLVnh1SUNCOVhHNTlYRzVjYmk4dklHTnZjSGtvZEdGeVoyVjBRblZtWm1WeUxDQjBZWEpuWlhSVGRHRnlkRDB3TENCemIzVnlZMlZUZEdGeWREMHdMQ0J6YjNWeVkyVkZibVE5WW5WbVptVnlMbXhsYm1kMGFDbGNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVZMjl3ZVNBOUlHWjFibU4wYVc5dUlDaDBZWEpuWlhRc0lIUmhjbWRsZEY5emRHRnlkQ3dnYzNSaGNuUXNJR1Z1WkNrZ2UxeHVJQ0IyWVhJZ2MyOTFjbU5sSUQwZ2RHaHBjMXh1WEc0Z0lHbG1JQ2doYzNSaGNuUXBJSE4wWVhKMElEMGdNRnh1SUNCcFppQW9JV1Z1WkNBbUppQmxibVFnSVQwOUlEQXBJR1Z1WkNBOUlIUm9hWE11YkdWdVozUm9YRzRnSUdsbUlDZ2hkR0Z5WjJWMFgzTjBZWEowS1NCMFlYSm5aWFJmYzNSaGNuUWdQU0F3WEc1Y2JpQWdMeThnUTI5d2VTQXdJR0o1ZEdWek95QjNaU2R5WlNCa2IyNWxYRzRnSUdsbUlDaGxibVFnUFQwOUlITjBZWEowS1NCeVpYUjFjbTVjYmlBZ2FXWWdLSFJoY21kbGRDNXNaVzVuZEdnZ1BUMDlJREFnZkh3Z2MyOTFjbU5sTG14bGJtZDBhQ0E5UFQwZ01Da2djbVYwZFhKdVhHNWNiaUFnTHk4Z1JtRjBZV3dnWlhKeWIzSWdZMjl1WkdsMGFXOXVjMXh1SUNCaGMzTmxjblFvWlc1a0lENDlJSE4wWVhKMExDQW5jMjkxY21ObFJXNWtJRHdnYzI5MWNtTmxVM1JoY25RbktWeHVJQ0JoYzNObGNuUW9kR0Z5WjJWMFgzTjBZWEowSUQ0OUlEQWdKaVlnZEdGeVoyVjBYM04wWVhKMElEd2dkR0Z5WjJWMExteGxibWQwYUN4Y2JpQWdJQ0FnSUNkMFlYSm5aWFJUZEdGeWRDQnZkWFFnYjJZZ1ltOTFibVJ6SnlsY2JpQWdZWE56WlhKMEtITjBZWEowSUQ0OUlEQWdKaVlnYzNSaGNuUWdQQ0J6YjNWeVkyVXViR1Z1WjNSb0xDQW5jMjkxY21ObFUzUmhjblFnYjNWMElHOW1JR0p2ZFc1a2N5Y3BYRzRnSUdGemMyVnlkQ2hsYm1RZ1BqMGdNQ0FtSmlCbGJtUWdQRDBnYzI5MWNtTmxMbXhsYm1kMGFDd2dKM052ZFhKalpVVnVaQ0J2ZFhRZ2IyWWdZbTkxYm1Sekp5bGNibHh1SUNBdkx5QkJjbVVnZDJVZ2IyOWlQMXh1SUNCcFppQW9aVzVrSUQ0Z2RHaHBjeTVzWlc1bmRHZ3BYRzRnSUNBZ1pXNWtJRDBnZEdocGN5NXNaVzVuZEdoY2JpQWdhV1lnS0hSaGNtZGxkQzVzWlc1bmRHZ2dMU0IwWVhKblpYUmZjM1JoY25RZ1BDQmxibVFnTFNCemRHRnlkQ2xjYmlBZ0lDQmxibVFnUFNCMFlYSm5aWFF1YkdWdVozUm9JQzBnZEdGeVoyVjBYM04wWVhKMElDc2djM1JoY25SY2JseHVJQ0IyWVhJZ2JHVnVJRDBnWlc1a0lDMGdjM1JoY25SY2JseHVJQ0JwWmlBb2JHVnVJRHdnTVRBd0lIeDhJQ0ZDZFdabVpYSXVYM1Z6WlZSNWNHVmtRWEp5WVhsektTQjdYRzRnSUNBZ1ptOXlJQ2gyWVhJZ2FTQTlJREE3SUdrZ1BDQnNaVzQ3SUdrckt5bGNiaUFnSUNBZ0lIUmhjbWRsZEZ0cElDc2dkR0Z5WjJWMFgzTjBZWEowWFNBOUlIUm9hWE5iYVNBcklITjBZWEowWFZ4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUhSaGNtZGxkQzVmYzJWMEtIUm9hWE11YzNWaVlYSnlZWGtvYzNSaGNuUXNJSE4wWVhKMElDc2diR1Z1S1N3Z2RHRnlaMlYwWDNOMFlYSjBLVnh1SUNCOVhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5aVlYTmxOalJUYkdsalpTQW9ZblZtTENCemRHRnlkQ3dnWlc1a0tTQjdYRzRnSUdsbUlDaHpkR0Z5ZENBOVBUMGdNQ0FtSmlCbGJtUWdQVDA5SUdKMVppNXNaVzVuZEdncElIdGNiaUFnSUNCeVpYUjFjbTRnWW1GelpUWTBMbVp5YjIxQ2VYUmxRWEp5WVhrb1luVm1LVnh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJSEpsZEhWeWJpQmlZWE5sTmpRdVpuSnZiVUo1ZEdWQmNuSmhlU2hpZFdZdWMyeHBZMlVvYzNSaGNuUXNJR1Z1WkNrcFhHNGdJSDFjYm4xY2JseHVablZ1WTNScGIyNGdYM1YwWmpoVGJHbGpaU0FvWW5WbUxDQnpkR0Z5ZEN3Z1pXNWtLU0I3WEc0Z0lIWmhjaUJ5WlhNZ1BTQW5KMXh1SUNCMllYSWdkRzF3SUQwZ0p5ZGNiaUFnWlc1a0lEMGdUV0YwYUM1dGFXNG9ZblZtTG14bGJtZDBhQ3dnWlc1a0tWeHVYRzRnSUdadmNpQW9kbUZ5SUdrZ1BTQnpkR0Z5ZERzZ2FTQThJR1Z1WkRzZ2FTc3JLU0I3WEc0Z0lDQWdhV1lnS0dKMVpsdHBYU0E4UFNBd2VEZEdLU0I3WEc0Z0lDQWdJQ0J5WlhNZ0t6MGdaR1ZqYjJSbFZYUm1PRU5vWVhJb2RHMXdLU0FySUZOMGNtbHVaeTVtY205dFEyaGhja052WkdVb1luVm1XMmxkS1Z4dUlDQWdJQ0FnZEcxd0lEMGdKeWRjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ2RHMXdJQ3M5SUNjbEp5QXJJR0oxWmx0cFhTNTBiMU4wY21sdVp5Z3hOaWxjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0J5WlhSMWNtNGdjbVZ6SUNzZ1pHVmpiMlJsVlhSbU9FTm9ZWElvZEcxd0tWeHVmVnh1WEc1bWRXNWpkR2x2YmlCZllYTmphV2xUYkdsalpTQW9ZblZtTENCemRHRnlkQ3dnWlc1a0tTQjdYRzRnSUhaaGNpQnlaWFFnUFNBbkoxeHVJQ0JsYm1RZ1BTQk5ZWFJvTG0xcGJpaGlkV1l1YkdWdVozUm9MQ0JsYm1RcFhHNWNiaUFnWm05eUlDaDJZWElnYVNBOUlITjBZWEowT3lCcElEd2daVzVrT3lCcEt5c3BYRzRnSUNBZ2NtVjBJQ3M5SUZOMGNtbHVaeTVtY205dFEyaGhja052WkdVb1luVm1XMmxkS1Z4dUlDQnlaWFIxY200Z2NtVjBYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOWlhVzVoY25sVGJHbGpaU0FvWW5WbUxDQnpkR0Z5ZEN3Z1pXNWtLU0I3WEc0Z0lISmxkSFZ5YmlCZllYTmphV2xUYkdsalpTaGlkV1lzSUhOMFlYSjBMQ0JsYm1RcFhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5b1pYaFRiR2xqWlNBb1luVm1MQ0J6ZEdGeWRDd2daVzVrS1NCN1hHNGdJSFpoY2lCc1pXNGdQU0JpZFdZdWJHVnVaM1JvWEc1Y2JpQWdhV1lnS0NGemRHRnlkQ0I4ZkNCemRHRnlkQ0E4SURBcElITjBZWEowSUQwZ01GeHVJQ0JwWmlBb0lXVnVaQ0I4ZkNCbGJtUWdQQ0F3SUh4OElHVnVaQ0ErSUd4bGJpa2daVzVrSUQwZ2JHVnVYRzVjYmlBZ2RtRnlJRzkxZENBOUlDY25YRzRnSUdadmNpQW9kbUZ5SUdrZ1BTQnpkR0Z5ZERzZ2FTQThJR1Z1WkRzZ2FTc3JLU0I3WEc0Z0lDQWdiM1YwSUNzOUlIUnZTR1Y0S0dKMVpsdHBYU2xjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdiM1YwWEc1OVhHNWNibVoxYm1OMGFXOXVJRjkxZEdZeE5teGxVMnhwWTJVZ0tHSjFaaXdnYzNSaGNuUXNJR1Z1WkNrZ2UxeHVJQ0IyWVhJZ1lubDBaWE1nUFNCaWRXWXVjMnhwWTJVb2MzUmhjblFzSUdWdVpDbGNiaUFnZG1GeUlISmxjeUE5SUNjblhHNGdJR1p2Y2lBb2RtRnlJR2tnUFNBd095QnBJRHdnWW5sMFpYTXViR1Z1WjNSb095QnBJQ3M5SURJcElIdGNiaUFnSUNCeVpYTWdLejBnVTNSeWFXNW5MbVp5YjIxRGFHRnlRMjlrWlNoaWVYUmxjMXRwWFNBcklHSjVkR1Z6VzJrck1WMGdLaUF5TlRZcFhHNGdJSDFjYmlBZ2NtVjBkWEp1SUhKbGMxeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5Oc2FXTmxJRDBnWm5WdVkzUnBiMjRnS0hOMFlYSjBMQ0JsYm1RcElIdGNiaUFnZG1GeUlHeGxiaUE5SUhSb2FYTXViR1Z1WjNSb1hHNGdJSE4wWVhKMElEMGdZMnhoYlhBb2MzUmhjblFzSUd4bGJpd2dNQ2xjYmlBZ1pXNWtJRDBnWTJ4aGJYQW9aVzVrTENCc1pXNHNJR3hsYmlsY2JseHVJQ0JwWmlBb1FuVm1abVZ5TGw5MWMyVlVlWEJsWkVGeWNtRjVjeWtnZTF4dUlDQWdJSEpsZEhWeWJpQkNkV1ptWlhJdVgyRjFaMjFsYm5Rb2RHaHBjeTV6ZFdKaGNuSmhlU2h6ZEdGeWRDd2daVzVrS1NsY2JpQWdmU0JsYkhObElIdGNiaUFnSUNCMllYSWdjMnhwWTJWTVpXNGdQU0JsYm1RZ0xTQnpkR0Z5ZEZ4dUlDQWdJSFpoY2lCdVpYZENkV1lnUFNCdVpYY2dRblZtWm1WeUtITnNhV05sVEdWdUxDQjFibVJsWm1sdVpXUXNJSFJ5ZFdVcFhHNGdJQ0FnWm05eUlDaDJZWElnYVNBOUlEQTdJR2tnUENCemJHbGpaVXhsYmpzZ2FTc3JLU0I3WEc0Z0lDQWdJQ0J1WlhkQ2RXWmJhVjBnUFNCMGFHbHpXMmtnS3lCemRHRnlkRjFjYmlBZ0lDQjlYRzRnSUNBZ2NtVjBkWEp1SUc1bGQwSjFabHh1SUNCOVhHNTlYRzVjYmk4dklHQm5aWFJnSUhkcGJHd2dZbVVnY21WdGIzWmxaQ0JwYmlCT2IyUmxJREF1TVRNclhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExtZGxkQ0E5SUdaMWJtTjBhVzl1SUNodlptWnpaWFFwSUh0Y2JpQWdZMjl1YzI5c1pTNXNiMmNvSnk1blpYUW9LU0JwY3lCa1pYQnlaV05oZEdWa0xpQkJZMk5sYzNNZ2RYTnBibWNnWVhKeVlYa2dhVzVrWlhobGN5QnBibk4wWldGa0xpY3BYRzRnSUhKbGRIVnliaUIwYUdsekxuSmxZV1JWU1c1ME9DaHZabVp6WlhRcFhHNTlYRzVjYmk4dklHQnpaWFJnSUhkcGJHd2dZbVVnY21WdGIzWmxaQ0JwYmlCT2IyUmxJREF1TVRNclhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuTmxkQ0E5SUdaMWJtTjBhVzl1SUNoMkxDQnZabVp6WlhRcElIdGNiaUFnWTI5dWMyOXNaUzVzYjJjb0p5NXpaWFFvS1NCcGN5QmtaWEJ5WldOaGRHVmtMaUJCWTJObGMzTWdkWE5wYm1jZ1lYSnlZWGtnYVc1a1pYaGxjeUJwYm5OMFpXRmtMaWNwWEc0Z0lISmxkSFZ5YmlCMGFHbHpMbmR5YVhSbFZVbHVkRGdvZGl3Z2IyWm1jMlYwS1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbkpsWVdSVlNXNTBPQ0E5SUdaMWJtTjBhVzl1SUNodlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJR2xtSUNnaGJtOUJjM05sY25RcElIdGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdiMlptYzJWMElDRTlQU0J1ZFd4c0xDQW5iV2x6YzJsdVp5QnZabVp6WlhRbktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdQQ0IwYUdsekxteGxibWQwYUN3Z0oxUnllV2x1WnlCMGJ5QnlaV0ZrSUdKbGVXOXVaQ0JpZFdabVpYSWdiR1Z1WjNSb0p5bGNiaUFnZlZ4dVhHNGdJR2xtSUNodlptWnpaWFFnUGowZ2RHaHBjeTVzWlc1bmRHZ3BYRzRnSUNBZ2NtVjBkWEp1WEc1Y2JpQWdjbVYwZFhKdUlIUm9hWE5iYjJabWMyVjBYVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmZjbVZoWkZWSmJuUXhOaUFvWW5WbUxDQnZabVp6WlhRc0lHeHBkSFJzWlVWdVpHbGhiaXdnYm05QmMzTmxjblFwSUh0Y2JpQWdhV1lnS0NGdWIwRnpjMlZ5ZENrZ2UxeHVJQ0FnSUdGemMyVnlkQ2gwZVhCbGIyWWdiR2wwZEd4bFJXNWthV0Z1SUQwOVBTQW5ZbTl2YkdWaGJpY3NJQ2R0YVhOemFXNW5JRzl5SUdsdWRtRnNhV1FnWlc1a2FXRnVKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnYjJabWMyVjBJQ0U5UFNCdWRXeHNMQ0FuYldsemMybHVaeUJ2Wm1aelpYUW5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnS3lBeElEd2dZblZtTG14bGJtZDBhQ3dnSjFSeWVXbHVaeUIwYnlCeVpXRmtJR0psZVc5dVpDQmlkV1ptWlhJZ2JHVnVaM1JvSnlsY2JpQWdmVnh1WEc0Z0lIWmhjaUJzWlc0Z1BTQmlkV1l1YkdWdVozUm9YRzRnSUdsbUlDaHZabVp6WlhRZ1BqMGdiR1Z1S1Z4dUlDQWdJSEpsZEhWeWJseHVYRzRnSUhaaGNpQjJZV3hjYmlBZ2FXWWdLR3hwZEhSc1pVVnVaR2xoYmlrZ2UxeHVJQ0FnSUhaaGJDQTlJR0oxWmx0dlptWnpaWFJkWEc0Z0lDQWdhV1lnS0c5bVpuTmxkQ0FySURFZ1BDQnNaVzRwWEc0Z0lDQWdJQ0IyWVd3Z2ZEMGdZblZtVzI5bVpuTmxkQ0FySURGZElEdzhJRGhjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0IyWVd3Z1BTQmlkV1piYjJabWMyVjBYU0E4UENBNFhHNGdJQ0FnYVdZZ0tHOW1abk5sZENBcklERWdQQ0JzWlc0cFhHNGdJQ0FnSUNCMllXd2dmRDBnWW5WbVcyOW1abk5sZENBcklERmRYRzRnSUgxY2JpQWdjbVYwZFhKdUlIWmhiRnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuSmxZV1JWU1c1ME1UWk1SU0E5SUdaMWJtTjBhVzl1SUNodlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJSEpsZEhWeWJpQmZjbVZoWkZWSmJuUXhOaWgwYUdsekxDQnZabVp6WlhRc0lIUnlkV1VzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbkpsWVdSVlNXNTBNVFpDUlNBOUlHWjFibU4wYVc5dUlDaHZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUhKbGRIVnliaUJmY21WaFpGVkpiblF4TmloMGFHbHpMQ0J2Wm1aelpYUXNJR1poYkhObExDQnViMEZ6YzJWeWRDbGNibjFjYmx4dVpuVnVZM1JwYjI0Z1gzSmxZV1JWU1c1ME16SWdLR0oxWml3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJRzV2UVhOelpYSjBLU0I3WEc0Z0lHbG1JQ2doYm05QmMzTmxjblFwSUh0Y2JpQWdJQ0JoYzNObGNuUW9kSGx3Wlc5bUlHeHBkSFJzWlVWdVpHbGhiaUE5UFQwZ0oySnZiMnhsWVc0bkxDQW5iV2x6YzJsdVp5QnZjaUJwYm5aaGJHbGtJR1Z1WkdsaGJpY3BYRzRnSUNBZ1lYTnpaWEowS0c5bVpuTmxkQ0FoUFQwZ2RXNWtaV1pwYm1Wa0lDWW1JRzltWm5ObGRDQWhQVDBnYm5Wc2JDd2dKMjFwYzNOcGJtY2diMlptYzJWMEp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ3NnTXlBOElHSjFaaTVzWlc1bmRHZ3NJQ2RVY25scGJtY2dkRzhnY21WaFpDQmlaWGx2Ym1RZ1luVm1abVZ5SUd4bGJtZDBhQ2NwWEc0Z0lIMWNibHh1SUNCMllYSWdiR1Z1SUQwZ1luVm1MbXhsYm1kMGFGeHVJQ0JwWmlBb2IyWm1jMlYwSUQ0OUlHeGxiaWxjYmlBZ0lDQnlaWFIxY201Y2JseHVJQ0IyWVhJZ2RtRnNYRzRnSUdsbUlDaHNhWFIwYkdWRmJtUnBZVzRwSUh0Y2JpQWdJQ0JwWmlBb2IyWm1jMlYwSUNzZ01pQThJR3hsYmlsY2JpQWdJQ0FnSUhaaGJDQTlJR0oxWmx0dlptWnpaWFFnS3lBeVhTQThQQ0F4Tmx4dUlDQWdJR2xtSUNodlptWnpaWFFnS3lBeElEd2diR1Z1S1Z4dUlDQWdJQ0FnZG1Gc0lIdzlJR0oxWmx0dlptWnpaWFFnS3lBeFhTQThQQ0E0WEc0Z0lDQWdkbUZzSUh3OUlHSjFabHR2Wm1aelpYUmRYRzRnSUNBZ2FXWWdLRzltWm5ObGRDQXJJRE1nUENCc1pXNHBYRzRnSUNBZ0lDQjJZV3dnUFNCMllXd2dLeUFvWW5WbVcyOW1abk5sZENBcklETmRJRHc4SURJMElENCtQaUF3S1Z4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUdsbUlDaHZabVp6WlhRZ0t5QXhJRHdnYkdWdUtWeHVJQ0FnSUNBZ2RtRnNJRDBnWW5WbVcyOW1abk5sZENBcklERmRJRHc4SURFMlhHNGdJQ0FnYVdZZ0tHOW1abk5sZENBcklESWdQQ0JzWlc0cFhHNGdJQ0FnSUNCMllXd2dmRDBnWW5WbVcyOW1abk5sZENBcklESmRJRHc4SURoY2JpQWdJQ0JwWmlBb2IyWm1jMlYwSUNzZ015QThJR3hsYmlsY2JpQWdJQ0FnSUhaaGJDQjhQU0JpZFdaYmIyWm1jMlYwSUNzZ00xMWNiaUFnSUNCMllXd2dQU0IyWVd3Z0t5QW9ZblZtVzI5bVpuTmxkRjBnUER3Z01qUWdQajQrSURBcFhHNGdJSDFjYmlBZ2NtVjBkWEp1SUhaaGJGeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5KbFlXUlZTVzUwTXpKTVJTQTlJR1oxYm1OMGFXOXVJQ2h2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lISmxkSFZ5YmlCZmNtVmhaRlZKYm5Rek1paDBhR2x6TENCdlptWnpaWFFzSUhSeWRXVXNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuSmxZV1JWU1c1ME16SkNSU0E5SUdaMWJtTjBhVzl1SUNodlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJSEpsZEhWeWJpQmZjbVZoWkZWSmJuUXpNaWgwYUdsekxDQnZabVp6WlhRc0lHWmhiSE5sTENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1UW5WbVptVnlMbkJ5YjNSdmRIbHdaUzV5WldGa1NXNTBPQ0E5SUdaMWJtTjBhVzl1SUNodlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJR2xtSUNnaGJtOUJjM05sY25RcElIdGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdiMlptYzJWMElDRTlQU0J1ZFd4c0xGeHVJQ0FnSUNBZ0lDQW5iV2x6YzJsdVp5QnZabVp6WlhRbktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdQQ0IwYUdsekxteGxibWQwYUN3Z0oxUnllV2x1WnlCMGJ5QnlaV0ZrSUdKbGVXOXVaQ0JpZFdabVpYSWdiR1Z1WjNSb0p5bGNiaUFnZlZ4dVhHNGdJR2xtSUNodlptWnpaWFFnUGowZ2RHaHBjeTVzWlc1bmRHZ3BYRzRnSUNBZ2NtVjBkWEp1WEc1Y2JpQWdkbUZ5SUc1bFp5QTlJSFJvYVhOYmIyWm1jMlYwWFNBbUlEQjRPREJjYmlBZ2FXWWdLRzVsWnlsY2JpQWdJQ0J5WlhSMWNtNGdLREI0Wm1ZZ0xTQjBhR2x6VzI5bVpuTmxkRjBnS3lBeEtTQXFJQzB4WEc0Z0lHVnNjMlZjYmlBZ0lDQnlaWFIxY200Z2RHaHBjMXR2Wm1aelpYUmRYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOXlaV0ZrU1c1ME1UWWdLR0oxWml3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJRzV2UVhOelpYSjBLU0I3WEc0Z0lHbG1JQ2doYm05QmMzTmxjblFwSUh0Y2JpQWdJQ0JoYzNObGNuUW9kSGx3Wlc5bUlHeHBkSFJzWlVWdVpHbGhiaUE5UFQwZ0oySnZiMnhsWVc0bkxDQW5iV2x6YzJsdVp5QnZjaUJwYm5aaGJHbGtJR1Z1WkdsaGJpY3BYRzRnSUNBZ1lYTnpaWEowS0c5bVpuTmxkQ0FoUFQwZ2RXNWtaV1pwYm1Wa0lDWW1JRzltWm5ObGRDQWhQVDBnYm5Wc2JDd2dKMjFwYzNOcGJtY2diMlptYzJWMEp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ3NnTVNBOElHSjFaaTVzWlc1bmRHZ3NJQ2RVY25scGJtY2dkRzhnY21WaFpDQmlaWGx2Ym1RZ1luVm1abVZ5SUd4bGJtZDBhQ2NwWEc0Z0lIMWNibHh1SUNCMllYSWdiR1Z1SUQwZ1luVm1MbXhsYm1kMGFGeHVJQ0JwWmlBb2IyWm1jMlYwSUQ0OUlHeGxiaWxjYmlBZ0lDQnlaWFIxY201Y2JseHVJQ0IyWVhJZ2RtRnNJRDBnWDNKbFlXUlZTVzUwTVRZb1luVm1MQ0J2Wm1aelpYUXNJR3hwZEhSc1pVVnVaR2xoYml3Z2RISjFaU2xjYmlBZ2RtRnlJRzVsWnlBOUlIWmhiQ0FtSURCNE9EQXdNRnh1SUNCcFppQW9ibVZuS1Z4dUlDQWdJSEpsZEhWeWJpQW9NSGhtWm1abUlDMGdkbUZzSUNzZ01Ta2dLaUF0TVZ4dUlDQmxiSE5sWEc0Z0lDQWdjbVYwZFhKdUlIWmhiRnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuSmxZV1JKYm5ReE5reEZJRDBnWm5WdVkzUnBiMjRnS0c5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdjbVYwZFhKdUlGOXlaV0ZrU1c1ME1UWW9kR2hwY3l3Z2IyWm1jMlYwTENCMGNuVmxMQ0J1YjBGemMyVnlkQ2xjYm4xY2JseHVRblZtWm1WeUxuQnliM1J2ZEhsd1pTNXlaV0ZrU1c1ME1UWkNSU0E5SUdaMWJtTjBhVzl1SUNodlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJSEpsZEhWeWJpQmZjbVZoWkVsdWRERTJLSFJvYVhNc0lHOW1abk5sZEN3Z1ptRnNjMlVzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVtZFc1amRHbHZiaUJmY21WaFpFbHVkRE15SUNoaWRXWXNJRzltWm5ObGRDd2diR2wwZEd4bFJXNWthV0Z1TENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0JwWmlBb0lXNXZRWE56WlhKMEtTQjdYRzRnSUNBZ1lYTnpaWEowS0hSNWNHVnZaaUJzYVhSMGJHVkZibVJwWVc0Z1BUMDlJQ2RpYjI5c1pXRnVKeXdnSjIxcGMzTnBibWNnYjNJZ2FXNTJZV3hwWkNCbGJtUnBZVzRuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ0lUMDlJSFZ1WkdWbWFXNWxaQ0FtSmlCdlptWnpaWFFnSVQwOUlHNTFiR3dzSUNkdGFYTnphVzVuSUc5bVpuTmxkQ2NwWEc0Z0lDQWdZWE56WlhKMEtHOW1abk5sZENBcklETWdQQ0JpZFdZdWJHVnVaM1JvTENBblZISjVhVzVuSUhSdklISmxZV1FnWW1WNWIyNWtJR0oxWm1abGNpQnNaVzVuZEdnbktWeHVJQ0I5WEc1Y2JpQWdkbUZ5SUd4bGJpQTlJR0oxWmk1c1pXNW5kR2hjYmlBZ2FXWWdLRzltWm5ObGRDQStQU0JzWlc0cFhHNGdJQ0FnY21WMGRYSnVYRzVjYmlBZ2RtRnlJSFpoYkNBOUlGOXlaV0ZrVlVsdWRETXlLR0oxWml3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJSFJ5ZFdVcFhHNGdJSFpoY2lCdVpXY2dQU0IyWVd3Z0ppQXdlRGd3TURBd01EQXdYRzRnSUdsbUlDaHVaV2NwWEc0Z0lDQWdjbVYwZFhKdUlDZ3dlR1ptWm1abVptWm1JQzBnZG1Gc0lDc2dNU2tnS2lBdE1WeHVJQ0JsYkhObFhHNGdJQ0FnY21WMGRYSnVJSFpoYkZ4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbkpsWVdSSmJuUXpNa3hGSUQwZ1puVnVZM1JwYjI0Z0tHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnY21WMGRYSnVJRjl5WldGa1NXNTBNeklvZEdocGN5d2diMlptYzJWMExDQjBjblZsTENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1UW5WbVptVnlMbkJ5YjNSdmRIbHdaUzV5WldGa1NXNTBNekpDUlNBOUlHWjFibU4wYVc5dUlDaHZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUhKbGRIVnliaUJmY21WaFpFbHVkRE15S0hSb2FYTXNJRzltWm5ObGRDd2dabUZzYzJVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1bWRXNWpkR2x2YmlCZmNtVmhaRVpzYjJGMElDaGlkV1lzSUc5bVpuTmxkQ3dnYkdsMGRHeGxSVzVrYVdGdUxDQnViMEZ6YzJWeWRDa2dlMXh1SUNCcFppQW9JVzV2UVhOelpYSjBLU0I3WEc0Z0lDQWdZWE56WlhKMEtIUjVjR1Z2WmlCc2FYUjBiR1ZGYm1ScFlXNGdQVDA5SUNkaWIyOXNaV0Z1Snl3Z0oyMXBjM05wYm1jZ2IzSWdhVzUyWVd4cFpDQmxibVJwWVc0bktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdLeUF6SUR3Z1luVm1MbXhsYm1kMGFDd2dKMVJ5ZVdsdVp5QjBieUJ5WldGa0lHSmxlVzl1WkNCaWRXWm1aWElnYkdWdVozUm9KeWxjYmlBZ2ZWeHVYRzRnSUhKbGRIVnliaUJwWldWbE56VTBMbkpsWVdRb1luVm1MQ0J2Wm1aelpYUXNJR3hwZEhSc1pVVnVaR2xoYml3Z01qTXNJRFFwWEc1OVhHNWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVjbVZoWkVac2IyRjBURVVnUFNCbWRXNWpkR2x2YmlBb2IyWm1jMlYwTENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0J5WlhSMWNtNGdYM0psWVdSR2JHOWhkQ2gwYUdsekxDQnZabVp6WlhRc0lIUnlkV1VzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbkpsWVdSR2JHOWhkRUpGSUQwZ1puVnVZM1JwYjI0Z0tHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnY21WMGRYSnVJRjl5WldGa1JteHZZWFFvZEdocGN5d2diMlptYzJWMExDQm1ZV3h6WlN3Z2JtOUJjM05sY25RcFhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5eVpXRmtSRzkxWW14bElDaGlkV1lzSUc5bVpuTmxkQ3dnYkdsMGRHeGxSVzVrYVdGdUxDQnViMEZ6YzJWeWRDa2dlMXh1SUNCcFppQW9JVzV2UVhOelpYSjBLU0I3WEc0Z0lDQWdZWE56WlhKMEtIUjVjR1Z2WmlCc2FYUjBiR1ZGYm1ScFlXNGdQVDA5SUNkaWIyOXNaV0Z1Snl3Z0oyMXBjM05wYm1jZ2IzSWdhVzUyWVd4cFpDQmxibVJwWVc0bktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdLeUEzSUR3Z1luVm1MbXhsYm1kMGFDd2dKMVJ5ZVdsdVp5QjBieUJ5WldGa0lHSmxlVzl1WkNCaWRXWm1aWElnYkdWdVozUm9KeWxjYmlBZ2ZWeHVYRzRnSUhKbGRIVnliaUJwWldWbE56VTBMbkpsWVdRb1luVm1MQ0J2Wm1aelpYUXNJR3hwZEhSc1pVVnVaR2xoYml3Z05USXNJRGdwWEc1OVhHNWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVjbVZoWkVSdmRXSnNaVXhGSUQwZ1puVnVZM1JwYjI0Z0tHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnY21WMGRYSnVJRjl5WldGa1JHOTFZbXhsS0hSb2FYTXNJRzltWm5ObGRDd2dkSEoxWlN3Z2JtOUJjM05sY25RcFhHNTlYRzVjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1Y21WaFpFUnZkV0pzWlVKRklEMGdablZ1WTNScGIyNGdLRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ2NtVjBkWEp1SUY5eVpXRmtSRzkxWW14bEtIUm9hWE1zSUc5bVpuTmxkQ3dnWm1Gc2MyVXNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuZHlhWFJsVlVsdWREZ2dQU0JtZFc1amRHbHZiaUFvZG1Gc2RXVXNJRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ2FXWWdLQ0Z1YjBGemMyVnlkQ2tnZTF4dUlDQWdJR0Z6YzJWeWRDaDJZV3gxWlNBaFBUMGdkVzVrWldacGJtVmtJQ1ltSUhaaGJIVmxJQ0U5UFNCdWRXeHNMQ0FuYldsemMybHVaeUIyWVd4MVpTY3BYRzRnSUNBZ1lYTnpaWEowS0c5bVpuTmxkQ0FoUFQwZ2RXNWtaV1pwYm1Wa0lDWW1JRzltWm5ObGRDQWhQVDBnYm5Wc2JDd2dKMjFwYzNOcGJtY2diMlptYzJWMEp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJRHdnZEdocGN5NXNaVzVuZEdnc0lDZDBjbmxwYm1jZ2RHOGdkM0pwZEdVZ1ltVjViMjVrSUdKMVptWmxjaUJzWlc1bmRHZ25LVnh1SUNBZ0lIWmxjbWxtZFdsdWRDaDJZV3gxWlN3Z01IaG1aaWxjYmlBZ2ZWeHVYRzRnSUdsbUlDaHZabVp6WlhRZ1BqMGdkR2hwY3k1c1pXNW5kR2dwSUhKbGRIVnlibHh1WEc0Z0lIUm9hWE5iYjJabWMyVjBYU0E5SUhaaGJIVmxYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOTNjbWwwWlZWSmJuUXhOaUFvWW5WbUxDQjJZV3gxWlN3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJRzV2UVhOelpYSjBLU0I3WEc0Z0lHbG1JQ2doYm05QmMzTmxjblFwSUh0Y2JpQWdJQ0JoYzNObGNuUW9kbUZzZFdVZ0lUMDlJSFZ1WkdWbWFXNWxaQ0FtSmlCMllXeDFaU0FoUFQwZ2JuVnNiQ3dnSjIxcGMzTnBibWNnZG1Gc2RXVW5LVnh1SUNBZ0lHRnpjMlZ5ZENoMGVYQmxiMllnYkdsMGRHeGxSVzVrYVdGdUlEMDlQU0FuWW05dmJHVmhiaWNzSUNkdGFYTnphVzVuSUc5eUlHbHVkbUZzYVdRZ1pXNWthV0Z1SnlsY2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2IyWm1jMlYwSUNFOVBTQnVkV3hzTENBbmJXbHpjMmx1WnlCdlptWnpaWFFuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ0t5QXhJRHdnWW5WbUxteGxibWQwYUN3Z0ozUnllV2x1WnlCMGJ5QjNjbWwwWlNCaVpYbHZibVFnWW5WbVptVnlJR3hsYm1kMGFDY3BYRzRnSUNBZ2RtVnlhV1oxYVc1MEtIWmhiSFZsTENBd2VHWm1abVlwWEc0Z0lIMWNibHh1SUNCMllYSWdiR1Z1SUQwZ1luVm1MbXhsYm1kMGFGeHVJQ0JwWmlBb2IyWm1jMlYwSUQ0OUlHeGxiaWxjYmlBZ0lDQnlaWFIxY201Y2JseHVJQ0JtYjNJZ0tIWmhjaUJwSUQwZ01Dd2dhaUE5SUUxaGRHZ3ViV2x1S0d4bGJpQXRJRzltWm5ObGRDd2dNaWs3SUdrZ1BDQnFPeUJwS3lzcElIdGNiaUFnSUNCaWRXWmJiMlptYzJWMElDc2dhVjBnUFZ4dUlDQWdJQ0FnSUNBb2RtRnNkV1VnSmlBb01IaG1aaUE4UENBb09DQXFJQ2hzYVhSMGJHVkZibVJwWVc0Z1B5QnBJRG9nTVNBdElHa3BLU2twSUQ0K1BseHVJQ0FnSUNBZ0lDQWdJQ0FnS0d4cGRIUnNaVVZ1WkdsaGJpQS9JR2tnT2lBeElDMGdhU2tnS2lBNFhHNGdJSDFjYm4xY2JseHVRblZtWm1WeUxuQnliM1J2ZEhsd1pTNTNjbWwwWlZWSmJuUXhOa3hGSUQwZ1puVnVZM1JwYjI0Z0tIWmhiSFZsTENCdlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJRjkzY21sMFpWVkpiblF4TmloMGFHbHpMQ0IyWVd4MVpTd2diMlptYzJWMExDQjBjblZsTENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1UW5WbVptVnlMbkJ5YjNSdmRIbHdaUzUzY21sMFpWVkpiblF4TmtKRklEMGdablZ1WTNScGIyNGdLSFpoYkhWbExDQnZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUY5M2NtbDBaVlZKYm5ReE5paDBhR2x6TENCMllXeDFaU3dnYjJabWMyVjBMQ0JtWVd4elpTd2dibTlCYzNObGNuUXBYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOTNjbWwwWlZWSmJuUXpNaUFvWW5WbUxDQjJZV3gxWlN3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJRzV2UVhOelpYSjBLU0I3WEc0Z0lHbG1JQ2doYm05QmMzTmxjblFwSUh0Y2JpQWdJQ0JoYzNObGNuUW9kbUZzZFdVZ0lUMDlJSFZ1WkdWbWFXNWxaQ0FtSmlCMllXeDFaU0FoUFQwZ2JuVnNiQ3dnSjIxcGMzTnBibWNnZG1Gc2RXVW5LVnh1SUNBZ0lHRnpjMlZ5ZENoMGVYQmxiMllnYkdsMGRHeGxSVzVrYVdGdUlEMDlQU0FuWW05dmJHVmhiaWNzSUNkdGFYTnphVzVuSUc5eUlHbHVkbUZzYVdRZ1pXNWthV0Z1SnlsY2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2IyWm1jMlYwSUNFOVBTQnVkV3hzTENBbmJXbHpjMmx1WnlCdlptWnpaWFFuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ0t5QXpJRHdnWW5WbUxteGxibWQwYUN3Z0ozUnllV2x1WnlCMGJ5QjNjbWwwWlNCaVpYbHZibVFnWW5WbVptVnlJR3hsYm1kMGFDY3BYRzRnSUNBZ2RtVnlhV1oxYVc1MEtIWmhiSFZsTENBd2VHWm1abVptWm1abUtWeHVJQ0I5WEc1Y2JpQWdkbUZ5SUd4bGJpQTlJR0oxWmk1c1pXNW5kR2hjYmlBZ2FXWWdLRzltWm5ObGRDQStQU0JzWlc0cFhHNGdJQ0FnY21WMGRYSnVYRzVjYmlBZ1ptOXlJQ2gyWVhJZ2FTQTlJREFzSUdvZ1BTQk5ZWFJvTG0xcGJpaHNaVzRnTFNCdlptWnpaWFFzSURRcE95QnBJRHdnYWpzZ2FTc3JLU0I3WEc0Z0lDQWdZblZtVzI5bVpuTmxkQ0FySUdsZElEMWNiaUFnSUNBZ0lDQWdLSFpoYkhWbElENCtQaUFvYkdsMGRHeGxSVzVrYVdGdUlEOGdhU0E2SURNZ0xTQnBLU0FxSURncElDWWdNSGhtWmx4dUlDQjlYRzU5WEc1Y2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdWQzSnBkR1ZWU1c1ME16Sk1SU0E5SUdaMWJtTjBhVzl1SUNoMllXeDFaU3dnYjJabWMyVjBMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQmZkM0pwZEdWVlNXNTBNeklvZEdocGN5d2dkbUZzZFdVc0lHOW1abk5sZEN3Z2RISjFaU3dnYm05QmMzTmxjblFwWEc1OVhHNWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVkM0pwZEdWVlNXNTBNekpDUlNBOUlHWjFibU4wYVc5dUlDaDJZV3gxWlN3Z2IyWm1jMlYwTENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0JmZDNKcGRHVlZTVzUwTXpJb2RHaHBjeXdnZG1Gc2RXVXNJRzltWm5ObGRDd2dabUZzYzJVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5keWFYUmxTVzUwT0NBOUlHWjFibU4wYVc5dUlDaDJZV3gxWlN3Z2IyWm1jMlYwTENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0JwWmlBb0lXNXZRWE56WlhKMEtTQjdYRzRnSUNBZ1lYTnpaWEowS0haaGJIVmxJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdkbUZzZFdVZ0lUMDlJRzUxYkd3c0lDZHRhWE56YVc1bklIWmhiSFZsSnlsY2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2IyWm1jMlYwSUNFOVBTQnVkV3hzTENBbmJXbHpjMmx1WnlCdlptWnpaWFFuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ1BDQjBhR2x6TG14bGJtZDBhQ3dnSjFSeWVXbHVaeUIwYnlCM2NtbDBaU0JpWlhsdmJtUWdZblZtWm1WeUlHeGxibWQwYUNjcFhHNGdJQ0FnZG1WeWFXWnphVzUwS0haaGJIVmxMQ0F3ZURkbUxDQXRNSGc0TUNsY2JpQWdmVnh1WEc0Z0lHbG1JQ2h2Wm1aelpYUWdQajBnZEdocGN5NXNaVzVuZEdncFhHNGdJQ0FnY21WMGRYSnVYRzVjYmlBZ2FXWWdLSFpoYkhWbElENDlJREFwWEc0Z0lDQWdkR2hwY3k1M2NtbDBaVlZKYm5RNEtIWmhiSFZsTENCdlptWnpaWFFzSUc1dlFYTnpaWEowS1Z4dUlDQmxiSE5sWEc0Z0lDQWdkR2hwY3k1M2NtbDBaVlZKYm5RNEtEQjRabVlnS3lCMllXeDFaU0FySURFc0lHOW1abk5sZEN3Z2JtOUJjM05sY25RcFhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5M2NtbDBaVWx1ZERFMklDaGlkV1lzSUhaaGJIVmxMQ0J2Wm1aelpYUXNJR3hwZEhSc1pVVnVaR2xoYml3Z2JtOUJjM05sY25RcElIdGNiaUFnYVdZZ0tDRnViMEZ6YzJWeWRDa2dlMXh1SUNBZ0lHRnpjMlZ5ZENoMllXeDFaU0FoUFQwZ2RXNWtaV1pwYm1Wa0lDWW1JSFpoYkhWbElDRTlQU0J1ZFd4c0xDQW5iV2x6YzJsdVp5QjJZV3gxWlNjcFhHNGdJQ0FnWVhOelpYSjBLSFI1Y0dWdlppQnNhWFIwYkdWRmJtUnBZVzRnUFQwOUlDZGliMjlzWldGdUp5d2dKMjFwYzNOcGJtY2diM0lnYVc1MllXeHBaQ0JsYm1ScFlXNG5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnSVQwOUlIVnVaR1ZtYVc1bFpDQW1KaUJ2Wm1aelpYUWdJVDA5SUc1MWJHd3NJQ2R0YVhOemFXNW5JRzltWm5ObGRDY3BYRzRnSUNBZ1lYTnpaWEowS0c5bVpuTmxkQ0FySURFZ1BDQmlkV1l1YkdWdVozUm9MQ0FuVkhKNWFXNW5JSFJ2SUhkeWFYUmxJR0psZVc5dVpDQmlkV1ptWlhJZ2JHVnVaM1JvSnlsY2JpQWdJQ0IyWlhKcFpuTnBiblFvZG1Gc2RXVXNJREI0TjJabVppd2dMVEI0T0RBd01DbGNiaUFnZlZ4dVhHNGdJSFpoY2lCc1pXNGdQU0JpZFdZdWJHVnVaM1JvWEc0Z0lHbG1JQ2h2Wm1aelpYUWdQajBnYkdWdUtWeHVJQ0FnSUhKbGRIVnlibHh1WEc0Z0lHbG1JQ2gyWVd4MVpTQStQU0F3S1Z4dUlDQWdJRjkzY21sMFpWVkpiblF4TmloaWRXWXNJSFpoYkhWbExDQnZabVp6WlhRc0lHeHBkSFJzWlVWdVpHbGhiaXdnYm05QmMzTmxjblFwWEc0Z0lHVnNjMlZjYmlBZ0lDQmZkM0pwZEdWVlNXNTBNVFlvWW5WbUxDQXdlR1ptWm1ZZ0t5QjJZV3gxWlNBcklERXNJRzltWm5ObGRDd2diR2wwZEd4bFJXNWthV0Z1TENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1UW5WbVptVnlMbkJ5YjNSdmRIbHdaUzUzY21sMFpVbHVkREUyVEVVZ1BTQm1kVzVqZEdsdmJpQW9kbUZzZFdVc0lHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnWDNkeWFYUmxTVzUwTVRZb2RHaHBjeXdnZG1Gc2RXVXNJRzltWm5ObGRDd2dkSEoxWlN3Z2JtOUJjM05sY25RcFhHNTlYRzVjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1ZDNKcGRHVkpiblF4TmtKRklEMGdablZ1WTNScGIyNGdLSFpoYkhWbExDQnZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUY5M2NtbDBaVWx1ZERFMktIUm9hWE1zSUhaaGJIVmxMQ0J2Wm1aelpYUXNJR1poYkhObExDQnViMEZ6YzJWeWRDbGNibjFjYmx4dVpuVnVZM1JwYjI0Z1gzZHlhWFJsU1c1ME16SWdLR0oxWml3Z2RtRnNkV1VzSUc5bVpuTmxkQ3dnYkdsMGRHeGxSVzVrYVdGdUxDQnViMEZ6YzJWeWRDa2dlMXh1SUNCcFppQW9JVzV2UVhOelpYSjBLU0I3WEc0Z0lDQWdZWE56WlhKMEtIWmhiSFZsSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnZG1Gc2RXVWdJVDA5SUc1MWJHd3NJQ2R0YVhOemFXNW5JSFpoYkhWbEp5bGNiaUFnSUNCaGMzTmxjblFvZEhsd1pXOW1JR3hwZEhSc1pVVnVaR2xoYmlBOVBUMGdKMkp2YjJ4bFlXNG5MQ0FuYldsemMybHVaeUJ2Y2lCcGJuWmhiR2xrSUdWdVpHbGhiaWNwWEc0Z0lDQWdZWE56WlhKMEtHOW1abk5sZENBaFBUMGdkVzVrWldacGJtVmtJQ1ltSUc5bVpuTmxkQ0FoUFQwZ2JuVnNiQ3dnSjIxcGMzTnBibWNnYjJabWMyVjBKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNzZ015QThJR0oxWmk1c1pXNW5kR2dzSUNkVWNubHBibWNnZEc4Z2QzSnBkR1VnWW1WNWIyNWtJR0oxWm1abGNpQnNaVzVuZEdnbktWeHVJQ0FnSUhabGNtbG1jMmx1ZENoMllXeDFaU3dnTUhnM1ptWm1abVptWml3Z0xUQjRPREF3TURBd01EQXBYRzRnSUgxY2JseHVJQ0IyWVhJZ2JHVnVJRDBnWW5WbUxteGxibWQwYUZ4dUlDQnBaaUFvYjJabWMyVjBJRDQ5SUd4bGJpbGNiaUFnSUNCeVpYUjFjbTVjYmx4dUlDQnBaaUFvZG1Gc2RXVWdQajBnTUNsY2JpQWdJQ0JmZDNKcGRHVlZTVzUwTXpJb1luVm1MQ0IyWVd4MVpTd2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSUc1dlFYTnpaWEowS1Z4dUlDQmxiSE5sWEc0Z0lDQWdYM2R5YVhSbFZVbHVkRE15S0dKMVppd2dNSGhtWm1abVptWm1aaUFySUhaaGJIVmxJQ3NnTVN3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuZHlhWFJsU1c1ME16Sk1SU0E5SUdaMWJtTjBhVzl1SUNoMllXeDFaU3dnYjJabWMyVjBMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQmZkM0pwZEdWSmJuUXpNaWgwYUdsekxDQjJZV3gxWlN3Z2IyWm1jMlYwTENCMGNuVmxMQ0J1YjBGemMyVnlkQ2xjYm4xY2JseHVRblZtWm1WeUxuQnliM1J2ZEhsd1pTNTNjbWwwWlVsdWRETXlRa1VnUFNCbWRXNWpkR2x2YmlBb2RtRnNkV1VzSUc5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdYM2R5YVhSbFNXNTBNeklvZEdocGN5d2dkbUZzZFdVc0lHOW1abk5sZEN3Z1ptRnNjMlVzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVtZFc1amRHbHZiaUJmZDNKcGRHVkdiRzloZENBb1luVm1MQ0IyWVd4MVpTd2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSUc1dlFYTnpaWEowS1NCN1hHNGdJR2xtSUNnaGJtOUJjM05sY25RcElIdGNiaUFnSUNCaGMzTmxjblFvZG1Gc2RXVWdJVDA5SUhWdVpHVm1hVzVsWkNBbUppQjJZV3gxWlNBaFBUMGdiblZzYkN3Z0oyMXBjM05wYm1jZ2RtRnNkV1VuS1Z4dUlDQWdJR0Z6YzJWeWRDaDBlWEJsYjJZZ2JHbDBkR3hsUlc1a2FXRnVJRDA5UFNBblltOXZiR1ZoYmljc0lDZHRhWE56YVc1bklHOXlJR2x1ZG1Gc2FXUWdaVzVrYVdGdUp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdiMlptYzJWMElDRTlQU0J1ZFd4c0xDQW5iV2x6YzJsdVp5QnZabVp6WlhRbktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdLeUF6SUR3Z1luVm1MbXhsYm1kMGFDd2dKMVJ5ZVdsdVp5QjBieUIzY21sMFpTQmlaWGx2Ym1RZ1luVm1abVZ5SUd4bGJtZDBhQ2NwWEc0Z0lDQWdkbVZ5YVdaSlJVVkZOelUwS0haaGJIVmxMQ0F6TGpRd01qZ3lNelEyTmpNNE5USTRPRFpsS3pNNExDQXRNeTQwTURJNE1qTTBOall6T0RVeU9EZzJaU3N6T0NsY2JpQWdmVnh1WEc0Z0lIWmhjaUJzWlc0Z1BTQmlkV1l1YkdWdVozUm9YRzRnSUdsbUlDaHZabVp6WlhRZ1BqMGdiR1Z1S1Z4dUlDQWdJSEpsZEhWeWJseHVYRzRnSUdsbFpXVTNOVFF1ZDNKcGRHVW9ZblZtTENCMllXeDFaU3dnYjJabWMyVjBMQ0JzYVhSMGJHVkZibVJwWVc0c0lESXpMQ0EwS1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbmR5YVhSbFJteHZZWFJNUlNBOUlHWjFibU4wYVc5dUlDaDJZV3gxWlN3Z2IyWm1jMlYwTENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0JmZDNKcGRHVkdiRzloZENoMGFHbHpMQ0IyWVd4MVpTd2diMlptYzJWMExDQjBjblZsTENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1UW5WbVptVnlMbkJ5YjNSdmRIbHdaUzUzY21sMFpVWnNiMkYwUWtVZ1BTQm1kVzVqZEdsdmJpQW9kbUZzZFdVc0lHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnWDNkeWFYUmxSbXh2WVhRb2RHaHBjeXdnZG1Gc2RXVXNJRzltWm5ObGRDd2dabUZzYzJVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1bWRXNWpkR2x2YmlCZmQzSnBkR1ZFYjNWaWJHVWdLR0oxWml3Z2RtRnNkV1VzSUc5bVpuTmxkQ3dnYkdsMGRHeGxSVzVrYVdGdUxDQnViMEZ6YzJWeWRDa2dlMXh1SUNCcFppQW9JVzV2UVhOelpYSjBLU0I3WEc0Z0lDQWdZWE56WlhKMEtIWmhiSFZsSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnZG1Gc2RXVWdJVDA5SUc1MWJHd3NJQ2R0YVhOemFXNW5JSFpoYkhWbEp5bGNiaUFnSUNCaGMzTmxjblFvZEhsd1pXOW1JR3hwZEhSc1pVVnVaR2xoYmlBOVBUMGdKMkp2YjJ4bFlXNG5MQ0FuYldsemMybHVaeUJ2Y2lCcGJuWmhiR2xrSUdWdVpHbGhiaWNwWEc0Z0lDQWdZWE56WlhKMEtHOW1abk5sZENBaFBUMGdkVzVrWldacGJtVmtJQ1ltSUc5bVpuTmxkQ0FoUFQwZ2JuVnNiQ3dnSjIxcGMzTnBibWNnYjJabWMyVjBKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNzZ055QThJR0oxWmk1c1pXNW5kR2dzWEc0Z0lDQWdJQ0FnSUNkVWNubHBibWNnZEc4Z2QzSnBkR1VnWW1WNWIyNWtJR0oxWm1abGNpQnNaVzVuZEdnbktWeHVJQ0FnSUhabGNtbG1TVVZGUlRjMU5DaDJZV3gxWlN3Z01TNDNPVGMyT1RNeE16UTROakl6TVRVM1JTc3pNRGdzSUMweExqYzVOelk1TXpFek5EZzJNak14TlRkRkt6TXdPQ2xjYmlBZ2ZWeHVYRzRnSUhaaGNpQnNaVzRnUFNCaWRXWXViR1Z1WjNSb1hHNGdJR2xtSUNodlptWnpaWFFnUGowZ2JHVnVLVnh1SUNBZ0lISmxkSFZ5Ymx4dVhHNGdJR2xsWldVM05UUXVkM0pwZEdVb1luVm1MQ0IyWVd4MVpTd2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSURVeUxDQTRLVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuZHlhWFJsUkc5MVlteGxURVVnUFNCbWRXNWpkR2x2YmlBb2RtRnNkV1VzSUc5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdYM2R5YVhSbFJHOTFZbXhsS0hSb2FYTXNJSFpoYkhWbExDQnZabVp6WlhRc0lIUnlkV1VzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbmR5YVhSbFJHOTFZbXhsUWtVZ1BTQm1kVzVqZEdsdmJpQW9kbUZzZFdVc0lHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnWDNkeWFYUmxSRzkxWW14bEtIUm9hWE1zSUhaaGJIVmxMQ0J2Wm1aelpYUXNJR1poYkhObExDQnViMEZ6YzJWeWRDbGNibjFjYmx4dUx5OGdabWxzYkNoMllXeDFaU3dnYzNSaGNuUTlNQ3dnWlc1a1BXSjFabVpsY2k1c1pXNW5kR2dwWEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG1acGJHd2dQU0JtZFc1amRHbHZiaUFvZG1Gc2RXVXNJSE4wWVhKMExDQmxibVFwSUh0Y2JpQWdhV1lnS0NGMllXeDFaU2tnZG1Gc2RXVWdQU0F3WEc0Z0lHbG1JQ2doYzNSaGNuUXBJSE4wWVhKMElEMGdNRnh1SUNCcFppQW9JV1Z1WkNrZ1pXNWtJRDBnZEdocGN5NXNaVzVuZEdoY2JseHVJQ0JwWmlBb2RIbHdaVzltSUhaaGJIVmxJRDA5UFNBbmMzUnlhVzVuSnlrZ2UxeHVJQ0FnSUhaaGJIVmxJRDBnZG1Gc2RXVXVZMmhoY2tOdlpHVkJkQ2d3S1Z4dUlDQjlYRzVjYmlBZ1lYTnpaWEowS0hSNWNHVnZaaUIyWVd4MVpTQTlQVDBnSjI1MWJXSmxjaWNnSmlZZ0lXbHpUbUZPS0haaGJIVmxLU3dnSjNaaGJIVmxJR2x6SUc1dmRDQmhJRzUxYldKbGNpY3BYRzRnSUdGemMyVnlkQ2hsYm1RZ1BqMGdjM1JoY25Rc0lDZGxibVFnUENCemRHRnlkQ2NwWEc1Y2JpQWdMeThnUm1sc2JDQXdJR0o1ZEdWek95QjNaU2R5WlNCa2IyNWxYRzRnSUdsbUlDaGxibVFnUFQwOUlITjBZWEowS1NCeVpYUjFjbTVjYmlBZ2FXWWdLSFJvYVhNdWJHVnVaM1JvSUQwOVBTQXdLU0J5WlhSMWNtNWNibHh1SUNCaGMzTmxjblFvYzNSaGNuUWdQajBnTUNBbUppQnpkR0Z5ZENBOElIUm9hWE11YkdWdVozUm9MQ0FuYzNSaGNuUWdiM1YwSUc5bUlHSnZkVzVrY3ljcFhHNGdJR0Z6YzJWeWRDaGxibVFnUGowZ01DQW1KaUJsYm1RZ1BEMGdkR2hwY3k1c1pXNW5kR2dzSUNkbGJtUWdiM1YwSUc5bUlHSnZkVzVrY3ljcFhHNWNiaUFnWm05eUlDaDJZWElnYVNBOUlITjBZWEowT3lCcElEd2daVzVrT3lCcEt5c3BJSHRjYmlBZ0lDQjBhR2x6VzJsZElEMGdkbUZzZFdWY2JpQWdmVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExtbHVjM0JsWTNRZ1BTQm1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lIWmhjaUJ2ZFhRZ1BTQmJYVnh1SUNCMllYSWdiR1Z1SUQwZ2RHaHBjeTVzWlc1bmRHaGNiaUFnWm05eUlDaDJZWElnYVNBOUlEQTdJR2tnUENCc1pXNDdJR2tyS3lrZ2UxeHVJQ0FnSUc5MWRGdHBYU0E5SUhSdlNHVjRLSFJvYVhOYmFWMHBYRzRnSUNBZ2FXWWdLR2tnUFQwOUlHVjRjRzl5ZEhNdVNVNVRVRVZEVkY5TlFWaGZRbGxVUlZNcElIdGNiaUFnSUNBZ0lHOTFkRnRwSUNzZ01WMGdQU0FuTGk0dUoxeHVJQ0FnSUNBZ1luSmxZV3RjYmlBZ0lDQjlYRzRnSUgxY2JpQWdjbVYwZFhKdUlDYzhRblZtWm1WeUlDY2dLeUJ2ZFhRdWFtOXBiaWduSUNjcElDc2dKejRuWEc1OVhHNWNiaThxS2x4dUlDb2dRM0psWVhSbGN5QmhJRzVsZHlCZ1FYSnlZWGxDZFdabVpYSmdJSGRwZEdnZ2RHaGxJQ3BqYjNCcFpXUXFJRzFsYlc5eWVTQnZaaUIwYUdVZ1luVm1abVZ5SUdsdWMzUmhibU5sTGx4dUlDb2dRV1JrWldRZ2FXNGdUbTlrWlNBd0xqRXlMaUJQYm14NUlHRjJZV2xzWVdKc1pTQnBiaUJpY205M2MyVnljeUIwYUdGMElITjFjSEJ2Y25RZ1FYSnlZWGxDZFdabVpYSXVYRzRnS2k5Y2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdWRHOUJjbkpoZVVKMVptWmxjaUE5SUdaMWJtTjBhVzl1SUNncElIdGNiaUFnYVdZZ0tIUjVjR1Z2WmlCVmFXNTBPRUZ5Y21GNUlDRTlQU0FuZFc1a1pXWnBibVZrSnlrZ2UxeHVJQ0FnSUdsbUlDaENkV1ptWlhJdVgzVnpaVlI1Y0dWa1FYSnlZWGx6S1NCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnS0c1bGR5QkNkV1ptWlhJb2RHaHBjeWtwTG1KMVptWmxjbHh1SUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNCMllYSWdZblZtSUQwZ2JtVjNJRlZwYm5RNFFYSnlZWGtvZEdocGN5NXNaVzVuZEdncFhHNGdJQ0FnSUNCbWIzSWdLSFpoY2lCcElEMGdNQ3dnYkdWdUlEMGdZblZtTG14bGJtZDBhRHNnYVNBOElHeGxianNnYVNBclBTQXhLVnh1SUNBZ0lDQWdJQ0JpZFdaYmFWMGdQU0IwYUdselcybGRYRzRnSUNBZ0lDQnlaWFIxY200Z1luVm1MbUoxWm1abGNseHVJQ0FnSUgxY2JpQWdmU0JsYkhObElIdGNiaUFnSUNCMGFISnZkeUJ1WlhjZ1JYSnliM0lvSjBKMVptWmxjaTUwYjBGeWNtRjVRblZtWm1WeUlHNXZkQ0J6ZFhCd2IzSjBaV1FnYVc0Z2RHaHBjeUJpY205M2MyVnlKeWxjYmlBZ2ZWeHVmVnh1WEc0dkx5QklSVXhRUlZJZ1JsVk9RMVJKVDA1VFhHNHZMeUE5UFQwOVBUMDlQVDA5UFQwOVBUMDlYRzVjYm1aMWJtTjBhVzl1SUhOMGNtbHVaM1J5YVcwZ0tITjBjaWtnZTF4dUlDQnBaaUFvYzNSeUxuUnlhVzBwSUhKbGRIVnliaUJ6ZEhJdWRISnBiU2dwWEc0Z0lISmxkSFZ5YmlCemRISXVjbVZ3YkdGalpTZ3ZYbHhjY3l0OFhGeHpLeVF2Wnl3Z0p5Y3BYRzU5WEc1Y2JuWmhjaUJDVUNBOUlFSjFabVpsY2k1d2NtOTBiM1I1Y0dWY2JseHVMeW9xWEc0Z0tpQkJkV2R0Wlc1MElHRWdWV2x1ZERoQmNuSmhlU0FxYVc1emRHRnVZMlVxSUNodWIzUWdkR2hsSUZWcGJuUTRRWEp5WVhrZ1kyeGhjM01oS1NCM2FYUm9JRUoxWm1abGNpQnRaWFJvYjJSelhHNGdLaTljYmtKMVptWmxjaTVmWVhWbmJXVnVkQ0E5SUdaMWJtTjBhVzl1SUNoaGNuSXBJSHRjYmlBZ1lYSnlMbDlwYzBKMVptWmxjaUE5SUhSeWRXVmNibHh1SUNBdkx5QnpZWFpsSUhKbFptVnlaVzVqWlNCMGJ5QnZjbWxuYVc1aGJDQlZhVzUwT0VGeWNtRjVJR2RsZEM5elpYUWdiV1YwYUc5a2N5QmlaV1p2Y21VZ2IzWmxjbmR5YVhScGJtZGNiaUFnWVhKeUxsOW5aWFFnUFNCaGNuSXVaMlYwWEc0Z0lHRnljaTVmYzJWMElEMGdZWEp5TG5ObGRGeHVYRzRnSUM4dklHUmxjSEpsWTJGMFpXUXNJSGRwYkd3Z1ltVWdjbVZ0YjNabFpDQnBiaUJ1YjJSbElEQXVNVE1yWEc0Z0lHRnljaTVuWlhRZ1BTQkNVQzVuWlhSY2JpQWdZWEp5TG5ObGRDQTlJRUpRTG5ObGRGeHVYRzRnSUdGeWNpNTNjbWwwWlNBOUlFSlFMbmR5YVhSbFhHNGdJR0Z5Y2k1MGIxTjBjbWx1WnlBOUlFSlFMblJ2VTNSeWFXNW5YRzRnSUdGeWNpNTBiMHh2WTJGc1pWTjBjbWx1WnlBOUlFSlFMblJ2VTNSeWFXNW5YRzRnSUdGeWNpNTBiMHBUVDA0Z1BTQkNVQzUwYjBwVFQwNWNiaUFnWVhKeUxtTnZjSGtnUFNCQ1VDNWpiM0I1WEc0Z0lHRnljaTV6YkdsalpTQTlJRUpRTG5Oc2FXTmxYRzRnSUdGeWNpNXlaV0ZrVlVsdWREZ2dQU0JDVUM1eVpXRmtWVWx1ZERoY2JpQWdZWEp5TG5KbFlXUlZTVzUwTVRaTVJTQTlJRUpRTG5KbFlXUlZTVzUwTVRaTVJWeHVJQ0JoY25JdWNtVmhaRlZKYm5ReE5rSkZJRDBnUWxBdWNtVmhaRlZKYm5ReE5rSkZYRzRnSUdGeWNpNXlaV0ZrVlVsdWRETXlURVVnUFNCQ1VDNXlaV0ZrVlVsdWRETXlURVZjYmlBZ1lYSnlMbkpsWVdSVlNXNTBNekpDUlNBOUlFSlFMbkpsWVdSVlNXNTBNekpDUlZ4dUlDQmhjbkl1Y21WaFpFbHVkRGdnUFNCQ1VDNXlaV0ZrU1c1ME9GeHVJQ0JoY25JdWNtVmhaRWx1ZERFMlRFVWdQU0JDVUM1eVpXRmtTVzUwTVRaTVJWeHVJQ0JoY25JdWNtVmhaRWx1ZERFMlFrVWdQU0JDVUM1eVpXRmtTVzUwTVRaQ1JWeHVJQ0JoY25JdWNtVmhaRWx1ZERNeVRFVWdQU0JDVUM1eVpXRmtTVzUwTXpKTVJWeHVJQ0JoY25JdWNtVmhaRWx1ZERNeVFrVWdQU0JDVUM1eVpXRmtTVzUwTXpKQ1JWeHVJQ0JoY25JdWNtVmhaRVpzYjJGMFRFVWdQU0JDVUM1eVpXRmtSbXh2WVhSTVJWeHVJQ0JoY25JdWNtVmhaRVpzYjJGMFFrVWdQU0JDVUM1eVpXRmtSbXh2WVhSQ1JWeHVJQ0JoY25JdWNtVmhaRVJ2ZFdKc1pVeEZJRDBnUWxBdWNtVmhaRVJ2ZFdKc1pVeEZYRzRnSUdGeWNpNXlaV0ZrUkc5MVlteGxRa1VnUFNCQ1VDNXlaV0ZrUkc5MVlteGxRa1ZjYmlBZ1lYSnlMbmR5YVhSbFZVbHVkRGdnUFNCQ1VDNTNjbWwwWlZWSmJuUTRYRzRnSUdGeWNpNTNjbWwwWlZWSmJuUXhOa3hGSUQwZ1FsQXVkM0pwZEdWVlNXNTBNVFpNUlZ4dUlDQmhjbkl1ZDNKcGRHVlZTVzUwTVRaQ1JTQTlJRUpRTG5keWFYUmxWVWx1ZERFMlFrVmNiaUFnWVhKeUxuZHlhWFJsVlVsdWRETXlURVVnUFNCQ1VDNTNjbWwwWlZWSmJuUXpNa3hGWEc0Z0lHRnljaTUzY21sMFpWVkpiblF6TWtKRklEMGdRbEF1ZDNKcGRHVlZTVzUwTXpKQ1JWeHVJQ0JoY25JdWQzSnBkR1ZKYm5RNElEMGdRbEF1ZDNKcGRHVkpiblE0WEc0Z0lHRnljaTUzY21sMFpVbHVkREUyVEVVZ1BTQkNVQzUzY21sMFpVbHVkREUyVEVWY2JpQWdZWEp5TG5keWFYUmxTVzUwTVRaQ1JTQTlJRUpRTG5keWFYUmxTVzUwTVRaQ1JWeHVJQ0JoY25JdWQzSnBkR1ZKYm5Rek1reEZJRDBnUWxBdWQzSnBkR1ZKYm5Rek1reEZYRzRnSUdGeWNpNTNjbWwwWlVsdWRETXlRa1VnUFNCQ1VDNTNjbWwwWlVsdWRETXlRa1ZjYmlBZ1lYSnlMbmR5YVhSbFJteHZZWFJNUlNBOUlFSlFMbmR5YVhSbFJteHZZWFJNUlZ4dUlDQmhjbkl1ZDNKcGRHVkdiRzloZEVKRklEMGdRbEF1ZDNKcGRHVkdiRzloZEVKRlhHNGdJR0Z5Y2k1M2NtbDBaVVJ2ZFdKc1pVeEZJRDBnUWxBdWQzSnBkR1ZFYjNWaWJHVk1SVnh1SUNCaGNuSXVkM0pwZEdWRWIzVmliR1ZDUlNBOUlFSlFMbmR5YVhSbFJHOTFZbXhsUWtWY2JpQWdZWEp5TG1acGJHd2dQU0JDVUM1bWFXeHNYRzRnSUdGeWNpNXBibk53WldOMElEMGdRbEF1YVc1emNHVmpkRnh1SUNCaGNuSXVkRzlCY25KaGVVSjFabVpsY2lBOUlFSlFMblJ2UVhKeVlYbENkV1ptWlhKY2JseHVJQ0J5WlhSMWNtNGdZWEp5WEc1OVhHNWNiaTh2SUhOc2FXTmxLSE4wWVhKMExDQmxibVFwWEc1bWRXNWpkR2x2YmlCamJHRnRjQ0FvYVc1a1pYZ3NJR3hsYml3Z1pHVm1ZWFZzZEZaaGJIVmxLU0I3WEc0Z0lHbG1JQ2gwZVhCbGIyWWdhVzVrWlhnZ0lUMDlJQ2R1ZFcxaVpYSW5LU0J5WlhSMWNtNGdaR1ZtWVhWc2RGWmhiSFZsWEc0Z0lHbHVaR1Y0SUQwZ2ZuNXBibVJsZURzZ0lDOHZJRU52WlhKalpTQjBieUJwYm5SbFoyVnlMbHh1SUNCcFppQW9hVzVrWlhnZ1BqMGdiR1Z1S1NCeVpYUjFjbTRnYkdWdVhHNGdJR2xtSUNocGJtUmxlQ0ErUFNBd0tTQnlaWFIxY200Z2FXNWtaWGhjYmlBZ2FXNWtaWGdnS3owZ2JHVnVYRzRnSUdsbUlDaHBibVJsZUNBK1BTQXdLU0J5WlhSMWNtNGdhVzVrWlhoY2JpQWdjbVYwZFhKdUlEQmNibjFjYmx4dVpuVnVZM1JwYjI0Z1kyOWxjbU5sSUNoc1pXNW5kR2dwSUh0Y2JpQWdMeThnUTI5bGNtTmxJR3hsYm1kMGFDQjBieUJoSUc1MWJXSmxjaUFvY0c5emMybGliSGtnVG1GT0tTd2djbTkxYm1RZ2RYQmNiaUFnTHk4Z2FXNGdZMkZ6WlNCcGRDZHpJR1p5WVdOMGFXOXVZV3dnS0dVdVp5NGdNVEl6TGpRMU5pa2dkR2hsYmlCa2J5QmhYRzRnSUM4dklHUnZkV0pzWlNCdVpXZGhkR1VnZEc4Z1kyOWxjbU5sSUdFZ1RtRk9JSFJ2SURBdUlFVmhjM2tzSUhKcFoyaDBQMXh1SUNCc1pXNW5kR2dnUFNCK2ZrMWhkR2d1WTJWcGJDZ3JiR1Z1WjNSb0tWeHVJQ0J5WlhSMWNtNGdiR1Z1WjNSb0lEd2dNQ0EvSURBZ09pQnNaVzVuZEdoY2JuMWNibHh1Wm5WdVkzUnBiMjRnYVhOQmNuSmhlU0FvYzNWaWFtVmpkQ2tnZTF4dUlDQnlaWFIxY200Z0tFRnljbUY1TG1selFYSnlZWGtnZkh3Z1puVnVZM1JwYjI0Z0tITjFZbXBsWTNRcElIdGNiaUFnSUNCeVpYUjFjbTRnVDJKcVpXTjBMbkJ5YjNSdmRIbHdaUzUwYjFOMGNtbHVaeTVqWVd4c0tITjFZbXBsWTNRcElEMDlQU0FuVzI5aWFtVmpkQ0JCY25KaGVWMG5YRzRnSUgwcEtITjFZbXBsWTNRcFhHNTlYRzVjYm1aMWJtTjBhVzl1SUdselFYSnlZWGxwYzJnZ0tITjFZbXBsWTNRcElIdGNiaUFnY21WMGRYSnVJR2x6UVhKeVlYa29jM1ZpYW1WamRDa2dmSHdnUW5WbVptVnlMbWx6UW5WbVptVnlLSE4xWW1wbFkzUXBJSHg4WEc0Z0lDQWdJQ0J6ZFdKcVpXTjBJQ1ltSUhSNWNHVnZaaUJ6ZFdKcVpXTjBJRDA5UFNBbmIySnFaV04wSnlBbUpseHVJQ0FnSUNBZ2RIbHdaVzltSUhOMVltcGxZM1F1YkdWdVozUm9JRDA5UFNBbmJuVnRZbVZ5SjF4dWZWeHVYRzVtZFc1amRHbHZiaUIwYjBobGVDQW9iaWtnZTF4dUlDQnBaaUFvYmlBOElERTJLU0J5WlhSMWNtNGdKekFuSUNzZ2JpNTBiMU4wY21sdVp5Z3hOaWxjYmlBZ2NtVjBkWEp1SUc0dWRHOVRkSEpwYm1jb01UWXBYRzU5WEc1Y2JtWjFibU4wYVc5dUlIVjBaamhVYjBKNWRHVnpJQ2h6ZEhJcElIdGNiaUFnZG1GeUlHSjVkR1ZCY25KaGVTQTlJRnRkWEc0Z0lHWnZjaUFvZG1GeUlHa2dQU0F3T3lCcElEd2djM1J5TG14bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ2RtRnlJR0lnUFNCemRISXVZMmhoY2tOdlpHVkJkQ2hwS1Z4dUlDQWdJR2xtSUNoaUlEdzlJREI0TjBZcFhHNGdJQ0FnSUNCaWVYUmxRWEp5WVhrdWNIVnphQ2h6ZEhJdVkyaGhja052WkdWQmRDaHBLU2xjYmlBZ0lDQmxiSE5sSUh0Y2JpQWdJQ0FnSUhaaGNpQnpkR0Z5ZENBOUlHbGNiaUFnSUNBZ0lHbG1JQ2hpSUQ0OUlEQjRSRGd3TUNBbUppQmlJRHc5SURCNFJFWkdSaWtnYVNzclhHNGdJQ0FnSUNCMllYSWdhQ0E5SUdWdVkyOWtaVlZTU1VOdmJYQnZibVZ1ZENoemRISXVjMnhwWTJVb2MzUmhjblFzSUdrck1Ta3BMbk4xWW5OMGNpZ3hLUzV6Y0d4cGRDZ25KU2NwWEc0Z0lDQWdJQ0JtYjNJZ0tIWmhjaUJxSUQwZ01Ec2dhaUE4SUdndWJHVnVaM1JvT3lCcUt5c3BYRzRnSUNBZ0lDQWdJR0o1ZEdWQmNuSmhlUzV3ZFhOb0tIQmhjbk5sU1c1MEtHaGJhbDBzSURFMktTbGNiaUFnSUNCOVhHNGdJSDFjYmlBZ2NtVjBkWEp1SUdKNWRHVkJjbkpoZVZ4dWZWeHVYRzVtZFc1amRHbHZiaUJoYzJOcGFWUnZRbmwwWlhNZ0tITjBjaWtnZTF4dUlDQjJZWElnWW5sMFpVRnljbUY1SUQwZ1cxMWNiaUFnWm05eUlDaDJZWElnYVNBOUlEQTdJR2tnUENCemRISXViR1Z1WjNSb095QnBLeXNwSUh0Y2JpQWdJQ0F2THlCT2IyUmxKM01nWTI5a1pTQnpaV1Z0Y3lCMGJ5QmlaU0JrYjJsdVp5QjBhR2x6SUdGdVpDQnViM1FnSmlBd2VEZEdMaTVjYmlBZ0lDQmllWFJsUVhKeVlYa3VjSFZ6YUNoemRISXVZMmhoY2tOdlpHVkJkQ2hwS1NBbUlEQjRSa1lwWEc0Z0lIMWNiaUFnY21WMGRYSnVJR0o1ZEdWQmNuSmhlVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQjFkR1l4Tm14bFZHOUNlWFJsY3lBb2MzUnlLU0I3WEc0Z0lIWmhjaUJqTENCb2FTd2diRzljYmlBZ2RtRnlJR0o1ZEdWQmNuSmhlU0E5SUZ0ZFhHNGdJR1p2Y2lBb2RtRnlJR2tnUFNBd095QnBJRHdnYzNSeUxteGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdZeUE5SUhOMGNpNWphR0Z5UTI5a1pVRjBLR2twWEc0Z0lDQWdhR2tnUFNCaklENCtJRGhjYmlBZ0lDQnNieUE5SUdNZ0pTQXlOVFpjYmlBZ0lDQmllWFJsUVhKeVlYa3VjSFZ6YUNoc2J5bGNiaUFnSUNCaWVYUmxRWEp5WVhrdWNIVnphQ2hvYVNsY2JpQWdmVnh1WEc0Z0lISmxkSFZ5YmlCaWVYUmxRWEp5WVhsY2JuMWNibHh1Wm5WdVkzUnBiMjRnWW1GelpUWTBWRzlDZVhSbGN5QW9jM1J5S1NCN1hHNGdJSEpsZEhWeWJpQmlZWE5sTmpRdWRHOUNlWFJsUVhKeVlYa29jM1J5S1Z4dWZWeHVYRzVtZFc1amRHbHZiaUJpYkdsMFFuVm1abVZ5SUNoemNtTXNJR1J6ZEN3Z2IyWm1jMlYwTENCc1pXNW5kR2dwSUh0Y2JpQWdkbUZ5SUhCdmMxeHVJQ0JtYjNJZ0tIWmhjaUJwSUQwZ01Ec2dhU0E4SUd4bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ2FXWWdLQ2hwSUNzZ2IyWm1jMlYwSUQ0OUlHUnpkQzVzWlc1bmRHZ3BJSHg4SUNocElENDlJSE55WXk1c1pXNW5kR2dwS1Z4dUlDQWdJQ0FnWW5KbFlXdGNiaUFnSUNCa2MzUmJhU0FySUc5bVpuTmxkRjBnUFNCemNtTmJhVjFjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdhVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmtaV052WkdWVmRHWTRRMmhoY2lBb2MzUnlLU0I3WEc0Z0lIUnllU0I3WEc0Z0lDQWdjbVYwZFhKdUlHUmxZMjlrWlZWU1NVTnZiWEJ2Ym1WdWRDaHpkSElwWEc0Z0lIMGdZMkYwWTJnZ0tHVnljaWtnZTF4dUlDQWdJSEpsZEhWeWJpQlRkSEpwYm1jdVpuSnZiVU5vWVhKRGIyUmxLREI0UmtaR1JDa2dMeThnVlZSR0lEZ2dhVzUyWVd4cFpDQmphR0Z5WEc0Z0lIMWNibjFjYmx4dUx5cGNiaUFxSUZkbElHaGhkbVVnZEc4Z2JXRnJaU0J6ZFhKbElIUm9ZWFFnZEdobElIWmhiSFZsSUdseklHRWdkbUZzYVdRZ2FXNTBaV2RsY2k0Z1ZHaHBjeUJ0WldGdWN5QjBhR0YwSUdsMFhHNGdLaUJwY3lCdWIyNHRibVZuWVhScGRtVXVJRWwwSUdoaGN5QnVieUJtY21GamRHbHZibUZzSUdOdmJYQnZibVZ1ZENCaGJtUWdkR2hoZENCcGRDQmtiMlZ6SUc1dmRGeHVJQ29nWlhoalpXVmtJSFJvWlNCdFlYaHBiWFZ0SUdGc2JHOTNaV1FnZG1Gc2RXVXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlIWmxjbWxtZFdsdWRDQW9kbUZzZFdVc0lHMWhlQ2tnZTF4dUlDQmhjM05sY25Rb2RIbHdaVzltSUhaaGJIVmxJRDA5UFNBbmJuVnRZbVZ5Snl3Z0oyTmhibTV2ZENCM2NtbDBaU0JoSUc1dmJpMXVkVzFpWlhJZ1lYTWdZU0J1ZFcxaVpYSW5LVnh1SUNCaGMzTmxjblFvZG1Gc2RXVWdQajBnTUN3Z0ozTndaV05wWm1sbFpDQmhJRzVsWjJGMGFYWmxJSFpoYkhWbElHWnZjaUIzY21sMGFXNW5JR0Z1SUhWdWMybG5ibVZrSUhaaGJIVmxKeWxjYmlBZ1lYTnpaWEowS0haaGJIVmxJRHc5SUcxaGVDd2dKM1poYkhWbElHbHpJR3hoY21kbGNpQjBhR0Z1SUcxaGVHbHRkVzBnZG1Gc2RXVWdabTl5SUhSNWNHVW5LVnh1SUNCaGMzTmxjblFvVFdGMGFDNW1iRzl2Y2loMllXeDFaU2tnUFQwOUlIWmhiSFZsTENBbmRtRnNkV1VnYUdGeklHRWdabkpoWTNScGIyNWhiQ0JqYjIxd2IyNWxiblFuS1Z4dWZWeHVYRzVtZFc1amRHbHZiaUIyWlhKcFpuTnBiblFnS0haaGJIVmxMQ0J0WVhnc0lHMXBiaWtnZTF4dUlDQmhjM05sY25Rb2RIbHdaVzltSUhaaGJIVmxJRDA5UFNBbmJuVnRZbVZ5Snl3Z0oyTmhibTV2ZENCM2NtbDBaU0JoSUc1dmJpMXVkVzFpWlhJZ1lYTWdZU0J1ZFcxaVpYSW5LVnh1SUNCaGMzTmxjblFvZG1Gc2RXVWdQRDBnYldGNExDQW5kbUZzZFdVZ2JHRnlaMlZ5SUhSb1lXNGdiV0Y0YVcxMWJTQmhiR3h2ZDJWa0lIWmhiSFZsSnlsY2JpQWdZWE56WlhKMEtIWmhiSFZsSUQ0OUlHMXBiaXdnSjNaaGJIVmxJSE50WVd4c1pYSWdkR2hoYmlCdGFXNXBiWFZ0SUdGc2JHOTNaV1FnZG1Gc2RXVW5LVnh1SUNCaGMzTmxjblFvVFdGMGFDNW1iRzl2Y2loMllXeDFaU2tnUFQwOUlIWmhiSFZsTENBbmRtRnNkV1VnYUdGeklHRWdabkpoWTNScGIyNWhiQ0JqYjIxd2IyNWxiblFuS1Z4dWZWeHVYRzVtZFc1amRHbHZiaUIyWlhKcFprbEZSVVUzTlRRZ0tIWmhiSFZsTENCdFlYZ3NJRzFwYmlrZ2UxeHVJQ0JoYzNObGNuUW9kSGx3Wlc5bUlIWmhiSFZsSUQwOVBTQW5iblZ0WW1WeUp5d2dKMk5oYm01dmRDQjNjbWwwWlNCaElHNXZiaTF1ZFcxaVpYSWdZWE1nWVNCdWRXMWlaWEluS1Z4dUlDQmhjM05sY25Rb2RtRnNkV1VnUEQwZ2JXRjRMQ0FuZG1Gc2RXVWdiR0Z5WjJWeUlIUm9ZVzRnYldGNGFXMTFiU0JoYkd4dmQyVmtJSFpoYkhWbEp5bGNiaUFnWVhOelpYSjBLSFpoYkhWbElENDlJRzFwYml3Z0ozWmhiSFZsSUhOdFlXeHNaWElnZEdoaGJpQnRhVzVwYlhWdElHRnNiRzkzWldRZ2RtRnNkV1VuS1Z4dWZWeHVYRzVtZFc1amRHbHZiaUJoYzNObGNuUWdLSFJsYzNRc0lHMWxjM05oWjJVcElIdGNiaUFnYVdZZ0tDRjBaWE4wS1NCMGFISnZkeUJ1WlhjZ1JYSnliM0lvYldWemMyRm5aU0I4ZkNBblJtRnBiR1ZrSUdGemMyVnlkR2x2YmljcFhHNTlYRzRpWFgwPVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcYnVmZmVyXFxcXGluZGV4LmpzXCIsXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXGJ1ZmZlclwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcblwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLnJlYWQgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbTtcbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDE7XG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxO1xuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDE7XG4gIHZhciBuQml0cyA9IC03O1xuICB2YXIgaSA9IGlzTEUgPyBuQnl0ZXMgLSAxIDogMDtcbiAgdmFyIGQgPSBpc0xFID8gLTEgOiAxO1xuICB2YXIgcyA9IGJ1ZmZlcltvZmZzZXQgKyBpXTtcblxuICBpICs9IGQ7XG5cbiAgZSA9IHMgJiAoMSA8PCAtbkJpdHMpIC0gMTtcbiAgcyA+Pj0gLW5CaXRzO1xuICBuQml0cyArPSBlTGVuO1xuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gZSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIG0gPSBlICYgKDEgPDwgLW5CaXRzKSAtIDE7XG4gIGUgPj49IC1uQml0cztcbiAgbkJpdHMgKz0gbUxlbjtcbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IG0gKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXM7XG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogKHMgPyAtMSA6IDEpICogSW5maW5pdHk7XG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKTtcbiAgICBlID0gZSAtIGVCaWFzO1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pO1xufTtcblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uIChidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgYztcbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDE7XG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxO1xuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDE7XG4gIHZhciBydCA9IG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwO1xuICB2YXIgaSA9IGlzTEUgPyAwIDogbkJ5dGVzIC0gMTtcbiAgdmFyIGQgPSBpc0xFID8gMSA6IC0xO1xuICB2YXIgcyA9IHZhbHVlIDwgMCB8fCB2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwID8gMSA6IDA7XG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSk7XG5cbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpIHtcbiAgICBtID0gaXNOYU4odmFsdWUpID8gMSA6IDA7XG4gICAgZSA9IGVNYXg7XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpO1xuICAgIGlmICh2YWx1ZSAqIChjID0gTWF0aC5wb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLTtcbiAgICAgIGMgKj0gMjtcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogTWF0aC5wb3coMiwgMSAtIGVCaWFzKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKys7XG4gICAgICBjIC89IDI7XG4gICAgfVxuXG4gICAgaWYgKGUgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtID0gMDtcbiAgICAgIGUgPSBlTWF4O1xuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAodmFsdWUgKiBjIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKTtcbiAgICAgIGUgPSBlICsgZUJpYXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKTtcbiAgICAgIGUgPSAwO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IGUgPDwgbUxlbiB8IG07XG4gIGVMZW4gKz0gbUxlbjtcbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyODtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbWx1WkdWNExtcHpJbDBzSW01aGJXVnpJanBiSW1WNGNHOXlkSE1pTENKeVpXRmtJaXdpWW5WbVptVnlJaXdpYjJabWMyVjBJaXdpYVhOTVJTSXNJbTFNWlc0aUxDSnVRbmwwWlhNaUxDSmxJaXdpYlNJc0ltVk1aVzRpTENKbFRXRjRJaXdpWlVKcFlYTWlMQ0p1UW1sMGN5SXNJbWtpTENKa0lpd2ljeUlzSWs1aFRpSXNJa2x1Wm1sdWFYUjVJaXdpVFdGMGFDSXNJbkJ2ZHlJc0luZHlhWFJsSWl3aWRtRnNkV1VpTENKaklpd2ljblFpTENKaFluTWlMQ0pwYzA1aFRpSXNJbVpzYjI5eUlpd2liRzluSWl3aVRFNHlJbDBzSW0xaGNIQnBibWR6SWpvaU96dEJRVUZCUVN4UlFVRlJReXhKUVVGU0xFZEJRV1VzVlVGQlZVTXNUVUZCVml4RlFVRnJRa01zVFVGQmJFSXNSVUZCTUVKRExFbEJRVEZDTEVWQlFXZERReXhKUVVGb1F5eEZRVUZ6UTBNc1RVRkJkRU1zUlVGQk9FTTdRVUZETTBRc1RVRkJTVU1zUTBGQlNpeEZRVUZQUXl4RFFVRlFPMEZCUTBFc1RVRkJTVU1zVDBGQlQwZ3NVMEZCVXl4RFFVRlVMRWRCUVdGRUxFbEJRV0lzUjBGQmIwSXNRMEZCTDBJN1FVRkRRU3hOUVVGSlN5eFBRVUZQTEVOQlFVTXNTMEZCUzBRc1NVRkJUaXhKUVVGakxFTkJRWHBDTzBGQlEwRXNUVUZCU1VVc1VVRkJVVVFzVVVGQlVTeERRVUZ3UWp0QlFVTkJMRTFCUVVsRkxGRkJRVkVzUTBGQlF5eERRVUZpTzBGQlEwRXNUVUZCU1VNc1NVRkJTVlFzVDBGQlVVVXNVMEZCVXl4RFFVRnFRaXhIUVVGelFpeERRVUU1UWp0QlFVTkJMRTFCUVVsUkxFbEJRVWxXTEU5QlFVOHNRMEZCUXl4RFFVRlNMRWRCUVZrc1EwRkJjRUk3UVVGRFFTeE5RVUZKVnl4SlFVRkpZaXhQUVVGUFF5eFRRVUZUVlN4RFFVRm9RaXhEUVVGU096dEJRVVZCUVN4UFFVRkxReXhEUVVGTU96dEJRVVZCVUN4TlFVRkpVU3hKUVVGTExFTkJRVU1zUzBGQlRTeERRVUZEU0N4TFFVRlNMRWxCUVd0Q0xFTkJRVE5DTzBGQlEwRkhMRkZCUVU4c1EwRkJRMGdzUzBGQlVqdEJRVU5CUVN4WFFVRlRTQ3hKUVVGVU8wRkJRMEVzVTBGQlQwY3NVVUZCVVN4RFFVRm1MRVZCUVd0Q1RDeEpRVUZKUVN4SlFVRkpMRWRCUVVvc1IwRkJWVXdzVDBGQlQwTXNVMEZCVTFVc1EwRkJhRUlzUTBGQlpDeEZRVUZyUTBFc1MwRkJTME1zUTBGQmRrTXNSVUZCTUVOR0xGTkJRVk1zUTBGQmNrVXNSVUZCZDBVc1EwRkJSVHM3UVVGRk1VVktMRTFCUVVsRUxFbEJRVXNzUTBGQlF5eExRVUZOTEVOQlFVTkxMRXRCUVZJc1NVRkJhMElzUTBGQk0wSTdRVUZEUVV3c1VVRkJUeXhEUVVGRFN5eExRVUZTTzBGQlEwRkJMRmRCUVZOUUxFbEJRVlE3UVVGRFFTeFRRVUZQVHl4UlFVRlJMRU5CUVdZc1JVRkJhMEpLTEVsQlFVbEJMRWxCUVVrc1IwRkJTaXhIUVVGVlRpeFBRVUZQUXl4VFFVRlRWU3hEUVVGb1FpeERRVUZrTEVWQlFXdERRU3hMUVVGTFF5eERRVUYyUXl4RlFVRXdRMFlzVTBGQlV5eERRVUZ5UlN4RlFVRjNSU3hEUVVGRk96dEJRVVV4UlN4TlFVRkpUQ3hOUVVGTkxFTkJRVllzUlVGQllUdEJRVU5ZUVN4UlFVRkpMRWxCUVVsSkxFdEJRVkk3UVVGRFJDeEhRVVpFTEUxQlJVOHNTVUZCU1Vvc1RVRkJUVWNzU1VGQlZpeEZRVUZuUWp0QlFVTnlRaXhYUVVGUFJpeEpRVUZKVVN4SFFVRktMRWRCUVZjc1EwRkJRMFFzU1VGQlNTeERRVUZETEVOQlFVd3NSMEZCVXl4RFFVRldMRWxCUVdWRkxGRkJRV3BETzBGQlEwUXNSMEZHVFN4TlFVVkJPMEZCUTB4VUxGRkJRVWxCTEVsQlFVbFZMRXRCUVV0RExFZEJRVXdzUTBGQlV5eERRVUZVTEVWQlFWbGtMRWxCUVZvc1EwRkJVanRCUVVOQlJTeFJRVUZKUVN4SlFVRkpTU3hMUVVGU08wRkJRMFE3UVVGRFJDeFRRVUZQTEVOQlFVTkpMRWxCUVVrc1EwRkJReXhEUVVGTUxFZEJRVk1zUTBGQlZpeEpRVUZsVUN4RFFVRm1MRWRCUVcxQ1ZTeExRVUZMUXl4SFFVRk1MRU5CUVZNc1EwRkJWQ3hGUVVGWldpeEpRVUZKUml4SlFVRm9RaXhEUVVFeFFqdEJRVU5FTEVOQkwwSkVPenRCUVdsRFFVd3NVVUZCVVc5Q0xFdEJRVklzUjBGQlowSXNWVUZCVld4Q0xFMUJRVllzUlVGQmEwSnRRaXhMUVVGc1FpeEZRVUY1UW14Q0xFMUJRWHBDTEVWQlFXbERReXhKUVVGcVF5eEZRVUYxUTBNc1NVRkJka01zUlVGQk5rTkRMRTFCUVRkRExFVkJRWEZFTzBGQlEyNUZMRTFCUVVsRExFTkJRVW9zUlVGQlQwTXNRMEZCVUN4RlFVRlZZeXhEUVVGV08wRkJRMEVzVFVGQlNXSXNUMEZCVDBnc1UwRkJVeXhEUVVGVUxFZEJRV0ZFTEVsQlFXSXNSMEZCYjBJc1EwRkJMMEk3UVVGRFFTeE5RVUZKU3l4UFFVRlBMRU5CUVVNc1MwRkJTMFFzU1VGQlRpeEpRVUZqTEVOQlFYcENPMEZCUTBFc1RVRkJTVVVzVVVGQlVVUXNVVUZCVVN4RFFVRndRanRCUVVOQkxFMUJRVWxoTEV0QlFVMXNRaXhUUVVGVExFVkJRVlFzUjBGQlkyRXNTMEZCUzBNc1IwRkJUQ3hEUVVGVExFTkJRVlFzUlVGQldTeERRVUZETEVWQlFXSXNTVUZCYlVKRUxFdEJRVXRETEVkQlFVd3NRMEZCVXl4RFFVRlVMRVZCUVZrc1EwRkJReXhGUVVGaUxFTkJRV3BETEVkQlFXOUVMRU5CUVRsRU8wRkJRMEVzVFVGQlNVNHNTVUZCU1ZRc1QwRkJUeXhEUVVGUUxFZEJRVmxGTEZOQlFWTXNRMEZCTjBJN1FVRkRRU3hOUVVGSlVTeEpRVUZKVml4UFFVRlBMRU5CUVZBc1IwRkJWeXhEUVVGRExFTkJRWEJDTzBGQlEwRXNUVUZCU1Zjc1NVRkJTVTBzVVVGQlVTeERRVUZTTEVsQlFXTkJMRlZCUVZVc1EwRkJWaXhKUVVGbExFbEJRVWxCTEV0QlFVb3NSMEZCV1N4RFFVRjZReXhIUVVFNFF5eERRVUU1UXl4SFFVRnJSQ3hEUVVFeFJEczdRVUZGUVVFc1ZVRkJVVWdzUzBGQlMwMHNSMEZCVEN4RFFVRlRTQ3hMUVVGVUxFTkJRVkk3TzBGQlJVRXNUVUZCU1Vrc1RVRkJUVW9zUzBGQlRpeExRVUZuUWtFc1ZVRkJWVW9zVVVGQk9VSXNSVUZCZDBNN1FVRkRkRU5VTEZGQlFVbHBRaXhOUVVGTlNpeExRVUZPTEVsQlFXVXNRMEZCWml4SFFVRnRRaXhEUVVGMlFqdEJRVU5CWkN4UlFVRkpSeXhKUVVGS08wRkJRMFFzUjBGSVJDeE5RVWRQTzBGQlEweElMRkZCUVVsWExFdEJRVXRSTEV0QlFVd3NRMEZCVjFJc1MwRkJTMU1zUjBGQlRDeERRVUZUVGl4TFFVRlVMRWxCUVd0Q1NDeExRVUZMVlN4SFFVRnNReXhEUVVGS08wRkJRMEVzVVVGQlNWQXNVMEZCVTBNc1NVRkJTVW9zUzBGQlMwTXNSMEZCVEN4RFFVRlRMRU5CUVZRc1JVRkJXU3hEUVVGRFdpeERRVUZpTEVOQlFXSXNTVUZCWjBNc1EwRkJjRU1zUlVGQmRVTTdRVUZEY2tOQk8wRkJRMEZsTEZkQlFVc3NRMEZCVER0QlFVTkVPMEZCUTBRc1VVRkJTV1lzU1VGQlNVa3NTMEZCU2l4SlFVRmhMRU5CUVdwQ0xFVkJRVzlDTzBGQlEyeENWU3hsUVVGVFJTeExRVUZMUkN4RFFVRmtPMEZCUTBRc1MwRkdSQ3hOUVVWUE8wRkJRMHhFTEdWQlFWTkZMRXRCUVV0TUxFdEJRVXRETEVkQlFVd3NRMEZCVXl4RFFVRlVMRVZCUVZrc1NVRkJTVklzUzBGQmFFSXNRMEZCWkR0QlFVTkVPMEZCUTBRc1VVRkJTVlVzVVVGQlVVTXNRMEZCVWl4SlFVRmhMRU5CUVdwQ0xFVkJRVzlDTzBGQlEyeENaanRCUVVOQlpTeFhRVUZMTEVOQlFVdzdRVUZEUkRzN1FVRkZSQ3hSUVVGSlppeEpRVUZKU1N4TFFVRktMRWxCUVdGRUxFbEJRV3BDTEVWQlFYVkNPMEZCUTNKQ1JpeFZRVUZKTEVOQlFVbzdRVUZEUVVRc1ZVRkJTVWNzU1VGQlNqdEJRVU5FTEV0QlNFUXNUVUZIVHl4SlFVRkpTQ3hKUVVGSlNTeExRVUZLTEVsQlFXRXNRMEZCYWtJc1JVRkJiMEk3UVVGRGVrSklMRlZCUVVrc1EwRkJRMkVzVVVGQlVVTXNRMEZCVWl4SFFVRlpMRU5CUVdJc1NVRkJhMEpLTEV0QlFVdERMRWRCUVV3c1EwRkJVeXhEUVVGVUxFVkJRVmxrTEVsQlFWb3NRMEZCZEVJN1FVRkRRVVVzVlVGQlNVRXNTVUZCU1Vrc1MwRkJVanRCUVVORUxFdEJTRTBzVFVGSFFUdEJRVU5NU0N4VlFVRkpZU3hSUVVGUlNDeExRVUZMUXl4SFFVRk1MRU5CUVZNc1EwRkJWQ3hGUVVGWlVpeFJRVUZSTEVOQlFYQkNMRU5CUVZJc1IwRkJhVU5QTEV0QlFVdERMRWRCUVV3c1EwRkJVeXhEUVVGVUxFVkJRVmxrTEVsQlFWb3NRMEZCY2tNN1FVRkRRVVVzVlVGQlNTeERRVUZLTzBGQlEwUTdRVUZEUmpzN1FVRkZSQ3hUUVVGUFJpeFJRVUZSTEVOQlFXWXNSVUZCYTBKSUxFOUJRVTlETEZOQlFWTlZMRU5CUVdoQ0xFbEJRWEZDVEN4SlFVRkpMRWxCUVhwQ0xFVkJRU3RDU3l4TFFVRkxReXhEUVVGd1F5eEZRVUYxUTA0c1MwRkJTeXhIUVVFMVF5eEZRVUZwUkVnc1VVRkJVU3hEUVVFelJTeEZRVUU0UlN4RFFVRkZPenRCUVVWb1JrVXNUVUZCUzBFc1MwRkJTMFlzU1VGQlRpeEhRVUZqUnl4RFFVRnNRanRCUVVOQlF5eFZRVUZSU2l4SlFVRlNPMEZCUTBFc1UwRkJUMGtzVDBGQlR5eERRVUZrTEVWQlFXbENVQ3hQUVVGUFF5eFRRVUZUVlN4RFFVRm9RaXhKUVVGeFFrNHNTVUZCU1N4SlFVRjZRaXhGUVVFclFrMHNTMEZCUzBNc1EwRkJjRU1zUlVGQmRVTlFMRXRCUVVzc1IwRkJOVU1zUlVGQmFVUkZMRkZCUVZFc1EwRkJNVVVzUlVGQk5rVXNRMEZCUlRzN1FVRkZMMFZRTEZOQlFVOURMRk5CUVZOVkxFTkJRVlFzUjBGQllVTXNRMEZCY0VJc1MwRkJNRUpETEVsQlFVa3NSMEZCT1VJN1FVRkRSQ3hEUVd4RVJDSXNJbVpwYkdVaU9pSnBibVJsZUM1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJbVY0Y0c5eWRITXVjbVZoWkNBOUlHWjFibU4wYVc5dUlDaGlkV1ptWlhJc0lHOW1abk5sZEN3Z2FYTk1SU3dnYlV4bGJpd2dia0o1ZEdWektTQjdYRzRnSUhaaGNpQmxMQ0J0WEc0Z0lIWmhjaUJsVEdWdUlEMGdia0o1ZEdWeklDb2dPQ0F0SUcxTVpXNGdMU0F4WEc0Z0lIWmhjaUJsVFdGNElEMGdLREVnUER3Z1pVeGxiaWtnTFNBeFhHNGdJSFpoY2lCbFFtbGhjeUE5SUdWTllYZ2dQajRnTVZ4dUlDQjJZWElnYmtKcGRITWdQU0F0TjF4dUlDQjJZWElnYVNBOUlHbHpURVVnUHlBb2JrSjVkR1Z6SUMwZ01Ta2dPaUF3WEc0Z0lIWmhjaUJrSUQwZ2FYTk1SU0EvSUMweElEb2dNVnh1SUNCMllYSWdjeUE5SUdKMVptWmxjbHR2Wm1aelpYUWdLeUJwWFZ4dVhHNGdJR2tnS3owZ1pGeHVYRzRnSUdVZ1BTQnpJQ1lnS0NneElEdzhJQ2d0YmtKcGRITXBLU0F0SURFcFhHNGdJSE1nUGo0OUlDZ3Ria0pwZEhNcFhHNGdJRzVDYVhSeklDczlJR1ZNWlc1Y2JpQWdabTl5SUNnN0lHNUNhWFJ6SUQ0Z01Ec2daU0E5SUdVZ0tpQXlOVFlnS3lCaWRXWm1aWEpiYjJabWMyVjBJQ3NnYVYwc0lHa2dLejBnWkN3Z2JrSnBkSE1nTFQwZ09Da2dlMzFjYmx4dUlDQnRJRDBnWlNBbUlDZ29NU0E4UENBb0xXNUNhWFJ6S1NrZ0xTQXhLVnh1SUNCbElENCtQU0FvTFc1Q2FYUnpLVnh1SUNCdVFtbDBjeUFyUFNCdFRHVnVYRzRnSUdadmNpQW9PeUJ1UW1sMGN5QStJREE3SUcwZ1BTQnRJQ29nTWpVMklDc2dZblZtWm1WeVcyOW1abk5sZENBcklHbGRMQ0JwSUNzOUlHUXNJRzVDYVhSeklDMDlJRGdwSUh0OVhHNWNiaUFnYVdZZ0tHVWdQVDA5SURBcElIdGNiaUFnSUNCbElEMGdNU0F0SUdWQ2FXRnpYRzRnSUgwZ1pXeHpaU0JwWmlBb1pTQTlQVDBnWlUxaGVDa2dlMXh1SUNBZ0lISmxkSFZ5YmlCdElEOGdUbUZPSURvZ0tDaHpJRDhnTFRFZ09pQXhLU0FxSUVsdVptbHVhWFI1S1Z4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUcwZ1BTQnRJQ3NnVFdGMGFDNXdiM2NvTWl3Z2JVeGxiaWxjYmlBZ0lDQmxJRDBnWlNBdElHVkNhV0Z6WEc0Z0lIMWNiaUFnY21WMGRYSnVJQ2h6SUQ4Z0xURWdPaUF4S1NBcUlHMGdLaUJOWVhSb0xuQnZkeWd5TENCbElDMGdiVXhsYmlsY2JuMWNibHh1Wlhod2IzSjBjeTUzY21sMFpTQTlJR1oxYm1OMGFXOXVJQ2hpZFdabVpYSXNJSFpoYkhWbExDQnZabVp6WlhRc0lHbHpURVVzSUcxTVpXNHNJRzVDZVhSbGN5a2dlMXh1SUNCMllYSWdaU3dnYlN3Z1kxeHVJQ0IyWVhJZ1pVeGxiaUE5SUc1Q2VYUmxjeUFxSURnZ0xTQnRUR1Z1SUMwZ01WeHVJQ0IyWVhJZ1pVMWhlQ0E5SUNneElEdzhJR1ZNWlc0cElDMGdNVnh1SUNCMllYSWdaVUpwWVhNZ1BTQmxUV0Y0SUQ0K0lERmNiaUFnZG1GeUlISjBJRDBnS0cxTVpXNGdQVDA5SURJeklEOGdUV0YwYUM1d2IzY29NaXdnTFRJMEtTQXRJRTFoZEdndWNHOTNLRElzSUMwM055a2dPaUF3S1Z4dUlDQjJZWElnYVNBOUlHbHpURVVnUHlBd0lEb2dLRzVDZVhSbGN5QXRJREVwWEc0Z0lIWmhjaUJrSUQwZ2FYTk1SU0EvSURFZ09pQXRNVnh1SUNCMllYSWdjeUE5SUhaaGJIVmxJRHdnTUNCOGZDQW9kbUZzZFdVZ1BUMDlJREFnSmlZZ01TQXZJSFpoYkhWbElEd2dNQ2tnUHlBeElEb2dNRnh1WEc0Z0lIWmhiSFZsSUQwZ1RXRjBhQzVoWW5Nb2RtRnNkV1VwWEc1Y2JpQWdhV1lnS0dselRtRk9LSFpoYkhWbEtTQjhmQ0IyWVd4MVpTQTlQVDBnU1c1bWFXNXBkSGtwSUh0Y2JpQWdJQ0J0SUQwZ2FYTk9ZVTRvZG1Gc2RXVXBJRDhnTVNBNklEQmNiaUFnSUNCbElEMGdaVTFoZUZ4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUdVZ1BTQk5ZWFJvTG1ac2IyOXlLRTFoZEdndWJHOW5LSFpoYkhWbEtTQXZJRTFoZEdndVRFNHlLVnh1SUNBZ0lHbG1JQ2gyWVd4MVpTQXFJQ2hqSUQwZ1RXRjBhQzV3YjNjb01pd2dMV1VwS1NBOElERXBJSHRjYmlBZ0lDQWdJR1V0TFZ4dUlDQWdJQ0FnWXlBcVBTQXlYRzRnSUNBZ2ZWeHVJQ0FnSUdsbUlDaGxJQ3NnWlVKcFlYTWdQajBnTVNrZ2UxeHVJQ0FnSUNBZ2RtRnNkV1VnS3owZ2NuUWdMeUJqWEc0Z0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lIWmhiSFZsSUNzOUlISjBJQ29nVFdGMGFDNXdiM2NvTWl3Z01TQXRJR1ZDYVdGektWeHVJQ0FnSUgxY2JpQWdJQ0JwWmlBb2RtRnNkV1VnS2lCaklENDlJRElwSUh0Y2JpQWdJQ0FnSUdVcksxeHVJQ0FnSUNBZ1l5QXZQU0F5WEc0Z0lDQWdmVnh1WEc0Z0lDQWdhV1lnS0dVZ0t5QmxRbWxoY3lBK1BTQmxUV0Y0S1NCN1hHNGdJQ0FnSUNCdElEMGdNRnh1SUNBZ0lDQWdaU0E5SUdWTllYaGNiaUFnSUNCOUlHVnNjMlVnYVdZZ0tHVWdLeUJsUW1saGN5QStQU0F4S1NCN1hHNGdJQ0FnSUNCdElEMGdLSFpoYkhWbElDb2dZeUF0SURFcElDb2dUV0YwYUM1d2IzY29NaXdnYlV4bGJpbGNiaUFnSUNBZ0lHVWdQU0JsSUNzZ1pVSnBZWE5jYmlBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ2JTQTlJSFpoYkhWbElDb2dUV0YwYUM1d2IzY29NaXdnWlVKcFlYTWdMU0F4S1NBcUlFMWhkR2d1Y0c5M0tESXNJRzFNWlc0cFhHNGdJQ0FnSUNCbElEMGdNRnh1SUNBZ0lIMWNiaUFnZlZ4dVhHNGdJR1p2Y2lBb095QnRUR1Z1SUQ0OUlEZzdJR0oxWm1abGNsdHZabVp6WlhRZ0t5QnBYU0E5SUcwZ0ppQXdlR1ptTENCcElDczlJR1FzSUcwZ0x6MGdNalUyTENCdFRHVnVJQzA5SURncElIdDlYRzVjYmlBZ1pTQTlJQ2hsSUR3OElHMU1aVzRwSUh3Z2JWeHVJQ0JsVEdWdUlDczlJRzFNWlc1Y2JpQWdabTl5SUNnN0lHVk1aVzRnUGlBd095QmlkV1ptWlhKYmIyWm1jMlYwSUNzZ2FWMGdQU0JsSUNZZ01IaG1aaXdnYVNBclBTQmtMQ0JsSUM4OUlESTFOaXdnWlV4bGJpQXRQU0E0S1NCN2ZWeHVYRzRnSUdKMVptWmxjbHR2Wm1aelpYUWdLeUJwSUMwZ1pGMGdmRDBnY3lBcUlERXlPRnh1ZlZ4dUlsMTlcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXGllZWU3NTRcXFxcaW5kZXguanNcIixcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcaWVlZTc1NFwiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbid1c2Ugc3RyaWN0JztcblxuLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2FuU2V0SW1tZWRpYXRlID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnNldEltbWVkaWF0ZTtcbiAgICB2YXIgY2FuUG9zdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wb3N0TWVzc2FnZSAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcjtcblxuICAgIGlmIChjYW5TZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgICByZXR1cm4gd2luZG93LnNldEltbWVkaWF0ZShmKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoY2FuUG9zdCkge1xuICAgICAgICB2YXIgcXVldWUgPSBbXTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBldi5zb3VyY2U7XG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9PT0gd2luZG93IHx8IHNvdXJjZSA9PT0gbnVsbCkgJiYgZXYuZGF0YSA9PT0gJ3Byb2Nlc3MtdGljaycpIHtcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSgncHJvY2Vzcy10aWNrJywgJyonKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcbn0oKTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICcvJztcbn07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1KeWIzZHpaWEl1YW5NaVhTd2libUZ0WlhNaU9sc2ljSEp2WTJWemN5SXNJbTF2WkhWc1pTSXNJbVY0Y0c5eWRITWlMQ0p1WlhoMFZHbGpheUlzSW1OaGJsTmxkRWx0YldWa2FXRjBaU0lzSW5kcGJtUnZkeUlzSW5ObGRFbHRiV1ZrYVdGMFpTSXNJbU5oYmxCdmMzUWlMQ0p3YjNOMFRXVnpjMkZuWlNJc0ltRmtaRVYyWlc1MFRHbHpkR1Z1WlhJaUxDSm1JaXdpY1hWbGRXVWlMQ0psZGlJc0luTnZkWEpqWlNJc0ltUmhkR0VpTENKemRHOXdVSEp2Y0dGbllYUnBiMjRpTENKc1pXNW5kR2dpTENKbWJpSXNJbk5vYVdaMElpd2ljSFZ6YUNJc0luTmxkRlJwYldWdmRYUWlMQ0owYVhSc1pTSXNJbUp5YjNkelpYSWlMQ0psYm5ZaUxDSmhjbWQySWl3aWJtOXZjQ0lzSW05dUlpd2lZV1JrVEdsemRHVnVaWElpTENKdmJtTmxJaXdpYjJabUlpd2ljbVZ0YjNabFRHbHpkR1Z1WlhJaUxDSnlaVzF2ZG1WQmJHeE1hWE4wWlc1bGNuTWlMQ0psYldsMElpd2lZbWx1WkdsdVp5SXNJbTVoYldVaUxDSkZjbkp2Y2lJc0ltTjNaQ0lzSW1Ob1pHbHlJaXdpWkdseUlsMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFVRkJPenRCUVVWQkxFbEJRVWxCTEZWQlFWVkRMRTlCUVU5RExFOUJRVkFzUjBGQmFVSXNSVUZCTDBJN08wRkJSVUZHTEZGQlFWRkhMRkZCUVZJc1IwRkJiMElzV1VGQldUdEJRVU0xUWl4UlFVRkpReXhyUWtGQmEwSXNUMEZCVDBNc1RVRkJVQ3hMUVVGclFpeFhRVUZzUWl4SlFVTnVRa0VzVDBGQlQwTXNXVUZFVmp0QlFVVkJMRkZCUVVsRExGVkJRVlVzVDBGQlQwWXNUVUZCVUN4TFFVRnJRaXhYUVVGc1FpeEpRVU5ZUVN4UFFVRlBSeXhYUVVSSkxFbEJRMWRJTEU5QlFVOUpMR2RDUVVSb1F6czdRVUZKUVN4UlFVRkpUQ3hsUVVGS0xFVkJRWEZDTzBGQlEycENMR1ZCUVU4c1ZVRkJWVTBzUTBGQlZpeEZRVUZoTzBGQlFVVXNiVUpCUVU5TUxFOUJRVTlETEZsQlFWQXNRMEZCYjBKSkxFTkJRWEJDTEVOQlFWQTdRVUZCSzBJc1UwRkJja1E3UVVGRFNEczdRVUZGUkN4UlFVRkpTQ3hQUVVGS0xFVkJRV0U3UVVGRFZDeFpRVUZKU1N4UlFVRlJMRVZCUVZvN1FVRkRRVTRzWlVGQlQwa3NaMEpCUVZBc1EwRkJkMElzVTBGQmVFSXNSVUZCYlVNc1ZVRkJWVWNzUlVGQlZpeEZRVUZqTzBGQlF6ZERMR2RDUVVGSlF5eFRRVUZUUkN4SFFVRkhReXhOUVVGb1FqdEJRVU5CTEdkQ1FVRkpMRU5CUVVOQkxGZEJRVmRTTEUxQlFWZ3NTVUZCY1VKUkxGZEJRVmNzU1VGQmFrTXNTMEZCTUVORUxFZEJRVWRGTEVsQlFVZ3NTMEZCV1N4alFVRXhSQ3hGUVVFd1JUdEJRVU4wUlVZc2JVSkJRVWRITEdWQlFVZzdRVUZEUVN4dlFrRkJTVW9zVFVGQlRVc3NUVUZCVGl4SFFVRmxMRU5CUVc1Q0xFVkJRWE5DTzBGQlEyeENMSGRDUVVGSlF5eExRVUZMVGl4TlFVRk5UeXhMUVVGT0xFVkJRVlE3UVVGRFFVUTdRVUZEU0R0QlFVTktPMEZCUTBvc1UwRlVSQ3hGUVZOSExFbEJWRWc3TzBGQlYwRXNaVUZCVHl4VFFVRlRaQ3hSUVVGVUxFTkJRV3RDWXl4RlFVRnNRaXhGUVVGelFqdEJRVU42UWs0c2EwSkJRVTFSTEVsQlFVNHNRMEZCVjBZc1JVRkJXRHRCUVVOQldpeHRRa0ZCVDBjc1YwRkJVQ3hEUVVGdFFpeGpRVUZ1UWl4RlFVRnRReXhIUVVGdVF6dEJRVU5JTEZOQlNFUTdRVUZKU0RzN1FVRkZSQ3hYUVVGUExGTkJRVk5NTEZGQlFWUXNRMEZCYTBKakxFVkJRV3hDTEVWQlFYTkNPMEZCUTNwQ1J5eHRRa0ZCVjBnc1JVRkJXQ3hGUVVGbExFTkJRV1k3UVVGRFNDeExRVVpFTzBGQlIwZ3NRMEZxUTJ0Q0xFVkJRVzVDT3p0QlFXMURRV3BDTEZGQlFWRnhRaXhMUVVGU0xFZEJRV2RDTEZOQlFXaENPMEZCUTBGeVFpeFJRVUZSYzBJc1QwRkJVaXhIUVVGclFpeEpRVUZzUWp0QlFVTkJkRUlzVVVGQlVYVkNMRWRCUVZJc1IwRkJZeXhGUVVGa08wRkJRMEYyUWl4UlFVRlJkMElzU1VGQlVpeEhRVUZsTEVWQlFXWTdPMEZCUlVFc1UwRkJVME1zU1VGQlZDeEhRVUZuUWl4RFFVRkZPenRCUVVWc1FucENMRkZCUVZFd1FpeEZRVUZTTEVkQlFXRkVMRWxCUVdJN1FVRkRRWHBDTEZGQlFWRXlRaXhYUVVGU0xFZEJRWE5DUml4SlFVRjBRanRCUVVOQmVrSXNVVUZCVVRSQ0xFbEJRVklzUjBGQlpVZ3NTVUZCWmp0QlFVTkJla0lzVVVGQlVUWkNMRWRCUVZJc1IwRkJZMG9zU1VGQlpEdEJRVU5CZWtJc1VVRkJVVGhDTEdOQlFWSXNSMEZCZVVKTUxFbEJRWHBDTzBGQlEwRjZRaXhSUVVGUkswSXNhMEpCUVZJc1IwRkJOa0pPTEVsQlFUZENPMEZCUTBGNlFpeFJRVUZSWjBNc1NVRkJVaXhIUVVGbFVDeEpRVUZtT3p0QlFVVkJla0lzVVVGQlVXbERMRTlCUVZJc1IwRkJhMElzVlVGQlZVTXNTVUZCVml4RlFVRm5RanRCUVVNNVFpeFZRVUZOTEVsQlFVbERMRXRCUVVvc1EwRkJWU3hyUTBGQlZpeERRVUZPTzBGQlEwZ3NRMEZHUkRzN1FVRkpRVHRCUVVOQmJrTXNVVUZCVVc5RExFZEJRVklzUjBGQll5eFpRVUZaTzBGQlFVVXNWMEZCVHl4SFFVRlFPMEZCUVZrc1EwRkJlRU03UVVGRFFYQkRMRkZCUVZGeFF5eExRVUZTTEVkQlFXZENMRlZCUVZWRExFZEJRVllzUlVGQlpUdEJRVU16UWl4VlFVRk5MRWxCUVVsSUxFdEJRVW9zUTBGQlZTeG5RMEZCVml4RFFVRk9PMEZCUTBnc1EwRkdSQ0lzSW1acGJHVWlPaUppY205M2MyVnlMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUx5OGdjMmhwYlNCbWIzSWdkWE5wYm1jZ2NISnZZMlZ6Y3lCcGJpQmljbTkzYzJWeVhHNWNiblpoY2lCd2NtOWpaWE56SUQwZ2JXOWtkV3hsTG1WNGNHOXlkSE1nUFNCN2ZUdGNibHh1Y0hKdlkyVnpjeTV1WlhoMFZHbGpheUE5SUNobWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ2RtRnlJR05oYmxObGRFbHRiV1ZrYVdGMFpTQTlJSFI1Y0dWdlppQjNhVzVrYjNjZ0lUMDlJQ2QxYm1SbFptbHVaV1FuWEc0Z0lDQWdKaVlnZDJsdVpHOTNMbk5sZEVsdGJXVmthV0YwWlR0Y2JpQWdJQ0IyWVhJZ1kyRnVVRzl6ZENBOUlIUjVjR1Z2WmlCM2FXNWtiM2NnSVQwOUlDZDFibVJsWm1sdVpXUW5YRzRnSUNBZ0ppWWdkMmx1Wkc5M0xuQnZjM1JOWlhOellXZGxJQ1ltSUhkcGJtUnZkeTVoWkdSRmRtVnVkRXhwYzNSbGJtVnlYRzRnSUNBZ08xeHVYRzRnSUNBZ2FXWWdLR05oYmxObGRFbHRiV1ZrYVdGMFpTa2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdablZ1WTNScGIyNGdLR1lwSUhzZ2NtVjBkWEp1SUhkcGJtUnZkeTV6WlhSSmJXMWxaR2xoZEdVb1ppa2dmVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQnBaaUFvWTJGdVVHOXpkQ2tnZTF4dUlDQWdJQ0FnSUNCMllYSWdjWFZsZFdVZ1BTQmJYVHRjYmlBZ0lDQWdJQ0FnZDJsdVpHOTNMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9KMjFsYzNOaFoyVW5MQ0JtZFc1amRHbHZiaUFvWlhZcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQnpiM1Z5WTJVZ1BTQmxkaTV6YjNWeVkyVTdYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9LSE52ZFhKalpTQTlQVDBnZDJsdVpHOTNJSHg4SUhOdmRYSmpaU0E5UFQwZ2JuVnNiQ2tnSmlZZ1pYWXVaR0YwWVNBOVBUMGdKM0J5YjJObGMzTXRkR2xqYXljcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmxkaTV6ZEc5d1VISnZjR0ZuWVhScGIyNG9LVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2NYVmxkV1V1YkdWdVozUm9JRDRnTUNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IyWVhJZ1ptNGdQU0J4ZFdWMVpTNXphR2xtZENncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JtYmlncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2ZTd2dkSEoxWlNrN1hHNWNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlHWjFibU4wYVc5dUlHNWxlSFJVYVdOcktHWnVLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnhkV1YxWlM1d2RYTm9LR1p1S1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSGRwYm1SdmR5NXdiM04wVFdWemMyRm5aU2duY0hKdlkyVnpjeTEwYVdOckp5d2dKeW9uS1R0Y2JpQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNCOVhHNWNiaUFnSUNCeVpYUjFjbTRnWm5WdVkzUnBiMjRnYm1WNGRGUnBZMnNvWm00cElIdGNiaUFnSUNBZ0lDQWdjMlYwVkdsdFpXOTFkQ2htYml3Z01DazdYRzRnSUNBZ2ZUdGNibjBwS0NrN1hHNWNibkJ5YjJObGMzTXVkR2wwYkdVZ1BTQW5Zbkp2ZDNObGNpYzdYRzV3Y205alpYTnpMbUp5YjNkelpYSWdQU0IwY25WbE8xeHVjSEp2WTJWemN5NWxibllnUFNCN2ZUdGNibkJ5YjJObGMzTXVZWEpuZGlBOUlGdGRPMXh1WEc1bWRXNWpkR2x2YmlCdWIyOXdLQ2tnZTMxY2JseHVjSEp2WTJWemN5NXZiaUE5SUc1dmIzQTdYRzV3Y205alpYTnpMbUZrWkV4cGMzUmxibVZ5SUQwZ2JtOXZjRHRjYm5CeWIyTmxjM011YjI1alpTQTlJRzV2YjNBN1hHNXdjbTlqWlhOekxtOW1aaUE5SUc1dmIzQTdYRzV3Y205alpYTnpMbkpsYlc5MlpVeHBjM1JsYm1WeUlEMGdibTl2Y0R0Y2JuQnliMk5sYzNNdWNtVnRiM1psUVd4c1RHbHpkR1Z1WlhKeklEMGdibTl2Y0R0Y2JuQnliMk5sYzNNdVpXMXBkQ0E5SUc1dmIzQTdYRzVjYm5CeWIyTmxjM011WW1sdVpHbHVaeUE5SUdaMWJtTjBhVzl1SUNodVlXMWxLU0I3WEc0Z0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZHdjbTlqWlhOekxtSnBibVJwYm1jZ2FYTWdibTkwSUhOMWNIQnZjblJsWkNjcE8xeHVmVnh1WEc0dkx5QlVUMFJQS0hOb2RIbHNiV0Z1S1Z4dWNISnZZMlZ6Y3k1amQyUWdQU0JtZFc1amRHbHZiaUFvS1NCN0lISmxkSFZ5YmlBbkx5Y2dmVHRjYm5CeWIyTmxjM011WTJoa2FYSWdQU0JtZFc1amRHbHZiaUFvWkdseUtTQjdYRzRnSUNBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0Nkd2NtOWpaWE56TG1Ob1pHbHlJR2x6SUc1dmRDQnpkWEJ3YjNKMFpXUW5LVHRjYm4wN1hHNGlYWDA9XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxwcm9jZXNzXFxcXGJyb3dzZXIuanNcIixcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxccHJvY2Vzc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLy8gaW1wb3J0IFJvdXRlciBmcm9tICcuL3V0aWxzL3JvdXRlcic7XG4vKmltcG9ydCBVc2VyIGZyb20gJy4vdXRpbHMvVXNlcic7XHJcbmltcG9ydCBEQiBmcm9tICcuL3V0aWxzL0RCJztcclxuXHJcbmltcG9ydCB7IGluZGV4IH0gZnJvbSAnLi9yb3V0ZXMvaW5kZXgnO1xyXG5pbXBvcnQgeyBsb2dpbiB9IGZyb20gJy4vcm91dGVzL2xvZ2luJztcclxuXHJcbmltcG9ydCB7IGNhbGVuZGFyIH0gZnJvbSAnLi9yb3V0ZXMvY2FsZW5kYXIvY2FsZW5kYXInO1xyXG5pbXBvcnQgeyBkYXkgfSBmcm9tICcuL3JvdXRlcy9jYWxlbmRhci9kYXknO1xyXG5pbXBvcnQgeyBldmVudCB9IGZyb20gJy4vcm91dGVzL2NhbGVuZGFyL2V2ZW50JztcclxuaW1wb3J0IHsgbGlzdCB9IGZyb20gJy4vcm91dGVzL2NhbGVuZGFyL2xpc3QnO1xyXG5cclxuY29uc3Qgcm91dGVzID0gW2luZGV4LCBsb2dpbiwgY2FsZW5kYXIsIGRheSwgZXZlbnQsIGxpc3RdO1xyXG5cclxuY29uc3QgdXNlciA9IG5ldyBVc2VyKCk7XHJcbmNvbnN0IGRiID0gbmV3IERCKCdodHRwczovL2ZpcmViYXNlLmNvbScpOyovXG5cbi8vINCy0L7Qt9C80L7QttC90L4g0L3Rg9C20LXQvSDQsdGD0LTQtdGCINC40LLQtdC90YIg0LHQsNGBXG4vLyBuZXcgUm91dGVyKHtyb3V0ZXMsIHVzZXIsIGRifSk7XG4vKipcclxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgY2FsZW5kYXJcclxuICogQGNsYXNzXHJcbiAqL1xuXG52YXIgQ2FsZW5kYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBjYWxlbmRhciBvYmplY3RcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgLSBET00gZWxlbWVudFxyXG4gICAgICovXG5cbiAgICBmdW5jdGlvbiBDYWxlbmRhcihlbGVtZW50KSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDYWxlbmRhcik7XG5cbiAgICAgICAgLy/Qv9C+0LzQtdC90Y/RgtGMINCyINGA0LDQt9C80LXRgtC60LUsINGH0YLQvtCx0YsgSGVhZGVyICsgdGFibGUg0LHRi9C70Lgg0L7QsdC10YDQvdGD0YLRiyDQsiDQtNC40LJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDsgLy/RgdGO0LTQsCDQv9C10YDQtdC00LDQtdGC0YHRjyDQvtCx0LXRgNGC0LrQsCAtINC/0YPRgdGC0L7QuSDQtNC40LJcblxuICAgICAgICB0aGlzLmN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBDaGFuZ2UgbW9udGhcclxuICAgICAqL1xuXG5cbiAgICBfY3JlYXRlQ2xhc3MoQ2FsZW5kYXIsIFt7XG4gICAgICAgIGtleTogJ2dvUHJldk1vbnRoJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdvUHJldk1vbnRoKCkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50RGF0ZS5zZXRNb250aCh0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCkgLSAxKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgICAgICAvLyDQv9GA0L7QstC10YDQuNGC0Ywg0L3QsCDQutCw0LrRg9GOINGB0YLRgNC10LvQutGDINC90LDQttCw0LvQuFxuICAgICAgICAgICAgLy8g0Lgg0LTQvtCx0LDQstC40YLRjCDQuNC70Lgg0L7RgtC90Y/RgtGMINC+0LTQuNC9INC80LXRgdGP0YZcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ29OZXh0TW9udGgnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ29OZXh0TW9udGgoKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnREYXRlLnNldE1vbnRoKHRoaXMuY3VycmVudERhdGUuZ2V0TW9udGgoKSArIDEpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICAgIC8vINC/0YDQvtCy0LXRgNC40YLRjCDQvdCwINC60LDQutGD0Y4g0YHRgtGA0LXQu9C60YMg0L3QsNC20LDQu9C4XG4gICAgICAgICAgICAvLyDQuCDQtNC+0LHQsNCy0LjRgtGMINC40LvQuCDQvtGC0L3Rj9GC0Ywg0L7QtNC40L0g0LzQtdGB0Y/RhlxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVuZGVyIGNhbGVuZGFyIGhlYWRlclxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZW5kZXJDYWxlbmRhckhlYWRlcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXJDYWxlbmRhckhlYWRlcigpIHtcbiAgICAgICAgICAgIHZhciBoZWFkZXJCb2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgICAgICAgICBoZWFkZXJCb2R5LmlubmVySFRNTCA9ICcgXFxcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FsZW5kYXItaGVhZGVyXCI+IFxcXHJcbiAgICAgICAgICAgIDxidXR0b24+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBwcmV2LW1vbnRoLWFycm93XCI+a2V5Ym9hcmRfYXJyb3dfbGVmdDwvaT48L2J1dHRvbj4gXFxcclxuICAgICAgICAgICAgICA8ZGl2PiBcXFxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJtb250aFwiPtCY0Y7Qu9GMPC9zcGFuPiBcXFxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ5ZWFyXCI+MjAxNzwvc3Bhbj4gXFxcclxuICAgICAgICAgICAgICA8L2Rpdj4gXFxcclxuICAgICAgICAgICAgPGJ1dHRvbj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIG5leHQtbW9udGgtYXJyb3dcIj5rZXlib2FyZF9hcnJvd19yaWdodDwvaT48L2J1dHRvbj4gXFxcclxuICAgICAgICA8L2Rpdj4nO1xuXG4gICAgICAgICAgICBoZWFkZXJCb2R5LnF1ZXJ5U2VsZWN0b3IoJy5tb250aCcpLmlubmVySFRNTCA9IHRoaXMuY3VycmVudERhdGUuZ2V0TW9udGgoKTtcbiAgICAgICAgICAgIGhlYWRlckJvZHkucXVlcnlTZWxlY3RvcignLnllYXInKS5pbm5lckhUTUwgPSB0aGlzLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBoZWFkZXJCb2R5LnF1ZXJ5U2VsZWN0b3IoJy5wcmV2LW1vbnRoLWFycm93JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5nb1ByZXZNb250aCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBoZWFkZXJCb2R5LnF1ZXJ5U2VsZWN0b3IoJy5uZXh0LW1vbnRoLWFycm93JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5nb05leHRNb250aCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoaGVhZGVyQm9keSk7XG5cbiAgICAgICAgICAgIC8vINC90LDRgNC40YHQvtCy0LDRgtGMINGB0YLRgNC10LvQutC4INC4INC80LXRgdGP0YYv0LPQvtC0XG4gICAgICAgICAgICAvLyDQv9C+0LLQtdGB0LjRgtGMINC90LAg0L3QuNGFIGNoYW5nZU1vbnRoXG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZW5kZXIgY2FsZW5kYXJcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyQ2FsZW5kYXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyQ2FsZW5kYXIoKSB7XG4gICAgICAgICAgICB2YXIgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdUQUJMRScpO1xuICAgICAgICAgICAgdGFibGUuY2xhc3NOYW1lID0gJ3RhYmxlLXJlc3BvbnNpdmUnO1xuICAgICAgICAgICAgdmFyIHllYXIgPSB0aGlzLmN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgICAgICB2YXIgbW9udGggPSB0aGlzLmN1cnJlbnREYXRlLmdldE1vbnRoKCk7XG5cbiAgICAgICAgICAgIHZhciBkID0gbmV3IERhdGUoeWVhciwgbW9udGgsIDEpO1xuICAgICAgICAgICAgdmFyIGxhc3REID0gbmV3IERhdGUoeWVhciwgbW9udGggKyAxLCAwKTtcbiAgICAgICAgICAgIHZhciB0YWJsZVJvdyA9IHRhYmxlLmluc2VydFJvdygpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldERheShkKTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhYmxlQ2VsbCA9IHRhYmxlUm93Lmluc2VydENlbGwoKTtcbiAgICAgICAgICAgICAgICB0YWJsZUNlbGwuY2xhc3NOYW1lID0gJ2NhbGVuZGFyLWRheSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdoaWxlIChkLmdldE1vbnRoKCkgPT0gbW9udGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFibGVDZWxsID0gdGFibGVSb3cuaW5zZXJ0Q2VsbCgpO1xuICAgICAgICAgICAgICAgIHRhYmxlQ2VsbC5pbm5lckhUTUwgPSBkLmdldERhdGUoKTtcbiAgICAgICAgICAgICAgICB0YWJsZUNlbGwuaWQgPSBkLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICB0YWJsZUNlbGwuY2xhc3NOYW1lID0gJ2NhbGVuZGFyLWRheSc7XG4gICAgICAgICAgICAgICAgbmV3IEV2ZW50c0xpc3QodGFibGVDZWxsLCBkKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldERheShkKSAlIDcgPT09IDYpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFibGVSb3cgPSB0YWJsZS5pbnNlcnRSb3coKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZC5zZXREYXRlKGQuZ2V0RGF0ZSgpICsgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmdldERheShkKSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IHRoaXMuZ2V0RGF5KGxhc3REKTsgaSA8IDY7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFibGVDZWxsID0gdGFibGVSb3cuaW5zZXJ0Q2VsbCgpO1xuICAgICAgICAgICAgICAgICAgICB0YWJsZUNlbGwuY2xhc3NOYW1lID0gJ2NhbGVuZGFyLWRheSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGFibGUpO1xuXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0YWJsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdENlbGwoZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vINC90LDRgNC40YHQvtCy0LDRgtGMINGB0LDQvCDQutCw0LvQtdC90LTQsNGA0YxcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlbmRlciBjYWxlbmRhciBoZWFkZXIgYW5kIGJvZHlcclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQ2FsZW5kYXJIZWFkZXIoKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQ2FsZW5kYXIoKTtcbiAgICAgICAgICAgIGRiLmxvYWRFdmVudHNGcm9tREIoKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2hvdycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzaG93KCkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdoaWRlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhpZGUoKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0RGF5JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldERheShkYXRlKSB7XG4gICAgICAgICAgICAvLyB3ZWVrZGF5cyBNb25kYXkgKDApIHRvIFN1bmRheSAoNilcbiAgICAgICAgICAgIHZhciB3ZWVrRGF5ID0gZGF0ZS5nZXREYXkoKTtcbiAgICAgICAgICAgIGlmICh3ZWVrRGF5ID09PSAwKSB3ZWVrRGF5ID0gNztcbiAgICAgICAgICAgIHJldHVybiB3ZWVrRGF5IC0gMTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2VsZWN0Q2VsbCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZWxlY3RDZWxsKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgdGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnVEFCTEUnKTtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG5cbiAgICAgICAgICAgIHdoaWxlICh0YXJnZXQgIT09IHRhYmxlICYmIHRhcmdldC5pbm5lckhUTUwgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldC50YWdOYW1lID09ICdURCcpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZFZGl0Rm9ybS5zaG93RXZlbnRDcmVhdGVGb3JtKHRhcmdldC5pZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZXZlbnQnKSkge1xuICAgICAgICAgICAgICAgICAgICBldkVkaXRGb3JtLnNob3dFdmVudEVkaXRGb3JtKHRhcmdldC5pZCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LnRhZ05hbWUgPT0gJ0JVVFRPTicpIHtcbiAgICAgICAgICAgICAgICAgICAgZGIuZGVsZXRlRXZlbnQodGFyZ2V0LnBhcmVudE5vZGUuaWQpO1xuICAgICAgICAgICAgICAgICAgICBjYWwucmVuZGVyKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBDYWxlbmRhcjtcbn0oKTtcblxuLy9leHBvcnQgZGVmYXVsdCBDYWxlbmRhcjtcbi8qKlxyXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBjb21tZW50XHJcbiAqIEBjbGFzc1xyXG4gKi9cblxuXG52YXIgQ29tbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIGNvbW1lbnRcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgLSBET00gZWxlbWVudFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGNvbW1lbnREYXRhIC0gQ29tbWVudCBkYXRhXHJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBDb21tZW50KGVsZW1lbnQsIGNvbW1lbnREYXRhKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDb21tZW50KTtcblxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50OyAvLyDRjdC70LXQvNC10L3RgiA9INGP0YfQtdC50LrQsD9cbiAgICAgICAgdGhpcy5jb21tZW50RGF0YSA9IGNvbW1lbnREYXRhO1xuICAgICAgICB0aGlzLnJlbmRlckNvbW1lbnQoKTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFJlbmRlciBjb21tZW50XHJcbiAgICAgKi9cblxuXG4gICAgX2NyZWF0ZUNsYXNzKENvbW1lbnQsIFt7XG4gICAgICAgIGtleTogJ3JlbmRlckNvbW1lbnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyQ29tbWVudCgpIHtcbiAgICAgICAgICAgIHZhciBjb21tZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgICAgICAgICBjb21tZW50LmlubmVySFRNTCA9ICdcXFxyXG4gIFx0PGRpdiBjbGFzcz1cImNvbW1lbnRzXCI+IFxcXHJcblx0ICA8aDQ+Q29tbWVudHM8L2g0PiBcXFxyXG5cdCAgPHVsIGNsYXNzPVwibGlzdC1ncm91cFwiPiBcXFxyXG5cdCAgICA8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj5yZXJlbDwvbGk+IFxcXHJcblx0ICAgIDxsaSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbVwiPmZrZGxmZGtmbDwvbGk+IFxcXHJcblx0ICA8L3VsPiBcXFxyXG5cdDwvZGl2Pic7XG4gICAgICAgICAgICBjb21tZW50LmNvbnRlbnRFZGl0YWJsZSA9ICd0cnVlJztcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChjb21tZW50KTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBDb21tZW50O1xufSgpO1xuXG4vL2V4cG9ydCBkZWZhdWx0IENvbW1lbnQ7XG4vKipcclxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgZXZlbnRcclxuICogQGNsYXNzXHJcbiAqL1xuXG5cbnZhciBFdmVudHNMaXN0ID0gZnVuY3Rpb24gKCkge1xuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgZXZlbnRcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgLSBET00gZWxlbWVudFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGV2ZW50RGF0YSAtIEV2ZW50IGRhdGFcclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEV2ZW50c0xpc3QoZWxlbWVudCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRXZlbnRzTGlzdCk7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgLy90aGlzLmRhdGUgPSBkYXRlO1xuICAgICAgICB0aGlzLnJlbmRlckV2ZW50c0xpc3QoKTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFJlbmRlciBldmVudFxyXG4gICAgICovXG5cblxuICAgIF9jcmVhdGVDbGFzcyhFdmVudHNMaXN0LCBbe1xuICAgICAgICBrZXk6ICdyZW5kZXJFdmVudHNMaXN0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlckV2ZW50c0xpc3QoKSB7XG4gICAgICAgICAgICB2YXIgZXZlbnRzID0gZGIubG9hZEV2ZW50c0J5RGF0ZSh0aGlzLmVsZW1lbnQuaWQpO1xuICAgICAgICAgICAgaWYgKCFldmVudHMgfHwgIWV2ZW50cy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICAgICAgdmFyIGV2ZW50c0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICAgICAgICAgIGV2ZW50c0xpc3QuY2xhc3NOYW1lID0gJ2V2ZW50cyc7XG4gICAgICAgICAgICBldmVudHNMaXN0LmlubmVySFRNTCA9ICdcXFxyXG4gICAgPGRpdiBjbGFzcz1cInBhbmVsIHBhbmVsLWluZm9cIj4gXFxcclxuICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwtaGVhZGluZ1wiPiBcXFxyXG4gICAgICAgICAgPGgzIGNsYXNzPVwicGFuZWwtdGl0bGVcIj5Zb3VyIGV2ZW50czwvaDM+IFxcXHJcbiAgICAgICAgPC9kaXY+IFxcXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj4gXFxcclxuICAgICAgICA8L2Rpdj4gXFxcclxuICAgIDwvZGl2Pic7XG4gICAgICAgICAgICB2YXIgZXZlbnRzTGlzdENvbnRhaW5lciA9IGV2ZW50c0xpc3QucXVlcnlTZWxlY3RvcignLnBhbmVsLWJvZHknKTtcbiAgICAgICAgICAgIC8qbmV3IEV2ZW50KGV2ZW50c0xpc3RDb250YWluZXIsICdoZWxsbycpO1xyXG4gICAgICAgICAgICBuZXcgRXZlbnQoZXZlbnRzTGlzdENvbnRhaW5lciwgJ2hlbGxvIHdvcmxkJyk7Ki9cblxuICAgICAgICAgICAgZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgICAgICAgICAgICBuZXcgRXZlbnQoZXZlbnRzTGlzdENvbnRhaW5lciwgZWxlbSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGV2ZW50c0xpc3QpO1xuICAgICAgICAgICAgLy8g0LTQvtCx0LDQstC40YLRjCDRgdC+0LHRi9GC0LjQtSDQsiDQv9C10YDQtdC00LDQvdC90YvQuSBET00g0Y3Qu9C10LzQtdC90YJcbiAgICAgICAgICAgIC8vINC/0L7QstC10YHQuNGC0Ywg0L3QsCDQutC90L7Qv9C60YMgZGVsZXRlRXZlbnRcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBFdmVudHNMaXN0O1xufSgpO1xuXG4vL2V4cG9ydCBkZWZhdWx0IEV2ZW50O1xuLyoqXHJcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIGV2ZW50XHJcbiAqIEBjbGFzc1xyXG4gKi9cblxuXG52YXIgRXZlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBldmVudFxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudCAtIERPTSBlbGVtZW50XHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnREYXRhIC0gRXZlbnQgZGF0YVxyXG4gICAgICovXG4gICAgZnVuY3Rpb24gRXZlbnQoZWxlbWVudCwgZXZlbnREYXRhLCBkYikge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRXZlbnQpO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuZXZlbnREYXRhID0gZXZlbnREYXRhO1xuICAgICAgICB0aGlzLnJlbmRlckV2ZW50KCk7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgICogRGVsZXRlIGV2ZW50XHJcbiAgICAgICovXG5cblxuICAgIF9jcmVhdGVDbGFzcyhFdmVudCwgW3tcbiAgICAgICAga2V5OiAnZGVsZXRlRXZlbnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZGVsZXRlRXZlbnQoKSB7fVxuICAgICAgICAvLyBkYi5kZWxldGVFdmVudChpZClcbiAgICAgICAgLy8gaWQg0LLQt9GP0YLRjCDQuNC3IGV2ZW50RGF0YVxuXG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVuZGVyIGV2ZW50XHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlckV2ZW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlckV2ZW50KCkge1xuICAgICAgICAgICAgLy8g0LTQvtCx0LDQstC40YLRjCDRgdC+0LHRi9GC0LjQtSDQsiDQv9C10YDQtdC00LDQvdC90YvQuSBET00g0Y3Qu9C10LzQtdC90YJcbiAgICAgICAgICAgIC8vINC/0L7QstC10YHQuNGC0Ywg0L3QsCDQutC90L7Qv9C60YMgZGVsZXRlRXZlbnRcbiAgICAgICAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuXG4gICAgICAgICAgICBldmVudC5jbGFzc05hbWUgPSAnZXZlbnQgYWxlcnQgYWxlcnQtZGlzbWlzc2libGUgYWxlcnQtc3VjY2Vzcyc7XG5cbiAgICAgICAgICAgIGV2ZW50LmlubmVySFRNTCA9ICdcXFxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiY2xvc2VcIj7DlzwvYnV0dG9uPiBcXFxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYWxlcnQtbGlua1wiPjwvZGl2Pic7XG5cbiAgICAgICAgICAgIGV2ZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbGVydC1saW5rJykuaW5uZXJIVE1MID0gdGhpcy5ldmVudERhdGEudGV4dDtcbiAgICAgICAgICAgIGV2ZW50LmlkID0gdGhpcy5ldmVudERhdGEuaWQ7XG5cbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gRXZlbnQ7XG59KCk7XG5cbi8vZXhwb3J0IGRlZmF1bHQgRXZlbnQ7XG4vKipcclxuICAqIENsYXNzIHJlcHJlc2VudGluZyBhcHAgaGVhZGVyXHJcbiAgKiBAY2xhc3NcclxuICAqL1xuXG52YXIgSGVhZGVyID0gZnVuY3Rpb24gKCkge1xuICAgIC8qKlxyXG4gICAgICAqIENyZWF0ZSBhIGhlYWRlclxyXG4gICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IC0gRE9NIGVsZW1lbnRcclxuICAgICAgKiBAcGFyYW0ge09iamVjdH0gdXNlciAtIFVzZXIgb2JqZWN0XHJcbiAgICAgICovXG4gICAgZnVuY3Rpb24gSGVhZGVyKGVsZW1lbnQsIHVzZXIpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEhlYWRlcik7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcbiAgICAgICAgdGhpcy5yZW5kZXJIZWFkZXIoKTtcbiAgICAgICAgLy8gIHRoaXMucmV3cml0ZU9uTG9naW4oKTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIFJlbmRlciBoZWFkZXJcclxuICAgICAqL1xuXG5cbiAgICBfY3JlYXRlQ2xhc3MoSGVhZGVyLCBbe1xuICAgICAgICBrZXk6ICdyZW5kZXJIZWFkZXInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVySGVhZGVyKCkge1xuXG4gICAgICAgICAgICAvLyDQvtGC0L7QsdGA0LDQttCw0LXRgiDRhdC10LDQtNC10YAg0YEg0YDQsNC30L3Ri9C80Lgg0LrQvdC+0L/QutCw0LzQuCDQsiDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4XG4gICAgICAgICAgICAvLyDQvtGCINGC0L7Qs9C+INC30LDQu9C+0LPQuNC90LXQvSDRjtC30LXRgCDQuNC70Lgg0L3QtdGCXG4gICAgICAgICAgICAvLyDQv9GA0Lgg0L3QsNC20LDRgtC40Lgg0L3QsCDQutC90L7Qv9C60Lgg0L/QtdGA0LXRhdC+0LTQuNGC0Ywg0L3QsCDRgdGC0YDQsNC90LjRhtGDINGA0LXQs9C40YHRgtGA0LDRhtC40Lgg0LjQu9C4INCy0YvQu9C+0LPQuNC90LjQstCw0YLRjCDRjtC30LXRgNCwXG4gICAgICAgICAgICAvLyB1c2VyLmxvZ291dCgpO1xuICAgICAgICAgICAgLy8g0Lgg0YLQtFxuXG4gICAgICAgICAgICAvLyDQstC+0LfQvNC+0LbQvdC+INC+0L/RgtC40LzQsNC70YzQvdC+INC10LPQviDQvtGC0YDQtdC90LTQtdGA0LjRgtGMINC+0LTQuNC9INGA0LDQtywg0Lgg0LzQtdC90Y/RgtGMINGB0L7RgdGC0L7Rj9C90LjQtSDRh9C10YDQtdC3IGV2ZW50IGJ1cyxcbiAgICAgICAgICAgIC8vINC90L4g0L/QvtC60LAg0L3QtSDQv9C+0L3Rj9GC0L3QvikpXG5cbiAgICAgICAgICAgIHRoaXMuaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRElWJyk7XG4gICAgICAgICAgICB0aGlzLmhlYWRlci5jbGFzc05hbWUgPSAnbmF2YmFyIG5hdmJhci1kZWZhdWx0JztcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkXCI+IFxcXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cIm5hdmJhci1oZWFkZXJcIj4gXFxcclxuICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibmF2YmFyLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXRhcmdldD1cIi5uYXZiYXItcmVzcG9uc2l2ZS1jb2xsYXBzZVwiPiBcXFxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImljb24tYmFyXCI+PC9zcGFuPiBcXFxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImljb24tYmFyXCI+PC9zcGFuPiBcXFxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImljb24tYmFyXCI+PC9zcGFuPiBcXFxyXG4gICAgICAgICAgPC9idXR0b24+IFxcXHJcbiAgICAgICAgICA8YSBjbGFzcz1cIm5hdmJhci1icmFuZFwiIGhyZWY9XCIjXCI+SG9tZTwvYT4gXFxcclxuICAgICAgICA8L2Rpdj4gXFxcclxuICAgICAgICA8ZGl2IGNsYXNzPVwibmF2YmFyLWNvbGxhcHNlIGNvbGxhcHNlIG5hdmJhci1yZXNwb25zaXZlLWNvbGxhcHNlXCI+IFxcXHJcbiAgICAgICAgICA8dWwgY2xhc3M9XCJuYXYgbmF2YmFyLW5hdlwiPiBcXFxyXG4gICAgICAgICAgICA8bGkgY2xhc3M9XCJhY3RpdmVcIj48YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+QWN0aXZlPC9hPjwvbGk+IFxcXHJcbiAgICAgICAgICAgIDxsaT48YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+TGluazwvYT48L2xpPiBcXFxyXG4gICAgICAgICAgPC91bD4gXFxcclxuICAgICAgICAgIDx1bCBjbGFzcz1cIm5hdiBuYXZiYXItbmF2IG5hdmJhci1yaWdodCBteS10b3AtYnV0dG9uc1wiPiBcXFxyXG4gICAgICAgICAgICA8bGk+PGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcmFpc2VkIGJ0bi1kYW5nZXIgbXktdG9wLWJ0blwiPlZpZXcgQWxsPC9idXR0b24+PC9saT4gXFxcclxuICAgICAgICAgICAgPGxpPjxidXR0b24gY2xhc3M9XCJidG4gYnRuLXJhaXNlZCBidG4tZGFuZ2VyIG15LXRvcC1idG4gbXktdG9wLWxvZ2luLWJ0blwiPkxvZ291dDwvYnV0dG9uPjwvbGk+IFxcXHJcbiAgICAgICAgICA8L3VsPiBcXFxyXG4gICAgICAgIDwvZGl2PiBcXFxyXG4gICAgICA8L2Rpdj4nO1xuXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRoaXMuaGVhZGVyLCB0aGlzLmVsZW1lbnQuY2hpbGROb2Rlc1swXSk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignLm15LXRvcC1idXR0b25zJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5teS10b3AtbG9naW4tYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5yZXdyaXRlT25Mb2dvdXQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZXdyaXRlT25Mb2dpbicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZXdyaXRlT25Mb2dpbigpIHtcbiAgICAgICAgICAgIC8vdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5teS10b3AtbG9naW4tYnRuJykuaW5uZXJIVE1MID0gJ0xvZ291dCc7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignLm15LXRvcC1idXR0b25zJykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3Jld3JpdGVPbkxvZ291dCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZXdyaXRlT25Mb2dvdXQoKSB7XG4gICAgICAgICAgICAvL3RoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubXktdG9wLWxvZ2luLWJ0bicpLmlubmVySFRNTCA9ICdMb2dpbic7XG4gICAgICAgICAgICAvL2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLXNpZ25pbicpLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignLm15LXRvcC1idXR0b25zJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2dpbicpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgY2FsLmhpZGUoKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLXNpZ25pbicpLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gSGVhZGVyO1xufSgpO1xuXG4vL2V4cG9ydCBkZWZhdWx0IEhlYWRlcjtcbi8qKlxyXG4gICogQ2xhc3MgcmVwcmVzZW50aW5nIGFwcCBmb290ZXJcclxuICAqIEBjbGFzc1xyXG4gICovXG5cbnZhciBGb290ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXHJcbiAgICAgICogQ3JlYXRlIGEgZm9vdGVyXHJcbiAgICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgLSBET00gZWxlbWVudFxyXG4gICAgICAqL1xuICAgIGZ1bmN0aW9uIEZvb3RlcihlbGVtZW50LCB1c2VyKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGb290ZXIpO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMucmVuZGVyRm9vdGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXHJcbiAgICAgKiBSZW5kZXIgZm9vdGVyXHJcbiAgICAgKi9cblxuXG4gICAgX2NyZWF0ZUNsYXNzKEZvb3RlciwgW3tcbiAgICAgICAga2V5OiAncmVuZGVyRm9vdGVyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlckZvb3RlcigpIHtcbiAgICAgICAgICAgIHRoaXMuZm9vdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnRk9PVEVSJyk7XG4gICAgICAgICAgICB0aGlzLmZvb3Rlci5pbm5lckhUTUwgPSAnJmNvcHk7IDIwMTcgTXkgdGVhbSBKUyBjYWxlbmRhci4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gTWFrZSB3aXRoIGxvdmUgPHNwYW4+4p2kPC9zcGFuPic7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5mb290ZXIpO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIEZvb3Rlcjtcbn0oKTtcbi8qKlxyXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgbG9naW4gZm9ybVxyXG4gKiBAY2xhc3NcclxuICovXG5cblxudmFyIExvZ2luRm9ybSA9IGZ1bmN0aW9uICgpIHtcblxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgbG9naW4gZm9ybVxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBMb2dpbkZvcm0oZWxlbWVudCwgZGIpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIExvZ2luRm9ybSk7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5kYiA9IGRiO1xuICAgICAgICB0aGlzLnJlbmRlckxvZ2luRm9ybSgpO1xuICAgICAgICB0aGlzLnNob3coKTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAqIEhhbmRsZSBsb2dpbiBmb3JtXHJcbiAgICAgKi9cblxuXG4gICAgX2NyZWF0ZUNsYXNzKExvZ2luRm9ybSwgW3tcbiAgICAgICAga2V5OiAnaGFuZGxlU3VibWl0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdCgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciBlbWFpbCA9IHRoaXMubG9naW5Gb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJ1c2VybmFtZVwiXScpLnZhbHVlO1xuICAgICAgICAgICAgdmFyIHBhc3MgPSB0aGlzLmxvZ2luRm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwicGFzc3dvcmRcIl0nKS52YWx1ZTtcblxuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpcmViYXNlLmF1dGgoKS5zaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzcyk7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpcmViYXNlLmF1dGgoKS5jcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQoZW1haWwsIHBhc3MpO1xuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHVzZXIgPSBmaXJlYmFzZS5hdXRoKCkuY3VycmVudFVzZXI7XG4gICAgICAgICAgICAgICAgdmFyIHVpZCA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICB1aWQgPSB1c2VyLnVpZDtcbiAgICAgICAgICAgICAgICB2YXIgY2FsZW5kYXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FsZW5kYXItY29udGFpbmVyJyk7XG4gICAgICAgICAgICAgICAgdmFyIGNhbCA9IG5ldyBDYWxlbmRhcihjYWxlbmRhckNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgY2FsLnNob3coKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgLy9sb2NhdGlvbi5oYXNoID0gXCJtb250aGx5Vmlld1wiO1xuICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXCJjdXJyZW50VXNlclwiLCBlbWFpbCk7XG4gICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcImtleVwiLCB1aWQpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5oYW5kbGVXcm9uZ1Bhc3N3b3JkKCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tc2lnbmluJykucmVzZXQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBpZiAodXNlci5sb2dpbih1c2VyTmFtZSwgdXNlclBhc3N3b3JkKSkge1xuICAgICAgICAgICAgLy8gICBkYiA9IG5ldyBEQih1c2VyTmFtZSk7XG5cblxuICAgICAgICAgICAgLy8gICB0aGlzLmhhbmRsZUNvcnJlY3RQYXNzd29yZCgpO1xuICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICAgdGhpcy5oYW5kbGVXcm9uZ1Bhc3N3b3JkKCk7XG4gICAgICAgICAgICAvLyAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLXNpZ25pbicpLnJlc2V0KCk7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2hhbmRsZVdyb25nUGFzc3dvcmQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlV3JvbmdQYXNzd29yZCgpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwicGFzc3dvcmRcIl0nKS5wbGFjZWhvbGRlciA9ICdXcm9uZyBwYXNzd29yZCEgVHJ5IGFnYWluJztcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwicGFzc3dvcmRcIl0nKS5jbGFzc05hbWUgPSAnZm9ybS1jb250cm9sIG15LWxvZ2luIHdyb25nLXBhc3MnO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdoYW5kbGVDb3JyZWN0UGFzc3dvcmQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlQ29ycmVjdFBhc3N3b3JkKCkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJwYXNzd29yZFwiXScpLnBsYWNlaG9sZGVyID0gJ1Bhc3N3b3JkJztcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwicGFzc3dvcmRcIl0nKS5jbGFzc05hbWUgPSAnZm9ybS1jb250cm9sIG15LWxvZ2luJztcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyTG9naW5Gb3JtJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlckxvZ2luRm9ybSgpIHtcbiAgICAgICAgICAgIC8vINC+0YLRgNC10L3QtNC10YDQuNGC0Ywg0YTQvtGA0LzRg1xuICAgICAgICAgICAgLy8g0L/QvtCy0LXRgdC40YLRjCDQvdCwINGE0L7RgNC80YMgaGFuZGxlU3VibWl0XG4gICAgICAgICAgICB0aGlzLmxvZ2luRm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgICAgICAgICAgdGhpcy5sb2dpbkZvcm0uY2xhc3NOYW1lID0gJ2NvbnRhaW5lciBsb2dpbic7XG4gICAgICAgICAgICB0aGlzLmxvZ2luRm9ybS5pbm5lckhUTUwgPSAnPGZvcm0gY2xhc3M9XCJmb3JtLXNpZ25pblwiPiBcXFxyXG4gICAgPGgyIGNsYXNzPVwiZm9ybS1zaWduaW4taGVhZGluZ1wiPkxvZyBJbjwvaDI+IFxcXHJcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbCBteS1sb2dpblwiIG5hbWU9XCJ1c2VybmFtZVwiIHBsYWNlaG9sZGVyPVwiRW1haWwgQWRkcmVzc1wiIHJlcXVpcmVkPVwiXCIgYXV0b2ZvY3VzPVwiXCIvPiBcXFxyXG4gICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIGNsYXNzPVwiZm9ybS1jb250cm9sIG15LWxvZ2luXCIgbmFtZT1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCJQYXNzd29yZFwiIHJlcXVpcmVkPVwiXCIvPiBcXFxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tbGcgYnRuLWJsb2NrIG15LWxvZ2luLWJ0blwiIHR5cGU9XCJidXR0b25cIj5Mb2dpbjwvYnV0dG9uPiBcXFxyXG4gICAgPC9mb3JtPic7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5sb2dpbkZvcm0pO1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5teS1sb2dpbi1idG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgc2VsZi5oYW5kbGVTdWJtaXQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzaG93JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNob3coKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2luRm9ybS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIGhlYWRlci5yZXdyaXRlT25Mb2dvdXQoKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnaGlkZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoaWRlKCkge1xuICAgICAgICAgICAgdGhpcy5sb2dpbkZvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIGhlYWRlci5yZXdyaXRlT25Mb2dpbigpO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIExvZ2luRm9ybTtcbn0oKTtcblxuLy9leHBvcnQgZGVmYXVsdCBDb21tZW50Rm9ybTtcbi8qKlxyXG4gICogQ2xhc3MgcmVwcmVzZW50aW5nIGNvbW1lbnQgZm9ybVxyXG4gICogQGNsYXNzXHJcbiAgKi9cblxuXG52YXIgRXZlbnRFZGl0Rm9ybSA9IGZ1bmN0aW9uICgpIHtcblxuICAgIC8qKlxyXG4gICAgICAqIENyZWF0ZSBhIGNvbW1lbnQgZm9ybVxyXG4gICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICAqL1xuICAgIGZ1bmN0aW9uIEV2ZW50RWRpdEZvcm0oZWxlbWVudCwgZGIpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEV2ZW50RWRpdEZvcm0pO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuZGIgPSBkYjtcbiAgICAgICAgLy90aGlzLmV2ZW50SWQgPSBldmVudElkO1xuICAgICAgICB0aGlzLnJlbmRlckV2ZW50RWRpdEZvcm0oKTtcbiAgICB9XG5cbiAgICAvKipcclxuICAgICAgKiBIYW5kbGUgc3VibWl0IGZvcm1cclxuICAgICAgKi9cblxuXG4gICAgX2NyZWF0ZUNsYXNzKEV2ZW50RWRpdEZvcm0sIFt7XG4gICAgICAgIGtleTogJ2hhbmRsZVN1Ym1pdCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVTdWJtaXQoKSB7XG4gICAgICAgICAgICAvL2RlYnVnZ2VyO1xuICAgICAgICAgICAgdGhpcy5ldmVudC50ZXh0ID0gdGhpcy5ldmVudEZvcm0ucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKS5pbm5lckhUTUw7XG4gICAgICAgICAgICBpZiAodGhpcy5ldmVudC5pZCkge1xuICAgICAgICAgICAgICAgIGRiLnVwZGF0ZUV2ZW50KHRoaXMuZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYi5zYXZlRXZlbnRJbkRCKHRoaXMuZXZlbnQudGV4dCwgdGhpcy5ldmVudC5jZWxsSWQpO1xuICAgICAgICAgICAgICAgIC8vIGRiLmFkZEV2ZW50KHRoaXMuZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5ldmVudEZvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIGNhbC5yZW5kZXIoKTtcbiAgICAgICAgICAgIC8vINGB0L7QsdGA0LDRgtGMINC00LDQvdC90YvQtSDRgSDRhNC+0YDQvNGLXG4gICAgICAgICAgICAvLyDQvtGC0L/RgNCw0LLQuNGC0Ywg0LjRhVxuICAgICAgICAgICAgLy8gZGIuYWRkQ29tbWVudCgpXG4gICAgICAgICAgICAvLyDQvtGC0YfQuNGB0YLQuNGC0Ywg0YTQvtGA0LzRg1xuICAgICAgICAgICAgLy8g0L7QsdC90L7QstC70Y/RgtGMINGB0L/QuNGB0L7QuiDQutC+0LzQvNC10L3RgtCw0YDQuNC10LIg0LLRgNC+0LTQtSDQvdC1INC90YPQttC90L4sIGZpcmViYXNlINC+0LHQvdC+0LLQuNGCINC40YUg0YHQsNC80LBcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnaGFuZGxlRGVsZXRlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZURlbGV0ZSgpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRGb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBjYWwucmVuZGVyKCk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3Nob3dFdmVudENyZWF0ZUZvcm0nLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2hvd0V2ZW50Q3JlYXRlRm9ybShjZWxsSWQpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRGb3JtLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgdGhpcy5ldmVudCA9IHsgdGV4dDogJycsIGNlbGxJZDogY2VsbElkIH07XG4gICAgICAgICAgICB0aGlzLmV2ZW50Rm9ybS5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpLmlubmVySFRNTCA9IHRoaXMuZXZlbnQudGV4dDtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2hvd0V2ZW50RWRpdEZvcm0nLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2hvd0V2ZW50RWRpdEZvcm0oZXZlbnRJZCkge1xuICAgICAgICAgICAgdGhpcy5ldmVudEZvcm0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICB0aGlzLmV2ZW50ID0gZGIubG9hZEV2ZW50KGV2ZW50SWQpO1xuICAgICAgICAgICAgdGhpcy5ldmVudEZvcm0ucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKS5pbm5lckhUTUwgPSB0aGlzLmV2ZW50LnRleHQ7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlckV2ZW50RWRpdEZvcm0nLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyRXZlbnRFZGl0Rm9ybSgpIHtcbiAgICAgICAgICAgIC8vINC+0YLRgNC10L3QtNC10YDQuNGC0Ywg0YTQvtGA0LzRg1xuICAgICAgICAgICAgLy8g0L/QvtCy0LXRgdC40YLRjCDQvdCwINGE0L7RgNC80YMgaGFuZGxlU3VibWl0XG4gICAgICAgICAgICB0aGlzLmV2ZW50Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ0RJVicpO1xuICAgICAgICAgICAgdGhpcy5ldmVudEZvcm0uY2xhc3NOYW1lID0gJ2V2ZW50LWRldGFpbCBwYW5lbCBwYW5lbC1pbmZvIGV2ZW50LWZvcm0nO1xuICAgICAgICAgICAgdGhpcy5ldmVudEZvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHRoaXMuZXZlbnRGb3JtLmlubmVySFRNTCA9ICcgXFxcclxuICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+IFxcXHJcbiAgICAgIDxoMyBjbGFzcz1cInBhbmVsLXRpdGxlXCI+TXkgaW1wb3J0YW50IGV2ZW50PC9oMz4gXFxcclxuICAgIDwvZGl2PiBcXFxyXG4gICAgPGRpdiBjbGFzcz1cInBhbmVsLWJvZHlcIj4gXFxcclxuICAgICAgPGhlYWRlcj4gXFxcclxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXJhaXNlZCBidG4tZGFuZ2VyXCI+RGVsZXRlPC9idXR0b24+IFxcXHJcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1yYWlzZWQgYnRuLWluZm9cIj5TYXZlPC9idXR0b24+IFxcXHJcbiAgICAgIDwvaGVhZGVyPiBcXFxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY29udGVudFwiIGNvbnRlbnRlZGl0YWJsZT48L2Rpdj5cXFxyXG4gICAgPC9kaXY+JztcblxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuZXZlbnRGb3JtKTtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuZXZlbnRGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5idG4taW5mbycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuaGFuZGxlU3VibWl0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRGb3JtLnF1ZXJ5U2VsZWN0b3IoJy5idG4tZGFuZ2VyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5oYW5kbGVEZWxldGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIEV2ZW50RWRpdEZvcm07XG59KCk7XG5cbi8vZXhwb3J0IGRlZmF1bHQgQ29tbWVudEZvcm07XG4vKipcclxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGRhdGFiYXNlXHJcbiAqIEBjbGFzc1xyXG4gKi9cblxuXG52YXIgREIgPSBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSBkYXRhYmFzZSBvYmplY3RcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IEFQSSAtIEFQSSBmb3IgcmVxdWVzdHNcclxuICAgICAqL1xuICAgIGZ1bmN0aW9uIERCKHVzZXIpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIERCKTtcblxuICAgICAgICB0aGlzLmV2ZW50c1N0b3JhZ2VJdGVtID0gXCJNWUVWTlRfXCIgKyB1c2VyO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogTG9hZCBhbGwgZXZlbnRzXHJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cclxuICAgICAqL1xuXG5cbiAgICBfY3JlYXRlQ2xhc3MoREIsIFt7XG4gICAgICAgIGtleTogJ2xvYWRFdmVudHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbG9hZEV2ZW50cygpIHtcbiAgICAgICAgICAgIC8vZGVidWdnZXI7XG4gICAgICAgICAgICB2YXIganNvbiA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuZXZlbnRzU3RvcmFnZUl0ZW0pO1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKGpzb24gfHwgXCJbXVwiKTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTG9hZCBldmVudCBieSBJRFxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZCAtIElEIG9mIGV2ZW50XHJcbiAgICAgICAgICogQHJldHVybnMge1Byb21pc2V9XHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2xvYWRFdmVudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBsb2FkRXZlbnQoaWQpIHtcbiAgICAgICAgICAgIHZhciBhbGwgPSB0aGlzLmxvYWRFdmVudHMoKTtcbiAgICAgICAgICAgIHJldHVybiBhbGwuZmluZChmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwLmlkID09IGlkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2xvYWRFdmVudHNCeURhdGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbG9hZEV2ZW50c0J5RGF0ZShkYXRlKSB7XG4gICAgICAgICAgICAvL2RlYnVnZ2VyO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubG9hZEV2ZW50cygpLmZpbHRlcihmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwLmNlbGxJZCA9PT0gZGF0ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzYXZlQWxsJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNhdmVBbGwoZXZlbnRzKSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmV2ZW50c1N0b3JhZ2VJdGVtLCBKU09OLnN0cmluZ2lmeShldmVudHMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFkZCBuZXcgZXZlbnRcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gZXZlbnREYXRhIC0gdGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCBzdGF0dXMsIGNvbW1lbnRzLi4uXHJcbiAgICAgICAgICogQHJldHVybnMge1Byb21pc2V9XHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2FkZEV2ZW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGFkZEV2ZW50KGV2ZW50RGF0YSkge1xuICAgICAgICAgICAgdmFyIGFsbCA9IHRoaXMubG9hZEV2ZW50cygpIHx8IFtdO1xuICAgICAgICAgICAgZXZlbnREYXRhLmlkID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICBhbGwucHVzaChldmVudERhdGEpO1xuICAgICAgICAgICAgdGhpcy5zYXZlQWxsKGFsbCk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3NhdmVFdmVudEluREInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2F2ZUV2ZW50SW5EQih0YXNrVGl0bGUsIGRhdGVEYXkpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgICAgICB2YXIga2V5ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImtleVwiKTtcbiAgICAgICAgICAgIHZhciByZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigpO1xuICAgICAgICAgICAgdmFyIG9iaiA9IHZvaWQgMDtcbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpczIuY2hla1VzZXIoa2V5LCByZWYsIG9iaik7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF90aGlzMi5jcmVhdGVTdHJ1Y3R1cmUoa2V5LCByZWYsIG9iaik7XG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMyLmFkZERhdGEoa2V5LCByZWYsIG9iaiwgdGFza1RpdGxlLCBkYXRlRGF5KTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NoZWtVc2VyJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNoZWtVc2VyKGtleSwgcmVmLCBvYmopIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgcmVmLm9uKFwidmFsdWVcIiwgZnVuY3Rpb24gKHNuYXBzaG90KSB7XG4gICAgICAgICAgICAgICAgICAgIG9iaiA9IHNuYXBzaG90LnZhbCgpO1xuICAgICAgICAgICAgICAgICAgICBvYmogPSBvYmpbJycgKyBrZXldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW9iaiB8fCBvYmogPT0gbnVsbCkgcmV0dXJuIHJlamVjdCgpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY3JlYXRlU3RydWN0dXJlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZVN0cnVjdHVyZShrZXksIHJlZiwgb2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIG9iaiA9IHt9O1xuICAgICAgICAgICAgICAgIG9iaiA9IEpTT04uc3RyaW5naWZ5KG9iaik7XG4gICAgICAgICAgICAgICAgcmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoa2V5ICsgJy8nKTtcbiAgICAgICAgICAgICAgICByZWYuc2V0KG9iaik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdhZGREYXRhJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGFkZERhdGEoa2V5LCByZWYsIG9iaiwgdGFza1RpdGxlLCBkYXRlRGF5KSB7XG4gICAgICAgICAgICByZWYub24oXCJ2YWx1ZVwiLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcbiAgICAgICAgICAgICAgICBvYmogPSBzbmFwc2hvdC52YWwoKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IuY29kZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG9iaiA9IG9ialsnJyArIGtleV07XG4gICAgICAgICAgICBvYmogPSBKU09OLnBhcnNlKG9iaik7XG4gICAgICAgICAgICB2YXIgYXJyVGl0bGUgPSBvYmpbJycgKyBkYXRlRGF5XTtcbiAgICAgICAgICAgIGlmICghYXJyVGl0bGUpIHtcbiAgICAgICAgICAgICAgICBvYmpbJycgKyBkYXRlRGF5XSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFtdLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgZG9uZTogW11cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGFyclRpdGxlID0gb2JqWycnICsgZGF0ZURheV0udGl0bGU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFyclRpdGxlID0gb2JqWycnICsgZGF0ZURheV0udGl0bGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBsZXQgYXJyVGV4dCA9IG9ialtgJHtkYXRlRGF5fWBdLnRleHQ7XG4gICAgICAgICAgICBhcnJUaXRsZS5wdXNoKHRhc2tUaXRsZSk7XG4gICAgICAgICAgICAvL2FyclRleHQucHVzaCh0YXNrRGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgb2JqID0gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgICAgICAgICAgIHJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCcnICsga2V5KTtcbiAgICAgICAgICAgIHJlZi5zZXQob2JqKTtcbiAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2xvYWRFdmVudHNGcm9tREInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbG9hZEV2ZW50c0Zyb21EQigpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICAgICAgICB2YXIga2V5ID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShcImtleVwiKTtcbiAgICAgICAgICAgIHZhciByZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigpO1xuICAgICAgICAgICAgdmFyIG9iaiA9IHZvaWQgMDtcbiAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdGhpczMubG9hZERhdGFGb3JDYWxlbmVkYXJSZW5kYXIoa2V5LCByZWYsIG9iaik7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFsZXJ0KFwi0LfQsNCz0YDRg9C30LrQsFwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdsb2FkRGF0YUZvckNhbGVuZWRhclJlbmRhcicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBsb2FkRGF0YUZvckNhbGVuZWRhclJlbmRhcihrZXksIHJlZiwgb2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHJlZi5vbihcInZhbHVlXCIsIGZ1bmN0aW9uIChzbmFwc2hvdCkge1xuICAgICAgICAgICAgICAgICAgICBvYmogPSBzbmFwc2hvdC52YWwoKTtcbiAgICAgICAgICAgICAgICAgICAgb2JqID0gb2JqWycnICsga2V5XTtcbiAgICAgICAgICAgICAgICAgICAgb2JqID0gSlNPTi5wYXJzZShvYmopO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2FsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInRhYmxlXCIpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBkYXRlTG9hZCBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsb2FkRGF0YSA9IG9ialsnJyArIGRhdGVMb2FkXS50aXRsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXMgPSBjYWwucXVlcnlTZWxlY3RvcignIycgKyBkYXRlTG9hZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9hZERhdGEubGVuZ3RoIC0gMSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5pbm5lckhUTUwgKz0gJzxkaXY+JyArIGxvYWREYXRhICsgJzxidXR0b24gY2xhc3M9XCJjcm9zc1wiPlt4XTwvYnV0dG9uPjwvZGl2Pic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb2FkRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRiQXJyID0gbG9hZERhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuaW5uZXJIVE1MICs9ICc8ZGl2PicgKyBkYkFycltpXSArICc8YnV0dG9uIGNsYXNzPVwiY3Jvc3NcIj5beF08L2J1dHRvbj48L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZGVsZXRlRXZlbnRJbkRCJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRlbGV0ZUV2ZW50SW5EQihkYXRlRGF5LCB0ZXh0KSB7XG4gICAgICAgICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKGRhdGVEYXkgPT0gXCJcIikgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIGtleSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oXCJrZXlcIik7XG4gICAgICAgICAgICB2YXIgcmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoKTtcbiAgICAgICAgICAgIHZhciBvYmogPSB2b2lkIDA7XG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXM0LmRlbEV2ZW50RnJvbURCKGtleSwgcmVmLCBvYmosIGRhdGVEYXksIHRleHQpO1xuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhbGVydChcItGD0LTQsNC70LXQvdC40LVcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZGVsRXZlbnRGcm9tREInLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZGVsRXZlbnRGcm9tREIoa2V5LCByZWYsIG9iaiwgZGF0ZURheSwgdGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICByZWYub24oXCJ2YWx1ZVwiLCBmdW5jdGlvbiAoc25hcHNob3QpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqID0gc25hcHNob3QudmFsKCk7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IuY29kZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgb2JqID0gb2JqWycnICsga2V5XTtcbiAgICAgICAgICAgICAgICBvYmogPSBKU09OLnBhcnNlKG9iaik7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gb2JqWycnICsgZGF0ZURheV0udGl0bGUuaW5kZXhPZih0ZXh0KTtcbiAgICAgICAgICAgICAgICBvYmpbJycgKyBkYXRlRGF5XS50aXRsZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIG9ialsnJyArIGRhdGVEYXldLnRleHQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICAvLyBvYmpbYCR7ZGF0ZURheX1gXS5kb25lLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgb2JqID0gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgICAgICAgICAgICAgICByZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignJyArIGtleSk7XG4gICAgICAgICAgICAgICAgcmVmLnNldChvYmopO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG9iaik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICd1cGRhdGVFdmVudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiB1cGRhdGVFdmVudChldmVudCkge1xuICAgICAgICAgICAgdmFyIGFsbCA9IHRoaXMubG9hZEV2ZW50cygpO1xuICAgICAgICAgICAgdmFyIGZvdW5kID0gYWxsLmZpbmQoZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcC5pZCA9PSBldmVudC5pZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gYWxsLmluZGV4T2YoZm91bmQpO1xuICAgICAgICAgICAgICAgIGFsbC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIGFsbC5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNhdmVBbGwoYWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlbGV0ZSBldmVudCBieSBJRFxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBpZCAtIElEIG9mIGV2ZW50XHJcbiAgICAgICAgICogQHJldHVybnMge1Byb21pc2V9XHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2RlbGV0ZUV2ZW50JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRlbGV0ZUV2ZW50KGlkKSB7XG4gICAgICAgICAgICB2YXIgYWxsID0gdGhpcy5sb2FkRXZlbnRzKCk7XG4gICAgICAgICAgICB2YXIgZm91bmQgPSBhbGwuZmluZChmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwLmlkID09IGlkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZm91bmQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBhbGwuaW5kZXhPZihmb3VuZCk7XG4gICAgICAgICAgICAgICAgYWxsLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlQWxsKGFsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBZGQgbmV3IGNvbW1lbnRcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gY29tbWVudERhdGEgLSBjb21tZW50IGRhdGFcclxuICAgICAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cclxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnYWRkQ29tbWVudCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBhZGRDb21tZW50KGNvbW1lbnREYXRhKSB7fVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIExvYWQgYWxsIGV2ZW50J3MgY29tbWVudHNcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRJRFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxyXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdsb2FkQ29tbWVudHMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbG9hZENvbW1lbnRzKGV2ZW50SUQpIHt9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIERCO1xufSgpO1xuXG4vL2V4cG9ydCBkZWZhdWx0IERCO1xuLyoqXHJcbiogQ2xhc3MgcmVwcmVzZW50aW5nIGEgdXNlclxyXG4qIEBjbGFzc1xyXG4qL1xuXG5cbnZhciBVc2VyID0gZnVuY3Rpb24gKCkge1xuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgdXNlclxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBVc2VyKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVXNlcik7XG5cbiAgICAgICAgdGhpcy5pc1VzZXJMb2dpbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5hbWUgPSBcIlwiO1xuICAgIH1cblxuICAgIC8qKlxyXG4gICAgICogTG9naW4gdXNlclxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSBVc2VybmFtZVxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhc3N3b3JkIC0gVXNlciBwYXNzd29yZFxyXG4gICAgICogQHJldHVybnMge1Byb21pc2V9IFJldHVybnMgcHJvbWlzZVxyXG4gICAgICovXG5cblxuICAgIF9jcmVhdGVDbGFzcyhVc2VyLCBbe1xuICAgICAgICBrZXk6ICdsb2dpbicsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBsb2dpbihuYW1lLCBwYXNzd29yZCkge1xuICAgICAgICAgICAgdmFyIHVzZXJzID0gdGhpcy5sb2FkVXNlcnMoKTtcbiAgICAgICAgICAgIHZhciB1c2VyID0gdXNlcnMuZmluZChmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwLm5hbWUgPT09IG5hbWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICh1c2VyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1VzZXJMb2dpbiA9IHVzZXIucGFzc3dvcmQgPT09IHBhc3N3b3JkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB1c2VyID0geyBuYW1lOiBuYW1lLCBwYXNzd29yZDogcGFzc3dvcmQgfTtcbiAgICAgICAgICAgICAgICB1c2Vycy5wdXNoKHVzZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZVVzZXJzKHVzZXJzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmlzVXNlckxvZ2luID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmlzVXNlckxvZ2luKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lID0gdXNlci5uYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNVc2VyTG9naW47XG4gICAgICAgICAgICAvLyBpZiB0cnVlIC0gaXNVc2VyTG9naW4gPSB0cnVlXG4gICAgICAgICAgICAvLyBpZiBub3QgcmVnaXN0ZXJlZCAtIGNyZWF0ZSBuZXcgdXNlclxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTG9nb3V0IHVzZXJcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2xvZ291dCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBsb2dvdXQoKSB7XG4gICAgICAgICAgICB0aGlzLmlzVXNlckxvZ2luID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm5hbWUgPSBcIlwiO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdsb2FkVXNlcnMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbG9hZFVzZXJzKCkge1xuICAgICAgICAgICAgdmFyIGpzb24gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnTVlVU0VSUycpO1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKGpzb24gfHwgXCJbXVwiKTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzYXZlVXNlcnMnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2F2ZVVzZXJzKHVzZXJzKSB7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnTVlVU0VSUycsIEpTT04uc3RyaW5naWZ5KHVzZXJzKSk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gVXNlcjtcbn0oKTtcblxuLy9leHBvcnQgZGVmYXVsdCBVc2VyO1xuXG5cbnZhciBkYiA9IG5ldyBEQigpO1xuXG52YXIgY2FsZW5kYXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FsZW5kYXItY29udGFpbmVyJyk7XG52YXIgY2FsID0gbmV3IENhbGVuZGFyKGNhbGVuZGFyQ29udGFpbmVyKTtcblxudmFyIGV2RWRpdEZvcm0gPSBuZXcgRXZlbnRFZGl0Rm9ybShkb2N1bWVudC5ib2R5LCAnJyk7XG52YXIgdXNlciA9IG5ldyBVc2VyKCk7XG5cbnZhciBoZWFkZXIgPSBuZXcgSGVhZGVyKGRvY3VtZW50LmJvZHksICcnKTtcbnZhciBsb2dpbiA9IG5ldyBMb2dpbkZvcm0oZG9jdW1lbnQuYm9keSwgJycpO1xudmFyIGZvb3RlciA9IG5ldyBGb290ZXIoZG9jdW1lbnQuYm9keSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbVpoYTJWZk56VmpaR1kzWVdZdWFuTWlYU3dpYm1GdFpYTWlPbHNpUTJGc1pXNWtZWElpTENKbGJHVnRaVzUwSWl3aVkzVnljbVZ1ZEVSaGRHVWlMQ0pFWVhSbElpd2ljbVZ1WkdWeUlpd2lhR2xrWlNJc0luTmxkRTF2Ym5Sb0lpd2laMlYwVFc5dWRHZ2lMQ0pvWldGa1pYSkNiMlI1SWl3aVpHOWpkVzFsYm5RaUxDSmpjbVZoZEdWRmJHVnRaVzUwSWl3aWFXNXVaWEpJVkUxTUlpd2ljWFZsY25sVFpXeGxZM1J2Y2lJc0ltZGxkRVoxYkd4WlpXRnlJaXdpYzJWc1ppSXNJbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSWlMQ0puYjFCeVpYWk5iMjUwYUNJc0ltZHZUbVY0ZEUxdmJuUm9JaXdpWVhCd1pXNWtRMmhwYkdRaUxDSjBZV0pzWlNJc0ltTnNZWE56VG1GdFpTSXNJbmxsWVhJaUxDSnRiMjUwYUNJc0ltUWlMQ0pzWVhOMFJDSXNJblJoWW14bFVtOTNJaXdpYVc1elpYSjBVbTkzSWl3aWFTSXNJbWRsZEVSaGVTSXNJblJoWW14bFEyVnNiQ0lzSW1sdWMyVnlkRU5sYkd3aUxDSm5aWFJFWVhSbElpd2lhV1FpTENKblpYUlVhVzFsSWl3aVJYWmxiblJ6VEdsemRDSXNJbk5sZEVSaGRHVWlMQ0p6Wld4bFkzUkRaV3hzSWl3aVpYWmxiblFpTENKeVpXNWtaWEpEWVd4bGJtUmhja2hsWVdSbGNpSXNJbkpsYm1SbGNrTmhiR1Z1WkdGeUlpd2laR0lpTENKc2IyRmtSWFpsYm5SelJuSnZiVVJDSWl3aWMzUjViR1VpTENKa2FYTndiR0Y1SWl3aVpHRjBaU0lzSW5kbFpXdEVZWGtpTENKblpYUkZiR1Z0Wlc1MGMwSjVWR0ZuVG1GdFpTSXNJblJoY21kbGRDSXNJblJoWjA1aGJXVWlMQ0psZGtWa2FYUkdiM0p0SWl3aWMyaHZkMFYyWlc1MFEzSmxZWFJsUm05eWJTSXNJbU5zWVhOelRHbHpkQ0lzSW1OdmJuUmhhVzV6SWl3aWMyaHZkMFYyWlc1MFJXUnBkRVp2Y20waUxDSmtaV3hsZEdWRmRtVnVkQ0lzSW5CaGNtVnVkRTV2WkdVaUxDSmpZV3dpTENKRGIyMXRaVzUwSWl3aVkyOXRiV1Z1ZEVSaGRHRWlMQ0p5Wlc1a1pYSkRiMjF0Wlc1MElpd2lZMjl0YldWdWRDSXNJbU52Ym5SbGJuUkZaR2wwWVdKc1pTSXNJbkpsYm1SbGNrVjJaVzUwYzB4cGMzUWlMQ0psZG1WdWRITWlMQ0pzYjJGa1JYWmxiblJ6UW5sRVlYUmxJaXdpYkdWdVozUm9JaXdpWlhabGJuUnpUR2x6ZENJc0ltVjJaVzUwYzB4cGMzUkRiMjUwWVdsdVpYSWlMQ0ptYjNKRllXTm9JaXdpWld4bGJTSXNJa1YyWlc1MElpd2laWFpsYm5SRVlYUmhJaXdpY21WdVpHVnlSWFpsYm5RaUxDSjBaWGgwSWl3aVNHVmhaR1Z5SWl3aWRYTmxjaUlzSW5KbGJtUmxja2hsWVdSbGNpSXNJbWhsWVdSbGNpSXNJbWx1YzJWeWRFSmxabTl5WlNJc0ltTm9hV3hrVG05a1pYTWlMQ0p5WlhkeWFYUmxUMjVNYjJkdmRYUWlMQ0p5WlhObGRDSXNJa1p2YjNSbGNpSXNJbkpsYm1SbGNrWnZiM1JsY2lJc0ltWnZiM1JsY2lJc0lreHZaMmx1Um05eWJTSXNJbkpsYm1SbGNreHZaMmx1Um05eWJTSXNJbk5vYjNjaUxDSmxiV0ZwYkNJc0lteHZaMmx1Um05eWJTSXNJblpoYkhWbElpd2ljR0Z6Y3lJc0lsQnliMjFwYzJVaUxDSnlaWE52YkhabElpd2lkR2hsYmlJc0ltWnBjbVZpWVhObElpd2lZWFYwYUNJc0luTnBaMjVKYmxkcGRHaEZiV0ZwYkVGdVpGQmhjM04zYjNKa0lpd2lZMkYwWTJnaUxDSmpjbVZoZEdWVmMyVnlWMmwwYUVWdFlXbHNRVzVrVUdGemMzZHZjbVFpTENKamRYSnlaVzUwVlhObGNpSXNJblZwWkNJc0ltTmhiR1Z1WkdGeVEyOXVkR0ZwYm1WeUlpd2ljMlZ6YzJsdmJsTjBiM0poWjJVaUxDSnpaWFJKZEdWdElpd2lhR0Z1Wkd4bFYzSnZibWRRWVhOemQyOXlaQ0lzSW5Cc1lXTmxhRzlzWkdWeUlpd2ljSEpsZG1WdWRFUmxabUYxYkhRaUxDSm9ZVzVrYkdWVGRXSnRhWFFpTENKeVpYZHlhWFJsVDI1TWIyZHBiaUlzSWtWMlpXNTBSV1JwZEVadmNtMGlMQ0p5Wlc1a1pYSkZkbVZ1ZEVWa2FYUkdiM0p0SWl3aVpYWmxiblJHYjNKdElpd2lkWEJrWVhSbFJYWmxiblFpTENKellYWmxSWFpsYm5SSmJrUkNJaXdpWTJWc2JFbGtJaXdpWlhabGJuUkpaQ0lzSW14dllXUkZkbVZ1ZENJc0ltaGhibVJzWlVSbGJHVjBaU0lzSWtSQ0lpd2laWFpsYm5SelUzUnZjbUZuWlVsMFpXMGlMQ0pxYzI5dUlpd2liRzlqWVd4VGRHOXlZV2RsSWl3aVoyVjBTWFJsYlNJc0ltUmhkR0VpTENKS1UwOU9JaXdpY0dGeWMyVWlMQ0poYkd3aUxDSnNiMkZrUlhabGJuUnpJaXdpWm1sdVpDSXNJbkFpTENKbWFXeDBaWElpTENKemRISnBibWRwWm5raUxDSndkWE5vSWl3aWMyRjJaVUZzYkNJc0luUmhjMnRVYVhSc1pTSXNJbVJoZEdWRVlYa2lMQ0pyWlhraUxDSnlaV1lpTENKa1lYUmhZbUZ6WlNJc0ltOWlhaUlzSW1Ob1pXdFZjMlZ5SWl3aVkzSmxZWFJsVTNSeWRXTjBkWEpsSWl3aVlXUmtSR0YwWVNJc0ltTnZibk52YkdVaUxDSmxjbkp2Y2lJc0ltVnljaUlzSW5KbGFtVmpkQ0lzSW05dUlpd2ljMjVoY0hOb2IzUWlMQ0oyWVd3aUxDSnpaWFFpTENKc2IyY2lMQ0pqYjJSbElpd2lZWEp5VkdsMGJHVWlMQ0owYVhSc1pTSXNJbVJ2Ym1VaUxDSnNiMkZrUkdGMFlVWnZja05oYkdWdVpXUmhjbEpsYm1SaGNpSXNJbUZzWlhKMElpd2laR0YwWlV4dllXUWlMQ0pzYjJGa1JHRjBZU0lzSW5KbGN5SXNJbVJpUVhKeUlpd2laR1ZzUlhabGJuUkdjbTl0UkVJaUxDSnBibVJsZUNJc0ltbHVaR1Y0VDJZaUxDSnpjR3hwWTJVaUxDSm1iM1Z1WkNJc0ltVjJaVzUwU1VRaUxDSlZjMlZ5SWl3aWFYTlZjMlZ5VEc5bmFXNGlMQ0p1WVcxbElpd2ljR0Z6YzNkdmNtUWlMQ0oxYzJWeWN5SXNJbXh2WVdSVmMyVnljeUlzSW5OaGRtVlZjMlZ5Y3lJc0ltSnZaSGtpTENKc2IyZHBiaUpkTENKdFlYQndhVzVuY3lJNklqczdPenM3TzBGQlFVRTdRVUZEUVRzN096czdPenM3T3pzN096czdPenRCUVdkQ1FUdEJRVU5CTzBGQlEwRTdPenM3TzBsQlMwMUJMRkU3UVVGRFNqczdPenM3TzBGQlRVRXNjMEpCUVZsRExFOUJRVm9zUlVGQmNVSTdRVUZCUVRzN1FVRkRia0k3UVVGRFFTeGhRVUZMUVN4UFFVRk1MRWRCUVdWQkxFOUJRV1lzUTBGR2JVSXNRMEZGU3pzN1FVRkZlRUlzWVVGQlMwTXNWMEZCVEN4SFFVRnRRaXhKUVVGSlF5eEpRVUZLTEVWQlFXNUNPMEZCUTBFc1lVRkJTME1zVFVGQlREdEJRVU5CTEdGQlFVdERMRWxCUVV3N1FVRkRSRHM3UVVGRlJEczdPenM3T3p0elEwRkhZenRCUVVOaUxHbENRVUZMU0N4WFFVRk1MRU5CUVdsQ1NTeFJRVUZxUWl4RFFVRXdRaXhMUVVGTFNpeFhRVUZNTEVOQlFXbENTeXhSUVVGcVFpeExRVUU0UWl4RFFVRjRSRHRCUVVOQkxHbENRVUZMU0N4TlFVRk1PMEZCUTBNN1FVRkRRVHRCUVVORU96czdjME5CUldFN1FVRkRZaXhwUWtGQlMwWXNWMEZCVEN4RFFVRnBRa2tzVVVGQmFrSXNRMEZCTUVJc1MwRkJTMG9zVjBGQlRDeERRVUZwUWtzc1VVRkJha0lzUzBGQk9FSXNRMEZCZUVRN1FVRkRRU3hwUWtGQlMwZ3NUVUZCVER0QlFVTkRPMEZCUTBFN1FVRkRSRHM3UVVGRlJEczdPenM3T3l0RFFVZDFRanRCUVVOeVFpeG5Ra0ZCU1Vrc1lVRkJZVU1zVTBGQlUwTXNZVUZCVkN4RFFVRjFRaXhMUVVGMlFpeERRVUZxUWp0QlFVTkJSaXgxUWtGQlYwY3NVMEZCV0N4SFFVRjFRanM3T3pzN096czdaVUZCZGtJN08wRkJWVUZJTEhWQ1FVRlhTU3hoUVVGWUxFTkJRWGxDTEZGQlFYcENMRVZCUVcxRFJDeFRRVUZ1UXl4SFFVRXJReXhMUVVGTFZDeFhRVUZNTEVOQlFXbENTeXhSUVVGcVFpeEZRVUV2UXp0QlFVTkJReXgxUWtGQlYwa3NZVUZCV0N4RFFVRjVRaXhQUVVGNlFpeEZRVUZyUTBRc1UwRkJiRU1zUjBGQk9FTXNTMEZCUzFRc1YwRkJUQ3hEUVVGcFFsY3NWMEZCYWtJc1JVRkJPVU03UVVGRFFTeG5Ra0ZCU1VNc1QwRkJUeXhKUVVGWU8wRkJRMEZPTEhWQ1FVRlhTU3hoUVVGWUxFTkJRWGxDTEcxQ1FVRjZRaXhGUVVFNFEwY3NaMEpCUVRsRExFTkJRU3RFTEU5QlFTOUVMRVZCUVhkRkxGbEJRVmM3UVVGQlJVUXNjVUpCUVV0RkxGZEJRVXc3UVVGQmNVSXNZVUZCTVVjN1FVRkRRVklzZFVKQlFWZEpMR0ZCUVZnc1EwRkJlVUlzYlVKQlFYcENMRVZCUVRoRFJ5eG5Ra0ZCT1VNc1EwRkJLMFFzVDBGQkwwUXNSVUZCZDBVc1dVRkJWenRCUVVGRlJDeHhRa0ZCUzBjc1YwRkJURHRCUVVGeFFpeGhRVUV4Unp0QlFVTkJMR2xDUVVGTGFFSXNUMEZCVEN4RFFVRmhhVUlzVjBGQllpeERRVUY1UWxZc1ZVRkJla0k3TzBGQlJVRTdRVUZEUVR0QlFVTkVPenRCUVVWRU96czdPenM3ZVVOQlIybENPMEZCUTJZc1owSkJRVWxYTEZGQlFWRldMRk5CUVZORExHRkJRVlFzUTBGQmRVSXNUMEZCZGtJc1EwRkJXanRCUVVOQlV5eHJRa0ZCVFVNc1UwRkJUaXhIUVVGclFpeHJRa0ZCYkVJN1FVRkRRU3huUWtGQlNVTXNUMEZCVHl4TFFVRkxia0lzVjBGQlRDeERRVUZwUWxjc1YwRkJha0lzUlVGQldEdEJRVU5CTEdkQ1FVRkpVeXhSUVVGUkxFdEJRVXR3UWl4WFFVRk1MRU5CUVdsQ1N5eFJRVUZxUWl4RlFVRmFPenRCUVVkQkxHZENRVUZKWjBJc1NVRkJTU3hKUVVGSmNFSXNTVUZCU2l4RFFVRlRhMElzU1VGQlZDeEZRVUZsUXl4TFFVRm1MRVZCUVhOQ0xFTkJRWFJDTEVOQlFWSTdRVUZEUVN4blFrRkJTVVVzVVVGQlVTeEpRVUZKY2tJc1NVRkJTaXhEUVVGVGEwSXNTVUZCVkN4RlFVRmxReXhSUVVGUkxFTkJRWFpDTEVWQlFUQkNMRU5CUVRGQ0xFTkJRVm83UVVGRFFTeG5Ra0ZCU1Vjc1YwRkJWMDRzVFVGQlRVOHNVMEZCVGl4RlFVRm1PMEZCUTBFc2FVSkJRVXNzU1VGQlNVTXNTVUZCU1N4RFFVRmlMRVZCUVdkQ1FTeEpRVUZKTEV0QlFVdERMRTFCUVV3c1EwRkJXVXdzUTBGQldpeERRVUZ3UWl4RlFVRnZRMGtzUjBGQmNFTXNSVUZCZVVNN1FVRkRka01zYjBKQlFVbEZMRmxCUVZsS0xGTkJRVk5MTEZWQlFWUXNSVUZCYUVJN1FVRkRRVVFzTUVKQlFWVlVMRk5CUVZZc1IwRkJjMElzWTBGQmRFSTdRVUZEUkRzN1FVRkZSQ3h0UWtGQlQwY3NSVUZCUldoQ0xGRkJRVVlzVFVGQlowSmxMRXRCUVhaQ0xFVkJRVGhDTzBGQlF6VkNMRzlDUVVGSlR5eFpRVUZaU2l4VFFVRlRTeXhWUVVGVUxFVkJRV2hDTzBGQlEwRkVMREJDUVVGVmJFSXNVMEZCVml4SFFVRnpRbGtzUlVGQlJWRXNUMEZCUml4RlFVRjBRanRCUVVOQlJpd3dRa0ZCVlVjc1JVRkJWaXhIUVVGbFZDeEZRVUZGVlN4UFFVRkdMRVZCUVdZN1FVRkRRVW9zTUVKQlFWVlVMRk5CUVZZc1IwRkJjMElzWTBGQmRFSTdRVUZEUVN4dlFrRkJTV01zVlVGQlNpeERRVUZsVEN4VFFVRm1MRVZCUVRCQ1RpeERRVUV4UWpzN1FVRkhRU3h2UWtGQlNTeExRVUZMU3l4TlFVRk1MRU5CUVZsTUxFTkJRVm9zU1VGQmFVSXNRMEZCYWtJc1MwRkJkVUlzUTBGQk0wSXNSVUZCT0VJN1FVRkROVUpGTEN0Q1FVRlhUaXhOUVVGTlR5eFRRVUZPTEVWQlFWZzdRVUZEUkR0QlFVTkVTQ3hyUWtGQlJWa3NUMEZCUml4RFFVRlZXaXhGUVVGRlVTeFBRVUZHTEV0QlFXTXNRMEZCZUVJN1FVRkRSRHM3UVVGSFJDeG5Ra0ZCU1N4TFFVRkxTQ3hOUVVGTUxFTkJRVmxNTEVOQlFWb3NUVUZCYlVJc1EwRkJka0lzUlVGQk1FSTdRVUZEZUVJc2NVSkJRVXRKTEVsQlFVa3NTMEZCUzBNc1RVRkJUQ3hEUVVGWlNpeExRVUZhTEVOQlFWUXNSVUZCTmtKSExFbEJRVWtzUTBGQmFrTXNSVUZCYjBOQkxFZEJRWEJETEVWQlFYbERPMEZCUTNaRExIZENRVUZKUlN4WlFVRlpTaXhUUVVGVFN5eFZRVUZVTEVWQlFXaENPMEZCUTBGRUxEaENRVUZWVkN4VFFVRldMRWRCUVhOQ0xHTkJRWFJDTzBGQlEwUTdRVUZEUmpzN1FVRkZSQ3hwUWtGQlMyNUNMRTlCUVV3c1EwRkJZV2xDTEZkQlFXSXNRMEZCZVVKRExFdEJRWHBDT3p0QlFVVkJMR2RDUVVGSlRDeFBRVUZQTEVsQlFWZzdRVUZEUVVzc2EwSkJRVTFLTEdkQ1FVRk9MRU5CUVhWQ0xFOUJRWFpDTEVWQlFXZERMRmxCUVZjN1FVRkJSVVFzY1VKQlFVdHpRaXhWUVVGTUxFTkJRV2RDUXl4TFFVRm9RanRCUVVGNVFpeGhRVUYwUlRzN1FVRkZRVHRCUVVORU96dEJRVVZFT3pzN096czdhVU5CUjFNN1FVRkRVQ3hwUWtGQlMzQkRMRTlCUVV3c1EwRkJZVlVzVTBGQllpeEhRVUY1UWl4RlFVRjZRanRCUVVOQkxHbENRVUZMTWtJc2IwSkJRVXc3UVVGRFFTeHBRa0ZCUzBNc1kwRkJURHRCUVVOQlF5eGxRVUZIUXl4blFrRkJTRHRCUVVORU96czdLMEpCUlUwN1FVRkRUQ3hwUWtGQlMzaERMRTlCUVV3c1EwRkJZWGxETEV0QlFXSXNRMEZCYlVKRExFOUJRVzVDTEVkQlFUWkNMRTlCUVRkQ08wRkJRMFE3T3pzclFrRkZUVHRCUVVOTUxHbENRVUZMTVVNc1QwRkJUQ3hEUVVGaGVVTXNTMEZCWWl4RFFVRnRRa01zVDBGQmJrSXNSMEZCTmtJc1RVRkJOMEk3UVVGRFJEczdPeXRDUVVWTlF5eEpMRVZCUVUwN1FVRkJSVHRCUVVOaUxHZENRVUZKUXl4VlFVRlZSQ3hMUVVGTGFFSXNUVUZCVEN4RlFVRmtPMEZCUTBFc1owSkJRVWxwUWl4WlFVRlpMRU5CUVdoQ0xFVkJRVzFDUVN4VlFVRlZMRU5CUVZZN1FVRkRia0lzYlVKQlFVOUJMRlZCUVZVc1EwRkJha0k3UVVGRFJEczdPMjFEUVVWVlVpeExMRVZCUVU4N1FVRkRhRUlzWjBKQlFVbHNRaXhSUVVGUlZpeFRRVUZUY1VNc2IwSkJRVlFzUTBGQk9FSXNUMEZCT1VJc1EwRkJXanRCUVVOQkxHZENRVUZKUXl4VFFVRlRWaXhOUVVGTlZTeE5RVUZ1UWpzN1FVRkZRU3h0UWtGQlQwRXNWMEZCVnpWQ0xFdEJRVmdzU1VGQmIwSTBRaXhQUVVGUGNFTXNVMEZCVUN4TFFVRnZRaXhGUVVFdlF5eEZRVUZ0UkR0QlFVTnFSQ3h2UWtGQlNXOURMRTlCUVU5RExFOUJRVkFzU1VGQmEwSXNTVUZCZEVJc1JVRkJORUk3UVVGRE1VSkRMQ3RDUVVGWFF5eHRRa0ZCV0N4RFFVRXJRa2dzVDBGQlQyWXNSVUZCZEVNN1FVRkRRVHRCUVVORU96dEJRVVZFTEc5Q1FVRkpaU3hQUVVGUFNTeFRRVUZRTEVOQlFXbENReXhSUVVGcVFpeERRVUV3UWl4UFFVRXhRaXhEUVVGS0xFVkJRWGRETzBGQlEzUkRTQ3dyUWtGQlYwa3NhVUpCUVZnc1EwRkJOa0pPTEU5QlFVOW1MRVZCUVhCRE8wRkJRMEU3UVVGRFJEczdRVUZGUVN4dlFrRkJTV1VzVDBGQlQwTXNUMEZCVUN4SlFVRnJRaXhSUVVGMFFpeEZRVUZuUXp0QlFVTXZRbElzZFVKQlFVZGpMRmRCUVVnc1EwRkJaVkFzVDBGQlQxRXNWVUZCVUN4RFFVRnJRblpDTEVWQlFXcERPMEZCUTBGM1FpeDNRa0ZCU1hCRUxFMUJRVW83UVVGRFFUdEJRVU5FT3p0QlFVbEVNa01zZVVKQlFWTkJMRTlCUVU5UkxGVkJRV2hDTzBGQlEwUTdRVUZEUmpzN096czdPMEZCU1VnN1FVRkRRVHM3T3pzN08wbEJTVTFGTEU4N1FVRkRTanM3T3pzN08wRkJUVUVzY1VKQlFWbDRSQ3hQUVVGYUxFVkJRWEZDZVVRc1YwRkJja0lzUlVGQmEwTTdRVUZCUVRzN1FVRkRhRU1zWVVGQlMzcEVMRTlCUVV3c1IwRkJaVUVzVDBGQlppeERRVVJuUXl4RFFVTlNPMEZCUTNoQ0xHRkJRVXQ1UkN4WFFVRk1MRWRCUVcxQ1FTeFhRVUZ1UWp0QlFVTkJMR0ZCUVV0RExHRkJRVXc3UVVGRFJEczdRVUZGUkRzN096czdPenQzUTBGSFowSTdRVUZEWml4blFrRkJTVU1zVlVGQlZXNUVMRk5CUVZORExHRkJRVlFzUTBGQmRVSXNTMEZCZGtJc1EwRkJaRHRCUVVOQmEwUXNiMEpCUVZGcVJDeFRRVUZTTEVkQlFXOUNPenM3T3pzN08xRkJRWEJDTzBGQlVVRnBSQ3h2UWtGQlVVTXNaVUZCVWl4SFFVRXdRaXhOUVVFeFFqdEJRVU5CTEdsQ1FVRkxOVVFzVDBGQlRDeERRVUZoYVVJc1YwRkJZaXhEUVVGNVFqQkRMRTlCUVhwQ08wRkJSVUU3T3pzN096dEJRVWRJTzBGQlEwRTdPenM3T3p0SlFVbE5NVUlzVlR0QlFVTktPenM3T3pzN1FVRk5RU3gzUWtGQldXcERMRTlCUVZvc1JVRkJjVUk3UVVGQlFUczdRVUZEYmtJc1lVRkJTMEVzVDBGQlRDeEhRVUZsUVN4UFFVRm1PMEZCUTBFN1FVRkRRU3hoUVVGTE5rUXNaMEpCUVV3N1FVRkRSRHM3UVVGRlJEczdPenM3T3pzeVEwRkhiVUk3UVVGRGFrSXNaMEpCUVVsRExGTkJRVk4yUWl4SFFVRkhkMElzWjBKQlFVZ3NRMEZCYjBJc1MwRkJTeTlFTEU5QlFVd3NRMEZCWVN0Q0xFVkJRV3BETEVOQlFXSTdRVUZEUVN4blFrRkJTU3hEUVVGREswSXNUVUZCUkN4SlFVRlhMRU5CUVVOQkxFOUJRVTlGTEUxQlFYWkNMRVZCUVN0Q096dEJRVVV2UWl4blFrRkJTVU1zWVVGQllYcEVMRk5CUVZORExHRkJRVlFzUTBGQmRVSXNTMEZCZGtJc1EwRkJha0k3UVVGRFFYZEVMSFZDUVVGWE9VTXNVMEZCV0N4SFFVRjFRaXhSUVVGMlFqdEJRVU5CT0VNc2RVSkJRVmQyUkN4VFFVRllMRWRCUVhOQ096czdPenM3TzFkQlFYUkNPMEZCVVVFc1owSkJRVWwzUkN4elFrRkJjMEpFTEZkQlFWZDBSQ3hoUVVGWUxFTkJRWGxDTEdGQlFYcENMRU5CUVRGQ08wRkJRMEU3T3p0QlFVZEJiVVFzYlVKQlFVOUxMRTlCUVZBc1EwRkJaU3hWUVVGVFF5eEpRVUZVTEVWQlFXVTdRVUZETlVJc2IwSkJRVWxETEV0QlFVb3NRMEZCVlVnc2JVSkJRVllzUlVGQkswSkZMRWxCUVM5Q08wRkJRMFFzWVVGR1JEczdRVUZKUVN4cFFrRkJTM0JGTEU5QlFVd3NRMEZCWVdsQ0xGZEJRV0lzUTBGQmVVSm5SQ3hWUVVGNlFqdEJRVU5KTzBGQlEwbzdRVUZEUkRzN096czdPMEZCUjBnN1FVRkRRVHM3T3pzN08wbEJTVTFKTEVzN1FVRkRTanM3T3pzN08wRkJUVUVzYlVKQlFWbHlSU3hQUVVGYUxFVkJRWEZDYzBVc1UwRkJja0lzUlVGQlowTXZRaXhGUVVGb1F5eEZRVUZ2UXp0QlFVRkJPenRCUVVOc1F5eGhRVUZMZGtNc1QwRkJUQ3hIUVVGbFFTeFBRVUZtTzBGQlEwRXNZVUZCUzNORkxGTkJRVXdzUjBGQmFVSkJMRk5CUVdwQ08wRkJRMEVzWVVGQlMwTXNWMEZCVER0QlFVTkVPenRCUVVWRU96czdPenM3TzNORFFVZGpMRU5CUjJJN1FVRkdRenRCUVVOQk96czdRVUZIUmpzN096czdPM05EUVVkak8wRkJRMW83UVVGRFFUdEJRVU5CTEdkQ1FVRkpia01zVVVGQlVUVkNMRk5CUVZORExHRkJRVlFzUTBGQmRVSXNTMEZCZGtJc1EwRkJXanM3UVVGRlFUSkNMR3RDUVVGTmFrSXNVMEZCVGl4SFFVRnJRaXcyUTBGQmJFSTdPMEZCUlVGcFFpeHJRa0ZCVFRGQ0xGTkJRVTRzUjBGQmFVSTdPM0ZEUVVGcVFqczdRVUZKUVRCQ0xHdENRVUZOZWtJc1lVRkJUaXhEUVVGdlFpeGhRVUZ3UWl4RlFVRnRRMFFzVTBGQmJrTXNSMEZCSzBNc1MwRkJTelJFTEZOQlFVd3NRMEZCWlVVc1NVRkJPVVE3UVVGRFFYQkRMR3RDUVVGTlRDeEZRVUZPTEVkQlFWY3NTMEZCUzNWRExGTkJRVXdzUTBGQlpYWkRMRVZCUVRGQ096dEJRVVZCTEdsQ1FVRkxMMElzVDBGQlRDeERRVUZoYVVJc1YwRkJZaXhEUVVGNVFtMUNMRXRCUVhwQ08wRkJSVVE3T3pzN096dEJRVWRJTzBGQlEwRTdPenM3TzBsQlMwMXhReXhOTzBGQlEwbzdPenM3TzBGQlMwRXNiMEpCUVZsNlJTeFBRVUZhTEVWQlFYRkNNRVVzU1VGQmNrSXNSVUZCTWtJN1FVRkJRVHM3UVVGRGVrSXNZVUZCU3pGRkxFOUJRVXdzUjBGQlpVRXNUMEZCWmp0QlFVTkJMR0ZCUVVzd1JTeEpRVUZNTEVkQlFWbEJMRWxCUVZvN1FVRkRRU3hoUVVGTFF5eFpRVUZNTzBGQlEwWTdRVUZEUXpzN1FVRkZSRHM3T3pzN096dDFRMEZIWlRzN1FVRkZZanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN08wRkJSVUVzYVVKQlFVdERMRTFCUVV3c1IwRkJZM0JGTEZOQlFWTkRMR0ZCUVZRc1EwRkJkVUlzUzBGQmRrSXNRMEZCWkR0QlFVTkJMR2xDUVVGTGJVVXNUVUZCVEN4RFFVRlpla1FzVTBGQldpeEhRVUYzUWl4MVFrRkJlRUk3UVVGRFFTeHBRa0ZCUzNsRUxFMUJRVXdzUTBGQldXeEZMRk5CUVZvc1IwRkJkMEk3T3pzN096czdPenM3T3pzN096czdPenM3WVVGQmVFSTdPMEZCY1VKQkxHbENRVUZMVml4UFFVRk1MRU5CUVdFMlJTeFpRVUZpTEVOQlFUQkNMRXRCUVV0RUxFMUJRUzlDTEVWQlFYVkRMRXRCUVVzMVJTeFBRVUZNTEVOQlFXRTRSU3hWUVVGaUxFTkJRWGRDTEVOQlFYaENMRU5CUVhaRE8wRkJRMEVzYVVKQlFVczVSU3hQUVVGTUxFTkJRV0ZYTEdGQlFXSXNRMEZCTWtJc2FVSkJRVE5DTEVWQlFUaERPRUlzUzBGQk9VTXNRMEZCYjBSRExFOUJRWEJFTEVkQlFUaEVMRTFCUVRsRU96dEJRVVZCTEdkQ1FVRkpOMElzVDBGQlR5eEpRVUZZTzBGQlEwRXNhVUpCUVV0aUxFOUJRVXdzUTBGQllWY3NZVUZCWWl4RFFVRXlRaXh0UWtGQk0wSXNSVUZCWjBSSExHZENRVUZvUkN4RFFVRnBSU3hQUVVGcVJTeEZRVUV3UlN4WlFVRlhPMEZCUVVWRUxIRkNRVUZMYTBVc1pVRkJURHRCUVVGNVFpeGhRVUZvU0R0QlFVTkVPenM3ZVVOQlJXZENPMEZCUTJZN1FVRkRRU3hwUWtGQlN5OUZMRTlCUVV3c1EwRkJZVmNzWVVGQllpeERRVUV5UWl4cFFrRkJNMElzUlVGQk9FTTRRaXhMUVVFNVF5eERRVUZ2UkVNc1QwRkJjRVFzUjBGQk9FUXNUMEZCT1VRN1FVRkZSRHM3T3pCRFFVVnBRanRCUVVOb1FqdEJRVU5CTzBGQlEwRXNhVUpCUVVzeFF5eFBRVUZNTEVOQlFXRlhMR0ZCUVdJc1EwRkJNa0lzYVVKQlFUTkNMRVZCUVRoRE9FSXNTMEZCT1VNc1EwRkJiMFJETEU5QlFYQkVMRWRCUVRoRUxFMUJRVGxFTzBGQlEwRnNReXh4UWtGQlUwY3NZVUZCVkN4RFFVRjFRaXhSUVVGMlFpeEZRVUZwUXpoQ0xFdEJRV3BETEVOQlFYVkRReXhQUVVGMlF5eEhRVUZwUkN4UFFVRnFSRHRCUVVOQllTeG5Ra0ZCU1c1RUxFbEJRVW83UVVGRFFVa3NjVUpCUVZOSExHRkJRVlFzUTBGQmRVSXNZMEZCZGtJc1JVRkJkVU54UlN4TFFVRjJRenRCUVVORU96czdPenM3UVVGTFNEdEJRVU5CT3pzN096dEpRVXROUXl4Tk8wRkJRMG83T3pzN1FVRkpRU3h2UWtGQldXcEdMRTlCUVZvc1JVRkJjVUl3UlN4SlFVRnlRaXhGUVVFeVFqdEJRVUZCT3p0QlFVTjZRaXhoUVVGTE1VVXNUMEZCVEN4SFFVRmxRU3hQUVVGbU8wRkJRMEVzWVVGQlMydEdMRmxCUVV3N1FVRkRSRHM3UVVGRlJEczdPenM3T3p0MVEwRkhaVHRCUVVOaUxHbENRVUZMUXl4TlFVRk1MRWRCUVdNelJTeFRRVUZUUXl4aFFVRlVMRU5CUVhWQ0xGRkJRWFpDTEVOQlFXUTdRVUZEUVN4cFFrRkJTekJGTEUxQlFVd3NRMEZCV1hwRkxGTkJRVm9zUjBGQmQwSXNjVVpCUVhoQ08wRkJRMEVzYVVKQlFVdFdMRTlCUVV3c1EwRkJZV2xDTEZkQlFXSXNRMEZCZVVJc1MwRkJTMnRGTEUxQlFUbENPMEZCUTBRN096czdPMEZCUlVnN096czdPenRKUVVsTlF5eFRPenRCUVVWR096czdPMEZCU1VFc2RVSkJRVmx3Uml4UFFVRmFMRVZCUVhGQ2RVTXNSVUZCY2tJc1JVRkJlVUk3UVVGQlFUczdRVUZEY2tJc1lVRkJTM1pETEU5QlFVd3NSMEZCWlVFc1QwRkJaanRCUVVOQkxHRkJRVXQxUXl4RlFVRk1MRWRCUVZWQkxFVkJRVlk3UVVGRFFTeGhRVUZMT0VNc1pVRkJURHRCUVVOQkxHRkJRVXRETEVsQlFVdzdRVUZEU0RzN1FVRkZSRHM3T3pzN096dDFRMEZIWlR0QlFVRkJPenRCUVVOWUxHZENRVUZKUXl4UlFVRlJMRXRCUVV0RExGTkJRVXdzUTBGQlpUZEZMR0ZCUVdZc1EwRkJOa0lzZDBKQlFUZENMRVZCUVhWRU9FVXNTMEZCYmtVN1FVRkRRU3huUWtGQlNVTXNUMEZCVHl4TFFVRkxSaXhUUVVGTUxFTkJRV1UzUlN4aFFVRm1MRU5CUVRaQ0xIZENRVUUzUWl4RlFVRjFSRGhGTEV0QlFXeEZPenRCUVVWQlJTeHZRa0ZCVVVNc1QwRkJVaXhIUVVOTFF5eEpRVVJNTEVOQlExVTdRVUZCUVN4MVFrRkJUVU1zVTBGQlUwTXNTVUZCVkN4SFFVRm5Ra01zTUVKQlFXaENMRU5CUVRKRFZDeExRVUV6UXl4RlFVRnJSRWNzU1VGQmJFUXNRMEZCVGp0QlFVRkJMR0ZCUkZZc1JVRkZTMDhzUzBGR1RDeERRVVZYTzBGQlFVRXNkVUpCUVUxSUxGTkJRVk5ETEVsQlFWUXNSMEZCWjBKSExEaENRVUZvUWl4RFFVRXJRMWdzUzBGQkwwTXNSVUZCYzBSSExFbEJRWFJFTEVOQlFVNDdRVUZCUVN4aFFVWllMRVZCUjB0SExFbEJTRXdzUTBGSFZTeFpRVUZOTzBGQlExSXNiMEpCUVVsdVFpeFBRVUZQYjBJc1UwRkJVME1zU1VGQlZDeEhRVUZuUWtrc1YwRkJNMEk3UVVGRFFTeHZRa0ZCU1VNc1dVRkJTanRCUVVOQlFTeHpRa0ZCVFRGQ0xFdEJRVXN3UWl4SFFVRllPMEZCUTBFc2IwSkJRVWxETEc5Q1FVRnZRamRHTEZOQlFWTkhMR0ZCUVZRc1EwRkJkVUlzY1VKQlFYWkNMRU5CUVhoQ08wRkJRMEVzYjBKQlFVazBReXhOUVVGTkxFbEJRVWw0UkN4UlFVRktMRU5CUVdGelJ5eHBRa0ZCWWl4RFFVRldPMEZCUTBFNVF5eHZRa0ZCU1N0Q0xFbEJRVW83UVVGRFFTeHpRa0ZCUzJ4R0xFbEJRVXc3UVVGRFFUdEJRVU5CYTBjc0swSkJRV1ZETEU5QlFXWXNRMEZCZFVJc1lVRkJka0lzUlVGQmMwTm9RaXhMUVVGMFF6dEJRVU5CWlN3clFrRkJaVU1zVDBGQlppeERRVUYxUWl4TFFVRjJRaXhGUVVFNFFrZ3NSMEZCT1VJN1FVRkRRVHRCUVVOSUxHRkJaa3dzUlVGblFrdElMRXRCYUVKTUxFTkJaMEpYTEZsQlFVMDdRVUZEVkN4elFrRkJTMDhzYlVKQlFVdzdRVUZEUVdoSExIbENRVUZUUnl4aFFVRlVMRU5CUVhWQ0xHTkJRWFpDTEVWQlFYVkRjVVVzUzBGQmRrTTdRVUZEU0N4aFFXNUNURHM3UVVGelFrRTdRVUZEUVRzN08wRkJSMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVVklPenM3T0VOQlJYRkNPMEZCUTJ4Q0xHbENRVUZMYUVZc1QwRkJUQ3hEUVVGaFZ5eGhRVUZpTEVOQlFUSkNMSGRDUVVFelFpeEZRVUZ4UkRoR0xGZEJRWEpFTEVkQlFXMUZMREpDUVVGdVJUdEJRVU5CTEdsQ1FVRkxla2NzVDBGQlRDeERRVUZoVnl4aFFVRmlMRU5CUVRKQ0xIZENRVUV6UWl4RlFVRnhSRkVzVTBGQmNrUXNSMEZCYVVVc2EwTkJRV3BGTzBGQlEwZzdPenRuUkVGRmRVSTdRVUZEY0VJc2FVSkJRVXR1UWl4UFFVRk1MRU5CUVdGWExHRkJRV0lzUTBGQk1rSXNkMEpCUVROQ0xFVkJRWEZFT0VZc1YwRkJja1FzUjBGQmJVVXNWVUZCYmtVN1FVRkRRU3hwUWtGQlMzcEhMRTlCUVV3c1EwRkJZVmNzWVVGQllpeERRVUV5UWl4M1FrRkJNMElzUlVGQmNVUlJMRk5CUVhKRUxFZEJRV2xGTEhWQ1FVRnFSVHRCUVVOSU96czdNRU5CUldsQ08wRkJRMlE3UVVGRFFUdEJRVU5CTEdsQ1FVRkxjVVVzVTBGQlRDeEhRVUZwUW1oR0xGTkJRVk5ETEdGQlFWUXNRMEZCZFVJc1MwRkJka0lzUTBGQmFrSTdRVUZEUVN4cFFrRkJTeXRGTEZOQlFVd3NRMEZCWlhKRkxGTkJRV1lzUjBGQk1rSXNhVUpCUVROQ08wRkJRMEVzYVVKQlFVdHhSU3hUUVVGTUxFTkJRV1U1UlN4VFFVRm1MRWRCUVRKQ096czdPenRaUVVFelFqdEJRVTFCTEdsQ1FVRkxWaXhQUVVGTUxFTkJRV0ZwUWl4WFFVRmlMRU5CUVhsQ0xFdEJRVXQxUlN4VFFVRTVRanRCUVVOQkxHZENRVUZKTTBVc1QwRkJUeXhKUVVGWU8wRkJRMEVzYVVKQlFVdGlMRTlCUVV3c1EwRkJZVmNzWVVGQllpeERRVUV5UWl4bFFVRXpRaXhGUVVFMFEwY3NaMEpCUVRWRExFTkJRVFpFTEU5QlFUZEVMRVZCUVhORkxGVkJRVlZ6UWl4TFFVRldMRVZCUVdsQ08wRkJRMjVHUVN4elFrRkJUWE5GTEdOQlFVNDdRVUZEUVRkR0xIRkNRVUZMT0VZc1dVRkJURHRCUVVOSUxHRkJTRVE3UVVGSlNEczdPeXRDUVVWTk8wRkJRMGdzYVVKQlFVdHVRaXhUUVVGTUxFTkJRV1V2UXl4TFFVRm1MRU5CUVhGQ1F5eFBRVUZ5UWl4SFFVRXJRaXhQUVVFdlFqdEJRVU5CYTBNc2JVSkJRVTlITEdWQlFWQTdRVUZEU0RzN095dENRVVZOTzBGQlEwZ3NhVUpCUVV0VExGTkJRVXdzUTBGQlpTOURMRXRCUVdZc1EwRkJjVUpETEU5QlFYSkNMRWRCUVN0Q0xFMUJRUzlDTzBGQlEwRnJReXh0UWtGQlQyZERMR05CUVZBN1FVRkZTRHM3T3pzN08wRkJSMHc3UVVGRFFUczdPenM3TzBsQlNVMURMR0U3TzBGQlJVbzdPenM3UVVGSlFTd3lRa0ZCV1RkSExFOUJRVm9zUlVGQmNVSjFReXhGUVVGeVFpeEZRVUY1UWp0QlFVRkJPenRCUVVOMlFpeGhRVUZMZGtNc1QwRkJUQ3hIUVVGbFFTeFBRVUZtTzBGQlEwRXNZVUZCUzNWRExFVkJRVXdzUjBGQlZVRXNSVUZCVmp0QlFVTkJPMEZCUTBFc1lVRkJTM1ZGTEcxQ1FVRk1PMEZCUTBRN08wRkJSVVE3T3pzN096czdkVU5CUjJVN1FVRkRZanRCUVVOQkxHbENRVUZMTVVVc1MwRkJUQ3hEUVVGWGIwTXNTVUZCV0N4SFFVRnJRaXhMUVVGTGRVTXNVMEZCVEN4RFFVRmxjRWNzWVVGQlppeERRVUUyUWl4VlFVRTNRaXhGUVVGNVEwUXNVMEZCTTBRN1FVRkRRU3huUWtGQlNTeExRVUZMTUVJc1MwRkJUQ3hEUVVGWFRDeEZRVUZtTEVWQlFXMUNPMEZCUTJwQ1VTeHRRa0ZCUjNsRkxGZEJRVWdzUTBGQlpTeExRVUZMTlVVc1MwRkJjRUk3UVVGRFJDeGhRVVpFTEUxQlJVODdRVUZEVEVjc2JVSkJRVWN3UlN4aFFVRklMRU5CUVdsQ0xFdEJRVXMzUlN4TFFVRk1MRU5CUVZkdlF5eEpRVUUxUWl4RlFVRnJReXhMUVVGTGNFTXNTMEZCVEN4RFFVRlhPRVVzVFVGQk4wTTdRVUZEUVR0QlFVTkVPMEZCUTBRc2FVSkJRVXRJTEZOQlFVd3NRMEZCWlhSRkxFdEJRV1lzUTBGQmNVSkRMRTlCUVhKQ0xFZEJRU3RDTEUxQlFTOUNPMEZCUTBGaExHZENRVUZKY0VRc1RVRkJTanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUkRzN08zVkRRVVZqTzBGQlEySXNhVUpCUVVzMFJ5eFRRVUZNTEVOQlFXVjBSU3hMUVVGbUxFTkJRWEZDUXl4UFFVRnlRaXhIUVVFclFpeE5RVUV2UWp0QlFVTkJZU3huUWtGQlNYQkVMRTFCUVVvN1FVRkRSRHM3T3pSRFFVVnRRaXRITEUwc1JVRkJVVHRCUVVNeFFpeHBRa0ZCUzBnc1UwRkJUQ3hEUVVGbGRFVXNTMEZCWml4RFFVRnhRa01zVDBGQmNrSXNSMEZCSzBJc1QwRkJMMEk3UVVGRFFTeHBRa0ZCUzA0c1MwRkJUQ3hIUVVGaExFVkJRVVZ2UXl4TlFVRk5MRVZCUVZJc1JVRkJXVEJETEZGQlFWRkJMRTFCUVhCQ0xFVkJRV0k3UVVGRFFTeHBRa0ZCUzBnc1UwRkJUQ3hEUVVGbGNFY3NZVUZCWml4RFFVRTJRaXhWUVVFM1FpeEZRVUY1UTBRc1UwRkJla01zUjBGQmNVUXNTMEZCU3pCQ0xFdEJRVXdzUTBGQlYyOURMRWxCUVdoRk8wRkJRMFE3T3pzd1EwRkhhVUl5UXl4UExFVkJRVk03UVVGRGVrSXNhVUpCUVV0S0xGTkJRVXdzUTBGQlpYUkZMRXRCUVdZc1EwRkJjVUpETEU5QlFYSkNMRWRCUVN0Q0xFOUJRUzlDTzBGQlEwRXNhVUpCUVV0T0xFdEJRVXdzUjBGQllVY3NSMEZCUnpaRkxGTkJRVWdzUTBGQllVUXNUMEZCWWl4RFFVRmlPMEZCUTBFc2FVSkJRVXRLTEZOQlFVd3NRMEZCWlhCSExHRkJRV1lzUTBGQk5rSXNWVUZCTjBJc1JVRkJlVU5FTEZOQlFYcERMRWRCUVhGRUxFdEJRVXN3UWl4TFFVRk1MRU5CUVZkdlF5eEpRVUZvUlR0QlFVTkVPenM3T0VOQlJYRkNPMEZCUTNCQ08wRkJRMEU3UVVGRFFTeHBRa0ZCUzNWRExGTkJRVXdzUjBGQmFVSjJSeXhUUVVGVFF5eGhRVUZVTEVOQlFYVkNMRXRCUVhaQ0xFTkJRV3BDTzBGQlEwRXNhVUpCUVV0elJ5eFRRVUZNTEVOQlFXVTFSaXhUUVVGbUxFZEJRVEpDTERCRFFVRXpRanRCUVVOQkxHbENRVUZMTkVZc1UwRkJUQ3hEUVVGbGRFVXNTMEZCWml4RFFVRnhRa01zVDBGQmNrSXNSMEZCSzBJc1RVRkJMMEk3UVVGRFFTeHBRa0ZCUzNGRkxGTkJRVXdzUTBGQlpYSkhMRk5CUVdZc1IwRkJNRUk3T3pzN096czdPenM3VjBGQk1VSTdPMEZCV1VFc2FVSkJRVXRXTEU5QlFVd3NRMEZCWVdsQ0xGZEJRV0lzUTBGQmVVSXNTMEZCU3poR0xGTkJRVGxDTzBGQlEwRXNaMEpCUVVsc1J5eFBRVUZQTEVsQlFWZzdRVUZEUVN4cFFrRkJTMnRITEZOQlFVd3NRMEZCWlhCSExHRkJRV1lzUTBGQk5rSXNWMEZCTjBJc1JVRkJNRU5ITEdkQ1FVRXhReXhEUVVFeVJDeFBRVUV6UkN4RlFVRnZSU3haUVVGWE8wRkJRVVZFTEhGQ1FVRkxPRVlzV1VGQlREdEJRVUZ6UWl4aFFVRjJSenRCUVVOQkxHbENRVUZMU1N4VFFVRk1MRU5CUVdWd1J5eGhRVUZtTEVOQlFUWkNMR0ZCUVRkQ0xFVkJRVFJEUnl4blFrRkJOVU1zUTBGQk5rUXNUMEZCTjBRc1JVRkJjMFVzV1VGQlZ6dEJRVUZGUkN4eFFrRkJTM2RITEZsQlFVdzdRVUZCYzBJc1lVRkJla2M3UVVGRlJEczdPenM3TzBGQlIwZzdRVUZEUVRzN096czdPMGxCU1UxRExFVTdRVUZEUmpzN096czdRVUZMUVN4blFrRkJXVFZETEVsQlFWb3NSVUZCYTBJN1FVRkJRVHM3UVVGRFpDeGhRVUZMTmtNc2FVSkJRVXdzUjBGQmVVSXNXVUZCV1RkRExFbEJRWEpETzBGQlEwZzdPMEZCUlVRN096czdPenM3TzNGRFFVbGhPMEZCUTFRN1FVRkRRU3huUWtGQlNUaERMRTlCUVU5RExHRkJRV0ZETEU5QlFXSXNRMEZCY1VJc1MwRkJTMGdzYVVKQlFURkNMRU5CUVZnN1FVRkRRU3huUWtGQlNVa3NUMEZCVDBNc1MwRkJTME1zUzBGQlRDeERRVUZYVEN4UlFVRlJMRWxCUVc1Q0xFTkJRVmc3UVVGRFFTeHRRa0ZCVDBjc1NVRkJVRHRCUVVOSU96dEJRVVZFT3pzN096czdPenRyUTBGTFZUVkdMRVVzUlVGQlNUdEJRVU5XTEdkQ1FVRkpLMFlzVFVGQlRTeExRVUZMUXl4VlFVRk1MRVZCUVZZN1FVRkRRU3h0UWtGQlQwUXNTVUZCU1VVc1NVRkJTaXhEUVVGVExGVkJRVlZETEVOQlFWWXNSVUZCWVR0QlFVTjZRaXgxUWtGQlQwRXNSVUZCUld4SExFVkJRVVlzU1VGQlVVRXNSVUZCWmp0QlFVTklMR0ZCUmswc1EwRkJVRHRCUVVkSU96czdlVU5CUjJkQ1dTeEpMRVZCUVUwN1FVRkRia0k3UVVGRFFTeHRRa0ZCVHl4TFFVRkxiMFlzVlVGQlRDeEhRVUZyUWtjc1RVRkJiRUlzUTBGQmVVSTdRVUZCUVN4MVFrRkJTMFFzUlVGQlJXWXNUVUZCUml4TFFVRmhka1VzU1VGQmJFSTdRVUZCUVN4aFFVRjZRaXhEUVVGUU8wRkJRMGc3T3p0blEwRkZUMjFDTEUwc1JVRkJVVHRCUVVOYU1rUXNlVUpCUVdGc1FpeFBRVUZpTEVOQlFYRkNMRXRCUVV0blFpeHBRa0ZCTVVJc1JVRkJOa05MTEV0QlFVdFBMRk5CUVV3c1EwRkJaWEpGTEUxQlFXWXNRMEZCTjBNN1FVRkRTRHM3UVVGRlJEczdPenM3T3pzN2FVTkJTMU5STEZNc1JVRkJWenRCUVVOb1FpeG5Ra0ZCU1hkRUxFMUJRVTBzUzBGQlMwTXNWVUZCVEN4TlFVRnhRaXhGUVVFdlFqdEJRVU5CZWtRc2MwSkJRVlYyUXl4RlFVRldMRWRCUVdVc1NVRkJTVGRDTEVsQlFVb3NSMEZCVnpoQ0xFOUJRVmdzUlVGQlpqdEJRVU5CT0VZc1owSkJRVWxOTEVsQlFVb3NRMEZCVXpsRUxGTkJRVlE3UVVGRFFTeHBRa0ZCU3l0RUxFOUJRVXdzUTBGQllWQXNSMEZCWWp0QlFVTklPenM3YzBOQlJXRlJMRk1zUlVGQlYwTXNUeXhGUVVGVE8wRkJRVUU3TzBGQlF6bENMR2RDUVVGSlF5eE5RVUZOYkVNc1pVRkJaVzlDTEU5QlFXWXNRMEZCZFVJc1MwRkJka0lzUTBGQlZqdEJRVU5CTEdkQ1FVRkpaU3hOUVVGTk0wTXNVMEZCVXpSRExGRkJRVlFzUjBGQmIwSkVMRWRCUVhCQ0xFVkJRVlk3UVVGRFFTeG5Ra0ZCU1VVc1dVRkJTanRCUVVOQmFFUXNiMEpCUVZGRExFOUJRVklzUjBGRFMwTXNTVUZFVEN4RFFVTlZPMEZCUVVFc2RVSkJRVTBzVDBGQlN5dERMRkZCUVV3c1EwRkJZMG9zUjBGQlpDeEZRVUZ0UWtNc1IwRkJia0lzUlVGQmQwSkZMRWRCUVhoQ0xFTkJRVTQ3UVVGQlFTeGhRVVJXTEVWQlJVc3hReXhMUVVaTUxFTkJSVmM3UVVGQlFTeDFRa0ZCVFN4UFFVRkxORU1zWlVGQlRDeERRVUZ4UWt3c1IwRkJja0lzUlVGQk1FSkRMRWRCUVRGQ0xFVkJRU3RDUlN4SFFVRXZRaXhEUVVGT08wRkJRVUVzWVVGR1dDeEZRVWRMT1VNc1NVRklUQ3hEUVVkVk8wRkJRVUVzZFVKQlEwWXNUMEZCUzJsRUxFOUJRVXdzUTBGQllVNHNSMEZCWWl4RlFVRnJRa01zUjBGQmJFSXNSVUZCZFVKRkxFZEJRWFpDTEVWQlFUUkNUQ3hUUVVFMVFpeEZRVUYxUTBNc1QwRkJka01zUTBGRVJUdEJRVUZCTEdGQlNGWXNSVUZOUzNSRExFdEJUa3dzUTBGTlZ6dEJRVUZCTEhWQ1FVRlBPRU1zVVVGQlVVTXNTMEZCVWl4RFFVRmpReXhIUVVGa0xFTkJRVkE3UVVGQlFTeGhRVTVZTzBGQlQwZzdPenRwUTBGRlVWUXNSeXhGUVVGTFF5eEhMRVZCUVV0RkxFY3NSVUZCU3p0QlFVTndRaXh0UWtGQlR5eEpRVUZKYUVRc1QwRkJTaXhEUVVGWkxGVkJRVU5ETEU5QlFVUXNSVUZCVlhORUxFMUJRVllzUlVGQmNVSTdRVUZEY0VOVUxHOUNRVUZKVlN4RlFVRktMRU5CUVU4c1QwRkJVQ3hGUVVGblFpeFZRVUZWUXl4UlFVRldMRVZCUVc5Q08wRkJRMmhEVkN3d1FrRkJUVk1zVTBGQlUwTXNSMEZCVkN4RlFVRk9PMEZCUTBGV0xEQkNRVUZOUVN4VFFVRlBTQ3hIUVVGUUxFTkJRVTQ3UVVGRFFTeDNRa0ZCU1N4RFFVRkRSeXhIUVVGRUxFbEJRVkZCTEU5QlFVOHNTVUZCYmtJc1JVRkJlVUlzVDBGQlQwOHNVVUZCVUR0QlFVTjZRblJFTzBGQlEwZ3NhVUpCVEVRN1FVRk5TQ3hoUVZCTkxFTkJRVkE3UVVGUlNEczdPM2REUVVWbE5FTXNSeXhGUVVGTFF5eEhMRVZCUVV0RkxFY3NSVUZCU3p0QlFVTXpRaXh0UWtGQlR5eEpRVUZKYUVRc1QwRkJTaXhEUVVGWkxGVkJRVU5ETEU5QlFVUXNSVUZCVlhORUxFMUJRVllzUlVGQmNVSTdRVUZEY0VOUUxITkNRVUZOTEVWQlFVNDdRVUZEUVVFc2MwSkJRVTFtTEV0QlFVdFBMRk5CUVV3c1EwRkJaVkVzUjBGQlppeERRVUZPTzBGQlEwRkdMSE5DUVVGTk0wTXNVMEZCVXpSRExGRkJRVlFzUjBGQmIwSkVMRWRCUVhCQ0xFTkJRVEpDUkN4SFFVRXpRaXhQUVVGT08wRkJRMEZETEc5Q1FVRkpZU3hIUVVGS0xFTkJRVkZZTEVkQlFWSTdRVUZEUVN4MVFrRkJUeTlETEZOQlFWQTdRVUZEU0N4aFFVNU5MRU5CUVZBN1FVRlBTRHM3TzJkRFFVVlBORU1zUnl4RlFVRkxReXhITEVWQlFVdEZMRWNzUlVGQlMwd3NVeXhGUVVGWFF5eFBMRVZCUVZNN1FVRkRka05GTEdkQ1FVRkpWU3hGUVVGS0xFTkJRMGtzVDBGRVNpeEZRVVZKTEZWQlFWVkRMRkZCUVZZc1JVRkJiMEk3UVVGRGFFSlVMSE5DUVVGTlV5eFRRVUZUUXl4SFFVRlVMRVZCUVU0N1FVRkRTQ3hoUVVwTUxFVkJTMGtzVlVGQlZVd3NTMEZCVml4RlFVRnBRanRCUVVOaVJDeDNRa0ZCVVZFc1IwRkJVaXhEUVVGWkxGbEJRVmxRTEUxQlFVMVJMRWxCUVRsQ08wRkJRMGdzWVVGUVREdEJRVk5CWWl4clFrRkJUVUVzVTBGQlQwZ3NSMEZCVUN4RFFVRk9PMEZCUTBGSExHdENRVUZOWml4TFFVRkxReXhMUVVGTUxFTkJRVmRqTEVkQlFWZ3NRMEZCVGp0QlFVTkJMR2RDUVVGSll5eFhRVUZYWkN4VFFVRlBTaXhQUVVGUUxFTkJRV1k3UVVGRFFTeG5Ra0ZCU1N4RFFVRkRhMElzVVVGQlRDeEZRVUZsTzBGQlExaGtMSGxDUVVGUFNpeFBRVUZRTEVsQlFXOUNPMEZCUTJoQ2JVSXNNa0pCUVU4c1JVRkVVenRCUVVWb1FteEdMREJDUVVGTkxFVkJSbFU3UVVGSGFFSnRSaXd3UWtGQlRUdEJRVWhWTEdsQ1FVRndRanRCUVV0QlJpd3lRa0ZCVjJRc1UwRkJUMG9zVDBGQlVDeEZRVUZyUW0xQ0xFdEJRVGRDTzBGQlEwZ3NZVUZRUkN4TlFVOVBPMEZCUTBoRUxESkNRVUZYWkN4VFFVRlBTaXhQUVVGUUxFVkJRV3RDYlVJc1MwRkJOMEk3UVVGRFNEdEJRVU5FTzBGQlEwRkVMSEZDUVVGVGNrSXNTVUZCVkN4RFFVRmpSU3hUUVVGa08wRkJRMEU3UVVGRFFVc3NhMEpCUVUxbUxFdEJRVXRQTEZOQlFVd3NRMEZCWlZFc1IwRkJaaXhEUVVGT08wRkJRMEZHTEd0Q1FVRk5NME1zVTBGQlV6UkRMRkZCUVZRc1IwRkJiMEpFTEVkQlFYQkNMRTFCUVRKQ1JDeEhRVUV6UWl4RFFVRk9PMEZCUTBGRExHZENRVUZKWVN4SFFVRktMRU5CUVZGWUxFZEJRVkk3UVVGRFFTeHRRa0ZCVHk5RExGTkJRVkE3UVVGRFNEczdPekpEUVVWclFqdEJRVUZCT3p0QlFVTm1MR2RDUVVGSk5FTXNUVUZCVFd4RExHVkJRV1Z2UWl4UFFVRm1MRU5CUVhWQ0xFdEJRWFpDTEVOQlFWWTdRVUZEUVN4blFrRkJTV1VzVFVGQlRUTkRMRk5CUVZNMFF5eFJRVUZVTEVkQlFXOUNSQ3hIUVVGd1FpeEZRVUZXTzBGQlEwRXNaMEpCUVVsRkxGbEJRVW83UVVGRFFXaEVMRzlDUVVGUlF5eFBRVUZTTEVkQlEwdERMRWxCUkV3c1EwRkRWVHRCUVVGQkxIVkNRVUZOTEU5QlFVc3JSQ3d3UWtGQlRDeERRVUZuUTNCQ0xFZEJRV2hETEVWQlFYRkRReXhIUVVGeVF5eEZRVUV3UTBVc1IwRkJNVU1zUTBGQlRqdEJRVUZCTEdGQlJGWXNSVUZGU3pGRExFdEJSa3dzUTBGRlZ6dEJRVUZCTEhWQ1FVRk5ORVFzVFVGQlRTeFZRVUZPTEVOQlFVNDdRVUZCUVN4aFFVWllPMEZCUjBnN096dHRSRUZGTUVKeVFpeEhMRVZCUVV0RExFY3NSVUZCUzBVc1J5eEZRVUZMTzBGQlEzUkRMRzFDUVVGUExFbEJRVWxvUkN4UFFVRktMRU5CUVZrc1ZVRkJRME1zVDBGQlJDeEZRVUZWYzBRc1RVRkJWaXhGUVVGeFFqdEJRVU53UTFRc2IwSkJRVWxWTEVWQlFVb3NRMEZEU1N4UFFVUktMRVZCUlVrc1ZVRkJWVU1zVVVGQlZpeEZRVUZ2UWp0QlFVTm9RbFFzTUVKQlFVMVRMRk5CUVZORExFZEJRVlFzUlVGQlRqdEJRVU5CVml3d1FrRkJUVUVzVTBGQlQwZ3NSMEZCVUN4RFFVRk9PMEZCUTBGSExEQkNRVUZOWml4TFFVRkxReXhMUVVGTUxFTkJRVmRqTEVkQlFWZ3NRMEZCVGp0QlFVTkJMSGRDUVVGSmNFWXNUVUZCVFM5RExGTkJRVk5ITEdGQlFWUXNRMEZCZFVJc1QwRkJka0lzUTBGQlZqdEJRVU5CTEhsQ1FVRkxMRWxCUVVsdFNpeFJRVUZVTEVsQlFYRkNia0lzUjBGQmNrSXNSVUZCTUVJN1FVRkRkRUlzTkVKQlFVbHZRaXhYUVVGWGNFSXNVMEZCVDIxQ0xGRkJRVkFzUlVGQmJVSktMRXRCUVd4RE8wRkJRMEVzTkVKQlFVbE5MRTFCUVUxNlJ5eEpRVUZKTlVNc1lVRkJTaXhQUVVGelFtMUtMRkZCUVhSQ0xFTkJRVlk3UVVGRFFTdzBRa0ZCU1VVc1QwRkJUeXhKUVVGWUxFVkJRV2xDTzBGQlEySXNaME5CUVVsRUxGTkJRVk12Uml4TlFVRlVMRWRCUVd0Q0xFTkJRV3hDTEVsQlFYVkNMRU5CUVROQ0xFVkJRVGhDTzBGQlF6RkNaMGNzYjBOQlFVbDBTaXhUUVVGS0xHTkJRWGxDY1Vvc1VVRkJla0k3UVVGRFNDdzJRa0ZHUkN4TlFVVlBPMEZCUTBnc2NVTkJRVXNzU1VGQlNYSkpMRWxCUVVrc1EwRkJZaXhGUVVGblFrRXNTVUZCU1hGSkxGTkJRVk12Uml4TlFVRTNRaXhGUVVGeFEzUkRMRWRCUVhKRExFVkJRVEJETzBGQlEzUkRMSGREUVVGSmRVa3NVVUZCVVVZc1VVRkJXanRCUVVOQlF5eDNRMEZCU1hSS0xGTkJRVW9zWTBGQmVVSjFTaXhOUVVOeVFuWkpMRU5CUkhGQ0xFTkJRWHBDTzBGQlIwZzdRVUZEU2p0QlFVTktPMEZCUTBvN1FVRkRSR3RGTzBGQlEwZ3NhVUpCZUVKTUxFVkJlVUpKTEZWQlFWVnZSQ3hMUVVGV0xFVkJRV2xDTzBGQlEySkZPMEZCUTBnc2FVSkJNMEpNTzBGQk5rSklMR0ZCT1VKTkxFTkJRVkE3UVVFclFrZzdPenQzUTBGRlpWZ3NUeXhGUVVGVEwwUXNTU3hGUVVGTk8wRkJRVUU3TzBGQlF6TkNMR2RDUVVGSkswUXNWMEZCVnl4RlFVRm1MRVZCUVcxQ08wRkJRMjVDTEdkQ1FVRkpReXhOUVVGTmJFTXNaVUZCWlc5Q0xFOUJRV1lzUTBGQmRVSXNTMEZCZGtJc1EwRkJWanRCUVVOQkxHZENRVUZKWlN4TlFVRk5NME1zVTBGQlV6UkRMRkZCUVZRc1IwRkJiMEpFTEVkQlFYQkNMRVZCUVZZN1FVRkRRU3huUWtGQlNVVXNXVUZCU2p0QlFVTkJhRVFzYjBKQlFWRkRMRTlCUVZJc1IwRkRTME1zU1VGRVRDeERRVU5WTzBGQlFVRXNkVUpCUVUwc1QwRkJTM0ZGTEdOQlFVd3NRMEZCYjBJeFFpeEhRVUZ3UWl4RlFVRjVRa01zUjBGQmVrSXNSVUZCT0VKRkxFZEJRVGxDTEVWQlFXMURTaXhQUVVGdVF5eEZRVUUwUXk5RUxFbEJRVFZETEVOQlFVNDdRVUZCUVN4aFFVUldMRVZCUlV0NVFpeExRVVpNTEVOQlJWYzdRVUZCUVN4MVFrRkJUVFJFTEUxQlFVMHNWVUZCVGl4RFFVRk9PMEZCUVVFc1lVRkdXRHRCUVVkSU96czdkVU5CUldOeVFpeEhMRVZCUVV0RExFY3NSVUZCUzBVc1J5eEZRVUZMU2l4UExFVkJRVk12UkN4SkxFVkJRVTA3UVVGRGVrTXNiVUpCUVU4c1NVRkJTVzFDTEU5QlFVb3NRMEZCV1N4VlFVRkRReXhQUVVGRUxFVkJRVlZ6UkN4TlFVRldMRVZCUVhGQ08wRkJRM0JEVkN4dlFrRkJTVlVzUlVGQlNpeERRVU5KTEU5QlJFb3NSVUZGU1N4VlFVRlZReXhSUVVGV0xFVkJRVzlDTzBGQlEyaENWQ3d3UWtGQlRWTXNVMEZCVTBNc1IwRkJWQ3hGUVVGT08wRkJRMGdzYVVKQlNrd3NSVUZMU1N4VlFVRlZUQ3hMUVVGV0xFVkJRV2xDTzBGQlEySkVMRFJDUVVGUlVTeEhRVUZTTEVOQlFWa3NXVUZCV1ZBc1RVRkJUVkVzU1VGQk9VSTdRVUZEU0N4cFFrRlFURHRCUVZOQllpeHpRa0ZCVFVFc1UwRkJUMGdzUjBGQlVDeERRVUZPTzBGQlEwRkhMSE5DUVVGTlppeExRVUZMUXl4TFFVRk1MRU5CUVZkakxFZEJRVmdzUTBGQlRqdEJRVU5CTEc5Q1FVRkpkMElzVVVGQlVYaENMRk5CUVU5S0xFOUJRVkFzUlVGQmEwSnRRaXhMUVVGc1FpeERRVUYzUWxVc1QwRkJlRUlzUTBGQlowTTFSaXhKUVVGb1F5eERRVUZhTzBGQlEwRnRSU3g1UWtGQlQwb3NUMEZCVUN4RlFVRnJRbTFDTEV0QlFXeENMRU5CUVhkQ1Z5eE5RVUY0UWl4RFFVRXJRa1lzUzBGQkwwSXNSVUZCYzBNc1EwRkJkRU03UVVGRFFYaENMSGxDUVVGUFNpeFBRVUZRTEVWQlFXdENMMFFzU1VGQmJFSXNRMEZCZFVJMlJpeE5RVUYyUWl4RFFVRTRRa1lzUzBGQk9VSXNSVUZCY1VNc1EwRkJja003UVVGRFFUdEJRVU5CZUVJc2MwSkJRVTFtTEV0QlFVdFBMRk5CUVV3c1EwRkJaVkVzUjBGQlppeERRVUZPTzBGQlEwRkdMSE5DUVVGTk0wTXNVMEZCVXpSRExGRkJRVlFzUjBGQmIwSkVMRWRCUVhCQ0xFMUJRVEpDUkN4SFFVRXpRaXhEUVVGT08wRkJRMEZETEc5Q1FVRkpZU3hIUVVGS0xFTkJRVkZZTEVkQlFWSTdRVUZEUVVrc2QwSkJRVkZSTEVkQlFWSXNRMEZCV1Zvc1IwRkJXanRCUVVOQkxIVkNRVUZQTDBNc1UwRkJVRHRCUVVOSUxHRkJja0pOTEVOQlFWQTdRVUZ6UWtnN096dHZRMEZGVjNoRUxFc3NSVUZCVHp0QlFVTm1MR2RDUVVGSk1FWXNUVUZCVFN4TFFVRkxReXhWUVVGTUxFVkJRVlk3UVVGRFFTeG5Ra0ZCU1hWRExGRkJRVkY0UXl4SlFVRkpSU3hKUVVGS0xFTkJRVk1zVlVGQlZVTXNRMEZCVml4RlFVRmhPMEZCUXpsQ0xIVkNRVUZQUVN4RlFVRkZiRWNzUlVGQlJpeEpRVUZSU3l4TlFVRk5UQ3hGUVVGeVFqdEJRVU5JTEdGQlJsY3NRMEZCV2p0QlFVZEJMR2RDUVVGSmRVa3NTMEZCU2l4RlFVRlhPMEZCUTFBc2IwSkJRVWxJTEZGQlFWRnlReXhKUVVGSmMwTXNUMEZCU2l4RFFVRlpSU3hMUVVGYUxFTkJRVm83UVVGRFFYaERMRzlDUVVGSmRVTXNUVUZCU2l4RFFVRlhSaXhMUVVGWUxFVkJRV3RDTEVOQlFXeENPMEZCUTBGeVF5eHZRa0ZCU1Uwc1NVRkJTaXhEUVVGVGFFY3NTMEZCVkR0QlFVTkJMSEZDUVVGTGFVY3NUMEZCVEN4RFFVRmhVQ3hIUVVGaU8wRkJRMGc3UVVGRFNqczdRVUZIUkRzN096czdPenM3YjBOQlMxa3ZSaXhGTEVWQlFVazdRVUZEV2l4blFrRkJTU3RHTEUxQlFVMHNTMEZCUzBNc1ZVRkJUQ3hGUVVGV08wRkJRMEVzWjBKQlFVbDFReXhSUVVGUmVFTXNTVUZCU1VVc1NVRkJTaXhEUVVGVExGVkJRVlZETEVOQlFWWXNSVUZCWVR0QlFVTTVRaXgxUWtGQlQwRXNSVUZCUld4SExFVkJRVVlzU1VGQlVVRXNSVUZCWmp0QlFVTklMR0ZCUmxjc1EwRkJXanRCUVVkQkxHZENRVUZKZFVrc1MwRkJTaXhGUVVGWE8wRkJRMUFzYjBKQlFVbElMRkZCUVZGeVF5eEpRVUZKYzBNc1QwRkJTaXhEUVVGWlJTeExRVUZhTEVOQlFWbzdRVUZEUVhoRExHOUNRVUZKZFVNc1RVRkJTaXhEUVVGWFJpeExRVUZZTEVWQlFXdENMRU5CUVd4Q08wRkJRMEVzY1VKQlFVczVRaXhQUVVGTUxFTkJRV0ZRTEVkQlFXSTdRVUZEU0R0QlFVTktPenRCUVVWRU96czdPenM3T3p0dFEwRkxWM0pGTEZjc1JVRkJZU3hEUVVWMlFqczdRVUZGUkRzN096czdPenM3Y1VOQlMyRTRSeXhQTEVWQlFWTXNRMEZGY2tJN096czdPenRCUVV0TU8wRkJRME03T3pzN096dEpRVWxOUXl4Sk8wRkJRMG83T3pzN1FVRkpRU3h2UWtGQll6dEJRVUZCT3p0QlFVTmFMR0ZCUVV0RExGZEJRVXdzUjBGQmJVSXNTMEZCYmtJN1FVRkRRU3hoUVVGTFF5eEpRVUZNTEVkQlFWa3NSVUZCV2p0QlFVTkVPenRCUVVWRU96czdPenM3T3pzN096aENRVTFOUVN4SkxFVkJRVTFETEZFc1JVRkJWVHRCUVVOd1FpeG5Ra0ZCU1VNc1VVRkJVU3hMUVVGTFF5eFRRVUZNTEVWQlFWbzdRVUZEUVN4blFrRkJTVzVITEU5QlFVOXJSeXhOUVVGTk5VTXNTVUZCVGl4RFFVRlhMRlZCUVZORExFTkJRVlFzUlVGQldUdEJRVUZGTEhWQ1FVRlBRU3hGUVVGRmVVTXNTVUZCUml4TFFVRlhRU3hKUVVGc1FqdEJRVUY1UWl4aFFVRnNSQ3hEUVVGWU8wRkJRMEVzWjBKQlFVbG9SeXhKUVVGS0xFVkJRVlU3UVVGRFVDeHhRa0ZCU3l0R0xGZEJRVXdzUjBGQmJVSXZSaXhMUVVGTGFVY3NVVUZCVEN4TFFVRnJRa0VzVVVGQmNrTTdRVUZEUml4aFFVWkVMRTFCUlU4N1FVRkRTbXBITEhWQ1FVRlBMRVZCUVVWblJ5eE5RVUZOUVN4SlFVRlNMRVZCUVdORExGVkJRVlZCTEZGQlFYaENMRVZCUVZBN1FVRkRRVU1zYzBKQlFVMTRReXhKUVVGT0xFTkJRVmN4UkN4SlFVRllPMEZCUTBFc2NVSkJRVXR2Unl4VFFVRk1MRU5CUVdWR0xFdEJRV1k3UVVGRFFTeHhRa0ZCUzBnc1YwRkJUQ3hIUVVGdFFpeEpRVUZ1UWp0QlFVTkdPMEZCUTBRc1owSkJRVWtzUzBGQlMwRXNWMEZCVkN4RlFVRnpRanRCUVVOd1FpeHhRa0ZCUzBNc1NVRkJUQ3hIUVVGWmFFY3NTMEZCUzJkSExFbEJRV3BDTzBGQlEwUTdRVUZEUkN4dFFrRkJUeXhMUVVGTFJDeFhRVUZhTzBGQlEwRTdRVUZEUVR0QlFVTkVPenRCUVVWRU96czdPenM3T3p0cFEwRkxVenRCUVVOUUxHbENRVUZMUVN4WFFVRk1MRWRCUVcxQ0xFdEJRVzVDTzBGQlEwRXNhVUpCUVV0RExFbEJRVXdzUjBGQldTeEZRVUZhTzBGQlEwUTdPenR2UTBGRlZ6dEJRVU5XTEdkQ1FVRkpiRVFzVDBGQlQwTXNZVUZCWVVNc1QwRkJZaXhEUVVGeFFpeFRRVUZ5UWl4RFFVRllPMEZCUTBFc1owSkJRVWxETEU5QlFVOURMRXRCUVV0RExFdEJRVXdzUTBGQlYwd3NVVUZCVVN4SlFVRnVRaXhEUVVGWU8wRkJRMEVzYlVKQlFVOUhMRWxCUVZBN1FVRkRSRHM3TzJ0RFFVVlRhVVFzU3l4RlFVRlBPMEZCUTJadVJDeDVRa0ZCWVd4Q0xFOUJRV0lzUTBGQmNVSXNVMEZCY2tJc1JVRkJaME54UWl4TFFVRkxUeXhUUVVGTUxFTkJRV1Y1UXl4TFFVRm1MRU5CUVdoRE8wRkJRMFE3T3pzN096dEJRVWRJT3pzN1FVRkhSQ3hKUVVGSmNra3NTMEZCU3l4SlFVRkpLMFVzUlVGQlNpeEZRVUZVT3p0QlFVVkJMRWxCUVVscVFpeHZRa0ZCYjBJM1JpeFRRVUZUUnl4aFFVRlVMRU5CUVhWQ0xIRkNRVUYyUWl4RFFVRjRRanRCUVVOQkxFbEJRVWswUXl4TlFVRk5MRWxCUVVsNFJDeFJRVUZLTEVOQlFXRnpSeXhwUWtGQllpeERRVUZXT3p0QlFVVkJMRWxCUVVseVJDeGhRVUZoTEVsQlFVazJSQ3hoUVVGS0xFTkJRV3RDY2tjc1UwRkJVM1ZMTEVsQlFUTkNMRVZCUVdsRExFVkJRV3BETEVOQlFXcENPMEZCUTBFc1NVRkJTWEpITEU5QlFVOHNTVUZCU1RoR0xFbEJRVW9zUlVGQldEczdRVUZGUVN4SlFVRkpOVVlzVTBGQlV5eEpRVUZKU0N4TlFVRktMRU5CUVZkcVJTeFRRVUZUZFVzc1NVRkJjRUlzUlVGQk1FSXNSVUZCTVVJc1EwRkJZanRCUVVOQkxFbEJRVWxETEZGQlFWRXNTVUZCU1RWR0xGTkJRVW9zUTBGQll6VkZMRk5CUVZOMVN5eEpRVUYyUWl4RlFVRTJRaXhGUVVFM1FpeERRVUZhTzBGQlEwRXNTVUZCU1RWR0xGTkJRVk1zU1VGQlNVWXNUVUZCU2l4RFFVRlhla1VzVTBGQlUzVkxMRWxCUVhCQ0xFTkJRV0lpTENKbWFXeGxJam9pWm1GclpWODNOV05rWmpkaFppNXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWk4dklHbHRjRzl5ZENCU2IzVjBaWElnWm5KdmJTQW5MaTkxZEdsc2N5OXliM1YwWlhJbk8xeHlYRzR2S21sdGNHOXlkQ0JWYzJWeUlHWnliMjBnSnk0dmRYUnBiSE12VlhObGNpYzdYSEpjYm1sdGNHOXlkQ0JFUWlCbWNtOXRJQ2N1TDNWMGFXeHpMMFJDSnp0Y2NseHVYSEpjYm1sdGNHOXlkQ0I3SUdsdVpHVjRJSDBnWm5KdmJTQW5MaTl5YjNWMFpYTXZhVzVrWlhnbk8xeHlYRzVwYlhCdmNuUWdleUJzYjJkcGJpQjlJR1p5YjIwZ0p5NHZjbTkxZEdWekwyeHZaMmx1Snp0Y2NseHVYSEpjYm1sdGNHOXlkQ0I3SUdOaGJHVnVaR0Z5SUgwZ1puSnZiU0FuTGk5eWIzVjBaWE12WTJGc1pXNWtZWEl2WTJGc1pXNWtZWEluTzF4eVhHNXBiWEJ2Y25RZ2V5QmtZWGtnZlNCbWNtOXRJQ2N1TDNKdmRYUmxjeTlqWVd4bGJtUmhjaTlrWVhrbk8xeHlYRzVwYlhCdmNuUWdleUJsZG1WdWRDQjlJR1p5YjIwZ0p5NHZjbTkxZEdWekwyTmhiR1Z1WkdGeUwyVjJaVzUwSnp0Y2NseHVhVzF3YjNKMElIc2diR2x6ZENCOUlHWnliMjBnSnk0dmNtOTFkR1Z6TDJOaGJHVnVaR0Z5TDJ4cGMzUW5PMXh5WEc1Y2NseHVZMjl1YzNRZ2NtOTFkR1Z6SUQwZ1cybHVaR1Y0TENCc2IyZHBiaXdnWTJGc1pXNWtZWElzSUdSaGVTd2daWFpsYm5Rc0lHeHBjM1JkTzF4eVhHNWNjbHh1WTI5dWMzUWdkWE5sY2lBOUlHNWxkeUJWYzJWeUtDazdYSEpjYm1OdmJuTjBJR1JpSUQwZ2JtVjNJRVJDS0Nkb2RIUndjem92TDJacGNtVmlZWE5sTG1OdmJTY3BPeW92WEhKY2JseHlYRzR2THlEUXN0QyswTGZRdk5DKzBMYlF2ZEMrSU5DOTBZUFF0dEMxMEwwZzBMSFJnOUMwMExYUmdpRFF1TkN5MExYUXZkR0NJTkN4MExEUmdWeHlYRzR2THlCdVpYY2dVbTkxZEdWeUtIdHliM1YwWlhNc0lIVnpaWElzSUdSaWZTazdYSEpjYmk4cUtseHlYRzRnS2lCRGJHRnpjeUJ5WlhCeVpYTmxiblJwYm1jZ1lTQmpZV3hsYm1SaGNseHlYRzRnS2lCQVkyeGhjM05jY2x4dUlDb3ZYSEpjYmx4eVhHNWpiR0Z6Y3lCRFlXeGxibVJoY2lCN1hISmNiaUFnTHlvcVhISmNiaUFnSUNvZ1EzSmxZWFJsSUdFZ1kyRnNaVzVrWVhJZ2IySnFaV04wWEhKY2JpQWdJQ29nUUdOdmJuTjBjblZqZEc5eVhISmNiaUFnSUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUdWc1pXMWxiblFnTFNCRVQwMGdaV3hsYldWdWRGeHlYRzRnSUNBcUwxeHlYRzVjY2x4dUlDQmpiMjV6ZEhKMVkzUnZjaWhsYkdWdFpXNTBLU0I3WEhKY2JpQWdJQ0F2TDlDLzBMN1F2TkMxMEwzUmo5R0MwWXdnMExJZzBZRFFzTkMzMEx6UXRkR0MwTHJRdFN3ZzBZZlJndEMrMExIUml5QklaV0ZrWlhJZ0t5QjBZV0pzWlNEUXNkR0wwTHZRdUNEUXZ0Q3gwTFhSZ05DOTBZUFJndEdMSU5DeUlOQzAwTGpRc2x4eVhHNGdJQ0FnZEdocGN5NWxiR1Z0Wlc1MElEMGdaV3hsYldWdWREc2dMeS9SZ2RHTzBMVFFzQ0RRdjlDMTBZRFF0ZEMwMExEUXRkR0MwWUhSanlEUXZ0Q3gwTFhSZ05HQzBMclFzQ0F0SU5DLzBZUFJnZEdDMEw3UXVTRFF0TkM0MExKY2NseHVYSEpjYmlBZ0lDQjBhR2x6TG1OMWNuSmxiblJFWVhSbElEMGdibVYzSUVSaGRHVW9LVHRjY2x4dUlDQWdJSFJvYVhNdWNtVnVaR1Z5S0NrN1hISmNiaUFnSUNCMGFHbHpMbWhwWkdVb0tUdGNjbHh1SUNCOVhISmNibHh5WEc0Z0lDOHFLbHh5WEc0Z0lDQXFJRU5vWVc1blpTQnRiMjUwYUZ4eVhHNGdJQ0FxTDF4eVhHNGdJR2R2VUhKbGRrMXZiblJvS0NrZ2UxeHlYRzRnSUNCMGFHbHpMbU4xY25KbGJuUkVZWFJsTG5ObGRFMXZiblJvS0hSb2FYTXVZM1Z5Y21WdWRFUmhkR1V1WjJWMFRXOXVkR2dvS1NBdElERXBPeUJjY2x4dUlDQWdkR2hwY3k1eVpXNWtaWElvS1R0Y2NseHVJQ0FnSUM4dklOQy8wWURRdnRDeTBMWFJnTkM0MFlMUmpDRFF2ZEN3SU5DNjBMRFF1dEdEMFk0ZzBZSFJndEdBMExYUXU5QzYwWU1nMEwzUXNOQzIwTERRdTlDNFhISmNiaUFnSUNBdkx5RFF1Q0RRdE5DKzBMSFFzTkN5MExqUmd0R01JTkM0MEx2UXVDRFF2dEdDMEwzUmo5R0MwWXdnMEw3UXROQzQwTDBnMEx6UXRkR0IwWS9SaGx4eVhHNGdJSDFjY2x4dVhISmNiaUFnWjI5T1pYaDBUVzl1ZEdnb0tTQjdYSEpjYmlBZ0lIUm9hWE11WTNWeWNtVnVkRVJoZEdVdWMyVjBUVzl1ZEdnb2RHaHBjeTVqZFhKeVpXNTBSR0YwWlM1blpYUk5iMjUwYUNncElDc2dNU2s3SUZ4eVhHNGdJQ0IwYUdsekxuSmxibVJsY2lncE8xeHlYRzRnSUNBZ0x5OGcwTC9SZ05DKzBMTFF0ZEdBMExqUmd0R01JTkM5MExBZzBMclFzTkM2MFlQUmppRFJnZEdDMFlEUXRkQzcwTHJSZ3lEUXZkQ3cwTGJRc05DNzBMaGNjbHh1SUNBZ0lDOHZJTkM0SU5DMDBMN1FzZEN3MExMUXVOR0MwWXdnMExqUXU5QzRJTkMrMFlMUXZkR1AwWUxSakNEUXZ0QzAwTGpRdlNEUXZOQzEwWUhSajlHR1hISmNiaUFnZlZ4eVhHNWNjbHh1SUNBdktpcGNjbHh1SUNBZ0tpQlNaVzVrWlhJZ1kyRnNaVzVrWVhJZ2FHVmhaR1Z5WEhKY2JpQWdJQ292WEhKY2JpQWdjbVZ1WkdWeVEyRnNaVzVrWVhKSVpXRmtaWElvS1NCN1hISmNiaUFnSUNCMllYSWdhR1ZoWkdWeVFtOWtlU0E5SUdSdlkzVnRaVzUwTG1OeVpXRjBaVVZzWlcxbGJuUW9KMFJKVmljcE8xeHlYRzRnSUNBZ2FHVmhaR1Z5UW05a2VTNXBibTVsY2toVVRVd2dQU0FuSUZ4Y1hISmNiaUFnSUNBZ0lDQWdQR1JwZGlCamJHRnpjejFjSW1OaGJHVnVaR0Z5TFdobFlXUmxjbHdpUGlCY1hGeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBOFluVjBkRzl1UGp4cElHTnNZWE56UFZ3aWJXRjBaWEpwWVd3dGFXTnZibk1nY0hKbGRpMXRiMjUwYUMxaGNuSnZkMXdpUG10bGVXSnZZWEprWDJGeWNtOTNYMnhsWm5ROEwyaytQQzlpZFhSMGIyNCtJRnhjWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnUEdScGRqNGdYRnhjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUR4emNHRnVJR05zWVhOelBWd2liVzl1ZEdoY0lqN1FtTkdPMEx2UmpEd3ZjM0JoYmo0Z1hGeGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHh6Y0dGdUlHTnNZWE56UFZ3aWVXVmhjbHdpUGpJd01UYzhMM053WVc0K0lGeGNYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdQQzlrYVhZK0lGeGNYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lEeGlkWFIwYjI0K1BHa2dZMnhoYzNNOVhDSnRZWFJsY21saGJDMXBZMjl1Y3lCdVpYaDBMVzF2Ym5Sb0xXRnljbTkzWENJK2EyVjVZbTloY21SZllYSnliM2RmY21sbmFIUThMMmsrUEM5aWRYUjBiMjQrSUZ4Y1hISmNiaUFnSUNBZ0lDQWdQQzlrYVhZK0p6dGNjbHh1SUNBZ0lGeHlYRzRnSUNBZ2FHVmhaR1Z5UW05a2VTNXhkV1Z5ZVZObGJHVmpkRzl5S0NjdWJXOXVkR2duS1M1cGJtNWxja2hVVFV3Z1BTQjBhR2x6TG1OMWNuSmxiblJFWVhSbExtZGxkRTF2Ym5Sb0tDazdYSEpjYmlBZ0lDQm9aV0ZrWlhKQ2IyUjVMbkYxWlhKNVUyVnNaV04wYjNJb0p5NTVaV0Z5SnlrdWFXNXVaWEpJVkUxTUlEMGdkR2hwY3k1amRYSnlaVzUwUkdGMFpTNW5aWFJHZFd4c1dXVmhjaWdwTzF4eVhHNGdJQ0FnZG1GeUlITmxiR1lnUFNCMGFHbHpPMXh5WEc0Z0lDQWdhR1ZoWkdWeVFtOWtlUzV4ZFdWeWVWTmxiR1ZqZEc5eUtDY3VjSEpsZGkxdGIyNTBhQzFoY25KdmR5Y3BMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9KMk5zYVdOckp5d2dablZ1WTNScGIyNG9LU0I3SUhObGJHWXVaMjlRY21WMlRXOXVkR2dvS1RzZ2ZTazdYSEpjYmlBZ0lDQm9aV0ZrWlhKQ2IyUjVMbkYxWlhKNVUyVnNaV04wYjNJb0p5NXVaWGgwTFcxdmJuUm9MV0Z5Y205M0p5a3VZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25ZMnhwWTJzbkxDQm1kVzVqZEdsdmJpZ3BJSHNnYzJWc1ppNW5iMDVsZUhSTmIyNTBhQ2dwT3lCOUtUdGNjbHh1SUNBZ0lIUm9hWE11Wld4bGJXVnVkQzVoY0hCbGJtUkRhR2xzWkNob1pXRmtaWEpDYjJSNUtUdGNjbHh1SUNBZ0lGeHlYRzRnSUNBZ0x5OGcwTDNRc05HQTBMalJnZEMrMExMUXNOR0MwWXdnMFlIUmd0R0EwTFhRdTlDNjBMZ2cwTGdnMEx6UXRkR0IwWS9SaGkvUXM5QyswTFJjY2x4dUlDQWdJQzh2SU5DLzBMN1FzdEMxMFlIUXVOR0MwWXdnMEwzUXNDRFF2ZEM0MFlVZ1kyaGhibWRsVFc5dWRHaGNjbHh1SUNCOVhISmNibHh5WEc0Z0lDOHFLbHh5WEc0Z0lDQXFJRkpsYm1SbGNpQmpZV3hsYm1SaGNseHlYRzRnSUNBcUwxeHlYRzRnSUhKbGJtUmxja05oYkdWdVpHRnlLQ2tnZTF4eVhHNGdJQ0FnZG1GeUlIUmhZbXhsSUQwZ1pHOWpkVzFsYm5RdVkzSmxZWFJsUld4bGJXVnVkQ2duVkVGQ1RFVW5LVHRjY2x4dUlDQWdJSFJoWW14bExtTnNZWE56VG1GdFpTQTlJQ2QwWVdKc1pTMXlaWE53YjI1emFYWmxKenRjY2x4dUlDQWdJSFpoY2lCNVpXRnlJRDBnZEdocGN5NWpkWEp5Wlc1MFJHRjBaUzVuWlhSR2RXeHNXV1ZoY2lncE8xeHlYRzRnSUNBZ2RtRnlJRzF2Ym5Sb0lEMGdkR2hwY3k1amRYSnlaVzUwUkdGMFpTNW5aWFJOYjI1MGFDZ3BPMXh5WEc1Y2NseHVJQ0FnSUZ4eVhHNGdJQ0FnZG1GeUlHUWdQU0J1WlhjZ1JHRjBaU2g1WldGeUxDQnRiMjUwYUN3Z01TazdJRnh5WEc0Z0lDQWdkbUZ5SUd4aGMzUkVJRDBnYm1WM0lFUmhkR1VvZVdWaGNpd2diVzl1ZEdnZ0t5QXhMQ0F3S1R0Y2NseHVJQ0FnSUhaaGNpQjBZV0pzWlZKdmR5QTlJSFJoWW14bExtbHVjMlZ5ZEZKdmR5Z3BPMXh5WEc0Z0lDQWdabTl5SUNoMllYSWdhU0E5SURBN0lHa2dQQ0IwYUdsekxtZGxkRVJoZVNoa0tUc2dhU3NyS1NCN1hISmNiaUFnSUNBZ0lIWmhjaUIwWVdKc1pVTmxiR3dnUFNCMFlXSnNaVkp2ZHk1cGJuTmxjblJEWld4c0tDazdYSEpjYmlBZ0lDQWdJSFJoWW14bFEyVnNiQzVqYkdGemMwNWhiV1VnUFNBblkyRnNaVzVrWVhJdFpHRjVKenRjY2x4dUlDQWdJSDFjY2x4dVhISmNiaUFnSUNCM2FHbHNaU0FvWkM1blpYUk5iMjUwYUNncElEMDlJRzF2Ym5Sb0tTQjdYSEpjYmlBZ0lDQWdJSFpoY2lCMFlXSnNaVU5sYkd3Z1BTQjBZV0pzWlZKdmR5NXBibk5sY25SRFpXeHNLQ2s3WEhKY2JpQWdJQ0FnSUhSaFlteGxRMlZzYkM1cGJtNWxja2hVVFV3Z1BTQmtMbWRsZEVSaGRHVW9LVHRjY2x4dUlDQWdJQ0FnZEdGaWJHVkRaV3hzTG1sa0lEMGdaQzVuWlhSVWFXMWxLQ2s3WEhKY2JpQWdJQ0FnSUhSaFlteGxRMlZzYkM1amJHRnpjMDVoYldVZ1BTQW5ZMkZzWlc1a1lYSXRaR0Y1Snp0Y2NseHVJQ0FnSUNBZ2JtVjNJRVYyWlc1MGMweHBjM1FvZEdGaWJHVkRaV3hzTENCa0tUdGNjbHh1WEhKY2JseHlYRzRnSUNBZ0lDQnBaaUFvZEdocGN5NW5aWFJFWVhrb1pDa2dKU0EzSUQwOVBTQTJLU0I3WEhKY2JpQWdJQ0FnSUNBZ2RHRmliR1ZTYjNjZ1BTQjBZV0pzWlM1cGJuTmxjblJTYjNjb0tUdGNjbHh1SUNBZ0lDQWdmVnh5WEc0Z0lDQWdJQ0JrTG5ObGRFUmhkR1VvWkM1blpYUkVZWFJsS0NrZ0t5QXhLVHRjY2x4dUlDQWdJSDFjY2x4dVhISmNibHh5WEc0Z0lDQWdhV1lnS0hSb2FYTXVaMlYwUkdGNUtHUXBJQ0U5UFNBd0tTQjdYSEpjYmlBZ0lDQWdJR1p2Y2lBb2FTQTlJSFJvYVhNdVoyVjBSR0Y1S0d4aGMzUkVLVHNnYVNBOElEWTdJR2tyS3lrZ2UxeHlYRzRnSUNBZ0lDQWdJSFpoY2lCMFlXSnNaVU5sYkd3Z1BTQjBZV0pzWlZKdmR5NXBibk5sY25SRFpXeHNLQ2s3WEhKY2JpQWdJQ0FnSUNBZ2RHRmliR1ZEWld4c0xtTnNZWE56VG1GdFpTQTlJQ2RqWVd4bGJtUmhjaTFrWVhrbk8xeHlYRzRnSUNBZ0lDQjlYSEpjYmlBZ0lDQjlYSEpjYmx4eVhHNGdJQ0FnZEdocGN5NWxiR1Z0Wlc1MExtRndjR1Z1WkVOb2FXeGtLSFJoWW14bEtUdGNjbHh1SUNBZ1hISmNiaUFnSUNCMllYSWdjMlZzWmlBOUlIUm9hWE03WEhKY2JpQWdJQ0IwWVdKc1pTNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZGpiR2xqYXljc0lHWjFibU4wYVc5dUtDa2dleUJ6Wld4bUxuTmxiR1ZqZEVObGJHd29aWFpsYm5RcE95QjlLVHRjY2x4dVhISmNiaUFnSUNBdkx5RFF2ZEN3MFlEUXVOR0IwTDdRc3RDdzBZTFJqQ0RSZ2RDdzBMd2cwTHJRc05DNzBMWFF2ZEMwMExEUmdOR01YSEpjYmlBZ2ZWeHlYRzVjY2x4dUlDQXZLaXBjY2x4dUlDQWdLaUJTWlc1a1pYSWdZMkZzWlc1a1lYSWdhR1ZoWkdWeUlHRnVaQ0JpYjJSNVhISmNiaUFnSUNvdlhISmNiaUFnY21WdVpHVnlLQ2tnZTF4eVhHNGdJQ0FnZEdocGN5NWxiR1Z0Wlc1MExtbHVibVZ5U0ZSTlRDQTlJQ2NuTzF4eVhHNGdJQ0FnZEdocGN5NXlaVzVrWlhKRFlXeGxibVJoY2tobFlXUmxjaWdwTzF4eVhHNGdJQ0FnZEdocGN5NXlaVzVrWlhKRFlXeGxibVJoY2lncE8xeHlYRzRnSUNBZ1pHSXViRzloWkVWMlpXNTBjMFp5YjIxRVFpZ3BPMXh5WEc0Z0lIMWNjbHh1SUNCY2NseHVJQ0J6YUc5M0tDa2dlMXh5WEc0Z0lDQWdkR2hwY3k1bGJHVnRaVzUwTG5OMGVXeGxMbVJwYzNCc1lYa2dQU0FuWW14dlkyc25PMXh5WEc0Z0lIMWNjbHh1SUNCY2NseHVJQ0JvYVdSbEtDa2dlMXh5WEc0Z0lDQWdkR2hwY3k1bGJHVnRaVzUwTG5OMGVXeGxMbVJwYzNCc1lYa2dQU0FuYm05dVpTYzdYSEpjYmlBZ2ZWeHlYRzVjY2x4dUlDQm5aWFJFWVhrb1pHRjBaU2tnZXlBdkx5QjNaV1ZyWkdGNWN5Qk5iMjVrWVhrZ0tEQXBJSFJ2SUZOMWJtUmhlU0FvTmlsY2NseHVJQ0FnSUhaaGNpQjNaV1ZyUkdGNUlEMGdaR0YwWlM1blpYUkVZWGtvS1R0Y2NseHVJQ0FnSUdsbUlDaDNaV1ZyUkdGNUlEMDlQU0F3S1NCM1pXVnJSR0Y1SUQwZ056dGNjbHh1SUNBZ0lISmxkSFZ5YmlCM1pXVnJSR0Y1SUMwZ01UdGNjbHh1SUNCOVhISmNibHh5WEc0Z0lITmxiR1ZqZEVObGJHd29aWFpsYm5RcElIdGNjbHh1SUNBZ0lIWmhjaUIwWVdKc1pTQTlJR1J2WTNWdFpXNTBMbWRsZEVWc1pXMWxiblJ6UW5sVVlXZE9ZVzFsS0NkVVFVSk1SU2NwTzF4eVhHNGdJQ0FnZG1GeUlIUmhjbWRsZENBOUlHVjJaVzUwTG5SaGNtZGxkRHRjY2x4dVhISmNiaUFnSUNCM2FHbHNaU0FvZEdGeVoyVjBJQ0U5UFNCMFlXSnNaU0FtSmlCMFlYSm5aWFF1YVc1dVpYSklWRTFNSUNFOVBTY25LU0I3WEhKY2JpQWdJQ0FnSUdsbUlDaDBZWEpuWlhRdWRHRm5UbUZ0WlNBOVBTQW5WRVFuS1NCN1hISmNiaUFnSUNBZ0lDQWdaWFpGWkdsMFJtOXliUzV6YUc5M1JYWmxiblJEY21WaGRHVkdiM0p0S0hSaGNtZGxkQzVwWkNrN0lGeHlYRzRnSUNBZ0lDQWdJSEpsZEhWeWJqdGNjbHh1SUNBZ0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUNBZ2FXWWdLSFJoY21kbGRDNWpiR0Z6YzB4cGMzUXVZMjl1ZEdGcGJuTW9KMlYyWlc1MEp5a3BJSHRjY2x4dUlDQWdJQ0FnSUNCbGRrVmthWFJHYjNKdExuTm9iM2RGZG1WdWRFVmthWFJHYjNKdEtIUmhjbWRsZEM1cFpDazdJRnh5WEc0Z0lDQWdJQ0FnSUhKbGRIVnlianRjY2x4dUlDQWdJQ0FnZlZ4eVhHNWNjbHh1SUNBZ0lDQWdJR2xtSUNoMFlYSm5aWFF1ZEdGblRtRnRaU0E5UFNBblFsVlVWRTlPSnlrZ2UxeHlYRzRnSUNBZ0lDQWdJR1JpTG1SbGJHVjBaVVYyWlc1MEtIUmhjbWRsZEM1d1lYSmxiblJPYjJSbExtbGtLVHNnWEhKY2JpQWdJQ0FnSUNBZ1kyRnNMbkpsYm1SbGNpZ3BPMXh5WEc0Z0lDQWdJQ0FnSUhKbGRIVnlianRjY2x4dUlDQWdJQ0FnZlZ4eVhHNWNjbHh1WEhKY2JseHlYRzRnSUNBZ0lDQjBZWEpuWlhRZ1BTQjBZWEpuWlhRdWNHRnlaVzUwVG05a1pUdGNjbHh1SUNBZ0lIMGdJQ0FnSUNBZ0lDQmNjbHh1SUNCOVhISmNibHh5WEc1OVhISmNibHh5WEc0dkwyVjRjRzl5ZENCa1pXWmhkV3gwSUVOaGJHVnVaR0Z5TzF4eVhHNHZLaXBjY2x4dUlDb2dRMnhoYzNNZ2NtVndjbVZ6Wlc1MGFXNW5JR0VnWTI5dGJXVnVkRnh5WEc0Z0tpQkFZMnhoYzNOY2NseHVJQ292WEhKY2JtTnNZWE56SUVOdmJXMWxiblFnZTF4eVhHNGdJQzhxS2x4eVhHNGdJQ0FxSUVOeVpXRjBaU0JoSUdOdmJXMWxiblJjY2x4dUlDQWdLaUJBWTI5dWMzUnlkV04wYjNKY2NseHVJQ0FnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnWld4bGJXVnVkQ0F0SUVSUFRTQmxiR1Z0Wlc1MFhISmNiaUFnSUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUdOdmJXMWxiblJFWVhSaElDMGdRMjl0YldWdWRDQmtZWFJoWEhKY2JpQWdJQ292WEhKY2JpQWdZMjl1YzNSeWRXTjBiM0lvWld4bGJXVnVkQ3dnWTI5dGJXVnVkRVJoZEdFcElIdGNjbHh1SUNBZ0lIUm9hWE11Wld4bGJXVnVkQ0E5SUdWc1pXMWxiblE3SUM4dklOR04wTHZRdGRDODBMWFF2ZEdDSUQwZzBZL1JoOUMxMExuUXV0Q3dQMXh5WEc0Z0lDQWdkR2hwY3k1amIyMXRaVzUwUkdGMFlTQTlJR052YlcxbGJuUkVZWFJoTzF4eVhHNGdJQ0FnZEdocGN5NXlaVzVrWlhKRGIyMXRaVzUwS0NrN1hISmNiaUFnZlZ4eVhHNWNjbHh1SUNBdktpcGNjbHh1SUNBZ0tpQlNaVzVrWlhJZ1kyOXRiV1Z1ZEZ4eVhHNGdJQ0FxTDF4eVhHNGdJSEpsYm1SbGNrTnZiVzFsYm5Rb0tTQjdYSEpjYmlBZ1hIUjJZWElnWTI5dGJXVnVkQ0E5SUdSdlkzVnRaVzUwTG1OeVpXRjBaVVZzWlcxbGJuUW9KMFJKVmljcE8xeHlYRzRnSUZ4MFkyOXRiV1Z1ZEM1cGJtNWxja2hVVFV3Z1BTQW5YRnhjY2x4dUlDQmNkRHhrYVhZZ1kyeGhjM005WENKamIyMXRaVzUwYzF3aVBpQmNYRnh5WEc1Y2RDQWdQR2cwUGtOdmJXMWxiblJ6UEM5b05ENGdYRnhjY2x4dVhIUWdJRHgxYkNCamJHRnpjejFjSW14cGMzUXRaM0p2ZFhCY0lqNGdYRnhjY2x4dVhIUWdJQ0FnUEd4cElHTnNZWE56UFZ3aWJHbHpkQzFuY205MWNDMXBkR1Z0WENJK2NtVnlaV3c4TDJ4cFBpQmNYRnh5WEc1Y2RDQWdJQ0E4YkdrZ1kyeGhjM005WENKc2FYTjBMV2R5YjNWd0xXbDBaVzFjSWo1bWEyUnNabVJyWm13OEwyeHBQaUJjWEZ4eVhHNWNkQ0FnUEM5MWJENGdYRnhjY2x4dVhIUThMMlJwZGo0bk8xeHlYRzRnSUZ4MFkyOXRiV1Z1ZEM1amIyNTBaVzUwUldScGRHRmliR1VnUFNBbmRISjFaU2M3WEhKY2JpQWdYSFIwYUdsekxtVnNaVzFsYm5RdVlYQndaVzVrUTJocGJHUW9ZMjl0YldWdWRDazdYSEpjYmx4eVhHNGdJSDFjY2x4dWZWeHlYRzVjY2x4dUx5OWxlSEJ2Y25RZ1pHVm1ZWFZzZENCRGIyMXRaVzUwTzF4eVhHNHZLaXBjY2x4dUlDb2dRMnhoYzNNZ2NtVndjbVZ6Wlc1MGFXNW5JR0VnWlhabGJuUmNjbHh1SUNvZ1FHTnNZWE56WEhKY2JpQXFMMXh5WEc1amJHRnpjeUJGZG1WdWRITk1hWE4wSUh0Y2NseHVJQ0F2S2lwY2NseHVJQ0FnS2lCRGNtVmhkR1VnWVNCbGRtVnVkRnh5WEc0Z0lDQXFJRUJqYjI1emRISjFZM1J2Y2x4eVhHNGdJQ0FxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0JsYkdWdFpXNTBJQzBnUkU5TklHVnNaVzFsYm5SY2NseHVJQ0FnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnWlhabGJuUkVZWFJoSUMwZ1JYWmxiblFnWkdGMFlWeHlYRzRnSUNBcUwxeHlYRzRnSUdOdmJuTjBjblZqZEc5eUtHVnNaVzFsYm5RcElIdGNjbHh1SUNBZ0lIUm9hWE11Wld4bGJXVnVkQ0E5SUdWc1pXMWxiblE3WEhKY2JpQWdJQ0F2TDNSb2FYTXVaR0YwWlNBOUlHUmhkR1U3WEhKY2JpQWdJQ0IwYUdsekxuSmxibVJsY2tWMlpXNTBjMHhwYzNRb0tUdGNjbHh1SUNCOVhISmNibHh5WEc0Z0lDOHFLbHh5WEc0Z0lDQXFJRkpsYm1SbGNpQmxkbVZ1ZEZ4eVhHNGdJQ0FxTDF4eVhHNGdJSEpsYm1SbGNrVjJaVzUwYzB4cGMzUW9LU0I3WEhKY2JpQWdJQ0IyWVhJZ1pYWmxiblJ6SUQwZ1pHSXViRzloWkVWMlpXNTBjMEo1UkdGMFpTaDBhR2x6TG1Wc1pXMWxiblF1YVdRcE8xeHlYRzRnSUNBZ2FXWWdLQ0ZsZG1WdWRITWdmSHdnSVdWMlpXNTBjeTVzWlc1bmRHZ3BJSEpsZEhWeWJqdGNjbHh1SUNBZ0lGeHlYRzRnSUNBZ2RtRnlJR1YyWlc1MGMweHBjM1FnUFNCa2IyTjFiV1Z1ZEM1amNtVmhkR1ZGYkdWdFpXNTBLQ2RFU1ZZbktUdGNjbHh1SUNBZ0lHVjJaVzUwYzB4cGMzUXVZMnhoYzNOT1lXMWxJRDBnSjJWMlpXNTBjeWM3WEhKY2JpQWdJQ0JsZG1WdWRITk1hWE4wTG1sdWJtVnlTRlJOVENBOUoxeGNYSEpjYmlBZ0lDQThaR2wySUdOc1lYTnpQVndpY0dGdVpXd2djR0Z1Wld3dGFXNW1iMXdpUGlCY1hGeHlYRzRnSUNBZ0lDQWdJRHhrYVhZZ1kyeGhjM005WENKd1lXNWxiQzFvWldGa2FXNW5YQ0krSUZ4Y1hISmNiaUFnSUNBZ0lDQWdJQ0E4YURNZ1kyeGhjM005WENKd1lXNWxiQzEwYVhSc1pWd2lQbGx2ZFhJZ1pYWmxiblJ6UEM5b016NGdYRnhjY2x4dUlDQWdJQ0FnSUNBOEwyUnBkajRnWEZ4Y2NseHVJQ0FnSUNBZ0lDQThaR2wySUdOc1lYTnpQVndpY0dGdVpXd3RZbTlrZVZ3aVBpQmNYRnh5WEc0Z0lDQWdJQ0FnSUR3dlpHbDJQaUJjWEZ4eVhHNGdJQ0FnUEM5a2FYWStKenRjY2x4dUlDQWdJSFpoY2lCbGRtVnVkSE5NYVhOMFEyOXVkR0ZwYm1WeUlEMGdaWFpsYm5SelRHbHpkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtDY3VjR0Z1Wld3dFltOWtlU2NwTzF4eVhHNGdJQ0FnTHlwdVpYY2dSWFpsYm5Rb1pYWmxiblJ6VEdsemRFTnZiblJoYVc1bGNpd2dKMmhsYkd4dkp5azdYSEpjYmlBZ0lDQnVaWGNnUlhabGJuUW9aWFpsYm5SelRHbHpkRU52Ym5SaGFXNWxjaXdnSjJobGJHeHZJSGR2Y214a0p5azdLaTljY2x4dUlDQWdJRnh5WEc0Z0lDQWdaWFpsYm5SekxtWnZja1ZoWTJnb1puVnVZM1JwYjI0b1pXeGxiU2tnZTF4eVhHNGdJQ0FnSUNCdVpYY2dSWFpsYm5Rb1pYWmxiblJ6VEdsemRFTnZiblJoYVc1bGNpd2daV3hsYlNrN1hISmNiaUFnSUNCOUtUdGNjbHh1WEhKY2JpQWdJQ0IwYUdsekxtVnNaVzFsYm5RdVlYQndaVzVrUTJocGJHUW9aWFpsYm5SelRHbHpkQ2s3SUZ4eVhHNGdJQ0FnSUNBZ0lDOHZJTkMwMEw3UXNkQ3cwTExRdU5HQzBZd2cwWUhRdnRDeDBZdlJndEM0MExVZzBMSWcwTC9RdGRHQTBMWFF0TkN3MEwzUXZkR0wwTGtnUkU5TklOR04wTHZRdGRDODBMWFF2ZEdDWEhKY2JpQWdJQ0F2THlEUXY5QyswTExRdGRHQjBMalJndEdNSU5DOTBMQWcwTHJRdmRDKzBML1F1dEdESUdSbGJHVjBaVVYyWlc1MFhISmNiaUFnZlZ4eVhHNTlYSEpjYmx4eVhHNHZMMlY0Y0c5eWRDQmtaV1poZFd4MElFVjJaVzUwTzF4eVhHNHZLaXBjY2x4dUlDb2dRMnhoYzNNZ2NtVndjbVZ6Wlc1MGFXNW5JR0VnWlhabGJuUmNjbHh1SUNvZ1FHTnNZWE56WEhKY2JpQXFMMXh5WEc1amJHRnpjeUJGZG1WdWRDQjdYSEpjYmlBZ0x5b3FYSEpjYmlBZ0lDb2dRM0psWVhSbElHRWdaWFpsYm5SY2NseHVJQ0FnS2lCQVkyOXVjM1J5ZFdOMGIzSmNjbHh1SUNBZ0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ1pXeGxiV1Z1ZENBdElFUlBUU0JsYkdWdFpXNTBYSEpjYmlBZ0lDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHVjJaVzUwUkdGMFlTQXRJRVYyWlc1MElHUmhkR0ZjY2x4dUlDQWdLaTljY2x4dUlDQmpiMjV6ZEhKMVkzUnZjaWhsYkdWdFpXNTBMQ0JsZG1WdWRFUmhkR0VzSUdSaUtTQjdYSEpjYmlBZ0lDQjBhR2x6TG1Wc1pXMWxiblFnUFNCbGJHVnRaVzUwTzF4eVhHNGdJQ0FnZEdocGN5NWxkbVZ1ZEVSaGRHRWdQU0JsZG1WdWRFUmhkR0U3WEhKY2JpQWdJQ0IwYUdsekxuSmxibVJsY2tWMlpXNTBLQ2s3WEhKY2JpQWdmVnh5WEc1Y2NseHVJQ0F2S2lwY2NseHVJQ0FnSUNvZ1JHVnNaWFJsSUdWMlpXNTBYSEpjYmlBZ0lDQXFMMXh5WEc0Z0lHUmxiR1YwWlVWMlpXNTBLQ2tnZTF4eVhHNGdJQ0FnTHk4Z1pHSXVaR1ZzWlhSbFJYWmxiblFvYVdRcFhISmNiaUFnSUNBdkx5QnBaQ0RRc3RDMzBZL1JndEdNSU5DNDBMY2daWFpsYm5SRVlYUmhYSEpjYmlBZ2ZWeHlYRzVjY2x4dUlDQXZLaXBjY2x4dUlDQWdLaUJTWlc1a1pYSWdaWFpsYm5SY2NseHVJQ0FnS2k5Y2NseHVJQ0J5Wlc1a1pYSkZkbVZ1ZENncElIdGNjbHh1SUNBZ0lDOHZJTkMwMEw3UXNkQ3cwTExRdU5HQzBZd2cwWUhRdnRDeDBZdlJndEM0MExVZzBMSWcwTC9RdGRHQTBMWFF0TkN3MEwzUXZkR0wwTGtnUkU5TklOR04wTHZRdGRDODBMWFF2ZEdDWEhKY2JpQWdJQ0F2THlEUXY5QyswTExRdGRHQjBMalJndEdNSU5DOTBMQWcwTHJRdmRDKzBML1F1dEdESUdSbGJHVjBaVVYyWlc1MFhISmNiaUFnSUNCMllYSWdaWFpsYm5RZ1BTQmtiMk4xYldWdWRDNWpjbVZoZEdWRmJHVnRaVzUwS0NkRVNWWW5LVHRjY2x4dVhISmNiaUFnSUNCbGRtVnVkQzVqYkdGemMwNWhiV1VnUFNBblpYWmxiblFnWVd4bGNuUWdZV3hsY25RdFpHbHpiV2x6YzJsaWJHVWdZV3hsY25RdGMzVmpZMlZ6Y3ljN1hISmNiaUFnSUNCY2NseHVJQ0FnSUdWMlpXNTBMbWx1Ym1WeVNGUk5UQ0E5SjF4Y1hISmNiaUFnSUNBZ0lEeGlkWFIwYjI0Z1kyeGhjM005WENKamJHOXpaVndpUHNPWFBDOWlkWFIwYjI0K0lGeGNYSEpjYmlBZ0lDQWdJRHhrYVhZZ1kyeGhjM005WENKaGJHVnlkQzFzYVc1clhDSStQQzlrYVhZK0p6dGNjbHh1WEhKY2JpQWdJQ0JsZG1WdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0NjdVlXeGxjblF0YkdsdWF5Y3BMbWx1Ym1WeVNGUk5UQ0E5SUhSb2FYTXVaWFpsYm5SRVlYUmhMblJsZUhRN1hISmNiaUFnSUNCbGRtVnVkQzVwWkNBOUlIUm9hWE11WlhabGJuUkVZWFJoTG1sa08xeHlYRzRnSUNBZ1hISmNiaUFnSUNCMGFHbHpMbVZzWlcxbGJuUXVZWEJ3Wlc1a1EyaHBiR1FvWlhabGJuUXBPMXh5WEc0Z0lDQWdYSEpjYmlBZ2ZWeHlYRzU5WEhKY2JseHlYRzR2TDJWNGNHOXlkQ0JrWldaaGRXeDBJRVYyWlc1ME8xeHlYRzR2S2lwY2NseHVJQ0FxSUVOc1lYTnpJSEpsY0hKbGMyVnVkR2x1WnlCaGNIQWdhR1ZoWkdWeVhISmNiaUFnS2lCQVkyeGhjM05jY2x4dUlDQXFMMXh5WEc1Y2NseHVZMnhoYzNNZ1NHVmhaR1Z5SUh0Y2NseHVJQ0F2S2lwY2NseHVJQ0FnSUNvZ1EzSmxZWFJsSUdFZ2FHVmhaR1Z5WEhKY2JpQWdJQ0FxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0JsYkdWdFpXNTBJQzBnUkU5TklHVnNaVzFsYm5SY2NseHVJQ0FnSUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUhWelpYSWdMU0JWYzJWeUlHOWlhbVZqZEZ4eVhHNGdJQ0FnS2k5Y2NseHVJQ0JqYjI1emRISjFZM1J2Y2lobGJHVnRaVzUwTENCMWMyVnlLU0I3WEhKY2JpQWdJQ0IwYUdsekxtVnNaVzFsYm5RZ1BTQmxiR1Z0Wlc1ME8xeHlYRzRnSUNBZ2RHaHBjeTUxYzJWeUlEMGdkWE5sY2p0Y2NseHVJQ0FnSUhSb2FYTXVjbVZ1WkdWeVNHVmhaR1Z5S0NrN1hISmNiaUFnTHk4Z0lIUm9hWE11Y21WM2NtbDBaVTl1VEc5bmFXNG9LVHRjY2x4dUlDQjlYSEpjYmx4eVhHNGdJQzhxS2x4eVhHNGdJQ0FxSUZKbGJtUmxjaUJvWldGa1pYSmNjbHh1SUNBZ0tpOWNjbHh1SUNCeVpXNWtaWEpJWldGa1pYSW9LU0I3WEhKY2JseHlYRzRnSUNBZ0x5OGcwTDdSZ3RDKzBMSFJnTkN3MExiUXNOQzEwWUlnMFlYUXRkQ3cwTFRRdGRHQUlOR0JJTkdBMExEUXQ5QzkwWXZRdk5DNElOQzYwTDNRdnRDLzBMclFzTkM4MExnZzBMSWcwTGZRc05DeTBMalJnZEM0MEx6UXZ0R0IwWUxRdUZ4eVhHNGdJQ0FnTHk4ZzBMN1JnaURSZ3RDKzBMUFF2aURRdDlDdzBMdlF2dEN6MExqUXZkQzEwTDBnMFk3UXQ5QzEwWUFnMExqUXU5QzRJTkM5MExYUmdseHlYRzRnSUNBZ0x5OGcwTC9SZ05DNElOQzkwTERRdHRDdzBZTFF1TkM0SU5DOTBMQWcwTHJRdmRDKzBML1F1dEM0SU5DLzBMWFJnTkMxMFlYUXZ0QzAwTGpSZ3RHTUlOQzkwTEFnMFlIUmd0R0EwTERRdmRDNDBZYlJneURSZ05DMTBMUFF1TkdCMFlMUmdOQ3cwWWJRdU5DNElOQzQwTHZRdUNEUXN0R0wwTHZRdnRDejBMalF2ZEM0MExMUXNOR0MwWXdnMFk3UXQ5QzEwWURRc0Z4eVhHNGdJQ0FnTHk4Z2RYTmxjaTVzYjJkdmRYUW9LVHRjY2x4dUlDQWdJQzh2SU5DNElOR0MwTFJjY2x4dVhISmNiaUFnSUNBdkx5RFFzdEMrMExmUXZOQyswTGJRdmRDK0lOQyswTC9SZ3RDNDBMelFzTkM3MFl6UXZkQytJTkMxMExQUXZpRFF2dEdDMFlEUXRkQzkwTFRRdGRHQTBMalJndEdNSU5DKzBMVFF1TkM5SU5HQTBMRFF0eXdnMExnZzBMelF0ZEM5MFkvUmd0R01JTkdCMEw3UmdkR0MwTDdSajlDOTBMalF0U0RSaDlDMTBZRFF0ZEMzSUdWMlpXNTBJR0oxY3l4Y2NseHVJQ0FnSUM4dklOQzkwTDRnMEwvUXZ0QzYwTEFnMEwzUXRTRFF2OUMrMEwzUmo5R0MwTDNRdmlrcFhISmNibHh5WEc0Z0lDQWdkR2hwY3k1b1pXRmtaWElnUFNCa2IyTjFiV1Z1ZEM1amNtVmhkR1ZGYkdWdFpXNTBLQ2RFU1ZZbktUdGNjbHh1SUNBZ0lIUm9hWE11YUdWaFpHVnlMbU5zWVhOelRtRnRaU0E5SUNkdVlYWmlZWElnYm1GMlltRnlMV1JsWm1GMWJIUW5PMXh5WEc0Z0lDQWdkR2hwY3k1b1pXRmtaWEl1YVc1dVpYSklWRTFNSUQwZ0p6eGthWFlnWTJ4aGMzTTlYQ0pqYjI1MFlXbHVaWEl0Wm14MWFXUmNJajRnWEZ4Y2NseHVJQ0FnSUNBZ0lDQThaR2wySUdOc1lYTnpQVndpYm1GMlltRnlMV2hsWVdSbGNsd2lQaUJjWEZ4eVhHNGdJQ0FnSUNBZ0lDQWdQR0oxZEhSdmJpQjBlWEJsUFZ3aVluVjBkRzl1WENJZ1kyeGhjM005WENKdVlYWmlZWEl0ZEc5bloyeGxYQ0lnWkdGMFlTMTBiMmRuYkdVOVhDSmpiMnhzWVhCelpWd2lJR1JoZEdFdGRHRnlaMlYwUFZ3aUxtNWhkbUpoY2kxeVpYTndiMjV6YVhabExXTnZiR3hoY0hObFhDSStJRnhjWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJRHh6Y0dGdUlHTnNZWE56UFZ3aWFXTnZiaTFpWVhKY0lqNDhMM053WVc0K0lGeGNYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lEeHpjR0Z1SUdOc1lYTnpQVndpYVdOdmJpMWlZWEpjSWo0OEwzTndZVzQrSUZ4Y1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUR4emNHRnVJR05zWVhOelBWd2lhV052YmkxaVlYSmNJajQ4TDNOd1lXNCtJRnhjWEhKY2JpQWdJQ0FnSUNBZ0lDQThMMkoxZEhSdmJqNGdYRnhjY2x4dUlDQWdJQ0FnSUNBZ0lEeGhJR05zWVhOelBWd2libUYyWW1GeUxXSnlZVzVrWENJZ2FISmxaajFjSWlOY0lqNUliMjFsUEM5aFBpQmNYRnh5WEc0Z0lDQWdJQ0FnSUR3dlpHbDJQaUJjWEZ4eVhHNGdJQ0FnSUNBZ0lEeGthWFlnWTJ4aGMzTTlYQ0p1WVhaaVlYSXRZMjlzYkdGd2MyVWdZMjlzYkdGd2MyVWdibUYyWW1GeUxYSmxjM0J2Ym5OcGRtVXRZMjlzYkdGd2MyVmNJajRnWEZ4Y2NseHVJQ0FnSUNBZ0lDQWdJRHgxYkNCamJHRnpjejFjSW01aGRpQnVZWFppWVhJdGJtRjJYQ0krSUZ4Y1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUR4c2FTQmpiR0Z6Y3oxY0ltRmpkR2wyWlZ3aVBqeGhJR2h5WldZOVhDSnFZWFpoYzJOeWFYQjBPblp2YVdRb01DbGNJajVCWTNScGRtVThMMkUrUEM5c2FUNGdYRnhjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdQR3hwUGp4aElHaHlaV1k5WENKcVlYWmhjMk55YVhCME9uWnZhV1FvTUNsY0lqNU1hVzVyUEM5aFBqd3ZiR2srSUZ4Y1hISmNiaUFnSUNBZ0lDQWdJQ0E4TDNWc1BpQmNYRnh5WEc0Z0lDQWdJQ0FnSUNBZ1BIVnNJR05zWVhOelBWd2libUYySUc1aGRtSmhjaTF1WVhZZ2JtRjJZbUZ5TFhKcFoyaDBJRzE1TFhSdmNDMWlkWFIwYjI1elhDSStJRnhjWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJRHhzYVQ0OFluVjBkRzl1SUdOc1lYTnpQVndpWW5SdUlHSjBiaTF5WVdselpXUWdZblJ1TFdSaGJtZGxjaUJ0ZVMxMGIzQXRZblJ1WENJK1ZtbGxkeUJCYkd3OEwySjFkSFJ2Ymo0OEwyeHBQaUJjWEZ4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0E4YkdrK1BHSjFkSFJ2YmlCamJHRnpjejFjSW1KMGJpQmlkRzR0Y21GcGMyVmtJR0owYmkxa1lXNW5aWElnYlhrdGRHOXdMV0owYmlCdGVTMTBiM0F0Ykc5bmFXNHRZblJ1WENJK1RHOW5iM1YwUEM5aWRYUjBiMjQrUEM5c2FUNGdYRnhjY2x4dUlDQWdJQ0FnSUNBZ0lEd3ZkV3crSUZ4Y1hISmNiaUFnSUNBZ0lDQWdQQzlrYVhZK0lGeGNYSEpjYmlBZ0lDQWdJRHd2WkdsMlBpYzdYSEpjYmx4eVhHNGdJQ0FnZEdocGN5NWxiR1Z0Wlc1MExtbHVjMlZ5ZEVKbFptOXlaU2gwYUdsekxtaGxZV1JsY2l3Z2RHaHBjeTVsYkdWdFpXNTBMbU5vYVd4a1RtOWtaWE5iTUYwcE95QmNjbHh1SUNBZ0lIUm9hWE11Wld4bGJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtDY3ViWGt0ZEc5d0xXSjFkSFJ2Ym5NbktTNXpkSGxzWlM1a2FYTndiR0Y1SUQwZ0oyNXZibVVuTzF4eVhHNWNjbHh1SUNBZ0lIWmhjaUJ6Wld4bUlEMGdkR2hwY3p0Y2NseHVJQ0FnSUhSb2FYTXVaV3hsYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0NjdWJYa3RkRzl3TFd4dloybHVMV0owYmljcExtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0oyTnNhV05ySnl3Z1puVnVZM1JwYjI0b0tTQjdJSE5sYkdZdWNtVjNjbWwwWlU5dVRHOW5iM1YwS0NrN0lIMHBPMXh5WEc0Z0lIMWNjbHh1WEhKY2JpQWdjbVYzY21sMFpVOXVURzluYVc0b0tTQjdYSEpjYmlBZ0lDQXZMM1JvYVhNdVpXeGxiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLQ2N1YlhrdGRHOXdMV3h2WjJsdUxXSjBiaWNwTG1sdWJtVnlTRlJOVENBOUlDZE1iMmR2ZFhRbk8xeHlYRzRnSUNBZ2RHaHBjeTVsYkdWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb0p5NXRlUzEwYjNBdFluVjBkRzl1Y3ljcExuTjBlV3hsTG1ScGMzQnNZWGtnUFNBbllteHZZMnNuTzF4eVhHNWNjbHh1SUNCOVhISmNibHh5WEc0Z0lISmxkM0pwZEdWUGJreHZaMjkxZENncElIdGNjbHh1SUNBZ0lDOHZkR2hwY3k1bGJHVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9KeTV0ZVMxMGIzQXRiRzluYVc0dFluUnVKeWt1YVc1dVpYSklWRTFNSUQwZ0oweHZaMmx1Snp0Y2NseHVJQ0FnSUM4dlpHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWduTG1admNtMHRjMmxuYm1sdUp5a3VjbVZ6WlhRb0tUdGNjbHh1SUNBZ0lIUm9hWE11Wld4bGJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtDY3ViWGt0ZEc5d0xXSjFkSFJ2Ym5NbktTNXpkSGxzWlM1a2FYTndiR0Y1SUQwZ0oyNXZibVVuTzF4eVhHNGdJQ0FnWkc5amRXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNpZ25MbXh2WjJsdUp5a3VjM1I1YkdVdVpHbHpjR3hoZVNBOUlDZGliRzlqYXljN1hISmNiaUFnSUNCallXd3VhR2xrWlNncE8xeHlYRzRnSUNBZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWduTG1admNtMHRjMmxuYm1sdUp5a3VjbVZ6WlhRb0tUdGNjbHh1SUNCOVhISmNibHh5WEc1Y2NseHVmVnh5WEc1Y2NseHVMeTlsZUhCdmNuUWdaR1ZtWVhWc2RDQklaV0ZrWlhJN1hISmNiaThxS2x4eVhHNGdJQ29nUTJ4aGMzTWdjbVZ3Y21WelpXNTBhVzVuSUdGd2NDQm1iMjkwWlhKY2NseHVJQ0FxSUVCamJHRnpjMXh5WEc0Z0lDb3ZYSEpjYmx4eVhHNWpiR0Z6Y3lCR2IyOTBaWElnZTF4eVhHNGdJQzhxS2x4eVhHNGdJQ0FnS2lCRGNtVmhkR1VnWVNCbWIyOTBaWEpjY2x4dUlDQWdJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJR1ZzWlcxbGJuUWdMU0JFVDAwZ1pXeGxiV1Z1ZEZ4eVhHNGdJQ0FnS2k5Y2NseHVJQ0JqYjI1emRISjFZM1J2Y2lobGJHVnRaVzUwTENCMWMyVnlLU0I3WEhKY2JpQWdJQ0IwYUdsekxtVnNaVzFsYm5RZ1BTQmxiR1Z0Wlc1ME8xeHlYRzRnSUNBZ2RHaHBjeTV5Wlc1a1pYSkdiMjkwWlhJb0tUdGNjbHh1SUNCOVhISmNibHh5WEc0Z0lDOHFLbHh5WEc0Z0lDQXFJRkpsYm1SbGNpQm1iMjkwWlhKY2NseHVJQ0FnS2k5Y2NseHVJQ0J5Wlc1a1pYSkdiMjkwWlhJb0tTQjdYSEpjYmlBZ0lDQjBhR2x6TG1admIzUmxjaUE5SUdSdlkzVnRaVzUwTG1OeVpXRjBaVVZzWlcxbGJuUW9KMFpQVDFSRlVpY3BPMXh5WEc0Z0lDQWdkR2hwY3k1bWIyOTBaWEl1YVc1dVpYSklWRTFNSUQwZ0p5WmpiM0I1T3lBeU1ERTNJRTE1SUhSbFlXMGdTbE1nWTJGc1pXNWtZWEl1SUVGc2JDQnlhV2RvZEhNZ2NtVnpaWEoyWldRdUlFMWhhMlVnZDJsMGFDQnNiM1psSUR4emNHRnVQdUtkcER3dmMzQmhiajRuTzF4eVhHNGdJQ0FnZEdocGN5NWxiR1Z0Wlc1MExtRndjR1Z1WkVOb2FXeGtLSFJvYVhNdVptOXZkR1Z5S1RzZ1hISmNiaUFnZlZ4eVhHNTlYSEpjYmk4cUtseHlYRzRnS2lCRGJHRnpjeUJ5WlhCeVpYTmxiblJwYm1jZ2JHOW5hVzRnWm05eWJWeHlYRzRnS2lCQVkyeGhjM05jY2x4dUlDb3ZYSEpjYm1Oc1lYTnpJRXh2WjJsdVJtOXliU0I3WEhKY2JseHlYRzRnSUNBZ0x5b3FYSEpjYmlBZ0lDQWdLaUJEY21WaGRHVWdZU0JzYjJkcGJpQm1iM0p0WEhKY2JpQWdJQ0FnS2lCQVkyOXVjM1J5ZFdOMGIzSmNjbHh1SUNBZ0lDQXFMMXh5WEc0Z0lDQWdZMjl1YzNSeWRXTjBiM0lvWld4bGJXVnVkQ3dnWkdJcElIdGNjbHh1SUNBZ0lDQWdJQ0IwYUdsekxtVnNaVzFsYm5RZ1BTQmxiR1Z0Wlc1ME8xeHlYRzRnSUNBZ0lDQWdJSFJvYVhNdVpHSWdQU0JrWWp0Y2NseHVJQ0FnSUNBZ0lDQjBhR2x6TG5KbGJtUmxja3h2WjJsdVJtOXliU2dwTzF4eVhHNGdJQ0FnSUNBZ0lIUm9hWE11YzJodmR5Z3BPMXh5WEc0Z0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUM4cUtseHlYRzRnSUNBZ0lDb2dTR0Z1Wkd4bElHeHZaMmx1SUdadmNtMWNjbHh1SUNBZ0lDQXFMMXh5WEc0Z0lDQWdhR0Z1Wkd4bFUzVmliV2wwS0NrZ2UxeHlYRzRnSUNBZ0lDQWdJSFpoY2lCbGJXRnBiQ0E5SUhSb2FYTXViRzluYVc1R2IzSnRMbkYxWlhKNVUyVnNaV04wYjNJb0oybHVjSFYwVzI1aGJXVTlYQ0oxYzJWeWJtRnRaVndpWFNjcExuWmhiSFZsTzF4eVhHNGdJQ0FnSUNBZ0lIWmhjaUJ3WVhOeklEMGdkR2hwY3k1c2IyZHBia1p2Y20wdWNYVmxjbmxUWld4bFkzUnZjaWduYVc1d2RYUmJibUZ0WlQxY0luQmhjM04zYjNKa1hDSmRKeWt1ZG1Gc2RXVTdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lGQnliMjFwYzJVdWNtVnpiMngyWlNncFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUM1MGFHVnVLQ2dwSUQwK0lHWnBjbVZpWVhObExtRjFkR2dvS1M1emFXZHVTVzVYYVhSb1JXMWhhV3hCYm1SUVlYTnpkMjl5WkNobGJXRnBiQ3dnY0dGemN5a3BYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDNWpZWFJqYUNnb0tTQTlQaUJtYVhKbFltRnpaUzVoZFhSb0tDa3VZM0psWVhSbFZYTmxjbGRwZEdoRmJXRnBiRUZ1WkZCaGMzTjNiM0prS0dWdFlXbHNMQ0J3WVhOektTbGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0xuUm9aVzRvS0NrZ1BUNGdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYkdWMElIVnpaWElnUFNCbWFYSmxZbUZ6WlM1aGRYUm9LQ2t1WTNWeWNtVnVkRlZ6WlhJN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnNaWFFnZFdsa08xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkV2xrSUQwZ2RYTmxjaTUxYVdRN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnWTJGc1pXNWtZWEpEYjI1MFlXbHVaWElnUFNCa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLQ2N1WTJGc1pXNWtZWEl0WTI5dWRHRnBibVZ5SnlrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnWTJGc0lEMGdibVYzSUVOaGJHVnVaR0Z5S0dOaGJHVnVaR0Z5UTI5dWRHRnBibVZ5S1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTmhiQzV6YUc5M0tDazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxtaHBaR1VvS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDOHZiRzlqWVhScGIyNHVhR0Z6YUNBOUlGd2liVzl1ZEdoc2VWWnBaWGRjSWp0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lITmxjM05wYjI1VGRHOXlZV2RsTG5ObGRFbDBaVzBvWENKamRYSnlaVzUwVlhObGNsd2lMQ0JsYldGcGJDazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J6WlhOemFXOXVVM1J2Y21GblpTNXpaWFJKZEdWdEtGd2lhMlY1WENJc0lIVnBaQ2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTQ3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSDBwWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQzVqWVhSamFDZ29LU0E5UGlCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TG1oaGJtUnNaVmR5YjI1blVHRnpjM2R2Y21Rb0tUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb0p5NW1iM0p0TFhOcFoyNXBiaWNwTG5KbGMyVjBLQ2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSDBwTzF4eVhHNWNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0x5OGdhV1lnS0hWelpYSXViRzluYVc0b2RYTmxjazVoYldVc0lIVnpaWEpRWVhOemQyOXlaQ2twSUh0Y2NseHVJQ0FnSUNBZ0lDQXZMeUFnSUdSaUlEMGdibVYzSUVSQ0tIVnpaWEpPWVcxbEtUdGNjbHh1WEhKY2JseHlYRzRnSUNBZ0lDQWdJQzh2SUNBZ2RHaHBjeTVvWVc1a2JHVkRiM0p5WldOMFVHRnpjM2R2Y21Rb0tUdGNjbHh1SUNBZ0lDQWdJQ0F2THlCOUlHVnNjMlVnZTF4eVhHNGdJQ0FnSUNBZ0lDOHZJQ0FnZEdocGN5NW9ZVzVrYkdWWGNtOXVaMUJoYzNOM2IzSmtLQ2s3WEhKY2JpQWdJQ0FnSUNBZ0x5OGdJQ0JrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtDY3VabTl5YlMxemFXZHVhVzRuS1M1eVpYTmxkQ2dwTzF4eVhHNGdJQ0FnSUNBZ0lDOHZJSDFjY2x4dVhISmNiaUFnSUNCOVhISmNibHh5WEc0Z0lDQWdhR0Z1Wkd4bFYzSnZibWRRWVhOemQyOXlaQ2dwSUh0Y2NseHVJQ0FnSUNBZ0lDQjBhR2x6TG1Wc1pXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNpZ25hVzV3ZFhSYmJtRnRaVDFjSW5CaGMzTjNiM0prWENKZEp5a3VjR3hoWTJWb2IyeGtaWElnUFNBblYzSnZibWNnY0dGemMzZHZjbVFoSUZSeWVTQmhaMkZwYmljN1hISmNiaUFnSUNBZ0lDQWdkR2hwY3k1bGJHVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9KMmx1Y0hWMFcyNWhiV1U5WENKd1lYTnpkMjl5WkZ3aVhTY3BMbU5zWVhOelRtRnRaU0E5SUNkbWIzSnRMV052Ym5SeWIyd2diWGt0Ykc5bmFXNGdkM0p2Ym1jdGNHRnpjeWM3WEhKY2JpQWdJQ0I5WEhKY2JseHlYRzRnSUNBZ2FHRnVaR3hsUTI5eWNtVmpkRkJoYzNOM2IzSmtLQ2tnZTF4eVhHNGdJQ0FnSUNBZ0lIUm9hWE11Wld4bGJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtDZHBibkIxZEZ0dVlXMWxQVndpY0dGemMzZHZjbVJjSWwwbktTNXdiR0ZqWldodmJHUmxjaUE5SUNkUVlYTnpkMjl5WkNjN1hISmNiaUFnSUNBZ0lDQWdkR2hwY3k1bGJHVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9KMmx1Y0hWMFcyNWhiV1U5WENKd1lYTnpkMjl5WkZ3aVhTY3BMbU5zWVhOelRtRnRaU0E5SUNkbWIzSnRMV052Ym5SeWIyd2diWGt0Ykc5bmFXNG5PMXh5WEc0Z0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUhKbGJtUmxja3h2WjJsdVJtOXliU2dwSUh0Y2NseHVJQ0FnSUNBZ0lDQXZMeURRdnRHQzBZRFF0ZEM5MExUUXRkR0EwTGpSZ3RHTUlOR0UwTDdSZ05DODBZTmNjbHh1SUNBZ0lDQWdJQ0F2THlEUXY5QyswTExRdGRHQjBMalJndEdNSU5DOTBMQWcwWVRRdnRHQTBMelJneUJvWVc1a2JHVlRkV0p0YVhSY2NseHVJQ0FnSUNBZ0lDQjBhR2x6TG14dloybHVSbTl5YlNBOUlHUnZZM1Z0Wlc1MExtTnlaV0YwWlVWc1pXMWxiblFvSjBSSlZpY3BPMXh5WEc0Z0lDQWdJQ0FnSUhSb2FYTXViRzluYVc1R2IzSnRMbU5zWVhOelRtRnRaU0E5SUNkamIyNTBZV2x1WlhJZ2JHOW5hVzRuTzF4eVhHNGdJQ0FnSUNBZ0lIUm9hWE11Ykc5bmFXNUdiM0p0TG1sdWJtVnlTRlJOVENBOUlDYzhabTl5YlNCamJHRnpjejFjSW1admNtMHRjMmxuYm1sdVhDSStJRnhjWEhKY2JpQWdJQ0E4YURJZ1kyeGhjM005WENKbWIzSnRMWE5wWjI1cGJpMW9aV0ZrYVc1blhDSStURzluSUVsdVBDOW9NajRnWEZ4Y2NseHVJQ0FnSUR4cGJuQjFkQ0IwZVhCbFBWd2lkR1Y0ZEZ3aUlHTnNZWE56UFZ3aVptOXliUzFqYjI1MGNtOXNJRzE1TFd4dloybHVYQ0lnYm1GdFpUMWNJblZ6WlhKdVlXMWxYQ0lnY0d4aFkyVm9iMnhrWlhJOVhDSkZiV0ZwYkNCQlpHUnlaWE56WENJZ2NtVnhkV2x5WldROVhDSmNJaUJoZFhSdlptOWpkWE05WENKY0lpOCtJRnhjWEhKY2JpQWdJQ0E4YVc1d2RYUWdkSGx3WlQxY0luQmhjM04zYjNKa1hDSWdZMnhoYzNNOVhDSm1iM0p0TFdOdmJuUnliMndnYlhrdGJHOW5hVzVjSWlCdVlXMWxQVndpY0dGemMzZHZjbVJjSWlCd2JHRmpaV2h2YkdSbGNqMWNJbEJoYzNOM2IzSmtYQ0lnY21WeGRXbHlaV1E5WENKY0lpOCtJRnhjWEhKY2JpQWdJQ0E4WW5WMGRHOXVJR05zWVhOelBWd2lZblJ1SUdKMGJpMXNaeUJpZEc0dFlteHZZMnNnYlhrdGJHOW5hVzR0WW5SdVhDSWdkSGx3WlQxY0ltSjFkSFJ2Ymx3aVBreHZaMmx1UEM5aWRYUjBiMjQrSUZ4Y1hISmNiaUFnSUNBOEwyWnZjbTArSnp0Y2NseHVJQ0FnSUNBZ0lDQjBhR2x6TG1Wc1pXMWxiblF1WVhCd1pXNWtRMmhwYkdRb2RHaHBjeTVzYjJkcGJrWnZjbTBwTzF4eVhHNGdJQ0FnSUNBZ0lIWmhjaUJ6Wld4bUlEMGdkR2hwY3p0Y2NseHVJQ0FnSUNBZ0lDQjBhR2x6TG1Wc1pXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNpZ25MbTE1TFd4dloybHVMV0owYmljcExtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0oyTnNhV05ySnl3Z1puVnVZM1JwYjI0Z0tHVjJaVzUwS1NCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUdWMlpXNTBMbkJ5WlhabGJuUkVaV1poZFd4MEtDazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lITmxiR1l1YUdGdVpHeGxVM1ZpYldsMEtDazdYSEpjYmlBZ0lDQWdJQ0FnZlNrN1hISmNiaUFnSUNCOVhISmNibHh5WEc0Z0lDQWdjMmh2ZHlncElIdGNjbHh1SUNBZ0lDQWdJQ0IwYUdsekxteHZaMmx1Um05eWJTNXpkSGxzWlM1a2FYTndiR0Y1SUQwZ0oySnNiMk5ySnp0Y2NseHVJQ0FnSUNBZ0lDQm9aV0ZrWlhJdWNtVjNjbWwwWlU5dVRHOW5iM1YwS0NrN1hISmNiaUFnSUNCOVhISmNibHh5WEc0Z0lDQWdhR2xrWlNncElIdGNjbHh1SUNBZ0lDQWdJQ0IwYUdsekxteHZaMmx1Um05eWJTNXpkSGxzWlM1a2FYTndiR0Y1SUQwZ0oyNXZibVVuTzF4eVhHNGdJQ0FnSUNBZ0lHaGxZV1JsY2k1eVpYZHlhWFJsVDI1TWIyZHBiaWdwTzF4eVhHNWNjbHh1SUNBZ0lIMWNjbHh1ZlZ4eVhHNWNjbHh1THk5bGVIQnZjblFnWkdWbVlYVnNkQ0JEYjIxdFpXNTBSbTl5YlR0Y2NseHVMeW9xWEhKY2JpQWdLaUJEYkdGemN5QnlaWEJ5WlhObGJuUnBibWNnWTI5dGJXVnVkQ0JtYjNKdFhISmNiaUFnS2lCQVkyeGhjM05jY2x4dUlDQXFMMXh5WEc1amJHRnpjeUJGZG1WdWRFVmthWFJHYjNKdElIdGNjbHh1WEhKY2JpQWdMeW9xWEhKY2JpQWdJQ0FxSUVOeVpXRjBaU0JoSUdOdmJXMWxiblFnWm05eWJWeHlYRzRnSUNBZ0tpQkFZMjl1YzNSeWRXTjBiM0pjY2x4dUlDQWdJQ292WEhKY2JpQWdZMjl1YzNSeWRXTjBiM0lvWld4bGJXVnVkQ3dnWkdJcElIdGNjbHh1SUNBZ0lIUm9hWE11Wld4bGJXVnVkQ0E5SUdWc1pXMWxiblE3WEhKY2JpQWdJQ0IwYUdsekxtUmlJRDBnWkdJN1hISmNiaUFnSUNBdkwzUm9hWE11WlhabGJuUkpaQ0E5SUdWMlpXNTBTV1E3WEhKY2JpQWdJQ0IwYUdsekxuSmxibVJsY2tWMlpXNTBSV1JwZEVadmNtMG9LVHRjY2x4dUlDQjlYSEpjYmx4eVhHNGdJQzhxS2x4eVhHNGdJQ0FnS2lCSVlXNWtiR1VnYzNWaWJXbDBJR1p2Y20xY2NseHVJQ0FnSUNvdlhISmNiaUFnYUdGdVpHeGxVM1ZpYldsMEtDa2dlMXh5WEc0Z0lDQWdMeTlrWldKMVoyZGxjanRjY2x4dUlDQWdJSFJvYVhNdVpYWmxiblF1ZEdWNGRDQTlJSFJvYVhNdVpYWmxiblJHYjNKdExuRjFaWEo1VTJWc1pXTjBiM0lvSnk1amIyNTBaVzUwSnlrdWFXNXVaWEpJVkUxTU8xeHlYRzRnSUNBZ2FXWWdLSFJvYVhNdVpYWmxiblF1YVdRcElIdGNjbHh1SUNBZ0lDQWdaR0l1ZFhCa1lYUmxSWFpsYm5Rb2RHaHBjeTVsZG1WdWRDazdYSEpjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHlYRzRnSUNBZ0lDQmtZaTV6WVhabFJYWmxiblJKYmtSQ0tIUm9hWE11WlhabGJuUXVkR1Y0ZEN3Z2RHaHBjeTVsZG1WdWRDNWpaV3hzU1dRcFhISmNiaUFnSUNBZ0lDOHZJR1JpTG1Ga1pFVjJaVzUwS0hSb2FYTXVaWFpsYm5RcE8xeHlYRzRnSUNBZ2ZWeHlYRzRnSUNBZ2RHaHBjeTVsZG1WdWRFWnZjbTB1YzNSNWJHVXVaR2x6Y0d4aGVTQTlJQ2R1YjI1bEp6dGNjbHh1SUNBZ0lHTmhiQzV5Wlc1a1pYSW9LVHRjY2x4dUlDQWdJQzh2SU5HQjBMN1FzZEdBMExEUmd0R01JTkMwMExEUXZkQzkwWXZRdFNEUmdTRFJoTkMrMFlEUXZOR0xYSEpjYmlBZ0lDQXZMeURRdnRHQzBML1JnTkN3MExMUXVOR0MwWXdnMExqUmhWeHlYRzRnSUNBZ0x5OGdaR0l1WVdSa1EyOXRiV1Z1ZENncFhISmNiaUFnSUNBdkx5RFF2dEdDMFlmUXVOR0IwWUxRdU5HQzBZd2cwWVRRdnRHQTBMelJnMXh5WEc0Z0lDQWdMeThnMEw3UXNkQzkwTDdRc3RDNzBZL1JndEdNSU5HQjBML1F1TkdCMEw3UXVpRFF1dEMrMEx6UXZOQzEwTDNSZ3RDdzBZRFF1TkMxMExJZzBMTFJnTkMrMExUUXRTRFF2ZEMxSU5DOTBZUFF0dEM5MEw0c0lHWnBjbVZpWVhObElOQyswTEhRdmRDKzBMTFF1TkdDSU5DNDBZVWcwWUhRc05DODBMQmNjbHh1SUNCOVhISmNibHh5WEc0Z0lHaGhibVJzWlVSbGJHVjBaU2dwSUh0Y2NseHVJQ0FnSUhSb2FYTXVaWFpsYm5SR2IzSnRMbk4wZVd4bExtUnBjM0JzWVhrZ1BTQW5ibTl1WlNjN1hISmNiaUFnSUNCallXd3VjbVZ1WkdWeUtDazdYSEpjYmlBZ2ZWeHlYRzVjY2x4dUlDQnphRzkzUlhabGJuUkRjbVZoZEdWR2IzSnRLR05sYkd4SlpDa2dlMXh5WEc0Z0lDQWdkR2hwY3k1bGRtVnVkRVp2Y20wdWMzUjViR1V1WkdsemNHeGhlU0E5SUNkaWJHOWpheWM3WEhKY2JpQWdJQ0IwYUdsekxtVjJaVzUwSUQwZ2V5QjBaWGgwT2lBbkp5d2dZMlZzYkVsa09pQmpaV3hzU1dRZ2ZUdGNjbHh1SUNBZ0lIUm9hWE11WlhabGJuUkdiM0p0TG5GMVpYSjVVMlZzWldOMGIzSW9KeTVqYjI1MFpXNTBKeWt1YVc1dVpYSklWRTFNSUQwZ2RHaHBjeTVsZG1WdWRDNTBaWGgwTzF4eVhHNGdJSDFjY2x4dVhISmNibHh5WEc0Z0lITm9iM2RGZG1WdWRFVmthWFJHYjNKdEtHVjJaVzUwU1dRcElIdGNjbHh1SUNBZ0lIUm9hWE11WlhabGJuUkdiM0p0TG5OMGVXeGxMbVJwYzNCc1lYa2dQU0FuWW14dlkyc25PMXh5WEc0Z0lDQWdkR2hwY3k1bGRtVnVkQ0E5SUdSaUxteHZZV1JGZG1WdWRDaGxkbVZ1ZEVsa0tUdGNjbHh1SUNBZ0lIUm9hWE11WlhabGJuUkdiM0p0TG5GMVpYSjVVMlZzWldOMGIzSW9KeTVqYjI1MFpXNTBKeWt1YVc1dVpYSklWRTFNSUQwZ2RHaHBjeTVsZG1WdWRDNTBaWGgwTzF4eVhHNGdJSDFjY2x4dVhISmNiaUFnY21WdVpHVnlSWFpsYm5SRlpHbDBSbTl5YlNncElIdGNjbHh1SUNBZ0lDOHZJTkMrMFlMUmdOQzEwTDNRdE5DMTBZRFF1TkdDMFl3ZzBZVFF2dEdBMEx6UmcxeHlYRzRnSUNBZ0x5OGcwTC9RdnRDeTBMWFJnZEM0MFlMUmpDRFF2ZEN3SU5HRTBMN1JnTkM4MFlNZ2FHRnVaR3hsVTNWaWJXbDBYSEpjYmlBZ0lDQjBhR2x6TG1WMlpXNTBSbTl5YlNBOUlHUnZZM1Z0Wlc1MExtTnlaV0YwWlVWc1pXMWxiblFvSjBSSlZpY3BPMXh5WEc0Z0lDQWdkR2hwY3k1bGRtVnVkRVp2Y20wdVkyeGhjM05PWVcxbElEMGdKMlYyWlc1MExXUmxkR0ZwYkNCd1lXNWxiQ0J3WVc1bGJDMXBibVp2SUdWMlpXNTBMV1p2Y20wbk8xeHlYRzRnSUNBZ2RHaHBjeTVsZG1WdWRFWnZjbTB1YzNSNWJHVXVaR2x6Y0d4aGVTQTlJQ2R1YjI1bEp6dGNjbHh1SUNBZ0lIUm9hWE11WlhabGJuUkdiM0p0TG1sdWJtVnlTRlJOVENBOUp5QmNYRnh5WEc0Z0lDQWdQR1JwZGlCamJHRnpjejFjSW5CaGJtVnNMV2hsWVdScGJtZGNJajRnWEZ4Y2NseHVJQ0FnSUNBZ1BHZ3pJR05zWVhOelBWd2ljR0Z1Wld3dGRHbDBiR1ZjSWo1TmVTQnBiWEJ2Y25SaGJuUWdaWFpsYm5ROEwyZ3pQaUJjWEZ4eVhHNGdJQ0FnUEM5a2FYWStJRnhjWEhKY2JpQWdJQ0E4WkdsMklHTnNZWE56UFZ3aWNHRnVaV3d0WW05a2VWd2lQaUJjWEZ4eVhHNGdJQ0FnSUNBOGFHVmhaR1Z5UGlCY1hGeHlYRzRnSUNBZ0lDQWdJQ0FnUEdKMWRIUnZiaUJqYkdGemN6MWNJbUowYmlCaWRHNHRjbUZwYzJWa0lHSjBiaTFrWVc1blpYSmNJajVFWld4bGRHVThMMkoxZEhSdmJqNGdYRnhjY2x4dUlDQWdJQ0FnSUNBZ0lEeGlkWFIwYjI0Z1kyeGhjM005WENKaWRHNGdZblJ1TFhKaGFYTmxaQ0JpZEc0dGFXNW1iMXdpUGxOaGRtVThMMkoxZEhSdmJqNGdYRnhjY2x4dUlDQWdJQ0FnUEM5b1pXRmtaWEkrSUZ4Y1hISmNiaUFnSUNBZ0lEeGthWFlnWTJ4aGMzTTlYQ0pqYjI1MFpXNTBYQ0lnWTI5dWRHVnVkR1ZrYVhSaFlteGxQand2WkdsMlBseGNYSEpjYmlBZ0lDQThMMlJwZGo0bk8xeHlYRzVjY2x4dUlDQWdJSFJvYVhNdVpXeGxiV1Z1ZEM1aGNIQmxibVJEYUdsc1pDaDBhR2x6TG1WMlpXNTBSbTl5YlNrN1hISmNiaUFnSUNCMllYSWdjMlZzWmlBOUlIUm9hWE03WEhKY2JpQWdJQ0IwYUdsekxtVjJaVzUwUm05eWJTNXhkV1Z5ZVZObGJHVmpkRzl5S0NjdVluUnVMV2x1Wm04bktTNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZGpiR2xqYXljc0lHWjFibU4wYVc5dUtDa2dleUJ6Wld4bUxtaGhibVJzWlZOMVltMXBkQ2dwT3lCOUtUdGNjbHh1SUNBZ0lIUm9hWE11WlhabGJuUkdiM0p0TG5GMVpYSjVVMlZzWldOMGIzSW9KeTVpZEc0dFpHRnVaMlZ5SnlrdVlXUmtSWFpsYm5STWFYTjBaVzVsY2lnblkyeHBZMnNuTENCbWRXNWpkR2x2YmlncElIc2djMlZzWmk1b1lXNWtiR1ZFWld4bGRHVW9LVHNnZlNrN1hISmNibHh5WEc0Z0lIMWNjbHh1ZlZ4eVhHNWNjbHh1THk5bGVIQnZjblFnWkdWbVlYVnNkQ0JEYjIxdFpXNTBSbTl5YlR0Y2NseHVMeW9xWEhKY2JpQXFJRU5zWVhOeklISmxjSEpsYzJWdWRHbHVaeUJrWVhSaFltRnpaVnh5WEc0Z0tpQkFZMnhoYzNOY2NseHVJQ292WEhKY2JtTnNZWE56SUVSQ0lIdGNjbHh1SUNBZ0lDOHFLbHh5WEc0Z0lDQWdJQ29nUTNKbFlYUmxJR0VnWkdGMFlXSmhjMlVnYjJKcVpXTjBYSEpjYmlBZ0lDQWdLaUJBWTI5dWMzUnlkV04wYjNKY2NseHVJQ0FnSUNBcUlFQndZWEpoYlNCN1UzUnlhVzVuZlNCQlVFa2dMU0JCVUVrZ1ptOXlJSEpsY1hWbGMzUnpYSEpjYmlBZ0lDQWdLaTljY2x4dUlDQWdJR052Ym5OMGNuVmpkRzl5S0hWelpYSXBJSHRjY2x4dUlDQWdJQ0FnSUNCMGFHbHpMbVYyWlc1MGMxTjBiM0poWjJWSmRHVnRJRDBnWENKTldVVldUbFJmWENJZ0t5QjFjMlZ5TzF4eVhHNGdJQ0FnZlZ4eVhHNWNjbHh1SUNBZ0lDOHFLbHh5WEc0Z0lDQWdJQ29nVEc5aFpDQmhiR3dnWlhabGJuUnpYSEpjYmlBZ0lDQWdLaUJBY21WMGRYSnVjeUI3VUhKdmJXbHpaWDFjY2x4dUlDQWdJQ0FxTDF4eVhHNGdJQ0FnYkc5aFpFVjJaVzUwY3lncElIdGNjbHh1SUNBZ0lDQWdJQ0F2TDJSbFluVm5aMlZ5TzF4eVhHNGdJQ0FnSUNBZ0lIWmhjaUJxYzI5dUlEMGdiRzlqWVd4VGRHOXlZV2RsTG1kbGRFbDBaVzBvZEdocGN5NWxkbVZ1ZEhOVGRHOXlZV2RsU1hSbGJTazdYSEpjYmlBZ0lDQWdJQ0FnZG1GeUlHUmhkR0VnUFNCS1UwOU9MbkJoY25ObEtHcHpiMjRnZkh3Z1hDSmJYVndpS1R0Y2NseHVJQ0FnSUNBZ0lDQnlaWFIxY200Z1pHRjBZVHRjY2x4dUlDQWdJSDFjY2x4dVhISmNiaUFnSUNBdktpcGNjbHh1SUNBZ0lDQXFJRXh2WVdRZ1pYWmxiblFnWW5rZ1NVUmNjbHh1SUNBZ0lDQXFJRUJ3WVhKaGJTQjdVM1J5YVc1bmZTQnBaQ0F0SUVsRUlHOW1JR1YyWlc1MFhISmNiaUFnSUNBZ0tpQkFjbVYwZFhKdWN5QjdVSEp2YldselpYMWNjbHh1SUNBZ0lDQXFMMXh5WEc0Z0lDQWdiRzloWkVWMlpXNTBLR2xrS1NCN1hISmNiaUFnSUNBZ0lDQWdkbUZ5SUdGc2JDQTlJSFJvYVhNdWJHOWhaRVYyWlc1MGN5Z3BPMXh5WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJoYkd3dVptbHVaQ2htZFc1amRHbHZiaUFvY0NrZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnY0M1cFpDQTlQU0JwWkR0Y2NseHVJQ0FnSUNBZ0lDQjlLVHRjY2x4dUlDQWdJSDFjY2x4dVhISmNibHh5WEc0Z0lDQWdiRzloWkVWMlpXNTBjMEo1UkdGMFpTaGtZWFJsS1NCN1hISmNiaUFnSUNBZ0lDQWdMeTlrWldKMVoyZGxjanRjY2x4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnZEdocGN5NXNiMkZrUlhabGJuUnpLQ2t1Wm1sc2RHVnlLSEFnUFQ0Z2NDNWpaV3hzU1dRZ1BUMDlJR1JoZEdVcE8xeHlYRzRnSUNBZ2ZWeHlYRzVjY2x4dUlDQWdJSE5oZG1WQmJHd29aWFpsYm5SektTQjdYSEpjYmlBZ0lDQWdJQ0FnYkc5allXeFRkRzl5WVdkbExuTmxkRWwwWlcwb2RHaHBjeTVsZG1WdWRITlRkRzl5WVdkbFNYUmxiU3dnU2xOUFRpNXpkSEpwYm1kcFpua29aWFpsYm5SektTazdYSEpjYmlBZ0lDQjlYSEpjYmx4eVhHNGdJQ0FnTHlvcVhISmNiaUFnSUNBZ0tpQkJaR1FnYm1WM0lHVjJaVzUwWEhKY2JpQWdJQ0FnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnWlhabGJuUkVZWFJoSUMwZ2RHbDBiR1VzSUdSbGMyTnlhWEIwYVc5dUxDQmtZWFJsTENCemRHRjBkWE1zSUdOdmJXMWxiblJ6TGk0dVhISmNiaUFnSUNBZ0tpQkFjbVYwZFhKdWN5QjdVSEp2YldselpYMWNjbHh1SUNBZ0lDQXFMMXh5WEc0Z0lDQWdZV1JrUlhabGJuUW9aWFpsYm5SRVlYUmhLU0I3WEhKY2JpQWdJQ0FnSUNBZ2RtRnlJR0ZzYkNBOUlIUm9hWE11Ykc5aFpFVjJaVzUwY3lncElIeDhJRnRkTzF4eVhHNGdJQ0FnSUNBZ0lHVjJaVzUwUkdGMFlTNXBaQ0E5SUc1bGR5QkVZWFJsS0NrdVoyVjBWR2x0WlNncE8xeHlYRzRnSUNBZ0lDQWdJR0ZzYkM1d2RYTm9LR1YyWlc1MFJHRjBZU2s3WEhKY2JpQWdJQ0FnSUNBZ2RHaHBjeTV6WVhabFFXeHNLR0ZzYkNrN1hISmNiaUFnSUNCOVhISmNibHh5WEc0Z0lDQWdjMkYyWlVWMlpXNTBTVzVFUWloMFlYTnJWR2wwYkdVc0lHUmhkR1ZFWVhrcElIdGNjbHh1SUNBZ0lDQWdJQ0JzWlhRZ2EyVjVJRDBnYzJWemMybHZibE4wYjNKaFoyVXVaMlYwU1hSbGJTaGNJbXRsZVZ3aUtUdGNjbHh1SUNBZ0lDQWdJQ0IyWVhJZ2NtVm1JRDBnWm1seVpXSmhjMlV1WkdGMFlXSmhjMlVvS1M1eVpXWW9LVHRjY2x4dUlDQWdJQ0FnSUNCc1pYUWdiMkpxTzF4eVhHNGdJQ0FnSUNBZ0lGQnliMjFwYzJVdWNtVnpiMngyWlNncFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUM1MGFHVnVLQ2dwSUQwK0lIUm9hWE11WTJobGExVnpaWElvYTJWNUxDQnlaV1lzSUc5aWFpa3BYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDNWpZWFJqYUNnb0tTQTlQaUIwYUdsekxtTnlaV0YwWlZOMGNuVmpkSFZ5WlNoclpYa3NJSEpsWml3Z2IySnFLU2xjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdMblJvWlc0b0tDa2dQVDVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVZV1JrUkdGMFlTaHJaWGtzSUhKbFppd2diMkpxTENCMFlYTnJWR2wwYkdVc0lHUmhkR1ZFWVhrcFhISmNiaUFnSUNBZ0lDQWdJQ0FnSUNsY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnTG1OaGRHTm9LR1Z5Y2lBOVBpQmpiMjV6YjJ4bExtVnljbTl5S0dWeWNpa3BPMXh5WEc0Z0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUdOb1pXdFZjMlZ5S0d0bGVTd2djbVZtTENCdlltb3BJSHRjY2x4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnYm1WM0lGQnliMjFwYzJVb0tISmxjMjlzZG1Vc0lISmxhbVZqZENrZ1BUNGdlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaV1l1YjI0b1hDSjJZV3gxWlZ3aUxDQm1kVzVqZEdsdmJpQW9jMjVoY0hOb2IzUXBJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUc5aWFpQTlJSE51WVhCemFHOTBMblpoYkNncE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdiMkpxSUQwZ2IySnFXMkFrZTJ0bGVYMWdYVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUlDZ2hiMkpxSUh4OElHOWlhaUE5UFNCdWRXeHNLU0J5WlhSMWNtNGdjbVZxWldOMEtDazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J5WlhOdmJIWmxLQ2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSDBwTzF4eVhHNGdJQ0FnSUNBZ0lIMHBPMXh5WEc0Z0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUdOeVpXRjBaVk4wY25WamRIVnlaU2hyWlhrc0lISmxaaXdnYjJKcUtTQjdYSEpjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJRzVsZHlCUWNtOXRhWE5sS0NoeVpYTnZiSFpsTENCeVpXcGxZM1FwSUQwK0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2IySnFJRDBnZTMwN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUc5aWFpQTlJRXBUVDA0dWMzUnlhVzVuYVdaNUtHOWlhaWs3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSEpsWmlBOUlHWnBjbVZpWVhObExtUmhkR0ZpWVhObEtDa3VjbVZtS0dBa2UydGxlWDB2WUNrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUhKbFppNXpaWFFvYjJKcUtUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUhKbGMyOXNkbVVvS1R0Y2NseHVJQ0FnSUNBZ0lDQjlLVHRjY2x4dUlDQWdJSDFjY2x4dVhISmNiaUFnSUNCaFpHUkVZWFJoS0d0bGVTd2djbVZtTENCdlltb3NJSFJoYzJ0VWFYUnNaU3dnWkdGMFpVUmhlU2tnZTF4eVhHNGdJQ0FnSUNBZ0lISmxaaTV2YmloY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnWENKMllXeDFaVndpTEZ4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0JtZFc1amRHbHZiaUFvYzI1aGNITm9iM1FwSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHOWlhaUE5SUhOdVlYQnphRzkwTG5aaGJDZ3BPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlMRnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQm1kVzVqZEdsdmJpQW9aWEp5YjNJcElIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR052Ym5OdmJHVXViRzluS0Z3aVJYSnliM0k2SUZ3aUlDc2daWEp5YjNJdVkyOWtaU2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSDFjY2x4dUlDQWdJQ0FnSUNBcE8xeHlYRzRnSUNBZ0lDQWdJRzlpYWlBOUlHOWlhbHRnSkh0clpYbDlZRjA3WEhKY2JpQWdJQ0FnSUNBZ2IySnFJRDBnU2xOUFRpNXdZWEp6WlNodlltb3BPMXh5WEc0Z0lDQWdJQ0FnSUd4bGRDQmhjbkpVYVhSc1pTQTlJRzlpYWx0Z0pIdGtZWFJsUkdGNWZXQmRPMXh5WEc0Z0lDQWdJQ0FnSUdsbUlDZ2hZWEp5VkdsMGJHVXBJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdiMkpxVzJBa2UyUmhkR1ZFWVhsOVlGMGdQU0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMGFYUnNaVG9nVzEwc1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjBaWGgwT2lCYlhTeGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR1J2Ym1VNklGdGRYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIMDdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lHRnljbFJwZEd4bElEMGdiMkpxVzJBa2UyUmhkR1ZFWVhsOVlGMHVkR2wwYkdVN1hISmNiaUFnSUNBZ0lDQWdmU0JsYkhObElIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ1lYSnlWR2wwYkdVZ1BTQnZZbXBiWUNSN1pHRjBaVVJoZVgxZ1hTNTBhWFJzWlR0Y2NseHVJQ0FnSUNBZ0lDQjlYSEpjYmlBZ0lDQWdJQ0FnTHk4Z2JHVjBJR0Z5Y2xSbGVIUWdQU0J2WW1wYllDUjdaR0YwWlVSaGVYMWdYUzUwWlhoME8xeHlYRzRnSUNBZ0lDQWdJR0Z5Y2xScGRHeGxMbkIxYzJnb2RHRnphMVJwZEd4bEtUdGNjbHh1SUNBZ0lDQWdJQ0F2TDJGeWNsUmxlSFF1Y0hWemFDaDBZWE5yUkdWelkzSnBjSFJwYjI0cE8xeHlYRzRnSUNBZ0lDQWdJRzlpYWlBOUlFcFRUMDR1YzNSeWFXNW5hV1o1S0c5aWFpazdYSEpjYmlBZ0lDQWdJQ0FnY21WbUlEMGdabWx5WldKaGMyVXVaR0YwWVdKaGMyVW9LUzV5WldZb1lDUjdhMlY1ZldBcE8xeHlYRzRnSUNBZ0lDQWdJSEpsWmk1elpYUW9iMkpxS1R0Y2NseHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2NtVnpiMngyWlNncE8xeHlYRzRnSUNBZ2ZWeHlYRzVjY2x4dUlDQWdJR3h2WVdSRmRtVnVkSE5HY205dFJFSW9LU0I3WEhKY2JpQWdJQ0FnSUNBZ2JHVjBJR3RsZVNBOUlITmxjM05wYjI1VGRHOXlZV2RsTG1kbGRFbDBaVzBvWENKclpYbGNJaWs3WEhKY2JpQWdJQ0FnSUNBZ2JHVjBJSEpsWmlBOUlHWnBjbVZpWVhObExtUmhkR0ZpWVhObEtDa3VjbVZtS0NrN1hISmNiaUFnSUNBZ0lDQWdiR1YwSUc5aWFqdGNjbHh1SUNBZ0lDQWdJQ0JRY205dGFYTmxMbkpsYzI5c2RtVW9LVnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQXVkR2hsYmlnb0tTQTlQaUIwYUdsekxteHZZV1JFWVhSaFJtOXlRMkZzWlc1bFpHRnlVbVZ1WkdGeUtHdGxlU3dnY21WbUxDQnZZbW9wS1Z4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0F1WTJGMFkyZ29LQ2tnUFQ0Z1lXeGxjblFvWENMUXQ5Q3cwTFBSZ05HRDBMZlF1dEN3WENJcEtUdGNjbHh1SUNBZ0lIMWNjbHh1WEhKY2JpQWdJQ0JzYjJGa1JHRjBZVVp2Y2tOaGJHVnVaV1JoY2xKbGJtUmhjaWhyWlhrc0lISmxaaXdnYjJKcUtTQjdYSEpjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJRzVsZHlCUWNtOXRhWE5sS0NoeVpYTnZiSFpsTENCeVpXcGxZM1FwSUQwK0lIdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVm1MbTl1S0Z4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1hDSjJZV3gxWlZ3aUxGeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdablZ1WTNScGIyNGdLSE51WVhCemFHOTBLU0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdiMkpxSUQwZ2MyNWhjSE5vYjNRdWRtRnNLQ2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdiMkpxSUQwZ2IySnFXMkFrZTJ0bGVYMWdYVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnZZbW9nUFNCS1UwOU9MbkJoY25ObEtHOWlhaWs3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdiR1YwSUdOaGJDQTlJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb1hDSjBZV0pzWlZ3aUtUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbWIzSWdLR3hsZENCa1lYUmxURzloWkNCcGJpQnZZbW9wSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2JHVjBJR3h2WVdSRVlYUmhJRDBnYjJKcVcyQWtlMlJoZEdWTWIyRmtmV0JkTG5ScGRHeGxPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JzWlhRZ2NtVnpJRDBnWTJGc0xuRjFaWEo1VTJWc1pXTjBiM0lvWUNNa2UyUmhkR1ZNYjJGa2ZXQXBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2NtVnpJQ0U5SUc1MWJHd3BJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2hzYjJGa1JHRjBZUzVzWlc1bmRHZ2dMU0F4SUQwOUlEQXBJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J5WlhNdWFXNXVaWEpJVkUxTUlDczlJR0E4WkdsMlBpUjdiRzloWkVSaGRHRjlQR0oxZEhSdmJpQmpiR0Z6Y3oxY0ltTnliM056WENJK1czaGRQQzlpZFhSMGIyNCtQQzlrYVhZK1lEdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgwZ1pXeHpaU0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWm05eUlDaDJZWElnYVNBOUlEQTdJR2tnUENCc2IyRmtSR0YwWVM1c1pXNW5kR2c3SUdrckt5a2dlMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCc1pYUWdaR0pCY25JZ1BTQnNiMkZrUkdGMFlUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WekxtbHVibVZ5U0ZSTlRDQXJQU0JnUEdScGRqNGtlMlJpUVhKeVcxeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1hYMDhZblYwZEc5dUlHTnNZWE56UFZ3aVkzSnZjM05jSWo1YmVGMDhMMkoxZEhSdmJqNDhMMlJwZGo1Z08xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J5WlhOdmJIWmxLQ2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOUxGeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdablZ1WTNScGIyNGdLR1Z5Y205eUtTQjdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVnFaV04wS0NrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lDazdYSEpjYmlBZ0lDQWdJQ0FnZlNrN1hISmNiaUFnSUNCOVhISmNibHh5WEc0Z0lDQWdaR1ZzWlhSbFJYWmxiblJKYmtSQ0tHUmhkR1ZFWVhrc0lIUmxlSFFwSUh0Y2NseHVJQ0FnSUNBZ0lDQnBaaUFvWkdGMFpVUmhlU0E5UFNCY0lsd2lLU0J5WlhSMWNtNDdYSEpjYmlBZ0lDQWdJQ0FnYkdWMElHdGxlU0E5SUhObGMzTnBiMjVUZEc5eVlXZGxMbWRsZEVsMFpXMG9YQ0pyWlhsY0lpazdYSEpjYmlBZ0lDQWdJQ0FnYkdWMElISmxaaUE5SUdacGNtVmlZWE5sTG1SaGRHRmlZWE5sS0NrdWNtVm1LQ2s3WEhKY2JpQWdJQ0FnSUNBZ2JHVjBJRzlpYWp0Y2NseHVJQ0FnSUNBZ0lDQlFjbTl0YVhObExuSmxjMjlzZG1Vb0tWeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBdWRHaGxiaWdvS1NBOVBpQjBhR2x6TG1SbGJFVjJaVzUwUm5KdmJVUkNLR3RsZVN3Z2NtVm1MQ0J2WW1vc0lHUmhkR1ZFWVhrc0lIUmxlSFFwS1Z4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0F1WTJGMFkyZ29LQ2tnUFQ0Z1lXeGxjblFvWENMUmc5QzAwTERRdTlDMTBMM1F1TkMxWENJcEtUdGNjbHh1SUNBZ0lIMWNjbHh1WEhKY2JpQWdJQ0JrWld4RmRtVnVkRVp5YjIxRVFpaHJaWGtzSUhKbFppd2diMkpxTENCa1lYUmxSR0Y1TENCMFpYaDBLU0I3WEhKY2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUc1bGR5QlFjbTl0YVhObEtDaHlaWE52YkhabExDQnlaV3BsWTNRcElEMCtJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdjbVZtTG05dUtGeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdYQ0oyWVd4MVpWd2lMRnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWm5WdVkzUnBiMjRnS0hOdVlYQnphRzkwS1NCN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYjJKcUlEMGdjMjVoY0hOb2IzUXVkbUZzS0NrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlMRnh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWm5WdVkzUnBiMjRnS0dWeWNtOXlLU0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZMjl1YzI5c1pTNXNiMmNvWENKRmNuSnZjam9nWENJZ0t5Qmxjbkp2Y2k1amIyUmxLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2NseHVJQ0FnSUNBZ0lDQWdJQ0FnS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnYjJKcUlEMGdiMkpxVzJBa2UydGxlWDFnWFR0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnYjJKcUlEMGdTbE5QVGk1d1lYSnpaU2h2WW1vcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCc1pYUWdhVzVrWlhnZ1BTQnZZbXBiWUNSN1pHRjBaVVJoZVgxZ1hTNTBhWFJzWlM1cGJtUmxlRTltS0hSbGVIUXBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQnZZbXBiWUNSN1pHRjBaVVJoZVgxZ1hTNTBhWFJzWlM1emNHeHBZMlVvYVc1a1pYZ3NJREVwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0J2WW1wYllDUjdaR0YwWlVSaGVYMWdYUzUwWlhoMExuTndiR2xqWlNocGJtUmxlQ3dnTVNrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUM4dklHOWlhbHRnSkh0a1lYUmxSR0Y1ZldCZExtUnZibVV1YzNCc2FXTmxLR2x1WkdWNExDQXhLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdiMkpxSUQwZ1NsTlBUaTV6ZEhKcGJtZHBabmtvYjJKcUtUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVm1JRDBnWm1seVpXSmhjMlV1WkdGMFlXSmhjMlVvS1M1eVpXWW9ZQ1I3YTJWNWZXQXBPMXh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaV1l1YzJWMEtHOWlhaWs3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJR052Ym5OdmJHVXViRzluS0c5aWFpazdYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCeVpYTnZiSFpsS0NrN1hISmNiaUFnSUNBZ0lDQWdmU2s3WEhKY2JpQWdJQ0I5WEhKY2JseHlYRzRnSUNBZ2RYQmtZWFJsUlhabGJuUW9aWFpsYm5RcElIdGNjbHh1SUNBZ0lDQWdJQ0IyWVhJZ1lXeHNJRDBnZEdocGN5NXNiMkZrUlhabGJuUnpLQ2s3WEhKY2JpQWdJQ0FnSUNBZ2RtRnlJR1p2ZFc1a0lEMGdZV3hzTG1acGJtUW9ablZ1WTNScGIyNGdLSEFwSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJSEF1YVdRZ1BUMGdaWFpsYm5RdWFXUTdYSEpjYmlBZ0lDQWdJQ0FnZlNrN1hISmNiaUFnSUNBZ0lDQWdhV1lnS0dadmRXNWtLU0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCcGJtUmxlQ0E5SUdGc2JDNXBibVJsZUU5bUtHWnZkVzVrS1R0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnWVd4c0xuTndiR2xqWlNocGJtUmxlQ3dnTVNrN1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUdGc2JDNXdkWE5vS0dWMlpXNTBLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1ellYWmxRV3hzS0dGc2JDazdYSEpjYmlBZ0lDQWdJQ0FnZlZ4eVhHNGdJQ0FnZlZ4eVhHNWNjbHh1WEhKY2JpQWdJQ0F2S2lwY2NseHVJQ0FnSUNBcUlFUmxiR1YwWlNCbGRtVnVkQ0JpZVNCSlJGeHlYRzRnSUNBZ0lDb2dRSEJoY21GdElIdFRkSEpwYm1kOUlHbGtJQzBnU1VRZ2IyWWdaWFpsYm5SY2NseHVJQ0FnSUNBcUlFQnlaWFIxY201eklIdFFjbTl0YVhObGZWeHlYRzRnSUNBZ0lDb3ZYSEpjYmlBZ0lDQmtaV3hsZEdWRmRtVnVkQ2hwWkNrZ2UxeHlYRzRnSUNBZ0lDQWdJSFpoY2lCaGJHd2dQU0IwYUdsekxteHZZV1JGZG1WdWRITW9LVHRjY2x4dUlDQWdJQ0FnSUNCMllYSWdabTkxYm1RZ1BTQmhiR3d1Wm1sdVpDaG1kVzVqZEdsdmJpQW9jQ2tnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdjQzVwWkNBOVBTQnBaRHRjY2x4dUlDQWdJQ0FnSUNCOUtUdGNjbHh1SUNBZ0lDQWdJQ0JwWmlBb1ptOTFibVFwSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnZG1GeUlHbHVaR1Y0SUQwZ1lXeHNMbWx1WkdWNFQyWW9abTkxYm1RcE8xeHlYRzRnSUNBZ0lDQWdJQ0FnSUNCaGJHd3VjM0JzYVdObEtHbHVaR1Y0TENBeEtUdGNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTV6WVhabFFXeHNLR0ZzYkNrN1hISmNiaUFnSUNBZ0lDQWdmVnh5WEc0Z0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUM4cUtseHlYRzRnSUNBZ0lDb2dRV1JrSUc1bGR5QmpiMjF0Wlc1MFhISmNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ1kyOXRiV1Z1ZEVSaGRHRWdMU0JqYjIxdFpXNTBJR1JoZEdGY2NseHVJQ0FnSUNBcUlFQnlaWFIxY201eklIdFFjbTl0YVhObGZWeHlYRzRnSUNBZ0lDb3ZYSEpjYmlBZ0lDQmhaR1JEYjIxdFpXNTBLR052YlcxbGJuUkVZWFJoS1NCN1hISmNibHh5WEc0Z0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUM4cUtseHlYRzRnSUNBZ0lDb2dURzloWkNCaGJHd2daWFpsYm5RbmN5QmpiMjF0Wlc1MGMxeHlYRzRnSUNBZ0lDb2dRSEJoY21GdElIdFRkSEpwYm1kOUlHVjJaVzUwU1VSY2NseHVJQ0FnSUNBcUlFQnlaWFIxY201eklIdFFjbTl0YVhObGZWeHlYRzRnSUNBZ0lDb3ZYSEpjYmlBZ0lDQnNiMkZrUTI5dGJXVnVkSE1vWlhabGJuUkpSQ2tnZTF4eVhHNWNjbHh1SUNBZ0lIMWNjbHh1WEhKY2JseHlYRzU5WEhKY2JseHlYRzR2TDJWNGNHOXlkQ0JrWldaaGRXeDBJRVJDTzF4eVhHNGdMeW9xWEhKY2JpQXFJRU5zWVhOeklISmxjSEpsYzJWdWRHbHVaeUJoSUhWelpYSmNjbHh1SUNvZ1FHTnNZWE56WEhKY2JpQXFMMXh5WEc0Z1kyeGhjM01nVlhObGNpQjdYSEpjYmlBZ0lDOHFLbHh5WEc0Z0lDQWdLaUJEY21WaGRHVWdZU0IxYzJWeVhISmNiaUFnSUNBcUlFQmpiMjV6ZEhKMVkzUnZjbHh5WEc0Z0lDQWdLaTljY2x4dUlDQWdZMjl1YzNSeWRXTjBiM0lvS1NCN1hISmNiaUFnSUNBZ2RHaHBjeTVwYzFWelpYSk1iMmRwYmlBOUlHWmhiSE5sTzF4eVhHNGdJQ0FnSUhSb2FYTXVibUZ0WlNBOUlGd2lYQ0k3WEhKY2JpQWdJSDFjY2x4dVhISmNiaUFnSUM4cUtseHlYRzRnSUNBZ0tpQk1iMmRwYmlCMWMyVnlYSEpjYmlBZ0lDQXFJRUJ3WVhKaGJTQjdVM1J5YVc1bmZTQnVZVzFsSUMwZ1ZYTmxjbTVoYldWY2NseHVJQ0FnSUNvZ1FIQmhjbUZ0SUh0VGRISnBibWQ5SUhCaGMzTjNiM0prSUMwZ1ZYTmxjaUJ3WVhOemQyOXlaRnh5WEc0Z0lDQWdLaUJBY21WMGRYSnVjeUI3VUhKdmJXbHpaWDBnVW1WMGRYSnVjeUJ3Y205dGFYTmxYSEpjYmlBZ0lDQXFMMXh5WEc0Z0lDQnNiMmRwYmlodVlXMWxMQ0J3WVhOemQyOXlaQ2tnZTF4eVhHNGdJQ0FnSUhaaGNpQjFjMlZ5Y3lBOUlIUm9hWE11Ykc5aFpGVnpaWEp6S0NrN1hISmNiaUFnSUNBZ2RtRnlJSFZ6WlhJZ1BTQjFjMlZ5Y3k1bWFXNWtLR1oxYm1OMGFXOXVLSEFwSUhzZ2NtVjBkWEp1SUhBdWJtRnRaU0E5UFQwZ2JtRnRaVHNnZlNrN1hISmNiaUFnSUNBZ2FXWWdLSFZ6WlhJcElIdGNjbHh1SUNBZ0lDQWdJQ0IwYUdsekxtbHpWWE5sY2t4dloybHVJRDBnZFhObGNpNXdZWE56ZDI5eVpDQTlQVDBnY0dGemMzZHZjbVE3WEhKY2JpQWdJQ0FnZlNCbGJITmxJSHRjY2x4dUlDQWdJQ0FnSUNCMWMyVnlJRDBnZXlCdVlXMWxPaUJ1WVcxbExDQndZWE56ZDI5eVpEb2djR0Z6YzNkdmNtUWdmVHRjY2x4dUlDQWdJQ0FnSUNCMWMyVnljeTV3ZFhOb0tIVnpaWElwTzF4eVhHNGdJQ0FnSUNBZ0lIUm9hWE11YzJGMlpWVnpaWEp6S0hWelpYSnpLVHRjY2x4dUlDQWdJQ0FnSUNCMGFHbHpMbWx6VlhObGNreHZaMmx1SUQwZ2RISjFaVHRjY2x4dUlDQWdJQ0I5WEhKY2JpQWdJQ0FnYVdZZ0tIUm9hWE11YVhOVmMyVnlURzluYVc0cElIdGNjbHh1SUNBZ0lDQWdJSFJvYVhNdWJtRnRaU0E5SUhWelpYSXVibUZ0WlR0Y2NseHVJQ0FnSUNCOVhISmNiaUFnSUNBZ2NtVjBkWEp1SUhSb2FYTXVhWE5WYzJWeVRHOW5hVzQ3WEhKY2JpQWdJQ0FnTHk4Z2FXWWdkSEoxWlNBdElHbHpWWE5sY2t4dloybHVJRDBnZEhKMVpWeHlYRzRnSUNBZ0lDOHZJR2xtSUc1dmRDQnlaV2RwYzNSbGNtVmtJQzBnWTNKbFlYUmxJRzVsZHlCMWMyVnlYSEpjYmlBZ0lIMWNjbHh1WEhKY2JpQWdJQzhxS2x4eVhHNGdJQ0FnS2lCTWIyZHZkWFFnZFhObGNseHlYRzRnSUNBZ0tseHlYRzRnSUNBZ0tseHlYRzRnSUNBZ0tpOWNjbHh1SUNBZ2JHOW5iM1YwS0NrZ2UxeHlYRzRnSUNBZ0lIUm9hWE11YVhOVmMyVnlURzluYVc0Z1BTQm1ZV3h6WlR0Y2NseHVJQ0FnSUNCMGFHbHpMbTVoYldVZ1BTQmNJbHdpTzF4eVhHNGdJQ0I5WEhKY2JpQWdJRnh5WEc0Z0lDQnNiMkZrVlhObGNuTW9LU0I3WEhKY2JpQWdJQ0FnZG1GeUlHcHpiMjRnUFNCc2IyTmhiRk4wYjNKaFoyVXVaMlYwU1hSbGJTZ25UVmxWVTBWU1V5Y3BPMXh5WEc0Z0lDQWdJSFpoY2lCa1lYUmhJRDBnU2xOUFRpNXdZWEp6WlNocWMyOXVJSHg4SUZ3aVcxMWNJaWs3WEhKY2JpQWdJQ0FnY21WMGRYSnVJR1JoZEdFN1hISmNiaUFnSUgxY2NseHVYSEpjYmlBZ0lITmhkbVZWYzJWeWN5aDFjMlZ5Y3lrZ2UxeHlYRzRnSUNBZ0lHeHZZMkZzVTNSdmNtRm5aUzV6WlhSSmRHVnRLQ2ROV1ZWVFJWSlRKeXdnU2xOUFRpNXpkSEpwYm1kcFpua29kWE5sY25NcEtUdGNjbHh1SUNBZ2ZWeHlYRzRnZlZ4eVhHNWNjbHh1SUM4dlpYaHdiM0owSUdSbFptRjFiSFFnVlhObGNqdGNjbHh1WEhKY2JseHlYRzUyWVhJZ1pHSWdQU0J1WlhjZ1JFSW9LVHNnWEhKY2JseHlYRzUyWVhJZ1kyRnNaVzVrWVhKRGIyNTBZV2x1WlhJZ1BTQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0NjdVkyRnNaVzVrWVhJdFkyOXVkR0ZwYm1WeUp5azdYSEpjYm5aaGNpQmpZV3dnUFNCdVpYY2dRMkZzWlc1a1lYSW9ZMkZzWlc1a1lYSkRiMjUwWVdsdVpYSXBPMXh5WEc1Y2NseHVkbUZ5SUdWMlJXUnBkRVp2Y20wZ1BTQnVaWGNnUlhabGJuUkZaR2wwUm05eWJTaGtiMk4xYldWdWRDNWliMlI1TENBbkp5azdJRnh5WEc1MllYSWdkWE5sY2lBOUlHNWxkeUJWYzJWeUtDazdYSEpjYmx4eVhHNTJZWElnYUdWaFpHVnlJRDBnYm1WM0lFaGxZV1JsY2loa2IyTjFiV1Z1ZEM1aWIyUjVMQ0FuSnlrN0lGeHlYRzUyWVhJZ2JHOW5hVzRnUFNCdVpYY2dURzluYVc1R2IzSnRLR1J2WTNWdFpXNTBMbUp2Wkhrc0lDY25LVHNnWEhKY2JuWmhjaUJtYjI5MFpYSWdQU0J1WlhjZ1JtOXZkR1Z5S0dSdlkzVnRaVzUwTG1KdlpIa3BPeUpkZlE9PVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9mYWtlXzc1Y2RmN2FmLmpzXCIsXCIvXCIpIl19
