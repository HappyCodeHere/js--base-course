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
      }

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
      ();function Buffer(subject, encoding, noZero) {
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
        if (type === 'number') length = coerce(subject);else if (type === 'string') length = Buffer.byteLength(subject, encoding);else if (type === 'object') length = coerce(subject.length // assume that object is array-like
        );else throw new Error('First argument needs to be a number, array or string.');

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
        assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds'

        // Are we oob?
        );if (end > this.length) end = this.length;
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
        assert(end >= start, 'end < start'

        // Fill 0 bytes; we're done
        );if (end === start) return;
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
          return String.fromCharCode(0xFFFD // UTF 8 invalid char
          );
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
      /* jshint browser:true, node:true */
      "use strict";

      module.exports = function (global) {

        /* Set up a RequestAnimationFrame shim so we can animate efficiently FOR
         * GREAT JUSTICE. */
        var requestInterval, cancelInterval;

        (function () {
          var raf = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || global.oRequestAnimationFrame || global.msRequestAnimationFrame,
              caf = global.cancelAnimationFrame || global.webkitCancelAnimationFrame || global.mozCancelAnimationFrame || global.oCancelAnimationFrame || global.msCancelAnimationFrame;

          if (raf && caf) {
            requestInterval = function requestInterval(fn, delay) {
              var handle = { value: null };

              function loop() {
                handle.value = raf(loop);
                fn();
              }

              loop();
              return handle;
            };

            cancelInterval = function cancelInterval(handle) {
              caf(handle.value);
            };
          } else {
            requestInterval = setInterval;
            cancelInterval = clearInterval;
          }
        })();

        /* Catmull-rom spline stuffs. */
        /*
        function upsample(n, spline) {
          var polyline = [],
              len = spline.length,
              bx  = spline[0],
              by  = spline[1],
              cx  = spline[2],
              cy  = spline[3],
              dx  = spline[4],
              dy  = spline[5],
              i, j, ax, ay, px, qx, rx, sx, py, qy, ry, sy, t;
           for(i = 6; i !== spline.length; i += 2) {
            ax = bx;
            bx = cx;
            cx = dx;
            dx = spline[i    ];
            px = -0.5 * ax + 1.5 * bx - 1.5 * cx + 0.5 * dx;
            qx =        ax - 2.5 * bx + 2.0 * cx - 0.5 * dx;
            rx = -0.5 * ax            + 0.5 * cx           ;
            sx =                   bx                      ;
             ay = by;
            by = cy;
            cy = dy;
            dy = spline[i + 1];
            py = -0.5 * ay + 1.5 * by - 1.5 * cy + 0.5 * dy;
            qy =        ay - 2.5 * by + 2.0 * cy - 0.5 * dy;
            ry = -0.5 * ay            + 0.5 * cy           ;
            sy =                   by                      ;
             for(j = 0; j !== n; ++j) {
              t = j / n;
               polyline.push(
                ((px * t + qx) * t + rx) * t + sx,
                ((py * t + qy) * t + ry) * t + sy
              );
            }
          }
           polyline.push(
            px + qx + rx + sx,
            py + qy + ry + sy
          );
           return polyline;
        }
         function downsample(n, polyline) {
          var len = 0,
              i, dx, dy;
           for(i = 2; i !== polyline.length; i += 2) {
            dx = polyline[i    ] - polyline[i - 2];
            dy = polyline[i + 1] - polyline[i - 1];
            len += Math.sqrt(dx * dx + dy * dy);
          }
           len /= n;
           var small = [],
              target = len,
              min = 0,
              max, t;
           small.push(polyline[0], polyline[1]);
           for(i = 2; i !== polyline.length; i += 2) {
            dx = polyline[i    ] - polyline[i - 2];
            dy = polyline[i + 1] - polyline[i - 1];
            max = min + Math.sqrt(dx * dx + dy * dy);
             if(max > target) {
              t = (target - min) / (max - min);
               small.push(
                polyline[i - 2] + dx * t,
                polyline[i - 1] + dy * t
              );
               target += len;
            }
             min = max;
          }
           small.push(polyline[polyline.length - 2], polyline[polyline.length - 1]);
           return small;
        }
        */

        /* Define skycon things. */
        /* FIXME: I'm *really really* sorry that this code is so gross. Really, I am.
         * I'll try to clean it up eventually! Promise! */
        var KEYFRAME = 500,
            STROKE = 0.08,
            TAU = 2.0 * Math.PI,
            TWO_OVER_SQRT_2 = 2.0 / Math.sqrt(2);

        function circle(ctx, x, y, r) {
          ctx.beginPath();
          ctx.arc(x, y, r, 0, TAU, false);
          ctx.fill();
        }

        function line(ctx, ax, ay, bx, by) {
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }

        function puff(ctx, t, cx, cy, rx, ry, rmin, rmax) {
          var c = Math.cos(t * TAU),
              s = Math.sin(t * TAU);

          rmax -= rmin;

          circle(ctx, cx - s * rx, cy + c * ry + rmax * 0.5, rmin + (1 - c * 0.5) * rmax);
        }

        function puffs(ctx, t, cx, cy, rx, ry, rmin, rmax) {
          var i;

          for (i = 5; i--;) {
            puff(ctx, t + i / 5, cx, cy, rx, ry, rmin, rmax);
          }
        }

        function cloud(ctx, t, cx, cy, cw, s, color) {
          t /= 30000;

          var a = cw * 0.21,
              b = cw * 0.12,
              c = cw * 0.24,
              d = cw * 0.28;

          ctx.fillStyle = color;
          puffs(ctx, t, cx, cy, a, b, c, d);

          ctx.globalCompositeOperation = 'destination-out';
          puffs(ctx, t, cx, cy, a, b, c - s, d - s);
          ctx.globalCompositeOperation = 'source-over';
        }

        function sun(ctx, t, cx, cy, cw, s, color) {
          t /= 120000;

          var a = cw * 0.25 - s * 0.5,
              b = cw * 0.32 + s * 0.5,
              c = cw * 0.50 - s * 0.5,
              i,
              p,
              cos,
              sin;

          ctx.strokeStyle = color;
          ctx.lineWidth = s;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          ctx.beginPath();
          ctx.arc(cx, cy, a, 0, TAU, false);
          ctx.stroke();

          for (i = 8; i--;) {
            p = (t + i / 8) * TAU;
            cos = Math.cos(p);
            sin = Math.sin(p);
            line(ctx, cx + cos * b, cy + sin * b, cx + cos * c, cy + sin * c);
          }
        }

        function moon(ctx, t, cx, cy, cw, s, color) {
          t /= 15000;

          var a = cw * 0.29 - s * 0.5,
              b = cw * 0.05,
              c = Math.cos(t * TAU),
              p = c * TAU / -16;

          ctx.strokeStyle = color;
          ctx.lineWidth = s;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          cx += c * b;

          ctx.beginPath();
          ctx.arc(cx, cy, a, p + TAU / 8, p + TAU * 7 / 8, false);
          ctx.arc(cx + Math.cos(p) * a * TWO_OVER_SQRT_2, cy + Math.sin(p) * a * TWO_OVER_SQRT_2, a, p + TAU * 5 / 8, p + TAU * 3 / 8, true);
          ctx.closePath();
          ctx.stroke();
        }

        function rain(ctx, t, cx, cy, cw, s, color) {
          t /= 1350;

          var a = cw * 0.16,
              b = TAU * 11 / 12,
              c = TAU * 7 / 12,
              i,
              p,
              x,
              y;

          ctx.fillStyle = color;

          for (i = 4; i--;) {
            p = (t + i / 4) % 1;
            x = cx + (i - 1.5) / 1.5 * (i === 1 || i === 2 ? -1 : 1) * a;
            y = cy + p * p * cw;
            ctx.beginPath();
            ctx.moveTo(x, y - s * 1.5);
            ctx.arc(x, y, s * 0.75, b, c, false);
            ctx.fill();
          }
        }

        function sleet(ctx, t, cx, cy, cw, s, color) {
          t /= 750;

          var a = cw * 0.1875,
              b = TAU * 11 / 12,
              c = TAU * 7 / 12,
              i,
              p,
              x,
              y;

          ctx.strokeStyle = color;
          ctx.lineWidth = s * 0.5;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          for (i = 4; i--;) {
            p = (t + i / 4) % 1;
            x = Math.floor(cx + (i - 1.5) / 1.5 * (i === 1 || i === 2 ? -1 : 1) * a) + 0.5;
            y = cy + p * cw;
            line(ctx, x, y - s * 1.5, x, y + s * 1.5);
          }
        }

        function snow(ctx, t, cx, cy, cw, s, color) {
          t /= 3000;

          var a = cw * 0.16,
              b = s * 0.75,
              u = t * TAU * 0.7,
              ux = Math.cos(u) * b,
              uy = Math.sin(u) * b,
              v = u + TAU / 3,
              vx = Math.cos(v) * b,
              vy = Math.sin(v) * b,
              w = u + TAU * 2 / 3,
              wx = Math.cos(w) * b,
              wy = Math.sin(w) * b,
              i,
              p,
              x,
              y;

          ctx.strokeStyle = color;
          ctx.lineWidth = s * 0.5;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          for (i = 4; i--;) {
            p = (t + i / 4) % 1;
            x = cx + Math.sin((p + i / 4) * TAU) * a;
            y = cy + p * cw;

            line(ctx, x - ux, y - uy, x + ux, y + uy);
            line(ctx, x - vx, y - vy, x + vx, y + vy);
            line(ctx, x - wx, y - wy, x + wx, y + wy);
          }
        }

        function fogbank(ctx, t, cx, cy, cw, s, color) {
          t /= 30000;

          var a = cw * 0.21,
              b = cw * 0.06,
              c = cw * 0.21,
              d = cw * 0.28;

          ctx.fillStyle = color;
          puffs(ctx, t, cx, cy, a, b, c, d);

          ctx.globalCompositeOperation = 'destination-out';
          puffs(ctx, t, cx, cy, a, b, c - s, d - s);
          ctx.globalCompositeOperation = 'source-over';
        }

        /*
        var WIND_PATHS = [
              downsample(63, upsample(8, [
                -1.00, -0.28,
                -0.75, -0.18,
                -0.50,  0.12,
                -0.20,  0.12,
                -0.04, -0.04,
                -0.07, -0.18,
                -0.19, -0.18,
                -0.23, -0.05,
                -0.12,  0.11,
                 0.02,  0.16,
                 0.20,  0.15,
                 0.50,  0.07,
                 0.75,  0.18,
                 1.00,  0.28
              ])),
              downsample(31, upsample(16, [
                -1.00, -0.10,
                -0.75,  0.00,
                -0.50,  0.10,
                -0.25,  0.14,
                 0.00,  0.10,
                 0.25,  0.00,
                 0.50, -0.10,
                 0.75, -0.14,
                 1.00, -0.10
              ]))
            ];
        */

        var WIND_PATHS = [[-0.7500, -0.1800, -0.7219, -0.1527, -0.6971, -0.1225, -0.6739, -0.0910, -0.6516, -0.0588, -0.6298, -0.0262, -0.6083, 0.0065, -0.5868, 0.0396, -0.5643, 0.0731, -0.5372, 0.1041, -0.5033, 0.1259, -0.4662, 0.1406, -0.4275, 0.1493, -0.3881, 0.1530, -0.3487, 0.1526, -0.3095, 0.1488, -0.2708, 0.1421, -0.2319, 0.1342, -0.1943, 0.1217, -0.1600, 0.1025, -0.1290, 0.0785, -0.1012, 0.0509, -0.0764, 0.0206, -0.0547, -0.0120, -0.0378, -0.0472, -0.0324, -0.0857, -0.0389, -0.1241, -0.0546, -0.1599, -0.0814, -0.1876, -0.1193, -0.1964, -0.1582, -0.1935, -0.1931, -0.1769, -0.2157, -0.1453, -0.2290, -0.1085, -0.2327, -0.0697, -0.2240, -0.0317, -0.2064, 0.0033, -0.1853, 0.0362, -0.1613, 0.0672, -0.1350, 0.0961, -0.1051, 0.1213, -0.0706, 0.1397, -0.0332, 0.1512, 0.0053, 0.1580, 0.0442, 0.1624, 0.0833, 0.1636, 0.1224, 0.1615, 0.1613, 0.1565, 0.1999, 0.1500, 0.2378, 0.1402, 0.2749, 0.1279, 0.3118, 0.1147, 0.3487, 0.1015, 0.3858, 0.0892, 0.4236, 0.0787, 0.4621, 0.0715, 0.5012, 0.0702, 0.5398, 0.0766, 0.5768, 0.0890, 0.6123, 0.1055, 0.6466, 0.1244, 0.6805, 0.1440, 0.7147, 0.1630, 0.7500, 0.1800], [-0.7500, 0.0000, -0.7033, 0.0195, -0.6569, 0.0399, -0.6104, 0.0600, -0.5634, 0.0789, -0.5155, 0.0954, -0.4667, 0.1089, -0.4174, 0.1206, -0.3676, 0.1299, -0.3174, 0.1365, -0.2669, 0.1398, -0.2162, 0.1391, -0.1658, 0.1347, -0.1157, 0.1271, -0.0661, 0.1169, -0.0170, 0.1046, 0.0316, 0.0903, 0.0791, 0.0728, 0.1259, 0.0534, 0.1723, 0.0331, 0.2188, 0.0129, 0.2656, -0.0064, 0.3122, -0.0263, 0.3586, -0.0466, 0.4052, -0.0665, 0.4525, -0.0847, 0.5007, -0.1002, 0.5497, -0.1130, 0.5991, -0.1240, 0.6491, -0.1325, 0.6994, -0.1380, 0.7500, -0.1400]],
            WIND_OFFSETS = [{ start: 0.36, end: 0.11 }, { start: 0.56, end: 0.16 }];

        function leaf(ctx, t, x, y, cw, s, color) {
          var a = cw / 8,
              b = a / 3,
              c = 2 * b,
              d = t % 1 * TAU,
              e = Math.cos(d),
              f = Math.sin(d);

          ctx.fillStyle = color;
          ctx.strokeStyle = color;
          ctx.lineWidth = s;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          ctx.beginPath();
          ctx.arc(x, y, a, d, d + Math.PI, false);
          ctx.arc(x - b * e, y - b * f, c, d + Math.PI, d, false);
          ctx.arc(x + c * e, y + c * f, b, d + Math.PI, d, true);
          ctx.globalCompositeOperation = 'destination-out';
          ctx.fill();
          ctx.globalCompositeOperation = 'source-over';
          ctx.stroke();
        }

        function swoosh(ctx, t, cx, cy, cw, s, index, total, color) {
          t /= 2500;

          var path = WIND_PATHS[index],
              a = (t + index - WIND_OFFSETS[index].start) % total,
              c = (t + index - WIND_OFFSETS[index].end) % total,
              e = (t + index) % total,
              b,
              d,
              f,
              i;

          ctx.strokeStyle = color;
          ctx.lineWidth = s;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          if (a < 1) {
            ctx.beginPath();

            a *= path.length / 2 - 1;
            b = Math.floor(a);
            a -= b;
            b *= 2;
            b += 2;

            ctx.moveTo(cx + (path[b - 2] * (1 - a) + path[b] * a) * cw, cy + (path[b - 1] * (1 - a) + path[b + 1] * a) * cw);

            if (c < 1) {
              c *= path.length / 2 - 1;
              d = Math.floor(c);
              c -= d;
              d *= 2;
              d += 2;

              for (i = b; i !== d; i += 2) {
                ctx.lineTo(cx + path[i] * cw, cy + path[i + 1] * cw);
              }ctx.lineTo(cx + (path[d - 2] * (1 - c) + path[d] * c) * cw, cy + (path[d - 1] * (1 - c) + path[d + 1] * c) * cw);
            } else for (i = b; i !== path.length; i += 2) {
              ctx.lineTo(cx + path[i] * cw, cy + path[i + 1] * cw);
            }ctx.stroke();
          } else if (c < 1) {
            ctx.beginPath();

            c *= path.length / 2 - 1;
            d = Math.floor(c);
            c -= d;
            d *= 2;
            d += 2;

            ctx.moveTo(cx + path[0] * cw, cy + path[1] * cw);

            for (i = 2; i !== d; i += 2) {
              ctx.lineTo(cx + path[i] * cw, cy + path[i + 1] * cw);
            }ctx.lineTo(cx + (path[d - 2] * (1 - c) + path[d] * c) * cw, cy + (path[d - 1] * (1 - c) + path[d + 1] * c) * cw);

            ctx.stroke();
          }

          if (e < 1) {
            e *= path.length / 2 - 1;
            f = Math.floor(e);
            e -= f;
            f *= 2;
            f += 2;

            leaf(ctx, t, cx + (path[f - 2] * (1 - e) + path[f] * e) * cw, cy + (path[f - 1] * (1 - e) + path[f + 1] * e) * cw, cw, s, color);
          }
        }

        var Skycons = function Skycons(opts) {
          this.list = [];
          this.interval = null;
          this.color = opts && opts.color ? opts.color : "black";
          this.resizeClear = !!(opts && opts.resizeClear);
        };

        Skycons.CLEAR_DAY = function (ctx, t, color) {
          var w = ctx.canvas.width,
              h = ctx.canvas.height,
              s = Math.min(w, h);

          sun(ctx, t, w * 0.5, h * 0.5, s, s * STROKE, color);
        };

        Skycons.CLEAR_NIGHT = function (ctx, t, color) {
          var w = ctx.canvas.width,
              h = ctx.canvas.height,
              s = Math.min(w, h);

          moon(ctx, t, w * 0.5, h * 0.5, s, s * STROKE, color);
        };

        Skycons.PARTLY_CLOUDY_DAY = function (ctx, t, color) {
          var w = ctx.canvas.width,
              h = ctx.canvas.height,
              s = Math.min(w, h);

          sun(ctx, t, w * 0.625, h * 0.375, s * 0.75, s * STROKE, color);
          cloud(ctx, t, w * 0.375, h * 0.625, s * 0.75, s * STROKE, color);
        };

        Skycons.PARTLY_CLOUDY_NIGHT = function (ctx, t, color) {
          var w = ctx.canvas.width,
              h = ctx.canvas.height,
              s = Math.min(w, h);

          moon(ctx, t, w * 0.667, h * 0.375, s * 0.75, s * STROKE, color);
          cloud(ctx, t, w * 0.375, h * 0.625, s * 0.75, s * STROKE, color);
        };

        Skycons.CLOUDY = function (ctx, t, color) {
          var w = ctx.canvas.width,
              h = ctx.canvas.height,
              s = Math.min(w, h);

          cloud(ctx, t, w * 0.5, h * 0.5, s, s * STROKE, color);
        };

        Skycons.RAIN = function (ctx, t, color) {
          var w = ctx.canvas.width,
              h = ctx.canvas.height,
              s = Math.min(w, h);

          rain(ctx, t, w * 0.5, h * 0.37, s * 0.9, s * STROKE, color);
          cloud(ctx, t, w * 0.5, h * 0.37, s * 0.9, s * STROKE, color);
        };

        Skycons.SLEET = function (ctx, t, color) {
          var w = ctx.canvas.width,
              h = ctx.canvas.height,
              s = Math.min(w, h);

          sleet(ctx, t, w * 0.5, h * 0.37, s * 0.9, s * STROKE, color);
          cloud(ctx, t, w * 0.5, h * 0.37, s * 0.9, s * STROKE, color);
        };

        Skycons.SNOW = function (ctx, t, color) {
          var w = ctx.canvas.width,
              h = ctx.canvas.height,
              s = Math.min(w, h);

          snow(ctx, t, w * 0.5, h * 0.37, s * 0.9, s * STROKE, color);
          cloud(ctx, t, w * 0.5, h * 0.37, s * 0.9, s * STROKE, color);
        };

        Skycons.WIND = function (ctx, t, color) {
          var w = ctx.canvas.width,
              h = ctx.canvas.height,
              s = Math.min(w, h);

          swoosh(ctx, t, w * 0.5, h * 0.5, s, s * STROKE, 0, 2, color);
          swoosh(ctx, t, w * 0.5, h * 0.5, s, s * STROKE, 1, 2, color);
        };

        Skycons.FOG = function (ctx, t, color) {
          var w = ctx.canvas.width,
              h = ctx.canvas.height,
              s = Math.min(w, h),
              k = s * STROKE;

          fogbank(ctx, t, w * 0.5, h * 0.32, s * 0.75, k, color);

          t /= 5000;

          var a = Math.cos(t * TAU) * s * 0.02,
              b = Math.cos((t + 0.25) * TAU) * s * 0.02,
              c = Math.cos((t + 0.50) * TAU) * s * 0.02,
              d = Math.cos((t + 0.75) * TAU) * s * 0.02,
              n = h * 0.936,
              e = Math.floor(n - k * 0.5) + 0.5,
              f = Math.floor(n - k * 2.5) + 0.5;

          ctx.strokeStyle = color;
          ctx.lineWidth = k;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          line(ctx, a + w * 0.2 + k * 0.5, e, b + w * 0.8 - k * 0.5, e);
          line(ctx, c + w * 0.2 + k * 0.5, f, d + w * 0.8 - k * 0.5, f);
        };

        Skycons.prototype = {
          _determineDrawingFunction: function _determineDrawingFunction(draw) {
            if (typeof draw === "string") draw = Skycons[draw.toUpperCase().replace(/-/g, "_")] || null;

            return draw;
          },
          add: function add(el, draw) {
            var obj;

            if (typeof el === "string") el = document.getElementById(el);

            // Does nothing if canvas name doesn't exists
            if (el === null) return;

            draw = this._determineDrawingFunction(draw);

            // Does nothing if the draw function isn't actually a function
            if (typeof draw !== "function") return;

            obj = {
              element: el,
              context: el.getContext("2d"),
              drawing: draw
            };

            this.list.push(obj);
            this.draw(obj, KEYFRAME);
          },
          set: function set(el, draw) {
            var i;

            if (typeof el === "string") el = document.getElementById(el);

            for (i = this.list.length; i--;) {
              if (this.list[i].element === el) {
                this.list[i].drawing = this._determineDrawingFunction(draw);
                this.draw(this.list[i], KEYFRAME);
                return;
              }
            }this.add(el, draw);
          },
          remove: function remove(el) {
            var i;

            if (typeof el === "string") el = document.getElementById(el);

            for (i = this.list.length; i--;) {
              if (this.list[i].element === el) {
                this.list.splice(i, 1);
                return;
              }
            }
          },
          draw: function draw(obj, time) {
            var canvas = obj.context.canvas;

            if (this.resizeClear) canvas.width = canvas.width;else obj.context.clearRect(0, 0, canvas.width, canvas.height);

            obj.drawing(obj.context, time, this.color);
          },
          play: function play() {
            var self = this;

            this.pause();
            this.interval = requestInterval(function () {
              var now = Date.now(),
                  i;

              for (i = self.list.length; i--;) {
                self.draw(self.list[i], now);
              }
            }, 1000 / 60);
          },
          pause: function pause() {
            var i;

            if (this.interval) {
              cancelInterval(this.interval);
              this.interval = null;
            }
          }
        };
        return Skycons;
      };
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/..\\..\\node_modules\\skycons\\skycons.js", "/..\\..\\node_modules\\skycons");
  }, { "buffer": 2, "e/U+97": 4 }], 6: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

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

      var Favorites = function () {
        function Favorites(eventBus, element) {
          _classCallCheck(this, Favorites);

          this.eventBus = eventBus;
          this.element = element;

          this.favorites = [];

          this.onFavoritesAdd = this.onFavoritesAdd.bind(this);
          this.onFavoritesRemove = this.onFavoritesRemove.bind(this);
          this.onCoordinatesChange = this.onCoordinatesChange.bind(this);

          this.eventBus.on('favorites:add', this.onFavoritesAdd);
          this.eventBus.on('favorites:remove', this.onFavoritesRemove);
          this.eventBus.on('coordinates:changed', this.onCoordinatesChange);

          this.loadFavoritesFromStorage(localStorage);
        }

        _createClass(Favorites, [{
          key: 'loadFavoritesFromStorage',
          value: function loadFavoritesFromStorage(storage) {
            var savedFavorites = storage.getItem('forecast-favorites');
            this.favorites = JSON.parse(savedFavorites) || [];
          }
        }, {
          key: 'saveFavoritesToStorage',
          value: function saveFavoritesToStorage(storage) {
            storage.setItem('forecast-favorites', JSON.stringify(this.favorites));
          }
        }, {
          key: 'onFavoritesAdd',
          value: function onFavoritesAdd(coords) {
            this.favorites.push(coords);
            this.onCoordinatesChange(coords);
            this.saveFavoritesToStorage(localStorage);
            this.renderFavorites();
          }
        }, {
          key: 'onFavoritesRemove',
          value: function onFavoritesRemove(coords) {
            var _this = this;

            this.favorites.map(function (item, i) {
              if (item.lat === coords.lat) {
                _this.favorites.splice(i, 1);
              }
            });
            if (this.favorites.length > 5) {
              this.favorites = [];
            }

            this.eventBus.trigger('star:is-active', false);
            this.saveFavoritesToStorage(localStorage);
            this.renderFavorites();
          }
        }, {
          key: 'onCoordinatesChange',
          value: function onCoordinatesChange(coords) {
            var _this2 = this;

            this.favorites.map(function (item) {
              if (item.lat === coords.lat) {
                _this2.eventBus.trigger('star:is-active', true);
              }
            });
          }
        }, {
          key: 'renderFavorites',
          value: function renderFavorites() {
            var favoritesBlock = document.querySelector(this.element);

            var favoritesTitle = document.createElement('h3');
            favoritesTitle.innerHTML = 'Your favorites:';

            var favoritesUl = document.createElement('ul');
            favoritesUl.classList.add('list-group');

            this.favorites.map(function (item) {
              var lat = item.lat,
                  lng = item.lng;

              favoritesUl.innerHTML += '<li class="list-group-item"><a href="#coordinates?lat=' + lat + '&lng=' + lng + '">' + (+lat).toFixed(2) + ' / ' + (+lng).toFixed(2) + '</a></li>';
            });

            favoritesBlock.innerHTML = favoritesTitle.outerHTML + ' ' + favoritesUl.outerHTML;
          }
        }]);

        return Favorites;
      }();

      exports.default = Favorites;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\Favorites.js", "/components");
  }, { "buffer": 2, "e/U+97": 4 }], 7: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _skycons = require("skycons");

      var _skycons2 = _interopRequireDefault(_skycons);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Forecast = function () {
        function Forecast(element, cityData) {
          _classCallCheck(this, Forecast);

          this.element = element;
          this.cityData = cityData;
        }

        _createClass(Forecast, [{
          key: "renderForecast",
          value: function renderForecast() {
            var forecastDiv = document.querySelector(this.element);

            forecastDiv.outerHTML = "\n      <div class=\"forecast-block\">\n        <h2>" + this.cityData.timezone + "</h2>\n        <div class=\"row\">\n          <div class=\"col-md-6\">\n            <canvas class=\"forecast-icon\" width=\"128\" height=\"128\"></canvas>\n          </div>\n          <div class=\"col-md-6 forecast-info\">\n            <span class=\"temperature\">Temperature: " + this.cityData.currently.temperature.toFixed(1) + "\xB0C</span>\n            <span class=\"humidity\">Humidity: " + this.cityData.currently.humidity + "%</span>\n            <span class=\"wind-speed\">Wind speed: " + this.cityData.currently.windSpeed + "m/s</span>\n          </div>\n        </div>\n        <div class=\"row\">\n          <div class=\"col-lg-offset-3 col-lg-6 summary\">\n            <p>" + this.cityData.currently.summary + "</p>\n          </div>\n        </div>\n      </div>\n    ";

            var skycons = new new _skycons2.default({})({ "color": "#e6a831" });
            skycons.add(document.querySelector('section.main .forecast-icon'), this.cityData.currently.icon);
            skycons.play();
          }
        }]);

        return Forecast;
      }();

      exports.default = Forecast;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\Forecast.js", "/components");
  }, { "buffer": 2, "e/U+97": 4, "skycons": 5 }], 8: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

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

      var History = function () {
        function History(eventBus, element) {
          _classCallCheck(this, History);

          this.eventBus = eventBus;
          this.element = element;

          this.history = [];

          this.onHistoryAdd = this.onHistoryAdd.bind(this);

          this.eventBus.on('history:add', this.onHistoryAdd);

          this.loadHistoryFromStorage(localStorage);
        }

        _createClass(History, [{
          key: 'loadHistoryFromStorage',
          value: function loadHistoryFromStorage(storage) {
            var savedHistory = storage.getItem('forecast');
            this.history = JSON.parse(savedHistory) || [];
          }
        }, {
          key: 'saveHistoryToStorage',
          value: function saveHistoryToStorage(storage) {
            storage.setItem('forecast', JSON.stringify(this.history));
          }
        }, {
          key: 'onHistoryAdd',
          value: function onHistoryAdd(city) {
            if (this.history[0] === city) return;
            if (this.history.indexOf(city) > 0) {
              this.history.splice(this.history.indexOf(city), 1);
            }
            if (this.history.length > 4) {
              this.history.pop();
            }
            this.history.unshift(city);

            this.saveHistoryToStorage(localStorage);
            this.renderHistory();
          }
        }, {
          key: 'renderHistory',
          value: function renderHistory() {
            var historyBlock = document.querySelector(this.element);

            var historyTitle = document.createElement('h3');
            historyTitle.innerHTML = 'Resently watched:';

            var historyUl = document.createElement('ul');
            historyUl.classList.add('list-group');

            this.history.map(function (item) {
              historyUl.innerHTML += '<li class="list-group-item"><a href="#city=' + item + '">' + item + '</a></li>';
            });

            historyBlock.innerHTML = historyTitle.outerHTML + ' ' + historyUl.outerHTML;
          }
        }]);

        return History;
      }();

      exports.default = History;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\History.js", "/components");
  }, { "buffer": 2, "e/U+97": 4 }], 9: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

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

      var Map = function () {
        function Map(eventBus, element) {
          _classCallCheck(this, Map);

          this.eventBus = eventBus;
          this.element = element;

          this.map = {};

          this.handleCoordinatesChange = this.handleCoordinatesChange.bind(this);
        }

        _createClass(Map, [{
          key: 'handleCoordinatesChange',
          value: function handleCoordinatesChange(_ref) {
            var lat = _ref.lat,
                lng = _ref.lng;

            this.map.setCenter([lat, lng]);
          }
        }, {
          key: 'renderMap',
          value: function renderMap(coords) {
            var map = document.querySelector(this.element);
            map.outerHTML = '<div id="map" style="width: 100%; height: 400px"></div>';

            window.ymaps.ready(init);
            var myMap;

            var self = this;

            function init() {
              myMap = new window.ymaps.Map("map", {
                center: coords,
                zoom: 7
              });

              myMap.events.add('boundschange', function (event) {
                var lat = event.originalEvent.newBounds[0][0];
                var lng = event.originalEvent.newBounds[0][1];
                self.eventBus.trigger('coordinates:changed', { lat: lat, lng: lng });
                window.location.hash = 'coordinates?lat=' + lat + '&lng=' + lng;
              });

              // self.map = myMap;
              // self.eventBus.on('coordinates:changed', self.handleCoordinatesChange);
            }
          }
        }]);

        return Map;
      }();

      exports.default = Map;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\Map.js", "/components");
  }, { "buffer": 2, "e/U+97": 4 }], 10: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

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

      var Menu = function () {
        function Menu(element) {
          _classCallCheck(this, Menu);

          this.element = element;
        }

        _createClass(Menu, [{
          key: "renderMenu",
          value: function renderMenu() {
            var menuBlock = document.querySelector(this.element);

            menuBlock.outerHTML = "\n      <div class=\"menu\">\n        <ul>\n          <li><a href=\"#\">Home</a></li>\n          <li><a href=\"#about\">About</a></li>\n        </ul>\n      </div>\n    ";
          }
        }]);

        return Menu;
      }();

      exports.default = Menu;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\Menu.js", "/components");
  }, { "buffer": 2, "e/U+97": 4 }], 11: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

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

      var Search = function () {
        function Search(eventBus, element) {
          _classCallCheck(this, Search);

          this.eventBus = eventBus;
          this.element = element;

          this.handleSubmit = this.handleSubmit.bind(this);
        }

        _createClass(Search, [{
          key: 'handleSubmit',
          value: function handleSubmit(event) {
            event.preventDefault();
            var inputSearch = document.querySelector('header .search input');
            var value = inputSearch.value;
            window.location.hash = 'city=' + value;
            inputSearch.innerHTML = '';
          }
        }, {
          key: 'renderSearch',
          value: function renderSearch() {
            var search = document.querySelector(this.element);

            search.outerHTML = '\n      <div class="search">\n        <form>\n          <div class="row">\n            <div class="form-group col-md-8">\n              <input type="text" class="form-control" placeholder="Enter a city..." autofocus>\n            </div>\n            <div class="col-md-4">\n              <button type="submit" class="btn btn-warning">Get forecast!</button>\n            </div>\n          </div>\n        </form>\n      </div>\n    ';

            var formSearch = document.querySelector(this.element + ' form');
            formSearch.addEventListener('submit', this.handleSubmit);
          }
        }]);

        return Search;
      }();

      exports.default = Search;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\Search.js", "/components");
  }, { "buffer": 2, "e/U+97": 4 }], 12: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _helpers = require('../utils/helpers');

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Star = function () {
        function Star(eventBus, element) {
          _classCallCheck(this, Star);

          this.eventBus = eventBus;
          this.element = element;

          this.handleStarClick = this.handleStarClick.bind(this);
          this.handleFavoritesActive = this.handleFavoritesActive.bind(this);

          this.eventBus.on('star:is-active', this.handleFavoritesActive);
        }

        _createClass(Star, [{
          key: 'handleFavoritesActive',
          value: function handleFavoritesActive(isActive) {
            var star = document.querySelector(this.element + ' span');

            if (isActive) {
              star.classList.add('active');
            } else {
              star.classList.remove('active');
            }
          }
        }, {
          key: 'handleStarClick',
          value: function handleStarClick() {
            var star = document.querySelector(this.element + ' span');

            var _getUrlHashParams = (0, _helpers.getUrlHashParams)(),
                lat = _getUrlHashParams.lat,
                lng = _getUrlHashParams.lng;

            if (star.classList.contains('active')) {
              this.eventBus.trigger('favorites:remove', { lat: lat, lng: lng });
            } else {
              this.eventBus.trigger('favorites:add', { lat: lat, lng: lng });
            }
          }
        }, {
          key: 'renderStar',
          value: function renderStar() {
            var star = document.querySelector(this.element);
            star.innerHTML = '<h5>Add this to your favorites!</h5>';
            star.innerHTML += '<span></span>';
            star.querySelector('span').addEventListener('click', this.handleStarClick);
          }
        }]);

        return Star;
      }();

      exports.default = Star;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\Star.js", "/components");
  }, { "../utils/helpers": 20, "buffer": 2, "e/U+97": 4 }], 13: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

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

      var Switcher = function () {
        function Switcher(eventBus, element) {
          _classCallCheck(this, Switcher);

          this.eventBus = eventBus;
          this.element = element;

          this.handleSwitcherChange = this.handleSwitcherChange.bind(this);
          this.renderSwitcher = this.renderSwitcher.bind(this);
        }

        _createClass(Switcher, [{
          key: 'handleSwitcherChange',
          value: function handleSwitcherChange(event) {

            var isFetchRequest = true;
            // передать через ивент бас

            var checked = event.target.checked;

            var requestType = document.querySelector('.switcher span');

            if (checked) {
              isFetchRequest = true;
              requestType.innerHTML = 'Fetch';
            } else {
              isFetchRequest = false;
              requestType.innerHTML = 'XHR';
            }
          }
        }, {
          key: 'renderSwitcher',
          value: function renderSwitcher() {
            var switcher = document.querySelector(this.element);

            switcher.outerHTML = '\n      <div class="switcher">\n        Request type: <span>Fetch</span>\n        <label class="switch">\n          <input type="checkbox" checked>\n          <div class="slider round"></div>\n        </label>\n      </div>\n    ';

            switcher.addEventListener('change', this.handleSwitcherChange);
          }
        }]);

        return Switcher;
      }();

      exports.default = Switcher;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\Switcher.js", "/components");
  }, { "buffer": 2, "e/U+97": 4 }], 14: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      var _EventBus = require('./utils/EventBus');

      var _EventBus2 = _interopRequireDefault(_EventBus);

      var _router = require('./utils/router');

      var _router2 = _interopRequireDefault(_router);

      var _Switcher = require('./components/Switcher');

      var _Switcher2 = _interopRequireDefault(_Switcher);

      var _Menu = require('./components/Menu');

      var _Menu2 = _interopRequireDefault(_Menu);

      var _Search = require('./components/Search');

      var _Search2 = _interopRequireDefault(_Search);

      var _History = require('./components/History');

      var _History2 = _interopRequireDefault(_History);

      var _Favorites = require('./components/Favorites');

      var _Favorites2 = _interopRequireDefault(_Favorites);

      var _index = require('./routes/index');

      var _city = require('./routes/city');

      var _coordinates = require('./routes/coordinates');

      var _about = require('./routes/about');

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var eventBus = new _EventBus2.default();

      var routes = [_index.index, _city.city, _coordinates.coordinates, _about.about];

      new _Switcher2.default(eventBus, '.switcher').renderSwitcher();
      new _Menu2.default('.menu').renderMenu();
      new _Search2.default(eventBus, '.search').renderSearch();

      new _router2.default({ routes: routes, eventBus: eventBus });

      new _History2.default(eventBus, '.history').renderHistory();
      new _Favorites2.default(eventBus, '.favorites').renderFavorites();
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_25e5531d.js", "/");
  }, { "./components/Favorites": 6, "./components/History": 8, "./components/Menu": 10, "./components/Search": 11, "./components/Switcher": 13, "./routes/about": 15, "./routes/city": 16, "./routes/coordinates": 17, "./routes/index": 18, "./utils/EventBus": 19, "./utils/router": 21, "buffer": 2, "e/U+97": 4 }], 15: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var about = {
        name: 'about',
        match: 'about',
        onEnter: function onEnter() {
          var contentBlock = document.querySelector('section.main .content');
          contentBlock.classList.remove('col-md-12');
          contentBlock.classList.add('col-md-offset-2', 'col-md-8');
          contentBlock.innerHTML = '\n      <h2>Hello, it will be cool about page</h2>\n      <p>...but haven\'t idea what to write here</p>\n    ';
        }
      };

      exports.about = about;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/routes\\about.js", "/routes");
  }, { "buffer": 2, "e/U+97": 4 }], 16: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var GOOGLE_API_KEY = 'AIzaSyDa7DCL2NO9KMPd9DYVk_u3u0wCbm0XXFY';

      var city = exports.city = {
        name: 'city',
        match: /city=(.+)/,
        onEnter: function onEnter(url, eventBus) {
          var city = url.split('=')[1];

          var contentBlock = document.querySelector('section.main .content');
          contentBlock.classList.remove('col-md-12');
          contentBlock.classList.add('col-md-offset-2', 'col-md-8');
          contentBlock.innerHTML = '\n      <h2>Loading information about your city...</h2>\n    ';

          fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + city + '&key=' + GOOGLE_API_KEY).then(function (response) {
            return response.json();
          }).then(function (data) {
            contentBlock.innerHTML += '\n          <p>Almost ready...</p>\n        ';
            if (data.results.length === 0) throw new Error("We can't find your city");
            var formattedAddress = data.results[0].formatted_address;
            var _data$results$0$geome = data.results[0].geometry.location,
                lat = _data$results$0$geome.lat,
                lng = _data$results$0$geome.lng;

            eventBus.trigger('history:add', formattedAddress);
            window.location.hash = 'coordinates?lat=' + lat + '&lng=' + lng;
          }).catch(function (error) {
            contentBlock.innerHTML = '\n          <h2>Sorry, we have some error :(</h2>\n          <p class="error">' + error + '</p>\n        ';
          });
        },
        onLeave: function onLeave() {
          // document.querySelector('section.main .content').innerHTML = '';
        }
      };

      // function loadData(city) {
      //   return isFetchRequest ? getForecastFetch(city) : getForecastXHR(city);
      // }
      //
      // function getForecastXHR(city) {
      //
      //   return new Promise((resolve, reject) => {
      //
      //     var xhr = new XMLHttpRequest();
      //     xhr.open('GET', `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GOOGLE_API_KEY}`, true);
      //
      //     xhr.onload = function() {
      //       if (this.status == 200) {
      //
      //         const data = JSON.parse(this.response);
      //         if (data.results.length === 0) throw new Error("Sorry, we can't find your city:(");
      //         currentCity = data.results[0].formatted_address;
      //         const { lat, lng } = data.results[0].geometry.location;
      //
      //         var xhr2 = new XMLHttpRequest();
      //         xhr2.open('GET', `https://shrouded-spire-35703.herokuapp.com/forecast/${lat},${lng}?lang=en&units=si`, true);
      //
      //         xhr2.onload = function() {
      //           if (this.status == 200) {
      //             resolve(JSON.parse(this.response));
      //           } else {
      //             var error = new Error(this.statusText);
      //             error.code = this.status;
      //             reject(error);
      //           }
      //         };
      //
      //         xhr2.onerror = function() {
      //           reject(new Error("Network Error"));
      //         };
      //
      //         xhr2.send();
      //
      //       } else {
      //         var error = new Error(this.statusText);
      //         error.code = this.status;
      //         reject(error);
      //       }
      //     };
      //
      //     xhr.onerror = function() {
      //       reject(new Error("Network Error"));
      //     };
      //
      //     xhr.send();
      //   });
      // }
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/routes\\city.js", "/routes");
  }, { "buffer": 2, "e/U+97": 4 }], 17: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.coordinates = undefined;

      var _helpers = require('../utils/helpers');

      var _Forecast = require('../components/Forecast');

      var _Forecast2 = _interopRequireDefault(_Forecast);

      var _Star = require('../components/Star');

      var _Star2 = _interopRequireDefault(_Star);

      var _Map = require('../components/Map');

      var _Map2 = _interopRequireDefault(_Map);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var coordinates = exports.coordinates = {
        name: 'coordinates',
        match: function match(coordinates) {
          return coordinates.substring(0, 11) === 'coordinates';
        },
        onEnter: function onEnter(url, eventBus) {
          var _getUrlHashParams = (0, _helpers.getUrlHashParams)(),
              lat = _getUrlHashParams.lat,
              lng = _getUrlHashParams.lng;

          var contentBlock = document.querySelector('section.main .content');

          fetch('https://shrouded-spire-35703.herokuapp.com/forecast/' + lat + ',' + lng + '?lang=en&units=si').then(function (response) {
            return response.json();
          }).then(function (data) {
            if (contentBlock.classList.contains('col-md-8')) {
              contentBlock.innerHTML = '';
            }
            contentBlock.classList.remove('col-md-offset-2', 'col-md-8');
            contentBlock.classList.add('col-md-12');

            var mapDiv = document.createElement('div');
            mapDiv.classList.add('map');

            var starDiv = document.createElement('div');
            starDiv.classList.add('star');

            // mapDiv.innerHTML = '<div class="col-md-9 map"></div><div class="col-md-3 star"></div>'

            // if (!document.querySelector('.forecast-block')) {
            //   new Map(eventBus, '.map').renderMap([lat, lng]);
            // }

            if (!document.querySelector('section.main .content .forecast-block')) {
              var forecastDiv = document.createElement('div');
              forecastDiv.classList.add('forecast-block');
              contentBlock.append(forecastDiv);
            }
            new _Forecast2.default('section.main .content .forecast-block', data).renderForecast();

            contentBlock.append(starDiv, mapDiv);

            // eventBus.trigger('coordinates:changed', {lat, lng});

            if (!document.querySelector('#map')) {
              new _Map2.default(eventBus, '.map').renderMap([lat, lng]);
            }

            // if (!document.querySelector('.star')) {
            new _Star2.default(eventBus, '.star').renderStar();
            // }

            eventBus.trigger('coordinates:changed', { lat: lat, lng: lng });
          }).catch(function (error) {
            contentBlock.innerHTML = '\n          <h2>Sorry, we have some error :(</h2>\n          <p class="error">' + error + '</p>\n        ';
          });
        },

        onLeave: function onLeave() {}
      };
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/routes\\coordinates.js", "/routes");
  }, { "../components/Forecast": 7, "../components/Map": 9, "../components/Star": 12, "../utils/helpers": 20, "buffer": 2, "e/U+97": 4 }], 18: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var index = {
        name: 'index',
        match: '',
        onEnter: function onEnter() {
          var contentBlock = document.querySelector('section.main .content');
          contentBlock.classList.remove('col-md-12');
          contentBlock.classList.add('col-md-offset-2', 'col-md-8');
          contentBlock.innerHTML = '\n        <h2>Welcome to cool weather app.</h2>\n        <p>Enter your city to get a latest forecast!</p>\n      ';
          fetch('https://api.userinfo.io/userinfos').then(function (responce) {
            return responce.json();
          }).then(function (data) {
            var name = data.city.name;

            contentBlock.innerHTML += '\n            <br />\n            Or check weather for\n            <a href="#city=' + name + '">' + name + '</a> ;)\n          ';
          });
        }
      };

      exports.index = index;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/routes\\index.js", "/routes");
  }, { "buffer": 2, "e/U+97": 4 }], 19: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

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

      var EventBus = function () {
        function EventBus() {
          _classCallCheck(this, EventBus);

          this.listeners = {};
        }

        _createClass(EventBus, [{
          key: "on",
          value: function on(name, func) {
            if (!this.listeners[name]) {
              this.listeners[name] = [];
            }

            this.listeners[name].push(func);
          }
        }, {
          key: "off",
          value: function off(name, func) {
            if (!this.listeners[name]) return;

            var index = this.listeners[name].indexOf(func);
            this.listeners[name].splice(index, 1);

            if (this.listeners[name].length === 0) {
              delete this.listeners[name];
            }
          }
        }, {
          key: "trigger",
          value: function trigger(name, data) {
            if (!this.listeners[name]) return;

            this.listeners[name].map(function (item) {
              item(data);
            });
          }
        }, {
          key: "once",
          value: function once(name, func) {
            // пробовал через new Function вызывать функцию с таким же названием
            // и потом удалять в ней, не получилось
          }
        }]);

        return EventBus;
      }();

      exports.default = EventBus;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/utils\\EventBus.js", "/utils");
  }, { "buffer": 2, "e/U+97": 4 }], 20: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var getUrlHashParams = exports.getUrlHashParams = function getUrlHashParams() {
        var url = window.location.hash;

        var queryParams = {};

        var param = url.split('?')[1].split('&');

        param.map(function (item) {
          var items = item.split('=');
          queryParams[items[0]] = items[1];
        });

        return queryParams;
      };
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/utils\\helpers.js", "/utils");
  }, { "buffer": 2, "e/U+97": 4 }], 21: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

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

      // смысл понял, потом напишу свой

      var Router = function () {
        function Router(config) {
          _classCallCheck(this, Router);

          this.eventBus = config.eventBus;
          this.routes = config.routes || [];

          this.init();
        }

        _createClass(Router, [{
          key: 'init',
          value: function init() {
            var _this = this;

            console.log('---> router init');
            // 1. Подписать this.handleUrl на изменения url
            window.addEventListener('hashchange', function () {
              return _this.handleUrl(window.location.hash);
            });
            // 2. Выполнить this.handleUrl
            this.handleUrl(window.location.hash);
          }
        }, {
          key: 'findPreviousActiveRoute',
          value: function findPreviousActiveRoute() {
            console.log('---> router findPreviousActiveRoute: ' + (this.currentRoute || {}).name);
            // Найти роут с которого уходим
            return this.currentRoute;
          }
        }, {
          key: 'findNewActiveRoute',
          value: function findNewActiveRoute(url) {
            // Найти роут на который переходим
            // console.log(this.routes);
            var route = this.routes.find(function (routeItem) {
              if (typeof routeItem.match === 'string') {
                return url === routeItem.match;
              } else if (typeof routeItem.match === 'function') {
                return routeItem.match(url);
              } else if (routeItem.match instanceof RegExp) {
                return url.match(routeItem.match);
              }
            });

            console.log('---> router findNewActiveRoute: ' + url + ' -- ' + (route || {}).name);
            return route;
          }
          // getRouteParams(route, url) {
          // 	 var params = url.match(route.match) || [];
          //    params.shift();
          //    return params;
          // },

        }, {
          key: 'handleUrl',
          value: function handleUrl(url) {
            var _this2 = this;

            url = url.slice(1);
            // Найти текущий роут
            var previousRoute = this.findPreviousActiveRoute();
            // Найти новый роут
            var newRoute = this.findNewActiveRoute(url);
            // console.log(newRoute);
            // console.log(url);

            // let routeParams = this.getRouteParams(newRoute, url);

            // Если есть роут с которого уходим - выполнить его .onLeave
            Promise.resolve().then(function () {
              return previousRoute && previousRoute.onLeave && previousRoute.onLeave(window.location.hash, _this2.eventBus);
            }
            // После этого выполнить .onBeforeEnter для нового активного роута
            ).then(function () {
              return newRoute && newRoute.onBeforeEnter && newRoute.onBeforeEnter(window.location.hash, _this2.eventBus);
            }
            // После этого выполнить .onEnter для ногового активного роута ( только если с .onBeforeEnter все ок)

            ).then(function () {
              return newRoute && newRoute.onEnter && newRoute.onEnter(window.location.hash, _this2.eventBus);
            }).then(function () {
              _this2.currentRoute = newRoute;
              // this.currentRouteParams = routeParams;
            });
          }
        }]);

        return Router;
      }();

      ;

      exports.default = Router;

      // class Router {
      //   constructor(routes, eventBus) {
      //     this.eventBus = eventBus;
      //     this.routes = routes;
      //
      //     this.handleHashChange = this.handleHashChange.bind(this);
      //   }
      //
      //
      //   init() {
      //     window.addEventListener('hashchange', this.handleHashChange);
      //     this.handleHashChange();
      //   }
      //
      //   findPreviousActiveRoute() {
      //
      //   }
      //
      //   findNewActiveRoute() {
      //
      //   }
      //
      //
      //   handleHashChange() {
      //     const lastRoute = window.location.oldUrl;
      //     const newRoute = window.location.hash;
      //
      //
      //
      //     // last route onLeave
      //     this.routes[lastRoute].onLeave(this.eventBus)
      //       .then(() => {
      //         // new route beforeEnter
      //         return this.routes[newRoute].onBeforeEnter(this.eventBus);
      //       })
      //       .then(() => {
      //         // new route onEnter
      //         return this.routes[newRoute].onEnter(this.eventBus);
      //       })
      //       .catch(error => {
      //         console.log(error);
      //       })
      //   }
      // }
      //
      // export default Router;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/utils\\router.js", "/utils");
  }, { "buffer": 2, "e/U+97": 4 }] }, {}, [14]);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL0xvTC9Ecm9wYm94L9C60YPRgNGB0YsvanMtLWJhc2UtY291cnNlLzA0L2h0L0hhcHB5Q29kZUhlcmUvd2VhdGhlciBhcHAgMi9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiQzovVXNlcnMvTG9ML0Ryb3Bib3gv0LrRg9GA0YHRiy9qcy0tYmFzZS1jb3Vyc2UvMDQvaHQvSGFwcHlDb2RlSGVyZS93ZWF0aGVyIGFwcCAyL25vZGVfbW9kdWxlcy9iYXNlNjQtanMvbGliL2I2NC5qcyIsIkM6L1VzZXJzL0xvTC9Ecm9wYm94L9C60YPRgNGB0YsvanMtLWJhc2UtY291cnNlLzA0L2h0L0hhcHB5Q29kZUhlcmUvd2VhdGhlciBhcHAgMi9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwiQzovVXNlcnMvTG9ML0Ryb3Bib3gv0LrRg9GA0YHRiy9qcy0tYmFzZS1jb3Vyc2UvMDQvaHQvSGFwcHlDb2RlSGVyZS93ZWF0aGVyIGFwcCAyL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwiQzovVXNlcnMvTG9ML0Ryb3Bib3gv0LrRg9GA0YHRiy9qcy0tYmFzZS1jb3Vyc2UvMDQvaHQvSGFwcHlDb2RlSGVyZS93ZWF0aGVyIGFwcCAyL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJDOi9Vc2Vycy9Mb0wvRHJvcGJveC/QutGD0YDRgdGLL2pzLS1iYXNlLWNvdXJzZS8wNC9odC9IYXBweUNvZGVIZXJlL3dlYXRoZXIgYXBwIDIvbm9kZV9tb2R1bGVzL3NreWNvbnMvc2t5Y29ucy5qcyIsIkM6L1VzZXJzL0xvTC9Ecm9wYm94L9C60YPRgNGB0YsvanMtLWJhc2UtY291cnNlLzA0L2h0L0hhcHB5Q29kZUhlcmUvd2VhdGhlciBhcHAgMi9zcmMvanMvY29tcG9uZW50cy9GYXZvcml0ZXMuanMiLCJDOi9Vc2Vycy9Mb0wvRHJvcGJveC/QutGD0YDRgdGLL2pzLS1iYXNlLWNvdXJzZS8wNC9odC9IYXBweUNvZGVIZXJlL3dlYXRoZXIgYXBwIDIvc3JjL2pzL2NvbXBvbmVudHMvRm9yZWNhc3QuanMiLCJDOi9Vc2Vycy9Mb0wvRHJvcGJveC/QutGD0YDRgdGLL2pzLS1iYXNlLWNvdXJzZS8wNC9odC9IYXBweUNvZGVIZXJlL3dlYXRoZXIgYXBwIDIvc3JjL2pzL2NvbXBvbmVudHMvSGlzdG9yeS5qcyIsIkM6L1VzZXJzL0xvTC9Ecm9wYm94L9C60YPRgNGB0YsvanMtLWJhc2UtY291cnNlLzA0L2h0L0hhcHB5Q29kZUhlcmUvd2VhdGhlciBhcHAgMi9zcmMvanMvY29tcG9uZW50cy9NYXAuanMiLCJDOi9Vc2Vycy9Mb0wvRHJvcGJveC/QutGD0YDRgdGLL2pzLS1iYXNlLWNvdXJzZS8wNC9odC9IYXBweUNvZGVIZXJlL3dlYXRoZXIgYXBwIDIvc3JjL2pzL2NvbXBvbmVudHMvTWVudS5qcyIsIkM6L1VzZXJzL0xvTC9Ecm9wYm94L9C60YPRgNGB0YsvanMtLWJhc2UtY291cnNlLzA0L2h0L0hhcHB5Q29kZUhlcmUvd2VhdGhlciBhcHAgMi9zcmMvanMvY29tcG9uZW50cy9TZWFyY2guanMiLCJDOi9Vc2Vycy9Mb0wvRHJvcGJveC/QutGD0YDRgdGLL2pzLS1iYXNlLWNvdXJzZS8wNC9odC9IYXBweUNvZGVIZXJlL3dlYXRoZXIgYXBwIDIvc3JjL2pzL2NvbXBvbmVudHMvU3Rhci5qcyIsIkM6L1VzZXJzL0xvTC9Ecm9wYm94L9C60YPRgNGB0YsvanMtLWJhc2UtY291cnNlLzA0L2h0L0hhcHB5Q29kZUhlcmUvd2VhdGhlciBhcHAgMi9zcmMvanMvY29tcG9uZW50cy9Td2l0Y2hlci5qcyIsIkM6L1VzZXJzL0xvTC9Ecm9wYm94L9C60YPRgNGB0YsvanMtLWJhc2UtY291cnNlLzA0L2h0L0hhcHB5Q29kZUhlcmUvd2VhdGhlciBhcHAgMi9zcmMvanMvZmFrZV8yNWU1NTMxZC5qcyIsIkM6L1VzZXJzL0xvTC9Ecm9wYm94L9C60YPRgNGB0YsvanMtLWJhc2UtY291cnNlLzA0L2h0L0hhcHB5Q29kZUhlcmUvd2VhdGhlciBhcHAgMi9zcmMvanMvcm91dGVzL2Fib3V0LmpzIiwiQzovVXNlcnMvTG9ML0Ryb3Bib3gv0LrRg9GA0YHRiy9qcy0tYmFzZS1jb3Vyc2UvMDQvaHQvSGFwcHlDb2RlSGVyZS93ZWF0aGVyIGFwcCAyL3NyYy9qcy9yb3V0ZXMvY2l0eS5qcyIsIkM6L1VzZXJzL0xvTC9Ecm9wYm94L9C60YPRgNGB0YsvanMtLWJhc2UtY291cnNlLzA0L2h0L0hhcHB5Q29kZUhlcmUvd2VhdGhlciBhcHAgMi9zcmMvanMvcm91dGVzL2Nvb3JkaW5hdGVzLmpzIiwiQzovVXNlcnMvTG9ML0Ryb3Bib3gv0LrRg9GA0YHRiy9qcy0tYmFzZS1jb3Vyc2UvMDQvaHQvSGFwcHlDb2RlSGVyZS93ZWF0aGVyIGFwcCAyL3NyYy9qcy9yb3V0ZXMvaW5kZXguanMiLCJDOi9Vc2Vycy9Mb0wvRHJvcGJveC/QutGD0YDRgdGLL2pzLS1iYXNlLWNvdXJzZS8wNC9odC9IYXBweUNvZGVIZXJlL3dlYXRoZXIgYXBwIDIvc3JjL2pzL3V0aWxzL0V2ZW50QnVzLmpzIiwiQzovVXNlcnMvTG9ML0Ryb3Bib3gv0LrRg9GA0YHRiy9qcy0tYmFzZS1jb3Vyc2UvMDQvaHQvSGFwcHlDb2RlSGVyZS93ZWF0aGVyIGFwcCAyL3NyYy9qcy91dGlscy9oZWxwZXJzLmpzIiwiQzovVXNlcnMvTG9ML0Ryb3Bib3gv0LrRg9GA0YHRiy9qcy0tYmFzZS1jb3Vyc2UvMDQvaHQvSGFwcHlDb2RlSGVyZS93ZWF0aGVyIGFwcCAyL3NyYy9qcy91dGlscy9yb3V0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQSxBQUNBOztBQUNBLG1CQUNBOztBQUNBLDJCQUNBO0FBQ0EsQUFDQTs7bUVBQ0EsQUFDQTs7a0NBQ0E7bUNBQ0E7b0NBQ0E7bUNBQ0E7bUNBQ0E7MkNBQ0E7NENBQ0EsQUFDQTs7NkJBQ0E7b0NBQ0E7a0VBQ0E7b0VBQ0E7d0NBQ0E7OERBQ0E7K0NBQ0E7dURBQ0E7QUFDQSxBQUNBOztxQ0FDQTswQ0FDQSxBQUNBOztrQ0FDQTs0QkFDQTtBQUNBLEFBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTt3QkFDQTs2RkFDQSxBQUNBOztBQUNBOzZDQUNBLEFBQ0E7O0FBQ0E7c0RBQ0EsQUFDQTs7a0JBQ0EsQUFDQTs7MkJBQ0E7dUJBQ0E7QUFDQSxBQUNBOztvREFDQTt5SUFDQTtxQ0FDQTttQ0FDQTt1QkFDQTtBQUNBLEFBQ0E7O2tDQUNBOzRFQUNBO3VCQUNBO3lDQUNBOzhHQUNBOzRCQUNBO3VCQUNBO0FBQ0EsQUFDQTs7aUJBQ0E7QUFDQSxBQUNBOztzQ0FDQTtjQUNBOzBDQUNBOztBQUNBO21CQUNBO2NBQ0E7Y0FDQSxBQUNBOzsrQkFDQTtpQ0FDQTtBQUNBLEFBQ0E7O3dDQUNBO2dIQUNBO0FBQ0EsQUFDQTs7QUFDQTs4RUFDQTtzRUFDQTtzQ0FDQTtBQUNBLEFBQ0E7O0FBQ0E7a0JBQ0E7aUJBQ0E7MENBQ0E7dUNBQ0E7MkNBQ0E7d0JBQ0E7QUFDQTtpQkFDQTsyRUFDQTt1Q0FDQTsyQ0FDQTsyQ0FDQTt3QkFDQTtBQUNBLEFBQ0EsQUFDQTs7O2lCQUNBO0FBQ0EsQUFDQTs7OEJBQ0E7Z0NBQ0E7b0VBQ0EsQUFDQTs7O0FDeEhBO0FBQ0EsQUFDQTs7QUFDQTs7OztBQUNBOztBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBOzs7Ozs7O0FBQ0E7QUFDQSw0QkFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFDQTs7QUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBOzs7OztBQUNBLDJDQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtZQUNBO29DQUNBO21DQUNBO2dDQUNBO21CQUNBO0FBQ0E7eUVBQ0E7b0JBQ0E7aUJBQ0E7QUFDQTtBQUNBOztBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBOzs7Ozs7Ozs7Ozs7b0RBQ0E7NEVBQ0EsQUFDQTs7MEVBQ0EsQUFDQTs7QUFDQTtBQUNBO3dEQUNBOytCQUNBOzJDQUNBO2dDQUNBO0FBQ0E7QUFDQSxBQUNBOztBQUNBO1lBQ0E7NkxBQ0E7K0JBQ0EsQUFDQTs7WUFDQTtvQ0FDQTtBQUNBOytDQUNBO2VBQ0E7QUFDQTtnQkFDQTt1QkFDQTswQkFDQTtBQUNBLEFBQ0E7O1lBQ0E7OEVBQ0E7QUFDQTttQkFDQTt3Q0FDQTtBQUNBO3VDQUNBOzhGQUNBO0FBQ0E7c0NBQ0E7Z0NBQ0E7NEVBQ0E7dUNBQ0E7cUJBQ0E7QUFDQTtBQUNBLEFBQ0E7O2VBQ0E7QUFDQTs7QUFDQTtBQUNBLEFBQ0E7O0FBQ0EsOENBQ0E7aUNBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTtlQUNBO21CQUNBO0FBQ0E7bUJBQ0EsQUFDQTs7QUFDQTs7QUFDQSxxQ0FDQTtxREFDQTtBQUNBOztBQUNBLG1EQUNBO1lBQ0E7b0JBQ0E7NEJBQ0E7ZUFDQTsrQkFDQTtBQUNBO2VBQ0E7ZUFDQTttQ0FDQTtBQUNBO2VBQ0E7ZUFDQTtlQUNBO3NCQUNBO0FBQ0E7ZUFDQTtxQ0FDQTtBQUNBO2VBQ0E7ZUFDQTtlQUNBO2VBQ0E7K0JBQ0E7QUFDQTtBQUNBOzRCQUNBLEFBQ0E7O2VBQ0E7QUFDQTs7QUFDQSxtREFDQTs4RUFDQSxBQUNBOzsrQkFDQTs0QkFDQTtzQ0FDQTtzQkFDQTtBQUNBLEFBQ0E7O1lBQ0E7NkNBQ0E7d0JBQ0E7NENBQ0E7bUNBQ0E7QUFDQTtBQUNBLEFBQ0E7OzZCQUNBO2tCQUNBOzBDQUNBOzBCQUNBO3lCQUNBO3NCQUNBO0FBQ0E7ZUFDQTtBQUNBOztBQUNBO0FBQ0EsQUFDQTs7QUFDQSxzREFDQTttQ0FDQTtxQ0FDQTtxQkFDQTttQkFDQTtlQUNBOzBCQUNBO2tDQUNBO3FCQUNBO0FBQ0E7QUFDQSxBQUNBOztBQUNBOzRCQUNBO2lDQUNBLEFBQ0E7O2lDQUNBOzRCQUNBO0FBQ0E7eUNBQ0E7dURBQ0E7K0JBQ0E7NEJBQ0E7QUFDQTttQ0FDQTtlQUNBO0FBQ0E7O0FBQ0EsdURBQ0E7K0ZBQ0E7ZUFDQTtBQUNBOztBQUNBLHdEQUNBO2dHQUNBO2VBQ0E7QUFDQTs7QUFDQSx5REFDQTtnREFDQTtBQUNBOztBQUNBLHlEQUNBO2lHQUNBO2VBQ0E7QUFDQTs7QUFDQSwwREFDQTtrR0FDQTtlQUNBO0FBQ0E7O0FBQ0EsMkVBQ0E7QUFDQTtBQUNBOzhCQUNBO2lDQUNBO3VCQUNBO3FCQUNBO0FBQ0E7ZUFDQTtBQUNBO3FCQUNBO3FCQUNBO21CQUNBO21CQUNBO0FBQ0EsQUFDQTs7bUNBQ0E7c0NBQ0E7cUJBQ0E7bUJBQ0E7ZUFDQTswQkFDQTtrQ0FDQTtxQkFDQTtBQUNBO0FBQ0E7OENBQ0EsQUFDQTs7WUFDQTtnQkFDQTtlQUNBO2tEQUNBO0FBQ0E7ZUFDQTtlQUNBO21EQUNBO0FBQ0E7ZUFDQTtvREFDQTtBQUNBO2VBQ0E7cURBQ0E7QUFDQTtlQUNBO3FEQUNBO0FBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTtzREFDQTtBQUNBO0FBQ0E7NEJBQ0EsQUFDQTs7ZUFDQTtBQUNBOztBQUNBLGtFQUNBO21CQUNBLEFBQ0E7OzhDQUNBO2lDQUNBOzJEQUNBLEFBQ0E7O0FBQ0E7a0NBQ0EsQUFDQTs7WUFDQTtnQkFDQTtlQUNBO3lDQUNBO0FBQ0E7ZUFDQTtlQUNBOzBDQUNBO0FBQ0E7ZUFDQTsyQ0FDQTtBQUNBO2VBQ0E7NENBQ0E7QUFDQTtlQUNBOzRDQUNBO0FBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTs2Q0FDQTtBQUNBO0FBQ0E7NEJBQ0EsQUFDQTs7ZUFDQTtBQUNBOztBQUNBLDRDQUNBOztnQkFFQTs4REFDQSxBQUNBO0FBSEE7QUFJQTs7QUFDQTtBQUNBLDBFQUNBO3FCQUNBLEFBQ0E7OzRCQUNBOzBDQUNBOzBDQUNBLEFBQ0E7O0FBQ0E7MkJBQ0E7d0RBQ0EsQUFDQTs7QUFDQTs2QkFDQTtrRUFDQTtvREFDQTtpREFDQSxBQUNBOztBQUNBOzRDQUNBOzZGQUNBLEFBQ0E7O3dCQUNBLEFBQ0E7O2tEQUNBO3dDQUNBO2dEQUNBO0FBQ0E7ZUFDQTt5REFDQTtBQUNBO0FBQ0E7O0FBQ0EsNkNBQ0E7K0NBQ0E7c0NBQ0E7ZUFDQTt1REFDQTtBQUNBO0FBQ0E7O0FBQ0EsMkNBQ0E7a0JBQ0E7a0JBQ0E7bUNBQ0EsQUFDQTs7MENBQ0E7OEJBQ0E7aUVBQ0E7a0JBQ0E7aUJBQ0E7eUNBQ0E7QUFDQTtBQUNBLEFBQ0E7O29DQUNBO0FBQ0E7O0FBQ0EsNENBQ0E7a0JBQ0E7bUNBQ0EsQUFDQTs7MENBQ0E7eUNBQ0E7Z0JBQ0E7QUFDQTs7QUFDQSw2Q0FDQTt1Q0FDQTtBQUNBOztBQUNBLDBDQUNBO3NCQUNBLEFBQ0E7O3lDQUNBO2dEQUNBLEFBQ0E7O2tCQUNBOzBDQUNBOzJCQUNBO0FBQ0E7ZUFDQTtBQUNBOztBQUNBLDhDQUNBO3FDQUNBO2tCQUNBO2tEQUNBOytEQUNBO0FBQ0E7ZUFDQTtBQUNBOztBQUNBLHFEQUNBO3VCQUNBO2tDQUNBOzhCQUNBLEFBQ0E7O29DQUNBO3NEQUNBO2VBQ0E7K0JBQ0E7dURBQ0E7NkNBQ0E7aUNBQ0E7QUFDQTtpQkFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQSwrQ0FDQTtvQkFDQTs4QkFDQTtBQUNBOztBQUNBO0FBQ0Esa0RBQ0E7b0JBQ0E7a0NBQ0E7QUFDQTs7QUFDQSwrREFDQTt1QkFDQTswREFDQTt1Q0FDQTtBQUNBLEFBQ0E7O21DQUNBLEFBQ0E7O29CQUNBO0FBQ0E7O0FBQ0EsZ0VBQ0E7dUJBQ0E7b0RBQ0E7MERBQ0E7MENBQ0E7QUFDQSxBQUNBOztzQkFDQTsyQkFDQSxBQUNBOztZQUNBOzBCQUNBO29CQUNBOzBEQUNBO2VBQ0E7K0JBQ0E7b0RBQ0E7QUFDQTtlQUNBO0FBQ0E7O0FBQ0Esa0VBQ0E7K0NBQ0E7QUFDQTs7QUFDQSxrRUFDQTtnREFDQTtBQUNBOztBQUNBLGdFQUNBO3VCQUNBO29EQUNBOzBEQUNBOzBDQUNBO0FBQ0EsQUFDQTs7c0JBQ0E7MkJBQ0EsQUFDQTs7WUFDQTswQkFDQTt5REFDQTswREFDQTtxQkFDQTt1RUFDQTtlQUNBO3lEQUNBOzBEQUNBO29EQUNBOzZDQUNBO0FBQ0E7ZUFDQTtBQUNBOztBQUNBLGtFQUNBOytDQUNBO0FBQ0E7O0FBQ0Esa0VBQ0E7Z0RBQ0E7QUFDQTs7QUFDQSw4REFDQTt1QkFDQTswREFDQTt1Q0FDQTtBQUNBLEFBQ0E7O21DQUNBLEFBQ0E7O2lDQUNBO3dFQUNBO0FBQ0E7O0FBQ0EsK0RBQ0E7dUJBQ0E7b0RBQ0E7MERBQ0E7MENBQ0E7QUFDQSxBQUNBOztzQkFDQTsyQkFDQSxBQUNBOzt5REFDQTt3QkFDQTs0REFDQTtBQUNBOztBQUNBLGlFQUNBOzhDQUNBO0FBQ0E7O0FBQ0EsaUVBQ0E7K0NBQ0E7QUFDQTs7QUFDQSwrREFDQTt1QkFDQTtvREFDQTswREFDQTswQ0FDQTtBQUNBLEFBQ0E7O3NCQUNBOzJCQUNBLEFBQ0E7O3lEQUNBO3dCQUNBO2dFQUNBO0FBQ0E7O0FBQ0EsaUVBQ0E7OENBQ0E7QUFDQTs7QUFDQSxpRUFDQTsrQ0FDQTtBQUNBOztBQUNBLCtEQUNBO3VCQUNBO29EQUNBOzBDQUNBO0FBQ0EsQUFDQTs7MkRBQ0E7QUFDQTs7QUFDQSxpRUFDQTs4Q0FDQTtBQUNBOztBQUNBLGlFQUNBOytDQUNBO0FBQ0E7O0FBQ0EsZ0VBQ0E7dUJBQ0E7b0RBQ0E7MENBQ0E7QUFDQSxBQUNBOzsyREFDQTtBQUNBOztBQUNBLGtFQUNBOytDQUNBO0FBQ0E7O0FBQ0Esa0VBQ0E7Z0RBQ0E7QUFDQTs7QUFDQSx1RUFDQTt1QkFDQTt3REFDQTswREFDQTt1Q0FDQTsyQkFDQTtBQUNBLEFBQ0E7O21DQUNBLEFBQ0E7O3VCQUNBO0FBQ0E7O0FBQ0Esd0VBQ0E7dUJBQ0E7d0RBQ0E7b0RBQ0E7MERBQ0E7MENBQ0E7MkJBQ0E7QUFDQSxBQUNBOztzQkFDQTsyQkFDQSxBQUNBOzttRUFDQTs4R0FDQTtBQUNBO0FBQ0E7O0FBQ0EsMEVBQ0E7Z0RBQ0E7QUFDQTs7QUFDQSwwRUFDQTtpREFDQTtBQUNBOztBQUNBLHdFQUNBO3VCQUNBO3dEQUNBO29EQUNBOzBEQUNBOzBDQUNBOzJCQUNBO0FBQ0EsQUFDQTs7c0JBQ0E7MkJBQ0EsQUFDQTs7bUVBQ0E7dUVBQ0E7QUFDQTtBQUNBOztBQUNBLDBFQUNBO2dEQUNBO0FBQ0E7O0FBQ0EsMEVBQ0E7aURBQ0E7QUFDQTs7QUFDQSxzRUFDQTt1QkFDQTt3REFDQTswREFDQTt1Q0FDQTtrQ0FDQTtBQUNBLEFBQ0E7O21DQUNBLEFBQ0E7O2dIQUNBO0FBQ0E7O0FBQ0EsdUVBQ0E7dUJBQ0E7d0RBQ0E7b0RBQ0E7MERBQ0E7MENBQ0E7b0NBQ0E7QUFDQSxBQUNBOztzQkFDQTsyQkFDQSxBQUNBOztrSkFDQTtBQUNBOztBQUNBLHlFQUNBOytDQUNBO0FBQ0E7O0FBQ0EseUVBQ0E7Z0RBQ0E7QUFDQTs7QUFDQSx1RUFDQTt1QkFDQTt3REFDQTtvREFDQTswREFDQTswQ0FDQTt3Q0FDQTtBQUNBLEFBQ0E7O3NCQUNBOzJCQUNBLEFBQ0E7O3NKQUNBO0FBQ0E7O0FBQ0EseUVBQ0E7K0NBQ0E7QUFDQTs7QUFDQSx5RUFDQTtnREFDQTtBQUNBOztBQUNBLHVFQUNBO3VCQUNBO3dEQUNBO29EQUNBOzBEQUNBOzBDQUNBO3VEQUNBO0FBQ0EsQUFDQTs7c0JBQ0E7MkJBQ0EsQUFDQTs7NERBQ0E7QUFDQTs7QUFDQSx5RUFDQTsrQ0FDQTtBQUNBOztBQUNBLHlFQUNBO2dEQUNBO0FBQ0E7O0FBQ0Esd0VBQ0E7dUJBQ0E7d0RBQ0E7b0RBQ0E7MERBQ0E7MENBQ0E7d0RBQ0E7QUFDQSxBQUNBOztzQkFDQTsyQkFDQSxBQUNBOzs0REFDQTtBQUNBOztBQUNBLDBFQUNBO2dEQUNBO0FBQ0E7O0FBQ0EsMEVBQ0E7aURBQ0E7QUFDQTs7QUFDQTtBQUNBLDJEQUNBOzRCQUNBOzRCQUNBOzZCQUNBLEFBQ0E7O3VDQUNBO21DQUNBO0FBQ0EsQUFDQTs7MkRBQ0E7NkJBQ0EsQUFDQTs7QUFDQTs2QkFDQTsrQkFDQSxBQUNBOztrREFDQTsrQ0FDQSxBQUNBOzswQ0FDQTtvQkFDQTtBQUNBO0FBQ0E7O0FBQ0EsNkNBQ0E7a0JBQ0E7dUJBQ0E7c0NBQ0E7OEJBQ0E7K0NBQ0E7eUJBQ0E7QUFDQTtBQUNBO0FBQ0E7NENBQ0E7QUFDQTs7QUFDQSxBQUNBLEFBQ0EsQUFDQTs7OztBQUNBLG1EQUNBOytDQUNBO3NDQUNBO29DQUNBO2lCQUNBOzBDQUNBOytEQUNBOzRCQUNBO3dCQUNBO0FBQ0E7ZUFDQTswQkFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQSxBQUNBOztBQUNBLCtCQUNBO2lDQUNBO3lDQUNBO0FBQ0E7O0FBQ0Esc0JBQ0E7O0FBQ0EsQUFDQSxBQUNBOzs7QUFDQSx1Q0FDQTt3QkFDQSxBQUNBOztBQUNBO3VCQUNBO3VCQUNBLEFBQ0E7O0FBQ0E7cUJBQ0E7cUJBQ0EsQUFDQTs7dUJBQ0E7MEJBQ0E7Z0NBQ0E7d0JBQ0E7c0JBQ0E7dUJBQ0E7MkJBQ0E7OEJBQ0E7OEJBQ0E7OEJBQ0E7OEJBQ0E7MEJBQ0E7NkJBQ0E7NkJBQ0E7NkJBQ0E7NkJBQ0E7NkJBQ0E7NkJBQ0E7OEJBQ0E7OEJBQ0E7NEJBQ0E7K0JBQ0E7K0JBQ0E7K0JBQ0E7K0JBQ0E7MkJBQ0E7OEJBQ0E7OEJBQ0E7OEJBQ0E7OEJBQ0E7OEJBQ0E7OEJBQ0E7K0JBQ0E7K0JBQ0E7c0JBQ0E7eUJBQ0E7K0JBQ0EsQUFDQTs7ZUFDQTtBQUNBOztBQUNBO0FBQ0E7OENBRUE7d0JBREEsQ0FFQTtpQ0FDQTsrQkFDQTtpQkFDQTsrQkFDQTtlQUNBO0FBQ0E7O0FBQ0EsOEJBQ0E7QUFDQTtBQUNBO0FBQ0E7OEJBQ0E7Z0NBQ0E7QUFDQTs7QUFDQSxnQ0FDQTtvREFDQTs2REFDQTtXQUNBO0FBQ0E7O0FBQ0EsbUNBQ0E7c0xBQ0E7QUFDQTs7QUFDQSx3QkFDQTs0Q0FDQTswQkFDQTtBQUNBOztBQUNBLGdDQUNBO3dCQUNBOzZDQUNBO2lDQUNBO2dFQUNBO3dCQUNBOzRDQUNBO2dGQUNBOytDQUNBOzRDQUNBO0FBQ0E7QUFDQTtBQUNBO2VBQ0E7QUFDQTs7QUFDQSxpQ0FDQTt3QkFDQTs2Q0FDQTtBQUNBOzZDQUNBO0FBQ0E7ZUFDQTtBQUNBOztBQUNBLG1DQUNBO21CQUNBO3dCQUNBOzZDQUNBOzZCQUNBO29CQUNBO21CQUNBO3lCQUNBO3lCQUNBO0FBQ0EsQUFDQTs7ZUFDQTtBQUNBOztBQUNBLGtDQUNBO2tDQUNBO0FBQ0E7O0FBQ0Esb0RBQ0E7WUFDQTt5Q0FDQTsyREFDQTtnQ0FDQTtBQUNBO2VBQ0E7QUFDQTs7QUFDQSxtQ0FDQTtZQUNBO29DQUNBO3NCQUNBOzRDQUNBLEFBQ0E7O0FBQ0E7QUFDQTs7QUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBOzs7OztBQUNBLHFDQUNBOzBDQUNBOzJCQUNBOzZCQUNBOzRDQUNBO0FBQ0E7O0FBQ0EsMENBQ0E7MENBQ0E7NkJBQ0E7NkJBQ0E7NENBQ0E7QUFDQTs7QUFDQSw2Q0FDQTswQ0FDQTs2QkFDQTs2QkFDQTtBQUNBOztBQUNBLHFDQUNBOzhDQUNBO0FBQ0EsQUFDQTs7O0FDMWhDQTtBQUNBLEFBQ0E7O0FBQ0EsbUVBQ0E7ZUFDQTt1Q0FDQTtpQ0FDQTs0QkFDQTtxQkFDQTtvQ0FDQTs0QkFDQTtnQ0FDQSxBQUNBOzthQUNBLEFBQ0E7O2dDQUNBO2VBQ0E7aUJBQ0E7aUZBQ0EsQUFDQTs7Z0NBQ0E7ZUFDQTtpQkFDQTtpRkFDQSxBQUNBOztxQkFDQTtrQkFDQTsrQkFDQTswQ0FDQTtlQUNBOzhCQUNBO2tCQUNBO0FBQ0E7a0RBQ0E7QUFDQTs7QUFDQSwyRUFDQTtrQkFDQTt1Q0FDQTtpQ0FDQTs0QkFDQTtxRUFDQTtvQ0FDQTs0QkFDQTtnRUFDQSxBQUNBOzt5QkFDQSxBQUNBOztnREFDQTtpQ0FDQTtjQUNBO2VBQ0E7Z0RBQ0E7aURBQ0E7QUFDQTtpQkFDQTtBQUNBOzhCQUNBOzBCQUNBO2lCQUNBOzBDQUNBO0FBQ0E7OEJBQ0E7QUFDQTtpQkFDQTtBQUNBLEFBQ0E7O2lDQUNBO2dCQUNBO2dCQUNBO3FDQUNBOzhDQUNBO29CQUNBO2lCQUNBOzZEQUNBO2dCQUNBO0FBQ0E7QUFDQSxBQUNBOzt1RkFDQSxBQUNBOzt3QkFDQTtnQkFDQTtzRkFDQSxBQUNBOztzQ0FDQTtBQUNBLEFBQ0E7OztBQ3hGQTtBQUNBLEFBQ0E7O0FBQ0EsQUFDQTs7QUFDQSxxQ0FDQTs7QUFDQSxxQ0FDQTtzRUFDQTtvRkFDQSxBQUNBOzs2QkFDQTs4QkFDQTt1Q0FDQTtBQUNBO0FBQ0EsQUFDQTs7cUJBQ0E7c0JBQ0E7MkRBQ0E7NEJBQ0E7c0ZBQ0E7aUJBQ0E7b0NBQ0E7K0JBQ0E7QUFDQTtBQUNBO0FBQ0E7YUFDQSxBQUNBOzt1Q0FDQTt1QkFDQTsrQ0FDQTtBQUNBO0FBQ0EsQUFDQTs7cUNBQ0E7eUJBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUNBOztBQUNBLHVCQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUNBOztBQUNBLHdDQUNBO3dCQUNBO0FBQ0E7O0FBQ0E7QUFDQSxnQ0FDQTtlQUNBOztBQUNBLHFDQUNBO3dCQUNBO0FBQ0EsQUFDQTs7O0FDcEVBO0FBQ0E7QUFDQSxBQUNBOztBQUNBLHlDQUNBLEFBQ0E7O0FBQ0EsQUFDQTs7NkJBQ0EsQUFDQTs7cUJBQ0E7cUtBQ0E7aUtBQ0EsQUFDQTs7MEJBQ0E7a0VBQ0E7b0NBQ0EsQUFDQTs7OEJBQ0E7bUNBQ0E7QUFDQTtBQUNBLEFBQ0E7O0FBQ0E7cUJBQ0E7QUFDQSxBQUNBOzs2REFDQTt5QkFDQTtBQUNBO2lCQUNBOzhCQUNBOzZCQUNBO0FBQ0E7QUFDQSxBQUNBOztBQUNBO0FBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUNBLEFBQ0E7O3VCQUNBO3FCQUNBOzZCQUNBOzhDQUNBLEFBQ0E7O3NDQUNBO2NBQ0E7bUNBQ0E7Y0FDQTtBQUNBLEFBQ0E7OzJDQUNBO2NBQ0E7eUJBQ0E7eUJBQ0E7Y0FDQTtBQUNBLEFBQ0E7OzBEQUNBOytCQUNBOytCQUNBLEFBQ0E7O2tCQUNBLEFBQ0E7O29GQUNBO0FBQ0EsQUFDQTs7MkRBQ0E7Y0FDQSxBQUNBOzs0QkFDQTt1REFDQTtBQUNBO0FBQ0EsQUFDQTs7cURBQ0E7ZUFDQSxBQUNBOzt1QkFDQTt1QkFDQTt1QkFDQTt1QkFDQSxBQUNBOzswQkFDQTt5Q0FDQSxBQUNBOzt5Q0FDQTtpREFDQTt5Q0FDQTtBQUNBLEFBQ0E7O21EQUNBO2VBQ0EsQUFDQTs7a0NBQ0E7a0NBQ0E7a0NBQ0E7Y0FDQTtjQUNBO2NBQ0E7Y0FDQSxBQUNBOzs0QkFDQTswQkFDQTt3QkFDQTt5QkFDQSxBQUNBOztjQUNBO3FDQUNBO2NBQ0EsQUFDQTs7NEJBQ0E7OEJBQ0E7MkJBQ0E7MkJBQ0E7MkVBQ0E7QUFDQTtBQUNBLEFBQ0E7O29EQUNBO2VBQ0EsQUFDQTs7a0NBQ0E7dUJBQ0E7K0JBQ0E7NkJBQ0EsQUFDQTs7NEJBQ0E7MEJBQ0E7d0JBQ0E7eUJBQ0EsQUFDQTs7b0JBQ0EsQUFDQTs7Y0FDQTsyREFDQTt1SUFDQTtjQUNBO2NBQ0E7QUFDQSxBQUNBOztvREFDQTtlQUNBLEFBQ0E7O3VCQUNBOzZCQUNBOzRCQUNBO2NBQ0E7Y0FDQTtjQUNBO2NBQ0EsQUFDQTs7MEJBQ0EsQUFDQTs7NEJBQ0E7OEJBQ0E7dUVBQ0E7NkJBQ0E7Z0JBQ0E7a0NBQ0E7MENBQ0E7Z0JBQ0E7QUFDQTtBQUNBLEFBQ0E7O3FEQUNBO2VBQ0EsQUFDQTs7dUJBQ0E7NkJBQ0E7NEJBQ0E7Y0FDQTtjQUNBO2NBQ0E7Y0FDQSxBQUNBOzs0QkFDQTs4QkFDQTt3QkFDQTt5QkFDQSxBQUNBOzs0QkFDQTs4QkFDQTt1RkFDQTt5QkFDQTtpREFDQTtBQUNBO0FBQ0EsQUFDQTs7b0RBQ0E7ZUFDQSxBQUNBOzt1QkFDQTtzQkFDQTs0QkFDQTtpQ0FDQTtpQ0FDQTs0QkFDQTtpQ0FDQTtpQ0FDQTtnQ0FDQTtpQ0FDQTtpQ0FDQTtjQUNBO2NBQ0E7Y0FDQTtjQUNBLEFBQ0E7OzRCQUNBOzhCQUNBO3dCQUNBO3lCQUNBLEFBQ0E7OzRCQUNBOzhCQUNBO21EQUNBO3lCQUNBLEFBQ0E7O2tEQUNBO2tEQUNBO2tEQUNBO0FBQ0E7QUFDQSxBQUNBOzt1REFDQTtlQUNBLEFBQ0E7O3VCQUNBO3VCQUNBO3VCQUNBO3VCQUNBLEFBQ0E7OzBCQUNBO3lDQUNBLEFBQ0E7O3lDQUNBO2lEQUNBO3lDQUNBO0FBQ0EsQUFDQTs7QUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4bURBQ0E7NEVBQ0EsQUFDQTs7a0RBQ0E7dUJBQ0E7c0JBQ0E7c0JBQ0E7MEJBQ0E7MkJBQ0E7MkJBQ0EsQUFDQTs7MEJBQ0E7NEJBQ0E7MEJBQ0E7d0JBQ0E7eUJBQ0EsQUFDQTs7Y0FDQTsyQ0FDQTsyREFDQTsyREFDQTt5Q0FDQTtjQUNBO3lDQUNBO2NBQ0E7QUFDQSxBQUNBOztvRUFDQTtlQUNBLEFBQ0E7O2dDQUNBOzREQUNBOzBEQUNBO2dDQUNBO2NBQ0E7Y0FDQTtjQUNBO2NBQ0EsQUFDQTs7NEJBQ0E7MEJBQ0E7d0JBQ0E7eUJBQ0EsQUFDQTs7cUJBQ0E7Z0JBQ0EsQUFDQTs7bUNBQ0E7MkJBQ0E7aUJBQ0E7aUJBQ0E7aUJBQ0EsQUFDQTs7eUhBQ0EsQUFDQTs7dUJBQ0E7cUNBQ0E7NkJBQ0E7bUJBQ0E7bUJBQ0E7bUJBQ0EsQUFDQTs7MkNBQ0E7aUVBQ0E7NEhBQ0E7MERBQ0E7K0RBQ0E7aUJBQ0E7NEJBQ0E7Z0JBQ0EsQUFDQTs7bUNBQ0E7MkJBQ0E7aUJBQ0E7aUJBQ0E7aUJBQ0EsQUFDQTs7eURBQ0EsQUFDQTs7eUNBQ0E7K0RBQ0E7MEhBQ0EsQUFDQTs7Z0JBQ0E7QUFDQSxBQUNBOztxQkFDQTttQ0FDQTsyQkFDQTtpQkFDQTtpQkFDQTtpQkFDQSxBQUNBOztzSUFDQTtBQUNBO0FBQ0EsQUFDQTs7NkNBQ0E7c0JBQ0E7MEJBQ0E7eURBQ0E7NkNBQ0E7QUFDQSxBQUNBOztxREFDQTs2QkFDQTs2QkFDQTs4QkFDQSxBQUNBOzt1REFDQTtBQUNBLEFBQ0E7O3VEQUNBOzZCQUNBOzZCQUNBOzhCQUNBLEFBQ0E7O3dEQUNBO0FBQ0EsQUFDQTs7NkRBQ0E7NkJBQ0E7NkJBQ0E7OEJBQ0EsQUFDQTs7a0VBQ0E7b0VBQ0E7QUFDQSxBQUNBOzsrREFDQTs2QkFDQTs2QkFDQTs4QkFDQSxBQUNBOzttRUFDQTtvRUFDQTtBQUNBLEFBQ0E7O2tEQUNBOzZCQUNBOzZCQUNBOzhCQUNBLEFBQ0E7O3lEQUNBO0FBQ0EsQUFDQTs7Z0RBQ0E7NkJBQ0E7NkJBQ0E7OEJBQ0EsQUFDQTs7K0RBQ0E7Z0VBQ0E7QUFDQSxBQUNBOztpREFDQTs2QkFDQTs2QkFDQTs4QkFDQSxBQUNBOztnRUFDQTtnRUFDQTtBQUNBLEFBQ0E7O2dEQUNBOzZCQUNBOzZCQUNBOzhCQUNBLEFBQ0E7OytEQUNBO2dFQUNBO0FBQ0EsQUFDQTs7Z0RBQ0E7NkJBQ0E7NkJBQ0E7OEJBQ0EsQUFDQTs7Z0VBQ0E7Z0VBQ0E7QUFDQSxBQUNBOzsrQ0FDQTs2QkFDQTs2QkFDQTs4QkFDQTtzQkFDQSxBQUNBOzswREFDQSxBQUNBOztlQUNBLEFBQ0E7OzBDQUNBO21EQUNBO21EQUNBO21EQUNBO3NCQUNBOzRDQUNBOzRDQUNBLEFBQ0E7OzRCQUNBOzBCQUNBO3dCQUNBO3lCQUNBLEFBQ0E7O3FFQUNBO3FFQUNBO0FBQ0EsQUFDQTs7OzhFQUVBO21HQUNBLEFBQ0E7O21CQUNBO0FBQ0E7c0NBQ0E7Z0JBQ0EsQUFDQTs7cUVBQ0EsQUFDQTs7QUFDQTs2QkFDQSxBQUNBOztrREFDQSxBQUNBOztBQUNBOzRDQUNBLEFBQ0E7Ozt1QkFFQTtxQ0FDQTt1QkFDQSxBQUNBLEFBQ0E7QUFMQTs7MkJBTUE7MkJBQ0E7QUFDQTtzQ0FDQTtnQkFDQSxBQUNBOztxRUFDQSxBQUNBOzs2Q0FDQTsrQ0FDQTtzRUFDQTt3Q0FDQTtBQUNBO0FBQ0E7MEJBQ0E7QUFDQTtzQ0FDQTtnQkFDQSxBQUNBOztxRUFDQSxBQUNBOzs2Q0FDQTsrQ0FDQTtvQ0FDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO3lDQUNBO3FDQUNBLEFBQ0E7O29IQUNBLEFBQ0E7O2dEQUNBO0FBQ0E7Z0NBQ0E7dUJBQ0EsQUFDQTs7aUJBQ0E7d0RBQ0E7NkJBQ0E7a0JBQ0EsQUFDQTs7K0NBQ0E7d0NBQ0E7QUFDQTtzQkFDQTtBQUNBO2tDQUNBO2dCQUNBLEFBQ0E7OytCQUNBO2tDQUNBOzhCQUNBO0FBQ0E7QUFDQSxBQUNBO0FBakZBO2VBa0ZBO0FBQ0EsQUFDQTs7O0FDam9CQTtBQUNBLEFBQ0E7O0FBQ0E7ZUFFQSxBQUNBO0FBRkE7O0FBR0E7Ozs7Ozs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQSxrQ0FDQTs4Q0FDQTtnQ0FDQSxBQUNBOzswQkFDQTt5QkFDQSxBQUNBOzsyQkFDQSxBQUNBOzt5REFDQTsrREFDQTttRUFDQSxBQUNBOztpREFDQTtvREFDQTt1REFDQSxBQUNBOzt3Q0FDQTtBQUNBLEFBQ0E7OztlQUVBOzREQUNBO2lEQUNBOzJEQUNBO0FBQ0E7QUFMQTtlQU9BOzBEQUNBO3NFQUNBO0FBQ0E7QUFKQTtlQU1BO2lEQUNBO2dDQUNBO3FDQUNBO3dDQUNBO2lCQUNBO0FBQ0E7QUFQQTtlQVNBO29EQUNBO3dCQUNBLEFBQ0E7O2tEQUNBOzJDQUNBOzBDQUNBO0FBQ0E7QUFDQTsyQ0FDQTsrQkFDQTtBQUNBLEFBQ0E7O29EQUNBO3dDQUNBO2lCQUNBO0FBQ0E7QUFqQkE7ZUFtQkE7c0RBQ0E7eUJBQ0EsQUFDQTs7K0NBQ0E7MkNBQ0E7MERBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFWQTtlQVlBOzRDQUNBOzZEQUNBLEFBQ0E7O3dEQUNBO3VDQUNBLEFBQ0E7O3FEQUNBO3NDQUNBLEFBQ0E7OytDQUNBOzZCQUNBOzZCQUNBLEFBQ0E7OytLQUNBO0FBQ0EsQUFDQTs7b0ZBQ0E7QUFDQSxBQUNBLEFBQ0E7QUFyQkE7O2VBc0JBO0FBQ0E7O0FBQ0Esd0JBQ0EsQUFDQTs7O0FDMUdBO0FBQ0EsQUFDQTs7QUFDQTtlQUVBLEFBQ0E7QUFGQTs7QUFHQTs7Ozs7Ozs7QUFDQTs7QUFDQSw2QkFDQTs7QUFDQSw2Q0FDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBLGlDQUNBOzZDQUNBO2dDQUNBLEFBQ0E7O3lCQUNBOzBCQUNBO0FBQ0EsQUFDQTs7O2VBRUE7MkNBQ0E7MERBQ0EsQUFDQTs7eTBCQUNBLEFBQ0E7O21FQUNBO3VHQUNBO29CQUNBO0FBQ0EsQUFDQSxBQUNBO0FBWkE7O2VBYUE7QUFDQTs7QUFDQSx3QkFDQSxBQUNBOzs7QUMzQ0E7QUFDQSxBQUNBOztBQUNBO2VBRUEsQUFDQTtBQUZBOztBQUdBOzs7Ozs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0EsZ0NBQ0E7NENBQ0E7Z0NBQ0EsQUFDQTs7MEJBQ0E7eUJBQ0EsQUFDQTs7eUJBQ0EsQUFDQTs7cURBQ0EsQUFDQTs7K0NBQ0EsQUFDQTs7c0NBQ0E7QUFDQSxBQUNBOzs7ZUFFQTswREFDQTsrQ0FDQTt1REFDQTtBQUNBO0FBTEE7ZUFPQTt3REFDQTs0REFDQTtBQUNBO0FBSkE7ZUFNQTs2Q0FDQTswQ0FDQTtnREFDQTs4REFDQTtBQUNBO3lDQUNBOzJCQUNBO0FBQ0E7aUNBQ0EsQUFDQTs7c0NBQ0E7aUJBQ0E7QUFDQTtBQWRBO2VBZ0JBOzBDQUNBOzJEQUNBLEFBQ0E7O3NEQUNBO3FDQUNBLEFBQ0E7O21EQUNBO29DQUNBLEFBQ0E7OzZDQUNBOzBHQUNBO0FBQ0EsQUFDQTs7OEVBQ0E7QUFDQSxBQUNBLEFBQ0E7QUFsQkE7O2VBbUJBO0FBQ0E7O0FBQ0Esd0JBQ0EsQUFDQTs7O0FDN0VBO0FBQ0EsQUFDQTs7QUFDQTtlQUVBLEFBQ0E7QUFGQTs7QUFHQTs7Ozs7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBLDRCQUNBO3dDQUNBO2dDQUNBLEFBQ0E7OzBCQUNBO3lCQUNBLEFBQ0E7O3FCQUNBLEFBQ0E7OzJFQUNBO0FBQ0EsQUFDQTs7O2VBRUE7d0RBQ0E7MkJBQ0E7MkJBQ0EsQUFDQTs7cUNBQ0E7QUFDQTtBQVBBO2VBU0E7NENBQ0E7a0RBQ0E7NEJBQ0EsQUFDQTs7K0JBQ0E7Z0JBQ0EsQUFDQTs7dUJBQ0EsQUFDQTs7NEJBQ0E7O3dCQUVBO3NCQUNBLEFBQ0EsQUFDQTtBQUpBOztnRUFLQTsyREFDQTsyREFDQTs4RUFDQTs0RUFDQTtBQUNBLEFBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQUFDQSxBQUNBO0FBN0JBOztlQThCQTtBQUNBOztBQUNBLHdCQUNBLEFBQ0E7OztBQ2xFQTtBQUNBLEFBQ0E7O0FBQ0E7ZUFFQSxBQUNBO0FBRkE7O0FBR0E7Ozs7Ozs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQSw2QkFDQTsrQkFDQTtnQ0FDQSxBQUNBOzt5QkFDQTtBQUNBLEFBQ0E7OztlQUVBO3VDQUNBO3dEQUNBLEFBQ0E7O2tDQUNBO0FBQ0EsQUFDQSxBQUNBO0FBUkE7O2VBU0E7QUFDQTs7QUFDQSx3QkFDQSxBQUNBOzs7QUNoQ0E7QUFDQSxBQUNBOztBQUNBO2VBRUEsQUFDQTtBQUZBOztBQUdBOzs7Ozs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0EsK0JBQ0E7MkNBQ0E7Z0NBQ0EsQUFDQTs7MEJBQ0E7eUJBQ0EsQUFDQTs7cURBQ0E7QUFDQSxBQUNBOzs7ZUFFQTs4Q0FDQTtrQkFDQTtxREFDQTtvQ0FDQTs2Q0FDQTtvQ0FDQTtBQUNBO0FBUkE7ZUFVQTt5Q0FDQTtxREFDQSxBQUNBOzsrQkFDQSxBQUNBOzttRUFDQTt1REFDQTtBQUNBLEFBQ0EsQUFDQTtBQVhBOztlQVlBO0FBQ0E7O0FBQ0Esd0JBQ0EsQUFDQTs7O0FDL0NBO0FBQ0EsQUFDQTs7QUFDQTtlQUVBLEFBQ0E7QUFGQTs7QUFHQTs7Ozs7Ozs7QUFDQTs7QUFDQSw2QkFDQTs7QUFDQTs7OztBQUNBOztBQUNBLDZCQUNBO3lDQUNBO2dDQUNBLEFBQ0E7OzBCQUNBO3lCQUNBLEFBQ0E7OzJEQUNBO3VFQUNBLEFBQ0E7O2tEQUNBO0FBQ0EsQUFDQTs7O2VBRUE7MERBQ0E7NkRBQ0EsQUFDQTs7MEJBQ0E7aUNBQ0E7bUJBQ0E7b0NBQ0E7QUFDQTtBQUNBO0FBVkE7ZUFZQTs0Q0FDQTs2REFDQSxBQUNBOztpREFDQTt3Q0FDQTt3Q0FDQSxBQUNBOzttREFDQTt5RUFDQTttQkFDQTtzRUFDQTtBQUNBO0FBQ0E7QUFkQTtlQWdCQTt1Q0FDQTttREFDQTs2QkFDQTs4QkFDQTtzRUFDQTtBQUNBLEFBQ0EsQUFDQTtBQVRBOztlQVVBO0FBQ0E7O0FBQ0Esd0JBQ0EsQUFDQTs7O0FDbkVBO0FBQ0EsQUFDQTs7QUFDQTtlQUVBLEFBQ0E7QUFGQTs7QUFHQTs7Ozs7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBLGlDQUNBOzZDQUNBO2dDQUNBLEFBQ0E7OzBCQUNBO3lCQUNBLEFBQ0E7O3FFQUNBO3lEQUNBO0FBQ0EsQUFDQTs7O2VBRUE7c0RBQ0EsQUFDQTs7aUNBQ0E7QUFDQSxBQUNBOzt1Q0FDQSxBQUNBOztxREFDQSxBQUNBOzt5QkFDQTsrQkFDQTtzQ0FDQTttQkFDQTsrQkFDQTtzQ0FDQTtBQUNBO0FBQ0E7QUFsQkE7ZUFvQkE7MkNBQ0E7dURBQ0EsQUFDQTs7aUNBQ0EsQUFDQTs7cURBQ0E7QUFDQSxBQUNBLEFBQ0E7QUFWQTs7ZUFXQTtBQUNBOztBQUNBLHdCQUNBLEFBQ0E7OztBQ3pEQTtBQUNBLEFBQ0E7O0FBQ0EsOEJBQ0E7O0FBQ0EsOENBQ0E7O0FBQ0EsNEJBQ0E7O0FBQ0EsNENBQ0E7O0FBQ0EsOEJBQ0E7O0FBQ0EsOENBQ0E7O0FBQ0EsMEJBQ0E7O0FBQ0EsMENBQ0E7O0FBQ0EsNEJBQ0E7O0FBQ0EsNENBQ0E7O0FBQ0EsNkJBQ0E7O0FBQ0EsNkNBQ0E7O0FBQ0EsK0JBQ0E7O0FBQ0EsK0NBQ0E7O0FBQ0EsMkJBQ0E7O0FBQ0EsMEJBQ0E7O0FBQ0EsaUNBQ0E7O0FBQ0EsMkJBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0Esb0NBQ0E7O0FBQ0EsK0VBQ0E7O0FBQ0E7QUFDQTtBQUNBLGdEQUNBOztBQUNBLHVEQUNBOztBQUNBO0FBQ0Esc0RBQ0EsQUFDQTs7O0FDdERBO0FBQ0EsQUFDQTs7QUFDQTtlQUVBLEFBQ0E7QUFGQTs7QUFHQTtjQUVBO2VBQ0E7b0NBQ0E7b0RBQ0E7d0NBQ0E7d0RBQ0E7bUNBQ0E7QUFDQSxBQUNBO0FBVEE7O0FBVUEsc0JBQ0EsQUFDQTs7O0FDcEJBO0FBQ0EsQUFDQTs7QUFDQTtlQUVBO0FBREE7QUFFQSwyQkFDQTs7QUFDQTtjQUVBO2VBQ0E7aURBQ0E7b0NBQ0EsQUFDQTs7b0RBQ0E7d0NBQ0E7d0RBQ0E7bUNBQ0EsQUFDQTs7eUlBQ0E7NEJBQ0E7a0NBQ0E7c0NBQ0E7MkRBQ0E7bURBQ0E7aUVBQ0E7NENBQ0E7NENBQ0EsQUFDQSxBQUNBOzs0Q0FDQTt3RUFDQTtvQ0FDQTtnSUFDQTtBQUNBO0FBQ0E7b0NBQ0E7QUFDQTtBQUNBLEFBQ0E7QUEvQkE7O0FBZ0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEFBQ0EsQUFDQTs7O0FDOUZBO0FBQ0EsQUFDQTs7QUFDQTtlQUVBO0FBREE7QUFFQSw0QkFDQTs7QUFDQSw2QkFDQTs7QUFDQSw4QkFDQTs7QUFDQSw4Q0FDQTs7QUFDQSwwQkFDQTs7QUFDQSwwQ0FDQTs7QUFDQSx5QkFDQTs7QUFDQSx5Q0FDQTs7QUFDQTs7QUFDQTs7QUFDQTtjQUVBOzJDQUNBO2tEQUNBO0FBQ0E7aURBQ0E7K0NBQ0E7c0NBQ0E7c0NBQ0EsQUFDQTs7b0RBQ0EsQUFDQTs7eUlBQ0E7NEJBQ0E7a0NBQ0E7NkRBQ0E7dUNBQ0E7QUFDQTs2REFDQTt1Q0FDQSxBQUNBOztnREFDQTtpQ0FDQSxBQUNBOztpREFDQTtrQ0FDQSxBQUNBOztBQUNBLEFBQ0E7O0FBQ0E7QUFDQTtBQUNBLEFBQ0E7O2tGQUNBO3VEQUNBO3dDQUNBO2tDQUNBO0FBQ0E7a0ZBQ0EsQUFDQTs7eUNBQ0EsQUFDQTs7QUFDQSxBQUNBOztpREFDQTtrRUFDQTtBQUNBLEFBQ0E7O0FBQ0E7a0RBQ0E7QUFDQSxBQUNBOztxRUFDQTtvQ0FDQTtnSUFDQTtBQUNBO0FBQ0EsQUFDQTs7cUNBQ0EsQUFDQSxBQUNBO0FBNURBOzs7QUN6QkE7QUFDQSxBQUNBOztBQUNBO2VBRUEsQUFDQTtBQUZBOztBQUdBO2NBRUE7ZUFDQTtvQ0FDQTtvREFDQTt3Q0FDQTt3REFDQTttQ0FDQTs4RUFDQTs0QkFDQTtrQ0FDQTtpQ0FDQSxBQUNBLEFBQ0E7O21KQUNBO0FBQ0E7QUFDQSxBQUNBO0FBakJBOztBQWtCQSxzQkFDQSxBQUNBOzs7QUM1QkE7QUFDQSxBQUNBOztBQUNBO2VBRUEsQUFDQTtBQUZBOztBQUdBOzs7Ozs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0EsaUNBQ0E7NEJBQ0E7Z0NBQ0EsQUFDQTs7MkJBQ0E7QUFDQSxBQUNBOzs7ZUFFQTt5Q0FDQTt1Q0FDQTtxQ0FDQTtBQUNBLEFBQ0E7O3NDQUNBO0FBQ0E7QUFSQTtlQVVBOzBDQUNBO3VDQUNBLEFBQ0E7O3FEQUNBOytDQUNBLEFBQ0E7O21EQUNBO29DQUNBO0FBQ0E7QUFDQTtBQVhBO2VBYUE7OENBQ0E7dUNBQ0EsQUFDQTs7cURBQ0E7bUJBQ0E7QUFDQTtBQUNBO0FBUkE7ZUFVQTsyQ0FDQTtBQUNBO0FBQ0E7QUFDQSxBQUNBLEFBQ0E7QUFQQTs7ZUFRQTtBQUNBOztBQUNBLHdCQUNBLEFBQ0E7OztBQzdEQTtBQUNBLEFBQ0E7O0FBQ0E7ZUFFQTtBQURBO0FBRUEsb0ZBQ0E7a0NBQ0EsQUFDQTs7MEJBQ0EsQUFDQTs7NENBQ0EsQUFDQTs7a0NBQ0E7aUNBQ0E7d0NBQ0E7QUFDQSxBQUNBOztlQUNBO0FBQ0EsQUFDQTs7O0FDckJBO0FBQ0EsQUFDQTs7QUFDQTtlQUVBLEFBQ0E7QUFGQTs7QUFHQTs7Ozs7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBLEFBQ0E7O0FBQ0EsK0JBQ0E7Z0NBQ0E7Z0NBQ0EsQUFDQTs7aUNBQ0E7eUNBQ0EsQUFDQTs7ZUFDQTtBQUNBLEFBQ0E7OztlQUVBO2lDQUNBO3dCQUNBLEFBQ0E7O3dCQUNBO0FBQ0E7OERBQ0E7cURBQ0E7QUFDQTtBQUNBOzJDQUNBO0FBQ0E7QUFaQTtlQWNBO29EQUNBOzRGQUNBO0FBQ0E7d0JBQ0E7QUFDQTtBQU5BO2VBUUE7a0RBQ0E7QUFDQTtBQUNBOzhEQUNBO3VEQUNBO3lDQUNBO2dFQUNBO3VDQUNBOzREQUNBOzJDQUNBO0FBQ0E7QUFDQSxBQUNBOzswRkFDQTttQkFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxBQUNBOztBQXZCQTtlQXlCQTt5Q0FDQTt5QkFDQSxBQUNBOzs0QkFDQTtBQUNBO3FDQUNBO0FBQ0E7bURBQ0E7QUFDQTtBQUNBLEFBQ0E7O0FBQ0EsQUFDQTs7QUFDQTsrQ0FDQTtrSEFDQTtBQUNBO0FBQ0E7K0JBQ0E7K0dBQ0E7QUFDQTtBQUNBLEFBQ0E7OytCQUNBO21HQUNBO2dDQUNBO29DQUNBO0FBQ0E7QUFDQTtBQUNBLEFBQ0EsQUFDQTtBQWpDQTs7ZUFrQ0E7QUFDQTs7QUFDQSxBQUNBOztBQUNBLHdCQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEFBQ0EsQUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGxvb2t1cCA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJztcblxuOyhmdW5jdGlvbiAoZXhwb3J0cykge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIEFyciA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyA/IFVpbnQ4QXJyYXkgOiBBcnJheTtcblxuXHR2YXIgUExVUyA9ICcrJy5jaGFyQ29kZUF0KDApO1xuXHR2YXIgU0xBU0ggPSAnLycuY2hhckNvZGVBdCgwKTtcblx0dmFyIE5VTUJFUiA9ICcwJy5jaGFyQ29kZUF0KDApO1xuXHR2YXIgTE9XRVIgPSAnYScuY2hhckNvZGVBdCgwKTtcblx0dmFyIFVQUEVSID0gJ0EnLmNoYXJDb2RlQXQoMCk7XG5cdHZhciBQTFVTX1VSTF9TQUZFID0gJy0nLmNoYXJDb2RlQXQoMCk7XG5cdHZhciBTTEFTSF9VUkxfU0FGRSA9ICdfJy5jaGFyQ29kZUF0KDApO1xuXG5cdGZ1bmN0aW9uIGRlY29kZShlbHQpIHtcblx0XHR2YXIgY29kZSA9IGVsdC5jaGFyQ29kZUF0KDApO1xuXHRcdGlmIChjb2RlID09PSBQTFVTIHx8IGNvZGUgPT09IFBMVVNfVVJMX1NBRkUpIHJldHVybiA2MjsgLy8gJysnXG5cdFx0aWYgKGNvZGUgPT09IFNMQVNIIHx8IGNvZGUgPT09IFNMQVNIX1VSTF9TQUZFKSByZXR1cm4gNjM7IC8vICcvJ1xuXHRcdGlmIChjb2RlIDwgTlVNQkVSKSByZXR1cm4gLTE7IC8vbm8gbWF0Y2hcblx0XHRpZiAoY29kZSA8IE5VTUJFUiArIDEwKSByZXR1cm4gY29kZSAtIE5VTUJFUiArIDI2ICsgMjY7XG5cdFx0aWYgKGNvZGUgPCBVUFBFUiArIDI2KSByZXR1cm4gY29kZSAtIFVQUEVSO1xuXHRcdGlmIChjb2RlIDwgTE9XRVIgKyAyNikgcmV0dXJuIGNvZGUgLSBMT1dFUiArIDI2O1xuXHR9XG5cblx0ZnVuY3Rpb24gYjY0VG9CeXRlQXJyYXkoYjY0KSB7XG5cdFx0dmFyIGksIGosIGwsIHRtcCwgcGxhY2VIb2xkZXJzLCBhcnI7XG5cblx0XHRpZiAoYjY0Lmxlbmd0aCAlIDQgPiAwKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKTtcblx0XHR9XG5cblx0XHQvLyB0aGUgbnVtYmVyIG9mIGVxdWFsIHNpZ25zIChwbGFjZSBob2xkZXJzKVxuXHRcdC8vIGlmIHRoZXJlIGFyZSB0d28gcGxhY2Vob2xkZXJzLCB0aGFuIHRoZSB0d28gY2hhcmFjdGVycyBiZWZvcmUgaXRcblx0XHQvLyByZXByZXNlbnQgb25lIGJ5dGVcblx0XHQvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSwgdGhlbiB0aGUgdGhyZWUgY2hhcmFjdGVycyBiZWZvcmUgaXQgcmVwcmVzZW50IDIgYnl0ZXNcblx0XHQvLyB0aGlzIGlzIGp1c3QgYSBjaGVhcCBoYWNrIHRvIG5vdCBkbyBpbmRleE9mIHR3aWNlXG5cdFx0dmFyIGxlbiA9IGI2NC5sZW5ndGg7XG5cdFx0cGxhY2VIb2xkZXJzID0gJz0nID09PSBiNjQuY2hhckF0KGxlbiAtIDIpID8gMiA6ICc9JyA9PT0gYjY0LmNoYXJBdChsZW4gLSAxKSA/IDEgOiAwO1xuXG5cdFx0Ly8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG5cdFx0YXJyID0gbmV3IEFycihiNjQubGVuZ3RoICogMyAvIDQgLSBwbGFjZUhvbGRlcnMpO1xuXG5cdFx0Ly8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuXHRcdGwgPSBwbGFjZUhvbGRlcnMgPiAwID8gYjY0Lmxlbmd0aCAtIDQgOiBiNjQubGVuZ3RoO1xuXG5cdFx0dmFyIEwgPSAwO1xuXG5cdFx0ZnVuY3Rpb24gcHVzaCh2KSB7XG5cdFx0XHRhcnJbTCsrXSA9IHY7XG5cdFx0fVxuXG5cdFx0Zm9yIChpID0gMCwgaiA9IDA7IGkgPCBsOyBpICs9IDQsIGogKz0gMykge1xuXHRcdFx0dG1wID0gZGVjb2RlKGI2NC5jaGFyQXQoaSkpIDw8IDE4IHwgZGVjb2RlKGI2NC5jaGFyQXQoaSArIDEpKSA8PCAxMiB8IGRlY29kZShiNjQuY2hhckF0KGkgKyAyKSkgPDwgNiB8IGRlY29kZShiNjQuY2hhckF0KGkgKyAzKSk7XG5cdFx0XHRwdXNoKCh0bXAgJiAweEZGMDAwMCkgPj4gMTYpO1xuXHRcdFx0cHVzaCgodG1wICYgMHhGRjAwKSA+PiA4KTtcblx0XHRcdHB1c2godG1wICYgMHhGRik7XG5cdFx0fVxuXG5cdFx0aWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuXHRcdFx0dG1wID0gZGVjb2RlKGI2NC5jaGFyQXQoaSkpIDw8IDIgfCBkZWNvZGUoYjY0LmNoYXJBdChpICsgMSkpID4+IDQ7XG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpO1xuXHRcdH0gZWxzZSBpZiAocGxhY2VIb2xkZXJzID09PSAxKSB7XG5cdFx0XHR0bXAgPSBkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMTAgfCBkZWNvZGUoYjY0LmNoYXJBdChpICsgMSkpIDw8IDQgfCBkZWNvZGUoYjY0LmNoYXJBdChpICsgMikpID4+IDI7XG5cdFx0XHRwdXNoKHRtcCA+PiA4ICYgMHhGRik7XG5cdFx0XHRwdXNoKHRtcCAmIDB4RkYpO1xuXHRcdH1cblxuXHRcdHJldHVybiBhcnI7XG5cdH1cblxuXHRmdW5jdGlvbiB1aW50OFRvQmFzZTY0KHVpbnQ4KSB7XG5cdFx0dmFyIGksXG5cdFx0ICAgIGV4dHJhQnl0ZXMgPSB1aW50OC5sZW5ndGggJSAzLFxuXHRcdCAgICAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuXHRcdG91dHB1dCA9IFwiXCIsXG5cdFx0ICAgIHRlbXAsXG5cdFx0ICAgIGxlbmd0aDtcblxuXHRcdGZ1bmN0aW9uIGVuY29kZShudW0pIHtcblx0XHRcdHJldHVybiBsb29rdXAuY2hhckF0KG51bSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0KG51bSkge1xuXHRcdFx0cmV0dXJuIGVuY29kZShudW0gPj4gMTggJiAweDNGKSArIGVuY29kZShudW0gPj4gMTIgJiAweDNGKSArIGVuY29kZShudW0gPj4gNiAmIDB4M0YpICsgZW5jb2RlKG51bSAmIDB4M0YpO1xuXHRcdH1cblxuXHRcdC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcblx0XHRmb3IgKGkgPSAwLCBsZW5ndGggPSB1aW50OC5sZW5ndGggLSBleHRyYUJ5dGVzOyBpIDwgbGVuZ3RoOyBpICs9IDMpIHtcblx0XHRcdHRlbXAgPSAodWludDhbaV0gPDwgMTYpICsgKHVpbnQ4W2kgKyAxXSA8PCA4KSArIHVpbnQ4W2kgKyAyXTtcblx0XHRcdG91dHB1dCArPSB0cmlwbGV0VG9CYXNlNjQodGVtcCk7XG5cdFx0fVxuXG5cdFx0Ly8gcGFkIHRoZSBlbmQgd2l0aCB6ZXJvcywgYnV0IG1ha2Ugc3VyZSB0byBub3QgZm9yZ2V0IHRoZSBleHRyYSBieXRlc1xuXHRcdHN3aXRjaCAoZXh0cmFCeXRlcykge1xuXHRcdFx0Y2FzZSAxOlxuXHRcdFx0XHR0ZW1wID0gdWludDhbdWludDgubGVuZ3RoIC0gMV07XG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUodGVtcCA+PiAyKTtcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wIDw8IDQgJiAweDNGKTtcblx0XHRcdFx0b3V0cHV0ICs9ICc9PSc7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAyOlxuXHRcdFx0XHR0ZW1wID0gKHVpbnQ4W3VpbnQ4Lmxlbmd0aCAtIDJdIDw8IDgpICsgdWludDhbdWludDgubGVuZ3RoIC0gMV07XG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUodGVtcCA+PiAxMCk7XG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUodGVtcCA+PiA0ICYgMHgzRik7XG5cdFx0XHRcdG91dHB1dCArPSBlbmNvZGUodGVtcCA8PCAyICYgMHgzRik7XG5cdFx0XHRcdG91dHB1dCArPSAnPSc7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdHJldHVybiBvdXRwdXQ7XG5cdH1cblxuXHRleHBvcnRzLnRvQnl0ZUFycmF5ID0gYjY0VG9CeXRlQXJyYXk7XG5cdGV4cG9ydHMuZnJvbUJ5dGVBcnJheSA9IHVpbnQ4VG9CYXNlNjQ7XG59KSh0eXBlb2YgZXhwb3J0cyA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQuYmFzZTY0anMgPSB7fSA6IGV4cG9ydHMpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1JMk5DNXFjeUpkTENKdVlXMWxjeUk2V3lKc2IyOXJkWEFpTENKbGVIQnZjblJ6SWl3aVFYSnlJaXdpVldsdWREaEJjbkpoZVNJc0lrRnljbUY1SWl3aVVFeFZVeUlzSW1Ob1lYSkRiMlJsUVhRaUxDSlRURUZUU0NJc0lrNVZUVUpGVWlJc0lreFBWMFZTSWl3aVZWQlFSVklpTENKUVRGVlRYMVZTVEY5VFFVWkZJaXdpVTB4QlUwaGZWVkpNWDFOQlJrVWlMQ0prWldOdlpHVWlMQ0psYkhRaUxDSmpiMlJsSWl3aVlqWTBWRzlDZVhSbFFYSnlZWGtpTENKaU5qUWlMQ0pwSWl3aWFpSXNJbXdpTENKMGJYQWlMQ0p3YkdGalpVaHZiR1JsY25NaUxDSmhjbklpTENKc1pXNW5kR2dpTENKRmNuSnZjaUlzSW14bGJpSXNJbU5vWVhKQmRDSXNJa3dpTENKd2RYTm9JaXdpZGlJc0luVnBiblE0Vkc5Q1lYTmxOalFpTENKMWFXNTBPQ0lzSW1WNGRISmhRbmwwWlhNaUxDSnZkWFJ3ZFhRaUxDSjBaVzF3SWl3aVpXNWpiMlJsSWl3aWJuVnRJaXdpZEhKcGNHeGxkRlJ2UW1GelpUWTBJaXdpZEc5Q2VYUmxRWEp5WVhraUxDSm1jbTl0UW5sMFpVRnljbUY1SWl3aVltRnpaVFkwYW5NaVhTd2liV0Z3Y0dsdVozTWlPaUk3TzBGQlFVRXNTVUZCU1VFc1UwRkJVeXhyUlVGQllqczdRVUZGUVN4RFFVRkZMRmRCUVZWRExFOUJRVllzUlVGQmJVSTdRVUZEY0VJN08wRkJSVU1zUzBGQlNVTXNUVUZCVHl4UFFVRlBReXhWUVVGUUxFdEJRWE5DTEZkQlFYWkNMRWRCUTA1QkxGVkJSRTBzUjBGRlRrTXNTMEZHU2pzN1FVRkpSQ3hMUVVGSlF5eFBRVUZUTEVsQlFVbERMRlZCUVVvc1EwRkJaU3hEUVVGbUxFTkJRV0k3UVVGRFFTeExRVUZKUXl4UlFVRlRMRWxCUVVsRUxGVkJRVW9zUTBGQlpTeERRVUZtTEVOQlFXSTdRVUZEUVN4TFFVRkpSU3hUUVVGVExFbEJRVWxHTEZWQlFVb3NRMEZCWlN4RFFVRm1MRU5CUVdJN1FVRkRRU3hMUVVGSlJ5eFJRVUZUTEVsQlFVbElMRlZCUVVvc1EwRkJaU3hEUVVGbUxFTkJRV0k3UVVGRFFTeExRVUZKU1N4UlFVRlRMRWxCUVVsS0xGVkJRVW9zUTBGQlpTeERRVUZtTEVOQlFXSTdRVUZEUVN4TFFVRkpTeXhuUWtGQlowSXNTVUZCU1V3c1ZVRkJTaXhEUVVGbExFTkJRV1lzUTBGQmNFSTdRVUZEUVN4TFFVRkpUU3hwUWtGQmFVSXNTVUZCU1U0c1ZVRkJTaXhEUVVGbExFTkJRV1lzUTBGQmNrSTdPMEZCUlVFc1ZVRkJVMDhzVFVGQlZDeERRVUZwUWtNc1IwRkJha0lzUlVGQmMwSTdRVUZEY2tJc1RVRkJTVU1zVDBGQlQwUXNTVUZCU1ZJc1ZVRkJTaXhEUVVGbExFTkJRV1lzUTBGQldEdEJRVU5CTEUxQlFVbFRMRk5CUVZOV0xFbEJRVlFzU1VGRFFWVXNVMEZCVTBvc1lVRkVZaXhGUVVWRExFOUJRVThzUlVGQlVDeERRVXB2UWl4RFFVbFdPMEZCUTFnc1RVRkJTVWtzVTBGQlUxSXNTMEZCVkN4SlFVTkJVU3hUUVVGVFNDeGpRVVJpTEVWQlJVTXNUMEZCVHl4RlFVRlFMRU5CVUc5Q0xFTkJUMVk3UVVGRFdDeE5RVUZKUnl4UFFVRlBVQ3hOUVVGWUxFVkJRME1zVDBGQlR5eERRVUZETEVOQlFWSXNRMEZVYjBJc1EwRlRWanRCUVVOWUxFMUJRVWxQTEU5QlFVOVFMRk5CUVZNc1JVRkJjRUlzUlVGRFF5eFBRVUZQVHl4UFFVRlBVQ3hOUVVGUUxFZEJRV2RDTEVWQlFXaENMRWRCUVhGQ0xFVkJRVFZDTzBGQlEwUXNUVUZCU1U4c1QwRkJUMHdzVVVGQlVTeEZRVUZ1UWl4RlFVTkRMRTlCUVU5TExFOUJRVTlNTEV0QlFXUTdRVUZEUkN4TlFVRkpTeXhQUVVGUFRpeFJRVUZSTEVWQlFXNUNMRVZCUTBNc1QwRkJUMDBzVDBGQlQwNHNTMEZCVUN4SFFVRmxMRVZCUVhSQ08wRkJRMFE3TzBGQlJVUXNWVUZCVTA4c1kwRkJWQ3hEUVVGNVFrTXNSMEZCZWtJc1JVRkJPRUk3UVVGRE4wSXNUVUZCU1VNc1EwRkJTaXhGUVVGUFF5eERRVUZRTEVWQlFWVkRMRU5CUVZZc1JVRkJZVU1zUjBGQllpeEZRVUZyUWtNc1dVRkJiRUlzUlVGQlowTkRMRWRCUVdoRE96dEJRVVZCTEUxQlFVbE9MRWxCUVVsUExFMUJRVW9zUjBGQllTeERRVUZpTEVkQlFXbENMRU5CUVhKQ0xFVkJRWGRDTzBGQlEzWkNMRk5CUVUwc1NVRkJTVU1zUzBGQlNpeERRVUZWTEdkRVFVRldMRU5CUVU0N1FVRkRRVHM3UVVGRlJEdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFc1RVRkJTVU1zVFVGQlRWUXNTVUZCU1U4c1RVRkJaRHRCUVVOQlJpeHBRa0ZCWlN4UlFVRlJUQ3hKUVVGSlZTeE5RVUZLTEVOQlFWZEVMRTFCUVUwc1EwRkJha0lzUTBGQlVpeEhRVUU0UWl4RFFVRTVRaXhIUVVGclF5eFJRVUZSVkN4SlFVRkpWU3hOUVVGS0xFTkJRVmRFTEUxQlFVMHNRMEZCYWtJc1EwRkJVaXhIUVVFNFFpeERRVUU1UWl4SFFVRnJReXhEUVVGdVJqczdRVUZGUVR0QlFVTkJTQ3hSUVVGTkxFbEJRVWx5UWl4SFFVRktMRU5CUVZGbExFbEJRVWxQTEUxQlFVb3NSMEZCWVN4RFFVRmlMRWRCUVdsQ0xFTkJRV3BDTEVkQlFYRkNSaXhaUVVFM1FpeERRVUZPT3p0QlFVVkJPMEZCUTBGR0xFMUJRVWxGTEdWQlFXVXNRMEZCWml4SFFVRnRRa3dzU1VGQlNVOHNUVUZCU2l4SFFVRmhMRU5CUVdoRExFZEJRVzlEVUN4SlFVRkpUeXhOUVVFMVF6czdRVUZGUVN4TlFVRkpTU3hKUVVGSkxFTkJRVkk3TzBGQlJVRXNWMEZCVTBNc1NVRkJWQ3hEUVVGbFF5eERRVUZtTEVWQlFXdENPMEZCUTJwQ1VDeFBRVUZKU3l4SFFVRktMRWxCUVZkRkxFTkJRVmc3UVVGRFFUczdRVUZGUkN4UFFVRkxXaXhKUVVGSkxFTkJRVW9zUlVGQlQwTXNTVUZCU1N4RFFVRm9RaXhGUVVGdFFrUXNTVUZCU1VVc1EwRkJka0lzUlVGQk1FSkdMRXRCUVVzc1EwRkJUQ3hGUVVGUlF5eExRVUZMTEVOQlFYWkRMRVZCUVRCRE8wRkJRM3BEUlN4VFFVRlBVaXhQUVVGUFNTeEpRVUZKVlN4TlFVRktMRU5CUVZkVUxFTkJRVmdzUTBGQlVDeExRVUY1UWl4RlFVRXhRaXhIUVVGcFEwd3NUMEZCVDBrc1NVRkJTVlVzVFVGQlNpeERRVUZYVkN4SlFVRkpMRU5CUVdZc1EwRkJVQ3hMUVVFMlFpeEZRVUU1UkN4SFFVRnhSVXdzVDBGQlQwa3NTVUZCU1ZVc1RVRkJTaXhEUVVGWFZDeEpRVUZKTEVOQlFXWXNRMEZCVUN4TFFVRTJRaXhEUVVGc1J5eEhRVUYxUjB3c1QwRkJUMGtzU1VGQlNWVXNUVUZCU2l4RFFVRlhWQ3hKUVVGSkxFTkJRV1lzUTBGQlVDeERRVUUzUnp0QlFVTkJWeXhSUVVGTExFTkJRVU5TTEUxQlFVMHNVVUZCVUN4TFFVRnZRaXhGUVVGNlFqdEJRVU5CVVN4UlFVRkxMRU5CUVVOU0xFMUJRVTBzVFVGQlVDeExRVUZyUWl4RFFVRjJRanRCUVVOQlVTeFJRVUZMVWl4TlFVRk5MRWxCUVZnN1FVRkRRVHM3UVVGRlJDeE5RVUZKUXl4cFFrRkJhVUlzUTBGQmNrSXNSVUZCZDBJN1FVRkRka0pFTEZOQlFVOVNMRTlCUVU5SkxFbEJRVWxWTEUxQlFVb3NRMEZCVjFRc1EwRkJXQ3hEUVVGUUxFdEJRWGxDTEVOQlFURkNMRWRCUVdkRFRDeFBRVUZQU1N4SlFVRkpWU3hOUVVGS0xFTkJRVmRVTEVsQlFVa3NRMEZCWml4RFFVRlFMRXRCUVRaQ0xFTkJRVzVGTzBGQlEwRlhMRkZCUVV0U0xFMUJRVTBzU1VGQldEdEJRVU5CTEVkQlNFUXNUVUZIVHl4SlFVRkpReXhwUWtGQmFVSXNRMEZCY2tJc1JVRkJkMEk3UVVGRE9VSkVMRk5CUVU5U0xFOUJRVTlKTEVsQlFVbFZMRTFCUVVvc1EwRkJWMVFzUTBGQldDeERRVUZRTEV0QlFYbENMRVZCUVRGQ0xFZEJRV2xEVEN4UFFVRlBTU3hKUVVGSlZTeE5RVUZLTEVOQlFWZFVMRWxCUVVrc1EwRkJaaXhEUVVGUUxFdEJRVFpDTEVOQlFUbEVMRWRCUVc5RlRDeFBRVUZQU1N4SlFVRkpWU3hOUVVGS0xFTkJRVmRVTEVsQlFVa3NRMEZCWml4RFFVRlFMRXRCUVRaQ0xFTkJRWFpITzBGQlEwRlhMRkZCUVUxU0xFOUJRVThzUTBGQlVpeEhRVUZoTEVsQlFXeENPMEZCUTBGUkxGRkJRVXRTTEUxQlFVMHNTVUZCV0R0QlFVTkJPenRCUVVWRUxGTkJRVTlGTEVkQlFWQTdRVUZEUVRzN1FVRkZSQ3hWUVVGVFVTeGhRVUZVTEVOQlFYZENReXhMUVVGNFFpeEZRVUVyUWp0QlFVTTVRaXhOUVVGSlpDeERRVUZLTzBGQlFVRXNUVUZEUTJVc1lVRkJZVVFzVFVGQlRWSXNUVUZCVGl4SFFVRmxMRU5CUkRkQ08wRkJRVUVzVFVGRFowTTdRVUZETDBKVkxGZEJRVk1zUlVGR1ZqdEJRVUZCTEUxQlIwTkRMRWxCU0VRN1FVRkJRU3hOUVVkUFdDeE5RVWhRT3p0QlFVdEJMRmRCUVZOWkxFMUJRVlFzUTBGQmFVSkRMRWRCUVdwQ0xFVkJRWE5DTzBGQlEzSkNMRlZCUVU5eVF5eFBRVUZQTWtJc1RVRkJVQ3hEUVVGalZTeEhRVUZrTEVOQlFWQTdRVUZEUVRzN1FVRkZSQ3hYUVVGVFF5eGxRVUZVTEVOQlFUQkNSQ3hIUVVFeFFpeEZRVUVyUWp0QlFVTTVRaXhWUVVGUFJDeFBRVUZQUXl4UFFVRlBMRVZCUVZBc1IwRkJXU3hKUVVGdVFpeEpRVUV5UWtRc1QwRkJUME1zVDBGQlR5eEZRVUZRTEVkQlFWa3NTVUZCYmtJc1EwRkJNMElzUjBGQmMwUkVMRTlCUVU5RExFOUJRVThzUTBGQlVDeEhRVUZYTEVsQlFXeENMRU5CUVhSRUxFZEJRV2RHUkN4UFFVRlBReXhOUVVGTkxFbEJRV0lzUTBGQmRrWTdRVUZEUVRzN1FVRkZSRHRCUVVOQkxFOUJRVXR1UWl4SlFVRkpMRU5CUVVvc1JVRkJUMDBzVTBGQlUxRXNUVUZCVFZJc1RVRkJUaXhIUVVGbFV5eFZRVUZ3UXl4RlFVRm5SR1lzU1VGQlNVMHNUVUZCY0VRc1JVRkJORVJPTEV0QlFVc3NRMEZCYWtVc1JVRkJiMFU3UVVGRGJrVnBRaXhWUVVGUExFTkJRVU5JTEUxQlFVMWtMRU5CUVU0c1MwRkJXU3hGUVVGaUxFdEJRVzlDWXl4TlFVRk5aQ3hKUVVGSkxFTkJRVllzUzBGQlowSXNRMEZCY0VNc1NVRkJNRU5qTEUxQlFVMWtMRWxCUVVrc1EwRkJWaXhEUVVGcVJEdEJRVU5CWjBJc1lVRkJWVWtzWjBKQlFXZENTQ3hKUVVGb1FpeERRVUZXTzBGQlEwRTdPMEZCUlVRN1FVRkRRU3hWUVVGUlJpeFZRVUZTTzBGQlEwTXNVVUZCU3l4RFFVRk1PMEZCUTBORkxGZEJRVTlJTEUxQlFVMUJMRTFCUVUxU0xFMUJRVTRzUjBGQlpTeERRVUZ5UWl4RFFVRlFPMEZCUTBGVkxHTkJRVlZGTEU5QlFVOUVMRkZCUVZFc1EwRkJaaXhEUVVGV08wRkJRMEZFTEdOQlFWVkZMRTlCUVZGRUxGRkJRVkVzUTBGQlZDeEhRVUZqTEVsQlFYSkNMRU5CUVZZN1FVRkRRVVFzWTBGQlZTeEpRVUZXTzBGQlEwRTdRVUZEUkN4UlFVRkxMRU5CUVV3N1FVRkRRME1zVjBGQlR5eERRVUZEU0N4TlFVRk5RU3hOUVVGTlVpeE5RVUZPTEVkQlFXVXNRMEZCY2tJc1MwRkJNa0lzUTBGQk5VSXNTVUZCYTBOUkxFMUJRVTFCTEUxQlFVMVNMRTFCUVU0c1IwRkJaU3hEUVVGeVFpeERRVUY2UXp0QlFVTkJWU3hqUVVGVlJTeFBRVUZQUkN4UlFVRlJMRVZCUVdZc1EwRkJWanRCUVVOQlJDeGpRVUZWUlN4UFFVRlJSQ3hSUVVGUkxFTkJRVlFzUjBGQll5eEpRVUZ5UWl4RFFVRldPMEZCUTBGRUxHTkJRVlZGTEU5QlFWRkVMRkZCUVZFc1EwRkJWQ3hIUVVGakxFbEJRWEpDTEVOQlFWWTdRVUZEUVVRc1kwRkJWU3hIUVVGV08wRkJRMEU3UVVGaVJqczdRVUZuUWtFc1UwRkJUMEVzVFVGQlVEdEJRVU5CT3p0QlFVVkVha01zVTBGQlVYTkRMRmRCUVZJc1IwRkJjMEoyUWl4alFVRjBRanRCUVVOQlppeFRRVUZSZFVNc1lVRkJVaXhIUVVGM1FsUXNZVUZCZUVJN1FVRkRRU3hEUVhwSVF5eEZRWGxJUVN4UFFVRlBPVUlzVDBGQlVDeExRVUZ0UWl4WFFVRnVRaXhIUVVGclF5eFZRVUZMZDBNc1VVRkJUQ3hIUVVGblFpeEZRVUZzUkN4SFFVRjNSSGhETEU5QmVraDRSQ3hEUVVGRUlpd2labWxzWlNJNkltSTJOQzVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYkluWmhjaUJzYjI5cmRYQWdQU0FuUVVKRFJFVkdSMGhKU2t0TVRVNVBVRkZTVTFSVlZsZFlXVnBoWW1Oa1pXWm5hR2xxYTJ4dGJtOXdjWEp6ZEhWMmQzaDVlakF4TWpNME5UWTNPRGtyTHljN1hHNWNianNvWm5WdVkzUnBiMjRnS0dWNGNHOXlkSE1wSUh0Y2JseDBKM1Z6WlNCemRISnBZM1FuTzF4dVhHNGdJSFpoY2lCQmNuSWdQU0FvZEhsd1pXOW1JRlZwYm5RNFFYSnlZWGtnSVQwOUlDZDFibVJsWm1sdVpXUW5LVnh1SUNBZ0lEOGdWV2x1ZERoQmNuSmhlVnh1SUNBZ0lEb2dRWEp5WVhsY2JseHVYSFIyWVhJZ1VFeFZVeUFnSUQwZ0p5c25MbU5vWVhKRGIyUmxRWFFvTUNsY2JseDBkbUZ5SUZOTVFWTklJQ0E5SUNjdkp5NWphR0Z5UTI5a1pVRjBLREFwWEc1Y2RIWmhjaUJPVlUxQ1JWSWdQU0FuTUNjdVkyaGhja052WkdWQmRDZ3dLVnh1WEhSMllYSWdURTlYUlZJZ0lEMGdKMkVuTG1Ob1lYSkRiMlJsUVhRb01DbGNibHgwZG1GeUlGVlFVRVZTSUNBOUlDZEJKeTVqYUdGeVEyOWtaVUYwS0RBcFhHNWNkSFpoY2lCUVRGVlRYMVZTVEY5VFFVWkZJRDBnSnkwbkxtTm9ZWEpEYjJSbFFYUW9NQ2xjYmx4MGRtRnlJRk5NUVZOSVgxVlNURjlUUVVaRklEMGdKMThuTG1Ob1lYSkRiMlJsUVhRb01DbGNibHh1WEhSbWRXNWpkR2x2YmlCa1pXTnZaR1VnS0dWc2RDa2dlMXh1WEhSY2RIWmhjaUJqYjJSbElEMGdaV3gwTG1Ob1lYSkRiMlJsUVhRb01DbGNibHgwWEhScFppQW9ZMjlrWlNBOVBUMGdVRXhWVXlCOGZGeHVYSFJjZENBZ0lDQmpiMlJsSUQwOVBTQlFURlZUWDFWU1RGOVRRVVpGS1Z4dVhIUmNkRngwY21WMGRYSnVJRFl5SUM4dklDY3JKMXh1WEhSY2RHbG1JQ2hqYjJSbElEMDlQU0JUVEVGVFNDQjhmRnh1WEhSY2RDQWdJQ0JqYjJSbElEMDlQU0JUVEVGVFNGOVZVa3hmVTBGR1JTbGNibHgwWEhSY2RISmxkSFZ5YmlBMk15QXZMeUFuTHlkY2JseDBYSFJwWmlBb1kyOWtaU0E4SUU1VlRVSkZVaWxjYmx4MFhIUmNkSEpsZEhWeWJpQXRNU0F2TDI1dklHMWhkR05vWEc1Y2RGeDBhV1lnS0dOdlpHVWdQQ0JPVlUxQ1JWSWdLeUF4TUNsY2JseDBYSFJjZEhKbGRIVnliaUJqYjJSbElDMGdUbFZOUWtWU0lDc2dNallnS3lBeU5seHVYSFJjZEdsbUlDaGpiMlJsSUR3Z1ZWQlFSVklnS3lBeU5pbGNibHgwWEhSY2RISmxkSFZ5YmlCamIyUmxJQzBnVlZCUVJWSmNibHgwWEhScFppQW9ZMjlrWlNBOElFeFBWMFZTSUNzZ01qWXBYRzVjZEZ4MFhIUnlaWFIxY200Z1kyOWtaU0F0SUV4UFYwVlNJQ3NnTWpaY2JseDBmVnh1WEc1Y2RHWjFibU4wYVc5dUlHSTJORlJ2UW5sMFpVRnljbUY1SUNoaU5qUXBJSHRjYmx4MFhIUjJZWElnYVN3Z2Fpd2diQ3dnZEcxd0xDQndiR0ZqWlVodmJHUmxjbk1zSUdGeWNseHVYRzVjZEZ4MGFXWWdLR0kyTkM1c1pXNW5kR2dnSlNBMElENGdNQ2tnZTF4dVhIUmNkRngwZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2RKYm5aaGJHbGtJSE4wY21sdVp5NGdUR1Z1WjNSb0lHMTFjM1FnWW1VZ1lTQnRkV3gwYVhCc1pTQnZaaUEwSnlsY2JseDBYSFI5WEc1Y2JseDBYSFF2THlCMGFHVWdiblZ0WW1WeUlHOW1JR1Z4ZFdGc0lITnBaMjV6SUNod2JHRmpaU0JvYjJ4a1pYSnpLVnh1WEhSY2RDOHZJR2xtSUhSb1pYSmxJR0Z5WlNCMGQyOGdjR3hoWTJWb2IyeGtaWEp6TENCMGFHRnVJSFJvWlNCMGQyOGdZMmhoY21GamRHVnljeUJpWldadmNtVWdhWFJjYmx4MFhIUXZMeUJ5WlhCeVpYTmxiblFnYjI1bElHSjVkR1ZjYmx4MFhIUXZMeUJwWmlCMGFHVnlaU0JwY3lCdmJteDVJRzl1WlN3Z2RHaGxiaUIwYUdVZ2RHaHlaV1VnWTJoaGNtRmpkR1Z5Y3lCaVpXWnZjbVVnYVhRZ2NtVndjbVZ6Wlc1MElESWdZbmwwWlhOY2JseDBYSFF2THlCMGFHbHpJR2x6SUdwMWMzUWdZU0JqYUdWaGNDQm9ZV05ySUhSdklHNXZkQ0JrYnlCcGJtUmxlRTltSUhSM2FXTmxYRzVjZEZ4MGRtRnlJR3hsYmlBOUlHSTJOQzVzWlc1bmRHaGNibHgwWEhSd2JHRmpaVWh2YkdSbGNuTWdQU0FuUFNjZ1BUMDlJR0kyTkM1amFHRnlRWFFvYkdWdUlDMGdNaWtnUHlBeUlEb2dKejBuSUQwOVBTQmlOalF1WTJoaGNrRjBLR3hsYmlBdElERXBJRDhnTVNBNklEQmNibHh1WEhSY2RDOHZJR0poYzJVMk5DQnBjeUEwTHpNZ0t5QjFjQ0IwYnlCMGQyOGdZMmhoY21GamRHVnljeUJ2WmlCMGFHVWdiM0pwWjJsdVlXd2daR0YwWVZ4dVhIUmNkR0Z5Y2lBOUlHNWxkeUJCY25Jb1lqWTBMbXhsYm1kMGFDQXFJRE1nTHlBMElDMGdjR3hoWTJWSWIyeGtaWEp6S1Z4dVhHNWNkRngwTHk4Z2FXWWdkR2hsY21VZ1lYSmxJSEJzWVdObGFHOXNaR1Z5Y3l3Z2IyNXNlU0JuWlhRZ2RYQWdkRzhnZEdobElHeGhjM1FnWTI5dGNHeGxkR1VnTkNCamFHRnljMXh1WEhSY2RHd2dQU0J3YkdGalpVaHZiR1JsY25NZ1BpQXdJRDhnWWpZMExteGxibWQwYUNBdElEUWdPaUJpTmpRdWJHVnVaM1JvWEc1Y2JseDBYSFIyWVhJZ1RDQTlJREJjYmx4dVhIUmNkR1oxYm1OMGFXOXVJSEIxYzJnZ0tIWXBJSHRjYmx4MFhIUmNkR0Z5Y2x0TUt5dGRJRDBnZGx4dVhIUmNkSDFjYmx4dVhIUmNkR1p2Y2lBb2FTQTlJREFzSUdvZ1BTQXdPeUJwSUR3Z2JEc2dhU0FyUFNBMExDQnFJQ3M5SURNcElIdGNibHgwWEhSY2RIUnRjQ0E5SUNoa1pXTnZaR1VvWWpZMExtTm9ZWEpCZENocEtTa2dQRHdnTVRncElId2dLR1JsWTI5a1pTaGlOalF1WTJoaGNrRjBLR2tnS3lBeEtTa2dQRHdnTVRJcElId2dLR1JsWTI5a1pTaGlOalF1WTJoaGNrRjBLR2tnS3lBeUtTa2dQRHdnTmlrZ2ZDQmtaV052WkdVb1lqWTBMbU5vWVhKQmRDaHBJQ3NnTXlrcFhHNWNkRngwWEhSd2RYTm9LQ2gwYlhBZ0ppQXdlRVpHTURBd01Da2dQajRnTVRZcFhHNWNkRngwWEhSd2RYTm9LQ2gwYlhBZ0ppQXdlRVpHTURBcElENCtJRGdwWEc1Y2RGeDBYSFJ3ZFhOb0tIUnRjQ0FtSURCNFJrWXBYRzVjZEZ4MGZWeHVYRzVjZEZ4MGFXWWdLSEJzWVdObFNHOXNaR1Z5Y3lBOVBUMGdNaWtnZTF4dVhIUmNkRngwZEcxd0lEMGdLR1JsWTI5a1pTaGlOalF1WTJoaGNrRjBLR2twS1NBOFBDQXlLU0I4SUNoa1pXTnZaR1VvWWpZMExtTm9ZWEpCZENocElDc2dNU2twSUQ0K0lEUXBYRzVjZEZ4MFhIUndkWE5vS0hSdGNDQW1JREI0UmtZcFhHNWNkRngwZlNCbGJITmxJR2xtSUNod2JHRmpaVWh2YkdSbGNuTWdQVDA5SURFcElIdGNibHgwWEhSY2RIUnRjQ0E5SUNoa1pXTnZaR1VvWWpZMExtTm9ZWEpCZENocEtTa2dQRHdnTVRBcElId2dLR1JsWTI5a1pTaGlOalF1WTJoaGNrRjBLR2tnS3lBeEtTa2dQRHdnTkNrZ2ZDQW9aR1ZqYjJSbEtHSTJOQzVqYUdGeVFYUW9hU0FySURJcEtTQStQaUF5S1Z4dVhIUmNkRngwY0hWemFDZ29kRzF3SUQ0K0lEZ3BJQ1lnTUhoR1JpbGNibHgwWEhSY2RIQjFjMmdvZEcxd0lDWWdNSGhHUmlsY2JseDBYSFI5WEc1Y2JseDBYSFJ5WlhSMWNtNGdZWEp5WEc1Y2RIMWNibHh1WEhSbWRXNWpkR2x2YmlCMWFXNTBPRlJ2UW1GelpUWTBJQ2gxYVc1ME9Da2dlMXh1WEhSY2RIWmhjaUJwTEZ4dVhIUmNkRngwWlhoMGNtRkNlWFJsY3lBOUlIVnBiblE0TG14bGJtZDBhQ0FsSURNc0lDOHZJR2xtSUhkbElHaGhkbVVnTVNCaWVYUmxJR3hsWm5Rc0lIQmhaQ0F5SUdKNWRHVnpYRzVjZEZ4MFhIUnZkWFJ3ZFhRZ1BTQmNJbHdpTEZ4dVhIUmNkRngwZEdWdGNDd2diR1Z1WjNSb1hHNWNibHgwWEhSbWRXNWpkR2x2YmlCbGJtTnZaR1VnS0c1MWJTa2dlMXh1WEhSY2RGeDBjbVYwZFhKdUlHeHZiMnQxY0M1amFHRnlRWFFvYm5WdEtWeHVYSFJjZEgxY2JseHVYSFJjZEdaMWJtTjBhVzl1SUhSeWFYQnNaWFJVYjBKaGMyVTJOQ0FvYm5WdEtTQjdYRzVjZEZ4MFhIUnlaWFIxY200Z1pXNWpiMlJsS0c1MWJTQStQaUF4T0NBbUlEQjRNMFlwSUNzZ1pXNWpiMlJsS0c1MWJTQStQaUF4TWlBbUlEQjRNMFlwSUNzZ1pXNWpiMlJsS0c1MWJTQStQaUEySUNZZ01IZ3pSaWtnS3lCbGJtTnZaR1VvYm5WdElDWWdNSGd6UmlsY2JseDBYSFI5WEc1Y2JseDBYSFF2THlCbmJ5QjBhSEp2ZFdkb0lIUm9aU0JoY25KaGVTQmxkbVZ5ZVNCMGFISmxaU0JpZVhSbGN5d2dkMlVuYkd3Z1pHVmhiQ0IzYVhSb0lIUnlZV2xzYVc1bklITjBkV1ptSUd4aGRHVnlYRzVjZEZ4MFptOXlJQ2hwSUQwZ01Dd2diR1Z1WjNSb0lEMGdkV2x1ZERndWJHVnVaM1JvSUMwZ1pYaDBjbUZDZVhSbGN6c2dhU0E4SUd4bGJtZDBhRHNnYVNBclBTQXpLU0I3WEc1Y2RGeDBYSFIwWlcxd0lEMGdLSFZwYm5RNFcybGRJRHc4SURFMktTQXJJQ2gxYVc1ME9GdHBJQ3NnTVYwZ1BEd2dPQ2tnS3lBb2RXbHVkRGhiYVNBcklESmRLVnh1WEhSY2RGeDBiM1YwY0hWMElDczlJSFJ5YVhCc1pYUlViMEpoYzJVMk5DaDBaVzF3S1Z4dVhIUmNkSDFjYmx4dVhIUmNkQzh2SUhCaFpDQjBhR1VnWlc1a0lIZHBkR2dnZW1WeWIzTXNJR0oxZENCdFlXdGxJSE4xY21VZ2RHOGdibTkwSUdadmNtZGxkQ0IwYUdVZ1pYaDBjbUVnWW5sMFpYTmNibHgwWEhSemQybDBZMmdnS0dWNGRISmhRbmwwWlhNcElIdGNibHgwWEhSY2RHTmhjMlVnTVRwY2JseDBYSFJjZEZ4MGRHVnRjQ0E5SUhWcGJuUTRXM1ZwYm5RNExteGxibWQwYUNBdElERmRYRzVjZEZ4MFhIUmNkRzkxZEhCMWRDQXJQU0JsYm1OdlpHVW9kR1Z0Y0NBK1BpQXlLVnh1WEhSY2RGeDBYSFJ2ZFhSd2RYUWdLejBnWlc1amIyUmxLQ2gwWlcxd0lEdzhJRFFwSUNZZ01IZ3pSaWxjYmx4MFhIUmNkRngwYjNWMGNIVjBJQ3M5SUNjOVBTZGNibHgwWEhSY2RGeDBZbkpsWVd0Y2JseDBYSFJjZEdOaGMyVWdNanBjYmx4MFhIUmNkRngwZEdWdGNDQTlJQ2gxYVc1ME9GdDFhVzUwT0M1c1pXNW5kR2dnTFNBeVhTQThQQ0E0S1NBcklDaDFhVzUwT0Z0MWFXNTBPQzVzWlc1bmRHZ2dMU0F4WFNsY2JseDBYSFJjZEZ4MGIzVjBjSFYwSUNzOUlHVnVZMjlrWlNoMFpXMXdJRDQrSURFd0tWeHVYSFJjZEZ4MFhIUnZkWFJ3ZFhRZ0t6MGdaVzVqYjJSbEtDaDBaVzF3SUQ0K0lEUXBJQ1lnTUhnelJpbGNibHgwWEhSY2RGeDBiM1YwY0hWMElDczlJR1Z1WTI5a1pTZ29kR1Z0Y0NBOFBDQXlLU0FtSURCNE0wWXBYRzVjZEZ4MFhIUmNkRzkxZEhCMWRDQXJQU0FuUFNkY2JseDBYSFJjZEZ4MFluSmxZV3RjYmx4MFhIUjlYRzVjYmx4MFhIUnlaWFIxY200Z2IzVjBjSFYwWEc1Y2RIMWNibHh1WEhSbGVIQnZjblJ6TG5SdlFubDBaVUZ5Y21GNUlEMGdZalkwVkc5Q2VYUmxRWEp5WVhsY2JseDBaWGh3YjNKMGN5NW1jbTl0UW5sMFpVRnljbUY1SUQwZ2RXbHVkRGhVYjBKaGMyVTJORnh1ZlNoMGVYQmxiMllnWlhod2IzSjBjeUE5UFQwZ0ozVnVaR1ZtYVc1bFpDY2dQeUFvZEdocGN5NWlZWE5sTmpScWN5QTlJSHQ5S1NBNklHVjRjRzl5ZEhNcEtWeHVJbDE5XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxiYXNlNjQtanNcXFxcbGliXFxcXGI2NC5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxiYXNlNjQtanNcXFxcbGliXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cblxudmFyIGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpO1xudmFyIGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0Jyk7XG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyO1xuZXhwb3J0cy5TbG93QnVmZmVyID0gQnVmZmVyO1xuZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUyA9IDUwO1xuQnVmZmVyLnBvb2xTaXplID0gODE5MjtcblxuLyoqXG4gKiBJZiBgQnVmZmVyLl91c2VUeXBlZEFycmF5c2A6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBVc2UgT2JqZWN0IGltcGxlbWVudGF0aW9uIChjb21wYXRpYmxlIGRvd24gdG8gSUU2KVxuICovXG5CdWZmZXIuX3VzZVR5cGVkQXJyYXlzID0gZnVuY3Rpb24gKCkge1xuICAvLyBEZXRlY3QgaWYgYnJvd3NlciBzdXBwb3J0cyBUeXBlZCBBcnJheXMuIFN1cHBvcnRlZCBicm93c2VycyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLFxuICAvLyBDaHJvbWUgNyssIFNhZmFyaSA1LjErLCBPcGVyYSAxMS42KywgaU9TIDQuMisuIElmIHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgYWRkaW5nXG4gIC8vIHByb3BlcnRpZXMgdG8gYFVpbnQ4QXJyYXlgIGluc3RhbmNlcywgdGhlbiB0aGF0J3MgdGhlIHNhbWUgYXMgbm8gYFVpbnQ4QXJyYXlgIHN1cHBvcnRcbiAgLy8gYmVjYXVzZSB3ZSBuZWVkIHRvIGJlIGFibGUgdG8gYWRkIGFsbCB0aGUgbm9kZSBCdWZmZXIgQVBJIG1ldGhvZHMuIFRoaXMgaXMgYW4gaXNzdWVcbiAgLy8gaW4gRmlyZWZveCA0LTI5LiBOb3cgZml4ZWQ6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOFxuICB0cnkge1xuICAgIHZhciBidWYgPSBuZXcgQXJyYXlCdWZmZXIoMCk7XG4gICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KGJ1Zik7XG4gICAgYXJyLmZvbyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiA0MjtcbiAgICB9O1xuICAgIHJldHVybiA0MiA9PT0gYXJyLmZvbygpICYmIHR5cGVvZiBhcnIuc3ViYXJyYXkgPT09ICdmdW5jdGlvbic7IC8vIENocm9tZSA5LTEwIGxhY2sgYHN1YmFycmF5YFxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogQ2xhc3M6IEJ1ZmZlclxuICogPT09PT09PT09PT09PVxuICpcbiAqIFRoZSBCdWZmZXIgY29uc3RydWN0b3IgcmV0dXJucyBpbnN0YW5jZXMgb2YgYFVpbnQ4QXJyYXlgIHRoYXQgYXJlIGF1Z21lbnRlZFxuICogd2l0aCBmdW5jdGlvbiBwcm9wZXJ0aWVzIGZvciBhbGwgdGhlIG5vZGUgYEJ1ZmZlcmAgQVBJIGZ1bmN0aW9ucy4gV2UgdXNlXG4gKiBgVWludDhBcnJheWAgc28gdGhhdCBzcXVhcmUgYnJhY2tldCBub3RhdGlvbiB3b3JrcyBhcyBleHBlY3RlZCAtLSBpdCByZXR1cm5zXG4gKiBhIHNpbmdsZSBvY3RldC5cbiAqXG4gKiBCeSBhdWdtZW50aW5nIHRoZSBpbnN0YW5jZXMsIHdlIGNhbiBhdm9pZCBtb2RpZnlpbmcgdGhlIGBVaW50OEFycmF5YFxuICogcHJvdG90eXBlLlxuICovXG4oKTtmdW5jdGlvbiBCdWZmZXIoc3ViamVjdCwgZW5jb2RpbmcsIG5vWmVybykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQnVmZmVyKSkgcmV0dXJuIG5ldyBCdWZmZXIoc3ViamVjdCwgZW5jb2RpbmcsIG5vWmVybyk7XG5cbiAgdmFyIHR5cGUgPSB0eXBlb2Ygc3ViamVjdCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yoc3ViamVjdCk7XG5cbiAgLy8gV29ya2Fyb3VuZDogbm9kZSdzIGJhc2U2NCBpbXBsZW1lbnRhdGlvbiBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgc3RyaW5nc1xuICAvLyB3aGlsZSBiYXNlNjQtanMgZG9lcyBub3QuXG4gIGlmIChlbmNvZGluZyA9PT0gJ2Jhc2U2NCcgJiYgdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICBzdWJqZWN0ID0gc3RyaW5ndHJpbShzdWJqZWN0KTtcbiAgICB3aGlsZSAoc3ViamVjdC5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgICBzdWJqZWN0ID0gc3ViamVjdCArICc9JztcbiAgICB9XG4gIH1cblxuICAvLyBGaW5kIHRoZSBsZW5ndGhcbiAgdmFyIGxlbmd0aDtcbiAgaWYgKHR5cGUgPT09ICdudW1iZXInKSBsZW5ndGggPSBjb2VyY2Uoc3ViamVjdCk7ZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycpIGxlbmd0aCA9IEJ1ZmZlci5ieXRlTGVuZ3RoKHN1YmplY3QsIGVuY29kaW5nKTtlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0JykgbGVuZ3RoID0gY29lcmNlKHN1YmplY3QubGVuZ3RoIC8vIGFzc3VtZSB0aGF0IG9iamVjdCBpcyBhcnJheS1saWtlXG4gICk7ZWxzZSB0aHJvdyBuZXcgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG5lZWRzIHRvIGJlIGEgbnVtYmVyLCBhcnJheSBvciBzdHJpbmcuJyk7XG5cbiAgdmFyIGJ1ZjtcbiAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICAvLyBQcmVmZXJyZWQ6IFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgYnVmID0gQnVmZmVyLl9hdWdtZW50KG5ldyBVaW50OEFycmF5KGxlbmd0aCkpO1xuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gVEhJUyBpbnN0YW5jZSBvZiBCdWZmZXIgKGNyZWF0ZWQgYnkgYG5ld2ApXG4gICAgYnVmID0gdGhpcztcbiAgICBidWYubGVuZ3RoID0gbGVuZ3RoO1xuICAgIGJ1Zi5faXNCdWZmZXIgPSB0cnVlO1xuICB9XG5cbiAgdmFyIGk7XG4gIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzICYmIHR5cGVvZiBzdWJqZWN0LmJ5dGVMZW5ndGggPT09ICdudW1iZXInKSB7XG4gICAgLy8gU3BlZWQgb3B0aW1pemF0aW9uIC0tIHVzZSBzZXQgaWYgd2UncmUgY29weWluZyBmcm9tIGEgdHlwZWQgYXJyYXlcbiAgICBidWYuX3NldChzdWJqZWN0KTtcbiAgfSBlbHNlIGlmIChpc0FycmF5aXNoKHN1YmplY3QpKSB7XG4gICAgLy8gVHJlYXQgYXJyYXktaXNoIG9iamVjdHMgYXMgYSBieXRlIGFycmF5XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoQnVmZmVyLmlzQnVmZmVyKHN1YmplY3QpKSBidWZbaV0gPSBzdWJqZWN0LnJlYWRVSW50OChpKTtlbHNlIGJ1ZltpXSA9IHN1YmplY3RbaV07XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgYnVmLndyaXRlKHN1YmplY3QsIDAsIGVuY29kaW5nKTtcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyAmJiAhQnVmZmVyLl91c2VUeXBlZEFycmF5cyAmJiAhbm9aZXJvKSB7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBidWZbaV0gPSAwO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWY7XG59XG5cbi8vIFNUQVRJQyBNRVRIT0RTXG4vLyA9PT09PT09PT09PT09PVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIChlbmNvZGluZykge1xuICBzd2l0Y2ggKFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAncmF3JzpcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gKGIpIHtcbiAgcmV0dXJuICEhKGIgIT09IG51bGwgJiYgYiAhPT0gdW5kZWZpbmVkICYmIGIuX2lzQnVmZmVyKTtcbn07XG5cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gZnVuY3Rpb24gKHN0ciwgZW5jb2RpbmcpIHtcbiAgdmFyIHJldDtcbiAgc3RyID0gc3RyICsgJyc7XG4gIHN3aXRjaCAoZW5jb2RpbmcgfHwgJ3V0ZjgnKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGggLyAyO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgICAgcmV0ID0gdXRmOFRvQnl0ZXMoc3RyKS5sZW5ndGg7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdyYXcnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICByZXQgPSBiYXNlNjRUb0J5dGVzKHN0cikubGVuZ3RoO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldCA9IHN0ci5sZW5ndGggKiAyO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZycpO1xuICB9XG4gIHJldHVybiByZXQ7XG59O1xuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gKGxpc3QsIHRvdGFsTGVuZ3RoKSB7XG4gIGFzc2VydChpc0FycmF5KGxpc3QpLCAnVXNhZ2U6IEJ1ZmZlci5jb25jYXQobGlzdCwgW3RvdGFsTGVuZ3RoXSlcXG4nICsgJ2xpc3Qgc2hvdWxkIGJlIGFuIEFycmF5LicpO1xuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKDApO1xuICB9IGVsc2UgaWYgKGxpc3QubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGxpc3RbMF07XG4gIH1cblxuICB2YXIgaTtcbiAgaWYgKHR5cGVvZiB0b3RhbExlbmd0aCAhPT0gJ251bWJlcicpIHtcbiAgICB0b3RhbExlbmd0aCA9IDA7XG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRvdGFsTGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHZhciBidWYgPSBuZXcgQnVmZmVyKHRvdGFsTGVuZ3RoKTtcbiAgdmFyIHBvcyA9IDA7XG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIGl0ZW0uY29weShidWYsIHBvcyk7XG4gICAgcG9zICs9IGl0ZW0ubGVuZ3RoO1xuICB9XG4gIHJldHVybiBidWY7XG59O1xuXG4vLyBCVUZGRVIgSU5TVEFOQ0UgTUVUSE9EU1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gX2hleFdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwO1xuICB2YXIgcmVtYWluaW5nID0gYnVmLmxlbmd0aCAtIG9mZnNldDtcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmc7XG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aCk7XG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nO1xuICAgIH1cbiAgfVxuXG4gIC8vIG11c3QgYmUgYW4gZXZlbiBudW1iZXIgb2YgZGlnaXRzXG4gIHZhciBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoO1xuICBhc3NlcnQoc3RyTGVuICUgMiA9PT0gMCwgJ0ludmFsaWQgaGV4IHN0cmluZycpO1xuXG4gIGlmIChsZW5ndGggPiBzdHJMZW4gLyAyKSB7XG4gICAgbGVuZ3RoID0gc3RyTGVuIC8gMjtcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGJ5dGUgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpO1xuICAgIGFzc2VydCghaXNOYU4oYnl0ZSksICdJbnZhbGlkIGhleCBzdHJpbmcnKTtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSBieXRlO1xuICB9XG4gIEJ1ZmZlci5fY2hhcnNXcml0dGVuID0gaSAqIDI7XG4gIHJldHVybiBpO1xufVxuXG5mdW5jdGlvbiBfdXRmOFdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPSBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpO1xuICByZXR1cm4gY2hhcnNXcml0dGVuO1xufVxuXG5mdW5jdGlvbiBfYXNjaWlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID0gYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aCk7XG4gIHJldHVybiBjaGFyc1dyaXR0ZW47XG59XG5cbmZ1bmN0aW9uIF9iaW5hcnlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIF9hc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCk7XG59XG5cbmZ1bmN0aW9uIF9iYXNlNjRXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgdmFyIGNoYXJzV3JpdHRlbiA9IEJ1ZmZlci5fY2hhcnNXcml0dGVuID0gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpO1xuICByZXR1cm4gY2hhcnNXcml0dGVuO1xufVxuXG5mdW5jdGlvbiBfdXRmMTZsZVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPSBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpO1xuICByZXR1cm4gY2hhcnNXcml0dGVuO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKSB7XG4gIC8vIFN1cHBvcnQgYm90aCAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpXG4gIC8vIGFuZCB0aGUgbGVnYWN5IChzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXQsIGxlbmd0aClcbiAgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBpZiAoIWlzRmluaXRlKGxlbmd0aCkpIHtcbiAgICAgIGVuY29kaW5nID0gbGVuZ3RoO1xuICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBsZWdhY3lcbiAgICB2YXIgc3dhcCA9IGVuY29kaW5nO1xuICAgIGVuY29kaW5nID0gb2Zmc2V0O1xuICAgIG9mZnNldCA9IGxlbmd0aDtcbiAgICBsZW5ndGggPSBzd2FwO1xuICB9XG5cbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMDtcbiAgdmFyIHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0O1xuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZztcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKTtcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmc7XG4gICAgfVxuICB9XG4gIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nIHx8ICd1dGY4JykudG9Mb3dlckNhc2UoKTtcblxuICB2YXIgcmV0O1xuICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICAgIHJldCA9IF9oZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIHJldCA9IF91dGY4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgICByZXQgPSBfYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICByZXQgPSBfYmluYXJ5V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgcmV0ID0gX2Jhc2U2NFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldCA9IF91dGYxNmxlV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nJyk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nIHx8ICd1dGY4JykudG9Mb3dlckNhc2UoKTtcbiAgc3RhcnQgPSBOdW1iZXIoc3RhcnQpIHx8IDA7XG4gIGVuZCA9IGVuZCAhPT0gdW5kZWZpbmVkID8gTnVtYmVyKGVuZCkgOiBlbmQgPSBzZWxmLmxlbmd0aDtcblxuICAvLyBGYXN0cGF0aCBlbXB0eSBzdHJpbmdzXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm4gJyc7XG5cbiAgdmFyIHJldDtcbiAgc3dpdGNoIChlbmNvZGluZykge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgICByZXQgPSBfaGV4U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSBfdXRmOFNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYXNjaWknOlxuICAgICAgcmV0ID0gX2FzY2lpU2xpY2Uoc2VsZiwgc3RhcnQsIGVuZCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdiaW5hcnknOlxuICAgICAgcmV0ID0gX2JpbmFyeVNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IF9iYXNlNjRTbGljZShzZWxmLCBzdGFydCwgZW5kKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXQgPSBfdXRmMTZsZVNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBlbmNvZGluZycpO1xuICB9XG4gIHJldHVybiByZXQ7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQnVmZmVyJyxcbiAgICBkYXRhOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnIgfHwgdGhpcywgMClcbiAgfTtcbn07XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uICh0YXJnZXQsIHRhcmdldF9zdGFydCwgc3RhcnQsIGVuZCkge1xuICB2YXIgc291cmNlID0gdGhpcztcblxuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDA7XG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGg7XG4gIGlmICghdGFyZ2V0X3N0YXJ0KSB0YXJnZXRfc3RhcnQgPSAwO1xuXG4gIC8vIENvcHkgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuO1xuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCBzb3VyY2UubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgLy8gRmF0YWwgZXJyb3IgY29uZGl0aW9uc1xuICBhc3NlcnQoZW5kID49IHN0YXJ0LCAnc291cmNlRW5kIDwgc291cmNlU3RhcnQnKTtcbiAgYXNzZXJ0KHRhcmdldF9zdGFydCA+PSAwICYmIHRhcmdldF9zdGFydCA8IHRhcmdldC5sZW5ndGgsICd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJyk7XG4gIGFzc2VydChzdGFydCA+PSAwICYmIHN0YXJ0IDwgc291cmNlLmxlbmd0aCwgJ3NvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHMnKTtcbiAgYXNzZXJ0KGVuZCA+PSAwICYmIGVuZCA8PSBzb3VyY2UubGVuZ3RoLCAnc291cmNlRW5kIG91dCBvZiBib3VuZHMnXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgKTtpZiAoZW5kID4gdGhpcy5sZW5ndGgpIGVuZCA9IHRoaXMubGVuZ3RoO1xuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldF9zdGFydCA8IGVuZCAtIHN0YXJ0KSBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0X3N0YXJ0ICsgc3RhcnQ7XG5cbiAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0O1xuXG4gIGlmIChsZW4gPCAxMDAgfHwgIUJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldF9zdGFydF0gPSB0aGlzW2kgKyBzdGFydF07XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRhcmdldC5fc2V0KHRoaXMuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgbGVuKSwgdGFyZ2V0X3N0YXJ0KTtcbiAgfVxufTtcblxuZnVuY3Rpb24gX2Jhc2U2NFNsaWNlKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBpZiAoc3RhcnQgPT09IDAgJiYgZW5kID09PSBidWYubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX3V0ZjhTbGljZShidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJlcyA9ICcnO1xuICB2YXIgdG1wID0gJyc7XG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZCk7XG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICBpZiAoYnVmW2ldIDw9IDB4N0YpIHtcbiAgICAgIHJlcyArPSBkZWNvZGVVdGY4Q2hhcih0bXApICsgU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pO1xuICAgICAgdG1wID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRtcCArPSAnJScgKyBidWZbaV0udG9TdHJpbmcoMTYpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXMgKyBkZWNvZGVVdGY4Q2hhcih0bXApO1xufVxuXG5mdW5jdGlvbiBfYXNjaWlTbGljZShidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnO1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpO1xuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKTtcbiAgfXJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIF9iaW5hcnlTbGljZShidWYsIHN0YXJ0LCBlbmQpIHtcbiAgcmV0dXJuIF9hc2NpaVNsaWNlKGJ1Ziwgc3RhcnQsIGVuZCk7XG59XG5cbmZ1bmN0aW9uIF9oZXhTbGljZShidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMDtcbiAgaWYgKCFlbmQgfHwgZW5kIDwgMCB8fCBlbmQgPiBsZW4pIGVuZCA9IGxlbjtcblxuICB2YXIgb3V0ID0gJyc7XG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgb3V0ICs9IHRvSGV4KGJ1ZltpXSk7XG4gIH1cbiAgcmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gX3V0ZjE2bGVTbGljZShidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpO1xuICB2YXIgcmVzID0gJyc7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIGJ5dGVzW2kgKyAxXSAqIDI1Nik7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aDtcbiAgc3RhcnQgPSBjbGFtcChzdGFydCwgbGVuLCAwKTtcbiAgZW5kID0gY2xhbXAoZW5kLCBsZW4sIGxlbik7XG5cbiAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMpIHtcbiAgICByZXR1cm4gQnVmZmVyLl9hdWdtZW50KHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZCkpO1xuICB9IGVsc2Uge1xuICAgIHZhciBzbGljZUxlbiA9IGVuZCAtIHN0YXJ0O1xuICAgIHZhciBuZXdCdWYgPSBuZXcgQnVmZmVyKHNsaWNlTGVuLCB1bmRlZmluZWQsIHRydWUpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpY2VMZW47IGkrKykge1xuICAgICAgbmV3QnVmW2ldID0gdGhpc1tpICsgc3RhcnRdO1xuICAgIH1cbiAgICByZXR1cm4gbmV3QnVmO1xuICB9XG59O1xuXG4vLyBgZ2V0YCB3aWxsIGJlIHJlbW92ZWQgaW4gTm9kZSAwLjEzK1xuQnVmZmVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gIGNvbnNvbGUubG9nKCcuZ2V0KCkgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHVzaW5nIGFycmF5IGluZGV4ZXMgaW5zdGVhZC4nKTtcbiAgcmV0dXJuIHRoaXMucmVhZFVJbnQ4KG9mZnNldCk7XG59O1xuXG4vLyBgc2V0YCB3aWxsIGJlIHJlbW92ZWQgaW4gTm9kZSAwLjEzK1xuQnVmZmVyLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAodiwgb2Zmc2V0KSB7XG4gIGNvbnNvbGUubG9nKCcuc2V0KCkgaXMgZGVwcmVjYXRlZC4gQWNjZXNzIHVzaW5nIGFycmF5IGluZGV4ZXMgaW5zdGVhZC4nKTtcbiAgcmV0dXJuIHRoaXMud3JpdGVVSW50OCh2LCBvZmZzZXQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgfVxuXG4gIGlmIChvZmZzZXQgPj0gdGhpcy5sZW5ndGgpIHJldHVybjtcblxuICByZXR1cm4gdGhpc1tvZmZzZXRdO1xufTtcblxuZnVuY3Rpb24gX3JlYWRVSW50MTYoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuICBpZiAob2Zmc2V0ID49IGxlbikgcmV0dXJuO1xuXG4gIHZhciB2YWw7XG4gIGlmIChsaXR0bGVFbmRpYW4pIHtcbiAgICB2YWwgPSBidWZbb2Zmc2V0XTtcbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbikgdmFsIHw9IGJ1ZltvZmZzZXQgKyAxXSA8PCA4O1xuICB9IGVsc2Uge1xuICAgIHZhbCA9IGJ1ZltvZmZzZXRdIDw8IDg7XG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pIHZhbCB8PSBidWZbb2Zmc2V0ICsgMV07XG4gIH1cbiAgcmV0dXJuIHZhbDtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2TEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MTYodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQxNih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5mdW5jdGlvbiBfcmVhZFVJbnQzMihidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgdmFyIHZhbDtcbiAgaWYgKGxpdHRsZUVuZGlhbikge1xuICAgIGlmIChvZmZzZXQgKyAyIDwgbGVuKSB2YWwgPSBidWZbb2Zmc2V0ICsgMl0gPDwgMTY7XG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pIHZhbCB8PSBidWZbb2Zmc2V0ICsgMV0gPDwgODtcbiAgICB2YWwgfD0gYnVmW29mZnNldF07XG4gICAgaWYgKG9mZnNldCArIDMgPCBsZW4pIHZhbCA9IHZhbCArIChidWZbb2Zmc2V0ICsgM10gPDwgMjQgPj4+IDApO1xuICB9IGVsc2Uge1xuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKSB2YWwgPSBidWZbb2Zmc2V0ICsgMV0gPDwgMTY7XG4gICAgaWYgKG9mZnNldCArIDIgPCBsZW4pIHZhbCB8PSBidWZbb2Zmc2V0ICsgMl0gPDwgODtcbiAgICBpZiAob2Zmc2V0ICsgMyA8IGxlbikgdmFsIHw9IGJ1ZltvZmZzZXQgKyAzXTtcbiAgICB2YWwgPSB2YWwgKyAoYnVmW29mZnNldF0gPDwgMjQgPj4+IDApO1xuICB9XG4gIHJldHVybiB2YWw7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDMyKHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyQkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MzIodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gIHZhciBuZWcgPSB0aGlzW29mZnNldF0gJiAweDgwO1xuICBpZiAobmVnKSByZXR1cm4gKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xO2Vsc2UgcmV0dXJuIHRoaXNbb2Zmc2V0XTtcbn07XG5cbmZ1bmN0aW9uIF9yZWFkSW50MTYoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuICBpZiAob2Zmc2V0ID49IGxlbikgcmV0dXJuO1xuXG4gIHZhciB2YWwgPSBfcmVhZFVJbnQxNihidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCB0cnVlKTtcbiAgdmFyIG5lZyA9IHZhbCAmIDB4ODAwMDtcbiAgaWYgKG5lZykgcmV0dXJuICgweGZmZmYgLSB2YWwgKyAxKSAqIC0xO2Vsc2UgcmV0dXJuIHZhbDtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDE2KHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEludDE2KHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbmZ1bmN0aW9uIF9yZWFkSW50MzIoYnVmLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHJlYWQgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuICBpZiAob2Zmc2V0ID49IGxlbikgcmV0dXJuO1xuXG4gIHZhciB2YWwgPSBfcmVhZFVJbnQzMihidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCB0cnVlKTtcbiAgdmFyIG5lZyA9IHZhbCAmIDB4ODAwMDAwMDA7XG4gIGlmIChuZWcpIHJldHVybiAoMHhmZmZmZmZmZiAtIHZhbCArIDEpICogLTE7ZWxzZSByZXR1cm4gdmFsO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MzIodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MzIodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuZnVuY3Rpb24gX3JlYWRGbG9hdChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICB9XG5cbiAgcmV0dXJuIGllZWU3NTQucmVhZChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNCk7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRGbG9hdCh0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRGbG9hdCh0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5mdW5jdGlvbiBfcmVhZERvdWJsZShidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgNyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICB9XG5cbiAgcmV0dXJuIGllZWU3NTQucmVhZChidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOCk7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkRG91YmxlKHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWREb3VibGUodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICd0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgICB2ZXJpZnVpbnQodmFsdWUsIDB4ZmYpO1xuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlO1xufTtcblxuZnVuY3Rpb24gX3dyaXRlVUludDE2KGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJyk7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICd0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgICB2ZXJpZnVpbnQodmFsdWUsIDB4ZmZmZik7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGxlbiAtIG9mZnNldCwgMik7IGkgPCBqOyBpKyspIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgJiAweGZmIDw8IDggKiAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSkgPj4+IChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpICogODtcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbmZ1bmN0aW9uIF93cml0ZVVJbnQzMihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpO1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAndHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gICAgdmVyaWZ1aW50KHZhbHVlLCAweGZmZmZmZmZmKTtcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuICBpZiAob2Zmc2V0ID49IGxlbikgcmV0dXJuO1xuXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4obGVuIC0gb2Zmc2V0LCA0KTsgaSA8IGo7IGkrKykge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHZhbHVlID4+PiAobGl0dGxlRW5kaWFuID8gaSA6IDMgLSBpKSAqIDggJiAweGZmO1xuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDggPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICAgIHZlcmlmc2ludCh2YWx1ZSwgMHg3ZiwgLTB4ODApO1xuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gIGlmICh2YWx1ZSA+PSAwKSB0aGlzLndyaXRlVUludDgodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpO2Vsc2UgdGhpcy53cml0ZVVJbnQ4KDB4ZmYgKyB2YWx1ZSArIDEsIG9mZnNldCwgbm9Bc3NlcnQpO1xufTtcblxuZnVuY3Rpb24gX3dyaXRlSW50MTYoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKTtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICAgIHZlcmlmc2ludCh2YWx1ZSwgMHg3ZmZmLCAtMHg4MDAwKTtcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuICBpZiAob2Zmc2V0ID49IGxlbikgcmV0dXJuO1xuXG4gIGlmICh2YWx1ZSA+PSAwKSBfd3JpdGVVSW50MTYoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KTtlbHNlIF93cml0ZVVJbnQxNihidWYsIDB4ZmZmZiArIHZhbHVlICsgMSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KTtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbmZ1bmN0aW9uIF93cml0ZUludDMyKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJyk7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgICB2ZXJpZnNpbnQodmFsdWUsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKTtcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuICBpZiAob2Zmc2V0ID49IGxlbikgcmV0dXJuO1xuXG4gIGlmICh2YWx1ZSA+PSAwKSBfd3JpdGVVSW50MzIoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KTtlbHNlIF93cml0ZVVJbnQzMihidWYsIDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDEsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCk7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5mdW5jdGlvbiBfd3JpdGVGbG9hdChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpO1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDMgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gICAgdmVyaWZJRUVFNzU0KHZhbHVlLCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOCk7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNCk7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5mdW5jdGlvbiBfd3JpdGVEb3VibGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKTtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyA3IDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICAgIHZlcmlmSUVFRTc1NCh2YWx1ZSwgMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgsIC0xLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCk7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOCk7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuLy8gZmlsbCh2YWx1ZSwgc3RhcnQ9MCwgZW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiAodmFsdWUsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCF2YWx1ZSkgdmFsdWUgPSAwO1xuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDA7XG4gIGlmICghZW5kKSBlbmQgPSB0aGlzLmxlbmd0aDtcblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHZhbHVlID0gdmFsdWUuY2hhckNvZGVBdCgwKTtcbiAgfVxuXG4gIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInICYmICFpc05hTih2YWx1ZSksICd2YWx1ZSBpcyBub3QgYSBudW1iZXInKTtcbiAgYXNzZXJ0KGVuZCA+PSBzdGFydCwgJ2VuZCA8IHN0YXJ0J1xuXG4gIC8vIEZpbGwgMCBieXRlczsgd2UncmUgZG9uZVxuICApO2lmIChlbmQgPT09IHN0YXJ0KSByZXR1cm47XG4gIGlmICh0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gIGFzc2VydChzdGFydCA+PSAwICYmIHN0YXJ0IDwgdGhpcy5sZW5ndGgsICdzdGFydCBvdXQgb2YgYm91bmRzJyk7XG4gIGFzc2VydChlbmQgPj0gMCAmJiBlbmQgPD0gdGhpcy5sZW5ndGgsICdlbmQgb3V0IG9mIGJvdW5kcycpO1xuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgdGhpc1tpXSA9IHZhbHVlO1xuICB9XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBvdXQgPSBbXTtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgb3V0W2ldID0gdG9IZXgodGhpc1tpXSk7XG4gICAgaWYgKGkgPT09IGV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMpIHtcbiAgICAgIG91dFtpICsgMV0gPSAnLi4uJztcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gJzxCdWZmZXIgJyArIG91dC5qb2luKCcgJykgKyAnPic7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgYEFycmF5QnVmZmVyYCB3aXRoIHRoZSAqY29waWVkKiBtZW1vcnkgb2YgdGhlIGJ1ZmZlciBpbnN0YW5jZS5cbiAqIEFkZGVkIGluIE5vZGUgMC4xMi4gT25seSBhdmFpbGFibGUgaW4gYnJvd3NlcnMgdGhhdCBzdXBwb3J0IEFycmF5QnVmZmVyLlxuICovXG5CdWZmZXIucHJvdG90eXBlLnRvQXJyYXlCdWZmZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgICAgcmV0dXJuIG5ldyBCdWZmZXIodGhpcykuYnVmZmVyO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYnVmID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5sZW5ndGgpO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGJ1Zi5sZW5ndGg7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICBidWZbaV0gPSB0aGlzW2ldO1xuICAgICAgfXJldHVybiBidWYuYnVmZmVyO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0J1ZmZlci50b0FycmF5QnVmZmVyIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyJyk7XG4gIH1cbn07XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gc3RyaW5ndHJpbShzdHIpIHtcbiAgaWYgKHN0ci50cmltKSByZXR1cm4gc3RyLnRyaW0oKTtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG59XG5cbnZhciBCUCA9IEJ1ZmZlci5wcm90b3R5cGU7XG5cbi8qKlxuICogQXVnbWVudCBhIFVpbnQ4QXJyYXkgKmluc3RhbmNlKiAobm90IHRoZSBVaW50OEFycmF5IGNsYXNzISkgd2l0aCBCdWZmZXIgbWV0aG9kc1xuICovXG5CdWZmZXIuX2F1Z21lbnQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGFyci5faXNCdWZmZXIgPSB0cnVlO1xuXG4gIC8vIHNhdmUgcmVmZXJlbmNlIHRvIG9yaWdpbmFsIFVpbnQ4QXJyYXkgZ2V0L3NldCBtZXRob2RzIGJlZm9yZSBvdmVyd3JpdGluZ1xuICBhcnIuX2dldCA9IGFyci5nZXQ7XG4gIGFyci5fc2V0ID0gYXJyLnNldDtcblxuICAvLyBkZXByZWNhdGVkLCB3aWxsIGJlIHJlbW92ZWQgaW4gbm9kZSAwLjEzK1xuICBhcnIuZ2V0ID0gQlAuZ2V0O1xuICBhcnIuc2V0ID0gQlAuc2V0O1xuXG4gIGFyci53cml0ZSA9IEJQLndyaXRlO1xuICBhcnIudG9TdHJpbmcgPSBCUC50b1N0cmluZztcbiAgYXJyLnRvTG9jYWxlU3RyaW5nID0gQlAudG9TdHJpbmc7XG4gIGFyci50b0pTT04gPSBCUC50b0pTT047XG4gIGFyci5jb3B5ID0gQlAuY29weTtcbiAgYXJyLnNsaWNlID0gQlAuc2xpY2U7XG4gIGFyci5yZWFkVUludDggPSBCUC5yZWFkVUludDg7XG4gIGFyci5yZWFkVUludDE2TEUgPSBCUC5yZWFkVUludDE2TEU7XG4gIGFyci5yZWFkVUludDE2QkUgPSBCUC5yZWFkVUludDE2QkU7XG4gIGFyci5yZWFkVUludDMyTEUgPSBCUC5yZWFkVUludDMyTEU7XG4gIGFyci5yZWFkVUludDMyQkUgPSBCUC5yZWFkVUludDMyQkU7XG4gIGFyci5yZWFkSW50OCA9IEJQLnJlYWRJbnQ4O1xuICBhcnIucmVhZEludDE2TEUgPSBCUC5yZWFkSW50MTZMRTtcbiAgYXJyLnJlYWRJbnQxNkJFID0gQlAucmVhZEludDE2QkU7XG4gIGFyci5yZWFkSW50MzJMRSA9IEJQLnJlYWRJbnQzMkxFO1xuICBhcnIucmVhZEludDMyQkUgPSBCUC5yZWFkSW50MzJCRTtcbiAgYXJyLnJlYWRGbG9hdExFID0gQlAucmVhZEZsb2F0TEU7XG4gIGFyci5yZWFkRmxvYXRCRSA9IEJQLnJlYWRGbG9hdEJFO1xuICBhcnIucmVhZERvdWJsZUxFID0gQlAucmVhZERvdWJsZUxFO1xuICBhcnIucmVhZERvdWJsZUJFID0gQlAucmVhZERvdWJsZUJFO1xuICBhcnIud3JpdGVVSW50OCA9IEJQLndyaXRlVUludDg7XG4gIGFyci53cml0ZVVJbnQxNkxFID0gQlAud3JpdGVVSW50MTZMRTtcbiAgYXJyLndyaXRlVUludDE2QkUgPSBCUC53cml0ZVVJbnQxNkJFO1xuICBhcnIud3JpdGVVSW50MzJMRSA9IEJQLndyaXRlVUludDMyTEU7XG4gIGFyci53cml0ZVVJbnQzMkJFID0gQlAud3JpdGVVSW50MzJCRTtcbiAgYXJyLndyaXRlSW50OCA9IEJQLndyaXRlSW50ODtcbiAgYXJyLndyaXRlSW50MTZMRSA9IEJQLndyaXRlSW50MTZMRTtcbiAgYXJyLndyaXRlSW50MTZCRSA9IEJQLndyaXRlSW50MTZCRTtcbiAgYXJyLndyaXRlSW50MzJMRSA9IEJQLndyaXRlSW50MzJMRTtcbiAgYXJyLndyaXRlSW50MzJCRSA9IEJQLndyaXRlSW50MzJCRTtcbiAgYXJyLndyaXRlRmxvYXRMRSA9IEJQLndyaXRlRmxvYXRMRTtcbiAgYXJyLndyaXRlRmxvYXRCRSA9IEJQLndyaXRlRmxvYXRCRTtcbiAgYXJyLndyaXRlRG91YmxlTEUgPSBCUC53cml0ZURvdWJsZUxFO1xuICBhcnIud3JpdGVEb3VibGVCRSA9IEJQLndyaXRlRG91YmxlQkU7XG4gIGFyci5maWxsID0gQlAuZmlsbDtcbiAgYXJyLmluc3BlY3QgPSBCUC5pbnNwZWN0O1xuICBhcnIudG9BcnJheUJ1ZmZlciA9IEJQLnRvQXJyYXlCdWZmZXI7XG5cbiAgcmV0dXJuIGFycjtcbn07XG5cbi8vIHNsaWNlKHN0YXJ0LCBlbmQpXG5mdW5jdGlvbiBjbGFtcChpbmRleCwgbGVuLCBkZWZhdWx0VmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBpbmRleCAhPT0gJ251bWJlcicpIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gIGluZGV4ID0gfn5pbmRleDsgLy8gQ29lcmNlIHRvIGludGVnZXIuXG4gIGlmIChpbmRleCA+PSBsZW4pIHJldHVybiBsZW47XG4gIGlmIChpbmRleCA+PSAwKSByZXR1cm4gaW5kZXg7XG4gIGluZGV4ICs9IGxlbjtcbiAgaWYgKGluZGV4ID49IDApIHJldHVybiBpbmRleDtcbiAgcmV0dXJuIDA7XG59XG5cbmZ1bmN0aW9uIGNvZXJjZShsZW5ndGgpIHtcbiAgLy8gQ29lcmNlIGxlbmd0aCB0byBhIG51bWJlciAocG9zc2libHkgTmFOKSwgcm91bmQgdXBcbiAgLy8gaW4gY2FzZSBpdCdzIGZyYWN0aW9uYWwgKGUuZy4gMTIzLjQ1NikgdGhlbiBkbyBhXG4gIC8vIGRvdWJsZSBuZWdhdGUgdG8gY29lcmNlIGEgTmFOIHRvIDAuIEVhc3ksIHJpZ2h0P1xuICBsZW5ndGggPSB+fk1hdGguY2VpbCgrbGVuZ3RoKTtcbiAgcmV0dXJuIGxlbmd0aCA8IDAgPyAwIDogbGVuZ3RoO1xufVxuXG5mdW5jdGlvbiBpc0FycmF5KHN1YmplY3QpIHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChzdWJqZWN0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzdWJqZWN0KSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfSkoc3ViamVjdCk7XG59XG5cbmZ1bmN0aW9uIGlzQXJyYXlpc2goc3ViamVjdCkge1xuICByZXR1cm4gaXNBcnJheShzdWJqZWN0KSB8fCBCdWZmZXIuaXNCdWZmZXIoc3ViamVjdCkgfHwgc3ViamVjdCAmJiAodHlwZW9mIHN1YmplY3QgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKHN1YmplY3QpKSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHN1YmplY3QubGVuZ3RoID09PSAnbnVtYmVyJztcbn1cblxuZnVuY3Rpb24gdG9IZXgobikge1xuICBpZiAobiA8IDE2KSByZXR1cm4gJzAnICsgbi50b1N0cmluZygxNik7XG4gIHJldHVybiBuLnRvU3RyaW5nKDE2KTtcbn1cblxuZnVuY3Rpb24gdXRmOFRvQnl0ZXMoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYiA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgIGlmIChiIDw9IDB4N0YpIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpKTtlbHNlIHtcbiAgICAgIHZhciBzdGFydCA9IGk7XG4gICAgICBpZiAoYiA+PSAweEQ4MDAgJiYgYiA8PSAweERGRkYpIGkrKztcbiAgICAgIHZhciBoID0gZW5jb2RlVVJJQ29tcG9uZW50KHN0ci5zbGljZShzdGFydCwgaSArIDEpKS5zdWJzdHIoMSkuc3BsaXQoJyUnKTtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgaC5sZW5ndGg7IGorKykge1xuICAgICAgICBieXRlQXJyYXkucHVzaChwYXJzZUludChoW2pdLCAxNikpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5O1xufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBOb2RlJ3MgY29kZSBzZWVtcyB0byBiZSBkb2luZyB0aGlzIGFuZCBub3QgJiAweDdGLi5cbiAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpO1xuICB9XG4gIHJldHVybiBieXRlQXJyYXk7XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzKHN0cikge1xuICB2YXIgYywgaGksIGxvO1xuICB2YXIgYnl0ZUFycmF5ID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgIGhpID0gYyA+PiA4O1xuICAgIGxvID0gYyAlIDI1NjtcbiAgICBieXRlQXJyYXkucHVzaChsbyk7XG4gICAgYnl0ZUFycmF5LnB1c2goaGkpO1xuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheTtcbn1cblxuZnVuY3Rpb24gYmFzZTY0VG9CeXRlcyhzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShzdHIpO1xufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgcG9zO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCB8fCBpID49IHNyYy5sZW5ndGgpIGJyZWFrO1xuICAgIGRzdFtpICsgb2Zmc2V0XSA9IHNyY1tpXTtcbiAgfVxuICByZXR1cm4gaTtcbn1cblxuZnVuY3Rpb24gZGVjb2RlVXRmOENoYXIoc3RyKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHIpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSgweEZGRkQgLy8gVVRGIDggaW52YWxpZCBjaGFyXG4gICAgKTtcbiAgfVxufVxuXG4vKlxuICogV2UgaGF2ZSB0byBtYWtlIHN1cmUgdGhhdCB0aGUgdmFsdWUgaXMgYSB2YWxpZCBpbnRlZ2VyLiBUaGlzIG1lYW5zIHRoYXQgaXRcbiAqIGlzIG5vbi1uZWdhdGl2ZS4gSXQgaGFzIG5vIGZyYWN0aW9uYWwgY29tcG9uZW50IGFuZCB0aGF0IGl0IGRvZXMgbm90XG4gKiBleGNlZWQgdGhlIG1heGltdW0gYWxsb3dlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gdmVyaWZ1aW50KHZhbHVlLCBtYXgpIHtcbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsICdjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyJyk7XG4gIGFzc2VydCh2YWx1ZSA+PSAwLCAnc3BlY2lmaWVkIGEgbmVnYXRpdmUgdmFsdWUgZm9yIHdyaXRpbmcgYW4gdW5zaWduZWQgdmFsdWUnKTtcbiAgYXNzZXJ0KHZhbHVlIDw9IG1heCwgJ3ZhbHVlIGlzIGxhcmdlciB0aGFuIG1heGltdW0gdmFsdWUgZm9yIHR5cGUnKTtcbiAgYXNzZXJ0KE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZSwgJ3ZhbHVlIGhhcyBhIGZyYWN0aW9uYWwgY29tcG9uZW50Jyk7XG59XG5cbmZ1bmN0aW9uIHZlcmlmc2ludCh2YWx1ZSwgbWF4LCBtaW4pIHtcbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsICdjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyJyk7XG4gIGFzc2VydCh2YWx1ZSA8PSBtYXgsICd2YWx1ZSBsYXJnZXIgdGhhbiBtYXhpbXVtIGFsbG93ZWQgdmFsdWUnKTtcbiAgYXNzZXJ0KHZhbHVlID49IG1pbiwgJ3ZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWUnKTtcbiAgYXNzZXJ0KE1hdGguZmxvb3IodmFsdWUpID09PSB2YWx1ZSwgJ3ZhbHVlIGhhcyBhIGZyYWN0aW9uYWwgY29tcG9uZW50Jyk7XG59XG5cbmZ1bmN0aW9uIHZlcmlmSUVFRTc1NCh2YWx1ZSwgbWF4LCBtaW4pIHtcbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsICdjYW5ub3Qgd3JpdGUgYSBub24tbnVtYmVyIGFzIGEgbnVtYmVyJyk7XG4gIGFzc2VydCh2YWx1ZSA8PSBtYXgsICd2YWx1ZSBsYXJnZXIgdGhhbiBtYXhpbXVtIGFsbG93ZWQgdmFsdWUnKTtcbiAgYXNzZXJ0KHZhbHVlID49IG1pbiwgJ3ZhbHVlIHNtYWxsZXIgdGhhbiBtaW5pbXVtIGFsbG93ZWQgdmFsdWUnKTtcbn1cblxuZnVuY3Rpb24gYXNzZXJ0KHRlc3QsIG1lc3NhZ2UpIHtcbiAgaWYgKCF0ZXN0KSB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCAnRmFpbGVkIGFzc2VydGlvbicpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1sdVpHVjRMbXB6SWwwc0ltNWhiV1Z6SWpwYkltSmhjMlUyTkNJc0luSmxjWFZwY21VaUxDSnBaV1ZsTnpVMElpd2laWGh3YjNKMGN5SXNJa0oxWm1abGNpSXNJbE5zYjNkQ2RXWm1aWElpTENKSlRsTlFSVU5VWDAxQldGOUNXVlJGVXlJc0luQnZiMnhUYVhwbElpd2lYM1Z6WlZSNWNHVmtRWEp5WVhseklpd2lZblZtSWl3aVFYSnlZWGxDZFdabVpYSWlMQ0poY25JaUxDSlZhVzUwT0VGeWNtRjVJaXdpWm05dklpd2ljM1ZpWVhKeVlYa2lMQ0psSWl3aWMzVmlhbVZqZENJc0ltVnVZMjlrYVc1bklpd2libTlhWlhKdklpd2lkSGx3WlNJc0luTjBjbWx1WjNSeWFXMGlMQ0pzWlc1bmRHZ2lMQ0pqYjJWeVkyVWlMQ0ppZVhSbFRHVnVaM1JvSWl3aVJYSnliM0lpTENKZllYVm5iV1Z1ZENJc0lsOXBjMEoxWm1abGNpSXNJbWtpTENKZmMyVjBJaXdpYVhOQmNuSmhlV2x6YUNJc0ltbHpRblZtWm1WeUlpd2ljbVZoWkZWSmJuUTRJaXdpZDNKcGRHVWlMQ0pwYzBWdVkyOWthVzVuSWl3aVUzUnlhVzVuSWl3aWRHOU1iM2RsY2tOaGMyVWlMQ0ppSWl3aWRXNWtaV1pwYm1Wa0lpd2ljM1J5SWl3aWNtVjBJaXdpZFhSbU9GUnZRbmwwWlhNaUxDSmlZWE5sTmpSVWIwSjVkR1Z6SWl3aVkyOXVZMkYwSWl3aWJHbHpkQ0lzSW5SdmRHRnNUR1Z1WjNSb0lpd2lZWE56WlhKMElpd2lhWE5CY25KaGVTSXNJbkJ2Y3lJc0ltbDBaVzBpTENKamIzQjVJaXdpWDJobGVGZHlhWFJsSWl3aWMzUnlhVzVuSWl3aWIyWm1jMlYwSWl3aVRuVnRZbVZ5SWl3aWNtVnRZV2x1YVc1bklpd2ljM1J5VEdWdUlpd2lZbmwwWlNJc0luQmhjbk5sU1c1MElpd2ljM1ZpYzNSeUlpd2lhWE5PWVU0aUxDSmZZMmhoY25OWGNtbDBkR1Z1SWl3aVgzVjBaamhYY21sMFpTSXNJbU5vWVhKelYzSnBkSFJsYmlJc0ltSnNhWFJDZFdabVpYSWlMQ0pmWVhOamFXbFhjbWwwWlNJc0ltRnpZMmxwVkc5Q2VYUmxjeUlzSWw5aWFXNWhjbmxYY21sMFpTSXNJbDlpWVhObE5qUlhjbWwwWlNJc0lsOTFkR1l4Tm14bFYzSnBkR1VpTENKMWRHWXhObXhsVkc5Q2VYUmxjeUlzSW5CeWIzUnZkSGx3WlNJc0ltbHpSbWx1YVhSbElpd2ljM2RoY0NJc0luUnZVM1J5YVc1bklpd2ljM1JoY25RaUxDSmxibVFpTENKelpXeG1JaXdpWDJobGVGTnNhV05sSWl3aVgzVjBaamhUYkdsalpTSXNJbDloYzJOcGFWTnNhV05sSWl3aVgySnBibUZ5ZVZOc2FXTmxJaXdpWDJKaGMyVTJORk5zYVdObElpd2lYM1YwWmpFMmJHVlRiR2xqWlNJc0luUnZTbE5QVGlJc0ltUmhkR0VpTENKQmNuSmhlU0lzSW5Oc2FXTmxJaXdpWTJGc2JDSXNJbDloY25JaUxDSjBZWEpuWlhRaUxDSjBZWEpuWlhSZmMzUmhjblFpTENKemIzVnlZMlVpTENKc1pXNGlMQ0ptY205dFFubDBaVUZ5Y21GNUlpd2ljbVZ6SWl3aWRHMXdJaXdpVFdGMGFDSXNJbTFwYmlJc0ltUmxZMjlrWlZWMFpqaERhR0Z5SWl3aVpuSnZiVU5vWVhKRGIyUmxJaXdpYjNWMElpd2lkRzlJWlhnaUxDSmllWFJsY3lJc0ltTnNZVzF3SWl3aWMyeHBZMlZNWlc0aUxDSnVaWGRDZFdZaUxDSm5aWFFpTENKamIyNXpiMnhsSWl3aWJHOW5JaXdpYzJWMElpd2lkaUlzSW5keWFYUmxWVWx1ZERnaUxDSnViMEZ6YzJWeWRDSXNJbDl5WldGa1ZVbHVkREUySWl3aWJHbDBkR3hsUlc1a2FXRnVJaXdpZG1Gc0lpd2ljbVZoWkZWSmJuUXhOa3hGSWl3aWNtVmhaRlZKYm5ReE5rSkZJaXdpWDNKbFlXUlZTVzUwTXpJaUxDSnlaV0ZrVlVsdWRETXlURVVpTENKeVpXRmtWVWx1ZERNeVFrVWlMQ0p5WldGa1NXNTBPQ0lzSW01bFp5SXNJbDl5WldGa1NXNTBNVFlpTENKeVpXRmtTVzUwTVRaTVJTSXNJbkpsWVdSSmJuUXhOa0pGSWl3aVgzSmxZV1JKYm5Rek1pSXNJbkpsWVdSSmJuUXpNa3hGSWl3aWNtVmhaRWx1ZERNeVFrVWlMQ0pmY21WaFpFWnNiMkYwSWl3aWNtVmhaQ0lzSW5KbFlXUkdiRzloZEV4Rklpd2ljbVZoWkVac2IyRjBRa1VpTENKZmNtVmhaRVJ2ZFdKc1pTSXNJbkpsWVdSRWIzVmliR1ZNUlNJc0luSmxZV1JFYjNWaWJHVkNSU0lzSW5aaGJIVmxJaXdpZG1WeWFXWjFhVzUwSWl3aVgzZHlhWFJsVlVsdWRERTJJaXdpYWlJc0luZHlhWFJsVlVsdWRERTJURVVpTENKM2NtbDBaVlZKYm5ReE5rSkZJaXdpWDNkeWFYUmxWVWx1ZERNeUlpd2lkM0pwZEdWVlNXNTBNekpNUlNJc0luZHlhWFJsVlVsdWRETXlRa1VpTENKM2NtbDBaVWx1ZERnaUxDSjJaWEpwWm5OcGJuUWlMQ0pmZDNKcGRHVkpiblF4TmlJc0luZHlhWFJsU1c1ME1UWk1SU0lzSW5keWFYUmxTVzUwTVRaQ1JTSXNJbDkzY21sMFpVbHVkRE15SWl3aWQzSnBkR1ZKYm5Rek1reEZJaXdpZDNKcGRHVkpiblF6TWtKRklpd2lYM2R5YVhSbFJteHZZWFFpTENKMlpYSnBaa2xGUlVVM05UUWlMQ0ozY21sMFpVWnNiMkYwVEVVaUxDSjNjbWwwWlVac2IyRjBRa1VpTENKZmQzSnBkR1ZFYjNWaWJHVWlMQ0ozY21sMFpVUnZkV0pzWlV4Rklpd2lkM0pwZEdWRWIzVmliR1ZDUlNJc0ltWnBiR3dpTENKamFHRnlRMjlrWlVGMElpd2lhVzV6Y0dWamRDSXNJbXB2YVc0aUxDSjBiMEZ5Y21GNVFuVm1abVZ5SWl3aVluVm1abVZ5SWl3aWRISnBiU0lzSW5KbGNHeGhZMlVpTENKQ1VDSXNJbDluWlhRaUxDSjBiMHh2WTJGc1pWTjBjbWx1WnlJc0ltbHVaR1Y0SWl3aVpHVm1ZWFZzZEZaaGJIVmxJaXdpWTJWcGJDSXNJazlpYW1WamRDSXNJbTRpTENKaWVYUmxRWEp5WVhraUxDSndkWE5vSWl3aWFDSXNJbVZ1WTI5a1pWVlNTVU52YlhCdmJtVnVkQ0lzSW5Od2JHbDBJaXdpWXlJc0ltaHBJaXdpYkc4aUxDSjBiMEo1ZEdWQmNuSmhlU0lzSW5OeVl5SXNJbVJ6ZENJc0ltUmxZMjlrWlZWU1NVTnZiWEJ2Ym1WdWRDSXNJbVZ5Y2lJc0ltMWhlQ0lzSW1ac2IyOXlJaXdpZEdWemRDSXNJbTFsYzNOaFoyVWlYU3dpYldGd2NHbHVaM01pT2lJN096czdRVUZCUVRzN096czdPenRCUVU5QkxFbEJRVWxCTEZOQlFWTkRMRkZCUVZFc1YwRkJVaXhEUVVGaU8wRkJRMEVzU1VGQlNVTXNWVUZCVlVRc1VVRkJVU3hUUVVGU0xFTkJRV1E3TzBGQlJVRkZMRkZCUVZGRExFMUJRVklzUjBGQmFVSkJMRTFCUVdwQ08wRkJRMEZFTEZGQlFWRkZMRlZCUVZJc1IwRkJjVUpFTEUxQlFYSkNPMEZCUTBGRUxGRkJRVkZITEdsQ1FVRlNMRWRCUVRSQ0xFVkJRVFZDTzBGQlEwRkdMRTlCUVU5SExGRkJRVkFzUjBGQmEwSXNTVUZCYkVJN08wRkJSVUU3T3pzN08wRkJTMEZJTEU5QlFVOUpMR1ZCUVZBc1IwRkJNRUlzV1VGQldUdEJRVU53UXp0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVFVGQlNUdEJRVU5HTEZGQlFVbERMRTFCUVUwc1NVRkJTVU1zVjBGQlNpeERRVUZuUWl4RFFVRm9RaXhEUVVGV08wRkJRMEVzVVVGQlNVTXNUVUZCVFN4SlFVRkpReXhWUVVGS0xFTkJRV1ZJTEVkQlFXWXNRMEZCVmp0QlFVTkJSU3hSUVVGSlJTeEhRVUZLTEVkQlFWVXNXVUZCV1R0QlFVRkZMR0ZCUVU4c1JVRkJVRHRCUVVGWExFdEJRVzVETzBGQlEwRXNWMEZCVHl4UFFVRlBSaXhKUVVGSlJTeEhRVUZLTEVWQlFWQXNTVUZEU0N4UFFVRlBSaXhKUVVGSlJ5eFJRVUZZTEV0QlFYZENMRlZCUkRWQ0xFTkJTa1VzUTBGTGNVTTdRVUZEZUVNc1IwRk9SQ3hEUVUxRkxFOUJRVTlETEVOQlFWQXNSVUZCVlR0QlFVTldMRmRCUVU4c1MwRkJVRHRCUVVORU8wRkJRMFk3TzBGQlJVUTdPenM3T3pzN096czdPenRCUVdwQ2VVSXNSVUZCZWtJc1EwRTJRa0VzVTBGQlUxZ3NUVUZCVkN4RFFVRnBRbGtzVDBGQmFrSXNSVUZCTUVKRExGRkJRVEZDTEVWQlFXOURReXhOUVVGd1F5eEZRVUUwUXp0QlFVTXhReXhOUVVGSkxFVkJRVVVzWjBKQlFXZENaQ3hOUVVGc1FpeERRVUZLTEVWQlEwVXNUMEZCVHl4SlFVRkpRU3hOUVVGS0xFTkJRVmRaTEU5QlFWZ3NSVUZCYjBKRExGRkJRWEJDTEVWQlFUaENReXhOUVVFNVFpeERRVUZRT3p0QlFVVkdMRTFCUVVsRExHTkJRV05JTEU5QlFXUXNlVU5CUVdOQkxFOUJRV1FzUTBGQlNqczdRVUZGUVR0QlFVTkJPMEZCUTBFc1RVRkJTVU1zWVVGQllTeFJRVUZpTEVsQlFYbENSU3hUUVVGVExGRkJRWFJETEVWQlFXZEVPMEZCUXpsRFNDeGpRVUZWU1N4WFFVRlhTaXhQUVVGWUxFTkJRVlk3UVVGRFFTeFhRVUZQUVN4UlFVRlJTeXhOUVVGU0xFZEJRV2xDTEVOQlFXcENMRXRCUVhWQ0xFTkJRVGxDTEVWQlFXbERPMEZCUXk5Q1RDeG5Ra0ZCVlVFc1ZVRkJWU3hIUVVGd1FqdEJRVU5FTzBGQlEwWTdPMEZCUlVRN1FVRkRRU3hOUVVGSlN5eE5RVUZLTzBGQlEwRXNUVUZCU1VZc1UwRkJVeXhSUVVGaUxFVkJRMFZGTEZOQlFWTkRMRTlCUVU5T0xFOUJRVkFzUTBGQlZDeERRVVJHTEV0QlJVc3NTVUZCU1Vjc1UwRkJVeXhSUVVGaUxFVkJRMGhGTEZOQlFWTnFRaXhQUVVGUGJVSXNWVUZCVUN4RFFVRnJRbEFzVDBGQmJFSXNSVUZCTWtKRExGRkJRVE5DTEVOQlFWUXNRMEZFUnl4TFFVVkJMRWxCUVVsRkxGTkJRVk1zVVVGQllpeEZRVU5JUlN4VFFVRlRReXhQUVVGUFRpeFJRVUZSU3l4TlFVRm1MRU5CUVhWQ08wRkJRWFpDTEVkQlFWUXNRMEZFUnl4TFFVZElMRTFCUVUwc1NVRkJTVWNzUzBGQlNpeERRVUZWTEhWRVFVRldMRU5CUVU0N08wRkJSVVlzVFVGQlNXWXNSMEZCU2p0QlFVTkJMRTFCUVVsTUxFOUJRVTlKTEdWQlFWZ3NSVUZCTkVJN1FVRkRNVUk3UVVGRFFVTXNWVUZCVFV3c1QwRkJUM0ZDTEZGQlFWQXNRMEZCWjBJc1NVRkJTV0lzVlVGQlNpeERRVUZsVXl4TlFVRm1MRU5CUVdoQ0xFTkJRVTQ3UVVGRFJDeEhRVWhFTEUxQlIwODdRVUZEVER0QlFVTkJXaXhWUVVGTkxFbEJRVTQ3UVVGRFFVRXNVVUZCU1Zrc1RVRkJTaXhIUVVGaFFTeE5RVUZpTzBGQlEwRmFMRkZCUVVscFFpeFRRVUZLTEVkQlFXZENMRWxCUVdoQ08wRkJRMFE3TzBGQlJVUXNUVUZCU1VNc1EwRkJTanRCUVVOQkxFMUJRVWwyUWl4UFFVRlBTU3hsUVVGUUxFbEJRVEJDTEU5QlFVOVJMRkZCUVZGUExGVkJRV1lzUzBGQk9FSXNVVUZCTlVRc1JVRkJjMFU3UVVGRGNFVTdRVUZEUVdRc1VVRkJTVzFDTEVsQlFVb3NRMEZCVTFvc1QwRkJWRHRCUVVORUxFZEJTRVFzVFVGSFR5eEpRVUZKWVN4WFFVRlhZaXhQUVVGWUxFTkJRVW9zUlVGQmVVSTdRVUZET1VJN1FVRkRRU3hUUVVGTFZ5eEpRVUZKTEVOQlFWUXNSVUZCV1VFc1NVRkJTVTRzVFVGQmFFSXNSVUZCZDBKTkxFZEJRWGhDTEVWQlFUWkNPMEZCUXpOQ0xGVkJRVWwyUWl4UFFVRlBNRUlzVVVGQlVDeERRVUZuUW1Rc1QwRkJhRUlzUTBGQlNpeEZRVU5GVUN4SlFVRkphMElzUTBGQlNpeEpRVUZUV0N4UlFVRlJaU3hUUVVGU0xFTkJRV3RDU2l4RFFVRnNRaXhEUVVGVUxFTkJSRVlzUzBGSFJXeENMRWxCUVVsclFpeERRVUZLTEVsQlFWTllMRkZCUVZGWExFTkJRVklzUTBGQlZEdEJRVU5JTzBGQlEwWXNSMEZTVFN4TlFWRkJMRWxCUVVsU0xGTkJRVk1zVVVGQllpeEZRVUYxUWp0QlFVTTFRbFlzVVVGQlNYVkNMRXRCUVVvc1EwRkJWV2hDTEU5QlFWWXNSVUZCYlVJc1EwRkJia0lzUlVGQmMwSkRMRkZCUVhSQ08wRkJRMFFzUjBGR1RTeE5RVVZCTEVsQlFVbEZMRk5CUVZNc1VVRkJWQ3hKUVVGeFFpeERRVUZEWml4UFFVRlBTU3hsUVVFM1FpeEpRVUZuUkN4RFFVRkRWU3hOUVVGeVJDeEZRVUUyUkR0QlFVTnNSU3hUUVVGTFV5eEpRVUZKTEVOQlFWUXNSVUZCV1VFc1NVRkJTVTRzVFVGQmFFSXNSVUZCZDBKTkxFZEJRWGhDTEVWQlFUWkNPMEZCUXpOQ2JFSXNWVUZCU1d0Q0xFTkJRVW9zU1VGQlV5eERRVUZVTzBGQlEwUTdRVUZEUmpzN1FVRkZSQ3hUUVVGUGJFSXNSMEZCVUR0QlFVTkVPenRCUVVWRU8wRkJRMEU3TzBGQlJVRk1MRTlCUVU4MlFpeFZRVUZRTEVkQlFXOUNMRlZCUVZWb1FpeFJRVUZXTEVWQlFXOUNPMEZCUTNSRExGVkJRVkZwUWl4UFFVRlBha0lzVVVGQlVDeEZRVUZwUW10Q0xGZEJRV3BDTEVWQlFWSTdRVUZEUlN4VFFVRkxMRXRCUVV3N1FVRkRRU3hUUVVGTExFMUJRVXc3UVVGRFFTeFRRVUZMTEU5QlFVdzdRVUZEUVN4VFFVRkxMRTlCUVV3N1FVRkRRU3hUUVVGTExGRkJRVXc3UVVGRFFTeFRRVUZMTEZGQlFVdzdRVUZEUVN4VFFVRkxMRXRCUVV3N1FVRkRRU3hUUVVGTExFMUJRVXc3UVVGRFFTeFRRVUZMTEU5QlFVdzdRVUZEUVN4VFFVRkxMRk5CUVV3N1FVRkRRU3hUUVVGTExGVkJRVXc3UVVGRFJTeGhRVUZQTEVsQlFWQTdRVUZEUmp0QlFVTkZMR0ZCUVU4c1MwRkJVRHRCUVdSS08wRkJaMEpFTEVOQmFrSkVPenRCUVcxQ1FTOUNMRTlCUVU4d1FpeFJRVUZRTEVkQlFXdENMRlZCUVZWTkxFTkJRVllzUlVGQllUdEJRVU0zUWl4VFFVRlBMRU5CUVVNc1JVRkJSVUVzVFVGQlRTeEpRVUZPTEVsQlFXTkJMRTFCUVUxRExGTkJRWEJDTEVsQlFXbERSQ3hGUVVGRlZpeFRRVUZ5UXl4RFFVRlNPMEZCUTBRc1EwRkdSRHM3UVVGSlFYUkNMRTlCUVU5dFFpeFZRVUZRTEVkQlFXOUNMRlZCUVZWbExFZEJRVllzUlVGQlpYSkNMRkZCUVdZc1JVRkJlVUk3UVVGRE0wTXNUVUZCU1hOQ0xFZEJRVW83UVVGRFFVUXNVVUZCVFVFc1RVRkJUU3hGUVVGYU8wRkJRMEVzVlVGQlVYSkNMRmxCUVZrc1RVRkJjRUk3UVVGRFJTeFRRVUZMTEV0QlFVdzdRVUZEUlhOQ0xGbEJRVTFFTEVsQlFVbHFRaXhOUVVGS0xFZEJRV0VzUTBGQmJrSTdRVUZEUVR0QlFVTkdMRk5CUVVzc1RVRkJURHRCUVVOQkxGTkJRVXNzVDBGQlREdEJRVU5GYTBJc1dVRkJUVU1zV1VGQldVWXNSMEZCV2l4RlFVRnBRbXBDTEUxQlFYWkNPMEZCUTBFN1FVRkRSaXhUUVVGTExFOUJRVXc3UVVGRFFTeFRRVUZMTEZGQlFVdzdRVUZEUVN4VFFVRkxMRXRCUVV3N1FVRkRSV3RDTEZsQlFVMUVMRWxCUVVscVFpeE5RVUZXTzBGQlEwRTdRVUZEUml4VFFVRkxMRkZCUVV3N1FVRkRSV3RDTEZsQlFVMUZMR05CUVdOSUxFZEJRV1FzUlVGQmJVSnFRaXhOUVVGNlFqdEJRVU5CTzBGQlEwWXNVMEZCU3l4TlFVRk1PMEZCUTBFc1UwRkJTeXhQUVVGTU8wRkJRMEVzVTBGQlN5eFRRVUZNTzBGQlEwRXNVMEZCU3l4VlFVRk1PMEZCUTBWclFpeFpRVUZOUkN4SlFVRkpha0lzVFVGQlNpeEhRVUZoTEVOQlFXNUNPMEZCUTBFN1FVRkRSanRCUVVORkxGbEJRVTBzU1VGQlNVY3NTMEZCU2l4RFFVRlZMR3RDUVVGV0xFTkJRVTQ3UVVGMlFrbzdRVUY1UWtFc1UwRkJUMlVzUjBGQlVEdEJRVU5FTEVOQk4wSkVPenRCUVN0Q1FXNURMRTlCUVU5elF5eE5RVUZRTEVkQlFXZENMRlZCUVZWRExFbEJRVllzUlVGQlowSkRMRmRCUVdoQ0xFVkJRVFpDTzBGQlF6TkRReXhUUVVGUFF5eFJRVUZSU0N4SlFVRlNMRU5CUVZBc1JVRkJjMElzWjBSQlEyeENMREJDUVVSS096dEJRVWRCTEUxQlFVbEJMRXRCUVV0MFFpeE5RVUZNTEV0QlFXZENMRU5CUVhCQ0xFVkJRWFZDTzBGQlEzSkNMRmRCUVU4c1NVRkJTV3BDTEUxQlFVb3NRMEZCVnl4RFFVRllMRU5CUVZBN1FVRkRSQ3hIUVVaRUxFMUJSVThzU1VGQlNYVkRMRXRCUVV0MFFpeE5RVUZNTEV0QlFXZENMRU5CUVhCQ0xFVkJRWFZDTzBGQlF6VkNMRmRCUVU5elFpeExRVUZMTEVOQlFVd3NRMEZCVUR0QlFVTkVPenRCUVVWRUxFMUJRVWxvUWl4RFFVRktPMEZCUTBFc1RVRkJTU3hQUVVGUGFVSXNWMEZCVUN4TFFVRjFRaXhSUVVFelFpeEZRVUZ4UXp0QlFVTnVRMEVzYTBKQlFXTXNRMEZCWkR0QlFVTkJMRk5CUVV0cVFpeEpRVUZKTEVOQlFWUXNSVUZCV1VFc1NVRkJTV2RDTEV0QlFVdDBRaXhOUVVGeVFpeEZRVUUyUWswc1IwRkJOMElzUlVGQmEwTTdRVUZEYUVOcFFpeHhRa0ZCWlVRc1MwRkJTMmhDTEVOQlFVd3NSVUZCVVU0c1RVRkJka0k3UVVGRFJEdEJRVU5HT3p0QlFVVkVMRTFCUVVsYUxFMUJRVTBzU1VGQlNVd3NUVUZCU2l4RFFVRlhkME1zVjBGQldDeERRVUZXTzBGQlEwRXNUVUZCU1Vjc1RVRkJUU3hEUVVGV08wRkJRMEVzVDBGQlMzQkNMRWxCUVVrc1EwRkJWQ3hGUVVGWlFTeEpRVUZKWjBJc1MwRkJTM1JDTEUxQlFYSkNMRVZCUVRaQ1RTeEhRVUUzUWl4RlFVRnJRenRCUVVOb1F5eFJRVUZKY1VJc1QwRkJUMHdzUzBGQlMyaENMRU5CUVV3c1EwRkJXRHRCUVVOQmNVSXNVMEZCUzBNc1NVRkJUQ3hEUVVGVmVFTXNSMEZCVml4RlFVRmxjME1zUjBGQlpqdEJRVU5CUVN4WFFVRlBReXhMUVVGTE0wSXNUVUZCV2p0QlFVTkVPMEZCUTBRc1UwRkJUMW9zUjBGQlVEdEJRVU5FTEVOQk1VSkVPenRCUVRSQ1FUdEJRVU5CT3p0QlFVVkJMRk5CUVZONVF5eFRRVUZVTEVOQlFXOUNla01zUjBGQmNFSXNSVUZCZVVJd1F5eE5RVUY2UWl4RlFVRnBRME1zVFVGQmFrTXNSVUZCZVVNdlFpeE5RVUY2UXl4RlFVRnBSRHRCUVVNdlF5dENMRmRCUVZORExFOUJRVTlFTEUxQlFWQXNTMEZCYTBJc1EwRkJNMEk3UVVGRFFTeE5RVUZKUlN4WlFVRlpOME1zU1VGQlNWa3NUVUZCU2l4SFFVRmhLMElzVFVGQk4wSTdRVUZEUVN4TlFVRkpMRU5CUVVNdlFpeE5RVUZNTEVWQlFXRTdRVUZEV0VFc1lVRkJVMmxETEZOQlFWUTdRVUZEUkN4SFFVWkVMRTFCUlU4N1FVRkRUR3BETEdGQlFWTm5ReXhQUVVGUGFFTXNUVUZCVUN4RFFVRlVPMEZCUTBFc1VVRkJTVUVzVTBGQlUybERMRk5CUVdJc1JVRkJkMEk3UVVGRGRFSnFReXhsUVVGVGFVTXNVMEZCVkR0QlFVTkVPMEZCUTBZN08wRkJSVVE3UVVGRFFTeE5RVUZKUXl4VFFVRlRTaXhQUVVGUE9VSXNUVUZCY0VJN1FVRkRRWGRDTEZOQlFVOVZMRk5CUVZNc1EwRkJWQ3hMUVVGbExFTkJRWFJDTEVWQlFYbENMRzlDUVVGNlFqczdRVUZGUVN4TlFVRkpiRU1zVTBGQlUydERMRk5CUVZNc1EwRkJkRUlzUlVGQmVVSTdRVUZEZGtKc1F5eGhRVUZUYTBNc1UwRkJVeXhEUVVGc1FqdEJRVU5FTzBGQlEwUXNUMEZCU3l4SlFVRkpOVUlzU1VGQlNTeERRVUZpTEVWQlFXZENRU3hKUVVGSlRpeE5RVUZ3UWl4RlFVRTBRazBzUjBGQk5VSXNSVUZCYVVNN1FVRkRMMElzVVVGQlNUWkNMRTlCUVU5RExGTkJRVk5PTEU5QlFVOVBMRTFCUVZBc1EwRkJZeTlDTEVsQlFVa3NRMEZCYkVJc1JVRkJjVUlzUTBGQmNrSXNRMEZCVkN4RlFVRnJReXhGUVVGc1F5eERRVUZZTzBGQlEwRnJRaXhYUVVGUExFTkJRVU5qTEUxQlFVMUlMRWxCUVU0c1EwRkJVaXhGUVVGeFFpeHZRa0ZCY2tJN1FVRkRRUzlETEZGQlFVa3lReXhUUVVGVGVrSXNRMEZCWWl4SlFVRnJRalpDTEVsQlFXeENPMEZCUTBRN1FVRkRSSEJFTEZOQlFVOTNSQ3hoUVVGUUxFZEJRWFZDYWtNc1NVRkJTU3hEUVVFelFqdEJRVU5CTEZOQlFVOUJMRU5CUVZBN1FVRkRSRHM3UVVGRlJDeFRRVUZUYTBNc1ZVRkJWQ3hEUVVGeFFuQkVMRWRCUVhKQ0xFVkJRVEJDTUVNc1RVRkJNVUlzUlVGQmEwTkRMRTFCUVd4RExFVkJRVEJETDBJc1RVRkJNVU1zUlVGQmEwUTdRVUZEYUVRc1RVRkJTWGxETEdWQlFXVXhSQ3hQUVVGUGQwUXNZVUZCVUN4SFFVTnFRa2NzVjBGQlYzWkNMRmxCUVZsWExFMUJRVm9zUTBGQldDeEZRVUZuUXpGRExFZEJRV2hETEVWQlFYRkRNa01zVFVGQmNrTXNSVUZCTmtNdlFpeE5RVUUzUXl4RFFVUkdPMEZCUlVFc1UwRkJUM2xETEZsQlFWQTdRVUZEUkRzN1FVRkZSQ3hUUVVGVFJTeFhRVUZVTEVOQlFYTkNka1FzUjBGQmRFSXNSVUZCTWtJd1F5eE5RVUV6UWl4RlFVRnRRME1zVFVGQmJrTXNSVUZCTWtNdlFpeE5RVUV6UXl4RlFVRnRSRHRCUVVOcVJDeE5RVUZKZVVNc1pVRkJaVEZFTEU5QlFVOTNSQ3hoUVVGUUxFZEJRMnBDUnl4WFFVRlhSU3hoUVVGaFpDeE5RVUZpTEVOQlFWZ3NSVUZCYVVNeFF5eEhRVUZxUXl4RlFVRnpRekpETEUxQlFYUkRMRVZCUVRoREwwSXNUVUZCT1VNc1EwRkVSanRCUVVWQkxGTkJRVTk1UXl4WlFVRlFPMEZCUTBRN08wRkJSVVFzVTBGQlUwa3NXVUZCVkN4RFFVRjFRbnBFTEVkQlFYWkNMRVZCUVRSQ01FTXNUVUZCTlVJc1JVRkJiME5ETEUxQlFYQkRMRVZCUVRSREwwSXNUVUZCTlVNc1JVRkJiMFE3UVVGRGJFUXNVMEZCVHpKRExGbEJRVmwyUkN4SFFVRmFMRVZCUVdsQ01FTXNUVUZCYWtJc1JVRkJlVUpETEUxQlFYcENMRVZCUVdsREwwSXNUVUZCYWtNc1EwRkJVRHRCUVVORU96dEJRVVZFTEZOQlFWTTRReXhaUVVGVUxFTkJRWFZDTVVRc1IwRkJka0lzUlVGQk5FSXdReXhOUVVFMVFpeEZRVUZ2UTBNc1RVRkJjRU1zUlVGQk5FTXZRaXhOUVVFMVF5eEZRVUZ2UkR0QlFVTnNSQ3hOUVVGSmVVTXNaVUZCWlRGRUxFOUJRVTkzUkN4aFFVRlFMRWRCUTJwQ1J5eFhRVUZYZEVJc1kwRkJZMVVzVFVGQlpDeERRVUZZTEVWQlFXdERNVU1zUjBGQmJFTXNSVUZCZFVNeVF5eE5RVUYyUXl4RlFVRXJReTlDTEUxQlFTOURMRU5CUkVZN1FVRkZRU3hUUVVGUGVVTXNXVUZCVUR0QlFVTkVPenRCUVVWRUxGTkJRVk5OTEdGQlFWUXNRMEZCZDBJelJDeEhRVUY0UWl4RlFVRTJRakJETEUxQlFUZENMRVZCUVhGRFF5eE5RVUZ5UXl4RlFVRTJReTlDTEUxQlFUZERMRVZCUVhGRU8wRkJRMjVFTEUxQlFVbDVReXhsUVVGbE1VUXNUMEZCVDNkRUxHRkJRVkFzUjBGRGFrSkhMRmRCUVZkTkxHVkJRV1ZzUWl4TlFVRm1MRU5CUVZnc1JVRkJiVU14UXl4SFFVRnVReXhGUVVGM1F6SkRMRTFCUVhoRExFVkJRV2RFTDBJc1RVRkJhRVFzUTBGRVJqdEJRVVZCTEZOQlFVOTVReXhaUVVGUU8wRkJRMFE3TzBGQlJVUXhSQ3hQUVVGUGEwVXNVMEZCVUN4RFFVRnBRblJETEV0QlFXcENMRWRCUVhsQ0xGVkJRVlZ0UWl4TlFVRldMRVZCUVd0Q1F5eE5RVUZzUWl4RlFVRXdRaTlDTEUxQlFURkNMRVZCUVd0RFNpeFJRVUZzUXl4RlFVRTBRenRCUVVOdVJUdEJRVU5CTzBGQlEwRXNUVUZCU1hORUxGTkJRVk51UWl4TlFVRlVMRU5CUVVvc1JVRkJjMEk3UVVGRGNFSXNVVUZCU1N4RFFVRkRiVUlzVTBGQlUyeEVMRTFCUVZRc1EwRkJUQ3hGUVVGMVFqdEJRVU55UWtvc2FVSkJRVmRKTEUxQlFWZzdRVUZEUVVFc1pVRkJVMmRDTEZOQlFWUTdRVUZEUkR0QlFVTkdMRWRCVEVRc1RVRkxUenRCUVVGSE8wRkJRMUlzVVVGQlNXMURMRTlCUVU5MlJDeFJRVUZZTzBGQlEwRkJMR1ZCUVZkdFF5eE5RVUZZTzBGQlEwRkJMR0ZCUVZNdlFpeE5RVUZVTzBGQlEwRkJMR0ZCUVZOdFJDeEpRVUZVTzBGQlEwUTdPMEZCUlVSd1FpeFhRVUZUUXl4UFFVRlBSQ3hOUVVGUUxFdEJRV3RDTEVOQlFUTkNPMEZCUTBFc1RVRkJTVVVzV1VGQldTeExRVUZMYWtNc1RVRkJUQ3hIUVVGakswSXNUVUZCT1VJN1FVRkRRU3hOUVVGSkxFTkJRVU12UWl4TlFVRk1MRVZCUVdFN1FVRkRXRUVzWVVGQlUybERMRk5CUVZRN1FVRkRSQ3hIUVVaRUxFMUJSVTg3UVVGRFRHcERMR0ZCUVZOblF5eFBRVUZQYUVNc1RVRkJVQ3hEUVVGVU8wRkJRMEVzVVVGQlNVRXNVMEZCVTJsRExGTkJRV0lzUlVGQmQwSTdRVUZEZEVKcVF5eGxRVUZUYVVNc1UwRkJWRHRCUVVORU8wRkJRMFk3UVVGRFJISkRMR0ZCUVZkcFFpeFBRVUZQYWtJc1dVRkJXU3hOUVVGdVFpeEZRVUV5UW10Q0xGZEJRVE5DTEVWQlFWZzdPMEZCUlVFc1RVRkJTVWtzUjBGQlNqdEJRVU5CTEZWQlFWRjBRaXhSUVVGU08wRkJRMFVzVTBGQlN5eExRVUZNTzBGQlEwVnpRaXhaUVVGTlZ5eFZRVUZWTEVsQlFWWXNSVUZCWjBKRExFMUJRV2hDTEVWQlFYZENReXhOUVVGNFFpeEZRVUZuUXk5Q0xFMUJRV2hETEVOQlFVNDdRVUZEUVR0QlFVTkdMRk5CUVVzc1RVRkJURHRCUVVOQkxGTkJRVXNzVDBGQlREdEJRVU5GYTBJc1dVRkJUWE5DTEZkQlFWY3NTVUZCV0N4RlFVRnBRbFlzVFVGQmFrSXNSVUZCZVVKRExFMUJRWHBDTEVWQlFXbERMMElzVFVGQmFrTXNRMEZCVGp0QlFVTkJPMEZCUTBZc1UwRkJTeXhQUVVGTU8wRkJRMFZyUWl4WlFVRk5lVUlzV1VGQldTeEpRVUZhTEVWQlFXdENZaXhOUVVGc1FpeEZRVUV3UWtNc1RVRkJNVUlzUlVGQmEwTXZRaXhOUVVGc1F5eERRVUZPTzBGQlEwRTdRVUZEUml4VFFVRkxMRkZCUVV3N1FVRkRSV3RDTEZsQlFVMHlRaXhoUVVGaExFbEJRV0lzUlVGQmJVSm1MRTFCUVc1Q0xFVkJRVEpDUXl4TlFVRXpRaXhGUVVGdFF5OUNMRTFCUVc1RExFTkJRVTQ3UVVGRFFUdEJRVU5HTEZOQlFVc3NVVUZCVER0QlFVTkZhMElzV1VGQlRUUkNMR0ZCUVdFc1NVRkJZaXhGUVVGdFFtaENMRTFCUVc1Q0xFVkJRVEpDUXl4TlFVRXpRaXhGUVVGdFF5OUNMRTFCUVc1RExFTkJRVTQ3UVVGRFFUdEJRVU5HTEZOQlFVc3NUVUZCVER0QlFVTkJMRk5CUVVzc1QwRkJURHRCUVVOQkxGTkJRVXNzVTBGQlREdEJRVU5CTEZOQlFVc3NWVUZCVER0QlFVTkZhMElzV1VGQlRUWkNMR05CUVdNc1NVRkJaQ3hGUVVGdlFtcENMRTFCUVhCQ0xFVkJRVFJDUXl4TlFVRTFRaXhGUVVGdlF5OUNMRTFCUVhCRExFTkJRVTQ3UVVGRFFUdEJRVU5HTzBGQlEwVXNXVUZCVFN4SlFVRkpSeXhMUVVGS0xFTkJRVlVzYTBKQlFWWXNRMEZCVGp0QlFYaENTanRCUVRCQ1FTeFRRVUZQWlN4SFFVRlFPMEZCUTBRc1EwRjJSRVE3TzBGQmVVUkJia01zVDBGQlQydEZMRk5CUVZBc1EwRkJhVUpITEZGQlFXcENMRWRCUVRSQ0xGVkJRVlY0UkN4UlFVRldMRVZCUVc5Q2VVUXNTMEZCY0VJc1JVRkJNa0pETEVkQlFUTkNMRVZCUVdkRE8wRkJRekZFTEUxQlFVbERMRTlCUVU4c1NVRkJXRHM3UVVGRlFUTkVMR0ZCUVZkcFFpeFBRVUZQYWtJc1dVRkJXU3hOUVVGdVFpeEZRVUV5UW10Q0xGZEJRVE5DTEVWQlFWZzdRVUZEUVhWRExGVkJRVkZ5UWl4UFFVRlBjVUlzUzBGQlVDeExRVUZwUWl4RFFVRjZRanRCUVVOQlF5eFJRVUZQUVN4UlFVRlJkRU1zVTBGQlZDeEhRVU5HWjBJc1QwRkJUM05DTEVkQlFWQXNRMEZFUlN4SFFVVkdRU3hOUVVGTlF5eExRVUZMZGtRc1RVRkdaanM3UVVGSlFUdEJRVU5CTEUxQlFVbHpSQ3hSUVVGUlJDeExRVUZhTEVWQlEwVXNUMEZCVHl4RlFVRlFPenRCUVVWR0xFMUJRVWx1UXl4SFFVRktPMEZCUTBFc1ZVRkJVWFJDTEZGQlFWSTdRVUZEUlN4VFFVRkxMRXRCUVV3N1FVRkRSWE5DTEZsQlFVMXpReXhWUVVGVlJDeEpRVUZXTEVWQlFXZENSaXhMUVVGb1FpeEZRVUYxUWtNc1IwRkJka0lzUTBGQlRqdEJRVU5CTzBGQlEwWXNVMEZCU3l4TlFVRk1PMEZCUTBFc1UwRkJTeXhQUVVGTU8wRkJRMFZ3UXl4WlFVRk5kVU1zVjBGQlYwWXNTVUZCV0N4RlFVRnBRa1lzUzBGQmFrSXNSVUZCZDBKRExFZEJRWGhDTEVOQlFVNDdRVUZEUVR0QlFVTkdMRk5CUVVzc1QwRkJURHRCUVVORmNFTXNXVUZCVFhkRExGbEJRVmxJTEVsQlFWb3NSVUZCYTBKR0xFdEJRV3hDTEVWQlFYbENReXhIUVVGNlFpeERRVUZPTzBGQlEwRTdRVUZEUml4VFFVRkxMRkZCUVV3N1FVRkRSWEJETEZsQlFVMTVReXhoUVVGaFNpeEpRVUZpTEVWQlFXMUNSaXhMUVVGdVFpeEZRVUV3UWtNc1IwRkJNVUlzUTBGQlRqdEJRVU5CTzBGQlEwWXNVMEZCU3l4UlFVRk1PMEZCUTBWd1F5eFpRVUZOTUVNc1lVRkJZVXdzU1VGQllpeEZRVUZ0UWtZc1MwRkJia0lzUlVGQk1FSkRMRWRCUVRGQ0xFTkJRVTQ3UVVGRFFUdEJRVU5HTEZOQlFVc3NUVUZCVER0QlFVTkJMRk5CUVVzc1QwRkJURHRCUVVOQkxGTkJRVXNzVTBGQlREdEJRVU5CTEZOQlFVc3NWVUZCVER0QlFVTkZjRU1zV1VGQlRUSkRMR05CUVdOT0xFbEJRV1FzUlVGQmIwSkdMRXRCUVhCQ0xFVkJRVEpDUXl4SFFVRXpRaXhEUVVGT08wRkJRMEU3UVVGRFJqdEJRVU5GTEZsQlFVMHNTVUZCU1c1RUxFdEJRVW9zUTBGQlZTeHJRa0ZCVml4RFFVRk9PMEZCZUVKS08wRkJNRUpCTEZOQlFVOWxMRWRCUVZBN1FVRkRSQ3hEUVhwRFJEczdRVUV5UTBGdVF5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFtRXNUVUZCYWtJc1IwRkJNRUlzV1VGQldUdEJRVU53UXl4VFFVRlBPMEZCUTB4b1JTeFZRVUZOTEZGQlJFUTdRVUZGVEdsRkxGVkJRVTFETEUxQlFVMW1MRk5CUVU0c1EwRkJaMEpuUWl4TFFVRm9RaXhEUVVGelFrTXNTVUZCZEVJc1EwRkJNa0lzUzBGQlMwTXNTVUZCVEN4SlFVRmhMRWxCUVhoRExFVkJRVGhETEVOQlFUbERPMEZCUmtRc1IwRkJVRHRCUVVsRUxFTkJURVE3TzBGQlQwRTdRVUZEUVhCR0xFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ2NrSXNTVUZCYWtJc1IwRkJkMElzVlVGQlZYZERMRTFCUVZZc1JVRkJhMEpETEZsQlFXeENMRVZCUVdkRGFFSXNTMEZCYUVNc1JVRkJkVU5ETEVkQlFYWkRMRVZCUVRSRE8wRkJRMnhGTEUxQlFVbG5RaXhUUVVGVExFbEJRV0k3TzBGQlJVRXNUVUZCU1N4RFFVRkRha0lzUzBGQlRDeEZRVUZaUVN4UlFVRlJMRU5CUVZJN1FVRkRXaXhOUVVGSkxFTkJRVU5ETEVkQlFVUXNTVUZCVVVFc1VVRkJVU3hEUVVGd1FpeEZRVUYxUWtFc1RVRkJUU3hMUVVGTGRFUXNUVUZCV0R0QlFVTjJRaXhOUVVGSkxFTkJRVU54UlN4WlFVRk1MRVZCUVcxQ1FTeGxRVUZsTEVOQlFXWTdPMEZCUlc1Q08wRkJRMEVzVFVGQlNXWXNVVUZCVVVRc1MwRkJXaXhGUVVGdFFqdEJRVU51UWl4TlFVRkpaU3hQUVVGUGNFVXNUVUZCVUN4TFFVRnJRaXhEUVVGc1FpeEpRVUYxUW5ORkxFOUJRVTkwUlN4TlFVRlFMRXRCUVd0Q0xFTkJRVGRETEVWQlFXZEVPenRCUVVWb1JEdEJRVU5CZDBJc1UwRkJUemhDTEU5QlFVOUVMRXRCUVdRc1JVRkJjVUlzZVVKQlFYSkNPMEZCUTBFM1FpeFRRVUZQTmtNc1owSkJRV2RDTEVOQlFXaENMRWxCUVhGQ1FTeGxRVUZsUkN4UFFVRlBjRVVzVFVGQmJFUXNSVUZEU1N3eVFrRkVTanRCUVVWQmQwSXNVMEZCVHpaQ0xGTkJRVk1zUTBGQlZDeEpRVUZqUVN4UlFVRlJhVUlzVDBGQlQzUkZMRTFCUVhCRExFVkJRVFJETERKQ1FVRTFRenRCUVVOQmQwSXNVMEZCVHpoQ0xFOUJRVThzUTBGQlVDeEpRVUZaUVN4UFFVRlBaMElzVDBGQlQzUkZMRTFCUVdwRExFVkJRWGxET3p0QlFVVjZRenRCUVVaQkxFbEJSMEVzU1VGQlNYTkVMRTFCUVUwc1MwRkJTM1JFTEUxQlFXWXNSVUZEUlhORUxFMUJRVTBzUzBGQlMzUkVMRTFCUVZnN1FVRkRSaXhOUVVGSmIwVXNUMEZCVDNCRkxFMUJRVkFzUjBGQlowSnhSU3haUVVGb1FpeEhRVUVyUW1Zc1RVRkJUVVFzUzBGQmVrTXNSVUZEUlVNc1RVRkJUV01zVDBGQlQzQkZMRTFCUVZBc1IwRkJaMEp4UlN4WlFVRm9RaXhIUVVFclFtaENMRXRCUVhKRE96dEJRVVZHTEUxQlFVbHJRaXhOUVVGTmFrSXNUVUZCVFVRc1MwRkJhRUk3TzBGQlJVRXNUVUZCU1d0Q0xFMUJRVTBzUjBGQlRpeEpRVUZoTEVOQlFVTjRSaXhQUVVGUFNTeGxRVUY2UWl4RlFVRXdRenRCUVVONFF5eFRRVUZMTEVsQlFVbHRRaXhKUVVGSkxFTkJRV0lzUlVGQlowSkJMRWxCUVVscFJTeEhRVUZ3UWl4RlFVRjVRbXBGTEVkQlFYcENPMEZCUTBVNFJDeGhRVUZQT1VRc1NVRkJTU3RFTEZsQlFWZ3NTVUZCTWtJc1MwRkJTeTlFTEVsQlFVa3JReXhMUVVGVUxFTkJRVE5DTzBGQlJFWTdRVUZGUkN4SFFVaEVMRTFCUjA4N1FVRkRUR1VzVjBGQlR6ZEVMRWxCUVZBc1EwRkJXU3hMUVVGTFpDeFJRVUZNTEVOQlFXTTBSQ3hMUVVGa0xFVkJRWEZDUVN4UlFVRlJhMElzUjBGQk4wSXNRMEZCV2l4RlFVRXJRMFlzV1VGQkwwTTdRVUZEUkR0QlFVTkdMRU5CYUVORU96dEJRV3REUVN4VFFVRlRWQ3haUVVGVUxFTkJRWFZDZUVVc1IwRkJka0lzUlVGQk5FSnBSU3hMUVVFMVFpeEZRVUZ0UTBNc1IwRkJia01zUlVGQmQwTTdRVUZEZEVNc1RVRkJTVVFzVlVGQlZTeERRVUZXTEVsQlFXVkRMRkZCUVZGc1JTeEpRVUZKV1N4TlFVRXZRaXhGUVVGMVF6dEJRVU55UXl4WFFVRlBja0lzVDBGQlR6WkdMR0ZCUVZBc1EwRkJjVUp3Uml4SFFVRnlRaXhEUVVGUU8wRkJRMFFzUjBGR1JDeE5RVVZQTzBGQlEwd3NWMEZCVDFRc1QwRkJUelpHTEdGQlFWQXNRMEZCY1VKd1JpeEpRVUZKTmtVc1MwRkJTaXhEUVVGVldpeExRVUZXTEVWQlFXbENReXhIUVVGcVFpeERRVUZ5UWl4RFFVRlFPMEZCUTBRN1FVRkRSanM3UVVGRlJDeFRRVUZUUnl4VlFVRlVMRU5CUVhGQ2NrVXNSMEZCY2tJc1JVRkJNRUpwUlN4TFFVRXhRaXhGUVVGcFEwTXNSMEZCYWtNc1JVRkJjME03UVVGRGNFTXNUVUZCU1cxQ0xFMUJRVTBzUlVGQlZqdEJRVU5CTEUxQlFVbERMRTFCUVUwc1JVRkJWanRCUVVOQmNFSXNVVUZCVFhGQ0xFdEJRVXRETEVkQlFVd3NRMEZCVTNoR0xFbEJRVWxaTEUxQlFXSXNSVUZCY1VKelJDeEhRVUZ5UWl4RFFVRk9PenRCUVVWQkxFOUJRVXNzU1VGQlNXaEVMRWxCUVVrclF5eExRVUZpTEVWQlFXOUNMME1zU1VGQlNXZEVMRWRCUVhoQ0xFVkJRVFpDYUVRc1IwRkJOMElzUlVGQmEwTTdRVUZEYUVNc1VVRkJTV3hDTEVsQlFVbHJRaXhEUVVGS0xFdEJRVlVzU1VGQlpDeEZRVUZ2UWp0QlFVTnNRbTFGTEdGQlFVOUpMR1ZCUVdWSUxFZEJRV1lzU1VGQmMwSTNSQ3hQUVVGUGFVVXNXVUZCVUN4RFFVRnZRakZHTEVsQlFVbHJRaXhEUVVGS0xFTkJRWEJDTEVOQlFUZENPMEZCUTBGdlJTeFpRVUZOTEVWQlFVNDdRVUZEUkN4TFFVaEVMRTFCUjA4N1FVRkRURUVzWVVGQlR5eE5RVUZOZEVZc1NVRkJTV3RDTEVOQlFVb3NSVUZCVHpoRExGRkJRVkFzUTBGQlowSXNSVUZCYUVJc1EwRkJZanRCUVVORU8wRkJRMFk3TzBGQlJVUXNVMEZCVDNGQ0xFMUJRVTFKTEdWQlFXVklMRWRCUVdZc1EwRkJZanRCUVVORU96dEJRVVZFTEZOQlFWTm9RaXhYUVVGVUxFTkJRWE5DZEVVc1IwRkJkRUlzUlVGQk1rSnBSU3hMUVVFelFpeEZRVUZyUTBNc1IwRkJiRU1zUlVGQmRVTTdRVUZEY2tNc1RVRkJTWEJETEUxQlFVMHNSVUZCVmp0QlFVTkJiME1zVVVGQlRYRkNMRXRCUVV0RExFZEJRVXdzUTBGQlUzaEdMRWxCUVVsWkxFMUJRV0lzUlVGQmNVSnpSQ3hIUVVGeVFpeERRVUZPT3p0QlFVVkJMRTlCUVVzc1NVRkJTV2hFTEVsQlFVa3JReXhMUVVGaUxFVkJRVzlDTDBNc1NVRkJTV2RFTEVkQlFYaENMRVZCUVRaQ2FFUXNSMEZCTjBJN1FVRkRSVmtzVjBGQlQwd3NUMEZCVDJsRkxGbEJRVkFzUTBGQmIwSXhSaXhKUVVGSmEwSXNRMEZCU2l4RFFVRndRaXhEUVVGUU8wRkJSRVlzUjBGRlFTeFBRVUZQV1N4SFFVRlFPMEZCUTBRN08wRkJSVVFzVTBGQlUzbERMRmxCUVZRc1EwRkJkVUoyUlN4SFFVRjJRaXhGUVVFMFFtbEZMRXRCUVRWQ0xFVkJRVzFEUXl4SFFVRnVReXhGUVVGM1F6dEJRVU4wUXl4VFFVRlBTU3haUVVGWmRFVXNSMEZCV2l4RlFVRnBRbWxGTEV0QlFXcENMRVZCUVhkQ1F5eEhRVUY0UWl4RFFVRlFPMEZCUTBRN08wRkJSVVFzVTBGQlUwVXNVMEZCVkN4RFFVRnZRbkJGTEVkQlFYQkNMRVZCUVhsQ2FVVXNTMEZCZWtJc1JVRkJaME5ETEVkQlFXaERMRVZCUVhGRE8wRkJRMjVETEUxQlFVbHBRaXhOUVVGTmJrWXNTVUZCU1Zrc1RVRkJaRHM3UVVGRlFTeE5RVUZKTEVOQlFVTnhSQ3hMUVVGRUxFbEJRVlZCTEZGQlFWRXNRMEZCZEVJc1JVRkJlVUpCTEZGQlFWRXNRMEZCVWp0QlFVTjZRaXhOUVVGSkxFTkJRVU5ETEVkQlFVUXNTVUZCVVVFc1RVRkJUU3hEUVVGa0xFbEJRVzFDUVN4TlFVRk5hVUlzUjBGQk4wSXNSVUZCYTBOcVFpeE5RVUZOYVVJc1IwRkJUanM3UVVGRmJFTXNUVUZCU1ZFc1RVRkJUU3hGUVVGV08wRkJRMEVzVDBGQlN5eEpRVUZKZWtVc1NVRkJTU3RETEV0QlFXSXNSVUZCYjBJdlF5eEpRVUZKWjBRc1IwRkJlRUlzUlVGQk5rSm9SQ3hIUVVFM1FpeEZRVUZyUXp0QlFVTm9RM2xGTEZkQlFVOURMRTFCUVUwMVJpeEpRVUZKYTBJc1EwRkJTaXhEUVVGT0xFTkJRVkE3UVVGRFJEdEJRVU5FTEZOQlFVOTVSU3hIUVVGUU8wRkJRMFE3TzBGQlJVUXNVMEZCVTJ4Q0xHRkJRVlFzUTBGQmQwSjZSU3hIUVVGNFFpeEZRVUUyUW1sRkxFdEJRVGRDTEVWQlFXOURReXhIUVVGd1F5eEZRVUY1UXp0QlFVTjJReXhOUVVGSk1rSXNVVUZCVVRkR0xFbEJRVWsyUlN4TFFVRktMRU5CUVZWYUxFdEJRVllzUlVGQmFVSkRMRWRCUVdwQ0xFTkJRVm83UVVGRFFTeE5RVUZKYlVJc1RVRkJUU3hGUVVGV08wRkJRMEVzVDBGQlN5eEpRVUZKYmtVc1NVRkJTU3hEUVVGaUxFVkJRV2RDUVN4SlFVRkpNa1VzVFVGQlRXcEdMRTFCUVRGQ0xFVkJRV3REVFN4TFFVRkxMRU5CUVhaRExFVkJRVEJETzBGQlEzaERiVVVzVjBGQlR6VkVMRTlCUVU5cFJTeFpRVUZRTEVOQlFXOUNSeXhOUVVGTk0wVXNRMEZCVGl4SlFVRlhNa1VzVFVGQlRUTkZMRWxCUVVVc1EwRkJVaXhKUVVGaExFZEJRVFZETEVOQlFWQTdRVUZEUkR0QlFVTkVMRk5CUVU5dFJTeEhRVUZRTzBGQlEwUTdPMEZCUlVReFJpeFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFtZENMRXRCUVdwQ0xFZEJRWGxDTEZWQlFWVmFMRXRCUVZZc1JVRkJhVUpETEVkQlFXcENMRVZCUVhOQ08wRkJRemRETEUxQlFVbHBRaXhOUVVGTkxFdEJRVXQyUlN4TlFVRm1PMEZCUTBGeFJDeFZRVUZSTmtJc1RVRkJUVGRDTEV0QlFVNHNSVUZCWVd0Q0xFZEJRV0lzUlVGQmEwSXNRMEZCYkVJc1EwRkJVanRCUVVOQmFrSXNVVUZCVFRSQ0xFMUJRVTAxUWl4SFFVRk9MRVZCUVZkcFFpeEhRVUZZTEVWQlFXZENRU3hIUVVGb1FpeERRVUZPT3p0QlFVVkJMRTFCUVVsNFJpeFBRVUZQU1N4bFFVRllMRVZCUVRSQ08wRkJRekZDTEZkQlFVOUtMRTlCUVU5eFFpeFJRVUZRTEVOQlFXZENMRXRCUVV0WUxGRkJRVXdzUTBGQll6UkVMRXRCUVdRc1JVRkJjVUpETEVkQlFYSkNMRU5CUVdoQ0xFTkJRVkE3UVVGRFJDeEhRVVpFTEUxQlJVODdRVUZEVEN4UlFVRkpOa0lzVjBGQlZ6ZENMRTFCUVUxRUxFdEJRWEpDTzBGQlEwRXNVVUZCU1N0Q0xGTkJRVk1zU1VGQlNYSkhMRTFCUVVvc1EwRkJWMjlITEZGQlFWZ3NSVUZCY1VKdVJTeFRRVUZ5UWl4RlFVRm5ReXhKUVVGb1F5eERRVUZpTzBGQlEwRXNVMEZCU3l4SlFVRkpWaXhKUVVGSkxFTkJRV0lzUlVGQlowSkJMRWxCUVVrMlJTeFJRVUZ3UWl4RlFVRTRRamRGTEVkQlFUbENMRVZCUVcxRE8wRkJRMnBET0VVc1lVRkJUemxGTEVOQlFWQXNTVUZCV1N4TFFVRkxRU3hKUVVGSkswTXNTMEZCVkN4RFFVRmFPMEZCUTBRN1FVRkRSQ3hYUVVGUEswSXNUVUZCVUR0QlFVTkVPMEZCUTBZc1EwRm1SRHM3UVVGcFFrRTdRVUZEUVhKSExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ2IwTXNSMEZCYWtJc1IwRkJkVUlzVlVGQlZYUkVMRTFCUVZZc1JVRkJhMEk3UVVGRGRrTjFSQ3hWUVVGUlF5eEhRVUZTTEVOQlFWa3NNa1JCUVZvN1FVRkRRU3hUUVVGUExFdEJRVXMzUlN4VFFVRk1MRU5CUVdWeFFpeE5RVUZtTEVOQlFWQTdRVUZEUkN4RFFVaEVPenRCUVV0Qk8wRkJRMEZvUkN4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW5WRExFZEJRV3BDTEVkQlFYVkNMRlZCUVZWRExFTkJRVllzUlVGQllURkVMRTFCUVdJc1JVRkJjVUk3UVVGRE1VTjFSQ3hWUVVGUlF5eEhRVUZTTEVOQlFWa3NNa1JCUVZvN1FVRkRRU3hUUVVGUExFdEJRVXRITEZWQlFVd3NRMEZCWjBKRUxFTkJRV2hDTEVWQlFXMUNNVVFzVFVGQmJrSXNRMEZCVUR0QlFVTkVMRU5CU0VRN08wRkJTMEZvUkN4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW5aRExGTkJRV3BDTEVkQlFUWkNMRlZCUVZWeFFpeE5RVUZXTEVWQlFXdENORVFzVVVGQmJFSXNSVUZCTkVJN1FVRkRka1FzVFVGQlNTeERRVUZEUVN4UlFVRk1MRVZCUVdVN1FVRkRZbTVGTEZkQlFVOVBMRmRCUVZkbUxGTkJRVmdzU1VGQmQwSmxMRmRCUVZjc1NVRkJNVU1zUlVGQlowUXNaMEpCUVdoRU8wRkJRMEZRTEZkQlFVOVBMRk5CUVZNc1MwRkJTeTlDTEUxQlFYSkNMRVZCUVRaQ0xIRkRRVUUzUWp0QlFVTkVPenRCUVVWRUxFMUJRVWtyUWl4VlFVRlZMRXRCUVVzdlFpeE5RVUZ1UWl4RlFVTkZPenRCUVVWR0xGTkJRVThzUzBGQlN5dENMRTFCUVV3c1EwRkJVRHRCUVVORUxFTkJWa1E3TzBGQldVRXNVMEZCVXpaRUxGZEJRVlFzUTBGQmMwSjRSeXhIUVVGMFFpeEZRVUV5UWpKRExFMUJRVE5DTEVWQlFXMURPRVFzV1VGQmJrTXNSVUZCYVVSR0xGRkJRV3BFTEVWQlFUSkVPMEZCUTNwRUxFMUJRVWtzUTBGQlEwRXNVVUZCVEN4RlFVRmxPMEZCUTJKdVJTeFhRVUZQTEU5QlFVOXhSU3haUVVGUUxFdEJRWGRDTEZOQlFTOUNMRVZCUVRCRExESkNRVUV4UXp0QlFVTkJja1VzVjBGQlQwOHNWMEZCVjJZc1UwRkJXQ3hKUVVGM1FtVXNWMEZCVnl4SlFVRXhReXhGUVVGblJDeG5Ra0ZCYUVRN1FVRkRRVkFzVjBGQlQwOHNVMEZCVXl4RFFVRlVMRWRCUVdFelF5eEpRVUZKV1N4TlFVRjRRaXhGUVVGblF5eHhRMEZCYUVNN1FVRkRSRHM3UVVGRlJDeE5RVUZKZFVVc1RVRkJUVzVHTEVsQlFVbFpMRTFCUVdRN1FVRkRRU3hOUVVGSkswSXNWVUZCVlhkRExFZEJRV1FzUlVGRFJUczdRVUZGUml4TlFVRkpkVUlzUjBGQlNqdEJRVU5CTEUxQlFVbEVMRmxCUVVvc1JVRkJhMEk3UVVGRGFFSkRMRlZCUVUweFJ5eEpRVUZKTWtNc1RVRkJTaXhEUVVGT08wRkJRMEVzVVVGQlNVRXNVMEZCVXl4RFFVRlVMRWRCUVdGM1F5eEhRVUZxUWl4RlFVTkZkVUlzVDBGQlR6RkhMRWxCUVVreVF5eFRRVUZUTEVOQlFXSXNTMEZCYlVJc1EwRkJNVUk3UVVGRFNDeEhRVXBFTEUxQlNVODdRVUZEVEN0RUxGVkJRVTB4Unl4SlFVRkpNa01zVFVGQlNpeExRVUZsTEVOQlFYSkNPMEZCUTBFc1VVRkJTVUVzVTBGQlV5eERRVUZVTEVkQlFXRjNReXhIUVVGcVFpeEZRVU5GZFVJc1QwRkJUekZITEVsQlFVa3lReXhUUVVGVExFTkJRV0lzUTBGQlVEdEJRVU5JTzBGQlEwUXNVMEZCVHl0RUxFZEJRVkE3UVVGRFJEczdRVUZGUkM5SExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ09FTXNXVUZCYWtJc1IwRkJaME1zVlVGQlZXaEZMRTFCUVZZc1JVRkJhMEkwUkN4UlFVRnNRaXhGUVVFMFFqdEJRVU14UkN4VFFVRlBReXhaUVVGWkxFbEJRVm9zUlVGQmEwSTNSQ3hOUVVGc1FpeEZRVUV3UWl4SlFVRXhRaXhGUVVGblF6UkVMRkZCUVdoRExFTkJRVkE3UVVGRFJDeERRVVpFT3p0QlFVbEJOVWNzVDBGQlQydEZMRk5CUVZBc1EwRkJhVUlyUXl4WlFVRnFRaXhIUVVGblF5eFZRVUZWYWtVc1RVRkJWaXhGUVVGclFqUkVMRkZCUVd4Q0xFVkJRVFJDTzBGQlF6RkVMRk5CUVU5RExGbEJRVmtzU1VGQldpeEZRVUZyUWpkRUxFMUJRV3hDTEVWQlFUQkNMRXRCUVRGQ0xFVkJRV2xETkVRc1VVRkJha01zUTBGQlVEdEJRVU5FTEVOQlJrUTdPMEZCU1VFc1UwRkJVMDBzVjBGQlZDeERRVUZ6UWpkSExFZEJRWFJDTEVWQlFUSkNNa01zVFVGQk0wSXNSVUZCYlVNNFJDeFpRVUZ1UXl4RlFVRnBSRVlzVVVGQmFrUXNSVUZCTWtRN1FVRkRla1FzVFVGQlNTeERRVUZEUVN4UlFVRk1MRVZCUVdVN1FVRkRZbTVGTEZkQlFVOHNUMEZCVDNGRkxGbEJRVkFzUzBGQmQwSXNVMEZCTDBJc1JVRkJNRU1zTWtKQlFURkRPMEZCUTBGeVJTeFhRVUZQVHl4WFFVRlhaaXhUUVVGWUxFbEJRWGRDWlN4WFFVRlhMRWxCUVRGRExFVkJRV2RFTEdkQ1FVRm9SRHRCUVVOQlVDeFhRVUZQVHl4VFFVRlRMRU5CUVZRc1IwRkJZVE5ETEVsQlFVbFpMRTFCUVhoQ0xFVkJRV2RETEhGRFFVRm9RenRCUVVORU96dEJRVVZFTEUxQlFVbDFSU3hOUVVGTmJrWXNTVUZCU1Zrc1RVRkJaRHRCUVVOQkxFMUJRVWtyUWl4VlFVRlZkME1zUjBGQlpDeEZRVU5GT3p0QlFVVkdMRTFCUVVsMVFpeEhRVUZLTzBGQlEwRXNUVUZCU1VRc1dVRkJTaXhGUVVGclFqdEJRVU5vUWl4UlFVRkpPVVFzVTBGQlV5eERRVUZVTEVkQlFXRjNReXhIUVVGcVFpeEZRVU5GZFVJc1RVRkJUVEZITEVsQlFVa3lReXhUUVVGVExFTkJRV0lzUzBGQmJVSXNSVUZCZWtJN1FVRkRSaXhSUVVGSlFTeFRRVUZUTEVOQlFWUXNSMEZCWVhkRExFZEJRV3BDTEVWQlEwVjFRaXhQUVVGUE1VY3NTVUZCU1RKRExGTkJRVk1zUTBGQllpeExRVUZ0UWl4RFFVRXhRanRCUVVOR0swUXNWMEZCVHpGSExFbEJRVWt5UXl4TlFVRktMRU5CUVZBN1FVRkRRU3hSUVVGSlFTeFRRVUZUTEVOQlFWUXNSMEZCWVhkRExFZEJRV3BDTEVWQlEwVjFRaXhOUVVGTlFTeFBRVUZQTVVjc1NVRkJTVEpETEZOQlFWTXNRMEZCWWl4TFFVRnRRaXhGUVVGdVFpeExRVUV3UWl4RFFVRnFReXhEUVVGT08wRkJRMGdzUjBGU1JDeE5RVkZQTzBGQlEwd3NVVUZCU1VFc1UwRkJVeXhEUVVGVUxFZEJRV0YzUXl4SFFVRnFRaXhGUVVORmRVSXNUVUZCVFRGSExFbEJRVWt5UXl4VFFVRlRMRU5CUVdJc1MwRkJiVUlzUlVGQmVrSTdRVUZEUml4UlFVRkpRU3hUUVVGVExFTkJRVlFzUjBGQllYZERMRWRCUVdwQ0xFVkJRMFYxUWl4UFFVRlBNVWNzU1VGQlNUSkRMRk5CUVZNc1EwRkJZaXhMUVVGdFFpeERRVUV4UWp0QlFVTkdMRkZCUVVsQkxGTkJRVk1zUTBGQlZDeEhRVUZoZDBNc1IwRkJha0lzUlVGRFJYVkNMRTlCUVU4eFJ5eEpRVUZKTWtNc1UwRkJVeXhEUVVGaUxFTkJRVkE3UVVGRFJpdEVMRlZCUVUxQkxFOUJRVTh4Unl4SlFVRkpNa01zVFVGQlNpeExRVUZsTEVWQlFXWXNTMEZCYzBJc1EwRkJOMElzUTBGQlRqdEJRVU5FTzBGQlEwUXNVMEZCVHl0RUxFZEJRVkE3UVVGRFJEczdRVUZGUkM5SExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ2FVUXNXVUZCYWtJc1IwRkJaME1zVlVGQlZXNUZMRTFCUVZZc1JVRkJhMEkwUkN4UlFVRnNRaXhGUVVFMFFqdEJRVU14UkN4VFFVRlBUU3haUVVGWkxFbEJRVm9zUlVGQmEwSnNSU3hOUVVGc1FpeEZRVUV3UWl4SlFVRXhRaXhGUVVGblF6UkVMRkZCUVdoRExFTkJRVkE3UVVGRFJDeERRVVpFT3p0QlFVbEJOVWNzVDBGQlQydEZMRk5CUVZBc1EwRkJhVUpyUkN4WlFVRnFRaXhIUVVGblF5eFZRVUZWY0VVc1RVRkJWaXhGUVVGclFqUkVMRkZCUVd4Q0xFVkJRVFJDTzBGQlF6RkVMRk5CUVU5TkxGbEJRVmtzU1VGQldpeEZRVUZyUW14RkxFMUJRV3hDTEVWQlFUQkNMRXRCUVRGQ0xFVkJRV2xETkVRc1VVRkJha01zUTBGQlVEdEJRVU5FTEVOQlJrUTdPMEZCU1VFMVJ5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFtMUVMRkZCUVdwQ0xFZEJRVFJDTEZWQlFWVnlSU3hOUVVGV0xFVkJRV3RDTkVRc1VVRkJiRUlzUlVGQk5FSTdRVUZEZEVRc1RVRkJTU3hEUVVGRFFTeFJRVUZNTEVWQlFXVTdRVUZEWW01RkxGZEJRVTlQTEZkQlFWZG1MRk5CUVZnc1NVRkJkMEpsTEZkQlFWY3NTVUZCTVVNc1JVRkRTU3huUWtGRVNqdEJRVVZCVUN4WFFVRlBUeXhUUVVGVExFdEJRVXN2UWl4TlFVRnlRaXhGUVVFMlFpeHhRMEZCTjBJN1FVRkRSRHM3UVVGRlJDeE5RVUZKSzBJc1ZVRkJWU3hMUVVGTEwwSXNUVUZCYmtJc1JVRkRSVHM3UVVGRlJpeE5RVUZKY1Vjc1RVRkJUU3hMUVVGTGRFVXNUVUZCVEN4SlFVRmxMRWxCUVhwQ08wRkJRMEVzVFVGQlNYTkZMRWRCUVVvc1JVRkRSU3hQUVVGUExFTkJRVU1zVDBGQlR5eExRVUZMZEVVc1RVRkJUQ3hEUVVGUUxFZEJRWE5DTEVOQlFYWkNMRWxCUVRSQ0xFTkJRVU1zUTBGQmNFTXNRMEZFUml4TFFVZEZMRTlCUVU4c1MwRkJTMEVzVFVGQlRDeERRVUZRTzBGQlEwZ3NRMEZtUkRzN1FVRnBRa0VzVTBGQlUzVkZMRlZCUVZRc1EwRkJjVUpzU0N4SFFVRnlRaXhGUVVFd1FqSkRMRTFCUVRGQ0xFVkJRV3RET0VRc1dVRkJiRU1zUlVGQlowUkdMRkZCUVdoRUxFVkJRVEJFTzBGQlEzaEVMRTFCUVVrc1EwRkJRMEVzVVVGQlRDeEZRVUZsTzBGQlEySnVSU3hYUVVGUExFOUJRVTl4UlN4WlFVRlFMRXRCUVhkQ0xGTkJRUzlDTEVWQlFUQkRMREpDUVVFeFF6dEJRVU5CY2tVc1YwRkJUMDhzVjBGQlYyWXNVMEZCV0N4SlFVRjNRbVVzVjBGQlZ5eEpRVUV4UXl4RlFVRm5SQ3huUWtGQmFFUTdRVUZEUVZBc1YwRkJUMDhzVTBGQlV5eERRVUZVTEVkQlFXRXpReXhKUVVGSldTeE5RVUY0UWl4RlFVRm5ReXh4UTBGQmFFTTdRVUZEUkRzN1FVRkZSQ3hOUVVGSmRVVXNUVUZCVFc1R0xFbEJRVWxaTEUxQlFXUTdRVUZEUVN4TlFVRkpLMElzVlVGQlZYZERMRWRCUVdRc1JVRkRSVHM3UVVGRlJpeE5RVUZKZFVJc1RVRkJUVVlzV1VGQldYaEhMRWRCUVZvc1JVRkJhVUl5UXl4TlFVRnFRaXhGUVVGNVFqaEVMRmxCUVhwQ0xFVkJRWFZETEVsQlFYWkRMRU5CUVZZN1FVRkRRU3hOUVVGSlVTeE5RVUZOVUN4TlFVRk5MRTFCUVdoQ08wRkJRMEVzVFVGQlNVOHNSMEZCU2l4RlFVTkZMRTlCUVU4c1EwRkJReXhUUVVGVFVDeEhRVUZVTEVkQlFXVXNRMEZCYUVJc1NVRkJjVUlzUTBGQlF5eERRVUUzUWl4RFFVUkdMRXRCUjBVc1QwRkJUMEVzUjBGQlVEdEJRVU5JT3p0QlFVVkVMMGNzVDBGQlQydEZMRk5CUVZBc1EwRkJhVUp6UkN4WFFVRnFRaXhIUVVFclFpeFZRVUZWZUVVc1RVRkJWaXhGUVVGclFqUkVMRkZCUVd4Q0xFVkJRVFJDTzBGQlEzcEVMRk5CUVU5WExGZEJRVmNzU1VGQldDeEZRVUZwUW5aRkxFMUJRV3BDTEVWQlFYbENMRWxCUVhwQ0xFVkJRU3RDTkVRc1VVRkJMMElzUTBGQlVEdEJRVU5FTEVOQlJrUTdPMEZCU1VFMVJ5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFuVkVMRmRCUVdwQ0xFZEJRU3RDTEZWQlFWVjZSU3hOUVVGV0xFVkJRV3RDTkVRc1VVRkJiRUlzUlVGQk5FSTdRVUZEZWtRc1UwRkJUMWNzVjBGQlZ5eEpRVUZZTEVWQlFXbENka1VzVFVGQmFrSXNSVUZCZVVJc1MwRkJla0lzUlVGQlowTTBSQ3hSUVVGb1F5eERRVUZRTzBGQlEwUXNRMEZHUkRzN1FVRkpRU3hUUVVGVFl5eFZRVUZVTEVOQlFYRkNja2dzUjBGQmNrSXNSVUZCTUVJeVF5eE5RVUV4UWl4RlFVRnJRemhFTEZsQlFXeERMRVZCUVdkRVJpeFJRVUZvUkN4RlFVRXdSRHRCUVVONFJDeE5RVUZKTEVOQlFVTkJMRkZCUVV3c1JVRkJaVHRCUVVOaWJrVXNWMEZCVHl4UFFVRlBjVVVzV1VGQlVDeExRVUYzUWl4VFFVRXZRaXhGUVVFd1F5d3lRa0ZCTVVNN1FVRkRRWEpGTEZkQlFVOVBMRmRCUVZkbUxGTkJRVmdzU1VGQmQwSmxMRmRCUVZjc1NVRkJNVU1zUlVGQlowUXNaMEpCUVdoRU8wRkJRMEZRTEZkQlFVOVBMRk5CUVZNc1EwRkJWQ3hIUVVGaE0wTXNTVUZCU1Zrc1RVRkJlRUlzUlVGQlowTXNjVU5CUVdoRE8wRkJRMFE3TzBGQlJVUXNUVUZCU1hWRkxFMUJRVTF1Uml4SlFVRkpXU3hOUVVGa08wRkJRMEVzVFVGQlNTdENMRlZCUVZWM1F5eEhRVUZrTEVWQlEwVTdPMEZCUlVZc1RVRkJTWFZDTEUxQlFVMUhMRmxCUVZrM1J5eEhRVUZhTEVWQlFXbENNa01zVFVGQmFrSXNSVUZCZVVJNFJDeFpRVUY2UWl4RlFVRjFReXhKUVVGMlF5eERRVUZXTzBGQlEwRXNUVUZCU1ZFc1RVRkJUVkFzVFVGQlRTeFZRVUZvUWp0QlFVTkJMRTFCUVVsUExFZEJRVW9zUlVGRFJTeFBRVUZQTEVOQlFVTXNZVUZCWVZBc1IwRkJZaXhIUVVGdFFpeERRVUZ3UWl4SlFVRjVRaXhEUVVGRExFTkJRV3BETEVOQlJFWXNTMEZIUlN4UFFVRlBRU3hIUVVGUU8wRkJRMGc3TzBGQlJVUXZSeXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRbmxFTEZkQlFXcENMRWRCUVN0Q0xGVkJRVlV6UlN4TlFVRldMRVZCUVd0Q05FUXNVVUZCYkVJc1JVRkJORUk3UVVGRGVrUXNVMEZCVDJNc1YwRkJWeXhKUVVGWUxFVkJRV2xDTVVVc1RVRkJha0lzUlVGQmVVSXNTVUZCZWtJc1JVRkJLMEkwUkN4UlFVRXZRaXhEUVVGUU8wRkJRMFFzUTBGR1JEczdRVUZKUVRWSExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ01FUXNWMEZCYWtJc1IwRkJLMElzVlVGQlZUVkZMRTFCUVZZc1JVRkJhMEkwUkN4UlFVRnNRaXhGUVVFMFFqdEJRVU42UkN4VFFVRlBZeXhYUVVGWExFbEJRVmdzUlVGQmFVSXhSU3hOUVVGcVFpeEZRVUY1UWl4TFFVRjZRaXhGUVVGblF6UkVMRkZCUVdoRExFTkJRVkE3UVVGRFJDeERRVVpFT3p0QlFVbEJMRk5CUVZOcFFpeFZRVUZVTEVOQlFYRkNlRWdzUjBGQmNrSXNSVUZCTUVJeVF5eE5RVUV4UWl4RlFVRnJRemhFTEZsQlFXeERMRVZCUVdkRVJpeFJRVUZvUkN4RlFVRXdSRHRCUVVONFJDeE5RVUZKTEVOQlFVTkJMRkZCUVV3c1JVRkJaVHRCUVVOaWJrVXNWMEZCVHl4UFFVRlBjVVVzV1VGQlVDeExRVUYzUWl4VFFVRXZRaXhGUVVFd1F5d3lRa0ZCTVVNN1FVRkRRWEpGTEZkQlFVOVBMRk5CUVZNc1EwRkJWQ3hIUVVGaE0wTXNTVUZCU1Zrc1RVRkJlRUlzUlVGQlowTXNjVU5CUVdoRE8wRkJRMFE3TzBGQlJVUXNVMEZCVDI1Q0xGRkJRVkZuU1N4SlFVRlNMRU5CUVdGNlNDeEhRVUZpTEVWQlFXdENNa01zVFVGQmJFSXNSVUZCTUVJNFJDeFpRVUV4UWl4RlFVRjNReXhGUVVGNFF5eEZRVUUwUXl4RFFVRTFReXhEUVVGUU8wRkJRMFE3TzBGQlJVUTVSeXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRalpFTEZkQlFXcENMRWRCUVN0Q0xGVkJRVlV2UlN4TlFVRldMRVZCUVd0Q05FUXNVVUZCYkVJc1JVRkJORUk3UVVGRGVrUXNVMEZCVDJsQ0xGZEJRVmNzU1VGQldDeEZRVUZwUWpkRkxFMUJRV3BDTEVWQlFYbENMRWxCUVhwQ0xFVkJRU3RDTkVRc1VVRkJMMElzUTBGQlVEdEJRVU5FTEVOQlJrUTdPMEZCU1VFMVJ5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFqaEVMRmRCUVdwQ0xFZEJRU3RDTEZWQlFWVm9SaXhOUVVGV0xFVkJRV3RDTkVRc1VVRkJiRUlzUlVGQk5FSTdRVUZEZWtRc1UwRkJUMmxDTEZkQlFWY3NTVUZCV0N4RlFVRnBRamRGTEUxQlFXcENMRVZCUVhsQ0xFdEJRWHBDTEVWQlFXZERORVFzVVVGQmFFTXNRMEZCVUR0QlFVTkVMRU5CUmtRN08wRkJTVUVzVTBGQlUzRkNMRmRCUVZRc1EwRkJjMEkxU0N4SFFVRjBRaXhGUVVFeVFqSkRMRTFCUVROQ0xFVkJRVzFET0VRc1dVRkJia01zUlVGQmFVUkdMRkZCUVdwRUxFVkJRVEpFTzBGQlEzcEVMRTFCUVVrc1EwRkJRMEVzVVVGQlRDeEZRVUZsTzBGQlEySnVSU3hYUVVGUExFOUJRVTl4UlN4WlFVRlFMRXRCUVhkQ0xGTkJRUzlDTEVWQlFUQkRMREpDUVVFeFF6dEJRVU5CY2tVc1YwRkJUMDhzVTBGQlV5eERRVUZVTEVkQlFXRXpReXhKUVVGSldTeE5RVUY0UWl4RlFVRm5ReXh4UTBGQmFFTTdRVUZEUkRzN1FVRkZSQ3hUUVVGUGJrSXNVVUZCVVdkSkxFbEJRVklzUTBGQllYcElMRWRCUVdJc1JVRkJhMEl5UXl4TlFVRnNRaXhGUVVFd1FqaEVMRmxCUVRGQ0xFVkJRWGRETEVWQlFYaERMRVZCUVRSRExFTkJRVFZETEVOQlFWQTdRVUZEUkRzN1FVRkZSRGxITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDWjBVc1dVRkJha0lzUjBGQlowTXNWVUZCVld4R0xFMUJRVllzUlVGQmEwSTBSQ3hSUVVGc1FpeEZRVUUwUWp0QlFVTXhSQ3hUUVVGUGNVSXNXVUZCV1N4SlFVRmFMRVZCUVd0Q2FrWXNUVUZCYkVJc1JVRkJNRUlzU1VGQk1VSXNSVUZCWjBNMFJDeFJRVUZvUXl4RFFVRlFPMEZCUTBRc1EwRkdSRHM3UVVGSlFUVkhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENhVVVzV1VGQmFrSXNSMEZCWjBNc1ZVRkJWVzVHTEUxQlFWWXNSVUZCYTBJMFJDeFJRVUZzUWl4RlFVRTBRanRCUVVNeFJDeFRRVUZQY1VJc1dVRkJXU3hKUVVGYUxFVkJRV3RDYWtZc1RVRkJiRUlzUlVGQk1FSXNTMEZCTVVJc1JVRkJhVU0wUkN4UlFVRnFReXhEUVVGUU8wRkJRMFFzUTBGR1JEczdRVUZKUVRWSExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ2VVTXNWVUZCYWtJc1IwRkJPRUlzVlVGQlZYbENMRXRCUVZZc1JVRkJhVUp3Uml4TlFVRnFRaXhGUVVGNVFqUkVMRkZCUVhwQ0xFVkJRVzFETzBGQlF5OUVMRTFCUVVrc1EwRkJRMEVzVVVGQlRDeEZRVUZsTzBGQlEySnVSU3hYUVVGUE1rWXNWVUZCVlc1SExGTkJRVllzU1VGQmRVSnRSeXhWUVVGVkxFbEJRWGhETEVWQlFUaERMR1ZCUVRsRE8wRkJRMEV6Uml4WFFVRlBUeXhYUVVGWFppeFRRVUZZTEVsQlFYZENaU3hYUVVGWExFbEJRVEZETEVWQlFXZEVMR2RDUVVGb1JEdEJRVU5CVUN4WFFVRlBUeXhUUVVGVExFdEJRVXN2UWl4TlFVRnlRaXhGUVVFMlFpeHpRMEZCTjBJN1FVRkRRVzlJTEdOQlFWVkVMRXRCUVZZc1JVRkJhVUlzU1VGQmFrSTdRVUZEUkRzN1FVRkZSQ3hOUVVGSmNFWXNWVUZCVlN4TFFVRkxMMElzVFVGQmJrSXNSVUZCTWtJN08wRkJSVE5DTEU5QlFVc3JRaXhOUVVGTUxFbEJRV1Z2Uml4TFFVRm1PMEZCUTBRc1EwRllSRHM3UVVGaFFTeFRRVUZUUlN4WlFVRlVMRU5CUVhWQ2Fra3NSMEZCZGtJc1JVRkJORUlyU0N4TFFVRTFRaXhGUVVGdFEzQkdMRTFCUVc1RExFVkJRVEpET0VRc1dVRkJNME1zUlVGQmVVUkdMRkZCUVhwRUxFVkJRVzFGTzBGQlEycEZMRTFCUVVrc1EwRkJRMEVzVVVGQlRDeEZRVUZsTzBGQlEySnVSU3hYUVVGUE1rWXNWVUZCVlc1SExGTkJRVllzU1VGQmRVSnRSeXhWUVVGVkxFbEJRWGhETEVWQlFUaERMR1ZCUVRsRE8wRkJRMEV6Uml4WFFVRlBMRTlCUVU5eFJTeFpRVUZRTEV0QlFYZENMRk5CUVM5Q0xFVkJRVEJETERKQ1FVRXhRenRCUVVOQmNrVXNWMEZCVDA4c1YwRkJWMllzVTBGQldDeEpRVUYzUW1Vc1YwRkJWeXhKUVVFeFF5eEZRVUZuUkN4blFrRkJhRVE3UVVGRFFWQXNWMEZCVDA4c1UwRkJVeXhEUVVGVUxFZEJRV0V6UXl4SlFVRkpXU3hOUVVGNFFpeEZRVUZuUXl4elEwRkJhRU03UVVGRFFXOUlMR05CUVZWRUxFdEJRVllzUlVGQmFVSXNUVUZCYWtJN1FVRkRSRHM3UVVGRlJDeE5RVUZKTlVNc1RVRkJUVzVHTEVsQlFVbFpMRTFCUVdRN1FVRkRRU3hOUVVGSkswSXNWVUZCVlhkRExFZEJRV1FzUlVGRFJUczdRVUZGUml4UFFVRkxMRWxCUVVscVJTeEpRVUZKTEVOQlFWSXNSVUZCVjJkSUxFbEJRVWt6UXl4TFFVRkxReXhIUVVGTUxFTkJRVk5NTEUxQlFVMTRReXhOUVVGbUxFVkJRWFZDTEVOQlFYWkNMRU5CUVhCQ0xFVkJRU3REZWtJc1NVRkJTV2RJTEVOQlFXNUVMRVZCUVhORWFFZ3NSMEZCZEVRc1JVRkJNa1E3UVVGRGVrUnNRaXhSUVVGSk1rTXNVMEZCVTNwQ0xFTkJRV0lzU1VGRFNTeERRVUZETmtjc1VVRkJVeXhSUVVGVExFdEJRVXQwUWl4bFFVRmxka1lzUTBGQlppeEhRVUZ0UWl4SlFVRkpRU3hEUVVFMVFpeERRVUZ1UWl4TlFVTkpMRU5CUVVOMVJpeGxRVUZsZGtZc1EwRkJaaXhIUVVGdFFpeEpRVUZKUVN4RFFVRjRRaXhKUVVFMlFpeERRVVp5UXp0QlFVZEVPMEZCUTBZN08wRkJSVVIyUWl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW5ORkxHRkJRV3BDTEVkQlFXbERMRlZCUVZWS0xFdEJRVllzUlVGQmFVSndSaXhOUVVGcVFpeEZRVUY1UWpSRUxGRkJRWHBDTEVWQlFXMURPMEZCUTJ4Rk1FSXNaVUZCWVN4SlFVRmlMRVZCUVcxQ1JpeExRVUZ1UWl4RlFVRXdRbkJHTEUxQlFURkNMRVZCUVd0RExFbEJRV3hETEVWQlFYZERORVFzVVVGQmVFTTdRVUZEUkN4RFFVWkVPenRCUVVsQk5VY3NUMEZCVDJ0RkxGTkJRVkFzUTBGQmFVSjFSU3hoUVVGcVFpeEhRVUZwUXl4VlFVRlZUQ3hMUVVGV0xFVkJRV2xDY0VZc1RVRkJha0lzUlVGQmVVSTBSQ3hSUVVGNlFpeEZRVUZ0UXp0QlFVTnNSVEJDTEdWQlFXRXNTVUZCWWl4RlFVRnRRa1lzUzBGQmJrSXNSVUZCTUVKd1JpeE5RVUV4UWl4RlFVRnJReXhMUVVGc1F5eEZRVUY1UXpSRUxGRkJRWHBETzBGQlEwUXNRMEZHUkRzN1FVRkpRU3hUUVVGVE9FSXNXVUZCVkN4RFFVRjFRbkpKTEVkQlFYWkNMRVZCUVRSQ0swZ3NTMEZCTlVJc1JVRkJiVU53Uml4TlFVRnVReXhGUVVFeVF6aEVMRmxCUVRORExFVkJRWGxFUml4UlFVRjZSQ3hGUVVGdFJUdEJRVU5xUlN4TlFVRkpMRU5CUVVOQkxGRkJRVXdzUlVGQlpUdEJRVU5pYmtVc1YwRkJUekpHTEZWQlFWVnVSeXhUUVVGV0xFbEJRWFZDYlVjc1ZVRkJWU3hKUVVGNFF5eEZRVUU0UXl4bFFVRTVRenRCUVVOQk0wWXNWMEZCVHl4UFFVRlBjVVVzV1VGQlVDeExRVUYzUWl4VFFVRXZRaXhGUVVFd1F5d3lRa0ZCTVVNN1FVRkRRWEpGTEZkQlFVOVBMRmRCUVZkbUxGTkJRVmdzU1VGQmQwSmxMRmRCUVZjc1NVRkJNVU1zUlVGQlowUXNaMEpCUVdoRU8wRkJRMEZRTEZkQlFVOVBMRk5CUVZNc1EwRkJWQ3hIUVVGaE0wTXNTVUZCU1Zrc1RVRkJlRUlzUlVGQlowTXNjME5CUVdoRE8wRkJRMEZ2U0N4alFVRlZSQ3hMUVVGV0xFVkJRV2xDTEZWQlFXcENPMEZCUTBRN08wRkJSVVFzVFVGQlNUVkRMRTFCUVUxdVJpeEpRVUZKV1N4TlFVRmtPMEZCUTBFc1RVRkJTU3RDTEZWQlFWVjNReXhIUVVGa0xFVkJRMFU3TzBGQlJVWXNUMEZCU3l4SlFVRkpha1VzU1VGQlNTeERRVUZTTEVWQlFWZG5TQ3hKUVVGSk0wTXNTMEZCUzBNc1IwRkJUQ3hEUVVGVFRDeE5RVUZOZUVNc1RVRkJaaXhGUVVGMVFpeERRVUYyUWl4RFFVRndRaXhGUVVFclEzcENMRWxCUVVsblNDeERRVUZ1UkN4RlFVRnpSR2hJTEVkQlFYUkVMRVZCUVRKRU8wRkJRM3BFYkVJc1VVRkJTVEpETEZOQlFWTjZRaXhEUVVGaUxFbEJRMHMyUnl4VlFVRlZMRU5CUVVOMFFpeGxRVUZsZGtZc1EwRkJaaXhIUVVGdFFpeEpRVUZKUVN4RFFVRjRRaXhKUVVFMlFpeERRVUY0UXl4SFFVRTJReXhKUVVScVJEdEJRVVZFTzBGQlEwWTdPMEZCUlVSMlFpeFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFubEZMR0ZCUVdwQ0xFZEJRV2xETEZWQlFWVlFMRXRCUVZZc1JVRkJhVUp3Uml4TlFVRnFRaXhGUVVGNVFqUkVMRkZCUVhwQ0xFVkJRVzFETzBGQlEyeEZPRUlzWlVGQllTeEpRVUZpTEVWQlFXMUNUaXhMUVVGdVFpeEZRVUV3UW5CR0xFMUJRVEZDTEVWQlFXdERMRWxCUVd4RExFVkJRWGRETkVRc1VVRkJlRU03UVVGRFJDeERRVVpFT3p0QlFVbEJOVWNzVDBGQlQydEZMRk5CUVZBc1EwRkJhVUl3UlN4aFFVRnFRaXhIUVVGcFF5eFZRVUZWVWl4TFFVRldMRVZCUVdsQ2NFWXNUVUZCYWtJc1JVRkJlVUkwUkN4UlFVRjZRaXhGUVVGdFF6dEJRVU5zUlRoQ0xHVkJRV0VzU1VGQllpeEZRVUZ0UWs0c1MwRkJia0lzUlVGQk1FSndSaXhOUVVFeFFpeEZRVUZyUXl4TFFVRnNReXhGUVVGNVF6UkVMRkZCUVhwRE8wRkJRMFFzUTBGR1JEczdRVUZKUVRWSExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ01rVXNVMEZCYWtJc1IwRkJOa0lzVlVGQlZWUXNTMEZCVml4RlFVRnBRbkJHTEUxQlFXcENMRVZCUVhsQ05FUXNVVUZCZWtJc1JVRkJiVU03UVVGRE9VUXNUVUZCU1N4RFFVRkRRU3hSUVVGTUxFVkJRV1U3UVVGRFltNUZMRmRCUVU4eVJpeFZRVUZWYmtjc1UwRkJWaXhKUVVGMVFtMUhMRlZCUVZVc1NVRkJlRU1zUlVGQk9FTXNaVUZCT1VNN1FVRkRRVE5HTEZkQlFVOVBMRmRCUVZkbUxGTkJRVmdzU1VGQmQwSmxMRmRCUVZjc1NVRkJNVU1zUlVGQlowUXNaMEpCUVdoRU8wRkJRMEZRTEZkQlFVOVBMRk5CUVZNc1MwRkJTeTlDTEUxQlFYSkNMRVZCUVRaQ0xITkRRVUUzUWp0QlFVTkJOa2dzWTBGQlZWWXNTMEZCVml4RlFVRnBRaXhKUVVGcVFpeEZRVUYxUWl4RFFVRkRMRWxCUVhoQ08wRkJRMFE3TzBGQlJVUXNUVUZCU1hCR0xGVkJRVlVzUzBGQlN5OUNMRTFCUVc1Q0xFVkJRMFU3TzBGQlJVWXNUVUZCU1cxSUxGTkJRVk1zUTBGQllpeEZRVU5GTEV0QlFVdDZRaXhWUVVGTUxFTkJRV2RDZVVJc1MwRkJhRUlzUlVGQmRVSndSaXhOUVVGMlFpeEZRVUVyUWpSRUxGRkJRUzlDTEVWQlJFWXNTMEZIUlN4TFFVRkxSQ3hWUVVGTUxFTkJRV2RDTEU5QlFVOTVRaXhMUVVGUUxFZEJRV1VzUTBGQkwwSXNSVUZCYTBOd1JpeE5RVUZzUXl4RlFVRXdRelJFTEZGQlFURkRPMEZCUTBnc1EwRm1SRHM3UVVGcFFrRXNVMEZCVTIxRExGZEJRVlFzUTBGQmMwSXhTU3hIUVVGMFFpeEZRVUV5UWl0SUxFdEJRVE5DTEVWQlFXdERjRVlzVFVGQmJFTXNSVUZCTUVNNFJDeFpRVUV4UXl4RlFVRjNSRVlzVVVGQmVFUXNSVUZCYTBVN1FVRkRhRVVzVFVGQlNTeERRVUZEUVN4UlFVRk1MRVZCUVdVN1FVRkRZbTVGTEZkQlFVOHlSaXhWUVVGVmJrY3NVMEZCVml4SlFVRjFRbTFITEZWQlFWVXNTVUZCZUVNc1JVRkJPRU1zWlVGQk9VTTdRVUZEUVROR0xGZEJRVThzVDBGQlQzRkZMRmxCUVZBc1MwRkJkMElzVTBGQkwwSXNSVUZCTUVNc01rSkJRVEZETzBGQlEwRnlSU3hYUVVGUFR5eFhRVUZYWml4VFFVRllMRWxCUVhkQ1pTeFhRVUZYTEVsQlFURkRMRVZCUVdkRUxHZENRVUZvUkR0QlFVTkJVQ3hYUVVGUFR5eFRRVUZUTEVOQlFWUXNSMEZCWVRORExFbEJRVWxaTEUxQlFYaENMRVZCUVdkRExITkRRVUZvUXp0QlFVTkJOa2dzWTBGQlZWWXNTMEZCVml4RlFVRnBRaXhOUVVGcVFpeEZRVUY1UWl4RFFVRkRMRTFCUVRGQ08wRkJRMFE3TzBGQlJVUXNUVUZCU1RWRExFMUJRVTF1Uml4SlFVRkpXU3hOUVVGa08wRkJRMEVzVFVGQlNTdENMRlZCUVZWM1F5eEhRVUZrTEVWQlEwVTdPMEZCUlVZc1RVRkJTVFJETEZOQlFWTXNRMEZCWWl4RlFVTkZSU3hoUVVGaGFra3NSMEZCWWl4RlFVRnJRaXRJTEV0QlFXeENMRVZCUVhsQ2NFWXNUVUZCZWtJc1JVRkJhVU00UkN4WlFVRnFReXhGUVVFclEwWXNVVUZCTDBNc1JVRkVSaXhMUVVkRk1FSXNZVUZCWVdwSkxFZEJRV0lzUlVGQmEwSXNVMEZCVXl0SUxFdEJRVlFzUjBGQmFVSXNRMEZCYmtNc1JVRkJjME53Uml4TlFVRjBReXhGUVVFNFF6aEVMRmxCUVRsRExFVkJRVFJFUml4UlFVRTFSRHRCUVVOSU96dEJRVVZFTlVjc1QwRkJUMnRGTEZOQlFWQXNRMEZCYVVJNFJTeFpRVUZxUWl4SFFVRm5ReXhWUVVGVldpeExRVUZXTEVWQlFXbENjRVlzVFVGQmFrSXNSVUZCZVVJMFJDeFJRVUY2UWl4RlFVRnRRenRCUVVOcVJXMURMR05CUVZrc1NVRkJXaXhGUVVGclFsZ3NTMEZCYkVJc1JVRkJlVUp3Uml4TlFVRjZRaXhGUVVGcFF5eEpRVUZxUXl4RlFVRjFRelJFTEZGQlFYWkRPMEZCUTBRc1EwRkdSRHM3UVVGSlFUVkhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENLMFVzV1VGQmFrSXNSMEZCWjBNc1ZVRkJWV0lzUzBGQlZpeEZRVUZwUW5CR0xFMUJRV3BDTEVWQlFYbENORVFzVVVGQmVrSXNSVUZCYlVNN1FVRkRha1Z0UXl4alFVRlpMRWxCUVZvc1JVRkJhMEpZTEV0QlFXeENMRVZCUVhsQ2NFWXNUVUZCZWtJc1JVRkJhVU1zUzBGQmFrTXNSVUZCZDBNMFJDeFJRVUY0UXp0QlFVTkVMRU5CUmtRN08wRkJTVUVzVTBGQlUzTkRMRmRCUVZRc1EwRkJjMEkzU1N4SFFVRjBRaXhGUVVFeVFpdElMRXRCUVROQ0xFVkJRV3REY0VZc1RVRkJiRU1zUlVGQk1FTTRSQ3haUVVFeFF5eEZRVUYzUkVZc1VVRkJlRVFzUlVGQmEwVTdRVUZEYUVVc1RVRkJTU3hEUVVGRFFTeFJRVUZNTEVWQlFXVTdRVUZEWW01RkxGZEJRVTh5Uml4VlFVRlZia2NzVTBGQlZpeEpRVUYxUW0xSExGVkJRVlVzU1VGQmVFTXNSVUZCT0VNc1pVRkJPVU03UVVGRFFUTkdMRmRCUVU4c1QwRkJUM0ZGTEZsQlFWQXNTMEZCZDBJc1UwRkJMMElzUlVGQk1FTXNNa0pCUVRGRE8wRkJRMEZ5UlN4WFFVRlBUeXhYUVVGWFppeFRRVUZZTEVsQlFYZENaU3hYUVVGWExFbEJRVEZETEVWQlFXZEVMR2RDUVVGb1JEdEJRVU5CVUN4WFFVRlBUeXhUUVVGVExFTkJRVlFzUjBGQllUTkRMRWxCUVVsWkxFMUJRWGhDTEVWQlFXZERMSE5EUVVGb1F6dEJRVU5CTmtnc1kwRkJWVllzUzBGQlZpeEZRVUZwUWl4VlFVRnFRaXhGUVVFMlFpeERRVUZETEZWQlFUbENPMEZCUTBRN08wRkJSVVFzVFVGQlNUVkRMRTFCUVUxdVJpeEpRVUZKV1N4TlFVRmtPMEZCUTBFc1RVRkJTU3RDTEZWQlFWVjNReXhIUVVGa0xFVkJRMFU3TzBGQlJVWXNUVUZCU1RSRExGTkJRVk1zUTBGQllpeEZRVU5GVFN4aFFVRmhja2tzUjBGQllpeEZRVUZyUWl0SUxFdEJRV3hDTEVWQlFYbENjRVlzVFVGQmVrSXNSVUZCYVVNNFJDeFpRVUZxUXl4RlFVRXJRMFlzVVVGQkwwTXNSVUZFUml4TFFVZEZPRUlzWVVGQllYSkpMRWRCUVdJc1JVRkJhMElzWVVGQllTdElMRXRCUVdJc1IwRkJjVUlzUTBGQmRrTXNSVUZCTUVOd1JpeE5RVUV4UXl4RlFVRnJSRGhFTEZsQlFXeEVMRVZCUVdkRlJpeFJRVUZvUlR0QlFVTklPenRCUVVWRU5VY3NUMEZCVDJ0RkxGTkJRVkFzUTBGQmFVSnBSaXhaUVVGcVFpeEhRVUZuUXl4VlFVRlZaaXhMUVVGV0xFVkJRV2xDY0VZc1RVRkJha0lzUlVGQmVVSTBSQ3hSUVVGNlFpeEZRVUZ0UXp0QlFVTnFSWE5ETEdOQlFWa3NTVUZCV2l4RlFVRnJRbVFzUzBGQmJFSXNSVUZCZVVKd1JpeE5RVUY2UWl4RlFVRnBReXhKUVVGcVF5eEZRVUYxUXpSRUxGRkJRWFpETzBGQlEwUXNRMEZHUkRzN1FVRkpRVFZITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDYTBZc1dVRkJha0lzUjBGQlowTXNWVUZCVldoQ0xFdEJRVllzUlVGQmFVSndSaXhOUVVGcVFpeEZRVUY1UWpSRUxGRkJRWHBDTEVWQlFXMURPMEZCUTJwRmMwTXNZMEZCV1N4SlFVRmFMRVZCUVd0Q1pDeExRVUZzUWl4RlFVRjVRbkJHTEUxQlFYcENMRVZCUVdsRExFdEJRV3BETEVWQlFYZERORVFzVVVGQmVFTTdRVUZEUkN4RFFVWkVPenRCUVVsQkxGTkJRVk41UXl4WFFVRlVMRU5CUVhOQ2FFb3NSMEZCZEVJc1JVRkJNa0lyU0N4TFFVRXpRaXhGUVVGclEzQkdMRTFCUVd4RExFVkJRVEJET0VRc1dVRkJNVU1zUlVGQmQwUkdMRkZCUVhoRUxFVkJRV3RGTzBGQlEyaEZMRTFCUVVrc1EwRkJRMEVzVVVGQlRDeEZRVUZsTzBGQlEySnVSU3hYUVVGUE1rWXNWVUZCVlc1SExGTkJRVllzU1VGQmRVSnRSeXhWUVVGVkxFbEJRWGhETEVWQlFUaERMR1ZCUVRsRE8wRkJRMEV6Uml4WFFVRlBMRTlCUVU5eFJTeFpRVUZRTEV0QlFYZENMRk5CUVM5Q0xFVkJRVEJETERKQ1FVRXhRenRCUVVOQmNrVXNWMEZCVDA4c1YwRkJWMllzVTBGQldDeEpRVUYzUW1Vc1YwRkJWeXhKUVVFeFF5eEZRVUZuUkN4blFrRkJhRVE3UVVGRFFWQXNWMEZCVDA4c1UwRkJVeXhEUVVGVUxFZEJRV0V6UXl4SlFVRkpXU3hOUVVGNFFpeEZRVUZuUXl4elEwRkJhRU03UVVGRFFYRkpMR2xDUVVGaGJFSXNTMEZCWWl4RlFVRnZRaXh6UWtGQmNFSXNSVUZCTkVNc1EwRkJReXh6UWtGQk4wTTdRVUZEUkRzN1FVRkZSQ3hOUVVGSk5VTXNUVUZCVFc1R0xFbEJRVWxaTEUxQlFXUTdRVUZEUVN4TlFVRkpLMElzVlVGQlZYZERMRWRCUVdRc1JVRkRSVHM3UVVGRlJqRkdMRlZCUVZFNFFpeExRVUZTTEVOQlFXTjJRaXhIUVVGa0xFVkJRVzFDSzBnc1MwRkJia0lzUlVGQk1FSndSaXhOUVVFeFFpeEZRVUZyUXpoRUxGbEJRV3hETEVWQlFXZEVMRVZCUVdoRUxFVkJRVzlFTEVOQlFYQkVPMEZCUTBRN08wRkJSVVE1Unl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW5GR0xGbEJRV3BDTEVkQlFXZERMRlZCUVZWdVFpeExRVUZXTEVWQlFXbENjRVlzVFVGQmFrSXNSVUZCZVVJMFJDeFJRVUY2UWl4RlFVRnRRenRCUVVOcVJYbERMR05CUVZrc1NVRkJXaXhGUVVGclFtcENMRXRCUVd4Q0xFVkJRWGxDY0VZc1RVRkJla0lzUlVGQmFVTXNTVUZCYWtNc1JVRkJkVU0wUkN4UlFVRjJRenRCUVVORUxFTkJSa1E3TzBGQlNVRTFSeXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRbk5HTEZsQlFXcENMRWRCUVdkRExGVkJRVlZ3UWl4TFFVRldMRVZCUVdsQ2NFWXNUVUZCYWtJc1JVRkJlVUkwUkN4UlFVRjZRaXhGUVVGdFF6dEJRVU5xUlhsRExHTkJRVmtzU1VGQldpeEZRVUZyUW1wQ0xFdEJRV3hDTEVWQlFYbENjRVlzVFVGQmVrSXNSVUZCYVVNc1MwRkJha01zUlVGQmQwTTBSQ3hSUVVGNFF6dEJRVU5FTEVOQlJrUTdPMEZCU1VFc1UwRkJVelpETEZsQlFWUXNRMEZCZFVKd1NpeEhRVUYyUWl4RlFVRTBRaXRJTEV0QlFUVkNMRVZCUVcxRGNFWXNUVUZCYmtNc1JVRkJNa000UkN4WlFVRXpReXhGUVVGNVJFWXNVVUZCZWtRc1JVRkJiVVU3UVVGRGFrVXNUVUZCU1N4RFFVRkRRU3hSUVVGTUxFVkJRV1U3UVVGRFltNUZMRmRCUVU4eVJpeFZRVUZWYmtjc1UwRkJWaXhKUVVGMVFtMUhMRlZCUVZVc1NVRkJlRU1zUlVGQk9FTXNaVUZCT1VNN1FVRkRRVE5HTEZkQlFVOHNUMEZCVDNGRkxGbEJRVkFzUzBGQmQwSXNVMEZCTDBJc1JVRkJNRU1zTWtKQlFURkRPMEZCUTBGeVJTeFhRVUZQVHl4WFFVRlhaaXhUUVVGWUxFbEJRWGRDWlN4WFFVRlhMRWxCUVRGRExFVkJRV2RFTEdkQ1FVRm9SRHRCUVVOQlVDeFhRVUZQVHl4VFFVRlRMRU5CUVZRc1IwRkJZVE5ETEVsQlFVbFpMRTFCUVhoQ0xFVkJRMGtzYzBOQlJFbzdRVUZGUVhGSkxHbENRVUZoYkVJc1MwRkJZaXhGUVVGdlFpeDFRa0ZCY0VJc1JVRkJOa01zUTBGQlF5eDFRa0ZCT1VNN1FVRkRSRHM3UVVGRlJDeE5RVUZKTlVNc1RVRkJUVzVHTEVsQlFVbFpMRTFCUVdRN1FVRkRRU3hOUVVGSkswSXNWVUZCVlhkRExFZEJRV1FzUlVGRFJUczdRVUZGUmpGR0xGVkJRVkU0UWl4TFFVRlNMRU5CUVdOMlFpeEhRVUZrTEVWQlFXMUNLMGdzUzBGQmJrSXNSVUZCTUVKd1JpeE5RVUV4UWl4RlFVRnJRemhFTEZsQlFXeERMRVZCUVdkRUxFVkJRV2hFTEVWQlFXOUVMRU5CUVhCRU8wRkJRMFE3TzBGQlJVUTVSeXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRbmRHTEdGQlFXcENMRWRCUVdsRExGVkJRVlYwUWl4TFFVRldMRVZCUVdsQ2NFWXNUVUZCYWtJc1JVRkJlVUkwUkN4UlFVRjZRaXhGUVVGdFF6dEJRVU5zUlRaRExHVkJRV0VzU1VGQllpeEZRVUZ0UW5KQ0xFdEJRVzVDTEVWQlFUQkNjRVlzVFVGQk1VSXNSVUZCYTBNc1NVRkJiRU1zUlVGQmQwTTBSQ3hSUVVGNFF6dEJRVU5FTEVOQlJrUTdPMEZCU1VFMVJ5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFubEdMR0ZCUVdwQ0xFZEJRV2xETEZWQlFWVjJRaXhMUVVGV0xFVkJRV2xDY0VZc1RVRkJha0lzUlVGQmVVSTBSQ3hSUVVGNlFpeEZRVUZ0UXp0QlFVTnNSVFpETEdWQlFXRXNTVUZCWWl4RlFVRnRRbkpDTEV0QlFXNUNMRVZCUVRCQ2NFWXNUVUZCTVVJc1JVRkJhME1zUzBGQmJFTXNSVUZCZVVNMFJDeFJRVUY2UXp0QlFVTkVMRU5CUmtRN08wRkJTVUU3UVVGRFFUVkhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENNRVlzU1VGQmFrSXNSMEZCZDBJc1ZVRkJWWGhDTEV0QlFWWXNSVUZCYVVJNVJDeExRVUZxUWl4RlFVRjNRa01zUjBGQmVFSXNSVUZCTmtJN1FVRkRia1FzVFVGQlNTeERRVUZETmtRc1MwRkJUQ3hGUVVGWlFTeFJRVUZSTEVOQlFWSTdRVUZEV2l4TlFVRkpMRU5CUVVNNVJDeExRVUZNTEVWQlFWbEJMRkZCUVZFc1EwRkJVanRCUVVOYUxFMUJRVWtzUTBGQlEwTXNSMEZCVEN4RlFVRlZRU3hOUVVGTkxFdEJRVXQwUkN4TlFVRllPenRCUVVWV0xFMUJRVWtzVDBGQlQyMUlMRXRCUVZBc1MwRkJhVUlzVVVGQmNrSXNSVUZCSzBJN1FVRkROMEpCTEZsQlFWRkJMRTFCUVUxNVFpeFZRVUZPTEVOQlFXbENMRU5CUVdwQ0xFTkJRVkk3UVVGRFJEczdRVUZGUkhCSUxGTkJRVThzVDBGQlR6SkdMRXRCUVZBc1MwRkJhVUlzVVVGQmFrSXNTVUZCTmtJc1EwRkJRemRGTEUxQlFVMDJSU3hMUVVGT0xFTkJRWEpETEVWQlFXMUVMSFZDUVVGdVJEdEJRVU5CTTBZc1UwRkJUemhDTEU5QlFVOUVMRXRCUVdRc1JVRkJjVUk3TzBGQlJYSkNPMEZCUmtFc1NVRkhRU3hKUVVGSlF5eFJRVUZSUkN4TFFVRmFMRVZCUVcxQ08wRkJRMjVDTEUxQlFVa3NTMEZCUzNKRUxFMUJRVXdzUzBGQlowSXNRMEZCY0VJc1JVRkJkVUk3TzBGQlJYWkNkMElzVTBGQlR6WkNMRk5CUVZNc1EwRkJWQ3hKUVVGalFTeFJRVUZSTEV0QlFVdHlSQ3hOUVVGc1F5eEZRVUV3UXl4eFFrRkJNVU03UVVGRFFYZENMRk5CUVU4NFFpeFBRVUZQTEVOQlFWQXNTVUZCV1VFc1QwRkJUeXhMUVVGTGRFUXNUVUZCTDBJc1JVRkJkVU1zYlVKQlFYWkRPenRCUVVWQkxFOUJRVXNzU1VGQlNVMHNTVUZCU1N0RExFdEJRV0lzUlVGQmIwSXZReXhKUVVGSlowUXNSMEZCZUVJc1JVRkJOa0pvUkN4SFFVRTNRaXhGUVVGclF6dEJRVU5vUXl4VFFVRkxRU3hEUVVGTUxFbEJRVlUyUnl4TFFVRldPMEZCUTBRN1FVRkRSaXhEUVhSQ1JEczdRVUYzUWtGd1NTeFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFqUkdMRTlCUVdwQ0xFZEJRVEpDTEZsQlFWazdRVUZEY2tNc1RVRkJTVGxFTEUxQlFVMHNSVUZCVmp0QlFVTkJMRTFCUVVsU0xFMUJRVTBzUzBGQlMzWkZMRTFCUVdZN1FVRkRRU3hQUVVGTExFbEJRVWxOTEVsQlFVa3NRMEZCWWl4RlFVRm5Ra0VzU1VGQlNXbEZMRWRCUVhCQ0xFVkJRWGxDYWtVc1IwRkJla0lzUlVGQk9FSTdRVUZETlVKNVJTeFJRVUZKZWtVc1EwRkJTaXhKUVVGVE1FVXNUVUZCVFN4TFFVRkxNVVVzUTBGQlRDeERRVUZPTEVOQlFWUTdRVUZEUVN4UlFVRkpRU3hOUVVGTmVFSXNVVUZCVVVjc2FVSkJRV3hDTEVWQlFYRkRPMEZCUTI1RE9FWXNWVUZCU1hwRkxFbEJRVWtzUTBGQlVpeEpRVUZoTEV0QlFXSTdRVUZEUVR0QlFVTkVPMEZCUTBZN1FVRkRSQ3hUUVVGUExHRkJRV0Y1UlN4SlFVRkpLMFFzU1VGQlNpeERRVUZUTEVkQlFWUXNRMEZCWWl4SFFVRTJRaXhIUVVGd1F6dEJRVU5FTEVOQldFUTdPMEZCWVVFN096czdRVUZKUVM5S0xFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ09FWXNZVUZCYWtJc1IwRkJhVU1zV1VGQldUdEJRVU16UXl4TlFVRkpMRTlCUVU5NFNpeFZRVUZRTEV0QlFYTkNMRmRCUVRGQ0xFVkJRWFZETzBGQlEzSkRMRkZCUVVsU0xFOUJRVTlKTEdWQlFWZ3NSVUZCTkVJN1FVRkRNVUlzWVVGQlVTeEpRVUZKU2l4TlFVRktMRU5CUVZjc1NVRkJXQ3hEUVVGRUxFTkJRVzFDYVVzc1RVRkJNVUk3UVVGRFJDeExRVVpFTEUxQlJVODdRVUZEVEN4VlFVRkpOVW9zVFVGQlRTeEpRVUZKUnl4VlFVRktMRU5CUVdVc1MwRkJTMU1zVFVGQmNFSXNRMEZCVmp0QlFVTkJMRmRCUVVzc1NVRkJTVTBzU1VGQlNTeERRVUZTTEVWQlFWZHBSU3hOUVVGTmJrWXNTVUZCU1Zrc1RVRkJNVUlzUlVGQmEwTk5MRWxCUVVscFJTeEhRVUYwUXl4RlFVRXlRMnBGTEV0QlFVc3NRMEZCYUVRN1FVRkRSV3hDTEZsQlFVbHJRaXhEUVVGS0xFbEJRVk1zUzBGQlMwRXNRMEZCVEN4RFFVRlVPMEZCUkVZc1QwRkZRU3hQUVVGUGJFSXNTVUZCU1RSS0xFMUJRVmc3UVVGRFJEdEJRVU5HTEVkQlZFUXNUVUZUVHp0QlFVTk1MRlZCUVUwc1NVRkJTVGRKTEV0QlFVb3NRMEZCVlN4dlJFRkJWaXhEUVVGT08wRkJRMFE3UVVGRFJpeERRV0pFT3p0QlFXVkJPMEZCUTBFN08wRkJSVUVzVTBGQlUwb3NWVUZCVkN4RFFVRnhRbXRDTEVkQlFYSkNMRVZCUVRCQ08wRkJRM2hDTEUxQlFVbEJMRWxCUVVsblNTeEpRVUZTTEVWQlFXTXNUMEZCVDJoSkxFbEJRVWxuU1N4SlFVRktMRVZCUVZBN1FVRkRaQ3hUUVVGUGFFa3NTVUZCU1dsSkxFOUJRVW9zUTBGQldTeFpRVUZhTEVWQlFUQkNMRVZCUVRGQ0xFTkJRVkE3UVVGRFJEczdRVUZGUkN4SlFVRkpReXhMUVVGTGNFc3NUMEZCVDJ0RkxGTkJRV2hDT3p0QlFVVkJPenM3UVVGSFFXeEZMRTlCUVU5eFFpeFJRVUZRTEVkQlFXdENMRlZCUVZWa0xFZEJRVllzUlVGQlpUdEJRVU12UWtFc1RVRkJTV1VzVTBGQlNpeEhRVUZuUWl4SlFVRm9RanM3UVVGRlFUdEJRVU5CWml4TlFVRkpPRW9zU1VGQlNpeEhRVUZYT1Vvc1NVRkJTU3RHTEVkQlFXWTdRVUZEUVM5R0xFMUJRVWxwUWl4SlFVRktMRWRCUVZkcVFpeEpRVUZKYTBjc1IwRkJaanM3UVVGRlFUdEJRVU5CYkVjc1RVRkJTU3RHTEVkQlFVb3NSMEZCVlRoRUxFZEJRVWM1UkN4SFFVRmlPMEZCUTBFdlJpeE5RVUZKYTBjc1IwRkJTaXhIUVVGVk1rUXNSMEZCUnpORUxFZEJRV0k3TzBGQlJVRnNSeXhOUVVGSmNVSXNTMEZCU2l4SFFVRlpkMGtzUjBGQlIzaEpMRXRCUVdZN1FVRkRRWEpDTEUxQlFVazRSQ3hSUVVGS0xFZEJRV1VyUml4SFFVRkhMMFlzVVVGQmJFSTdRVUZEUVRsRUxFMUJRVWtyU2l4alFVRktMRWRCUVhGQ1JpeEhRVUZITDBZc1VVRkJlRUk3UVVGRFFUbEVMRTFCUVVsM1JTeE5RVUZLTEVkQlFXRnhSaXhIUVVGSGNrWXNUVUZCYUVJN1FVRkRRWGhGTEUxQlFVbHpReXhKUVVGS0xFZEJRVmQxU0N4SFFVRkhka2dzU1VGQlpEdEJRVU5CZEVNc1RVRkJTVEpGTEV0QlFVb3NSMEZCV1d0R0xFZEJRVWRzUml4TFFVRm1PMEZCUTBFelJTeE5RVUZKYjBJc1UwRkJTaXhIUVVGblFubEpMRWRCUVVkNlNTeFRRVUZ1UWp0QlFVTkJjRUlzVFVGQlNYbEhMRmxCUVVvc1IwRkJiVUp2UkN4SFFVRkhjRVFzV1VGQmRFSTdRVUZEUVhwSExFMUJRVWt3Unl4WlFVRktMRWRCUVcxQ2JVUXNSMEZCUjI1RUxGbEJRWFJDTzBGQlEwRXhSeXhOUVVGSk5FY3NXVUZCU2l4SFFVRnRRbWxFTEVkQlFVZHFSQ3haUVVGMFFqdEJRVU5CTlVjc1RVRkJTVFpITEZsQlFVb3NSMEZCYlVKblJDeEhRVUZIYUVRc1dVRkJkRUk3UVVGRFFUZEhMRTFCUVVrNFJ5eFJRVUZLTEVkQlFXVXJReXhIUVVGSEwwTXNVVUZCYkVJN1FVRkRRVGxITEUxQlFVbHBTQ3hYUVVGS0xFZEJRV3RDTkVNc1IwRkJSelZETEZkQlFYSkNPMEZCUTBGcVNDeE5RVUZKYTBnc1YwRkJTaXhIUVVGclFqSkRMRWRCUVVjelF5eFhRVUZ5UWp0QlFVTkJiRWdzVFVGQlNXOUlMRmRCUVVvc1IwRkJhMEo1UXl4SFFVRkhla01zVjBGQmNrSTdRVUZEUVhCSUxFMUJRVWx4U0N4WFFVRktMRWRCUVd0Q2QwTXNSMEZCUjNoRExGZEJRWEpDTzBGQlEwRnlTQ3hOUVVGSmQwZ3NWMEZCU2l4SFFVRnJRbkZETEVkQlFVZHlReXhYUVVGeVFqdEJRVU5CZUVnc1RVRkJTWGxJTEZkQlFVb3NSMEZCYTBKdlF5eEhRVUZIY0VNc1YwRkJja0k3UVVGRFFYcElMRTFCUVVreVNDeFpRVUZLTEVkQlFXMUNhME1zUjBGQlIyeERMRmxCUVhSQ08wRkJRMEV6U0N4TlFVRkpORWdzV1VGQlNpeEhRVUZ0UW1sRExFZEJRVWRxUXl4WlFVRjBRanRCUVVOQk5VZ3NUVUZCU1c5SExGVkJRVW9zUjBGQmFVSjVSQ3hIUVVGSGVrUXNWVUZCY0VJN1FVRkRRWEJITEUxQlFVbHBTU3hoUVVGS0xFZEJRVzlDTkVJc1IwRkJSelZDTEdGQlFYWkNPMEZCUTBGcVNTeE5RVUZKYTBrc1lVRkJTaXhIUVVGdlFqSkNMRWRCUVVjelFpeGhRVUYyUWp0QlFVTkJiRWtzVFVGQlNXOUpMR0ZCUVVvc1IwRkJiMEo1UWl4SFFVRkhla0lzWVVGQmRrSTdRVUZEUVhCSkxFMUJRVWx4U1N4aFFVRktMRWRCUVc5Q2QwSXNSMEZCUjNoQ0xHRkJRWFpDTzBGQlEwRnlTU3hOUVVGSmMwa3NVMEZCU2l4SFFVRm5RblZDTEVkQlFVZDJRaXhUUVVGdVFqdEJRVU5CZEVrc1RVRkJTWGxKTEZsQlFVb3NSMEZCYlVKdlFpeEhRVUZIY0VJc1dVRkJkRUk3UVVGRFFYcEpMRTFCUVVrd1NTeFpRVUZLTEVkQlFXMUNiVUlzUjBGQlIyNUNMRmxCUVhSQ08wRkJRMEV4U1N4TlFVRkpORWtzV1VGQlNpeEhRVUZ0UW1sQ0xFZEJRVWRxUWl4WlFVRjBRanRCUVVOQk5Va3NUVUZCU1RaSkxGbEJRVW9zUjBGQmJVSm5RaXhIUVVGSGFFSXNXVUZCZEVJN1FVRkRRVGRKTEUxQlFVbG5TaXhaUVVGS0xFZEJRVzFDWVN4SFFVRkhZaXhaUVVGMFFqdEJRVU5CYUVvc1RVRkJTV2xLTEZsQlFVb3NSMEZCYlVKWkxFZEJRVWRhTEZsQlFYUkNPMEZCUTBGcVNpeE5RVUZKYlVvc1lVRkJTaXhIUVVGdlFsVXNSMEZCUjFZc1lVRkJka0k3UVVGRFFXNUtMRTFCUVVsdlNpeGhRVUZLTEVkQlFXOUNVeXhIUVVGSFZDeGhRVUYyUWp0QlFVTkJjRW9zVFVGQlNYRktMRWxCUVVvc1IwRkJWMUVzUjBGQlIxSXNTVUZCWkR0QlFVTkJja29zVFVGQlNYVktMRTlCUVVvc1IwRkJZMDBzUjBGQlIwNHNUMEZCYWtJN1FVRkRRWFpLTEUxQlFVbDVTaXhoUVVGS0xFZEJRVzlDU1N4SFFVRkhTaXhoUVVGMlFqczdRVUZGUVN4VFFVRlBla29zUjBGQlVEdEJRVU5FTEVOQmJFUkVPenRCUVc5RVFUdEJRVU5CTEZOQlFWTTBSaXhMUVVGVUxFTkJRV2RDYjBVc1MwRkJhRUlzUlVGQmRVSXZSU3hIUVVGMlFpeEZRVUUwUW1kR0xGbEJRVFZDTEVWQlFUQkRPMEZCUTNoRExFMUJRVWtzVDBGQlQwUXNTMEZCVUN4TFFVRnBRaXhSUVVGeVFpeEZRVUVyUWl4UFFVRlBReXhaUVVGUU8wRkJReTlDUkN4VlFVRlJMRU5CUVVNc1EwRkJRMEVzUzBGQlZpeERRVVozUXl4RFFVVjBRanRCUVVOc1FpeE5RVUZKUVN4VFFVRlRMMFVzUjBGQllpeEZRVUZyUWl4UFFVRlBRU3hIUVVGUU8wRkJRMnhDTEUxQlFVa3JSU3hUUVVGVExFTkJRV0lzUlVGQlowSXNUMEZCVDBFc1MwRkJVRHRCUVVOb1FrRXNWMEZCVXk5RkxFZEJRVlE3UVVGRFFTeE5RVUZKSzBVc1UwRkJVeXhEUVVGaUxFVkJRV2RDTEU5QlFVOUJMRXRCUVZBN1FVRkRhRUlzVTBGQlR5eERRVUZRTzBGQlEwUTdPMEZCUlVRc1UwRkJVM0pLTEUxQlFWUXNRMEZCYVVKRUxFMUJRV3BDTEVWQlFYbENPMEZCUTNaQ08wRkJRMEU3UVVGRFFUdEJRVU5CUVN4WFFVRlRMRU5CUVVNc1EwRkJRekpGTEV0QlFVczJSU3hKUVVGTUxFTkJRVlVzUTBGQlEzaEtMRTFCUVZnc1EwRkJXRHRCUVVOQkxGTkJRVTlCTEZOQlFWTXNRMEZCVkN4SFFVRmhMRU5CUVdJc1IwRkJhVUpCTEUxQlFYaENPMEZCUTBRN08wRkJSVVFzVTBGQlUzbENMRTlCUVZRc1EwRkJhMEk1UWl4UFFVRnNRaXhGUVVFeVFqdEJRVU42UWl4VFFVRlBMRU5CUVVOeFJTeE5RVUZOZGtNc1QwRkJUaXhKUVVGcFFpeFZRVUZWT1VJc1QwRkJWaXhGUVVGdFFqdEJRVU14UXl4WFFVRlBPRW9zVDBGQlQzaEhMRk5CUVZBc1EwRkJhVUpITEZGQlFXcENMRU5CUVRCQ1l5eEpRVUV4UWl4RFFVRXJRblpGTEU5QlFTOUNMRTFCUVRSRExHZENRVUZ1UkR0QlFVTkVMRWRCUmswc1JVRkZTa0VzVDBGR1NTeERRVUZRTzBGQlIwUTdPMEZCUlVRc1UwRkJVMkVzVlVGQlZDeERRVUZ4UW1Jc1QwRkJja0lzUlVGQk9FSTdRVUZETlVJc1UwRkJUemhDTEZGQlFWRTVRaXhQUVVGU0xFdEJRVzlDV2l4UFFVRlBNRUlzVVVGQlVDeERRVUZuUW1Rc1QwRkJhRUlzUTBGQmNFSXNTVUZEU0VFc1YwRkJWeXhSUVVGUFFTeFBRVUZRTEhsRFFVRlBRU3hQUVVGUUxFOUJRVzFDTEZGQlFUbENMRWxCUTBFc1QwRkJUMEVzVVVGQlVVc3NUVUZCWml4TFFVRXdRaXhSUVVZNVFqdEJRVWRFT3p0QlFVVkVMRk5CUVZOblJpeExRVUZVTEVOQlFXZENNRVVzUTBGQmFFSXNSVUZCYlVJN1FVRkRha0lzVFVGQlNVRXNTVUZCU1N4RlFVRlNMRVZCUVZrc1QwRkJUeXhOUVVGTlFTeEZRVUZGZEVjc1VVRkJSaXhEUVVGWExFVkJRVmdzUTBGQllqdEJRVU5hTEZOQlFVOXpSeXhGUVVGRmRFY3NVVUZCUml4RFFVRlhMRVZCUVZnc1EwRkJVRHRCUVVORU96dEJRVVZFTEZOQlFWTnFReXhYUVVGVUxFTkJRWE5DUml4SFFVRjBRaXhGUVVFeVFqdEJRVU42UWl4TlFVRkpNRWtzV1VGQldTeEZRVUZvUWp0QlFVTkJMRTlCUVVzc1NVRkJTWEpLTEVsQlFVa3NRMEZCWWl4RlFVRm5Ra0VzU1VGQlNWY3NTVUZCU1dwQ0xFMUJRWGhDTEVWQlFXZERUU3hIUVVGb1F5eEZRVUZ4UXp0QlFVTnVReXhSUVVGSlV5eEpRVUZKUlN4SlFVRkpNa2dzVlVGQlNpeERRVUZsZEVrc1EwRkJaaXhEUVVGU08wRkJRMEVzVVVGQlNWTXNTMEZCU3l4SlFVRlVMRVZCUTBVMFNTeFZRVUZWUXl4SlFVRldMRU5CUVdVelNTeEpRVUZKTWtnc1ZVRkJTaXhEUVVGbGRFa3NRMEZCWml4RFFVRm1MRVZCUkVZc1MwRkZTenRCUVVOSUxGVkJRVWtyUXl4UlFVRlJMME1zUTBGQldqdEJRVU5CTEZWQlFVbFRMRXRCUVVzc1RVRkJUQ3hKUVVGbFFTeExRVUZMTEUxQlFYaENMRVZCUVdkRFZEdEJRVU5vUXl4VlFVRkpkVW9zU1VGQlNVTXNiVUpCUVcxQ04wa3NTVUZCU1dkRUxFdEJRVW9zUTBGQlZWb3NTMEZCVml4RlFVRnBRaTlETEVsQlFVVXNRMEZCYmtJc1EwRkJia0lzUlVGQk1FTXJRaXhOUVVFeFF5eERRVUZwUkN4RFFVRnFSQ3hGUVVGdlJEQklMRXRCUVhCRUxFTkJRVEJFTEVkQlFURkVMRU5CUVZJN1FVRkRRU3hYUVVGTExFbEJRVWw2UXl4SlFVRkpMRU5CUVdJc1JVRkJaMEpCTEVsQlFVbDFReXhGUVVGRk4wb3NUVUZCZEVJc1JVRkJPRUp6U0N4SFFVRTVRanRCUVVORmNVTXNhMEpCUVZWRExFbEJRVllzUTBGQlpYaElMRk5CUVZONVNDeEZRVUZGZGtNc1EwRkJSaXhEUVVGVUxFVkJRV1VzUlVGQlppeERRVUZtTzBGQlJFWTdRVUZGUkR0QlFVTkdPMEZCUTBRc1UwRkJUM0ZETEZOQlFWQTdRVUZEUkRzN1FVRkZSQ3hUUVVGVEwwY3NXVUZCVkN4RFFVRjFRak5DTEVkQlFYWkNMRVZCUVRSQ08wRkJRekZDTEUxQlFVa3dTU3haUVVGWkxFVkJRV2hDTzBGQlEwRXNUMEZCU3l4SlFVRkpja29zU1VGQlNTeERRVUZpTEVWQlFXZENRU3hKUVVGSlZ5eEpRVUZKYWtJc1RVRkJlRUlzUlVGQlowTk5MRWRCUVdoRExFVkJRWEZETzBGQlEyNURPMEZCUTBGeFNpeGpRVUZWUXl4SlFVRldMRU5CUVdVelNTeEpRVUZKTWtnc1ZVRkJTaXhEUVVGbGRFa3NRMEZCWml4SlFVRnZRaXhKUVVGdVF6dEJRVU5FTzBGQlEwUXNVMEZCVDNGS0xGTkJRVkE3UVVGRFJEczdRVUZGUkN4VFFVRlRNMGNzWTBGQlZDeERRVUY1UWk5Q0xFZEJRWHBDTEVWQlFUaENPMEZCUXpWQ0xFMUJRVWtyU1N4RFFVRktMRVZCUVU5RExFVkJRVkFzUlVGQlYwTXNSVUZCV0R0QlFVTkJMRTFCUVVsUUxGbEJRVmtzUlVGQmFFSTdRVUZEUVN4UFFVRkxMRWxCUVVseVNpeEpRVUZKTEVOQlFXSXNSVUZCWjBKQkxFbEJRVWxYTEVsQlFVbHFRaXhOUVVGNFFpeEZRVUZuUTAwc1IwRkJhRU1zUlVGQmNVTTdRVUZEYmtNd1NpeFJRVUZKTDBrc1NVRkJTVEpJTEZWQlFVb3NRMEZCWlhSSkxFTkJRV1lzUTBGQlNqdEJRVU5CTWtvc1UwRkJTMFFzUzBGQlN5eERRVUZXTzBGQlEwRkZMRk5CUVV0R0xFbEJRVWtzUjBGQlZEdEJRVU5CVEN4alFVRlZReXhKUVVGV0xFTkJRV1ZOTEVWQlFXWTdRVUZEUVZBc1kwRkJWVU1zU1VGQlZpeERRVUZsU3l4RlFVRm1PMEZCUTBRN08wRkJSVVFzVTBGQlQwNHNVMEZCVUR0QlFVTkVPenRCUVVWRUxGTkJRVk4yU1N4aFFVRlVMRU5CUVhkQ1NDeEhRVUY0UWl4RlFVRTJRanRCUVVNelFpeFRRVUZQZEVNc1QwRkJUM2RNTEZkQlFWQXNRMEZCYlVKc1NpeEhRVUZ1UWl4RFFVRlFPMEZCUTBRN08wRkJSVVFzVTBGQlUzbENMRlZCUVZRc1EwRkJjVUl3U0N4SFFVRnlRaXhGUVVFd1FrTXNSMEZCTVVJc1JVRkJLMEowU1N4TlFVRXZRaXhGUVVGMVF5OUNMRTFCUVhaRExFVkJRU3RETzBGQlF6ZERMRTFCUVVrd1FpeEhRVUZLTzBGQlEwRXNUMEZCU3l4SlFVRkpjRUlzU1VGQlNTeERRVUZpTEVWQlFXZENRU3hKUVVGSlRpeE5RVUZ3UWl4RlFVRTBRazBzUjBGQk5VSXNSVUZCYVVNN1FVRkRMMElzVVVGQlMwRXNTVUZCU1hsQ0xFMUJRVW9zU1VGQlkzTkpMRWxCUVVseVN5eE5RVUZ1UWl4SlFVRXJRazBzUzBGQlN6aEtMRWxCUVVsd1N5eE5RVUUxUXl4RlFVTkZPMEZCUTBaeFN5eFJRVUZKTDBvc1NVRkJTWGxDTEUxQlFWSXNTVUZCYTBKeFNTeEpRVUZKT1Vvc1EwRkJTaXhEUVVGc1FqdEJRVU5FTzBGQlEwUXNVMEZCVDBFc1EwRkJVRHRCUVVORU96dEJRVVZFTEZOQlFWTjFSU3hqUVVGVUxFTkJRWGxDTlVRc1IwRkJla0lzUlVGQk9FSTdRVUZETlVJc1RVRkJTVHRCUVVOR0xGZEJRVTl4U2l4dFFrRkJiVUp5U2l4SFFVRnVRaXhEUVVGUU8wRkJRMFFzUjBGR1JDeERRVVZGTEU5QlFVOXpTaXhIUVVGUUxFVkJRVms3UVVGRFdpeFhRVUZQTVVvc1QwRkJUMmxGTEZsQlFWQXNRMEZCYjBJc1RVRkJjRUlzUTBGQk5FSTdRVUZCTlVJc1MwRkJVRHRCUVVORU8wRkJRMFk3TzBGQlJVUTdPenM3TzBGQlMwRXNVMEZCVTNORExGTkJRVlFzUTBGQmIwSkVMRXRCUVhCQ0xFVkJRVEpDY1VRc1IwRkJNMElzUlVGQlowTTdRVUZET1VKb1NpeFRRVUZQTEU5QlFVOHlSaXhMUVVGUUxFdEJRV2xDTEZGQlFYaENMRVZCUVd0RExIVkRRVUZzUXp0QlFVTkJNMFlzVTBGQlR6SkdMRk5CUVZNc1EwRkJhRUlzUlVGQmJVSXNNRVJCUVc1Q08wRkJRMEV6Uml4VFFVRlBNa1lzVTBGQlUzRkVMRWRCUVdoQ0xFVkJRWEZDTERaRFFVRnlRanRCUVVOQmFFb3NVMEZCVDIxRUxFdEJRVXM0Uml4TFFVRk1MRU5CUVZkMFJDeExRVUZZTEUxQlFYTkNRU3hMUVVFM1FpeEZRVUZ2UXl4clEwRkJjRU03UVVGRFJEczdRVUZGUkN4VFFVRlRWU3hUUVVGVUxFTkJRVzlDVml4TFFVRndRaXhGUVVFeVFuRkVMRWRCUVROQ0xFVkJRV2RETlVZc1IwRkJhRU1zUlVGQmNVTTdRVUZEYmtOd1JDeFRRVUZQTEU5QlFVOHlSaXhMUVVGUUxFdEJRV2xDTEZGQlFYaENMRVZCUVd0RExIVkRRVUZzUXp0QlFVTkJNMFlzVTBGQlR6SkdMRk5CUVZOeFJDeEhRVUZvUWl4RlFVRnhRaXg1UTBGQmNrSTdRVUZEUVdoS0xGTkJRVTh5Uml4VFFVRlRka01zUjBGQmFFSXNSVUZCY1VJc01FTkJRWEpDTzBGQlEwRndSQ3hUUVVGUGJVUXNTMEZCU3poR0xFdEJRVXdzUTBGQlYzUkVMRXRCUVZnc1RVRkJjMEpCTEV0QlFUZENMRVZCUVc5RExHdERRVUZ3UXp0QlFVTkVPenRCUVVWRUxGTkJRVk5yUWl4WlFVRlVMRU5CUVhWQ2JFSXNTMEZCZGtJc1JVRkJPRUp4UkN4SFFVRTVRaXhGUVVGdFF6VkdMRWRCUVc1RExFVkJRWGRETzBGQlEzUkRjRVFzVTBGQlR5eFBRVUZQTWtZc1MwRkJVQ3hMUVVGcFFpeFJRVUY0UWl4RlFVRnJReXgxUTBGQmJFTTdRVUZEUVROR0xGTkJRVTh5Uml4VFFVRlRjVVFzUjBGQmFFSXNSVUZCY1VJc2VVTkJRWEpDTzBGQlEwRm9TaXhUUVVGUE1rWXNVMEZCVTNaRExFZEJRV2hDTEVWQlFYRkNMREJEUVVGeVFqdEJRVU5FT3p0QlFVVkVMRk5CUVZOd1JDeE5RVUZVTEVOQlFXbENhMG9zU1VGQmFrSXNSVUZCZFVKRExFOUJRWFpDTEVWQlFXZERPMEZCUXpsQ0xFMUJRVWtzUTBGQlEwUXNTVUZCVEN4RlFVRlhMRTFCUVUwc1NVRkJTWFpMTEV0QlFVb3NRMEZCVlhkTExGZEJRVmNzYTBKQlFYSkNMRU5CUVU0N1FVRkRXaUlzSW1acGJHVWlPaUpwYm1SbGVDNXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWk4cUlWeHVJQ29nVkdobElHSjFabVpsY2lCdGIyUjFiR1VnWm5KdmJTQnViMlJsTG1wekxDQm1iM0lnZEdobElHSnliM2R6WlhJdVhHNGdLbHh1SUNvZ1FHRjFkR2h2Y2lBZ0lFWmxjbTl6Y3lCQlltOTFhMmhoWkdscVpXZ2dQR1psY205emMwQm1aWEp2YzNNdWIzSm5QaUE4YUhSMGNEb3ZMMlpsY205emN5NXZjbWMrWEc0Z0tpQkFiR2xqWlc1elpTQWdUVWxVWEc0Z0tpOWNibHh1ZG1GeUlHSmhjMlUyTkNBOUlISmxjWFZwY21Vb0oySmhjMlUyTkMxcWN5Y3BYRzUyWVhJZ2FXVmxaVGMxTkNBOUlISmxjWFZwY21Vb0oybGxaV1UzTlRRbktWeHVYRzVsZUhCdmNuUnpMa0oxWm1abGNpQTlJRUoxWm1abGNseHVaWGh3YjNKMGN5NVRiRzkzUW5WbVptVnlJRDBnUW5WbVptVnlYRzVsZUhCdmNuUnpMa2xPVTFCRlExUmZUVUZZWDBKWlZFVlRJRDBnTlRCY2JrSjFabVpsY2k1d2IyOXNVMmw2WlNBOUlEZ3hPVEpjYmx4dUx5b3FYRzRnS2lCSlppQmdRblZtWm1WeUxsOTFjMlZVZVhCbFpFRnljbUY1YzJBNlhHNGdLaUFnSUQwOVBTQjBjblZsSUNBZ0lGVnpaU0JWYVc1ME9FRnljbUY1SUdsdGNHeGxiV1Z1ZEdGMGFXOXVJQ2htWVhOMFpYTjBLVnh1SUNvZ0lDQTlQVDBnWm1Gc2MyVWdJQ0JWYzJVZ1QySnFaV04wSUdsdGNHeGxiV1Z1ZEdGMGFXOXVJQ2hqYjIxd1lYUnBZbXhsSUdSdmQyNGdkRzhnU1VVMktWeHVJQ292WEc1Q2RXWm1aWEl1WDNWelpWUjVjR1ZrUVhKeVlYbHpJRDBnS0daMWJtTjBhVzl1SUNncElIdGNiaUFnTHk4Z1JHVjBaV04wSUdsbUlHSnliM2R6WlhJZ2MzVndjRzl5ZEhNZ1ZIbHdaV1FnUVhKeVlYbHpMaUJUZFhCd2IzSjBaV1FnWW5KdmQzTmxjbk1nWVhKbElFbEZJREV3S3l3Z1JtbHlaV1p2ZUNBMEt5eGNiaUFnTHk4Z1EyaHliMjFsSURjckxDQlRZV1poY21rZ05TNHhLeXdnVDNCbGNtRWdNVEV1Tmlzc0lHbFBVeUEwTGpJckxpQkpaaUIwYUdVZ1luSnZkM05sY2lCa2IyVnpJRzV2ZENCemRYQndiM0owSUdGa1pHbHVaMXh1SUNBdkx5QndjbTl3WlhKMGFXVnpJSFJ2SUdCVmFXNTBPRUZ5Y21GNVlDQnBibk4wWVc1alpYTXNJSFJvWlc0Z2RHaGhkQ2R6SUhSb1pTQnpZVzFsSUdGeklHNXZJR0JWYVc1ME9FRnljbUY1WUNCemRYQndiM0owWEc0Z0lDOHZJR0psWTJGMWMyVWdkMlVnYm1WbFpDQjBieUJpWlNCaFlteGxJSFJ2SUdGa1pDQmhiR3dnZEdobElHNXZaR1VnUW5WbVptVnlJRUZRU1NCdFpYUm9iMlJ6TGlCVWFHbHpJR2x6SUdGdUlHbHpjM1ZsWEc0Z0lDOHZJR2x1SUVacGNtVm1iM2dnTkMweU9TNGdUbTkzSUdacGVHVmtPaUJvZEhSd2N6b3ZMMkoxWjNwcGJHeGhMbTF2ZW1sc2JHRXViM0puTDNOb2IzZGZZblZuTG1ObmFUOXBaRDAyT1RVME16aGNiaUFnZEhKNUlIdGNiaUFnSUNCMllYSWdZblZtSUQwZ2JtVjNJRUZ5Y21GNVFuVm1abVZ5S0RBcFhHNGdJQ0FnZG1GeUlHRnljaUE5SUc1bGR5QlZhVzUwT0VGeWNtRjVLR0oxWmlsY2JpQWdJQ0JoY25JdVptOXZJRDBnWm5WdVkzUnBiMjRnS0NrZ2V5QnlaWFIxY200Z05ESWdmVnh1SUNBZ0lISmxkSFZ5YmlBME1pQTlQVDBnWVhKeUxtWnZieWdwSUNZbVhHNGdJQ0FnSUNBZ0lIUjVjR1Z2WmlCaGNuSXVjM1ZpWVhKeVlYa2dQVDA5SUNkbWRXNWpkR2x2YmljZ0x5OGdRMmh5YjIxbElEa3RNVEFnYkdGamF5QmdjM1ZpWVhKeVlYbGdYRzRnSUgwZ1kyRjBZMmdnS0dVcElIdGNiaUFnSUNCeVpYUjFjbTRnWm1Gc2MyVmNiaUFnZlZ4dWZTa29LVnh1WEc0dktpcGNiaUFxSUVOc1lYTnpPaUJDZFdabVpYSmNiaUFxSUQwOVBUMDlQVDA5UFQwOVBUMWNiaUFxWEc0Z0tpQlVhR1VnUW5WbVptVnlJR052Ym5OMGNuVmpkRzl5SUhKbGRIVnlibk1nYVc1emRHRnVZMlZ6SUc5bUlHQlZhVzUwT0VGeWNtRjVZQ0IwYUdGMElHRnlaU0JoZFdkdFpXNTBaV1JjYmlBcUlIZHBkR2dnWm5WdVkzUnBiMjRnY0hKdmNHVnlkR2xsY3lCbWIzSWdZV3hzSUhSb1pTQnViMlJsSUdCQ2RXWm1aWEpnSUVGUVNTQm1kVzVqZEdsdmJuTXVJRmRsSUhWelpWeHVJQ29nWUZWcGJuUTRRWEp5WVhsZ0lITnZJSFJvWVhRZ2MzRjFZWEpsSUdKeVlXTnJaWFFnYm05MFlYUnBiMjRnZDI5eWEzTWdZWE1nWlhod1pXTjBaV1FnTFMwZ2FYUWdjbVYwZFhKdWMxeHVJQ29nWVNCemFXNW5iR1VnYjJOMFpYUXVYRzRnS2x4dUlDb2dRbmtnWVhWbmJXVnVkR2x1WnlCMGFHVWdhVzV6ZEdGdVkyVnpMQ0IzWlNCallXNGdZWFp2YVdRZ2JXOWthV1o1YVc1bklIUm9aU0JnVldsdWREaEJjbkpoZVdCY2JpQXFJSEJ5YjNSdmRIbHdaUzVjYmlBcUwxeHVablZ1WTNScGIyNGdRblZtWm1WeUlDaHpkV0pxWldOMExDQmxibU52WkdsdVp5d2dibTlhWlhKdktTQjdYRzRnSUdsbUlDZ2hLSFJvYVhNZ2FXNXpkR0Z1WTJWdlppQkNkV1ptWlhJcEtWeHVJQ0FnSUhKbGRIVnliaUJ1WlhjZ1FuVm1abVZ5S0hOMVltcGxZM1FzSUdWdVkyOWthVzVuTENCdWIxcGxjbThwWEc1Y2JpQWdkbUZ5SUhSNWNHVWdQU0IwZVhCbGIyWWdjM1ZpYW1WamRGeHVYRzRnSUM4dklGZHZjbXRoY205MWJtUTZJRzV2WkdVbmN5QmlZWE5sTmpRZ2FXMXdiR1Z0Wlc1MFlYUnBiMjRnWVd4c2IzZHpJR1p2Y2lCdWIyNHRjR0ZrWkdWa0lITjBjbWx1WjNOY2JpQWdMeThnZDJocGJHVWdZbUZ6WlRZMExXcHpJR1J2WlhNZ2JtOTBMbHh1SUNCcFppQW9aVzVqYjJScGJtY2dQVDA5SUNkaVlYTmxOalFuSUNZbUlIUjVjR1VnUFQwOUlDZHpkSEpwYm1jbktTQjdYRzRnSUNBZ2MzVmlhbVZqZENBOUlITjBjbWx1WjNSeWFXMG9jM1ZpYW1WamRDbGNiaUFnSUNCM2FHbHNaU0FvYzNWaWFtVmpkQzVzWlc1bmRHZ2dKU0EwSUNFOVBTQXdLU0I3WEc0Z0lDQWdJQ0J6ZFdKcVpXTjBJRDBnYzNWaWFtVmpkQ0FySUNjOUoxeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lDOHZJRVpwYm1RZ2RHaGxJR3hsYm1kMGFGeHVJQ0IyWVhJZ2JHVnVaM1JvWEc0Z0lHbG1JQ2gwZVhCbElEMDlQU0FuYm5WdFltVnlKeWxjYmlBZ0lDQnNaVzVuZEdnZ1BTQmpiMlZ5WTJVb2MzVmlhbVZqZENsY2JpQWdaV3h6WlNCcFppQW9kSGx3WlNBOVBUMGdKM04wY21sdVp5Y3BYRzRnSUNBZ2JHVnVaM1JvSUQwZ1FuVm1abVZ5TG1KNWRHVk1aVzVuZEdnb2MzVmlhbVZqZEN3Z1pXNWpiMlJwYm1jcFhHNGdJR1ZzYzJVZ2FXWWdLSFI1Y0dVZ1BUMDlJQ2R2WW1wbFkzUW5LVnh1SUNBZ0lHeGxibWQwYUNBOUlHTnZaWEpqWlNoemRXSnFaV04wTG14bGJtZDBhQ2tnTHk4Z1lYTnpkVzFsSUhSb1lYUWdiMkpxWldOMElHbHpJR0Z5Y21GNUxXeHBhMlZjYmlBZ1pXeHpaVnh1SUNBZ0lIUm9jbTkzSUc1bGR5QkZjbkp2Y2lnblJtbHljM1FnWVhKbmRXMWxiblFnYm1WbFpITWdkRzhnWW1VZ1lTQnVkVzFpWlhJc0lHRnljbUY1SUc5eUlITjBjbWx1Wnk0bktWeHVYRzRnSUhaaGNpQmlkV1pjYmlBZ2FXWWdLRUoxWm1abGNpNWZkWE5sVkhsd1pXUkJjbkpoZVhNcElIdGNiaUFnSUNBdkx5QlFjbVZtWlhKeVpXUTZJRkpsZEhWeWJpQmhiaUJoZFdkdFpXNTBaV1FnWUZWcGJuUTRRWEp5WVhsZ0lHbHVjM1JoYm1ObElHWnZjaUJpWlhOMElIQmxjbVp2Y20xaGJtTmxYRzRnSUNBZ1luVm1JRDBnUW5WbVptVnlMbDloZFdkdFpXNTBLRzVsZHlCVmFXNTBPRUZ5Y21GNUtHeGxibWQwYUNrcFhHNGdJSDBnWld4elpTQjdYRzRnSUNBZ0x5OGdSbUZzYkdKaFkyczZJRkpsZEhWeWJpQlVTRWxUSUdsdWMzUmhibU5sSUc5bUlFSjFabVpsY2lBb1kzSmxZWFJsWkNCaWVTQmdibVYzWUNsY2JpQWdJQ0JpZFdZZ1BTQjBhR2x6WEc0Z0lDQWdZblZtTG14bGJtZDBhQ0E5SUd4bGJtZDBhRnh1SUNBZ0lHSjFaaTVmYVhOQ2RXWm1aWElnUFNCMGNuVmxYRzRnSUgxY2JseHVJQ0IyWVhJZ2FWeHVJQ0JwWmlBb1FuVm1abVZ5TGw5MWMyVlVlWEJsWkVGeWNtRjVjeUFtSmlCMGVYQmxiMllnYzNWaWFtVmpkQzVpZVhSbFRHVnVaM1JvSUQwOVBTQW5iblZ0WW1WeUp5a2dlMXh1SUNBZ0lDOHZJRk53WldWa0lHOXdkR2x0YVhwaGRHbHZiaUF0TFNCMWMyVWdjMlYwSUdsbUlIZGxKM0psSUdOdmNIbHBibWNnWm5KdmJTQmhJSFI1Y0dWa0lHRnljbUY1WEc0Z0lDQWdZblZtTGw5elpYUW9jM1ZpYW1WamRDbGNiaUFnZlNCbGJITmxJR2xtSUNocGMwRnljbUY1YVhOb0tITjFZbXBsWTNRcEtTQjdYRzRnSUNBZ0x5OGdWSEpsWVhRZ1lYSnlZWGt0YVhOb0lHOWlhbVZqZEhNZ1lYTWdZU0JpZVhSbElHRnljbUY1WEc0Z0lDQWdabTl5SUNocElEMGdNRHNnYVNBOElHeGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdJQ0JwWmlBb1FuVm1abVZ5TG1selFuVm1abVZ5S0hOMVltcGxZM1FwS1Z4dUlDQWdJQ0FnSUNCaWRXWmJhVjBnUFNCemRXSnFaV04wTG5KbFlXUlZTVzUwT0NocEtWeHVJQ0FnSUNBZ1pXeHpaVnh1SUNBZ0lDQWdJQ0JpZFdaYmFWMGdQU0J6ZFdKcVpXTjBXMmxkWEc0Z0lDQWdmVnh1SUNCOUlHVnNjMlVnYVdZZ0tIUjVjR1VnUFQwOUlDZHpkSEpwYm1jbktTQjdYRzRnSUNBZ1luVm1MbmR5YVhSbEtITjFZbXBsWTNRc0lEQXNJR1Z1WTI5a2FXNW5LVnh1SUNCOUlHVnNjMlVnYVdZZ0tIUjVjR1VnUFQwOUlDZHVkVzFpWlhJbklDWW1JQ0ZDZFdabVpYSXVYM1Z6WlZSNWNHVmtRWEp5WVhseklDWW1JQ0Z1YjFwbGNtOHBJSHRjYmlBZ0lDQm1iM0lnS0drZ1BTQXdPeUJwSUR3Z2JHVnVaM1JvT3lCcEt5c3BJSHRjYmlBZ0lDQWdJR0oxWmx0cFhTQTlJREJjYmlBZ0lDQjlYRzRnSUgxY2JseHVJQ0J5WlhSMWNtNGdZblZtWEc1OVhHNWNiaTh2SUZOVVFWUkpReUJOUlZSSVQwUlRYRzR2THlBOVBUMDlQVDA5UFQwOVBUMDlQVnh1WEc1Q2RXWm1aWEl1YVhORmJtTnZaR2x1WnlBOUlHWjFibU4wYVc5dUlDaGxibU52WkdsdVp5a2dlMXh1SUNCemQybDBZMmdnS0ZOMGNtbHVaeWhsYm1OdlpHbHVaeWt1ZEc5TWIzZGxja05oYzJVb0tTa2dlMXh1SUNBZ0lHTmhjMlVnSjJobGVDYzZYRzRnSUNBZ1kyRnpaU0FuZFhSbU9DYzZYRzRnSUNBZ1kyRnpaU0FuZFhSbUxUZ25PbHh1SUNBZ0lHTmhjMlVnSjJGelkybHBKenBjYmlBZ0lDQmpZWE5sSUNkaWFXNWhjbmtuT2x4dUlDQWdJR05oYzJVZ0oySmhjMlUyTkNjNlhHNGdJQ0FnWTJGelpTQW5jbUYzSnpwY2JpQWdJQ0JqWVhObElDZDFZM015SnpwY2JpQWdJQ0JqWVhObElDZDFZM010TWljNlhHNGdJQ0FnWTJGelpTQW5kWFJtTVRac1pTYzZYRzRnSUNBZ1kyRnpaU0FuZFhSbUxURTJiR1VuT2x4dUlDQWdJQ0FnY21WMGRYSnVJSFJ5ZFdWY2JpQWdJQ0JrWldaaGRXeDBPbHh1SUNBZ0lDQWdjbVYwZFhKdUlHWmhiSE5sWEc0Z0lIMWNibjFjYmx4dVFuVm1abVZ5TG1selFuVm1abVZ5SUQwZ1puVnVZM1JwYjI0Z0tHSXBJSHRjYmlBZ2NtVjBkWEp1SUNFaEtHSWdJVDA5SUc1MWJHd2dKaVlnWWlBaFBUMGdkVzVrWldacGJtVmtJQ1ltSUdJdVgybHpRblZtWm1WeUtWeHVmVnh1WEc1Q2RXWm1aWEl1WW5sMFpVeGxibWQwYUNBOUlHWjFibU4wYVc5dUlDaHpkSElzSUdWdVkyOWthVzVuS1NCN1hHNGdJSFpoY2lCeVpYUmNiaUFnYzNSeUlEMGdjM1J5SUNzZ0p5ZGNiaUFnYzNkcGRHTm9JQ2hsYm1OdlpHbHVaeUI4ZkNBbmRYUm1PQ2NwSUh0Y2JpQWdJQ0JqWVhObElDZG9aWGduT2x4dUlDQWdJQ0FnY21WMElEMGdjM1J5TG14bGJtZDBhQ0F2SURKY2JpQWdJQ0FnSUdKeVpXRnJYRzRnSUNBZ1kyRnpaU0FuZFhSbU9DYzZYRzRnSUNBZ1kyRnpaU0FuZFhSbUxUZ25PbHh1SUNBZ0lDQWdjbVYwSUQwZ2RYUm1PRlJ2UW5sMFpYTW9jM1J5S1M1c1pXNW5kR2hjYmlBZ0lDQWdJR0p5WldGclhHNGdJQ0FnWTJGelpTQW5ZWE5qYVdrbk9seHVJQ0FnSUdOaGMyVWdKMkpwYm1GeWVTYzZYRzRnSUNBZ1kyRnpaU0FuY21GM0p6cGNiaUFnSUNBZ0lISmxkQ0E5SUhOMGNpNXNaVzVuZEdoY2JpQWdJQ0FnSUdKeVpXRnJYRzRnSUNBZ1kyRnpaU0FuWW1GelpUWTBKenBjYmlBZ0lDQWdJSEpsZENBOUlHSmhjMlUyTkZSdlFubDBaWE1vYzNSeUtTNXNaVzVuZEdoY2JpQWdJQ0FnSUdKeVpXRnJYRzRnSUNBZ1kyRnpaU0FuZFdOek1pYzZYRzRnSUNBZ1kyRnpaU0FuZFdOekxUSW5PbHh1SUNBZ0lHTmhjMlVnSjNWMFpqRTJiR1VuT2x4dUlDQWdJR05oYzJVZ0ozVjBaaTB4Tm14bEp6cGNiaUFnSUNBZ0lISmxkQ0E5SUhOMGNpNXNaVzVuZEdnZ0tpQXlYRzRnSUNBZ0lDQmljbVZoYTF4dUlDQWdJR1JsWm1GMWJIUTZYRzRnSUNBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb0oxVnVhMjV2ZDI0Z1pXNWpiMlJwYm1jbktWeHVJQ0I5WEc0Z0lISmxkSFZ5YmlCeVpYUmNibjFjYmx4dVFuVm1abVZ5TG1OdmJtTmhkQ0E5SUdaMWJtTjBhVzl1SUNoc2FYTjBMQ0IwYjNSaGJFeGxibWQwYUNrZ2UxeHVJQ0JoYzNObGNuUW9hWE5CY25KaGVTaHNhWE4wS1N3Z0oxVnpZV2RsT2lCQ2RXWm1aWEl1WTI5dVkyRjBLR3hwYzNRc0lGdDBiM1JoYkV4bGJtZDBhRjBwWEZ4dUp5QXJYRzRnSUNBZ0lDQW5iR2x6ZENCemFHOTFiR1FnWW1VZ1lXNGdRWEp5WVhrdUp5bGNibHh1SUNCcFppQW9iR2x6ZEM1c1pXNW5kR2dnUFQwOUlEQXBJSHRjYmlBZ0lDQnlaWFIxY200Z2JtVjNJRUoxWm1abGNpZ3dLVnh1SUNCOUlHVnNjMlVnYVdZZ0tHeHBjM1F1YkdWdVozUm9JRDA5UFNBeEtTQjdYRzRnSUNBZ2NtVjBkWEp1SUd4cGMzUmJNRjFjYmlBZ2ZWeHVYRzRnSUhaaGNpQnBYRzRnSUdsbUlDaDBlWEJsYjJZZ2RHOTBZV3hNWlc1bmRHZ2dJVDA5SUNkdWRXMWlaWEluS1NCN1hHNGdJQ0FnZEc5MFlXeE1aVzVuZEdnZ1BTQXdYRzRnSUNBZ1ptOXlJQ2hwSUQwZ01Ec2dhU0E4SUd4cGMzUXViR1Z1WjNSb095QnBLeXNwSUh0Y2JpQWdJQ0FnSUhSdmRHRnNUR1Z1WjNSb0lDczlJR3hwYzNSYmFWMHViR1Z1WjNSb1hHNGdJQ0FnZlZ4dUlDQjlYRzVjYmlBZ2RtRnlJR0oxWmlBOUlHNWxkeUJDZFdabVpYSW9kRzkwWVd4TVpXNW5kR2dwWEc0Z0lIWmhjaUJ3YjNNZ1BTQXdYRzRnSUdadmNpQW9hU0E5SURBN0lHa2dQQ0JzYVhOMExteGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdkbUZ5SUdsMFpXMGdQU0JzYVhOMFcybGRYRzRnSUNBZ2FYUmxiUzVqYjNCNUtHSjFaaXdnY0c5ektWeHVJQ0FnSUhCdmN5QXJQU0JwZEdWdExteGxibWQwYUZ4dUlDQjlYRzRnSUhKbGRIVnliaUJpZFdaY2JuMWNibHh1THk4Z1FsVkdSa1ZTSUVsT1UxUkJUa05GSUUxRlZFaFBSRk5jYmk4dklEMDlQVDA5UFQwOVBUMDlQVDA5UFQwOVBUMDlQVDA5WEc1Y2JtWjFibU4wYVc5dUlGOW9aWGhYY21sMFpTQW9ZblZtTENCemRISnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9LU0I3WEc0Z0lHOW1abk5sZENBOUlFNTFiV0psY2lodlptWnpaWFFwSUh4OElEQmNiaUFnZG1GeUlISmxiV0ZwYm1sdVp5QTlJR0oxWmk1c1pXNW5kR2dnTFNCdlptWnpaWFJjYmlBZ2FXWWdLQ0ZzWlc1bmRHZ3BJSHRjYmlBZ0lDQnNaVzVuZEdnZ1BTQnlaVzFoYVc1cGJtZGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQnNaVzVuZEdnZ1BTQk9kVzFpWlhJb2JHVnVaM1JvS1Z4dUlDQWdJR2xtSUNoc1pXNW5kR2dnUGlCeVpXMWhhVzVwYm1jcElIdGNiaUFnSUNBZ0lHeGxibWQwYUNBOUlISmxiV0ZwYm1sdVoxeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lDOHZJRzExYzNRZ1ltVWdZVzRnWlhabGJpQnVkVzFpWlhJZ2IyWWdaR2xuYVhSelhHNGdJSFpoY2lCemRISk1aVzRnUFNCemRISnBibWN1YkdWdVozUm9YRzRnSUdGemMyVnlkQ2h6ZEhKTVpXNGdKU0F5SUQwOVBTQXdMQ0FuU1c1MllXeHBaQ0JvWlhnZ2MzUnlhVzVuSnlsY2JseHVJQ0JwWmlBb2JHVnVaM1JvSUQ0Z2MzUnlUR1Z1SUM4Z01pa2dlMXh1SUNBZ0lHeGxibWQwYUNBOUlITjBja3hsYmlBdklESmNiaUFnZlZ4dUlDQm1iM0lnS0haaGNpQnBJRDBnTURzZ2FTQThJR3hsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnZG1GeUlHSjVkR1VnUFNCd1lYSnpaVWx1ZENoemRISnBibWN1YzNWaWMzUnlLR2tnS2lBeUxDQXlLU3dnTVRZcFhHNGdJQ0FnWVhOelpYSjBLQ0ZwYzA1aFRpaGllWFJsS1N3Z0owbHVkbUZzYVdRZ2FHVjRJSE4wY21sdVp5Y3BYRzRnSUNBZ1luVm1XMjltWm5ObGRDQXJJR2xkSUQwZ1lubDBaVnh1SUNCOVhHNGdJRUoxWm1abGNpNWZZMmhoY25OWGNtbDBkR1Z1SUQwZ2FTQXFJREpjYmlBZ2NtVjBkWEp1SUdsY2JuMWNibHh1Wm5WdVkzUnBiMjRnWDNWMFpqaFhjbWwwWlNBb1luVm1MQ0J6ZEhKcGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0tTQjdYRzRnSUhaaGNpQmphR0Z5YzFkeWFYUjBaVzRnUFNCQ2RXWm1aWEl1WDJOb1lYSnpWM0pwZEhSbGJpQTlYRzRnSUNBZ1lteHBkRUoxWm1abGNpaDFkR1k0Vkc5Q2VYUmxjeWh6ZEhKcGJtY3BMQ0JpZFdZc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1Z4dUlDQnlaWFIxY200Z1kyaGhjbk5YY21sMGRHVnVYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOWhjMk5wYVZkeWFYUmxJQ2hpZFdZc0lITjBjbWx1Wnl3Z2IyWm1jMlYwTENCc1pXNW5kR2dwSUh0Y2JpQWdkbUZ5SUdOb1lYSnpWM0pwZEhSbGJpQTlJRUoxWm1abGNpNWZZMmhoY25OWGNtbDBkR1Z1SUQxY2JpQWdJQ0JpYkdsMFFuVm1abVZ5S0dGelkybHBWRzlDZVhSbGN5aHpkSEpwYm1jcExDQmlkV1lzSUc5bVpuTmxkQ3dnYkdWdVozUm9LVnh1SUNCeVpYUjFjbTRnWTJoaGNuTlhjbWwwZEdWdVhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5aWFXNWhjbmxYY21sMFpTQW9ZblZtTENCemRISnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9LU0I3WEc0Z0lISmxkSFZ5YmlCZllYTmphV2xYY21sMFpTaGlkV1lzSUhOMGNtbHVaeXdnYjJabWMyVjBMQ0JzWlc1bmRHZ3BYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOWlZWE5sTmpSWGNtbDBaU0FvWW5WbUxDQnpkSEpwYm1jc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1NCN1hHNGdJSFpoY2lCamFHRnljMWR5YVhSMFpXNGdQU0JDZFdabVpYSXVYMk5vWVhKelYzSnBkSFJsYmlBOVhHNGdJQ0FnWW14cGRFSjFabVpsY2loaVlYTmxOalJVYjBKNWRHVnpLSE4wY21sdVp5a3NJR0oxWml3Z2IyWm1jMlYwTENCc1pXNW5kR2dwWEc0Z0lISmxkSFZ5YmlCamFHRnljMWR5YVhSMFpXNWNibjFjYmx4dVpuVnVZM1JwYjI0Z1gzVjBaakUyYkdWWGNtbDBaU0FvWW5WbUxDQnpkSEpwYm1jc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1NCN1hHNGdJSFpoY2lCamFHRnljMWR5YVhSMFpXNGdQU0JDZFdabVpYSXVYMk5vWVhKelYzSnBkSFJsYmlBOVhHNGdJQ0FnWW14cGRFSjFabVpsY2loMWRHWXhObXhsVkc5Q2VYUmxjeWh6ZEhKcGJtY3BMQ0JpZFdZc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1Z4dUlDQnlaWFIxY200Z1kyaGhjbk5YY21sMGRHVnVYRzU5WEc1Y2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdWQzSnBkR1VnUFNCbWRXNWpkR2x2YmlBb2MzUnlhVzVuTENCdlptWnpaWFFzSUd4bGJtZDBhQ3dnWlc1amIyUnBibWNwSUh0Y2JpQWdMeThnVTNWd2NHOXlkQ0JpYjNSb0lDaHpkSEpwYm1jc0lHOW1abk5sZEN3Z2JHVnVaM1JvTENCbGJtTnZaR2x1WnlsY2JpQWdMeThnWVc1a0lIUm9aU0JzWldkaFkza2dLSE4wY21sdVp5d2daVzVqYjJScGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0tWeHVJQ0JwWmlBb2FYTkdhVzVwZEdVb2IyWm1jMlYwS1NrZ2UxeHVJQ0FnSUdsbUlDZ2hhWE5HYVc1cGRHVW9iR1Z1WjNSb0tTa2dlMXh1SUNBZ0lDQWdaVzVqYjJScGJtY2dQU0JzWlc1bmRHaGNiaUFnSUNBZ0lHeGxibWQwYUNBOUlIVnVaR1ZtYVc1bFpGeHVJQ0FnSUgxY2JpQWdmU0JsYkhObElIc2dJQzh2SUd4bFoyRmplVnh1SUNBZ0lIWmhjaUJ6ZDJGd0lEMGdaVzVqYjJScGJtZGNiaUFnSUNCbGJtTnZaR2x1WnlBOUlHOW1abk5sZEZ4dUlDQWdJRzltWm5ObGRDQTlJR3hsYm1kMGFGeHVJQ0FnSUd4bGJtZDBhQ0E5SUhOM1lYQmNiaUFnZlZ4dVhHNGdJRzltWm5ObGRDQTlJRTUxYldKbGNpaHZabVp6WlhRcElIeDhJREJjYmlBZ2RtRnlJSEpsYldGcGJtbHVaeUE5SUhSb2FYTXViR1Z1WjNSb0lDMGdiMlptYzJWMFhHNGdJR2xtSUNnaGJHVnVaM1JvS1NCN1hHNGdJQ0FnYkdWdVozUm9JRDBnY21WdFlXbHVhVzVuWEc0Z0lIMGdaV3h6WlNCN1hHNGdJQ0FnYkdWdVozUm9JRDBnVG5WdFltVnlLR3hsYm1kMGFDbGNiaUFnSUNCcFppQW9iR1Z1WjNSb0lENGdjbVZ0WVdsdWFXNW5LU0I3WEc0Z0lDQWdJQ0JzWlc1bmRHZ2dQU0J5WlcxaGFXNXBibWRjYmlBZ0lDQjlYRzRnSUgxY2JpQWdaVzVqYjJScGJtY2dQU0JUZEhKcGJtY29aVzVqYjJScGJtY2dmSHdnSjNWMFpqZ25LUzUwYjB4dmQyVnlRMkZ6WlNncFhHNWNiaUFnZG1GeUlISmxkRnh1SUNCemQybDBZMmdnS0dWdVkyOWthVzVuS1NCN1hHNGdJQ0FnWTJGelpTQW5hR1Y0SnpwY2JpQWdJQ0FnSUhKbGRDQTlJRjlvWlhoWGNtbDBaU2gwYUdsekxDQnpkSEpwYm1jc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1Z4dUlDQWdJQ0FnWW5KbFlXdGNiaUFnSUNCallYTmxJQ2QxZEdZNEp6cGNiaUFnSUNCallYTmxJQ2QxZEdZdE9DYzZYRzRnSUNBZ0lDQnlaWFFnUFNCZmRYUm1PRmR5YVhSbEtIUm9hWE1zSUhOMGNtbHVaeXdnYjJabWMyVjBMQ0JzWlc1bmRHZ3BYRzRnSUNBZ0lDQmljbVZoYTF4dUlDQWdJR05oYzJVZ0oyRnpZMmxwSnpwY2JpQWdJQ0FnSUhKbGRDQTlJRjloYzJOcGFWZHlhWFJsS0hSb2FYTXNJSE4wY21sdVp5d2diMlptYzJWMExDQnNaVzVuZEdncFhHNGdJQ0FnSUNCaWNtVmhhMXh1SUNBZ0lHTmhjMlVnSjJKcGJtRnllU2M2WEc0Z0lDQWdJQ0J5WlhRZ1BTQmZZbWx1WVhKNVYzSnBkR1VvZEdocGN5d2djM1J5YVc1bkxDQnZabVp6WlhRc0lHeGxibWQwYUNsY2JpQWdJQ0FnSUdKeVpXRnJYRzRnSUNBZ1kyRnpaU0FuWW1GelpUWTBKenBjYmlBZ0lDQWdJSEpsZENBOUlGOWlZWE5sTmpSWGNtbDBaU2gwYUdsekxDQnpkSEpwYm1jc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1Z4dUlDQWdJQ0FnWW5KbFlXdGNiaUFnSUNCallYTmxJQ2QxWTNNeUp6cGNiaUFnSUNCallYTmxJQ2QxWTNNdE1pYzZYRzRnSUNBZ1kyRnpaU0FuZFhSbU1UWnNaU2M2WEc0Z0lDQWdZMkZ6WlNBbmRYUm1MVEUyYkdVbk9seHVJQ0FnSUNBZ2NtVjBJRDBnWDNWMFpqRTJiR1ZYY21sMFpTaDBhR2x6TENCemRISnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9LVnh1SUNBZ0lDQWdZbkpsWVd0Y2JpQWdJQ0JrWldaaGRXeDBPbHh1SUNBZ0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZFZibXR1YjNkdUlHVnVZMjlrYVc1bkp5bGNiaUFnZlZ4dUlDQnlaWFIxY200Z2NtVjBYRzU5WEc1Y2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdWRHOVRkSEpwYm1jZ1BTQm1kVzVqZEdsdmJpQW9aVzVqYjJScGJtY3NJSE4wWVhKMExDQmxibVFwSUh0Y2JpQWdkbUZ5SUhObGJHWWdQU0IwYUdselhHNWNiaUFnWlc1amIyUnBibWNnUFNCVGRISnBibWNvWlc1amIyUnBibWNnZkh3Z0ozVjBaamduS1M1MGIweHZkMlZ5UTJGelpTZ3BYRzRnSUhOMFlYSjBJRDBnVG5WdFltVnlLSE4wWVhKMEtTQjhmQ0F3WEc0Z0lHVnVaQ0E5SUNobGJtUWdJVDA5SUhWdVpHVm1hVzVsWkNsY2JpQWdJQ0EvSUU1MWJXSmxjaWhsYm1RcFhHNGdJQ0FnT2lCbGJtUWdQU0J6Wld4bUxteGxibWQwYUZ4dVhHNGdJQzh2SUVaaGMzUndZWFJvSUdWdGNIUjVJSE4wY21sdVozTmNiaUFnYVdZZ0tHVnVaQ0E5UFQwZ2MzUmhjblFwWEc0Z0lDQWdjbVYwZFhKdUlDY25YRzVjYmlBZ2RtRnlJSEpsZEZ4dUlDQnpkMmwwWTJnZ0tHVnVZMjlrYVc1bktTQjdYRzRnSUNBZ1kyRnpaU0FuYUdWNEp6cGNiaUFnSUNBZ0lISmxkQ0E5SUY5b1pYaFRiR2xqWlNoelpXeG1MQ0J6ZEdGeWRDd2daVzVrS1Z4dUlDQWdJQ0FnWW5KbFlXdGNiaUFnSUNCallYTmxJQ2QxZEdZNEp6cGNiaUFnSUNCallYTmxJQ2QxZEdZdE9DYzZYRzRnSUNBZ0lDQnlaWFFnUFNCZmRYUm1PRk5zYVdObEtITmxiR1lzSUhOMFlYSjBMQ0JsYm1RcFhHNGdJQ0FnSUNCaWNtVmhhMXh1SUNBZ0lHTmhjMlVnSjJGelkybHBKenBjYmlBZ0lDQWdJSEpsZENBOUlGOWhjMk5wYVZOc2FXTmxLSE5sYkdZc0lITjBZWEowTENCbGJtUXBYRzRnSUNBZ0lDQmljbVZoYTF4dUlDQWdJR05oYzJVZ0oySnBibUZ5ZVNjNlhHNGdJQ0FnSUNCeVpYUWdQU0JmWW1sdVlYSjVVMnhwWTJVb2MyVnNaaXdnYzNSaGNuUXNJR1Z1WkNsY2JpQWdJQ0FnSUdKeVpXRnJYRzRnSUNBZ1kyRnpaU0FuWW1GelpUWTBKenBjYmlBZ0lDQWdJSEpsZENBOUlGOWlZWE5sTmpSVGJHbGpaU2h6Wld4bUxDQnpkR0Z5ZEN3Z1pXNWtLVnh1SUNBZ0lDQWdZbkpsWVd0Y2JpQWdJQ0JqWVhObElDZDFZM015SnpwY2JpQWdJQ0JqWVhObElDZDFZM010TWljNlhHNGdJQ0FnWTJGelpTQW5kWFJtTVRac1pTYzZYRzRnSUNBZ1kyRnpaU0FuZFhSbUxURTJiR1VuT2x4dUlDQWdJQ0FnY21WMElEMGdYM1YwWmpFMmJHVlRiR2xqWlNoelpXeG1MQ0J6ZEdGeWRDd2daVzVrS1Z4dUlDQWdJQ0FnWW5KbFlXdGNiaUFnSUNCa1pXWmhkV3gwT2x4dUlDQWdJQ0FnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2RWYm10dWIzZHVJR1Z1WTI5a2FXNW5KeWxjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdjbVYwWEc1OVhHNWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVkRzlLVTA5T0lEMGdablZ1WTNScGIyNGdLQ2tnZTF4dUlDQnlaWFIxY200Z2UxeHVJQ0FnSUhSNWNHVTZJQ2RDZFdabVpYSW5MRnh1SUNBZ0lHUmhkR0U2SUVGeWNtRjVMbkJ5YjNSdmRIbHdaUzV6YkdsalpTNWpZV3hzS0hSb2FYTXVYMkZ5Y2lCOGZDQjBhR2x6TENBd0tWeHVJQ0I5WEc1OVhHNWNiaTh2SUdOdmNIa29kR0Z5WjJWMFFuVm1abVZ5TENCMFlYSm5aWFJUZEdGeWREMHdMQ0J6YjNWeVkyVlRkR0Z5ZEQwd0xDQnpiM1Z5WTJWRmJtUTlZblZtWm1WeUxteGxibWQwYUNsY2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdVkyOXdlU0E5SUdaMWJtTjBhVzl1SUNoMFlYSm5aWFFzSUhSaGNtZGxkRjl6ZEdGeWRDd2djM1JoY25Rc0lHVnVaQ2tnZTF4dUlDQjJZWElnYzI5MWNtTmxJRDBnZEdocGMxeHVYRzRnSUdsbUlDZ2hjM1JoY25RcElITjBZWEowSUQwZ01GeHVJQ0JwWmlBb0lXVnVaQ0FtSmlCbGJtUWdJVDA5SURBcElHVnVaQ0E5SUhSb2FYTXViR1Z1WjNSb1hHNGdJR2xtSUNnaGRHRnlaMlYwWDNOMFlYSjBLU0IwWVhKblpYUmZjM1JoY25RZ1BTQXdYRzVjYmlBZ0x5OGdRMjl3ZVNBd0lHSjVkR1Z6T3lCM1pTZHlaU0JrYjI1bFhHNGdJR2xtSUNobGJtUWdQVDA5SUhOMFlYSjBLU0J5WlhSMWNtNWNiaUFnYVdZZ0tIUmhjbWRsZEM1c1pXNW5kR2dnUFQwOUlEQWdmSHdnYzI5MWNtTmxMbXhsYm1kMGFDQTlQVDBnTUNrZ2NtVjBkWEp1WEc1Y2JpQWdMeThnUm1GMFlXd2daWEp5YjNJZ1kyOXVaR2wwYVc5dWMxeHVJQ0JoYzNObGNuUW9aVzVrSUQ0OUlITjBZWEowTENBbmMyOTFjbU5sUlc1a0lEd2djMjkxY21ObFUzUmhjblFuS1Z4dUlDQmhjM05sY25Rb2RHRnlaMlYwWDNOMFlYSjBJRDQ5SURBZ0ppWWdkR0Z5WjJWMFgzTjBZWEowSUR3Z2RHRnlaMlYwTG14bGJtZDBhQ3hjYmlBZ0lDQWdJQ2QwWVhKblpYUlRkR0Z5ZENCdmRYUWdiMllnWW05MWJtUnpKeWxjYmlBZ1lYTnpaWEowS0hOMFlYSjBJRDQ5SURBZ0ppWWdjM1JoY25RZ1BDQnpiM1Z5WTJVdWJHVnVaM1JvTENBbmMyOTFjbU5sVTNSaGNuUWdiM1YwSUc5bUlHSnZkVzVrY3ljcFhHNGdJR0Z6YzJWeWRDaGxibVFnUGowZ01DQW1KaUJsYm1RZ1BEMGdjMjkxY21ObExteGxibWQwYUN3Z0ozTnZkWEpqWlVWdVpDQnZkWFFnYjJZZ1ltOTFibVJ6SnlsY2JseHVJQ0F2THlCQmNtVWdkMlVnYjI5aVAxeHVJQ0JwWmlBb1pXNWtJRDRnZEdocGN5NXNaVzVuZEdncFhHNGdJQ0FnWlc1a0lEMGdkR2hwY3k1c1pXNW5kR2hjYmlBZ2FXWWdLSFJoY21kbGRDNXNaVzVuZEdnZ0xTQjBZWEpuWlhSZmMzUmhjblFnUENCbGJtUWdMU0J6ZEdGeWRDbGNiaUFnSUNCbGJtUWdQU0IwWVhKblpYUXViR1Z1WjNSb0lDMGdkR0Z5WjJWMFgzTjBZWEowSUNzZ2MzUmhjblJjYmx4dUlDQjJZWElnYkdWdUlEMGdaVzVrSUMwZ2MzUmhjblJjYmx4dUlDQnBaaUFvYkdWdUlEd2dNVEF3SUh4OElDRkNkV1ptWlhJdVgzVnpaVlI1Y0dWa1FYSnlZWGx6S1NCN1hHNGdJQ0FnWm05eUlDaDJZWElnYVNBOUlEQTdJR2tnUENCc1pXNDdJR2tyS3lsY2JpQWdJQ0FnSUhSaGNtZGxkRnRwSUNzZ2RHRnlaMlYwWDNOMFlYSjBYU0E5SUhSb2FYTmJhU0FySUhOMFlYSjBYVnh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJSFJoY21kbGRDNWZjMlYwS0hSb2FYTXVjM1ZpWVhKeVlYa29jM1JoY25Rc0lITjBZWEowSUNzZ2JHVnVLU3dnZEdGeVoyVjBYM04wWVhKMEtWeHVJQ0I5WEc1OVhHNWNibVoxYm1OMGFXOXVJRjlpWVhObE5qUlRiR2xqWlNBb1luVm1MQ0J6ZEdGeWRDd2daVzVrS1NCN1hHNGdJR2xtSUNoemRHRnlkQ0E5UFQwZ01DQW1KaUJsYm1RZ1BUMDlJR0oxWmk1c1pXNW5kR2dwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdZbUZ6WlRZMExtWnliMjFDZVhSbFFYSnlZWGtvWW5WbUtWeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lISmxkSFZ5YmlCaVlYTmxOalF1Wm5KdmJVSjVkR1ZCY25KaGVTaGlkV1l1YzJ4cFkyVW9jM1JoY25Rc0lHVnVaQ2twWEc0Z0lIMWNibjFjYmx4dVpuVnVZM1JwYjI0Z1gzVjBaamhUYkdsalpTQW9ZblZtTENCemRHRnlkQ3dnWlc1a0tTQjdYRzRnSUhaaGNpQnlaWE1nUFNBbkoxeHVJQ0IyWVhJZ2RHMXdJRDBnSnlkY2JpQWdaVzVrSUQwZ1RXRjBhQzV0YVc0b1luVm1MbXhsYm1kMGFDd2daVzVrS1Z4dVhHNGdJR1p2Y2lBb2RtRnlJR2tnUFNCemRHRnlkRHNnYVNBOElHVnVaRHNnYVNzcktTQjdYRzRnSUNBZ2FXWWdLR0oxWmx0cFhTQThQU0F3ZURkR0tTQjdYRzRnSUNBZ0lDQnlaWE1nS3owZ1pHVmpiMlJsVlhSbU9FTm9ZWElvZEcxd0tTQXJJRk4wY21sdVp5NW1jbTl0UTJoaGNrTnZaR1VvWW5WbVcybGRLVnh1SUNBZ0lDQWdkRzF3SUQwZ0p5ZGNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnZEcxd0lDczlJQ2NsSnlBcklHSjFabHRwWFM1MGIxTjBjbWx1WnlneE5pbGNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQnlaWFIxY200Z2NtVnpJQ3NnWkdWamIyUmxWWFJtT0VOb1lYSW9kRzF3S1Z4dWZWeHVYRzVtZFc1amRHbHZiaUJmWVhOamFXbFRiR2xqWlNBb1luVm1MQ0J6ZEdGeWRDd2daVzVrS1NCN1hHNGdJSFpoY2lCeVpYUWdQU0FuSjF4dUlDQmxibVFnUFNCTllYUm9MbTFwYmloaWRXWXViR1Z1WjNSb0xDQmxibVFwWEc1Y2JpQWdabTl5SUNoMllYSWdhU0E5SUhOMFlYSjBPeUJwSUR3Z1pXNWtPeUJwS3lzcFhHNGdJQ0FnY21WMElDczlJRk4wY21sdVp5NW1jbTl0UTJoaGNrTnZaR1VvWW5WbVcybGRLVnh1SUNCeVpYUjFjbTRnY21WMFhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5aWFXNWhjbmxUYkdsalpTQW9ZblZtTENCemRHRnlkQ3dnWlc1a0tTQjdYRzRnSUhKbGRIVnliaUJmWVhOamFXbFRiR2xqWlNoaWRXWXNJSE4wWVhKMExDQmxibVFwWEc1OVhHNWNibVoxYm1OMGFXOXVJRjlvWlhoVGJHbGpaU0FvWW5WbUxDQnpkR0Z5ZEN3Z1pXNWtLU0I3WEc0Z0lIWmhjaUJzWlc0Z1BTQmlkV1l1YkdWdVozUm9YRzVjYmlBZ2FXWWdLQ0Z6ZEdGeWRDQjhmQ0J6ZEdGeWRDQThJREFwSUhOMFlYSjBJRDBnTUZ4dUlDQnBaaUFvSVdWdVpDQjhmQ0JsYm1RZ1BDQXdJSHg4SUdWdVpDQStJR3hsYmlrZ1pXNWtJRDBnYkdWdVhHNWNiaUFnZG1GeUlHOTFkQ0E5SUNjblhHNGdJR1p2Y2lBb2RtRnlJR2tnUFNCemRHRnlkRHNnYVNBOElHVnVaRHNnYVNzcktTQjdYRzRnSUNBZ2IzVjBJQ3M5SUhSdlNHVjRLR0oxWmx0cFhTbGNiaUFnZlZ4dUlDQnlaWFIxY200Z2IzVjBYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOTFkR1l4Tm14bFUyeHBZMlVnS0dKMVppd2djM1JoY25Rc0lHVnVaQ2tnZTF4dUlDQjJZWElnWW5sMFpYTWdQU0JpZFdZdWMyeHBZMlVvYzNSaGNuUXNJR1Z1WkNsY2JpQWdkbUZ5SUhKbGN5QTlJQ2NuWEc0Z0lHWnZjaUFvZG1GeUlHa2dQU0F3T3lCcElEd2dZbmwwWlhNdWJHVnVaM1JvT3lCcElDczlJRElwSUh0Y2JpQWdJQ0J5WlhNZ0t6MGdVM1J5YVc1bkxtWnliMjFEYUdGeVEyOWtaU2hpZVhSbGMxdHBYU0FySUdKNWRHVnpXMmtyTVYwZ0tpQXlOVFlwWEc0Z0lIMWNiaUFnY21WMGRYSnVJSEpsYzF4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbk5zYVdObElEMGdablZ1WTNScGIyNGdLSE4wWVhKMExDQmxibVFwSUh0Y2JpQWdkbUZ5SUd4bGJpQTlJSFJvYVhNdWJHVnVaM1JvWEc0Z0lITjBZWEowSUQwZ1kyeGhiWEFvYzNSaGNuUXNJR3hsYml3Z01DbGNiaUFnWlc1a0lEMGdZMnhoYlhBb1pXNWtMQ0JzWlc0c0lHeGxiaWxjYmx4dUlDQnBaaUFvUW5WbVptVnlMbDkxYzJWVWVYQmxaRUZ5Y21GNWN5a2dlMXh1SUNBZ0lISmxkSFZ5YmlCQ2RXWm1aWEl1WDJGMVoyMWxiblFvZEdocGN5NXpkV0poY25KaGVTaHpkR0Z5ZEN3Z1pXNWtLU2xjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0IyWVhJZ2MyeHBZMlZNWlc0Z1BTQmxibVFnTFNCemRHRnlkRnh1SUNBZ0lIWmhjaUJ1WlhkQ2RXWWdQU0J1WlhjZ1FuVm1abVZ5S0hOc2FXTmxUR1Z1TENCMWJtUmxabWx1WldRc0lIUnlkV1VwWEc0Z0lDQWdabTl5SUNoMllYSWdhU0E5SURBN0lHa2dQQ0J6YkdsalpVeGxianNnYVNzcktTQjdYRzRnSUNBZ0lDQnVaWGRDZFdaYmFWMGdQU0IwYUdselcya2dLeUJ6ZEdGeWRGMWNiaUFnSUNCOVhHNGdJQ0FnY21WMGRYSnVJRzVsZDBKMVpseHVJQ0I5WEc1OVhHNWNiaTh2SUdCblpYUmdJSGRwYkd3Z1ltVWdjbVZ0YjNabFpDQnBiaUJPYjJSbElEQXVNVE1yWEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG1kbGRDQTlJR1oxYm1OMGFXOXVJQ2h2Wm1aelpYUXBJSHRjYmlBZ1kyOXVjMjlzWlM1c2IyY29KeTVuWlhRb0tTQnBjeUJrWlhCeVpXTmhkR1ZrTGlCQlkyTmxjM01nZFhOcGJtY2dZWEp5WVhrZ2FXNWtaWGhsY3lCcGJuTjBaV0ZrTGljcFhHNGdJSEpsZEhWeWJpQjBhR2x6TG5KbFlXUlZTVzUwT0NodlptWnpaWFFwWEc1OVhHNWNiaTh2SUdCelpYUmdJSGRwYkd3Z1ltVWdjbVZ0YjNabFpDQnBiaUJPYjJSbElEQXVNVE1yWEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5ObGRDQTlJR1oxYm1OMGFXOXVJQ2gyTENCdlptWnpaWFFwSUh0Y2JpQWdZMjl1YzI5c1pTNXNiMmNvSnk1elpYUW9LU0JwY3lCa1pYQnlaV05oZEdWa0xpQkJZMk5sYzNNZ2RYTnBibWNnWVhKeVlYa2dhVzVrWlhobGN5QnBibk4wWldGa0xpY3BYRzRnSUhKbGRIVnliaUIwYUdsekxuZHlhWFJsVlVsdWREZ29kaXdnYjJabWMyVjBLVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuSmxZV1JWU1c1ME9DQTlJR1oxYm1OMGFXOXVJQ2h2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lHbG1JQ2doYm05QmMzTmxjblFwSUh0Y2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2IyWm1jMlYwSUNFOVBTQnVkV3hzTENBbmJXbHpjMmx1WnlCdlptWnpaWFFuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ1BDQjBhR2x6TG14bGJtZDBhQ3dnSjFSeWVXbHVaeUIwYnlCeVpXRmtJR0psZVc5dVpDQmlkV1ptWlhJZ2JHVnVaM1JvSnlsY2JpQWdmVnh1WEc0Z0lHbG1JQ2h2Wm1aelpYUWdQajBnZEdocGN5NXNaVzVuZEdncFhHNGdJQ0FnY21WMGRYSnVYRzVjYmlBZ2NtVjBkWEp1SUhSb2FYTmJiMlptYzJWMFhWeHVmVnh1WEc1bWRXNWpkR2x2YmlCZmNtVmhaRlZKYm5ReE5pQW9ZblZtTENCdlptWnpaWFFzSUd4cGRIUnNaVVZ1WkdsaGJpd2dibTlCYzNObGNuUXBJSHRjYmlBZ2FXWWdLQ0Z1YjBGemMyVnlkQ2tnZTF4dUlDQWdJR0Z6YzJWeWRDaDBlWEJsYjJZZ2JHbDBkR3hsUlc1a2FXRnVJRDA5UFNBblltOXZiR1ZoYmljc0lDZHRhWE56YVc1bklHOXlJR2x1ZG1Gc2FXUWdaVzVrYVdGdUp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdiMlptYzJWMElDRTlQU0J1ZFd4c0xDQW5iV2x6YzJsdVp5QnZabVp6WlhRbktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdLeUF4SUR3Z1luVm1MbXhsYm1kMGFDd2dKMVJ5ZVdsdVp5QjBieUJ5WldGa0lHSmxlVzl1WkNCaWRXWm1aWElnYkdWdVozUm9KeWxjYmlBZ2ZWeHVYRzRnSUhaaGNpQnNaVzRnUFNCaWRXWXViR1Z1WjNSb1hHNGdJR2xtSUNodlptWnpaWFFnUGowZ2JHVnVLVnh1SUNBZ0lISmxkSFZ5Ymx4dVhHNGdJSFpoY2lCMllXeGNiaUFnYVdZZ0tHeHBkSFJzWlVWdVpHbGhiaWtnZTF4dUlDQWdJSFpoYkNBOUlHSjFabHR2Wm1aelpYUmRYRzRnSUNBZ2FXWWdLRzltWm5ObGRDQXJJREVnUENCc1pXNHBYRzRnSUNBZ0lDQjJZV3dnZkQwZ1luVm1XMjltWm5ObGRDQXJJREZkSUR3OElEaGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQjJZV3dnUFNCaWRXWmJiMlptYzJWMFhTQThQQ0E0WEc0Z0lDQWdhV1lnS0c5bVpuTmxkQ0FySURFZ1BDQnNaVzRwWEc0Z0lDQWdJQ0IyWVd3Z2ZEMGdZblZtVzI5bVpuTmxkQ0FySURGZFhHNGdJSDFjYmlBZ2NtVjBkWEp1SUhaaGJGeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5KbFlXUlZTVzUwTVRaTVJTQTlJR1oxYm1OMGFXOXVJQ2h2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lISmxkSFZ5YmlCZmNtVmhaRlZKYm5ReE5paDBhR2x6TENCdlptWnpaWFFzSUhSeWRXVXNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuSmxZV1JWU1c1ME1UWkNSU0E5SUdaMWJtTjBhVzl1SUNodlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJSEpsZEhWeWJpQmZjbVZoWkZWSmJuUXhOaWgwYUdsekxDQnZabVp6WlhRc0lHWmhiSE5sTENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1Wm5WdVkzUnBiMjRnWDNKbFlXUlZTVzUwTXpJZ0tHSjFaaXdnYjJabWMyVjBMQ0JzYVhSMGJHVkZibVJwWVc0c0lHNXZRWE56WlhKMEtTQjdYRzRnSUdsbUlDZ2hibTlCYzNObGNuUXBJSHRjYmlBZ0lDQmhjM05sY25Rb2RIbHdaVzltSUd4cGRIUnNaVVZ1WkdsaGJpQTlQVDBnSjJKdmIyeGxZVzRuTENBbmJXbHpjMmx1WnlCdmNpQnBiblpoYkdsa0lHVnVaR2xoYmljcFhHNGdJQ0FnWVhOelpYSjBLRzltWm5ObGRDQWhQVDBnZFc1a1pXWnBibVZrSUNZbUlHOW1abk5sZENBaFBUMGdiblZzYkN3Z0oyMXBjM05wYm1jZ2IyWm1jMlYwSnlsY2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDc2dNeUE4SUdKMVppNXNaVzVuZEdnc0lDZFVjbmxwYm1jZ2RHOGdjbVZoWkNCaVpYbHZibVFnWW5WbVptVnlJR3hsYm1kMGFDY3BYRzRnSUgxY2JseHVJQ0IyWVhJZ2JHVnVJRDBnWW5WbUxteGxibWQwYUZ4dUlDQnBaaUFvYjJabWMyVjBJRDQ5SUd4bGJpbGNiaUFnSUNCeVpYUjFjbTVjYmx4dUlDQjJZWElnZG1Gc1hHNGdJR2xtSUNoc2FYUjBiR1ZGYm1ScFlXNHBJSHRjYmlBZ0lDQnBaaUFvYjJabWMyVjBJQ3NnTWlBOElHeGxiaWxjYmlBZ0lDQWdJSFpoYkNBOUlHSjFabHR2Wm1aelpYUWdLeUF5WFNBOFBDQXhObHh1SUNBZ0lHbG1JQ2h2Wm1aelpYUWdLeUF4SUR3Z2JHVnVLVnh1SUNBZ0lDQWdkbUZzSUh3OUlHSjFabHR2Wm1aelpYUWdLeUF4WFNBOFBDQTRYRzRnSUNBZ2RtRnNJSHc5SUdKMVpsdHZabVp6WlhSZFhHNGdJQ0FnYVdZZ0tHOW1abk5sZENBcklETWdQQ0JzWlc0cFhHNGdJQ0FnSUNCMllXd2dQU0IyWVd3Z0t5QW9ZblZtVzI5bVpuTmxkQ0FySUROZElEdzhJREkwSUQ0K1BpQXdLVnh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJR2xtSUNodlptWnpaWFFnS3lBeElEd2diR1Z1S1Z4dUlDQWdJQ0FnZG1Gc0lEMGdZblZtVzI5bVpuTmxkQ0FySURGZElEdzhJREUyWEc0Z0lDQWdhV1lnS0c5bVpuTmxkQ0FySURJZ1BDQnNaVzRwWEc0Z0lDQWdJQ0IyWVd3Z2ZEMGdZblZtVzI5bVpuTmxkQ0FySURKZElEdzhJRGhjYmlBZ0lDQnBaaUFvYjJabWMyVjBJQ3NnTXlBOElHeGxiaWxjYmlBZ0lDQWdJSFpoYkNCOFBTQmlkV1piYjJabWMyVjBJQ3NnTTExY2JpQWdJQ0IyWVd3Z1BTQjJZV3dnS3lBb1luVm1XMjltWm5ObGRGMGdQRHdnTWpRZ1BqNCtJREFwWEc0Z0lIMWNiaUFnY21WMGRYSnVJSFpoYkZ4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbkpsWVdSVlNXNTBNekpNUlNBOUlHWjFibU4wYVc5dUlDaHZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUhKbGRIVnliaUJmY21WaFpGVkpiblF6TWloMGFHbHpMQ0J2Wm1aelpYUXNJSFJ5ZFdVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5KbFlXUlZTVzUwTXpKQ1JTQTlJR1oxYm1OMGFXOXVJQ2h2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lISmxkSFZ5YmlCZmNtVmhaRlZKYm5Rek1paDBhR2x6TENCdlptWnpaWFFzSUdaaGJITmxMQ0J1YjBGemMyVnlkQ2xjYm4xY2JseHVRblZtWm1WeUxuQnliM1J2ZEhsd1pTNXlaV0ZrU1c1ME9DQTlJR1oxYm1OMGFXOXVJQ2h2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lHbG1JQ2doYm05QmMzTmxjblFwSUh0Y2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2IyWm1jMlYwSUNFOVBTQnVkV3hzTEZ4dUlDQWdJQ0FnSUNBbmJXbHpjMmx1WnlCdlptWnpaWFFuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ1BDQjBhR2x6TG14bGJtZDBhQ3dnSjFSeWVXbHVaeUIwYnlCeVpXRmtJR0psZVc5dVpDQmlkV1ptWlhJZ2JHVnVaM1JvSnlsY2JpQWdmVnh1WEc0Z0lHbG1JQ2h2Wm1aelpYUWdQajBnZEdocGN5NXNaVzVuZEdncFhHNGdJQ0FnY21WMGRYSnVYRzVjYmlBZ2RtRnlJRzVsWnlBOUlIUm9hWE5iYjJabWMyVjBYU0FtSURCNE9EQmNiaUFnYVdZZ0tHNWxaeWxjYmlBZ0lDQnlaWFIxY200Z0tEQjRabVlnTFNCMGFHbHpXMjltWm5ObGRGMGdLeUF4S1NBcUlDMHhYRzRnSUdWc2MyVmNiaUFnSUNCeVpYUjFjbTRnZEdocGMxdHZabVp6WlhSZFhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5eVpXRmtTVzUwTVRZZ0tHSjFaaXdnYjJabWMyVjBMQ0JzYVhSMGJHVkZibVJwWVc0c0lHNXZRWE56WlhKMEtTQjdYRzRnSUdsbUlDZ2hibTlCYzNObGNuUXBJSHRjYmlBZ0lDQmhjM05sY25Rb2RIbHdaVzltSUd4cGRIUnNaVVZ1WkdsaGJpQTlQVDBnSjJKdmIyeGxZVzRuTENBbmJXbHpjMmx1WnlCdmNpQnBiblpoYkdsa0lHVnVaR2xoYmljcFhHNGdJQ0FnWVhOelpYSjBLRzltWm5ObGRDQWhQVDBnZFc1a1pXWnBibVZrSUNZbUlHOW1abk5sZENBaFBUMGdiblZzYkN3Z0oyMXBjM05wYm1jZ2IyWm1jMlYwSnlsY2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDc2dNU0E4SUdKMVppNXNaVzVuZEdnc0lDZFVjbmxwYm1jZ2RHOGdjbVZoWkNCaVpYbHZibVFnWW5WbVptVnlJR3hsYm1kMGFDY3BYRzRnSUgxY2JseHVJQ0IyWVhJZ2JHVnVJRDBnWW5WbUxteGxibWQwYUZ4dUlDQnBaaUFvYjJabWMyVjBJRDQ5SUd4bGJpbGNiaUFnSUNCeVpYUjFjbTVjYmx4dUlDQjJZWElnZG1Gc0lEMGdYM0psWVdSVlNXNTBNVFlvWW5WbUxDQnZabVp6WlhRc0lHeHBkSFJzWlVWdVpHbGhiaXdnZEhKMVpTbGNiaUFnZG1GeUlHNWxaeUE5SUhaaGJDQW1JREI0T0RBd01GeHVJQ0JwWmlBb2JtVm5LVnh1SUNBZ0lISmxkSFZ5YmlBb01IaG1abVptSUMwZ2RtRnNJQ3NnTVNrZ0tpQXRNVnh1SUNCbGJITmxYRzRnSUNBZ2NtVjBkWEp1SUhaaGJGeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5KbFlXUkpiblF4Tmt4RklEMGdablZ1WTNScGIyNGdLRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ2NtVjBkWEp1SUY5eVpXRmtTVzUwTVRZb2RHaHBjeXdnYjJabWMyVjBMQ0IwY25WbExDQnViMEZ6YzJWeWRDbGNibjFjYmx4dVFuVm1abVZ5TG5CeWIzUnZkSGx3WlM1eVpXRmtTVzUwTVRaQ1JTQTlJR1oxYm1OMGFXOXVJQ2h2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lISmxkSFZ5YmlCZmNtVmhaRWx1ZERFMktIUm9hWE1zSUc5bVpuTmxkQ3dnWm1Gc2MyVXNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmZjbVZoWkVsdWRETXlJQ2hpZFdZc0lHOW1abk5sZEN3Z2JHbDBkR3hsUlc1a2FXRnVMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQnBaaUFvSVc1dlFYTnpaWEowS1NCN1hHNGdJQ0FnWVhOelpYSjBLSFI1Y0dWdlppQnNhWFIwYkdWRmJtUnBZVzRnUFQwOUlDZGliMjlzWldGdUp5d2dKMjFwYzNOcGJtY2diM0lnYVc1MllXeHBaQ0JsYm1ScFlXNG5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnSVQwOUlIVnVaR1ZtYVc1bFpDQW1KaUJ2Wm1aelpYUWdJVDA5SUc1MWJHd3NJQ2R0YVhOemFXNW5JRzltWm5ObGRDY3BYRzRnSUNBZ1lYTnpaWEowS0c5bVpuTmxkQ0FySURNZ1BDQmlkV1l1YkdWdVozUm9MQ0FuVkhKNWFXNW5JSFJ2SUhKbFlXUWdZbVY1YjI1a0lHSjFabVpsY2lCc1pXNW5kR2duS1Z4dUlDQjlYRzVjYmlBZ2RtRnlJR3hsYmlBOUlHSjFaaTVzWlc1bmRHaGNiaUFnYVdZZ0tHOW1abk5sZENBK1BTQnNaVzRwWEc0Z0lDQWdjbVYwZFhKdVhHNWNiaUFnZG1GeUlIWmhiQ0E5SUY5eVpXRmtWVWx1ZERNeUtHSjFaaXdnYjJabWMyVjBMQ0JzYVhSMGJHVkZibVJwWVc0c0lIUnlkV1VwWEc0Z0lIWmhjaUJ1WldjZ1BTQjJZV3dnSmlBd2VEZ3dNREF3TURBd1hHNGdJR2xtSUNodVpXY3BYRzRnSUNBZ2NtVjBkWEp1SUNnd2VHWm1abVptWm1abUlDMGdkbUZzSUNzZ01Ta2dLaUF0TVZ4dUlDQmxiSE5sWEc0Z0lDQWdjbVYwZFhKdUlIWmhiRnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuSmxZV1JKYm5Rek1reEZJRDBnWm5WdVkzUnBiMjRnS0c5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdjbVYwZFhKdUlGOXlaV0ZrU1c1ME16SW9kR2hwY3l3Z2IyWm1jMlYwTENCMGNuVmxMQ0J1YjBGemMyVnlkQ2xjYm4xY2JseHVRblZtWm1WeUxuQnliM1J2ZEhsd1pTNXlaV0ZrU1c1ME16SkNSU0E5SUdaMWJtTjBhVzl1SUNodlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJSEpsZEhWeWJpQmZjbVZoWkVsdWRETXlLSFJvYVhNc0lHOW1abk5sZEN3Z1ptRnNjMlVzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVtZFc1amRHbHZiaUJmY21WaFpFWnNiMkYwSUNoaWRXWXNJRzltWm5ObGRDd2diR2wwZEd4bFJXNWthV0Z1TENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0JwWmlBb0lXNXZRWE56WlhKMEtTQjdYRzRnSUNBZ1lYTnpaWEowS0hSNWNHVnZaaUJzYVhSMGJHVkZibVJwWVc0Z1BUMDlJQ2RpYjI5c1pXRnVKeXdnSjIxcGMzTnBibWNnYjNJZ2FXNTJZV3hwWkNCbGJtUnBZVzRuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ0t5QXpJRHdnWW5WbUxteGxibWQwYUN3Z0oxUnllV2x1WnlCMGJ5QnlaV0ZrSUdKbGVXOXVaQ0JpZFdabVpYSWdiR1Z1WjNSb0p5bGNiaUFnZlZ4dVhHNGdJSEpsZEhWeWJpQnBaV1ZsTnpVMExuSmxZV1FvWW5WbUxDQnZabVp6WlhRc0lHeHBkSFJzWlVWdVpHbGhiaXdnTWpNc0lEUXBYRzU5WEc1Y2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdWNtVmhaRVpzYjJGMFRFVWdQU0JtZFc1amRHbHZiaUFvYjJabWMyVjBMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQnlaWFIxY200Z1gzSmxZV1JHYkc5aGRDaDBhR2x6TENCdlptWnpaWFFzSUhSeWRXVXNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuSmxZV1JHYkc5aGRFSkZJRDBnWm5WdVkzUnBiMjRnS0c5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdjbVYwZFhKdUlGOXlaV0ZrUm14dllYUW9kR2hwY3l3Z2IyWm1jMlYwTENCbVlXeHpaU3dnYm05QmMzTmxjblFwWEc1OVhHNWNibVoxYm1OMGFXOXVJRjl5WldGa1JHOTFZbXhsSUNoaWRXWXNJRzltWm5ObGRDd2diR2wwZEd4bFJXNWthV0Z1TENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0JwWmlBb0lXNXZRWE56WlhKMEtTQjdYRzRnSUNBZ1lYTnpaWEowS0hSNWNHVnZaaUJzYVhSMGJHVkZibVJwWVc0Z1BUMDlJQ2RpYjI5c1pXRnVKeXdnSjIxcGMzTnBibWNnYjNJZ2FXNTJZV3hwWkNCbGJtUnBZVzRuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ0t5QTNJRHdnWW5WbUxteGxibWQwYUN3Z0oxUnllV2x1WnlCMGJ5QnlaV0ZrSUdKbGVXOXVaQ0JpZFdabVpYSWdiR1Z1WjNSb0p5bGNiaUFnZlZ4dVhHNGdJSEpsZEhWeWJpQnBaV1ZsTnpVMExuSmxZV1FvWW5WbUxDQnZabVp6WlhRc0lHeHBkSFJzWlVWdVpHbGhiaXdnTlRJc0lEZ3BYRzU5WEc1Y2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdWNtVmhaRVJ2ZFdKc1pVeEZJRDBnWm5WdVkzUnBiMjRnS0c5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdjbVYwZFhKdUlGOXlaV0ZrUkc5MVlteGxLSFJvYVhNc0lHOW1abk5sZEN3Z2RISjFaU3dnYm05QmMzTmxjblFwWEc1OVhHNWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVjbVZoWkVSdmRXSnNaVUpGSUQwZ1puVnVZM1JwYjI0Z0tHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnY21WMGRYSnVJRjl5WldGa1JHOTFZbXhsS0hSb2FYTXNJRzltWm5ObGRDd2dabUZzYzJVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5keWFYUmxWVWx1ZERnZ1BTQm1kVzVqZEdsdmJpQW9kbUZzZFdVc0lHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnYVdZZ0tDRnViMEZ6YzJWeWRDa2dlMXh1SUNBZ0lHRnpjMlZ5ZENoMllXeDFaU0FoUFQwZ2RXNWtaV1pwYm1Wa0lDWW1JSFpoYkhWbElDRTlQU0J1ZFd4c0xDQW5iV2x6YzJsdVp5QjJZV3gxWlNjcFhHNGdJQ0FnWVhOelpYSjBLRzltWm5ObGRDQWhQVDBnZFc1a1pXWnBibVZrSUNZbUlHOW1abk5sZENBaFBUMGdiblZzYkN3Z0oyMXBjM05wYm1jZ2IyWm1jMlYwSnlsY2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElEd2dkR2hwY3k1c1pXNW5kR2dzSUNkMGNubHBibWNnZEc4Z2QzSnBkR1VnWW1WNWIyNWtJR0oxWm1abGNpQnNaVzVuZEdnbktWeHVJQ0FnSUhabGNtbG1kV2x1ZENoMllXeDFaU3dnTUhobVppbGNiaUFnZlZ4dVhHNGdJR2xtSUNodlptWnpaWFFnUGowZ2RHaHBjeTVzWlc1bmRHZ3BJSEpsZEhWeWJseHVYRzRnSUhSb2FYTmJiMlptYzJWMFhTQTlJSFpoYkhWbFhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5M2NtbDBaVlZKYm5ReE5pQW9ZblZtTENCMllXeDFaU3dnYjJabWMyVjBMQ0JzYVhSMGJHVkZibVJwWVc0c0lHNXZRWE56WlhKMEtTQjdYRzRnSUdsbUlDZ2hibTlCYzNObGNuUXBJSHRjYmlBZ0lDQmhjM05sY25Rb2RtRnNkV1VnSVQwOUlIVnVaR1ZtYVc1bFpDQW1KaUIyWVd4MVpTQWhQVDBnYm5Wc2JDd2dKMjFwYzNOcGJtY2dkbUZzZFdVbktWeHVJQ0FnSUdGemMyVnlkQ2gwZVhCbGIyWWdiR2wwZEd4bFJXNWthV0Z1SUQwOVBTQW5ZbTl2YkdWaGJpY3NJQ2R0YVhOemFXNW5JRzl5SUdsdWRtRnNhV1FnWlc1a2FXRnVKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnYjJabWMyVjBJQ0U5UFNCdWRXeHNMQ0FuYldsemMybHVaeUJ2Wm1aelpYUW5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnS3lBeElEd2dZblZtTG14bGJtZDBhQ3dnSjNSeWVXbHVaeUIwYnlCM2NtbDBaU0JpWlhsdmJtUWdZblZtWm1WeUlHeGxibWQwYUNjcFhHNGdJQ0FnZG1WeWFXWjFhVzUwS0haaGJIVmxMQ0F3ZUdabVptWXBYRzRnSUgxY2JseHVJQ0IyWVhJZ2JHVnVJRDBnWW5WbUxteGxibWQwYUZ4dUlDQnBaaUFvYjJabWMyVjBJRDQ5SUd4bGJpbGNiaUFnSUNCeVpYUjFjbTVjYmx4dUlDQm1iM0lnS0haaGNpQnBJRDBnTUN3Z2FpQTlJRTFoZEdndWJXbHVLR3hsYmlBdElHOW1abk5sZEN3Z01pazdJR2tnUENCcU95QnBLeXNwSUh0Y2JpQWdJQ0JpZFdaYmIyWm1jMlYwSUNzZ2FWMGdQVnh1SUNBZ0lDQWdJQ0FvZG1Gc2RXVWdKaUFvTUhobVppQThQQ0FvT0NBcUlDaHNhWFIwYkdWRmJtUnBZVzRnUHlCcElEb2dNU0F0SUdrcEtTa3BJRDQrUGx4dUlDQWdJQ0FnSUNBZ0lDQWdLR3hwZEhSc1pVVnVaR2xoYmlBL0lHa2dPaUF4SUMwZ2FTa2dLaUE0WEc0Z0lIMWNibjFjYmx4dVFuVm1abVZ5TG5CeWIzUnZkSGx3WlM1M2NtbDBaVlZKYm5ReE5reEZJRDBnWm5WdVkzUnBiMjRnS0haaGJIVmxMQ0J2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lGOTNjbWwwWlZWSmJuUXhOaWgwYUdsekxDQjJZV3gxWlN3Z2IyWm1jMlYwTENCMGNuVmxMQ0J1YjBGemMyVnlkQ2xjYm4xY2JseHVRblZtWm1WeUxuQnliM1J2ZEhsd1pTNTNjbWwwWlZWSmJuUXhOa0pGSUQwZ1puVnVZM1JwYjI0Z0tIWmhiSFZsTENCdlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJRjkzY21sMFpWVkpiblF4TmloMGFHbHpMQ0IyWVd4MVpTd2diMlptYzJWMExDQm1ZV3h6WlN3Z2JtOUJjM05sY25RcFhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5M2NtbDBaVlZKYm5Rek1pQW9ZblZtTENCMllXeDFaU3dnYjJabWMyVjBMQ0JzYVhSMGJHVkZibVJwWVc0c0lHNXZRWE56WlhKMEtTQjdYRzRnSUdsbUlDZ2hibTlCYzNObGNuUXBJSHRjYmlBZ0lDQmhjM05sY25Rb2RtRnNkV1VnSVQwOUlIVnVaR1ZtYVc1bFpDQW1KaUIyWVd4MVpTQWhQVDBnYm5Wc2JDd2dKMjFwYzNOcGJtY2dkbUZzZFdVbktWeHVJQ0FnSUdGemMyVnlkQ2gwZVhCbGIyWWdiR2wwZEd4bFJXNWthV0Z1SUQwOVBTQW5ZbTl2YkdWaGJpY3NJQ2R0YVhOemFXNW5JRzl5SUdsdWRtRnNhV1FnWlc1a2FXRnVKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnYjJabWMyVjBJQ0U5UFNCdWRXeHNMQ0FuYldsemMybHVaeUJ2Wm1aelpYUW5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnS3lBeklEd2dZblZtTG14bGJtZDBhQ3dnSjNSeWVXbHVaeUIwYnlCM2NtbDBaU0JpWlhsdmJtUWdZblZtWm1WeUlHeGxibWQwYUNjcFhHNGdJQ0FnZG1WeWFXWjFhVzUwS0haaGJIVmxMQ0F3ZUdabVptWm1abVptS1Z4dUlDQjlYRzVjYmlBZ2RtRnlJR3hsYmlBOUlHSjFaaTVzWlc1bmRHaGNiaUFnYVdZZ0tHOW1abk5sZENBK1BTQnNaVzRwWEc0Z0lDQWdjbVYwZFhKdVhHNWNiaUFnWm05eUlDaDJZWElnYVNBOUlEQXNJR29nUFNCTllYUm9MbTFwYmloc1pXNGdMU0J2Wm1aelpYUXNJRFFwT3lCcElEd2dhanNnYVNzcktTQjdYRzRnSUNBZ1luVm1XMjltWm5ObGRDQXJJR2xkSUQxY2JpQWdJQ0FnSUNBZ0tIWmhiSFZsSUQ0K1BpQW9iR2wwZEd4bFJXNWthV0Z1SUQ4Z2FTQTZJRE1nTFNCcEtTQXFJRGdwSUNZZ01IaG1abHh1SUNCOVhHNTlYRzVjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1ZDNKcGRHVlZTVzUwTXpKTVJTQTlJR1oxYm1OMGFXOXVJQ2gyWVd4MVpTd2diMlptYzJWMExDQnViMEZ6YzJWeWRDa2dlMXh1SUNCZmQzSnBkR1ZWU1c1ME16SW9kR2hwY3l3Z2RtRnNkV1VzSUc5bVpuTmxkQ3dnZEhKMVpTd2dibTlCYzNObGNuUXBYRzU5WEc1Y2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdWQzSnBkR1ZWU1c1ME16SkNSU0E5SUdaMWJtTjBhVzl1SUNoMllXeDFaU3dnYjJabWMyVjBMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQmZkM0pwZEdWVlNXNTBNeklvZEdocGN5d2dkbUZzZFdVc0lHOW1abk5sZEN3Z1ptRnNjMlVzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbmR5YVhSbFNXNTBPQ0E5SUdaMWJtTjBhVzl1SUNoMllXeDFaU3dnYjJabWMyVjBMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQnBaaUFvSVc1dlFYTnpaWEowS1NCN1hHNGdJQ0FnWVhOelpYSjBLSFpoYkhWbElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2RtRnNkV1VnSVQwOUlHNTFiR3dzSUNkdGFYTnphVzVuSUhaaGJIVmxKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnYjJabWMyVjBJQ0U5UFNCdWRXeHNMQ0FuYldsemMybHVaeUJ2Wm1aelpYUW5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnUENCMGFHbHpMbXhsYm1kMGFDd2dKMVJ5ZVdsdVp5QjBieUIzY21sMFpTQmlaWGx2Ym1RZ1luVm1abVZ5SUd4bGJtZDBhQ2NwWEc0Z0lDQWdkbVZ5YVdaemFXNTBLSFpoYkhWbExDQXdlRGRtTENBdE1IZzRNQ2xjYmlBZ2ZWeHVYRzRnSUdsbUlDaHZabVp6WlhRZ1BqMGdkR2hwY3k1c1pXNW5kR2dwWEc0Z0lDQWdjbVYwZFhKdVhHNWNiaUFnYVdZZ0tIWmhiSFZsSUQ0OUlEQXBYRzRnSUNBZ2RHaHBjeTUzY21sMFpWVkpiblE0S0haaGJIVmxMQ0J2Wm1aelpYUXNJRzV2UVhOelpYSjBLVnh1SUNCbGJITmxYRzRnSUNBZ2RHaHBjeTUzY21sMFpWVkpiblE0S0RCNFptWWdLeUIyWVd4MVpTQXJJREVzSUc5bVpuTmxkQ3dnYm05QmMzTmxjblFwWEc1OVhHNWNibVoxYm1OMGFXOXVJRjkzY21sMFpVbHVkREUySUNoaWRXWXNJSFpoYkhWbExDQnZabVp6WlhRc0lHeHBkSFJzWlVWdVpHbGhiaXdnYm05QmMzTmxjblFwSUh0Y2JpQWdhV1lnS0NGdWIwRnpjMlZ5ZENrZ2UxeHVJQ0FnSUdGemMyVnlkQ2gyWVd4MVpTQWhQVDBnZFc1a1pXWnBibVZrSUNZbUlIWmhiSFZsSUNFOVBTQnVkV3hzTENBbmJXbHpjMmx1WnlCMllXeDFaU2NwWEc0Z0lDQWdZWE56WlhKMEtIUjVjR1Z2WmlCc2FYUjBiR1ZGYm1ScFlXNGdQVDA5SUNkaWIyOXNaV0Z1Snl3Z0oyMXBjM05wYm1jZ2IzSWdhVzUyWVd4cFpDQmxibVJwWVc0bktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdJVDA5SUhWdVpHVm1hVzVsWkNBbUppQnZabVp6WlhRZ0lUMDlJRzUxYkd3c0lDZHRhWE56YVc1bklHOW1abk5sZENjcFhHNGdJQ0FnWVhOelpYSjBLRzltWm5ObGRDQXJJREVnUENCaWRXWXViR1Z1WjNSb0xDQW5WSEo1YVc1bklIUnZJSGR5YVhSbElHSmxlVzl1WkNCaWRXWm1aWElnYkdWdVozUm9KeWxjYmlBZ0lDQjJaWEpwWm5OcGJuUW9kbUZzZFdVc0lEQjROMlptWml3Z0xUQjRPREF3TUNsY2JpQWdmVnh1WEc0Z0lIWmhjaUJzWlc0Z1BTQmlkV1l1YkdWdVozUm9YRzRnSUdsbUlDaHZabVp6WlhRZ1BqMGdiR1Z1S1Z4dUlDQWdJSEpsZEhWeWJseHVYRzRnSUdsbUlDaDJZV3gxWlNBK1BTQXdLVnh1SUNBZ0lGOTNjbWwwWlZWSmJuUXhOaWhpZFdZc0lIWmhiSFZsTENCdlptWnpaWFFzSUd4cGRIUnNaVVZ1WkdsaGJpd2dibTlCYzNObGNuUXBYRzRnSUdWc2MyVmNiaUFnSUNCZmQzSnBkR1ZWU1c1ME1UWW9ZblZtTENBd2VHWm1abVlnS3lCMllXeDFaU0FySURFc0lHOW1abk5sZEN3Z2JHbDBkR3hsUlc1a2FXRnVMQ0J1YjBGemMyVnlkQ2xjYm4xY2JseHVRblZtWm1WeUxuQnliM1J2ZEhsd1pTNTNjbWwwWlVsdWRERTJURVVnUFNCbWRXNWpkR2x2YmlBb2RtRnNkV1VzSUc5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdYM2R5YVhSbFNXNTBNVFlvZEdocGN5d2dkbUZzZFdVc0lHOW1abk5sZEN3Z2RISjFaU3dnYm05QmMzTmxjblFwWEc1OVhHNWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVkM0pwZEdWSmJuUXhOa0pGSUQwZ1puVnVZM1JwYjI0Z0tIWmhiSFZsTENCdlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJRjkzY21sMFpVbHVkREUyS0hSb2FYTXNJSFpoYkhWbExDQnZabVp6WlhRc0lHWmhiSE5sTENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1Wm5WdVkzUnBiMjRnWDNkeWFYUmxTVzUwTXpJZ0tHSjFaaXdnZG1Gc2RXVXNJRzltWm5ObGRDd2diR2wwZEd4bFJXNWthV0Z1TENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0JwWmlBb0lXNXZRWE56WlhKMEtTQjdYRzRnSUNBZ1lYTnpaWEowS0haaGJIVmxJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdkbUZzZFdVZ0lUMDlJRzUxYkd3c0lDZHRhWE56YVc1bklIWmhiSFZsSnlsY2JpQWdJQ0JoYzNObGNuUW9kSGx3Wlc5bUlHeHBkSFJzWlVWdVpHbGhiaUE5UFQwZ0oySnZiMnhsWVc0bkxDQW5iV2x6YzJsdVp5QnZjaUJwYm5aaGJHbGtJR1Z1WkdsaGJpY3BYRzRnSUNBZ1lYTnpaWEowS0c5bVpuTmxkQ0FoUFQwZ2RXNWtaV1pwYm1Wa0lDWW1JRzltWm5ObGRDQWhQVDBnYm5Wc2JDd2dKMjFwYzNOcGJtY2diMlptYzJWMEp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ3NnTXlBOElHSjFaaTVzWlc1bmRHZ3NJQ2RVY25scGJtY2dkRzhnZDNKcGRHVWdZbVY1YjI1a0lHSjFabVpsY2lCc1pXNW5kR2duS1Z4dUlDQWdJSFpsY21sbWMybHVkQ2gyWVd4MVpTd2dNSGczWm1abVptWm1aaXdnTFRCNE9EQXdNREF3TURBcFhHNGdJSDFjYmx4dUlDQjJZWElnYkdWdUlEMGdZblZtTG14bGJtZDBhRnh1SUNCcFppQW9iMlptYzJWMElENDlJR3hsYmlsY2JpQWdJQ0J5WlhSMWNtNWNibHh1SUNCcFppQW9kbUZzZFdVZ1BqMGdNQ2xjYmlBZ0lDQmZkM0pwZEdWVlNXNTBNeklvWW5WbUxDQjJZV3gxWlN3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJRzV2UVhOelpYSjBLVnh1SUNCbGJITmxYRzRnSUNBZ1gzZHlhWFJsVlVsdWRETXlLR0oxWml3Z01IaG1abVptWm1abVppQXJJSFpoYkhWbElDc2dNU3dnYjJabWMyVjBMQ0JzYVhSMGJHVkZibVJwWVc0c0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5keWFYUmxTVzUwTXpKTVJTQTlJR1oxYm1OMGFXOXVJQ2gyWVd4MVpTd2diMlptYzJWMExDQnViMEZ6YzJWeWRDa2dlMXh1SUNCZmQzSnBkR1ZKYm5Rek1paDBhR2x6TENCMllXeDFaU3dnYjJabWMyVjBMQ0IwY25WbExDQnViMEZ6YzJWeWRDbGNibjFjYmx4dVFuVm1abVZ5TG5CeWIzUnZkSGx3WlM1M2NtbDBaVWx1ZERNeVFrVWdQU0JtZFc1amRHbHZiaUFvZG1Gc2RXVXNJRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ1gzZHlhWFJsU1c1ME16SW9kR2hwY3l3Z2RtRnNkV1VzSUc5bVpuTmxkQ3dnWm1Gc2MyVXNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmZkM0pwZEdWR2JHOWhkQ0FvWW5WbUxDQjJZV3gxWlN3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJRzV2UVhOelpYSjBLU0I3WEc0Z0lHbG1JQ2doYm05QmMzTmxjblFwSUh0Y2JpQWdJQ0JoYzNObGNuUW9kbUZzZFdVZ0lUMDlJSFZ1WkdWbWFXNWxaQ0FtSmlCMllXeDFaU0FoUFQwZ2JuVnNiQ3dnSjIxcGMzTnBibWNnZG1Gc2RXVW5LVnh1SUNBZ0lHRnpjMlZ5ZENoMGVYQmxiMllnYkdsMGRHeGxSVzVrYVdGdUlEMDlQU0FuWW05dmJHVmhiaWNzSUNkdGFYTnphVzVuSUc5eUlHbHVkbUZzYVdRZ1pXNWthV0Z1SnlsY2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2IyWm1jMlYwSUNFOVBTQnVkV3hzTENBbmJXbHpjMmx1WnlCdlptWnpaWFFuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ0t5QXpJRHdnWW5WbUxteGxibWQwYUN3Z0oxUnllV2x1WnlCMGJ5QjNjbWwwWlNCaVpYbHZibVFnWW5WbVptVnlJR3hsYm1kMGFDY3BYRzRnSUNBZ2RtVnlhV1pKUlVWRk56VTBLSFpoYkhWbExDQXpMalF3TWpneU16UTJOak00TlRJNE9EWmxLek00TENBdE15NDBNREk0TWpNME5qWXpPRFV5T0RnMlpTc3pPQ2xjYmlBZ2ZWeHVYRzRnSUhaaGNpQnNaVzRnUFNCaWRXWXViR1Z1WjNSb1hHNGdJR2xtSUNodlptWnpaWFFnUGowZ2JHVnVLVnh1SUNBZ0lISmxkSFZ5Ymx4dVhHNGdJR2xsWldVM05UUXVkM0pwZEdVb1luVm1MQ0IyWVd4MVpTd2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSURJekxDQTBLVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuZHlhWFJsUm14dllYUk1SU0E5SUdaMWJtTjBhVzl1SUNoMllXeDFaU3dnYjJabWMyVjBMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQmZkM0pwZEdWR2JHOWhkQ2gwYUdsekxDQjJZV3gxWlN3Z2IyWm1jMlYwTENCMGNuVmxMQ0J1YjBGemMyVnlkQ2xjYm4xY2JseHVRblZtWm1WeUxuQnliM1J2ZEhsd1pTNTNjbWwwWlVac2IyRjBRa1VnUFNCbWRXNWpkR2x2YmlBb2RtRnNkV1VzSUc5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdYM2R5YVhSbFJteHZZWFFvZEdocGN5d2dkbUZzZFdVc0lHOW1abk5sZEN3Z1ptRnNjMlVzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVtZFc1amRHbHZiaUJmZDNKcGRHVkViM1ZpYkdVZ0tHSjFaaXdnZG1Gc2RXVXNJRzltWm5ObGRDd2diR2wwZEd4bFJXNWthV0Z1TENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0JwWmlBb0lXNXZRWE56WlhKMEtTQjdYRzRnSUNBZ1lYTnpaWEowS0haaGJIVmxJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdkbUZzZFdVZ0lUMDlJRzUxYkd3c0lDZHRhWE56YVc1bklIWmhiSFZsSnlsY2JpQWdJQ0JoYzNObGNuUW9kSGx3Wlc5bUlHeHBkSFJzWlVWdVpHbGhiaUE5UFQwZ0oySnZiMnhsWVc0bkxDQW5iV2x6YzJsdVp5QnZjaUJwYm5aaGJHbGtJR1Z1WkdsaGJpY3BYRzRnSUNBZ1lYTnpaWEowS0c5bVpuTmxkQ0FoUFQwZ2RXNWtaV1pwYm1Wa0lDWW1JRzltWm5ObGRDQWhQVDBnYm5Wc2JDd2dKMjFwYzNOcGJtY2diMlptYzJWMEp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ3NnTnlBOElHSjFaaTVzWlc1bmRHZ3NYRzRnSUNBZ0lDQWdJQ2RVY25scGJtY2dkRzhnZDNKcGRHVWdZbVY1YjI1a0lHSjFabVpsY2lCc1pXNW5kR2duS1Z4dUlDQWdJSFpsY21sbVNVVkZSVGMxTkNoMllXeDFaU3dnTVM0M09UYzJPVE14TXpRNE5qSXpNVFUzUlNzek1EZ3NJQzB4TGpjNU56WTVNekV6TkRnMk1qTXhOVGRGS3pNd09DbGNiaUFnZlZ4dVhHNGdJSFpoY2lCc1pXNGdQU0JpZFdZdWJHVnVaM1JvWEc0Z0lHbG1JQ2h2Wm1aelpYUWdQajBnYkdWdUtWeHVJQ0FnSUhKbGRIVnlibHh1WEc0Z0lHbGxaV1UzTlRRdWQzSnBkR1VvWW5WbUxDQjJZV3gxWlN3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJRFV5TENBNEtWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5keWFYUmxSRzkxWW14bFRFVWdQU0JtZFc1amRHbHZiaUFvZG1Gc2RXVXNJRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ1gzZHlhWFJsUkc5MVlteGxLSFJvYVhNc0lIWmhiSFZsTENCdlptWnpaWFFzSUhSeWRXVXNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuZHlhWFJsUkc5MVlteGxRa1VnUFNCbWRXNWpkR2x2YmlBb2RtRnNkV1VzSUc5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdYM2R5YVhSbFJHOTFZbXhsS0hSb2FYTXNJSFpoYkhWbExDQnZabVp6WlhRc0lHWmhiSE5sTENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1THk4Z1ptbHNiQ2gyWVd4MVpTd2djM1JoY25ROU1Dd2daVzVrUFdKMVptWmxjaTVzWlc1bmRHZ3BYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbVpwYkd3Z1BTQm1kVzVqZEdsdmJpQW9kbUZzZFdVc0lITjBZWEowTENCbGJtUXBJSHRjYmlBZ2FXWWdLQ0YyWVd4MVpTa2dkbUZzZFdVZ1BTQXdYRzRnSUdsbUlDZ2hjM1JoY25RcElITjBZWEowSUQwZ01GeHVJQ0JwWmlBb0lXVnVaQ2tnWlc1a0lEMGdkR2hwY3k1c1pXNW5kR2hjYmx4dUlDQnBaaUFvZEhsd1pXOW1JSFpoYkhWbElEMDlQU0FuYzNSeWFXNW5KeWtnZTF4dUlDQWdJSFpoYkhWbElEMGdkbUZzZFdVdVkyaGhja052WkdWQmRDZ3dLVnh1SUNCOVhHNWNiaUFnWVhOelpYSjBLSFI1Y0dWdlppQjJZV3gxWlNBOVBUMGdKMjUxYldKbGNpY2dKaVlnSVdselRtRk9LSFpoYkhWbEtTd2dKM1poYkhWbElHbHpJRzV2ZENCaElHNTFiV0psY2ljcFhHNGdJR0Z6YzJWeWRDaGxibVFnUGowZ2MzUmhjblFzSUNkbGJtUWdQQ0J6ZEdGeWRDY3BYRzVjYmlBZ0x5OGdSbWxzYkNBd0lHSjVkR1Z6T3lCM1pTZHlaU0JrYjI1bFhHNGdJR2xtSUNobGJtUWdQVDA5SUhOMFlYSjBLU0J5WlhSMWNtNWNiaUFnYVdZZ0tIUm9hWE11YkdWdVozUm9JRDA5UFNBd0tTQnlaWFIxY201Y2JseHVJQ0JoYzNObGNuUW9jM1JoY25RZ1BqMGdNQ0FtSmlCemRHRnlkQ0E4SUhSb2FYTXViR1Z1WjNSb0xDQW5jM1JoY25RZ2IzVjBJRzltSUdKdmRXNWtjeWNwWEc0Z0lHRnpjMlZ5ZENobGJtUWdQajBnTUNBbUppQmxibVFnUEQwZ2RHaHBjeTVzWlc1bmRHZ3NJQ2RsYm1RZ2IzVjBJRzltSUdKdmRXNWtjeWNwWEc1Y2JpQWdabTl5SUNoMllYSWdhU0E5SUhOMFlYSjBPeUJwSUR3Z1pXNWtPeUJwS3lzcElIdGNiaUFnSUNCMGFHbHpXMmxkSUQwZ2RtRnNkV1ZjYmlBZ2ZWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG1sdWMzQmxZM1FnUFNCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUhaaGNpQnZkWFFnUFNCYlhWeHVJQ0IyWVhJZ2JHVnVJRDBnZEdocGN5NXNaVzVuZEdoY2JpQWdabTl5SUNoMllYSWdhU0E5SURBN0lHa2dQQ0JzWlc0N0lHa3JLeWtnZTF4dUlDQWdJRzkxZEZ0cFhTQTlJSFJ2U0dWNEtIUm9hWE5iYVYwcFhHNGdJQ0FnYVdZZ0tHa2dQVDA5SUdWNGNHOXlkSE11U1U1VFVFVkRWRjlOUVZoZlFsbFVSVk1wSUh0Y2JpQWdJQ0FnSUc5MWRGdHBJQ3NnTVYwZ1BTQW5MaTR1SjF4dUlDQWdJQ0FnWW5KbFlXdGNiaUFnSUNCOVhHNGdJSDFjYmlBZ2NtVjBkWEp1SUNjOFFuVm1abVZ5SUNjZ0t5QnZkWFF1YW05cGJpZ25JQ2NwSUNzZ0p6NG5YRzU5WEc1Y2JpOHFLbHh1SUNvZ1EzSmxZWFJsY3lCaElHNWxkeUJnUVhKeVlYbENkV1ptWlhKZ0lIZHBkR2dnZEdobElDcGpiM0JwWldRcUlHMWxiVzl5ZVNCdlppQjBhR1VnWW5WbVptVnlJR2x1YzNSaGJtTmxMbHh1SUNvZ1FXUmtaV1FnYVc0Z1RtOWtaU0F3TGpFeUxpQlBibXg1SUdGMllXbHNZV0pzWlNCcGJpQmljbTkzYzJWeWN5QjBhR0YwSUhOMWNIQnZjblFnUVhKeVlYbENkV1ptWlhJdVhHNGdLaTljYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1ZEc5QmNuSmhlVUoxWm1abGNpQTlJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdhV1lnS0hSNWNHVnZaaUJWYVc1ME9FRnljbUY1SUNFOVBTQW5kVzVrWldacGJtVmtKeWtnZTF4dUlDQWdJR2xtSUNoQ2RXWm1aWEl1WDNWelpWUjVjR1ZrUVhKeVlYbHpLU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdLRzVsZHlCQ2RXWm1aWElvZEdocGN5a3BMbUoxWm1abGNseHVJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0IyWVhJZ1luVm1JRDBnYm1WM0lGVnBiblE0UVhKeVlYa29kR2hwY3k1c1pXNW5kR2dwWEc0Z0lDQWdJQ0JtYjNJZ0tIWmhjaUJwSUQwZ01Dd2diR1Z1SUQwZ1luVm1MbXhsYm1kMGFEc2dhU0E4SUd4bGJqc2dhU0FyUFNBeEtWeHVJQ0FnSUNBZ0lDQmlkV1piYVYwZ1BTQjBhR2x6VzJsZFhHNGdJQ0FnSUNCeVpYUjFjbTRnWW5WbUxtSjFabVpsY2x4dUlDQWdJSDFjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9KMEoxWm1abGNpNTBiMEZ5Y21GNVFuVm1abVZ5SUc1dmRDQnpkWEJ3YjNKMFpXUWdhVzRnZEdocGN5QmljbTkzYzJWeUp5bGNiaUFnZlZ4dWZWeHVYRzR2THlCSVJVeFFSVklnUmxWT1ExUkpUMDVUWEc0dkx5QTlQVDA5UFQwOVBUMDlQVDA5UFQwOVhHNWNibVoxYm1OMGFXOXVJSE4wY21sdVozUnlhVzBnS0hOMGNpa2dlMXh1SUNCcFppQW9jM1J5TG5SeWFXMHBJSEpsZEhWeWJpQnpkSEl1ZEhKcGJTZ3BYRzRnSUhKbGRIVnliaUJ6ZEhJdWNtVndiR0ZqWlNndlhseGNjeXQ4WEZ4ekt5UXZaeXdnSnljcFhHNTlYRzVjYm5aaGNpQkNVQ0E5SUVKMVptWmxjaTV3Y205MGIzUjVjR1ZjYmx4dUx5b3FYRzRnS2lCQmRXZHRaVzUwSUdFZ1ZXbHVkRGhCY25KaGVTQXFhVzV6ZEdGdVkyVXFJQ2h1YjNRZ2RHaGxJRlZwYm5RNFFYSnlZWGtnWTJ4aGMzTWhLU0IzYVhSb0lFSjFabVpsY2lCdFpYUm9iMlJ6WEc0Z0tpOWNia0oxWm1abGNpNWZZWFZuYldWdWRDQTlJR1oxYm1OMGFXOXVJQ2hoY25JcElIdGNiaUFnWVhKeUxsOXBjMEoxWm1abGNpQTlJSFJ5ZFdWY2JseHVJQ0F2THlCellYWmxJSEpsWm1WeVpXNWpaU0IwYnlCdmNtbG5hVzVoYkNCVmFXNTBPRUZ5Y21GNUlHZGxkQzl6WlhRZ2JXVjBhRzlrY3lCaVpXWnZjbVVnYjNabGNuZHlhWFJwYm1kY2JpQWdZWEp5TGw5blpYUWdQU0JoY25JdVoyVjBYRzRnSUdGeWNpNWZjMlYwSUQwZ1lYSnlMbk5sZEZ4dVhHNGdJQzh2SUdSbGNISmxZMkYwWldRc0lIZHBiR3dnWW1VZ2NtVnRiM1psWkNCcGJpQnViMlJsSURBdU1UTXJYRzRnSUdGeWNpNW5aWFFnUFNCQ1VDNW5aWFJjYmlBZ1lYSnlMbk5sZENBOUlFSlFMbk5sZEZ4dVhHNGdJR0Z5Y2k1M2NtbDBaU0E5SUVKUUxuZHlhWFJsWEc0Z0lHRnljaTUwYjFOMGNtbHVaeUE5SUVKUUxuUnZVM1J5YVc1blhHNGdJR0Z5Y2k1MGIweHZZMkZzWlZOMGNtbHVaeUE5SUVKUUxuUnZVM1J5YVc1blhHNGdJR0Z5Y2k1MGIwcFRUMDRnUFNCQ1VDNTBiMHBUVDA1Y2JpQWdZWEp5TG1OdmNIa2dQU0JDVUM1amIzQjVYRzRnSUdGeWNpNXpiR2xqWlNBOUlFSlFMbk5zYVdObFhHNGdJR0Z5Y2k1eVpXRmtWVWx1ZERnZ1BTQkNVQzV5WldGa1ZVbHVkRGhjYmlBZ1lYSnlMbkpsWVdSVlNXNTBNVFpNUlNBOUlFSlFMbkpsWVdSVlNXNTBNVFpNUlZ4dUlDQmhjbkl1Y21WaFpGVkpiblF4TmtKRklEMGdRbEF1Y21WaFpGVkpiblF4TmtKRlhHNGdJR0Z5Y2k1eVpXRmtWVWx1ZERNeVRFVWdQU0JDVUM1eVpXRmtWVWx1ZERNeVRFVmNiaUFnWVhKeUxuSmxZV1JWU1c1ME16SkNSU0E5SUVKUUxuSmxZV1JWU1c1ME16SkNSVnh1SUNCaGNuSXVjbVZoWkVsdWREZ2dQU0JDVUM1eVpXRmtTVzUwT0Z4dUlDQmhjbkl1Y21WaFpFbHVkREUyVEVVZ1BTQkNVQzV5WldGa1NXNTBNVFpNUlZ4dUlDQmhjbkl1Y21WaFpFbHVkREUyUWtVZ1BTQkNVQzV5WldGa1NXNTBNVFpDUlZ4dUlDQmhjbkl1Y21WaFpFbHVkRE15VEVVZ1BTQkNVQzV5WldGa1NXNTBNekpNUlZ4dUlDQmhjbkl1Y21WaFpFbHVkRE15UWtVZ1BTQkNVQzV5WldGa1NXNTBNekpDUlZ4dUlDQmhjbkl1Y21WaFpFWnNiMkYwVEVVZ1BTQkNVQzV5WldGa1JteHZZWFJNUlZ4dUlDQmhjbkl1Y21WaFpFWnNiMkYwUWtVZ1BTQkNVQzV5WldGa1JteHZZWFJDUlZ4dUlDQmhjbkl1Y21WaFpFUnZkV0pzWlV4RklEMGdRbEF1Y21WaFpFUnZkV0pzWlV4RlhHNGdJR0Z5Y2k1eVpXRmtSRzkxWW14bFFrVWdQU0JDVUM1eVpXRmtSRzkxWW14bFFrVmNiaUFnWVhKeUxuZHlhWFJsVlVsdWREZ2dQU0JDVUM1M2NtbDBaVlZKYm5RNFhHNGdJR0Z5Y2k1M2NtbDBaVlZKYm5ReE5reEZJRDBnUWxBdWQzSnBkR1ZWU1c1ME1UWk1SVnh1SUNCaGNuSXVkM0pwZEdWVlNXNTBNVFpDUlNBOUlFSlFMbmR5YVhSbFZVbHVkREUyUWtWY2JpQWdZWEp5TG5keWFYUmxWVWx1ZERNeVRFVWdQU0JDVUM1M2NtbDBaVlZKYm5Rek1reEZYRzRnSUdGeWNpNTNjbWwwWlZWSmJuUXpNa0pGSUQwZ1FsQXVkM0pwZEdWVlNXNTBNekpDUlZ4dUlDQmhjbkl1ZDNKcGRHVkpiblE0SUQwZ1FsQXVkM0pwZEdWSmJuUTRYRzRnSUdGeWNpNTNjbWwwWlVsdWRERTJURVVnUFNCQ1VDNTNjbWwwWlVsdWRERTJURVZjYmlBZ1lYSnlMbmR5YVhSbFNXNTBNVFpDUlNBOUlFSlFMbmR5YVhSbFNXNTBNVFpDUlZ4dUlDQmhjbkl1ZDNKcGRHVkpiblF6TWt4RklEMGdRbEF1ZDNKcGRHVkpiblF6TWt4RlhHNGdJR0Z5Y2k1M2NtbDBaVWx1ZERNeVFrVWdQU0JDVUM1M2NtbDBaVWx1ZERNeVFrVmNiaUFnWVhKeUxuZHlhWFJsUm14dllYUk1SU0E5SUVKUUxuZHlhWFJsUm14dllYUk1SVnh1SUNCaGNuSXVkM0pwZEdWR2JHOWhkRUpGSUQwZ1FsQXVkM0pwZEdWR2JHOWhkRUpGWEc0Z0lHRnljaTUzY21sMFpVUnZkV0pzWlV4RklEMGdRbEF1ZDNKcGRHVkViM1ZpYkdWTVJWeHVJQ0JoY25JdWQzSnBkR1ZFYjNWaWJHVkNSU0E5SUVKUUxuZHlhWFJsUkc5MVlteGxRa1ZjYmlBZ1lYSnlMbVpwYkd3Z1BTQkNVQzVtYVd4c1hHNGdJR0Z5Y2k1cGJuTndaV04wSUQwZ1FsQXVhVzV6Y0dWamRGeHVJQ0JoY25JdWRHOUJjbkpoZVVKMVptWmxjaUE5SUVKUUxuUnZRWEp5WVhsQ2RXWm1aWEpjYmx4dUlDQnlaWFIxY200Z1lYSnlYRzU5WEc1Y2JpOHZJSE5zYVdObEtITjBZWEowTENCbGJtUXBYRzVtZFc1amRHbHZiaUJqYkdGdGNDQW9hVzVrWlhnc0lHeGxiaXdnWkdWbVlYVnNkRlpoYkhWbEtTQjdYRzRnSUdsbUlDaDBlWEJsYjJZZ2FXNWtaWGdnSVQwOUlDZHVkVzFpWlhJbktTQnlaWFIxY200Z1pHVm1ZWFZzZEZaaGJIVmxYRzRnSUdsdVpHVjRJRDBnZm41cGJtUmxlRHNnSUM4dklFTnZaWEpqWlNCMGJ5QnBiblJsWjJWeUxseHVJQ0JwWmlBb2FXNWtaWGdnUGowZ2JHVnVLU0J5WlhSMWNtNGdiR1Z1WEc0Z0lHbG1JQ2hwYm1SbGVDQStQU0F3S1NCeVpYUjFjbTRnYVc1a1pYaGNiaUFnYVc1a1pYZ2dLejBnYkdWdVhHNGdJR2xtSUNocGJtUmxlQ0ErUFNBd0tTQnlaWFIxY200Z2FXNWtaWGhjYmlBZ2NtVjBkWEp1SURCY2JuMWNibHh1Wm5WdVkzUnBiMjRnWTI5bGNtTmxJQ2hzWlc1bmRHZ3BJSHRjYmlBZ0x5OGdRMjlsY21ObElHeGxibWQwYUNCMGJ5QmhJRzUxYldKbGNpQW9jRzl6YzJsaWJIa2dUbUZPS1N3Z2NtOTFibVFnZFhCY2JpQWdMeThnYVc0Z1kyRnpaU0JwZENkeklHWnlZV04wYVc5dVlXd2dLR1V1Wnk0Z01USXpMalExTmlrZ2RHaGxiaUJrYnlCaFhHNGdJQzh2SUdSdmRXSnNaU0J1WldkaGRHVWdkRzhnWTI5bGNtTmxJR0VnVG1GT0lIUnZJREF1SUVWaGMza3NJSEpwWjJoMFAxeHVJQ0JzWlc1bmRHZ2dQU0IrZmsxaGRHZ3VZMlZwYkNncmJHVnVaM1JvS1Z4dUlDQnlaWFIxY200Z2JHVnVaM1JvSUR3Z01DQS9JREFnT2lCc1pXNW5kR2hjYm4xY2JseHVablZ1WTNScGIyNGdhWE5CY25KaGVTQW9jM1ZpYW1WamRDa2dlMXh1SUNCeVpYUjFjbTRnS0VGeWNtRjVMbWx6UVhKeVlYa2dmSHdnWm5WdVkzUnBiMjRnS0hOMVltcGxZM1FwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdUMkpxWldOMExuQnliM1J2ZEhsd1pTNTBiMU4wY21sdVp5NWpZV3hzS0hOMVltcGxZM1FwSUQwOVBTQW5XMjlpYW1WamRDQkJjbkpoZVYwblhHNGdJSDBwS0hOMVltcGxZM1FwWEc1OVhHNWNibVoxYm1OMGFXOXVJR2x6UVhKeVlYbHBjMmdnS0hOMVltcGxZM1FwSUh0Y2JpQWdjbVYwZFhKdUlHbHpRWEp5WVhrb2MzVmlhbVZqZENrZ2ZId2dRblZtWm1WeUxtbHpRblZtWm1WeUtITjFZbXBsWTNRcElIeDhYRzRnSUNBZ0lDQnpkV0pxWldOMElDWW1JSFI1Y0dWdlppQnpkV0pxWldOMElEMDlQU0FuYjJKcVpXTjBKeUFtSmx4dUlDQWdJQ0FnZEhsd1pXOW1JSE4xWW1wbFkzUXViR1Z1WjNSb0lEMDlQU0FuYm5WdFltVnlKMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQjBiMGhsZUNBb2Jpa2dlMXh1SUNCcFppQW9iaUE4SURFMktTQnlaWFIxY200Z0p6QW5JQ3NnYmk1MGIxTjBjbWx1WnlneE5pbGNiaUFnY21WMGRYSnVJRzR1ZEc5VGRISnBibWNvTVRZcFhHNTlYRzVjYm1aMWJtTjBhVzl1SUhWMFpqaFViMEo1ZEdWeklDaHpkSElwSUh0Y2JpQWdkbUZ5SUdKNWRHVkJjbkpoZVNBOUlGdGRYRzRnSUdadmNpQW9kbUZ5SUdrZ1BTQXdPeUJwSUR3Z2MzUnlMbXhsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnZG1GeUlHSWdQU0J6ZEhJdVkyaGhja052WkdWQmRDaHBLVnh1SUNBZ0lHbG1JQ2hpSUR3OUlEQjROMFlwWEc0Z0lDQWdJQ0JpZVhSbFFYSnlZWGt1Y0hWemFDaHpkSEl1WTJoaGNrTnZaR1ZCZENocEtTbGNiaUFnSUNCbGJITmxJSHRjYmlBZ0lDQWdJSFpoY2lCemRHRnlkQ0E5SUdsY2JpQWdJQ0FnSUdsbUlDaGlJRDQ5SURCNFJEZ3dNQ0FtSmlCaUlEdzlJREI0UkVaR1Jpa2dhU3NyWEc0Z0lDQWdJQ0IyWVhJZ2FDQTlJR1Z1WTI5a1pWVlNTVU52YlhCdmJtVnVkQ2h6ZEhJdWMyeHBZMlVvYzNSaGNuUXNJR2tyTVNrcExuTjFZbk4wY2lneEtTNXpjR3hwZENnbkpTY3BYRzRnSUNBZ0lDQm1iM0lnS0haaGNpQnFJRDBnTURzZ2FpQThJR2d1YkdWdVozUm9PeUJxS3lzcFhHNGdJQ0FnSUNBZ0lHSjVkR1ZCY25KaGVTNXdkWE5vS0hCaGNuTmxTVzUwS0doYmFsMHNJREUyS1NsY2JpQWdJQ0I5WEc0Z0lIMWNiaUFnY21WMGRYSnVJR0o1ZEdWQmNuSmhlVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmhjMk5wYVZSdlFubDBaWE1nS0hOMGNpa2dlMXh1SUNCMllYSWdZbmwwWlVGeWNtRjVJRDBnVzExY2JpQWdabTl5SUNoMllYSWdhU0E5SURBN0lHa2dQQ0J6ZEhJdWJHVnVaM1JvT3lCcEt5c3BJSHRjYmlBZ0lDQXZMeUJPYjJSbEozTWdZMjlrWlNCelpXVnRjeUIwYnlCaVpTQmtiMmx1WnlCMGFHbHpJR0Z1WkNCdWIzUWdKaUF3ZURkR0xpNWNiaUFnSUNCaWVYUmxRWEp5WVhrdWNIVnphQ2h6ZEhJdVkyaGhja052WkdWQmRDaHBLU0FtSURCNFJrWXBYRzRnSUgxY2JpQWdjbVYwZFhKdUlHSjVkR1ZCY25KaGVWeHVmVnh1WEc1bWRXNWpkR2x2YmlCMWRHWXhObXhsVkc5Q2VYUmxjeUFvYzNSeUtTQjdYRzRnSUhaaGNpQmpMQ0JvYVN3Z2JHOWNiaUFnZG1GeUlHSjVkR1ZCY25KaGVTQTlJRnRkWEc0Z0lHWnZjaUFvZG1GeUlHa2dQU0F3T3lCcElEd2djM1J5TG14bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ1l5QTlJSE4wY2k1amFHRnlRMjlrWlVGMEtHa3BYRzRnSUNBZ2FHa2dQU0JqSUQ0K0lEaGNiaUFnSUNCc2J5QTlJR01nSlNBeU5UWmNiaUFnSUNCaWVYUmxRWEp5WVhrdWNIVnphQ2hzYnlsY2JpQWdJQ0JpZVhSbFFYSnlZWGt1Y0hWemFDaG9hU2xjYmlBZ2ZWeHVYRzRnSUhKbGRIVnliaUJpZVhSbFFYSnlZWGxjYm4xY2JseHVablZ1WTNScGIyNGdZbUZ6WlRZMFZHOUNlWFJsY3lBb2MzUnlLU0I3WEc0Z0lISmxkSFZ5YmlCaVlYTmxOalF1ZEc5Q2VYUmxRWEp5WVhrb2MzUnlLVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmliR2wwUW5WbVptVnlJQ2h6Y21Nc0lHUnpkQ3dnYjJabWMyVjBMQ0JzWlc1bmRHZ3BJSHRjYmlBZ2RtRnlJSEJ2YzF4dUlDQm1iM0lnS0haaGNpQnBJRDBnTURzZ2FTQThJR3hsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnYVdZZ0tDaHBJQ3NnYjJabWMyVjBJRDQ5SUdSemRDNXNaVzVuZEdncElIeDhJQ2hwSUQ0OUlITnlZeTVzWlc1bmRHZ3BLVnh1SUNBZ0lDQWdZbkpsWVd0Y2JpQWdJQ0JrYzNSYmFTQXJJRzltWm5ObGRGMGdQU0J6Y21OYmFWMWNiaUFnZlZ4dUlDQnlaWFIxY200Z2FWeHVmVnh1WEc1bWRXNWpkR2x2YmlCa1pXTnZaR1ZWZEdZNFEyaGhjaUFvYzNSeUtTQjdYRzRnSUhSeWVTQjdYRzRnSUNBZ2NtVjBkWEp1SUdSbFkyOWtaVlZTU1VOdmJYQnZibVZ1ZENoemRISXBYRzRnSUgwZ1kyRjBZMmdnS0dWeWNpa2dlMXh1SUNBZ0lISmxkSFZ5YmlCVGRISnBibWN1Wm5KdmJVTm9ZWEpEYjJSbEtEQjRSa1pHUkNrZ0x5OGdWVlJHSURnZ2FXNTJZV3hwWkNCamFHRnlYRzRnSUgxY2JuMWNibHh1THlwY2JpQXFJRmRsSUdoaGRtVWdkRzhnYldGclpTQnpkWEpsSUhSb1lYUWdkR2hsSUhaaGJIVmxJR2x6SUdFZ2RtRnNhV1FnYVc1MFpXZGxjaTRnVkdocGN5QnRaV0Z1Y3lCMGFHRjBJR2wwWEc0Z0tpQnBjeUJ1YjI0dGJtVm5ZWFJwZG1VdUlFbDBJR2hoY3lCdWJ5Qm1jbUZqZEdsdmJtRnNJR052YlhCdmJtVnVkQ0JoYm1RZ2RHaGhkQ0JwZENCa2IyVnpJRzV2ZEZ4dUlDb2daWGhqWldWa0lIUm9aU0J0WVhocGJYVnRJR0ZzYkc5M1pXUWdkbUZzZFdVdVhHNGdLaTljYm1aMWJtTjBhVzl1SUhabGNtbG1kV2x1ZENBb2RtRnNkV1VzSUcxaGVDa2dlMXh1SUNCaGMzTmxjblFvZEhsd1pXOW1JSFpoYkhWbElEMDlQU0FuYm5WdFltVnlKeXdnSjJOaGJtNXZkQ0IzY21sMFpTQmhJRzV2YmkxdWRXMWlaWElnWVhNZ1lTQnVkVzFpWlhJbktWeHVJQ0JoYzNObGNuUW9kbUZzZFdVZ1BqMGdNQ3dnSjNOd1pXTnBabWxsWkNCaElHNWxaMkYwYVhabElIWmhiSFZsSUdadmNpQjNjbWwwYVc1bklHRnVJSFZ1YzJsbmJtVmtJSFpoYkhWbEp5bGNiaUFnWVhOelpYSjBLSFpoYkhWbElEdzlJRzFoZUN3Z0ozWmhiSFZsSUdseklHeGhjbWRsY2lCMGFHRnVJRzFoZUdsdGRXMGdkbUZzZFdVZ1ptOXlJSFI1Y0dVbktWeHVJQ0JoYzNObGNuUW9UV0YwYUM1bWJHOXZjaWgyWVd4MVpTa2dQVDA5SUhaaGJIVmxMQ0FuZG1Gc2RXVWdhR0Z6SUdFZ1puSmhZM1JwYjI1aGJDQmpiMjF3YjI1bGJuUW5LVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQjJaWEpwWm5OcGJuUWdLSFpoYkhWbExDQnRZWGdzSUcxcGJpa2dlMXh1SUNCaGMzTmxjblFvZEhsd1pXOW1JSFpoYkhWbElEMDlQU0FuYm5WdFltVnlKeXdnSjJOaGJtNXZkQ0IzY21sMFpTQmhJRzV2YmkxdWRXMWlaWElnWVhNZ1lTQnVkVzFpWlhJbktWeHVJQ0JoYzNObGNuUW9kbUZzZFdVZ1BEMGdiV0Y0TENBbmRtRnNkV1VnYkdGeVoyVnlJSFJvWVc0Z2JXRjRhVzExYlNCaGJHeHZkMlZrSUhaaGJIVmxKeWxjYmlBZ1lYTnpaWEowS0haaGJIVmxJRDQ5SUcxcGJpd2dKM1poYkhWbElITnRZV3hzWlhJZ2RHaGhiaUJ0YVc1cGJYVnRJR0ZzYkc5M1pXUWdkbUZzZFdVbktWeHVJQ0JoYzNObGNuUW9UV0YwYUM1bWJHOXZjaWgyWVd4MVpTa2dQVDA5SUhaaGJIVmxMQ0FuZG1Gc2RXVWdhR0Z6SUdFZ1puSmhZM1JwYjI1aGJDQmpiMjF3YjI1bGJuUW5LVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQjJaWEpwWmtsRlJVVTNOVFFnS0haaGJIVmxMQ0J0WVhnc0lHMXBiaWtnZTF4dUlDQmhjM05sY25Rb2RIbHdaVzltSUhaaGJIVmxJRDA5UFNBbmJuVnRZbVZ5Snl3Z0oyTmhibTV2ZENCM2NtbDBaU0JoSUc1dmJpMXVkVzFpWlhJZ1lYTWdZU0J1ZFcxaVpYSW5LVnh1SUNCaGMzTmxjblFvZG1Gc2RXVWdQRDBnYldGNExDQW5kbUZzZFdVZ2JHRnlaMlZ5SUhSb1lXNGdiV0Y0YVcxMWJTQmhiR3h2ZDJWa0lIWmhiSFZsSnlsY2JpQWdZWE56WlhKMEtIWmhiSFZsSUQ0OUlHMXBiaXdnSjNaaGJIVmxJSE50WVd4c1pYSWdkR2hoYmlCdGFXNXBiWFZ0SUdGc2JHOTNaV1FnZG1Gc2RXVW5LVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmhjM05sY25RZ0tIUmxjM1FzSUcxbGMzTmhaMlVwSUh0Y2JpQWdhV1lnS0NGMFpYTjBLU0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9iV1Z6YzJGblpTQjhmQ0FuUm1GcGJHVmtJR0Z6YzJWeWRHbHZiaWNwWEc1OVhHNGlYWDA9XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxidWZmZXJcXFxcaW5kZXguanNcIixcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcYnVmZmVyXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtO1xuICB2YXIgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMTtcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDE7XG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMTtcbiAgdmFyIG5CaXRzID0gLTc7XG4gIHZhciBpID0gaXNMRSA/IG5CeXRlcyAtIDEgOiAwO1xuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDE7XG4gIHZhciBzID0gYnVmZmVyW29mZnNldCArIGldO1xuXG4gIGkgKz0gZDtcblxuICBlID0gcyAmICgxIDw8IC1uQml0cykgLSAxO1xuICBzID4+PSAtbkJpdHM7XG4gIG5CaXRzICs9IGVMZW47XG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSBlICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgbSA9IGUgJiAoMSA8PCAtbkJpdHMpIC0gMTtcbiAgZSA+Pj0gLW5CaXRzO1xuICBuQml0cyArPSBtTGVuO1xuICBmb3IgKDsgbkJpdHMgPiAwOyBtID0gbSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIGlmIChlID09PSAwKSB7XG4gICAgZSA9IDEgLSBlQmlhcztcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAocyA/IC0xIDogMSkgKiBJbmZpbml0eTtcbiAgfSBlbHNlIHtcbiAgICBtID0gbSArIE1hdGgucG93KDIsIG1MZW4pO1xuICAgIGUgPSBlIC0gZUJpYXM7XG4gIH1cbiAgcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBNYXRoLnBvdygyLCBlIC0gbUxlbik7XG59O1xuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjO1xuICB2YXIgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMTtcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDE7XG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMTtcbiAgdmFyIHJ0ID0gbUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDA7XG4gIHZhciBpID0gaXNMRSA/IDAgOiBuQnl0ZXMgLSAxO1xuICB2YXIgZCA9IGlzTEUgPyAxIDogLTE7XG4gIHZhciBzID0gdmFsdWUgPCAwIHx8IHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDAgPyAxIDogMDtcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKTtcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMDtcbiAgICBlID0gZU1heDtcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMik7XG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tO1xuICAgICAgYyAqPSAyO1xuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gYztcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpO1xuICAgIH1cbiAgICBpZiAodmFsdWUgKiBjID49IDIpIHtcbiAgICAgIGUrKztcbiAgICAgIGMgLz0gMjtcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwO1xuICAgICAgZSA9IGVNYXg7XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICh2YWx1ZSAqIGMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pO1xuICAgICAgZSA9IGUgKyBlQmlhcztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pO1xuICAgICAgZSA9IDA7XG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCkge31cblxuICBlID0gZSA8PCBtTGVuIHwgbTtcbiAgZUxlbiArPSBtTGVuO1xuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpIHt9XG5cbiAgYnVmZmVyW29mZnNldCArIGkgLSBkXSB8PSBzICogMTI4O1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltbHVaR1Y0TG1weklsMHNJbTVoYldWeklqcGJJbVY0Y0c5eWRITWlMQ0p5WldGa0lpd2lZblZtWm1WeUlpd2liMlptYzJWMElpd2lhWE5NUlNJc0ltMU1aVzRpTENKdVFubDBaWE1pTENKbElpd2liU0lzSW1WTVpXNGlMQ0psVFdGNElpd2laVUpwWVhNaUxDSnVRbWwwY3lJc0lta2lMQ0prSWl3aWN5SXNJazVoVGlJc0lrbHVabWx1YVhSNUlpd2lUV0YwYUNJc0luQnZkeUlzSW5keWFYUmxJaXdpZG1Gc2RXVWlMQ0pqSWl3aWNuUWlMQ0poWW5NaUxDSnBjMDVoVGlJc0ltWnNiMjl5SWl3aWJHOW5JaXdpVEU0eUlsMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFVRkJRU3hSUVVGUlF5eEpRVUZTTEVkQlFXVXNWVUZCVlVNc1RVRkJWaXhGUVVGclFrTXNUVUZCYkVJc1JVRkJNRUpETEVsQlFURkNMRVZCUVdkRFF5eEpRVUZvUXl4RlFVRnpRME1zVFVGQmRFTXNSVUZCT0VNN1FVRkRNMFFzVFVGQlNVTXNRMEZCU2l4RlFVRlBReXhEUVVGUU8wRkJRMEVzVFVGQlNVTXNUMEZCVDBnc1UwRkJVeXhEUVVGVUxFZEJRV0ZFTEVsQlFXSXNSMEZCYjBJc1EwRkJMMEk3UVVGRFFTeE5RVUZKU3l4UFFVRlBMRU5CUVVNc1MwRkJTMFFzU1VGQlRpeEpRVUZqTEVOQlFYcENPMEZCUTBFc1RVRkJTVVVzVVVGQlVVUXNVVUZCVVN4RFFVRndRanRCUVVOQkxFMUJRVWxGTEZGQlFWRXNRMEZCUXl4RFFVRmlPMEZCUTBFc1RVRkJTVU1zU1VGQlNWUXNUMEZCVVVVc1UwRkJVeXhEUVVGcVFpeEhRVUZ6UWl4RFFVRTVRanRCUVVOQkxFMUJRVWxSTEVsQlFVbFdMRTlCUVU4c1EwRkJReXhEUVVGU0xFZEJRVmtzUTBGQmNFSTdRVUZEUVN4TlFVRkpWeXhKUVVGSllpeFBRVUZQUXl4VFFVRlRWU3hEUVVGb1FpeERRVUZTT3p0QlFVVkJRU3hQUVVGTFF5eERRVUZNT3p0QlFVVkJVQ3hOUVVGSlVTeEpRVUZMTEVOQlFVTXNTMEZCVFN4RFFVRkRTQ3hMUVVGU0xFbEJRV3RDTEVOQlFUTkNPMEZCUTBGSExGRkJRVThzUTBGQlEwZ3NTMEZCVWp0QlFVTkJRU3hYUVVGVFNDeEpRVUZVTzBGQlEwRXNVMEZCVDBjc1VVRkJVU3hEUVVGbUxFVkJRV3RDVEN4SlFVRkpRU3hKUVVGSkxFZEJRVW9zUjBGQlZVd3NUMEZCVDBNc1UwRkJVMVVzUTBGQmFFSXNRMEZCWkN4RlFVRnJRMEVzUzBGQlMwTXNRMEZCZGtNc1JVRkJNRU5HTEZOQlFWTXNRMEZCY2tVc1JVRkJkMFVzUTBGQlJUczdRVUZGTVVWS0xFMUJRVWxFTEVsQlFVc3NRMEZCUXl4TFFVRk5MRU5CUVVOTExFdEJRVklzU1VGQmEwSXNRMEZCTTBJN1FVRkRRVXdzVVVGQlR5eERRVUZEU3l4TFFVRlNPMEZCUTBGQkxGZEJRVk5RTEVsQlFWUTdRVUZEUVN4VFFVRlBUeXhSUVVGUkxFTkJRV1lzUlVGQmEwSktMRWxCUVVsQkxFbEJRVWtzUjBGQlNpeEhRVUZWVGl4UFFVRlBReXhUUVVGVFZTeERRVUZvUWl4RFFVRmtMRVZCUVd0RFFTeExRVUZMUXl4RFFVRjJReXhGUVVFd1EwWXNVMEZCVXl4RFFVRnlSU3hGUVVGM1JTeERRVUZGT3p0QlFVVXhSU3hOUVVGSlRDeE5RVUZOTEVOQlFWWXNSVUZCWVR0QlFVTllRU3hSUVVGSkxFbEJRVWxKTEV0QlFWSTdRVUZEUkN4SFFVWkVMRTFCUlU4c1NVRkJTVW9zVFVGQlRVY3NTVUZCVml4RlFVRm5RanRCUVVOeVFpeFhRVUZQUml4SlFVRkpVU3hIUVVGS0xFZEJRVmNzUTBGQlEwUXNTVUZCU1N4RFFVRkRMRU5CUVV3c1IwRkJVeXhEUVVGV0xFbEJRV1ZGTEZGQlFXcERPMEZCUTBRc1IwRkdUU3hOUVVWQk8wRkJRMHhVTEZGQlFVbEJMRWxCUVVsVkxFdEJRVXRETEVkQlFVd3NRMEZCVXl4RFFVRlVMRVZCUVZsa0xFbEJRVm9zUTBGQlVqdEJRVU5CUlN4UlFVRkpRU3hKUVVGSlNTeExRVUZTTzBGQlEwUTdRVUZEUkN4VFFVRlBMRU5CUVVOSkxFbEJRVWtzUTBGQlF5eERRVUZNTEVkQlFWTXNRMEZCVml4SlFVRmxVQ3hEUVVGbUxFZEJRVzFDVlN4TFFVRkxReXhIUVVGTUxFTkJRVk1zUTBGQlZDeEZRVUZaV2l4SlFVRkpSaXhKUVVGb1FpeERRVUV4UWp0QlFVTkVMRU5CTDBKRU96dEJRV2xEUVV3c1VVRkJVVzlDTEV0QlFWSXNSMEZCWjBJc1ZVRkJWV3hDTEUxQlFWWXNSVUZCYTBKdFFpeExRVUZzUWl4RlFVRjVRbXhDTEUxQlFYcENMRVZCUVdsRFF5eEpRVUZxUXl4RlFVRjFRME1zU1VGQmRrTXNSVUZCTmtORExFMUJRVGRETEVWQlFYRkVPMEZCUTI1RkxFMUJRVWxETEVOQlFVb3NSVUZCVDBNc1EwRkJVQ3hGUVVGVll5eERRVUZXTzBGQlEwRXNUVUZCU1dJc1QwRkJUMGdzVTBGQlV5eERRVUZVTEVkQlFXRkVMRWxCUVdJc1IwRkJiMElzUTBGQkwwSTdRVUZEUVN4TlFVRkpTeXhQUVVGUExFTkJRVU1zUzBGQlMwUXNTVUZCVGl4SlFVRmpMRU5CUVhwQ08wRkJRMEVzVFVGQlNVVXNVVUZCVVVRc1VVRkJVU3hEUVVGd1FqdEJRVU5CTEUxQlFVbGhMRXRCUVUxc1FpeFRRVUZUTEVWQlFWUXNSMEZCWTJFc1MwRkJTME1zUjBGQlRDeERRVUZUTEVOQlFWUXNSVUZCV1N4RFFVRkRMRVZCUVdJc1NVRkJiVUpFTEV0QlFVdERMRWRCUVV3c1EwRkJVeXhEUVVGVUxFVkJRVmtzUTBGQlF5eEZRVUZpTEVOQlFXcERMRWRCUVc5RUxFTkJRVGxFTzBGQlEwRXNUVUZCU1U0c1NVRkJTVlFzVDBGQlR5eERRVUZRTEVkQlFWbEZMRk5CUVZNc1EwRkJOMEk3UVVGRFFTeE5RVUZKVVN4SlFVRkpWaXhQUVVGUExFTkJRVkFzUjBGQlZ5eERRVUZETEVOQlFYQkNPMEZCUTBFc1RVRkJTVmNzU1VGQlNVMHNVVUZCVVN4RFFVRlNMRWxCUVdOQkxGVkJRVlVzUTBGQlZpeEpRVUZsTEVsQlFVbEJMRXRCUVVvc1IwRkJXU3hEUVVGNlF5eEhRVUU0UXl4RFFVRTVReXhIUVVGclJDeERRVUV4UkRzN1FVRkZRVUVzVlVGQlVVZ3NTMEZCUzAwc1IwRkJUQ3hEUVVGVFNDeExRVUZVTEVOQlFWSTdPMEZCUlVFc1RVRkJTVWtzVFVGQlRVb3NTMEZCVGl4TFFVRm5Ra0VzVlVGQlZVb3NVVUZCT1VJc1JVRkJkME03UVVGRGRFTlVMRkZCUVVscFFpeE5RVUZOU2l4TFFVRk9MRWxCUVdVc1EwRkJaaXhIUVVGdFFpeERRVUYyUWp0QlFVTkJaQ3hSUVVGSlJ5eEpRVUZLTzBGQlEwUXNSMEZJUkN4TlFVZFBPMEZCUTB4SUxGRkJRVWxYTEV0QlFVdFJMRXRCUVV3c1EwRkJWMUlzUzBGQlMxTXNSMEZCVEN4RFFVRlRUaXhMUVVGVUxFbEJRV3RDU0N4TFFVRkxWU3hIUVVGc1F5eERRVUZLTzBGQlEwRXNVVUZCU1ZBc1UwRkJVME1zU1VGQlNVb3NTMEZCUzBNc1IwRkJUQ3hEUVVGVExFTkJRVlFzUlVGQldTeERRVUZEV2l4RFFVRmlMRU5CUVdJc1NVRkJaME1zUTBGQmNFTXNSVUZCZFVNN1FVRkRja05CTzBGQlEwRmxMRmRCUVVzc1EwRkJURHRCUVVORU8wRkJRMFFzVVVGQlNXWXNTVUZCU1Vrc1MwRkJTaXhKUVVGaExFTkJRV3BDTEVWQlFXOUNPMEZCUTJ4Q1ZTeGxRVUZUUlN4TFFVRkxSQ3hEUVVGa08wRkJRMFFzUzBGR1JDeE5RVVZQTzBGQlEweEVMR1ZCUVZORkxFdEJRVXRNTEV0QlFVdERMRWRCUVV3c1EwRkJVeXhEUVVGVUxFVkJRVmtzU1VGQlNWSXNTMEZCYUVJc1EwRkJaRHRCUVVORU8wRkJRMFFzVVVGQlNWVXNVVUZCVVVNc1EwRkJVaXhKUVVGaExFTkJRV3BDTEVWQlFXOUNPMEZCUTJ4Q1pqdEJRVU5CWlN4WFFVRkxMRU5CUVV3N1FVRkRSRHM3UVVGRlJDeFJRVUZKWml4SlFVRkpTU3hMUVVGS0xFbEJRV0ZFTEVsQlFXcENMRVZCUVhWQ08wRkJRM0pDUml4VlFVRkpMRU5CUVVvN1FVRkRRVVFzVlVGQlNVY3NTVUZCU2p0QlFVTkVMRXRCU0VRc1RVRkhUeXhKUVVGSlNDeEpRVUZKU1N4TFFVRktMRWxCUVdFc1EwRkJha0lzUlVGQmIwSTdRVUZEZWtKSUxGVkJRVWtzUTBGQlEyRXNVVUZCVVVNc1EwRkJVaXhIUVVGWkxFTkJRV0lzU1VGQmEwSktMRXRCUVV0RExFZEJRVXdzUTBGQlV5eERRVUZVTEVWQlFWbGtMRWxCUVZvc1EwRkJkRUk3UVVGRFFVVXNWVUZCU1VFc1NVRkJTVWtzUzBGQlVqdEJRVU5FTEV0QlNFMHNUVUZIUVR0QlFVTk1TQ3hWUVVGSllTeFJRVUZSU0N4TFFVRkxReXhIUVVGTUxFTkJRVk1zUTBGQlZDeEZRVUZaVWl4UlFVRlJMRU5CUVhCQ0xFTkJRVklzUjBGQmFVTlBMRXRCUVV0RExFZEJRVXdzUTBGQlV5eERRVUZVTEVWQlFWbGtMRWxCUVZvc1EwRkJja003UVVGRFFVVXNWVUZCU1N4RFFVRktPMEZCUTBRN1FVRkRSanM3UVVGRlJDeFRRVUZQUml4UlFVRlJMRU5CUVdZc1JVRkJhMEpJTEU5QlFVOURMRk5CUVZOVkxFTkJRV2hDTEVsQlFYRkNUQ3hKUVVGSkxFbEJRWHBDTEVWQlFTdENTeXhMUVVGTFF5eERRVUZ3UXl4RlFVRjFRMDRzUzBGQlN5eEhRVUUxUXl4RlFVRnBSRWdzVVVGQlVTeERRVUV6UlN4RlFVRTRSU3hEUVVGRk96dEJRVVZvUmtVc1RVRkJTMEVzUzBGQlMwWXNTVUZCVGl4SFFVRmpSeXhEUVVGc1FqdEJRVU5CUXl4VlFVRlJTaXhKUVVGU08wRkJRMEVzVTBGQlQwa3NUMEZCVHl4RFFVRmtMRVZCUVdsQ1VDeFBRVUZQUXl4VFFVRlRWU3hEUVVGb1FpeEpRVUZ4UWs0c1NVRkJTU3hKUVVGNlFpeEZRVUVyUWswc1MwRkJTME1zUTBGQmNFTXNSVUZCZFVOUUxFdEJRVXNzUjBGQk5VTXNSVUZCYVVSRkxGRkJRVkVzUTBGQk1VVXNSVUZCTmtVc1EwRkJSVHM3UVVGRkwwVlFMRk5CUVU5RExGTkJRVk5WTEVOQlFWUXNSMEZCWVVNc1EwRkJjRUlzUzBGQk1FSkRMRWxCUVVrc1IwRkJPVUk3UVVGRFJDeERRV3hFUkNJc0ltWnBiR1VpT2lKcGJtUmxlQzVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYkltVjRjRzl5ZEhNdWNtVmhaQ0E5SUdaMWJtTjBhVzl1SUNoaWRXWm1aWElzSUc5bVpuTmxkQ3dnYVhOTVJTd2diVXhsYml3Z2JrSjVkR1Z6S1NCN1hHNGdJSFpoY2lCbExDQnRYRzRnSUhaaGNpQmxUR1Z1SUQwZ2JrSjVkR1Z6SUNvZ09DQXRJRzFNWlc0Z0xTQXhYRzRnSUhaaGNpQmxUV0Y0SUQwZ0tERWdQRHdnWlV4bGJpa2dMU0F4WEc0Z0lIWmhjaUJsUW1saGN5QTlJR1ZOWVhnZ1BqNGdNVnh1SUNCMllYSWdia0pwZEhNZ1BTQXROMXh1SUNCMllYSWdhU0E5SUdselRFVWdQeUFvYmtKNWRHVnpJQzBnTVNrZ09pQXdYRzRnSUhaaGNpQmtJRDBnYVhOTVJTQS9JQzB4SURvZ01WeHVJQ0IyWVhJZ2N5QTlJR0oxWm1abGNsdHZabVp6WlhRZ0t5QnBYVnh1WEc0Z0lHa2dLejBnWkZ4dVhHNGdJR1VnUFNCeklDWWdLQ2d4SUR3OElDZ3Ria0pwZEhNcEtTQXRJREVwWEc0Z0lITWdQajQ5SUNndGJrSnBkSE1wWEc0Z0lHNUNhWFJ6SUNzOUlHVk1aVzVjYmlBZ1ptOXlJQ2c3SUc1Q2FYUnpJRDRnTURzZ1pTQTlJR1VnS2lBeU5UWWdLeUJpZFdabVpYSmJiMlptYzJWMElDc2dhVjBzSUdrZ0t6MGdaQ3dnYmtKcGRITWdMVDBnT0NrZ2UzMWNibHh1SUNCdElEMGdaU0FtSUNnb01TQThQQ0FvTFc1Q2FYUnpLU2tnTFNBeEtWeHVJQ0JsSUQ0K1BTQW9MVzVDYVhSektWeHVJQ0J1UW1sMGN5QXJQU0J0VEdWdVhHNGdJR1p2Y2lBb095QnVRbWwwY3lBK0lEQTdJRzBnUFNCdElDb2dNalUySUNzZ1luVm1abVZ5VzI5bVpuTmxkQ0FySUdsZExDQnBJQ3M5SUdRc0lHNUNhWFJ6SUMwOUlEZ3BJSHQ5WEc1Y2JpQWdhV1lnS0dVZ1BUMDlJREFwSUh0Y2JpQWdJQ0JsSUQwZ01TQXRJR1ZDYVdGelhHNGdJSDBnWld4elpTQnBaaUFvWlNBOVBUMGdaVTFoZUNrZ2UxeHVJQ0FnSUhKbGRIVnliaUJ0SUQ4Z1RtRk9JRG9nS0NoeklEOGdMVEVnT2lBeEtTQXFJRWx1Wm1sdWFYUjVLVnh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJRzBnUFNCdElDc2dUV0YwYUM1d2IzY29NaXdnYlV4bGJpbGNiaUFnSUNCbElEMGdaU0F0SUdWQ2FXRnpYRzRnSUgxY2JpQWdjbVYwZFhKdUlDaHpJRDhnTFRFZ09pQXhLU0FxSUcwZ0tpQk5ZWFJvTG5CdmR5Z3lMQ0JsSUMwZ2JVeGxiaWxjYm4xY2JseHVaWGh3YjNKMGN5NTNjbWwwWlNBOUlHWjFibU4wYVc5dUlDaGlkV1ptWlhJc0lIWmhiSFZsTENCdlptWnpaWFFzSUdselRFVXNJRzFNWlc0c0lHNUNlWFJsY3lrZ2UxeHVJQ0IyWVhJZ1pTd2diU3dnWTF4dUlDQjJZWElnWlV4bGJpQTlJRzVDZVhSbGN5QXFJRGdnTFNCdFRHVnVJQzBnTVZ4dUlDQjJZWElnWlUxaGVDQTlJQ2d4SUR3OElHVk1aVzRwSUMwZ01WeHVJQ0IyWVhJZ1pVSnBZWE1nUFNCbFRXRjRJRDQrSURGY2JpQWdkbUZ5SUhKMElEMGdLRzFNWlc0Z1BUMDlJREl6SUQ4Z1RXRjBhQzV3YjNjb01pd2dMVEkwS1NBdElFMWhkR2d1Y0c5M0tESXNJQzAzTnlrZ09pQXdLVnh1SUNCMllYSWdhU0E5SUdselRFVWdQeUF3SURvZ0tHNUNlWFJsY3lBdElERXBYRzRnSUhaaGNpQmtJRDBnYVhOTVJTQS9JREVnT2lBdE1WeHVJQ0IyWVhJZ2N5QTlJSFpoYkhWbElEd2dNQ0I4ZkNBb2RtRnNkV1VnUFQwOUlEQWdKaVlnTVNBdklIWmhiSFZsSUR3Z01Da2dQeUF4SURvZ01GeHVYRzRnSUhaaGJIVmxJRDBnVFdGMGFDNWhZbk1vZG1Gc2RXVXBYRzVjYmlBZ2FXWWdLR2x6VG1GT0tIWmhiSFZsS1NCOGZDQjJZV3gxWlNBOVBUMGdTVzVtYVc1cGRIa3BJSHRjYmlBZ0lDQnRJRDBnYVhOT1lVNG9kbUZzZFdVcElEOGdNU0E2SURCY2JpQWdJQ0JsSUQwZ1pVMWhlRnh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJR1VnUFNCTllYUm9MbVpzYjI5eUtFMWhkR2d1Ykc5bktIWmhiSFZsS1NBdklFMWhkR2d1VEU0eUtWeHVJQ0FnSUdsbUlDaDJZV3gxWlNBcUlDaGpJRDBnVFdGMGFDNXdiM2NvTWl3Z0xXVXBLU0E4SURFcElIdGNiaUFnSUNBZ0lHVXRMVnh1SUNBZ0lDQWdZeUFxUFNBeVhHNGdJQ0FnZlZ4dUlDQWdJR2xtSUNobElDc2daVUpwWVhNZ1BqMGdNU2tnZTF4dUlDQWdJQ0FnZG1Gc2RXVWdLejBnY25RZ0x5QmpYRzRnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUhaaGJIVmxJQ3M5SUhKMElDb2dUV0YwYUM1d2IzY29NaXdnTVNBdElHVkNhV0Z6S1Z4dUlDQWdJSDFjYmlBZ0lDQnBaaUFvZG1Gc2RXVWdLaUJqSUQ0OUlESXBJSHRjYmlBZ0lDQWdJR1VySzF4dUlDQWdJQ0FnWXlBdlBTQXlYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2FXWWdLR1VnS3lCbFFtbGhjeUErUFNCbFRXRjRLU0I3WEc0Z0lDQWdJQ0J0SUQwZ01GeHVJQ0FnSUNBZ1pTQTlJR1ZOWVhoY2JpQWdJQ0I5SUdWc2MyVWdhV1lnS0dVZ0t5QmxRbWxoY3lBK1BTQXhLU0I3WEc0Z0lDQWdJQ0J0SUQwZ0tIWmhiSFZsSUNvZ1l5QXRJREVwSUNvZ1RXRjBhQzV3YjNjb01pd2diVXhsYmlsY2JpQWdJQ0FnSUdVZ1BTQmxJQ3NnWlVKcFlYTmNiaUFnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnYlNBOUlIWmhiSFZsSUNvZ1RXRjBhQzV3YjNjb01pd2daVUpwWVhNZ0xTQXhLU0FxSUUxaGRHZ3VjRzkzS0RJc0lHMU1aVzRwWEc0Z0lDQWdJQ0JsSUQwZ01GeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lHWnZjaUFvT3lCdFRHVnVJRDQ5SURnN0lHSjFabVpsY2x0dlptWnpaWFFnS3lCcFhTQTlJRzBnSmlBd2VHWm1MQ0JwSUNzOUlHUXNJRzBnTHowZ01qVTJMQ0J0VEdWdUlDMDlJRGdwSUh0OVhHNWNiaUFnWlNBOUlDaGxJRHc4SUcxTVpXNHBJSHdnYlZ4dUlDQmxUR1Z1SUNzOUlHMU1aVzVjYmlBZ1ptOXlJQ2c3SUdWTVpXNGdQaUF3T3lCaWRXWm1aWEpiYjJabWMyVjBJQ3NnYVYwZ1BTQmxJQ1lnTUhobVppd2dhU0FyUFNCa0xDQmxJQzg5SURJMU5pd2daVXhsYmlBdFBTQTRLU0I3ZlZ4dVhHNGdJR0oxWm1abGNsdHZabVp6WlhRZ0t5QnBJQzBnWkYwZ2ZEMGdjeUFxSURFeU9GeHVmVnh1SWwxOVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxcaWVlZTc1NFxcXFxpbmRleC5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxpZWVlNzU0XCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW5TZXRJbW1lZGlhdGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuc2V0SW1tZWRpYXRlO1xuICAgIHZhciBjYW5Qb3N0ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnBvc3RNZXNzYWdlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyO1xuXG4gICAgaWYgKGNhblNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cuc2V0SW1tZWRpYXRlKGYpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGlmIChjYW5Qb3N0KSB7XG4gICAgICAgIHZhciBxdWV1ZSA9IFtdO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGV2LnNvdXJjZTtcbiAgICAgICAgICAgIGlmICgoc291cmNlID09PSB3aW5kb3cgfHwgc291cmNlID09PSBudWxsKSAmJiBldi5kYXRhID09PSAncHJvY2Vzcy10aWNrJykge1xuICAgICAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmbiA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goZm4pO1xuICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKCdwcm9jZXNzLXRpY2snLCAnKicpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICB9O1xufSgpO1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbi8vIFRPRE8oc2h0eWxtYW4pXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gJy8nO1xufTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbUp5YjNkelpYSXVhbk1pWFN3aWJtRnRaWE1pT2xzaWNISnZZMlZ6Y3lJc0ltMXZaSFZzWlNJc0ltVjRjRzl5ZEhNaUxDSnVaWGgwVkdsamF5SXNJbU5oYmxObGRFbHRiV1ZrYVdGMFpTSXNJbmRwYm1SdmR5SXNJbk5sZEVsdGJXVmthV0YwWlNJc0ltTmhibEJ2YzNRaUxDSndiM04wVFdWemMyRm5aU0lzSW1Ga1pFVjJaVzUwVEdsemRHVnVaWElpTENKbUlpd2ljWFZsZFdVaUxDSmxkaUlzSW5OdmRYSmpaU0lzSW1SaGRHRWlMQ0p6ZEc5d1VISnZjR0ZuWVhScGIyNGlMQ0pzWlc1bmRHZ2lMQ0ptYmlJc0luTm9hV1owSWl3aWNIVnphQ0lzSW5ObGRGUnBiV1Z2ZFhRaUxDSjBhWFJzWlNJc0ltSnliM2R6WlhJaUxDSmxibllpTENKaGNtZDJJaXdpYm05dmNDSXNJbTl1SWl3aVlXUmtUR2x6ZEdWdVpYSWlMQ0p2Ym1ObElpd2liMlptSWl3aWNtVnRiM1psVEdsemRHVnVaWElpTENKeVpXMXZkbVZCYkd4TWFYTjBaVzVsY25NaUxDSmxiV2wwSWl3aVltbHVaR2x1WnlJc0ltNWhiV1VpTENKRmNuSnZjaUlzSW1OM1pDSXNJbU5vWkdseUlpd2laR2x5SWwwc0ltMWhjSEJwYm1keklqb2lPenRCUVVGQk96dEJRVVZCTEVsQlFVbEJMRlZCUVZWRExFOUJRVTlETEU5QlFWQXNSMEZCYVVJc1JVRkJMMEk3TzBGQlJVRkdMRkZCUVZGSExGRkJRVklzUjBGQmIwSXNXVUZCV1R0QlFVTTFRaXhSUVVGSlF5eHJRa0ZCYTBJc1QwRkJUME1zVFVGQlVDeExRVUZyUWl4WFFVRnNRaXhKUVVOdVFrRXNUMEZCVDBNc1dVRkVWanRCUVVWQkxGRkJRVWxETEZWQlFWVXNUMEZCVDBZc1RVRkJVQ3hMUVVGclFpeFhRVUZzUWl4SlFVTllRU3hQUVVGUFJ5eFhRVVJKTEVsQlExZElMRTlCUVU5SkxHZENRVVJvUXpzN1FVRkpRU3hSUVVGSlRDeGxRVUZLTEVWQlFYRkNPMEZCUTJwQ0xHVkJRVThzVlVGQlZVMHNRMEZCVml4RlFVRmhPMEZCUVVVc2JVSkJRVTlNTEU5QlFVOURMRmxCUVZBc1EwRkJiMEpKTEVOQlFYQkNMRU5CUVZBN1FVRkJLMElzVTBGQmNrUTdRVUZEU0RzN1FVRkZSQ3hSUVVGSlNDeFBRVUZLTEVWQlFXRTdRVUZEVkN4WlFVRkpTU3hSUVVGUkxFVkJRVm83UVVGRFFVNHNaVUZCVDBrc1owSkJRVkFzUTBGQmQwSXNVMEZCZUVJc1JVRkJiVU1zVlVGQlZVY3NSVUZCVml4RlFVRmpPMEZCUXpkRExHZENRVUZKUXl4VFFVRlRSQ3hIUVVGSFF5eE5RVUZvUWp0QlFVTkJMR2RDUVVGSkxFTkJRVU5CTEZkQlFWZFNMRTFCUVZnc1NVRkJjVUpSTEZkQlFWY3NTVUZCYWtNc1MwRkJNRU5FTEVkQlFVZEZMRWxCUVVnc1MwRkJXU3hqUVVFeFJDeEZRVUV3UlR0QlFVTjBSVVlzYlVKQlFVZEhMR1ZCUVVnN1FVRkRRU3h2UWtGQlNVb3NUVUZCVFVzc1RVRkJUaXhIUVVGbExFTkJRVzVDTEVWQlFYTkNPMEZCUTJ4Q0xIZENRVUZKUXl4TFFVRkxUaXhOUVVGTlR5eExRVUZPTEVWQlFWUTdRVUZEUVVRN1FVRkRTRHRCUVVOS08wRkJRMG9zVTBGVVJDeEZRVk5ITEVsQlZFZzdPMEZCVjBFc1pVRkJUeXhUUVVGVFpDeFJRVUZVTEVOQlFXdENZeXhGUVVGc1FpeEZRVUZ6UWp0QlFVTjZRazRzYTBKQlFVMVJMRWxCUVU0c1EwRkJWMFlzUlVGQldEdEJRVU5CV2l4dFFrRkJUMGNzVjBGQlVDeERRVUZ0UWl4alFVRnVRaXhGUVVGdFF5eEhRVUZ1UXp0QlFVTklMRk5CU0VRN1FVRkpTRHM3UVVGRlJDeFhRVUZQTEZOQlFWTk1MRkZCUVZRc1EwRkJhMEpqTEVWQlFXeENMRVZCUVhOQ08wRkJRM3BDUnl4dFFrRkJWMGdzUlVGQldDeEZRVUZsTEVOQlFXWTdRVUZEU0N4TFFVWkVPMEZCUjBnc1EwRnFRMnRDTEVWQlFXNUNPenRCUVcxRFFXcENMRkZCUVZGeFFpeExRVUZTTEVkQlFXZENMRk5CUVdoQ08wRkJRMEZ5UWl4UlFVRlJjMElzVDBGQlVpeEhRVUZyUWl4SlFVRnNRanRCUVVOQmRFSXNVVUZCVVhWQ0xFZEJRVklzUjBGQll5eEZRVUZrTzBGQlEwRjJRaXhSUVVGUmQwSXNTVUZCVWl4SFFVRmxMRVZCUVdZN08wRkJSVUVzVTBGQlUwTXNTVUZCVkN4SFFVRm5RaXhEUVVGRk96dEJRVVZzUW5wQ0xGRkJRVkV3UWl4RlFVRlNMRWRCUVdGRUxFbEJRV0k3UVVGRFFYcENMRkZCUVZFeVFpeFhRVUZTTEVkQlFYTkNSaXhKUVVGMFFqdEJRVU5CZWtJc1VVRkJVVFJDTEVsQlFWSXNSMEZCWlVnc1NVRkJaanRCUVVOQmVrSXNVVUZCVVRaQ0xFZEJRVklzUjBGQlkwb3NTVUZCWkR0QlFVTkJla0lzVVVGQlVUaENMR05CUVZJc1IwRkJlVUpNTEVsQlFYcENPMEZCUTBGNlFpeFJRVUZSSzBJc2EwSkJRVklzUjBGQk5rSk9MRWxCUVRkQ08wRkJRMEY2UWl4UlFVRlJaME1zU1VGQlVpeEhRVUZsVUN4SlFVRm1PenRCUVVWQmVrSXNVVUZCVVdsRExFOUJRVklzUjBGQmEwSXNWVUZCVlVNc1NVRkJWaXhGUVVGblFqdEJRVU01UWl4VlFVRk5MRWxCUVVsRExFdEJRVW9zUTBGQlZTeHJRMEZCVml4RFFVRk9PMEZCUTBnc1EwRkdSRHM3UVVGSlFUdEJRVU5CYmtNc1VVRkJVVzlETEVkQlFWSXNSMEZCWXl4WlFVRlpPMEZCUVVVc1YwRkJUeXhIUVVGUU8wRkJRVmtzUTBGQmVFTTdRVUZEUVhCRExGRkJRVkZ4UXl4TFFVRlNMRWRCUVdkQ0xGVkJRVlZETEVkQlFWWXNSVUZCWlR0QlFVTXpRaXhWUVVGTkxFbEJRVWxJTEV0QlFVb3NRMEZCVlN4blEwRkJWaXhEUVVGT08wRkJRMGdzUTBGR1JDSXNJbVpwYkdVaU9pSmljbTkzYzJWeUxtcHpJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpTHk4Z2MyaHBiU0JtYjNJZ2RYTnBibWNnY0hKdlkyVnpjeUJwYmlCaWNtOTNjMlZ5WEc1Y2JuWmhjaUJ3Y205alpYTnpJRDBnYlc5a2RXeGxMbVY0Y0c5eWRITWdQU0I3ZlR0Y2JseHVjSEp2WTJWemN5NXVaWGgwVkdsamF5QTlJQ2htZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnZG1GeUlHTmhibE5sZEVsdGJXVmthV0YwWlNBOUlIUjVjR1Z2WmlCM2FXNWtiM2NnSVQwOUlDZDFibVJsWm1sdVpXUW5YRzRnSUNBZ0ppWWdkMmx1Wkc5M0xuTmxkRWx0YldWa2FXRjBaVHRjYmlBZ0lDQjJZWElnWTJGdVVHOXpkQ0E5SUhSNWNHVnZaaUIzYVc1a2IzY2dJVDA5SUNkMWJtUmxabWx1WldRblhHNGdJQ0FnSmlZZ2QybHVaRzkzTG5CdmMzUk5aWE56WVdkbElDWW1JSGRwYm1SdmR5NWhaR1JGZG1WdWRFeHBjM1JsYm1WeVhHNGdJQ0FnTzF4dVhHNGdJQ0FnYVdZZ0tHTmhibE5sZEVsdGJXVmthV0YwWlNrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z1puVnVZM1JwYjI0Z0tHWXBJSHNnY21WMGRYSnVJSGRwYm1SdmR5NXpaWFJKYlcxbFpHbGhkR1VvWmlrZ2ZUdGNiaUFnSUNCOVhHNWNiaUFnSUNCcFppQW9ZMkZ1VUc5emRDa2dlMXh1SUNBZ0lDQWdJQ0IyWVhJZ2NYVmxkV1VnUFNCYlhUdGNiaUFnSUNBZ0lDQWdkMmx1Wkc5M0xtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0oyMWxjM05oWjJVbkxDQm1kVzVqZEdsdmJpQW9aWFlwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFpoY2lCemIzVnlZMlVnUFNCbGRpNXpiM1Z5WTJVN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb0tITnZkWEpqWlNBOVBUMGdkMmx1Wkc5M0lIeDhJSE52ZFhKalpTQTlQVDBnYm5Wc2JDa2dKaVlnWlhZdVpHRjBZU0E5UFQwZ0ozQnliMk5sYzNNdGRHbGpheWNwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbGRpNXpkRzl3VUhKdmNHRm5ZWFJwYjI0b0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaUFvY1hWbGRXVXViR1Z1WjNSb0lENGdNQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjJZWElnWm00Z1BTQnhkV1YxWlM1emFHbG1kQ2dwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQm1iaWdwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnZlN3Z2RISjFaU2s3WEc1Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUdaMWJtTjBhVzl1SUc1bGVIUlVhV05yS0dadUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCeGRXVjFaUzV3ZFhOb0tHWnVLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIZHBibVJ2ZHk1d2IzTjBUV1Z6YzJGblpTZ25jSEp2WTJWemN5MTBhV05ySnl3Z0p5b25LVHRjYmlBZ0lDQWdJQ0FnZlR0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0J5WlhSMWNtNGdablZ1WTNScGIyNGdibVY0ZEZScFkyc29abTRwSUh0Y2JpQWdJQ0FnSUNBZ2MyVjBWR2x0Wlc5MWRDaG1iaXdnTUNrN1hHNGdJQ0FnZlR0Y2JuMHBLQ2s3WEc1Y2JuQnliMk5sYzNNdWRHbDBiR1VnUFNBblluSnZkM05sY2ljN1hHNXdjbTlqWlhOekxtSnliM2R6WlhJZ1BTQjBjblZsTzF4dWNISnZZMlZ6Y3k1bGJuWWdQU0I3ZlR0Y2JuQnliMk5sYzNNdVlYSm5kaUE5SUZ0ZE8xeHVYRzVtZFc1amRHbHZiaUJ1YjI5d0tDa2dlMzFjYmx4dWNISnZZMlZ6Y3k1dmJpQTlJRzV2YjNBN1hHNXdjbTlqWlhOekxtRmtaRXhwYzNSbGJtVnlJRDBnYm05dmNEdGNibkJ5YjJObGMzTXViMjVqWlNBOUlHNXZiM0E3WEc1d2NtOWpaWE56TG05bVppQTlJRzV2YjNBN1hHNXdjbTlqWlhOekxuSmxiVzkyWlV4cGMzUmxibVZ5SUQwZ2JtOXZjRHRjYm5CeWIyTmxjM011Y21WdGIzWmxRV3hzVEdsemRHVnVaWEp6SUQwZ2JtOXZjRHRjYm5CeWIyTmxjM011WlcxcGRDQTlJRzV2YjNBN1hHNWNibkJ5YjJObGMzTXVZbWx1WkdsdVp5QTlJR1oxYm1OMGFXOXVJQ2h1WVcxbEtTQjdYRzRnSUNBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0Nkd2NtOWpaWE56TG1KcGJtUnBibWNnYVhNZ2JtOTBJSE4xY0hCdmNuUmxaQ2NwTzF4dWZWeHVYRzR2THlCVVQwUlBLSE5vZEhsc2JXRnVLVnh1Y0hKdlkyVnpjeTVqZDJRZ1BTQm1kVzVqZEdsdmJpQW9LU0I3SUhKbGRIVnliaUFuTHljZ2ZUdGNibkJ5YjJObGMzTXVZMmhrYVhJZ1BTQm1kVzVqZEdsdmJpQW9aR2x5S1NCN1hHNGdJQ0FnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2R3Y205alpYTnpMbU5vWkdseUlHbHpJRzV2ZENCemRYQndiM0owWldRbktUdGNibjA3WEc0aVhYMD1cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXHByb2Nlc3NcXFxcYnJvd3Nlci5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxwcm9jZXNzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuLyoganNoaW50IGJyb3dzZXI6dHJ1ZSwgbm9kZTp0cnVlICovXG5cInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZ2xvYmFsKSB7XG5cbiAgLyogU2V0IHVwIGEgUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHNoaW0gc28gd2UgY2FuIGFuaW1hdGUgZWZmaWNpZW50bHkgRk9SXG4gICAqIEdSRUFUIEpVU1RJQ0UuICovXG4gIHZhciByZXF1ZXN0SW50ZXJ2YWwsIGNhbmNlbEludGVydmFsO1xuXG4gIChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHJhZiA9IGdsb2JhbC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgZ2xvYmFsLndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBnbG9iYWwubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IGdsb2JhbC5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IGdsb2JhbC5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSxcbiAgICAgICAgY2FmID0gZ2xvYmFsLmNhbmNlbEFuaW1hdGlvbkZyYW1lIHx8IGdsb2JhbC53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZSB8fCBnbG9iYWwubW96Q2FuY2VsQW5pbWF0aW9uRnJhbWUgfHwgZ2xvYmFsLm9DYW5jZWxBbmltYXRpb25GcmFtZSB8fCBnbG9iYWwubXNDYW5jZWxBbmltYXRpb25GcmFtZTtcblxuICAgIGlmIChyYWYgJiYgY2FmKSB7XG4gICAgICByZXF1ZXN0SW50ZXJ2YWwgPSBmdW5jdGlvbiByZXF1ZXN0SW50ZXJ2YWwoZm4sIGRlbGF5KSB7XG4gICAgICAgIHZhciBoYW5kbGUgPSB7IHZhbHVlOiBudWxsIH07XG5cbiAgICAgICAgZnVuY3Rpb24gbG9vcCgpIHtcbiAgICAgICAgICBoYW5kbGUudmFsdWUgPSByYWYobG9vcCk7XG4gICAgICAgICAgZm4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvb3AoKTtcbiAgICAgICAgcmV0dXJuIGhhbmRsZTtcbiAgICAgIH07XG5cbiAgICAgIGNhbmNlbEludGVydmFsID0gZnVuY3Rpb24gY2FuY2VsSW50ZXJ2YWwoaGFuZGxlKSB7XG4gICAgICAgIGNhZihoYW5kbGUudmFsdWUpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxdWVzdEludGVydmFsID0gc2V0SW50ZXJ2YWw7XG4gICAgICBjYW5jZWxJbnRlcnZhbCA9IGNsZWFySW50ZXJ2YWw7XG4gICAgfVxuICB9KSgpO1xuXG4gIC8qIENhdG11bGwtcm9tIHNwbGluZSBzdHVmZnMuICovXG4gIC8qXG4gIGZ1bmN0aW9uIHVwc2FtcGxlKG4sIHNwbGluZSkge1xuICAgIHZhciBwb2x5bGluZSA9IFtdLFxuICAgICAgICBsZW4gPSBzcGxpbmUubGVuZ3RoLFxuICAgICAgICBieCAgPSBzcGxpbmVbMF0sXG4gICAgICAgIGJ5ICA9IHNwbGluZVsxXSxcbiAgICAgICAgY3ggID0gc3BsaW5lWzJdLFxuICAgICAgICBjeSAgPSBzcGxpbmVbM10sXG4gICAgICAgIGR4ICA9IHNwbGluZVs0XSxcbiAgICAgICAgZHkgID0gc3BsaW5lWzVdLFxuICAgICAgICBpLCBqLCBheCwgYXksIHB4LCBxeCwgcngsIHN4LCBweSwgcXksIHJ5LCBzeSwgdDtcbiAgICAgZm9yKGkgPSA2OyBpICE9PSBzcGxpbmUubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgIGF4ID0gYng7XG4gICAgICBieCA9IGN4O1xuICAgICAgY3ggPSBkeDtcbiAgICAgIGR4ID0gc3BsaW5lW2kgICAgXTtcbiAgICAgIHB4ID0gLTAuNSAqIGF4ICsgMS41ICogYnggLSAxLjUgKiBjeCArIDAuNSAqIGR4O1xuICAgICAgcXggPSAgICAgICAgYXggLSAyLjUgKiBieCArIDIuMCAqIGN4IC0gMC41ICogZHg7XG4gICAgICByeCA9IC0wLjUgKiBheCAgICAgICAgICAgICsgMC41ICogY3ggICAgICAgICAgIDtcbiAgICAgIHN4ID0gICAgICAgICAgICAgICAgICAgYnggICAgICAgICAgICAgICAgICAgICAgO1xuICAgICAgIGF5ID0gYnk7XG4gICAgICBieSA9IGN5O1xuICAgICAgY3kgPSBkeTtcbiAgICAgIGR5ID0gc3BsaW5lW2kgKyAxXTtcbiAgICAgIHB5ID0gLTAuNSAqIGF5ICsgMS41ICogYnkgLSAxLjUgKiBjeSArIDAuNSAqIGR5O1xuICAgICAgcXkgPSAgICAgICAgYXkgLSAyLjUgKiBieSArIDIuMCAqIGN5IC0gMC41ICogZHk7XG4gICAgICByeSA9IC0wLjUgKiBheSAgICAgICAgICAgICsgMC41ICogY3kgICAgICAgICAgIDtcbiAgICAgIHN5ID0gICAgICAgICAgICAgICAgICAgYnkgICAgICAgICAgICAgICAgICAgICAgO1xuICAgICAgIGZvcihqID0gMDsgaiAhPT0gbjsgKytqKSB7XG4gICAgICAgIHQgPSBqIC8gbjtcbiAgICAgICAgIHBvbHlsaW5lLnB1c2goXG4gICAgICAgICAgKChweCAqIHQgKyBxeCkgKiB0ICsgcngpICogdCArIHN4LFxuICAgICAgICAgICgocHkgKiB0ICsgcXkpICogdCArIHJ5KSAqIHQgKyBzeVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgICAgcG9seWxpbmUucHVzaChcbiAgICAgIHB4ICsgcXggKyByeCArIHN4LFxuICAgICAgcHkgKyBxeSArIHJ5ICsgc3lcbiAgICApO1xuICAgICByZXR1cm4gcG9seWxpbmU7XG4gIH1cbiAgIGZ1bmN0aW9uIGRvd25zYW1wbGUobiwgcG9seWxpbmUpIHtcbiAgICB2YXIgbGVuID0gMCxcbiAgICAgICAgaSwgZHgsIGR5O1xuICAgICBmb3IoaSA9IDI7IGkgIT09IHBvbHlsaW5lLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICBkeCA9IHBvbHlsaW5lW2kgICAgXSAtIHBvbHlsaW5lW2kgLSAyXTtcbiAgICAgIGR5ID0gcG9seWxpbmVbaSArIDFdIC0gcG9seWxpbmVbaSAtIDFdO1xuICAgICAgbGVuICs9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgfVxuICAgICBsZW4gLz0gbjtcbiAgICAgdmFyIHNtYWxsID0gW10sXG4gICAgICAgIHRhcmdldCA9IGxlbixcbiAgICAgICAgbWluID0gMCxcbiAgICAgICAgbWF4LCB0O1xuICAgICBzbWFsbC5wdXNoKHBvbHlsaW5lWzBdLCBwb2x5bGluZVsxXSk7XG4gICAgIGZvcihpID0gMjsgaSAhPT0gcG9seWxpbmUubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgIGR4ID0gcG9seWxpbmVbaSAgICBdIC0gcG9seWxpbmVbaSAtIDJdO1xuICAgICAgZHkgPSBwb2x5bGluZVtpICsgMV0gLSBwb2x5bGluZVtpIC0gMV07XG4gICAgICBtYXggPSBtaW4gKyBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgIGlmKG1heCA+IHRhcmdldCkge1xuICAgICAgICB0ID0gKHRhcmdldCAtIG1pbikgLyAobWF4IC0gbWluKTtcbiAgICAgICAgIHNtYWxsLnB1c2goXG4gICAgICAgICAgcG9seWxpbmVbaSAtIDJdICsgZHggKiB0LFxuICAgICAgICAgIHBvbHlsaW5lW2kgLSAxXSArIGR5ICogdFxuICAgICAgICApO1xuICAgICAgICAgdGFyZ2V0ICs9IGxlbjtcbiAgICAgIH1cbiAgICAgICBtaW4gPSBtYXg7XG4gICAgfVxuICAgICBzbWFsbC5wdXNoKHBvbHlsaW5lW3BvbHlsaW5lLmxlbmd0aCAtIDJdLCBwb2x5bGluZVtwb2x5bGluZS5sZW5ndGggLSAxXSk7XG4gICAgIHJldHVybiBzbWFsbDtcbiAgfVxuICAqL1xuXG4gIC8qIERlZmluZSBza3ljb24gdGhpbmdzLiAqL1xuICAvKiBGSVhNRTogSSdtICpyZWFsbHkgcmVhbGx5KiBzb3JyeSB0aGF0IHRoaXMgY29kZSBpcyBzbyBncm9zcy4gUmVhbGx5LCBJIGFtLlxuICAgKiBJJ2xsIHRyeSB0byBjbGVhbiBpdCB1cCBldmVudHVhbGx5ISBQcm9taXNlISAqL1xuICB2YXIgS0VZRlJBTUUgPSA1MDAsXG4gICAgICBTVFJPS0UgPSAwLjA4LFxuICAgICAgVEFVID0gMi4wICogTWF0aC5QSSxcbiAgICAgIFRXT19PVkVSX1NRUlRfMiA9IDIuMCAvIE1hdGguc3FydCgyKTtcblxuICBmdW5jdGlvbiBjaXJjbGUoY3R4LCB4LCB5LCByKSB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoeCwgeSwgciwgMCwgVEFVLCBmYWxzZSk7XG4gICAgY3R4LmZpbGwoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpbmUoY3R4LCBheCwgYXksIGJ4LCBieSkge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKGF4LCBheSk7XG4gICAgY3R4LmxpbmVUbyhieCwgYnkpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHB1ZmYoY3R4LCB0LCBjeCwgY3ksIHJ4LCByeSwgcm1pbiwgcm1heCkge1xuICAgIHZhciBjID0gTWF0aC5jb3ModCAqIFRBVSksXG4gICAgICAgIHMgPSBNYXRoLnNpbih0ICogVEFVKTtcblxuICAgIHJtYXggLT0gcm1pbjtcblxuICAgIGNpcmNsZShjdHgsIGN4IC0gcyAqIHJ4LCBjeSArIGMgKiByeSArIHJtYXggKiAwLjUsIHJtaW4gKyAoMSAtIGMgKiAwLjUpICogcm1heCk7XG4gIH1cblxuICBmdW5jdGlvbiBwdWZmcyhjdHgsIHQsIGN4LCBjeSwgcngsIHJ5LCBybWluLCBybWF4KSB7XG4gICAgdmFyIGk7XG5cbiAgICBmb3IgKGkgPSA1OyBpLS07KSB7XG4gICAgICBwdWZmKGN0eCwgdCArIGkgLyA1LCBjeCwgY3ksIHJ4LCByeSwgcm1pbiwgcm1heCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xvdWQoY3R4LCB0LCBjeCwgY3ksIGN3LCBzLCBjb2xvcikge1xuICAgIHQgLz0gMzAwMDA7XG5cbiAgICB2YXIgYSA9IGN3ICogMC4yMSxcbiAgICAgICAgYiA9IGN3ICogMC4xMixcbiAgICAgICAgYyA9IGN3ICogMC4yNCxcbiAgICAgICAgZCA9IGN3ICogMC4yODtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICBwdWZmcyhjdHgsIHQsIGN4LCBjeSwgYSwgYiwgYywgZCk7XG5cbiAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2Rlc3RpbmF0aW9uLW91dCc7XG4gICAgcHVmZnMoY3R4LCB0LCBjeCwgY3ksIGEsIGIsIGMgLSBzLCBkIC0gcyk7XG4gICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdzb3VyY2Utb3Zlcic7XG4gIH1cblxuICBmdW5jdGlvbiBzdW4oY3R4LCB0LCBjeCwgY3ksIGN3LCBzLCBjb2xvcikge1xuICAgIHQgLz0gMTIwMDAwO1xuXG4gICAgdmFyIGEgPSBjdyAqIDAuMjUgLSBzICogMC41LFxuICAgICAgICBiID0gY3cgKiAwLjMyICsgcyAqIDAuNSxcbiAgICAgICAgYyA9IGN3ICogMC41MCAtIHMgKiAwLjUsXG4gICAgICAgIGksXG4gICAgICAgIHAsXG4gICAgICAgIGNvcyxcbiAgICAgICAgc2luO1xuXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgY3R4LmxpbmVXaWR0aCA9IHM7XG4gICAgY3R4LmxpbmVDYXAgPSBcInJvdW5kXCI7XG4gICAgY3R4LmxpbmVKb2luID0gXCJyb3VuZFwiO1xuXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoY3gsIGN5LCBhLCAwLCBUQVUsIGZhbHNlKTtcbiAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICBmb3IgKGkgPSA4OyBpLS07KSB7XG4gICAgICBwID0gKHQgKyBpIC8gOCkgKiBUQVU7XG4gICAgICBjb3MgPSBNYXRoLmNvcyhwKTtcbiAgICAgIHNpbiA9IE1hdGguc2luKHApO1xuICAgICAgbGluZShjdHgsIGN4ICsgY29zICogYiwgY3kgKyBzaW4gKiBiLCBjeCArIGNvcyAqIGMsIGN5ICsgc2luICogYyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbW9vbihjdHgsIHQsIGN4LCBjeSwgY3csIHMsIGNvbG9yKSB7XG4gICAgdCAvPSAxNTAwMDtcblxuICAgIHZhciBhID0gY3cgKiAwLjI5IC0gcyAqIDAuNSxcbiAgICAgICAgYiA9IGN3ICogMC4wNSxcbiAgICAgICAgYyA9IE1hdGguY29zKHQgKiBUQVUpLFxuICAgICAgICBwID0gYyAqIFRBVSAvIC0xNjtcblxuICAgIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgIGN0eC5saW5lV2lkdGggPSBzO1xuICAgIGN0eC5saW5lQ2FwID0gXCJyb3VuZFwiO1xuICAgIGN0eC5saW5lSm9pbiA9IFwicm91bmRcIjtcblxuICAgIGN4ICs9IGMgKiBiO1xuXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoY3gsIGN5LCBhLCBwICsgVEFVIC8gOCwgcCArIFRBVSAqIDcgLyA4LCBmYWxzZSk7XG4gICAgY3R4LmFyYyhjeCArIE1hdGguY29zKHApICogYSAqIFRXT19PVkVSX1NRUlRfMiwgY3kgKyBNYXRoLnNpbihwKSAqIGEgKiBUV09fT1ZFUl9TUVJUXzIsIGEsIHAgKyBUQVUgKiA1IC8gOCwgcCArIFRBVSAqIDMgLyA4LCB0cnVlKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmFpbihjdHgsIHQsIGN4LCBjeSwgY3csIHMsIGNvbG9yKSB7XG4gICAgdCAvPSAxMzUwO1xuXG4gICAgdmFyIGEgPSBjdyAqIDAuMTYsXG4gICAgICAgIGIgPSBUQVUgKiAxMSAvIDEyLFxuICAgICAgICBjID0gVEFVICogNyAvIDEyLFxuICAgICAgICBpLFxuICAgICAgICBwLFxuICAgICAgICB4LFxuICAgICAgICB5O1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuXG4gICAgZm9yIChpID0gNDsgaS0tOykge1xuICAgICAgcCA9ICh0ICsgaSAvIDQpICUgMTtcbiAgICAgIHggPSBjeCArIChpIC0gMS41KSAvIDEuNSAqIChpID09PSAxIHx8IGkgPT09IDIgPyAtMSA6IDEpICogYTtcbiAgICAgIHkgPSBjeSArIHAgKiBwICogY3c7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKHgsIHkgLSBzICogMS41KTtcbiAgICAgIGN0eC5hcmMoeCwgeSwgcyAqIDAuNzUsIGIsIGMsIGZhbHNlKTtcbiAgICAgIGN0eC5maWxsKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2xlZXQoY3R4LCB0LCBjeCwgY3ksIGN3LCBzLCBjb2xvcikge1xuICAgIHQgLz0gNzUwO1xuXG4gICAgdmFyIGEgPSBjdyAqIDAuMTg3NSxcbiAgICAgICAgYiA9IFRBVSAqIDExIC8gMTIsXG4gICAgICAgIGMgPSBUQVUgKiA3IC8gMTIsXG4gICAgICAgIGksXG4gICAgICAgIHAsXG4gICAgICAgIHgsXG4gICAgICAgIHk7XG5cbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICBjdHgubGluZVdpZHRoID0gcyAqIDAuNTtcbiAgICBjdHgubGluZUNhcCA9IFwicm91bmRcIjtcbiAgICBjdHgubGluZUpvaW4gPSBcInJvdW5kXCI7XG5cbiAgICBmb3IgKGkgPSA0OyBpLS07KSB7XG4gICAgICBwID0gKHQgKyBpIC8gNCkgJSAxO1xuICAgICAgeCA9IE1hdGguZmxvb3IoY3ggKyAoaSAtIDEuNSkgLyAxLjUgKiAoaSA9PT0gMSB8fCBpID09PSAyID8gLTEgOiAxKSAqIGEpICsgMC41O1xuICAgICAgeSA9IGN5ICsgcCAqIGN3O1xuICAgICAgbGluZShjdHgsIHgsIHkgLSBzICogMS41LCB4LCB5ICsgcyAqIDEuNSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc25vdyhjdHgsIHQsIGN4LCBjeSwgY3csIHMsIGNvbG9yKSB7XG4gICAgdCAvPSAzMDAwO1xuXG4gICAgdmFyIGEgPSBjdyAqIDAuMTYsXG4gICAgICAgIGIgPSBzICogMC43NSxcbiAgICAgICAgdSA9IHQgKiBUQVUgKiAwLjcsXG4gICAgICAgIHV4ID0gTWF0aC5jb3ModSkgKiBiLFxuICAgICAgICB1eSA9IE1hdGguc2luKHUpICogYixcbiAgICAgICAgdiA9IHUgKyBUQVUgLyAzLFxuICAgICAgICB2eCA9IE1hdGguY29zKHYpICogYixcbiAgICAgICAgdnkgPSBNYXRoLnNpbih2KSAqIGIsXG4gICAgICAgIHcgPSB1ICsgVEFVICogMiAvIDMsXG4gICAgICAgIHd4ID0gTWF0aC5jb3ModykgKiBiLFxuICAgICAgICB3eSA9IE1hdGguc2luKHcpICogYixcbiAgICAgICAgaSxcbiAgICAgICAgcCxcbiAgICAgICAgeCxcbiAgICAgICAgeTtcblxuICAgIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgIGN0eC5saW5lV2lkdGggPSBzICogMC41O1xuICAgIGN0eC5saW5lQ2FwID0gXCJyb3VuZFwiO1xuICAgIGN0eC5saW5lSm9pbiA9IFwicm91bmRcIjtcblxuICAgIGZvciAoaSA9IDQ7IGktLTspIHtcbiAgICAgIHAgPSAodCArIGkgLyA0KSAlIDE7XG4gICAgICB4ID0gY3ggKyBNYXRoLnNpbigocCArIGkgLyA0KSAqIFRBVSkgKiBhO1xuICAgICAgeSA9IGN5ICsgcCAqIGN3O1xuXG4gICAgICBsaW5lKGN0eCwgeCAtIHV4LCB5IC0gdXksIHggKyB1eCwgeSArIHV5KTtcbiAgICAgIGxpbmUoY3R4LCB4IC0gdngsIHkgLSB2eSwgeCArIHZ4LCB5ICsgdnkpO1xuICAgICAgbGluZShjdHgsIHggLSB3eCwgeSAtIHd5LCB4ICsgd3gsIHkgKyB3eSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZm9nYmFuayhjdHgsIHQsIGN4LCBjeSwgY3csIHMsIGNvbG9yKSB7XG4gICAgdCAvPSAzMDAwMDtcblxuICAgIHZhciBhID0gY3cgKiAwLjIxLFxuICAgICAgICBiID0gY3cgKiAwLjA2LFxuICAgICAgICBjID0gY3cgKiAwLjIxLFxuICAgICAgICBkID0gY3cgKiAwLjI4O1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgIHB1ZmZzKGN0eCwgdCwgY3gsIGN5LCBhLCBiLCBjLCBkKTtcblxuICAgIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnZGVzdGluYXRpb24tb3V0JztcbiAgICBwdWZmcyhjdHgsIHQsIGN4LCBjeSwgYSwgYiwgYyAtIHMsIGQgLSBzKTtcbiAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NvdXJjZS1vdmVyJztcbiAgfVxuXG4gIC8qXG4gIHZhciBXSU5EX1BBVEhTID0gW1xuICAgICAgICBkb3duc2FtcGxlKDYzLCB1cHNhbXBsZSg4LCBbXG4gICAgICAgICAgLTEuMDAsIC0wLjI4LFxuICAgICAgICAgIC0wLjc1LCAtMC4xOCxcbiAgICAgICAgICAtMC41MCwgIDAuMTIsXG4gICAgICAgICAgLTAuMjAsICAwLjEyLFxuICAgICAgICAgIC0wLjA0LCAtMC4wNCxcbiAgICAgICAgICAtMC4wNywgLTAuMTgsXG4gICAgICAgICAgLTAuMTksIC0wLjE4LFxuICAgICAgICAgIC0wLjIzLCAtMC4wNSxcbiAgICAgICAgICAtMC4xMiwgIDAuMTEsXG4gICAgICAgICAgIDAuMDIsICAwLjE2LFxuICAgICAgICAgICAwLjIwLCAgMC4xNSxcbiAgICAgICAgICAgMC41MCwgIDAuMDcsXG4gICAgICAgICAgIDAuNzUsICAwLjE4LFxuICAgICAgICAgICAxLjAwLCAgMC4yOFxuICAgICAgICBdKSksXG4gICAgICAgIGRvd25zYW1wbGUoMzEsIHVwc2FtcGxlKDE2LCBbXG4gICAgICAgICAgLTEuMDAsIC0wLjEwLFxuICAgICAgICAgIC0wLjc1LCAgMC4wMCxcbiAgICAgICAgICAtMC41MCwgIDAuMTAsXG4gICAgICAgICAgLTAuMjUsICAwLjE0LFxuICAgICAgICAgICAwLjAwLCAgMC4xMCxcbiAgICAgICAgICAgMC4yNSwgIDAuMDAsXG4gICAgICAgICAgIDAuNTAsIC0wLjEwLFxuICAgICAgICAgICAwLjc1LCAtMC4xNCxcbiAgICAgICAgICAgMS4wMCwgLTAuMTBcbiAgICAgICAgXSkpXG4gICAgICBdO1xuICAqL1xuXG4gIHZhciBXSU5EX1BBVEhTID0gW1stMC43NTAwLCAtMC4xODAwLCAtMC43MjE5LCAtMC4xNTI3LCAtMC42OTcxLCAtMC4xMjI1LCAtMC42NzM5LCAtMC4wOTEwLCAtMC42NTE2LCAtMC4wNTg4LCAtMC42Mjk4LCAtMC4wMjYyLCAtMC42MDgzLCAwLjAwNjUsIC0wLjU4NjgsIDAuMDM5NiwgLTAuNTY0MywgMC4wNzMxLCAtMC41MzcyLCAwLjEwNDEsIC0wLjUwMzMsIDAuMTI1OSwgLTAuNDY2MiwgMC4xNDA2LCAtMC40Mjc1LCAwLjE0OTMsIC0wLjM4ODEsIDAuMTUzMCwgLTAuMzQ4NywgMC4xNTI2LCAtMC4zMDk1LCAwLjE0ODgsIC0wLjI3MDgsIDAuMTQyMSwgLTAuMjMxOSwgMC4xMzQyLCAtMC4xOTQzLCAwLjEyMTcsIC0wLjE2MDAsIDAuMTAyNSwgLTAuMTI5MCwgMC4wNzg1LCAtMC4xMDEyLCAwLjA1MDksIC0wLjA3NjQsIDAuMDIwNiwgLTAuMDU0NywgLTAuMDEyMCwgLTAuMDM3OCwgLTAuMDQ3MiwgLTAuMDMyNCwgLTAuMDg1NywgLTAuMDM4OSwgLTAuMTI0MSwgLTAuMDU0NiwgLTAuMTU5OSwgLTAuMDgxNCwgLTAuMTg3NiwgLTAuMTE5MywgLTAuMTk2NCwgLTAuMTU4MiwgLTAuMTkzNSwgLTAuMTkzMSwgLTAuMTc2OSwgLTAuMjE1NywgLTAuMTQ1MywgLTAuMjI5MCwgLTAuMTA4NSwgLTAuMjMyNywgLTAuMDY5NywgLTAuMjI0MCwgLTAuMDMxNywgLTAuMjA2NCwgMC4wMDMzLCAtMC4xODUzLCAwLjAzNjIsIC0wLjE2MTMsIDAuMDY3MiwgLTAuMTM1MCwgMC4wOTYxLCAtMC4xMDUxLCAwLjEyMTMsIC0wLjA3MDYsIDAuMTM5NywgLTAuMDMzMiwgMC4xNTEyLCAwLjAwNTMsIDAuMTU4MCwgMC4wNDQyLCAwLjE2MjQsIDAuMDgzMywgMC4xNjM2LCAwLjEyMjQsIDAuMTYxNSwgMC4xNjEzLCAwLjE1NjUsIDAuMTk5OSwgMC4xNTAwLCAwLjIzNzgsIDAuMTQwMiwgMC4yNzQ5LCAwLjEyNzksIDAuMzExOCwgMC4xMTQ3LCAwLjM0ODcsIDAuMTAxNSwgMC4zODU4LCAwLjA4OTIsIDAuNDIzNiwgMC4wNzg3LCAwLjQ2MjEsIDAuMDcxNSwgMC41MDEyLCAwLjA3MDIsIDAuNTM5OCwgMC4wNzY2LCAwLjU3NjgsIDAuMDg5MCwgMC42MTIzLCAwLjEwNTUsIDAuNjQ2NiwgMC4xMjQ0LCAwLjY4MDUsIDAuMTQ0MCwgMC43MTQ3LCAwLjE2MzAsIDAuNzUwMCwgMC4xODAwXSwgWy0wLjc1MDAsIDAuMDAwMCwgLTAuNzAzMywgMC4wMTk1LCAtMC42NTY5LCAwLjAzOTksIC0wLjYxMDQsIDAuMDYwMCwgLTAuNTYzNCwgMC4wNzg5LCAtMC41MTU1LCAwLjA5NTQsIC0wLjQ2NjcsIDAuMTA4OSwgLTAuNDE3NCwgMC4xMjA2LCAtMC4zNjc2LCAwLjEyOTksIC0wLjMxNzQsIDAuMTM2NSwgLTAuMjY2OSwgMC4xMzk4LCAtMC4yMTYyLCAwLjEzOTEsIC0wLjE2NTgsIDAuMTM0NywgLTAuMTE1NywgMC4xMjcxLCAtMC4wNjYxLCAwLjExNjksIC0wLjAxNzAsIDAuMTA0NiwgMC4wMzE2LCAwLjA5MDMsIDAuMDc5MSwgMC4wNzI4LCAwLjEyNTksIDAuMDUzNCwgMC4xNzIzLCAwLjAzMzEsIDAuMjE4OCwgMC4wMTI5LCAwLjI2NTYsIC0wLjAwNjQsIDAuMzEyMiwgLTAuMDI2MywgMC4zNTg2LCAtMC4wNDY2LCAwLjQwNTIsIC0wLjA2NjUsIDAuNDUyNSwgLTAuMDg0NywgMC41MDA3LCAtMC4xMDAyLCAwLjU0OTcsIC0wLjExMzAsIDAuNTk5MSwgLTAuMTI0MCwgMC42NDkxLCAtMC4xMzI1LCAwLjY5OTQsIC0wLjEzODAsIDAuNzUwMCwgLTAuMTQwMF1dLFxuICAgICAgV0lORF9PRkZTRVRTID0gW3sgc3RhcnQ6IDAuMzYsIGVuZDogMC4xMSB9LCB7IHN0YXJ0OiAwLjU2LCBlbmQ6IDAuMTYgfV07XG5cbiAgZnVuY3Rpb24gbGVhZihjdHgsIHQsIHgsIHksIGN3LCBzLCBjb2xvcikge1xuICAgIHZhciBhID0gY3cgLyA4LFxuICAgICAgICBiID0gYSAvIDMsXG4gICAgICAgIGMgPSAyICogYixcbiAgICAgICAgZCA9IHQgJSAxICogVEFVLFxuICAgICAgICBlID0gTWF0aC5jb3MoZCksXG4gICAgICAgIGYgPSBNYXRoLnNpbihkKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcbiAgICBjdHgubGluZVdpZHRoID0gcztcbiAgICBjdHgubGluZUNhcCA9IFwicm91bmRcIjtcbiAgICBjdHgubGluZUpvaW4gPSBcInJvdW5kXCI7XG5cbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyh4LCB5LCBhLCBkLCBkICsgTWF0aC5QSSwgZmFsc2UpO1xuICAgIGN0eC5hcmMoeCAtIGIgKiBlLCB5IC0gYiAqIGYsIGMsIGQgKyBNYXRoLlBJLCBkLCBmYWxzZSk7XG4gICAgY3R4LmFyYyh4ICsgYyAqIGUsIHkgKyBjICogZiwgYiwgZCArIE1hdGguUEksIGQsIHRydWUpO1xuICAgIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnZGVzdGluYXRpb24tb3V0JztcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnc291cmNlLW92ZXInO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN3b29zaChjdHgsIHQsIGN4LCBjeSwgY3csIHMsIGluZGV4LCB0b3RhbCwgY29sb3IpIHtcbiAgICB0IC89IDI1MDA7XG5cbiAgICB2YXIgcGF0aCA9IFdJTkRfUEFUSFNbaW5kZXhdLFxuICAgICAgICBhID0gKHQgKyBpbmRleCAtIFdJTkRfT0ZGU0VUU1tpbmRleF0uc3RhcnQpICUgdG90YWwsXG4gICAgICAgIGMgPSAodCArIGluZGV4IC0gV0lORF9PRkZTRVRTW2luZGV4XS5lbmQpICUgdG90YWwsXG4gICAgICAgIGUgPSAodCArIGluZGV4KSAlIHRvdGFsLFxuICAgICAgICBiLFxuICAgICAgICBkLFxuICAgICAgICBmLFxuICAgICAgICBpO1xuXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XG4gICAgY3R4LmxpbmVXaWR0aCA9IHM7XG4gICAgY3R4LmxpbmVDYXAgPSBcInJvdW5kXCI7XG4gICAgY3R4LmxpbmVKb2luID0gXCJyb3VuZFwiO1xuXG4gICAgaWYgKGEgPCAxKSB7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG5cbiAgICAgIGEgKj0gcGF0aC5sZW5ndGggLyAyIC0gMTtcbiAgICAgIGIgPSBNYXRoLmZsb29yKGEpO1xuICAgICAgYSAtPSBiO1xuICAgICAgYiAqPSAyO1xuICAgICAgYiArPSAyO1xuXG4gICAgICBjdHgubW92ZVRvKGN4ICsgKHBhdGhbYiAtIDJdICogKDEgLSBhKSArIHBhdGhbYl0gKiBhKSAqIGN3LCBjeSArIChwYXRoW2IgLSAxXSAqICgxIC0gYSkgKyBwYXRoW2IgKyAxXSAqIGEpICogY3cpO1xuXG4gICAgICBpZiAoYyA8IDEpIHtcbiAgICAgICAgYyAqPSBwYXRoLmxlbmd0aCAvIDIgLSAxO1xuICAgICAgICBkID0gTWF0aC5mbG9vcihjKTtcbiAgICAgICAgYyAtPSBkO1xuICAgICAgICBkICo9IDI7XG4gICAgICAgIGQgKz0gMjtcblxuICAgICAgICBmb3IgKGkgPSBiOyBpICE9PSBkOyBpICs9IDIpIHtcbiAgICAgICAgICBjdHgubGluZVRvKGN4ICsgcGF0aFtpXSAqIGN3LCBjeSArIHBhdGhbaSArIDFdICogY3cpO1xuICAgICAgICB9Y3R4LmxpbmVUbyhjeCArIChwYXRoW2QgLSAyXSAqICgxIC0gYykgKyBwYXRoW2RdICogYykgKiBjdywgY3kgKyAocGF0aFtkIC0gMV0gKiAoMSAtIGMpICsgcGF0aFtkICsgMV0gKiBjKSAqIGN3KTtcbiAgICAgIH0gZWxzZSBmb3IgKGkgPSBiOyBpICE9PSBwYXRoLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIGN0eC5saW5lVG8oY3ggKyBwYXRoW2ldICogY3csIGN5ICsgcGF0aFtpICsgMV0gKiBjdyk7XG4gICAgICB9Y3R4LnN0cm9rZSgpO1xuICAgIH0gZWxzZSBpZiAoYyA8IDEpIHtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcblxuICAgICAgYyAqPSBwYXRoLmxlbmd0aCAvIDIgLSAxO1xuICAgICAgZCA9IE1hdGguZmxvb3IoYyk7XG4gICAgICBjIC09IGQ7XG4gICAgICBkICo9IDI7XG4gICAgICBkICs9IDI7XG5cbiAgICAgIGN0eC5tb3ZlVG8oY3ggKyBwYXRoWzBdICogY3csIGN5ICsgcGF0aFsxXSAqIGN3KTtcblxuICAgICAgZm9yIChpID0gMjsgaSAhPT0gZDsgaSArPSAyKSB7XG4gICAgICAgIGN0eC5saW5lVG8oY3ggKyBwYXRoW2ldICogY3csIGN5ICsgcGF0aFtpICsgMV0gKiBjdyk7XG4gICAgICB9Y3R4LmxpbmVUbyhjeCArIChwYXRoW2QgLSAyXSAqICgxIC0gYykgKyBwYXRoW2RdICogYykgKiBjdywgY3kgKyAocGF0aFtkIC0gMV0gKiAoMSAtIGMpICsgcGF0aFtkICsgMV0gKiBjKSAqIGN3KTtcblxuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIGlmIChlIDwgMSkge1xuICAgICAgZSAqPSBwYXRoLmxlbmd0aCAvIDIgLSAxO1xuICAgICAgZiA9IE1hdGguZmxvb3IoZSk7XG4gICAgICBlIC09IGY7XG4gICAgICBmICo9IDI7XG4gICAgICBmICs9IDI7XG5cbiAgICAgIGxlYWYoY3R4LCB0LCBjeCArIChwYXRoW2YgLSAyXSAqICgxIC0gZSkgKyBwYXRoW2ZdICogZSkgKiBjdywgY3kgKyAocGF0aFtmIC0gMV0gKiAoMSAtIGUpICsgcGF0aFtmICsgMV0gKiBlKSAqIGN3LCBjdywgcywgY29sb3IpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBTa3ljb25zID0gZnVuY3Rpb24gU2t5Y29ucyhvcHRzKSB7XG4gICAgdGhpcy5saXN0ID0gW107XG4gICAgdGhpcy5pbnRlcnZhbCA9IG51bGw7XG4gICAgdGhpcy5jb2xvciA9IG9wdHMgJiYgb3B0cy5jb2xvciA/IG9wdHMuY29sb3IgOiBcImJsYWNrXCI7XG4gICAgdGhpcy5yZXNpemVDbGVhciA9ICEhKG9wdHMgJiYgb3B0cy5yZXNpemVDbGVhcik7XG4gIH07XG5cbiAgU2t5Y29ucy5DTEVBUl9EQVkgPSBmdW5jdGlvbiAoY3R4LCB0LCBjb2xvcikge1xuICAgIHZhciB3ID0gY3R4LmNhbnZhcy53aWR0aCxcbiAgICAgICAgaCA9IGN0eC5jYW52YXMuaGVpZ2h0LFxuICAgICAgICBzID0gTWF0aC5taW4odywgaCk7XG5cbiAgICBzdW4oY3R4LCB0LCB3ICogMC41LCBoICogMC41LCBzLCBzICogU1RST0tFLCBjb2xvcik7XG4gIH07XG5cbiAgU2t5Y29ucy5DTEVBUl9OSUdIVCA9IGZ1bmN0aW9uIChjdHgsIHQsIGNvbG9yKSB7XG4gICAgdmFyIHcgPSBjdHguY2FudmFzLndpZHRoLFxuICAgICAgICBoID0gY3R4LmNhbnZhcy5oZWlnaHQsXG4gICAgICAgIHMgPSBNYXRoLm1pbih3LCBoKTtcblxuICAgIG1vb24oY3R4LCB0LCB3ICogMC41LCBoICogMC41LCBzLCBzICogU1RST0tFLCBjb2xvcik7XG4gIH07XG5cbiAgU2t5Y29ucy5QQVJUTFlfQ0xPVURZX0RBWSA9IGZ1bmN0aW9uIChjdHgsIHQsIGNvbG9yKSB7XG4gICAgdmFyIHcgPSBjdHguY2FudmFzLndpZHRoLFxuICAgICAgICBoID0gY3R4LmNhbnZhcy5oZWlnaHQsXG4gICAgICAgIHMgPSBNYXRoLm1pbih3LCBoKTtcblxuICAgIHN1bihjdHgsIHQsIHcgKiAwLjYyNSwgaCAqIDAuMzc1LCBzICogMC43NSwgcyAqIFNUUk9LRSwgY29sb3IpO1xuICAgIGNsb3VkKGN0eCwgdCwgdyAqIDAuMzc1LCBoICogMC42MjUsIHMgKiAwLjc1LCBzICogU1RST0tFLCBjb2xvcik7XG4gIH07XG5cbiAgU2t5Y29ucy5QQVJUTFlfQ0xPVURZX05JR0hUID0gZnVuY3Rpb24gKGN0eCwgdCwgY29sb3IpIHtcbiAgICB2YXIgdyA9IGN0eC5jYW52YXMud2lkdGgsXG4gICAgICAgIGggPSBjdHguY2FudmFzLmhlaWdodCxcbiAgICAgICAgcyA9IE1hdGgubWluKHcsIGgpO1xuXG4gICAgbW9vbihjdHgsIHQsIHcgKiAwLjY2NywgaCAqIDAuMzc1LCBzICogMC43NSwgcyAqIFNUUk9LRSwgY29sb3IpO1xuICAgIGNsb3VkKGN0eCwgdCwgdyAqIDAuMzc1LCBoICogMC42MjUsIHMgKiAwLjc1LCBzICogU1RST0tFLCBjb2xvcik7XG4gIH07XG5cbiAgU2t5Y29ucy5DTE9VRFkgPSBmdW5jdGlvbiAoY3R4LCB0LCBjb2xvcikge1xuICAgIHZhciB3ID0gY3R4LmNhbnZhcy53aWR0aCxcbiAgICAgICAgaCA9IGN0eC5jYW52YXMuaGVpZ2h0LFxuICAgICAgICBzID0gTWF0aC5taW4odywgaCk7XG5cbiAgICBjbG91ZChjdHgsIHQsIHcgKiAwLjUsIGggKiAwLjUsIHMsIHMgKiBTVFJPS0UsIGNvbG9yKTtcbiAgfTtcblxuICBTa3ljb25zLlJBSU4gPSBmdW5jdGlvbiAoY3R4LCB0LCBjb2xvcikge1xuICAgIHZhciB3ID0gY3R4LmNhbnZhcy53aWR0aCxcbiAgICAgICAgaCA9IGN0eC5jYW52YXMuaGVpZ2h0LFxuICAgICAgICBzID0gTWF0aC5taW4odywgaCk7XG5cbiAgICByYWluKGN0eCwgdCwgdyAqIDAuNSwgaCAqIDAuMzcsIHMgKiAwLjksIHMgKiBTVFJPS0UsIGNvbG9yKTtcbiAgICBjbG91ZChjdHgsIHQsIHcgKiAwLjUsIGggKiAwLjM3LCBzICogMC45LCBzICogU1RST0tFLCBjb2xvcik7XG4gIH07XG5cbiAgU2t5Y29ucy5TTEVFVCA9IGZ1bmN0aW9uIChjdHgsIHQsIGNvbG9yKSB7XG4gICAgdmFyIHcgPSBjdHguY2FudmFzLndpZHRoLFxuICAgICAgICBoID0gY3R4LmNhbnZhcy5oZWlnaHQsXG4gICAgICAgIHMgPSBNYXRoLm1pbih3LCBoKTtcblxuICAgIHNsZWV0KGN0eCwgdCwgdyAqIDAuNSwgaCAqIDAuMzcsIHMgKiAwLjksIHMgKiBTVFJPS0UsIGNvbG9yKTtcbiAgICBjbG91ZChjdHgsIHQsIHcgKiAwLjUsIGggKiAwLjM3LCBzICogMC45LCBzICogU1RST0tFLCBjb2xvcik7XG4gIH07XG5cbiAgU2t5Y29ucy5TTk9XID0gZnVuY3Rpb24gKGN0eCwgdCwgY29sb3IpIHtcbiAgICB2YXIgdyA9IGN0eC5jYW52YXMud2lkdGgsXG4gICAgICAgIGggPSBjdHguY2FudmFzLmhlaWdodCxcbiAgICAgICAgcyA9IE1hdGgubWluKHcsIGgpO1xuXG4gICAgc25vdyhjdHgsIHQsIHcgKiAwLjUsIGggKiAwLjM3LCBzICogMC45LCBzICogU1RST0tFLCBjb2xvcik7XG4gICAgY2xvdWQoY3R4LCB0LCB3ICogMC41LCBoICogMC4zNywgcyAqIDAuOSwgcyAqIFNUUk9LRSwgY29sb3IpO1xuICB9O1xuXG4gIFNreWNvbnMuV0lORCA9IGZ1bmN0aW9uIChjdHgsIHQsIGNvbG9yKSB7XG4gICAgdmFyIHcgPSBjdHguY2FudmFzLndpZHRoLFxuICAgICAgICBoID0gY3R4LmNhbnZhcy5oZWlnaHQsXG4gICAgICAgIHMgPSBNYXRoLm1pbih3LCBoKTtcblxuICAgIHN3b29zaChjdHgsIHQsIHcgKiAwLjUsIGggKiAwLjUsIHMsIHMgKiBTVFJPS0UsIDAsIDIsIGNvbG9yKTtcbiAgICBzd29vc2goY3R4LCB0LCB3ICogMC41LCBoICogMC41LCBzLCBzICogU1RST0tFLCAxLCAyLCBjb2xvcik7XG4gIH07XG5cbiAgU2t5Y29ucy5GT0cgPSBmdW5jdGlvbiAoY3R4LCB0LCBjb2xvcikge1xuICAgIHZhciB3ID0gY3R4LmNhbnZhcy53aWR0aCxcbiAgICAgICAgaCA9IGN0eC5jYW52YXMuaGVpZ2h0LFxuICAgICAgICBzID0gTWF0aC5taW4odywgaCksXG4gICAgICAgIGsgPSBzICogU1RST0tFO1xuXG4gICAgZm9nYmFuayhjdHgsIHQsIHcgKiAwLjUsIGggKiAwLjMyLCBzICogMC43NSwgaywgY29sb3IpO1xuXG4gICAgdCAvPSA1MDAwO1xuXG4gICAgdmFyIGEgPSBNYXRoLmNvcyh0ICogVEFVKSAqIHMgKiAwLjAyLFxuICAgICAgICBiID0gTWF0aC5jb3MoKHQgKyAwLjI1KSAqIFRBVSkgKiBzICogMC4wMixcbiAgICAgICAgYyA9IE1hdGguY29zKCh0ICsgMC41MCkgKiBUQVUpICogcyAqIDAuMDIsXG4gICAgICAgIGQgPSBNYXRoLmNvcygodCArIDAuNzUpICogVEFVKSAqIHMgKiAwLjAyLFxuICAgICAgICBuID0gaCAqIDAuOTM2LFxuICAgICAgICBlID0gTWF0aC5mbG9vcihuIC0gayAqIDAuNSkgKyAwLjUsXG4gICAgICAgIGYgPSBNYXRoLmZsb29yKG4gLSBrICogMi41KSArIDAuNTtcblxuICAgIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xuICAgIGN0eC5saW5lV2lkdGggPSBrO1xuICAgIGN0eC5saW5lQ2FwID0gXCJyb3VuZFwiO1xuICAgIGN0eC5saW5lSm9pbiA9IFwicm91bmRcIjtcblxuICAgIGxpbmUoY3R4LCBhICsgdyAqIDAuMiArIGsgKiAwLjUsIGUsIGIgKyB3ICogMC44IC0gayAqIDAuNSwgZSk7XG4gICAgbGluZShjdHgsIGMgKyB3ICogMC4yICsgayAqIDAuNSwgZiwgZCArIHcgKiAwLjggLSBrICogMC41LCBmKTtcbiAgfTtcblxuICBTa3ljb25zLnByb3RvdHlwZSA9IHtcbiAgICBfZGV0ZXJtaW5lRHJhd2luZ0Z1bmN0aW9uOiBmdW5jdGlvbiBfZGV0ZXJtaW5lRHJhd2luZ0Z1bmN0aW9uKGRyYXcpIHtcbiAgICAgIGlmICh0eXBlb2YgZHJhdyA9PT0gXCJzdHJpbmdcIikgZHJhdyA9IFNreWNvbnNbZHJhdy50b1VwcGVyQ2FzZSgpLnJlcGxhY2UoLy0vZywgXCJfXCIpXSB8fCBudWxsO1xuXG4gICAgICByZXR1cm4gZHJhdztcbiAgICB9LFxuICAgIGFkZDogZnVuY3Rpb24gYWRkKGVsLCBkcmF3KSB7XG4gICAgICB2YXIgb2JqO1xuXG4gICAgICBpZiAodHlwZW9mIGVsID09PSBcInN0cmluZ1wiKSBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsKTtcblxuICAgICAgLy8gRG9lcyBub3RoaW5nIGlmIGNhbnZhcyBuYW1lIGRvZXNuJ3QgZXhpc3RzXG4gICAgICBpZiAoZWwgPT09IG51bGwpIHJldHVybjtcblxuICAgICAgZHJhdyA9IHRoaXMuX2RldGVybWluZURyYXdpbmdGdW5jdGlvbihkcmF3KTtcblxuICAgICAgLy8gRG9lcyBub3RoaW5nIGlmIHRoZSBkcmF3IGZ1bmN0aW9uIGlzbid0IGFjdHVhbGx5IGEgZnVuY3Rpb25cbiAgICAgIGlmICh0eXBlb2YgZHJhdyAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm47XG5cbiAgICAgIG9iaiA9IHtcbiAgICAgICAgZWxlbWVudDogZWwsXG4gICAgICAgIGNvbnRleHQ6IGVsLmdldENvbnRleHQoXCIyZFwiKSxcbiAgICAgICAgZHJhd2luZzogZHJhd1xuICAgICAgfTtcblxuICAgICAgdGhpcy5saXN0LnB1c2gob2JqKTtcbiAgICAgIHRoaXMuZHJhdyhvYmosIEtFWUZSQU1FKTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gc2V0KGVsLCBkcmF3KSB7XG4gICAgICB2YXIgaTtcblxuICAgICAgaWYgKHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIikgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbCk7XG5cbiAgICAgIGZvciAoaSA9IHRoaXMubGlzdC5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgaWYgKHRoaXMubGlzdFtpXS5lbGVtZW50ID09PSBlbCkge1xuICAgICAgICAgIHRoaXMubGlzdFtpXS5kcmF3aW5nID0gdGhpcy5fZGV0ZXJtaW5lRHJhd2luZ0Z1bmN0aW9uKGRyYXcpO1xuICAgICAgICAgIHRoaXMuZHJhdyh0aGlzLmxpc3RbaV0sIEtFWUZSQU1FKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH10aGlzLmFkZChlbCwgZHJhdyk7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShlbCkge1xuICAgICAgdmFyIGk7XG5cbiAgICAgIGlmICh0eXBlb2YgZWwgPT09IFwic3RyaW5nXCIpIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWwpO1xuXG4gICAgICBmb3IgKGkgPSB0aGlzLmxpc3QubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgIGlmICh0aGlzLmxpc3RbaV0uZWxlbWVudCA9PT0gZWwpIHtcbiAgICAgICAgICB0aGlzLmxpc3Quc3BsaWNlKGksIDEpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgZHJhdzogZnVuY3Rpb24gZHJhdyhvYmosIHRpbWUpIHtcbiAgICAgIHZhciBjYW52YXMgPSBvYmouY29udGV4dC5jYW52YXM7XG5cbiAgICAgIGlmICh0aGlzLnJlc2l6ZUNsZWFyKSBjYW52YXMud2lkdGggPSBjYW52YXMud2lkdGg7ZWxzZSBvYmouY29udGV4dC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICAgICAgb2JqLmRyYXdpbmcob2JqLmNvbnRleHQsIHRpbWUsIHRoaXMuY29sb3IpO1xuICAgIH0sXG4gICAgcGxheTogZnVuY3Rpb24gcGxheSgpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgdGhpcy5pbnRlcnZhbCA9IHJlcXVlc3RJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBub3cgPSBEYXRlLm5vdygpLFxuICAgICAgICAgICAgaTtcblxuICAgICAgICBmb3IgKGkgPSBzZWxmLmxpc3QubGVuZ3RoOyBpLS07KSB7XG4gICAgICAgICAgc2VsZi5kcmF3KHNlbGYubGlzdFtpXSwgbm93KTtcbiAgICAgICAgfVxuICAgICAgfSwgMTAwMCAvIDYwKTtcbiAgICB9LFxuICAgIHBhdXNlOiBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICAgIHZhciBpO1xuXG4gICAgICBpZiAodGhpcy5pbnRlcnZhbCkge1xuICAgICAgICBjYW5jZWxJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICByZXR1cm4gU2t5Y29ucztcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbk5yZVdOdmJuTXVhbk1pWFN3aWJtRnRaWE1pT2xzaWJXOWtkV3hsSWl3aVpYaHdiM0owY3lJc0ltZHNiMkpoYkNJc0luSmxjWFZsYzNSSmJuUmxjblpoYkNJc0ltTmhibU5sYkVsdWRHVnlkbUZzSWl3aWNtRm1JaXdpY21WeGRXVnpkRUZ1YVcxaGRHbHZia1p5WVcxbElpd2lkMlZpYTJsMFVtVnhkV1Z6ZEVGdWFXMWhkR2x2YmtaeVlXMWxJaXdpYlc5NlVtVnhkV1Z6ZEVGdWFXMWhkR2x2YmtaeVlXMWxJaXdpYjFKbGNYVmxjM1JCYm1sdFlYUnBiMjVHY21GdFpTSXNJbTF6VW1WeGRXVnpkRUZ1YVcxaGRHbHZia1p5WVcxbElpd2lZMkZtSWl3aVkyRnVZMlZzUVc1cGJXRjBhVzl1Um5KaGJXVWlMQ0ozWldKcmFYUkRZVzVqWld4QmJtbHRZWFJwYjI1R2NtRnRaU0lzSW0xdmVrTmhibU5sYkVGdWFXMWhkR2x2YmtaeVlXMWxJaXdpYjBOaGJtTmxiRUZ1YVcxaGRHbHZia1p5WVcxbElpd2liWE5EWVc1alpXeEJibWx0WVhScGIyNUdjbUZ0WlNJc0ltWnVJaXdpWkdWc1lYa2lMQ0pvWVc1a2JHVWlMQ0oyWVd4MVpTSXNJbXh2YjNBaUxDSnpaWFJKYm5SbGNuWmhiQ0lzSW1Oc1pXRnlTVzUwWlhKMllXd2lMQ0pMUlZsR1VrRk5SU0lzSWxOVVVrOUxSU0lzSWxSQlZTSXNJazFoZEdnaUxDSlFTU0lzSWxSWFQxOVBWa1ZTWDFOUlVsUmZNaUlzSW5OeGNuUWlMQ0pqYVhKamJHVWlMQ0pqZEhnaUxDSjRJaXdpZVNJc0luSWlMQ0ppWldkcGJsQmhkR2dpTENKaGNtTWlMQ0ptYVd4c0lpd2liR2x1WlNJc0ltRjRJaXdpWVhraUxDSmllQ0lzSW1KNUlpd2liVzkyWlZSdklpd2liR2x1WlZSdklpd2ljM1J5YjJ0bElpd2ljSFZtWmlJc0luUWlMQ0pqZUNJc0ltTjVJaXdpY25naUxDSnllU0lzSW5KdGFXNGlMQ0p5YldGNElpd2lZeUlzSW1OdmN5SXNJbk1pTENKemFXNGlMQ0p3ZFdabWN5SXNJbWtpTENKamJHOTFaQ0lzSW1OM0lpd2lZMjlzYjNJaUxDSmhJaXdpWWlJc0ltUWlMQ0ptYVd4c1UzUjViR1VpTENKbmJHOWlZV3hEYjIxd2IzTnBkR1ZQY0dWeVlYUnBiMjRpTENKemRXNGlMQ0p3SWl3aWMzUnliMnRsVTNSNWJHVWlMQ0pzYVc1bFYybGtkR2dpTENKc2FXNWxRMkZ3SWl3aWJHbHVaVXB2YVc0aUxDSnRiMjl1SWl3aVkyeHZjMlZRWVhSb0lpd2ljbUZwYmlJc0luTnNaV1YwSWl3aVpteHZiM0lpTENKemJtOTNJaXdpZFNJc0luVjRJaXdpZFhraUxDSjJJaXdpZG5naUxDSjJlU0lzSW5jaUxDSjNlQ0lzSW5kNUlpd2labTluWW1GdWF5SXNJbGRKVGtSZlVFRlVTRk1pTENKWFNVNUVYMDlHUmxORlZGTWlMQ0p6ZEdGeWRDSXNJbVZ1WkNJc0lteGxZV1lpTENKbElpd2laaUlzSW5OM2IyOXphQ0lzSW1sdVpHVjRJaXdpZEc5MFlXd2lMQ0p3WVhSb0lpd2liR1Z1WjNSb0lpd2lVMnQ1WTI5dWN5SXNJbTl3ZEhNaUxDSnNhWE4wSWl3aWFXNTBaWEoyWVd3aUxDSnlaWE5wZW1WRGJHVmhjaUlzSWtOTVJVRlNYMFJCV1NJc0ltTmhiblpoY3lJc0luZHBaSFJvSWl3aWFDSXNJbWhsYVdkb2RDSXNJbTFwYmlJc0lrTk1SVUZTWDA1SlIwaFVJaXdpVUVGU1ZFeFpYME5NVDFWRVdWOUVRVmtpTENKUVFWSlVURmxmUTB4UFZVUlpYMDVKUjBoVUlpd2lRMHhQVlVSWklpd2lVa0ZKVGlJc0lsTk1SVVZVSWl3aVUwNVBWeUlzSWxkSlRrUWlMQ0pHVDBjaUxDSnJJaXdpYmlJc0luQnliM1J2ZEhsd1pTSXNJbDlrWlhSbGNtMXBibVZFY21GM2FXNW5SblZ1WTNScGIyNGlMQ0prY21GM0lpd2lkRzlWY0hCbGNrTmhjMlVpTENKeVpYQnNZV05sSWl3aVlXUmtJaXdpWld3aUxDSnZZbW9pTENKa2IyTjFiV1Z1ZENJc0ltZGxkRVZzWlcxbGJuUkNlVWxrSWl3aVpXeGxiV1Z1ZENJc0ltTnZiblJsZUhRaUxDSm5aWFJEYjI1MFpYaDBJaXdpWkhKaGQybHVaeUlzSW5CMWMyZ2lMQ0p6WlhRaUxDSnlaVzF2ZG1VaUxDSnpjR3hwWTJVaUxDSjBhVzFsSWl3aVkyeGxZWEpTWldOMElpd2ljR3hoZVNJc0luTmxiR1lpTENKd1lYVnpaU0lzSW01dmR5SXNJa1JoZEdVaVhTd2liV0Z3Y0dsdVozTWlPaUpCUVVGQk8wRkJRMEU3TzBGQlJVRkJMRTlCUVU5RExFOUJRVkFzUjBGQmFVSXNWVUZCVTBNc1RVRkJWQ3hGUVVGcFFqczdRVUZGYUVNN08wRkJSVUVzVFVGQlNVTXNaVUZCU2l4RlFVRnhRa01zWTBGQmNrSTdPMEZCUlVNc1pVRkJWenRCUVVOV0xGRkJRVWxETEUxQlFVMUlMRTlCUVU5SkxIRkNRVUZRTEVsQlEwRktMRTlCUVU5TExESkNRVVJRTEVsQlJVRk1MRTlCUVU5TkxIZENRVVpRTEVsQlIwRk9MRTlCUVU5UExITkNRVWhRTEVsQlNVRlFMRTlCUVU5UkxIVkNRVXBxUWp0QlFVRkJMRkZCUzBsRExFMUJRVTFVTEU5QlFVOVZMRzlDUVVGUUxFbEJRMEZXTEU5QlFVOVhMREJDUVVSUUxFbEJSVUZZTEU5QlFVOVpMSFZDUVVaUUxFbEJSMEZhTEU5QlFVOWhMSEZDUVVoUUxFbEJTVUZpTEU5QlFVOWpMSE5DUVZScVFqczdRVUZYUVN4UlFVRkhXQ3hQUVVGUFRTeEhRVUZXTEVWQlFXVTdRVUZEWWxJc2QwSkJRV3RDTEhsQ1FVRlRZeXhGUVVGVUxFVkJRV0ZETEV0QlFXSXNSVUZCYjBJN1FVRkRjRU1zV1VGQlNVTXNVMEZCVXl4RlFVRkRReXhQUVVGUExFbEJRVklzUlVGQllqczdRVUZGUVN4cFFrRkJVME1zU1VGQlZDeEhRVUZuUWp0QlFVTmtSaXhwUWtGQlQwTXNTMEZCVUN4SFFVRmxaaXhKUVVGSlowSXNTVUZCU2l4RFFVRm1PMEZCUTBGS08wRkJRMFE3TzBGQlJVUkpPMEZCUTBFc1pVRkJUMFlzVFVGQlVEdEJRVU5FTEU5QlZrUTdPMEZCV1VGbUxIVkNRVUZwUWl4M1FrRkJVMlVzVFVGQlZDeEZRVUZwUWp0QlFVTm9RMUlzV1VGQlNWRXNUMEZCVDBNc1MwRkJXRHRCUVVORUxFOUJSa1E3UVVGSFJDeExRV2hDUkN4TlFXdENTenRCUVVOSWFrSXNkMEpCUVd0Q2JVSXNWMEZCYkVJN1FVRkRRV3hDTEhWQ1FVRnBRbTFDTEdGQlFXcENPMEZCUTBRN1FVRkRSaXhIUVd4RFFTeEhRVUZFT3p0QlFXOURRVHRCUVVOQk96czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdRVUUyUmtFN1FVRkRRVHM3UVVGRlFTeE5RVUZKUXl4WFFVRlhMRWRCUVdZN1FVRkJRU3hOUVVOSlF5eFRRVUZUTEVsQlJHSTdRVUZCUVN4TlFVVkpReXhOUVVGTkxFMUJRVTFETEV0QlFVdERMRVZCUm5KQ08wRkJRVUVzVFVGSFNVTXNhMEpCUVd0Q0xFMUJRVTFHTEV0QlFVdEhMRWxCUVV3c1EwRkJWU3hEUVVGV0xFTkJTRFZDT3p0QlFVdEJMRmRCUVZORExFMUJRVlFzUTBGQlowSkRMRWRCUVdoQ0xFVkJRWEZDUXl4RFFVRnlRaXhGUVVGM1FrTXNRMEZCZUVJc1JVRkJNa0pETEVOQlFUTkNMRVZCUVRoQ08wRkJRelZDU0N4UlFVRkpTU3hUUVVGS08wRkJRMEZLTEZGQlFVbExMRWRCUVVvc1EwRkJVVW9zUTBGQlVpeEZRVUZYUXl4RFFVRllMRVZCUVdORExFTkJRV1FzUlVGQmFVSXNRMEZCYWtJc1JVRkJiMEpVTEVkQlFYQkNMRVZCUVhsQ0xFdEJRWHBDTzBGQlEwRk5MRkZCUVVsTkxFbEJRVW83UVVGRFJEczdRVUZGUkN4WFFVRlRReXhKUVVGVUxFTkJRV05RTEVkQlFXUXNSVUZCYlVKUkxFVkJRVzVDTEVWQlFYVkNReXhGUVVGMlFpeEZRVUV5UWtNc1JVRkJNMElzUlVGQkswSkRMRVZCUVM5Q0xFVkJRVzFETzBGQlEycERXQ3hSUVVGSlNTeFRRVUZLTzBGQlEwRktMRkZCUVVsWkxFMUJRVW9zUTBGQlYwb3NSVUZCV0N4RlFVRmxReXhGUVVGbU8wRkJRMEZVTEZGQlFVbGhMRTFCUVVvc1EwRkJWMGdzUlVGQldDeEZRVUZsUXl4RlFVRm1PMEZCUTBGWUxGRkJRVWxqTEUxQlFVbzdRVUZEUkRzN1FVRkZSQ3hYUVVGVFF5eEpRVUZVTEVOQlFXTm1MRWRCUVdRc1JVRkJiVUpuUWl4RFFVRnVRaXhGUVVGelFrTXNSVUZCZEVJc1JVRkJNRUpETEVWQlFURkNMRVZCUVRoQ1F5eEZRVUU1UWl4RlFVRnJRME1zUlVGQmJFTXNSVUZCYzBORExFbEJRWFJETEVWQlFUUkRReXhKUVVFMVF5eEZRVUZyUkR0QlFVTm9SQ3hSUVVGSlF5eEpRVUZKTlVJc1MwRkJTelpDTEVkQlFVd3NRMEZCVTFJc1NVRkJTWFJDTEVkQlFXSXNRMEZCVWp0QlFVRkJMRkZCUTBrclFpeEpRVUZKT1VJc1MwRkJTeXRDTEVkQlFVd3NRMEZCVTFZc1NVRkJTWFJDTEVkQlFXSXNRMEZFVWpzN1FVRkhRVFJDTEZsQlFWRkVMRWxCUVZJN08wRkJSVUYwUWl4WFFVTkZReXhIUVVSR0xFVkJSVVZwUWl4TFFVRkxVU3hKUVVGSlRpeEZRVVpZTEVWQlIwVkVMRXRCUVV0TExFbEJRVWxJTEVWQlFWUXNSMEZCWTBVc1QwRkJUeXhIUVVoMlFpeEZRVWxGUkN4UFFVRlBMRU5CUVVNc1NVRkJTVVVzU1VGQlNTeEhRVUZVTEVsQlFXZENSQ3hKUVVwNlFqdEJRVTFFT3p0QlFVVkVMRmRCUVZOTExFdEJRVlFzUTBGQlpUTkNMRWRCUVdZc1JVRkJiMEpuUWl4RFFVRndRaXhGUVVGMVFrTXNSVUZCZGtJc1JVRkJNa0pETEVWQlFUTkNMRVZCUVN0Q1F5eEZRVUV2UWl4RlFVRnRRME1zUlVGQmJrTXNSVUZCZFVORExFbEJRWFpETEVWQlFUWkRReXhKUVVFM1F5eEZRVUZ0UkR0QlFVTnFSQ3hSUVVGSlRTeERRVUZLT3p0QlFVVkJMRk5CUVVsQkxFbEJRVWtzUTBGQlVpeEZRVUZYUVN4SFFVRllPMEZCUTBWaUxGZEJRVXRtTEVkQlFVd3NSVUZCVldkQ0xFbEJRVWxaTEVsQlFVa3NRMEZCYkVJc1JVRkJjVUpZTEVWQlFYSkNMRVZCUVhsQ1F5eEZRVUY2UWl4RlFVRTJRa01zUlVGQk4wSXNSVUZCYVVORExFVkJRV3BETEVWQlFYRkRReXhKUVVGeVF5eEZRVUV5UTBNc1NVRkJNME03UVVGRVJqdEJRVVZFT3p0QlFVVkVMRmRCUVZOUExFdEJRVlFzUTBGQlpUZENMRWRCUVdZc1JVRkJiMEpuUWl4RFFVRndRaXhGUVVGMVFrTXNSVUZCZGtJc1JVRkJNa0pETEVWQlFUTkNMRVZCUVN0Q1dTeEZRVUV2UWl4RlFVRnRRMHdzUTBGQmJrTXNSVUZCYzBOTkxFdEJRWFJETEVWQlFUWkRPMEZCUXpORFppeFRRVUZMTEV0QlFVdzdPMEZCUlVFc1VVRkJTV2RDTEVsQlFVbEdMRXRCUVVzc1NVRkJZanRCUVVGQkxGRkJRMGxITEVsQlFVbElMRXRCUVVzc1NVRkVZanRCUVVGQkxGRkJSVWxRTEVsQlFVbFBMRXRCUVVzc1NVRkdZanRCUVVGQkxGRkJSMGxKTEVsQlFVbEtMRXRCUVVzc1NVRklZanM3UVVGTFFUbENMRkZCUVVsdFF5eFRRVUZLTEVkQlFXZENTaXhMUVVGb1FqdEJRVU5CU2l4VlFVRk5NMElzUjBGQlRpeEZRVUZYWjBJc1EwRkJXQ3hGUVVGalF5eEZRVUZrTEVWQlFXdENReXhGUVVGc1FpeEZRVUZ6UW1Nc1EwRkJkRUlzUlVGQmVVSkRMRU5CUVhwQ0xFVkJRVFJDVml4RFFVRTFRaXhGUVVFclFsY3NRMEZCTDBJN08wRkJSVUZzUXl4UlFVRkpiME1zZDBKQlFVb3NSMEZCSzBJc2FVSkJRUzlDTzBGQlEwRlVMRlZCUVUwelFpeEhRVUZPTEVWQlFWZG5RaXhEUVVGWUxFVkJRV05ETEVWQlFXUXNSVUZCYTBKRExFVkJRV3hDTEVWQlFYTkNZeXhEUVVGMFFpeEZRVUY1UWtNc1EwRkJla0lzUlVGQk5FSldMRWxCUVVsRkxFTkJRV2hETEVWQlFXMURVeXhKUVVGSlZDeERRVUYyUXp0QlFVTkJla0lzVVVGQlNXOURMSGRDUVVGS0xFZEJRU3RDTEdGQlFTOUNPMEZCUTBRN08wRkJSVVFzVjBGQlUwTXNSMEZCVkN4RFFVRmhja01zUjBGQllpeEZRVUZyUW1kQ0xFTkJRV3hDTEVWQlFYRkNReXhGUVVGeVFpeEZRVUY1UWtNc1JVRkJla0lzUlVGQk5rSlpMRVZCUVRkQ0xFVkJRV2xEVEN4RFFVRnFReXhGUVVGdlEwMHNTMEZCY0VNc1JVRkJNa003UVVGRGVrTm1MRk5CUVVzc1RVRkJURHM3UVVGRlFTeFJRVUZKWjBJc1NVRkJTVVlzUzBGQlN5eEpRVUZNTEVkQlFWbE1MRWxCUVVrc1IwRkJlRUk3UVVGQlFTeFJRVU5KVVN4SlFVRkpTQ3hMUVVGTExFbEJRVXdzUjBGQldVd3NTVUZCU1N4SFFVUjRRanRCUVVGQkxGRkJSVWxHTEVsQlFVbFBMRXRCUVVzc1NVRkJUQ3hIUVVGWlRDeEpRVUZKTEVkQlJuaENPMEZCUVVFc1VVRkhTVWNzUTBGSVNqdEJRVUZCTEZGQlIwOVZMRU5CU0ZBN1FVRkJRU3hSUVVkVlpDeEhRVWhXTzBGQlFVRXNVVUZIWlVVc1IwRklaanM3UVVGTFFURkNMRkZCUVVsMVF5eFhRVUZLTEVkQlFXdENVaXhMUVVGc1FqdEJRVU5CTDBJc1VVRkJTWGRETEZOQlFVb3NSMEZCWjBKbUxFTkJRV2hDTzBGQlEwRjZRaXhSUVVGSmVVTXNUMEZCU2l4SFFVRmpMRTlCUVdRN1FVRkRRWHBETEZGQlFVa3dReXhSUVVGS0xFZEJRV1VzVDBGQlpqczdRVUZGUVRGRExGRkJRVWxKTEZOQlFVbzdRVUZEUVVvc1VVRkJTVXNzUjBGQlNpeERRVUZSV1N4RlFVRlNMRVZCUVZsRExFVkJRVm9zUlVGQlowSmpMRU5CUVdoQ0xFVkJRVzFDTEVOQlFXNUNMRVZCUVhOQ2RFTXNSMEZCZEVJc1JVRkJNa0lzUzBGQk0wSTdRVUZEUVUwc1VVRkJTV01zVFVGQlNqczdRVUZGUVN4VFFVRkpZeXhKUVVGSkxFTkJRVklzUlVGQlYwRXNSMEZCV0N4SFFVRnJRanRCUVVOb1FsVXNWVUZCU1N4RFFVRkRkRUlzU1VGQlNWa3NTVUZCU1N4RFFVRlVMRWxCUVdOc1F5eEhRVUZzUWp0QlFVTkJPRUlzV1VGQlRUZENMRXRCUVVzMlFpeEhRVUZNTEVOQlFWTmpMRU5CUVZRc1EwRkJUanRCUVVOQldpeFpRVUZOTDBJc1MwRkJTeXRDTEVkQlFVd3NRMEZCVTFrc1EwRkJWQ3hEUVVGT08wRkJRMEV2UWl4WFFVRkxVQ3hIUVVGTUxFVkJRVlZwUWl4TFFVRkxUeXhOUVVGTlV5eERRVUZ5UWl4RlFVRjNRbVlzUzBGQlMxRXNUVUZCVFU4c1EwRkJia01zUlVGQmMwTm9RaXhMUVVGTFR5eE5RVUZOUkN4RFFVRnFSQ3hGUVVGdlJFd3NTMEZCUzFFc1RVRkJUVWdzUTBGQkwwUTdRVUZEUkR0QlFVTkdPenRCUVVWRUxGZEJRVk52UWl4SlFVRlVMRU5CUVdNelF5eEhRVUZrTEVWQlFXMUNaMElzUTBGQmJrSXNSVUZCYzBKRExFVkJRWFJDTEVWQlFUQkNReXhGUVVFeFFpeEZRVUU0UWxrc1JVRkJPVUlzUlVGQmEwTk1MRU5CUVd4RExFVkJRWEZEVFN4TFFVRnlReXhGUVVFMFF6dEJRVU14UTJZc1UwRkJTeXhMUVVGTU96dEJRVVZCTEZGQlFVbG5RaXhKUVVGSlJpeExRVUZMTEVsQlFVd3NSMEZCV1V3c1NVRkJTU3hIUVVGNFFqdEJRVUZCTEZGQlEwbFJMRWxCUVVsSUxFdEJRVXNzU1VGRVlqdEJRVUZCTEZGQlJVbFFMRWxCUVVrMVFpeExRVUZMTmtJc1IwRkJUQ3hEUVVGVFVpeEpRVUZKZEVJc1IwRkJZaXhEUVVaU08wRkJRVUVzVVVGSFNUUkRMRWxCUVVsbUxFbEJRVWszUWl4SFFVRktMRWRCUVZVc1EwRkJReXhGUVVodVFqczdRVUZMUVUwc1VVRkJTWFZETEZkQlFVb3NSMEZCYTBKU0xFdEJRV3hDTzBGQlEwRXZRaXhSUVVGSmQwTXNVMEZCU2l4SFFVRm5RbVlzUTBGQmFFSTdRVUZEUVhwQ0xGRkJRVWw1UXl4UFFVRktMRWRCUVdNc1QwRkJaRHRCUVVOQmVrTXNVVUZCU1RCRExGRkJRVW9zUjBGQlpTeFBRVUZtT3p0QlFVVkJla0lzVlVGQlRVMHNTVUZCU1ZVc1EwRkJWanM3UVVGRlFXcERMRkZCUVVsSkxGTkJRVW83UVVGRFFVb3NVVUZCU1Vzc1IwRkJTaXhEUVVGUldTeEZRVUZTTEVWQlFWbERMRVZCUVZvc1JVRkJaMEpqTEVOQlFXaENMRVZCUVcxQ1RTeEpRVUZKTlVNc1RVRkJUU3hEUVVFM1FpeEZRVUZuUXpSRExFbEJRVWsxUXl4TlFVRk5MRU5CUVU0c1IwRkJWU3hEUVVFNVF5eEZRVUZwUkN4TFFVRnFSRHRCUVVOQlRTeFJRVUZKU3l4SFFVRktMRU5CUVZGWkxFdEJRVXQwUWl4TFFVRkxOa0lzUjBGQlRDeERRVUZUWXl4RFFVRlVMRWxCUVdOT0xFTkJRV1FzUjBGQmEwSnVReXhsUVVFdlFpeEZRVUZuUkhGQ0xFdEJRVXQyUWl4TFFVRkxLMElzUjBGQlRDeERRVUZUV1N4RFFVRlVMRWxCUVdOT0xFTkJRV1FzUjBGQmEwSnVReXhsUVVGMlJTeEZRVUYzUm0xRExFTkJRWGhHTEVWQlFUSkdUU3hKUVVGSk5VTXNUVUZCVFN4RFFVRk9MRWRCUVZVc1EwRkJla2NzUlVGQk5FYzBReXhKUVVGSk5VTXNUVUZCVFN4RFFVRk9MRWRCUVZVc1EwRkJNVWdzUlVGQk5rZ3NTVUZCTjBnN1FVRkRRVTBzVVVGQlNUUkRMRk5CUVVvN1FVRkRRVFZETEZGQlFVbGpMRTFCUVVvN1FVRkRSRHM3UVVGRlJDeFhRVUZUSzBJc1NVRkJWQ3hEUVVGak4wTXNSMEZCWkN4RlFVRnRRbWRDTEVOQlFXNUNMRVZCUVhOQ1F5eEZRVUYwUWl4RlFVRXdRa01zUlVGQk1VSXNSVUZCT0VKWkxFVkJRVGxDTEVWQlFXdERUQ3hEUVVGc1F5eEZRVUZ4UTAwc1MwRkJja01zUlVGQk5FTTdRVUZETVVObUxGTkJRVXNzU1VGQlREczdRVUZGUVN4UlFVRkpaMElzU1VGQlNVWXNTMEZCU3l4SlFVRmlPMEZCUVVFc1VVRkRTVWNzU1VGQlNYWkRMRTFCUVUwc1JVRkJUaXhIUVVGWExFVkJSRzVDTzBGQlFVRXNVVUZGU1RaQ0xFbEJRVWszUWl4TlFVRlBMRU5CUVZBc1IwRkJWeXhGUVVadVFqdEJRVUZCTEZGQlIwbHJReXhEUVVoS08wRkJRVUVzVVVGSFQxVXNRMEZJVUR0QlFVRkJMRkZCUjFWeVF5eERRVWhXTzBGQlFVRXNVVUZIWVVNc1EwRklZanM3UVVGTFFVWXNVVUZCU1cxRExGTkJRVW9zUjBGQlowSktMRXRCUVdoQ096dEJRVVZCTEZOQlFVbElMRWxCUVVrc1EwRkJVaXhGUVVGWFFTeEhRVUZZTEVkQlFXdENPMEZCUTJoQ1ZTeFZRVUZKTEVOQlFVTjBRaXhKUVVGSldTeEpRVUZKTEVOQlFWUXNTVUZCWXl4RFFVRnNRanRCUVVOQk0wSXNWVUZCU1dkQ0xFdEJRVTBzUTBGQlExY3NTVUZCU1N4SFFVRk1MRWxCUVZrc1IwRkJZaXhKUVVGeFFrRXNUVUZCVFN4RFFVRk9MRWxCUVZkQkxFMUJRVTBzUTBGQmFrSXNSMEZCY1VJc1EwRkJReXhEUVVGMFFpeEhRVUV3UWl4RFFVRXZReXhKUVVGdlJFa3NRMEZCTjBRN1FVRkRRVGxDTEZWQlFVbG5RaXhMUVVGTGIwSXNTVUZCU1VFc1EwRkJTaXhIUVVGUlVpeEZRVUZxUWp0QlFVTkJPVUlzVlVGQlNVa3NVMEZCU2p0QlFVTkJTaXhWUVVGSldTeE5RVUZLTEVOQlFWZFlMRU5CUVZnc1JVRkJZME1zU1VGQlNYVkNMRWxCUVVrc1IwRkJkRUk3UVVGRFFYcENMRlZCUVVsTExFZEJRVW9zUTBGQlVVb3NRMEZCVWl4RlFVRlhReXhEUVVGWUxFVkJRV04xUWl4SlFVRkpMRWxCUVd4Q0xFVkJRWGRDVVN4RFFVRjRRaXhGUVVFeVFsWXNRMEZCTTBJc1JVRkJPRUlzUzBGQk9VSTdRVUZEUVhaQ0xGVkJRVWxOTEVsQlFVbzdRVUZEUkR0QlFVTkdPenRCUVVWRUxGZEJRVk4zUXl4TFFVRlVMRU5CUVdVNVF5eEhRVUZtTEVWQlFXOUNaMElzUTBGQmNFSXNSVUZCZFVKRExFVkJRWFpDTEVWQlFUSkNReXhGUVVFelFpeEZRVUVyUWxrc1JVRkJMMElzUlVGQmJVTk1MRU5CUVc1RExFVkJRWE5EVFN4TFFVRjBReXhGUVVFMlF6dEJRVU16UTJZc1UwRkJTeXhIUVVGTU96dEJRVVZCTEZGQlFVbG5RaXhKUVVGSlJpeExRVUZMTEUxQlFXSTdRVUZCUVN4UlFVTkpSeXhKUVVGSmRrTXNUVUZCVFN4RlFVRk9MRWRCUVZjc1JVRkVia0k3UVVGQlFTeFJRVVZKTmtJc1NVRkJTVGRDTEUxQlFVOHNRMEZCVUN4SFFVRlhMRVZCUm01Q08wRkJRVUVzVVVGSFNXdERMRU5CU0VvN1FVRkJRU3hSUVVkUFZTeERRVWhRTzBGQlFVRXNVVUZIVlhKRExFTkJTRlk3UVVGQlFTeFJRVWRoUXl4RFFVaGlPenRCUVV0QlJpeFJRVUZKZFVNc1YwRkJTaXhIUVVGclFsSXNTMEZCYkVJN1FVRkRRUzlDTEZGQlFVbDNReXhUUVVGS0xFZEJRV2RDWml4SlFVRkpMRWRCUVhCQ08wRkJRMEY2UWl4UlFVRkplVU1zVDBGQlNpeEhRVUZqTEU5QlFXUTdRVUZEUVhwRExGRkJRVWt3UXl4UlFVRktMRWRCUVdVc1QwRkJaanM3UVVGRlFTeFRRVUZKWkN4SlFVRkpMRU5CUVZJc1JVRkJWMEVzUjBGQldDeEhRVUZyUWp0QlFVTm9RbFVzVlVGQlNTeERRVUZEZEVJc1NVRkJTVmtzU1VGQlNTeERRVUZVTEVsQlFXTXNRMEZCYkVJN1FVRkRRVE5DTEZWQlFVbE9MRXRCUVV0dlJDeExRVUZNTEVOQlFWYzVRaXhMUVVGTkxFTkJRVU5YTEVsQlFVa3NSMEZCVEN4SlFVRlpMRWRCUVdJc1NVRkJjVUpCTEUxQlFVMHNRMEZCVGl4SlFVRlhRU3hOUVVGTkxFTkJRV3BDTEVkQlFYRkNMRU5CUVVNc1EwRkJkRUlzUjBGQk1FSXNRMEZCTDBNc1NVRkJiMFJKTEVOQlFYQkZMRWxCUVhsRkxFZEJRVGRGTzBGQlEwRTVRaXhWUVVGSlowSXNTMEZCUzI5Q0xFbEJRVWxTTEVWQlFXSTdRVUZEUVhaQ0xGZEJRVXRRTEVkQlFVd3NSVUZCVlVNc1EwRkJWaXhGUVVGaFF5eEpRVUZKZFVJc1NVRkJTU3hIUVVGeVFpeEZRVUV3UW5oQ0xFTkJRVEZDTEVWQlFUWkNReXhKUVVGSmRVSXNTVUZCU1N4SFFVRnlRenRCUVVORU8wRkJRMFk3TzBGQlJVUXNWMEZCVTNWQ0xFbEJRVlFzUTBGQlkyaEVMRWRCUVdRc1JVRkJiVUpuUWl4RFFVRnVRaXhGUVVGelFrTXNSVUZCZEVJc1JVRkJNRUpETEVWQlFURkNMRVZCUVRoQ1dTeEZRVUU1UWl4RlFVRnJRMHdzUTBGQmJFTXNSVUZCY1VOTkxFdEJRWEpETEVWQlFUUkRPMEZCUXpGRFppeFRRVUZMTEVsQlFVdzdPMEZCUlVFc1VVRkJTV2RDTEVsQlFVdEdMRXRCUVVzc1NVRkJaRHRCUVVGQkxGRkJRMGxITEVsQlFVdFNMRWxCUVVrc1NVRkVZanRCUVVGQkxGRkJSVWwzUWl4SlFVRkxha01zU1VGQlNYUkNMRWRCUVVvc1IwRkJWU3hIUVVadVFqdEJRVUZCTEZGQlIwbDNSQ3hMUVVGTGRrUXNTMEZCU3paQ0xFZEJRVXdzUTBGQlUzbENMRU5CUVZRc1NVRkJZMmhDTEVOQlNIWkNPMEZCUVVFc1VVRkpTV3RDTEV0QlFVdDRSQ3hMUVVGTEswSXNSMEZCVEN4RFFVRlRkVUlzUTBGQlZDeEpRVUZqYUVJc1EwRktka0k3UVVGQlFTeFJRVXRKYlVJc1NVRkJTMGdzU1VGQlNYWkVMRTFCUVUwc1EwRk1ia0k3UVVGQlFTeFJRVTFKTWtRc1MwRkJTekZFTEV0QlFVczJRaXhIUVVGTUxFTkJRVk0wUWl4RFFVRlVMRWxCUVdOdVFpeERRVTUyUWp0QlFVRkJMRkZCVDBseFFpeExRVUZMTTBRc1MwRkJTeXRDTEVkQlFVd3NRMEZCVXpCQ0xFTkJRVlFzU1VGQlkyNUNMRU5CVUhaQ08wRkJRVUVzVVVGUlNYTkNMRWxCUVV0T0xFbEJRVWwyUkN4TlFVRk5MRU5CUVU0c1IwRkJWU3hEUVZKMlFqdEJRVUZCTEZGQlUwazRSQ3hMUVVGTE4wUXNTMEZCU3paQ0xFZEJRVXdzUTBGQlV5dENMRU5CUVZRc1NVRkJZM1JDTEVOQlZIWkNPMEZCUVVFc1VVRlZTWGRDTEV0QlFVczVSQ3hMUVVGTEswSXNSMEZCVEN4RFFVRlROa0lzUTBGQlZDeEpRVUZqZEVJc1EwRldka0k3UVVGQlFTeFJRVmRKVEN4RFFWaEtPMEZCUVVFc1VVRlhUMVVzUTBGWVVEdEJRVUZCTEZGQlYxVnlReXhEUVZoV08wRkJRVUVzVVVGWFlVTXNRMEZZWWpzN1FVRmhRVVlzVVVGQlNYVkRMRmRCUVVvc1IwRkJhMEpTTEV0QlFXeENPMEZCUTBFdlFpeFJRVUZKZDBNc1UwRkJTaXhIUVVGblFtWXNTVUZCU1N4SFFVRndRanRCUVVOQmVrSXNVVUZCU1hsRExFOUJRVW9zUjBGQll5eFBRVUZrTzBGQlEwRjZReXhSUVVGSk1FTXNVVUZCU2l4SFFVRmxMRTlCUVdZN08wRkJSVUVzVTBGQlNXUXNTVUZCU1N4RFFVRlNMRVZCUVZkQkxFZEJRVmdzUjBGQmEwSTdRVUZEYUVKVkxGVkJRVWtzUTBGQlEzUkNMRWxCUVVsWkxFbEJRVWtzUTBGQlZDeEpRVUZqTEVOQlFXeENPMEZCUTBFelFpeFZRVUZKWjBJc1MwRkJTM1JDTEV0QlFVc3JRaXhIUVVGTUxFTkJRVk1zUTBGQlExa3NTVUZCU1ZZc1NVRkJTU3hEUVVGVUxFbEJRV05zUXl4SFFVRjJRaXhKUVVFNFFuTkRMRU5CUVhaRE8wRkJRMEU1UWl4VlFVRkpaMElzUzBGQlMyOUNMRWxCUVVsU0xFVkJRV0k3TzBGQlJVRjJRaXhYUVVGTFVDeEhRVUZNTEVWQlFWVkRMRWxCUVVscFJDeEZRVUZrTEVWQlFXdENhRVFzU1VGQlNXbEVMRVZCUVhSQ0xFVkJRVEJDYkVRc1NVRkJTV2xFTEVWQlFUbENMRVZCUVd0RGFFUXNTVUZCU1dsRUxFVkJRWFJETzBGQlEwRTFReXhYUVVGTFVDeEhRVUZNTEVWQlFWVkRMRWxCUVVsdlJDeEZRVUZrTEVWQlFXdENia1FzU1VGQlNXOUVMRVZCUVhSQ0xFVkJRVEJDY2tRc1NVRkJTVzlFTEVWQlFUbENMRVZCUVd0RGJrUXNTVUZCU1c5RUxFVkJRWFJETzBGQlEwRXZReXhYUVVGTFVDeEhRVUZNTEVWQlFWVkRMRWxCUVVsMVJDeEZRVUZrTEVWQlFXdENkRVFzU1VGQlNYVkVMRVZCUVhSQ0xFVkJRVEJDZUVRc1NVRkJTWFZFTEVWQlFUbENMRVZCUVd0RGRFUXNTVUZCU1hWRUxFVkJRWFJETzBGQlEwUTdRVUZEUmpzN1FVRkZSQ3hYUVVGVFF5eFBRVUZVTEVOQlFXbENNVVFzUjBGQmFrSXNSVUZCYzBKblFpeERRVUYwUWl4RlFVRjVRa01zUlVGQmVrSXNSVUZCTmtKRExFVkJRVGRDTEVWQlFXbERXU3hGUVVGcVF5eEZRVUZ4UTB3c1EwRkJja01zUlVGQmQwTk5MRXRCUVhoRExFVkJRU3RETzBGQlF6ZERaaXhUUVVGTExFdEJRVXc3TzBGQlJVRXNVVUZCU1dkQ0xFbEJRVWxHTEV0QlFVc3NTVUZCWWp0QlFVRkJMRkZCUTBsSExFbEJRVWxJTEV0QlFVc3NTVUZFWWp0QlFVRkJMRkZCUlVsUUxFbEJRVWxQTEV0QlFVc3NTVUZHWWp0QlFVRkJMRkZCUjBsSkxFbEJRVWxLTEV0QlFVc3NTVUZJWWpzN1FVRkxRVGxDTEZGQlFVbHRReXhUUVVGS0xFZEJRV2RDU2l4TFFVRm9RanRCUVVOQlNpeFZRVUZOTTBJc1IwRkJUaXhGUVVGWFowSXNRMEZCV0N4RlFVRmpReXhGUVVGa0xFVkJRV3RDUXl4RlFVRnNRaXhGUVVGelFtTXNRMEZCZEVJc1JVRkJlVUpETEVOQlFYcENMRVZCUVRSQ1ZpeERRVUUxUWl4RlFVRXJRbGNzUTBGQkwwSTdPMEZCUlVGc1F5eFJRVUZKYjBNc2QwSkJRVW9zUjBGQkswSXNhVUpCUVM5Q08wRkJRMEZVTEZWQlFVMHpRaXhIUVVGT0xFVkJRVmRuUWl4RFFVRllMRVZCUVdORExFVkJRV1FzUlVGQmEwSkRMRVZCUVd4Q0xFVkJRWE5DWXl4RFFVRjBRaXhGUVVGNVFrTXNRMEZCZWtJc1JVRkJORUpXTEVsQlFVbEZMRU5CUVdoRExFVkJRVzFEVXl4SlFVRkpWQ3hEUVVGMlF6dEJRVU5CZWtJc1VVRkJTVzlETEhkQ1FVRktMRWRCUVN0Q0xHRkJRUzlDTzBGQlEwUTdPMEZCUlVRN096czdPenM3T3pzN096czdPenM3T3pzN096czdPenM3T3pzN096czdPMEZCWjBOQkxFMUJRVWwxUWl4aFFVRmhMRU5CUTFnc1EwRkRSU3hEUVVGRExFMUJSRWdzUlVGRFZ5eERRVUZETEUxQlJGb3NSVUZEYjBJc1EwRkJReXhOUVVSeVFpeEZRVU0yUWl4RFFVRkRMRTFCUkRsQ0xFVkJRM05ETEVOQlFVTXNUVUZFZGtNc1JVRkRLME1zUTBGQlF5eE5RVVJvUkN4RlFVVkZMRU5CUVVNc1RVRkdTQ3hGUVVWWExFTkJRVU1zVFVGR1dpeEZRVVZ2UWl4RFFVRkRMRTFCUm5KQ0xFVkJSVFpDTEVOQlFVTXNUVUZHT1VJc1JVRkZjME1zUTBGQlF5eE5RVVoyUXl4RlFVVXJReXhEUVVGRExFMUJSbWhFTEVWQlIwVXNRMEZCUXl4TlFVaElMRVZCUjFrc1RVRklXaXhGUVVkdlFpeERRVUZETEUxQlNISkNMRVZCUnpoQ0xFMUJTRGxDTEVWQlIzTkRMRU5CUVVNc1RVRklka01zUlVGSFowUXNUVUZJYUVRc1JVRkpSU3hEUVVGRExFMUJTa2dzUlVGSldTeE5RVXBhTEVWQlNXOUNMRU5CUVVNc1RVRktja0lzUlVGSk9FSXNUVUZLT1VJc1JVRkpjME1zUTBGQlF5eE5RVXAyUXl4RlFVbG5SQ3hOUVVwb1JDeEZRVXRGTEVOQlFVTXNUVUZNU0N4RlFVdFpMRTFCVEZvc1JVRkxiMElzUTBGQlF5eE5RVXh5UWl4RlFVczRRaXhOUVV3NVFpeEZRVXR6UXl4RFFVRkRMRTFCVEhaRExFVkJTMmRFTEUxQlRHaEVMRVZCVFVVc1EwRkJReXhOUVU1SUxFVkJUVmtzVFVGT1dpeEZRVTF2UWl4RFFVRkRMRTFCVG5KQ0xFVkJUVGhDTEUxQlRqbENMRVZCVFhORExFTkJRVU1zVFVGT2RrTXNSVUZOWjBRc1RVRk9hRVFzUlVGUFJTeERRVUZETEUxQlVFZ3NSVUZQV1N4TlFWQmFMRVZCVDI5Q0xFTkJRVU1zVFVGUWNrSXNSVUZQT0VJc1RVRlFPVUlzUlVGUGMwTXNRMEZCUXl4TlFWQjJReXhGUVU5blJDeE5RVkJvUkN4RlFWRkZMRU5CUVVNc1RVRlNTQ3hGUVZGWkxFMUJVbG9zUlVGUmIwSXNRMEZCUXl4TlFWSnlRaXhGUVZFNFFpeE5RVkk1UWl4RlFWRnpReXhEUVVGRExFMUJVblpETEVWQlVTdERMRU5CUVVNc1RVRlNhRVFzUlVGVFJTeERRVUZETEUxQlZFZ3NSVUZUVnl4RFFVRkRMRTFCVkZvc1JVRlRiMElzUTBGQlF5eE5RVlJ5UWl4RlFWTTJRaXhEUVVGRExFMUJWRGxDTEVWQlUzTkRMRU5CUVVNc1RVRlVka01zUlVGVEswTXNRMEZCUXl4TlFWUm9SQ3hGUVZWRkxFTkJRVU1zVFVGV1NDeEZRVlZYTEVOQlFVTXNUVUZXV2l4RlFWVnZRaXhEUVVGRExFMUJWbkpDTEVWQlZUWkNMRU5CUVVNc1RVRldPVUlzUlVGVmMwTXNRMEZCUXl4TlFWWjJReXhGUVZVclF5eERRVUZETEUxQlZtaEVMRVZCVjBVc1EwRkJReXhOUVZoSUxFVkJWMWNzUTBGQlF5eE5RVmhhTEVWQlYyOUNMRU5CUVVNc1RVRllja0lzUlVGWE5rSXNRMEZCUXl4TlFWZzVRaXhGUVZkelF5eERRVUZETEUxQldIWkRMRVZCVnl0RExFTkJRVU1zVFVGWWFFUXNSVUZaUlN4RFFVRkRMRTFCV2tnc1JVRlpWeXhEUVVGRExFMUJXbG9zUlVGWmIwSXNRMEZCUXl4TlFWcHlRaXhGUVZrMlFpeERRVUZETEUxQldqbENMRVZCV1hORExFTkJRVU1zVFVGYWRrTXNSVUZaSzBNc1EwRkJReXhOUVZwb1JDeEZRV0ZGTEVOQlFVTXNUVUZpU0N4RlFXRlpMRTFCWWxvc1JVRmhiMElzUTBGQlF5eE5RV0p5UWl4RlFXRTRRaXhOUVdJNVFpeEZRV0Z6UXl4RFFVRkRMRTFCWW5aRExFVkJZV2RFTEUxQlltaEVMRVZCWTBVc1EwRkJReXhOUVdSSUxFVkJZMWtzVFVGa1dpeEZRV052UWl4RFFVRkRMRTFCWkhKQ0xFVkJZemhDTEUxQlpEbENMRVZCWTNORExFTkJRVU1zVFVGa2RrTXNSVUZqWjBRc1RVRmthRVFzUlVGbFJTeERRVUZETEUxQlprZ3NSVUZsV1N4TlFXWmFMRVZCWlhGQ0xFMUJabkpDTEVWQlpUaENMRTFCWmpsQ0xFVkJaWFZETEUxQlpuWkRMRVZCWldkRUxFMUJabWhFTEVWQlowSkhMRTFCYUVKSUxFVkJaMEpaTEUxQmFFSmFMRVZCWjBKeFFpeE5RV2hDY2tJc1JVRm5RamhDTEUxQmFFSTVRaXhGUVdkQ2RVTXNUVUZvUW5aRExFVkJaMEpuUkN4TlFXaENhRVFzUlVGcFFrY3NUVUZxUWtnc1JVRnBRbGtzVFVGcVFsb3NSVUZwUW5GQ0xFMUJha0p5UWl4RlFXbENPRUlzVFVGcVFqbENMRVZCYVVKMVF5eE5RV3BDZGtNc1JVRnBRbWRFTEUxQmFrSm9SQ3hGUVd0Q1J5eE5RV3hDU0N4RlFXdENXU3hOUVd4Q1dpeEZRV3RDY1VJc1RVRnNRbkpDTEVWQmEwSTRRaXhOUVd4Q09VSXNSVUZyUW5WRExFMUJiRUoyUXl4RlFXdENaMFFzVFVGc1FtaEVMRVZCYlVKSExFMUJia0pJTEVWQmJVSlpMRTFCYmtKYUxFVkJiVUp4UWl4TlFXNUNja0lzUlVGdFFqaENMRTFCYmtJNVFpeEZRVzFDZFVNc1RVRnVRblpETEVWQmJVSm5SQ3hOUVc1Q2FFUXNSVUZ2UWtjc1RVRndRa2dzUlVGdlFsa3NUVUZ3UWxvc1JVRnZRbkZDTEUxQmNFSnlRaXhGUVc5Q09FSXNUVUZ3UWpsQ0xFVkJiMEoxUXl4TlFYQkNka01zUlVGdlFtZEVMRTFCY0VKb1JDeEZRWEZDUnl4TlFYSkNTQ3hGUVhGQ1dTeE5RWEpDV2l4RlFYRkNjVUlzVFVGeVFuSkNMRVZCY1VJNFFpeE5RWEpDT1VJc1JVRnhRblZETEUxQmNrSjJReXhGUVhGQ1owUXNUVUZ5UW1oRUxFVkJjMEpITEUxQmRFSklMRVZCYzBKWkxFMUJkRUphTEVOQlJGY3NSVUY1UWxnc1EwRkRSU3hEUVVGRExFMUJSRWdzUlVGRFdTeE5RVVJhTEVWQlEyOUNMRU5CUVVNc1RVRkVja0lzUlVGRE9FSXNUVUZFT1VJc1JVRkRjME1zUTBGQlF5eE5RVVIyUXl4RlFVTm5SQ3hOUVVSb1JDeEZRVVZGTEVOQlFVTXNUVUZHU0N4RlFVVlpMRTFCUmxvc1JVRkZiMElzUTBGQlF5eE5RVVp5UWl4RlFVVTRRaXhOUVVZNVFpeEZRVVZ6UXl4RFFVRkRMRTFCUm5aRExFVkJSV2RFTEUxQlJtaEVMRVZCUjBVc1EwRkJReXhOUVVoSUxFVkJSMWtzVFVGSVdpeEZRVWR2UWl4RFFVRkRMRTFCU0hKQ0xFVkJSemhDTEUxQlNEbENMRVZCUjNORExFTkJRVU1zVFVGSWRrTXNSVUZIWjBRc1RVRklhRVFzUlVGSlJTeERRVUZETEUxQlNrZ3NSVUZKV1N4TlFVcGFMRVZCU1c5Q0xFTkJRVU1zVFVGS2NrSXNSVUZKT0VJc1RVRktPVUlzUlVGSmMwTXNRMEZCUXl4TlFVcDJReXhGUVVsblJDeE5RVXBvUkN4RlFVdEZMRU5CUVVNc1RVRk1TQ3hGUVV0WkxFMUJURm9zUlVGTGIwSXNRMEZCUXl4TlFVeHlRaXhGUVVzNFFpeE5RVXc1UWl4RlFVdHpReXhEUVVGRExFMUJUSFpETEVWQlMyZEVMRTFCVEdoRUxFVkJUVVVzUTBGQlF5eE5RVTVJTEVWQlRWa3NUVUZPV2l4RlFVMXhRaXhOUVU1eVFpeEZRVTA0UWl4TlFVNDVRaXhGUVUxMVF5eE5RVTUyUXl4RlFVMW5SQ3hOUVU1b1JDeEZRVTlITEUxQlVFZ3NSVUZQV1N4TlFWQmFMRVZCVDNGQ0xFMUJVSEpDTEVWQlR6aENMRTFCVURsQ0xFVkJUM1ZETEUxQlVIWkRMRVZCVDJkRUxFMUJVR2hFTEVWQlVVY3NUVUZTU0N4RlFWRlhMRU5CUVVNc1RVRlNXaXhGUVZGeFFpeE5RVkp5UWl4RlFWRTJRaXhEUVVGRExFMUJVamxDTEVWQlVYVkRMRTFCVW5aRExFVkJVU3RETEVOQlFVTXNUVUZTYUVRc1JVRlRSeXhOUVZSSUxFVkJVMWNzUTBGQlF5eE5RVlJhTEVWQlUzRkNMRTFCVkhKQ0xFVkJVelpDTEVOQlFVTXNUVUZVT1VJc1JVRlRkVU1zVFVGVWRrTXNSVUZUSzBNc1EwRkJReXhOUVZSb1JDeEZRVlZITEUxQlZrZ3NSVUZWVnl4RFFVRkRMRTFCVmxvc1JVRlZjVUlzVFVGV2NrSXNSVUZWTmtJc1EwRkJReXhOUVZZNVFpeEZRVlYxUXl4TlFWWjJReXhGUVZVclF5eERRVUZETEUxQlZtaEVMRVZCVjBjc1RVRllTQ3hGUVZkWExFTkJRVU1zVFVGWVdpeEZRVmR4UWl4TlFWaHlRaXhGUVZjMlFpeERRVUZETEUxQldEbENMRU5CZWtKWExFTkJRV3BDTzBGQlFVRXNUVUYxUTBsRExHVkJRV1VzUTBGRFlpeEZRVUZEUXl4UFFVRlBMRWxCUVZJc1JVRkJZME1zUzBGQlN5eEpRVUZ1UWl4RlFVUmhMRVZCUldJc1JVRkJRMFFzVDBGQlR5eEpRVUZTTEVWQlFXTkRMRXRCUVVzc1NVRkJia0lzUlVGR1lTeERRWFpEYmtJN08wRkJORU5CTEZkQlFWTkRMRWxCUVZRc1EwRkJZeTlFTEVkQlFXUXNSVUZCYlVKblFpeERRVUZ1UWl4RlFVRnpRbVlzUTBGQmRFSXNSVUZCZVVKRExFTkJRWHBDTEVWQlFUUkNORUlzUlVGQk5VSXNSVUZCWjBOTUxFTkJRV2hETEVWQlFXMURUU3hMUVVGdVF5eEZRVUV3UXp0QlFVTjRReXhSUVVGSlF5eEpRVUZKUml4TFFVRkxMRU5CUVdJN1FVRkJRU3hSUVVOSlJ5eEpRVUZKUkN4SlFVRkpMRU5CUkZvN1FVRkJRU3hSUVVWSlZDeEpRVUZKTEVsQlFVbFZMRU5CUmxvN1FVRkJRU3hSUVVkSlF5eEpRVUZMYkVJc1NVRkJTU3hEUVVGTUxFZEJRVlYwUWl4SFFVaHNRanRCUVVGQkxGRkJTVWx6UlN4SlFVRkpja1VzUzBGQlN6WkNMRWRCUVV3c1EwRkJVMVVzUTBGQlZDeERRVXBTTzBGQlFVRXNVVUZMU1N0Q0xFbEJRVWwwUlN4TFFVRkxLMElzUjBGQlRDeERRVUZUVVN4RFFVRlVMRU5CVEZJN08wRkJUMEZzUXl4UlFVRkpiVU1zVTBGQlNpeEhRVUZuUWtvc1MwRkJhRUk3UVVGRFFTOUNMRkZCUVVsMVF5eFhRVUZLTEVkQlFXdENVaXhMUVVGc1FqdEJRVU5CTDBJc1VVRkJTWGRETEZOQlFVb3NSMEZCWjBKbUxFTkJRV2hDTzBGQlEwRjZRaXhSUVVGSmVVTXNUMEZCU2l4SFFVRmpMRTlCUVdRN1FVRkRRWHBETEZGQlFVa3dReXhSUVVGS0xFZEJRV1VzVDBGQlpqczdRVUZGUVRGRExGRkJRVWxKTEZOQlFVbzdRVUZEUVVvc1VVRkJTVXNzUjBGQlNpeERRVUZSU2l4RFFVRlNMRVZCUVcxQ1F5eERRVUZ1UWl4RlFVRTRRamhDTEVOQlFUbENMRVZCUVdsRFJTeERRVUZxUXl4RlFVRTRRMEVzU1VGQlNYWkRMRXRCUVV0RExFVkJRWFpFTEVWQlFUSkVMRXRCUVRORU8wRkJRMEZKTEZGQlFVbExMRWRCUVVvc1EwRkJVVW9zU1VGQlNXZERMRWxCUVVrclFpeERRVUZvUWl4RlFVRnRRamxFTEVsQlFVa3JRaXhKUVVGSlowTXNRMEZCTTBJc1JVRkJPRUl4UXl4RFFVRTVRaXhGUVVGcFExY3NTVUZCU1haRExFdEJRVXRETEVWQlFURkRMRVZCUVRoRGMwTXNRMEZCT1VNc1JVRkJNa1FzUzBGQk0wUTdRVUZEUVd4RExGRkJRVWxMTEVkQlFVb3NRMEZCVVVvc1NVRkJTWE5DTEVsQlFVbDVReXhEUVVGb1FpeEZRVUZ0UWpsRUxFbEJRVWx4UWl4SlFVRkpNRU1zUTBGQk0wSXNSVUZCT0VKb1F5eERRVUU1UWl4RlFVRnBRME1zU1VGQlNYWkRMRXRCUVV0RExFVkJRVEZETEVWQlFUaERjME1zUTBGQk9VTXNSVUZCTWtRc1NVRkJNMFE3UVVGRFFXeERMRkZCUVVsdlF5eDNRa0ZCU2l4SFFVRXJRaXhwUWtGQkwwSTdRVUZEUVhCRExGRkJRVWxOTEVsQlFVbzdRVUZEUVU0c1VVRkJTVzlETEhkQ1FVRktMRWRCUVN0Q0xHRkJRUzlDTzBGQlEwRndReXhSUVVGSll5eE5RVUZLTzBGQlEwUTdPMEZCUlVRc1YwRkJVMjlFTEUxQlFWUXNRMEZCWjBKc1JTeEhRVUZvUWl4RlFVRnhRbWRDTEVOQlFYSkNMRVZCUVhkQ1F5eEZRVUY0UWl4RlFVRTBRa01zUlVGQk5VSXNSVUZCWjBOWkxFVkJRV2hETEVWQlFXOURUQ3hEUVVGd1F5eEZRVUYxUXpCRExFdEJRWFpETEVWQlFUaERReXhMUVVFNVF5eEZRVUZ4UkhKRExFdEJRWEpFTEVWQlFUUkVPMEZCUXpGRVppeFRRVUZMTEVsQlFVdzdPMEZCUlVFc1VVRkJTWEZFTEU5QlFVOVdMRmRCUVZkUkxFdEJRVmdzUTBGQldEdEJRVUZCTEZGQlEwbHVReXhKUVVGSkxFTkJRVU5vUWl4SlFVRkpiVVFzUzBGQlNpeEhRVUZaVUN4aFFVRmhUeXhMUVVGaUxFVkJRVzlDVGl4TFFVRnFReXhKUVVFd1EwOHNTMEZFYkVRN1FVRkJRU3hSUVVWSk4wTXNTVUZCU1N4RFFVRkRVQ3hKUVVGSmJVUXNTMEZCU2l4SFFVRlpVQ3hoUVVGaFR5eExRVUZpTEVWQlFXOUNUQ3hIUVVGcVF5eEpRVUV3UTAwc1MwRkdiRVE3UVVGQlFTeFJRVWRKU2l4SlFVRkpMRU5CUVVOb1JDeEpRVUZKYlVRc1MwRkJUQ3hKUVVFd1EwTXNTMEZJYkVRN1FVRkJRU3hSUVVsSmJrTXNRMEZLU2p0QlFVRkJMRkZCU1U5RExFTkJTbEE3UVVGQlFTeFJRVWxWSzBJc1EwRktWanRCUVVGQkxGRkJTV0Z5UXl4RFFVcGlPenRCUVUxQk5VSXNVVUZCU1hWRExGZEJRVW9zUjBGQmEwSlNMRXRCUVd4Q08wRkJRMEV2UWl4UlFVRkpkME1zVTBGQlNpeEhRVUZuUW1Zc1EwRkJhRUk3UVVGRFFYcENMRkZCUVVsNVF5eFBRVUZLTEVkQlFXTXNUMEZCWkR0QlFVTkJla01zVVVGQlNUQkRMRkZCUVVvc1IwRkJaU3hQUVVGbU96dEJRVVZCTEZGQlFVZFdMRWxCUVVrc1EwRkJVQ3hGUVVGVk8wRkJRMUpvUXl4VlFVRkpTU3hUUVVGS096dEJRVVZCTkVJc1YwRkJTM0ZETEV0QlFVdERMRTFCUVV3c1IwRkJZeXhEUVVGa0xFZEJRV3RDTEVOQlFYWkNPMEZCUTBGeVF5eFZRVUZMZEVNc1MwRkJTMjlFTEV0QlFVd3NRMEZCVjJZc1EwRkJXQ3hEUVVGTU8wRkJRMEZCTEZkQlFVdERMRU5CUVV3N1FVRkRRVUVzVjBGQlN5eERRVUZNTzBGQlEwRkJMRmRCUVVzc1EwRkJURHM3UVVGRlFXcERMRlZCUVVsWkxFMUJRVW9zUTBGRFJVc3NTMEZCU3l4RFFVRkRiMFFzUzBGQlMzQkRMRWxCUVVrc1EwRkJWQ3hMUVVGbExFbEJRVWxFTEVOQlFXNUNMRWxCUVhkQ2NVTXNTMEZCUzNCRExFTkJRVXdzU1VGQlkwUXNRMEZCZGtNc1NVRkJORU5HTEVWQlJHNUVMRVZCUlVWYUxFdEJRVXNzUTBGQlEyMUVMRXRCUVV0d1F5eEpRVUZKTEVOQlFWUXNTMEZCWlN4SlFVRkpSQ3hEUVVGdVFpeEpRVUYzUW5GRExFdEJRVXR3UXl4SlFVRkpMRU5CUVZRc1NVRkJZMFFzUTBGQmRrTXNTVUZCTkVOR0xFVkJSbTVFT3p0QlFVdEJMRlZCUVVkUUxFbEJRVWtzUTBGQlVDeEZRVUZWTzBGQlExSkJMR0ZCUVVzNFF5eExRVUZMUXl4TlFVRk1MRWRCUVdNc1EwRkJaQ3hIUVVGclFpeERRVUYyUWp0QlFVTkJjRU1zV1VGQlMzWkRMRXRCUVV0dlJDeExRVUZNTEVOQlFWZDRRaXhEUVVGWUxFTkJRVXc3UVVGRFFVRXNZVUZCUzFjc1EwRkJURHRCUVVOQlFTeGhRVUZMTEVOQlFVdzdRVUZEUVVFc1lVRkJTeXhEUVVGTU96dEJRVVZCTEdGQlFVbE9MRWxCUVVsTExFTkJRVklzUlVGQlYwd3NUVUZCVFUwc1EwRkJha0lzUlVGQmIwSk9MRXRCUVVzc1EwRkJla0k3UVVGRFJUVkNMR05CUVVsaExFMUJRVW9zUTBGQlYwa3NTMEZCUzI5RUxFdEJRVXQ2UXl4RFFVRk1MRWxCUVZWRkxFVkJRVEZDTEVWQlFUaENXaXhMUVVGTGJVUXNTMEZCUzNwRExFbEJRVWtzUTBGQlZDeEpRVUZqUlN4RlFVRnFSRHRCUVVSR0xGTkJSMEU1UWl4SlFVRkpZU3hOUVVGS0xFTkJRMFZKTEV0QlFVc3NRMEZCUTI5RUxFdEJRVXR1UXl4SlFVRkpMRU5CUVZRc1MwRkJaU3hKUVVGSldDeERRVUZ1UWl4SlFVRjNRamhETEV0QlFVdHVReXhEUVVGTUxFbEJRV05ZTEVOQlFYWkRMRWxCUVRSRFR5eEZRVVJ1UkN4RlFVVkZXaXhMUVVGTExFTkJRVU50UkN4TFFVRkxia01zU1VGQlNTeERRVUZVTEV0QlFXVXNTVUZCU1Znc1EwRkJia0lzU1VGQmQwSTRReXhMUVVGTGJrTXNTVUZCU1N4RFFVRlVMRWxCUVdOWUxFTkJRWFpETEVsQlFUUkRUeXhGUVVadVJEdEJRVWxFTEU5QlpFUXNUVUZwUWtVc1MwRkJTVVlzU1VGQlNVc3NRMEZCVWl4RlFVRlhUQ3hOUVVGTmVVTXNTMEZCUzBNc1RVRkJkRUlzUlVGQk9FSXhReXhMUVVGTExFTkJRVzVETzBGQlEwVTFRaXhaUVVGSllTeE5RVUZLTEVOQlFWZEpMRXRCUVV0dlJDeExRVUZMZWtNc1EwRkJUQ3hKUVVGVlJTeEZRVUV4UWl4RlFVRTRRbG9zUzBGQlMyMUVMRXRCUVV0NlF5eEpRVUZKTEVOQlFWUXNTVUZCWTBVc1JVRkJha1E3UVVGRVJpeFBRVWRHT1VJc1NVRkJTV01zVFVGQlNqdEJRVU5FTEV0QmJrTkVMRTFCY1VOTExFbEJRVWRUTEVsQlFVa3NRMEZCVUN4RlFVRlZPMEZCUTJKMlFpeFZRVUZKU1N4VFFVRktPenRCUVVWQmJVSXNWMEZCU3poRExFdEJRVXRETEUxQlFVd3NSMEZCWXl4RFFVRmtMRWRCUVd0Q0xFTkJRWFpDTzBGQlEwRndReXhWUVVGTGRrTXNTMEZCUzI5RUxFdEJRVXdzUTBGQlYzaENMRU5CUVZnc1EwRkJURHRCUVVOQlFTeFhRVUZMVnl4RFFVRk1PMEZCUTBGQkxGZEJRVXNzUTBGQlREdEJRVU5CUVN4WFFVRkxMRU5CUVV3N08wRkJSVUZzUXl4VlFVRkpXU3hOUVVGS0xFTkJRVmRMTEV0QlFVdHZSQ3hMUVVGTExFTkJRVXdzU1VGQlZYWkRMRVZCUVRGQ0xFVkJRVGhDV2l4TFFVRkxiVVFzUzBGQlN5eERRVUZNTEVsQlFWVjJReXhGUVVFM1F6czdRVUZGUVN4WFFVRkpSaXhKUVVGSkxFTkJRVklzUlVGQlYwRXNUVUZCVFUwc1EwRkJha0lzUlVGQmIwSk9MRXRCUVVzc1EwRkJla0k3UVVGRFJUVkNMRmxCUVVsaExFMUJRVW9zUTBGQlYwa3NTMEZCUzI5RUxFdEJRVXQ2UXl4RFFVRk1MRWxCUVZWRkxFVkJRVEZDTEVWQlFUaENXaXhMUVVGTGJVUXNTMEZCUzNwRExFbEJRVWtzUTBGQlZDeEpRVUZqUlN4RlFVRnFSRHRCUVVSR0xFOUJSMEU1UWl4SlFVRkpZU3hOUVVGS0xFTkJRMFZKTEV0QlFVc3NRMEZCUTI5RUxFdEJRVXR1UXl4SlFVRkpMRU5CUVZRc1MwRkJaU3hKUVVGSldDeERRVUZ1UWl4SlFVRjNRamhETEV0QlFVdHVReXhEUVVGTUxFbEJRV05ZTEVOQlFYWkRMRWxCUVRSRFR5eEZRVVJ1UkN4RlFVVkZXaXhMUVVGTExFTkJRVU50UkN4TFFVRkxia01zU1VGQlNTeERRVUZVTEV0QlFXVXNTVUZCU1Znc1EwRkJia0lzU1VGQmQwSTRReXhMUVVGTGJrTXNTVUZCU1N4RFFVRlVMRWxCUVdOWUxFTkJRWFpETEVsQlFUUkRUeXhGUVVadVJEczdRVUZMUVRsQ0xGVkJRVWxqTEUxQlFVbzdRVUZEUkRzN1FVRkZSQ3hSUVVGSGEwUXNTVUZCU1N4RFFVRlFMRVZCUVZVN1FVRkRVa0VzVjBGQlMwc3NTMEZCUzBNc1RVRkJUQ3hIUVVGakxFTkJRV1FzUjBGQmEwSXNRMEZCZGtJN1FVRkRRVXdzVlVGQlMzUkZMRXRCUVV0dlJDeExRVUZNTEVOQlFWZHBRaXhEUVVGWUxFTkJRVXc3UVVGRFFVRXNWMEZCUzBNc1EwRkJURHRCUVVOQlFTeFhRVUZMTEVOQlFVdzdRVUZEUVVFc1YwRkJTeXhEUVVGTU96dEJRVVZCUml4WFFVTkZMMFFzUjBGRVJpeEZRVVZGWjBJc1EwRkdSaXhGUVVkRlF5eExRVUZMTEVOQlFVTnZSQ3hMUVVGTFNpeEpRVUZKTEVOQlFWUXNTMEZCWlN4SlFVRkpSQ3hEUVVGdVFpeEpRVUYzUWtzc1MwRkJTMG9zUTBGQlRDeEpRVUZqUkN4RFFVRjJReXhKUVVFMFEyeERMRVZCU0c1RUxFVkJTVVZhTEV0QlFVc3NRMEZCUTIxRUxFdEJRVXRLTEVsQlFVa3NRMEZCVkN4TFFVRmxMRWxCUVVsRUxFTkJRVzVDTEVsQlFYZENTeXhMUVVGTFNpeEpRVUZKTEVOQlFWUXNTVUZCWTBRc1EwRkJka01zU1VGQk5FTnNReXhGUVVwdVJDeEZRVXRGUVN4RlFVeEdMRVZCVFVWTUxFTkJUa1lzUlVGUFJVMHNTMEZRUmp0QlFWTkVPMEZCUTBZN08wRkJSVVFzVFVGQlNYZERMRlZCUVZVc1UwRkJWa0VzVDBGQlZTeERRVUZUUXl4SlFVRlVMRVZCUVdVN1FVRkRka0lzVTBGQlMwTXNTVUZCVEN4SFFVRnRRaXhGUVVGdVFqdEJRVU5CTEZOQlFVdERMRkZCUVV3c1IwRkJiVUlzU1VGQmJrSTdRVUZEUVN4VFFVRkxNME1zUzBGQlRDeEhRVUZ0UW5sRExGRkJRVkZCTEV0QlFVdDZReXhMUVVGaUxFZEJRWEZDZVVNc1MwRkJTM3BETEV0QlFURkNMRWRCUVd0RExFOUJRWEpFTzBGQlEwRXNVMEZCU3pSRExGZEJRVXdzUjBGQmJVSXNRMEZCUXl4RlFVRkZTQ3hSUVVGUlFTeExRVUZMUnl4WFFVRm1MRU5CUVhCQ08wRkJRMFFzUjBGTVREczdRVUZQUVVvc1ZVRkJVVXNzVTBGQlVpeEhRVUZ2UWl4VlFVRlROVVVzUjBGQlZDeEZRVUZqWjBJc1EwRkJaQ3hGUVVGcFFtVXNTMEZCYWtJc1JVRkJkMEk3UVVGRE1VTXNVVUZCU1hkQ0xFbEJRVWwyUkN4SlFVRkpOa1VzVFVGQlNpeERRVUZYUXl4TFFVRnVRanRCUVVGQkxGRkJRMGxETEVsQlFVa3ZSU3hKUVVGSk5rVXNUVUZCU2l4RFFVRlhSeXhOUVVSdVFqdEJRVUZCTEZGQlJVbDJSQ3hKUVVGSk9VSXNTMEZCUzNOR0xFZEJRVXdzUTBGQlV6RkNMRU5CUVZRc1JVRkJXWGRDTEVOQlFWb3NRMEZHVWpzN1FVRkpRVEZETEZGQlFVbHlReXhIUVVGS0xFVkJRVk5uUWl4RFFVRlVMRVZCUVZsMVF5eEpRVUZKTEVkQlFXaENMRVZCUVhGQ2QwSXNTVUZCU1N4SFFVRjZRaXhGUVVFNFFuUkVMRU5CUVRsQ0xFVkJRV2xEUVN4SlFVRkphRU1zVFVGQmNrTXNSVUZCTmtOelF5eExRVUUzUXp0QlFVTkVMRWRCVGtRN08wRkJVVUYzUXl4VlFVRlJWeXhYUVVGU0xFZEJRWE5DTEZWQlFWTnNSaXhIUVVGVUxFVkJRV05uUWl4RFFVRmtMRVZCUVdsQ1pTeExRVUZxUWl4RlFVRjNRanRCUVVNMVF5eFJRVUZKZDBJc1NVRkJTWFpFTEVsQlFVazJSU3hOUVVGS0xFTkJRVmRETEV0QlFXNUNPMEZCUVVFc1VVRkRTVU1zU1VGQlNTOUZMRWxCUVVrMlJTeE5RVUZLTEVOQlFWZEhMRTFCUkc1Q08wRkJRVUVzVVVGRlNYWkVMRWxCUVVrNVFpeExRVUZMYzBZc1IwRkJUQ3hEUVVGVE1VSXNRMEZCVkN4RlFVRlpkMElzUTBGQldpeERRVVpTT3p0QlFVbEJjRU1zVTBGQlN6TkRMRWRCUVV3c1JVRkJWV2RDTEVOQlFWWXNSVUZCWVhWRExFbEJRVWtzUjBGQmFrSXNSVUZCYzBKM1FpeEpRVUZKTEVkQlFURkNMRVZCUVN0Q2RFUXNRMEZCTDBJc1JVRkJhME5CTEVsQlFVbG9ReXhOUVVGMFF5eEZRVUU0UTNORExFdEJRVGxETzBGQlEwUXNSMEZPUkRzN1FVRlJRWGRETEZWQlFWRlpMR2xDUVVGU0xFZEJRVFJDTEZWQlFWTnVSaXhIUVVGVUxFVkJRV05uUWl4RFFVRmtMRVZCUVdsQ1pTeExRVUZxUWl4RlFVRjNRanRCUVVOc1JDeFJRVUZKZDBJc1NVRkJTWFpFTEVsQlFVazJSU3hOUVVGS0xFTkJRVmRETEV0QlFXNUNPMEZCUVVFc1VVRkRTVU1zU1VGQlNTOUZMRWxCUVVrMlJTeE5RVUZLTEVOQlFWZEhMRTFCUkc1Q08wRkJRVUVzVVVGRlNYWkVMRWxCUVVrNVFpeExRVUZMYzBZc1IwRkJUQ3hEUVVGVE1VSXNRMEZCVkN4RlFVRlpkMElzUTBGQldpeERRVVpTT3p0QlFVbEJNVU1zVVVGQlNYSkRMRWRCUVVvc1JVRkJVMmRDTEVOQlFWUXNSVUZCV1hWRExFbEJRVWtzUzBGQmFFSXNSVUZCZFVKM1FpeEpRVUZKTEV0QlFUTkNMRVZCUVd0RGRFUXNTVUZCU1N4SlFVRjBReXhGUVVFMFEwRXNTVUZCU1doRExFMUJRV2hFTEVWQlFYZEVjME1zUzBGQmVFUTdRVUZEUVVZc1ZVRkJUVGRDTEVkQlFVNHNSVUZCVjJkQ0xFTkJRVmdzUlVGQlkzVkRMRWxCUVVrc1MwRkJiRUlzUlVGQmVVSjNRaXhKUVVGSkxFdEJRVGRDTEVWQlFXOURkRVFzU1VGQlNTeEpRVUY0UXl4RlFVRTRRMEVzU1VGQlNXaERMRTFCUVd4RUxFVkJRVEJFYzBNc1MwRkJNVVE3UVVGRFJDeEhRVkJFT3p0QlFWTkJkME1zVlVGQlVXRXNiVUpCUVZJc1IwRkJPRUlzVlVGQlUzQkdMRWRCUVZRc1JVRkJZMmRDTEVOQlFXUXNSVUZCYVVKbExFdEJRV3BDTEVWQlFYZENPMEZCUTNCRUxGRkJRVWwzUWl4SlFVRkpka1FzU1VGQlNUWkZMRTFCUVVvc1EwRkJWME1zUzBGQmJrSTdRVUZCUVN4UlFVTkpReXhKUVVGSkwwVXNTVUZCU1RaRkxFMUJRVW9zUTBGQlYwY3NUVUZFYmtJN1FVRkJRU3hSUVVWSmRrUXNTVUZCU1RsQ0xFdEJRVXR6Uml4SFFVRk1MRU5CUVZNeFFpeERRVUZVTEVWQlFWbDNRaXhEUVVGYUxFTkJSbEk3TzBGQlNVRndReXhUUVVGTE0wTXNSMEZCVEN4RlFVRlZaMElzUTBGQlZpeEZRVUZoZFVNc1NVRkJTU3hMUVVGcVFpeEZRVUYzUW5kQ0xFbEJRVWtzUzBGQk5VSXNSVUZCYlVOMFJDeEpRVUZKTEVsQlFYWkRMRVZCUVRaRFFTeEpRVUZKYUVNc1RVRkJha1FzUlVGQmVVUnpReXhMUVVGNlJEdEJRVU5CUml4VlFVRk5OMElzUjBGQlRpeEZRVUZYWjBJc1EwRkJXQ3hGUVVGamRVTXNTVUZCU1N4TFFVRnNRaXhGUVVGNVFuZENMRWxCUVVrc1MwRkJOMElzUlVGQmIwTjBSQ3hKUVVGSkxFbEJRWGhETEVWQlFUaERRU3hKUVVGSmFFTXNUVUZCYkVRc1JVRkJNRVJ6UXl4TFFVRXhSRHRCUVVORUxFZEJVRVE3TzBGQlUwRjNReXhWUVVGUll5eE5RVUZTTEVkQlFXbENMRlZCUVZOeVJpeEhRVUZVTEVWQlFXTm5RaXhEUVVGa0xFVkJRV2xDWlN4TFFVRnFRaXhGUVVGM1FqdEJRVU4yUXl4UlFVRkpkMElzU1VGQlNYWkVMRWxCUVVrMlJTeE5RVUZLTEVOQlFWZERMRXRCUVc1Q08wRkJRVUVzVVVGRFNVTXNTVUZCU1M5RkxFbEJRVWsyUlN4TlFVRktMRU5CUVZkSExFMUJSRzVDTzBGQlFVRXNVVUZGU1haRUxFbEJRVWs1UWl4TFFVRkxjMFlzUjBGQlRDeERRVUZUTVVJc1EwRkJWQ3hGUVVGWmQwSXNRMEZCV2l4RFFVWlNPenRCUVVsQmJFUXNWVUZCVFRkQ0xFZEJRVTRzUlVGQlYyZENMRU5CUVZnc1JVRkJZM1ZETEVsQlFVa3NSMEZCYkVJc1JVRkJkVUozUWl4SlFVRkpMRWRCUVROQ0xFVkJRV2REZEVRc1EwRkJhRU1zUlVGQmJVTkJMRWxCUVVsb1F5eE5RVUYyUXl4RlFVRXJRM05ETEV0QlFTOURPMEZCUTBRc1IwRk9SRHM3UVVGUlFYZERMRlZCUVZGbExFbEJRVklzUjBGQlpTeFZRVUZUZEVZc1IwRkJWQ3hGUVVGalowSXNRMEZCWkN4RlFVRnBRbVVzUzBGQmFrSXNSVUZCZDBJN1FVRkRja01zVVVGQlNYZENMRWxCUVVsMlJDeEpRVUZKTmtVc1RVRkJTaXhEUVVGWFF5eExRVUZ1UWp0QlFVRkJMRkZCUTBsRExFbEJRVWt2UlN4SlFVRkpOa1VzVFVGQlNpeERRVUZYUnl4TlFVUnVRanRCUVVGQkxGRkJSVWwyUkN4SlFVRkpPVUlzUzBGQlMzTkdMRWRCUVV3c1EwRkJVekZDTEVOQlFWUXNSVUZCV1hkQ0xFTkJRVm9zUTBGR1VqczdRVUZKUVd4RExGTkJRVXMzUXl4SFFVRk1MRVZCUVZWblFpeERRVUZXTEVWQlFXRjFReXhKUVVGSkxFZEJRV3BDTEVWQlFYTkNkMElzU1VGQlNTeEpRVUV4UWl4RlFVRm5RM1JFTEVsQlFVa3NSMEZCY0VNc1JVRkJlVU5CTEVsQlFVbG9ReXhOUVVFM1F5eEZRVUZ4UkhORExFdEJRWEpFTzBGQlEwRkdMRlZCUVUwM1FpeEhRVUZPTEVWQlFWZG5RaXhEUVVGWUxFVkJRV04xUXl4SlFVRkpMRWRCUVd4Q0xFVkJRWFZDZDBJc1NVRkJTU3hKUVVFelFpeEZRVUZwUTNSRUxFbEJRVWtzUjBGQmNrTXNSVUZCTUVOQkxFbEJRVWxvUXl4TlFVRTVReXhGUVVGelJITkRMRXRCUVhSRU8wRkJRMFFzUjBGUVJEczdRVUZUUVhkRExGVkJRVkZuUWl4TFFVRlNMRWRCUVdkQ0xGVkJRVk4yUml4SFFVRlVMRVZCUVdOblFpeERRVUZrTEVWQlFXbENaU3hMUVVGcVFpeEZRVUYzUWp0QlFVTjBReXhSUVVGSmQwSXNTVUZCU1haRUxFbEJRVWsyUlN4TlFVRktMRU5CUVZkRExFdEJRVzVDTzBGQlFVRXNVVUZEU1VNc1NVRkJTUzlGTEVsQlFVazJSU3hOUVVGS0xFTkJRVmRITEUxQlJHNUNPMEZCUVVFc1VVRkZTWFpFTEVsQlFVazVRaXhMUVVGTGMwWXNSMEZCVEN4RFFVRlRNVUlzUTBGQlZDeEZRVUZaZDBJc1EwRkJXaXhEUVVaU096dEJRVWxCYWtNc1ZVRkJUVGxETEVkQlFVNHNSVUZCVjJkQ0xFTkJRVmdzUlVGQlkzVkRMRWxCUVVrc1IwRkJiRUlzUlVGQmRVSjNRaXhKUVVGSkxFbEJRVE5DTEVWQlFXbERkRVFzU1VGQlNTeEhRVUZ5UXl4RlFVRXdRMEVzU1VGQlNXaERMRTFCUVRsRExFVkJRWE5FYzBNc1MwRkJkRVE3UVVGRFFVWXNWVUZCVFRkQ0xFZEJRVTRzUlVGQlYyZENMRU5CUVZnc1JVRkJZM1ZETEVsQlFVa3NSMEZCYkVJc1JVRkJkVUozUWl4SlFVRkpMRWxCUVROQ0xFVkJRV2xEZEVRc1NVRkJTU3hIUVVGeVF5eEZRVUV3UTBFc1NVRkJTV2hETEUxQlFUbERMRVZCUVhORWMwTXNTMEZCZEVRN1FVRkRSQ3hIUVZCRU96dEJRVk5CZDBNc1ZVRkJVV2xDTEVsQlFWSXNSMEZCWlN4VlFVRlRlRVlzUjBGQlZDeEZRVUZqWjBJc1EwRkJaQ3hGUVVGcFFtVXNTMEZCYWtJc1JVRkJkMEk3UVVGRGNrTXNVVUZCU1hkQ0xFbEJRVWwyUkN4SlFVRkpOa1VzVFVGQlNpeERRVUZYUXl4TFFVRnVRanRCUVVGQkxGRkJRMGxETEVsQlFVa3ZSU3hKUVVGSk5rVXNUVUZCU2l4RFFVRlhSeXhOUVVSdVFqdEJRVUZCTEZGQlJVbDJSQ3hKUVVGSk9VSXNTMEZCUzNOR0xFZEJRVXdzUTBGQlV6RkNMRU5CUVZRc1JVRkJXWGRDTEVOQlFWb3NRMEZHVWpzN1FVRkpRUzlDTEZOQlFVdG9SQ3hIUVVGTUxFVkJRVlZuUWl4RFFVRldMRVZCUVdGMVF5eEpRVUZKTEVkQlFXcENMRVZCUVhOQ2QwSXNTVUZCU1N4SlFVRXhRaXhGUVVGblEzUkVMRWxCUVVrc1IwRkJjRU1zUlVGQmVVTkJMRWxCUVVsb1F5eE5RVUUzUXl4RlFVRnhSSE5ETEV0QlFYSkVPMEZCUTBGR0xGVkJRVTAzUWl4SFFVRk9MRVZCUVZkblFpeERRVUZZTEVWQlFXTjFReXhKUVVGSkxFZEJRV3hDTEVWQlFYVkNkMElzU1VGQlNTeEpRVUV6UWl4RlFVRnBRM1JFTEVsQlFVa3NSMEZCY2tNc1JVRkJNRU5CTEVsQlFVbG9ReXhOUVVFNVF5eEZRVUZ6UkhORExFdEJRWFJFTzBGQlEwUXNSMEZRUkRzN1FVRlRRWGRETEZWQlFWRnJRaXhKUVVGU0xFZEJRV1VzVlVGQlUzcEdMRWRCUVZRc1JVRkJZMmRDTEVOQlFXUXNSVUZCYVVKbExFdEJRV3BDTEVWQlFYZENPMEZCUTNKRExGRkJRVWwzUWl4SlFVRkpka1FzU1VGQlNUWkZMRTFCUVVvc1EwRkJWME1zUzBGQmJrSTdRVUZCUVN4UlFVTkpReXhKUVVGSkwwVXNTVUZCU1RaRkxFMUJRVW9zUTBGQlYwY3NUVUZFYmtJN1FVRkJRU3hSUVVWSmRrUXNTVUZCU1RsQ0xFdEJRVXR6Uml4SFFVRk1MRU5CUVZNeFFpeERRVUZVTEVWQlFWbDNRaXhEUVVGYUxFTkJSbEk3TzBGQlNVRmlMRmRCUVU5c1JTeEhRVUZRTEVWQlFWbG5RaXhEUVVGYUxFVkJRV1YxUXl4SlFVRkpMRWRCUVc1Q0xFVkJRWGRDZDBJc1NVRkJTU3hIUVVFMVFpeEZRVUZwUTNSRUxFTkJRV3BETEVWQlFXOURRU3hKUVVGSmFFTXNUVUZCZUVNc1JVRkJaMFFzUTBGQmFFUXNSVUZCYlVRc1EwRkJia1FzUlVGQmMwUnpReXhMUVVGMFJEdEJRVU5CYlVNc1YwRkJUMnhGTEVkQlFWQXNSVUZCV1dkQ0xFTkJRVm9zUlVGQlpYVkRMRWxCUVVrc1IwRkJia0lzUlVGQmQwSjNRaXhKUVVGSkxFZEJRVFZDTEVWQlFXbERkRVFzUTBGQmFrTXNSVUZCYjBOQkxFbEJRVWxvUXl4TlFVRjRReXhGUVVGblJDeERRVUZvUkN4RlFVRnRSQ3hEUVVGdVJDeEZRVUZ6UkhORExFdEJRWFJFTzBGQlEwUXNSMEZRUkRzN1FVRlRRWGRETEZWQlFWRnRRaXhIUVVGU0xFZEJRV01zVlVGQlV6RkdMRWRCUVZRc1JVRkJZMmRDTEVOQlFXUXNSVUZCYVVKbExFdEJRV3BDTEVWQlFYZENPMEZCUTNCRExGRkJRVWwzUWl4SlFVRkpka1FzU1VGQlNUWkZMRTFCUVVvc1EwRkJWME1zUzBGQmJrSTdRVUZCUVN4UlFVTkpReXhKUVVGSkwwVXNTVUZCU1RaRkxFMUJRVW9zUTBGQlYwY3NUVUZFYmtJN1FVRkJRU3hSUVVWSmRrUXNTVUZCU1RsQ0xFdEJRVXR6Uml4SFFVRk1MRU5CUVZNeFFpeERRVUZVTEVWQlFWbDNRaXhEUVVGYUxFTkJSbEk3UVVGQlFTeFJRVWRKV1N4SlFVRkpiRVVzU1VGQlNXaERMRTFCU0ZvN08wRkJTMEZwUlN4WlFVRlJNVVFzUjBGQlVpeEZRVUZoWjBJc1EwRkJZaXhGUVVGblFuVkRMRWxCUVVrc1IwRkJjRUlzUlVGQmVVSjNRaXhKUVVGSkxFbEJRVGRDTEVWQlFXMURkRVFzU1VGQlNTeEpRVUYyUXl4RlFVRTJRMnRGTEVOQlFUZERMRVZCUVdkRU5VUXNTMEZCYUVRN08wRkJSVUZtTEZOQlFVc3NTVUZCVERzN1FVRkZRU3hSUVVGSlowSXNTVUZCU1hKRExFdEJRVXMyUWl4SFFVRk1MRU5CUVZWU0xFTkJRVVFzUjBGQllYUkNMRWRCUVhSQ0xFbEJRVFpDSzBJc1EwRkJOMElzUjBGQmFVTXNTVUZCZWtNN1FVRkJRU3hSUVVOSlVTeEpRVUZKZEVNc1MwRkJTelpDTEVkQlFVd3NRMEZCVXl4RFFVRkRVaXhKUVVGSkxFbEJRVXdzU1VGQllYUkNMRWRCUVhSQ0xFbEJRVFpDSzBJc1EwRkJOMElzUjBGQmFVTXNTVUZFZWtNN1FVRkJRU3hSUVVWSlJpeEpRVUZKTlVJc1MwRkJTelpDTEVkQlFVd3NRMEZCVXl4RFFVRkRVaXhKUVVGSkxFbEJRVXdzU1VGQllYUkNMRWRCUVhSQ0xFbEJRVFpDSzBJc1EwRkJOMElzUjBGQmFVTXNTVUZHZWtNN1FVRkJRU3hSUVVkSlV5eEpRVUZKZGtNc1MwRkJTelpDTEVkQlFVd3NRMEZCVXl4RFFVRkRVaXhKUVVGSkxFbEJRVXdzU1VGQllYUkNMRWRCUVhSQ0xFbEJRVFpDSzBJc1EwRkJOMElzUjBGQmFVTXNTVUZJZWtNN1FVRkJRU3hSUVVsSmJVVXNTVUZCU1dJc1NVRkJTU3hMUVVwYU8wRkJRVUVzVVVGTFNXWXNTVUZCU1hKRkxFdEJRVXR2UkN4TFFVRk1MRU5CUVZjMlF5eEpRVUZKUkN4SlFVRkpMRWRCUVc1Q0xFbEJRVEJDTEVkQlRHeERPMEZCUVVFc1VVRk5TVEZDTEVsQlFVbDBSU3hMUVVGTGIwUXNTMEZCVEN4RFFVRlhOa01zU1VGQlNVUXNTVUZCU1N4SFFVRnVRaXhKUVVFd1FpeEhRVTVzUXpzN1FVRlJRVE5HTEZGQlFVbDFReXhYUVVGS0xFZEJRV3RDVWl4TFFVRnNRanRCUVVOQkwwSXNVVUZCU1hkRExGTkJRVW9zUjBGQlowSnRSQ3hEUVVGb1FqdEJRVU5CTTBZc1VVRkJTWGxETEU5QlFVb3NSMEZCWXl4UFFVRmtPMEZCUTBGNlF5eFJRVUZKTUVNc1VVRkJTaXhIUVVGbExFOUJRV1k3TzBGQlJVRnVReXhUUVVGTFVDeEhRVUZNTEVWQlFWVm5ReXhKUVVGSmRVSXNTVUZCU1N4SFFVRlNMRWRCUVdOdlF5eEpRVUZKTEVkQlFUVkNMRVZCUVdsRE0wSXNRMEZCYWtNc1JVRkJiME12UWl4SlFVRkpjMElzU1VGQlNTeEhRVUZTTEVkQlFXTnZReXhKUVVGSkxFZEJRWFJFTEVWQlFUSkVNMElzUTBGQk0wUTdRVUZEUVhwRUxGTkJRVXRRTEVkQlFVd3NSVUZCVlhWQ0xFbEJRVWxuUXl4SlFVRkpMRWRCUVZJc1IwRkJZMjlETEVsQlFVa3NSMEZCTlVJc1JVRkJhVU14UWl4RFFVRnFReXhGUVVGdlF5OUNMRWxCUVVseFFpeEpRVUZKTEVkQlFWSXNSMEZCWTI5RExFbEJRVWtzUjBGQmRFUXNSVUZCTWtReFFpeERRVUV6UkR0QlFVTkVMRWRCZWtKRU96dEJRVEpDUVUwc1ZVRkJVWE5DTEZOQlFWSXNSMEZCYjBJN1FVRkRiRUpETEN0Q1FVRXlRaXh0UTBGQlUwTXNTVUZCVkN4RlFVRmxPMEZCUTNoRExGVkJRVWNzVDBGQlQwRXNTVUZCVUN4TFFVRm5RaXhSUVVGdVFpeEZRVU5GUVN4UFFVRlBlRUlzVVVGQlVYZENMRXRCUVV0RExGZEJRVXdzUjBGQmJVSkRMRTlCUVc1Q0xFTkJRVEpDTEVsQlFUTkNMRVZCUVdsRExFZEJRV3BETEVOQlFWSXNTMEZCYTBRc1NVRkJla1E3TzBGQlJVWXNZVUZCVDBZc1NVRkJVRHRCUVVORUxFdEJUbWxDTzBGQlQyeENSeXhUUVVGTExHRkJRVk5ETEVWQlFWUXNSVUZCWVVvc1NVRkJZaXhGUVVGdFFqdEJRVU4wUWl4VlFVRkpTeXhIUVVGS096dEJRVVZCTEZWQlFVY3NUMEZCVDBRc1JVRkJVQ3hMUVVGakxGRkJRV3BDTEVWQlEwVkJMRXRCUVV0RkxGTkJRVk5ETEdOQlFWUXNRMEZCZDBKSUxFVkJRWGhDTEVOQlFVdzdPMEZCUlVZN1FVRkRRU3hWUVVGSFFTeFBRVUZQTEVsQlFWWXNSVUZEUlRzN1FVRkZSa29zWVVGQlR5eExRVUZMUkN4NVFrRkJUQ3hEUVVFclFrTXNTVUZCTDBJc1EwRkJVRHM3UVVGRlFUdEJRVU5CTEZWQlFVY3NUMEZCVDBFc1NVRkJVQ3hMUVVGblFpeFZRVUZ1UWl4RlFVTkZPenRCUVVWR1N5eFpRVUZOTzBGQlEwcEhMR2xDUVVGVFNpeEZRVVJNTzBGQlJVcExMR2xDUVVGVFRDeEhRVUZIVFN4VlFVRklMRU5CUVdNc1NVRkJaQ3hEUVVaTU8wRkJSMHBETEdsQ1FVRlRXRHRCUVVoTUxFOUJRVTQ3TzBGQlRVRXNWMEZCUzNSQ0xFbEJRVXdzUTBGQlZXdERMRWxCUVZZc1EwRkJaVkFzUjBGQlpqdEJRVU5CTEZkQlFVdE1MRWxCUVV3c1EwRkJWVXNzUjBGQlZpeEZRVUZsTlVjc1VVRkJaanRCUVVORUxFdEJMMEpwUWp0QlFXZERiRUp2U0N4VFFVRkxMR0ZCUVZOVUxFVkJRVlFzUlVGQllVb3NTVUZCWWl4RlFVRnRRanRCUVVOMFFpeFZRVUZKYmtVc1EwRkJTanM3UVVGRlFTeFZRVUZITEU5QlFVOTFSU3hGUVVGUUxFdEJRV01zVVVGQmFrSXNSVUZEUlVFc1MwRkJTMFVzVTBGQlUwTXNZMEZCVkN4RFFVRjNRa2dzUlVGQmVFSXNRMEZCVERzN1FVRkZSaXhYUVVGSmRrVXNTVUZCU1N4TFFVRkxOa01zU1VGQlRDeERRVUZWU0N4TlFVRnNRaXhGUVVFd1FqRkRMRWRCUVRGQ08wRkJRMFVzV1VGQlJ5eExRVUZMTmtNc1NVRkJUQ3hEUVVGVk4wTXNRMEZCVml4RlFVRmhNa1VzVDBGQllpeExRVUY1UWtvc1JVRkJOVUlzUlVGQlowTTdRVUZET1VJc1pVRkJTekZDTEVsQlFVd3NRMEZCVlRkRExFTkJRVllzUlVGQllUaEZMRTlCUVdJc1IwRkJkVUlzUzBGQlMxb3NlVUpCUVV3c1EwRkJLMEpETEVsQlFTOUNMRU5CUVhaQ08wRkJRMEVzWlVGQlMwRXNTVUZCVEN4RFFVRlZMRXRCUVV0MFFpeEpRVUZNTEVOQlFWVTNReXhEUVVGV0xFTkJRVllzUlVGQmQwSndReXhSUVVGNFFqdEJRVU5CTzBGQlEwUTdRVUZNU0N4UFFVOUJMRXRCUVVzd1J5eEhRVUZNTEVOQlFWTkRMRVZCUVZRc1JVRkJZVW9zU1VGQllqdEJRVU5FTEV0Qk9VTnBRanRCUVN0RGJFSmpMRmxCUVZFc1owSkJRVk5XTEVWQlFWUXNSVUZCWVR0QlFVTnVRaXhWUVVGSmRrVXNRMEZCU2pzN1FVRkZRU3hWUVVGSExFOUJRVTkxUlN4RlFVRlFMRXRCUVdNc1VVRkJha0lzUlVGRFJVRXNTMEZCUzBVc1UwRkJVME1zWTBGQlZDeERRVUYzUWtnc1JVRkJlRUlzUTBGQlREczdRVUZGUml4WFFVRkpka1VzU1VGQlNTeExRVUZMTmtNc1NVRkJUQ3hEUVVGVlNDeE5RVUZzUWl4RlFVRXdRakZETEVkQlFURkNPMEZCUTBVc1dVRkJSeXhMUVVGTE5rTXNTVUZCVEN4RFFVRlZOME1zUTBGQlZpeEZRVUZoTWtVc1QwRkJZaXhMUVVGNVFrb3NSVUZCTlVJc1JVRkJaME03UVVGRE9VSXNaVUZCU3pGQ0xFbEJRVXdzUTBGQlZYRkRMRTFCUVZZc1EwRkJhVUpzUml4RFFVRnFRaXhGUVVGdlFpeERRVUZ3UWp0QlFVTkJPMEZCUTBRN1FVRktTRHRCUVV0RUxFdEJNVVJwUWp0QlFUSkViRUp0UlN4VlFVRk5MR05CUVZOTExFZEJRVlFzUlVGQlkxY3NTVUZCWkN4RlFVRnZRanRCUVVONFFpeFZRVUZKYkVNc1UwRkJVM1ZDTEVsQlFVbEpMRTlCUVVvc1EwRkJXVE5DTEUxQlFYcENPenRCUVVWQkxGVkJRVWNzUzBGQlMwWXNWMEZCVWl4RlFVTkZSU3hQUVVGUFF5eExRVUZRTEVkQlFXVkVMRTlCUVU5RExFdEJRWFJDTEVOQlJFWXNTMEZKUlhOQ0xFbEJRVWxKTEU5QlFVb3NRMEZCV1ZFc1UwRkJXaXhEUVVGelFpeERRVUYwUWl4RlFVRjVRaXhEUVVGNlFpeEZRVUUwUW01RExFOUJRVTlETEV0QlFXNURMRVZCUVRCRFJDeFBRVUZQUnl4TlFVRnFSRHM3UVVGRlJtOUNMRlZCUVVsTkxFOUJRVW9zUTBGQldVNHNTVUZCU1Vrc1QwRkJhRUlzUlVGQmVVSlBMRWxCUVhwQ0xFVkJRU3RDTEV0QlFVdG9SaXhMUVVGd1F6dEJRVU5FTEV0QmNrVnBRanRCUVhORmJFSnJSaXhWUVVGTkxHZENRVUZYTzBGQlEyWXNWVUZCU1VNc1QwRkJUeXhKUVVGWU96dEJRVVZCTEZkQlFVdERMRXRCUVV3N1FVRkRRU3hYUVVGTGVrTXNVVUZCVEN4SFFVRm5RblpITEdkQ1FVRm5RaXhaUVVGWE8wRkJRM3BETEZsQlFVbHBTaXhOUVVGTlF5eExRVUZMUkN4SFFVRk1MRVZCUVZZN1FVRkJRU3haUVVOSmVFWXNRMEZFU2pzN1FVRkhRU3hoUVVGSlFTeEpRVUZKYzBZc1MwRkJTM3BETEVsQlFVd3NRMEZCVlVnc1RVRkJiRUlzUlVGQk1FSXhReXhIUVVFeFFqdEJRVU5GYzBZc1pVRkJTMjVDTEVsQlFVd3NRMEZCVlcxQ0xFdEJRVXQ2UXl4SlFVRk1MRU5CUVZVM1F5eERRVUZXTEVOQlFWWXNSVUZCZDBKM1JpeEhRVUY0UWp0QlFVUkdPMEZCUlVRc1QwRk9aU3hGUVUxaUxFOUJRVThzUlVGT1RTeERRVUZvUWp0QlFVOUVMRXRCYWtacFFqdEJRV3RHYkVKRUxGZEJRVThzYVVKQlFWYzdRVUZEYUVJc1ZVRkJTWFpHTEVOQlFVbzdPMEZCUlVFc1ZVRkJSeXhMUVVGTE9FTXNVVUZCVWl4RlFVRnJRanRCUVVOb1FuUkhMSFZDUVVGbExFdEJRVXR6Unl4UlFVRndRanRCUVVOQkxHRkJRVXRCTEZGQlFVd3NSMEZCWjBJc1NVRkJhRUk3UVVGRFJEdEJRVU5HTzBGQmVrWnBRaXhIUVVGd1FqdEJRVEpHUVN4VFFVRlBTQ3hQUVVGUU8wRkJRMFFzUTBGMmRFSkVJaXdpWm1sc1pTSTZJbk5yZVdOdmJuTXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJdktpQnFjMmhwYm5RZ1luSnZkM05sY2pwMGNuVmxMQ0J1YjJSbE9uUnlkV1VnS2k5Y2Jsd2lkWE5sSUhOMGNtbGpkRndpTzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUtHZHNiMkpoYkNrZ2UxeHVYRzRnSUM4cUlGTmxkQ0IxY0NCaElGSmxjWFZsYzNSQmJtbHRZWFJwYjI1R2NtRnRaU0J6YUdsdElITnZJSGRsSUdOaGJpQmhibWx0WVhSbElHVm1abWxqYVdWdWRHeDVJRVpQVWx4dUlDQWdLaUJIVWtWQlZDQktWVk5VU1VORkxpQXFMMXh1SUNCMllYSWdjbVZ4ZFdWemRFbHVkR1Z5ZG1Gc0xDQmpZVzVqWld4SmJuUmxjblpoYkR0Y2JseHVJQ0FvWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnZG1GeUlISmhaaUE5SUdkc2IySmhiQzV5WlhGMVpYTjBRVzVwYldGMGFXOXVSbkpoYldVZ0lDQWdJQ0FnZkh4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnWjJ4dlltRnNMbmRsWW10cGRGSmxjWFZsYzNSQmJtbHRZWFJwYjI1R2NtRnRaU0I4ZkZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0JuYkc5aVlXd3ViVzk2VW1WeGRXVnpkRUZ1YVcxaGRHbHZia1p5WVcxbElDQWdJSHg4WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJR2RzYjJKaGJDNXZVbVZ4ZFdWemRFRnVhVzFoZEdsdmJrWnlZVzFsSUNBZ0lDQWdmSHhjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdaMnh2WW1Gc0xtMXpVbVZ4ZFdWemRFRnVhVzFoZEdsdmJrWnlZVzFsSUNBZ0lDQXNYRzRnSUNBZ0lDQWdJR05oWmlBOUlHZHNiMkpoYkM1allXNWpaV3hCYm1sdFlYUnBiMjVHY21GdFpTQWdJQ0FnSUNBZ2ZIeGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ1oyeHZZbUZzTG5kbFltdHBkRU5oYm1ObGJFRnVhVzFoZEdsdmJrWnlZVzFsSUNCOGZGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNCbmJHOWlZV3d1Ylc5NlEyRnVZMlZzUVc1cGJXRjBhVzl1Um5KaGJXVWdJQ0FnSUh4OFhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUdkc2IySmhiQzV2UTJGdVkyVnNRVzVwYldGMGFXOXVSbkpoYldVZ0lDQWdJQ0FnZkh4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnWjJ4dlltRnNMbTF6UTJGdVkyVnNRVzVwYldGMGFXOXVSbkpoYldVZ0lDQWdJQ0E3WEc1Y2JpQWdJQ0JwWmloeVlXWWdKaVlnWTJGbUtTQjdYRzRnSUNBZ0lDQnlaWEYxWlhOMFNXNTBaWEoyWVd3Z1BTQm1kVzVqZEdsdmJpaG1iaXdnWkdWc1lYa3BJSHRjYmlBZ0lDQWdJQ0FnZG1GeUlHaGhibVJzWlNBOUlIdDJZV3gxWlRvZ2JuVnNiSDA3WEc1Y2JpQWdJQ0FnSUNBZ1puVnVZM1JwYjI0Z2JHOXZjQ2dwSUh0Y2JpQWdJQ0FnSUNBZ0lDQm9ZVzVrYkdVdWRtRnNkV1VnUFNCeVlXWW9iRzl2Y0NrN1hHNGdJQ0FnSUNBZ0lDQWdabTRvS1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJR3h2YjNBb0tUdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlHaGhibVJzWlR0Y2JpQWdJQ0FnSUgwN1hHNWNiaUFnSUNBZ0lHTmhibU5sYkVsdWRHVnlkbUZzSUQwZ1puVnVZM1JwYjI0b2FHRnVaR3hsS1NCN1hHNGdJQ0FnSUNBZ0lHTmhaaWhvWVc1a2JHVXVkbUZzZFdVcE8xeHVJQ0FnSUNBZ2ZUdGNiaUFnSUNCOVhHNWNiaUFnSUNCbGJITmxJSHRjYmlBZ0lDQWdJSEpsY1hWbGMzUkpiblJsY25aaGJDQTlJSE5sZEVsdWRHVnlkbUZzTzF4dUlDQWdJQ0FnWTJGdVkyVnNTVzUwWlhKMllXd2dQU0JqYkdWaGNrbHVkR1Z5ZG1Gc08xeHVJQ0FnSUgxY2JpQWdmU2dwS1R0Y2JseHVJQ0F2S2lCRFlYUnRkV3hzTFhKdmJTQnpjR3hwYm1VZ2MzUjFabVp6TGlBcUwxeHVJQ0F2S2x4dUlDQm1kVzVqZEdsdmJpQjFjSE5oYlhCc1pTaHVMQ0J6Y0d4cGJtVXBJSHRjYmlBZ0lDQjJZWElnY0c5c2VXeHBibVVnUFNCYlhTeGNiaUFnSUNBZ0lDQWdiR1Z1SUQwZ2MzQnNhVzVsTG14bGJtZDBhQ3hjYmlBZ0lDQWdJQ0FnWW5nZ0lEMGdjM0JzYVc1bFd6QmRMRnh1SUNBZ0lDQWdJQ0JpZVNBZ1BTQnpjR3hwYm1WYk1WMHNYRzRnSUNBZ0lDQWdJR040SUNBOUlITndiR2x1WlZzeVhTeGNiaUFnSUNBZ0lDQWdZM2tnSUQwZ2MzQnNhVzVsV3pOZExGeHVJQ0FnSUNBZ0lDQmtlQ0FnUFNCemNHeHBibVZiTkYwc1hHNGdJQ0FnSUNBZ0lHUjVJQ0E5SUhOd2JHbHVaVnMxWFN4Y2JpQWdJQ0FnSUNBZ2FTd2dhaXdnWVhnc0lHRjVMQ0J3ZUN3Z2NYZ3NJSEo0TENCemVDd2djSGtzSUhGNUxDQnllU3dnYzNrc0lIUTdYRzVjYmlBZ0lDQm1iM0lvYVNBOUlEWTdJR2tnSVQwOUlITndiR2x1WlM1c1pXNW5kR2c3SUdrZ0t6MGdNaWtnZTF4dUlDQWdJQ0FnWVhnZ1BTQmllRHRjYmlBZ0lDQWdJR0o0SUQwZ1kzZzdYRzRnSUNBZ0lDQmplQ0E5SUdSNE8xeHVJQ0FnSUNBZ1pIZ2dQU0J6Y0d4cGJtVmJhU0FnSUNCZE8xeHVJQ0FnSUNBZ2NIZ2dQU0F0TUM0MUlDb2dZWGdnS3lBeExqVWdLaUJpZUNBdElERXVOU0FxSUdONElDc2dNQzQxSUNvZ1pIZzdYRzRnSUNBZ0lDQnhlQ0E5SUNBZ0lDQWdJQ0JoZUNBdElESXVOU0FxSUdKNElDc2dNaTR3SUNvZ1kzZ2dMU0F3TGpVZ0tpQmtlRHRjYmlBZ0lDQWdJSEo0SUQwZ0xUQXVOU0FxSUdGNElDQWdJQ0FnSUNBZ0lDQWdLeUF3TGpVZ0tpQmplQ0FnSUNBZ0lDQWdJQ0FnTzF4dUlDQWdJQ0FnYzNnZ1BTQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmllQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBN1hHNWNiaUFnSUNBZ0lHRjVJRDBnWW5rN1hHNGdJQ0FnSUNCaWVTQTlJR041TzF4dUlDQWdJQ0FnWTNrZ1BTQmtlVHRjYmlBZ0lDQWdJR1I1SUQwZ2MzQnNhVzVsVzJrZ0t5QXhYVHRjYmlBZ0lDQWdJSEI1SUQwZ0xUQXVOU0FxSUdGNUlDc2dNUzQxSUNvZ1lua2dMU0F4TGpVZ0tpQmplU0FySURBdU5TQXFJR1I1TzF4dUlDQWdJQ0FnY1hrZ1BTQWdJQ0FnSUNBZ1lYa2dMU0F5TGpVZ0tpQmllU0FySURJdU1DQXFJR041SUMwZ01DNDFJQ29nWkhrN1hHNGdJQ0FnSUNCeWVTQTlJQzB3TGpVZ0tpQmhlU0FnSUNBZ0lDQWdJQ0FnSUNzZ01DNDFJQ29nWTNrZ0lDQWdJQ0FnSUNBZ0lEdGNiaUFnSUNBZ0lITjVJRDBnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWW5rZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdPMXh1WEc0Z0lDQWdJQ0JtYjNJb2FpQTlJREE3SUdvZ0lUMDlJRzQ3SUNzcmFpa2dlMXh1SUNBZ0lDQWdJQ0IwSUQwZ2FpQXZJRzQ3WEc1Y2JpQWdJQ0FnSUNBZ2NHOXNlV3hwYm1VdWNIVnphQ2hjYmlBZ0lDQWdJQ0FnSUNBb0tIQjRJQ29nZENBcklIRjRLU0FxSUhRZ0t5QnllQ2tnS2lCMElDc2djM2dzWEc0Z0lDQWdJQ0FnSUNBZ0tDaHdlU0FxSUhRZ0t5QnhlU2tnS2lCMElDc2djbmtwSUNvZ2RDQXJJSE41WEc0Z0lDQWdJQ0FnSUNrN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dVhHNGdJQ0FnY0c5c2VXeHBibVV1Y0hWemFDaGNiaUFnSUNBZ0lIQjRJQ3NnY1hnZ0t5QnllQ0FySUhONExGeHVJQ0FnSUNBZ2NIa2dLeUJ4ZVNBcklISjVJQ3NnYzNsY2JpQWdJQ0FwTzF4dVhHNGdJQ0FnY21WMGRYSnVJSEJ2Ykhsc2FXNWxPMXh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnWkc5M2JuTmhiWEJzWlNodUxDQndiMng1YkdsdVpTa2dlMXh1SUNBZ0lIWmhjaUJzWlc0Z1BTQXdMRnh1SUNBZ0lDQWdJQ0JwTENCa2VDd2daSGs3WEc1Y2JpQWdJQ0JtYjNJb2FTQTlJREk3SUdrZ0lUMDlJSEJ2Ykhsc2FXNWxMbXhsYm1kMGFEc2dhU0FyUFNBeUtTQjdYRzRnSUNBZ0lDQmtlQ0E5SUhCdmJIbHNhVzVsVzJrZ0lDQWdYU0F0SUhCdmJIbHNhVzVsVzJrZ0xTQXlYVHRjYmlBZ0lDQWdJR1I1SUQwZ2NHOXNlV3hwYm1WYmFTQXJJREZkSUMwZ2NHOXNlV3hwYm1WYmFTQXRJREZkTzF4dUlDQWdJQ0FnYkdWdUlDczlJRTFoZEdndWMzRnlkQ2hrZUNBcUlHUjRJQ3NnWkhrZ0tpQmtlU2s3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdiR1Z1SUM4OUlHNDdYRzVjYmlBZ0lDQjJZWElnYzIxaGJHd2dQU0JiWFN4Y2JpQWdJQ0FnSUNBZ2RHRnlaMlYwSUQwZ2JHVnVMRnh1SUNBZ0lDQWdJQ0J0YVc0Z1BTQXdMRnh1SUNBZ0lDQWdJQ0J0WVhnc0lIUTdYRzVjYmlBZ0lDQnpiV0ZzYkM1d2RYTm9LSEJ2Ykhsc2FXNWxXekJkTENCd2IyeDViR2x1WlZzeFhTazdYRzVjYmlBZ0lDQm1iM0lvYVNBOUlESTdJR2tnSVQwOUlIQnZiSGxzYVc1bExteGxibWQwYURzZ2FTQXJQU0F5S1NCN1hHNGdJQ0FnSUNCa2VDQTlJSEJ2Ykhsc2FXNWxXMmtnSUNBZ1hTQXRJSEJ2Ykhsc2FXNWxXMmtnTFNBeVhUdGNiaUFnSUNBZ0lHUjVJRDBnY0c5c2VXeHBibVZiYVNBcklERmRJQzBnY0c5c2VXeHBibVZiYVNBdElERmRPMXh1SUNBZ0lDQWdiV0Y0SUQwZ2JXbHVJQ3NnVFdGMGFDNXpjWEowS0dSNElDb2daSGdnS3lCa2VTQXFJR1I1S1R0Y2JseHVJQ0FnSUNBZ2FXWW9iV0Y0SUQ0Z2RHRnlaMlYwS1NCN1hHNGdJQ0FnSUNBZ0lIUWdQU0FvZEdGeVoyVjBJQzBnYldsdUtTQXZJQ2h0WVhnZ0xTQnRhVzRwTzF4dVhHNGdJQ0FnSUNBZ0lITnRZV3hzTG5CMWMyZ29YRzRnSUNBZ0lDQWdJQ0FnY0c5c2VXeHBibVZiYVNBdElESmRJQ3NnWkhnZ0tpQjBMRnh1SUNBZ0lDQWdJQ0FnSUhCdmJIbHNhVzVsVzJrZ0xTQXhYU0FySUdSNUlDb2dkRnh1SUNBZ0lDQWdJQ0FwTzF4dVhHNGdJQ0FnSUNBZ0lIUmhjbWRsZENBclBTQnNaVzQ3WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUcxcGJpQTlJRzFoZUR0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0J6YldGc2JDNXdkWE5vS0hCdmJIbHNhVzVsVzNCdmJIbHNhVzVsTG14bGJtZDBhQ0F0SURKZExDQndiMng1YkdsdVpWdHdiMng1YkdsdVpTNXNaVzVuZEdnZ0xTQXhYU2s3WEc1Y2JpQWdJQ0J5WlhSMWNtNGdjMjFoYkd3N1hHNGdJSDFjYmlBZ0tpOWNibHh1SUNBdktpQkVaV1pwYm1VZ2MydDVZMjl1SUhSb2FXNW5jeTRnS2k5Y2JpQWdMeW9nUmtsWVRVVTZJRWtuYlNBcWNtVmhiR3g1SUhKbFlXeHNlU29nYzI5eWNua2dkR2hoZENCMGFHbHpJR052WkdVZ2FYTWdjMjhnWjNKdmMzTXVJRkpsWVd4c2VTd2dTU0JoYlM1Y2JpQWdJQ29nU1Nkc2JDQjBjbmtnZEc4Z1kyeGxZVzRnYVhRZ2RYQWdaWFpsYm5SMVlXeHNlU0VnVUhKdmJXbHpaU0VnS2k5Y2JpQWdkbUZ5SUV0RldVWlNRVTFGSUQwZ05UQXdMRnh1SUNBZ0lDQWdVMVJTVDB0RklEMGdNQzR3T0N4Y2JpQWdJQ0FnSUZSQlZTQTlJREl1TUNBcUlFMWhkR2d1VUVrc1hHNGdJQ0FnSUNCVVYwOWZUMVpGVWw5VFVWSlVYeklnUFNBeUxqQWdMeUJOWVhSb0xuTnhjblFvTWlrN1hHNWNiaUFnWm5WdVkzUnBiMjRnWTJseVkyeGxLR04wZUN3Z2VDd2dlU3dnY2lrZ2UxeHVJQ0FnSUdOMGVDNWlaV2RwYmxCaGRHZ29LVHRjYmlBZ0lDQmpkSGd1WVhKaktIZ3NJSGtzSUhJc0lEQXNJRlJCVlN3Z1ptRnNjMlVwTzF4dUlDQWdJR04wZUM1bWFXeHNLQ2s3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCc2FXNWxLR04wZUN3Z1lYZ3NJR0Y1TENCaWVDd2dZbmtwSUh0Y2JpQWdJQ0JqZEhndVltVm5hVzVRWVhSb0tDazdYRzRnSUNBZ1kzUjRMbTF2ZG1WVWJ5aGhlQ3dnWVhrcE8xeHVJQ0FnSUdOMGVDNXNhVzVsVkc4b1luZ3NJR0o1S1R0Y2JpQWdJQ0JqZEhndWMzUnliMnRsS0NrN1hHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQndkV1ptS0dOMGVDd2dkQ3dnWTNnc0lHTjVMQ0J5ZUN3Z2Nua3NJSEp0YVc0c0lISnRZWGdwSUh0Y2JpQWdJQ0IyWVhJZ1l5QTlJRTFoZEdndVkyOXpLSFFnS2lCVVFWVXBMRnh1SUNBZ0lDQWdJQ0J6SUQwZ1RXRjBhQzV6YVc0b2RDQXFJRlJCVlNrN1hHNWNiaUFnSUNCeWJXRjRJQzA5SUhKdGFXNDdYRzVjYmlBZ0lDQmphWEpqYkdVb1hHNGdJQ0FnSUNCamRIZ3NYRzRnSUNBZ0lDQmplQ0F0SUhNZ0tpQnllQ3hjYmlBZ0lDQWdJR041SUNzZ1l5QXFJSEo1SUNzZ2NtMWhlQ0FxSURBdU5TeGNiaUFnSUNBZ0lISnRhVzRnS3lBb01TQXRJR01nS2lBd0xqVXBJQ29nY20xaGVGeHVJQ0FnSUNrN1hHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQndkV1ptY3loamRIZ3NJSFFzSUdONExDQmplU3dnY25nc0lISjVMQ0J5YldsdUxDQnliV0Y0S1NCN1hHNGdJQ0FnZG1GeUlHazdYRzVjYmlBZ0lDQm1iM0lvYVNBOUlEVTdJR2t0TFRzZ0tWeHVJQ0FnSUNBZ2NIVm1aaWhqZEhnc0lIUWdLeUJwSUM4Z05Td2dZM2dzSUdONUxDQnllQ3dnY25rc0lISnRhVzRzSUhKdFlYZ3BPMXh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnWTJ4dmRXUW9ZM1I0TENCMExDQmplQ3dnWTNrc0lHTjNMQ0J6TENCamIyeHZjaWtnZTF4dUlDQWdJSFFnTHowZ016QXdNREE3WEc1Y2JpQWdJQ0IyWVhJZ1lTQTlJR04zSUNvZ01DNHlNU3hjYmlBZ0lDQWdJQ0FnWWlBOUlHTjNJQ29nTUM0eE1peGNiaUFnSUNBZ0lDQWdZeUE5SUdOM0lDb2dNQzR5TkN4Y2JpQWdJQ0FnSUNBZ1pDQTlJR04zSUNvZ01DNHlPRHRjYmx4dUlDQWdJR04wZUM1bWFXeHNVM1I1YkdVZ1BTQmpiMnh2Y2p0Y2JpQWdJQ0J3ZFdabWN5aGpkSGdzSUhRc0lHTjRMQ0JqZVN3Z1lTd2dZaXdnWXl3Z1pDazdYRzVjYmlBZ0lDQmpkSGd1WjJ4dlltRnNRMjl0Y0c5emFYUmxUM0JsY21GMGFXOXVJRDBnSjJSbGMzUnBibUYwYVc5dUxXOTFkQ2M3WEc0Z0lDQWdjSFZtWm5Nb1kzUjRMQ0IwTENCamVDd2dZM2tzSUdFc0lHSXNJR01nTFNCekxDQmtJQzBnY3lrN1hHNGdJQ0FnWTNSNExtZHNiMkpoYkVOdmJYQnZjMmwwWlU5d1pYSmhkR2x2YmlBOUlDZHpiM1Z5WTJVdGIzWmxjaWM3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCemRXNG9ZM1I0TENCMExDQmplQ3dnWTNrc0lHTjNMQ0J6TENCamIyeHZjaWtnZTF4dUlDQWdJSFFnTHowZ01USXdNREF3TzF4dVhHNGdJQ0FnZG1GeUlHRWdQU0JqZHlBcUlEQXVNalVnTFNCeklDb2dNQzQxTEZ4dUlDQWdJQ0FnSUNCaUlEMGdZM2NnS2lBd0xqTXlJQ3NnY3lBcUlEQXVOU3hjYmlBZ0lDQWdJQ0FnWXlBOUlHTjNJQ29nTUM0MU1DQXRJSE1nS2lBd0xqVXNYRzRnSUNBZ0lDQWdJR2tzSUhBc0lHTnZjeXdnYzJsdU8xeHVYRzRnSUNBZ1kzUjRMbk4wY205clpWTjBlV3hsSUQwZ1kyOXNiM0k3WEc0Z0lDQWdZM1I0TG14cGJtVlhhV1IwYUNBOUlITTdYRzRnSUNBZ1kzUjRMbXhwYm1WRFlYQWdQU0JjSW5KdmRXNWtYQ0k3WEc0Z0lDQWdZM1I0TG14cGJtVktiMmx1SUQwZ1hDSnliM1Z1WkZ3aU8xeHVYRzRnSUNBZ1kzUjRMbUpsWjJsdVVHRjBhQ2dwTzF4dUlDQWdJR04wZUM1aGNtTW9ZM2dzSUdONUxDQmhMQ0F3TENCVVFWVXNJR1poYkhObEtUdGNiaUFnSUNCamRIZ3VjM1J5YjJ0bEtDazdYRzVjYmlBZ0lDQm1iM0lvYVNBOUlEZzdJR2t0TFRzZ0tTQjdYRzRnSUNBZ0lDQndJRDBnS0hRZ0t5QnBJQzhnT0NrZ0tpQlVRVlU3WEc0Z0lDQWdJQ0JqYjNNZ1BTQk5ZWFJvTG1OdmN5aHdLVHRjYmlBZ0lDQWdJSE5wYmlBOUlFMWhkR2d1YzJsdUtIQXBPMXh1SUNBZ0lDQWdiR2x1WlNoamRIZ3NJR040SUNzZ1kyOXpJQ29nWWl3Z1kza2dLeUJ6YVc0Z0tpQmlMQ0JqZUNBcklHTnZjeUFxSUdNc0lHTjVJQ3NnYzJsdUlDb2dZeWs3WEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnYlc5dmJpaGpkSGdzSUhRc0lHTjRMQ0JqZVN3Z1kzY3NJSE1zSUdOdmJHOXlLU0I3WEc0Z0lDQWdkQ0F2UFNBeE5UQXdNRHRjYmx4dUlDQWdJSFpoY2lCaElEMGdZM2NnS2lBd0xqSTVJQzBnY3lBcUlEQXVOU3hjYmlBZ0lDQWdJQ0FnWWlBOUlHTjNJQ29nTUM0d05TeGNiaUFnSUNBZ0lDQWdZeUE5SUUxaGRHZ3VZMjl6S0hRZ0tpQlVRVlVwTEZ4dUlDQWdJQ0FnSUNCd0lEMGdZeUFxSUZSQlZTQXZJQzB4Tmp0Y2JseHVJQ0FnSUdOMGVDNXpkSEp2YTJWVGRIbHNaU0E5SUdOdmJHOXlPMXh1SUNBZ0lHTjBlQzVzYVc1bFYybGtkR2dnUFNCek8xeHVJQ0FnSUdOMGVDNXNhVzVsUTJGd0lEMGdYQ0p5YjNWdVpGd2lPMXh1SUNBZ0lHTjBlQzVzYVc1bFNtOXBiaUE5SUZ3aWNtOTFibVJjSWp0Y2JseHVJQ0FnSUdONElDczlJR01nS2lCaU8xeHVYRzRnSUNBZ1kzUjRMbUpsWjJsdVVHRjBhQ2dwTzF4dUlDQWdJR04wZUM1aGNtTW9ZM2dzSUdONUxDQmhMQ0J3SUNzZ1ZFRlZJQzhnT0N3Z2NDQXJJRlJCVlNBcUlEY2dMeUE0TENCbVlXeHpaU2s3WEc0Z0lDQWdZM1I0TG1GeVl5aGplQ0FySUUxaGRHZ3VZMjl6S0hBcElDb2dZU0FxSUZSWFQxOVBWa1ZTWDFOUlVsUmZNaXdnWTNrZ0t5Qk5ZWFJvTG5OcGJpaHdLU0FxSUdFZ0tpQlVWMDlmVDFaRlVsOVRVVkpVWHpJc0lHRXNJSEFnS3lCVVFWVWdLaUExSUM4Z09Dd2djQ0FySUZSQlZTQXFJRE1nTHlBNExDQjBjblZsS1R0Y2JpQWdJQ0JqZEhndVkyeHZjMlZRWVhSb0tDazdYRzRnSUNBZ1kzUjRMbk4wY205clpTZ3BPMXh1SUNCOVhHNWNiaUFnWm5WdVkzUnBiMjRnY21GcGJpaGpkSGdzSUhRc0lHTjRMQ0JqZVN3Z1kzY3NJSE1zSUdOdmJHOXlLU0I3WEc0Z0lDQWdkQ0F2UFNBeE16VXdPMXh1WEc0Z0lDQWdkbUZ5SUdFZ1BTQmpkeUFxSURBdU1UWXNYRzRnSUNBZ0lDQWdJR0lnUFNCVVFWVWdLaUF4TVNBdklERXlMRnh1SUNBZ0lDQWdJQ0JqSUQwZ1ZFRlZJQ29nSURjZ0x5QXhNaXhjYmlBZ0lDQWdJQ0FnYVN3Z2NDd2dlQ3dnZVR0Y2JseHVJQ0FnSUdOMGVDNW1hV3hzVTNSNWJHVWdQU0JqYjJ4dmNqdGNibHh1SUNBZ0lHWnZjaWhwSUQwZ05Ec2dhUzB0T3lBcElIdGNiaUFnSUNBZ0lIQWdQU0FvZENBcklHa2dMeUEwS1NBbElERTdYRzRnSUNBZ0lDQjRJRDBnWTNnZ0t5QW9LR2tnTFNBeExqVXBJQzhnTVM0MUtTQXFJQ2hwSUQwOVBTQXhJSHg4SUdrZ1BUMDlJRElnUHlBdE1TQTZJREVwSUNvZ1lUdGNiaUFnSUNBZ0lIa2dQU0JqZVNBcklIQWdLaUJ3SUNvZ1kzYzdYRzRnSUNBZ0lDQmpkSGd1WW1WbmFXNVFZWFJvS0NrN1hHNGdJQ0FnSUNCamRIZ3ViVzkyWlZSdktIZ3NJSGtnTFNCeklDb2dNUzQxS1R0Y2JpQWdJQ0FnSUdOMGVDNWhjbU1vZUN3Z2VTd2djeUFxSURBdU56VXNJR0lzSUdNc0lHWmhiSE5sS1R0Y2JpQWdJQ0FnSUdOMGVDNW1hV3hzS0NrN1hHNGdJQ0FnZlZ4dUlDQjlYRzVjYmlBZ1puVnVZM1JwYjI0Z2MyeGxaWFFvWTNSNExDQjBMQ0JqZUN3Z1kza3NJR04zTENCekxDQmpiMnh2Y2lrZ2UxeHVJQ0FnSUhRZ0x6MGdOelV3TzF4dVhHNGdJQ0FnZG1GeUlHRWdQU0JqZHlBcUlEQXVNVGczTlN4Y2JpQWdJQ0FnSUNBZ1lpQTlJRlJCVlNBcUlERXhJQzhnTVRJc1hHNGdJQ0FnSUNBZ0lHTWdQU0JVUVZVZ0tpQWdOeUF2SURFeUxGeHVJQ0FnSUNBZ0lDQnBMQ0J3TENCNExDQjVPMXh1WEc0Z0lDQWdZM1I0TG5OMGNtOXJaVk4wZVd4bElEMGdZMjlzYjNJN1hHNGdJQ0FnWTNSNExteHBibVZYYVdSMGFDQTlJSE1nS2lBd0xqVTdYRzRnSUNBZ1kzUjRMbXhwYm1WRFlYQWdQU0JjSW5KdmRXNWtYQ0k3WEc0Z0lDQWdZM1I0TG14cGJtVktiMmx1SUQwZ1hDSnliM1Z1WkZ3aU8xeHVYRzRnSUNBZ1ptOXlLR2tnUFNBME95QnBMUzA3SUNrZ2UxeHVJQ0FnSUNBZ2NDQTlJQ2gwSUNzZ2FTQXZJRFFwSUNVZ01UdGNiaUFnSUNBZ0lIZ2dQU0JOWVhSb0xtWnNiMjl5S0dONElDc2dLQ2hwSUMwZ01TNDFLU0F2SURFdU5Ta2dLaUFvYVNBOVBUMGdNU0I4ZkNCcElEMDlQU0F5SUQ4Z0xURWdPaUF4S1NBcUlHRXBJQ3NnTUM0MU8xeHVJQ0FnSUNBZ2VTQTlJR041SUNzZ2NDQXFJR04zTzF4dUlDQWdJQ0FnYkdsdVpTaGpkSGdzSUhnc0lIa2dMU0J6SUNvZ01TNDFMQ0I0TENCNUlDc2djeUFxSURFdU5TazdYRzRnSUNBZ2ZWeHVJQ0I5WEc1Y2JpQWdablZ1WTNScGIyNGdjMjV2ZHloamRIZ3NJSFFzSUdONExDQmplU3dnWTNjc0lITXNJR052Ykc5eUtTQjdYRzRnSUNBZ2RDQXZQU0F6TURBd08xeHVYRzRnSUNBZ2RtRnlJR0VnSUQwZ1kzY2dLaUF3TGpFMkxGeHVJQ0FnSUNBZ0lDQmlJQ0E5SUhNZ0tpQXdMamMxTEZ4dUlDQWdJQ0FnSUNCMUlDQTlJSFFnS2lCVVFWVWdLaUF3TGpjc1hHNGdJQ0FnSUNBZ0lIVjRJRDBnVFdGMGFDNWpiM01vZFNrZ0tpQmlMRnh1SUNBZ0lDQWdJQ0IxZVNBOUlFMWhkR2d1YzJsdUtIVXBJQ29nWWl4Y2JpQWdJQ0FnSUNBZ2RpQWdQU0IxSUNzZ1ZFRlZJQzhnTXl4Y2JpQWdJQ0FnSUNBZ2RuZ2dQU0JOWVhSb0xtTnZjeWgyS1NBcUlHSXNYRzRnSUNBZ0lDQWdJSFo1SUQwZ1RXRjBhQzV6YVc0b2Rpa2dLaUJpTEZ4dUlDQWdJQ0FnSUNCM0lDQTlJSFVnS3lCVVFWVWdLaUF5SUM4Z015eGNiaUFnSUNBZ0lDQWdkM2dnUFNCTllYUm9MbU52Y3loM0tTQXFJR0lzWEc0Z0lDQWdJQ0FnSUhkNUlEMGdUV0YwYUM1emFXNG9keWtnS2lCaUxGeHVJQ0FnSUNBZ0lDQnBMQ0J3TENCNExDQjVPMXh1WEc0Z0lDQWdZM1I0TG5OMGNtOXJaVk4wZVd4bElEMGdZMjlzYjNJN1hHNGdJQ0FnWTNSNExteHBibVZYYVdSMGFDQTlJSE1nS2lBd0xqVTdYRzRnSUNBZ1kzUjRMbXhwYm1WRFlYQWdQU0JjSW5KdmRXNWtYQ0k3WEc0Z0lDQWdZM1I0TG14cGJtVktiMmx1SUQwZ1hDSnliM1Z1WkZ3aU8xeHVYRzRnSUNBZ1ptOXlLR2tnUFNBME95QnBMUzA3SUNrZ2UxeHVJQ0FnSUNBZ2NDQTlJQ2gwSUNzZ2FTQXZJRFFwSUNVZ01UdGNiaUFnSUNBZ0lIZ2dQU0JqZUNBcklFMWhkR2d1YzJsdUtDaHdJQ3NnYVNBdklEUXBJQ29nVkVGVktTQXFJR0U3WEc0Z0lDQWdJQ0I1SUQwZ1kza2dLeUJ3SUNvZ1kzYzdYRzVjYmlBZ0lDQWdJR3hwYm1Vb1kzUjRMQ0I0SUMwZ2RYZ3NJSGtnTFNCMWVTd2dlQ0FySUhWNExDQjVJQ3NnZFhrcE8xeHVJQ0FnSUNBZ2JHbHVaU2hqZEhnc0lIZ2dMU0IyZUN3Z2VTQXRJSFo1TENCNElDc2dkbmdzSUhrZ0t5QjJlU2s3WEc0Z0lDQWdJQ0JzYVc1bEtHTjBlQ3dnZUNBdElIZDRMQ0I1SUMwZ2Qza3NJSGdnS3lCM2VDd2dlU0FySUhkNUtUdGNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQm1kVzVqZEdsdmJpQm1iMmRpWVc1cktHTjBlQ3dnZEN3Z1kzZ3NJR041TENCamR5d2djeXdnWTI5c2IzSXBJSHRjYmlBZ0lDQjBJQzg5SURNd01EQXdPMXh1WEc0Z0lDQWdkbUZ5SUdFZ1BTQmpkeUFxSURBdU1qRXNYRzRnSUNBZ0lDQWdJR0lnUFNCamR5QXFJREF1TURZc1hHNGdJQ0FnSUNBZ0lHTWdQU0JqZHlBcUlEQXVNakVzWEc0Z0lDQWdJQ0FnSUdRZ1BTQmpkeUFxSURBdU1qZzdYRzVjYmlBZ0lDQmpkSGd1Wm1sc2JGTjBlV3hsSUQwZ1kyOXNiM0k3WEc0Z0lDQWdjSFZtWm5Nb1kzUjRMQ0IwTENCamVDd2dZM2tzSUdFc0lHSXNJR01zSUdRcE8xeHVYRzRnSUNBZ1kzUjRMbWRzYjJKaGJFTnZiWEJ2YzJsMFpVOXdaWEpoZEdsdmJpQTlJQ2RrWlhOMGFXNWhkR2x2YmkxdmRYUW5PMXh1SUNBZ0lIQjFabVp6S0dOMGVDd2dkQ3dnWTNnc0lHTjVMQ0JoTENCaUxDQmpJQzBnY3l3Z1pDQXRJSE1wTzF4dUlDQWdJR04wZUM1bmJHOWlZV3hEYjIxd2IzTnBkR1ZQY0dWeVlYUnBiMjRnUFNBbmMyOTFjbU5sTFc5MlpYSW5PMXh1SUNCOVhHNWNiaUFnTHlwY2JpQWdkbUZ5SUZkSlRrUmZVRUZVU0ZNZ1BTQmJYRzRnSUNBZ0lDQWdJR1J2ZDI1ellXMXdiR1VvTmpNc0lIVndjMkZ0Y0d4bEtEZ3NJRnRjYmlBZ0lDQWdJQ0FnSUNBdE1TNHdNQ3dnTFRBdU1qZ3NYRzRnSUNBZ0lDQWdJQ0FnTFRBdU56VXNJQzB3TGpFNExGeHVJQ0FnSUNBZ0lDQWdJQzB3TGpVd0xDQWdNQzR4TWl4Y2JpQWdJQ0FnSUNBZ0lDQXRNQzR5TUN3Z0lEQXVNVElzWEc0Z0lDQWdJQ0FnSUNBZ0xUQXVNRFFzSUMwd0xqQTBMRnh1SUNBZ0lDQWdJQ0FnSUMwd0xqQTNMQ0F0TUM0eE9DeGNiaUFnSUNBZ0lDQWdJQ0F0TUM0eE9Td2dMVEF1TVRnc1hHNGdJQ0FnSUNBZ0lDQWdMVEF1TWpNc0lDMHdMakExTEZ4dUlDQWdJQ0FnSUNBZ0lDMHdMakV5TENBZ01DNHhNU3hjYmlBZ0lDQWdJQ0FnSUNBZ01DNHdNaXdnSURBdU1UWXNYRzRnSUNBZ0lDQWdJQ0FnSURBdU1qQXNJQ0F3TGpFMUxGeHVJQ0FnSUNBZ0lDQWdJQ0F3TGpVd0xDQWdNQzR3Tnl4Y2JpQWdJQ0FnSUNBZ0lDQWdNQzQzTlN3Z0lEQXVNVGdzWEc0Z0lDQWdJQ0FnSUNBZ0lERXVNREFzSUNBd0xqSTRYRzRnSUNBZ0lDQWdJRjBwS1N4Y2JpQWdJQ0FnSUNBZ1pHOTNibk5oYlhCc1pTZ3pNU3dnZFhCellXMXdiR1VvTVRZc0lGdGNiaUFnSUNBZ0lDQWdJQ0F0TVM0d01Dd2dMVEF1TVRBc1hHNGdJQ0FnSUNBZ0lDQWdMVEF1TnpVc0lDQXdMakF3TEZ4dUlDQWdJQ0FnSUNBZ0lDMHdMalV3TENBZ01DNHhNQ3hjYmlBZ0lDQWdJQ0FnSUNBdE1DNHlOU3dnSURBdU1UUXNYRzRnSUNBZ0lDQWdJQ0FnSURBdU1EQXNJQ0F3TGpFd0xGeHVJQ0FnSUNBZ0lDQWdJQ0F3TGpJMUxDQWdNQzR3TUN4Y2JpQWdJQ0FnSUNBZ0lDQWdNQzQxTUN3Z0xUQXVNVEFzWEc0Z0lDQWdJQ0FnSUNBZ0lEQXVOelVzSUMwd0xqRTBMRnh1SUNBZ0lDQWdJQ0FnSUNBeExqQXdMQ0F0TUM0eE1GeHVJQ0FnSUNBZ0lDQmRLU2xjYmlBZ0lDQWdJRjA3WEc0Z0lDb3ZYRzVjYmlBZ2RtRnlJRmRKVGtSZlVFRlVTRk1nUFNCYlhHNGdJQ0FnSUNBZ0lGdGNiaUFnSUNBZ0lDQWdJQ0F0TUM0M05UQXdMQ0F0TUM0eE9EQXdMQ0F0TUM0M01qRTVMQ0F0TUM0eE5USTNMQ0F0TUM0Mk9UY3hMQ0F0TUM0eE1qSTFMRnh1SUNBZ0lDQWdJQ0FnSUMwd0xqWTNNemtzSUMwd0xqQTVNVEFzSUMwd0xqWTFNVFlzSUMwd0xqQTFPRGdzSUMwd0xqWXlPVGdzSUMwd0xqQXlOaklzWEc0Z0lDQWdJQ0FnSUNBZ0xUQXVOakE0TXl3Z0lEQXVNREEyTlN3Z0xUQXVOVGcyT0N3Z0lEQXVNRE01Tml3Z0xUQXVOVFkwTXl3Z0lEQXVNRGN6TVN4Y2JpQWdJQ0FnSUNBZ0lDQXRNQzQxTXpjeUxDQWdNQzR4TURReExDQXRNQzQxTURNekxDQWdNQzR4TWpVNUxDQXRNQzQwTmpZeUxDQWdNQzR4TkRBMkxGeHVJQ0FnSUNBZ0lDQWdJQzB3TGpReU56VXNJQ0F3TGpFME9UTXNJQzB3TGpNNE9ERXNJQ0F3TGpFMU16QXNJQzB3TGpNME9EY3NJQ0F3TGpFMU1qWXNYRzRnSUNBZ0lDQWdJQ0FnTFRBdU16QTVOU3dnSURBdU1UUTRPQ3dnTFRBdU1qY3dPQ3dnSURBdU1UUXlNU3dnTFRBdU1qTXhPU3dnSURBdU1UTTBNaXhjYmlBZ0lDQWdJQ0FnSUNBdE1DNHhPVFF6TENBZ01DNHhNakUzTENBdE1DNHhOakF3TENBZ01DNHhNREkxTENBdE1DNHhNamt3TENBZ01DNHdOemcxTEZ4dUlDQWdJQ0FnSUNBZ0lDMHdMakV3TVRJc0lDQXdMakExTURrc0lDMHdMakEzTmpRc0lDQXdMakF5TURZc0lDMHdMakExTkRjc0lDMHdMakF4TWpBc1hHNGdJQ0FnSUNBZ0lDQWdMVEF1TURNM09Dd2dMVEF1TURRM01pd2dMVEF1TURNeU5Dd2dMVEF1TURnMU55d2dMVEF1TURNNE9Td2dMVEF1TVRJME1TeGNiaUFnSUNBZ0lDQWdJQ0F0TUM0d05UUTJMQ0F0TUM0eE5UazVMQ0F0TUM0d09ERTBMQ0F0TUM0eE9EYzJMQ0F0TUM0eE1Ua3pMQ0F0TUM0eE9UWTBMRnh1SUNBZ0lDQWdJQ0FnSUMwd0xqRTFPRElzSUMwd0xqRTVNelVzSUMwd0xqRTVNekVzSUMwd0xqRTNOamtzSUMwd0xqSXhOVGNzSUMwd0xqRTBOVE1zWEc0Z0lDQWdJQ0FnSUNBZ0xUQXVNakk1TUN3Z0xUQXVNVEE0TlN3Z0xUQXVNak15Tnl3Z0xUQXVNRFk1Tnl3Z0xUQXVNakkwTUN3Z0xUQXVNRE14Tnl4Y2JpQWdJQ0FnSUNBZ0lDQXRNQzR5TURZMExDQWdNQzR3TURNekxDQXRNQzR4T0RVekxDQWdNQzR3TXpZeUxDQXRNQzR4TmpFekxDQWdNQzR3TmpjeUxGeHVJQ0FnSUNBZ0lDQWdJQzB3TGpFek5UQXNJQ0F3TGpBNU5qRXNJQzB3TGpFd05URXNJQ0F3TGpFeU1UTXNJQzB3TGpBM01EWXNJQ0F3TGpFek9UY3NYRzRnSUNBZ0lDQWdJQ0FnTFRBdU1ETXpNaXdnSURBdU1UVXhNaXdnSURBdU1EQTFNeXdnSURBdU1UVTRNQ3dnSURBdU1EUTBNaXdnSURBdU1UWXlOQ3hjYmlBZ0lDQWdJQ0FnSUNBZ01DNHdPRE16TENBZ01DNHhOak0yTENBZ01DNHhNakkwTENBZ01DNHhOakUxTENBZ01DNHhOakV6TENBZ01DNHhOVFkxTEZ4dUlDQWdJQ0FnSUNBZ0lDQXdMakU1T1Rrc0lDQXdMakUxTURBc0lDQXdMakl6Tnpnc0lDQXdMakUwTURJc0lDQXdMakkzTkRrc0lDQXdMakV5Tnprc1hHNGdJQ0FnSUNBZ0lDQWdJREF1TXpFeE9Dd2dJREF1TVRFME55d2dJREF1TXpRNE55d2dJREF1TVRBeE5Td2dJREF1TXpnMU9Dd2dJREF1TURnNU1peGNiaUFnSUNBZ0lDQWdJQ0FnTUM0ME1qTTJMQ0FnTUM0d056ZzNMQ0FnTUM0ME5qSXhMQ0FnTUM0d056RTFMQ0FnTUM0MU1ERXlMQ0FnTUM0d056QXlMRnh1SUNBZ0lDQWdJQ0FnSUNBd0xqVXpPVGdzSUNBd0xqQTNOallzSUNBd0xqVTNOamdzSUNBd0xqQTRPVEFzSUNBd0xqWXhNak1zSUNBd0xqRXdOVFVzWEc0Z0lDQWdJQ0FnSUNBZ0lEQXVOalEyTml3Z0lEQXVNVEkwTkN3Z0lEQXVOamd3TlN3Z0lEQXVNVFEwTUN3Z0lEQXVOekUwTnl3Z0lEQXVNVFl6TUN4Y2JpQWdJQ0FnSUNBZ0lDQWdNQzQzTlRBd0xDQWdNQzR4T0RBd1hHNGdJQ0FnSUNBZ0lGMHNYRzRnSUNBZ0lDQWdJRnRjYmlBZ0lDQWdJQ0FnSUNBdE1DNDNOVEF3TENBZ01DNHdNREF3TENBdE1DNDNNRE16TENBZ01DNHdNVGsxTENBdE1DNDJOVFk1TENBZ01DNHdNems1TEZ4dUlDQWdJQ0FnSUNBZ0lDMHdMall4TURRc0lDQXdMakEyTURBc0lDMHdMalUyTXpRc0lDQXdMakEzT0Rrc0lDMHdMalV4TlRVc0lDQXdMakE1TlRRc1hHNGdJQ0FnSUNBZ0lDQWdMVEF1TkRZMk55d2dJREF1TVRBNE9Td2dMVEF1TkRFM05Dd2dJREF1TVRJd05pd2dMVEF1TXpZM05pd2dJREF1TVRJNU9TeGNiaUFnSUNBZ0lDQWdJQ0F0TUM0ek1UYzBMQ0FnTUM0eE16WTFMQ0F0TUM0eU5qWTVMQ0FnTUM0eE16azRMQ0F0TUM0eU1UWXlMQ0FnTUM0eE16a3hMRnh1SUNBZ0lDQWdJQ0FnSUMwd0xqRTJOVGdzSUNBd0xqRXpORGNzSUMwd0xqRXhOVGNzSUNBd0xqRXlOekVzSUMwd0xqQTJOakVzSUNBd0xqRXhOamtzWEc0Z0lDQWdJQ0FnSUNBZ0xUQXVNREUzTUN3Z0lEQXVNVEEwTml3Z0lEQXVNRE14Tml3Z0lEQXVNRGt3TXl3Z0lEQXVNRGM1TVN3Z0lEQXVNRGN5T0N4Y2JpQWdJQ0FnSUNBZ0lDQWdNQzR4TWpVNUxDQWdNQzR3TlRNMExDQWdNQzR4TnpJekxDQWdNQzR3TXpNeExDQWdNQzR5TVRnNExDQWdNQzR3TVRJNUxGeHVJQ0FnSUNBZ0lDQWdJQ0F3TGpJMk5UWXNJQzB3TGpBd05qUXNJQ0F3TGpNeE1qSXNJQzB3TGpBeU5qTXNJQ0F3TGpNMU9EWXNJQzB3TGpBME5qWXNYRzRnSUNBZ0lDQWdJQ0FnSURBdU5EQTFNaXdnTFRBdU1EWTJOU3dnSURBdU5EVXlOU3dnTFRBdU1EZzBOeXdnSURBdU5UQXdOeXdnTFRBdU1UQXdNaXhjYmlBZ0lDQWdJQ0FnSUNBZ01DNDFORGszTENBdE1DNHhNVE13TENBZ01DNDFPVGt4TENBdE1DNHhNalF3TENBZ01DNDJORGt4TENBdE1DNHhNekkxTEZ4dUlDQWdJQ0FnSUNBZ0lDQXdMalk1T1RRc0lDMHdMakV6T0RBc0lDQXdMamMxTURBc0lDMHdMakUwTURCY2JpQWdJQ0FnSUNBZ1hWeHVJQ0FnSUNBZ1hTeGNiaUFnSUNBZ0lGZEpUa1JmVDBaR1UwVlVVeUE5SUZ0Y2JpQWdJQ0FnSUNBZ2UzTjBZWEowT2lBd0xqTTJMQ0JsYm1RNklEQXVNVEY5TEZ4dUlDQWdJQ0FnSUNCN2MzUmhjblE2SURBdU5UWXNJR1Z1WkRvZ01DNHhObjFjYmlBZ0lDQWdJRjA3WEc1Y2JpQWdablZ1WTNScGIyNGdiR1ZoWmloamRIZ3NJSFFzSUhnc0lIa3NJR04zTENCekxDQmpiMnh2Y2lrZ2UxeHVJQ0FnSUhaaGNpQmhJRDBnWTNjZ0x5QTRMRnh1SUNBZ0lDQWdJQ0JpSUQwZ1lTQXZJRE1zWEc0Z0lDQWdJQ0FnSUdNZ1BTQXlJQ29nWWl4Y2JpQWdJQ0FnSUNBZ1pDQTlJQ2gwSUNVZ01Ta2dLaUJVUVZVc1hHNGdJQ0FnSUNBZ0lHVWdQU0JOWVhSb0xtTnZjeWhrS1N4Y2JpQWdJQ0FnSUNBZ1ppQTlJRTFoZEdndWMybHVLR1FwTzF4dVhHNGdJQ0FnWTNSNExtWnBiR3hUZEhsc1pTQTlJR052Ykc5eU8xeHVJQ0FnSUdOMGVDNXpkSEp2YTJWVGRIbHNaU0E5SUdOdmJHOXlPMXh1SUNBZ0lHTjBlQzVzYVc1bFYybGtkR2dnUFNCek8xeHVJQ0FnSUdOMGVDNXNhVzVsUTJGd0lEMGdYQ0p5YjNWdVpGd2lPMXh1SUNBZ0lHTjBlQzVzYVc1bFNtOXBiaUE5SUZ3aWNtOTFibVJjSWp0Y2JseHVJQ0FnSUdOMGVDNWlaV2RwYmxCaGRHZ29LVHRjYmlBZ0lDQmpkSGd1WVhKaktIZ2dJQ0FnSUNBZ0lDd2dlU0FnSUNBZ0lDQWdMQ0JoTENCa0lDQWdJQ0FnSUNBZ0lDd2daQ0FySUUxaGRHZ3VVRWtzSUdaaGJITmxLVHRjYmlBZ0lDQmpkSGd1WVhKaktIZ2dMU0JpSUNvZ1pTd2dlU0F0SUdJZ0tpQm1MQ0JqTENCa0lDc2dUV0YwYUM1UVNTd2daQ0FnSUNBZ0lDQWdJQ0FzSUdaaGJITmxLVHRjYmlBZ0lDQmpkSGd1WVhKaktIZ2dLeUJqSUNvZ1pTd2dlU0FySUdNZ0tpQm1MQ0JpTENCa0lDc2dUV0YwYUM1UVNTd2daQ0FnSUNBZ0lDQWdJQ0FzSUhSeWRXVWdLVHRjYmlBZ0lDQmpkSGd1WjJ4dlltRnNRMjl0Y0c5emFYUmxUM0JsY21GMGFXOXVJRDBnSjJSbGMzUnBibUYwYVc5dUxXOTFkQ2M3WEc0Z0lDQWdZM1I0TG1acGJHd29LVHRjYmlBZ0lDQmpkSGd1WjJ4dlltRnNRMjl0Y0c5emFYUmxUM0JsY21GMGFXOXVJRDBnSjNOdmRYSmpaUzF2ZG1WeUp6dGNiaUFnSUNCamRIZ3VjM1J5YjJ0bEtDazdYRzRnSUgxY2JseHVJQ0JtZFc1amRHbHZiaUJ6ZDI5dmMyZ29ZM1I0TENCMExDQmplQ3dnWTNrc0lHTjNMQ0J6TENCcGJtUmxlQ3dnZEc5MFlXd3NJR052Ykc5eUtTQjdYRzRnSUNBZ2RDQXZQU0F5TlRBd08xeHVYRzRnSUNBZ2RtRnlJSEJoZEdnZ1BTQlhTVTVFWDFCQlZFaFRXMmx1WkdWNFhTeGNiaUFnSUNBZ0lDQWdZU0E5SUNoMElDc2dhVzVrWlhnZ0xTQlhTVTVFWDA5R1JsTkZWRk5iYVc1a1pYaGRMbk4wWVhKMEtTQWxJSFJ2ZEdGc0xGeHVJQ0FnSUNBZ0lDQmpJRDBnS0hRZ0t5QnBibVJsZUNBdElGZEpUa1JmVDBaR1UwVlVVMXRwYm1SbGVGMHVaVzVrSUNBcElDVWdkRzkwWVd3c1hHNGdJQ0FnSUNBZ0lHVWdQU0FvZENBcklHbHVaR1Y0SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNrZ0pTQjBiM1JoYkN4Y2JpQWdJQ0FnSUNBZ1lpd2daQ3dnWml3Z2FUdGNibHh1SUNBZ0lHTjBlQzV6ZEhKdmEyVlRkSGxzWlNBOUlHTnZiRzl5TzF4dUlDQWdJR04wZUM1c2FXNWxWMmxrZEdnZ1BTQnpPMXh1SUNBZ0lHTjBlQzVzYVc1bFEyRndJRDBnWENKeWIzVnVaRndpTzF4dUlDQWdJR04wZUM1c2FXNWxTbTlwYmlBOUlGd2ljbTkxYm1SY0lqdGNibHh1SUNBZ0lHbG1LR0VnUENBeEtTQjdYRzRnSUNBZ0lDQmpkSGd1WW1WbmFXNVFZWFJvS0NrN1hHNWNiaUFnSUNBZ0lHRWdLajBnY0dGMGFDNXNaVzVuZEdnZ0x5QXlJQzBnTVR0Y2JpQWdJQ0FnSUdJZ0lEMGdUV0YwYUM1bWJHOXZjaWhoS1R0Y2JpQWdJQ0FnSUdFZ0xUMGdZanRjYmlBZ0lDQWdJR0lnS2owZ01qdGNiaUFnSUNBZ0lHSWdLejBnTWp0Y2JseHVJQ0FnSUNBZ1kzUjRMbTF2ZG1WVWJ5aGNiaUFnSUNBZ0lDQWdZM2dnS3lBb2NHRjBhRnRpSUMwZ01sMGdLaUFvTVNBdElHRXBJQ3NnY0dGMGFGdGlJQ0FnSUYwZ0tpQmhLU0FxSUdOM0xGeHVJQ0FnSUNBZ0lDQmplU0FySUNod1lYUm9XMklnTFNBeFhTQXFJQ2d4SUMwZ1lTa2dLeUJ3WVhSb1cySWdLeUF4WFNBcUlHRXBJQ29nWTNkY2JpQWdJQ0FnSUNrN1hHNWNiaUFnSUNBZ0lHbG1LR01nUENBeEtTQjdYRzRnSUNBZ0lDQWdJR01nS2owZ2NHRjBhQzVzWlc1bmRHZ2dMeUF5SUMwZ01UdGNiaUFnSUNBZ0lDQWdaQ0FnUFNCTllYUm9MbVpzYjI5eUtHTXBPMXh1SUNBZ0lDQWdJQ0JqSUMwOUlHUTdYRzRnSUNBZ0lDQWdJR1FnS2owZ01qdGNiaUFnSUNBZ0lDQWdaQ0FyUFNBeU8xeHVYRzRnSUNBZ0lDQWdJR1p2Y2locElEMGdZanNnYVNBaFBUMGdaRHNnYVNBclBTQXlLVnh1SUNBZ0lDQWdJQ0FnSUdOMGVDNXNhVzVsVkc4b1kzZ2dLeUJ3WVhSb1cybGRJQ29nWTNjc0lHTjVJQ3NnY0dGMGFGdHBJQ3NnTVYwZ0tpQmpkeWs3WEc1Y2JpQWdJQ0FnSUNBZ1kzUjRMbXhwYm1WVWJ5aGNiaUFnSUNBZ0lDQWdJQ0JqZUNBcklDaHdZWFJvVzJRZ0xTQXlYU0FxSUNneElDMGdZeWtnS3lCd1lYUm9XMlFnSUNBZ1hTQXFJR01wSUNvZ1kzY3NYRzRnSUNBZ0lDQWdJQ0FnWTNrZ0t5QW9jR0YwYUZ0a0lDMGdNVjBnS2lBb01TQXRJR01wSUNzZ2NHRjBhRnRrSUNzZ01WMGdLaUJqS1NBcUlHTjNYRzRnSUNBZ0lDQWdJQ2s3WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUdWc2MyVmNiaUFnSUNBZ0lDQWdabTl5S0drZ1BTQmlPeUJwSUNFOVBTQndZWFJvTG14bGJtZDBhRHNnYVNBclBTQXlLVnh1SUNBZ0lDQWdJQ0FnSUdOMGVDNXNhVzVsVkc4b1kzZ2dLeUJ3WVhSb1cybGRJQ29nWTNjc0lHTjVJQ3NnY0dGMGFGdHBJQ3NnTVYwZ0tpQmpkeWs3WEc1Y2JpQWdJQ0FnSUdOMGVDNXpkSEp2YTJVb0tUdGNiaUFnSUNCOVhHNWNiaUFnSUNCbGJITmxJR2xtS0dNZ1BDQXhLU0I3WEc0Z0lDQWdJQ0JqZEhndVltVm5hVzVRWVhSb0tDazdYRzVjYmlBZ0lDQWdJR01nS2owZ2NHRjBhQzVzWlc1bmRHZ2dMeUF5SUMwZ01UdGNiaUFnSUNBZ0lHUWdJRDBnVFdGMGFDNW1iRzl2Y2loaktUdGNiaUFnSUNBZ0lHTWdMVDBnWkR0Y2JpQWdJQ0FnSUdRZ0tqMGdNanRjYmlBZ0lDQWdJR1FnS3owZ01qdGNibHh1SUNBZ0lDQWdZM1I0TG0xdmRtVlVieWhqZUNBcklIQmhkR2hiTUYwZ0tpQmpkeXdnWTNrZ0t5QndZWFJvV3pGZElDb2dZM2NwTzF4dVhHNGdJQ0FnSUNCbWIzSW9hU0E5SURJN0lHa2dJVDA5SUdRN0lHa2dLejBnTWlsY2JpQWdJQ0FnSUNBZ1kzUjRMbXhwYm1WVWJ5aGplQ0FySUhCaGRHaGJhVjBnS2lCamR5d2dZM2tnS3lCd1lYUm9XMmtnS3lBeFhTQXFJR04zS1R0Y2JseHVJQ0FnSUNBZ1kzUjRMbXhwYm1WVWJ5aGNiaUFnSUNBZ0lDQWdZM2dnS3lBb2NHRjBhRnRrSUMwZ01sMGdLaUFvTVNBdElHTXBJQ3NnY0dGMGFGdGtJQ0FnSUYwZ0tpQmpLU0FxSUdOM0xGeHVJQ0FnSUNBZ0lDQmplU0FySUNod1lYUm9XMlFnTFNBeFhTQXFJQ2d4SUMwZ1l5a2dLeUJ3WVhSb1cyUWdLeUF4WFNBcUlHTXBJQ29nWTNkY2JpQWdJQ0FnSUNrN1hHNWNiaUFnSUNBZ0lHTjBlQzV6ZEhKdmEyVW9LVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQnBaaWhsSUR3Z01Ta2dlMXh1SUNBZ0lDQWdaU0FxUFNCd1lYUm9MbXhsYm1kMGFDQXZJRElnTFNBeE8xeHVJQ0FnSUNBZ1ppQWdQU0JOWVhSb0xtWnNiMjl5S0dVcE8xeHVJQ0FnSUNBZ1pTQXRQU0JtTzF4dUlDQWdJQ0FnWmlBcVBTQXlPMXh1SUNBZ0lDQWdaaUFyUFNBeU8xeHVYRzRnSUNBZ0lDQnNaV0ZtS0Z4dUlDQWdJQ0FnSUNCamRIZ3NYRzRnSUNBZ0lDQWdJSFFzWEc0Z0lDQWdJQ0FnSUdONElDc2dLSEJoZEdoYlppQXRJREpkSUNvZ0tERWdMU0JsS1NBcklIQmhkR2hiWmlBZ0lDQmRJQ29nWlNrZ0tpQmpkeXhjYmlBZ0lDQWdJQ0FnWTNrZ0t5QW9jR0YwYUZ0bUlDMGdNVjBnS2lBb01TQXRJR1VwSUNzZ2NHRjBhRnRtSUNzZ01WMGdLaUJsS1NBcUlHTjNMRnh1SUNBZ0lDQWdJQ0JqZHl4Y2JpQWdJQ0FnSUNBZ2N5eGNiaUFnSUNBZ0lDQWdZMjlzYjNKY2JpQWdJQ0FnSUNrN1hHNGdJQ0FnZlZ4dUlDQjlYRzVjYmlBZ2RtRnlJRk5yZVdOdmJuTWdQU0JtZFc1amRHbHZiaWh2Y0hSektTQjdYRzRnSUNBZ0lDQWdJSFJvYVhNdWJHbHpkQ0FnSUNBZ0lDQWdQU0JiWFR0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVwYm5SbGNuWmhiQ0FnSUNBOUlHNTFiR3c3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVZMjlzYjNJZ0lDQWdJQ0FnUFNCdmNIUnpJQ1ltSUc5d2RITXVZMjlzYjNJZ1B5QnZjSFJ6TG1OdmJHOXlJRG9nWENKaWJHRmphMXdpTzF4dUlDQWdJQ0FnSUNCMGFHbHpMbkpsYzJsNlpVTnNaV0Z5SUQwZ0lTRW9iM0IwY3lBbUppQnZjSFJ6TG5KbGMybDZaVU5zWldGeUtUdGNiaUFnSUNBZ0lIMDdYRzVjYmlBZ1UydDVZMjl1Y3k1RFRFVkJVbDlFUVZrZ1BTQm1kVzVqZEdsdmJpaGpkSGdzSUhRc0lHTnZiRzl5S1NCN1hHNGdJQ0FnZG1GeUlIY2dQU0JqZEhndVkyRnVkbUZ6TG5kcFpIUm9MRnh1SUNBZ0lDQWdJQ0JvSUQwZ1kzUjRMbU5oYm5aaGN5NW9aV2xuYUhRc1hHNGdJQ0FnSUNBZ0lITWdQU0JOWVhSb0xtMXBiaWgzTENCb0tUdGNibHh1SUNBZ0lITjFiaWhqZEhnc0lIUXNJSGNnS2lBd0xqVXNJR2dnS2lBd0xqVXNJSE1zSUhNZ0tpQlRWRkpQUzBVc0lHTnZiRzl5S1R0Y2JpQWdmVHRjYmx4dUlDQlRhM2xqYjI1ekxrTk1SVUZTWDA1SlIwaFVJRDBnWm5WdVkzUnBiMjRvWTNSNExDQjBMQ0JqYjJ4dmNpa2dlMXh1SUNBZ0lIWmhjaUIzSUQwZ1kzUjRMbU5oYm5aaGN5NTNhV1IwYUN4Y2JpQWdJQ0FnSUNBZ2FDQTlJR04wZUM1allXNTJZWE11YUdWcFoyaDBMRnh1SUNBZ0lDQWdJQ0J6SUQwZ1RXRjBhQzV0YVc0b2R5d2dhQ2s3WEc1Y2JpQWdJQ0J0YjI5dUtHTjBlQ3dnZEN3Z2R5QXFJREF1TlN3Z2FDQXFJREF1TlN3Z2N5d2djeUFxSUZOVVVrOUxSU3dnWTI5c2IzSXBPMXh1SUNCOU8xeHVYRzRnSUZOcmVXTnZibk11VUVGU1ZFeFpYME5NVDFWRVdWOUVRVmtnUFNCbWRXNWpkR2x2YmloamRIZ3NJSFFzSUdOdmJHOXlLU0I3WEc0Z0lDQWdkbUZ5SUhjZ1BTQmpkSGd1WTJGdWRtRnpMbmRwWkhSb0xGeHVJQ0FnSUNBZ0lDQm9JRDBnWTNSNExtTmhiblpoY3k1b1pXbG5hSFFzWEc0Z0lDQWdJQ0FnSUhNZ1BTQk5ZWFJvTG0xcGJpaDNMQ0JvS1R0Y2JseHVJQ0FnSUhOMWJpaGpkSGdzSUhRc0lIY2dLaUF3TGpZeU5Td2dhQ0FxSURBdU16YzFMQ0J6SUNvZ01DNDNOU3dnY3lBcUlGTlVVazlMUlN3Z1kyOXNiM0lwTzF4dUlDQWdJR05zYjNWa0tHTjBlQ3dnZEN3Z2R5QXFJREF1TXpjMUxDQm9JQ29nTUM0Mk1qVXNJSE1nS2lBd0xqYzFMQ0J6SUNvZ1UxUlNUMHRGTENCamIyeHZjaWs3WEc0Z0lIMDdYRzVjYmlBZ1UydDVZMjl1Y3k1UVFWSlVURmxmUTB4UFZVUlpYMDVKUjBoVUlEMGdablZ1WTNScGIyNG9ZM1I0TENCMExDQmpiMnh2Y2lrZ2UxeHVJQ0FnSUhaaGNpQjNJRDBnWTNSNExtTmhiblpoY3k1M2FXUjBhQ3hjYmlBZ0lDQWdJQ0FnYUNBOUlHTjBlQzVqWVc1MllYTXVhR1ZwWjJoMExGeHVJQ0FnSUNBZ0lDQnpJRDBnVFdGMGFDNXRhVzRvZHl3Z2FDazdYRzVjYmlBZ0lDQnRiMjl1S0dOMGVDd2dkQ3dnZHlBcUlEQXVOalkzTENCb0lDb2dNQzR6TnpVc0lITWdLaUF3TGpjMUxDQnpJQ29nVTFSU1QwdEZMQ0JqYjJ4dmNpazdYRzRnSUNBZ1kyeHZkV1FvWTNSNExDQjBMQ0IzSUNvZ01DNHpOelVzSUdnZ0tpQXdMall5TlN3Z2N5QXFJREF1TnpVc0lITWdLaUJUVkZKUFMwVXNJR052Ykc5eUtUdGNiaUFnZlR0Y2JseHVJQ0JUYTNsamIyNXpMa05NVDFWRVdTQTlJR1oxYm1OMGFXOXVLR04wZUN3Z2RDd2dZMjlzYjNJcElIdGNiaUFnSUNCMllYSWdkeUE5SUdOMGVDNWpZVzUyWVhNdWQybGtkR2dzWEc0Z0lDQWdJQ0FnSUdnZ1BTQmpkSGd1WTJGdWRtRnpMbWhsYVdkb2RDeGNiaUFnSUNBZ0lDQWdjeUE5SUUxaGRHZ3ViV2x1S0hjc0lHZ3BPMXh1WEc0Z0lDQWdZMnh2ZFdRb1kzUjRMQ0IwTENCM0lDb2dNQzQxTENCb0lDb2dNQzQxTENCekxDQnpJQ29nVTFSU1QwdEZMQ0JqYjJ4dmNpazdYRzRnSUgwN1hHNWNiaUFnVTJ0NVkyOXVjeTVTUVVsT0lEMGdablZ1WTNScGIyNG9ZM1I0TENCMExDQmpiMnh2Y2lrZ2UxeHVJQ0FnSUhaaGNpQjNJRDBnWTNSNExtTmhiblpoY3k1M2FXUjBhQ3hjYmlBZ0lDQWdJQ0FnYUNBOUlHTjBlQzVqWVc1MllYTXVhR1ZwWjJoMExGeHVJQ0FnSUNBZ0lDQnpJRDBnVFdGMGFDNXRhVzRvZHl3Z2FDazdYRzVjYmlBZ0lDQnlZV2x1S0dOMGVDd2dkQ3dnZHlBcUlEQXVOU3dnYUNBcUlEQXVNemNzSUhNZ0tpQXdMamtzSUhNZ0tpQlRWRkpQUzBVc0lHTnZiRzl5S1R0Y2JpQWdJQ0JqYkc5MVpDaGpkSGdzSUhRc0lIY2dLaUF3TGpVc0lHZ2dLaUF3TGpNM0xDQnpJQ29nTUM0NUxDQnpJQ29nVTFSU1QwdEZMQ0JqYjJ4dmNpazdYRzRnSUgwN1hHNWNiaUFnVTJ0NVkyOXVjeTVUVEVWRlZDQTlJR1oxYm1OMGFXOXVLR04wZUN3Z2RDd2dZMjlzYjNJcElIdGNiaUFnSUNCMllYSWdkeUE5SUdOMGVDNWpZVzUyWVhNdWQybGtkR2dzWEc0Z0lDQWdJQ0FnSUdnZ1BTQmpkSGd1WTJGdWRtRnpMbWhsYVdkb2RDeGNiaUFnSUNBZ0lDQWdjeUE5SUUxaGRHZ3ViV2x1S0hjc0lHZ3BPMXh1WEc0Z0lDQWdjMnhsWlhRb1kzUjRMQ0IwTENCM0lDb2dNQzQxTENCb0lDb2dNQzR6Tnl3Z2N5QXFJREF1T1N3Z2N5QXFJRk5VVWs5TFJTd2dZMjlzYjNJcE8xeHVJQ0FnSUdOc2IzVmtLR04wZUN3Z2RDd2dkeUFxSURBdU5Td2dhQ0FxSURBdU16Y3NJSE1nS2lBd0xqa3NJSE1nS2lCVFZGSlBTMFVzSUdOdmJHOXlLVHRjYmlBZ2ZUdGNibHh1SUNCVGEzbGpiMjV6TGxOT1QxY2dQU0JtZFc1amRHbHZiaWhqZEhnc0lIUXNJR052Ykc5eUtTQjdYRzRnSUNBZ2RtRnlJSGNnUFNCamRIZ3VZMkZ1ZG1GekxuZHBaSFJvTEZ4dUlDQWdJQ0FnSUNCb0lEMGdZM1I0TG1OaGJuWmhjeTVvWldsbmFIUXNYRzRnSUNBZ0lDQWdJSE1nUFNCTllYUm9MbTFwYmloM0xDQm9LVHRjYmx4dUlDQWdJSE51YjNjb1kzUjRMQ0IwTENCM0lDb2dNQzQxTENCb0lDb2dNQzR6Tnl3Z2N5QXFJREF1T1N3Z2N5QXFJRk5VVWs5TFJTd2dZMjlzYjNJcE8xeHVJQ0FnSUdOc2IzVmtLR04wZUN3Z2RDd2dkeUFxSURBdU5Td2dhQ0FxSURBdU16Y3NJSE1nS2lBd0xqa3NJSE1nS2lCVFZGSlBTMFVzSUdOdmJHOXlLVHRjYmlBZ2ZUdGNibHh1SUNCVGEzbGpiMjV6TGxkSlRrUWdQU0JtZFc1amRHbHZiaWhqZEhnc0lIUXNJR052Ykc5eUtTQjdYRzRnSUNBZ2RtRnlJSGNnUFNCamRIZ3VZMkZ1ZG1GekxuZHBaSFJvTEZ4dUlDQWdJQ0FnSUNCb0lEMGdZM1I0TG1OaGJuWmhjeTVvWldsbmFIUXNYRzRnSUNBZ0lDQWdJSE1nUFNCTllYUm9MbTFwYmloM0xDQm9LVHRjYmx4dUlDQWdJSE4zYjI5emFDaGpkSGdzSUhRc0lIY2dLaUF3TGpVc0lHZ2dLaUF3TGpVc0lITXNJSE1nS2lCVFZGSlBTMFVzSURBc0lESXNJR052Ykc5eUtUdGNiaUFnSUNCemQyOXZjMmdvWTNSNExDQjBMQ0IzSUNvZ01DNDFMQ0JvSUNvZ01DNDFMQ0J6TENCeklDb2dVMVJTVDB0RkxDQXhMQ0F5TENCamIyeHZjaWs3WEc0Z0lIMDdYRzVjYmlBZ1UydDVZMjl1Y3k1R1QwY2dQU0JtZFc1amRHbHZiaWhqZEhnc0lIUXNJR052Ykc5eUtTQjdYRzRnSUNBZ2RtRnlJSGNnUFNCamRIZ3VZMkZ1ZG1GekxuZHBaSFJvTEZ4dUlDQWdJQ0FnSUNCb0lEMGdZM1I0TG1OaGJuWmhjeTVvWldsbmFIUXNYRzRnSUNBZ0lDQWdJSE1nUFNCTllYUm9MbTFwYmloM0xDQm9LU3hjYmlBZ0lDQWdJQ0FnYXlBOUlITWdLaUJUVkZKUFMwVTdYRzVjYmlBZ0lDQm1iMmRpWVc1cktHTjBlQ3dnZEN3Z2R5QXFJREF1TlN3Z2FDQXFJREF1TXpJc0lITWdLaUF3TGpjMUxDQnJMQ0JqYjJ4dmNpazdYRzVjYmlBZ0lDQjBJQzg5SURVd01EQTdYRzVjYmlBZ0lDQjJZWElnWVNBOUlFMWhkR2d1WTI5ektDaDBJQ0FnSUNBZ0lDa2dLaUJVUVZVcElDb2djeUFxSURBdU1ESXNYRzRnSUNBZ0lDQWdJR0lnUFNCTllYUm9MbU52Y3lnb2RDQXJJREF1TWpVcElDb2dWRUZWS1NBcUlITWdLaUF3TGpBeUxGeHVJQ0FnSUNBZ0lDQmpJRDBnVFdGMGFDNWpiM01vS0hRZ0t5QXdMalV3S1NBcUlGUkJWU2tnS2lCeklDb2dNQzR3TWl4Y2JpQWdJQ0FnSUNBZ1pDQTlJRTFoZEdndVkyOXpLQ2gwSUNzZ01DNDNOU2tnS2lCVVFWVXBJQ29nY3lBcUlEQXVNRElzWEc0Z0lDQWdJQ0FnSUc0Z1BTQm9JQ29nTUM0NU16WXNYRzRnSUNBZ0lDQWdJR1VnUFNCTllYUm9MbVpzYjI5eUtHNGdMU0JySUNvZ01DNDFLU0FySURBdU5TeGNiaUFnSUNBZ0lDQWdaaUE5SUUxaGRHZ3VabXh2YjNJb2JpQXRJR3NnS2lBeUxqVXBJQ3NnTUM0MU8xeHVYRzRnSUNBZ1kzUjRMbk4wY205clpWTjBlV3hsSUQwZ1kyOXNiM0k3WEc0Z0lDQWdZM1I0TG14cGJtVlhhV1IwYUNBOUlHczdYRzRnSUNBZ1kzUjRMbXhwYm1WRFlYQWdQU0JjSW5KdmRXNWtYQ0k3WEc0Z0lDQWdZM1I0TG14cGJtVktiMmx1SUQwZ1hDSnliM1Z1WkZ3aU8xeHVYRzRnSUNBZ2JHbHVaU2hqZEhnc0lHRWdLeUIzSUNvZ01DNHlJQ3NnYXlBcUlEQXVOU3dnWlN3Z1lpQXJJSGNnS2lBd0xqZ2dMU0JySUNvZ01DNDFMQ0JsS1R0Y2JpQWdJQ0JzYVc1bEtHTjBlQ3dnWXlBcklIY2dLaUF3TGpJZ0t5QnJJQ29nTUM0MUxDQm1MQ0JrSUNzZ2R5QXFJREF1T0NBdElHc2dLaUF3TGpVc0lHWXBPMXh1SUNCOU8xeHVYRzRnSUZOcmVXTnZibk11Y0hKdmRHOTBlWEJsSUQwZ2UxeHVJQ0FnSUY5a1pYUmxjbTFwYm1WRWNtRjNhVzVuUm5WdVkzUnBiMjQ2SUdaMWJtTjBhVzl1S0dSeVlYY3BJSHRjYmlBZ0lDQWdJR2xtS0hSNWNHVnZaaUJrY21GM0lEMDlQU0JjSW5OMGNtbHVaMXdpS1Z4dUlDQWdJQ0FnSUNCa2NtRjNJRDBnVTJ0NVkyOXVjMXRrY21GM0xuUnZWWEJ3WlhKRFlYTmxLQ2t1Y21Wd2JHRmpaU2d2TFM5bkxDQmNJbDljSWlsZElIeDhJRzUxYkd3N1hHNWNiaUFnSUNBZ0lISmxkSFZ5YmlCa2NtRjNPMXh1SUNBZ0lIMHNYRzRnSUNBZ1lXUmtPaUJtZFc1amRHbHZiaWhsYkN3Z1pISmhkeWtnZTF4dUlDQWdJQ0FnZG1GeUlHOWlhanRjYmx4dUlDQWdJQ0FnYVdZb2RIbHdaVzltSUdWc0lEMDlQU0JjSW5OMGNtbHVaMXdpS1Z4dUlDQWdJQ0FnSUNCbGJDQTlJR1J2WTNWdFpXNTBMbWRsZEVWc1pXMWxiblJDZVVsa0tHVnNLVHRjYmx4dUlDQWdJQ0FnTHk4Z1JHOWxjeUJ1YjNSb2FXNW5JR2xtSUdOaGJuWmhjeUJ1WVcxbElHUnZaWE51SjNRZ1pYaHBjM1J6WEc0Z0lDQWdJQ0JwWmlobGJDQTlQVDBnYm5Wc2JDbGNiaUFnSUNBZ0lDQWdjbVYwZFhKdU8xeHVYRzRnSUNBZ0lDQmtjbUYzSUQwZ2RHaHBjeTVmWkdWMFpYSnRhVzVsUkhKaGQybHVaMFoxYm1OMGFXOXVLR1J5WVhjcE8xeHVYRzRnSUNBZ0lDQXZMeUJFYjJWeklHNXZkR2hwYm1jZ2FXWWdkR2hsSUdSeVlYY2dablZ1WTNScGIyNGdhWE51SjNRZ1lXTjBkV0ZzYkhrZ1lTQm1kVzVqZEdsdmJseHVJQ0FnSUNBZ2FXWW9kSGx3Wlc5bUlHUnlZWGNnSVQwOUlGd2lablZ1WTNScGIyNWNJaWxjYmlBZ0lDQWdJQ0FnY21WMGRYSnVPMXh1WEc0Z0lDQWdJQ0J2WW1vZ1BTQjdYRzRnSUNBZ0lDQWdJR1ZzWlcxbGJuUTZJR1ZzTEZ4dUlDQWdJQ0FnSUNCamIyNTBaWGgwT2lCbGJDNW5aWFJEYjI1MFpYaDBLRndpTW1SY0lpa3NYRzRnSUNBZ0lDQWdJR1J5WVhkcGJtYzZJR1J5WVhkY2JpQWdJQ0FnSUgwN1hHNWNiaUFnSUNBZ0lIUm9hWE11YkdsemRDNXdkWE5vS0c5aWFpazdYRzRnSUNBZ0lDQjBhR2x6TG1SeVlYY29iMkpxTENCTFJWbEdVa0ZOUlNrN1hHNGdJQ0FnZlN4Y2JpQWdJQ0J6WlhRNklHWjFibU4wYVc5dUtHVnNMQ0JrY21GM0tTQjdYRzRnSUNBZ0lDQjJZWElnYVR0Y2JseHVJQ0FnSUNBZ2FXWW9kSGx3Wlc5bUlHVnNJRDA5UFNCY0luTjBjbWx1WjF3aUtWeHVJQ0FnSUNBZ0lDQmxiQ0E5SUdSdlkzVnRaVzUwTG1kbGRFVnNaVzFsYm5SQ2VVbGtLR1ZzS1R0Y2JseHVJQ0FnSUNBZ1ptOXlLR2tnUFNCMGFHbHpMbXhwYzNRdWJHVnVaM1JvT3lCcExTMDdJQ2xjYmlBZ0lDQWdJQ0FnYVdZb2RHaHBjeTVzYVhOMFcybGRMbVZzWlcxbGJuUWdQVDA5SUdWc0tTQjdYRzRnSUNBZ0lDQWdJQ0FnZEdocGN5NXNhWE4wVzJsZExtUnlZWGRwYm1jZ1BTQjBhR2x6TGw5a1pYUmxjbTFwYm1WRWNtRjNhVzVuUm5WdVkzUnBiMjRvWkhKaGR5azdYRzRnSUNBZ0lDQWdJQ0FnZEdocGN5NWtjbUYzS0hSb2FYTXViR2x6ZEZ0cFhTd2dTMFZaUmxKQlRVVXBPMXh1SUNBZ0lDQWdJQ0FnSUhKbGRIVnlianRjYmlBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCMGFHbHpMbUZrWkNobGJDd2daSEpoZHlrN1hHNGdJQ0FnZlN4Y2JpQWdJQ0J5WlcxdmRtVTZJR1oxYm1OMGFXOXVLR1ZzS1NCN1hHNGdJQ0FnSUNCMllYSWdhVHRjYmx4dUlDQWdJQ0FnYVdZb2RIbHdaVzltSUdWc0lEMDlQU0JjSW5OMGNtbHVaMXdpS1Z4dUlDQWdJQ0FnSUNCbGJDQTlJR1J2WTNWdFpXNTBMbWRsZEVWc1pXMWxiblJDZVVsa0tHVnNLVHRjYmx4dUlDQWdJQ0FnWm05eUtHa2dQU0IwYUdsekxteHBjM1F1YkdWdVozUm9PeUJwTFMwN0lDbGNiaUFnSUNBZ0lDQWdhV1lvZEdocGN5NXNhWE4wVzJsZExtVnNaVzFsYm5RZ1BUMDlJR1ZzS1NCN1hHNGdJQ0FnSUNBZ0lDQWdkR2hwY3k1c2FYTjBMbk53YkdsalpTaHBMQ0F4S1R0Y2JpQWdJQ0FnSUNBZ0lDQnlaWFIxY200N1hHNGdJQ0FnSUNBZ0lIMWNiaUFnSUNCOUxGeHVJQ0FnSUdSeVlYYzZJR1oxYm1OMGFXOXVLRzlpYWl3Z2RHbHRaU2tnZTF4dUlDQWdJQ0FnZG1GeUlHTmhiblpoY3lBOUlHOWlhaTVqYjI1MFpYaDBMbU5oYm5aaGN6dGNibHh1SUNBZ0lDQWdhV1lvZEdocGN5NXlaWE5wZW1WRGJHVmhjaWxjYmlBZ0lDQWdJQ0FnWTJGdWRtRnpMbmRwWkhSb0lEMGdZMkZ1ZG1GekxuZHBaSFJvTzF4dVhHNGdJQ0FnSUNCbGJITmxYRzRnSUNBZ0lDQWdJRzlpYWk1amIyNTBaWGgwTG1Oc1pXRnlVbVZqZENnd0xDQXdMQ0JqWVc1MllYTXVkMmxrZEdnc0lHTmhiblpoY3k1b1pXbG5hSFFwTzF4dVhHNGdJQ0FnSUNCdlltb3VaSEpoZDJsdVp5aHZZbW91WTI5dWRHVjRkQ3dnZEdsdFpTd2dkR2hwY3k1amIyeHZjaWs3WEc0Z0lDQWdmU3hjYmlBZ0lDQndiR0Y1T2lCbWRXNWpkR2x2YmlncElIdGNiaUFnSUNBZ0lIWmhjaUJ6Wld4bUlEMGdkR2hwY3p0Y2JseHVJQ0FnSUNBZ2RHaHBjeTV3WVhWelpTZ3BPMXh1SUNBZ0lDQWdkR2hwY3k1cGJuUmxjblpoYkNBOUlISmxjWFZsYzNSSmJuUmxjblpoYkNobWRXNWpkR2x2YmlncElIdGNiaUFnSUNBZ0lDQWdkbUZ5SUc1dmR5QTlJRVJoZEdVdWJtOTNLQ2tzWEc0Z0lDQWdJQ0FnSUNBZ0lDQnBPMXh1WEc0Z0lDQWdJQ0FnSUdadmNpaHBJRDBnYzJWc1ppNXNhWE4wTG14bGJtZDBhRHNnYVMwdE95QXBYRzRnSUNBZ0lDQWdJQ0FnYzJWc1ppNWtjbUYzS0hObGJHWXViR2x6ZEZ0cFhTd2dibTkzS1R0Y2JpQWdJQ0FnSUgwc0lERXdNREFnTHlBMk1DazdYRzRnSUNBZ2ZTeGNiaUFnSUNCd1lYVnpaVG9nWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnSUNCMllYSWdhVHRjYmx4dUlDQWdJQ0FnYVdZb2RHaHBjeTVwYm5SbGNuWmhiQ2tnZTF4dUlDQWdJQ0FnSUNCallXNWpaV3hKYm5SbGNuWmhiQ2gwYUdsekxtbHVkR1Z5ZG1Gc0tUdGNiaUFnSUNBZ0lDQWdkR2hwY3k1cGJuUmxjblpoYkNBOUlHNTFiR3c3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmVnh1SUNCOU8xeHVJQ0J5WlhSMWNtNGdVMnQ1WTI5dWN6dGNibjA3WEc0aVhYMD1cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXHNreWNvbnNcXFxcc2t5Y29ucy5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxza3ljb25zXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgRmF2b3JpdGVzID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBGYXZvcml0ZXMoZXZlbnRCdXMsIGVsZW1lbnQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRmF2b3JpdGVzKTtcblxuICAgIHRoaXMuZXZlbnRCdXMgPSBldmVudEJ1cztcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgdGhpcy5mYXZvcml0ZXMgPSBbXTtcblxuICAgIHRoaXMub25GYXZvcml0ZXNBZGQgPSB0aGlzLm9uRmF2b3JpdGVzQWRkLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkZhdm9yaXRlc1JlbW92ZSA9IHRoaXMub25GYXZvcml0ZXNSZW1vdmUuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQ29vcmRpbmF0ZXNDaGFuZ2UgPSB0aGlzLm9uQ29vcmRpbmF0ZXNDaGFuZ2UuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuZXZlbnRCdXMub24oJ2Zhdm9yaXRlczphZGQnLCB0aGlzLm9uRmF2b3JpdGVzQWRkKTtcbiAgICB0aGlzLmV2ZW50QnVzLm9uKCdmYXZvcml0ZXM6cmVtb3ZlJywgdGhpcy5vbkZhdm9yaXRlc1JlbW92ZSk7XG4gICAgdGhpcy5ldmVudEJ1cy5vbignY29vcmRpbmF0ZXM6Y2hhbmdlZCcsIHRoaXMub25Db29yZGluYXRlc0NoYW5nZSk7XG5cbiAgICB0aGlzLmxvYWRGYXZvcml0ZXNGcm9tU3RvcmFnZShsb2NhbFN0b3JhZ2UpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEZhdm9yaXRlcywgW3tcbiAgICBrZXk6ICdsb2FkRmF2b3JpdGVzRnJvbVN0b3JhZ2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsb2FkRmF2b3JpdGVzRnJvbVN0b3JhZ2Uoc3RvcmFnZSkge1xuICAgICAgdmFyIHNhdmVkRmF2b3JpdGVzID0gc3RvcmFnZS5nZXRJdGVtKCdmb3JlY2FzdC1mYXZvcml0ZXMnKTtcbiAgICAgIHRoaXMuZmF2b3JpdGVzID0gSlNPTi5wYXJzZShzYXZlZEZhdm9yaXRlcykgfHwgW107XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2F2ZUZhdm9yaXRlc1RvU3RvcmFnZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHNhdmVGYXZvcml0ZXNUb1N0b3JhZ2Uoc3RvcmFnZSkge1xuICAgICAgc3RvcmFnZS5zZXRJdGVtKCdmb3JlY2FzdC1mYXZvcml0ZXMnLCBKU09OLnN0cmluZ2lmeSh0aGlzLmZhdm9yaXRlcykpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ29uRmF2b3JpdGVzQWRkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25GYXZvcml0ZXNBZGQoY29vcmRzKSB7XG4gICAgICB0aGlzLmZhdm9yaXRlcy5wdXNoKGNvb3Jkcyk7XG4gICAgICB0aGlzLm9uQ29vcmRpbmF0ZXNDaGFuZ2UoY29vcmRzKTtcbiAgICAgIHRoaXMuc2F2ZUZhdm9yaXRlc1RvU3RvcmFnZShsb2NhbFN0b3JhZ2UpO1xuICAgICAgdGhpcy5yZW5kZXJGYXZvcml0ZXMoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbkZhdm9yaXRlc1JlbW92ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uRmF2b3JpdGVzUmVtb3ZlKGNvb3Jkcykge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgdGhpcy5mYXZvcml0ZXMubWFwKGZ1bmN0aW9uIChpdGVtLCBpKSB7XG4gICAgICAgIGlmIChpdGVtLmxhdCA9PT0gY29vcmRzLmxhdCkge1xuICAgICAgICAgIF90aGlzLmZhdm9yaXRlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKHRoaXMuZmF2b3JpdGVzLmxlbmd0aCA+IDUpIHtcbiAgICAgICAgdGhpcy5mYXZvcml0ZXMgPSBbXTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKCdzdGFyOmlzLWFjdGl2ZScsIGZhbHNlKTtcbiAgICAgIHRoaXMuc2F2ZUZhdm9yaXRlc1RvU3RvcmFnZShsb2NhbFN0b3JhZ2UpO1xuICAgICAgdGhpcy5yZW5kZXJGYXZvcml0ZXMoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdvbkNvb3JkaW5hdGVzQ2hhbmdlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25Db29yZGluYXRlc0NoYW5nZShjb29yZHMpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICB0aGlzLmZhdm9yaXRlcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgaWYgKGl0ZW0ubGF0ID09PSBjb29yZHMubGF0KSB7XG4gICAgICAgICAgX3RoaXMyLmV2ZW50QnVzLnRyaWdnZXIoJ3N0YXI6aXMtYWN0aXZlJywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlckZhdm9yaXRlcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlckZhdm9yaXRlcygpIHtcbiAgICAgIHZhciBmYXZvcml0ZXNCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5lbGVtZW50KTtcblxuICAgICAgdmFyIGZhdm9yaXRlc1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgIGZhdm9yaXRlc1RpdGxlLmlubmVySFRNTCA9ICdZb3VyIGZhdm9yaXRlczonO1xuXG4gICAgICB2YXIgZmF2b3JpdGVzVWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgZmF2b3JpdGVzVWwuY2xhc3NMaXN0LmFkZCgnbGlzdC1ncm91cCcpO1xuXG4gICAgICB0aGlzLmZhdm9yaXRlcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgdmFyIGxhdCA9IGl0ZW0ubGF0LFxuICAgICAgICAgICAgbG5nID0gaXRlbS5sbmc7XG5cbiAgICAgICAgZmF2b3JpdGVzVWwuaW5uZXJIVE1MICs9ICc8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj48YSBocmVmPVwiI2Nvb3JkaW5hdGVzP2xhdD0nICsgbGF0ICsgJyZsbmc9JyArIGxuZyArICdcIj4nICsgKCtsYXQpLnRvRml4ZWQoMikgKyAnIC8gJyArICgrbG5nKS50b0ZpeGVkKDIpICsgJzwvYT48L2xpPic7XG4gICAgICB9KTtcblxuICAgICAgZmF2b3JpdGVzQmxvY2suaW5uZXJIVE1MID0gZmF2b3JpdGVzVGl0bGUub3V0ZXJIVE1MICsgJyAnICsgZmF2b3JpdGVzVWwub3V0ZXJIVE1MO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBGYXZvcml0ZXM7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEZhdm9yaXRlcztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklrWmhkbTl5YVhSbGN5NXFjeUpkTENKdVlXMWxjeUk2V3lKR1lYWnZjbWwwWlhNaUxDSmxkbVZ1ZEVKMWN5SXNJbVZzWlcxbGJuUWlMQ0ptWVhadmNtbDBaWE1pTENKdmJrWmhkbTl5YVhSbGMwRmtaQ0lzSW1KcGJtUWlMQ0p2YmtaaGRtOXlhWFJsYzFKbGJXOTJaU0lzSW05dVEyOXZjbVJwYm1GMFpYTkRhR0Z1WjJVaUxDSnZiaUlzSW14dllXUkdZWFp2Y21sMFpYTkdjbTl0VTNSdmNtRm5aU0lzSW14dlkyRnNVM1J2Y21GblpTSXNJbk4wYjNKaFoyVWlMQ0p6WVhabFpFWmhkbTl5YVhSbGN5SXNJbWRsZEVsMFpXMGlMQ0pLVTA5T0lpd2ljR0Z5YzJVaUxDSnpaWFJKZEdWdElpd2ljM1J5YVc1bmFXWjVJaXdpWTI5dmNtUnpJaXdpY0hWemFDSXNJbk5oZG1WR1lYWnZjbWwwWlhOVWIxTjBiM0poWjJVaUxDSnlaVzVrWlhKR1lYWnZjbWwwWlhNaUxDSnRZWEFpTENKcGRHVnRJaXdpYVNJc0lteGhkQ0lzSW5Od2JHbGpaU0lzSW14bGJtZDBhQ0lzSW5SeWFXZG5aWElpTENKbVlYWnZjbWwwWlhOQ2JHOWpheUlzSW1SdlkzVnRaVzUwSWl3aWNYVmxjbmxUWld4bFkzUnZjaUlzSW1aaGRtOXlhWFJsYzFScGRHeGxJaXdpWTNKbFlYUmxSV3hsYldWdWRDSXNJbWx1Ym1WeVNGUk5UQ0lzSW1aaGRtOXlhWFJsYzFWc0lpd2lZMnhoYzNOTWFYTjBJaXdpWVdSa0lpd2liRzVuSWl3aWRHOUdhWGhsWkNJc0ltOTFkR1Z5U0ZSTlRDSmRMQ0p0WVhCd2FXNW5jeUk2SWpzN096czdPenM3T3p0SlFVRk5RU3hUTzBGQlEwb3NjVUpCUVZsRExGRkJRVm9zUlVGQmMwSkRMRTlCUVhSQ0xFVkJRU3RDTzBGQlFVRTdPMEZCUXpkQ0xGTkJRVXRFTEZGQlFVd3NSMEZCWjBKQkxGRkJRV2hDTzBGQlEwRXNVMEZCUzBNc1QwRkJUQ3hIUVVGbFFTeFBRVUZtT3p0QlFVVkJMRk5CUVV0RExGTkJRVXdzUjBGQmFVSXNSVUZCYWtJN08wRkJSMEVzVTBGQlMwTXNZMEZCVEN4SFFVRnpRaXhMUVVGTFFTeGpRVUZNTEVOQlFXOUNReXhKUVVGd1FpeERRVUY1UWl4SlFVRjZRaXhEUVVGMFFqdEJRVU5CTEZOQlFVdERMR2xDUVVGTUxFZEJRWGxDTEV0QlFVdEJMR2xDUVVGTUxFTkJRWFZDUkN4SlFVRjJRaXhEUVVFMFFpeEpRVUUxUWl4RFFVRjZRanRCUVVOQkxGTkJRVXRGTEcxQ1FVRk1MRWRCUVRKQ0xFdEJRVXRCTEcxQ1FVRk1MRU5CUVhsQ1JpeEpRVUY2UWl4RFFVRTRRaXhKUVVFNVFpeERRVUV6UWpzN1FVRkZRU3hUUVVGTFNpeFJRVUZNTEVOQlFXTlBMRVZCUVdRc1EwRkJhVUlzWlVGQmFrSXNSVUZCYTBNc1MwRkJTMG9zWTBGQmRrTTdRVUZEUVN4VFFVRkxTQ3hSUVVGTUxFTkJRV05QTEVWQlFXUXNRMEZCYVVJc2EwSkJRV3BDTEVWQlFYRkRMRXRCUVV0R0xHbENRVUV4UXp0QlFVTkJMRk5CUVV0TUxGRkJRVXdzUTBGQlkwOHNSVUZCWkN4RFFVRnBRaXh4UWtGQmFrSXNSVUZCZDBNc1MwRkJTMFFzYlVKQlFUZERPenRCUVVWQkxGTkJRVXRGTEhkQ1FVRk1MRU5CUVRoQ1F5eFpRVUU1UWp0QlFVTkVPenM3T3paRFFVVjNRa01zVHl4RlFVRlRPMEZCUTJoRExGVkJRVTFETEdsQ1FVRnBRa1FzVVVGQlVVVXNUMEZCVWl4RFFVRm5RaXh2UWtGQmFFSXNRMEZCZGtJN1FVRkRRU3hYUVVGTFZpeFRRVUZNTEVkQlFXbENWeXhMUVVGTFF5eExRVUZNTEVOQlFWZElMR05CUVZnc1MwRkJPRUlzUlVGQkwwTTdRVUZEUkRzN096SkRRVVZ6UWtRc1R5eEZRVUZUTzBGQlF6bENRU3hqUVVGUlN5eFBRVUZTTEVOQlFXZENMRzlDUVVGb1FpeEZRVUZ6UTBZc1MwRkJTMGNzVTBGQlRDeERRVUZsTEV0QlFVdGtMRk5CUVhCQ0xFTkJRWFJETzBGQlEwUTdPenR0UTBGRlkyVXNUU3hGUVVGUk8wRkJRM0pDTEZkQlFVdG1MRk5CUVV3c1EwRkJaV2RDTEVsQlFXWXNRMEZCYjBKRUxFMUJRWEJDTzBGQlEwRXNWMEZCUzFnc2JVSkJRVXdzUTBGQmVVSlhMRTFCUVhwQ08wRkJRMEVzVjBGQlMwVXNjMEpCUVV3c1EwRkJORUpXTEZsQlFUVkNPMEZCUTBFc1YwRkJTMWNzWlVGQlREdEJRVU5FT3pzN2MwTkJSV2xDU0N4TkxFVkJRVkU3UVVGQlFUczdRVUZEZUVJc1YwRkJTMllzVTBGQlRDeERRVUZsYlVJc1IwRkJaaXhEUVVGdFFpeFZRVUZEUXl4SlFVRkVMRVZCUVU5RExFTkJRVkFzUlVGQllUdEJRVU01UWl4WlFVRkpSQ3hMUVVGTFJTeEhRVUZNTEV0QlFXRlFMRTlCUVU5UExFZEJRWGhDTEVWQlFUWkNPMEZCUXpOQ0xHZENRVUZMZEVJc1UwRkJUQ3hEUVVGbGRVSXNUVUZCWml4RFFVRnpRa1lzUTBGQmRFSXNSVUZCZVVJc1EwRkJla0k3UVVGRFJEdEJRVU5HTEU5QlNrUTdRVUZMUVN4VlFVRkpMRXRCUVV0eVFpeFRRVUZNTEVOQlFXVjNRaXhOUVVGbUxFZEJRWGRDTEVOQlFUVkNMRVZCUVN0Q08wRkJRemRDTEdGQlFVdDRRaXhUUVVGTUxFZEJRV2xDTEVWQlFXcENPMEZCUTBRN08wRkJSVVFzVjBGQlMwWXNVVUZCVEN4RFFVRmpNa0lzVDBGQlpDeERRVUZ6UWl4blFrRkJkRUlzUlVGQmQwTXNTMEZCZUVNN1FVRkRRU3hYUVVGTFVpeHpRa0ZCVEN4RFFVRTBRbFlzV1VGQk5VSTdRVUZEUVN4WFFVRkxWeXhsUVVGTU8wRkJRMFE3T3p0M1EwRkZiVUpJTEUwc1JVRkJVVHRCUVVGQk96dEJRVU14UWl4WFFVRkxaaXhUUVVGTUxFTkJRV1Z0UWl4SFFVRm1MRU5CUVcxQ0xHZENRVUZSTzBGQlEzcENMRmxCUVVsRExFdEJRVXRGTEVkQlFVd3NTMEZCWVZBc1QwRkJUMDhzUjBGQmVFSXNSVUZCTmtJN1FVRkRNMElzYVVKQlFVdDRRaXhSUVVGTUxFTkJRV015UWl4UFFVRmtMRU5CUVhOQ0xHZENRVUYwUWl4RlFVRjNReXhKUVVGNFF6dEJRVU5FTzBGQlEwWXNUMEZLUkR0QlFVdEVPenM3YzBOQlJXbENPMEZCUTJoQ0xGVkJRVTFETEdsQ1FVRnBRa01zVTBGQlUwTXNZVUZCVkN4RFFVRjFRaXhMUVVGTE4wSXNUMEZCTlVJc1EwRkJka0k3TzBGQlJVRXNWVUZCVFRoQ0xHbENRVUZwUWtZc1UwRkJVMGNzWVVGQlZDeERRVUYxUWl4SlFVRjJRaXhEUVVGMlFqdEJRVU5CUkN4eFFrRkJaVVVzVTBGQlppeEhRVUV5UWl4cFFrRkJNMEk3TzBGQlJVRXNWVUZCVFVNc1kwRkJZMHdzVTBGQlUwY3NZVUZCVkN4RFFVRjFRaXhKUVVGMlFpeERRVUZ3UWp0QlFVTkJSU3hyUWtGQldVTXNVMEZCV2l4RFFVRnpRa01zUjBGQmRFSXNRMEZCTUVJc1dVRkJNVUk3TzBGQlJVRXNWMEZCUzJ4RExGTkJRVXdzUTBGQlpXMUNMRWRCUVdZc1EwRkJiVUlzWjBKQlFWRTdRVUZCUVN4WlFVTnFRa2NzUjBGRWFVSXNSMEZEU2tZc1NVRkVTU3hEUVVOcVFrVXNSMEZFYVVJN1FVRkJRU3haUVVOYVlTeEhRVVJaTEVkQlEwcG1MRWxCUkVrc1EwRkRXbVVzUjBGRVdUczdRVUZGZWtKSUxHOUNRVUZaUkN4VFFVRmFMQ3RFUVVGclJsUXNSMEZCYkVZc1lVRkJOa1poTEVkQlFUZEdMRlZCUVhGSExFTkJRVU1zUTBGQlEySXNSMEZCUml4RlFVRlBZeXhQUVVGUUxFTkJRV1VzUTBGQlppeERRVUZ5Unl4WFFVRTBTQ3hEUVVGRExFTkJRVU5FTEVkQlFVWXNSVUZCVDBNc1QwRkJVQ3hEUVVGbExFTkJRV1lzUTBGQk5VZzdRVUZEUkN4UFFVaEVPenRCUVV0QlZpeHhRa0ZCWlVzc1UwRkJaaXhIUVVFNFFrWXNaVUZCWlZFc1UwRkJOME1zVTBGQk1FUk1MRmxCUVZsTExGTkJRWFJGTzBGQlEwUTdPenM3T3p0clFrRkhXWGhETEZNaUxDSm1hV3hsSWpvaVJtRjJiM0pwZEdWekxtcHpJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpWTJ4aGMzTWdSbUYyYjNKcGRHVnpJSHRjY2x4dUlDQmpiMjV6ZEhKMVkzUnZjaWhsZG1WdWRFSjFjeXdnWld4bGJXVnVkQ2tnZTF4eVhHNGdJQ0FnZEdocGN5NWxkbVZ1ZEVKMWN5QTlJR1YyWlc1MFFuVnpPMXh5WEc0Z0lDQWdkR2hwY3k1bGJHVnRaVzUwSUQwZ1pXeGxiV1Z1ZER0Y2NseHVYSEpjYmlBZ0lDQjBhR2x6TG1aaGRtOXlhWFJsY3lBOUlGdGRPMXh5WEc1Y2NseHVYSEpjYmlBZ0lDQjBhR2x6TG05dVJtRjJiM0pwZEdWelFXUmtJRDBnZEdocGN5NXZia1poZG05eWFYUmxjMEZrWkM1aWFXNWtLSFJvYVhNcE8xeHlYRzRnSUNBZ2RHaHBjeTV2YmtaaGRtOXlhWFJsYzFKbGJXOTJaU0E5SUhSb2FYTXViMjVHWVhadmNtbDBaWE5TWlcxdmRtVXVZbWx1WkNoMGFHbHpLVHRjY2x4dUlDQWdJSFJvYVhNdWIyNURiMjl5WkdsdVlYUmxjME5vWVc1blpTQTlJSFJvYVhNdWIyNURiMjl5WkdsdVlYUmxjME5vWVc1blpTNWlhVzVrS0hSb2FYTXBPMXh5WEc1Y2NseHVJQ0FnSUhSb2FYTXVaWFpsYm5SQ2RYTXViMjRvSjJaaGRtOXlhWFJsY3pwaFpHUW5MQ0IwYUdsekxtOXVSbUYyYjNKcGRHVnpRV1JrS1R0Y2NseHVJQ0FnSUhSb2FYTXVaWFpsYm5SQ2RYTXViMjRvSjJaaGRtOXlhWFJsY3pweVpXMXZkbVVuTENCMGFHbHpMbTl1Um1GMmIzSnBkR1Z6VW1WdGIzWmxLVHRjY2x4dUlDQWdJSFJvYVhNdVpYWmxiblJDZFhNdWIyNG9KMk52YjNKa2FXNWhkR1Z6T21Ob1lXNW5aV1FuTENCMGFHbHpMbTl1UTI5dmNtUnBibUYwWlhORGFHRnVaMlVwTzF4eVhHNWNjbHh1SUNBZ0lIUm9hWE11Ykc5aFpFWmhkbTl5YVhSbGMwWnliMjFUZEc5eVlXZGxLR3h2WTJGc1UzUnZjbUZuWlNrN1hISmNiaUFnZlZ4eVhHNWNjbHh1SUNCc2IyRmtSbUYyYjNKcGRHVnpSbkp2YlZOMGIzSmhaMlVvYzNSdmNtRm5aU2tnZTF4eVhHNGdJQ0FnWTI5dWMzUWdjMkYyWldSR1lYWnZjbWwwWlhNZ1BTQnpkRzl5WVdkbExtZGxkRWwwWlcwb0oyWnZjbVZqWVhOMExXWmhkbTl5YVhSbGN5Y3BPMXh5WEc0Z0lDQWdkR2hwY3k1bVlYWnZjbWwwWlhNZ1BTQktVMDlPTG5CaGNuTmxLSE5oZG1Wa1JtRjJiM0pwZEdWektTQjhmQ0JiWFR0Y2NseHVJQ0I5WEhKY2JseHlYRzRnSUhOaGRtVkdZWFp2Y21sMFpYTlViMU4wYjNKaFoyVW9jM1J2Y21GblpTa2dlMXh5WEc0Z0lDQWdjM1J2Y21GblpTNXpaWFJKZEdWdEtDZG1iM0psWTJGemRDMW1ZWFp2Y21sMFpYTW5MQ0JLVTA5T0xuTjBjbWx1WjJsbWVTaDBhR2x6TG1aaGRtOXlhWFJsY3lrcE8xeHlYRzRnSUgxY2NseHVYSEpjYmlBZ2IyNUdZWFp2Y21sMFpYTkJaR1FvWTI5dmNtUnpLU0I3WEhKY2JpQWdJQ0IwYUdsekxtWmhkbTl5YVhSbGN5NXdkWE5vS0dOdmIzSmtjeWs3WEhKY2JpQWdJQ0IwYUdsekxtOXVRMjl2Y21ScGJtRjBaWE5EYUdGdVoyVW9ZMjl2Y21SektUdGNjbHh1SUNBZ0lIUm9hWE11YzJGMlpVWmhkbTl5YVhSbGMxUnZVM1J2Y21GblpTaHNiMk5oYkZOMGIzSmhaMlVwTzF4eVhHNGdJQ0FnZEdocGN5NXlaVzVrWlhKR1lYWnZjbWwwWlhNb0tUdGNjbHh1SUNCOVhISmNibHh5WEc0Z0lHOXVSbUYyYjNKcGRHVnpVbVZ0YjNabEtHTnZiM0prY3lrZ2UxeHlYRzRnSUNBZ2RHaHBjeTVtWVhadmNtbDBaWE11YldGd0tDaHBkR1Z0TENCcEtTQTlQaUI3WEhKY2JpQWdJQ0FnSUdsbUlDaHBkR1Z0TG14aGRDQTlQVDBnWTI5dmNtUnpMbXhoZENrZ2UxeHlYRzRnSUNBZ0lDQWdJSFJvYVhNdVptRjJiM0pwZEdWekxuTndiR2xqWlNocExDQXhLVHRjY2x4dUlDQWdJQ0FnZlZ4eVhHNGdJQ0FnZlNsY2NseHVJQ0FnSUdsbUlDaDBhR2x6TG1aaGRtOXlhWFJsY3k1c1pXNW5kR2dnUGlBMUtTQjdYSEpjYmlBZ0lDQWdJSFJvYVhNdVptRjJiM0pwZEdWeklEMGdXMTA3WEhKY2JpQWdJQ0I5WEhKY2JseHlYRzRnSUNBZ2RHaHBjeTVsZG1WdWRFSjFjeTUwY21sbloyVnlLQ2R6ZEdGeU9tbHpMV0ZqZEdsMlpTY3NJR1poYkhObEtUdGNjbHh1SUNBZ0lIUm9hWE11YzJGMlpVWmhkbTl5YVhSbGMxUnZVM1J2Y21GblpTaHNiMk5oYkZOMGIzSmhaMlVwTzF4eVhHNGdJQ0FnZEdocGN5NXlaVzVrWlhKR1lYWnZjbWwwWlhNb0tUdGNjbHh1SUNCOVhISmNibHh5WEc0Z0lHOXVRMjl2Y21ScGJtRjBaWE5EYUdGdVoyVW9ZMjl2Y21SektTQjdYSEpjYmlBZ0lDQjBhR2x6TG1aaGRtOXlhWFJsY3k1dFlYQW9hWFJsYlNBOVBpQjdYSEpjYmlBZ0lDQWdJR2xtSUNocGRHVnRMbXhoZENBOVBUMGdZMjl2Y21SekxteGhkQ2tnZTF4eVhHNGdJQ0FnSUNBZ0lIUm9hWE11WlhabGJuUkNkWE11ZEhKcFoyZGxjaWduYzNSaGNqcHBjeTFoWTNScGRtVW5MQ0IwY25WbEtUdGNjbHh1SUNBZ0lDQWdmVnh5WEc0Z0lDQWdmU2xjY2x4dUlDQjlYSEpjYmx4eVhHNGdJSEpsYm1SbGNrWmhkbTl5YVhSbGN5Z3BJSHRjY2x4dUlDQWdJR052Ym5OMElHWmhkbTl5YVhSbGMwSnNiMk5ySUQwZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWgwYUdsekxtVnNaVzFsYm5RcE8xeHlYRzVjY2x4dUlDQWdJR052Ym5OMElHWmhkbTl5YVhSbGMxUnBkR3hsSUQwZ1pHOWpkVzFsYm5RdVkzSmxZWFJsUld4bGJXVnVkQ2duYURNbktUdGNjbHh1SUNBZ0lHWmhkbTl5YVhSbGMxUnBkR3hsTG1sdWJtVnlTRlJOVENBOUlDZFpiM1Z5SUdaaGRtOXlhWFJsY3pvbk8xeHlYRzVjY2x4dUlDQWdJR052Ym5OMElHWmhkbTl5YVhSbGMxVnNJRDBnWkc5amRXMWxiblF1WTNKbFlYUmxSV3hsYldWdWRDZ25kV3duS1R0Y2NseHVJQ0FnSUdaaGRtOXlhWFJsYzFWc0xtTnNZWE56VEdsemRDNWhaR1FvSjJ4cGMzUXRaM0p2ZFhBbktUdGNjbHh1WEhKY2JpQWdJQ0IwYUdsekxtWmhkbTl5YVhSbGN5NXRZWEFvYVhSbGJTQTlQaUI3WEhKY2JpQWdJQ0FnSUdOdmJuTjBJSHNnYkdGMExDQnNibWNnZlNBOUlHbDBaVzA3WEhKY2JpQWdJQ0FnSUdaaGRtOXlhWFJsYzFWc0xtbHVibVZ5U0ZSTlRDQXJQU0JnUEd4cElHTnNZWE56UFZ3aWJHbHpkQzFuY205MWNDMXBkR1Z0WENJK1BHRWdhSEpsWmoxY0lpTmpiMjl5WkdsdVlYUmxjejlzWVhROUpIdHNZWFI5Sm14dVp6MGtlMnh1WjMxY0lqNGtleWdyYkdGMEtTNTBiMFpwZUdWa0tESXBmU0F2SUNSN0tDdHNibWNwTG5SdlJtbDRaV1FvTWlsOVBDOWhQand2YkdrK1lEdGNjbHh1SUNBZ0lIMHBPMXh5WEc1Y2NseHVJQ0FnSUdaaGRtOXlhWFJsYzBKc2IyTnJMbWx1Ym1WeVNGUk5UQ0E5SUdBa2UyWmhkbTl5YVhSbGMxUnBkR3hsTG05MWRHVnlTRlJOVEgwZ0pIdG1ZWFp2Y21sMFpYTlZiQzV2ZFhSbGNraFVUVXg5WUR0Y2NseHVJQ0I5WEhKY2JuMWNjbHh1WEhKY2JtVjRjRzl5ZENCa1pXWmhkV3gwSUVaaGRtOXlhWFJsY3p0Y2NseHVJbDE5XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL2NvbXBvbmVudHNcXFxcRmF2b3JpdGVzLmpzXCIsXCIvY29tcG9uZW50c1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3NreWNvbnMgPSByZXF1aXJlKFwic2t5Y29uc1wiKTtcblxudmFyIF9za3ljb25zMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NreWNvbnMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgRm9yZWNhc3QgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEZvcmVjYXN0KGVsZW1lbnQsIGNpdHlEYXRhKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEZvcmVjYXN0KTtcblxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5jaXR5RGF0YSA9IGNpdHlEYXRhO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEZvcmVjYXN0LCBbe1xuICAgIGtleTogXCJyZW5kZXJGb3JlY2FzdFwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXJGb3JlY2FzdCgpIHtcbiAgICAgIHZhciBmb3JlY2FzdERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5lbGVtZW50KTtcblxuICAgICAgZm9yZWNhc3REaXYub3V0ZXJIVE1MID0gXCJcXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJmb3JlY2FzdC1ibG9ja1xcXCI+XFxuICAgICAgICA8aDI+XCIgKyB0aGlzLmNpdHlEYXRhLnRpbWV6b25lICsgXCI8L2gyPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwicm93XFxcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY29sLW1kLTZcXFwiPlxcbiAgICAgICAgICAgIDxjYW52YXMgY2xhc3M9XFxcImZvcmVjYXN0LWljb25cXFwiIHdpZHRoPVxcXCIxMjhcXFwiIGhlaWdodD1cXFwiMTI4XFxcIj48L2NhbnZhcz5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbC1tZC02IGZvcmVjYXN0LWluZm9cXFwiPlxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJ0ZW1wZXJhdHVyZVxcXCI+VGVtcGVyYXR1cmU6IFwiICsgdGhpcy5jaXR5RGF0YS5jdXJyZW50bHkudGVtcGVyYXR1cmUudG9GaXhlZCgxKSArIFwiXFx4QjBDPC9zcGFuPlxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJodW1pZGl0eVxcXCI+SHVtaWRpdHk6IFwiICsgdGhpcy5jaXR5RGF0YS5jdXJyZW50bHkuaHVtaWRpdHkgKyBcIiU8L3NwYW4+XFxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcIndpbmQtc3BlZWRcXFwiPldpbmQgc3BlZWQ6IFwiICsgdGhpcy5jaXR5RGF0YS5jdXJyZW50bHkud2luZFNwZWVkICsgXCJtL3M8L3NwYW4+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wtbGctb2Zmc2V0LTMgY29sLWxnLTYgc3VtbWFyeVxcXCI+XFxuICAgICAgICAgICAgPHA+XCIgKyB0aGlzLmNpdHlEYXRhLmN1cnJlbnRseS5zdW1tYXJ5ICsgXCI8L3A+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgIFwiO1xuXG4gICAgICB2YXIgc2t5Y29ucyA9IG5ldyBuZXcgX3NreWNvbnMyLmRlZmF1bHQoe30pKHsgXCJjb2xvclwiOiBcIiNlNmE4MzFcIiB9KTtcbiAgICAgIHNreWNvbnMuYWRkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NlY3Rpb24ubWFpbiAuZm9yZWNhc3QtaWNvbicpLCB0aGlzLmNpdHlEYXRhLmN1cnJlbnRseS5pY29uKTtcbiAgICAgIHNreWNvbnMucGxheSgpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBGb3JlY2FzdDtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRm9yZWNhc3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJa1p2Y21WallYTjBMbXB6SWwwc0ltNWhiV1Z6SWpwYklrWnZjbVZqWVhOMElpd2laV3hsYldWdWRDSXNJbU5wZEhsRVlYUmhJaXdpWm05eVpXTmhjM1JFYVhZaUxDSmtiMk4xYldWdWRDSXNJbkYxWlhKNVUyVnNaV04wYjNJaUxDSnZkWFJsY2toVVRVd2lMQ0owYVcxbGVtOXVaU0lzSW1OMWNuSmxiblJzZVNJc0luUmxiWEJsY21GMGRYSmxJaXdpZEc5R2FYaGxaQ0lzSW1oMWJXbGthWFI1SWl3aWQybHVaRk53WldWa0lpd2ljM1Z0YldGeWVTSXNJbk5yZVdOdmJuTWlMQ0poWkdRaUxDSnBZMjl1SWl3aWNHeGhlU0pkTENKdFlYQndhVzVuY3lJNklqczdPenM3T3pzN1FVRkJRVHM3T3pzN096czdTVUZGVFVFc1VUdEJRVU5LTEc5Q1FVRlpReXhQUVVGYUxFVkJRWEZDUXl4UlFVRnlRaXhGUVVFclFqdEJRVUZCT3p0QlFVTTNRaXhUUVVGTFJDeFBRVUZNTEVkQlFXVkJMRTlCUVdZN1FVRkRRU3hUUVVGTFF5eFJRVUZNTEVkQlFXZENRU3hSUVVGb1FqdEJRVU5FT3pzN08zRkRRVVZuUWp0QlFVTm1MRlZCUVUxRExHTkJRV05ETEZOQlFWTkRMR0ZCUVZRc1EwRkJkVUlzUzBGQlMwb3NUMEZCTlVJc1EwRkJjRUk3TzBGQlJVRkZMR3RDUVVGWlJ5eFRRVUZhTERSRVFVVlZMRXRCUVV0S0xGRkJRVXdzUTBGQlkwc3NVVUZHZUVJc05sSkJVV2xFTEV0QlFVdE1MRkZCUVV3c1EwRkJZMDBzVTBGQlpDeERRVUYzUWtNc1YwRkJlRUlzUTBGQmIwTkRMRTlCUVhCRExFTkJRVFJETEVOQlFUVkRMRU5CVW1wRUxIRkZRVk15UXl4TFFVRkxVaXhSUVVGTUxFTkJRV05OTEZOQlFXUXNRMEZCZDBKSExGRkJWRzVGTEhGRlFWVXJReXhMUVVGTFZDeFJRVUZNTEVOQlFXTk5MRk5CUVdRc1EwRkJkMEpKTEZOQlZuWkZMRGhLUVdWaExFdEJRVXRXTEZGQlFVd3NRMEZCWTAwc1UwRkJaQ3hEUVVGM1Frc3NUMEZtY2tNN08wRkJjVUpCTEZWQlFVMURMRlZCUVZVc1NVRkJTeXh6UWtGQldTeEZRVUZhTEVOQlFVd3NRMEZCYzBJc1JVRkJReXhUUVVGVExGTkJRVllzUlVGQmRFSXNRMEZCYUVJN1FVRkRRVUVzWTBGQlVVTXNSMEZCVWl4RFFVRlpXQ3hUUVVGVFF5eGhRVUZVTEVOQlFYVkNMRFpDUVVGMlFpeERRVUZhTEVWQlFXMUZMRXRCUVV0SUxGRkJRVXdzUTBGQlkwMHNVMEZCWkN4RFFVRjNRbEVzU1VGQk0wWTdRVUZEUVVZc1kwRkJVVWNzU1VGQlVqdEJRVU5FT3pzN096czdhMEpCUjFscVFpeFJJaXdpWm1sc1pTSTZJa1p2Y21WallYTjBMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaWFXMXdiM0owSUZOcmVXTnZibk1nWm5KdmJTQW5jMnQ1WTI5dWN5YzdYSEpjYmx4eVhHNWpiR0Z6Y3lCR2IzSmxZMkZ6ZENCN1hISmNiaUFnWTI5dWMzUnlkV04wYjNJb1pXeGxiV1Z1ZEN3Z1kybDBlVVJoZEdFcElIdGNjbHh1SUNBZ0lIUm9hWE11Wld4bGJXVnVkQ0E5SUdWc1pXMWxiblE3WEhKY2JpQWdJQ0IwYUdsekxtTnBkSGxFWVhSaElEMGdZMmwwZVVSaGRHRTdYSEpjYmlBZ2ZWeHlYRzVjY2x4dUlDQnlaVzVrWlhKR2IzSmxZMkZ6ZENncElIdGNjbHh1SUNBZ0lHTnZibk4wSUdadmNtVmpZWE4wUkdsMklEMGdaRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2loMGFHbHpMbVZzWlcxbGJuUXBPMXh5WEc1Y2NseHVJQ0FnSUdadmNtVmpZWE4wUkdsMkxtOTFkR1Z5U0ZSTlRDQTlJR0JjY2x4dUlDQWdJQ0FnUEdScGRpQmpiR0Z6Y3oxY0ltWnZjbVZqWVhOMExXSnNiMk5yWENJK1hISmNiaUFnSUNBZ0lDQWdQR2d5UGlSN2RHaHBjeTVqYVhSNVJHRjBZUzUwYVcxbGVtOXVaWDA4TDJneVBseHlYRzRnSUNBZ0lDQWdJRHhrYVhZZ1kyeGhjM005WENKeWIzZGNJajVjY2x4dUlDQWdJQ0FnSUNBZ0lEeGthWFlnWTJ4aGMzTTlYQ0pqYjJ3dGJXUXRObHdpUGx4eVhHNGdJQ0FnSUNBZ0lDQWdJQ0E4WTJGdWRtRnpJR05zWVhOelBWd2labTl5WldOaGMzUXRhV052Ymx3aUlIZHBaSFJvUFZ3aU1USTRYQ0lnYUdWcFoyaDBQVndpTVRJNFhDSStQQzlqWVc1MllYTStYSEpjYmlBZ0lDQWdJQ0FnSUNBOEwyUnBkajVjY2x4dUlDQWdJQ0FnSUNBZ0lEeGthWFlnWTJ4aGMzTTlYQ0pqYjJ3dGJXUXROaUJtYjNKbFkyRnpkQzFwYm1adlhDSStYSEpjYmlBZ0lDQWdJQ0FnSUNBZ0lEeHpjR0Z1SUdOc1lYTnpQVndpZEdWdGNHVnlZWFIxY21WY0lqNVVaVzF3WlhKaGRIVnlaVG9nSkh0MGFHbHpMbU5wZEhsRVlYUmhMbU4xY25KbGJuUnNlUzUwWlcxd1pYSmhkSFZ5WlM1MGIwWnBlR1ZrS0RFcGZjS3dRend2YzNCaGJqNWNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ1BITndZVzRnWTJ4aGMzTTlYQ0pvZFcxcFpHbDBlVndpUGtoMWJXbGthWFI1T2lBa2UzUm9hWE11WTJsMGVVUmhkR0V1WTNWeWNtVnVkR3g1TG1oMWJXbGthWFI1ZlNVOEwzTndZVzQrWEhKY2JpQWdJQ0FnSUNBZ0lDQWdJRHh6Y0dGdUlHTnNZWE56UFZ3aWQybHVaQzF6Y0dWbFpGd2lQbGRwYm1RZ2MzQmxaV1E2SUNSN2RHaHBjeTVqYVhSNVJHRjBZUzVqZFhKeVpXNTBiSGt1ZDJsdVpGTndaV1ZrZlcwdmN6d3ZjM0JoYmo1Y2NseHVJQ0FnSUNBZ0lDQWdJRHd2WkdsMlBseHlYRzRnSUNBZ0lDQWdJRHd2WkdsMlBseHlYRzRnSUNBZ0lDQWdJRHhrYVhZZ1kyeGhjM005WENKeWIzZGNJajVjY2x4dUlDQWdJQ0FnSUNBZ0lEeGthWFlnWTJ4aGMzTTlYQ0pqYjJ3dGJHY3RiMlptYzJWMExUTWdZMjlzTFd4bkxUWWdjM1Z0YldGeWVWd2lQbHh5WEc0Z0lDQWdJQ0FnSUNBZ0lDQThjRDRrZTNSb2FYTXVZMmwwZVVSaGRHRXVZM1Z5Y21WdWRHeDVMbk4xYlcxaGNubDlQQzl3UGx4eVhHNGdJQ0FnSUNBZ0lDQWdQQzlrYVhZK1hISmNiaUFnSUNBZ0lDQWdQQzlrYVhZK1hISmNiaUFnSUNBZ0lEd3ZaR2wyUGx4eVhHNGdJQ0FnWUZ4eVhHNWNjbHh1SUNBZ0lHTnZibk4wSUhOcmVXTnZibk1nUFNCdVpYY2dLRzVsZHlCVGEzbGpiMjV6S0h0OUtTa29lMXdpWTI5c2IzSmNJam9nWENJalpUWmhPRE14WENKOUtWeHlYRzRnSUNBZ2MydDVZMjl1Y3k1aFpHUW9aRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2lnbmMyVmpkR2x2Ymk1dFlXbHVJQzVtYjNKbFkyRnpkQzFwWTI5dUp5a3NJSFJvYVhNdVkybDBlVVJoZEdFdVkzVnljbVZ1ZEd4NUxtbGpiMjRwTzF4eVhHNGdJQ0FnYzJ0NVkyOXVjeTV3YkdGNUtDazdYSEpjYmlBZ2ZWeHlYRzU5WEhKY2JseHlYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQkdiM0psWTJGemREdGNjbHh1SWwxOVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9jb21wb25lbnRzXFxcXEZvcmVjYXN0LmpzXCIsXCIvY29tcG9uZW50c1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEhpc3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEhpc3RvcnkoZXZlbnRCdXMsIGVsZW1lbnQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgSGlzdG9yeSk7XG5cbiAgICB0aGlzLmV2ZW50QnVzID0gZXZlbnRCdXM7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblxuICAgIHRoaXMuaGlzdG9yeSA9IFtdO1xuXG4gICAgdGhpcy5vbkhpc3RvcnlBZGQgPSB0aGlzLm9uSGlzdG9yeUFkZC5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5ldmVudEJ1cy5vbignaGlzdG9yeTphZGQnLCB0aGlzLm9uSGlzdG9yeUFkZCk7XG5cbiAgICB0aGlzLmxvYWRIaXN0b3J5RnJvbVN0b3JhZ2UobG9jYWxTdG9yYWdlKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhIaXN0b3J5LCBbe1xuICAgIGtleTogJ2xvYWRIaXN0b3J5RnJvbVN0b3JhZ2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBsb2FkSGlzdG9yeUZyb21TdG9yYWdlKHN0b3JhZ2UpIHtcbiAgICAgIHZhciBzYXZlZEhpc3RvcnkgPSBzdG9yYWdlLmdldEl0ZW0oJ2ZvcmVjYXN0Jyk7XG4gICAgICB0aGlzLmhpc3RvcnkgPSBKU09OLnBhcnNlKHNhdmVkSGlzdG9yeSkgfHwgW107XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnc2F2ZUhpc3RvcnlUb1N0b3JhZ2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzYXZlSGlzdG9yeVRvU3RvcmFnZShzdG9yYWdlKSB7XG4gICAgICBzdG9yYWdlLnNldEl0ZW0oJ2ZvcmVjYXN0JywgSlNPTi5zdHJpbmdpZnkodGhpcy5oaXN0b3J5KSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnb25IaXN0b3J5QWRkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25IaXN0b3J5QWRkKGNpdHkpIHtcbiAgICAgIGlmICh0aGlzLmhpc3RvcnlbMF0gPT09IGNpdHkpIHJldHVybjtcbiAgICAgIGlmICh0aGlzLmhpc3RvcnkuaW5kZXhPZihjaXR5KSA+IDApIHtcbiAgICAgICAgdGhpcy5oaXN0b3J5LnNwbGljZSh0aGlzLmhpc3RvcnkuaW5kZXhPZihjaXR5KSwgMSk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5oaXN0b3J5Lmxlbmd0aCA+IDQpIHtcbiAgICAgICAgdGhpcy5oaXN0b3J5LnBvcCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5oaXN0b3J5LnVuc2hpZnQoY2l0eSk7XG5cbiAgICAgIHRoaXMuc2F2ZUhpc3RvcnlUb1N0b3JhZ2UobG9jYWxTdG9yYWdlKTtcbiAgICAgIHRoaXMucmVuZGVySGlzdG9yeSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3JlbmRlckhpc3RvcnknLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXJIaXN0b3J5KCkge1xuICAgICAgdmFyIGhpc3RvcnlCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5lbGVtZW50KTtcblxuICAgICAgdmFyIGhpc3RvcnlUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJyk7XG4gICAgICBoaXN0b3J5VGl0bGUuaW5uZXJIVE1MID0gJ1Jlc2VudGx5IHdhdGNoZWQ6JztcblxuICAgICAgdmFyIGhpc3RvcnlVbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgICBoaXN0b3J5VWwuY2xhc3NMaXN0LmFkZCgnbGlzdC1ncm91cCcpO1xuXG4gICAgICB0aGlzLmhpc3RvcnkubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGhpc3RvcnlVbC5pbm5lckhUTUwgKz0gJzxsaSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbVwiPjxhIGhyZWY9XCIjY2l0eT0nICsgaXRlbSArICdcIj4nICsgaXRlbSArICc8L2E+PC9saT4nO1xuICAgICAgfSk7XG5cbiAgICAgIGhpc3RvcnlCbG9jay5pbm5lckhUTUwgPSBoaXN0b3J5VGl0bGUub3V0ZXJIVE1MICsgJyAnICsgaGlzdG9yeVVsLm91dGVySFRNTDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gSGlzdG9yeTtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gSGlzdG9yeTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklraHBjM1J2Y25rdWFuTWlYU3dpYm1GdFpYTWlPbHNpU0dsemRHOXllU0lzSW1WMlpXNTBRblZ6SWl3aVpXeGxiV1Z1ZENJc0ltaHBjM1J2Y25raUxDSnZia2hwYzNSdmNubEJaR1FpTENKaWFXNWtJaXdpYjI0aUxDSnNiMkZrU0dsemRHOXllVVp5YjIxVGRHOXlZV2RsSWl3aWJHOWpZV3hUZEc5eVlXZGxJaXdpYzNSdmNtRm5aU0lzSW5OaGRtVmtTR2x6ZEc5eWVTSXNJbWRsZEVsMFpXMGlMQ0pLVTA5T0lpd2ljR0Z5YzJVaUxDSnpaWFJKZEdWdElpd2ljM1J5YVc1bmFXWjVJaXdpWTJsMGVTSXNJbWx1WkdWNFQyWWlMQ0p6Y0d4cFkyVWlMQ0pzWlc1bmRHZ2lMQ0p3YjNBaUxDSjFibk5vYVdaMElpd2ljMkYyWlVocGMzUnZjbmxVYjFOMGIzSmhaMlVpTENKeVpXNWtaWEpJYVhOMGIzSjVJaXdpYUdsemRHOXllVUpzYjJOcklpd2laRzlqZFcxbGJuUWlMQ0p4ZFdWeWVWTmxiR1ZqZEc5eUlpd2lhR2x6ZEc5eWVWUnBkR3hsSWl3aVkzSmxZWFJsUld4bGJXVnVkQ0lzSW1sdWJtVnlTRlJOVENJc0ltaHBjM1J2Y25sVmJDSXNJbU5zWVhOelRHbHpkQ0lzSW1Ga1pDSXNJbTFoY0NJc0ltbDBaVzBpTENKdmRYUmxja2hVVFV3aVhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN096czdPenM3U1VGQlRVRXNUenRCUVVOS0xHMUNRVUZaUXl4UlFVRmFMRVZCUVhOQ1F5eFBRVUYwUWl4RlFVRXJRanRCUVVGQk96dEJRVU0zUWl4VFFVRkxSQ3hSUVVGTUxFZEJRV2RDUVN4UlFVRm9RanRCUVVOQkxGTkJRVXRETEU5QlFVd3NSMEZCWlVFc1QwRkJaanM3UVVGRlFTeFRRVUZMUXl4UFFVRk1MRWRCUVdVc1JVRkJaanM3UVVGRlFTeFRRVUZMUXl4WlFVRk1MRWRCUVc5Q0xFdEJRVXRCTEZsQlFVd3NRMEZCYTBKRExFbEJRV3hDTEVOQlFYVkNMRWxCUVhaQ0xFTkJRWEJDT3p0QlFVVkJMRk5CUVV0S0xGRkJRVXdzUTBGQlkwc3NSVUZCWkN4RFFVRnBRaXhoUVVGcVFpeEZRVUZuUXl4TFFVRkxSaXhaUVVGeVF6czdRVUZGUVN4VFFVRkxSeXh6UWtGQlRDeERRVUUwUWtNc1dVRkJOVUk3UVVGRFJEczdPenN5UTBGRmMwSkRMRThzUlVGQlV6dEJRVU01UWl4VlFVRk5ReXhsUVVGbFJDeFJRVUZSUlN4UFFVRlNMRU5CUVdkQ0xGVkJRV2hDTEVOQlFYSkNPMEZCUTBFc1YwRkJTMUlzVDBGQlRDeEhRVUZsVXl4TFFVRkxReXhMUVVGTUxFTkJRVmRJTEZsQlFWZ3NTMEZCTkVJc1JVRkJNME03UVVGRFJEczdPM2xEUVVWdlFrUXNUeXhGUVVGVE8wRkJRelZDUVN4alFVRlJTeXhQUVVGU0xFTkJRV2RDTEZWQlFXaENMRVZCUVRSQ1JpeExRVUZMUnl4VFFVRk1MRU5CUVdVc1MwRkJTMW9zVDBGQmNFSXNRMEZCTlVJN1FVRkRSRHM3TzJsRFFVVlpZU3hKTEVWQlFVMDdRVUZEYWtJc1ZVRkJTU3hMUVVGTFlpeFBRVUZNTEVOQlFXRXNRMEZCWWl4TlFVRnZRbUVzU1VGQmVFSXNSVUZCT0VJN1FVRkRPVUlzVlVGQlNTeExRVUZMWWl4UFFVRk1MRU5CUVdGakxFOUJRV0lzUTBGQmNVSkVMRWxCUVhKQ0xFbEJRVFpDTEVOQlFXcERMRVZCUVc5RE8wRkJRMnhETEdGQlFVdGlMRTlCUVV3c1EwRkJZV1VzVFVGQllpeERRVUZ2UWl4TFFVRkxaaXhQUVVGTUxFTkJRV0ZqTEU5QlFXSXNRMEZCY1VKRUxFbEJRWEpDTEVOQlFYQkNMRVZCUVdkRUxFTkJRV2hFTzBGQlEwUTdRVUZEUkN4VlFVRkpMRXRCUVV0aUxFOUJRVXdzUTBGQllXZENMRTFCUVdJc1IwRkJjMElzUTBGQk1VSXNSVUZCTmtJN1FVRkRNMElzWVVGQlMyaENMRTlCUVV3c1EwRkJZV2xDTEVkQlFXSTdRVUZEUkR0QlFVTkVMRmRCUVV0cVFpeFBRVUZNTEVOQlFXRnJRaXhQUVVGaUxFTkJRWEZDVEN4SlFVRnlRanM3UVVGRlFTeFhRVUZMVFN4dlFrRkJUQ3hEUVVFd1FtUXNXVUZCTVVJN1FVRkRRU3hYUVVGTFpTeGhRVUZNTzBGQlEwUTdPenR2UTBGRlpUdEJRVU5rTEZWQlFVMURMR1ZCUVdWRExGTkJRVk5ETEdGQlFWUXNRMEZCZFVJc1MwRkJTM2hDTEU5QlFUVkNMRU5CUVhKQ096dEJRVVZCTEZWQlFVMTVRaXhsUVVGbFJpeFRRVUZUUnl4aFFVRlVMRU5CUVhWQ0xFbEJRWFpDTEVOQlFYSkNPMEZCUTBGRUxHMUNRVUZoUlN4VFFVRmlMRWRCUVhsQ0xHMUNRVUY2UWpzN1FVRkZRU3hWUVVGTlF5eFpRVUZaVEN4VFFVRlRSeXhoUVVGVUxFTkJRWFZDTEVsQlFYWkNMRU5CUVd4Q08wRkJRMEZGTEdkQ1FVRlZReXhUUVVGV0xFTkJRVzlDUXl4SFFVRndRaXhEUVVGM1FpeFpRVUY0UWpzN1FVRkZRU3hYUVVGTE4wSXNUMEZCVEN4RFFVRmhPRUlzUjBGQllpeERRVUZwUWl4blFrRkJVVHRCUVVOMlFrZ3NhMEpCUVZWRUxGTkJRVllzYjBSQlFYRkZTeXhKUVVGeVJTeFZRVUU0UlVFc1NVRkJPVVU3UVVGRFJDeFBRVVpFT3p0QlFVbEJWaXh0UWtGQllVc3NVMEZCWWl4SFFVRTBRa1lzWVVGQllWRXNVMEZCZWtNc1UwRkJjMFJNTEZWQlFWVkxMRk5CUVdoRk8wRkJRMFE3T3pzN096dHJRa0ZIV1c1RExFOGlMQ0ptYVd4bElqb2lTR2x6ZEc5eWVTNXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSW1Oc1lYTnpJRWhwYzNSdmNua2dlMXh5WEc0Z0lHTnZibk4wY25WamRHOXlLR1YyWlc1MFFuVnpMQ0JsYkdWdFpXNTBLU0I3WEhKY2JpQWdJQ0IwYUdsekxtVjJaVzUwUW5WeklEMGdaWFpsYm5SQ2RYTTdYSEpjYmlBZ0lDQjBhR2x6TG1Wc1pXMWxiblFnUFNCbGJHVnRaVzUwTzF4eVhHNWNjbHh1SUNBZ0lIUm9hWE11YUdsemRHOXllU0E5SUZ0ZE8xeHlYRzVjY2x4dUlDQWdJSFJvYVhNdWIyNUlhWE4wYjNKNVFXUmtJRDBnZEdocGN5NXZia2hwYzNSdmNubEJaR1F1WW1sdVpDaDBhR2x6S1R0Y2NseHVYSEpjYmlBZ0lDQjBhR2x6TG1WMlpXNTBRblZ6TG05dUtDZG9hWE4wYjNKNU9tRmtaQ2NzSUhSb2FYTXViMjVJYVhOMGIzSjVRV1JrS1R0Y2NseHVYSEpjYmlBZ0lDQjBhR2x6TG14dllXUklhWE4wYjNKNVJuSnZiVk4wYjNKaFoyVW9iRzlqWVd4VGRHOXlZV2RsS1R0Y2NseHVJQ0I5WEhKY2JseHlYRzRnSUd4dllXUklhWE4wYjNKNVJuSnZiVk4wYjNKaFoyVW9jM1J2Y21GblpTa2dlMXh5WEc0Z0lDQWdZMjl1YzNRZ2MyRjJaV1JJYVhOMGIzSjVJRDBnYzNSdmNtRm5aUzVuWlhSSmRHVnRLQ2RtYjNKbFkyRnpkQ2NwTzF4eVhHNGdJQ0FnZEdocGN5NW9hWE4wYjNKNUlEMGdTbE5QVGk1d1lYSnpaU2h6WVhabFpFaHBjM1J2Y25rcElIeDhJRnRkTzF4eVhHNGdJSDFjY2x4dVhISmNiaUFnYzJGMlpVaHBjM1J2Y25sVWIxTjBiM0poWjJVb2MzUnZjbUZuWlNrZ2UxeHlYRzRnSUNBZ2MzUnZjbUZuWlM1elpYUkpkR1Z0S0NkbWIzSmxZMkZ6ZENjc0lFcFRUMDR1YzNSeWFXNW5hV1o1S0hSb2FYTXVhR2x6ZEc5eWVTa3BPMXh5WEc0Z0lIMWNjbHh1WEhKY2JpQWdiMjVJYVhOMGIzSjVRV1JrS0dOcGRIa3BJSHRjY2x4dUlDQWdJR2xtSUNoMGFHbHpMbWhwYzNSdmNubGJNRjBnUFQwOUlHTnBkSGtwSUhKbGRIVnlianRjY2x4dUlDQWdJR2xtSUNoMGFHbHpMbWhwYzNSdmNua3VhVzVrWlhoUFppaGphWFI1S1NBK0lEQXBJSHRjY2x4dUlDQWdJQ0FnZEdocGN5NW9hWE4wYjNKNUxuTndiR2xqWlNoMGFHbHpMbWhwYzNSdmNua3VhVzVrWlhoUFppaGphWFI1S1N3Z01TazdYSEpjYmlBZ0lDQjlYSEpjYmlBZ0lDQnBaaUFvZEdocGN5NW9hWE4wYjNKNUxteGxibWQwYUNBK0lEUXBJSHRjY2x4dUlDQWdJQ0FnZEdocGN5NW9hWE4wYjNKNUxuQnZjQ2dwTzF4eVhHNGdJQ0FnZlZ4eVhHNGdJQ0FnZEdocGN5NW9hWE4wYjNKNUxuVnVjMmhwWm5Rb1kybDBlU2s3WEhKY2JseHlYRzRnSUNBZ2RHaHBjeTV6WVhabFNHbHpkRzl5ZVZSdlUzUnZjbUZuWlNoc2IyTmhiRk4wYjNKaFoyVXBPMXh5WEc0Z0lDQWdkR2hwY3k1eVpXNWtaWEpJYVhOMGIzSjVLQ2s3WEhKY2JpQWdmVnh5WEc1Y2NseHVJQ0J5Wlc1a1pYSklhWE4wYjNKNUtDa2dlMXh5WEc0Z0lDQWdZMjl1YzNRZ2FHbHpkRzl5ZVVKc2IyTnJJRDBnWkc5amRXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNpaDBhR2x6TG1Wc1pXMWxiblFwTzF4eVhHNWNjbHh1SUNBZ0lHTnZibk4wSUdocGMzUnZjbmxVYVhSc1pTQTlJR1J2WTNWdFpXNTBMbU55WldGMFpVVnNaVzFsYm5Rb0oyZ3pKeWs3WEhKY2JpQWdJQ0JvYVhOMGIzSjVWR2wwYkdVdWFXNXVaWEpJVkUxTUlEMGdKMUpsYzJWdWRHeDVJSGRoZEdOb1pXUTZKenRjY2x4dVhISmNiaUFnSUNCamIyNXpkQ0JvYVhOMGIzSjVWV3dnUFNCa2IyTjFiV1Z1ZEM1amNtVmhkR1ZGYkdWdFpXNTBLQ2QxYkNjcE8xeHlYRzRnSUNBZ2FHbHpkRzl5ZVZWc0xtTnNZWE56VEdsemRDNWhaR1FvSjJ4cGMzUXRaM0p2ZFhBbktUdGNjbHh1WEhKY2JpQWdJQ0IwYUdsekxtaHBjM1J2Y25rdWJXRndLR2wwWlcwZ1BUNGdlMXh5WEc0Z0lDQWdJQ0JvYVhOMGIzSjVWV3d1YVc1dVpYSklWRTFNSUNzOUlHQThiR2tnWTJ4aGMzTTlYQ0pzYVhOMExXZHliM1Z3TFdsMFpXMWNJajQ4WVNCb2NtVm1QVndpSTJOcGRIazlKSHRwZEdWdGZWd2lQaVI3YVhSbGJYMDhMMkUrUEM5c2FUNWdPMXh5WEc0Z0lDQWdmU2s3WEhKY2JseHlYRzRnSUNBZ2FHbHpkRzl5ZVVKc2IyTnJMbWx1Ym1WeVNGUk5UQ0E5SUdBa2UyaHBjM1J2Y25sVWFYUnNaUzV2ZFhSbGNraFVUVXg5SUNSN2FHbHpkRzl5ZVZWc0xtOTFkR1Z5U0ZSTlRIMWdPMXh5WEc0Z0lIMWNjbHh1ZlZ4eVhHNWNjbHh1Wlhod2IzSjBJR1JsWm1GMWJIUWdTR2x6ZEc5eWVUdGNjbHh1SWwxOVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9jb21wb25lbnRzXFxcXEhpc3RvcnkuanNcIixcIi9jb21wb25lbnRzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgTWFwID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBNYXAoZXZlbnRCdXMsIGVsZW1lbnQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTWFwKTtcblxuICAgIHRoaXMuZXZlbnRCdXMgPSBldmVudEJ1cztcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgdGhpcy5tYXAgPSB7fTtcblxuICAgIHRoaXMuaGFuZGxlQ29vcmRpbmF0ZXNDaGFuZ2UgPSB0aGlzLmhhbmRsZUNvb3JkaW5hdGVzQ2hhbmdlLmJpbmQodGhpcyk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoTWFwLCBbe1xuICAgIGtleTogJ2hhbmRsZUNvb3JkaW5hdGVzQ2hhbmdlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlQ29vcmRpbmF0ZXNDaGFuZ2UoX3JlZikge1xuICAgICAgdmFyIGxhdCA9IF9yZWYubGF0LFxuICAgICAgICAgIGxuZyA9IF9yZWYubG5nO1xuXG4gICAgICB0aGlzLm1hcC5zZXRDZW50ZXIoW2xhdCwgbG5nXSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyTWFwJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyTWFwKGNvb3Jkcykge1xuICAgICAgdmFyIG1hcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5lbGVtZW50KTtcbiAgICAgIG1hcC5vdXRlckhUTUwgPSAnPGRpdiBpZD1cIm1hcFwiIHN0eWxlPVwid2lkdGg6IDEwMCU7IGhlaWdodDogNDAwcHhcIj48L2Rpdj4nO1xuXG4gICAgICB3aW5kb3cueW1hcHMucmVhZHkoaW5pdCk7XG4gICAgICB2YXIgbXlNYXA7XG5cbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgbXlNYXAgPSBuZXcgd2luZG93LnltYXBzLk1hcChcIm1hcFwiLCB7XG4gICAgICAgICAgY2VudGVyOiBjb29yZHMsXG4gICAgICAgICAgem9vbTogN1xuICAgICAgICB9KTtcblxuICAgICAgICBteU1hcC5ldmVudHMuYWRkKCdib3VuZHNjaGFuZ2UnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICB2YXIgbGF0ID0gZXZlbnQub3JpZ2luYWxFdmVudC5uZXdCb3VuZHNbMF1bMF07XG4gICAgICAgICAgdmFyIGxuZyA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQubmV3Qm91bmRzWzBdWzFdO1xuICAgICAgICAgIHNlbGYuZXZlbnRCdXMudHJpZ2dlcignY29vcmRpbmF0ZXM6Y2hhbmdlZCcsIHsgbGF0OiBsYXQsIGxuZzogbG5nIH0pO1xuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJ2Nvb3JkaW5hdGVzP2xhdD0nICsgbGF0ICsgJyZsbmc9JyArIGxuZztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gc2VsZi5tYXAgPSBteU1hcDtcbiAgICAgICAgLy8gc2VsZi5ldmVudEJ1cy5vbignY29vcmRpbmF0ZXM6Y2hhbmdlZCcsIHNlbGYuaGFuZGxlQ29vcmRpbmF0ZXNDaGFuZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBNYXA7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IE1hcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklrMWhjQzVxY3lKZExDSnVZVzFsY3lJNld5Sk5ZWEFpTENKbGRtVnVkRUoxY3lJc0ltVnNaVzFsYm5RaUxDSnRZWEFpTENKb1lXNWtiR1ZEYjI5eVpHbHVZWFJsYzBOb1lXNW5aU0lzSW1KcGJtUWlMQ0pzWVhRaUxDSnNibWNpTENKelpYUkRaVzUwWlhJaUxDSmpiMjl5WkhNaUxDSmtiMk4xYldWdWRDSXNJbkYxWlhKNVUyVnNaV04wYjNJaUxDSnZkWFJsY2toVVRVd2lMQ0ozYVc1a2IzY2lMQ0o1YldGd2N5SXNJbkpsWVdSNUlpd2lhVzVwZENJc0ltMTVUV0Z3SWl3aWMyVnNaaUlzSW1ObGJuUmxjaUlzSW5wdmIyMGlMQ0psZG1WdWRITWlMQ0poWkdRaUxDSmxkbVZ1ZENJc0ltOXlhV2RwYm1Gc1JYWmxiblFpTENKdVpYZENiM1Z1WkhNaUxDSjBjbWxuWjJWeUlpd2liRzlqWVhScGIyNGlMQ0pvWVhOb0lsMHNJbTFoY0hCcGJtZHpJam9pT3pzN096czdPenM3TzBsQlFVMUJMRWM3UVVGRFNpeGxRVUZaUXl4UlFVRmFMRVZCUVhOQ1F5eFBRVUYwUWl4RlFVRXJRanRCUVVGQk96dEJRVU0zUWl4VFFVRkxSQ3hSUVVGTUxFZEJRV2RDUVN4UlFVRm9RanRCUVVOQkxGTkJRVXRETEU5QlFVd3NSMEZCWlVFc1QwRkJaanM3UVVGRlFTeFRRVUZMUXl4SFFVRk1MRWRCUVZjc1JVRkJXRHM3UVVGRlFTeFRRVUZMUXl4MVFrRkJUQ3hIUVVFclFpeExRVUZMUVN4MVFrRkJUQ3hEUVVFMlFrTXNTVUZCTjBJc1EwRkJhME1zU1VGQmJFTXNRMEZCTDBJN1FVRkRSRHM3T3p0clJFRkZiVU03UVVGQlFTeFZRVUZZUXl4SFFVRlhMRkZCUVZoQkxFZEJRVmM3UVVGQlFTeFZRVUZPUXl4SFFVRk5MRkZCUVU1QkxFZEJRVTA3TzBGQlEyeERMRmRCUVV0S0xFZEJRVXdzUTBGQlUwc3NVMEZCVkN4RFFVRnRRaXhEUVVGRFJpeEhRVUZFTEVWQlFVMURMRWRCUVU0c1EwRkJia0k3UVVGRFJEczdPemhDUVVWVFJTeE5MRVZCUVZFN1FVRkRhRUlzVlVGQlRVNHNUVUZCVFU4c1UwRkJVME1zWVVGQlZDeERRVUYxUWl4TFFVRkxWQ3hQUVVFMVFpeERRVUZhTzBGQlEwRkRMRlZCUVVsVExGTkJRVW9zUjBGQlowSXNlVVJCUVdoQ096dEJRVVZCUXl4aFFVRlBReXhMUVVGUUxFTkJRV0ZETEV0QlFXSXNRMEZCYlVKRExFbEJRVzVDTzBGQlEwRXNWVUZCU1VNc1MwRkJTanM3UVVGRlFTeFZRVUZKUXl4UFFVRlBMRWxCUVZnN08wRkJSVUVzWlVGQlUwWXNTVUZCVkN4SFFVRm5RanRCUVVOa1F5eG5Ra0ZCVVN4SlFVRkpTaXhQUVVGUFF5eExRVUZRTEVOQlFXRmtMRWRCUVdwQ0xFTkJRWEZDTEV0QlFYSkNMRVZCUVRSQ08wRkJRMmhEYlVJc2EwSkJRVkZXTEUxQlJIZENPMEZCUldoRFZ5eG5Ra0ZCVFR0QlFVWXdRaXhUUVVFMVFpeERRVUZTT3p0QlFVdEJTQ3hqUVVGTlNTeE5RVUZPTEVOQlFXRkRMRWRCUVdJc1EwRkJhVUlzWTBGQmFrSXNSVUZCYVVNc1ZVRkJRME1zUzBGQlJDeEZRVUZYTzBGQlF6RkRMR05CUVVscVFpeE5RVUZOYVVJc1RVRkJUVU1zWVVGQlRpeERRVUZ2UWtNc1UwRkJjRUlzUTBGQk9FSXNRMEZCT1VJc1JVRkJhVU1zUTBGQmFrTXNRMEZCVmp0QlFVTkJMR05CUVVsc1FpeE5RVUZOWjBJc1RVRkJUVU1zWVVGQlRpeERRVUZ2UWtNc1UwRkJjRUlzUTBGQk9FSXNRMEZCT1VJc1JVRkJhVU1zUTBGQmFrTXNRMEZCVmp0QlFVTkJVQ3hsUVVGTGFrSXNVVUZCVEN4RFFVRmplVUlzVDBGQlpDeERRVUZ6UWl4eFFrRkJkRUlzUlVGQk5rTXNSVUZCUTNCQ0xGRkJRVVFzUlVGQlRVTXNVVUZCVGl4RlFVRTNRenRCUVVOQlRTeHBRa0ZCVDJNc1VVRkJVQ3hEUVVGblFrTXNTVUZCYUVJc2QwSkJRVEJEZEVJc1IwRkJNVU1zWVVGQmNVUkRMRWRCUVhKRU8wRkJRMFFzVTBGTVJEczdRVUZQUVR0QlFVTkJPMEZCUTBRN1FVRkRSanM3T3pzN08ydENRVWRaVUN4SElpd2labWxzWlNJNklrMWhjQzVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYkltTnNZWE56SUUxaGNDQjdYSEpjYmlBZ1kyOXVjM1J5ZFdOMGIzSW9aWFpsYm5SQ2RYTXNJR1ZzWlcxbGJuUXBJSHRjY2x4dUlDQWdJSFJvYVhNdVpYWmxiblJDZFhNZ1BTQmxkbVZ1ZEVKMWN6dGNjbHh1SUNBZ0lIUm9hWE11Wld4bGJXVnVkQ0E5SUdWc1pXMWxiblE3WEhKY2JseHlYRzRnSUNBZ2RHaHBjeTV0WVhBZ1BTQjdmVHRjY2x4dVhISmNiaUFnSUNCMGFHbHpMbWhoYm1Sc1pVTnZiM0prYVc1aGRHVnpRMmhoYm1kbElEMGdkR2hwY3k1b1lXNWtiR1ZEYjI5eVpHbHVZWFJsYzBOb1lXNW5aUzVpYVc1a0tIUm9hWE1wTzF4eVhHNGdJSDFjY2x4dVhISmNiaUFnYUdGdVpHeGxRMjl2Y21ScGJtRjBaWE5EYUdGdVoyVW9lMnhoZEN3Z2JHNW5mU2tnZTF4eVhHNGdJQ0FnZEdocGN5NXRZWEF1YzJWMFEyVnVkR1Z5S0Z0c1lYUXNJR3h1WjEwcE8xeHlYRzRnSUgxY2NseHVYSEpjYmlBZ2NtVnVaR1Z5VFdGd0tHTnZiM0prY3lrZ2UxeHlYRzRnSUNBZ1kyOXVjM1FnYldGd0lEMGdaRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2loMGFHbHpMbVZzWlcxbGJuUXBPMXh5WEc0Z0lDQWdiV0Z3TG05MWRHVnlTRlJOVENBOUlDYzhaR2wySUdsa1BWd2liV0Z3WENJZ2MzUjViR1U5WENKM2FXUjBhRG9nTVRBd0pUc2dhR1ZwWjJoME9pQTBNREJ3ZUZ3aVBqd3ZaR2wyUGljN1hISmNibHh5WEc0Z0lDQWdkMmx1Wkc5M0xubHRZWEJ6TG5KbFlXUjVLR2x1YVhRcE8xeHlYRzRnSUNBZ2RtRnlJRzE1VFdGd08xeHlYRzVjY2x4dUlDQWdJR3hsZENCelpXeG1JRDBnZEdocGN6dGNjbHh1WEhKY2JpQWdJQ0JtZFc1amRHbHZiaUJwYm1sMEtDa2dlMXh5WEc0Z0lDQWdJQ0J0ZVUxaGNDQTlJRzVsZHlCM2FXNWtiM2N1ZVcxaGNITXVUV0Z3S0Z3aWJXRndYQ0lzSUh0Y2NseHVJQ0FnSUNBZ0lDQWdJR05sYm5SbGNqb2dZMjl2Y21SekxGeHlYRzRnSUNBZ0lDQWdJQ0FnZW05dmJUb2dOMXh5WEc0Z0lDQWdJQ0I5S1R0Y2NseHVYSEpjYmlBZ0lDQWdJRzE1VFdGd0xtVjJaVzUwY3k1aFpHUW9KMkp2ZFc1a2MyTm9ZVzVuWlNjc0lDaGxkbVZ1ZENrZ1BUNGdlMXh5WEc0Z0lDQWdJQ0FnSUd4bGRDQnNZWFFnUFNCbGRtVnVkQzV2Y21sbmFXNWhiRVYyWlc1MExtNWxkMEp2ZFc1a2Mxc3dYVnN3WFR0Y2NseHVJQ0FnSUNBZ0lDQnNaWFFnYkc1bklEMGdaWFpsYm5RdWIzSnBaMmx1WVd4RmRtVnVkQzV1WlhkQ2IzVnVaSE5iTUYxYk1WMDdYSEpjYmlBZ0lDQWdJQ0FnYzJWc1ppNWxkbVZ1ZEVKMWN5NTBjbWxuWjJWeUtDZGpiMjl5WkdsdVlYUmxjenBqYUdGdVoyVmtKeXdnZTJ4aGRDd2diRzVuZlNrN1hISmNiaUFnSUNBZ0lDQWdkMmx1Wkc5M0xteHZZMkYwYVc5dUxtaGhjMmdnUFNCZ1kyOXZjbVJwYm1GMFpYTS9iR0YwUFNSN2JHRjBmU1pzYm1jOUpIdHNibWQ5WUZ4eVhHNGdJQ0FnSUNCOUtUdGNjbHh1WEhKY2JpQWdJQ0FnSUM4dklITmxiR1l1YldGd0lEMGdiWGxOWVhBN1hISmNiaUFnSUNBZ0lDOHZJSE5sYkdZdVpYWmxiblJDZFhNdWIyNG9KMk52YjNKa2FXNWhkR1Z6T21Ob1lXNW5aV1FuTENCelpXeG1MbWhoYm1Sc1pVTnZiM0prYVc1aGRHVnpRMmhoYm1kbEtUdGNjbHh1SUNBZ0lIMWNjbHh1SUNCOVhISmNibjFjY2x4dVhISmNibVY0Y0c5eWRDQmtaV1poZFd4MElFMWhjRHRjY2x4dUlsMTlcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvY29tcG9uZW50c1xcXFxNYXAuanNcIixcIi9jb21wb25lbnRzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBNZW51ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBNZW51KGVsZW1lbnQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTWVudSk7XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKE1lbnUsIFt7XG4gICAga2V5OiBcInJlbmRlck1lbnVcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyTWVudSgpIHtcbiAgICAgIHZhciBtZW51QmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZWxlbWVudCk7XG5cbiAgICAgIG1lbnVCbG9jay5vdXRlckhUTUwgPSBcIlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcIm1lbnVcXFwiPlxcbiAgICAgICAgPHVsPlxcbiAgICAgICAgICA8bGk+PGEgaHJlZj1cXFwiI1xcXCI+SG9tZTwvYT48L2xpPlxcbiAgICAgICAgICA8bGk+PGEgaHJlZj1cXFwiI2Fib3V0XFxcIj5BYm91dDwvYT48L2xpPlxcbiAgICAgICAgPC91bD5cXG4gICAgICA8L2Rpdj5cXG4gICAgXCI7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIE1lbnU7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IE1lbnU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJazFsYm5VdWFuTWlYU3dpYm1GdFpYTWlPbHNpVFdWdWRTSXNJbVZzWlcxbGJuUWlMQ0p0Wlc1MVFteHZZMnNpTENKa2IyTjFiV1Z1ZENJc0luRjFaWEo1VTJWc1pXTjBiM0lpTENKdmRYUmxja2hVVFV3aVhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN096czdPenM3U1VGQlRVRXNTVHRCUVVOS0xHZENRVUZaUXl4UFFVRmFMRVZCUVhGQ08wRkJRVUU3TzBGQlEyNUNMRk5CUVV0QkxFOUJRVXdzUjBGQlpVRXNUMEZCWmp0QlFVTkVPenM3TzJsRFFVVlpPMEZCUTFnc1ZVRkJUVU1zV1VGQldVTXNVMEZCVTBNc1lVRkJWQ3hEUVVGMVFpeExRVUZMU0N4UFFVRTFRaXhEUVVGc1FqczdRVUZGUVVNc1owSkJRVlZITEZOQlFWWTdRVUZSUkRzN096czdPMnRDUVVkWlRDeEpJaXdpWm1sc1pTSTZJazFsYm5VdWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUpqYkdGemN5Qk5aVzUxSUh0Y2NseHVJQ0JqYjI1emRISjFZM1J2Y2lobGJHVnRaVzUwS1NCN1hISmNiaUFnSUNCMGFHbHpMbVZzWlcxbGJuUWdQU0JsYkdWdFpXNTBPMXh5WEc0Z0lIMWNjbHh1WEhKY2JpQWdjbVZ1WkdWeVRXVnVkU2dwSUh0Y2NseHVJQ0FnSUdOdmJuTjBJRzFsYm5WQ2JHOWpheUE5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9kR2hwY3k1bGJHVnRaVzUwS1R0Y2NseHVYSEpjYmlBZ0lDQnRaVzUxUW14dlkyc3ViM1YwWlhKSVZFMU1JRDBnWUZ4eVhHNGdJQ0FnSUNBOFpHbDJJR05zWVhOelBWd2liV1Z1ZFZ3aVBseHlYRzRnSUNBZ0lDQWdJRHgxYkQ1Y2NseHVJQ0FnSUNBZ0lDQWdJRHhzYVQ0OFlTQm9jbVZtUFZ3aUkxd2lQa2h2YldVOEwyRStQQzlzYVQ1Y2NseHVJQ0FnSUNBZ0lDQWdJRHhzYVQ0OFlTQm9jbVZtUFZ3aUkyRmliM1YwWENJK1FXSnZkWFE4TDJFK1BDOXNhVDVjY2x4dUlDQWdJQ0FnSUNBOEwzVnNQbHh5WEc0Z0lDQWdJQ0E4TDJScGRqNWNjbHh1SUNBZ0lHQmNjbHh1SUNCOVhISmNibjFjY2x4dVhISmNibVY0Y0c5eWRDQmtaV1poZFd4MElFMWxiblU3WEhKY2JpSmRmUT09XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL2NvbXBvbmVudHNcXFxcTWVudS5qc1wiLFwiL2NvbXBvbmVudHNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBTZWFyY2ggPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFNlYXJjaChldmVudEJ1cywgZWxlbWVudCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTZWFyY2gpO1xuXG4gICAgdGhpcy5ldmVudEJ1cyA9IGV2ZW50QnVzO1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICB0aGlzLmhhbmRsZVN1Ym1pdCA9IHRoaXMuaGFuZGxlU3VibWl0LmJpbmQodGhpcyk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoU2VhcmNoLCBbe1xuICAgIGtleTogJ2hhbmRsZVN1Ym1pdCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHZhciBpbnB1dFNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlciAuc2VhcmNoIGlucHV0Jyk7XG4gICAgICB2YXIgdmFsdWUgPSBpbnB1dFNlYXJjaC52YWx1ZTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJ2NpdHk9JyArIHZhbHVlO1xuICAgICAgaW5wdXRTZWFyY2guaW5uZXJIVE1MID0gJyc7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyU2VhcmNoJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyU2VhcmNoKCkge1xuICAgICAgdmFyIHNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5lbGVtZW50KTtcblxuICAgICAgc2VhcmNoLm91dGVySFRNTCA9ICdcXG4gICAgICA8ZGl2IGNsYXNzPVwic2VhcmNoXCI+XFxuICAgICAgICA8Zm9ybT5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGNvbC1tZC04XCI+XFxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgYSBjaXR5Li4uXCIgYXV0b2ZvY3VzPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtNFwiPlxcbiAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidG4gYnRuLXdhcm5pbmdcIj5HZXQgZm9yZWNhc3QhPC9idXR0b24+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9mb3JtPlxcbiAgICAgIDwvZGl2PlxcbiAgICAnO1xuXG4gICAgICB2YXIgZm9ybVNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5lbGVtZW50ICsgJyBmb3JtJyk7XG4gICAgICBmb3JtU2VhcmNoLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuaGFuZGxlU3VibWl0KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gU2VhcmNoO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBTZWFyY2g7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbE5sWVhKamFDNXFjeUpkTENKdVlXMWxjeUk2V3lKVFpXRnlZMmdpTENKbGRtVnVkRUoxY3lJc0ltVnNaVzFsYm5RaUxDSm9ZVzVrYkdWVGRXSnRhWFFpTENKaWFXNWtJaXdpWlhabGJuUWlMQ0p3Y21WMlpXNTBSR1ZtWVhWc2RDSXNJbWx1Y0hWMFUyVmhjbU5vSWl3aVpHOWpkVzFsYm5RaUxDSnhkV1Z5ZVZObGJHVmpkRzl5SWl3aWRtRnNkV1VpTENKM2FXNWtiM2NpTENKc2IyTmhkR2x2YmlJc0ltaGhjMmdpTENKcGJtNWxja2hVVFV3aUxDSnpaV0Z5WTJnaUxDSnZkWFJsY2toVVRVd2lMQ0ptYjNKdFUyVmhjbU5vSWl3aVlXUmtSWFpsYm5STWFYTjBaVzVsY2lKZExDSnRZWEJ3YVc1bmN5STZJanM3T3pzN096czdPenRKUVVGTlFTeE5PMEZCUTBvc2EwSkJRVmxETEZGQlFWb3NSVUZCYzBKRExFOUJRWFJDTEVWQlFTdENPMEZCUVVFN08wRkJRemRDTEZOQlFVdEVMRkZCUVV3c1IwRkJaMEpCTEZGQlFXaENPMEZCUTBFc1UwRkJTME1zVDBGQlRDeEhRVUZsUVN4UFFVRm1PenRCUVVWQkxGTkJRVXRETEZsQlFVd3NSMEZCYjBJc1MwRkJTMEVzV1VGQlRDeERRVUZyUWtNc1NVRkJiRUlzUTBGQmRVSXNTVUZCZGtJc1EwRkJjRUk3UVVGRFJEczdPenRwUTBGRldVTXNTeXhGUVVGUE8wRkJRMnhDUVN4WlFVRk5ReXhqUVVGT08wRkJRMEVzVlVGQlRVTXNZMEZCWTBNc1UwRkJVME1zWVVGQlZDeERRVUYxUWl4elFrRkJka0lzUTBGQmNFSTdRVUZEUVN4VlFVRk5ReXhSUVVGUlNDeFpRVUZaUnl4TFFVRXhRanRCUVVOQlF5eGhRVUZQUXl4UlFVRlFMRU5CUVdkQ1F5eEpRVUZvUWl4aFFVRXJRa2dzUzBGQkwwSTdRVUZEUVVnc2EwSkJRVmxQTEZOQlFWb3NSMEZCZDBJc1JVRkJlRUk3UVVGRFJEczdPMjFEUVVWak8wRkJRMklzVlVGQlRVTXNVMEZCVTFBc1UwRkJVME1zWVVGQlZDeERRVUYxUWl4TFFVRkxVQ3hQUVVFMVFpeERRVUZtT3p0QlFVVkJZU3hoUVVGUFF5eFRRVUZRT3p0QlFXVkJMRlZCUVUxRExHRkJRV0ZVTEZOQlFWTkRMR0ZCUVZRc1EwRkJNRUlzUzBGQlMxQXNUMEZCTDBJc1YwRkJia0k3UVVGRFFXVXNhVUpCUVZkRExHZENRVUZZTEVOQlFUUkNMRkZCUVRWQ0xFVkJRWE5ETEV0QlFVdG1MRmxCUVRORE8wRkJRMFE3T3pzN096dHJRa0ZIV1Vnc1RTSXNJbVpwYkdVaU9pSlRaV0Z5WTJndWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUpqYkdGemN5QlRaV0Z5WTJnZ2UxeHlYRzRnSUdOdmJuTjBjblZqZEc5eUtHVjJaVzUwUW5WekxDQmxiR1Z0Wlc1MEtTQjdYSEpjYmlBZ0lDQjBhR2x6TG1WMlpXNTBRblZ6SUQwZ1pYWmxiblJDZFhNN1hISmNiaUFnSUNCMGFHbHpMbVZzWlcxbGJuUWdQU0JsYkdWdFpXNTBPMXh5WEc1Y2NseHVJQ0FnSUhSb2FYTXVhR0Z1Wkd4bFUzVmliV2wwSUQwZ2RHaHBjeTVvWVc1a2JHVlRkV0p0YVhRdVltbHVaQ2gwYUdsektUdGNjbHh1SUNCOVhISmNibHh5WEc0Z0lHaGhibVJzWlZOMVltMXBkQ2hsZG1WdWRDa2dlMXh5WEc0Z0lDQWdaWFpsYm5RdWNISmxkbVZ1ZEVSbFptRjFiSFFvS1R0Y2NseHVJQ0FnSUdOdmJuTjBJR2x1Y0hWMFUyVmhjbU5vSUQwZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWduYUdWaFpHVnlJQzV6WldGeVkyZ2dhVzV3ZFhRbktUdGNjbHh1SUNBZ0lHTnZibk4wSUhaaGJIVmxJRDBnYVc1d2RYUlRaV0Z5WTJndWRtRnNkV1U3WEhKY2JpQWdJQ0IzYVc1a2IzY3ViRzlqWVhScGIyNHVhR0Z6YUNBOUlHQmphWFI1UFNSN2RtRnNkV1Y5WUR0Y2NseHVJQ0FnSUdsdWNIVjBVMlZoY21Ob0xtbHVibVZ5U0ZSTlRDQTlJQ2NuTzF4eVhHNGdJSDFjY2x4dVhISmNiaUFnY21WdVpHVnlVMlZoY21Ob0tDa2dlMXh5WEc0Z0lDQWdZMjl1YzNRZ2MyVmhjbU5vSUQwZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWgwYUdsekxtVnNaVzFsYm5RcE8xeHlYRzVjY2x4dUlDQWdJSE5sWVhKamFDNXZkWFJsY2toVVRVd2dQU0JnWEhKY2JpQWdJQ0FnSUR4a2FYWWdZMnhoYzNNOVhDSnpaV0Z5WTJoY0lqNWNjbHh1SUNBZ0lDQWdJQ0E4Wm05eWJUNWNjbHh1SUNBZ0lDQWdJQ0FnSUR4a2FYWWdZMnhoYzNNOVhDSnliM2RjSWo1Y2NseHVJQ0FnSUNBZ0lDQWdJQ0FnUEdScGRpQmpiR0Z6Y3oxY0ltWnZjbTB0WjNKdmRYQWdZMjlzTFcxa0xUaGNJajVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0E4YVc1d2RYUWdkSGx3WlQxY0luUmxlSFJjSWlCamJHRnpjejFjSW1admNtMHRZMjl1ZEhKdmJGd2lJSEJzWVdObGFHOXNaR1Z5UFZ3aVJXNTBaWElnWVNCamFYUjVMaTR1WENJZ1lYVjBiMlp2WTNWelBseHlYRzRnSUNBZ0lDQWdJQ0FnSUNBOEwyUnBkajVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdQR1JwZGlCamJHRnpjejFjSW1OdmJDMXRaQzAwWENJK1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ1BHSjFkSFJ2YmlCMGVYQmxQVndpYzNWaWJXbDBYQ0lnWTJ4aGMzTTlYQ0ppZEc0Z1luUnVMWGRoY201cGJtZGNJajVIWlhRZ1ptOXlaV05oYzNRaFBDOWlkWFIwYjI0K1hISmNiaUFnSUNBZ0lDQWdJQ0FnSUR3dlpHbDJQbHh5WEc0Z0lDQWdJQ0FnSUNBZ1BDOWthWFkrWEhKY2JpQWdJQ0FnSUNBZ1BDOW1iM0p0UGx4eVhHNGdJQ0FnSUNBOEwyUnBkajVjY2x4dUlDQWdJR0JjY2x4dVhISmNiaUFnSUNCamIyNXpkQ0JtYjNKdFUyVmhjbU5vSUQwZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWhnSkh0MGFHbHpMbVZzWlcxbGJuUjlJR1p2Y20xZ0tUdGNjbHh1SUNBZ0lHWnZjbTFUWldGeVkyZ3VZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25jM1ZpYldsMEp5d2dkR2hwY3k1b1lXNWtiR1ZUZFdKdGFYUXBPMXh5WEc0Z0lIMWNjbHh1ZlZ4eVhHNWNjbHh1Wlhod2IzSjBJR1JsWm1GMWJIUWdVMlZoY21Ob08xeHlYRzRpWFgwPVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9jb21wb25lbnRzXFxcXFNlYXJjaC5qc1wiLFwiL2NvbXBvbmVudHNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfaGVscGVycyA9IHJlcXVpcmUoJy4uL3V0aWxzL2hlbHBlcnMnKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIFN0YXIgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFN0YXIoZXZlbnRCdXMsIGVsZW1lbnQpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU3Rhcik7XG5cbiAgICB0aGlzLmV2ZW50QnVzID0gZXZlbnRCdXM7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblxuICAgIHRoaXMuaGFuZGxlU3RhckNsaWNrID0gdGhpcy5oYW5kbGVTdGFyQ2xpY2suYmluZCh0aGlzKTtcbiAgICB0aGlzLmhhbmRsZUZhdm9yaXRlc0FjdGl2ZSA9IHRoaXMuaGFuZGxlRmF2b3JpdGVzQWN0aXZlLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLmV2ZW50QnVzLm9uKCdzdGFyOmlzLWFjdGl2ZScsIHRoaXMuaGFuZGxlRmF2b3JpdGVzQWN0aXZlKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhTdGFyLCBbe1xuICAgIGtleTogJ2hhbmRsZUZhdm9yaXRlc0FjdGl2ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUZhdm9yaXRlc0FjdGl2ZShpc0FjdGl2ZSkge1xuICAgICAgdmFyIHN0YXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZWxlbWVudCArICcgc3BhbicpO1xuXG4gICAgICBpZiAoaXNBY3RpdmUpIHtcbiAgICAgICAgc3Rhci5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnaGFuZGxlU3RhckNsaWNrJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlU3RhckNsaWNrKCkge1xuICAgICAgdmFyIHN0YXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZWxlbWVudCArICcgc3BhbicpO1xuXG4gICAgICB2YXIgX2dldFVybEhhc2hQYXJhbXMgPSAoMCwgX2hlbHBlcnMuZ2V0VXJsSGFzaFBhcmFtcykoKSxcbiAgICAgICAgICBsYXQgPSBfZ2V0VXJsSGFzaFBhcmFtcy5sYXQsXG4gICAgICAgICAgbG5nID0gX2dldFVybEhhc2hQYXJhbXMubG5nO1xuXG4gICAgICBpZiAoc3Rhci5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XG4gICAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcignZmF2b3JpdGVzOnJlbW92ZScsIHsgbGF0OiBsYXQsIGxuZzogbG5nIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKCdmYXZvcml0ZXM6YWRkJywgeyBsYXQ6IGxhdCwgbG5nOiBsbmcgfSk7XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyU3RhcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlclN0YXIoKSB7XG4gICAgICB2YXIgc3RhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5lbGVtZW50KTtcbiAgICAgIHN0YXIuaW5uZXJIVE1MID0gJzxoNT5BZGQgdGhpcyB0byB5b3VyIGZhdm9yaXRlcyE8L2g1Pic7XG4gICAgICBzdGFyLmlubmVySFRNTCArPSAnPHNwYW4+PC9zcGFuPic7XG4gICAgICBzdGFyLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlU3RhckNsaWNrKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gU3Rhcjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU3Rhcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklsTjBZWEl1YW5NaVhTd2libUZ0WlhNaU9sc2lVM1JoY2lJc0ltVjJaVzUwUW5Weklpd2laV3hsYldWdWRDSXNJbWhoYm1Sc1pWTjBZWEpEYkdsamF5SXNJbUpwYm1RaUxDSm9ZVzVrYkdWR1lYWnZjbWwwWlhOQlkzUnBkbVVpTENKdmJpSXNJbWx6UVdOMGFYWmxJaXdpYzNSaGNpSXNJbVJ2WTNWdFpXNTBJaXdpY1hWbGNubFRaV3hsWTNSdmNpSXNJbU5zWVhOelRHbHpkQ0lzSW1Ga1pDSXNJbkpsYlc5MlpTSXNJbXhoZENJc0lteHVaeUlzSW1OdmJuUmhhVzV6SWl3aWRISnBaMmRsY2lJc0ltbHVibVZ5U0ZSTlRDSXNJbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSWlYU3dpYldGd2NHbHVaM01pT2lJN096czdPenM3TzBGQlFVRTdPenM3U1VGSFRVRXNTVHRCUVVOS0xHZENRVUZaUXl4UlFVRmFMRVZCUVhOQ1F5eFBRVUYwUWl4RlFVRXJRanRCUVVGQk96dEJRVU0zUWl4VFFVRkxSQ3hSUVVGTUxFZEJRV2RDUVN4UlFVRm9RanRCUVVOQkxGTkJRVXRETEU5QlFVd3NSMEZCWlVFc1QwRkJaanM3UVVGRlFTeFRRVUZMUXl4bFFVRk1MRWRCUVhWQ0xFdEJRVXRCTEdWQlFVd3NRMEZCY1VKRExFbEJRWEpDTEVOQlFUQkNMRWxCUVRGQ0xFTkJRWFpDTzBGQlEwRXNVMEZCUzBNc2NVSkJRVXdzUjBGQk5rSXNTMEZCUzBFc2NVSkJRVXdzUTBGQk1rSkVMRWxCUVROQ0xFTkJRV2RETEVsQlFXaERMRU5CUVRkQ096dEJRVVZCTEZOQlFVdElMRkZCUVV3c1EwRkJZMHNzUlVGQlpDeERRVUZwUWl4blFrRkJha0lzUlVGQmJVTXNTMEZCUzBRc2NVSkJRWGhETzBGQlEwUTdPenM3TUVOQlJYRkNSU3hSTEVWQlFWVTdRVUZET1VJc1ZVRkJUVU1zVDBGQlQwTXNVMEZCVTBNc1lVRkJWQ3hEUVVGMVFpeExRVUZMVWl4UFFVRk1MRWRCUVdVc1QwRkJkRU1zUTBGQllqczdRVUZGUVN4VlFVRkpTeXhSUVVGS0xFVkJRV003UVVGRFdrTXNZVUZCUzBjc1UwRkJUQ3hEUVVGbFF5eEhRVUZtTEVOQlFXMUNMRkZCUVc1Q08wRkJRMFFzVDBGR1JDeE5RVVZQTzBGQlEweEtMR0ZCUVV0SExGTkJRVXdzUTBGQlpVVXNUVUZCWml4RFFVRnpRaXhSUVVGMFFqdEJRVU5FTzBGQlEwWTdPenR6UTBGRmFVSTdRVUZEYWtJc1ZVRkJUVXdzVDBGQlQwTXNVMEZCVTBNc1lVRkJWQ3hEUVVGMVFpeExRVUZMVWl4UFFVRk1MRWRCUVdVc1QwRkJkRU1zUTBGQllqczdRVUZFYVVJc09FSkJSMGtzWjBOQlNFbzdRVUZCUVN4VlFVZFVXU3hIUVVoVExIRkNRVWRVUVN4SFFVaFRPMEZCUVVFc1ZVRkhTa01zUjBGSVNTeHhRa0ZIU2tFc1IwRklTVHM3UVVGTGFrSXNWVUZCU1ZBc1MwRkJTMGNzVTBGQlRDeERRVUZsU3l4UlFVRm1MRU5CUVhkQ0xGRkJRWGhDTEVOQlFVb3NSVUZCZFVNN1FVRkRja01zWVVGQlMyWXNVVUZCVEN4RFFVRmpaMElzVDBGQlpDeERRVUZ6UWl4clFrRkJkRUlzUlVGQk1FTXNSVUZCUTBnc1VVRkJSQ3hGUVVGTlF5eFJRVUZPTEVWQlFURkRPMEZCUTBRc1QwRkdSQ3hOUVVWUE8wRkJRMHdzWVVGQlMyUXNVVUZCVEN4RFFVRmpaMElzVDBGQlpDeERRVUZ6UWl4bFFVRjBRaXhGUVVGMVF5eEZRVUZEU0N4UlFVRkVMRVZCUVUxRExGRkJRVTRzUlVGQmRrTTdRVUZEUkR0QlFVTkVPenM3YVVOQlJWazdRVUZEV0N4VlFVRk5VQ3hQUVVGUFF5eFRRVUZUUXl4aFFVRlVMRU5CUVhWQ0xFdEJRVXRTTEU5QlFUVkNMRU5CUVdJN1FVRkRRVTBzVjBGQlMxVXNVMEZCVEN4SFFVRnBRaXh6UTBGQmFrSTdRVUZEUVZZc1YwRkJTMVVzVTBGQlRDeEpRVUZyUWl4bFFVRnNRanRCUVVOQlZpeFhRVUZMUlN4aFFVRk1MRU5CUVcxQ0xFMUJRVzVDTEVWQlFUSkNVeXhuUWtGQk0wSXNRMEZCTkVNc1QwRkJOVU1zUlVGQmNVUXNTMEZCUzJoQ0xHVkJRVEZFTzBGQlEwUTdPenM3T3p0clFrRkhXVWdzU1NJc0ltWnBiR1VpT2lKVGRHRnlMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaWFXMXdiM0owSUhzZ1oyVjBWWEpzU0dGemFGQmhjbUZ0Y3lCOUlHWnliMjBnSnk0dUwzVjBhV3h6TDJobGJIQmxjbk1uTzF4eVhHNWNjbHh1WEhKY2JtTnNZWE56SUZOMFlYSWdlMXh5WEc0Z0lHTnZibk4wY25WamRHOXlLR1YyWlc1MFFuVnpMQ0JsYkdWdFpXNTBLU0I3WEhKY2JpQWdJQ0IwYUdsekxtVjJaVzUwUW5WeklEMGdaWFpsYm5SQ2RYTTdYSEpjYmlBZ0lDQjBhR2x6TG1Wc1pXMWxiblFnUFNCbGJHVnRaVzUwTzF4eVhHNWNjbHh1SUNBZ0lIUm9hWE11YUdGdVpHeGxVM1JoY2tOc2FXTnJJRDBnZEdocGN5NW9ZVzVrYkdWVGRHRnlRMnhwWTJzdVltbHVaQ2gwYUdsektUdGNjbHh1SUNBZ0lIUm9hWE11YUdGdVpHeGxSbUYyYjNKcGRHVnpRV04wYVhabElEMGdkR2hwY3k1b1lXNWtiR1ZHWVhadmNtbDBaWE5CWTNScGRtVXVZbWx1WkNoMGFHbHpLVHRjY2x4dVhISmNiaUFnSUNCMGFHbHpMbVYyWlc1MFFuVnpMbTl1S0NkemRHRnlPbWx6TFdGamRHbDJaU2NzSUhSb2FYTXVhR0Z1Wkd4bFJtRjJiM0pwZEdWelFXTjBhWFpsS1R0Y2NseHVJQ0I5WEhKY2JseHlYRzRnSUdoaGJtUnNaVVpoZG05eWFYUmxjMEZqZEdsMlpTaHBjMEZqZEdsMlpTa2dlMXh5WEc0Z0lDQWdZMjl1YzNRZ2MzUmhjaUE5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9kR2hwY3k1bGJHVnRaVzUwSUNzZ0p5QnpjR0Z1SnlrN1hISmNibHh5WEc0Z0lDQWdhV1lnS0dselFXTjBhWFpsS1NCN1hISmNiaUFnSUNBZ0lITjBZWEl1WTJ4aGMzTk1hWE4wTG1Ga1pDZ25ZV04wYVhabEp5azdYSEpjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHlYRzRnSUNBZ0lDQnpkR0Z5TG1Oc1lYTnpUR2x6ZEM1eVpXMXZkbVVvSjJGamRHbDJaU2NwTzF4eVhHNGdJQ0FnZlZ4eVhHNGdJSDFjY2x4dVhISmNiaUFnYUdGdVpHeGxVM1JoY2tOc2FXTnJLQ2tnZTF4eVhHNGdJQ0JqYjI1emRDQnpkR0Z5SUQwZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWgwYUdsekxtVnNaVzFsYm5RZ0t5QW5JSE53WVc0bktUdGNjbHh1WEhKY2JpQWdJR052Ym5OMElIc2diR0YwTENCc2JtY2dmU0E5SUdkbGRGVnliRWhoYzJoUVlYSmhiWE1vS1R0Y2NseHVYSEpjYmlBZ0lHbG1JQ2h6ZEdGeUxtTnNZWE56VEdsemRDNWpiMjUwWVdsdWN5Z25ZV04wYVhabEp5a3BJSHRjY2x4dUlDQWdJQ0IwYUdsekxtVjJaVzUwUW5WekxuUnlhV2RuWlhJb0oyWmhkbTl5YVhSbGN6cHlaVzF2ZG1VbkxDQjdiR0YwTENCc2JtZDlLVHRjY2x4dUlDQWdmU0JsYkhObElIdGNjbHh1SUNBZ0lDQjBhR2x6TG1WMlpXNTBRblZ6TG5SeWFXZG5aWElvSjJaaGRtOXlhWFJsY3pwaFpHUW5MQ0I3YkdGMExDQnNibWQ5S1R0Y2NseHVJQ0FnZlZ4eVhHNGdJSDFjY2x4dVhISmNiaUFnY21WdVpHVnlVM1JoY2lncElIdGNjbHh1SUNBZ0lHTnZibk4wSUhOMFlYSWdQU0JrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtIUm9hWE11Wld4bGJXVnVkQ2s3WEhKY2JpQWdJQ0J6ZEdGeUxtbHVibVZ5U0ZSTlRDQTlJQ2M4YURVK1FXUmtJSFJvYVhNZ2RHOGdlVzkxY2lCbVlYWnZjbWwwWlhNaFBDOW9OVDRuWEhKY2JpQWdJQ0J6ZEdGeUxtbHVibVZ5U0ZSTlRDQXJQU0FuUEhOd1lXNCtQQzl6Y0dGdVBpYzdYSEpjYmlBZ0lDQnpkR0Z5TG5GMVpYSjVVMlZzWldOMGIzSW9KM053WVc0bktTNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZGpiR2xqYXljc0lIUm9hWE11YUdGdVpHeGxVM1JoY2tOc2FXTnJLVHRjY2x4dUlDQjlYSEpjYm4xY2NseHVYSEpjYm1WNGNHOXlkQ0JrWldaaGRXeDBJRk4wWVhJN1hISmNiaUpkZlE9PVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9jb21wb25lbnRzXFxcXFN0YXIuanNcIixcIi9jb21wb25lbnRzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgU3dpdGNoZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFN3aXRjaGVyKGV2ZW50QnVzLCBlbGVtZW50KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFN3aXRjaGVyKTtcblxuICAgIHRoaXMuZXZlbnRCdXMgPSBldmVudEJ1cztcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgdGhpcy5oYW5kbGVTd2l0Y2hlckNoYW5nZSA9IHRoaXMuaGFuZGxlU3dpdGNoZXJDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLnJlbmRlclN3aXRjaGVyID0gdGhpcy5yZW5kZXJTd2l0Y2hlci5iaW5kKHRoaXMpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFN3aXRjaGVyLCBbe1xuICAgIGtleTogJ2hhbmRsZVN3aXRjaGVyQ2hhbmdlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlU3dpdGNoZXJDaGFuZ2UoZXZlbnQpIHtcblxuICAgICAgdmFyIGlzRmV0Y2hSZXF1ZXN0ID0gdHJ1ZTtcbiAgICAgIC8vINC/0LXRgNC10LTQsNGC0Ywg0YfQtdGA0LXQtyDQuNCy0LXQvdGCINCx0LDRgVxuXG4gICAgICB2YXIgY2hlY2tlZCA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xuXG4gICAgICB2YXIgcmVxdWVzdFR5cGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3dpdGNoZXIgc3BhbicpO1xuXG4gICAgICBpZiAoY2hlY2tlZCkge1xuICAgICAgICBpc0ZldGNoUmVxdWVzdCA9IHRydWU7XG4gICAgICAgIHJlcXVlc3RUeXBlLmlubmVySFRNTCA9ICdGZXRjaCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc0ZldGNoUmVxdWVzdCA9IGZhbHNlO1xuICAgICAgICByZXF1ZXN0VHlwZS5pbm5lckhUTUwgPSAnWEhSJztcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXJTd2l0Y2hlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlclN3aXRjaGVyKCkge1xuICAgICAgdmFyIHN3aXRjaGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmVsZW1lbnQpO1xuXG4gICAgICBzd2l0Y2hlci5vdXRlckhUTUwgPSAnXFxuICAgICAgPGRpdiBjbGFzcz1cInN3aXRjaGVyXCI+XFxuICAgICAgICBSZXF1ZXN0IHR5cGU6IDxzcGFuPkZldGNoPC9zcGFuPlxcbiAgICAgICAgPGxhYmVsIGNsYXNzPVwic3dpdGNoXCI+XFxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2xpZGVyIHJvdW5kXCI+PC9kaXY+XFxuICAgICAgICA8L2xhYmVsPlxcbiAgICAgIDwvZGl2PlxcbiAgICAnO1xuXG4gICAgICBzd2l0Y2hlci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLmhhbmRsZVN3aXRjaGVyQ2hhbmdlKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gU3dpdGNoZXI7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFN3aXRjaGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWxOM2FYUmphR1Z5TG1weklsMHNJbTVoYldWeklqcGJJbE4zYVhSamFHVnlJaXdpWlhabGJuUkNkWE1pTENKbGJHVnRaVzUwSWl3aWFHRnVaR3hsVTNkcGRHTm9aWEpEYUdGdVoyVWlMQ0ppYVc1a0lpd2ljbVZ1WkdWeVUzZHBkR05vWlhJaUxDSmxkbVZ1ZENJc0ltbHpSbVYwWTJoU1pYRjFaWE4wSWl3aVkyaGxZMnRsWkNJc0luUmhjbWRsZENJc0luSmxjWFZsYzNSVWVYQmxJaXdpWkc5amRXMWxiblFpTENKeGRXVnllVk5sYkdWamRHOXlJaXdpYVc1dVpYSklWRTFNSWl3aWMzZHBkR05vWlhJaUxDSnZkWFJsY2toVVRVd2lMQ0poWkdSRmRtVnVkRXhwYzNSbGJtVnlJbDBzSW0xaGNIQnBibWR6SWpvaU96czdPenM3T3pzN08wbEJRVTFCTEZFN1FVRkRTaXh2UWtGQldVTXNVVUZCV2l4RlFVRnpRa01zVDBGQmRFSXNSVUZCSzBJN1FVRkJRVHM3UVVGRE4wSXNVMEZCUzBRc1VVRkJUQ3hIUVVGblFrRXNVVUZCYUVJN1FVRkRRU3hUUVVGTFF5eFBRVUZNTEVkQlFXVkJMRTlCUVdZN08wRkJSVUVzVTBGQlMwTXNiMEpCUVV3c1IwRkJORUlzUzBGQlMwRXNiMEpCUVV3c1EwRkJNRUpETEVsQlFURkNMRU5CUVN0Q0xFbEJRUzlDTEVOQlFUVkNPMEZCUTBFc1UwRkJTME1zWTBGQlRDeEhRVUZ6UWl4TFFVRkxRU3hqUVVGTUxFTkJRVzlDUkN4SlFVRndRaXhEUVVGNVFpeEpRVUY2UWl4RFFVRjBRanRCUVVORU96czdPM2xEUVVWdlFrVXNTeXhGUVVGUE96dEJRVVY0UWl4VlFVRkpReXhwUWtGQmFVSXNTVUZCY2tJN1FVRkRRVHM3UVVGSWQwSXNWVUZMYUVKRExFOUJUR2RDTEVkQlMwcEdMRTFCUVUxSExFMUJURVlzUTBGTGFFSkVMRTlCVEdkQ096dEJRVTE0UWl4VlFVRk5SU3hqUVVGalF5eFRRVUZUUXl4aFFVRlVMRU5CUVhWQ0xHZENRVUYyUWl4RFFVRndRanM3UVVGRlFTeFZRVUZKU2l4UFFVRktMRVZCUVdFN1FVRkRXRVFzZVVKQlFXbENMRWxCUVdwQ08wRkJRMEZITEc5Q1FVRlpSeXhUUVVGYUxFZEJRWGRDTEU5QlFYaENPMEZCUTBRc1QwRklSQ3hOUVVkUE8wRkJRMHhPTEhsQ1FVRnBRaXhMUVVGcVFqdEJRVU5CUnl4dlFrRkJXVWNzVTBGQldpeEhRVUYzUWl4TFFVRjRRanRCUVVORU8wRkJRMG83T3p0eFEwRkZaMEk3UVVGRFppeFZRVUZOUXl4WFFVRlhTQ3hUUVVGVFF5eGhRVUZVTEVOQlFYVkNMRXRCUVV0V0xFOUJRVFZDTEVOQlFXcENPenRCUVVWQldTeGxRVUZUUXl4VFFVRlVPenRCUVZWQlJDeGxRVUZUUlN4blFrRkJWQ3hEUVVFd1FpeFJRVUV4UWl4RlFVRnZReXhMUVVGTFlpeHZRa0ZCZWtNN1FVRkRSRHM3T3pzN08ydENRVWRaU0N4Uklpd2labWxzWlNJNklsTjNhWFJqYUdWeUxtcHpJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpWTJ4aGMzTWdVM2RwZEdOb1pYSWdlMXh5WEc0Z0lHTnZibk4wY25WamRHOXlLR1YyWlc1MFFuVnpMQ0JsYkdWdFpXNTBLU0I3WEhKY2JpQWdJQ0IwYUdsekxtVjJaVzUwUW5WeklEMGdaWFpsYm5SQ2RYTTdYSEpjYmlBZ0lDQjBhR2x6TG1Wc1pXMWxiblFnUFNCbGJHVnRaVzUwTzF4eVhHNWNjbHh1SUNBZ0lIUm9hWE11YUdGdVpHeGxVM2RwZEdOb1pYSkRhR0Z1WjJVZ1BTQjBhR2x6TG1oaGJtUnNaVk4zYVhSamFHVnlRMmhoYm1kbExtSnBibVFvZEdocGN5azdYSEpjYmlBZ0lDQjBhR2x6TG5KbGJtUmxjbE4zYVhSamFHVnlJRDBnZEdocGN5NXlaVzVrWlhKVGQybDBZMmhsY2k1aWFXNWtLSFJvYVhNcE8xeHlYRzRnSUgxY2NseHVYSEpjYmlBZ2FHRnVaR3hsVTNkcGRHTm9aWEpEYUdGdVoyVW9aWFpsYm5RcElIdGNjbHh1WEhKY2JpQWdJQ0FnSUd4bGRDQnBjMFpsZEdOb1VtVnhkV1Z6ZENBOUlIUnlkV1U3WEhKY2JpQWdJQ0FnSUM4dklOQy8wTFhSZ05DMTBMVFFzTkdDMFl3ZzBZZlF0ZEdBMExYUXR5RFF1TkN5MExYUXZkR0NJTkN4MExEUmdWeHlYRzVjY2x4dUlDQWdJQ0FnWTI5dWMzUWdleUJqYUdWamEyVmtJSDBnUFNCbGRtVnVkQzUwWVhKblpYUTdYSEpjYmlBZ0lDQWdJR052Ym5OMElISmxjWFZsYzNSVWVYQmxJRDBnWkc5amRXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNpZ25Mbk4zYVhSamFHVnlJSE53WVc0bktUdGNjbHh1WEhKY2JpQWdJQ0FnSUdsbUlDaGphR1ZqYTJWa0tTQjdYSEpjYmlBZ0lDQWdJQ0FnYVhOR1pYUmphRkpsY1hWbGMzUWdQU0IwY25WbE8xeHlYRzRnSUNBZ0lDQWdJSEpsY1hWbGMzUlVlWEJsTG1sdWJtVnlTRlJOVENBOUlDZEdaWFJqYUNjN1hISmNiaUFnSUNBZ0lIMGdaV3h6WlNCN1hISmNiaUFnSUNBZ0lDQWdhWE5HWlhSamFGSmxjWFZsYzNRZ1BTQm1ZV3h6WlR0Y2NseHVJQ0FnSUNBZ0lDQnlaWEYxWlhOMFZIbHdaUzVwYm01bGNraFVUVXdnUFNBbldFaFNKenRjY2x4dUlDQWdJQ0FnZlZ4eVhHNGdJSDFjY2x4dVhISmNiaUFnY21WdVpHVnlVM2RwZEdOb1pYSW9LU0I3WEhKY2JpQWdJQ0JqYjI1emRDQnpkMmwwWTJobGNpQTlJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb2RHaHBjeTVsYkdWdFpXNTBLVHRjY2x4dVhISmNiaUFnSUNCemQybDBZMmhsY2k1dmRYUmxja2hVVFV3Z1BTQmdYSEpjYmlBZ0lDQWdJRHhrYVhZZ1kyeGhjM005WENKemQybDBZMmhsY2x3aVBseHlYRzRnSUNBZ0lDQWdJRkpsY1hWbGMzUWdkSGx3WlRvZ1BITndZVzQrUm1WMFkyZzhMM053WVc0K1hISmNiaUFnSUNBZ0lDQWdQR3hoWW1Wc0lHTnNZWE56UFZ3aWMzZHBkR05vWENJK1hISmNiaUFnSUNBZ0lDQWdJQ0E4YVc1d2RYUWdkSGx3WlQxY0ltTm9aV05yWW05NFhDSWdZMmhsWTJ0bFpENWNjbHh1SUNBZ0lDQWdJQ0FnSUR4a2FYWWdZMnhoYzNNOVhDSnpiR2xrWlhJZ2NtOTFibVJjSWo0OEwyUnBkajVjY2x4dUlDQWdJQ0FnSUNBOEwyeGhZbVZzUGx4eVhHNGdJQ0FnSUNBOEwyUnBkajVjY2x4dUlDQWdJR0JjY2x4dVhISmNiaUFnSUNCemQybDBZMmhsY2k1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkamFHRnVaMlVuTENCMGFHbHpMbWhoYm1Sc1pWTjNhWFJqYUdWeVEyaGhibWRsS1R0Y2NseHVJQ0I5WEhKY2JuMWNjbHh1WEhKY2JtVjRjRzl5ZENCa1pXWmhkV3gwSUZOM2FYUmphR1Z5TzF4eVhHNGlYWDA9XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL2NvbXBvbmVudHNcXFxcU3dpdGNoZXIuanNcIixcIi9jb21wb25lbnRzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX0V2ZW50QnVzID0gcmVxdWlyZSgnLi91dGlscy9FdmVudEJ1cycpO1xuXG52YXIgX0V2ZW50QnVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0V2ZW50QnVzKTtcblxudmFyIF9yb3V0ZXIgPSByZXF1aXJlKCcuL3V0aWxzL3JvdXRlcicpO1xuXG52YXIgX3JvdXRlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yb3V0ZXIpO1xuXG52YXIgX1N3aXRjaGVyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL1N3aXRjaGVyJyk7XG5cbnZhciBfU3dpdGNoZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU3dpdGNoZXIpO1xuXG52YXIgX01lbnUgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvTWVudScpO1xuXG52YXIgX01lbnUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfTWVudSk7XG5cbnZhciBfU2VhcmNoID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL1NlYXJjaCcpO1xuXG52YXIgX1NlYXJjaDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TZWFyY2gpO1xuXG52YXIgX0hpc3RvcnkgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvSGlzdG9yeScpO1xuXG52YXIgX0hpc3RvcnkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfSGlzdG9yeSk7XG5cbnZhciBfRmF2b3JpdGVzID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL0Zhdm9yaXRlcycpO1xuXG52YXIgX0Zhdm9yaXRlczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9GYXZvcml0ZXMpO1xuXG52YXIgX2luZGV4ID0gcmVxdWlyZSgnLi9yb3V0ZXMvaW5kZXgnKTtcblxudmFyIF9jaXR5ID0gcmVxdWlyZSgnLi9yb3V0ZXMvY2l0eScpO1xuXG52YXIgX2Nvb3JkaW5hdGVzID0gcmVxdWlyZSgnLi9yb3V0ZXMvY29vcmRpbmF0ZXMnKTtcblxudmFyIF9hYm91dCA9IHJlcXVpcmUoJy4vcm91dGVzL2Fib3V0Jyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBldmVudEJ1cyA9IG5ldyBfRXZlbnRCdXMyLmRlZmF1bHQoKTtcblxudmFyIHJvdXRlcyA9IFtfaW5kZXguaW5kZXgsIF9jaXR5LmNpdHksIF9jb29yZGluYXRlcy5jb29yZGluYXRlcywgX2Fib3V0LmFib3V0XTtcblxubmV3IF9Td2l0Y2hlcjIuZGVmYXVsdChldmVudEJ1cywgJy5zd2l0Y2hlcicpLnJlbmRlclN3aXRjaGVyKCk7XG5uZXcgX01lbnUyLmRlZmF1bHQoJy5tZW51JykucmVuZGVyTWVudSgpO1xubmV3IF9TZWFyY2gyLmRlZmF1bHQoZXZlbnRCdXMsICcuc2VhcmNoJykucmVuZGVyU2VhcmNoKCk7XG5cbm5ldyBfcm91dGVyMi5kZWZhdWx0KHsgcm91dGVzOiByb3V0ZXMsIGV2ZW50QnVzOiBldmVudEJ1cyB9KTtcblxubmV3IF9IaXN0b3J5Mi5kZWZhdWx0KGV2ZW50QnVzLCAnLmhpc3RvcnknKS5yZW5kZXJIaXN0b3J5KCk7XG5uZXcgX0Zhdm9yaXRlczIuZGVmYXVsdChldmVudEJ1cywgJy5mYXZvcml0ZXMnKS5yZW5kZXJGYXZvcml0ZXMoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltWmhhMlZmTWpWbE5UVXpNV1F1YW5NaVhTd2libUZ0WlhNaU9sc2laWFpsYm5SQ2RYTWlMQ0p5YjNWMFpYTWlMQ0p5Wlc1a1pYSlRkMmwwWTJobGNpSXNJbkpsYm1SbGNrMWxiblVpTENKeVpXNWtaWEpUWldGeVkyZ2lMQ0p5Wlc1a1pYSklhWE4wYjNKNUlpd2ljbVZ1WkdWeVJtRjJiM0pwZEdWeklsMHNJbTFoY0hCcGJtZHpJam9pT3p0QlFVRkJPenM3TzBGQlEwRTdPenM3UVVGRlFUczdPenRCUVVOQk96czdPMEZCUTBFN096czdRVUZGUVRzN096dEJRVU5CT3pzN08wRkJSVUU3TzBGQlEwRTdPMEZCUTBFN08wRkJRMEU3T3pzN1FVRkhRU3hKUVVGTlFTeFhRVUZYTEhkQ1FVRnFRanM3UVVGRlFTeEpRVUZOUXl4VFFVRlRMR3RGUVVGbU96dEJRVWRCTEhWQ1FVRmhSQ3hSUVVGaUxFVkJRWFZDTEZkQlFYWkNMRVZCUVc5RFJTeGpRVUZ3UXp0QlFVTkJMRzFDUVVGVExFOUJRVlFzUlVGQmEwSkRMRlZCUVd4Q08wRkJRMEVzY1VKQlFWZElMRkZCUVZnc1JVRkJjVUlzVTBGQmNrSXNSVUZCWjBOSkxGbEJRV2hET3p0QlFVZEJMSEZDUVVGWExFVkJRVU5JTEdOQlFVUXNSVUZCVTBRc2EwSkJRVlFzUlVGQldEczdRVUZIUVN4elFrRkJXVUVzVVVGQldpeEZRVUZ6UWl4VlFVRjBRaXhGUVVGclEwc3NZVUZCYkVNN1FVRkRRU3gzUWtGQlkwd3NVVUZCWkN4RlFVRjNRaXhaUVVGNFFpeEZRVUZ6UTAwc1pVRkJkRU1pTENKbWFXeGxJam9pWm1GclpWOHlOV1UxTlRNeFpDNXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSW1sdGNHOXlkQ0JGZG1WdWRFSjFjeUJtY205dElDY3VMM1YwYVd4ekwwVjJaVzUwUW5Wekp6dGNjbHh1YVcxd2IzSjBJRkp2ZFhSbGNpQm1jbTl0SUNjdUwzVjBhV3h6TDNKdmRYUmxjaWM3WEhKY2JseHlYRzVwYlhCdmNuUWdVM2RwZEdOb1pYSWdabkp2YlNBbkxpOWpiMjF3YjI1bGJuUnpMMU4zYVhSamFHVnlKenRjY2x4dWFXMXdiM0owSUUxbGJuVWdabkp2YlNBbkxpOWpiMjF3YjI1bGJuUnpMMDFsYm5Vbk8xeHlYRzVwYlhCdmNuUWdVMlZoY21Ob0lHWnliMjBnSnk0dlkyOXRjRzl1Wlc1MGN5OVRaV0Z5WTJnbk8xeHlYRzVjY2x4dWFXMXdiM0owSUVocGMzUnZjbmtnWm5KdmJTQW5MaTlqYjIxd2IyNWxiblJ6TDBocGMzUnZjbmtuTzF4eVhHNXBiWEJ2Y25RZ1JtRjJiM0pwZEdWeklHWnliMjBnSnk0dlkyOXRjRzl1Wlc1MGN5OUdZWFp2Y21sMFpYTW5PMXh5WEc1Y2NseHVhVzF3YjNKMElIc2dhVzVrWlhnZ2ZTQm1jbTl0SUNjdUwzSnZkWFJsY3k5cGJtUmxlQ2M3WEhKY2JtbHRjRzl5ZENCN0lHTnBkSGtnZlNCbWNtOXRJQ2N1TDNKdmRYUmxjeTlqYVhSNUp6dGNjbHh1YVcxd2IzSjBJSHNnWTI5dmNtUnBibUYwWlhNZ2ZTQm1jbTl0SUNjdUwzSnZkWFJsY3k5amIyOXlaR2x1WVhSbGN5YzdYSEpjYm1sdGNHOXlkQ0I3SUdGaWIzVjBJSDBnWm5KdmJTQW5MaTl5YjNWMFpYTXZZV0p2ZFhRbk8xeHlYRzVjY2x4dVhISmNibU52Ym5OMElHVjJaVzUwUW5WeklEMGdibVYzSUVWMlpXNTBRblZ6S0NrN1hISmNibHh5WEc1amIyNXpkQ0J5YjNWMFpYTWdQU0JiYVc1a1pYZ3NJR05wZEhrc0lHTnZiM0prYVc1aGRHVnpMQ0JoWW05MWRGMDdYSEpjYmx4eVhHNWNjbHh1Ym1WM0lGTjNhWFJqYUdWeUtHVjJaVzUwUW5WekxDQW5Mbk4zYVhSamFHVnlKeWt1Y21WdVpHVnlVM2RwZEdOb1pYSW9LVHRjY2x4dWJtVjNJRTFsYm5Vb0p5NXRaVzUxSnlrdWNtVnVaR1Z5VFdWdWRTZ3BPMXh5WEc1dVpYY2dVMlZoY21Ob0tHVjJaVzUwUW5WekxDQW5Mbk5sWVhKamFDY3BMbkpsYm1SbGNsTmxZWEpqYUNncE8xeHlYRzVjY2x4dVhISmNibTVsZHlCU2IzVjBaWElvZTNKdmRYUmxjeXdnWlhabGJuUkNkWE45S1R0Y2NseHVYSEpjYmx4eVhHNXVaWGNnU0dsemRHOXllU2hsZG1WdWRFSjFjeXdnSnk1b2FYTjBiM0o1SnlrdWNtVnVaR1Z5U0dsemRHOXllU2dwTzF4eVhHNXVaWGNnUm1GMmIzSnBkR1Z6S0dWMlpXNTBRblZ6TENBbkxtWmhkbTl5YVhSbGN5Y3BMbkpsYm1SbGNrWmhkbTl5YVhSbGN5Z3BPeUpkZlE9PVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9mYWtlXzI1ZTU1MzFkLmpzXCIsXCIvXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgYWJvdXQgPSB7XG4gIG5hbWU6ICdhYm91dCcsXG4gIG1hdGNoOiAnYWJvdXQnLFxuICBvbkVudGVyOiBmdW5jdGlvbiBvbkVudGVyKCkge1xuICAgIHZhciBjb250ZW50QmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzZWN0aW9uLm1haW4gLmNvbnRlbnQnKTtcbiAgICBjb250ZW50QmxvY2suY2xhc3NMaXN0LnJlbW92ZSgnY29sLW1kLTEyJyk7XG4gICAgY29udGVudEJsb2NrLmNsYXNzTGlzdC5hZGQoJ2NvbC1tZC1vZmZzZXQtMicsICdjb2wtbWQtOCcpO1xuICAgIGNvbnRlbnRCbG9jay5pbm5lckhUTUwgPSAnXFxuICAgICAgPGgyPkhlbGxvLCBpdCB3aWxsIGJlIGNvb2wgYWJvdXQgcGFnZTwvaDI+XFxuICAgICAgPHA+Li4uYnV0IGhhdmVuXFwndCBpZGVhIHdoYXQgdG8gd3JpdGUgaGVyZTwvcD5cXG4gICAgJztcbiAgfVxufTtcblxuZXhwb3J0cy5hYm91dCA9IGFib3V0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1GaWIzVjBMbXB6SWwwc0ltNWhiV1Z6SWpwYkltRmliM1YwSWl3aWJtRnRaU0lzSW0xaGRHTm9JaXdpYjI1RmJuUmxjaUlzSW1OdmJuUmxiblJDYkc5amF5SXNJbVJ2WTNWdFpXNTBJaXdpY1hWbGNubFRaV3hsWTNSdmNpSXNJbU5zWVhOelRHbHpkQ0lzSW5KbGJXOTJaU0lzSW1Ga1pDSXNJbWx1Ym1WeVNGUk5UQ0pkTENKdFlYQndhVzVuY3lJNklqczdPenM3TzBGQlEwRXNTVUZCVFVFc1VVRkJVVHRCUVVOYVF5eFJRVUZOTEU5QlJFMDdRVUZGV2tNc1UwRkJUeXhQUVVaTE8wRkJSMXBETEZkQlFWTXNiVUpCUVUwN1FVRkRZaXhSUVVGTlF5eGxRVUZsUXl4VFFVRlRReXhoUVVGVUxFTkJRWFZDTEhWQ1FVRjJRaXhEUVVGeVFqdEJRVU5CUml4cFFrRkJZVWNzVTBGQllpeERRVUYxUWtNc1RVRkJka0lzUTBGQk9FSXNWMEZCT1VJN1FVRkRRVW9zYVVKQlFXRkhMRk5CUVdJc1EwRkJkVUpGTEVkQlFYWkNMRU5CUVRKQ0xHbENRVUV6UWl4RlFVRTRReXhWUVVFNVF6dEJRVU5CVEN4cFFrRkJZVTBzVTBGQllqdEJRVWxFTzBGQldGY3NRMEZCWkRzN1VVRmpVMVlzU3l4SFFVRkJRU3hMSWl3aVptbHNaU0k2SW1GaWIzVjBMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaVhISmNibU52Ym5OMElHRmliM1YwSUQwZ2UxeHlYRzRnSUc1aGJXVTZJQ2RoWW05MWRDY3NYSEpjYmlBZ2JXRjBZMmc2SUNkaFltOTFkQ2NzWEhKY2JpQWdiMjVGYm5SbGNqb2dLQ2tnUFQ0Z2UxeHlYRzRnSUNBZ1kyOXVjM1FnWTI5dWRHVnVkRUpzYjJOcklEMGdaRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2lnbmMyVmpkR2x2Ymk1dFlXbHVJQzVqYjI1MFpXNTBKeWs3WEhKY2JpQWdJQ0JqYjI1MFpXNTBRbXh2WTJzdVkyeGhjM05NYVhOMExuSmxiVzkyWlNnblkyOXNMVzFrTFRFeUp5azdYSEpjYmlBZ0lDQmpiMjUwWlc1MFFteHZZMnN1WTJ4aGMzTk1hWE4wTG1Ga1pDZ25ZMjlzTFcxa0xXOW1abk5sZEMweUp5d2dKMk52YkMxdFpDMDRKeWs3WEhKY2JpQWdJQ0JqYjI1MFpXNTBRbXh2WTJzdWFXNXVaWEpJVkUxTUlEMGdZRnh5WEc0Z0lDQWdJQ0E4YURJK1NHVnNiRzhzSUdsMElIZHBiR3dnWW1VZ1kyOXZiQ0JoWW05MWRDQndZV2RsUEM5b01qNWNjbHh1SUNBZ0lDQWdQSEErTGk0dVluVjBJR2hoZG1WdUozUWdhV1JsWVNCM2FHRjBJSFJ2SUhkeWFYUmxJR2hsY21VOEwzQStYSEpjYmlBZ0lDQmdPMXh5WEc0Z0lIMHNYSEpjYm4wN1hISmNibHh5WEc1bGVIQnZjblFnZXlCaFltOTFkQ0I5TzF4eVhHNGlYWDA9XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL3JvdXRlc1xcXFxhYm91dC5qc1wiLFwiL3JvdXRlc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBHT09HTEVfQVBJX0tFWSA9ICdBSXphU3lEYTdEQ0wyTk85S01QZDlEWVZrX3UzdTB3Q2JtMFhYRlknO1xuXG52YXIgY2l0eSA9IGV4cG9ydHMuY2l0eSA9IHtcbiAgbmFtZTogJ2NpdHknLFxuICBtYXRjaDogL2NpdHk9KC4rKS8sXG4gIG9uRW50ZXI6IGZ1bmN0aW9uIG9uRW50ZXIodXJsLCBldmVudEJ1cykge1xuICAgIHZhciBjaXR5ID0gdXJsLnNwbGl0KCc9JylbMV07XG5cbiAgICB2YXIgY29udGVudEJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc2VjdGlvbi5tYWluIC5jb250ZW50Jyk7XG4gICAgY29udGVudEJsb2NrLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbC1tZC0xMicpO1xuICAgIGNvbnRlbnRCbG9jay5jbGFzc0xpc3QuYWRkKCdjb2wtbWQtb2Zmc2V0LTInLCAnY29sLW1kLTgnKTtcbiAgICBjb250ZW50QmxvY2suaW5uZXJIVE1MID0gJ1xcbiAgICAgIDxoMj5Mb2FkaW5nIGluZm9ybWF0aW9uIGFib3V0IHlvdXIgY2l0eS4uLjwvaDI+XFxuICAgICc7XG5cbiAgICBmZXRjaCgnaHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2dlb2NvZGUvanNvbj9hZGRyZXNzPScgKyBjaXR5ICsgJyZrZXk9JyArIEdPT0dMRV9BUElfS0VZKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICBjb250ZW50QmxvY2suaW5uZXJIVE1MICs9ICdcXG4gICAgICAgICAgPHA+QWxtb3N0IHJlYWR5Li4uPC9wPlxcbiAgICAgICAgJztcbiAgICAgIGlmIChkYXRhLnJlc3VsdHMubGVuZ3RoID09PSAwKSB0aHJvdyBuZXcgRXJyb3IoXCJXZSBjYW4ndCBmaW5kIHlvdXIgY2l0eVwiKTtcbiAgICAgIHZhciBmb3JtYXR0ZWRBZGRyZXNzID0gZGF0YS5yZXN1bHRzWzBdLmZvcm1hdHRlZF9hZGRyZXNzO1xuICAgICAgdmFyIF9kYXRhJHJlc3VsdHMkMCRnZW9tZSA9IGRhdGEucmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbixcbiAgICAgICAgICBsYXQgPSBfZGF0YSRyZXN1bHRzJDAkZ2VvbWUubGF0LFxuICAgICAgICAgIGxuZyA9IF9kYXRhJHJlc3VsdHMkMCRnZW9tZS5sbmc7XG5cblxuICAgICAgZXZlbnRCdXMudHJpZ2dlcignaGlzdG9yeTphZGQnLCBmb3JtYXR0ZWRBZGRyZXNzKTtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJ2Nvb3JkaW5hdGVzP2xhdD0nICsgbGF0ICsgJyZsbmc9JyArIGxuZztcbiAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIGNvbnRlbnRCbG9jay5pbm5lckhUTUwgPSAnXFxuICAgICAgICAgIDxoMj5Tb3JyeSwgd2UgaGF2ZSBzb21lIGVycm9yIDooPC9oMj5cXG4gICAgICAgICAgPHAgY2xhc3M9XCJlcnJvclwiPicgKyBlcnJvciArICc8L3A+XFxuICAgICAgICAnO1xuICAgIH0pO1xuICB9LFxuICBvbkxlYXZlOiBmdW5jdGlvbiBvbkxlYXZlKCkge1xuICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NlY3Rpb24ubWFpbiAuY29udGVudCcpLmlubmVySFRNTCA9ICcnO1xuICB9XG59O1xuXG4vLyBmdW5jdGlvbiBsb2FkRGF0YShjaXR5KSB7XG4vLyAgIHJldHVybiBpc0ZldGNoUmVxdWVzdCA/IGdldEZvcmVjYXN0RmV0Y2goY2l0eSkgOiBnZXRGb3JlY2FzdFhIUihjaXR5KTtcbi8vIH1cbi8vXG4vLyBmdW5jdGlvbiBnZXRGb3JlY2FzdFhIUihjaXR5KSB7XG4vL1xuLy8gICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuLy9cbi8vICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4vLyAgICAgeGhyLm9wZW4oJ0dFVCcsIGBodHRwczovL21hcHMuZ29vZ2xlYXBpcy5jb20vbWFwcy9hcGkvZ2VvY29kZS9qc29uP2FkZHJlc3M9JHtjaXR5fSZrZXk9JHtHT09HTEVfQVBJX0tFWX1gLCB0cnVlKTtcbi8vXG4vLyAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuLy8gICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDIwMCkge1xuLy9cbi8vICAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZSk7XG4vLyAgICAgICAgIGlmIChkYXRhLnJlc3VsdHMubGVuZ3RoID09PSAwKSB0aHJvdyBuZXcgRXJyb3IoXCJTb3JyeSwgd2UgY2FuJ3QgZmluZCB5b3VyIGNpdHk6KFwiKTtcbi8vICAgICAgICAgY3VycmVudENpdHkgPSBkYXRhLnJlc3VsdHNbMF0uZm9ybWF0dGVkX2FkZHJlc3M7XG4vLyAgICAgICAgIGNvbnN0IHsgbGF0LCBsbmcgfSA9IGRhdGEucmVzdWx0c1swXS5nZW9tZXRyeS5sb2NhdGlvbjtcbi8vXG4vLyAgICAgICAgIHZhciB4aHIyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4vLyAgICAgICAgIHhocjIub3BlbignR0VUJywgYGh0dHBzOi8vc2hyb3VkZWQtc3BpcmUtMzU3MDMuaGVyb2t1YXBwLmNvbS9mb3JlY2FzdC8ke2xhdH0sJHtsbmd9P2xhbmc9ZW4mdW5pdHM9c2lgLCB0cnVlKTtcbi8vXG4vLyAgICAgICAgIHhocjIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDIwMCkge1xuLy8gICAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHRoaXMucmVzcG9uc2UpKTtcbi8vICAgICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKHRoaXMuc3RhdHVzVGV4dCk7XG4vLyAgICAgICAgICAgICBlcnJvci5jb2RlID0gdGhpcy5zdGF0dXM7XG4vLyAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuLy8gICAgICAgICAgIH1cbi8vICAgICAgICAgfTtcbi8vXG4vLyAgICAgICAgIHhocjIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuLy8gICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJOZXR3b3JrIEVycm9yXCIpKTtcbi8vICAgICAgICAgfTtcbi8vXG4vLyAgICAgICAgIHhocjIuc2VuZCgpO1xuLy9cbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcih0aGlzLnN0YXR1c1RleHQpO1xuLy8gICAgICAgICBlcnJvci5jb2RlID0gdGhpcy5zdGF0dXM7XG4vLyAgICAgICAgIHJlamVjdChlcnJvcik7XG4vLyAgICAgICB9XG4vLyAgICAgfTtcbi8vXG4vLyAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbi8vICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJOZXR3b3JrIEVycm9yXCIpKTtcbi8vICAgICB9O1xuLy9cbi8vICAgICB4aHIuc2VuZCgpO1xuLy8gICB9KTtcbi8vIH1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltTnBkSGt1YW5NaVhTd2libUZ0WlhNaU9sc2lSMDlQUjB4RlgwRlFTVjlMUlZraUxDSmphWFI1SWl3aWJtRnRaU0lzSW0xaGRHTm9JaXdpYjI1RmJuUmxjaUlzSW5WeWJDSXNJbVYyWlc1MFFuVnpJaXdpYzNCc2FYUWlMQ0pqYjI1MFpXNTBRbXh2WTJzaUxDSmtiMk4xYldWdWRDSXNJbkYxWlhKNVUyVnNaV04wYjNJaUxDSmpiR0Z6YzB4cGMzUWlMQ0p5WlcxdmRtVWlMQ0poWkdRaUxDSnBibTVsY2toVVRVd2lMQ0ptWlhSamFDSXNJblJvWlc0aUxDSnlaWE53YjI1elpTSXNJbXB6YjI0aUxDSmtZWFJoSWl3aWNtVnpkV3gwY3lJc0lteGxibWQwYUNJc0lrVnljbTl5SWl3aVptOXliV0YwZEdWa1FXUmtjbVZ6Y3lJc0ltWnZjbTFoZEhSbFpGOWhaR1J5WlhOeklpd2laMlZ2YldWMGNua2lMQ0pzYjJOaGRHbHZiaUlzSW14aGRDSXNJbXh1WnlJc0luUnlhV2RuWlhJaUxDSjNhVzVrYjNjaUxDSm9ZWE5vSWl3aVkyRjBZMmdpTENKbGNuSnZjaUlzSW05dVRHVmhkbVVpWFN3aWJXRndjR2x1WjNNaU9pSTdPenM3TzBGQlFVRXNTVUZCVFVFc2FVSkJRV2xDTEhsRFFVRjJRanM3UVVGSFR5eEpRVUZOUXl4elFrRkJUenRCUVVOc1FrTXNVVUZCVFN4TlFVUlpPMEZCUld4Q1F5eFRRVUZQTEZkQlJsYzdRVUZIYkVKRExGZEJRVk1zYVVKQlFVTkRMRWRCUVVRc1JVRkJUVU1zVVVGQlRpeEZRVUZ0UWp0QlFVTXhRaXhSUVVGTlRDeFBRVUZQU1N4SlFVRkpSU3hMUVVGS0xFTkJRVlVzUjBGQlZpeEZRVUZsTEVOQlFXWXNRMEZCWWpzN1FVRkZRU3hSUVVGTlF5eGxRVUZsUXl4VFFVRlRReXhoUVVGVUxFTkJRWFZDTEhWQ1FVRjJRaXhEUVVGeVFqdEJRVU5CUml4cFFrRkJZVWNzVTBGQllpeERRVUYxUWtNc1RVRkJka0lzUTBGQk9FSXNWMEZCT1VJN1FVRkRRVW9zYVVKQlFXRkhMRk5CUVdJc1EwRkJkVUpGTEVkQlFYWkNMRU5CUVRKQ0xHbENRVUV6UWl4RlFVRTRReXhWUVVFNVF6dEJRVU5CVEN4cFFrRkJZVTBzVTBGQllqczdRVUZKUVVNc2VVVkJRVzFGWkN4SlFVRnVSU3hoUVVFclJVUXNZMEZCTDBVc1JVRkRSMmRDTEVsQlJFZ3NRMEZEVVR0QlFVRkJMR0ZCUVZsRExGTkJRVk5ETEVsQlFWUXNSVUZCV2p0QlFVRkJMRXRCUkZJc1JVRkZSMFlzU1VGR1NDeERRVVZSTEdkQ1FVRlJPMEZCUTFwU0xHMUNRVUZoVFN4VFFVRmlPMEZCUjBFc1ZVRkJTVXNzUzBGQlMwTXNUMEZCVEN4RFFVRmhReXhOUVVGaUxFdEJRWGRDTEVOQlFUVkNMRVZCUVN0Q0xFMUJRVTBzU1VGQlNVTXNTMEZCU2l4RFFVRlZMSGxDUVVGV0xFTkJRVTQ3UVVGREwwSXNWVUZCVFVNc2JVSkJRVzFDU2l4TFFVRkxReXhQUVVGTUxFTkJRV0VzUTBGQllpeEZRVUZuUWtrc2FVSkJRWHBETzBGQlRGa3NhME5CVFZOTUxFdEJRVXRETEU5QlFVd3NRMEZCWVN4RFFVRmlMRVZCUVdkQ1N5eFJRVUZvUWl4RFFVRjVRa01zVVVGT2JFTTdRVUZCUVN4VlFVMUtReXhIUVU1SkxIbENRVTFLUVN4SFFVNUpPMEZCUVVFc1ZVRk5RME1zUjBGT1JDeDVRa0ZOUTBFc1IwRk9SRHM3TzBGQlVWcDBRaXhsUVVGVGRVSXNUMEZCVkN4RFFVRnBRaXhoUVVGcVFpeEZRVUZuUTA0c1owSkJRV2hETzBGQlEwRlBMR0ZCUVU5S0xGRkJRVkFzUTBGQlowSkxMRWxCUVdoQ0xIZENRVUV3UTBvc1IwRkJNVU1zWVVGQmNVUkRMRWRCUVhKRU8wRkJRMFFzUzBGYVNDeEZRV0ZIU1N4TFFXSklMRU5CWVZNc2FVSkJRVk03UVVGRFpIaENMRzFDUVVGaFRTeFRRVUZpTEhOR1FVVnhRbTFDTEV0QlJuSkNPMEZCU1VRc1MwRnNRa2c3UVVGdFFrUXNSMEZvUTJsQ08wRkJhVU5zUWtNc1YwRkJVeXh0UWtGQlRUdEJRVU5pTzBGQlEwUTdRVUZ1UTJsQ0xFTkJRV0k3TzBGQmQwTlFPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW1OcGRIa3Vhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lKamIyNXpkQ0JIVDA5SFRFVmZRVkJKWDB0RldTQTlJQ2RCU1hwaFUzbEVZVGRFUTB3eVRrODVTMDFRWkRsRVdWWnJYM1V6ZFRCM1EySnRNRmhZUmxrbk8xeHlYRzVjY2x4dVhISmNibVY0Y0c5eWRDQmpiMjV6ZENCamFYUjVJRDBnZTF4eVhHNGdJRzVoYldVNklDZGphWFI1Snl4Y2NseHVJQ0J0WVhSamFEb2dMMk5wZEhrOUtDNHJLUzhzWEhKY2JpQWdiMjVGYm5SbGNqb2dLSFZ5YkN3Z1pYWmxiblJDZFhNcElEMCtJSHRjY2x4dUlDQWdJR052Ym5OMElHTnBkSGtnUFNCMWNtd3VjM0JzYVhRb0p6MG5LVnN4WFR0Y2NseHVYSEpjYmlBZ0lDQmpiMjV6ZENCamIyNTBaVzUwUW14dlkyc2dQU0JrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtDZHpaV04wYVc5dUxtMWhhVzRnTG1OdmJuUmxiblFuS1R0Y2NseHVJQ0FnSUdOdmJuUmxiblJDYkc5amF5NWpiR0Z6YzB4cGMzUXVjbVZ0YjNabEtDZGpiMnd0YldRdE1USW5LVHRjY2x4dUlDQWdJR052Ym5SbGJuUkNiRzlqYXk1amJHRnpjMHhwYzNRdVlXUmtLQ2RqYjJ3dGJXUXRiMlptYzJWMExUSW5MQ0FuWTI5c0xXMWtMVGduS1R0Y2NseHVJQ0FnSUdOdmJuUmxiblJDYkc5amF5NXBibTVsY2toVVRVd2dQU0JnWEhKY2JpQWdJQ0FnSUR4b01qNU1iMkZrYVc1bklHbHVabTl5YldGMGFXOXVJR0ZpYjNWMElIbHZkWElnWTJsMGVTNHVMand2YURJK1hISmNiaUFnSUNCZ08xeHlYRzVjY2x4dUlDQWdJR1psZEdOb0tHQm9kSFJ3Y3pvdkwyMWhjSE11WjI5dloyeGxZWEJwY3k1amIyMHZiV0Z3Y3k5aGNHa3ZaMlZ2WTI5a1pTOXFjMjl1UDJGa1pISmxjM005Skh0amFYUjVmU1pyWlhrOUpIdEhUMDlIVEVWZlFWQkpYMHRGV1gxZ0tWeHlYRzRnSUNBZ0lDQXVkR2hsYmloeVpYTndiMjV6WlNBOVBpQnlaWE53YjI1elpTNXFjMjl1S0NrcFhISmNiaUFnSUNBZ0lDNTBhR1Z1S0dSaGRHRWdQVDRnZTF4eVhHNGdJQ0FnSUNBZ0lHTnZiblJsYm5SQ2JHOWpheTVwYm01bGNraFVUVXdnS3owZ1lGeHlYRzRnSUNBZ0lDQWdJQ0FnUEhBK1FXeHRiM04wSUhKbFlXUjVMaTR1UEM5d1BseHlYRzRnSUNBZ0lDQWdJR0E3WEhKY2JpQWdJQ0FnSUNBZ2FXWWdLR1JoZEdFdWNtVnpkV3gwY3k1c1pXNW5kR2dnUFQwOUlEQXBJSFJvY205M0lHNWxkeUJGY25KdmNpaGNJbGRsSUdOaGJpZDBJR1pwYm1RZ2VXOTFjaUJqYVhSNVhDSXBPMXh5WEc0Z0lDQWdJQ0FnSUdOdmJuTjBJR1p2Y20xaGRIUmxaRUZrWkhKbGMzTWdQU0JrWVhSaExuSmxjM1ZzZEhOYk1GMHVabTl5YldGMGRHVmtYMkZrWkhKbGMzTTdYSEpjYmlBZ0lDQWdJQ0FnWTI5dWMzUWdleUJzWVhRc0lHeHVaeUI5SUQwZ1pHRjBZUzV5WlhOMWJIUnpXekJkTG1kbGIyMWxkSEo1TG14dlkyRjBhVzl1TzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0JsZG1WdWRFSjFjeTUwY21sbloyVnlLQ2RvYVhOMGIzSjVPbUZrWkNjc0lHWnZjbTFoZEhSbFpFRmtaSEpsYzNNcE8xeHlYRzRnSUNBZ0lDQWdJSGRwYm1SdmR5NXNiMk5oZEdsdmJpNW9ZWE5vSUQwZ1lHTnZiM0prYVc1aGRHVnpQMnhoZEQwa2UyeGhkSDBtYkc1blBTUjdiRzVuZldBN1hISmNiaUFnSUNBZ0lIMHBYSEpjYmlBZ0lDQWdJQzVqWVhSamFDaGxjbkp2Y2lBOVBpQjdYSEpjYmlBZ0lDQWdJQ0FnWTI5dWRHVnVkRUpzYjJOckxtbHVibVZ5U0ZSTlRDQTlJR0JjY2x4dUlDQWdJQ0FnSUNBZ0lEeG9NajVUYjNKeWVTd2dkMlVnYUdGMlpTQnpiMjFsSUdWeWNtOXlJRG9vUEM5b01qNWNjbHh1SUNBZ0lDQWdJQ0FnSUR4d0lHTnNZWE56UFZ3aVpYSnliM0pjSWo0a2UyVnljbTl5ZlR3dmNENWNjbHh1SUNBZ0lDQWdJQ0JnTzF4eVhHNGdJQ0FnSUNCOUtWeHlYRzRnSUgwc1hISmNiaUFnYjI1TVpXRjJaVG9nS0NrZ1BUNGdlMXh5WEc0Z0lDQWdMeThnWkc5amRXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNpZ25jMlZqZEdsdmJpNXRZV2x1SUM1amIyNTBaVzUwSnlrdWFXNXVaWEpJVkUxTUlEMGdKeWM3WEhKY2JpQWdmVnh5WEc1OU8xeHlYRzVjY2x4dVhISmNibHh5WEc0dkx5Qm1kVzVqZEdsdmJpQnNiMkZrUkdGMFlTaGphWFI1S1NCN1hISmNiaTh2SUNBZ2NtVjBkWEp1SUdselJtVjBZMmhTWlhGMVpYTjBJRDhnWjJWMFJtOXlaV05oYzNSR1pYUmphQ2hqYVhSNUtTQTZJR2RsZEVadmNtVmpZWE4wV0VoU0tHTnBkSGtwTzF4eVhHNHZMeUI5WEhKY2JpOHZYSEpjYmk4dklHWjFibU4wYVc5dUlHZGxkRVp2Y21WallYTjBXRWhTS0dOcGRIa3BJSHRjY2x4dUx5OWNjbHh1THk4Z0lDQnlaWFIxY200Z2JtVjNJRkJ5YjIxcGMyVW9LSEpsYzI5c2RtVXNJSEpsYW1WamRDa2dQVDRnZTF4eVhHNHZMMXh5WEc0dkx5QWdJQ0FnZG1GeUlIaG9jaUE5SUc1bGR5QllUVXhJZEhSd1VtVnhkV1Z6ZENncE8xeHlYRzR2THlBZ0lDQWdlR2h5TG05d1pXNG9KMGRGVkNjc0lHQm9kSFJ3Y3pvdkwyMWhjSE11WjI5dloyeGxZWEJwY3k1amIyMHZiV0Z3Y3k5aGNHa3ZaMlZ2WTI5a1pTOXFjMjl1UDJGa1pISmxjM005Skh0amFYUjVmU1pyWlhrOUpIdEhUMDlIVEVWZlFWQkpYMHRGV1gxZ0xDQjBjblZsS1R0Y2NseHVMeTljY2x4dUx5OGdJQ0FnSUhob2NpNXZibXh2WVdRZ1BTQm1kVzVqZEdsdmJpZ3BJSHRjY2x4dUx5OGdJQ0FnSUNBZ2FXWWdLSFJvYVhNdWMzUmhkSFZ6SUQwOUlESXdNQ2tnZTF4eVhHNHZMMXh5WEc0dkx5QWdJQ0FnSUNBZ0lHTnZibk4wSUdSaGRHRWdQU0JLVTA5T0xuQmhjbk5sS0hSb2FYTXVjbVZ6Y0c5dWMyVXBPMXh5WEc0dkx5QWdJQ0FnSUNBZ0lHbG1JQ2hrWVhSaExuSmxjM1ZzZEhNdWJHVnVaM1JvSUQwOVBTQXdLU0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9YQ0pUYjNKeWVTd2dkMlVnWTJGdUozUWdabWx1WkNCNWIzVnlJR05wZEhrNktGd2lLVHRjY2x4dUx5OGdJQ0FnSUNBZ0lDQmpkWEp5Wlc1MFEybDBlU0E5SUdSaGRHRXVjbVZ6ZFd4MGMxc3dYUzVtYjNKdFlYUjBaV1JmWVdSa2NtVnpjenRjY2x4dUx5OGdJQ0FnSUNBZ0lDQmpiMjV6ZENCN0lHeGhkQ3dnYkc1bklIMGdQU0JrWVhSaExuSmxjM1ZzZEhOYk1GMHVaMlZ2YldWMGNua3ViRzlqWVhScGIyNDdYSEpjYmk4dlhISmNiaTh2SUNBZ0lDQWdJQ0FnZG1GeUlIaG9jaklnUFNCdVpYY2dXRTFNU0hSMGNGSmxjWFZsYzNRb0tUdGNjbHh1THk4Z0lDQWdJQ0FnSUNCNGFISXlMbTl3Wlc0b0owZEZWQ2NzSUdCb2RIUndjem92TDNOb2NtOTFaR1ZrTFhOd2FYSmxMVE0xTnpBekxtaGxjbTlyZFdGd2NDNWpiMjB2Wm05eVpXTmhjM1F2Skh0c1lYUjlMQ1I3Ykc1bmZUOXNZVzVuUFdWdUpuVnVhWFJ6UFhOcFlDd2dkSEoxWlNrN1hISmNiaTh2WEhKY2JpOHZJQ0FnSUNBZ0lDQWdlR2h5TWk1dmJteHZZV1FnUFNCbWRXNWpkR2x2YmlncElIdGNjbHh1THk4Z0lDQWdJQ0FnSUNBZ0lHbG1JQ2gwYUdsekxuTjBZWFIxY3lBOVBTQXlNREFwSUh0Y2NseHVMeThnSUNBZ0lDQWdJQ0FnSUNBZ2NtVnpiMngyWlNoS1UwOU9MbkJoY25ObEtIUm9hWE11Y21WemNHOXVjMlVwS1R0Y2NseHVMeThnSUNBZ0lDQWdJQ0FnSUgwZ1pXeHpaU0I3WEhKY2JpOHZJQ0FnSUNBZ0lDQWdJQ0FnSUhaaGNpQmxjbkp2Y2lBOUlHNWxkeUJGY25KdmNpaDBhR2x6TG5OMFlYUjFjMVJsZUhRcE8xeHlYRzR2THlBZ0lDQWdJQ0FnSUNBZ0lDQmxjbkp2Y2k1amIyUmxJRDBnZEdocGN5NXpkR0YwZFhNN1hISmNiaTh2SUNBZ0lDQWdJQ0FnSUNBZ0lISmxhbVZqZENobGNuSnZjaWs3WEhKY2JpOHZJQ0FnSUNBZ0lDQWdJQ0I5WEhKY2JpOHZJQ0FnSUNBZ0lDQWdmVHRjY2x4dUx5OWNjbHh1THk4Z0lDQWdJQ0FnSUNCNGFISXlMbTl1WlhKeWIzSWdQU0JtZFc1amRHbHZiaWdwSUh0Y2NseHVMeThnSUNBZ0lDQWdJQ0FnSUhKbGFtVmpkQ2h1WlhjZ1JYSnliM0lvWENKT1pYUjNiM0pySUVWeWNtOXlYQ0lwS1R0Y2NseHVMeThnSUNBZ0lDQWdJQ0I5TzF4eVhHNHZMMXh5WEc0dkx5QWdJQ0FnSUNBZ0lIaG9jakl1YzJWdVpDZ3BPMXh5WEc0dkwxeHlYRzR2THlBZ0lDQWdJQ0I5SUdWc2MyVWdlMXh5WEc0dkx5QWdJQ0FnSUNBZ0lIWmhjaUJsY25KdmNpQTlJRzVsZHlCRmNuSnZjaWgwYUdsekxuTjBZWFIxYzFSbGVIUXBPMXh5WEc0dkx5QWdJQ0FnSUNBZ0lHVnljbTl5TG1OdlpHVWdQU0IwYUdsekxuTjBZWFIxY3p0Y2NseHVMeThnSUNBZ0lDQWdJQ0J5WldwbFkzUW9aWEp5YjNJcE8xeHlYRzR2THlBZ0lDQWdJQ0I5WEhKY2JpOHZJQ0FnSUNCOU8xeHlYRzR2TDF4eVhHNHZMeUFnSUNBZ2VHaHlMbTl1WlhKeWIzSWdQU0JtZFc1amRHbHZiaWdwSUh0Y2NseHVMeThnSUNBZ0lDQWdjbVZxWldOMEtHNWxkeUJGY25KdmNpaGNJazVsZEhkdmNtc2dSWEp5YjNKY0lpa3BPMXh5WEc0dkx5QWdJQ0FnZlR0Y2NseHVMeTljY2x4dUx5OGdJQ0FnSUhob2NpNXpaVzVrS0NrN1hISmNiaTh2SUNBZ2ZTazdYSEpjYmk4dklIMWNjbHh1SWwxOVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9yb3V0ZXNcXFxcY2l0eS5qc1wiLFwiL3JvdXRlc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuY29vcmRpbmF0ZXMgPSB1bmRlZmluZWQ7XG5cbnZhciBfaGVscGVycyA9IHJlcXVpcmUoJy4uL3V0aWxzL2hlbHBlcnMnKTtcblxudmFyIF9Gb3JlY2FzdCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvRm9yZWNhc3QnKTtcblxudmFyIF9Gb3JlY2FzdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Gb3JlY2FzdCk7XG5cbnZhciBfU3RhciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvU3RhcicpO1xuXG52YXIgX1N0YXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU3Rhcik7XG5cbnZhciBfTWFwID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9NYXAnKTtcblxudmFyIF9NYXAyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfTWFwKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGNvb3JkaW5hdGVzID0gZXhwb3J0cy5jb29yZGluYXRlcyA9IHtcbiAgICAgICAgbmFtZTogJ2Nvb3JkaW5hdGVzJyxcbiAgICAgICAgbWF0Y2g6IGZ1bmN0aW9uIG1hdGNoKGNvb3JkaW5hdGVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvb3JkaW5hdGVzLnN1YnN0cmluZygwLCAxMSkgPT09ICdjb29yZGluYXRlcyc7XG4gICAgICAgIH0sXG4gICAgICAgIG9uRW50ZXI6IGZ1bmN0aW9uIG9uRW50ZXIodXJsLCBldmVudEJ1cykge1xuICAgICAgICAgICAgICAgIHZhciBfZ2V0VXJsSGFzaFBhcmFtcyA9ICgwLCBfaGVscGVycy5nZXRVcmxIYXNoUGFyYW1zKSgpLFxuICAgICAgICAgICAgICAgICAgICBsYXQgPSBfZ2V0VXJsSGFzaFBhcmFtcy5sYXQsXG4gICAgICAgICAgICAgICAgICAgIGxuZyA9IF9nZXRVcmxIYXNoUGFyYW1zLmxuZztcblxuICAgICAgICAgICAgICAgIHZhciBjb250ZW50QmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzZWN0aW9uLm1haW4gLmNvbnRlbnQnKTtcblxuICAgICAgICAgICAgICAgIGZldGNoKCdodHRwczovL3Nocm91ZGVkLXNwaXJlLTM1NzAzLmhlcm9rdWFwcC5jb20vZm9yZWNhc3QvJyArIGxhdCArICcsJyArIGxuZyArICc/bGFuZz1lbiZ1bml0cz1zaScpLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50QmxvY2suY2xhc3NMaXN0LmNvbnRhaW5zKCdjb2wtbWQtOCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRCbG9jay5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRCbG9jay5jbGFzc0xpc3QucmVtb3ZlKCdjb2wtbWQtb2Zmc2V0LTInLCAnY29sLW1kLTgnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRCbG9jay5jbGFzc0xpc3QuYWRkKCdjb2wtbWQtMTInKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1hcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFwRGl2LmNsYXNzTGlzdC5hZGQoJ21hcCcpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3RhckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhckRpdi5jbGFzc0xpc3QuYWRkKCdzdGFyJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1hcERpdi5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImNvbC1tZC05IG1hcFwiPjwvZGl2PjxkaXYgY2xhc3M9XCJjb2wtbWQtMyBzdGFyXCI+PC9kaXY+J1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JlY2FzdC1ibG9jaycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgIG5ldyBNYXAoZXZlbnRCdXMsICcubWFwJykucmVuZGVyTWFwKFtsYXQsIGxuZ10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NlY3Rpb24ubWFpbiAuY29udGVudCAuZm9yZWNhc3QtYmxvY2snKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9yZWNhc3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yZWNhc3REaXYuY2xhc3NMaXN0LmFkZCgnZm9yZWNhc3QtYmxvY2snKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudEJsb2NrLmFwcGVuZChmb3JlY2FzdERpdik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgX0ZvcmVjYXN0Mi5kZWZhdWx0KCdzZWN0aW9uLm1haW4gLmNvbnRlbnQgLmZvcmVjYXN0LWJsb2NrJywgZGF0YSkucmVuZGVyRm9yZWNhc3QoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudEJsb2NrLmFwcGVuZChzdGFyRGl2LCBtYXBEaXYpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBldmVudEJ1cy50cmlnZ2VyKCdjb29yZGluYXRlczpjaGFuZ2VkJywge2xhdCwgbG5nfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21hcCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBfTWFwMi5kZWZhdWx0KGV2ZW50QnVzLCAnLm1hcCcpLnJlbmRlck1hcChbbGF0LCBsbmddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXcgX1N0YXIyLmRlZmF1bHQoZXZlbnRCdXMsICcuc3RhcicpLnJlbmRlclN0YXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRCdXMudHJpZ2dlcignY29vcmRpbmF0ZXM6Y2hhbmdlZCcsIHsgbGF0OiBsYXQsIGxuZzogbG5nIH0pO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudEJsb2NrLmlubmVySFRNTCA9ICdcXG4gICAgICAgICAgPGgyPlNvcnJ5LCB3ZSBoYXZlIHNvbWUgZXJyb3IgOig8L2gyPlxcbiAgICAgICAgICA8cCBjbGFzcz1cImVycm9yXCI+JyArIGVycm9yICsgJzwvcD5cXG4gICAgICAgICc7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgb25MZWF2ZTogZnVuY3Rpb24gb25MZWF2ZSgpIHt9XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1OdmIzSmthVzVoZEdWekxtcHpJbDBzSW01aGJXVnpJanBiSW1OdmIzSmthVzVoZEdWeklpd2libUZ0WlNJc0ltMWhkR05vSWl3aWMzVmljM1J5YVc1bklpd2liMjVGYm5SbGNpSXNJblZ5YkNJc0ltVjJaVzUwUW5Weklpd2liR0YwSWl3aWJHNW5JaXdpWTI5dWRHVnVkRUpzYjJOcklpd2laRzlqZFcxbGJuUWlMQ0p4ZFdWeWVWTmxiR1ZqZEc5eUlpd2labVYwWTJnaUxDSjBhR1Z1SWl3aWNtVnpjRzl1YzJVaUxDSnFjMjl1SWl3aVkyeGhjM05NYVhOMElpd2lZMjl1ZEdGcGJuTWlMQ0pwYm01bGNraFVUVXdpTENKeVpXMXZkbVVpTENKaFpHUWlMQ0p0WVhCRWFYWWlMQ0pqY21WaGRHVkZiR1Z0Wlc1MElpd2ljM1JoY2tScGRpSXNJbVp2Y21WallYTjBSR2wySWl3aVlYQndaVzVrSWl3aVpHRjBZU0lzSW5KbGJtUmxja1p2Y21WallYTjBJaXdpY21WdVpHVnlUV0Z3SWl3aWNtVnVaR1Z5VTNSaGNpSXNJblJ5YVdkblpYSWlMQ0pqWVhSamFDSXNJbVZ5Y205eUlpd2liMjVNWldGMlpTSmRMQ0p0WVhCd2FXNW5jeUk2SWpzN096czdPenRCUVVGQk96dEJRVVZCT3pzN08wRkJRMEU3T3pzN1FVRkRRVHM3T3pzN08wRkJSVThzU1VGQlRVRXNiME5CUVdNN1FVRkRla0pETEdOQlFVMHNZVUZFYlVJN1FVRkZla0pETEdWQlFVOHNaVUZCUTBZc1YwRkJSRHRCUVVGQkxIVkNRVUZwUWtFc1dVRkJXVWNzVTBGQldpeERRVUZ6UWl4RFFVRjBRaXhGUVVGNVFpeEZRVUY2UWl4TlFVRnBReXhoUVVGc1JEdEJRVUZCTEZOQlJtdENPMEZCUjNwQ1F5eHBRa0ZCVXl4cFFrRkJRME1zUjBGQlJDeEZRVUZOUXl4UlFVRk9MRVZCUVcxQ08wRkJRVUVzZDBOQlJVd3NaME5CUmtzN1FVRkJRU3h2UWtGRmJFSkRMRWRCUm10Q0xIRkNRVVZzUWtFc1IwRkdhMEk3UVVGQlFTeHZRa0ZGWWtNc1IwRkdZU3h4UWtGRllrRXNSMEZHWVRzN1FVRkhNVUlzYjBKQlFVMURMR1ZCUVdWRExGTkJRVk5ETEdGQlFWUXNRMEZCZFVJc2RVSkJRWFpDTEVOQlFYSkNPenRCUVVWQlF5d3JSVUZCTmtSTUxFZEJRVGRFTEZOQlFXOUZReXhIUVVGd1JTeDNRa0ZEUjBzc1NVRkVTQ3hEUVVOUk8wRkJRVUVzSzBKQlFWbERMRk5CUVZORExFbEJRVlFzUlVGQldqdEJRVUZCTEdsQ1FVUlNMRVZCUlVkR0xFbEJSa2dzUTBGRlVTeG5Ra0ZCVVR0QlFVTmFMRFJDUVVGSlNpeGhRVUZoVHl4VFFVRmlMRU5CUVhWQ1F5eFJRVUYyUWl4RFFVRm5ReXhWUVVGb1F5eERRVUZLTEVWQlFXbEVPMEZCUXk5RFVpdzJRMEZCWVZNc1UwRkJZaXhIUVVGNVFpeEZRVUY2UWp0QlFVTkVPMEZCUTBSVUxIRkRRVUZoVHl4VFFVRmlMRU5CUVhWQ1J5eE5RVUYyUWl4RFFVRTRRaXhwUWtGQk9VSXNSVUZCYVVRc1ZVRkJha1E3UVVGRFFWWXNjVU5CUVdGUExGTkJRV0lzUTBGQmRVSkpMRWRCUVhaQ0xFTkJRVEpDTEZkQlFUTkNPenRCUVVWQkxEUkNRVUZOUXl4VFFVRlRXQ3hUUVVGVFdTeGhRVUZVTEVOQlFYVkNMRXRCUVhaQ0xFTkJRV1k3UVVGRFFVUXNLMEpCUVU5TUxGTkJRVkFzUTBGQmFVSkpMRWRCUVdwQ0xFTkJRWEZDTEV0QlFYSkNPenRCUVVWQkxEUkNRVUZOUnl4VlFVRlZZaXhUUVVGVFdTeGhRVUZVTEVOQlFYVkNMRXRCUVhaQ0xFTkJRV2hDTzBGQlEwRkRMR2REUVVGUlVDeFRRVUZTTEVOQlFXdENTU3hIUVVGc1FpeERRVUZ6UWl4TlFVRjBRanM3UVVGRlFUczdRVUZGUVR0QlFVTkJPMEZCUTBFN08wRkJSVUVzTkVKQlFVa3NRMEZCUTFZc1UwRkJVME1zWVVGQlZDeERRVUYxUWl4MVEwRkJka0lzUTBGQlRDeEZRVUZ6UlR0QlFVTndSU3h2UTBGQlRXRXNZMEZCWTJRc1UwRkJVMWtzWVVGQlZDeERRVUYxUWl4TFFVRjJRaXhEUVVGd1FqdEJRVU5CUlN3MFEwRkJXVklzVTBGQldpeERRVUZ6UWtrc1IwRkJkRUlzUTBGQk1FSXNaMEpCUVRGQ08wRkJRMEZZTERaRFFVRmhaMElzVFVGQllpeERRVUZ2UWtRc1YwRkJjRUk3UVVGRFJEdEJRVU5FTEN0RFFVRmhMSFZEUVVGaUxFVkJRWE5FUlN4SlFVRjBSQ3hGUVVFMFJFTXNZMEZCTlVRN08wRkJSVUZzUWl4eFEwRkJZV2RDTEUxQlFXSXNRMEZCYjBKR0xFOUJRWEJDTEVWQlFUWkNSaXhOUVVFM1FqczdRVUZIUVRzN1FVRkZRU3cwUWtGQlNTeERRVUZEV0N4VFFVRlRReXhoUVVGVUxFTkJRWFZDTEUxQlFYWkNMRU5CUVV3c1JVRkJjVU03UVVGRGJrTXNhMFJCUVZGTUxGRkJRVklzUlVGQmEwSXNUVUZCYkVJc1JVRkJNRUp6UWl4VFFVRXhRaXhEUVVGdlF5eERRVUZEY2tJc1IwRkJSQ3hGUVVGTlF5eEhRVUZPTEVOQlFYQkRPMEZCUTBRN08wRkJSVVE3UVVGRFJTd3lRMEZCVTBZc1VVRkJWQ3hGUVVGdFFpeFBRVUZ1UWl4RlFVRTBRblZDTEZWQlFUVkNPMEZCUTBZN08wRkJSVUYyUWl4cFEwRkJVM2RDTEU5QlFWUXNRMEZCYVVJc2NVSkJRV3BDTEVWQlFYZERMRVZCUVVOMlFpeFJRVUZFTEVWQlFVMURMRkZCUVU0c1JVRkJlRU03UVVGRlJDeHBRa0V6UTBnc1JVRTBRMGQxUWl4TFFUVkRTQ3hEUVRSRFV5eHBRa0ZCVXp0QlFVTmtkRUlzY1VOQlFXRlRMRk5CUVdJc2MwWkJSWEZDWXl4TFFVWnlRanRCUVVsRUxHbENRV3BFU0R0QlFXdEVSQ3hUUVRGRWQwSTdPMEZCTkVSNlFrTXNaVUUxUkhsQ0xIRkNRVFJFWml4RFFVTlVPMEZCTjBSM1FpeERRVUZ3UWlJc0ltWnBiR1VpT2lKamIyOXlaR2x1WVhSbGN5NXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSW1sdGNHOXlkQ0I3SUdkbGRGVnliRWhoYzJoUVlYSmhiWE1nZlNCbWNtOXRJQ2N1TGk5MWRHbHNjeTlvWld4d1pYSnpKenRjY2x4dVhISmNibWx0Y0c5eWRDQkdiM0psWTJGemRDQm1jbTl0SUNjdUxpOWpiMjF3YjI1bGJuUnpMMFp2Y21WallYTjBKenRjY2x4dWFXMXdiM0owSUZOMFlYSWdabkp2YlNBbkxpNHZZMjl0Y0c5dVpXNTBjeTlUZEdGeUp6dGNjbHh1YVcxd2IzSjBJRTFoY0NCbWNtOXRJQ2N1TGk5amIyMXdiMjVsYm5SekwwMWhjQ2M3WEhKY2JseHlYRzVsZUhCdmNuUWdZMjl1YzNRZ1kyOXZjbVJwYm1GMFpYTWdQU0I3WEhKY2JpQWdibUZ0WlRvZ0oyTnZiM0prYVc1aGRHVnpKeXhjY2x4dUlDQnRZWFJqYURvZ0tHTnZiM0prYVc1aGRHVnpLU0E5UGlCamIyOXlaR2x1WVhSbGN5NXpkV0p6ZEhKcGJtY29NQ3dnTVRFcElEMDlQU0FuWTI5dmNtUnBibUYwWlhNbkxGeHlYRzRnSUc5dVJXNTBaWEk2SUNoMWNtd3NJR1YyWlc1MFFuVnpLU0E5UGlCN1hISmNibHh5WEc0Z0lDQWdZMjl1YzNRZ2V5QnNZWFFzSUd4dVp5QjlJRDBnWjJWMFZYSnNTR0Z6YUZCaGNtRnRjeWdwTzF4eVhHNGdJQ0FnWTI5dWMzUWdZMjl1ZEdWdWRFSnNiMk5ySUQwZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWduYzJWamRHbHZiaTV0WVdsdUlDNWpiMjUwWlc1MEp5azdYSEpjYmx4eVhHNGdJQ0FnWm1WMFkyZ29ZR2gwZEhCek9pOHZjMmh5YjNWa1pXUXRjM0JwY21VdE16VTNNRE11YUdWeWIydDFZWEJ3TG1OdmJTOW1iM0psWTJGemRDOGtlMnhoZEgwc0pIdHNibWQ5UDJ4aGJtYzlaVzRtZFc1cGRITTljMmxnS1Z4eVhHNGdJQ0FnSUNBdWRHaGxiaWh5WlhOd2IyNXpaU0E5UGlCeVpYTndiMjV6WlM1cWMyOXVLQ2twWEhKY2JpQWdJQ0FnSUM1MGFHVnVLR1JoZEdFZ1BUNGdlMXh5WEc0Z0lDQWdJQ0FnSUdsbUlDaGpiMjUwWlc1MFFteHZZMnN1WTJ4aGMzTk1hWE4wTG1OdmJuUmhhVzV6S0NkamIyd3RiV1F0T0NjcEtTQjdYSEpjYmlBZ0lDQWdJQ0FnSUNCamIyNTBaVzUwUW14dlkyc3VhVzV1WlhKSVZFMU1JRDBnSnljN1hISmNiaUFnSUNBZ0lDQWdmVnh5WEc0Z0lDQWdJQ0FnSUdOdmJuUmxiblJDYkc5amF5NWpiR0Z6YzB4cGMzUXVjbVZ0YjNabEtDZGpiMnd0YldRdGIyWm1jMlYwTFRJbkxDQW5ZMjlzTFcxa0xUZ25LVHRjY2x4dUlDQWdJQ0FnSUNCamIyNTBaVzUwUW14dlkyc3VZMnhoYzNOTWFYTjBMbUZrWkNnblkyOXNMVzFrTFRFeUp5azdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lHTnZibk4wSUcxaGNFUnBkaUE5SUdSdlkzVnRaVzUwTG1OeVpXRjBaVVZzWlcxbGJuUW9KMlJwZGljcE8xeHlYRzRnSUNBZ0lDQWdJRzFoY0VScGRpNWpiR0Z6YzB4cGMzUXVZV1JrS0NkdFlYQW5LVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdZMjl1YzNRZ2MzUmhja1JwZGlBOUlHUnZZM1Z0Wlc1MExtTnlaV0YwWlVWc1pXMWxiblFvSjJScGRpY3BPMXh5WEc0Z0lDQWdJQ0FnSUhOMFlYSkVhWFl1WTJ4aGMzTk1hWE4wTG1Ga1pDZ25jM1JoY2ljcE8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNBdkx5QnRZWEJFYVhZdWFXNXVaWEpJVkUxTUlEMGdKenhrYVhZZ1kyeGhjM005WENKamIyd3RiV1F0T1NCdFlYQmNJajQ4TDJScGRqNDhaR2wySUdOc1lYTnpQVndpWTI5c0xXMWtMVE1nYzNSaGNsd2lQand2WkdsMlBpZGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ0x5OGdhV1lnS0NGa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLQ2N1Wm05eVpXTmhjM1F0WW14dlkyc25LU2tnZTF4eVhHNGdJQ0FnSUNBZ0lDOHZJQ0FnYm1WM0lFMWhjQ2hsZG1WdWRFSjFjeXdnSnk1dFlYQW5LUzV5Wlc1a1pYSk5ZWEFvVzJ4aGRDd2diRzVuWFNrN1hISmNiaUFnSUNBZ0lDQWdMeThnZlZ4eVhHNWNjbHh1SUNBZ0lDQWdJQ0JwWmlBb0lXUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvSjNObFkzUnBiMjR1YldGcGJpQXVZMjl1ZEdWdWRDQXVabTl5WldOaGMzUXRZbXh2WTJzbktTa2dlMXh5WEc0Z0lDQWdJQ0FnSUNBZ1kyOXVjM1FnWm05eVpXTmhjM1JFYVhZZ1BTQmtiMk4xYldWdWRDNWpjbVZoZEdWRmJHVnRaVzUwS0Nka2FYWW5LVHRjY2x4dUlDQWdJQ0FnSUNBZ0lHWnZjbVZqWVhOMFJHbDJMbU5zWVhOelRHbHpkQzVoWkdRb0oyWnZjbVZqWVhOMExXSnNiMk5ySnlrN1hISmNiaUFnSUNBZ0lDQWdJQ0JqYjI1MFpXNTBRbXh2WTJzdVlYQndaVzVrS0dadmNtVmpZWE4wUkdsMktUdGNjbHh1SUNBZ0lDQWdJQ0I5WEhKY2JpQWdJQ0FnSUNBZ2JtVjNJRVp2Y21WallYTjBLQ2R6WldOMGFXOXVMbTFoYVc0Z0xtTnZiblJsYm5RZ0xtWnZjbVZqWVhOMExXSnNiMk5ySnl3Z1pHRjBZU2t1Y21WdVpHVnlSbTl5WldOaGMzUW9LVHRjY2x4dVhISmNiaUFnSUNBZ0lDQWdZMjl1ZEdWdWRFSnNiMk5yTG1Gd2NHVnVaQ2h6ZEdGeVJHbDJMQ0J0WVhCRWFYWXBPMXh5WEc1Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnTHk4Z1pYWmxiblJDZFhNdWRISnBaMmRsY2lnblkyOXZjbVJwYm1GMFpYTTZZMmhoYm1kbFpDY3NJSHRzWVhRc0lHeHVaMzBwTzF4eVhHNWNjbHh1SUNBZ0lDQWdJQ0JwWmlBb0lXUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvSnlOdFlYQW5LU2tnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdibVYzSUUxaGNDaGxkbVZ1ZEVKMWN5d2dKeTV0WVhBbktTNXlaVzVrWlhKTllYQW9XMnhoZEN3Z2JHNW5YU2s3WEhKY2JpQWdJQ0FnSUNBZ2ZWeHlYRzVjY2x4dUlDQWdJQ0FnSUNBdkx5QnBaaUFvSVdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9KeTV6ZEdGeUp5a3BJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lHNWxkeUJUZEdGeUtHVjJaVzUwUW5WekxDQW5Mbk4wWVhJbktTNXlaVzVrWlhKVGRHRnlLQ2s3WEhKY2JpQWdJQ0FnSUNBZ0x5OGdmVnh5WEc1Y2NseHVJQ0FnSUNBZ0lDQmxkbVZ1ZEVKMWN5NTBjbWxuWjJWeUtDZGpiMjl5WkdsdVlYUmxjenBqYUdGdVoyVmtKeXdnZTJ4aGRDd2diRzVuZlNrN1hISmNibHh5WEc0Z0lDQWdJQ0I5S1Z4eVhHNGdJQ0FnSUNBdVkyRjBZMmdvWlhKeWIzSWdQVDRnZTF4eVhHNGdJQ0FnSUNBZ0lHTnZiblJsYm5SQ2JHOWpheTVwYm01bGNraFVUVXdnUFNCZ1hISmNiaUFnSUNBZ0lDQWdJQ0E4YURJK1UyOXljbmtzSUhkbElHaGhkbVVnYzI5dFpTQmxjbkp2Y2lBNktEd3ZhREkrWEhKY2JpQWdJQ0FnSUNBZ0lDQThjQ0JqYkdGemN6MWNJbVZ5Y205eVhDSStKSHRsY25KdmNuMDhMM0ErWEhKY2JpQWdJQ0FnSUNBZ1lEdGNjbHh1SUNBZ0lDQWdmU2xjY2x4dUlDQjlMRnh5WEc1Y2NseHVJQ0J2Ymt4bFlYWmxLQ2tnZTF4eVhHNGdJSDFjY2x4dWZWeHlYRzRpWFgwPVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9yb3V0ZXNcXFxcY29vcmRpbmF0ZXMuanNcIixcIi9yb3V0ZXNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBpbmRleCA9IHtcbiAgbmFtZTogJ2luZGV4JyxcbiAgbWF0Y2g6ICcnLFxuICBvbkVudGVyOiBmdW5jdGlvbiBvbkVudGVyKCkge1xuICAgIHZhciBjb250ZW50QmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzZWN0aW9uLm1haW4gLmNvbnRlbnQnKTtcbiAgICBjb250ZW50QmxvY2suY2xhc3NMaXN0LnJlbW92ZSgnY29sLW1kLTEyJyk7XG4gICAgY29udGVudEJsb2NrLmNsYXNzTGlzdC5hZGQoJ2NvbC1tZC1vZmZzZXQtMicsICdjb2wtbWQtOCcpO1xuICAgIGNvbnRlbnRCbG9jay5pbm5lckhUTUwgPSAnXFxuICAgICAgICA8aDI+V2VsY29tZSB0byBjb29sIHdlYXRoZXIgYXBwLjwvaDI+XFxuICAgICAgICA8cD5FbnRlciB5b3VyIGNpdHkgdG8gZ2V0IGEgbGF0ZXN0IGZvcmVjYXN0ITwvcD5cXG4gICAgICAnO1xuICAgIGZldGNoKCdodHRwczovL2FwaS51c2VyaW5mby5pby91c2VyaW5mb3MnKS50aGVuKGZ1bmN0aW9uIChyZXNwb25jZSkge1xuICAgICAgcmV0dXJuIHJlc3BvbmNlLmpzb24oKTtcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICB2YXIgbmFtZSA9IGRhdGEuY2l0eS5uYW1lO1xuXG5cbiAgICAgIGNvbnRlbnRCbG9jay5pbm5lckhUTUwgKz0gJ1xcbiAgICAgICAgICAgIDxiciAvPlxcbiAgICAgICAgICAgIE9yIGNoZWNrIHdlYXRoZXIgZm9yXFxuICAgICAgICAgICAgPGEgaHJlZj1cIiNjaXR5PScgKyBuYW1lICsgJ1wiPicgKyBuYW1lICsgJzwvYT4gOylcXG4gICAgICAgICAgJztcbiAgICB9KTtcbiAgfVxufTtcblxuZXhwb3J0cy5pbmRleCA9IGluZGV4O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1sdVpHVjRMbXB6SWwwc0ltNWhiV1Z6SWpwYkltbHVaR1Y0SWl3aWJtRnRaU0lzSW0xaGRHTm9JaXdpYjI1RmJuUmxjaUlzSW1OdmJuUmxiblJDYkc5amF5SXNJbVJ2WTNWdFpXNTBJaXdpY1hWbGNubFRaV3hsWTNSdmNpSXNJbU5zWVhOelRHbHpkQ0lzSW5KbGJXOTJaU0lzSW1Ga1pDSXNJbWx1Ym1WeVNGUk5UQ0lzSW1abGRHTm9JaXdpZEdobGJpSXNJbkpsYzNCdmJtTmxJaXdpYW5OdmJpSXNJbVJoZEdFaUxDSmphWFI1SWwwc0ltMWhjSEJwYm1keklqb2lPenM3T3pzN1FVRkRRU3hKUVVGTlFTeFJRVUZSTzBGQlExWkRMRkZCUVUwc1QwRkVTVHRCUVVWV1F5eFRRVUZQTEVWQlJrYzdRVUZIVmtNc1YwRkJVeXh0UWtGQlRUdEJRVU5pTEZGQlFVMURMR1ZCUVdWRExGTkJRVk5ETEdGQlFWUXNRMEZCZFVJc2RVSkJRWFpDTEVOQlFYSkNPMEZCUTBGR0xHbENRVUZoUnl4VFFVRmlMRU5CUVhWQ1F5eE5RVUYyUWl4RFFVRTRRaXhYUVVFNVFqdEJRVU5CU2l4cFFrRkJZVWNzVTBGQllpeERRVUYxUWtVc1IwRkJka0lzUTBGQk1rSXNhVUpCUVROQ0xFVkJRVGhETEZWQlFUbERPMEZCUTBGTUxHbENRVUZoVFN4VFFVRmlPMEZCU1VGRExDdERRVU5IUXl4SlFVUklMRU5CUTFFN1FVRkJRU3hoUVVGWlF5eFRRVUZUUXl4SlFVRlVMRVZCUVZvN1FVRkJRU3hMUVVSU0xFVkJSVWRHTEVsQlJrZ3NRMEZGVVN4blFrRkJVVHRCUVVGQkxGVkJRMHBZTEVsQlJFa3NSMEZEUzJNc1MwRkJTME1zU1VGRVZpeERRVU5LWml4SlFVUkpPenM3UVVGSFdrY3NiVUpCUVdGTkxGTkJRV0lzTkVaQlIyMUNWQ3hKUVVodVFpeFZRVWMwUWtFc1NVRklOVUk3UVVGTFJDeExRVlpJTzBGQlYwUTdRVUYwUWxNc1EwRkJaRHM3VVVGNVFsTkVMRXNzUjBGQlFVRXNTeUlzSW1acGJHVWlPaUpwYm1SbGVDNXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWx4eVhHNWpiMjV6ZENCcGJtUmxlQ0E5SUh0Y2NseHVJQ0FnSUc1aGJXVTZJQ2RwYm1SbGVDY3NYSEpjYmlBZ0lDQnRZWFJqYURvZ0p5Y3NYSEpjYmlBZ0lDQnZia1Z1ZEdWeU9pQW9LU0E5UGlCN1hISmNiaUFnSUNBZ0lHTnZibk4wSUdOdmJuUmxiblJDYkc5amF5QTlJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb0ozTmxZM1JwYjI0dWJXRnBiaUF1WTI5dWRHVnVkQ2NwTzF4eVhHNGdJQ0FnSUNCamIyNTBaVzUwUW14dlkyc3VZMnhoYzNOTWFYTjBMbkpsYlc5MlpTZ25ZMjlzTFcxa0xURXlKeWs3WEhKY2JpQWdJQ0FnSUdOdmJuUmxiblJDYkc5amF5NWpiR0Z6YzB4cGMzUXVZV1JrS0NkamIyd3RiV1F0YjJabWMyVjBMVEluTENBblkyOXNMVzFrTFRnbktUdGNjbHh1SUNBZ0lDQWdZMjl1ZEdWdWRFSnNiMk5yTG1sdWJtVnlTRlJOVENBOUlHQmNjbHh1SUNBZ0lDQWdJQ0E4YURJK1YyVnNZMjl0WlNCMGJ5QmpiMjlzSUhkbFlYUm9aWElnWVhCd0xqd3ZhREkrWEhKY2JpQWdJQ0FnSUNBZ1BIQStSVzUwWlhJZ2VXOTFjaUJqYVhSNUlIUnZJR2RsZENCaElHeGhkR1Z6ZENCbWIzSmxZMkZ6ZENFOEwzQStYSEpjYmlBZ0lDQWdJR0E3WEhKY2JpQWdJQ0FnSUdabGRHTm9LR0JvZEhSd2N6b3ZMMkZ3YVM1MWMyVnlhVzVtYnk1cGJ5OTFjMlZ5YVc1bWIzTmdLVnh5WEc0Z0lDQWdJQ0FnSUM1MGFHVnVLSEpsYzNCdmJtTmxJRDArSUhKbGMzQnZibU5sTG1wemIyNG9LU2xjY2x4dUlDQWdJQ0FnSUNBdWRHaGxiaWhrWVhSaElEMCtJSHRjY2x4dUlDQWdJQ0FnSUNBZ0lHTnZibk4wSUhzZ2JtRnRaU0I5SUQwZ1pHRjBZUzVqYVhSNU8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNBZ0lHTnZiblJsYm5SQ2JHOWpheTVwYm01bGNraFVUVXdnS3owZ1lGeHlYRzRnSUNBZ0lDQWdJQ0FnSUNBOFluSWdMejVjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdUM0lnWTJobFkyc2dkMlZoZEdobGNpQm1iM0pjY2x4dUlDQWdJQ0FnSUNBZ0lDQWdQR0VnYUhKbFpqMWNJaU5qYVhSNVBTUjdibUZ0WlgxY0lqNGtlMjVoYldWOVBDOWhQaUE3S1Z4eVhHNGdJQ0FnSUNBZ0lDQWdZRHRjY2x4dUlDQWdJQ0FnSUNCOUtUdGNjbHh1SUNBZ0lIMHNYSEpjYm4xY2NseHVYSEpjYm1WNGNHOXlkQ0I3SUdsdVpHVjRJSDA3WEhKY2JpSmRmUT09XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL3JvdXRlc1xcXFxpbmRleC5qc1wiLFwiL3JvdXRlc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgRXZlbnRCdXMgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEV2ZW50QnVzKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBFdmVudEJ1cyk7XG5cbiAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEV2ZW50QnVzLCBbe1xuICAgIGtleTogXCJvblwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvbihuYW1lLCBmdW5jKSB7XG4gICAgICBpZiAoIXRoaXMubGlzdGVuZXJzW25hbWVdKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzW25hbWVdID0gW107XG4gICAgICB9XG5cbiAgICAgIHRoaXMubGlzdGVuZXJzW25hbWVdLnB1c2goZnVuYyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm9mZlwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvZmYobmFtZSwgZnVuYykge1xuICAgICAgaWYgKCF0aGlzLmxpc3RlbmVyc1tuYW1lXSkgcmV0dXJuO1xuXG4gICAgICB2YXIgaW5kZXggPSB0aGlzLmxpc3RlbmVyc1tuYW1lXS5pbmRleE9mKGZ1bmMpO1xuICAgICAgdGhpcy5saXN0ZW5lcnNbbmFtZV0uc3BsaWNlKGluZGV4LCAxKTtcblxuICAgICAgaWYgKHRoaXMubGlzdGVuZXJzW25hbWVdLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBkZWxldGUgdGhpcy5saXN0ZW5lcnNbbmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcInRyaWdnZXJcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gdHJpZ2dlcihuYW1lLCBkYXRhKSB7XG4gICAgICBpZiAoIXRoaXMubGlzdGVuZXJzW25hbWVdKSByZXR1cm47XG5cbiAgICAgIHRoaXMubGlzdGVuZXJzW25hbWVdLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBpdGVtKGRhdGEpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm9uY2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25jZShuYW1lLCBmdW5jKSB7XG4gICAgICAvLyDQv9GA0L7QsdC+0LLQsNC7INGH0LXRgNC10LcgbmV3IEZ1bmN0aW9uINCy0YvQt9GL0LLQsNGC0Ywg0YTRg9C90LrRhtC40Y4g0YEg0YLQsNC60LjQvCDQttC1INC90LDQt9Cy0LDQvdC40LXQvFxuICAgICAgLy8g0Lgg0L/QvtGC0L7QvCDRg9C00LDQu9GP0YLRjCDQsiDQvdC10LksINC90LUg0L/QvtC70YPRh9C40LvQvtGB0YxcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRXZlbnRCdXM7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEV2ZW50QnVzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWtWMlpXNTBRblZ6TG1weklsMHNJbTVoYldWeklqcGJJa1YyWlc1MFFuVnpJaXdpYkdsemRHVnVaWEp6SWl3aWJtRnRaU0lzSW1aMWJtTWlMQ0p3ZFhOb0lpd2lhVzVrWlhnaUxDSnBibVJsZUU5bUlpd2ljM0JzYVdObElpd2liR1Z1WjNSb0lpd2laR0YwWVNJc0ltMWhjQ0lzSW1sMFpXMGlYU3dpYldGd2NHbHVaM01pT2lJN096czdPenM3T3pzN1NVRkJUVUVzVVR0QlFVTktMSE5DUVVGak8wRkJRVUU3TzBGQlExb3NVMEZCUzBNc1UwRkJUQ3hIUVVGcFFpeEZRVUZxUWp0QlFVTkVPenM3TzNWQ1FVVkZReXhKTEVWQlFVMURMRWtzUlVGQlRUdEJRVU5pTEZWQlFVa3NRMEZCUXl4TFFVRkxSaXhUUVVGTUxFTkJRV1ZETEVsQlFXWXNRMEZCVEN4RlFVRXlRanRCUVVONlFpeGhRVUZMUkN4VFFVRk1MRU5CUVdWRExFbEJRV1lzU1VGQmRVSXNSVUZCZGtJN1FVRkRSRHM3UVVGRlJDeFhRVUZMUkN4VFFVRk1MRU5CUVdWRExFbEJRV1lzUlVGQmNVSkZMRWxCUVhKQ0xFTkJRVEJDUkN4SlFVRXhRanRCUVVORU96czdkMEpCUlVkRUxFa3NSVUZCVFVNc1NTeEZRVUZOTzBGQlEyUXNWVUZCU1N4RFFVRkRMRXRCUVV0R0xGTkJRVXdzUTBGQlpVTXNTVUZCWml4RFFVRk1MRVZCUVRKQ096dEJRVVV6UWl4VlFVRk5SeXhSUVVGUkxFdEJRVXRLTEZOQlFVd3NRMEZCWlVNc1NVRkJaaXhGUVVGeFFra3NUMEZCY2tJc1EwRkJOa0pJTEVsQlFUZENMRU5CUVdRN1FVRkRRU3hYUVVGTFJpeFRRVUZNTEVOQlFXVkRMRWxCUVdZc1JVRkJjVUpMTEUxQlFYSkNMRU5CUVRSQ1JpeExRVUUxUWl4RlFVRnRReXhEUVVGdVF6czdRVUZGUVN4VlFVRkpMRXRCUVV0S0xGTkJRVXdzUTBGQlpVTXNTVUZCWml4RlFVRnhRazBzVFVGQmNrSXNTMEZCWjBNc1EwRkJjRU1zUlVGQmRVTTdRVUZEY2tNc1pVRkJUeXhMUVVGTFVDeFRRVUZNTEVOQlFXVkRMRWxCUVdZc1EwRkJVRHRCUVVORU8wRkJRMFk3T3pzMFFrRkZUMEVzU1N4RlFVRk5UeXhKTEVWQlFVMDdRVUZEYkVJc1ZVRkJTU3hEUVVGRExFdEJRVXRTTEZOQlFVd3NRMEZCWlVNc1NVRkJaaXhEUVVGTUxFVkJRVEpDT3p0QlFVVXpRaXhYUVVGTFJDeFRRVUZNTEVOQlFXVkRMRWxCUVdZc1JVRkJjVUpSTEVkQlFYSkNMRU5CUVhsQ0xHZENRVUZSTzBGQlF5OUNReXhoUVVGTFJpeEpRVUZNTzBGQlEwUXNUMEZHUkR0QlFVZEVPenM3ZVVKQlJVbFFMRWtzUlVGQlRVTXNTU3hGUVVGTk8wRkJRMlk3UVVGRFFUdEJRVU5FT3pzN096czdhMEpCUjFsSUxGRWlMQ0ptYVd4bElqb2lSWFpsYm5SQ2RYTXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lKamJHRnpjeUJGZG1WdWRFSjFjeUI3WEhKY2JpQWdZMjl1YzNSeWRXTjBiM0lvS1NCN1hISmNiaUFnSUNCMGFHbHpMbXhwYzNSbGJtVnljeUE5SUh0OU8xeHlYRzRnSUgxY2NseHVYSEpjYmlBZ2IyNG9ibUZ0WlN3Z1puVnVZeWtnZTF4eVhHNGdJQ0FnYVdZZ0tDRjBhR2x6TG14cGMzUmxibVZ5YzF0dVlXMWxYU2tnZTF4eVhHNGdJQ0FnSUNCMGFHbHpMbXhwYzNSbGJtVnljMXR1WVcxbFhTQTlJRnRkTzF4eVhHNGdJQ0FnZlZ4eVhHNWNjbHh1SUNBZ0lIUm9hWE11YkdsemRHVnVaWEp6VzI1aGJXVmRMbkIxYzJnb1puVnVZeWs3WEhKY2JpQWdmVnh5WEc1Y2NseHVJQ0J2Wm1Zb2JtRnRaU3dnWm5WdVl5a2dlMXh5WEc0Z0lDQWdhV1lnS0NGMGFHbHpMbXhwYzNSbGJtVnljMXR1WVcxbFhTa2djbVYwZFhKdU8xeHlYRzVjY2x4dUlDQWdJR052Ym5OMElHbHVaR1Y0SUQwZ2RHaHBjeTVzYVhOMFpXNWxjbk5iYm1GdFpWMHVhVzVrWlhoUFppaG1kVzVqS1R0Y2NseHVJQ0FnSUhSb2FYTXViR2x6ZEdWdVpYSnpXMjVoYldWZExuTndiR2xqWlNocGJtUmxlQ3dnTVNrN1hISmNibHh5WEc0Z0lDQWdhV1lnS0hSb2FYTXViR2x6ZEdWdVpYSnpXMjVoYldWZExteGxibWQwYUNBOVBUMGdNQ2tnZTF4eVhHNGdJQ0FnSUNCa1pXeGxkR1VnZEdocGN5NXNhWE4wWlc1bGNuTmJibUZ0WlYwN1hISmNiaUFnSUNCOVhISmNiaUFnZlZ4eVhHNWNjbHh1SUNCMGNtbG5aMlZ5S0c1aGJXVXNJR1JoZEdFcElIdGNjbHh1SUNBZ0lHbG1JQ2doZEdocGN5NXNhWE4wWlc1bGNuTmJibUZ0WlYwcElISmxkSFZ5Ymp0Y2NseHVYSEpjYmlBZ0lDQjBhR2x6TG14cGMzUmxibVZ5YzF0dVlXMWxYUzV0WVhBb2FYUmxiU0E5UGlCN1hISmNiaUFnSUNBZ0lHbDBaVzBvWkdGMFlTazdYSEpjYmlBZ0lDQjlLVHRjY2x4dUlDQjlYSEpjYmx4eVhHNGdJRzl1WTJVb2JtRnRaU3dnWm5WdVl5a2dlMXh5WEc0Z0lDQWdMeThnMEwvUmdOQyswTEhRdnRDeTBMRFF1eURSaDlDMTBZRFF0ZEMzSUc1bGR5QkdkVzVqZEdsdmJpRFFzdEdMMExmUmk5Q3kwTERSZ3RHTUlOR0UwWVBRdmRDNjBZYlF1TkdPSU5HQklOR0MwTERRdXRDNDBMd2cwTGJRdFNEUXZkQ3cwTGZRc3RDdzBMM1F1TkMxMEx4Y2NseHVJQ0FnSUM4dklOQzRJTkMvMEw3Umd0QyswTHdnMFlQUXROQ3cwTHZSajlHQzBZd2cwTElnMEwzUXRkQzVMQ0RRdmRDMUlOQy8wTDdRdTlHRDBZZlF1TkM3MEw3UmdkR01YSEpjYmlBZ2ZWeHlYRzU5WEhKY2JseHlYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQkZkbVZ1ZEVKMWN6dGNjbHh1SWwxOVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi91dGlsc1xcXFxFdmVudEJ1cy5qc1wiLFwiL3V0aWxzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIGdldFVybEhhc2hQYXJhbXMgPSBleHBvcnRzLmdldFVybEhhc2hQYXJhbXMgPSBmdW5jdGlvbiBnZXRVcmxIYXNoUGFyYW1zKCkge1xuICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLmhhc2g7XG5cbiAgdmFyIHF1ZXJ5UGFyYW1zID0ge307XG5cbiAgdmFyIHBhcmFtID0gdXJsLnNwbGl0KCc/JylbMV0uc3BsaXQoJyYnKTtcblxuICBwYXJhbS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICB2YXIgaXRlbXMgPSBpdGVtLnNwbGl0KCc9Jyk7XG4gICAgcXVlcnlQYXJhbXNbaXRlbXNbMF1dID0gaXRlbXNbMV07XG4gIH0pO1xuXG4gIHJldHVybiBxdWVyeVBhcmFtcztcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbWhsYkhCbGNuTXVhbk1pWFN3aWJtRnRaWE1pT2xzaVoyVjBWWEpzU0dGemFGQmhjbUZ0Y3lJc0luVnliQ0lzSW5kcGJtUnZkeUlzSW14dlkyRjBhVzl1SWl3aWFHRnphQ0lzSW5GMVpYSjVVR0Z5WVcxeklpd2ljR0Z5WVcwaUxDSnpjR3hwZENJc0ltMWhjQ0lzSW1sMFpXMXpJaXdpYVhSbGJTSmRMQ0p0WVhCd2FXNW5jeUk2SWpzN096czdRVUZEVHl4SlFVRk5RU3c0UTBGQmJVSXNVMEZCYmtKQkxHZENRVUZ0UWl4SFFVRk5PMEZCUTNCRExFMUJRVWxETEUxQlFVMURMRTlCUVU5RExGRkJRVkFzUTBGQlowSkRMRWxCUVRGQ096dEJRVVZCTEUxQlFVbERMR05CUVdNc1JVRkJiRUk3TzBGQlJVRXNUVUZCU1VNc1VVRkJVVXdzU1VGQlNVMHNTMEZCU2l4RFFVRlZMRWRCUVZZc1JVRkJaU3hEUVVGbUxFVkJRV3RDUVN4TFFVRnNRaXhEUVVGM1FpeEhRVUY0UWl4RFFVRmFPenRCUVVWQlJDeFJRVUZOUlN4SFFVRk9MRU5CUVZVc1owSkJRVkU3UVVGRGFFSXNVVUZCU1VNc1VVRkJVVU1zUzBGQlMwZ3NTMEZCVEN4RFFVRlhMRWRCUVZnc1EwRkJXanRCUVVOQlJpeG5Ra0ZCV1Vrc1RVRkJUU3hEUVVGT0xFTkJRVm9zU1VGQmQwSkJMRTFCUVUwc1EwRkJUaXhEUVVGNFFqdEJRVU5FTEVkQlNFUTdPMEZCUzBFc1UwRkJUMG9zVjBGQlVEdEJRVU5FTEVOQllrMGlMQ0ptYVd4bElqb2lhR1ZzY0dWeWN5NXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWx4eVhHNWxlSEJ2Y25RZ1kyOXVjM1FnWjJWMFZYSnNTR0Z6YUZCaGNtRnRjeUE5SUNncElEMCtJSHRjY2x4dUlDQnNaWFFnZFhKc0lEMGdkMmx1Wkc5M0xteHZZMkYwYVc5dUxtaGhjMmc3WEhKY2JseHlYRzRnSUd4bGRDQnhkV1Z5ZVZCaGNtRnRjeUE5SUh0OU8xeHlYRzVjY2x4dUlDQnNaWFFnY0dGeVlXMGdQU0IxY213dWMzQnNhWFFvSno4bktWc3hYUzV6Y0d4cGRDZ25KaWNwTzF4eVhHNWNjbHh1SUNCd1lYSmhiUzV0WVhBb2FYUmxiU0E5UGlCN1hISmNiaUFnSUNCc1pYUWdhWFJsYlhNZ1BTQnBkR1Z0TG5Od2JHbDBLQ2M5SnlrN1hISmNiaUFnSUNCeGRXVnllVkJoY21GdGMxdHBkR1Z0YzFzd1hWMGdQU0JwZEdWdGMxc3hYVHRjY2x4dUlDQjlLVnh5WEc1Y2NseHVJQ0J5WlhSMWNtNGdjWFZsY25sUVlYSmhiWE03WEhKY2JuMWNjbHh1SWwxOVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi91dGlsc1xcXFxoZWxwZXJzLmpzXCIsXCIvdXRpbHNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbi8vINGB0LzRi9GB0Lsg0L/QvtC90Y/Quywg0L/QvtGC0L7QvCDQvdCw0L/QuNGI0YMg0YHQstC+0LlcblxudmFyIFJvdXRlciA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gUm91dGVyKGNvbmZpZykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBSb3V0ZXIpO1xuXG4gICAgdGhpcy5ldmVudEJ1cyA9IGNvbmZpZy5ldmVudEJ1cztcbiAgICB0aGlzLnJvdXRlcyA9IGNvbmZpZy5yb3V0ZXMgfHwgW107XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhSb3V0ZXIsIFt7XG4gICAga2V5OiAnaW5pdCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICBjb25zb2xlLmxvZygnLS0tPiByb3V0ZXIgaW5pdCcpO1xuICAgICAgLy8gMS4g0J/QvtC00L/QuNGB0LDRgtGMIHRoaXMuaGFuZGxlVXJsINC90LAg0LjQt9C80LXQvdC10L3QuNGPIHVybFxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5oYW5kbGVVcmwod2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgICAgfSk7XG4gICAgICAvLyAyLiDQktGL0L/QvtC70L3QuNGC0YwgdGhpcy5oYW5kbGVVcmxcbiAgICAgIHRoaXMuaGFuZGxlVXJsKHdpbmRvdy5sb2NhdGlvbi5oYXNoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdmaW5kUHJldmlvdXNBY3RpdmVSb3V0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZpbmRQcmV2aW91c0FjdGl2ZVJvdXRlKCkge1xuICAgICAgY29uc29sZS5sb2coJy0tLT4gcm91dGVyIGZpbmRQcmV2aW91c0FjdGl2ZVJvdXRlOiAnICsgKHRoaXMuY3VycmVudFJvdXRlIHx8IHt9KS5uYW1lKTtcbiAgICAgIC8vINCd0LDQudGC0Lgg0YDQvtGD0YIg0YEg0LrQvtGC0L7RgNC+0LPQviDRg9GF0L7QtNC40LxcbiAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRSb3V0ZTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdmaW5kTmV3QWN0aXZlUm91dGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBmaW5kTmV3QWN0aXZlUm91dGUodXJsKSB7XG4gICAgICAvLyDQndCw0LnRgtC4INGA0L7Rg9GCINC90LAg0LrQvtGC0L7RgNGL0Lkg0L/QtdGA0LXRhdC+0LTQuNC8XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJvdXRlcyk7XG4gICAgICB2YXIgcm91dGUgPSB0aGlzLnJvdXRlcy5maW5kKGZ1bmN0aW9uIChyb3V0ZUl0ZW0pIHtcbiAgICAgICAgaWYgKHR5cGVvZiByb3V0ZUl0ZW0ubWF0Y2ggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgcmV0dXJuIHVybCA9PT0gcm91dGVJdGVtLm1hdGNoO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiByb3V0ZUl0ZW0ubWF0Y2ggPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gcm91dGVJdGVtLm1hdGNoKHVybCk7XG4gICAgICAgIH0gZWxzZSBpZiAocm91dGVJdGVtLm1hdGNoIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgICAgcmV0dXJuIHVybC5tYXRjaChyb3V0ZUl0ZW0ubWF0Y2gpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc29sZS5sb2coJy0tLT4gcm91dGVyIGZpbmROZXdBY3RpdmVSb3V0ZTogJyArIHVybCArICcgLS0gJyArIChyb3V0ZSB8fCB7fSkubmFtZSk7XG4gICAgICByZXR1cm4gcm91dGU7XG4gICAgfVxuICAgIC8vIGdldFJvdXRlUGFyYW1zKHJvdXRlLCB1cmwpIHtcbiAgICAvLyBcdCB2YXIgcGFyYW1zID0gdXJsLm1hdGNoKHJvdXRlLm1hdGNoKSB8fCBbXTtcbiAgICAvLyAgICBwYXJhbXMuc2hpZnQoKTtcbiAgICAvLyAgICByZXR1cm4gcGFyYW1zO1xuICAgIC8vIH0sXG5cbiAgfSwge1xuICAgIGtleTogJ2hhbmRsZVVybCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZVVybCh1cmwpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICB1cmwgPSB1cmwuc2xpY2UoMSk7XG4gICAgICAvLyDQndCw0LnRgtC4INGC0LXQutGD0YnQuNC5INGA0L7Rg9GCXG4gICAgICB2YXIgcHJldmlvdXNSb3V0ZSA9IHRoaXMuZmluZFByZXZpb3VzQWN0aXZlUm91dGUoKTtcbiAgICAgIC8vINCd0LDQudGC0Lgg0L3QvtCy0YvQuSDRgNC+0YPRglxuICAgICAgdmFyIG5ld1JvdXRlID0gdGhpcy5maW5kTmV3QWN0aXZlUm91dGUodXJsKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKG5ld1JvdXRlKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHVybCk7XG5cbiAgICAgIC8vIGxldCByb3V0ZVBhcmFtcyA9IHRoaXMuZ2V0Um91dGVQYXJhbXMobmV3Um91dGUsIHVybCk7XG5cbiAgICAgIC8vINCV0YHQu9C4INC10YHRgtGMINGA0L7Rg9GCINGBINC60L7RgtC+0YDQvtCz0L4g0YPRhdC+0LTQuNC8IC0g0LLRi9C/0L7Qu9C90LjRgtGMINC10LPQviAub25MZWF2ZVxuICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBwcmV2aW91c1JvdXRlICYmIHByZXZpb3VzUm91dGUub25MZWF2ZSAmJiBwcmV2aW91c1JvdXRlLm9uTGVhdmUod2luZG93LmxvY2F0aW9uLmhhc2gsIF90aGlzMi5ldmVudEJ1cyk7XG4gICAgICB9XG4gICAgICAvLyDQn9C+0YHQu9C1INGN0YLQvtCz0L4g0LLRi9C/0L7Qu9C90LjRgtGMIC5vbkJlZm9yZUVudGVyINC00LvRjyDQvdC+0LLQvtCz0L4g0LDQutGC0LjQstC90L7Qs9C+INGA0L7Rg9GC0LBcbiAgICAgICkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXdSb3V0ZSAmJiBuZXdSb3V0ZS5vbkJlZm9yZUVudGVyICYmIG5ld1JvdXRlLm9uQmVmb3JlRW50ZXIod2luZG93LmxvY2F0aW9uLmhhc2gsIF90aGlzMi5ldmVudEJ1cyk7XG4gICAgICB9XG4gICAgICAvLyDQn9C+0YHQu9C1INGN0YLQvtCz0L4g0LLRi9C/0L7Qu9C90LjRgtGMIC5vbkVudGVyINC00LvRjyDQvdC+0LPQvtCy0L7Qs9C+INCw0LrRgtC40LLQvdC+0LPQviDRgNC+0YPRgtCwICgg0YLQvtC70YzQutC+INC10YHQu9C4INGBIC5vbkJlZm9yZUVudGVyINCy0YHQtSDQvtC6KVxuXG4gICAgICApLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3Um91dGUgJiYgbmV3Um91dGUub25FbnRlciAmJiBuZXdSb3V0ZS5vbkVudGVyKHdpbmRvdy5sb2NhdGlvbi5oYXNoLCBfdGhpczIuZXZlbnRCdXMpO1xuICAgICAgfSkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzMi5jdXJyZW50Um91dGUgPSBuZXdSb3V0ZTtcbiAgICAgICAgLy8gdGhpcy5jdXJyZW50Um91dGVQYXJhbXMgPSByb3V0ZVBhcmFtcztcbiAgICAgIH0pO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBSb3V0ZXI7XG59KCk7XG5cbjtcblxuZXhwb3J0cy5kZWZhdWx0ID0gUm91dGVyO1xuXG4vLyBjbGFzcyBSb3V0ZXIge1xuLy8gICBjb25zdHJ1Y3Rvcihyb3V0ZXMsIGV2ZW50QnVzKSB7XG4vLyAgICAgdGhpcy5ldmVudEJ1cyA9IGV2ZW50QnVzO1xuLy8gICAgIHRoaXMucm91dGVzID0gcm91dGVzO1xuLy9cbi8vICAgICB0aGlzLmhhbmRsZUhhc2hDaGFuZ2UgPSB0aGlzLmhhbmRsZUhhc2hDaGFuZ2UuYmluZCh0aGlzKTtcbi8vICAgfVxuLy9cbi8vXG4vLyAgIGluaXQoKSB7XG4vLyAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCB0aGlzLmhhbmRsZUhhc2hDaGFuZ2UpO1xuLy8gICAgIHRoaXMuaGFuZGxlSGFzaENoYW5nZSgpO1xuLy8gICB9XG4vL1xuLy8gICBmaW5kUHJldmlvdXNBY3RpdmVSb3V0ZSgpIHtcbi8vXG4vLyAgIH1cbi8vXG4vLyAgIGZpbmROZXdBY3RpdmVSb3V0ZSgpIHtcbi8vXG4vLyAgIH1cbi8vXG4vL1xuLy8gICBoYW5kbGVIYXNoQ2hhbmdlKCkge1xuLy8gICAgIGNvbnN0IGxhc3RSb3V0ZSA9IHdpbmRvdy5sb2NhdGlvbi5vbGRVcmw7XG4vLyAgICAgY29uc3QgbmV3Um91dGUgPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcbi8vXG4vL1xuLy9cbi8vICAgICAvLyBsYXN0IHJvdXRlIG9uTGVhdmVcbi8vICAgICB0aGlzLnJvdXRlc1tsYXN0Um91dGVdLm9uTGVhdmUodGhpcy5ldmVudEJ1cylcbi8vICAgICAgIC50aGVuKCgpID0+IHtcbi8vICAgICAgICAgLy8gbmV3IHJvdXRlIGJlZm9yZUVudGVyXG4vLyAgICAgICAgIHJldHVybiB0aGlzLnJvdXRlc1tuZXdSb3V0ZV0ub25CZWZvcmVFbnRlcih0aGlzLmV2ZW50QnVzKTtcbi8vICAgICAgIH0pXG4vLyAgICAgICAudGhlbigoKSA9PiB7XG4vLyAgICAgICAgIC8vIG5ldyByb3V0ZSBvbkVudGVyXG4vLyAgICAgICAgIHJldHVybiB0aGlzLnJvdXRlc1tuZXdSb3V0ZV0ub25FbnRlcih0aGlzLmV2ZW50QnVzKTtcbi8vICAgICAgIH0pXG4vLyAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4vLyAgICAgICB9KVxuLy8gICB9XG4vLyB9XG4vL1xuLy8gZXhwb3J0IGRlZmF1bHQgUm91dGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5KdmRYUmxjaTVxY3lKZExDSnVZVzFsY3lJNld5SlNiM1YwWlhJaUxDSmpiMjVtYVdjaUxDSmxkbVZ1ZEVKMWN5SXNJbkp2ZFhSbGN5SXNJbWx1YVhRaUxDSmpiMjV6YjJ4bElpd2liRzluSWl3aWQybHVaRzkzSWl3aVlXUmtSWFpsYm5STWFYTjBaVzVsY2lJc0ltaGhibVJzWlZWeWJDSXNJbXh2WTJGMGFXOXVJaXdpYUdGemFDSXNJbU4xY25KbGJuUlNiM1YwWlNJc0ltNWhiV1VpTENKMWNtd2lMQ0p5YjNWMFpTSXNJbVpwYm1RaUxDSnliM1YwWlVsMFpXMGlMQ0p0WVhSamFDSXNJbEpsWjBWNGNDSXNJbk5zYVdObElpd2ljSEpsZG1sdmRYTlNiM1YwWlNJc0ltWnBibVJRY21WMmFXOTFjMEZqZEdsMlpWSnZkWFJsSWl3aWJtVjNVbTkxZEdVaUxDSm1hVzVrVG1WM1FXTjBhWFpsVW05MWRHVWlMQ0pRY205dGFYTmxJaXdpY21WemIyeDJaU0lzSW5Sb1pXNGlMQ0p2Ymt4bFlYWmxJaXdpYjI1Q1pXWnZjbVZGYm5SbGNpSXNJbTl1Ulc1MFpYSWlYU3dpYldGd2NHbHVaM01pT2lJN096czdPenM3T3pzN1FVRkRRVHM3U1VGRlRVRXNUVHRCUVVOS0xHdENRVUZaUXl4TlFVRmFMRVZCUVc5Q08wRkJRVUU3TzBGQlEyeENMRk5CUVV0RExGRkJRVXdzUjBGQlowSkVMRTlCUVU5RExGRkJRWFpDTzBGQlEwRXNVMEZCUzBNc1RVRkJUQ3hIUVVGalJpeFBRVUZQUlN4TlFVRlFMRWxCUVdsQ0xFVkJRUzlDT3p0QlFVVkJMRk5CUVV0RExFbEJRVXc3UVVGRFJEczdPenN5UWtGRlRUdEJRVUZCT3p0QlFVTk1ReXhqUVVGUlF5eEhRVUZTTEVOQlFWa3NhMEpCUVZvN1FVRkRRVHRCUVVOQlF5eGhRVUZQUXl4blFrRkJVQ3hEUVVGM1FpeFpRVUY0UWl4RlFVRnpRenRCUVVGQkxHVkJRVTBzVFVGQlMwTXNVMEZCVEN4RFFVRmxSaXhQUVVGUFJ5eFJRVUZRTEVOQlFXZENReXhKUVVFdlFpeERRVUZPTzBGQlFVRXNUMEZCZEVNN1FVRkRRVHRCUVVOQkxGZEJRVXRHTEZOQlFVd3NRMEZCWlVZc1QwRkJUMGNzVVVGQlVDeERRVUZuUWtNc1NVRkJMMEk3UVVGRFJEczdPemhEUVVWNVFqdEJRVU40UWs0c1kwRkJVVU1zUjBGQlVpd3lRMEZCYjBRc1EwRkJReXhMUVVGTFRTeFpRVUZNTEVsQlFYRkNMRVZCUVhSQ0xFVkJRVEJDUXl4SlFVRTVSVHRCUVVOQk8wRkJRMEVzWVVGQlR5eExRVUZMUkN4WlFVRmFPMEZCUTBRN096dDFRMEZGYTBKRkxFY3NSVUZCU3p0QlFVTjBRanRCUVVOQk8wRkJRMEVzVlVGQlNVTXNVVUZCVVN4TFFVRkxXaXhOUVVGTUxFTkJRVmxoTEVsQlFWb3NRMEZCYVVJc1ZVRkJRME1zVTBGQlJDeEZRVUZsTzBGQlF6RkRMRmxCUVVrc1QwRkJUMEVzVlVGQlZVTXNTMEZCYWtJc1MwRkJNa0lzVVVGQkwwSXNSVUZCZVVNN1FVRkRka01zYVVKQlFVOUtMRkZCUVZGSExGVkJRVlZETEV0QlFYcENPMEZCUTBRc1UwRkdSQ3hOUVVWUExFbEJRVWtzVDBGQlQwUXNWVUZCVlVNc1MwRkJha0lzUzBGQk1rSXNWVUZCTDBJc1JVRkJNa003UVVGRGFFUXNhVUpCUVU5RUxGVkJRVlZETEV0QlFWWXNRMEZCWjBKS0xFZEJRV2hDTEVOQlFWQTdRVUZEUkN4VFFVWk5MRTFCUlVFc1NVRkJTVWNzVlVGQlZVTXNTMEZCVml4WlFVRXlRa01zVFVGQkwwSXNSVUZCZFVNN1FVRkROVU1zYVVKQlFVOU1MRWxCUVVsSkxFdEJRVW9zUTBGQlZVUXNWVUZCVlVNc1MwRkJjRUlzUTBGQlVEdEJRVU5FTzBGQlEwWXNUMEZTVnl4RFFVRmFPenRCUVZWQllpeGpRVUZSUXl4SFFVRlNMSE5EUVVFclExRXNSMEZCTDBNc1dVRkJlVVFzUTBGQlEwTXNVMEZCVXl4RlFVRldMRVZCUVdOR0xFbEJRWFpGTzBGQlEwRXNZVUZCVDBVc1MwRkJVRHRCUVVORU8wRkJRMFE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN096czRRa0ZEVlVRc1J5eEZRVUZMTzBGQlFVRTdPMEZCUTJKQkxGbEJRVTFCTEVsQlFVbE5MRXRCUVVvc1EwRkJWU3hEUVVGV0xFTkJRVTQ3UVVGRFFUdEJRVU5CTEZWQlFVbERMR2RDUVVGblFpeExRVUZMUXl4MVFrRkJUQ3hGUVVGd1FqdEJRVU5CTzBGQlEwRXNWVUZCU1VNc1YwRkJWeXhMUVVGTFF5eHJRa0ZCVEN4RFFVRjNRbFlzUjBGQmVFSXNRMEZCWmp0QlFVTkJPMEZCUTBFN08wRkJSVUU3TzBGQlJVRTdRVUZEUVZjc1kwRkJVVU1zVDBGQlVpeEhRVU5IUXl4SlFVUklMRU5CUTFFN1FVRkJRU3hsUVVGTlRpeHBRa0ZCYVVKQkxHTkJRV05QTEU5QlFTOUNMRWxCUVRCRFVDeGpRVUZqVHl4UFFVRmtMRU5CUVhOQ2NrSXNUMEZCVDBjc1VVRkJVQ3hEUVVGblFrTXNTVUZCZEVNc1JVRkJORU1zVDBGQlMxUXNVVUZCYWtRc1EwRkJhRVE3UVVGQlFUdEJRVU5PTzBGQlJrWXNVVUZIUjNsQ0xFbEJTRWdzUTBGSFVUdEJRVUZCTEdWQlFVMUtMRmxCUVZsQkxGTkJRVk5OTEdGQlFYSkNMRWxCUVhORFRpeFRRVUZUVFN4aFFVRlVMRU5CUVhWQ2RFSXNUMEZCVDBjc1VVRkJVQ3hEUVVGblFrTXNTVUZCZGtNc1JVRkJOa01zVDBGQlMxUXNVVUZCYkVRc1EwRkJOVU03UVVGQlFUdEJRVU5PT3p0QlFVcEdMRkZCVFVkNVFpeEpRVTVJTEVOQlRWRTdRVUZCUVN4bFFVRk5TaXhaUVVGWlFTeFRRVUZUVHl4UFFVRnlRaXhKUVVGblExQXNVMEZCVTA4c1QwRkJWQ3hEUVVGcFFuWkNMRTlCUVU5SExGRkJRVkFzUTBGQlowSkRMRWxCUVdwRExFVkJRWFZETEU5QlFVdFVMRkZCUVRWRExFTkJRWFJETzBGQlFVRXNUMEZPVWl4RlFVOUhlVUlzU1VGUVNDeERRVTlSTEZsQlFVMDdRVUZEVml4bFFVRkxaaXhaUVVGTUxFZEJRVzlDVnl4UlFVRndRanRCUVVOQk8wRkJRMGdzVDBGV1JEdEJRVmRFT3pzN096czdRVUZEUmpzN2EwSkJSV04yUWl4Tk96dEJRVWxtTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CSWl3aVptbHNaU0k2SW5KdmRYUmxjaTVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklseHlYRzR2THlEUmdkQzgwWXZSZ2RDN0lOQy8wTDdRdmRHUDBMc3NJTkMvMEw3Umd0QyswTHdnMEwzUXNOQy8wTGpSaU5HRElOR0IwTExRdnRDNVhISmNibHh5WEc1amJHRnpjeUJTYjNWMFpYSWdlMXh5WEc0Z0lHTnZibk4wY25WamRHOXlLR052Ym1acFp5a2dlMXh5WEc0Z0lDQWdkR2hwY3k1bGRtVnVkRUoxY3lBOUlHTnZibVpwWnk1bGRtVnVkRUoxY3p0Y2NseHVJQ0FnSUhSb2FYTXVjbTkxZEdWeklEMGdZMjl1Wm1sbkxuSnZkWFJsY3lCOGZDQmJYVHRjY2x4dVhISmNiaUFnSUNCMGFHbHpMbWx1YVhRb0tUdGNjbHh1SUNCOVhISmNibHh5WEc0Z0lHbHVhWFFvS1NCN1hISmNiaUFnSUNCamIyNXpiMnhsTG14dlp5Z25MUzB0UGlCeWIzVjBaWElnYVc1cGRDY3BPMXh5WEc0Z0lDQWdMeThnTVM0ZzBKL1F2dEMwMEwvUXVOR0IwTERSZ3RHTUlIUm9hWE11YUdGdVpHeGxWWEpzSU5DOTBMQWcwTGpRdDlDODBMWFF2ZEMxMEwzUXVOR1BJSFZ5YkZ4eVhHNGdJQ0FnZDJsdVpHOTNMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9KMmhoYzJoamFHRnVaMlVuTENBb0tTQTlQaUIwYUdsekxtaGhibVJzWlZWeWJDaDNhVzVrYjNjdWJHOWpZWFJwYjI0dWFHRnphQ2twTzF4eVhHNGdJQ0FnTHk4Z01pNGcwSkxSaTlDLzBMN1F1OUM5MExqUmd0R01JSFJvYVhNdWFHRnVaR3hsVlhKc1hISmNiaUFnSUNCMGFHbHpMbWhoYm1Sc1pWVnliQ2gzYVc1a2IzY3ViRzlqWVhScGIyNHVhR0Z6YUNrN1hISmNiaUFnZlZ4eVhHNWNjbHh1SUNCbWFXNWtVSEpsZG1sdmRYTkJZM1JwZG1WU2IzVjBaU2dwSUh0Y2NseHVJQ0FnSUdOdmJuTnZiR1V1Ykc5bktHQXRMUzArSUhKdmRYUmxjaUJtYVc1a1VISmxkbWx2ZFhOQlkzUnBkbVZTYjNWMFpUb2dKSHNvZEdocGN5NWpkWEp5Wlc1MFVtOTFkR1VnZkh3Z2UzMHBMbTVoYldWOVlDazdYSEpjYmlBZ0lDQXZMeURRbmRDdzBMblJndEM0SU5HQTBMN1JnOUdDSU5HQklOQzYwTDdSZ3RDKzBZRFF2dEN6MEw0ZzBZUFJoZEMrMExUUXVOQzhYSEpjYmlBZ0lDQnlaWFIxY200Z2RHaHBjeTVqZFhKeVpXNTBVbTkxZEdVN1hISmNiaUFnZlZ4eVhHNWNjbHh1SUNCbWFXNWtUbVYzUVdOMGFYWmxVbTkxZEdVb2RYSnNLU0I3WEhKY2JpQWdJQ0F2THlEUW5kQ3cwTG5SZ3RDNElOR0EwTDdSZzlHQ0lOQzkwTEFnMExyUXZ0R0MwTDdSZ05HTDBMa2cwTC9RdGRHQTBMWFJoZEMrMExUUXVOQzhYSEpjYmlBZ0lDQXZMeUJqYjI1emIyeGxMbXh2WnloMGFHbHpMbkp2ZFhSbGN5azdYSEpjYmlBZ0lDQnNaWFFnY205MWRHVWdQU0IwYUdsekxuSnZkWFJsY3k1bWFXNWtLQ2h5YjNWMFpVbDBaVzBwSUQwK0lIdGNjbHh1SUNBZ0lDQWdhV1lnS0hSNWNHVnZaaUJ5YjNWMFpVbDBaVzB1YldGMFkyZ2dQVDA5SUNkemRISnBibWNuS1NCN1hISmNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIVnliQ0E5UFQwZ2NtOTFkR1ZKZEdWdExtMWhkR05vTzF4eVhHNGdJQ0FnSUNCOUlHVnNjMlVnYVdZZ0tIUjVjR1Z2WmlCeWIzVjBaVWwwWlcwdWJXRjBZMmdnUFQwOUlDZG1kVzVqZEdsdmJpY3BJSHRjY2x4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnY205MWRHVkpkR1Z0TG0xaGRHTm9LSFZ5YkNrN1hISmNiaUFnSUNBZ0lIMGdaV3h6WlNCcFppQW9jbTkxZEdWSmRHVnRMbTFoZEdOb0lHbHVjM1JoYm1ObGIyWWdVbVZuUlhod0tTQjdYSEpjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSFZ5YkM1dFlYUmphQ2h5YjNWMFpVbDBaVzB1YldGMFkyZ3BPMXh5WEc0Z0lDQWdJQ0I5WEhKY2JpQWdJQ0I5S1R0Y2NseHVYSEpjYmlBZ0lDQmpiMjV6YjJ4bExteHZaeWhnTFMwdFBpQnliM1YwWlhJZ1ptbHVaRTVsZDBGamRHbDJaVkp2ZFhSbE9pQWtlM1Z5YkgwZ0xTMGdKSHNvY205MWRHVWdmSHdnZTMwcExtNWhiV1Y5WUNrN1hISmNiaUFnSUNCeVpYUjFjbTRnY205MWRHVTdYSEpjYmlBZ2ZWeHlYRzRnSUM4dklHZGxkRkp2ZFhSbFVHRnlZVzF6S0hKdmRYUmxMQ0IxY213cElIdGNjbHh1SUNBdkx5QmNkQ0IyWVhJZ2NHRnlZVzF6SUQwZ2RYSnNMbTFoZEdOb0tISnZkWFJsTG0xaGRHTm9LU0I4ZkNCYlhUdGNjbHh1SUNBdkx5QWdJQ0J3WVhKaGJYTXVjMmhwWm5Rb0tUdGNjbHh1SUNBdkx5QWdJQ0J5WlhSMWNtNGdjR0Z5WVcxek8xeHlYRzRnSUM4dklIMHNYSEpjYmlBZ2FHRnVaR3hsVlhKc0tIVnliQ2tnZTF4eVhHNGdJQ0FnZFhKc0lEMGdkWEpzTG5Oc2FXTmxLREVwTzF4eVhHNGdJQ0FnTHk4ZzBKM1FzTkM1MFlMUXVDRFJndEMxMExyUmc5R0owTGpRdVNEUmdOQyswWVBSZ2x4eVhHNGdJQ0FnYkdWMElIQnlaWFpwYjNWelVtOTFkR1VnUFNCMGFHbHpMbVpwYm1SUWNtVjJhVzkxYzBGamRHbDJaVkp2ZFhSbEtDazdYSEpjYmlBZ0lDQXZMeURRbmRDdzBMblJndEM0SU5DOTBMN1FzdEdMMExrZzBZRFF2dEdEMFlKY2NseHVJQ0FnSUd4bGRDQnVaWGRTYjNWMFpTQTlJSFJvYVhNdVptbHVaRTVsZDBGamRHbDJaVkp2ZFhSbEtIVnliQ2s3WEhKY2JpQWdJQ0F2THlCamIyNXpiMnhsTG14dlp5aHVaWGRTYjNWMFpTazdYSEpjYmlBZ0lDQXZMeUJqYjI1emIyeGxMbXh2WnloMWNtd3BPMXh5WEc1Y2NseHVJQ0FnSUM4dklHeGxkQ0J5YjNWMFpWQmhjbUZ0Y3lBOUlIUm9hWE11WjJWMFVtOTFkR1ZRWVhKaGJYTW9ibVYzVW05MWRHVXNJSFZ5YkNrN1hISmNibHh5WEc0Z0lDQWdMeThnMEpYUmdkQzcwTGdnMExYUmdkR0MwWXdnMFlEUXZ0R0QwWUlnMFlFZzBMclF2dEdDMEw3UmdOQyswTFBRdmlEUmc5R0YwTDdRdE5DNDBMd2dMU0RRc3RHTDBML1F2dEM3MEwzUXVOR0MwWXdnMExYUXM5QytJQzV2Ymt4bFlYWmxYSEpjYmlBZ0lDQlFjbTl0YVhObExuSmxjMjlzZG1Vb0tWeHlYRzRnSUNBZ0lDQXVkR2hsYmlnb0tTQTlQaUJ3Y21WMmFXOTFjMUp2ZFhSbElDWW1JSEJ5WlhacGIzVnpVbTkxZEdVdWIyNU1aV0YyWlNBbUppQndjbVYyYVc5MWMxSnZkWFJsTG05dVRHVmhkbVVvZDJsdVpHOTNMbXh2WTJGMGFXOXVMbWhoYzJnc0lIUm9hWE11WlhabGJuUkNkWE1wS1Z4eVhHNGdJQ0FnSUNBdkx5RFFuOUMrMFlIUXU5QzFJTkdOMFlMUXZ0Q3owTDRnMExMUmk5Qy8wTDdRdTlDOTBMalJndEdNSUM1dmJrSmxabTl5WlVWdWRHVnlJTkMwMEx2Ump5RFF2ZEMrMExMUXZ0Q3owTDRnMExEUXV0R0MwTGpRc3RDOTBMN1FzOUMrSU5HQTBMN1JnOUdDMExCY2NseHVJQ0FnSUNBZ0xuUm9aVzRvS0NrZ1BUNGdibVYzVW05MWRHVWdKaVlnYm1WM1VtOTFkR1V1YjI1Q1pXWnZjbVZGYm5SbGNpQW1KaUJ1WlhkU2IzVjBaUzV2YmtKbFptOXlaVVZ1ZEdWeUtIZHBibVJ2ZHk1c2IyTmhkR2x2Ymk1b1lYTm9MQ0IwYUdsekxtVjJaVzUwUW5WektTbGNjbHh1SUNBZ0lDQWdMeThnMEovUXZ0R0IwTHZRdFNEUmpkR0MwTDdRczlDK0lOQ3kwWXZRdjlDKzBMdlF2ZEM0MFlMUmpDQXViMjVGYm5SbGNpRFF0TkM3MFk4ZzBMM1F2dEN6MEw3UXN0QyswTFBRdmlEUXNOQzYwWUxRdU5DeTBMM1F2dEN6MEw0ZzBZRFF2dEdEMFlMUXNDQW9JTkdDMEw3UXU5R00wTHJRdmlEUXRkR0IwTHZRdUNEUmdTQXViMjVDWldadmNtVkZiblJsY2lEUXN0R0IwTFVnMEw3UXVpbGNjbHh1WEhKY2JpQWdJQ0FnSUM1MGFHVnVLQ2dwSUQwK0lHNWxkMUp2ZFhSbElDWW1JRzVsZDFKdmRYUmxMbTl1Ulc1MFpYSWdKaVlnYm1WM1VtOTFkR1V1YjI1RmJuUmxjaWgzYVc1a2IzY3ViRzlqWVhScGIyNHVhR0Z6YUN3Z2RHaHBjeTVsZG1WdWRFSjFjeWtwWEhKY2JpQWdJQ0FnSUM1MGFHVnVLQ2dwSUQwK0lIdGNjbHh1SUNBZ0lDQWdYSFJjZEhSb2FYTXVZM1Z5Y21WdWRGSnZkWFJsSUQwZ2JtVjNVbTkxZEdVN1hISmNiaUFnSUNBZ0lGeDBYSFF2THlCMGFHbHpMbU4xY25KbGJuUlNiM1YwWlZCaGNtRnRjeUE5SUhKdmRYUmxVR0Z5WVcxek8xeHlYRzRnSUNBZ2ZTazdYSEpjYmlBZ2ZWeHlYRzU5TzF4eVhHNWNjbHh1Wlhod2IzSjBJR1JsWm1GMWJIUWdVbTkxZEdWeU8xeHlYRzVjY2x4dVhISmNibHh5WEc0dkx5QmpiR0Z6Y3lCU2IzVjBaWElnZTF4eVhHNHZMeUFnSUdOdmJuTjBjblZqZEc5eUtISnZkWFJsY3l3Z1pYWmxiblJDZFhNcElIdGNjbHh1THk4Z0lDQWdJSFJvYVhNdVpYWmxiblJDZFhNZ1BTQmxkbVZ1ZEVKMWN6dGNjbHh1THk4Z0lDQWdJSFJvYVhNdWNtOTFkR1Z6SUQwZ2NtOTFkR1Z6TzF4eVhHNHZMMXh5WEc0dkx5QWdJQ0FnZEdocGN5NW9ZVzVrYkdWSVlYTm9RMmhoYm1kbElEMGdkR2hwY3k1b1lXNWtiR1ZJWVhOb1EyaGhibWRsTG1KcGJtUW9kR2hwY3lrN1hISmNiaTh2SUNBZ2ZWeHlYRzR2TDF4eVhHNHZMMXh5WEc0dkx5QWdJR2x1YVhRb0tTQjdYSEpjYmk4dklDQWdJQ0IzYVc1a2IzY3VZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25hR0Z6YUdOb1lXNW5aU2NzSUhSb2FYTXVhR0Z1Wkd4bFNHRnphRU5vWVc1blpTazdYSEpjYmk4dklDQWdJQ0IwYUdsekxtaGhibVJzWlVoaGMyaERhR0Z1WjJVb0tUdGNjbHh1THk4Z0lDQjlYSEpjYmk4dlhISmNiaTh2SUNBZ1ptbHVaRkJ5WlhacGIzVnpRV04wYVhabFVtOTFkR1VvS1NCN1hISmNiaTh2WEhKY2JpOHZJQ0FnZlZ4eVhHNHZMMXh5WEc0dkx5QWdJR1pwYm1ST1pYZEJZM1JwZG1WU2IzVjBaU2dwSUh0Y2NseHVMeTljY2x4dUx5OGdJQ0I5WEhKY2JpOHZYSEpjYmk4dlhISmNiaTh2SUNBZ2FHRnVaR3hsU0dGemFFTm9ZVzVuWlNncElIdGNjbHh1THk4Z0lDQWdJR052Ym5OMElHeGhjM1JTYjNWMFpTQTlJSGRwYm1SdmR5NXNiMk5oZEdsdmJpNXZiR1JWY213N1hISmNiaTh2SUNBZ0lDQmpiMjV6ZENCdVpYZFNiM1YwWlNBOUlIZHBibVJ2ZHk1c2IyTmhkR2x2Ymk1b1lYTm9PMXh5WEc0dkwxeHlYRzR2TDF4eVhHNHZMMXh5WEc0dkx5QWdJQ0FnTHk4Z2JHRnpkQ0J5YjNWMFpTQnZia3hsWVhabFhISmNiaTh2SUNBZ0lDQjBhR2x6TG5KdmRYUmxjMXRzWVhOMFVtOTFkR1ZkTG05dVRHVmhkbVVvZEdocGN5NWxkbVZ1ZEVKMWN5bGNjbHh1THk4Z0lDQWdJQ0FnTG5Sb1pXNG9LQ2tnUFQ0Z2UxeHlYRzR2THlBZ0lDQWdJQ0FnSUM4dklHNWxkeUJ5YjNWMFpTQmlaV1p2Y21WRmJuUmxjbHh5WEc0dkx5QWdJQ0FnSUNBZ0lISmxkSFZ5YmlCMGFHbHpMbkp2ZFhSbGMxdHVaWGRTYjNWMFpWMHViMjVDWldadmNtVkZiblJsY2loMGFHbHpMbVYyWlc1MFFuVnpLVHRjY2x4dUx5OGdJQ0FnSUNBZ2ZTbGNjbHh1THk4Z0lDQWdJQ0FnTG5Sb1pXNG9LQ2tnUFQ0Z2UxeHlYRzR2THlBZ0lDQWdJQ0FnSUM4dklHNWxkeUJ5YjNWMFpTQnZia1Z1ZEdWeVhISmNiaTh2SUNBZ0lDQWdJQ0FnY21WMGRYSnVJSFJvYVhNdWNtOTFkR1Z6VzI1bGQxSnZkWFJsWFM1dmJrVnVkR1Z5S0hSb2FYTXVaWFpsYm5SQ2RYTXBPMXh5WEc0dkx5QWdJQ0FnSUNCOUtWeHlYRzR2THlBZ0lDQWdJQ0F1WTJGMFkyZ29aWEp5YjNJZ1BUNGdlMXh5WEc0dkx5QWdJQ0FnSUNBZ0lHTnZibk52YkdVdWJHOW5LR1Z5Y205eUtUdGNjbHh1THk4Z0lDQWdJQ0FnZlNsY2NseHVMeThnSUNCOVhISmNiaTh2SUgxY2NseHVMeTljY2x4dUx5OGdaWGh3YjNKMElHUmxabUYxYkhRZ1VtOTFkR1Z5TzF4eVhHNGlYWDA9XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL3V0aWxzXFxcXHJvdXRlci5qc1wiLFwiL3V0aWxzXCIpIl19
