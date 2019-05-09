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

      var FIELD_WIDTH = window.innerWidth * 0.8;
      var FIELD_HEIGHT = 600;

      var Bonus = function () {
        function Bonus(ctx, width, height, color, x, y, eventBus) {
          _classCallCheck(this, Bonus);

          this.ctx = ctx;
          this.width = width;
          this.height = height;
          this.color = color;

          this.eventBus = eventBus;

          this.speed = 0;
          this.angle = 0;
          this.moveAngle = 0;

          this.image = document.querySelector('.apple');

          this.x = x;
          this.y = y;

          this.x1 = Math.floor(Math.random() * 5);
          this.y1 = Math.floor(Math.random() * 5);

          this.eventBus.trigger('game:logger', 'Bonus has appeared');
        }

        _createClass(Bonus, [{
          key: 'update',
          value: function update(ctx) {
            // ctx.save();
            // ctx.translate(this.x, this.y);
            // ctx.rotate(this.angle);
            // ctx.fillStyle = this.color;
            // ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
            // ctx.restore();
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            return this;
          }
        }, {
          key: 'newPos',
          value: function newPos(options) {
            // this.moveAngle = 0;
            // this.speed = 0;
            // options.left && (this.moveAngle = -5);
            // options.right && (this.moveAngle = 5);
            // options.up && (this.speed = 5);
            // options.down && (this.speed = -5);
            //
            // this.angle += this.moveAngle * Math.PI / 180;
            // this.x += this.speed * Math.sin(this.angle);
            // this.y -= this.speed * Math.cos(this.angle);

            // if (options.newX) {
            //   this.x = options.newX;
            //   this.y = options.newY;
            // } else {
            //   this.x += this.x1;
            //   this.y += this.y1;
            // }


            if (this.x > FIELD_WIDTH) {
              this.x = 0;
            } else if (this.x < 0) {
              this.x = FIELD_WIDTH;
            }
            if (this.y > FIELD_HEIGHT) {
              this.y = 0;
            } else if (this.y < 0) {
              this.y = FIELD_HEIGHT;
            }
            return this;
          }
        }]);

        return Bonus;
      }();

      exports.default = Bonus;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\Bonus.js", "/components");
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

      var FIELD_WIDTH = window.innerWidth * 0.8;
      var FIELD_HEIGHT = 600;

      var Enemy = function () {
        function Enemy(ctx, width, height, color, x, y) {
          _classCallCheck(this, Enemy);

          this.ctx = ctx;
          this.width = width;
          this.height = height;
          this.color = color;

          this.speed = 0;
          this.angle = 0;
          this.moveAngle = 0;

          this.image = document.querySelector('.animal-crab');

          this.x = x;
          this.y = y;

          this.x1 = Math.floor(Math.random() * 5);
          this.y1 = Math.floor(Math.random() * 5);
        }

        _createClass(Enemy, [{
          key: 'update',
          value: function update(ctx) {
            // ctx.save();
            // ctx.translate(this.x, this.y);
            // ctx.rotate(this.angle);
            // ctx.fillStyle = this.color;
            // ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
            // ctx.restore();

            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            return this;
          }
        }, {
          key: 'newPos',
          value: function newPos(options) {
            // this.moveAngle = 0;
            // this.speed = 0;
            // options.left && (this.moveAngle = -5);
            // options.right && (this.moveAngle = 5);
            // options.up && (this.speed = 5);
            // options.down && (this.speed = -5);
            //
            // this.angle += this.moveAngle * Math.PI / 180;
            // this.x += this.speed * Math.sin(this.angle);
            // this.y -= this.speed * Math.cos(this.angle);

            this.x += this.x1;
            this.y += this.y1;

            if (this.x > FIELD_WIDTH) {
              this.x = 0;
            } else if (this.x < 0) {
              this.x = FIELD_WIDTH;
            }
            if (this.y > FIELD_HEIGHT) {
              this.y = 0;
            } else if (this.y < 0) {
              this.y = FIELD_HEIGHT;
            }
            return this;
          }
        }]);

        return Enemy;
      }();

      exports.default = Enemy;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\Enemy.js", "/components");
  }, { "buffer": 2, "e/U+97": 4 }], 7: [function (require, module, exports) {
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

      var FIELD_WIDTH = window.innerWidth * 0.8;
      var FIELD_HEIGHT = 600;

      var Enemy2 = function () {
        function Enemy2(ctx, width, height, color, x, y) {
          _classCallCheck(this, Enemy2);

          this.ctx = ctx;
          this.width = width;
          this.height = height;
          this.color = color;

          this.speed = 0;
          this.angle = 0;
          this.moveAngle = 0;

          this.angry = false;

          this.image = document.querySelector('.animal-wasp');

          this.x = x;
          this.y = y;

          this.x1 = Math.floor(Math.random() * 5);
          this.y1 = Math.floor(Math.random() * 5);
        }

        _createClass(Enemy2, [{
          key: 'update',
          value: function update(ctx) {
            // ctx.save();
            // ctx.translate(this.x, this.y);
            // ctx.rotate(this.angle);
            // ctx.fillStyle = this.color;
            // ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
            // ctx.restore();

            if (this.angry) {
              ctx.drawImage(document.querySelector('.animal-wasp-2'), this.x, this.y, this.width, this.height);
            } else {
              ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
            }

            return this;
          }
        }, {
          key: 'newPos',
          value: function newPos(options) {
            // this.moveAngle = 0;
            // this.speed = 0;
            // options.left && (this.moveAngle = -5);
            // options.right && (this.moveAngle = 5);
            // options.up && (this.speed = 5);
            // options.down && (this.speed = -5);
            //
            // this.angle += this.moveAngle * Math.PI / 180;
            // this.x += this.speed * Math.sin(this.angle);
            // this.y -= this.speed * Math.cos(this.angle);

            if (options.newX) {
              this.x = options.newX;
              this.y = options.newY;
            } else {
              this.x += this.x1;
              this.y += this.y1;
            }

            if (this.x > FIELD_WIDTH) {
              this.x = 0;
            } else if (this.x < 0) {
              this.x = FIELD_WIDTH;
            }
            if (this.y > FIELD_HEIGHT) {
              this.y = 0;
            } else if (this.y < 0) {
              this.y = FIELD_HEIGHT;
            }
            return this;
          }
        }]);

        return Enemy2;
      }();

      exports.default = Enemy2;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\Enemy2.js", "/components");
  }, { "buffer": 2, "e/U+97": 4 }], 8: [function (require, module, exports) {
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

      var GameField = function () {
        function GameField(element, width, height, Player, Enemy, eventBus, Enemy2, Bonus) {
          var _this = this;

          _classCallCheck(this, GameField);

          this.canvas = element;
          this.ctx = this.canvas.getContext('2d');

          this.eventBus = eventBus;

          this.height = height;
          this.width = width;

          this.person = new Player(this.ctx, 50, 50, 'orange', 50, 50, eventBus);
          this.enemy = [];
          this.enemy2 = [];
          this.bonus = [];

          this.enemyInterval = setInterval(function () {
            _this.enemy.push(new Enemy(_this.ctx, 40, 40, 'red', 10, 10, eventBus));
          }, 1500);

          this.enemyInterval2 = setInterval(function () {
            _this.enemy2.push(new Enemy2(_this.ctx, 50, 50, 'rgb(124, 103, 227)', 10, 10, eventBus));
          }, 2500);

          this.bonusInterval = setInterval(function () {
            _this.bonus.push(new Bonus(_this.ctx, 25, 25, 'rgb(173, 227, 103)', Math.round(Math.random() * _this.width), Math.round(Math.random() * _this.height), eventBus));
          }, 7000);

          this.start();
        }

        _createClass(GameField, [{
          key: 'start',
          value: function start() {
            var _this2 = this;

            this.canvas.height = this.height;
            this.canvas.width = this.width;

            this.eventBus.trigger('game:logger-clear');
            this.eventBus.trigger('game:logger', ['Game started! Good luck ;)', 'game-status']);

            var num = Math.floor(Math.random() * 5 + 1);
            this.image = document.querySelector('.ground-' + num);

            this.frameNo = 0;
            this.interval = setInterval(this.updateState.bind(this), 20);
            window.addEventListener('keydown', function (e) {
              e.preventDefault();
              _this2.keys = _this2.keys || [];
              _this2.keys[e.keyCode] = e.type === "keydown";
            });
            window.addEventListener('keyup', function (e) {
              _this2.keys[e.keyCode] = e.type === "keydown";
            });

            this.eventBus.trigger('game:start');
          }
        }, {
          key: 'stop',
          value: function stop() {
            console.log('game stopped');
            clearInterval(this.interval);
            clearInterval(this.enemyInterval);
            clearInterval(this.bonusInterval);
            this.eventBus.trigger('game:logger', ['Game has finished', 'game-status']);
            this.eventBus.trigger('game:finished');
          }
        }, {
          key: 'clear',
          value: function clear() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          }
        }, {
          key: 'updateState',
          value: function updateState() {
            var _this3 = this;

            this.clear();
            // console.log(this.enemy2);


            this.ctx.drawImage(this.image, 0, 0, this.width, this.height);

            this.person.newPos({
              right: this.keys && this.keys[39],
              left: this.keys && this.keys[37],
              up: this.keys && this.keys[38],
              down: this.keys && this.keys[40]
            }).update(this.ctx);

            this.enemy.map(function (item) {
              var distX = Math.abs(item.x - _this3.person.x);
              var distY = Math.abs(item.y - _this3.person.y);

              if (distX < 20 && distY < 20) {

                if (_this3.person.hasPower) {
                  var index = _this3.enemy.indexOf(item);
                  _this3.enemy.splice(index, 1);
                  return;
                }

                _this3.person.color === 'orange' ? _this3.person.color = 'purple' : null;

                _this3.stop();

                if (_this3.person.color === 'purple') {
                  _this3.person.color = 'green';
                } else {
                  _this3.person.color = 'purple';
                }
              }
              item.newPos({}).update(_this3.ctx);
            });

            this.enemy2.map(function (item) {
              var distX = Math.abs(item.x - _this3.person.x);
              var distY = Math.abs(item.y - _this3.person.y);

              if (distX < 100 && distY < 100) {
                // item.color = 'rgb(201, 32, 73)';

                item.angry = true;

                item.newPos({
                  newX: item.x - _this3.person.x + 3 > distX && !_this3.person.hasPower ? item.x - 3 : item.x + 3,
                  newY: item.y - _this3.person.y + 3 > distX && !_this3.person.hasPower ? item.y - 3 : item.y + 3
                });
              } else {
                // item.color = 'rgb(124, 103, 227)';
                item.angry = false;
                item.newPos({});
              }

              if (distX < 20 && distY < 20) {
                if (_this3.person.hasPower) {
                  var index = _this3.enemy2.indexOf(item);
                  _this3.enemy2.splice(index, 1);
                  return;
                }

                _this3.person.color === 'orange' ? _this3.person.color = 'purple' : null;

                _this3.stop();

                if (_this3.person.color === 'purple') {
                  _this3.person.color = 'green';
                } else {
                  _this3.person.color = 'purple';
                }
              }
              item.update(_this3.ctx);
            });

            this.bonus.map(function (item) {
              var distX = Math.abs(item.x - _this3.person.x);
              var distY = Math.abs(item.y - _this3.person.y);

              // console.log(distX);
              // console.log(distY);

              if (distX < 20 && distY < 20) {
                if (!_this3.person.hasPower) {
                  _this3.person.power();
                  _this3.eventBus.trigger('game:power');
                }

                var index = _this3.bonus.indexOf(item);
                _this3.bonus.splice(index, 1);
              }

              //   this.person.color === 'orange' ? this.person.color = 'purple' : null
              //
              //   this.stop();
              //
              //   if (this.person.color === 'purple') {
              //     this.person.color = 'green';
              //   } else {
              //     this.person.color = 'purple';
              //   }
              //
              // }
              item.newPos({}).update(_this3.ctx);
            });
          }

          // checkCoords(playerCoords, )

        }]);

        return GameField;
      }();

      exports.default = GameField;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\GameField.js", "/components");
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

      var Logger = function () {
        function Logger(element, eventBus) {
          _classCallCheck(this, Logger);

          this.element = element;
          this.eventBus = eventBus;

          this.handleNewEvent = this.handleNewEvent.bind(this);
          this.clear = this.clear.bind(this);
        }

        _createClass(Logger, [{
          key: 'handleNewEvent',
          value: function handleNewEvent(event, className) {
            var loggerUl = this.element.querySelector('ul');

            loggerUl.innerHTML += '<li class=' + (className || '') + '>' + event + '</li>';
          }
        }, {
          key: 'clear',
          value: function clear() {
            var loggerUl = this.element.querySelector('ul');
            loggerUl.innerHTML = '';
          }
        }, {
          key: 'renderLogger',
          value: function renderLogger() {
            this.element.innerHTML += '\n      <ul></ul>\n    ';

            this.element.classList.add('logger');

            this.eventBus.on('game:logger', this.handleNewEvent);
            this.eventBus.on('game:logger-clear', this.clear);
          }
        }]);

        return Logger;
      }();

      exports.default = Logger;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\Logger.js", "/components");
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
            this.element.innerHTML = "\n      <ul>\n        <li><a href=\"#\">Home</a></li>\n        <li><a href=\"#game\">Game</a></li>\n        <li><a href=\"#stats\">Statistics</a></li>\n      </ul>\n    ";
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

      var FIELD_WIDTH = window.innerWidth * 0.8;
      var FIELD_HEIGHT = 600;

      var Player = function () {
        function Player(ctx, width, height, color, x, y, eventBus) {
          _classCallCheck(this, Player);

          this.ctx = ctx;
          this.width = width;
          this.height = height;
          this.color = color;

          this.eventBus = eventBus;

          this.speed = 0;
          this.angle = 0;
          this.moveAngle = 0;

          this.image = document.querySelector('.animal-turtle');

          this.hasPower = false;

          this.x = x;
          this.y = y;
        }

        _createClass(Player, [{
          key: 'power',
          value: function power() {
            var _this = this;

            // this.color = 'rgb(244, 139, 139)';
            if (this.hasPower) return;
            this.height += 10;
            this.width += 10;
            this.speed += 10;

            this.eventBus.trigger('game:logger', ['You have power for 10 sec!', 'bonus']);

            setTimeout(function () {
              _this.eventBus.trigger('game:logger', ['3 seconds and power will gone', 'bonus']);
            }, 1000 * 7);

            this.hasPower = true;
            setTimeout(function () {
              _this.hasPower = false;
              _this.color = 'orange';
              _this.height -= 10;
              _this.width -= 10;
              _this.speed -= 10;
            }, 10000);
          }
        }, {
          key: 'update',
          value: function update(ctx) {

            // ctx.save();
            //
            // ctx.translate(this.x, this.y);

            // // ctx.rotate(this.angle);
            // // ctx.fillStyle = this.color;
            // ctx.fillRect(this.x, this.y, 10, 10);
            // ctx.restore();

            ctx.save();
            ctx.translate(this.x, this.y);
            // ctx.rotate(this.angle);
            ctx.rotate(this.angle - Math.PI / 2);
            ctx.fillStyle = this.color;
            // ctx.fillRect(this.width, this.height, this.width, this.height);
            if (this.hasPower) {
              ctx.drawImage(document.querySelector('.animal-turtle-2'), this.width / -2 + 10, this.height / -2 + 10, this.width, this.height);
            } else {
              ctx.drawImage(this.image, this.width / -2 + 10, this.height / -2 + 10, this.width, this.height);
            }
            ctx.restore();

            return this;
          }
        }, {
          key: 'newPos',
          value: function newPos(options) {
            this.moveAngle = 0;
            if (this.hasPower) {
              this.speed = 5;
            } else {
              this.speed = 0;
            }
            options.left && (this.moveAngle = -5);
            options.right && (this.moveAngle = 5);
            options.up && (this.speed += 5);
            options.down && (this.speed += -5);

            this.angle += this.moveAngle * Math.PI / 180;
            this.x += this.speed * Math.sin(this.angle);
            this.y -= this.speed * Math.cos(this.angle);

            if (this.x > FIELD_WIDTH) {
              this.x = 0;
            } else if (this.x < 0) {
              this.x = FIELD_WIDTH;
            }
            if (this.y > FIELD_HEIGHT) {
              this.y = 0;
            } else if (this.y < 0) {
              this.y = FIELD_HEIGHT;
            }
            return this;
          }
        }]);

        return Player;
      }();

      exports.default = Player;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\Player.js", "/components");
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

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var PowerLine = function () {
        function PowerLine(element, eventBus) {
          _classCallCheck(this, PowerLine);

          this.element = element;
          this.eventBus = eventBus;

          this.activate = this.activate.bind(this);
        }

        _createClass(PowerLine, [{
          key: 'activate',
          value: function activate() {
            var progressBar = this.element.querySelector('.progress-bar');

            var width = 100;
            progressBar.style.width = width + '%';

            var timer = setInterval(function () {
              progressBar.style.width = width + '%';
              // width === 100 ? width -= 20 : width -= 10;
              width -= 10;
            }, 1000);

            setTimeout(function () {
              clearInterval(timer);
            }, 1000 * 10);
          }
        }, {
          key: 'renderPowerLine',
          value: function renderPowerLine() {
            this.element.innerHTML = '\n      <h3>Power line</h3>\n      <div class="progress">\n        <div class="progress-bar progress-bar-warning" role="progressbar"\n            aria-valuenow="60"\n            aria-valuemin="0" aria-valuemax="100"></div>\n\n      </div>\n    ';

            this.eventBus.on('game:power', this.activate);
          }
        }]);

        return PowerLine;
      }();

      exports.default = PowerLine;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\PowerLine.js", "/components");
  }, { "buffer": 2, "e/U+97": 4 }], 13: [function (require, module, exports) {
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

      var Statistics = function () {
        function Statistics(element, eventBus) {
          _classCallCheck(this, Statistics);

          this.element = element;
          this.eventBus = eventBus;
          this.data = [];

          this.updateStats = this.updateStats.bind(this);

          this.eventBus.on('stats:update', this.updateStats);
        }

        _createClass(Statistics, [{
          key: 'updateStats',
          value: function updateStats(newStats) {
            console.log(newStats);
            this.data = newStats;

            this.renderStatistics();
          }
        }, {
          key: 'renderStatistics',
          value: function renderStatistics() {
            this.element.classList.add('list-group');
            this.element.innerHTML = '';

            // debugger;

            if (!this.data.length) {
              this.element.innerHTML = '<li>You haven\'t got any statistics</li>';
              return;
            };

            for (var i = 0; i < this.data.length; i++) {
              this.element.innerHTML += '<li class="list-group-item">' + this.data[i] + '</li>';
            }
          }
        }]);

        return Statistics;
      }();

      exports.default = Statistics;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\Statistics.js", "/components");
  }, { "buffer": 2, "e/U+97": 4 }], 14: [function (require, module, exports) {
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

      // import { saveToStorage } from '../utils/helpers';

      var Timer = function () {
        function Timer(element, eventBus) {
          var _this = this;

          _classCallCheck(this, Timer);

          this.element = element;
          this.eventBus = eventBus;

          this.time = 0;

          this.runTimer = this.runTimer.bind(this);

          this.eventBus.on('game:start', this.runTimer);
          this.eventBus.on('game:finished', function () {
            clearInterval(_this.timer);
            _this.eventBus.trigger('game:logger', ['Congrats, you have ' + (_this.time / 100).toFixed(2) + ' seconds, want play again?', 'game-finished']);
            // saveToStorage(this.time / 100, localStorage);
            _this.time = 0;
          });
        }

        _createClass(Timer, [{
          key: 'runTimer',
          value: function runTimer() {
            var _this2 = this;

            var timerBlock = document.querySelector(this.element);
            timerBlock.innerHTML = '';
            this.timer = setInterval(function () {
              _this2.time += 1;
              timerBlock.innerHTML = (_this2.time / 100).toFixed(2);
            }, 10);
          }
        }]);

        return Timer;
      }();

      exports.default = Timer;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\Timer.js", "/components");
  }, { "buffer": 2, "e/U+97": 4 }], 15: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      var _index = require('./routes/index');

      var _game = require('./routes/game');

      var _stats = require('./routes/stats');

      var _router = require('./utils/router');

      var _router2 = _interopRequireDefault(_router);

      var _EventBus = require('./utils/EventBus');

      var _EventBus2 = _interopRequireDefault(_EventBus);

      var _Menu = require('./components/Menu');

      var _Menu2 = _interopRequireDefault(_Menu);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var routes = [_index.index, _game.game, _stats.stats];

      var eventBus = new _EventBus2.default();

      new _router2.default({ routes: routes, eventBus: eventBus });

      var menu = document.querySelector('.menu');
      new _Menu2.default(menu).renderMenu();
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_b6479a98.js", "/");
  }, { "./components/Menu": 10, "./routes/game": 16, "./routes/index": 17, "./routes/stats": 18, "./utils/EventBus": 19, "./utils/router": 21, "buffer": 2, "e/U+97": 4 }], 16: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.game = undefined;

      var _GameField = require('../components/GameField');

      var _GameField2 = _interopRequireDefault(_GameField);

      var _Player = require('../components/Player');

      var _Player2 = _interopRequireDefault(_Player);

      var _Enemy = require('../components/Enemy');

      var _Enemy2 = _interopRequireDefault(_Enemy);

      var _Enemy3 = require('../components/Enemy2');

      var _Enemy4 = _interopRequireDefault(_Enemy3);

      var _Bonus = require('../components/Bonus');

      var _Bonus2 = _interopRequireDefault(_Bonus);

      var _PowerLine = require('../components/PowerLine');

      var _PowerLine2 = _interopRequireDefault(_PowerLine);

      var _Timer = require('../components/Timer');

      var _Timer2 = _interopRequireDefault(_Timer);

      var _Logger = require('../components/Logger');

      var _Logger2 = _interopRequireDefault(_Logger);

      var _helpers = require('../utils/helpers');

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var gameObj = {};

      var game = {
        name: 'game',
        match: 'game',
        onEnter: function onEnter(url, eventBus) {
          var mainBlock = document.querySelector('.main');
          mainBlock.classList.remove('welcome', 'statistics');
          mainBlock.classList.add('game');

          mainBlock.innerHTML = '\n      <h2>Game</h2>\n    ';

          var button = document.createElement('button');
          button.innerText = 'Start game!';
          button.classList.add('btn', 'btn-success');

          button.addEventListener('click', function (event) {
            eventBus.trigger('game:new');
            event.target.classList.add('disabled');

            gameObj = new _GameField2.default(canvas, window.innerWidth * 0.8, 600, _Player2.default, _Enemy2.default, eventBus, _Enemy4.default, _Bonus2.default);
          });

          var logger = document.createElement('div');
          logger.classList.add('col-md-2');

          var timer = document.createElement('div');
          timer.classList.add('timer');
          var canvas = document.createElement('canvas');
          canvas.classList.add('col-md-10');

          var powerLine = document.createElement('div');

          new _PowerLine2.default(powerLine, eventBus).renderPowerLine();

          var row = document.createElement('div');
          row.classList.add('row');

          logger.append(timer);

          row.append(canvas, logger);

          mainBlock.append(button, powerLine, row);
          new _Logger2.default(logger, eventBus).renderLogger();

          new _Timer2.default('.timer', eventBus);

          eventBus.on('game:finished', function () {
            button.classList.remove('disabled');
            (0, _helpers.saveToStorage)('some data', localStorage);
          });
        },
        onLeave: function onLeave() {}
      };

      exports.game = game;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/routes\\game.js", "/routes");
  }, { "../components/Bonus": 5, "../components/Enemy": 6, "../components/Enemy2": 7, "../components/GameField": 8, "../components/Logger": 9, "../components/Player": 11, "../components/PowerLine": 12, "../components/Timer": 14, "../utils/helpers": 20, "buffer": 2, "e/U+97": 4 }], 17: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var index = {
        name: 'index',
        match: '',
        onEnter: function onEnter() {
          var mainBlock = document.querySelector('.main');
          mainBlock.classList.remove('game', 'statistics');
          mainBlock.classList.add('welcome');

          mainBlock.innerHTML = '\n      <h2>Hello, welcome to game!</h2>\n      <a href="#game" class="btn btn-warning">Play!</a>\n    ';
        }
      };

      exports.index = index;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/routes\\index.js", "/routes");
  }, { "buffer": 2, "e/U+97": 4 }], 18: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.stats = undefined;

      var _helpers = require('../utils/helpers');

      var _Statistics = require('../components/Statistics');

      var _Statistics2 = _interopRequireDefault(_Statistics);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var stats = {
        name: 'stats',
        match: 'stats',
        onEnter: function onEnter(url, eventBus) {
          var mainBlock = document.querySelector('.main');
          mainBlock.classList.remove('game', 'welcome');
          mainBlock.classList.add('statistics');

          mainBlock.innerHTML = '\n      <h2>Games statistics</h2>\n    ';

          var statsUl = document.createElement('ul');
          new _Statistics2.default(statsUl, eventBus).renderStatistics();

          var storageData = (0, _helpers.loadFromStorage)(localStorage);
          eventBus.trigger('stats:update', storageData);

          var deleteButton = document.createElement('button');
          deleteButton.innerText = 'Clear stats';
          deleteButton.classList.add('btn', 'btn-danger');

          deleteButton.addEventListener('click', function () {
            (0, _helpers.deleteFromStorage)('game-stats', localStorage);
            eventBus.trigger('stats:update', []);
          });

          mainBlock.append(deleteButton, statsUl);
        }
      };

      exports.stats = stats;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/routes\\stats.js", "/routes");
  }, { "../components/Statistics": 13, "../utils/helpers": 20, "buffer": 2, "e/U+97": 4 }], 19: [function (require, module, exports) {
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

      function _toConsumableArray(arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
          }return arr2;
        } else {
          return Array.from(arr);
        }
      }

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
              if (Array.isArray(data) && data.length > 0) {
                // паходу так не катит
                item.apply(undefined, _toConsumableArray(data));
              } else {
                item(data);
              }
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
      var loadFromStorage = exports.loadFromStorage = function loadFromStorage(storage) {
        var data = JSON.parse(storage.getItem('game-stats'));
        return data || [];
      };

      var saveToStorage = exports.saveToStorage = function saveToStorage(data, storage) {
        var prevData = loadFromStorage(storage);
        prevData.push(data);
        storage.setItem('game-stats', JSON.stringify(prevData));
      };

      var deleteFromStorage = exports.deleteFromStorage = function deleteFromStorage(name, storage) {
        storage.removeItem(name);
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
            })
            // После этого выполнить .onBeforeEnter для нового активного роута
            .then(function () {
              return newRoute && newRoute.onBeforeEnter && newRoute.onBeforeEnter(window.location.hash, _this2.eventBus);
            })
            // После этого выполнить .onEnter для ногового активного роута ( только если с .onBeforeEnter все ок)

            .then(function () {
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
  }, { "buffer": 2, "e/U+97": 4 }] }, {}, [15]);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL0xvTC9Ecm9wYm94L9C60YPRgNGB0YsvanMtLWJhc2UtY291cnNlLzA2L2h0L0hhcHB5Q29kZUhlcmUvY2FudmFzIGdhbWUvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIkM6L1VzZXJzL0xvTC9Ecm9wYm94L9C60YPRgNGB0YsvanMtLWJhc2UtY291cnNlLzA2L2h0L0hhcHB5Q29kZUhlcmUvY2FudmFzIGdhbWUvbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9saWIvYjY0LmpzIiwiQzovVXNlcnMvTG9ML0Ryb3Bib3gv0LrRg9GA0YHRiy9qcy0tYmFzZS1jb3Vyc2UvMDYvaHQvSGFwcHlDb2RlSGVyZS9jYW52YXMgZ2FtZS9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwiQzovVXNlcnMvTG9ML0Ryb3Bib3gv0LrRg9GA0YHRiy9qcy0tYmFzZS1jb3Vyc2UvMDYvaHQvSGFwcHlDb2RlSGVyZS9jYW52YXMgZ2FtZS9ub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qcyIsIkM6L1VzZXJzL0xvTC9Ecm9wYm94L9C60YPRgNGB0YsvanMtLWJhc2UtY291cnNlLzA2L2h0L0hhcHB5Q29kZUhlcmUvY2FudmFzIGdhbWUvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIkM6L1VzZXJzL0xvTC9Ecm9wYm94L9C60YPRgNGB0YsvanMtLWJhc2UtY291cnNlLzA2L2h0L0hhcHB5Q29kZUhlcmUvY2FudmFzIGdhbWUvc3JjL2pzL2NvbXBvbmVudHMvQm9udXMuanMiLCJDOi9Vc2Vycy9Mb0wvRHJvcGJveC/QutGD0YDRgdGLL2pzLS1iYXNlLWNvdXJzZS8wNi9odC9IYXBweUNvZGVIZXJlL2NhbnZhcyBnYW1lL3NyYy9qcy9jb21wb25lbnRzL0VuZW15LmpzIiwiQzovVXNlcnMvTG9ML0Ryb3Bib3gv0LrRg9GA0YHRiy9qcy0tYmFzZS1jb3Vyc2UvMDYvaHQvSGFwcHlDb2RlSGVyZS9jYW52YXMgZ2FtZS9zcmMvanMvY29tcG9uZW50cy9FbmVteTIuanMiLCJDOi9Vc2Vycy9Mb0wvRHJvcGJveC/QutGD0YDRgdGLL2pzLS1iYXNlLWNvdXJzZS8wNi9odC9IYXBweUNvZGVIZXJlL2NhbnZhcyBnYW1lL3NyYy9qcy9jb21wb25lbnRzL0dhbWVGaWVsZC5qcyIsIkM6L1VzZXJzL0xvTC9Ecm9wYm94L9C60YPRgNGB0YsvanMtLWJhc2UtY291cnNlLzA2L2h0L0hhcHB5Q29kZUhlcmUvY2FudmFzIGdhbWUvc3JjL2pzL2NvbXBvbmVudHMvTG9nZ2VyLmpzIiwiQzovVXNlcnMvTG9ML0Ryb3Bib3gv0LrRg9GA0YHRiy9qcy0tYmFzZS1jb3Vyc2UvMDYvaHQvSGFwcHlDb2RlSGVyZS9jYW52YXMgZ2FtZS9zcmMvanMvY29tcG9uZW50cy9NZW51LmpzIiwiQzovVXNlcnMvTG9ML0Ryb3Bib3gv0LrRg9GA0YHRiy9qcy0tYmFzZS1jb3Vyc2UvMDYvaHQvSGFwcHlDb2RlSGVyZS9jYW52YXMgZ2FtZS9zcmMvanMvY29tcG9uZW50cy9QbGF5ZXIuanMiLCJDOi9Vc2Vycy9Mb0wvRHJvcGJveC/QutGD0YDRgdGLL2pzLS1iYXNlLWNvdXJzZS8wNi9odC9IYXBweUNvZGVIZXJlL2NhbnZhcyBnYW1lL3NyYy9qcy9jb21wb25lbnRzL1Bvd2VyTGluZS5qcyIsIkM6L1VzZXJzL0xvTC9Ecm9wYm94L9C60YPRgNGB0YsvanMtLWJhc2UtY291cnNlLzA2L2h0L0hhcHB5Q29kZUhlcmUvY2FudmFzIGdhbWUvc3JjL2pzL2NvbXBvbmVudHMvU3RhdGlzdGljcy5qcyIsIkM6L1VzZXJzL0xvTC9Ecm9wYm94L9C60YPRgNGB0YsvanMtLWJhc2UtY291cnNlLzA2L2h0L0hhcHB5Q29kZUhlcmUvY2FudmFzIGdhbWUvc3JjL2pzL2NvbXBvbmVudHMvVGltZXIuanMiLCJDOi9Vc2Vycy9Mb0wvRHJvcGJveC/QutGD0YDRgdGLL2pzLS1iYXNlLWNvdXJzZS8wNi9odC9IYXBweUNvZGVIZXJlL2NhbnZhcyBnYW1lL3NyYy9qcy9mYWtlX2I2NDc5YTk4LmpzIiwiQzovVXNlcnMvTG9ML0Ryb3Bib3gv0LrRg9GA0YHRiy9qcy0tYmFzZS1jb3Vyc2UvMDYvaHQvSGFwcHlDb2RlSGVyZS9jYW52YXMgZ2FtZS9zcmMvanMvcm91dGVzL2dhbWUuanMiLCJDOi9Vc2Vycy9Mb0wvRHJvcGJveC/QutGD0YDRgdGLL2pzLS1iYXNlLWNvdXJzZS8wNi9odC9IYXBweUNvZGVIZXJlL2NhbnZhcyBnYW1lL3NyYy9qcy9yb3V0ZXMvaW5kZXguanMiLCJDOi9Vc2Vycy9Mb0wvRHJvcGJveC/QutGD0YDRgdGLL2pzLS1iYXNlLWNvdXJzZS8wNi9odC9IYXBweUNvZGVIZXJlL2NhbnZhcyBnYW1lL3NyYy9qcy9yb3V0ZXMvc3RhdHMuanMiLCJDOi9Vc2Vycy9Mb0wvRHJvcGJveC/QutGD0YDRgdGLL2pzLS1iYXNlLWNvdXJzZS8wNi9odC9IYXBweUNvZGVIZXJlL2NhbnZhcyBnYW1lL3NyYy9qcy91dGlscy9FdmVudEJ1cy5qcyIsIkM6L1VzZXJzL0xvTC9Ecm9wYm94L9C60YPRgNGB0YsvanMtLWJhc2UtY291cnNlLzA2L2h0L0hhcHB5Q29kZUhlcmUvY2FudmFzIGdhbWUvc3JjL2pzL3V0aWxzL2hlbHBlcnMuanMiLCJDOi9Vc2Vycy9Mb0wvRHJvcGJveC/QutGD0YDRgdGLL2pzLS1iYXNlLWNvdXJzZS8wNi9odC9IYXBweUNvZGVIZXJlL2NhbnZhcyBnYW1lL3NyYy9qcy91dGlscy9yb3V0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQSxBQUNBOztBQUNBLG1CQUNBOztBQUNBLDJCQUNBO0FBQ0EsQUFDQTs7bUVBQ0EsQUFDQTs7a0NBQ0E7bUNBQ0E7b0NBQ0E7bUNBQ0E7bUNBQ0E7MkNBQ0E7NENBQ0EsQUFDQTs7NkJBQ0E7b0NBQ0E7a0VBQ0E7b0VBQ0E7d0NBQ0E7OERBQ0E7K0NBQ0E7dURBQ0E7QUFDQSxBQUNBOztxQ0FDQTswQ0FDQSxBQUNBOztrQ0FDQTs0QkFDQTtBQUNBLEFBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTt3QkFDQTs2RkFDQSxBQUNBOztBQUNBOzZDQUNBLEFBQ0E7O0FBQ0E7c0RBQ0EsQUFDQTs7a0JBQ0EsQUFDQTs7MkJBQ0E7dUJBQ0E7QUFDQSxBQUNBOztvREFDQTt5SUFDQTtxQ0FDQTttQ0FDQTt1QkFDQTtBQUNBLEFBQ0E7O2tDQUNBOzRFQUNBO3VCQUNBO3lDQUNBOzhHQUNBOzRCQUNBO3VCQUNBO0FBQ0EsQUFDQTs7aUJBQ0E7QUFDQSxBQUNBOztzQ0FDQTtjQUNBOzBDQUNBOztBQUNBO21CQUNBO2NBQ0E7Y0FDQSxBQUNBOzsrQkFDQTtpQ0FDQTtBQUNBLEFBQ0E7O3dDQUNBO2dIQUNBO0FBQ0EsQUFDQTs7QUFDQTs4RUFDQTtzRUFDQTtzQ0FDQTtBQUNBLEFBQ0E7O0FBQ0E7a0JBQ0E7aUJBQ0E7MENBQ0E7dUNBQ0E7MkNBQ0E7d0JBQ0E7QUFDQTtpQkFDQTsyRUFDQTt1Q0FDQTsyQ0FDQTsyQ0FDQTt3QkFDQTtBQUNBLEFBQ0EsQUFDQTs7O2lCQUNBO0FBQ0EsQUFDQTs7OEJBQ0E7Z0NBQ0E7b0VBQ0EsQUFDQTs7O0FDeEhBO0FBQ0EsQUFDQTs7QUFDQTs7OztBQUNBOztBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBOzs7Ozs7O0FBQ0E7QUFDQSw0QkFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFDQTs7QUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBOzs7OztBQUNBLDJDQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtZQUNBO29DQUNBO21DQUNBO2dDQUNBO21CQUNBO0FBQ0E7eUVBQ0E7b0JBQ0E7aUJBQ0E7QUFDQTtBQUNBOztBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQTs7Ozs7Ozs7Ozs7O0FBQ0EsaURBQ0E7NEVBQ0EsQUFDQTs7MEVBQ0EsQUFDQTs7QUFDQTtBQUNBO3dEQUNBOytCQUNBOzJDQUNBO2dDQUNBO0FBQ0E7QUFDQSxBQUNBOztBQUNBO1lBQ0E7K0xBQ0E7NkJBQ0EsQUFDQTs7WUFDQTtvQ0FDQTtBQUNBOytDQUNBO2VBQ0E7QUFDQTtnQkFDQTt1QkFDQTswQkFDQTtBQUNBLEFBQ0E7O1lBQ0E7OEVBQ0E7QUFDQTttQkFDQTt3Q0FDQTtBQUNBO3VDQUNBOzhGQUNBO0FBQ0E7c0NBQ0E7Z0NBQ0E7NEVBQ0E7dUNBQ0E7cUJBQ0E7QUFDQTtBQUNBLEFBQ0E7O2VBQ0E7QUFDQTs7QUFDQTtBQUNBLEFBQ0E7O0FBQ0EsOENBQ0E7aUNBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTtlQUNBO21CQUNBO0FBQ0E7bUJBQ0EsQUFDQTs7QUFDQTs7QUFDQSxxQ0FDQTtxREFDQTtBQUNBOztBQUNBLG1EQUNBO1lBQ0E7b0JBQ0E7NEJBQ0E7ZUFDQTsrQkFDQTtBQUNBO2VBQ0E7ZUFDQTttQ0FDQTtBQUNBO2VBQ0E7ZUFDQTtlQUNBO3NCQUNBO0FBQ0E7ZUFDQTtxQ0FDQTtBQUNBO2VBQ0E7ZUFDQTtlQUNBO2VBQ0E7K0JBQ0E7QUFDQTtBQUNBOzRCQUNBLEFBQ0E7O2VBQ0E7QUFDQTs7QUFDQSxtREFDQTs4RUFDQSxBQUNBOzsrQkFDQTs0QkFDQTtzQ0FDQTtzQkFDQTtBQUNBLEFBQ0E7O1lBQ0E7NkNBQ0E7d0JBQ0E7NENBQ0E7bUNBQ0E7QUFDQTtBQUNBLEFBQ0E7OzZCQUNBO2tCQUNBOzBDQUNBOzBCQUNBO3lCQUNBO3NCQUNBO0FBQ0E7ZUFDQTtBQUNBOztBQUNBO0FBQ0EsQUFDQTs7QUFDQSxzREFDQTttQ0FDQTtxQ0FDQTtxQkFDQTttQkFDQTtlQUNBOzBCQUNBO2tDQUNBO3FCQUNBO0FBQ0E7QUFDQSxBQUNBOztBQUNBOzRCQUNBO2lDQUNBLEFBQ0E7O2lDQUNBOzRCQUNBO0FBQ0E7eUNBQ0E7dURBQ0E7K0JBQ0E7NEJBQ0E7QUFDQTttQ0FDQTtlQUNBO0FBQ0E7O0FBQ0EsdURBQ0E7K0ZBQ0E7ZUFDQTtBQUNBOztBQUNBLHdEQUNBO2dHQUNBO2VBQ0E7QUFDQTs7QUFDQSx5REFDQTtnREFDQTtBQUNBOztBQUNBLHlEQUNBO2lHQUNBO2VBQ0E7QUFDQTs7QUFDQSwwREFDQTtrR0FDQTtlQUNBO0FBQ0E7O0FBQ0EsMkVBQ0E7QUFDQTtBQUNBOzhCQUNBO2lDQUNBO3VCQUNBO3FCQUNBO0FBQ0E7ZUFDQTtBQUNBO3FCQUNBO3FCQUNBO21CQUNBO21CQUNBO0FBQ0EsQUFDQTs7bUNBQ0E7c0NBQ0E7cUJBQ0E7bUJBQ0E7ZUFDQTswQkFDQTtrQ0FDQTtxQkFDQTtBQUNBO0FBQ0E7OENBQ0EsQUFDQTs7WUFDQTtnQkFDQTtlQUNBO2tEQUNBO0FBQ0E7ZUFDQTtlQUNBO21EQUNBO0FBQ0E7ZUFDQTtvREFDQTtBQUNBO2VBQ0E7cURBQ0E7QUFDQTtlQUNBO3FEQUNBO0FBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTtzREFDQTtBQUNBO0FBQ0E7NEJBQ0EsQUFDQTs7ZUFDQTtBQUNBOztBQUNBLGtFQUNBO21CQUNBLEFBQ0E7OzhDQUNBO2lDQUNBOzJEQUNBLEFBQ0E7O0FBQ0E7a0NBQ0EsQUFDQTs7WUFDQTtnQkFDQTtlQUNBO3lDQUNBO0FBQ0E7ZUFDQTtlQUNBOzBDQUNBO0FBQ0E7ZUFDQTsyQ0FDQTtBQUNBO2VBQ0E7NENBQ0E7QUFDQTtlQUNBOzRDQUNBO0FBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTs2Q0FDQTtBQUNBO0FBQ0E7NEJBQ0EsQUFDQTs7ZUFDQTtBQUNBOztBQUNBLDRDQUNBOztnQkFFQTs4REFDQSxBQUNBO0FBSEE7QUFJQTs7QUFDQTtBQUNBLDBFQUNBO3FCQUNBLEFBQ0E7OzRCQUNBOzBDQUNBOzBDQUNBLEFBQ0E7O0FBQ0E7MkJBQ0E7d0RBQ0EsQUFDQTs7QUFDQTs2QkFDQTtrRUFDQTtvREFDQTtpREFDQSxBQUNBOztBQUNBOzBDQUNBOzZGQUNBLEFBQ0E7O3dCQUNBLEFBQ0E7O2tEQUNBO3dDQUNBO2dEQUNBO0FBQ0E7ZUFDQTt5REFDQTtBQUNBO0FBQ0E7O0FBQ0EsNkNBQ0E7K0NBQ0E7c0NBQ0E7ZUFDQTt1REFDQTtBQUNBO0FBQ0E7O0FBQ0EsMkNBQ0E7a0JBQ0E7a0JBQ0E7bUNBQ0EsQUFDQTs7MENBQ0E7OEJBQ0E7aUVBQ0E7a0JBQ0E7aUJBQ0E7eUNBQ0E7QUFDQTtBQUNBLEFBQ0E7O29DQUNBO0FBQ0E7O0FBQ0EsNENBQ0E7a0JBQ0E7bUNBQ0EsQUFDQTs7MENBQ0E7eUNBQ0E7Z0JBQ0E7QUFDQTs7QUFDQSw2Q0FDQTt1Q0FDQTtBQUNBOztBQUNBLDBDQUNBO3NCQUNBLEFBQ0E7O3lDQUNBO2dEQUNBLEFBQ0E7O2tCQUNBOzBDQUNBOzJCQUNBO0FBQ0E7ZUFDQTtBQUNBOztBQUNBLDhDQUNBO3FDQUNBO2tCQUNBO2tEQUNBOytEQUNBO0FBQ0E7ZUFDQTtBQUNBOztBQUNBLHFEQUNBO3VCQUNBO2tDQUNBOzhCQUNBLEFBQ0E7O29DQUNBO3NEQUNBO2VBQ0E7K0JBQ0E7dURBQ0E7NkNBQ0E7aUNBQ0E7QUFDQTtpQkFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQSwrQ0FDQTtvQkFDQTs4QkFDQTtBQUNBOztBQUNBO0FBQ0Esa0RBQ0E7b0JBQ0E7a0NBQ0E7QUFDQTs7QUFDQSwrREFDQTt1QkFDQTswREFDQTt1Q0FDQTtBQUNBLEFBQ0E7O21DQUNBLEFBQ0E7O29CQUNBO0FBQ0E7O0FBQ0EsZ0VBQ0E7dUJBQ0E7b0RBQ0E7MERBQ0E7MENBQ0E7QUFDQSxBQUNBOztzQkFDQTsyQkFDQSxBQUNBOztZQUNBOzBCQUNBO29CQUNBOzBEQUNBO2VBQ0E7K0JBQ0E7b0RBQ0E7QUFDQTtlQUNBO0FBQ0E7O0FBQ0Esa0VBQ0E7K0NBQ0E7QUFDQTs7QUFDQSxrRUFDQTtnREFDQTtBQUNBOztBQUNBLGdFQUNBO3VCQUNBO29EQUNBOzBEQUNBOzBDQUNBO0FBQ0EsQUFDQTs7c0JBQ0E7MkJBQ0EsQUFDQTs7WUFDQTswQkFDQTt5REFDQTswREFDQTtxQkFDQTt1RUFDQTtlQUNBO3lEQUNBOzBEQUNBO29EQUNBOzZDQUNBO0FBQ0E7ZUFDQTtBQUNBOztBQUNBLGtFQUNBOytDQUNBO0FBQ0E7O0FBQ0Esa0VBQ0E7Z0RBQ0E7QUFDQTs7QUFDQSw4REFDQTt1QkFDQTswREFDQTt1Q0FDQTtBQUNBLEFBQ0E7O21DQUNBLEFBQ0E7O2lDQUNBO3dFQUNBO0FBQ0E7O0FBQ0EsK0RBQ0E7dUJBQ0E7b0RBQ0E7MERBQ0E7MENBQ0E7QUFDQSxBQUNBOztzQkFDQTsyQkFDQSxBQUNBOzt5REFDQTt3QkFDQTs0REFDQTtBQUNBOztBQUNBLGlFQUNBOzhDQUNBO0FBQ0E7O0FBQ0EsaUVBQ0E7K0NBQ0E7QUFDQTs7QUFDQSwrREFDQTt1QkFDQTtvREFDQTswREFDQTswQ0FDQTtBQUNBLEFBQ0E7O3NCQUNBOzJCQUNBLEFBQ0E7O3lEQUNBO3dCQUNBO2dFQUNBO0FBQ0E7O0FBQ0EsaUVBQ0E7OENBQ0E7QUFDQTs7QUFDQSxpRUFDQTsrQ0FDQTtBQUNBOztBQUNBLCtEQUNBO3VCQUNBO29EQUNBOzBDQUNBO0FBQ0EsQUFDQTs7MkRBQ0E7QUFDQTs7QUFDQSxpRUFDQTs4Q0FDQTtBQUNBOztBQUNBLGlFQUNBOytDQUNBO0FBQ0E7O0FBQ0EsZ0VBQ0E7dUJBQ0E7b0RBQ0E7MENBQ0E7QUFDQSxBQUNBOzsyREFDQTtBQUNBOztBQUNBLGtFQUNBOytDQUNBO0FBQ0E7O0FBQ0Esa0VBQ0E7Z0RBQ0E7QUFDQTs7QUFDQSx1RUFDQTt1QkFDQTt3REFDQTswREFDQTt1Q0FDQTsyQkFDQTtBQUNBLEFBQ0E7O21DQUNBLEFBQ0E7O3VCQUNBO0FBQ0E7O0FBQ0Esd0VBQ0E7dUJBQ0E7d0RBQ0E7b0RBQ0E7MERBQ0E7MENBQ0E7MkJBQ0E7QUFDQSxBQUNBOztzQkFDQTsyQkFDQSxBQUNBOzttRUFDQTs4R0FDQTtBQUNBO0FBQ0E7O0FBQ0EsMEVBQ0E7Z0RBQ0E7QUFDQTs7QUFDQSwwRUFDQTtpREFDQTtBQUNBOztBQUNBLHdFQUNBO3VCQUNBO3dEQUNBO29EQUNBOzBEQUNBOzBDQUNBOzJCQUNBO0FBQ0EsQUFDQTs7c0JBQ0E7MkJBQ0EsQUFDQTs7bUVBQ0E7dUVBQ0E7QUFDQTtBQUNBOztBQUNBLDBFQUNBO2dEQUNBO0FBQ0E7O0FBQ0EsMEVBQ0E7aURBQ0E7QUFDQTs7QUFDQSxzRUFDQTt1QkFDQTt3REFDQTswREFDQTt1Q0FDQTtrQ0FDQTtBQUNBLEFBQ0E7O21DQUNBLEFBQ0E7O2dIQUNBO0FBQ0E7O0FBQ0EsdUVBQ0E7dUJBQ0E7d0RBQ0E7b0RBQ0E7MERBQ0E7MENBQ0E7b0NBQ0E7QUFDQSxBQUNBOztzQkFDQTsyQkFDQSxBQUNBOztrSkFDQTtBQUNBOztBQUNBLHlFQUNBOytDQUNBO0FBQ0E7O0FBQ0EseUVBQ0E7Z0RBQ0E7QUFDQTs7QUFDQSx1RUFDQTt1QkFDQTt3REFDQTtvREFDQTswREFDQTswQ0FDQTt3Q0FDQTtBQUNBLEFBQ0E7O3NCQUNBOzJCQUNBLEFBQ0E7O3NKQUNBO0FBQ0E7O0FBQ0EseUVBQ0E7K0NBQ0E7QUFDQTs7QUFDQSx5RUFDQTtnREFDQTtBQUNBOztBQUNBLHVFQUNBO3VCQUNBO3dEQUNBO29EQUNBOzBEQUNBOzBDQUNBO3VEQUNBO0FBQ0EsQUFDQTs7c0JBQ0E7MkJBQ0EsQUFDQTs7NERBQ0E7QUFDQTs7QUFDQSx5RUFDQTsrQ0FDQTtBQUNBOztBQUNBLHlFQUNBO2dEQUNBO0FBQ0E7O0FBQ0Esd0VBQ0E7dUJBQ0E7d0RBQ0E7b0RBQ0E7MERBQ0E7MENBQ0E7d0RBQ0E7QUFDQSxBQUNBOztzQkFDQTsyQkFDQSxBQUNBOzs0REFDQTtBQUNBOztBQUNBLDBFQUNBO2dEQUNBO0FBQ0E7O0FBQ0EsMEVBQ0E7aURBQ0E7QUFDQTs7QUFDQTtBQUNBLDJEQUNBOzRCQUNBOzRCQUNBOzZCQUNBLEFBQ0E7O3VDQUNBO21DQUNBO0FBQ0EsQUFDQTs7MkRBQ0E7NkJBQ0EsQUFDQTs7QUFDQTsyQkFDQTsrQkFDQSxBQUNBOztrREFDQTsrQ0FDQSxBQUNBOzswQ0FDQTtvQkFDQTtBQUNBO0FBQ0E7O0FBQ0EsNkNBQ0E7a0JBQ0E7dUJBQ0E7c0NBQ0E7OEJBQ0E7K0NBQ0E7eUJBQ0E7QUFDQTtBQUNBO0FBQ0E7NENBQ0E7QUFDQTs7QUFDQSxBQUNBLEFBQ0EsQUFDQTs7OztBQUNBLG1EQUNBOytDQUNBO3NDQUNBO29DQUNBO2lCQUNBOzBDQUNBOytEQUNBOzRCQUNBO3dCQUNBO0FBQ0E7ZUFDQTswQkFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQSxBQUNBOztBQUNBLCtCQUNBO2lDQUNBO3lDQUNBO0FBQ0E7O0FBQ0Esc0JBQ0E7O0FBQ0EsQUFDQSxBQUNBOzs7QUFDQSx1Q0FDQTt3QkFDQSxBQUNBOztBQUNBO3VCQUNBO3VCQUNBLEFBQ0E7O0FBQ0E7cUJBQ0E7cUJBQ0EsQUFDQTs7dUJBQ0E7MEJBQ0E7Z0NBQ0E7d0JBQ0E7c0JBQ0E7dUJBQ0E7MkJBQ0E7OEJBQ0E7OEJBQ0E7OEJBQ0E7OEJBQ0E7MEJBQ0E7NkJBQ0E7NkJBQ0E7NkJBQ0E7NkJBQ0E7NkJBQ0E7NkJBQ0E7OEJBQ0E7OEJBQ0E7NEJBQ0E7K0JBQ0E7K0JBQ0E7K0JBQ0E7K0JBQ0E7MkJBQ0E7OEJBQ0E7OEJBQ0E7OEJBQ0E7OEJBQ0E7OEJBQ0E7OEJBQ0E7K0JBQ0E7K0JBQ0E7c0JBQ0E7eUJBQ0E7K0JBQ0EsQUFDQTs7ZUFDQTtBQUNBOztBQUNBO0FBQ0E7OENBRUE7d0JBREEsQ0FFQTtpQ0FDQTsrQkFDQTtpQkFDQTsrQkFDQTtlQUNBO0FBQ0E7O0FBQ0EsOEJBQ0E7QUFDQTtBQUNBO0FBQ0E7OEJBQ0E7Z0NBQ0E7QUFDQTs7QUFDQSxnQ0FDQTtvREFDQTs2REFDQTtXQUNBO0FBQ0E7O0FBQ0EsbUNBQ0E7c0xBQ0E7QUFDQTs7QUFDQSx3QkFDQTs0Q0FDQTswQkFDQTtBQUNBOztBQUNBLGdDQUNBO3dCQUNBOzZDQUNBO2lDQUNBO2dFQUNBO3dCQUNBOzRDQUNBO2dGQUNBOytDQUNBOzRDQUNBO0FBQ0E7QUFDQTtBQUNBO2VBQ0E7QUFDQTs7QUFDQSxpQ0FDQTt3QkFDQTs2Q0FDQTtBQUNBOzZDQUNBO0FBQ0E7ZUFDQTtBQUNBOztBQUNBLG1DQUNBO21CQUNBO3dCQUNBOzZDQUNBOzZCQUNBO29CQUNBO21CQUNBO3lCQUNBO3lCQUNBO0FBQ0EsQUFDQTs7ZUFDQTtBQUNBOztBQUNBLGtDQUNBO2tDQUNBO0FBQ0E7O0FBQ0Esb0RBQ0E7WUFDQTt5Q0FDQTsyREFDQTtnQ0FDQTtBQUNBO2VBQ0E7QUFDQTs7QUFDQSxtQ0FDQTtZQUNBO29DQUNBO3NCQUNBOzhDQUNBO0FBQ0E7QUFDQTs7QUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBOzs7OztBQUNBLHFDQUNBOzBDQUNBOzJCQUNBOzZCQUNBOzRDQUNBO0FBQ0E7O0FBQ0EsMENBQ0E7MENBQ0E7NkJBQ0E7NkJBQ0E7NENBQ0E7QUFDQTs7QUFDQSw2Q0FDQTswQ0FDQTs2QkFDQTs2QkFDQTtBQUNBOztBQUNBLHFDQUNBOzhDQUNBO0FBQ0EsQUFDQTs7O0FDemhDQTtBQUNBLEFBQ0E7O0FBQ0EsbUVBQ0E7ZUFDQTt1Q0FDQTtpQ0FDQTs0QkFDQTtxQkFDQTtvQ0FDQTs0QkFDQTtnQ0FDQSxBQUNBOzthQUNBLEFBQ0E7O2dDQUNBO2VBQ0E7aUJBQ0E7aUZBQ0EsQUFDQTs7Z0NBQ0E7ZUFDQTtpQkFDQTtpRkFDQSxBQUNBOztxQkFDQTtrQkFDQTsrQkFDQTswQ0FDQTtlQUNBOzhCQUNBO2tCQUNBO0FBQ0E7a0RBQ0E7QUFDQTs7QUFDQSwyRUFDQTtrQkFDQTt1Q0FDQTtpQ0FDQTs0QkFDQTtxRUFDQTtvQ0FDQTs0QkFDQTtnRUFDQSxBQUNBOzt5QkFDQSxBQUNBOztnREFDQTtpQ0FDQTtjQUNBO2VBQ0E7Z0RBQ0E7aURBQ0E7QUFDQTtpQkFDQTtBQUNBOzhCQUNBOzBCQUNBO2lCQUNBOzBDQUNBO0FBQ0E7OEJBQ0E7QUFDQTtpQkFDQTtBQUNBLEFBQ0E7O2lDQUNBO2dCQUNBO2dCQUNBO3FDQUNBOzhDQUNBO29CQUNBO2lCQUNBOzZEQUNBO2dCQUNBO0FBQ0E7QUFDQSxBQUNBOzt1RkFDQSxBQUNBOzt3QkFDQTtnQkFDQTtzRkFDQSxBQUNBOztzQ0FDQTtBQUNBLEFBQ0E7OztBQ3hGQTtBQUNBLEFBQ0E7O0FBQ0EsQUFDQTs7QUFDQSxxQ0FDQTs7QUFDQSxxQ0FDQTtzRUFDQTtvRkFDQSxBQUNBOzs2QkFDQTs4QkFDQTt1Q0FDQTtBQUNBO0FBQ0EsQUFDQTs7cUJBQ0E7c0JBQ0E7MkRBQ0E7NEJBQ0E7c0ZBQ0E7aUJBQ0E7b0NBQ0E7K0JBQ0E7QUFDQTtBQUNBO0FBQ0E7YUFDQSxBQUNBOzt1Q0FDQTt1QkFDQTsrQ0FDQTtBQUNBO0FBQ0EsQUFDQTs7cUNBQ0E7eUJBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUNBOztBQUNBLHVCQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUNBOztBQUNBLHdDQUNBO3dCQUNBO0FBQ0E7O0FBQ0E7QUFDQSxnQ0FDQTtlQUNBOztBQUNBLHFDQUNBO3dCQUNBO0FBQ0EsQUFDQTs7O0FDcEVBO0FBQ0EsQUFDQTs7QUFDQTtlQUVBLEFBQ0E7QUFGQTs7QUFHQTs7Ozs7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBO0FBQ0EseUJBQ0E7O0FBQ0EsOEJBQ0E7a0VBQ0E7Z0NBQ0EsQUFDQTs7cUJBQ0E7dUJBQ0E7d0JBQ0E7dUJBQ0EsQUFDQTs7MEJBQ0EsQUFDQTs7dUJBQ0E7dUJBQ0E7MkJBQ0EsQUFDQTs7OENBQ0EsQUFDQTs7bUJBQ0E7bUJBQ0EsQUFDQTs7K0NBQ0E7K0NBQ0EsQUFDQTs7K0NBQ0E7QUFDQSxBQUNBOzs7ZUFFQTtzQ0FDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTt1RUFDQTttQkFDQTtBQUNBO0FBWEE7ZUFhQTswQ0FDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEFBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQUFDQSxBQUNBOzs7c0NBQ0E7dUJBQ0E7bUNBQ0E7dUJBQ0E7QUFDQTt1Q0FDQTt1QkFDQTttQ0FDQTt1QkFDQTtBQUNBO21CQUNBO0FBQ0EsQUFDQSxBQUNBO0FBcENBOztlQXFDQTtBQUNBOztBQUNBLHdCQUNBLEFBQ0E7OztBQzlGQTtBQUNBLEFBQ0E7O0FBQ0E7ZUFFQSxBQUNBO0FBRkE7O0FBR0E7Ozs7Ozs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTtBQUNBLHlCQUNBOztBQUNBLDhCQUNBO3dEQUNBO2dDQUNBLEFBQ0E7O3FCQUNBO3VCQUNBO3dCQUNBO3VCQUNBLEFBQ0E7O3VCQUNBO3VCQUNBOzJCQUNBLEFBQ0E7OzhDQUNBLEFBQ0E7O21CQUNBO21CQUNBLEFBQ0E7OytDQUNBOytDQUNBO0FBQ0EsQUFDQTs7O2VBRUE7c0NBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQUFDQTs7dUVBQ0E7bUJBQ0E7QUFDQTtBQVpBO2VBY0E7MENBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxBQUNBOzsyQkFDQTsyQkFDQSxBQUNBOztzQ0FDQTt1QkFDQTttQ0FDQTt1QkFDQTtBQUNBO3VDQUNBO3VCQUNBO21DQUNBO3VCQUNBO0FBQ0E7bUJBQ0E7QUFDQSxBQUNBLEFBQ0E7QUE5QkE7O2VBK0JBO0FBQ0E7O0FBQ0Esd0JBQ0EsQUFDQTs7O0FDckZBO0FBQ0EsQUFDQTs7QUFDQTtlQUVBLEFBQ0E7QUFGQTs7QUFHQTs7Ozs7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBO0FBQ0EseUJBQ0E7O0FBQ0EsK0JBQ0E7eURBQ0E7Z0NBQ0EsQUFDQTs7cUJBQ0E7dUJBQ0E7d0JBQ0E7dUJBQ0EsQUFDQTs7dUJBQ0E7dUJBQ0E7MkJBQ0EsQUFDQTs7dUJBQ0EsQUFDQTs7OENBQ0EsQUFDQTs7bUJBQ0E7bUJBQ0EsQUFDQTs7K0NBQ0E7K0NBQ0E7QUFDQSxBQUNBOzs7ZUFFQTtzQ0FDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxBQUNBOzs0QkFDQTt1R0FDQTttQkFDQTt5RUFDQTtBQUNBLEFBQ0E7O21CQUNBO0FBQ0E7QUFqQkE7ZUFtQkE7MENBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxBQUNBOzs4QkFDQTsrQkFDQTsrQkFDQTttQkFDQTs2QkFDQTs2QkFDQTtBQUNBLEFBQ0E7O3NDQUNBO3VCQUNBO21DQUNBO3VCQUNBO0FBQ0E7dUNBQ0E7dUJBQ0E7bUNBQ0E7dUJBQ0E7QUFDQTttQkFDQTtBQUNBLEFBQ0EsQUFDQTtBQW5DQTs7ZUFvQ0E7QUFDQTs7QUFDQSx3QkFDQSxBQUNBOzs7QUNqR0E7QUFDQSxBQUNBOztBQUNBO2VBRUEsQUFDQTtBQUZBOztBQUdBOzs7Ozs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0Esa0NBQ0E7MkZBQ0E7c0JBQ0EsQUFDQTs7Z0NBQ0EsQUFDQTs7d0JBQ0E7NENBQ0EsQUFDQTs7MEJBQ0EsQUFDQTs7d0JBQ0E7dUJBQ0EsQUFDQTs7dUVBQ0E7dUJBQ0E7d0JBQ0E7dUJBQ0EsQUFDQTs7dURBQ0E7eUVBQ0E7YUFDQSxBQUNBOzt3REFDQTswRkFDQTthQUNBLEFBQ0E7O3VEQUNBO21LQUNBO2FBQ0EsQUFDQTs7ZUFDQTtBQUNBLEFBQ0E7OztlQUVBO2tDQUNBO3lCQUNBLEFBQ0E7O3NDQUNBO3FDQUNBLEFBQ0E7O2tDQUNBO2dGQUNBLEFBQ0E7O3FEQUNBOzZEQUNBLEFBQ0E7OzJCQUNBO3FFQUNBOzREQUNBO2dCQUNBOzJDQUNBO2tEQUNBO0FBQ0E7MERBQ0E7a0RBQ0E7QUFDQSxBQUNBOztrQ0FDQTtBQUNBO0FBMUJBO2VBNEJBO2lDQUNBO3dCQUNBOytCQUNBOytCQUNBOytCQUNBO3VFQUNBO2tDQUNBO0FBQ0E7QUFUQTtlQVdBO2tDQUNBO29FQUNBO0FBQ0E7QUFKQTtlQU1BO3dDQUNBO3lCQUNBLEFBQ0E7O2lCQUNBO0FBQ0EsQUFDQSxBQUNBOzs7a0VBQ0EsQUFDQTs7OzRDQUVBOzJDQUNBO3lDQUNBOzJDQUNBO0FBSkEsMkJBS0EsQUFDQTs7MkNBQ0E7MERBQ0E7MERBQ0EsQUFDQTs7NENBQ0EsQUFDQTs7NENBQ0E7bURBQ0E7NkNBQ0E7QUFDQTtBQUNBLEFBQ0E7O29GQUNBLEFBQ0E7O3VCQUNBLEFBQ0E7O3NEQUNBO3dDQUNBO3VCQUNBO3dDQUNBO0FBQ0E7QUFDQTs0Q0FDQTtBQUNBLEFBQ0E7OzRDQUNBOzBEQUNBOzBEQUNBLEFBQ0E7OzhDQUNBO0FBQ0EsQUFDQTs7NkJBQ0EsQUFDQTs7O2dIQUVBO2dIQUNBLEFBQ0E7QUFIQTtxQkFJQTtBQUNBOzZCQUNBOzRCQUNBO0FBQ0EsQUFDQTs7NENBQ0E7NENBQ0E7b0RBQ0E7OENBQ0E7QUFDQTtBQUNBLEFBQ0E7O29GQUNBLEFBQ0E7O3VCQUNBLEFBQ0E7O3NEQUNBO3dDQUNBO3VCQUNBO3dDQUNBO0FBQ0E7QUFDQTtpQ0FDQTtBQUNBLEFBQ0E7OzJDQUNBOzBEQUNBOzBEQUNBLEFBQ0E7O0FBQ0E7QUFDQSxBQUNBOzs0Q0FDQTs2Q0FDQTtnQ0FDQTswQ0FDQTtBQUNBLEFBQ0E7O2lEQUNBOzJDQUNBO0FBQ0EsQUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzRDQUNBO0FBQ0E7QUFDQSxBQUNBOztBQUNBLEFBQ0EsQUFDQSxBQUNBOztBQXJIQTs7ZUFzSEE7QUFDQTs7QUFDQSx3QkFDQSxBQUNBOzs7QUNsTkE7QUFDQSxBQUNBOztBQUNBO2VBRUEsQUFDQTtBQUZBOztBQUdBOzs7Ozs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0EsK0JBQ0E7MkNBQ0E7Z0NBQ0EsQUFDQTs7eUJBQ0E7MEJBQ0EsQUFDQTs7eURBQ0E7dUNBQ0E7QUFDQSxBQUNBOzs7ZUFFQTsyREFDQTtzREFDQSxBQUNBOzttRkFDQTtBQUNBO0FBTkE7ZUFRQTtrQ0FDQTtzREFDQTtpQ0FDQTtBQUNBO0FBTEE7ZUFPQTt5Q0FDQTtzQ0FDQSxBQUNBOzt1Q0FDQSxBQUNBOztpREFDQTt1REFDQTtBQUNBLEFBQ0EsQUFDQTtBQVhBOztlQVlBO0FBQ0E7O0FBQ0Esd0JBQ0EsQUFDQTs7O0FDcERBO0FBQ0EsQUFDQTs7QUFDQTtlQUVBLEFBQ0E7QUFGQTs7QUFHQTs7Ozs7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBLDZCQUNBOytCQUNBO2dDQUNBLEFBQ0E7O3lCQUNBO0FBQ0EsQUFDQTs7O2VBRUE7dUNBQ0E7cUNBQ0E7QUFDQSxBQUNBLEFBQ0E7QUFOQTs7ZUFPQTtBQUNBOztBQUNBLHdCQUNBLEFBQ0E7OztBQzlCQTtBQUNBLEFBQ0E7O0FBQ0E7ZUFFQSxBQUNBO0FBRkE7O0FBR0E7Ozs7Ozs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQTtBQUNBLHlCQUNBOztBQUNBLCtCQUNBO21FQUNBO2dDQUNBLEFBQ0E7O3FCQUNBO3VCQUNBO3dCQUNBO3VCQUNBLEFBQ0E7OzBCQUNBLEFBQ0E7O3VCQUNBO3VCQUNBOzJCQUNBLEFBQ0E7OzhDQUNBLEFBQ0E7OzBCQUNBLEFBQ0E7O21CQUNBO21CQUNBO0FBQ0EsQUFDQTs7O2VBRUE7a0NBQ0E7d0JBQ0EsQUFDQTs7QUFDQTsrQkFDQTsyQkFDQTswQkFDQTswQkFDQSxBQUNBOztnRkFDQSxBQUNBOzttQ0FDQTtzRkFDQTtzQkFDQSxBQUNBOzs0QkFDQTttQ0FDQTsrQkFDQTs0QkFDQTs4QkFDQTs2QkFDQTs2QkFDQTtlQUNBO0FBQ0E7QUF6QkE7ZUEyQkE7c0NBQ0EsQUFDQTs7QUFDQTtBQUNBO0FBQ0EsQUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQSxBQUNBOztnQkFDQTt1Q0FDQTtBQUNBOzhDQUNBO2lDQUNBO0FBQ0E7K0JBQ0E7c0lBQ0E7bUJBQ0E7c0dBQ0E7QUFDQTtnQkFDQSxBQUNBOzttQkFDQTtBQUNBO0FBM0JBO2VBNkJBOzBDQUNBOzZCQUNBOytCQUNBOzJCQUNBO21CQUNBOzJCQUNBO0FBQ0E7K0NBQ0E7K0NBQ0E7eUNBQ0E7NENBQ0EsQUFDQTs7cURBQ0E7aURBQ0E7aURBQ0EsQUFDQTs7c0NBQ0E7dUJBQ0E7bUNBQ0E7dUJBQ0E7QUFDQTt1Q0FDQTt1QkFDQTttQ0FDQTt1QkFDQTtBQUNBO21CQUNBO0FBQ0EsQUFDQSxBQUNBO0FBL0JBOztlQWdDQTtBQUNBOztBQUNBLHdCQUNBLEFBQ0E7OztBQ2hJQTtBQUNBLEFBQ0E7O0FBQ0E7ZUFFQSxBQUNBO0FBRkE7O0FBR0E7Ozs7Ozs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQSxrQ0FDQTs4Q0FDQTtnQ0FDQSxBQUNBOzt5QkFDQTswQkFDQSxBQUNBOzs2Q0FDQTtBQUNBLEFBQ0E7OztlQUVBO3FDQUNBO3lEQUNBLEFBQ0E7O3dCQUNBOzhDQUNBLEFBQ0E7O2dEQUNBO2dEQUNBO0FBQ0E7dUJBQ0E7ZUFDQSxBQUNBOzttQ0FDQTs0QkFDQTtzQkFDQTtBQUNBO0FBakJBO2VBbUJBOzRDQUNBO3FDQUNBLEFBQ0E7O2dEQUNBO0FBQ0EsQUFDQSxBQUNBO0FBUkE7O2VBU0E7QUFDQTs7QUFDQSx3QkFDQSxBQUNBOzs7QUNyREE7QUFDQSxBQUNBOztBQUNBO2VBRUEsQUFDQTtBQUZBOztBQUdBOzs7Ozs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0EsbUNBQ0E7K0NBQ0E7Z0NBQ0EsQUFDQTs7eUJBQ0E7MEJBQ0E7c0JBQ0EsQUFDQTs7bURBQ0EsQUFDQTs7Z0RBQ0E7QUFDQSxBQUNBOzs7ZUFFQTtnREFDQTt3QkFDQTt3QkFDQSxBQUNBOztpQkFDQTtBQUNBO0FBUEE7ZUFTQTs2Q0FDQTt1Q0FDQTtxQ0FDQSxBQUNBOztBQUNBLEFBQ0E7O21DQUNBO3VDQUNBO0FBQ0E7QUFDQSxBQUNBOzt1REFDQTt3RkFDQTtBQUNBO0FBQ0EsQUFDQSxBQUNBO0FBbEJBOztlQW1CQTtBQUNBOztBQUNBLHdCQUNBLEFBQ0E7OztBQ3hEQTtBQUNBLEFBQ0E7O0FBQ0E7ZUFFQSxBQUNBO0FBRkE7O0FBR0E7Ozs7Ozs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQSxBQUNBOztBQUNBLDhCQUNBOzBDQUNBO3NCQUNBLEFBQ0E7O2dDQUNBLEFBQ0E7O3lCQUNBOzBCQUNBLEFBQ0E7O3NCQUNBLEFBQ0E7OzZDQUNBLEFBQ0E7OzhDQUNBO3dEQUNBO2dDQUNBO3lJQUNBO0FBQ0E7eUJBQ0E7QUFDQTtBQUNBLEFBQ0E7OztlQUVBO3FDQUNBO3lCQUNBLEFBQ0E7O3lEQUNBO21DQUNBO2lEQUNBOzZCQUNBO2lFQUNBO2VBQ0E7QUFDQSxBQUNBLEFBQ0E7QUFiQTs7ZUFjQTtBQUNBOztBQUNBLHdCQUNBLEFBQ0E7OztBQ3REQTtBQUNBLEFBQ0E7O0FBQ0EsMkJBQ0E7O0FBQ0EsMEJBQ0E7O0FBQ0EsMkJBQ0E7O0FBQ0EsNEJBQ0E7O0FBQ0EsNENBQ0E7O0FBQ0EsOEJBQ0E7O0FBQ0EsOENBQ0E7O0FBQ0EsMEJBQ0E7O0FBQ0EsMENBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0EscURBQ0E7O0FBQ0Esb0NBQ0E7O0FBQ0EsdURBQ0E7O0FBQ0E7QUFDQSwrQkFDQSxBQUNBOzs7QUNoQ0E7QUFDQSxBQUNBOztBQUNBO2VBRUE7QUFEQTtBQUVBLHFCQUNBOztBQUNBLCtCQUNBOztBQUNBLCtDQUNBOztBQUNBLDRCQUNBOztBQUNBLDRDQUNBOztBQUNBLDJCQUNBOztBQUNBLDJDQUNBOztBQUNBLDRCQUNBOztBQUNBLDJDQUNBOztBQUNBLDJCQUNBOztBQUNBLDJDQUNBOztBQUNBLCtCQUNBOztBQUNBLCtDQUNBOztBQUNBLDJCQUNBOztBQUNBLDJDQUNBOztBQUNBLDRCQUNBOztBQUNBLDRDQUNBOztBQUNBLDZCQUNBOztBQUNBOztBQUNBOztBQUNBLG9CQUNBOztBQUNBO2NBRUE7ZUFDQTtpREFDQTtpREFDQTtnREFDQTtrQ0FDQSxBQUNBOztnQ0FDQSxBQUNBOzs4Q0FDQTs2QkFDQTtzQ0FDQSxBQUNBOzs0REFDQTs2QkFDQTt1Q0FDQSxBQUNBOzswSkFDQTtBQUNBLEFBQ0E7OzhDQUNBOytCQUNBLEFBQ0E7OzZDQUNBOzhCQUNBOzhDQUNBOytCQUNBLEFBQ0E7O2lEQUNBLEFBQ0E7O3VEQUNBLEFBQ0E7OzJDQUNBOzRCQUNBLEFBQ0E7O3dCQUNBLEFBQ0E7OzZCQUNBLEFBQ0E7OzhDQUNBO2lEQUNBLEFBQ0E7O3dDQUNBLEFBQ0E7O21EQUNBO29DQUNBO3FEQUNBO0FBQ0E7QUFDQTtxQ0FDQSxBQUNBO0FBbkRBOztBQW9EQSxxQkFDQSxBQUNBOzs7QUNyR0E7QUFDQSxBQUNBOztBQUNBO2VBRUE7QUFEQTtBQUVBO2NBRUE7ZUFDQTtvQ0FDQTtpREFDQTs2Q0FDQTtrQ0FDQSxBQUNBOztnQ0FDQTtBQUNBLEFBQ0E7QUFWQTs7QUFXQSxzQkFDQSxBQUNBOzs7QUNwQkE7QUFDQSxBQUNBOztBQUNBO2VBRUE7QUFEQTtBQUVBLHNCQUNBOztBQUNBLDZCQUNBOztBQUNBLGdDQUNBOztBQUNBLGdEQUNBOztBQUNBOztBQUNBOztBQUNBO2NBRUE7ZUFDQTtpREFDQTtpREFDQTs2Q0FDQTtrQ0FDQSxBQUNBOztnQ0FDQSxBQUNBOzsrQ0FDQTtzREFDQSxBQUNBOzswREFDQTsyQ0FDQSxBQUNBOztvREFDQTttQ0FDQTs0Q0FDQSxBQUNBOzs2REFDQTswREFDQTs2Q0FDQTtBQUNBLEFBQ0E7O3lDQUNBO0FBQ0EsQUFDQTtBQTNCQTs7QUE0QkEsc0JBQ0EsQUFDQTs7O0FDL0NBO0FBQ0EsQUFDQTs7QUFDQTtlQUVBLEFBQ0E7QUFGQTs7QUFHQTs7Ozs7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBLGlDQUNBOzRCQUNBO2dDQUNBLEFBQ0E7OzJCQUNBO0FBQ0EsQUFDQTs7O2VBRUE7eUNBQ0E7dUNBQ0E7cUNBQ0E7QUFDQSxBQUNBOztzQ0FDQTtBQUNBO0FBUkE7ZUFVQTswQ0FDQTt1Q0FDQSxBQUNBOztxREFDQTsrQ0FDQSxBQUNBOzttREFDQTtvQ0FDQTtBQUNBO0FBQ0E7QUFYQTtlQWFBOzhDQUNBO3VDQUNBLEFBQ0E7O3FEQUNBOzBEQUNBO0FBQ0E7eURBQ0E7cUJBQ0E7cUJBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFiQTtlQWVBOzJDQUNBO0FBQ0E7QUFDQTtBQUNBLEFBQ0EsQUFDQTtBQVBBOztlQVFBO0FBQ0E7O0FBQ0Esd0JBQ0EsQUFDQTs7O0FDcEVBO0FBQ0EsQUFDQTs7QUFDQTtlQUVBO0FBREE7QUFFQSx3RkFDQTs4Q0FDQTt1QkFDQTtBQUNBOztBQUNBLHdGQUNBO3VDQUNBO3NCQUNBO3FEQUNBO0FBQ0E7O0FBQ0Esb0dBQ0E7MkJBQ0E7QUFDQSxBQUNBOzs7QUNyQkE7QUFDQSxBQUNBOztBQUNBO2VBRUEsQUFDQTtBQUZBOztBQUdBOzs7Ozs7OztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0EsQUFDQTs7QUFDQSwrQkFDQTtnQ0FDQTtnQ0FDQSxBQUNBOztpQ0FDQTt5Q0FDQSxBQUNBOztlQUNBO0FBQ0EsQUFDQTs7O2VBRUE7aUNBQ0E7d0JBQ0EsQUFDQTs7d0JBQ0E7QUFDQTs4REFDQTtxREFDQTtBQUNBO0FBQ0E7MkNBQ0E7QUFDQTtBQVpBO2VBY0E7b0RBQ0E7NEZBQ0E7QUFDQTt3QkFDQTtBQUNBO0FBTkE7ZUFRQTtrREFDQTtBQUNBO0FBQ0E7OERBQ0E7dURBQ0E7eUNBQ0E7Z0VBQ0E7dUNBQ0E7NERBQ0E7MkNBQ0E7QUFDQTtBQUNBLEFBQ0E7OzBGQUNBO21CQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEFBQ0E7O0FBdkJBO2VBeUJBO3lDQUNBO3lCQUNBLEFBQ0E7OzRCQUNBO0FBQ0E7cUNBQ0E7QUFDQTttREFDQTtBQUNBO0FBQ0EsQUFDQTs7QUFDQSxBQUNBOztBQUNBOytDQUNBO2tIQUNBO0FBQ0E7QUFDQTs4QkFDQTsrR0FDQTtBQUNBO0FBQ0EsQUFDQTs7OEJBQ0E7bUdBQ0E7Z0NBQ0E7b0NBQ0E7QUFDQTtBQUNBO0FBQ0EsQUFDQSxBQUNBO0FBakNBOztlQWtDQTtBQUNBOztBQUNBLEFBQ0E7O0FBQ0Esd0JBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQUFDQSxBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgbG9va3VwID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xuXG47KGZ1bmN0aW9uIChleHBvcnRzKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5O1xuXG5cdHZhciBQTFVTID0gJysnLmNoYXJDb2RlQXQoMCk7XG5cdHZhciBTTEFTSCA9ICcvJy5jaGFyQ29kZUF0KDApO1xuXHR2YXIgTlVNQkVSID0gJzAnLmNoYXJDb2RlQXQoMCk7XG5cdHZhciBMT1dFUiA9ICdhJy5jaGFyQ29kZUF0KDApO1xuXHR2YXIgVVBQRVIgPSAnQScuY2hhckNvZGVBdCgwKTtcblx0dmFyIFBMVVNfVVJMX1NBRkUgPSAnLScuY2hhckNvZGVBdCgwKTtcblx0dmFyIFNMQVNIX1VSTF9TQUZFID0gJ18nLmNoYXJDb2RlQXQoMCk7XG5cblx0ZnVuY3Rpb24gZGVjb2RlKGVsdCkge1xuXHRcdHZhciBjb2RlID0gZWx0LmNoYXJDb2RlQXQoMCk7XG5cdFx0aWYgKGNvZGUgPT09IFBMVVMgfHwgY29kZSA9PT0gUExVU19VUkxfU0FGRSkgcmV0dXJuIDYyOyAvLyAnKydcblx0XHRpZiAoY29kZSA9PT0gU0xBU0ggfHwgY29kZSA9PT0gU0xBU0hfVVJMX1NBRkUpIHJldHVybiA2MzsgLy8gJy8nXG5cdFx0aWYgKGNvZGUgPCBOVU1CRVIpIHJldHVybiAtMTsgLy9ubyBtYXRjaFxuXHRcdGlmIChjb2RlIDwgTlVNQkVSICsgMTApIHJldHVybiBjb2RlIC0gTlVNQkVSICsgMjYgKyAyNjtcblx0XHRpZiAoY29kZSA8IFVQUEVSICsgMjYpIHJldHVybiBjb2RlIC0gVVBQRVI7XG5cdFx0aWYgKGNvZGUgPCBMT1dFUiArIDI2KSByZXR1cm4gY29kZSAtIExPV0VSICsgMjY7XG5cdH1cblxuXHRmdW5jdGlvbiBiNjRUb0J5dGVBcnJheShiNjQpIHtcblx0XHR2YXIgaSwgaiwgbCwgdG1wLCBwbGFjZUhvbGRlcnMsIGFycjtcblxuXHRcdGlmIChiNjQubGVuZ3RoICUgNCA+IDApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpO1xuXHRcdH1cblxuXHRcdC8vIHRoZSBudW1iZXIgb2YgZXF1YWwgc2lnbnMgKHBsYWNlIGhvbGRlcnMpXG5cdFx0Ly8gaWYgdGhlcmUgYXJlIHR3byBwbGFjZWhvbGRlcnMsIHRoYW4gdGhlIHR3byBjaGFyYWN0ZXJzIGJlZm9yZSBpdFxuXHRcdC8vIHJlcHJlc2VudCBvbmUgYnl0ZVxuXHRcdC8vIGlmIHRoZXJlIGlzIG9ubHkgb25lLCB0aGVuIHRoZSB0aHJlZSBjaGFyYWN0ZXJzIGJlZm9yZSBpdCByZXByZXNlbnQgMiBieXRlc1xuXHRcdC8vIHRoaXMgaXMganVzdCBhIGNoZWFwIGhhY2sgdG8gbm90IGRvIGluZGV4T2YgdHdpY2Vcblx0XHR2YXIgbGVuID0gYjY0Lmxlbmd0aDtcblx0XHRwbGFjZUhvbGRlcnMgPSAnPScgPT09IGI2NC5jaGFyQXQobGVuIC0gMikgPyAyIDogJz0nID09PSBiNjQuY2hhckF0KGxlbiAtIDEpID8gMSA6IDA7XG5cblx0XHQvLyBiYXNlNjQgaXMgNC8zICsgdXAgdG8gdHdvIGNoYXJhY3RlcnMgb2YgdGhlIG9yaWdpbmFsIGRhdGFcblx0XHRhcnIgPSBuZXcgQXJyKGI2NC5sZW5ndGggKiAzIC8gNCAtIHBsYWNlSG9sZGVycyk7XG5cblx0XHQvLyBpZiB0aGVyZSBhcmUgcGxhY2Vob2xkZXJzLCBvbmx5IGdldCB1cCB0byB0aGUgbGFzdCBjb21wbGV0ZSA0IGNoYXJzXG5cdFx0bCA9IHBsYWNlSG9sZGVycyA+IDAgPyBiNjQubGVuZ3RoIC0gNCA6IGI2NC5sZW5ndGg7XG5cblx0XHR2YXIgTCA9IDA7XG5cblx0XHRmdW5jdGlvbiBwdXNoKHYpIHtcblx0XHRcdGFycltMKytdID0gdjtcblx0XHR9XG5cblx0XHRmb3IgKGkgPSAwLCBqID0gMDsgaSA8IGw7IGkgKz0gNCwgaiArPSAzKSB7XG5cdFx0XHR0bXAgPSBkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMTggfCBkZWNvZGUoYjY0LmNoYXJBdChpICsgMSkpIDw8IDEyIHwgZGVjb2RlKGI2NC5jaGFyQXQoaSArIDIpKSA8PCA2IHwgZGVjb2RlKGI2NC5jaGFyQXQoaSArIDMpKTtcblx0XHRcdHB1c2goKHRtcCAmIDB4RkYwMDAwKSA+PiAxNik7XG5cdFx0XHRwdXNoKCh0bXAgJiAweEZGMDApID4+IDgpO1xuXHRcdFx0cHVzaCh0bXAgJiAweEZGKTtcblx0XHR9XG5cblx0XHRpZiAocGxhY2VIb2xkZXJzID09PSAyKSB7XG5cdFx0XHR0bXAgPSBkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMiB8IGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPj4gNDtcblx0XHRcdHB1c2godG1wICYgMHhGRik7XG5cdFx0fSBlbHNlIGlmIChwbGFjZUhvbGRlcnMgPT09IDEpIHtcblx0XHRcdHRtcCA9IGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAxMCB8IGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPDwgNCB8IGRlY29kZShiNjQuY2hhckF0KGkgKyAyKSkgPj4gMjtcblx0XHRcdHB1c2godG1wID4+IDggJiAweEZGKTtcblx0XHRcdHB1c2godG1wICYgMHhGRik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFycjtcblx0fVxuXG5cdGZ1bmN0aW9uIHVpbnQ4VG9CYXNlNjQodWludDgpIHtcblx0XHR2YXIgaSxcblx0XHQgICAgZXh0cmFCeXRlcyA9IHVpbnQ4Lmxlbmd0aCAlIDMsXG5cdFx0ICAgIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG5cdFx0b3V0cHV0ID0gXCJcIixcblx0XHQgICAgdGVtcCxcblx0XHQgICAgbGVuZ3RoO1xuXG5cdFx0ZnVuY3Rpb24gZW5jb2RlKG51bSkge1xuXHRcdFx0cmV0dXJuIGxvb2t1cC5jaGFyQXQobnVtKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQobnVtKSB7XG5cdFx0XHRyZXR1cm4gZW5jb2RlKG51bSA+PiAxOCAmIDB4M0YpICsgZW5jb2RlKG51bSA+PiAxMiAmIDB4M0YpICsgZW5jb2RlKG51bSA+PiA2ICYgMHgzRikgKyBlbmNvZGUobnVtICYgMHgzRik7XG5cdFx0fVxuXG5cdFx0Ly8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuXHRcdGZvciAoaSA9IDAsIGxlbmd0aCA9IHVpbnQ4Lmxlbmd0aCAtIGV4dHJhQnl0ZXM7IGkgPCBsZW5ndGg7IGkgKz0gMykge1xuXHRcdFx0dGVtcCA9ICh1aW50OFtpXSA8PCAxNikgKyAodWludDhbaSArIDFdIDw8IDgpICsgdWludDhbaSArIDJdO1xuXHRcdFx0b3V0cHV0ICs9IHRyaXBsZXRUb0Jhc2U2NCh0ZW1wKTtcblx0XHR9XG5cblx0XHQvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG5cdFx0c3dpdGNoIChleHRyYUJ5dGVzKSB7XG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRcdHRlbXAgPSB1aW50OFt1aW50OC5sZW5ndGggLSAxXTtcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wID4+IDIpO1xuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKHRlbXAgPDwgNCAmIDB4M0YpO1xuXHRcdFx0XHRvdXRwdXQgKz0gJz09Jztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDI6XG5cdFx0XHRcdHRlbXAgPSAodWludDhbdWludDgubGVuZ3RoIC0gMl0gPDwgOCkgKyB1aW50OFt1aW50OC5sZW5ndGggLSAxXTtcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wID4+IDEwKTtcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wID4+IDQgJiAweDNGKTtcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wIDw8IDIgJiAweDNGKTtcblx0XHRcdFx0b3V0cHV0ICs9ICc9Jztcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fVxuXG5cdGV4cG9ydHMudG9CeXRlQXJyYXkgPSBiNjRUb0J5dGVBcnJheTtcblx0ZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gdWludDhUb0Jhc2U2NDtcbn0pKHR5cGVvZiBleHBvcnRzID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZC5iYXNlNjRqcyA9IHt9IDogZXhwb3J0cyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbUkyTkM1cWN5SmRMQ0p1WVcxbGN5STZXeUpzYjI5cmRYQWlMQ0psZUhCdmNuUnpJaXdpUVhKeUlpd2lWV2x1ZERoQmNuSmhlU0lzSWtGeWNtRjVJaXdpVUV4VlV5SXNJbU5vWVhKRGIyUmxRWFFpTENKVFRFRlRTQ0lzSWs1VlRVSkZVaUlzSWt4UFYwVlNJaXdpVlZCUVJWSWlMQ0pRVEZWVFgxVlNURjlUUVVaRklpd2lVMHhCVTBoZlZWSk1YMU5CUmtVaUxDSmtaV052WkdVaUxDSmxiSFFpTENKamIyUmxJaXdpWWpZMFZHOUNlWFJsUVhKeVlYa2lMQ0ppTmpRaUxDSnBJaXdpYWlJc0ltd2lMQ0owYlhBaUxDSndiR0ZqWlVodmJHUmxjbk1pTENKaGNuSWlMQ0pzWlc1bmRHZ2lMQ0pGY25KdmNpSXNJbXhsYmlJc0ltTm9ZWEpCZENJc0lrd2lMQ0p3ZFhOb0lpd2lkaUlzSW5WcGJuUTRWRzlDWVhObE5qUWlMQ0oxYVc1ME9DSXNJbVY0ZEhKaFFubDBaWE1pTENKdmRYUndkWFFpTENKMFpXMXdJaXdpWlc1amIyUmxJaXdpYm5WdElpd2lkSEpwY0d4bGRGUnZRbUZ6WlRZMElpd2lkRzlDZVhSbFFYSnlZWGtpTENKbWNtOXRRbmwwWlVGeWNtRjVJaXdpWW1GelpUWTBhbk1pWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCUVVFc1NVRkJTVUVzVTBGQlV5eHJSVUZCWWpzN1FVRkZRU3hEUVVGRkxGZEJRVlZETEU5QlFWWXNSVUZCYlVJN1FVRkRjRUk3TzBGQlJVTXNTMEZCU1VNc1RVRkJUeXhQUVVGUFF5eFZRVUZRTEV0QlFYTkNMRmRCUVhaQ0xFZEJRMDVCTEZWQlJFMHNSMEZGVGtNc1MwRkdTanM3UVVGSlJDeExRVUZKUXl4UFFVRlRMRWxCUVVsRExGVkJRVW9zUTBGQlpTeERRVUZtTEVOQlFXSTdRVUZEUVN4TFFVRkpReXhSUVVGVExFbEJRVWxFTEZWQlFVb3NRMEZCWlN4RFFVRm1MRU5CUVdJN1FVRkRRU3hMUVVGSlJTeFRRVUZUTEVsQlFVbEdMRlZCUVVvc1EwRkJaU3hEUVVGbUxFTkJRV0k3UVVGRFFTeExRVUZKUnl4UlFVRlRMRWxCUVVsSUxGVkJRVW9zUTBGQlpTeERRVUZtTEVOQlFXSTdRVUZEUVN4TFFVRkpTU3hSUVVGVExFbEJRVWxLTEZWQlFVb3NRMEZCWlN4RFFVRm1MRU5CUVdJN1FVRkRRU3hMUVVGSlN5eG5Ra0ZCWjBJc1NVRkJTVXdzVlVGQlNpeERRVUZsTEVOQlFXWXNRMEZCY0VJN1FVRkRRU3hMUVVGSlRTeHBRa0ZCYVVJc1NVRkJTVTRzVlVGQlNpeERRVUZsTEVOQlFXWXNRMEZCY2tJN08wRkJSVUVzVlVGQlUwOHNUVUZCVkN4RFFVRnBRa01zUjBGQmFrSXNSVUZCYzBJN1FVRkRja0lzVFVGQlNVTXNUMEZCVDBRc1NVRkJTVklzVlVGQlNpeERRVUZsTEVOQlFXWXNRMEZCV0R0QlFVTkJMRTFCUVVsVExGTkJRVk5XTEVsQlFWUXNTVUZEUVZVc1UwRkJVMG9zWVVGRVlpeEZRVVZETEU5QlFVOHNSVUZCVUN4RFFVcHZRaXhEUVVsV08wRkJRMWdzVFVGQlNVa3NVMEZCVTFJc1MwRkJWQ3hKUVVOQlVTeFRRVUZUU0N4alFVUmlMRVZCUlVNc1QwRkJUeXhGUVVGUUxFTkJVRzlDTEVOQlQxWTdRVUZEV0N4TlFVRkpSeXhQUVVGUFVDeE5RVUZZTEVWQlEwTXNUMEZCVHl4RFFVRkRMRU5CUVZJc1EwRlViMElzUTBGVFZqdEJRVU5ZTEUxQlFVbFBMRTlCUVU5UUxGTkJRVk1zUlVGQmNFSXNSVUZEUXl4UFFVRlBUeXhQUVVGUFVDeE5RVUZRTEVkQlFXZENMRVZCUVdoQ0xFZEJRWEZDTEVWQlFUVkNPMEZCUTBRc1RVRkJTVThzVDBGQlQwd3NVVUZCVVN4RlFVRnVRaXhGUVVORExFOUJRVTlMTEU5QlFVOU1MRXRCUVdRN1FVRkRSQ3hOUVVGSlN5eFBRVUZQVGl4UlFVRlJMRVZCUVc1Q0xFVkJRME1zVDBGQlQwMHNUMEZCVDA0c1MwRkJVQ3hIUVVGbExFVkJRWFJDTzBGQlEwUTdPMEZCUlVRc1ZVRkJVMDhzWTBGQlZDeERRVUY1UWtNc1IwRkJla0lzUlVGQk9FSTdRVUZETjBJc1RVRkJTVU1zUTBGQlNpeEZRVUZQUXl4RFFVRlFMRVZCUVZWRExFTkJRVllzUlVGQllVTXNSMEZCWWl4RlFVRnJRa01zV1VGQmJFSXNSVUZCWjBORExFZEJRV2hET3p0QlFVVkJMRTFCUVVsT0xFbEJRVWxQTEUxQlFVb3NSMEZCWVN4RFFVRmlMRWRCUVdsQ0xFTkJRWEpDTEVWQlFYZENPMEZCUTNaQ0xGTkJRVTBzU1VGQlNVTXNTMEZCU2l4RFFVRlZMR2RFUVVGV0xFTkJRVTQ3UVVGRFFUczdRVUZGUkR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVFVGQlNVTXNUVUZCVFZRc1NVRkJTVThzVFVGQlpEdEJRVU5CUml4cFFrRkJaU3hSUVVGUlRDeEpRVUZKVlN4TlFVRktMRU5CUVZkRUxFMUJRVTBzUTBGQmFrSXNRMEZCVWl4SFFVRTRRaXhEUVVFNVFpeEhRVUZyUXl4UlFVRlJWQ3hKUVVGSlZTeE5RVUZLTEVOQlFWZEVMRTFCUVUwc1EwRkJha0lzUTBGQlVpeEhRVUU0UWl4RFFVRTVRaXhIUVVGclF5eERRVUZ1UmpzN1FVRkZRVHRCUVVOQlNDeFJRVUZOTEVsQlFVbHlRaXhIUVVGS0xFTkJRVkZsTEVsQlFVbFBMRTFCUVVvc1IwRkJZU3hEUVVGaUxFZEJRV2xDTEVOQlFXcENMRWRCUVhGQ1JpeFpRVUUzUWl4RFFVRk9PenRCUVVWQk8wRkJRMEZHTEUxQlFVbEZMR1ZCUVdVc1EwRkJaaXhIUVVGdFFrd3NTVUZCU1U4c1RVRkJTaXhIUVVGaExFTkJRV2hETEVkQlFXOURVQ3hKUVVGSlR5eE5RVUUxUXpzN1FVRkZRU3hOUVVGSlNTeEpRVUZKTEVOQlFWSTdPMEZCUlVFc1YwRkJVME1zU1VGQlZDeERRVUZsUXl4RFFVRm1MRVZCUVd0Q08wRkJRMnBDVUN4UFFVRkpTeXhIUVVGS0xFbEJRVmRGTEVOQlFWZzdRVUZEUVRzN1FVRkZSQ3hQUVVGTFdpeEpRVUZKTEVOQlFVb3NSVUZCVDBNc1NVRkJTU3hEUVVGb1FpeEZRVUZ0UWtRc1NVRkJTVVVzUTBGQmRrSXNSVUZCTUVKR0xFdEJRVXNzUTBGQlRDeEZRVUZSUXl4TFFVRkxMRU5CUVhaRExFVkJRVEJETzBGQlEzcERSU3hUUVVGUFVpeFBRVUZQU1N4SlFVRkpWU3hOUVVGS0xFTkJRVmRVTEVOQlFWZ3NRMEZCVUN4TFFVRjVRaXhGUVVFeFFpeEhRVUZwUTB3c1QwRkJUMGtzU1VGQlNWVXNUVUZCU2l4RFFVRlhWQ3hKUVVGSkxFTkJRV1lzUTBGQlVDeExRVUUyUWl4RlFVRTVSQ3hIUVVGeFJVd3NUMEZCVDBrc1NVRkJTVlVzVFVGQlNpeERRVUZYVkN4SlFVRkpMRU5CUVdZc1EwRkJVQ3hMUVVFMlFpeERRVUZzUnl4SFFVRjFSMHdzVDBGQlQwa3NTVUZCU1ZVc1RVRkJTaXhEUVVGWFZDeEpRVUZKTEVOQlFXWXNRMEZCVUN4RFFVRTNSenRCUVVOQlZ5eFJRVUZMTEVOQlFVTlNMRTFCUVUwc1VVRkJVQ3hMUVVGdlFpeEZRVUY2UWp0QlFVTkJVU3hSUVVGTExFTkJRVU5TTEUxQlFVMHNUVUZCVUN4TFFVRnJRaXhEUVVGMlFqdEJRVU5CVVN4UlFVRkxVaXhOUVVGTkxFbEJRVmc3UVVGRFFUczdRVUZGUkN4TlFVRkpReXhwUWtGQmFVSXNRMEZCY2tJc1JVRkJkMEk3UVVGRGRrSkVMRk5CUVU5U0xFOUJRVTlKTEVsQlFVbFZMRTFCUVVvc1EwRkJWMVFzUTBGQldDeERRVUZRTEV0QlFYbENMRU5CUVRGQ0xFZEJRV2REVEN4UFFVRlBTU3hKUVVGSlZTeE5RVUZLTEVOQlFWZFVMRWxCUVVrc1EwRkJaaXhEUVVGUUxFdEJRVFpDTEVOQlFXNUZPMEZCUTBGWExGRkJRVXRTTEUxQlFVMHNTVUZCV0R0QlFVTkJMRWRCU0VRc1RVRkhUeXhKUVVGSlF5eHBRa0ZCYVVJc1EwRkJja0lzUlVGQmQwSTdRVUZET1VKRUxGTkJRVTlTTEU5QlFVOUpMRWxCUVVsVkxFMUJRVW9zUTBGQlYxUXNRMEZCV0N4RFFVRlFMRXRCUVhsQ0xFVkJRVEZDTEVkQlFXbERUQ3hQUVVGUFNTeEpRVUZKVlN4TlFVRktMRU5CUVZkVUxFbEJRVWtzUTBGQlppeERRVUZRTEV0QlFUWkNMRU5CUVRsRUxFZEJRVzlGVEN4UFFVRlBTU3hKUVVGSlZTeE5RVUZLTEVOQlFWZFVMRWxCUVVrc1EwRkJaaXhEUVVGUUxFdEJRVFpDTEVOQlFYWkhPMEZCUTBGWExGRkJRVTFTTEU5QlFVOHNRMEZCVWl4SFFVRmhMRWxCUVd4Q08wRkJRMEZSTEZGQlFVdFNMRTFCUVUwc1NVRkJXRHRCUVVOQk96dEJRVVZFTEZOQlFVOUZMRWRCUVZBN1FVRkRRVHM3UVVGRlJDeFZRVUZUVVN4aFFVRlVMRU5CUVhkQ1F5eExRVUY0UWl4RlFVRXJRanRCUVVNNVFpeE5RVUZKWkN4RFFVRktPMEZCUVVFc1RVRkRRMlVzWVVGQllVUXNUVUZCVFZJc1RVRkJUaXhIUVVGbExFTkJSRGRDTzBGQlFVRXNUVUZEWjBNN1FVRkRMMEpWTEZkQlFWTXNSVUZHVmp0QlFVRkJMRTFCUjBORExFbEJTRVE3UVVGQlFTeE5RVWRQV0N4TlFVaFFPenRCUVV0QkxGZEJRVk5aTEUxQlFWUXNRMEZCYVVKRExFZEJRV3BDTEVWQlFYTkNPMEZCUTNKQ0xGVkJRVTl5UXl4UFFVRlBNa0lzVFVGQlVDeERRVUZqVlN4SFFVRmtMRU5CUVZBN1FVRkRRVHM3UVVGRlJDeFhRVUZUUXl4bFFVRlVMRU5CUVRCQ1JDeEhRVUV4UWl4RlFVRXJRanRCUVVNNVFpeFZRVUZQUkN4UFFVRlBReXhQUVVGUExFVkJRVkFzUjBGQldTeEpRVUZ1UWl4SlFVRXlRa1FzVDBGQlQwTXNUMEZCVHl4RlFVRlFMRWRCUVZrc1NVRkJia0lzUTBGQk0wSXNSMEZCYzBSRUxFOUJRVTlETEU5QlFVOHNRMEZCVUN4SFFVRlhMRWxCUVd4Q0xFTkJRWFJFTEVkQlFXZEdSQ3hQUVVGUFF5eE5RVUZOTEVsQlFXSXNRMEZCZGtZN1FVRkRRVHM3UVVGRlJEdEJRVU5CTEU5QlFVdHVRaXhKUVVGSkxFTkJRVW9zUlVGQlQwMHNVMEZCVTFFc1RVRkJUVklzVFVGQlRpeEhRVUZsVXl4VlFVRndReXhGUVVGblJHWXNTVUZCU1Uwc1RVRkJjRVFzUlVGQk5FUk9MRXRCUVVzc1EwRkJha1VzUlVGQmIwVTdRVUZEYmtWcFFpeFZRVUZQTEVOQlFVTklMRTFCUVUxa0xFTkJRVTRzUzBGQldTeEZRVUZpTEV0QlFXOUNZeXhOUVVGTlpDeEpRVUZKTEVOQlFWWXNTMEZCWjBJc1EwRkJjRU1zU1VGQk1FTmpMRTFCUVUxa0xFbEJRVWtzUTBGQlZpeERRVUZxUkR0QlFVTkJaMElzWVVGQlZVa3NaMEpCUVdkQ1NDeEpRVUZvUWl4RFFVRldPMEZCUTBFN08wRkJSVVE3UVVGRFFTeFZRVUZSUml4VlFVRlNPMEZCUTBNc1VVRkJTeXhEUVVGTU8wRkJRME5GTEZkQlFVOUlMRTFCUVUxQkxFMUJRVTFTTEUxQlFVNHNSMEZCWlN4RFFVRnlRaXhEUVVGUU8wRkJRMEZWTEdOQlFWVkZMRTlCUVU5RUxGRkJRVkVzUTBGQlppeERRVUZXTzBGQlEwRkVMR05CUVZWRkxFOUJRVkZFTEZGQlFWRXNRMEZCVkN4SFFVRmpMRWxCUVhKQ0xFTkJRVlk3UVVGRFFVUXNZMEZCVlN4SlFVRldPMEZCUTBFN1FVRkRSQ3hSUVVGTExFTkJRVXc3UVVGRFEwTXNWMEZCVHl4RFFVRkRTQ3hOUVVGTlFTeE5RVUZOVWl4TlFVRk9MRWRCUVdVc1EwRkJja0lzUzBGQk1rSXNRMEZCTlVJc1NVRkJhME5STEUxQlFVMUJMRTFCUVUxU0xFMUJRVTRzUjBGQlpTeERRVUZ5UWl4RFFVRjZRenRCUVVOQlZTeGpRVUZWUlN4UFFVRlBSQ3hSUVVGUkxFVkJRV1lzUTBGQlZqdEJRVU5CUkN4alFVRlZSU3hQUVVGUlJDeFJRVUZSTEVOQlFWUXNSMEZCWXl4SlFVRnlRaXhEUVVGV08wRkJRMEZFTEdOQlFWVkZMRTlCUVZGRUxGRkJRVkVzUTBGQlZDeEhRVUZqTEVsQlFYSkNMRU5CUVZZN1FVRkRRVVFzWTBGQlZTeEhRVUZXTzBGQlEwRTdRVUZpUmpzN1FVRm5Ra0VzVTBGQlQwRXNUVUZCVUR0QlFVTkJPenRCUVVWRWFrTXNVMEZCVVhORExGZEJRVklzUjBGQmMwSjJRaXhqUVVGMFFqdEJRVU5CWml4VFFVRlJkVU1zWVVGQlVpeEhRVUYzUWxRc1lVRkJlRUk3UVVGRFFTeERRWHBJUXl4RlFYbElRU3hQUVVGUE9VSXNUMEZCVUN4TFFVRnRRaXhYUVVGdVFpeEhRVUZyUXl4VlFVRkxkME1zVVVGQlRDeEhRVUZuUWl4RlFVRnNSQ3hIUVVGM1JIaERMRTlCZWtoNFJDeERRVUZFSWl3aVptbHNaU0k2SW1JMk5DNXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSW5aaGNpQnNiMjlyZFhBZ1BTQW5RVUpEUkVWR1IwaEpTa3RNVFU1UFVGRlNVMVJWVmxkWVdWcGhZbU5rWldabmFHbHFhMnh0Ym05d2NYSnpkSFYyZDNoNWVqQXhNak0wTlRZM09Ea3JMeWM3WEc1Y2Jqc29ablZ1WTNScGIyNGdLR1Y0Y0c5eWRITXBJSHRjYmx4MEozVnpaU0J6ZEhKcFkzUW5PMXh1WEc0Z0lIWmhjaUJCY25JZ1BTQW9kSGx3Wlc5bUlGVnBiblE0UVhKeVlYa2dJVDA5SUNkMWJtUmxabWx1WldRbktWeHVJQ0FnSUQ4Z1ZXbHVkRGhCY25KaGVWeHVJQ0FnSURvZ1FYSnlZWGxjYmx4dVhIUjJZWElnVUV4VlV5QWdJRDBnSnlzbkxtTm9ZWEpEYjJSbFFYUW9NQ2xjYmx4MGRtRnlJRk5NUVZOSUlDQTlJQ2N2Snk1amFHRnlRMjlrWlVGMEtEQXBYRzVjZEhaaGNpQk9WVTFDUlZJZ1BTQW5NQ2N1WTJoaGNrTnZaR1ZCZENnd0tWeHVYSFIyWVhJZ1RFOVhSVklnSUQwZ0oyRW5MbU5vWVhKRGIyUmxRWFFvTUNsY2JseDBkbUZ5SUZWUVVFVlNJQ0E5SUNkQkp5NWphR0Z5UTI5a1pVRjBLREFwWEc1Y2RIWmhjaUJRVEZWVFgxVlNURjlUUVVaRklEMGdKeTBuTG1Ob1lYSkRiMlJsUVhRb01DbGNibHgwZG1GeUlGTk1RVk5JWDFWU1RGOVRRVVpGSUQwZ0oxOG5MbU5vWVhKRGIyUmxRWFFvTUNsY2JseHVYSFJtZFc1amRHbHZiaUJrWldOdlpHVWdLR1ZzZENrZ2UxeHVYSFJjZEhaaGNpQmpiMlJsSUQwZ1pXeDBMbU5vWVhKRGIyUmxRWFFvTUNsY2JseDBYSFJwWmlBb1kyOWtaU0E5UFQwZ1VFeFZVeUI4ZkZ4dVhIUmNkQ0FnSUNCamIyUmxJRDA5UFNCUVRGVlRYMVZTVEY5VFFVWkZLVnh1WEhSY2RGeDBjbVYwZFhKdUlEWXlJQzh2SUNjckoxeHVYSFJjZEdsbUlDaGpiMlJsSUQwOVBTQlRURUZUU0NCOGZGeHVYSFJjZENBZ0lDQmpiMlJsSUQwOVBTQlRURUZUU0Y5VlVreGZVMEZHUlNsY2JseDBYSFJjZEhKbGRIVnliaUEyTXlBdkx5QW5MeWRjYmx4MFhIUnBaaUFvWTI5a1pTQThJRTVWVFVKRlVpbGNibHgwWEhSY2RISmxkSFZ5YmlBdE1TQXZMMjV2SUcxaGRHTm9YRzVjZEZ4MGFXWWdLR052WkdVZ1BDQk9WVTFDUlZJZ0t5QXhNQ2xjYmx4MFhIUmNkSEpsZEhWeWJpQmpiMlJsSUMwZ1RsVk5Ra1ZTSUNzZ01qWWdLeUF5Tmx4dVhIUmNkR2xtSUNoamIyUmxJRHdnVlZCUVJWSWdLeUF5TmlsY2JseDBYSFJjZEhKbGRIVnliaUJqYjJSbElDMGdWVkJRUlZKY2JseDBYSFJwWmlBb1kyOWtaU0E4SUV4UFYwVlNJQ3NnTWpZcFhHNWNkRngwWEhSeVpYUjFjbTRnWTI5a1pTQXRJRXhQVjBWU0lDc2dNalpjYmx4MGZWeHVYRzVjZEdaMWJtTjBhVzl1SUdJMk5GUnZRbmwwWlVGeWNtRjVJQ2hpTmpRcElIdGNibHgwWEhSMllYSWdhU3dnYWl3Z2JDd2dkRzF3TENCd2JHRmpaVWh2YkdSbGNuTXNJR0Z5Y2x4dVhHNWNkRngwYVdZZ0tHSTJOQzVzWlc1bmRHZ2dKU0EwSUQ0Z01Da2dlMXh1WEhSY2RGeDBkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZEpiblpoYkdsa0lITjBjbWx1Wnk0Z1RHVnVaM1JvSUcxMWMzUWdZbVVnWVNCdGRXeDBhWEJzWlNCdlppQTBKeWxjYmx4MFhIUjlYRzVjYmx4MFhIUXZMeUIwYUdVZ2JuVnRZbVZ5SUc5bUlHVnhkV0ZzSUhOcFoyNXpJQ2h3YkdGalpTQm9iMnhrWlhKektWeHVYSFJjZEM4dklHbG1JSFJvWlhKbElHRnlaU0IwZDI4Z2NHeGhZMlZvYjJ4a1pYSnpMQ0IwYUdGdUlIUm9aU0IwZDI4Z1kyaGhjbUZqZEdWeWN5QmlaV1p2Y21VZ2FYUmNibHgwWEhRdkx5QnlaWEJ5WlhObGJuUWdiMjVsSUdKNWRHVmNibHgwWEhRdkx5QnBaaUIwYUdWeVpTQnBjeUJ2Ym14NUlHOXVaU3dnZEdobGJpQjBhR1VnZEdoeVpXVWdZMmhoY21GamRHVnljeUJpWldadmNtVWdhWFFnY21Wd2NtVnpaVzUwSURJZ1lubDBaWE5jYmx4MFhIUXZMeUIwYUdseklHbHpJR3AxYzNRZ1lTQmphR1ZoY0NCb1lXTnJJSFJ2SUc1dmRDQmtieUJwYm1SbGVFOW1JSFIzYVdObFhHNWNkRngwZG1GeUlHeGxiaUE5SUdJMk5DNXNaVzVuZEdoY2JseDBYSFJ3YkdGalpVaHZiR1JsY25NZ1BTQW5QU2NnUFQwOUlHSTJOQzVqYUdGeVFYUW9iR1Z1SUMwZ01pa2dQeUF5SURvZ0p6MG5JRDA5UFNCaU5qUXVZMmhoY2tGMEtHeGxiaUF0SURFcElEOGdNU0E2SURCY2JseHVYSFJjZEM4dklHSmhjMlUyTkNCcGN5QTBMek1nS3lCMWNDQjBieUIwZDI4Z1kyaGhjbUZqZEdWeWN5QnZaaUIwYUdVZ2IzSnBaMmx1WVd3Z1pHRjBZVnh1WEhSY2RHRnljaUE5SUc1bGR5QkJjbklvWWpZMExteGxibWQwYUNBcUlETWdMeUEwSUMwZ2NHeGhZMlZJYjJ4a1pYSnpLVnh1WEc1Y2RGeDBMeThnYVdZZ2RHaGxjbVVnWVhKbElIQnNZV05sYUc5c1pHVnljeXdnYjI1c2VTQm5aWFFnZFhBZ2RHOGdkR2hsSUd4aGMzUWdZMjl0Y0d4bGRHVWdOQ0JqYUdGeWMxeHVYSFJjZEd3Z1BTQndiR0ZqWlVodmJHUmxjbk1nUGlBd0lEOGdZalkwTG14bGJtZDBhQ0F0SURRZ09pQmlOalF1YkdWdVozUm9YRzVjYmx4MFhIUjJZWElnVENBOUlEQmNibHh1WEhSY2RHWjFibU4wYVc5dUlIQjFjMmdnS0hZcElIdGNibHgwWEhSY2RHRnljbHRNS3l0ZElEMGdkbHh1WEhSY2RIMWNibHh1WEhSY2RHWnZjaUFvYVNBOUlEQXNJR29nUFNBd095QnBJRHdnYkRzZ2FTQXJQU0EwTENCcUlDczlJRE1wSUh0Y2JseDBYSFJjZEhSdGNDQTlJQ2hrWldOdlpHVW9ZalkwTG1Ob1lYSkJkQ2hwS1NrZ1BEd2dNVGdwSUh3Z0tHUmxZMjlrWlNoaU5qUXVZMmhoY2tGMEtHa2dLeUF4S1NrZ1BEd2dNVElwSUh3Z0tHUmxZMjlrWlNoaU5qUXVZMmhoY2tGMEtHa2dLeUF5S1NrZ1BEd2dOaWtnZkNCa1pXTnZaR1VvWWpZMExtTm9ZWEpCZENocElDc2dNeWtwWEc1Y2RGeDBYSFJ3ZFhOb0tDaDBiWEFnSmlBd2VFWkdNREF3TUNrZ1BqNGdNVFlwWEc1Y2RGeDBYSFJ3ZFhOb0tDaDBiWEFnSmlBd2VFWkdNREFwSUQ0K0lEZ3BYRzVjZEZ4MFhIUndkWE5vS0hSdGNDQW1JREI0UmtZcFhHNWNkRngwZlZ4dVhHNWNkRngwYVdZZ0tIQnNZV05sU0c5c1pHVnljeUE5UFQwZ01pa2dlMXh1WEhSY2RGeDBkRzF3SUQwZ0tHUmxZMjlrWlNoaU5qUXVZMmhoY2tGMEtHa3BLU0E4UENBeUtTQjhJQ2hrWldOdlpHVW9ZalkwTG1Ob1lYSkJkQ2hwSUNzZ01Ta3BJRDQrSURRcFhHNWNkRngwWEhSd2RYTm9LSFJ0Y0NBbUlEQjRSa1lwWEc1Y2RGeDBmU0JsYkhObElHbG1JQ2h3YkdGalpVaHZiR1JsY25NZ1BUMDlJREVwSUh0Y2JseDBYSFJjZEhSdGNDQTlJQ2hrWldOdlpHVW9ZalkwTG1Ob1lYSkJkQ2hwS1NrZ1BEd2dNVEFwSUh3Z0tHUmxZMjlrWlNoaU5qUXVZMmhoY2tGMEtHa2dLeUF4S1NrZ1BEd2dOQ2tnZkNBb1pHVmpiMlJsS0dJMk5DNWphR0Z5UVhRb2FTQXJJRElwS1NBK1BpQXlLVnh1WEhSY2RGeDBjSFZ6YUNnb2RHMXdJRDQrSURncElDWWdNSGhHUmlsY2JseDBYSFJjZEhCMWMyZ29kRzF3SUNZZ01IaEdSaWxjYmx4MFhIUjlYRzVjYmx4MFhIUnlaWFIxY200Z1lYSnlYRzVjZEgxY2JseHVYSFJtZFc1amRHbHZiaUIxYVc1ME9GUnZRbUZ6WlRZMElDaDFhVzUwT0NrZ2UxeHVYSFJjZEhaaGNpQnBMRnh1WEhSY2RGeDBaWGgwY21GQ2VYUmxjeUE5SUhWcGJuUTRMbXhsYm1kMGFDQWxJRE1zSUM4dklHbG1JSGRsSUdoaGRtVWdNU0JpZVhSbElHeGxablFzSUhCaFpDQXlJR0o1ZEdWelhHNWNkRngwWEhSdmRYUndkWFFnUFNCY0lsd2lMRnh1WEhSY2RGeDBkR1Z0Y0N3Z2JHVnVaM1JvWEc1Y2JseDBYSFJtZFc1amRHbHZiaUJsYm1OdlpHVWdLRzUxYlNrZ2UxeHVYSFJjZEZ4MGNtVjBkWEp1SUd4dmIydDFjQzVqYUdGeVFYUW9iblZ0S1Z4dVhIUmNkSDFjYmx4dVhIUmNkR1oxYm1OMGFXOXVJSFJ5YVhCc1pYUlViMEpoYzJVMk5DQW9iblZ0S1NCN1hHNWNkRngwWEhSeVpYUjFjbTRnWlc1amIyUmxLRzUxYlNBK1BpQXhPQ0FtSURCNE0wWXBJQ3NnWlc1amIyUmxLRzUxYlNBK1BpQXhNaUFtSURCNE0wWXBJQ3NnWlc1amIyUmxLRzUxYlNBK1BpQTJJQ1lnTUhnelJpa2dLeUJsYm1OdlpHVW9iblZ0SUNZZ01IZ3pSaWxjYmx4MFhIUjlYRzVjYmx4MFhIUXZMeUJuYnlCMGFISnZkV2RvSUhSb1pTQmhjbkpoZVNCbGRtVnllU0IwYUhKbFpTQmllWFJsY3l3Z2QyVW5iR3dnWkdWaGJDQjNhWFJvSUhSeVlXbHNhVzVuSUhOMGRXWm1JR3hoZEdWeVhHNWNkRngwWm05eUlDaHBJRDBnTUN3Z2JHVnVaM1JvSUQwZ2RXbHVkRGd1YkdWdVozUm9JQzBnWlhoMGNtRkNlWFJsY3pzZ2FTQThJR3hsYm1kMGFEc2dhU0FyUFNBektTQjdYRzVjZEZ4MFhIUjBaVzF3SUQwZ0tIVnBiblE0VzJsZElEdzhJREUyS1NBcklDaDFhVzUwT0Z0cElDc2dNVjBnUER3Z09Da2dLeUFvZFdsdWREaGJhU0FySURKZEtWeHVYSFJjZEZ4MGIzVjBjSFYwSUNzOUlIUnlhWEJzWlhSVWIwSmhjMlUyTkNoMFpXMXdLVnh1WEhSY2RIMWNibHh1WEhSY2RDOHZJSEJoWkNCMGFHVWdaVzVrSUhkcGRHZ2dlbVZ5YjNNc0lHSjFkQ0J0WVd0bElITjFjbVVnZEc4Z2JtOTBJR1p2Y21kbGRDQjBhR1VnWlhoMGNtRWdZbmwwWlhOY2JseDBYSFJ6ZDJsMFkyZ2dLR1Y0ZEhKaFFubDBaWE1wSUh0Y2JseDBYSFJjZEdOaGMyVWdNVHBjYmx4MFhIUmNkRngwZEdWdGNDQTlJSFZwYm5RNFczVnBiblE0TG14bGJtZDBhQ0F0SURGZFhHNWNkRngwWEhSY2RHOTFkSEIxZENBclBTQmxibU52WkdVb2RHVnRjQ0ErUGlBeUtWeHVYSFJjZEZ4MFhIUnZkWFJ3ZFhRZ0t6MGdaVzVqYjJSbEtDaDBaVzF3SUR3OElEUXBJQ1lnTUhnelJpbGNibHgwWEhSY2RGeDBiM1YwY0hWMElDczlJQ2M5UFNkY2JseDBYSFJjZEZ4MFluSmxZV3RjYmx4MFhIUmNkR05oYzJVZ01qcGNibHgwWEhSY2RGeDBkR1Z0Y0NBOUlDaDFhVzUwT0Z0MWFXNTBPQzVzWlc1bmRHZ2dMU0F5WFNBOFBDQTRLU0FySUNoMWFXNTBPRnQxYVc1ME9DNXNaVzVuZEdnZ0xTQXhYU2xjYmx4MFhIUmNkRngwYjNWMGNIVjBJQ3M5SUdWdVkyOWtaU2gwWlcxd0lENCtJREV3S1Z4dVhIUmNkRngwWEhSdmRYUndkWFFnS3owZ1pXNWpiMlJsS0NoMFpXMXdJRDQrSURRcElDWWdNSGd6UmlsY2JseDBYSFJjZEZ4MGIzVjBjSFYwSUNzOUlHVnVZMjlrWlNnb2RHVnRjQ0E4UENBeUtTQW1JREI0TTBZcFhHNWNkRngwWEhSY2RHOTFkSEIxZENBclBTQW5QU2RjYmx4MFhIUmNkRngwWW5KbFlXdGNibHgwWEhSOVhHNWNibHgwWEhSeVpYUjFjbTRnYjNWMGNIVjBYRzVjZEgxY2JseHVYSFJsZUhCdmNuUnpMblJ2UW5sMFpVRnljbUY1SUQwZ1lqWTBWRzlDZVhSbFFYSnlZWGxjYmx4MFpYaHdiM0owY3k1bWNtOXRRbmwwWlVGeWNtRjVJRDBnZFdsdWREaFViMEpoYzJVMk5GeHVmU2gwZVhCbGIyWWdaWGh3YjNKMGN5QTlQVDBnSjNWdVpHVm1hVzVsWkNjZ1B5QW9kR2hwY3k1aVlYTmxOalJxY3lBOUlIdDlLU0E2SUdWNGNHOXlkSE1wS1Z4dUlsMTlcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXGJhc2U2NC1qc1xcXFxsaWJcXFxcYjY0LmpzXCIsXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXGJhc2U2NC1qc1xcXFxsaWJcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuXG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJyk7XG52YXIgaWVlZTc1NCA9IHJlcXVpcmUoJ2llZWU3NTQnKTtcblxuZXhwb3J0cy5CdWZmZXIgPSBCdWZmZXI7XG5leHBvcnRzLlNsb3dCdWZmZXIgPSBCdWZmZXI7XG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTA7XG5CdWZmZXIucG9vbFNpemUgPSA4MTkyO1xuXG4vKipcbiAqIElmIGBCdWZmZXIuX3VzZVR5cGVkQXJyYXlzYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFVzZSBPYmplY3QgaW1wbGVtZW50YXRpb24gKGNvbXBhdGlibGUgZG93biB0byBJRTYpXG4gKi9cbkJ1ZmZlci5fdXNlVHlwZWRBcnJheXMgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIERldGVjdCBpZiBicm93c2VyIHN1cHBvcnRzIFR5cGVkIEFycmF5cy4gU3VwcG9ydGVkIGJyb3dzZXJzIGFyZSBJRSAxMCssIEZpcmVmb3ggNCssXG4gIC8vIENocm9tZSA3KywgU2FmYXJpIDUuMSssIE9wZXJhIDExLjYrLCBpT1MgNC4yKy4gSWYgdGhlIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBhZGRpbmdcbiAgLy8gcHJvcGVydGllcyB0byBgVWludDhBcnJheWAgaW5zdGFuY2VzLCB0aGVuIHRoYXQncyB0aGUgc2FtZSBhcyBubyBgVWludDhBcnJheWAgc3VwcG9ydFxuICAvLyBiZWNhdXNlIHdlIG5lZWQgdG8gYmUgYWJsZSB0byBhZGQgYWxsIHRoZSBub2RlIEJ1ZmZlciBBUEkgbWV0aG9kcy4gVGhpcyBpcyBhbiBpc3N1ZVxuICAvLyBpbiBGaXJlZm94IDQtMjkuIE5vdyBmaXhlZDogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4XG4gIHRyeSB7XG4gICAgdmFyIGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcigwKTtcbiAgICB2YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoYnVmKTtcbiAgICBhcnIuZm9vID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIDQyO1xuICAgIH07XG4gICAgcmV0dXJuIDQyID09PSBhcnIuZm9vKCkgJiYgdHlwZW9mIGFyci5zdWJhcnJheSA9PT0gJ2Z1bmN0aW9uJzsgLy8gQ2hyb21lIDktMTAgbGFjayBgc3ViYXJyYXlgXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0oKTtcblxuLyoqXG4gKiBDbGFzczogQnVmZmVyXG4gKiA9PT09PT09PT09PT09XG4gKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBhcmUgYXVnbWVudGVkXG4gKiB3aXRoIGZ1bmN0aW9uIHByb3BlcnRpZXMgZm9yIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBBUEkgZnVuY3Rpb25zLiBXZSB1c2VcbiAqIGBVaW50OEFycmF5YCBzbyB0aGF0IHNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0IHJldHVybnNcbiAqIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIEJ5IGF1Z21lbnRpbmcgdGhlIGluc3RhbmNlcywgd2UgY2FuIGF2b2lkIG1vZGlmeWluZyB0aGUgYFVpbnQ4QXJyYXlgXG4gKiBwcm90b3R5cGUuXG4gKi9cbmZ1bmN0aW9uIEJ1ZmZlcihzdWJqZWN0LCBlbmNvZGluZywgbm9aZXJvKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBCdWZmZXIpKSByZXR1cm4gbmV3IEJ1ZmZlcihzdWJqZWN0LCBlbmNvZGluZywgbm9aZXJvKTtcblxuICB2YXIgdHlwZSA9IHR5cGVvZiBzdWJqZWN0ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihzdWJqZWN0KTtcblxuICAvLyBXb3JrYXJvdW5kOiBub2RlJ3MgYmFzZTY0IGltcGxlbWVudGF0aW9uIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBzdHJpbmdzXG4gIC8vIHdoaWxlIGJhc2U2NC1qcyBkb2VzIG5vdC5cbiAgaWYgKGVuY29kaW5nID09PSAnYmFzZTY0JyAmJiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgIHN1YmplY3QgPSBzdHJpbmd0cmltKHN1YmplY3QpO1xuICAgIHdoaWxlIChzdWJqZWN0Lmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICAgIHN1YmplY3QgPSBzdWJqZWN0ICsgJz0nO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZpbmQgdGhlIGxlbmd0aFxuICB2YXIgbGVuZ3RoO1xuICBpZiAodHlwZSA9PT0gJ251bWJlcicpIGxlbmd0aCA9IGNvZXJjZShzdWJqZWN0KTtlbHNlIGlmICh0eXBlID09PSAnc3RyaW5nJykgbGVuZ3RoID0gQnVmZmVyLmJ5dGVMZW5ndGgoc3ViamVjdCwgZW5jb2RpbmcpO2Vsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSBsZW5ndGggPSBjb2VyY2Uoc3ViamVjdC5sZW5ndGgpOyAvLyBhc3N1bWUgdGhhdCBvYmplY3QgaXMgYXJyYXktbGlrZVxuICBlbHNlIHRocm93IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgbmVlZHMgdG8gYmUgYSBudW1iZXIsIGFycmF5IG9yIHN0cmluZy4nKTtcblxuICB2YXIgYnVmO1xuICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgIC8vIFByZWZlcnJlZDogUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICBidWYgPSBCdWZmZXIuX2F1Z21lbnQobmV3IFVpbnQ4QXJyYXkobGVuZ3RoKSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBUSElTIGluc3RhbmNlIG9mIEJ1ZmZlciAoY3JlYXRlZCBieSBgbmV3YClcbiAgICBidWYgPSB0aGlzO1xuICAgIGJ1Zi5sZW5ndGggPSBsZW5ndGg7XG4gICAgYnVmLl9pc0J1ZmZlciA9IHRydWU7XG4gIH1cblxuICB2YXIgaTtcbiAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMgJiYgdHlwZW9mIHN1YmplY3QuYnl0ZUxlbmd0aCA9PT0gJ251bWJlcicpIHtcbiAgICAvLyBTcGVlZCBvcHRpbWl6YXRpb24gLS0gdXNlIHNldCBpZiB3ZSdyZSBjb3B5aW5nIGZyb20gYSB0eXBlZCBhcnJheVxuICAgIGJ1Zi5fc2V0KHN1YmplY3QpO1xuICB9IGVsc2UgaWYgKGlzQXJyYXlpc2goc3ViamVjdCkpIHtcbiAgICAvLyBUcmVhdCBhcnJheS1pc2ggb2JqZWN0cyBhcyBhIGJ5dGUgYXJyYXlcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoc3ViamVjdCkpIGJ1ZltpXSA9IHN1YmplY3QucmVhZFVJbnQ4KGkpO2Vsc2UgYnVmW2ldID0gc3ViamVjdFtpXTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICBidWYud3JpdGUoc3ViamVjdCwgMCwgZW5jb2RpbmcpO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInICYmICFCdWZmZXIuX3VzZVR5cGVkQXJyYXlzICYmICFub1plcm8pIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGJ1ZltpXSA9IDA7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1Zjtcbn1cblxuLy8gU1RBVElDIE1FVEhPRFNcbi8vID09PT09PT09PT09PT09XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICBjYXNlICdyYXcnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5CdWZmZXIuaXNCdWZmZXIgPSBmdW5jdGlvbiAoYikge1xuICByZXR1cm4gISEoYiAhPT0gbnVsbCAmJiBiICE9PSB1bmRlZmluZWQgJiYgYi5faXNCdWZmZXIpO1xufTtcblxuQnVmZmVyLmJ5dGVMZW5ndGggPSBmdW5jdGlvbiAoc3RyLCBlbmNvZGluZykge1xuICB2YXIgcmV0O1xuICBzdHIgPSBzdHIgKyAnJztcbiAgc3dpdGNoIChlbmNvZGluZyB8fCAndXRmOCcpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aCAvIDI7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSB1dGY4VG9CeXRlcyhzdHIpLmxlbmd0aDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ3Jhdyc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IGJhc2U2NFRvQnl0ZXMoc3RyKS5sZW5ndGg7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aCAqIDI7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nJyk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiAobGlzdCwgdG90YWxMZW5ndGgpIHtcbiAgYXNzZXJ0KGlzQXJyYXkobGlzdCksICdVc2FnZTogQnVmZmVyLmNvbmNhdChsaXN0LCBbdG90YWxMZW5ndGhdKVxcbicgKyAnbGlzdCBzaG91bGQgYmUgYW4gQXJyYXkuJyk7XG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoMCk7XG4gIH0gZWxzZSBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gbGlzdFswXTtcbiAgfVxuXG4gIHZhciBpO1xuICBpZiAodHlwZW9mIHRvdGFsTGVuZ3RoICE9PSAnbnVtYmVyJykge1xuICAgIHRvdGFsTGVuZ3RoID0gMDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgdG90YWxMZW5ndGggKz0gbGlzdFtpXS5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgdmFyIGJ1ZiA9IG5ldyBCdWZmZXIodG90YWxMZW5ndGgpO1xuICB2YXIgcG9zID0gMDtcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgaXRlbS5jb3B5KGJ1ZiwgcG9zKTtcbiAgICBwb3MgKz0gaXRlbS5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIGJ1Zjtcbn07XG5cbi8vIEJVRkZFUiBJTlNUQU5DRSBNRVRIT0RTXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBfaGV4V3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDA7XG4gIHZhciByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0O1xuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZztcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKTtcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmc7XG4gICAgfVxuICB9XG5cbiAgLy8gbXVzdCBiZSBhbiBldmVuIG51bWJlciBvZiBkaWdpdHNcbiAgdmFyIHN0ckxlbiA9IHN0cmluZy5sZW5ndGg7XG4gIGFzc2VydChzdHJMZW4gJSAyID09PSAwLCAnSW52YWxpZCBoZXggc3RyaW5nJyk7XG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyO1xuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYnl0ZSA9IHBhcnNlSW50KHN0cmluZy5zdWJzdHIoaSAqIDIsIDIpLCAxNik7XG4gICAgYXNzZXJ0KCFpc05hTihieXRlKSwgJ0ludmFsaWQgaGV4IHN0cmluZycpO1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IGJ5dGU7XG4gIH1cbiAgQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPSBpICogMjtcbiAgcmV0dXJuIGk7XG59XG5cbmZ1bmN0aW9uIF91dGY4V3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9IGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aCk7XG4gIHJldHVybiBjaGFyc1dyaXR0ZW47XG59XG5cbmZ1bmN0aW9uIF9hc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPSBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKTtcbiAgcmV0dXJuIGNoYXJzV3JpdHRlbjtcbn1cblxuZnVuY3Rpb24gX2JpbmFyeVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gX2FzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKTtcbn1cblxuZnVuY3Rpb24gX2Jhc2U2NFdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPSBibGl0QnVmZmVyKGJhc2U2NFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aCk7XG4gIHJldHVybiBjaGFyc1dyaXR0ZW47XG59XG5cbmZ1bmN0aW9uIF91dGYxNmxlV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9IGJsaXRCdWZmZXIodXRmMTZsZVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aCk7XG4gIHJldHVybiBjaGFyc1dyaXR0ZW47XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gU3VwcG9ydCBib3RoIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZylcbiAgLy8gYW5kIHRoZSBsZWdhY3kgKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIGlmICghaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGg7XG4gICAgICBsZW5ndGggPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIGxlZ2FjeVxuICAgIHZhciBzd2FwID0gZW5jb2Rpbmc7XG4gICAgZW5jb2RpbmcgPSBvZmZzZXQ7XG4gICAgb2Zmc2V0ID0gbGVuZ3RoO1xuICAgIGxlbmd0aCA9IHN3YXA7XG4gIH1cblxuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwO1xuICB2YXIgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXQ7XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nO1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpO1xuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZztcbiAgICB9XG4gIH1cbiAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcgfHwgJ3V0ZjgnKS50b0xvd2VyQ2FzZSgpO1xuXG4gIHZhciByZXQ7XG4gIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gX2hleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgICAgcmV0ID0gX3V0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIHJldCA9IF9hc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgIHJldCA9IF9iaW5hcnlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICByZXQgPSBfYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gX3V0ZjE2bGVXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2RpbmcnKTtcbiAgfVxuICByZXR1cm4gcmV0O1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChlbmNvZGluZywgc3RhcnQsIGVuZCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcgfHwgJ3V0ZjgnKS50b0xvd2VyQ2FzZSgpO1xuICBzdGFydCA9IE51bWJlcihzdGFydCkgfHwgMDtcbiAgZW5kID0gZW5kICE9PSB1bmRlZmluZWQgPyBOdW1iZXIoZW5kKSA6IGVuZCA9IHNlbGYubGVuZ3RoO1xuXG4gIC8vIEZhc3RwYXRoIGVtcHR5IHN0cmluZ3NcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybiAnJztcblxuICB2YXIgcmV0O1xuICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICAgIHJldCA9IF9oZXhTbGljZShzZWxmLCBzdGFydCwgZW5kKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIHJldCA9IF91dGY4U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgICByZXQgPSBfYXNjaWlTbGljZShzZWxmLCBzdGFydCwgZW5kKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICByZXQgPSBfYmluYXJ5U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgcmV0ID0gX2Jhc2U2NFNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldCA9IF91dGYxNmxlU2xpY2Uoc2VsZiwgc3RhcnQsIGVuZCk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nJyk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9O1xufTtcblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gKHRhcmdldCwgdGFyZ2V0X3N0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIHZhciBzb3VyY2UgPSB0aGlzO1xuXG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMDtcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aDtcbiAgaWYgKCF0YXJnZXRfc3RhcnQpIHRhcmdldF9zdGFydCA9IDA7XG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm47XG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHNvdXJjZS5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGFzc2VydChlbmQgPj0gc3RhcnQsICdzb3VyY2VFbmQgPCBzb3VyY2VTdGFydCcpO1xuICBhc3NlcnQodGFyZ2V0X3N0YXJ0ID49IDAgJiYgdGFyZ2V0X3N0YXJ0IDwgdGFyZ2V0Lmxlbmd0aCwgJ3RhcmdldFN0YXJ0IG91dCBvZiBib3VuZHMnKTtcbiAgYXNzZXJ0KHN0YXJ0ID49IDAgJiYgc3RhcnQgPCBzb3VyY2UubGVuZ3RoLCAnc291cmNlU3RhcnQgb3V0IG9mIGJvdW5kcycpO1xuICBhc3NlcnQoZW5kID49IDAgJiYgZW5kIDw9IHNvdXJjZS5sZW5ndGgsICdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpO1xuXG4gIC8vIEFyZSB3ZSBvb2I/XG4gIGlmIChlbmQgPiB0aGlzLmxlbmd0aCkgZW5kID0gdGhpcy5sZW5ndGg7XG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0X3N0YXJ0IDwgZW5kIC0gc3RhcnQpIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRfc3RhcnQgKyBzdGFydDtcblxuICB2YXIgbGVuID0gZW5kIC0gc3RhcnQ7XG5cbiAgaWYgKGxlbiA8IDEwMCB8fCAhQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0X3N0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0Ll9zZXQodGhpcy5zdWJhcnJheShzdGFydCwgc3RhcnQgKyBsZW4pLCB0YXJnZXRfc3RhcnQpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBfYmFzZTY0U2xpY2UoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmLnNsaWNlKHN0YXJ0LCBlbmQpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfdXRmOFNsaWNlKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmVzID0gJyc7XG4gIHZhciB0bXAgPSAnJztcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKTtcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIGlmIChidWZbaV0gPD0gMHg3Rikge1xuICAgICAgcmVzICs9IGRlY29kZVV0ZjhDaGFyKHRtcCkgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSk7XG4gICAgICB0bXAgPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgdG1wICs9ICclJyArIGJ1ZltpXS50b1N0cmluZygxNik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcyArIGRlY29kZVV0ZjhDaGFyKHRtcCk7XG59XG5cbmZ1bmN0aW9uIF9hc2NpaVNsaWNlKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJyc7XG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZCk7XG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pO1xuICB9cmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gX2JpbmFyeVNsaWNlKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICByZXR1cm4gX2FzY2lpU2xpY2UoYnVmLCBzdGFydCwgZW5kKTtcbn1cblxuZnVuY3Rpb24gX2hleFNsaWNlKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwO1xuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuO1xuXG4gIHZhciBvdXQgPSAnJztcbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICBvdXQgKz0gdG9IZXgoYnVmW2ldKTtcbiAgfVxuICByZXR1cm4gb3V0O1xufVxuXG5mdW5jdGlvbiBfdXRmMTZsZVNsaWNlKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZCk7XG4gIHZhciByZXMgPSAnJztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldICsgYnl0ZXNbaSArIDFdICogMjU2KTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoO1xuICBzdGFydCA9IGNsYW1wKHN0YXJ0LCBsZW4sIDApO1xuICBlbmQgPSBjbGFtcChlbmQsIGxlbiwgbGVuKTtcblxuICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgIHJldHVybiBCdWZmZXIuX2F1Z21lbnQodGhpcy5zdWJhcnJheShzdGFydCwgZW5kKSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHNsaWNlTGVuID0gZW5kIC0gc3RhcnQ7XG4gICAgdmFyIG5ld0J1ZiA9IG5ldyBCdWZmZXIoc2xpY2VMZW4sIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGljZUxlbjsgaSsrKSB7XG4gICAgICBuZXdCdWZbaV0gPSB0aGlzW2kgKyBzdGFydF07XG4gICAgfVxuICAgIHJldHVybiBuZXdCdWY7XG4gIH1cbn07XG5cbi8vIGBnZXRgIHdpbGwgYmUgcmVtb3ZlZCBpbiBOb2RlIDAuMTMrXG5CdWZmZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgY29uc29sZS5sb2coJy5nZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLicpO1xuICByZXR1cm4gdGhpcy5yZWFkVUludDgob2Zmc2V0KTtcbn07XG5cbi8vIGBzZXRgIHdpbGwgYmUgcmVtb3ZlZCBpbiBOb2RlIDAuMTMrXG5CdWZmZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uICh2LCBvZmZzZXQpIHtcbiAgY29uc29sZS5sb2coJy5zZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLicpO1xuICByZXR1cm4gdGhpcy53cml0ZVVJbnQ4KHYsIG9mZnNldCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50OCA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gIHJldHVybiB0aGlzW29mZnNldF07XG59O1xuXG5mdW5jdGlvbiBfcmVhZFVJbnQxNihidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgdmFyIHZhbDtcbiAgaWYgKGxpdHRsZUVuZGlhbikge1xuICAgIHZhbCA9IGJ1ZltvZmZzZXRdO1xuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKSB2YWwgfD0gYnVmW29mZnNldCArIDFdIDw8IDg7XG4gIH0gZWxzZSB7XG4gICAgdmFsID0gYnVmW29mZnNldF0gPDwgODtcbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbikgdmFsIHw9IGJ1ZltvZmZzZXQgKyAxXTtcbiAgfVxuICByZXR1cm4gdmFsO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQxNih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDE2KHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbmZ1bmN0aW9uIF9yZWFkVUludDMyKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICB2YXIgdmFsO1xuICBpZiAobGl0dGxlRW5kaWFuKSB7XG4gICAgaWYgKG9mZnNldCArIDIgPCBsZW4pIHZhbCA9IGJ1ZltvZmZzZXQgKyAyXSA8PCAxNjtcbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbikgdmFsIHw9IGJ1ZltvZmZzZXQgKyAxXSA8PCA4O1xuICAgIHZhbCB8PSBidWZbb2Zmc2V0XTtcbiAgICBpZiAob2Zmc2V0ICsgMyA8IGxlbikgdmFsID0gdmFsICsgKGJ1ZltvZmZzZXQgKyAzXSA8PCAyNCA+Pj4gMCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pIHZhbCA9IGJ1ZltvZmZzZXQgKyAxXSA8PCAxNjtcbiAgICBpZiAob2Zmc2V0ICsgMiA8IGxlbikgdmFsIHw9IGJ1ZltvZmZzZXQgKyAyXSA8PCA4O1xuICAgIGlmIChvZmZzZXQgKyAzIDwgbGVuKSB2YWwgfD0gYnVmW29mZnNldCArIDNdO1xuICAgIHZhbCA9IHZhbCArIChidWZbb2Zmc2V0XSA8PCAyNCA+Pj4gMCk7XG4gIH1cbiAgcmV0dXJuIHZhbDtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MzIodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQzMih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQ4ID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgdmFyIG5lZyA9IHRoaXNbb2Zmc2V0XSAmIDB4ODA7XG4gIGlmIChuZWcpIHJldHVybiAoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTE7ZWxzZSByZXR1cm4gdGhpc1tvZmZzZXRdO1xufTtcblxuZnVuY3Rpb24gX3JlYWRJbnQxNihidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgdmFyIHZhbCA9IF9yZWFkVUludDE2KGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIHRydWUpO1xuICB2YXIgbmVnID0gdmFsICYgMHg4MDAwO1xuICBpZiAobmVnKSByZXR1cm4gKDB4ZmZmZiAtIHZhbCArIDEpICogLTE7ZWxzZSByZXR1cm4gdmFsO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MTYodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MTYodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuZnVuY3Rpb24gX3JlYWRJbnQzMihidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgdmFyIHZhbCA9IF9yZWFkVUludDMyKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIHRydWUpO1xuICB2YXIgbmVnID0gdmFsICYgMHg4MDAwMDAwMDtcbiAgaWYgKG5lZykgcmV0dXJuICgweGZmZmZmZmZmIC0gdmFsICsgMSkgKiAtMTtlbHNlIHJldHVybiB2YWw7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQzMih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQzMih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5mdW5jdGlvbiBfcmVhZEZsb2F0KGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gIH1cblxuICByZXR1cm4gaWVlZTc1NC5yZWFkKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KTtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEZsb2F0KHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEZsb2F0KHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbmZ1bmN0aW9uIF9yZWFkRG91YmxlKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgKyA3IDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gIH1cblxuICByZXR1cm4gaWVlZTc1NC5yZWFkKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KTtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWREb3VibGUodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZERvdWJsZSh0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ3RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICAgIHZlcmlmdWludCh2YWx1ZSwgMHhmZik7XG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgdGhpc1tvZmZzZXRdID0gdmFsdWU7XG59O1xuXG5mdW5jdGlvbiBfd3JpdGVVSW50MTYoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKTtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ3RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICAgIHZlcmlmdWludCh2YWx1ZSwgMHhmZmZmKTtcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuICBpZiAob2Zmc2V0ID49IGxlbikgcmV0dXJuO1xuXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4obGVuIC0gb2Zmc2V0LCAyKTsgaSA8IGo7IGkrKykge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSAmIDB4ZmYgPDwgOCAqIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpKSA+Pj4gKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkgKiA4O1xuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuZnVuY3Rpb24gX3dyaXRlVUludDMyKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJyk7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICd0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgICB2ZXJpZnVpbnQodmFsdWUsIDB4ZmZmZmZmZmYpO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihsZW4gLSBvZmZzZXQsIDQpOyBpIDwgajsgaSsrKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gdmFsdWUgPj4+IChsaXR0bGVFbmRpYW4gPyBpIDogMyAtIGkpICogOCAmIDB4ZmY7XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gICAgdmVyaWZzaW50KHZhbHVlLCAweDdmLCAtMHg4MCk7XG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgaWYgKHZhbHVlID49IDApIHRoaXMud3JpdGVVSW50OCh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCk7ZWxzZSB0aGlzLndyaXRlVUludDgoMHhmZiArIHZhbHVlICsgMSwgb2Zmc2V0LCBub0Fzc2VydCk7XG59O1xuXG5mdW5jdGlvbiBfd3JpdGVJbnQxNihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpO1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gICAgdmVyaWZzaW50KHZhbHVlLCAweDdmZmYsIC0weDgwMDApO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgaWYgKHZhbHVlID49IDApIF93cml0ZVVJbnQxNihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpO2Vsc2UgX3dyaXRlVUludDE2KGJ1ZiwgMHhmZmZmICsgdmFsdWUgKyAxLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuZnVuY3Rpb24gX3dyaXRlSW50MzIoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKTtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICAgIHZlcmlmc2ludCh2YWx1ZSwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgaWYgKHZhbHVlID49IDApIF93cml0ZVVJbnQzMihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpO2Vsc2UgX3dyaXRlVUludDMyKGJ1ZiwgMHhmZmZmZmZmZiArIHZhbHVlICsgMSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KTtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbmZ1bmN0aW9uIF93cml0ZUZsb2F0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJyk7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgICB2ZXJpZklFRUU3NTQodmFsdWUsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KTtcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuICBpZiAob2Zmc2V0ID49IGxlbikgcmV0dXJuO1xuXG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KTtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbmZ1bmN0aW9uIF93cml0ZURvdWJsZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpO1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDcgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gICAgdmVyaWZJRUVFNzU0KHZhbHVlLCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KTtcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuICBpZiAob2Zmc2V0ID49IGxlbikgcmV0dXJuO1xuXG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KTtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG4vLyBmaWxsKHZhbHVlLCBzdGFydD0wLCBlbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uICh2YWx1ZSwgc3RhcnQsIGVuZCkge1xuICBpZiAoIXZhbHVlKSB2YWx1ZSA9IDA7XG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMDtcbiAgaWYgKCFlbmQpIGVuZCA9IHRoaXMubGVuZ3RoO1xuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5jaGFyQ29kZUF0KDApO1xuICB9XG5cbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgIWlzTmFOKHZhbHVlKSwgJ3ZhbHVlIGlzIG5vdCBhIG51bWJlcicpO1xuICBhc3NlcnQoZW5kID49IHN0YXJ0LCAnZW5kIDwgc3RhcnQnKTtcblxuICAvLyBGaWxsIDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybjtcbiAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgYXNzZXJ0KHN0YXJ0ID49IDAgJiYgc3RhcnQgPCB0aGlzLmxlbmd0aCwgJ3N0YXJ0IG91dCBvZiBib3VuZHMnKTtcbiAgYXNzZXJ0KGVuZCA+PSAwICYmIGVuZCA8PSB0aGlzLmxlbmd0aCwgJ2VuZCBvdXQgb2YgYm91bmRzJyk7XG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICB0aGlzW2ldID0gdmFsdWU7XG4gIH1cbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG91dCA9IFtdO1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBvdXRbaV0gPSB0b0hleCh0aGlzW2ldKTtcbiAgICBpZiAoaSA9PT0gZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUykge1xuICAgICAgb3V0W2kgKyAxXSA9ICcuLi4nO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiAnPEJ1ZmZlciAnICsgb3V0LmpvaW4oJyAnKSArICc+Jztcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBgQXJyYXlCdWZmZXJgIHdpdGggdGhlICpjb3BpZWQqIG1lbW9yeSBvZiB0aGUgYnVmZmVyIGluc3RhbmNlLlxuICogQWRkZWQgaW4gTm9kZSAwLjEyLiBPbmx5IGF2YWlsYWJsZSBpbiBicm93c2VycyB0aGF0IHN1cHBvcnQgQXJyYXlCdWZmZXIuXG4gKi9cbkJ1ZmZlci5wcm90b3R5cGUudG9BcnJheUJ1ZmZlciA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgICByZXR1cm4gbmV3IEJ1ZmZlcih0aGlzKS5idWZmZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBidWYgPSBuZXcgVWludDhBcnJheSh0aGlzLmxlbmd0aCk7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYnVmLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgIGJ1ZltpXSA9IHRoaXNbaV07XG4gICAgICB9cmV0dXJuIGJ1Zi5idWZmZXI7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignQnVmZmVyLnRvQXJyYXlCdWZmZXIgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXInKTtcbiAgfVxufTtcblxuLy8gSEVMUEVSIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBzdHJpbmd0cmltKHN0cikge1xuICBpZiAoc3RyLnRyaW0pIHJldHVybiBzdHIudHJpbSgpO1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbn1cblxudmFyIEJQID0gQnVmZmVyLnByb3RvdHlwZTtcblxuLyoqXG4gKiBBdWdtZW50IGEgVWludDhBcnJheSAqaW5zdGFuY2UqIChub3QgdGhlIFVpbnQ4QXJyYXkgY2xhc3MhKSB3aXRoIEJ1ZmZlciBtZXRob2RzXG4gKi9cbkJ1ZmZlci5fYXVnbWVudCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgYXJyLl9pc0J1ZmZlciA9IHRydWU7XG5cbiAgLy8gc2F2ZSByZWZlcmVuY2UgdG8gb3JpZ2luYWwgVWludDhBcnJheSBnZXQvc2V0IG1ldGhvZHMgYmVmb3JlIG92ZXJ3cml0aW5nXG4gIGFyci5fZ2V0ID0gYXJyLmdldDtcbiAgYXJyLl9zZXQgPSBhcnIuc2V0O1xuXG4gIC8vIGRlcHJlY2F0ZWQsIHdpbGwgYmUgcmVtb3ZlZCBpbiBub2RlIDAuMTMrXG4gIGFyci5nZXQgPSBCUC5nZXQ7XG4gIGFyci5zZXQgPSBCUC5zZXQ7XG5cbiAgYXJyLndyaXRlID0gQlAud3JpdGU7XG4gIGFyci50b1N0cmluZyA9IEJQLnRvU3RyaW5nO1xuICBhcnIudG9Mb2NhbGVTdHJpbmcgPSBCUC50b1N0cmluZztcbiAgYXJyLnRvSlNPTiA9IEJQLnRvSlNPTjtcbiAgYXJyLmNvcHkgPSBCUC5jb3B5O1xuICBhcnIuc2xpY2UgPSBCUC5zbGljZTtcbiAgYXJyLnJlYWRVSW50OCA9IEJQLnJlYWRVSW50ODtcbiAgYXJyLnJlYWRVSW50MTZMRSA9IEJQLnJlYWRVSW50MTZMRTtcbiAgYXJyLnJlYWRVSW50MTZCRSA9IEJQLnJlYWRVSW50MTZCRTtcbiAgYXJyLnJlYWRVSW50MzJMRSA9IEJQLnJlYWRVSW50MzJMRTtcbiAgYXJyLnJlYWRVSW50MzJCRSA9IEJQLnJlYWRVSW50MzJCRTtcbiAgYXJyLnJlYWRJbnQ4ID0gQlAucmVhZEludDg7XG4gIGFyci5yZWFkSW50MTZMRSA9IEJQLnJlYWRJbnQxNkxFO1xuICBhcnIucmVhZEludDE2QkUgPSBCUC5yZWFkSW50MTZCRTtcbiAgYXJyLnJlYWRJbnQzMkxFID0gQlAucmVhZEludDMyTEU7XG4gIGFyci5yZWFkSW50MzJCRSA9IEJQLnJlYWRJbnQzMkJFO1xuICBhcnIucmVhZEZsb2F0TEUgPSBCUC5yZWFkRmxvYXRMRTtcbiAgYXJyLnJlYWRGbG9hdEJFID0gQlAucmVhZEZsb2F0QkU7XG4gIGFyci5yZWFkRG91YmxlTEUgPSBCUC5yZWFkRG91YmxlTEU7XG4gIGFyci5yZWFkRG91YmxlQkUgPSBCUC5yZWFkRG91YmxlQkU7XG4gIGFyci53cml0ZVVJbnQ4ID0gQlAud3JpdGVVSW50ODtcbiAgYXJyLndyaXRlVUludDE2TEUgPSBCUC53cml0ZVVJbnQxNkxFO1xuICBhcnIud3JpdGVVSW50MTZCRSA9IEJQLndyaXRlVUludDE2QkU7XG4gIGFyci53cml0ZVVJbnQzMkxFID0gQlAud3JpdGVVSW50MzJMRTtcbiAgYXJyLndyaXRlVUludDMyQkUgPSBCUC53cml0ZVVJbnQzMkJFO1xuICBhcnIud3JpdGVJbnQ4ID0gQlAud3JpdGVJbnQ4O1xuICBhcnIud3JpdGVJbnQxNkxFID0gQlAud3JpdGVJbnQxNkxFO1xuICBhcnIud3JpdGVJbnQxNkJFID0gQlAud3JpdGVJbnQxNkJFO1xuICBhcnIud3JpdGVJbnQzMkxFID0gQlAud3JpdGVJbnQzMkxFO1xuICBhcnIud3JpdGVJbnQzMkJFID0gQlAud3JpdGVJbnQzMkJFO1xuICBhcnIud3JpdGVGbG9hdExFID0gQlAud3JpdGVGbG9hdExFO1xuICBhcnIud3JpdGVGbG9hdEJFID0gQlAud3JpdGVGbG9hdEJFO1xuICBhcnIud3JpdGVEb3VibGVMRSA9IEJQLndyaXRlRG91YmxlTEU7XG4gIGFyci53cml0ZURvdWJsZUJFID0gQlAud3JpdGVEb3VibGVCRTtcbiAgYXJyLmZpbGwgPSBCUC5maWxsO1xuICBhcnIuaW5zcGVjdCA9IEJQLmluc3BlY3Q7XG4gIGFyci50b0FycmF5QnVmZmVyID0gQlAudG9BcnJheUJ1ZmZlcjtcblxuICByZXR1cm4gYXJyO1xufTtcblxuLy8gc2xpY2Uoc3RhcnQsIGVuZClcbmZ1bmN0aW9uIGNsYW1wKGluZGV4LCBsZW4sIGRlZmF1bHRWYWx1ZSkge1xuICBpZiAodHlwZW9mIGluZGV4ICE9PSAnbnVtYmVyJykgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgaW5kZXggPSB+fmluZGV4OyAvLyBDb2VyY2UgdG8gaW50ZWdlci5cbiAgaWYgKGluZGV4ID49IGxlbikgcmV0dXJuIGxlbjtcbiAgaWYgKGluZGV4ID49IDApIHJldHVybiBpbmRleDtcbiAgaW5kZXggKz0gbGVuO1xuICBpZiAoaW5kZXggPj0gMCkgcmV0dXJuIGluZGV4O1xuICByZXR1cm4gMDtcbn1cblxuZnVuY3Rpb24gY29lcmNlKGxlbmd0aCkge1xuICAvLyBDb2VyY2UgbGVuZ3RoIHRvIGEgbnVtYmVyIChwb3NzaWJseSBOYU4pLCByb3VuZCB1cFxuICAvLyBpbiBjYXNlIGl0J3MgZnJhY3Rpb25hbCAoZS5nLiAxMjMuNDU2KSB0aGVuIGRvIGFcbiAgLy8gZG91YmxlIG5lZ2F0ZSB0byBjb2VyY2UgYSBOYU4gdG8gMC4gRWFzeSwgcmlnaHQ/XG4gIGxlbmd0aCA9IH5+TWF0aC5jZWlsKCtsZW5ndGgpO1xuICByZXR1cm4gbGVuZ3RoIDwgMCA/IDAgOiBsZW5ndGg7XG59XG5cbmZ1bmN0aW9uIGlzQXJyYXkoc3ViamVjdCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHN1YmplY3QpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN1YmplY3QpID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9KShzdWJqZWN0KTtcbn1cblxuZnVuY3Rpb24gaXNBcnJheWlzaChzdWJqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5KHN1YmplY3QpIHx8IEJ1ZmZlci5pc0J1ZmZlcihzdWJqZWN0KSB8fCBzdWJqZWN0ICYmICh0eXBlb2Ygc3ViamVjdCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yoc3ViamVjdCkpID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygc3ViamVjdC5sZW5ndGggPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiB0b0hleChuKSB7XG4gIGlmIChuIDwgMTYpIHJldHVybiAnMCcgKyBuLnRvU3RyaW5nKDE2KTtcbiAgcmV0dXJuIG4udG9TdHJpbmcoMTYpO1xufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyhzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIHZhciBiID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgaWYgKGIgPD0gMHg3RikgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkpO2Vsc2Uge1xuICAgICAgdmFyIHN0YXJ0ID0gaTtcbiAgICAgIGlmIChiID49IDB4RDgwMCAmJiBiIDw9IDB4REZGRikgaSsrO1xuICAgICAgdmFyIGggPSBlbmNvZGVVUklDb21wb25lbnQoc3RyLnNsaWNlKHN0YXJ0LCBpICsgMSkpLnN1YnN0cigxKS5zcGxpdCgnJScpO1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBoLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGJ5dGVBcnJheS5wdXNoKHBhcnNlSW50KGhbal0sIDE2KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBieXRlQXJyYXk7XG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyhzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRik7XG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheTtcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVRvQnl0ZXMoc3RyKSB7XG4gIHZhciBjLCBoaSwgbG87XG4gIHZhciBieXRlQXJyYXkgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgaGkgPSBjID4+IDg7XG4gICAgbG8gPSBjICUgMjU2O1xuICAgIGJ5dGVBcnJheS5wdXNoKGxvKTtcbiAgICBieXRlQXJyYXkucHVzaChoaSk7XG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5O1xufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KHN0cik7XG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIoc3JjLCBkc3QsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBwb3M7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoIHx8IGkgPj0gc3JjLmxlbmd0aCkgYnJlYWs7XG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldO1xuICB9XG4gIHJldHVybiBpO1xufVxuXG5mdW5jdGlvbiBkZWNvZGVVdGY4Q2hhcihzdHIpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0cik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4RkZGRCk7IC8vIFVURiA4IGludmFsaWQgY2hhclxuICB9XG59XG5cbi8qXG4gKiBXZSBoYXZlIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSB2YWx1ZSBpcyBhIHZhbGlkIGludGVnZXIuIFRoaXMgbWVhbnMgdGhhdCBpdFxuICogaXMgbm9uLW5lZ2F0aXZlLiBJdCBoYXMgbm8gZnJhY3Rpb25hbCBjb21wb25lbnQgYW5kIHRoYXQgaXQgZG9lcyBub3RcbiAqIGV4Y2VlZCB0aGUgbWF4aW11bSBhbGxvd2VkIHZhbHVlLlxuICovXG5mdW5jdGlvbiB2ZXJpZnVpbnQodmFsdWUsIG1heCkge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKTtcbiAgYXNzZXJ0KHZhbHVlID49IDAsICdzcGVjaWZpZWQgYSBuZWdhdGl2ZSB2YWx1ZSBmb3Igd3JpdGluZyBhbiB1bnNpZ25lZCB2YWx1ZScpO1xuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgaXMgbGFyZ2VyIHRoYW4gbWF4aW11bSB2YWx1ZSBmb3IgdHlwZScpO1xuICBhc3NlcnQoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlLCAndmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnQnKTtcbn1cblxuZnVuY3Rpb24gdmVyaWZzaW50KHZhbHVlLCBtYXgsIG1pbikge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKTtcbiAgYXNzZXJ0KHZhbHVlIDw9IG1heCwgJ3ZhbHVlIGxhcmdlciB0aGFuIG1heGltdW0gYWxsb3dlZCB2YWx1ZScpO1xuICBhc3NlcnQodmFsdWUgPj0gbWluLCAndmFsdWUgc21hbGxlciB0aGFuIG1pbmltdW0gYWxsb3dlZCB2YWx1ZScpO1xuICBhc3NlcnQoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlLCAndmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnQnKTtcbn1cblxuZnVuY3Rpb24gdmVyaWZJRUVFNzU0KHZhbHVlLCBtYXgsIG1pbikge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKTtcbiAgYXNzZXJ0KHZhbHVlIDw9IG1heCwgJ3ZhbHVlIGxhcmdlciB0aGFuIG1heGltdW0gYWxsb3dlZCB2YWx1ZScpO1xuICBhc3NlcnQodmFsdWUgPj0gbWluLCAndmFsdWUgc21hbGxlciB0aGFuIG1pbmltdW0gYWxsb3dlZCB2YWx1ZScpO1xufVxuXG5mdW5jdGlvbiBhc3NlcnQodGVzdCwgbWVzc2FnZSkge1xuICBpZiAoIXRlc3QpIHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8ICdGYWlsZWQgYXNzZXJ0aW9uJyk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbWx1WkdWNExtcHpJbDBzSW01aGJXVnpJanBiSW1KaGMyVTJOQ0lzSW5KbGNYVnBjbVVpTENKcFpXVmxOelUwSWl3aVpYaHdiM0owY3lJc0lrSjFabVpsY2lJc0lsTnNiM2RDZFdabVpYSWlMQ0pKVGxOUVJVTlVYMDFCV0Y5Q1dWUkZVeUlzSW5CdmIyeFRhWHBsSWl3aVgzVnpaVlI1Y0dWa1FYSnlZWGx6SWl3aVluVm1JaXdpUVhKeVlYbENkV1ptWlhJaUxDSmhjbklpTENKVmFXNTBPRUZ5Y21GNUlpd2labTl2SWl3aWMzVmlZWEp5WVhraUxDSmxJaXdpYzNWaWFtVmpkQ0lzSW1WdVkyOWthVzVuSWl3aWJtOWFaWEp2SWl3aWRIbHdaU0lzSW5OMGNtbHVaM1J5YVcwaUxDSnNaVzVuZEdnaUxDSmpiMlZ5WTJVaUxDSmllWFJsVEdWdVozUm9JaXdpUlhKeWIzSWlMQ0pmWVhWbmJXVnVkQ0lzSWw5cGMwSjFabVpsY2lJc0lta2lMQ0pmYzJWMElpd2lhWE5CY25KaGVXbHphQ0lzSW1selFuVm1abVZ5SWl3aWNtVmhaRlZKYm5RNElpd2lkM0pwZEdVaUxDSnBjMFZ1WTI5a2FXNW5JaXdpVTNSeWFXNW5JaXdpZEc5TWIzZGxja05oYzJVaUxDSmlJaXdpZFc1a1pXWnBibVZrSWl3aWMzUnlJaXdpY21WMElpd2lkWFJtT0ZSdlFubDBaWE1pTENKaVlYTmxOalJVYjBKNWRHVnpJaXdpWTI5dVkyRjBJaXdpYkdsemRDSXNJblJ2ZEdGc1RHVnVaM1JvSWl3aVlYTnpaWEowSWl3aWFYTkJjbkpoZVNJc0luQnZjeUlzSW1sMFpXMGlMQ0pqYjNCNUlpd2lYMmhsZUZkeWFYUmxJaXdpYzNSeWFXNW5JaXdpYjJabWMyVjBJaXdpVG5WdFltVnlJaXdpY21WdFlXbHVhVzVuSWl3aWMzUnlUR1Z1SWl3aVlubDBaU0lzSW5CaGNuTmxTVzUwSWl3aWMzVmljM1J5SWl3aWFYTk9ZVTRpTENKZlkyaGhjbk5YY21sMGRHVnVJaXdpWDNWMFpqaFhjbWwwWlNJc0ltTm9ZWEp6VjNKcGRIUmxiaUlzSW1Kc2FYUkNkV1ptWlhJaUxDSmZZWE5qYVdsWGNtbDBaU0lzSW1GelkybHBWRzlDZVhSbGN5SXNJbDlpYVc1aGNubFhjbWwwWlNJc0lsOWlZWE5sTmpSWGNtbDBaU0lzSWw5MWRHWXhObXhsVjNKcGRHVWlMQ0oxZEdZeE5teGxWRzlDZVhSbGN5SXNJbkJ5YjNSdmRIbHdaU0lzSW1selJtbHVhWFJsSWl3aWMzZGhjQ0lzSW5SdlUzUnlhVzVuSWl3aWMzUmhjblFpTENKbGJtUWlMQ0p6Wld4bUlpd2lYMmhsZUZOc2FXTmxJaXdpWDNWMFpqaFRiR2xqWlNJc0lsOWhjMk5wYVZOc2FXTmxJaXdpWDJKcGJtRnllVk5zYVdObElpd2lYMkpoYzJVMk5GTnNhV05sSWl3aVgzVjBaakUyYkdWVGJHbGpaU0lzSW5SdlNsTlBUaUlzSW1SaGRHRWlMQ0pCY25KaGVTSXNJbk5zYVdObElpd2lZMkZzYkNJc0lsOWhjbklpTENKMFlYSm5aWFFpTENKMFlYSm5aWFJmYzNSaGNuUWlMQ0p6YjNWeVkyVWlMQ0pzWlc0aUxDSm1jbTl0UW5sMFpVRnljbUY1SWl3aWNtVnpJaXdpZEcxd0lpd2lUV0YwYUNJc0ltMXBiaUlzSW1SbFkyOWtaVlYwWmpoRGFHRnlJaXdpWm5KdmJVTm9ZWEpEYjJSbElpd2liM1YwSWl3aWRHOUlaWGdpTENKaWVYUmxjeUlzSW1Oc1lXMXdJaXdpYzJ4cFkyVk1aVzRpTENKdVpYZENkV1lpTENKblpYUWlMQ0pqYjI1emIyeGxJaXdpYkc5bklpd2ljMlYwSWl3aWRpSXNJbmR5YVhSbFZVbHVkRGdpTENKdWIwRnpjMlZ5ZENJc0lsOXlaV0ZrVlVsdWRERTJJaXdpYkdsMGRHeGxSVzVrYVdGdUlpd2lkbUZzSWl3aWNtVmhaRlZKYm5ReE5reEZJaXdpY21WaFpGVkpiblF4TmtKRklpd2lYM0psWVdSVlNXNTBNeklpTENKeVpXRmtWVWx1ZERNeVRFVWlMQ0p5WldGa1ZVbHVkRE15UWtVaUxDSnlaV0ZrU1c1ME9DSXNJbTVsWnlJc0lsOXlaV0ZrU1c1ME1UWWlMQ0p5WldGa1NXNTBNVFpNUlNJc0luSmxZV1JKYm5ReE5rSkZJaXdpWDNKbFlXUkpiblF6TWlJc0luSmxZV1JKYm5Rek1reEZJaXdpY21WaFpFbHVkRE15UWtVaUxDSmZjbVZoWkVac2IyRjBJaXdpY21WaFpDSXNJbkpsWVdSR2JHOWhkRXhGSWl3aWNtVmhaRVpzYjJGMFFrVWlMQ0pmY21WaFpFUnZkV0pzWlNJc0luSmxZV1JFYjNWaWJHVk1SU0lzSW5KbFlXUkViM1ZpYkdWQ1JTSXNJblpoYkhWbElpd2lkbVZ5YVdaMWFXNTBJaXdpWDNkeWFYUmxWVWx1ZERFMklpd2lhaUlzSW5keWFYUmxWVWx1ZERFMlRFVWlMQ0ozY21sMFpWVkpiblF4TmtKRklpd2lYM2R5YVhSbFZVbHVkRE15SWl3aWQzSnBkR1ZWU1c1ME16Sk1SU0lzSW5keWFYUmxWVWx1ZERNeVFrVWlMQ0ozY21sMFpVbHVkRGdpTENKMlpYSnBabk5wYm5RaUxDSmZkM0pwZEdWSmJuUXhOaUlzSW5keWFYUmxTVzUwTVRaTVJTSXNJbmR5YVhSbFNXNTBNVFpDUlNJc0lsOTNjbWwwWlVsdWRETXlJaXdpZDNKcGRHVkpiblF6TWt4Rklpd2lkM0pwZEdWSmJuUXpNa0pGSWl3aVgzZHlhWFJsUm14dllYUWlMQ0oyWlhKcFprbEZSVVUzTlRRaUxDSjNjbWwwWlVac2IyRjBURVVpTENKM2NtbDBaVVpzYjJGMFFrVWlMQ0pmZDNKcGRHVkViM1ZpYkdVaUxDSjNjbWwwWlVSdmRXSnNaVXhGSWl3aWQzSnBkR1ZFYjNWaWJHVkNSU0lzSW1acGJHd2lMQ0pqYUdGeVEyOWtaVUYwSWl3aWFXNXpjR1ZqZENJc0ltcHZhVzRpTENKMGIwRnljbUY1UW5WbVptVnlJaXdpWW5WbVptVnlJaXdpZEhKcGJTSXNJbkpsY0d4aFkyVWlMQ0pDVUNJc0lsOW5aWFFpTENKMGIweHZZMkZzWlZOMGNtbHVaeUlzSW1sdVpHVjRJaXdpWkdWbVlYVnNkRlpoYkhWbElpd2lZMlZwYkNJc0lrOWlhbVZqZENJc0ltNGlMQ0ppZVhSbFFYSnlZWGtpTENKd2RYTm9JaXdpYUNJc0ltVnVZMjlrWlZWU1NVTnZiWEJ2Ym1WdWRDSXNJbk53YkdsMElpd2lZeUlzSW1ocElpd2liRzhpTENKMGIwSjVkR1ZCY25KaGVTSXNJbk55WXlJc0ltUnpkQ0lzSW1SbFkyOWtaVlZTU1VOdmJYQnZibVZ1ZENJc0ltVnljaUlzSW0xaGVDSXNJbVpzYjI5eUlpd2lkR1Z6ZENJc0ltMWxjM05oWjJVaVhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN1FVRkJRVHM3T3pzN096dEJRVTlCTEVsQlFVbEJMRk5CUVZORExGRkJRVkVzVjBGQlVpeERRVUZpTzBGQlEwRXNTVUZCU1VNc1ZVRkJWVVFzVVVGQlVTeFRRVUZTTEVOQlFXUTdPMEZCUlVGRkxGRkJRVkZETEUxQlFWSXNSMEZCYVVKQkxFMUJRV3BDTzBGQlEwRkVMRkZCUVZGRkxGVkJRVklzUjBGQmNVSkVMRTFCUVhKQ08wRkJRMEZFTEZGQlFWRkhMR2xDUVVGU0xFZEJRVFJDTEVWQlFUVkNPMEZCUTBGR0xFOUJRVTlITEZGQlFWQXNSMEZCYTBJc1NVRkJiRUk3TzBGQlJVRTdPenM3TzBGQlMwRklMRTlCUVU5SkxHVkJRVkFzUjBGQk1FSXNXVUZCV1R0QlFVTndRenRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNUVUZCU1R0QlFVTkdMRkZCUVVsRExFMUJRVTBzU1VGQlNVTXNWMEZCU2l4RFFVRm5RaXhEUVVGb1FpeERRVUZXTzBGQlEwRXNVVUZCU1VNc1RVRkJUU3hKUVVGSlF5eFZRVUZLTEVOQlFXVklMRWRCUVdZc1EwRkJWanRCUVVOQlJTeFJRVUZKUlN4SFFVRktMRWRCUVZVc1dVRkJXVHRCUVVGRkxHRkJRVThzUlVGQlVEdEJRVUZYTEV0QlFXNURPMEZCUTBFc1YwRkJUeXhQUVVGUFJpeEpRVUZKUlN4SFFVRktMRVZCUVZBc1NVRkRTQ3hQUVVGUFJpeEpRVUZKUnl4UlFVRllMRXRCUVhkQ0xGVkJSRFZDTEVOQlNrVXNRMEZMY1VNN1FVRkRlRU1zUjBGT1JDeERRVTFGTEU5QlFVOURMRU5CUVZBc1JVRkJWVHRCUVVOV0xGZEJRVThzUzBGQlVEdEJRVU5FTzBGQlEwWXNRMEZtZDBJc1JVRkJla0k3TzBGQmFVSkJPenM3T3pzN096czdPenM3UVVGWlFTeFRRVUZUV0N4TlFVRlVMRU5CUVdsQ1dTeFBRVUZxUWl4RlFVRXdRa01zVVVGQk1VSXNSVUZCYjBORExFMUJRWEJETEVWQlFUUkRPMEZCUXpGRExFMUJRVWtzUlVGQlJTeG5Ra0ZCWjBKa0xFMUJRV3hDTEVOQlFVb3NSVUZEUlN4UFFVRlBMRWxCUVVsQkxFMUJRVW9zUTBGQlYxa3NUMEZCV0N4RlFVRnZRa01zVVVGQmNFSXNSVUZCT0VKRExFMUJRVGxDTEVOQlFWQTdPMEZCUlVZc1RVRkJTVU1zWTBGQlkwZ3NUMEZCWkN4NVEwRkJZMEVzVDBGQlpDeERRVUZLT3p0QlFVVkJPMEZCUTBFN1FVRkRRU3hOUVVGSlF5eGhRVUZoTEZGQlFXSXNTVUZCZVVKRkxGTkJRVk1zVVVGQmRFTXNSVUZCWjBRN1FVRkRPVU5JTEdOQlFWVkpMRmRCUVZkS0xFOUJRVmdzUTBGQlZqdEJRVU5CTEZkQlFVOUJMRkZCUVZGTExFMUJRVklzUjBGQmFVSXNRMEZCYWtJc1MwRkJkVUlzUTBGQk9VSXNSVUZCYVVNN1FVRkRMMEpNTEdkQ1FVRlZRU3hWUVVGVkxFZEJRWEJDTzBGQlEwUTdRVUZEUmpzN1FVRkZSRHRCUVVOQkxFMUJRVWxMTEUxQlFVbzdRVUZEUVN4TlFVRkpSaXhUUVVGVExGRkJRV0lzUlVGRFJVVXNVMEZCVTBNc1QwRkJUMDRzVDBGQlVDeERRVUZVTEVOQlJFWXNTMEZGU3l4SlFVRkpSeXhUUVVGVExGRkJRV0lzUlVGRFNFVXNVMEZCVTJwQ0xFOUJRVTl0UWl4VlFVRlFMRU5CUVd0Q1VDeFBRVUZzUWl4RlFVRXlRa01zVVVGQk0wSXNRMEZCVkN4RFFVUkhMRXRCUlVFc1NVRkJTVVVzVTBGQlV5eFJRVUZpTEVWQlEwaEZMRk5CUVZORExFOUJRVTlPTEZGQlFWRkxMRTFCUVdZc1EwRkJWQ3hEUVVSSExFTkJRelpDTzBGQlJEZENMRTlCUjBnc1RVRkJUU3hKUVVGSlJ5eExRVUZLTEVOQlFWVXNkVVJCUVZZc1EwRkJUanM3UVVGRlJpeE5RVUZKWml4SFFVRktPMEZCUTBFc1RVRkJTVXdzVDBGQlQwa3NaVUZCV0N4RlFVRTBRanRCUVVNeFFqdEJRVU5CUXl4VlFVRk5UQ3hQUVVGUGNVSXNVVUZCVUN4RFFVRm5RaXhKUVVGSllpeFZRVUZLTEVOQlFXVlRMRTFCUVdZc1EwRkJhRUlzUTBGQlRqdEJRVU5FTEVkQlNFUXNUVUZIVHp0QlFVTk1PMEZCUTBGYUxGVkJRVTBzU1VGQlRqdEJRVU5CUVN4UlFVRkpXU3hOUVVGS0xFZEJRV0ZCTEUxQlFXSTdRVUZEUVZvc1VVRkJTV2xDTEZOQlFVb3NSMEZCWjBJc1NVRkJhRUk3UVVGRFJEczdRVUZGUkN4TlFVRkpReXhEUVVGS08wRkJRMEVzVFVGQlNYWkNMRTlCUVU5SkxHVkJRVkFzU1VGQk1FSXNUMEZCVDFFc1VVRkJVVThzVlVGQlppeExRVUU0UWl4UlFVRTFSQ3hGUVVGelJUdEJRVU53UlR0QlFVTkJaQ3hSUVVGSmJVSXNTVUZCU2l4RFFVRlRXaXhQUVVGVU8wRkJRMFFzUjBGSVJDeE5RVWRQTEVsQlFVbGhMRmRCUVZkaUxFOUJRVmdzUTBGQlNpeEZRVUY1UWp0QlFVTTVRanRCUVVOQkxGTkJRVXRYTEVsQlFVa3NRMEZCVkN4RlFVRlpRU3hKUVVGSlRpeE5RVUZvUWl4RlFVRjNRazBzUjBGQmVFSXNSVUZCTmtJN1FVRkRNMElzVlVGQlNYWkNMRTlCUVU4d1FpeFJRVUZRTEVOQlFXZENaQ3hQUVVGb1FpeERRVUZLTEVWQlEwVlFMRWxCUVVsclFpeERRVUZLTEVsQlFWTllMRkZCUVZGbExGTkJRVklzUTBGQmEwSktMRU5CUVd4Q0xFTkJRVlFzUTBGRVJpeExRVWRGYkVJc1NVRkJTV3RDTEVOQlFVb3NTVUZCVTFnc1VVRkJVVmNzUTBGQlVpeERRVUZVTzBGQlEwZzdRVUZEUml4SFFWSk5MRTFCVVVFc1NVRkJTVklzVTBGQlV5eFJRVUZpTEVWQlFYVkNPMEZCUXpWQ1ZpeFJRVUZKZFVJc1MwRkJTaXhEUVVGVmFFSXNUMEZCVml4RlFVRnRRaXhEUVVGdVFpeEZRVUZ6UWtNc1VVRkJkRUk3UVVGRFJDeEhRVVpOTEUxQlJVRXNTVUZCU1VVc1UwRkJVeXhSUVVGVUxFbEJRWEZDTEVOQlFVTm1MRTlCUVU5SkxHVkJRVGRDTEVsQlFXZEVMRU5CUVVOVkxFMUJRWEpFTEVWQlFUWkVPMEZCUTJ4RkxGTkJRVXRUTEVsQlFVa3NRMEZCVkN4RlFVRlpRU3hKUVVGSlRpeE5RVUZvUWl4RlFVRjNRazBzUjBGQmVFSXNSVUZCTmtJN1FVRkRNMEpzUWl4VlFVRkphMElzUTBGQlNpeEpRVUZUTEVOQlFWUTdRVUZEUkR0QlFVTkdPenRCUVVWRUxGTkJRVTlzUWl4SFFVRlFPMEZCUTBRN08wRkJSVVE3UVVGRFFUczdRVUZGUVV3c1QwRkJUelpDTEZWQlFWQXNSMEZCYjBJc1ZVRkJWV2hDTEZGQlFWWXNSVUZCYjBJN1FVRkRkRU1zVlVGQlVXbENMRTlCUVU5cVFpeFJRVUZRTEVWQlFXbENhMElzVjBGQmFrSXNSVUZCVWp0QlFVTkZMRk5CUVVzc1MwRkJURHRCUVVOQkxGTkJRVXNzVFVGQlREdEJRVU5CTEZOQlFVc3NUMEZCVER0QlFVTkJMRk5CUVVzc1QwRkJURHRCUVVOQkxGTkJRVXNzVVVGQlREdEJRVU5CTEZOQlFVc3NVVUZCVER0QlFVTkJMRk5CUVVzc1MwRkJURHRCUVVOQkxGTkJRVXNzVFVGQlREdEJRVU5CTEZOQlFVc3NUMEZCVER0QlFVTkJMRk5CUVVzc1UwRkJURHRCUVVOQkxGTkJRVXNzVlVGQlREdEJRVU5GTEdGQlFVOHNTVUZCVUR0QlFVTkdPMEZCUTBVc1lVRkJUeXhMUVVGUU8wRkJaRW83UVVGblFrUXNRMEZxUWtRN08wRkJiVUpCTDBJc1QwRkJUekJDTEZGQlFWQXNSMEZCYTBJc1ZVRkJWVTBzUTBGQlZpeEZRVUZoTzBGQlF6ZENMRk5CUVU4c1EwRkJReXhGUVVGRlFTeE5RVUZOTEVsQlFVNHNTVUZCWTBFc1RVRkJUVU1zVTBGQmNFSXNTVUZCYVVORUxFVkJRVVZXTEZOQlFYSkRMRU5CUVZJN1FVRkRSQ3hEUVVaRU96dEJRVWxCZEVJc1QwRkJUMjFDTEZWQlFWQXNSMEZCYjBJc1ZVRkJWV1VzUjBGQlZpeEZRVUZsY2tJc1VVRkJaaXhGUVVGNVFqdEJRVU16UXl4TlFVRkpjMElzUjBGQlNqdEJRVU5CUkN4UlFVRk5RU3hOUVVGTkxFVkJRVm83UVVGRFFTeFZRVUZSY2tJc1dVRkJXU3hOUVVGd1FqdEJRVU5GTEZOQlFVc3NTMEZCVER0QlFVTkZjMElzV1VGQlRVUXNTVUZCU1dwQ0xFMUJRVW9zUjBGQllTeERRVUZ1UWp0QlFVTkJPMEZCUTBZc1UwRkJTeXhOUVVGTU8wRkJRMEVzVTBGQlN5eFBRVUZNTzBGQlEwVnJRaXhaUVVGTlF5eFpRVUZaUml4SFFVRmFMRVZCUVdsQ2FrSXNUVUZCZGtJN1FVRkRRVHRCUVVOR0xGTkJRVXNzVDBGQlREdEJRVU5CTEZOQlFVc3NVVUZCVER0QlFVTkJMRk5CUVVzc1MwRkJURHRCUVVORmEwSXNXVUZCVFVRc1NVRkJTV3BDTEUxQlFWWTdRVUZEUVR0QlFVTkdMRk5CUVVzc1VVRkJURHRCUVVORmEwSXNXVUZCVFVVc1kwRkJZMGdzUjBGQlpDeEZRVUZ0UW1wQ0xFMUJRWHBDTzBGQlEwRTdRVUZEUml4VFFVRkxMRTFCUVV3N1FVRkRRU3hUUVVGTExFOUJRVXc3UVVGRFFTeFRRVUZMTEZOQlFVdzdRVUZEUVN4VFFVRkxMRlZCUVV3N1FVRkRSV3RDTEZsQlFVMUVMRWxCUVVscVFpeE5RVUZLTEVkQlFXRXNRMEZCYmtJN1FVRkRRVHRCUVVOR08wRkJRMFVzV1VGQlRTeEpRVUZKUnl4TFFVRktMRU5CUVZVc2EwSkJRVllzUTBGQlRqdEJRWFpDU2p0QlFYbENRU3hUUVVGUFpTeEhRVUZRTzBGQlEwUXNRMEUzUWtRN08wRkJLMEpCYmtNc1QwRkJUM05ETEUxQlFWQXNSMEZCWjBJc1ZVRkJWVU1zU1VGQlZpeEZRVUZuUWtNc1YwRkJhRUlzUlVGQk5rSTdRVUZETTBORExGTkJRVTlETEZGQlFWRklMRWxCUVZJc1EwRkJVQ3hGUVVGelFpeG5SRUZEYkVJc01FSkJSRW83TzBGQlIwRXNUVUZCU1VFc1MwRkJTM1JDTEUxQlFVd3NTMEZCWjBJc1EwRkJjRUlzUlVGQmRVSTdRVUZEY2tJc1YwRkJUeXhKUVVGSmFrSXNUVUZCU2l4RFFVRlhMRU5CUVZnc1EwRkJVRHRCUVVORUxFZEJSa1FzVFVGRlR5eEpRVUZKZFVNc1MwRkJTM1JDTEUxQlFVd3NTMEZCWjBJc1EwRkJjRUlzUlVGQmRVSTdRVUZETlVJc1YwRkJUM05DTEV0QlFVc3NRMEZCVEN4RFFVRlFPMEZCUTBRN08wRkJSVVFzVFVGQlNXaENMRU5CUVVvN1FVRkRRU3hOUVVGSkxFOUJRVTlwUWl4WFFVRlFMRXRCUVhWQ0xGRkJRVE5DTEVWQlFYRkRPMEZCUTI1RFFTeHJRa0ZCWXl4RFFVRmtPMEZCUTBFc1UwRkJTMnBDTEVsQlFVa3NRMEZCVkN4RlFVRlpRU3hKUVVGSlowSXNTMEZCUzNSQ0xFMUJRWEpDTEVWQlFUWkNUU3hIUVVFM1FpeEZRVUZyUXp0QlFVTm9RMmxDTEhGQ1FVRmxSQ3hMUVVGTGFFSXNRMEZCVEN4RlFVRlJUaXhOUVVGMlFqdEJRVU5FTzBGQlEwWTdPMEZCUlVRc1RVRkJTVm9zVFVGQlRTeEpRVUZKVEN4TlFVRktMRU5CUVZkM1F5eFhRVUZZTEVOQlFWWTdRVUZEUVN4TlFVRkpSeXhOUVVGTkxFTkJRVlk3UVVGRFFTeFBRVUZMY0VJc1NVRkJTU3hEUVVGVUxFVkJRVmxCTEVsQlFVbG5RaXhMUVVGTGRFSXNUVUZCY2tJc1JVRkJOa0pOTEVkQlFUZENMRVZCUVd0RE8wRkJRMmhETEZGQlFVbHhRaXhQUVVGUFRDeExRVUZMYUVJc1EwRkJUQ3hEUVVGWU8wRkJRMEZ4UWl4VFFVRkxReXhKUVVGTUxFTkJRVlY0UXl4SFFVRldMRVZCUVdWelF5eEhRVUZtTzBGQlEwRkJMRmRCUVU5RExFdEJRVXN6UWl4TlFVRmFPMEZCUTBRN1FVRkRSQ3hUUVVGUFdpeEhRVUZRTzBGQlEwUXNRMEV4UWtRN08wRkJORUpCTzBGQlEwRTdPMEZCUlVFc1UwRkJVM2xETEZOQlFWUXNRMEZCYjBKNlF5eEhRVUZ3UWl4RlFVRjVRakJETEUxQlFYcENMRVZCUVdsRFF5eE5RVUZxUXl4RlFVRjVReTlDTEUxQlFYcERMRVZCUVdsRU8wRkJReTlESzBJc1YwRkJVME1zVDBGQlQwUXNUVUZCVUN4TFFVRnJRaXhEUVVFelFqdEJRVU5CTEUxQlFVbEZMRmxCUVZrM1F5eEpRVUZKV1N4TlFVRktMRWRCUVdFclFpeE5RVUUzUWp0QlFVTkJMRTFCUVVrc1EwRkJReTlDTEUxQlFVd3NSVUZCWVR0QlFVTllRU3hoUVVGVGFVTXNVMEZCVkR0QlFVTkVMRWRCUmtRc1RVRkZUenRCUVVOTWFrTXNZVUZCVTJkRExFOUJRVTlvUXl4TlFVRlFMRU5CUVZRN1FVRkRRU3hSUVVGSlFTeFRRVUZUYVVNc1UwRkJZaXhGUVVGM1FqdEJRVU4wUW1wRExHVkJRVk5wUXl4VFFVRlVPMEZCUTBRN1FVRkRSanM3UVVGRlJEdEJRVU5CTEUxQlFVbERMRk5CUVZOS0xFOUJRVTg1UWl4TlFVRndRanRCUVVOQmQwSXNVMEZCVDFVc1UwRkJVeXhEUVVGVUxFdEJRV1VzUTBGQmRFSXNSVUZCZVVJc2IwSkJRWHBDT3p0QlFVVkJMRTFCUVVsc1F5eFRRVUZUYTBNc1UwRkJVeXhEUVVGMFFpeEZRVUY1UWp0QlFVTjJRbXhETEdGQlFWTnJReXhUUVVGVExFTkJRV3hDTzBGQlEwUTdRVUZEUkN4UFFVRkxMRWxCUVVrMVFpeEpRVUZKTEVOQlFXSXNSVUZCWjBKQkxFbEJRVWxPTEUxQlFYQkNMRVZCUVRSQ1RTeEhRVUUxUWl4RlFVRnBRenRCUVVNdlFpeFJRVUZKTmtJc1QwRkJUME1zVTBGQlUwNHNUMEZCVDA4c1RVRkJVQ3hEUVVGakwwSXNTVUZCU1N4RFFVRnNRaXhGUVVGeFFpeERRVUZ5UWl4RFFVRlVMRVZCUVd0RExFVkJRV3hETEVOQlFWZzdRVUZEUVd0Q0xGZEJRVThzUTBGQlEyTXNUVUZCVFVnc1NVRkJUaXhEUVVGU0xFVkJRWEZDTEc5Q1FVRnlRanRCUVVOQkwwTXNVVUZCU1RKRExGTkJRVk42UWl4RFFVRmlMRWxCUVd0Q05rSXNTVUZCYkVJN1FVRkRSRHRCUVVORWNFUXNVMEZCVDNkRUxHRkJRVkFzUjBGQmRVSnFReXhKUVVGSkxFTkJRVE5DTzBGQlEwRXNVMEZCVDBFc1EwRkJVRHRCUVVORU96dEJRVVZFTEZOQlFWTnJReXhWUVVGVUxFTkJRWEZDY0VRc1IwRkJja0lzUlVGQk1FSXdReXhOUVVFeFFpeEZRVUZyUTBNc1RVRkJiRU1zUlVGQk1FTXZRaXhOUVVFeFF5eEZRVUZyUkR0QlFVTm9SQ3hOUVVGSmVVTXNaVUZCWlRGRUxFOUJRVTkzUkN4aFFVRlFMRWRCUTJwQ1J5eFhRVUZYZGtJc1dVRkJXVmNzVFVGQldpeERRVUZZTEVWQlFXZERNVU1zUjBGQmFFTXNSVUZCY1VNeVF5eE5RVUZ5UXl4RlFVRTJReTlDTEUxQlFUZERMRU5CUkVZN1FVRkZRU3hUUVVGUGVVTXNXVUZCVUR0QlFVTkVPenRCUVVWRUxGTkJRVk5GTEZkQlFWUXNRMEZCYzBKMlJDeEhRVUYwUWl4RlFVRXlRakJETEUxQlFUTkNMRVZCUVcxRFF5eE5RVUZ1UXl4RlFVRXlReTlDTEUxQlFUTkRMRVZCUVcxRU8wRkJRMnBFTEUxQlFVbDVReXhsUVVGbE1VUXNUMEZCVDNkRUxHRkJRVkFzUjBGRGFrSkhMRmRCUVZkRkxHRkJRV0ZrTEUxQlFXSXNRMEZCV0N4RlFVRnBRekZETEVkQlFXcERMRVZCUVhORE1rTXNUVUZCZEVNc1JVRkJPRU12UWl4TlFVRTVReXhEUVVSR08wRkJSVUVzVTBGQlQzbERMRmxCUVZBN1FVRkRSRHM3UVVGRlJDeFRRVUZUU1N4WlFVRlVMRU5CUVhWQ2VrUXNSMEZCZGtJc1JVRkJORUl3UXl4TlFVRTFRaXhGUVVGdlEwTXNUVUZCY0VNc1JVRkJORU12UWl4TlFVRTFReXhGUVVGdlJEdEJRVU5zUkN4VFFVRlBNa01zV1VGQldYWkVMRWRCUVZvc1JVRkJhVUl3UXl4TlFVRnFRaXhGUVVGNVFrTXNUVUZCZWtJc1JVRkJhVU12UWl4TlFVRnFReXhEUVVGUU8wRkJRMFE3TzBGQlJVUXNVMEZCVXpoRExGbEJRVlFzUTBGQmRVSXhSQ3hIUVVGMlFpeEZRVUUwUWpCRExFMUJRVFZDTEVWQlFXOURReXhOUVVGd1F5eEZRVUUwUXk5Q0xFMUJRVFZETEVWQlFXOUVPMEZCUTJ4RUxFMUJRVWw1UXl4bFFVRmxNVVFzVDBGQlQzZEVMR0ZCUVZBc1IwRkRha0pITEZkQlFWZDBRaXhqUVVGalZTeE5RVUZrTEVOQlFWZ3NSVUZCYTBNeFF5eEhRVUZzUXl4RlFVRjFRekpETEUxQlFYWkRMRVZCUVN0REwwSXNUVUZCTDBNc1EwRkVSanRCUVVWQkxGTkJRVTk1UXl4WlFVRlFPMEZCUTBRN08wRkJSVVFzVTBGQlUwMHNZVUZCVkN4RFFVRjNRak5FTEVkQlFYaENMRVZCUVRaQ01FTXNUVUZCTjBJc1JVRkJjVU5ETEUxQlFYSkRMRVZCUVRaREwwSXNUVUZCTjBNc1JVRkJjVVE3UVVGRGJrUXNUVUZCU1hsRExHVkJRV1V4UkN4UFFVRlBkMFFzWVVGQlVDeEhRVU5xUWtjc1YwRkJWMDBzWlVGQlpXeENMRTFCUVdZc1EwRkJXQ3hGUVVGdFF6RkRMRWRCUVc1RExFVkJRWGRETWtNc1RVRkJlRU1zUlVGQlowUXZRaXhOUVVGb1JDeERRVVJHTzBGQlJVRXNVMEZCVDNsRExGbEJRVkE3UVVGRFJEczdRVUZGUkRGRUxFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ2RFTXNTMEZCYWtJc1IwRkJlVUlzVlVGQlZXMUNMRTFCUVZZc1JVRkJhMEpETEUxQlFXeENMRVZCUVRCQ0wwSXNUVUZCTVVJc1JVRkJhME5LTEZGQlFXeERMRVZCUVRSRE8wRkJRMjVGTzBGQlEwRTdRVUZEUVN4TlFVRkpjMFFzVTBGQlUyNUNMRTFCUVZRc1EwRkJTaXhGUVVGelFqdEJRVU53UWl4UlFVRkpMRU5CUVVOdFFpeFRRVUZUYkVRc1RVRkJWQ3hEUVVGTUxFVkJRWFZDTzBGQlEzSkNTaXhwUWtGQlYwa3NUVUZCV0R0QlFVTkJRU3hsUVVGVFowSXNVMEZCVkR0QlFVTkVPMEZCUTBZc1IwRk1SQ3hOUVV0UE8wRkJRVWM3UVVGRFVpeFJRVUZKYlVNc1QwRkJUM1pFTEZGQlFWZzdRVUZEUVVFc1pVRkJWMjFETEUxQlFWZzdRVUZEUVVFc1lVRkJVeTlDTEUxQlFWUTdRVUZEUVVFc1lVRkJVMjFFTEVsQlFWUTdRVUZEUkRzN1FVRkZSSEJDTEZkQlFWTkRMRTlCUVU5RUxFMUJRVkFzUzBGQmEwSXNRMEZCTTBJN1FVRkRRU3hOUVVGSlJTeFpRVUZaTEV0QlFVdHFReXhOUVVGTUxFZEJRV01yUWl4TlFVRTVRanRCUVVOQkxFMUJRVWtzUTBGQlF5OUNMRTFCUVV3c1JVRkJZVHRCUVVOWVFTeGhRVUZUYVVNc1UwRkJWRHRCUVVORUxFZEJSa1FzVFVGRlR6dEJRVU5NYWtNc1lVRkJVMmRETEU5QlFVOW9ReXhOUVVGUUxFTkJRVlE3UVVGRFFTeFJRVUZKUVN4VFFVRlRhVU1zVTBGQllpeEZRVUYzUWp0QlFVTjBRbXBETEdWQlFWTnBReXhUUVVGVU8wRkJRMFE3UVVGRFJqdEJRVU5FY2tNc1lVRkJWMmxDTEU5QlFVOXFRaXhaUVVGWkxFMUJRVzVDTEVWQlFUSkNhMElzVjBGQk0wSXNSVUZCV0RzN1FVRkZRU3hOUVVGSlNTeEhRVUZLTzBGQlEwRXNWVUZCVVhSQ0xGRkJRVkk3UVVGRFJTeFRRVUZMTEV0QlFVdzdRVUZEUlhOQ0xGbEJRVTFYTEZWQlFWVXNTVUZCVml4RlFVRm5Ra01zVFVGQmFFSXNSVUZCZDBKRExFMUJRWGhDTEVWQlFXZERMMElzVFVGQmFFTXNRMEZCVGp0QlFVTkJPMEZCUTBZc1UwRkJTeXhOUVVGTU8wRkJRMEVzVTBGQlN5eFBRVUZNTzBGQlEwVnJRaXhaUVVGTmMwSXNWMEZCVnl4SlFVRllMRVZCUVdsQ1ZpeE5RVUZxUWl4RlFVRjVRa01zVFVGQmVrSXNSVUZCYVVNdlFpeE5RVUZxUXl4RFFVRk9PMEZCUTBFN1FVRkRSaXhUUVVGTExFOUJRVXc3UVVGRFJXdENMRmxCUVUxNVFpeFpRVUZaTEVsQlFWb3NSVUZCYTBKaUxFMUJRV3hDTEVWQlFUQkNReXhOUVVFeFFpeEZRVUZyUXk5Q0xFMUJRV3hETEVOQlFVNDdRVUZEUVR0QlFVTkdMRk5CUVVzc1VVRkJURHRCUVVORmEwSXNXVUZCVFRKQ0xHRkJRV0VzU1VGQllpeEZRVUZ0UW1Zc1RVRkJia0lzUlVGQk1rSkRMRTFCUVROQ0xFVkJRVzFETDBJc1RVRkJia01zUTBGQlRqdEJRVU5CTzBGQlEwWXNVMEZCU3l4UlFVRk1PMEZCUTBWclFpeFpRVUZOTkVJc1lVRkJZU3hKUVVGaUxFVkJRVzFDYUVJc1RVRkJia0lzUlVGQk1rSkRMRTFCUVROQ0xFVkJRVzFETDBJc1RVRkJia01zUTBGQlRqdEJRVU5CTzBGQlEwWXNVMEZCU3l4TlFVRk1PMEZCUTBFc1UwRkJTeXhQUVVGTU8wRkJRMEVzVTBGQlN5eFRRVUZNTzBGQlEwRXNVMEZCU3l4VlFVRk1PMEZCUTBWclFpeFpRVUZOTmtJc1kwRkJZeXhKUVVGa0xFVkJRVzlDYWtJc1RVRkJjRUlzUlVGQk5FSkRMRTFCUVRWQ0xFVkJRVzlETDBJc1RVRkJjRU1zUTBGQlRqdEJRVU5CTzBGQlEwWTdRVUZEUlN4WlFVRk5MRWxCUVVsSExFdEJRVW9zUTBGQlZTeHJRa0ZCVml4RFFVRk9PMEZCZUVKS08wRkJNRUpCTEZOQlFVOWxMRWRCUVZBN1FVRkRSQ3hEUVhaRVJEczdRVUY1UkVGdVF5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFrY3NVVUZCYWtJc1IwRkJORUlzVlVGQlZYaEVMRkZCUVZZc1JVRkJiMEo1UkN4TFFVRndRaXhGUVVFeVFrTXNSMEZCTTBJc1JVRkJaME03UVVGRE1VUXNUVUZCU1VNc1QwRkJUeXhKUVVGWU96dEJRVVZCTTBRc1lVRkJWMmxDTEU5QlFVOXFRaXhaUVVGWkxFMUJRVzVDTEVWQlFUSkNhMElzVjBGQk0wSXNSVUZCV0R0QlFVTkJkVU1zVlVGQlVYSkNMRTlCUVU5eFFpeExRVUZRTEV0QlFXbENMRU5CUVhwQ08wRkJRMEZETEZGQlFVOUJMRkZCUVZGMFF5eFRRVUZVTEVkQlEwWm5RaXhQUVVGUGMwSXNSMEZCVUN4RFFVUkZMRWRCUlVaQkxFMUJRVTFETEV0QlFVdDJSQ3hOUVVabU96dEJRVWxCTzBGQlEwRXNUVUZCU1hORUxGRkJRVkZFTEV0QlFWb3NSVUZEUlN4UFFVRlBMRVZCUVZBN08wRkJSVVlzVFVGQlNXNURMRWRCUVVvN1FVRkRRU3hWUVVGUmRFSXNVVUZCVWp0QlFVTkZMRk5CUVVzc1MwRkJURHRCUVVORmMwSXNXVUZCVFhORExGVkJRVlZFTEVsQlFWWXNSVUZCWjBKR0xFdEJRV2hDTEVWQlFYVkNReXhIUVVGMlFpeERRVUZPTzBGQlEwRTdRVUZEUml4VFFVRkxMRTFCUVV3N1FVRkRRU3hUUVVGTExFOUJRVXc3UVVGRFJYQkRMRmxCUVUxMVF5eFhRVUZYUml4SlFVRllMRVZCUVdsQ1JpeExRVUZxUWl4RlFVRjNRa01zUjBGQmVFSXNRMEZCVGp0QlFVTkJPMEZCUTBZc1UwRkJTeXhQUVVGTU8wRkJRMFZ3UXl4WlFVRk5kME1zV1VGQldVZ3NTVUZCV2l4RlFVRnJRa1lzUzBGQmJFSXNSVUZCZVVKRExFZEJRWHBDTEVOQlFVNDdRVUZEUVR0QlFVTkdMRk5CUVVzc1VVRkJURHRCUVVORmNFTXNXVUZCVFhsRExHRkJRV0ZLTEVsQlFXSXNSVUZCYlVKR0xFdEJRVzVDTEVWQlFUQkNReXhIUVVFeFFpeERRVUZPTzBGQlEwRTdRVUZEUml4VFFVRkxMRkZCUVV3N1FVRkRSWEJETEZsQlFVMHdReXhoUVVGaFRDeEpRVUZpTEVWQlFXMUNSaXhMUVVGdVFpeEZRVUV3UWtNc1IwRkJNVUlzUTBGQlRqdEJRVU5CTzBGQlEwWXNVMEZCU3l4TlFVRk1PMEZCUTBFc1UwRkJTeXhQUVVGTU8wRkJRMEVzVTBGQlN5eFRRVUZNTzBGQlEwRXNVMEZCU3l4VlFVRk1PMEZCUTBWd1F5eFpRVUZOTWtNc1kwRkJZMDRzU1VGQlpDeEZRVUZ2UWtZc1MwRkJjRUlzUlVGQk1rSkRMRWRCUVROQ0xFTkJRVTQ3UVVGRFFUdEJRVU5HTzBGQlEwVXNXVUZCVFN4SlFVRkpia1FzUzBGQlNpeERRVUZWTEd0Q1FVRldMRU5CUVU0N1FVRjRRa283UVVFd1FrRXNVMEZCVDJVc1IwRkJVRHRCUVVORUxFTkJla05FT3p0QlFUSkRRVzVETEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDWVN4TlFVRnFRaXhIUVVFd1FpeFpRVUZaTzBGQlEzQkRMRk5CUVU4N1FVRkRUR2hGTEZWQlFVMHNVVUZFUkR0QlFVVk1hVVVzVlVGQlRVTXNUVUZCVFdZc1UwRkJUaXhEUVVGblFtZENMRXRCUVdoQ0xFTkJRWE5DUXl4SlFVRjBRaXhEUVVFeVFpeExRVUZMUXl4SlFVRk1MRWxCUVdFc1NVRkJlRU1zUlVGQk9FTXNRMEZCT1VNN1FVRkdSQ3hIUVVGUU8wRkJTVVFzUTBGTVJEczdRVUZQUVR0QlFVTkJjRVlzVDBGQlQydEZMRk5CUVZBc1EwRkJhVUp5UWl4SlFVRnFRaXhIUVVGM1FpeFZRVUZWZDBNc1RVRkJWaXhGUVVGclFrTXNXVUZCYkVJc1JVRkJaME5vUWl4TFFVRm9ReXhGUVVGMVEwTXNSMEZCZGtNc1JVRkJORU03UVVGRGJFVXNUVUZCU1dkQ0xGTkJRVk1zU1VGQllqczdRVUZGUVN4TlFVRkpMRU5CUVVOcVFpeExRVUZNTEVWQlFWbEJMRkZCUVZFc1EwRkJVanRCUVVOYUxFMUJRVWtzUTBGQlEwTXNSMEZCUkN4SlFVRlJRU3hSUVVGUkxFTkJRWEJDTEVWQlFYVkNRU3hOUVVGTkxFdEJRVXQwUkN4TlFVRllPMEZCUTNaQ0xFMUJRVWtzUTBGQlEzRkZMRmxCUVV3c1JVRkJiVUpCTEdWQlFXVXNRMEZCWmpzN1FVRkZia0k3UVVGRFFTeE5RVUZKWml4UlFVRlJSQ3hMUVVGYUxFVkJRVzFDTzBGQlEyNUNMRTFCUVVsbExFOUJRVTl3UlN4TlFVRlFMRXRCUVd0Q0xFTkJRV3hDTEVsQlFYVkNjMFVzVDBGQlQzUkZMRTFCUVZBc1MwRkJhMElzUTBGQk4wTXNSVUZCWjBRN08wRkJSV2hFTzBGQlEwRjNRaXhUUVVGUE9FSXNUMEZCVDBRc1MwRkJaQ3hGUVVGeFFpeDVRa0ZCY2tJN1FVRkRRVGRDTEZOQlFVODJReXhuUWtGQlowSXNRMEZCYUVJc1NVRkJjVUpCTEdWQlFXVkVMRTlCUVU5d1JTeE5RVUZzUkN4RlFVTkpMREpDUVVSS08wRkJSVUYzUWl4VFFVRlBOa0lzVTBGQlV5eERRVUZVTEVsQlFXTkJMRkZCUVZGcFFpeFBRVUZQZEVVc1RVRkJjRU1zUlVGQk5FTXNNa0pCUVRWRE8wRkJRMEYzUWl4VFFVRlBPRUlzVDBGQlR5eERRVUZRTEVsQlFWbEJMRTlCUVU5blFpeFBRVUZQZEVVc1RVRkJha01zUlVGQmVVTXNlVUpCUVhwRE96dEJRVVZCTzBGQlEwRXNUVUZCU1hORUxFMUJRVTBzUzBGQlMzUkVMRTFCUVdZc1JVRkRSWE5FTEUxQlFVMHNTMEZCUzNSRUxFMUJRVmc3UVVGRFJpeE5RVUZKYjBVc1QwRkJUM0JGTEUxQlFWQXNSMEZCWjBKeFJTeFpRVUZvUWl4SFFVRXJRbVlzVFVGQlRVUXNTMEZCZWtNc1JVRkRSVU1zVFVGQlRXTXNUMEZCVDNCRkxFMUJRVkFzUjBGQlowSnhSU3haUVVGb1FpeEhRVUVyUW1oQ0xFdEJRWEpET3p0QlFVVkdMRTFCUVVsclFpeE5RVUZOYWtJc1RVRkJUVVFzUzBGQmFFSTdPMEZCUlVFc1RVRkJTV3RDTEUxQlFVMHNSMEZCVGl4SlFVRmhMRU5CUVVONFJpeFBRVUZQU1N4bFFVRjZRaXhGUVVFd1F6dEJRVU40UXl4VFFVRkxMRWxCUVVsdFFpeEpRVUZKTEVOQlFXSXNSVUZCWjBKQkxFbEJRVWxwUlN4SFFVRndRaXhGUVVGNVFtcEZMRWRCUVhwQ08wRkJRMFU0UkN4aFFVRlBPVVFzU1VGQlNTdEVMRmxCUVZnc1NVRkJNa0lzUzBGQlN5OUVMRWxCUVVrclF5eExRVUZVTEVOQlFUTkNPMEZCUkVZN1FVRkZSQ3hIUVVoRUxFMUJSMDg3UVVGRFRHVXNWMEZCVHpkRUxFbEJRVkFzUTBGQldTeExRVUZMWkN4UlFVRk1MRU5CUVdNMFJDeExRVUZrTEVWQlFYRkNRU3hSUVVGUmEwSXNSMEZCTjBJc1EwRkJXaXhGUVVFclEwWXNXVUZCTDBNN1FVRkRSRHRCUVVOR0xFTkJhRU5FT3p0QlFXdERRU3hUUVVGVFZDeFpRVUZVTEVOQlFYVkNlRVVzUjBGQmRrSXNSVUZCTkVKcFJTeExRVUUxUWl4RlFVRnRRME1zUjBGQmJrTXNSVUZCZDBNN1FVRkRkRU1zVFVGQlNVUXNWVUZCVlN4RFFVRldMRWxCUVdWRExGRkJRVkZzUlN4SlFVRkpXU3hOUVVFdlFpeEZRVUYxUXp0QlFVTnlReXhYUVVGUGNrSXNUMEZCVHpaR0xHRkJRVkFzUTBGQmNVSndSaXhIUVVGeVFpeERRVUZRTzBGQlEwUXNSMEZHUkN4TlFVVlBPMEZCUTB3c1YwRkJUMVFzVDBGQlR6WkdMR0ZCUVZBc1EwRkJjVUp3Uml4SlFVRkpOa1VzUzBGQlNpeERRVUZWV2l4TFFVRldMRVZCUVdsQ1F5eEhRVUZxUWl4RFFVRnlRaXhEUVVGUU8wRkJRMFE3UVVGRFJqczdRVUZGUkN4VFFVRlRSeXhWUVVGVUxFTkJRWEZDY2tVc1IwRkJja0lzUlVGQk1FSnBSU3hMUVVFeFFpeEZRVUZwUTBNc1IwRkJha01zUlVGQmMwTTdRVUZEY0VNc1RVRkJTVzFDTEUxQlFVMHNSVUZCVmp0QlFVTkJMRTFCUVVsRExFMUJRVTBzUlVGQlZqdEJRVU5CY0VJc1VVRkJUWEZDTEV0QlFVdERMRWRCUVV3c1EwRkJVM2hHTEVsQlFVbFpMRTFCUVdJc1JVRkJjVUp6UkN4SFFVRnlRaXhEUVVGT096dEJRVVZCTEU5QlFVc3NTVUZCU1doRUxFbEJRVWtyUXl4TFFVRmlMRVZCUVc5Q0wwTXNTVUZCU1dkRUxFZEJRWGhDTEVWQlFUWkNhRVFzUjBGQk4wSXNSVUZCYTBNN1FVRkRhRU1zVVVGQlNXeENMRWxCUVVsclFpeERRVUZLTEV0QlFWVXNTVUZCWkN4RlFVRnZRanRCUVVOc1FtMUZMR0ZCUVU5SkxHVkJRV1ZJTEVkQlFXWXNTVUZCYzBJM1JDeFBRVUZQYVVVc1dVRkJVQ3hEUVVGdlFqRkdMRWxCUVVsclFpeERRVUZLTEVOQlFYQkNMRU5CUVRkQ08wRkJRMEZ2UlN4WlFVRk5MRVZCUVU0N1FVRkRSQ3hMUVVoRUxFMUJSMDg3UVVGRFRFRXNZVUZCVHl4TlFVRk5kRVlzU1VGQlNXdENMRU5CUVVvc1JVRkJUemhETEZGQlFWQXNRMEZCWjBJc1JVRkJhRUlzUTBGQllqdEJRVU5FTzBGQlEwWTdPMEZCUlVRc1UwRkJUM0ZDTEUxQlFVMUpMR1ZCUVdWSUxFZEJRV1lzUTBGQllqdEJRVU5FT3p0QlFVVkVMRk5CUVZOb1FpeFhRVUZVTEVOQlFYTkNkRVVzUjBGQmRFSXNSVUZCTWtKcFJTeExRVUV6UWl4RlFVRnJRME1zUjBGQmJFTXNSVUZCZFVNN1FVRkRja01zVFVGQlNYQkRMRTFCUVUwc1JVRkJWanRCUVVOQmIwTXNVVUZCVFhGQ0xFdEJRVXRETEVkQlFVd3NRMEZCVTNoR0xFbEJRVWxaTEUxQlFXSXNSVUZCY1VKelJDeEhRVUZ5UWl4RFFVRk9PenRCUVVWQkxFOUJRVXNzU1VGQlNXaEVMRWxCUVVrclF5eExRVUZpTEVWQlFXOUNMME1zU1VGQlNXZEVMRWRCUVhoQ0xFVkJRVFpDYUVRc1IwRkJOMEk3UVVGRFJWa3NWMEZCVDB3c1QwRkJUMmxGTEZsQlFWQXNRMEZCYjBJeFJpeEpRVUZKYTBJc1EwRkJTaXhEUVVGd1FpeERRVUZRTzBGQlJFWXNSMEZGUVN4UFFVRlBXU3hIUVVGUU8wRkJRMFE3TzBGQlJVUXNVMEZCVTNsRExGbEJRVlFzUTBGQmRVSjJSU3hIUVVGMlFpeEZRVUUwUW1sRkxFdEJRVFZDTEVWQlFXMURReXhIUVVGdVF5eEZRVUYzUXp0QlFVTjBReXhUUVVGUFNTeFpRVUZaZEVVc1IwRkJXaXhGUVVGcFFtbEZMRXRCUVdwQ0xFVkJRWGRDUXl4SFFVRjRRaXhEUVVGUU8wRkJRMFE3TzBGQlJVUXNVMEZCVTBVc1UwRkJWQ3hEUVVGdlFuQkZMRWRCUVhCQ0xFVkJRWGxDYVVVc1MwRkJla0lzUlVGQlowTkRMRWRCUVdoRExFVkJRWEZETzBGQlEyNURMRTFCUVVscFFpeE5RVUZOYmtZc1NVRkJTVmtzVFVGQlpEczdRVUZGUVN4TlFVRkpMRU5CUVVOeFJDeExRVUZFTEVsQlFWVkJMRkZCUVZFc1EwRkJkRUlzUlVGQmVVSkJMRkZCUVZFc1EwRkJVanRCUVVONlFpeE5RVUZKTEVOQlFVTkRMRWRCUVVRc1NVRkJVVUVzVFVGQlRTeERRVUZrTEVsQlFXMUNRU3hOUVVGTmFVSXNSMEZCTjBJc1JVRkJhME5xUWl4TlFVRk5hVUlzUjBGQlRqczdRVUZGYkVNc1RVRkJTVkVzVFVGQlRTeEZRVUZXTzBGQlEwRXNUMEZCU3l4SlFVRkpla1VzU1VGQlNTdERMRXRCUVdJc1JVRkJiMEl2UXl4SlFVRkpaMFFzUjBGQmVFSXNSVUZCTmtKb1JDeEhRVUUzUWl4RlFVRnJRenRCUVVOb1EzbEZMRmRCUVU5RExFMUJRVTAxUml4SlFVRkphMElzUTBGQlNpeERRVUZPTEVOQlFWQTdRVUZEUkR0QlFVTkVMRk5CUVU5NVJTeEhRVUZRTzBGQlEwUTdPMEZCUlVRc1UwRkJVMnhDTEdGQlFWUXNRMEZCZDBKNlJTeEhRVUY0UWl4RlFVRTJRbWxGTEV0QlFUZENMRVZCUVc5RFF5eEhRVUZ3UXl4RlFVRjVRenRCUVVOMlF5eE5RVUZKTWtJc1VVRkJVVGRHTEVsQlFVazJSU3hMUVVGS0xFTkJRVlZhTEV0QlFWWXNSVUZCYVVKRExFZEJRV3BDTEVOQlFWbzdRVUZEUVN4TlFVRkpiVUlzVFVGQlRTeEZRVUZXTzBGQlEwRXNUMEZCU3l4SlFVRkpia1VzU1VGQlNTeERRVUZpTEVWQlFXZENRU3hKUVVGSk1rVXNUVUZCVFdwR0xFMUJRVEZDTEVWQlFXdERUU3hMUVVGTExFTkJRWFpETEVWQlFUQkRPMEZCUTNoRGJVVXNWMEZCVHpWRUxFOUJRVTlwUlN4WlFVRlFMRU5CUVc5Q1J5eE5RVUZOTTBVc1EwRkJUaXhKUVVGWE1rVXNUVUZCVFRORkxFbEJRVVVzUTBGQlVpeEpRVUZoTEVkQlFUVkRMRU5CUVZBN1FVRkRSRHRCUVVORUxGTkJRVTl0UlN4SFFVRlFPMEZCUTBRN08wRkJSVVF4Uml4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW1kQ0xFdEJRV3BDTEVkQlFYbENMRlZCUVZWYUxFdEJRVllzUlVGQmFVSkRMRWRCUVdwQ0xFVkJRWE5DTzBGQlF6ZERMRTFCUVVscFFpeE5RVUZOTEV0QlFVdDJSU3hOUVVGbU8wRkJRMEZ4UkN4VlFVRlJOa0lzVFVGQlRUZENMRXRCUVU0c1JVRkJZV3RDTEVkQlFXSXNSVUZCYTBJc1EwRkJiRUlzUTBGQlVqdEJRVU5CYWtJc1VVRkJUVFJDTEUxQlFVMDFRaXhIUVVGT0xFVkJRVmRwUWl4SFFVRllMRVZCUVdkQ1FTeEhRVUZvUWl4RFFVRk9PenRCUVVWQkxFMUJRVWw0Uml4UFFVRlBTU3hsUVVGWUxFVkJRVFJDTzBGQlF6RkNMRmRCUVU5S0xFOUJRVTl4UWl4UlFVRlFMRU5CUVdkQ0xFdEJRVXRZTEZGQlFVd3NRMEZCWXpSRUxFdEJRV1FzUlVGQmNVSkRMRWRCUVhKQ0xFTkJRV2hDTEVOQlFWQTdRVUZEUkN4SFFVWkVMRTFCUlU4N1FVRkRUQ3hSUVVGSk5rSXNWMEZCVnpkQ0xFMUJRVTFFTEV0QlFYSkNPMEZCUTBFc1VVRkJTU3RDTEZOQlFWTXNTVUZCU1hKSExFMUJRVW9zUTBGQlYyOUhMRkZCUVZnc1JVRkJjVUp1UlN4VFFVRnlRaXhGUVVGblF5eEpRVUZvUXl4RFFVRmlPMEZCUTBFc1UwRkJTeXhKUVVGSlZpeEpRVUZKTEVOQlFXSXNSVUZCWjBKQkxFbEJRVWsyUlN4UlFVRndRaXhGUVVFNFFqZEZMRWRCUVRsQ0xFVkJRVzFETzBGQlEycERPRVVzWVVGQlR6bEZMRU5CUVZBc1NVRkJXU3hMUVVGTFFTeEpRVUZKSzBNc1MwRkJWQ3hEUVVGYU8wRkJRMFE3UVVGRFJDeFhRVUZQSzBJc1RVRkJVRHRCUVVORU8wRkJRMFlzUTBGbVJEczdRVUZwUWtFN1FVRkRRWEpITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDYjBNc1IwRkJha0lzUjBGQmRVSXNWVUZCVlhSRUxFMUJRVllzUlVGQmEwSTdRVUZEZGtOMVJDeFZRVUZSUXl4SFFVRlNMRU5CUVZrc01rUkJRVm83UVVGRFFTeFRRVUZQTEV0QlFVczNSU3hUUVVGTUxFTkJRV1Z4UWl4TlFVRm1MRU5CUVZBN1FVRkRSQ3hEUVVoRU96dEJRVXRCTzBGQlEwRm9SQ3hQUVVGUGEwVXNVMEZCVUN4RFFVRnBRblZETEVkQlFXcENMRWRCUVhWQ0xGVkJRVlZETEVOQlFWWXNSVUZCWVRGRUxFMUJRV0lzUlVGQmNVSTdRVUZETVVOMVJDeFZRVUZSUXl4SFFVRlNMRU5CUVZrc01rUkJRVm83UVVGRFFTeFRRVUZQTEV0QlFVdEhMRlZCUVV3c1EwRkJaMEpFTEVOQlFXaENMRVZCUVcxQ01VUXNUVUZCYmtJc1EwRkJVRHRCUVVORUxFTkJTRVE3TzBGQlMwRm9SQ3hQUVVGUGEwVXNVMEZCVUN4RFFVRnBRblpETEZOQlFXcENMRWRCUVRaQ0xGVkJRVlZ4UWl4TlFVRldMRVZCUVd0Q05FUXNVVUZCYkVJc1JVRkJORUk3UVVGRGRrUXNUVUZCU1N4RFFVRkRRU3hSUVVGTUxFVkJRV1U3UVVGRFltNUZMRmRCUVU5UExGZEJRVmRtTEZOQlFWZ3NTVUZCZDBKbExGZEJRVmNzU1VGQk1VTXNSVUZCWjBRc1owSkJRV2hFTzBGQlEwRlFMRmRCUVU5UExGTkJRVk1zUzBGQlN5OUNMRTFCUVhKQ0xFVkJRVFpDTEhGRFFVRTNRanRCUVVORU96dEJRVVZFTEUxQlFVa3JRaXhWUVVGVkxFdEJRVXN2UWl4TlFVRnVRaXhGUVVORk96dEJRVVZHTEZOQlFVOHNTMEZCU3l0Q0xFMUJRVXdzUTBGQlVEdEJRVU5FTEVOQlZrUTdPMEZCV1VFc1UwRkJVelpFTEZkQlFWUXNRMEZCYzBKNFJ5eEhRVUYwUWl4RlFVRXlRakpETEUxQlFUTkNMRVZCUVcxRE9FUXNXVUZCYmtNc1JVRkJhVVJHTEZGQlFXcEVMRVZCUVRKRU8wRkJRM3BFTEUxQlFVa3NRMEZCUTBFc1VVRkJUQ3hGUVVGbE8wRkJRMkp1UlN4WFFVRlBMRTlCUVU5eFJTeFpRVUZRTEV0QlFYZENMRk5CUVM5Q0xFVkJRVEJETERKQ1FVRXhRenRCUVVOQmNrVXNWMEZCVDA4c1YwRkJWMllzVTBGQldDeEpRVUYzUW1Vc1YwRkJWeXhKUVVFeFF5eEZRVUZuUkN4blFrRkJhRVE3UVVGRFFWQXNWMEZCVDA4c1UwRkJVeXhEUVVGVUxFZEJRV0V6UXl4SlFVRkpXU3hOUVVGNFFpeEZRVUZuUXl4eFEwRkJhRU03UVVGRFJEczdRVUZGUkN4TlFVRkpkVVVzVFVGQlRXNUdMRWxCUVVsWkxFMUJRV1E3UVVGRFFTeE5RVUZKSzBJc1ZVRkJWWGRETEVkQlFXUXNSVUZEUlRzN1FVRkZSaXhOUVVGSmRVSXNSMEZCU2p0QlFVTkJMRTFCUVVsRUxGbEJRVW9zUlVGQmEwSTdRVUZEYUVKRExGVkJRVTB4Unl4SlFVRkpNa01zVFVGQlNpeERRVUZPTzBGQlEwRXNVVUZCU1VFc1UwRkJVeXhEUVVGVUxFZEJRV0YzUXl4SFFVRnFRaXhGUVVORmRVSXNUMEZCVHpGSExFbEJRVWt5UXl4VFFVRlRMRU5CUVdJc1MwRkJiVUlzUTBGQk1VSTdRVUZEU0N4SFFVcEVMRTFCU1U4N1FVRkRUQ3RFTEZWQlFVMHhSeXhKUVVGSk1rTXNUVUZCU2l4TFFVRmxMRU5CUVhKQ08wRkJRMEVzVVVGQlNVRXNVMEZCVXl4RFFVRlVMRWRCUVdGM1F5eEhRVUZxUWl4RlFVTkZkVUlzVDBGQlR6RkhMRWxCUVVreVF5eFRRVUZUTEVOQlFXSXNRMEZCVUR0QlFVTklPMEZCUTBRc1UwRkJUeXRFTEVkQlFWQTdRVUZEUkRzN1FVRkZSQzlITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDT0VNc1dVRkJha0lzUjBGQlowTXNWVUZCVldoRkxFMUJRVllzUlVGQmEwSTBSQ3hSUVVGc1FpeEZRVUUwUWp0QlFVTXhSQ3hUUVVGUFF5eFpRVUZaTEVsQlFWb3NSVUZCYTBJM1JDeE5RVUZzUWl4RlFVRXdRaXhKUVVFeFFpeEZRVUZuUXpSRUxGRkJRV2hETEVOQlFWQTdRVUZEUkN4RFFVWkVPenRCUVVsQk5VY3NUMEZCVDJ0RkxGTkJRVkFzUTBGQmFVSXJReXhaUVVGcVFpeEhRVUZuUXl4VlFVRlZha1VzVFVGQlZpeEZRVUZyUWpSRUxGRkJRV3hDTEVWQlFUUkNPMEZCUXpGRUxGTkJRVTlETEZsQlFWa3NTVUZCV2l4RlFVRnJRamRFTEUxQlFXeENMRVZCUVRCQ0xFdEJRVEZDTEVWQlFXbERORVFzVVVGQmFrTXNRMEZCVUR0QlFVTkVMRU5CUmtRN08wRkJTVUVzVTBGQlUwMHNWMEZCVkN4RFFVRnpRamRITEVkQlFYUkNMRVZCUVRKQ01rTXNUVUZCTTBJc1JVRkJiVU00UkN4WlFVRnVReXhGUVVGcFJFWXNVVUZCYWtRc1JVRkJNa1E3UVVGRGVrUXNUVUZCU1N4RFFVRkRRU3hSUVVGTUxFVkJRV1U3UVVGRFltNUZMRmRCUVU4c1QwRkJUM0ZGTEZsQlFWQXNTMEZCZDBJc1UwRkJMMElzUlVGQk1FTXNNa0pCUVRGRE8wRkJRMEZ5UlN4WFFVRlBUeXhYUVVGWFppeFRRVUZZTEVsQlFYZENaU3hYUVVGWExFbEJRVEZETEVWQlFXZEVMR2RDUVVGb1JEdEJRVU5CVUN4WFFVRlBUeXhUUVVGVExFTkJRVlFzUjBGQllUTkRMRWxCUVVsWkxFMUJRWGhDTEVWQlFXZERMSEZEUVVGb1F6dEJRVU5FT3p0QlFVVkVMRTFCUVVsMVJTeE5RVUZOYmtZc1NVRkJTVmtzVFVGQlpEdEJRVU5CTEUxQlFVa3JRaXhWUVVGVmQwTXNSMEZCWkN4RlFVTkZPenRCUVVWR0xFMUJRVWwxUWl4SFFVRktPMEZCUTBFc1RVRkJTVVFzV1VGQlNpeEZRVUZyUWp0QlFVTm9RaXhSUVVGSk9VUXNVMEZCVXl4RFFVRlVMRWRCUVdGM1F5eEhRVUZxUWl4RlFVTkZkVUlzVFVGQlRURkhMRWxCUVVreVF5eFRRVUZUTEVOQlFXSXNTMEZCYlVJc1JVRkJla0k3UVVGRFJpeFJRVUZKUVN4VFFVRlRMRU5CUVZRc1IwRkJZWGRETEVkQlFXcENMRVZCUTBWMVFpeFBRVUZQTVVjc1NVRkJTVEpETEZOQlFWTXNRMEZCWWl4TFFVRnRRaXhEUVVFeFFqdEJRVU5HSzBRc1YwRkJUekZITEVsQlFVa3lReXhOUVVGS0xFTkJRVkE3UVVGRFFTeFJRVUZKUVN4VFFVRlRMRU5CUVZRc1IwRkJZWGRETEVkQlFXcENMRVZCUTBWMVFpeE5RVUZOUVN4UFFVRlBNVWNzU1VGQlNUSkRMRk5CUVZNc1EwRkJZaXhMUVVGdFFpeEZRVUZ1UWl4TFFVRXdRaXhEUVVGcVF5eERRVUZPTzBGQlEwZ3NSMEZTUkN4TlFWRlBPMEZCUTB3c1VVRkJTVUVzVTBGQlV5eERRVUZVTEVkQlFXRjNReXhIUVVGcVFpeEZRVU5GZFVJc1RVRkJUVEZITEVsQlFVa3lReXhUUVVGVExFTkJRV0lzUzBGQmJVSXNSVUZCZWtJN1FVRkRSaXhSUVVGSlFTeFRRVUZUTEVOQlFWUXNSMEZCWVhkRExFZEJRV3BDTEVWQlEwVjFRaXhQUVVGUE1VY3NTVUZCU1RKRExGTkJRVk1zUTBGQllpeExRVUZ0UWl4RFFVRXhRanRCUVVOR0xGRkJRVWxCTEZOQlFWTXNRMEZCVkN4SFFVRmhkME1zUjBGQmFrSXNSVUZEUlhWQ0xFOUJRVTh4Unl4SlFVRkpNa01zVTBGQlV5eERRVUZpTEVOQlFWQTdRVUZEUml0RUxGVkJRVTFCTEU5QlFVOHhSeXhKUVVGSk1rTXNUVUZCU2l4TFFVRmxMRVZCUVdZc1MwRkJjMElzUTBGQk4wSXNRMEZCVGp0QlFVTkVPMEZCUTBRc1UwRkJUeXRFTEVkQlFWQTdRVUZEUkRzN1FVRkZSQzlITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDYVVRc1dVRkJha0lzUjBGQlowTXNWVUZCVlc1RkxFMUJRVllzUlVGQmEwSTBSQ3hSUVVGc1FpeEZRVUUwUWp0QlFVTXhSQ3hUUVVGUFRTeFpRVUZaTEVsQlFWb3NSVUZCYTBKc1JTeE5RVUZzUWl4RlFVRXdRaXhKUVVFeFFpeEZRVUZuUXpSRUxGRkJRV2hETEVOQlFWQTdRVUZEUkN4RFFVWkVPenRCUVVsQk5VY3NUMEZCVDJ0RkxGTkJRVkFzUTBGQmFVSnJSQ3haUVVGcVFpeEhRVUZuUXl4VlFVRlZjRVVzVFVGQlZpeEZRVUZyUWpSRUxGRkJRV3hDTEVWQlFUUkNPMEZCUXpGRUxGTkJRVTlOTEZsQlFWa3NTVUZCV2l4RlFVRnJRbXhGTEUxQlFXeENMRVZCUVRCQ0xFdEJRVEZDTEVWQlFXbERORVFzVVVGQmFrTXNRMEZCVUR0QlFVTkVMRU5CUmtRN08wRkJTVUUxUnl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW0xRUxGRkJRV3BDTEVkQlFUUkNMRlZCUVZWeVJTeE5RVUZXTEVWQlFXdENORVFzVVVGQmJFSXNSVUZCTkVJN1FVRkRkRVFzVFVGQlNTeERRVUZEUVN4UlFVRk1MRVZCUVdVN1FVRkRZbTVGTEZkQlFVOVBMRmRCUVZkbUxGTkJRVmdzU1VGQmQwSmxMRmRCUVZjc1NVRkJNVU1zUlVGRFNTeG5Ra0ZFU2p0QlFVVkJVQ3hYUVVGUFR5eFRRVUZUTEV0QlFVc3ZRaXhOUVVGeVFpeEZRVUUyUWl4eFEwRkJOMEk3UVVGRFJEczdRVUZGUkN4TlFVRkpLMElzVlVGQlZTeExRVUZMTDBJc1RVRkJia0lzUlVGRFJUczdRVUZGUml4TlFVRkpjVWNzVFVGQlRTeExRVUZMZEVVc1RVRkJUQ3hKUVVGbExFbEJRWHBDTzBGQlEwRXNUVUZCU1hORkxFZEJRVW9zUlVGRFJTeFBRVUZQTEVOQlFVTXNUMEZCVHl4TFFVRkxkRVVzVFVGQlRDeERRVUZRTEVkQlFYTkNMRU5CUVhaQ0xFbEJRVFJDTEVOQlFVTXNRMEZCY0VNc1EwRkVSaXhMUVVkRkxFOUJRVThzUzBGQlMwRXNUVUZCVEN4RFFVRlFPMEZCUTBnc1EwRm1SRHM3UVVGcFFrRXNVMEZCVTNWRkxGVkJRVlFzUTBGQmNVSnNTQ3hIUVVGeVFpeEZRVUV3UWpKRExFMUJRVEZDTEVWQlFXdERPRVFzV1VGQmJFTXNSVUZCWjBSR0xGRkJRV2hFTEVWQlFUQkVPMEZCUTNoRUxFMUJRVWtzUTBGQlEwRXNVVUZCVEN4RlFVRmxPMEZCUTJKdVJTeFhRVUZQTEU5QlFVOXhSU3haUVVGUUxFdEJRWGRDTEZOQlFTOUNMRVZCUVRCRExESkNRVUV4UXp0QlFVTkJja1VzVjBGQlQwOHNWMEZCVjJZc1UwRkJXQ3hKUVVGM1FtVXNWMEZCVnl4SlFVRXhReXhGUVVGblJDeG5Ra0ZCYUVRN1FVRkRRVkFzVjBGQlQwOHNVMEZCVXl4RFFVRlVMRWRCUVdFelF5eEpRVUZKV1N4TlFVRjRRaXhGUVVGblF5eHhRMEZCYUVNN1FVRkRSRHM3UVVGRlJDeE5RVUZKZFVVc1RVRkJUVzVHTEVsQlFVbFpMRTFCUVdRN1FVRkRRU3hOUVVGSkswSXNWVUZCVlhkRExFZEJRV1FzUlVGRFJUczdRVUZGUml4TlFVRkpkVUlzVFVGQlRVWXNXVUZCV1hoSExFZEJRVm9zUlVGQmFVSXlReXhOUVVGcVFpeEZRVUY1UWpoRUxGbEJRWHBDTEVWQlFYVkRMRWxCUVhaRExFTkJRVlk3UVVGRFFTeE5RVUZKVVN4TlFVRk5VQ3hOUVVGTkxFMUJRV2hDTzBGQlEwRXNUVUZCU1U4c1IwRkJTaXhGUVVORkxFOUJRVThzUTBGQlF5eFRRVUZUVUN4SFFVRlVMRWRCUVdVc1EwRkJhRUlzU1VGQmNVSXNRMEZCUXl4RFFVRTNRaXhEUVVSR0xFdEJSMFVzVDBGQlQwRXNSMEZCVUR0QlFVTklPenRCUVVWRUwwY3NUMEZCVDJ0RkxGTkJRVkFzUTBGQmFVSnpSQ3hYUVVGcVFpeEhRVUVyUWl4VlFVRlZlRVVzVFVGQlZpeEZRVUZyUWpSRUxGRkJRV3hDTEVWQlFUUkNPMEZCUTNwRUxGTkJRVTlYTEZkQlFWY3NTVUZCV0N4RlFVRnBRblpGTEUxQlFXcENMRVZCUVhsQ0xFbEJRWHBDTEVWQlFTdENORVFzVVVGQkwwSXNRMEZCVUR0QlFVTkVMRU5CUmtRN08wRkJTVUUxUnl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW5WRUxGZEJRV3BDTEVkQlFTdENMRlZCUVZWNlJTeE5RVUZXTEVWQlFXdENORVFzVVVGQmJFSXNSVUZCTkVJN1FVRkRla1FzVTBGQlQxY3NWMEZCVnl4SlFVRllMRVZCUVdsQ2RrVXNUVUZCYWtJc1JVRkJlVUlzUzBGQmVrSXNSVUZCWjBNMFJDeFJRVUZvUXl4RFFVRlFPMEZCUTBRc1EwRkdSRHM3UVVGSlFTeFRRVUZUWXl4VlFVRlVMRU5CUVhGQ2NrZ3NSMEZCY2tJc1JVRkJNRUl5UXl4TlFVRXhRaXhGUVVGclF6aEVMRmxCUVd4RExFVkJRV2RFUml4UlFVRm9SQ3hGUVVFd1JEdEJRVU40UkN4TlFVRkpMRU5CUVVOQkxGRkJRVXdzUlVGQlpUdEJRVU5pYmtVc1YwRkJUeXhQUVVGUGNVVXNXVUZCVUN4TFFVRjNRaXhUUVVFdlFpeEZRVUV3UXl3eVFrRkJNVU03UVVGRFFYSkZMRmRCUVU5UExGZEJRVmRtTEZOQlFWZ3NTVUZCZDBKbExGZEJRVmNzU1VGQk1VTXNSVUZCWjBRc1owSkJRV2hFTzBGQlEwRlFMRmRCUVU5UExGTkJRVk1zUTBGQlZDeEhRVUZoTTBNc1NVRkJTVmtzVFVGQmVFSXNSVUZCWjBNc2NVTkJRV2hETzBGQlEwUTdPMEZCUlVRc1RVRkJTWFZGTEUxQlFVMXVSaXhKUVVGSldTeE5RVUZrTzBGQlEwRXNUVUZCU1N0Q0xGVkJRVlYzUXl4SFFVRmtMRVZCUTBVN08wRkJSVVlzVFVGQlNYVkNMRTFCUVUxSExGbEJRVmszUnl4SFFVRmFMRVZCUVdsQ01rTXNUVUZCYWtJc1JVRkJlVUk0UkN4WlFVRjZRaXhGUVVGMVF5eEpRVUYyUXl4RFFVRldPMEZCUTBFc1RVRkJTVkVzVFVGQlRWQXNUVUZCVFN4VlFVRm9RanRCUVVOQkxFMUJRVWxQTEVkQlFVb3NSVUZEUlN4UFFVRlBMRU5CUVVNc1lVRkJZVkFzUjBGQllpeEhRVUZ0UWl4RFFVRndRaXhKUVVGNVFpeERRVUZETEVOQlFXcERMRU5CUkVZc1MwRkhSU3hQUVVGUFFTeEhRVUZRTzBGQlEwZzdPMEZCUlVRdlJ5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFubEVMRmRCUVdwQ0xFZEJRU3RDTEZWQlFWVXpSU3hOUVVGV0xFVkJRV3RDTkVRc1VVRkJiRUlzUlVGQk5FSTdRVUZEZWtRc1UwRkJUMk1zVjBGQlZ5eEpRVUZZTEVWQlFXbENNVVVzVFVGQmFrSXNSVUZCZVVJc1NVRkJla0lzUlVGQkswSTBSQ3hSUVVFdlFpeERRVUZRTzBGQlEwUXNRMEZHUkRzN1FVRkpRVFZITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDTUVRc1YwRkJha0lzUjBGQkswSXNWVUZCVlRWRkxFMUJRVllzUlVGQmEwSTBSQ3hSUVVGc1FpeEZRVUUwUWp0QlFVTjZSQ3hUUVVGUFl5eFhRVUZYTEVsQlFWZ3NSVUZCYVVJeFJTeE5RVUZxUWl4RlFVRjVRaXhMUVVGNlFpeEZRVUZuUXpSRUxGRkJRV2hETEVOQlFWQTdRVUZEUkN4RFFVWkVPenRCUVVsQkxGTkJRVk5wUWl4VlFVRlVMRU5CUVhGQ2VFZ3NSMEZCY2tJc1JVRkJNRUl5UXl4TlFVRXhRaXhGUVVGclF6aEVMRmxCUVd4RExFVkJRV2RFUml4UlFVRm9SQ3hGUVVFd1JEdEJRVU40UkN4TlFVRkpMRU5CUVVOQkxGRkJRVXdzUlVGQlpUdEJRVU5pYmtVc1YwRkJUeXhQUVVGUGNVVXNXVUZCVUN4TFFVRjNRaXhUUVVFdlFpeEZRVUV3UXl3eVFrRkJNVU03UVVGRFFYSkZMRmRCUVU5UExGTkJRVk1zUTBGQlZDeEhRVUZoTTBNc1NVRkJTVmtzVFVGQmVFSXNSVUZCWjBNc2NVTkJRV2hETzBGQlEwUTdPMEZCUlVRc1UwRkJUMjVDTEZGQlFWRm5TU3hKUVVGU0xFTkJRV0Y2U0N4SFFVRmlMRVZCUVd0Q01rTXNUVUZCYkVJc1JVRkJNRUk0UkN4WlFVRXhRaXhGUVVGM1F5eEZRVUY0UXl4RlFVRTBReXhEUVVFMVF5eERRVUZRTzBGQlEwUTdPMEZCUlVRNVJ5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFqWkVMRmRCUVdwQ0xFZEJRU3RDTEZWQlFWVXZSU3hOUVVGV0xFVkJRV3RDTkVRc1VVRkJiRUlzUlVGQk5FSTdRVUZEZWtRc1UwRkJUMmxDTEZkQlFWY3NTVUZCV0N4RlFVRnBRamRGTEUxQlFXcENMRVZCUVhsQ0xFbEJRWHBDTEVWQlFTdENORVFzVVVGQkwwSXNRMEZCVUR0QlFVTkVMRU5CUmtRN08wRkJTVUUxUnl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUWpoRUxGZEJRV3BDTEVkQlFTdENMRlZCUVZWb1JpeE5RVUZXTEVWQlFXdENORVFzVVVGQmJFSXNSVUZCTkVJN1FVRkRla1FzVTBGQlQybENMRmRCUVZjc1NVRkJXQ3hGUVVGcFFqZEZMRTFCUVdwQ0xFVkJRWGxDTEV0QlFYcENMRVZCUVdkRE5FUXNVVUZCYUVNc1EwRkJVRHRCUVVORUxFTkJSa1E3TzBGQlNVRXNVMEZCVTNGQ0xGZEJRVlFzUTBGQmMwSTFTQ3hIUVVGMFFpeEZRVUV5UWpKRExFMUJRVE5DTEVWQlFXMURPRVFzV1VGQmJrTXNSVUZCYVVSR0xGRkJRV3BFTEVWQlFUSkVPMEZCUTNwRUxFMUJRVWtzUTBGQlEwRXNVVUZCVEN4RlFVRmxPMEZCUTJKdVJTeFhRVUZQTEU5QlFVOXhSU3haUVVGUUxFdEJRWGRDTEZOQlFTOUNMRVZCUVRCRExESkNRVUV4UXp0QlFVTkJja1VzVjBGQlQwOHNVMEZCVXl4RFFVRlVMRWRCUVdFelF5eEpRVUZKV1N4TlFVRjRRaXhGUVVGblF5eHhRMEZCYUVNN1FVRkRSRHM3UVVGRlJDeFRRVUZQYmtJc1VVRkJVV2RKTEVsQlFWSXNRMEZCWVhwSUxFZEJRV0lzUlVGQmEwSXlReXhOUVVGc1FpeEZRVUV3UWpoRUxGbEJRVEZDTEVWQlFYZERMRVZCUVhoRExFVkJRVFJETEVOQlFUVkRMRU5CUVZBN1FVRkRSRHM3UVVGRlJEbEhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENaMFVzV1VGQmFrSXNSMEZCWjBNc1ZVRkJWV3hHTEUxQlFWWXNSVUZCYTBJMFJDeFJRVUZzUWl4RlFVRTBRanRCUVVNeFJDeFRRVUZQY1VJc1dVRkJXU3hKUVVGYUxFVkJRV3RDYWtZc1RVRkJiRUlzUlVGQk1FSXNTVUZCTVVJc1JVRkJaME0wUkN4UlFVRm9ReXhEUVVGUU8wRkJRMFFzUTBGR1JEczdRVUZKUVRWSExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ2FVVXNXVUZCYWtJc1IwRkJaME1zVlVGQlZXNUdMRTFCUVZZc1JVRkJhMEkwUkN4UlFVRnNRaXhGUVVFMFFqdEJRVU14UkN4VFFVRlBjVUlzV1VGQldTeEpRVUZhTEVWQlFXdENha1lzVFVGQmJFSXNSVUZCTUVJc1MwRkJNVUlzUlVGQmFVTTBSQ3hSUVVGcVF5eERRVUZRTzBGQlEwUXNRMEZHUkRzN1FVRkpRVFZITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDZVVNc1ZVRkJha0lzUjBGQk9FSXNWVUZCVlhsQ0xFdEJRVllzUlVGQmFVSndSaXhOUVVGcVFpeEZRVUY1UWpSRUxGRkJRWHBDTEVWQlFXMURPMEZCUXk5RUxFMUJRVWtzUTBGQlEwRXNVVUZCVEN4RlFVRmxPMEZCUTJKdVJTeFhRVUZQTWtZc1ZVRkJWVzVITEZOQlFWWXNTVUZCZFVKdFJ5eFZRVUZWTEVsQlFYaERMRVZCUVRoRExHVkJRVGxETzBGQlEwRXpSaXhYUVVGUFR5eFhRVUZYWml4VFFVRllMRWxCUVhkQ1pTeFhRVUZYTEVsQlFURkRMRVZCUVdkRUxHZENRVUZvUkR0QlFVTkJVQ3hYUVVGUFR5eFRRVUZUTEV0QlFVc3ZRaXhOUVVGeVFpeEZRVUUyUWl4elEwRkJOMEk3UVVGRFFXOUlMR05CUVZWRUxFdEJRVllzUlVGQmFVSXNTVUZCYWtJN1FVRkRSRHM3UVVGRlJDeE5RVUZKY0VZc1ZVRkJWU3hMUVVGTEwwSXNUVUZCYmtJc1JVRkJNa0k3TzBGQlJUTkNMRTlCUVVzclFpeE5RVUZNTEVsQlFXVnZSaXhMUVVGbU8wRkJRMFFzUTBGWVJEczdRVUZoUVN4VFFVRlRSU3haUVVGVUxFTkJRWFZDYWtrc1IwRkJka0lzUlVGQk5FSXJTQ3hMUVVFMVFpeEZRVUZ0UTNCR0xFMUJRVzVETEVWQlFUSkRPRVFzV1VGQk0wTXNSVUZCZVVSR0xGRkJRWHBFTEVWQlFXMUZPMEZCUTJwRkxFMUJRVWtzUTBGQlEwRXNVVUZCVEN4RlFVRmxPMEZCUTJKdVJTeFhRVUZQTWtZc1ZVRkJWVzVITEZOQlFWWXNTVUZCZFVKdFJ5eFZRVUZWTEVsQlFYaERMRVZCUVRoRExHVkJRVGxETzBGQlEwRXpSaXhYUVVGUExFOUJRVTl4UlN4WlFVRlFMRXRCUVhkQ0xGTkJRUzlDTEVWQlFUQkRMREpDUVVFeFF6dEJRVU5CY2tVc1YwRkJUMDhzVjBGQlYyWXNVMEZCV0N4SlFVRjNRbVVzVjBGQlZ5eEpRVUV4UXl4RlFVRm5SQ3huUWtGQmFFUTdRVUZEUVZBc1YwRkJUMDhzVTBGQlV5eERRVUZVTEVkQlFXRXpReXhKUVVGSldTeE5RVUY0UWl4RlFVRm5ReXh6UTBGQmFFTTdRVUZEUVc5SUxHTkJRVlZFTEV0QlFWWXNSVUZCYVVJc1RVRkJha0k3UVVGRFJEczdRVUZGUkN4TlFVRkpOVU1zVFVGQlRXNUdMRWxCUVVsWkxFMUJRV1E3UVVGRFFTeE5RVUZKSzBJc1ZVRkJWWGRETEVkQlFXUXNSVUZEUlRzN1FVRkZSaXhQUVVGTExFbEJRVWxxUlN4SlFVRkpMRU5CUVZJc1JVRkJWMmRJTEVsQlFVa3pReXhMUVVGTFF5eEhRVUZNTEVOQlFWTk1MRTFCUVUxNFF5eE5RVUZtTEVWQlFYVkNMRU5CUVhaQ0xFTkJRWEJDTEVWQlFTdERla0lzU1VGQlNXZElMRU5CUVc1RUxFVkJRWE5FYUVnc1IwRkJkRVFzUlVGQk1rUTdRVUZEZWtSc1FpeFJRVUZKTWtNc1UwRkJVM3BDTEVOQlFXSXNTVUZEU1N4RFFVRkROa2NzVVVGQlV5eFJRVUZUTEV0QlFVdDBRaXhsUVVGbGRrWXNRMEZCWml4SFFVRnRRaXhKUVVGSlFTeERRVUUxUWl4RFFVRnVRaXhOUVVOSkxFTkJRVU4xUml4bFFVRmxka1lzUTBGQlppeEhRVUZ0UWl4SlFVRkpRU3hEUVVGNFFpeEpRVUUyUWl4RFFVWnlRenRCUVVkRU8wRkJRMFk3TzBGQlJVUjJRaXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRbk5GTEdGQlFXcENMRWRCUVdsRExGVkJRVlZLTEV0QlFWWXNSVUZCYVVKd1JpeE5RVUZxUWl4RlFVRjVRalJFTEZGQlFYcENMRVZCUVcxRE8wRkJRMnhGTUVJc1pVRkJZU3hKUVVGaUxFVkJRVzFDUml4TFFVRnVRaXhGUVVFd1FuQkdMRTFCUVRGQ0xFVkJRV3RETEVsQlFXeERMRVZCUVhkRE5FUXNVVUZCZUVNN1FVRkRSQ3hEUVVaRU96dEJRVWxCTlVjc1QwRkJUMnRGTEZOQlFWQXNRMEZCYVVKMVJTeGhRVUZxUWl4SFFVRnBReXhWUVVGVlRDeExRVUZXTEVWQlFXbENjRVlzVFVGQmFrSXNSVUZCZVVJMFJDeFJRVUY2UWl4RlFVRnRRenRCUVVOc1JUQkNMR1ZCUVdFc1NVRkJZaXhGUVVGdFFrWXNTMEZCYmtJc1JVRkJNRUp3Uml4TlFVRXhRaXhGUVVGclF5eExRVUZzUXl4RlFVRjVRelJFTEZGQlFYcERPMEZCUTBRc1EwRkdSRHM3UVVGSlFTeFRRVUZUT0VJc1dVRkJWQ3hEUVVGMVFuSkpMRWRCUVhaQ0xFVkJRVFJDSzBnc1MwRkJOVUlzUlVGQmJVTndSaXhOUVVGdVF5eEZRVUV5UXpoRUxGbEJRVE5ETEVWQlFYbEVSaXhSUVVGNlJDeEZRVUZ0UlR0QlFVTnFSU3hOUVVGSkxFTkJRVU5CTEZGQlFVd3NSVUZCWlR0QlFVTmlia1VzVjBGQlR6SkdMRlZCUVZWdVJ5eFRRVUZXTEVsQlFYVkNiVWNzVlVGQlZTeEpRVUY0UXl4RlFVRTRReXhsUVVFNVF6dEJRVU5CTTBZc1YwRkJUeXhQUVVGUGNVVXNXVUZCVUN4TFFVRjNRaXhUUVVFdlFpeEZRVUV3UXl3eVFrRkJNVU03UVVGRFFYSkZMRmRCUVU5UExGZEJRVmRtTEZOQlFWZ3NTVUZCZDBKbExGZEJRVmNzU1VGQk1VTXNSVUZCWjBRc1owSkJRV2hFTzBGQlEwRlFMRmRCUVU5UExGTkJRVk1zUTBGQlZDeEhRVUZoTTBNc1NVRkJTVmtzVFVGQmVFSXNSVUZCWjBNc2MwTkJRV2hETzBGQlEwRnZTQ3hqUVVGVlJDeExRVUZXTEVWQlFXbENMRlZCUVdwQ08wRkJRMFE3TzBGQlJVUXNUVUZCU1RWRExFMUJRVTF1Uml4SlFVRkpXU3hOUVVGa08wRkJRMEVzVFVGQlNTdENMRlZCUVZWM1F5eEhRVUZrTEVWQlEwVTdPMEZCUlVZc1QwRkJTeXhKUVVGSmFrVXNTVUZCU1N4RFFVRlNMRVZCUVZkblNDeEpRVUZKTTBNc1MwRkJTME1zUjBGQlRDeERRVUZUVEN4TlFVRk5lRU1zVFVGQlppeEZRVUYxUWl4RFFVRjJRaXhEUVVGd1FpeEZRVUVyUTNwQ0xFbEJRVWxuU0N4RFFVRnVSQ3hGUVVGelJHaElMRWRCUVhSRUxFVkJRVEpFTzBGQlEzcEViRUlzVVVGQlNUSkRMRk5CUVZONlFpeERRVUZpTEVsQlEwczJSeXhWUVVGVkxFTkJRVU4wUWl4bFFVRmxka1lzUTBGQlppeEhRVUZ0UWl4SlFVRkpRU3hEUVVGNFFpeEpRVUUyUWl4RFFVRjRReXhIUVVFMlF5eEpRVVJxUkR0QlFVVkVPMEZCUTBZN08wRkJSVVIyUWl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW5sRkxHRkJRV3BDTEVkQlFXbERMRlZCUVZWUUxFdEJRVllzUlVGQmFVSndSaXhOUVVGcVFpeEZRVUY1UWpSRUxGRkJRWHBDTEVWQlFXMURPMEZCUTJ4Rk9FSXNaVUZCWVN4SlFVRmlMRVZCUVcxQ1RpeExRVUZ1UWl4RlFVRXdRbkJHTEUxQlFURkNMRVZCUVd0RExFbEJRV3hETEVWQlFYZERORVFzVVVGQmVFTTdRVUZEUkN4RFFVWkVPenRCUVVsQk5VY3NUMEZCVDJ0RkxGTkJRVkFzUTBGQmFVSXdSU3hoUVVGcVFpeEhRVUZwUXl4VlFVRlZVaXhMUVVGV0xFVkJRV2xDY0VZc1RVRkJha0lzUlVGQmVVSTBSQ3hSUVVGNlFpeEZRVUZ0UXp0QlFVTnNSVGhDTEdWQlFXRXNTVUZCWWl4RlFVRnRRazRzUzBGQmJrSXNSVUZCTUVKd1JpeE5RVUV4UWl4RlFVRnJReXhMUVVGc1F5eEZRVUY1UXpSRUxGRkJRWHBETzBGQlEwUXNRMEZHUkRzN1FVRkpRVFZITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDTWtVc1UwRkJha0lzUjBGQk5rSXNWVUZCVlZRc1MwRkJWaXhGUVVGcFFuQkdMRTFCUVdwQ0xFVkJRWGxDTkVRc1VVRkJla0lzUlVGQmJVTTdRVUZET1VRc1RVRkJTU3hEUVVGRFFTeFJRVUZNTEVWQlFXVTdRVUZEWW01RkxGZEJRVTh5Uml4VlFVRlZia2NzVTBGQlZpeEpRVUYxUW0xSExGVkJRVlVzU1VGQmVFTXNSVUZCT0VNc1pVRkJPVU03UVVGRFFUTkdMRmRCUVU5UExGZEJRVmRtTEZOQlFWZ3NTVUZCZDBKbExGZEJRVmNzU1VGQk1VTXNSVUZCWjBRc1owSkJRV2hFTzBGQlEwRlFMRmRCUVU5UExGTkJRVk1zUzBGQlN5OUNMRTFCUVhKQ0xFVkJRVFpDTEhORFFVRTNRanRCUVVOQk5rZ3NZMEZCVlZZc1MwRkJWaXhGUVVGcFFpeEpRVUZxUWl4RlFVRjFRaXhEUVVGRExFbEJRWGhDTzBGQlEwUTdPMEZCUlVRc1RVRkJTWEJHTEZWQlFWVXNTMEZCU3k5Q0xFMUJRVzVDTEVWQlEwVTdPMEZCUlVZc1RVRkJTVzFJTEZOQlFWTXNRMEZCWWl4RlFVTkZMRXRCUVV0NlFpeFZRVUZNTEVOQlFXZENlVUlzUzBGQmFFSXNSVUZCZFVKd1JpeE5RVUYyUWl4RlFVRXJRalJFTEZGQlFTOUNMRVZCUkVZc1MwRkhSU3hMUVVGTFJDeFZRVUZNTEVOQlFXZENMRTlCUVU5NVFpeExRVUZRTEVkQlFXVXNRMEZCTDBJc1JVRkJhME53Uml4TlFVRnNReXhGUVVFd1F6UkVMRkZCUVRGRE8wRkJRMGdzUTBGbVJEczdRVUZwUWtFc1UwRkJVMjFETEZkQlFWUXNRMEZCYzBJeFNTeEhRVUYwUWl4RlFVRXlRaXRJTEV0QlFUTkNMRVZCUVd0RGNFWXNUVUZCYkVNc1JVRkJNRU00UkN4WlFVRXhReXhGUVVGM1JFWXNVVUZCZUVRc1JVRkJhMFU3UVVGRGFFVXNUVUZCU1N4RFFVRkRRU3hSUVVGTUxFVkJRV1U3UVVGRFltNUZMRmRCUVU4eVJpeFZRVUZWYmtjc1UwRkJWaXhKUVVGMVFtMUhMRlZCUVZVc1NVRkJlRU1zUlVGQk9FTXNaVUZCT1VNN1FVRkRRVE5HTEZkQlFVOHNUMEZCVDNGRkxGbEJRVkFzUzBGQmQwSXNVMEZCTDBJc1JVRkJNRU1zTWtKQlFURkRPMEZCUTBGeVJTeFhRVUZQVHl4WFFVRlhaaXhUUVVGWUxFbEJRWGRDWlN4WFFVRlhMRWxCUVRGRExFVkJRV2RFTEdkQ1FVRm9SRHRCUVVOQlVDeFhRVUZQVHl4VFFVRlRMRU5CUVZRc1IwRkJZVE5ETEVsQlFVbFpMRTFCUVhoQ0xFVkJRV2RETEhORFFVRm9RenRCUVVOQk5rZ3NZMEZCVlZZc1MwRkJWaXhGUVVGcFFpeE5RVUZxUWl4RlFVRjVRaXhEUVVGRExFMUJRVEZDTzBGQlEwUTdPMEZCUlVRc1RVRkJTVFZETEUxQlFVMXVSaXhKUVVGSldTeE5RVUZrTzBGQlEwRXNUVUZCU1N0Q0xGVkJRVlYzUXl4SFFVRmtMRVZCUTBVN08wRkJSVVlzVFVGQlNUUkRMRk5CUVZNc1EwRkJZaXhGUVVORlJTeGhRVUZoYWtrc1IwRkJZaXhGUVVGclFpdElMRXRCUVd4Q0xFVkJRWGxDY0VZc1RVRkJla0lzUlVGQmFVTTRSQ3haUVVGcVF5eEZRVUVyUTBZc1VVRkJMME1zUlVGRVJpeExRVWRGTUVJc1lVRkJZV3BKTEVkQlFXSXNSVUZCYTBJc1UwRkJVeXRJTEV0QlFWUXNSMEZCYVVJc1EwRkJia01zUlVGQmMwTndSaXhOUVVGMFF5eEZRVUU0UXpoRUxGbEJRVGxETEVWQlFUUkVSaXhSUVVFMVJEdEJRVU5JT3p0QlFVVkVOVWNzVDBGQlQydEZMRk5CUVZBc1EwRkJhVUk0UlN4WlFVRnFRaXhIUVVGblF5eFZRVUZWV2l4TFFVRldMRVZCUVdsQ2NFWXNUVUZCYWtJc1JVRkJlVUkwUkN4UlFVRjZRaXhGUVVGdFF6dEJRVU5xUlcxRExHTkJRVmtzU1VGQldpeEZRVUZyUWxnc1MwRkJiRUlzUlVGQmVVSndSaXhOUVVGNlFpeEZRVUZwUXl4SlFVRnFReXhGUVVGMVF6UkVMRkZCUVhaRE8wRkJRMFFzUTBGR1JEczdRVUZKUVRWSExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ0swVXNXVUZCYWtJc1IwRkJaME1zVlVGQlZXSXNTMEZCVml4RlFVRnBRbkJHTEUxQlFXcENMRVZCUVhsQ05FUXNVVUZCZWtJc1JVRkJiVU03UVVGRGFrVnRReXhqUVVGWkxFbEJRVm9zUlVGQmEwSllMRXRCUVd4Q0xFVkJRWGxDY0VZc1RVRkJla0lzUlVGQmFVTXNTMEZCYWtNc1JVRkJkME0wUkN4UlFVRjRRenRCUVVORUxFTkJSa1E3TzBGQlNVRXNVMEZCVTNORExGZEJRVlFzUTBGQmMwSTNTU3hIUVVGMFFpeEZRVUV5UWl0SUxFdEJRVE5DTEVWQlFXdERjRVlzVFVGQmJFTXNSVUZCTUVNNFJDeFpRVUV4UXl4RlFVRjNSRVlzVVVGQmVFUXNSVUZCYTBVN1FVRkRhRVVzVFVGQlNTeERRVUZEUVN4UlFVRk1MRVZCUVdVN1FVRkRZbTVGTEZkQlFVOHlSaXhWUVVGVmJrY3NVMEZCVml4SlFVRjFRbTFITEZWQlFWVXNTVUZCZUVNc1JVRkJPRU1zWlVGQk9VTTdRVUZEUVROR0xGZEJRVThzVDBGQlQzRkZMRmxCUVZBc1MwRkJkMElzVTBGQkwwSXNSVUZCTUVNc01rSkJRVEZETzBGQlEwRnlSU3hYUVVGUFR5eFhRVUZYWml4VFFVRllMRWxCUVhkQ1pTeFhRVUZYTEVsQlFURkRMRVZCUVdkRUxHZENRVUZvUkR0QlFVTkJVQ3hYUVVGUFR5eFRRVUZUTEVOQlFWUXNSMEZCWVRORExFbEJRVWxaTEUxQlFYaENMRVZCUVdkRExITkRRVUZvUXp0QlFVTkJOa2dzWTBGQlZWWXNTMEZCVml4RlFVRnBRaXhWUVVGcVFpeEZRVUUyUWl4RFFVRkRMRlZCUVRsQ08wRkJRMFE3TzBGQlJVUXNUVUZCU1RWRExFMUJRVTF1Uml4SlFVRkpXU3hOUVVGa08wRkJRMEVzVFVGQlNTdENMRlZCUVZWM1F5eEhRVUZrTEVWQlEwVTdPMEZCUlVZc1RVRkJTVFJETEZOQlFWTXNRMEZCWWl4RlFVTkZUU3hoUVVGaGNra3NSMEZCWWl4RlFVRnJRaXRJTEV0QlFXeENMRVZCUVhsQ2NFWXNUVUZCZWtJc1JVRkJhVU00UkN4WlFVRnFReXhGUVVFclEwWXNVVUZCTDBNc1JVRkVSaXhMUVVkRk9FSXNZVUZCWVhKSkxFZEJRV0lzUlVGQmEwSXNZVUZCWVN0SUxFdEJRV0lzUjBGQmNVSXNRMEZCZGtNc1JVRkJNRU53Uml4TlFVRXhReXhGUVVGclJEaEVMRmxCUVd4RUxFVkJRV2RGUml4UlFVRm9SVHRCUVVOSU96dEJRVVZFTlVjc1QwRkJUMnRGTEZOQlFWQXNRMEZCYVVKcFJpeFpRVUZxUWl4SFFVRm5ReXhWUVVGVlppeExRVUZXTEVWQlFXbENjRVlzVFVGQmFrSXNSVUZCZVVJMFJDeFJRVUY2UWl4RlFVRnRRenRCUVVOcVJYTkRMR05CUVZrc1NVRkJXaXhGUVVGclFtUXNTMEZCYkVJc1JVRkJlVUp3Uml4TlFVRjZRaXhGUVVGcFF5eEpRVUZxUXl4RlFVRjFRelJFTEZGQlFYWkRPMEZCUTBRc1EwRkdSRHM3UVVGSlFUVkhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENhMFlzV1VGQmFrSXNSMEZCWjBNc1ZVRkJWV2hDTEV0QlFWWXNSVUZCYVVKd1JpeE5RVUZxUWl4RlFVRjVRalJFTEZGQlFYcENMRVZCUVcxRE8wRkJRMnBGYzBNc1kwRkJXU3hKUVVGYUxFVkJRV3RDWkN4TFFVRnNRaXhGUVVGNVFuQkdMRTFCUVhwQ0xFVkJRV2xETEV0QlFXcERMRVZCUVhkRE5FUXNVVUZCZUVNN1FVRkRSQ3hEUVVaRU96dEJRVWxCTEZOQlFWTjVReXhYUVVGVUxFTkJRWE5DYUVvc1IwRkJkRUlzUlVGQk1rSXJTQ3hMUVVFelFpeEZRVUZyUTNCR0xFMUJRV3hETEVWQlFUQkRPRVFzV1VGQk1VTXNSVUZCZDBSR0xGRkJRWGhFTEVWQlFXdEZPMEZCUTJoRkxFMUJRVWtzUTBGQlEwRXNVVUZCVEN4RlFVRmxPMEZCUTJKdVJTeFhRVUZQTWtZc1ZVRkJWVzVITEZOQlFWWXNTVUZCZFVKdFJ5eFZRVUZWTEVsQlFYaERMRVZCUVRoRExHVkJRVGxETzBGQlEwRXpSaXhYUVVGUExFOUJRVTl4UlN4WlFVRlFMRXRCUVhkQ0xGTkJRUzlDTEVWQlFUQkRMREpDUVVFeFF6dEJRVU5CY2tVc1YwRkJUMDhzVjBGQlYyWXNVMEZCV0N4SlFVRjNRbVVzVjBGQlZ5eEpRVUV4UXl4RlFVRm5SQ3huUWtGQmFFUTdRVUZEUVZBc1YwRkJUMDhzVTBGQlV5eERRVUZVTEVkQlFXRXpReXhKUVVGSldTeE5RVUY0UWl4RlFVRm5ReXh6UTBGQmFFTTdRVUZEUVhGSkxHbENRVUZoYkVJc1MwRkJZaXhGUVVGdlFpeHpRa0ZCY0VJc1JVRkJORU1zUTBGQlF5eHpRa0ZCTjBNN1FVRkRSRHM3UVVGRlJDeE5RVUZKTlVNc1RVRkJUVzVHTEVsQlFVbFpMRTFCUVdRN1FVRkRRU3hOUVVGSkswSXNWVUZCVlhkRExFZEJRV1FzUlVGRFJUczdRVUZGUmpGR0xGVkJRVkU0UWl4TFFVRlNMRU5CUVdOMlFpeEhRVUZrTEVWQlFXMUNLMGdzUzBGQmJrSXNSVUZCTUVKd1JpeE5RVUV4UWl4RlFVRnJRemhFTEZsQlFXeERMRVZCUVdkRUxFVkJRV2hFTEVWQlFXOUVMRU5CUVhCRU8wRkJRMFE3TzBGQlJVUTVSeXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRbkZHTEZsQlFXcENMRWRCUVdkRExGVkJRVlZ1UWl4TFFVRldMRVZCUVdsQ2NFWXNUVUZCYWtJc1JVRkJlVUkwUkN4UlFVRjZRaXhGUVVGdFF6dEJRVU5xUlhsRExHTkJRVmtzU1VGQldpeEZRVUZyUW1wQ0xFdEJRV3hDTEVWQlFYbENjRVlzVFVGQmVrSXNSVUZCYVVNc1NVRkJha01zUlVGQmRVTTBSQ3hSUVVGMlF6dEJRVU5FTEVOQlJrUTdPMEZCU1VFMVJ5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFuTkdMRmxCUVdwQ0xFZEJRV2RETEZWQlFWVndRaXhMUVVGV0xFVkJRV2xDY0VZc1RVRkJha0lzUlVGQmVVSTBSQ3hSUVVGNlFpeEZRVUZ0UXp0QlFVTnFSWGxETEdOQlFWa3NTVUZCV2l4RlFVRnJRbXBDTEV0QlFXeENMRVZCUVhsQ2NFWXNUVUZCZWtJc1JVRkJhVU1zUzBGQmFrTXNSVUZCZDBNMFJDeFJRVUY0UXp0QlFVTkVMRU5CUmtRN08wRkJTVUVzVTBGQlV6WkRMRmxCUVZRc1EwRkJkVUp3U2l4SFFVRjJRaXhGUVVFMFFpdElMRXRCUVRWQ0xFVkJRVzFEY0VZc1RVRkJia01zUlVGQk1rTTRSQ3haUVVFelF5eEZRVUY1UkVZc1VVRkJla1FzUlVGQmJVVTdRVUZEYWtVc1RVRkJTU3hEUVVGRFFTeFJRVUZNTEVWQlFXVTdRVUZEWW01RkxGZEJRVTh5Uml4VlFVRlZia2NzVTBGQlZpeEpRVUYxUW0xSExGVkJRVlVzU1VGQmVFTXNSVUZCT0VNc1pVRkJPVU03UVVGRFFUTkdMRmRCUVU4c1QwRkJUM0ZGTEZsQlFWQXNTMEZCZDBJc1UwRkJMMElzUlVGQk1FTXNNa0pCUVRGRE8wRkJRMEZ5UlN4WFFVRlBUeXhYUVVGWFppeFRRVUZZTEVsQlFYZENaU3hYUVVGWExFbEJRVEZETEVWQlFXZEVMR2RDUVVGb1JEdEJRVU5CVUN4WFFVRlBUeXhUUVVGVExFTkJRVlFzUjBGQllUTkRMRWxCUVVsWkxFMUJRWGhDTEVWQlEwa3NjME5CUkVvN1FVRkZRWEZKTEdsQ1FVRmhiRUlzUzBGQllpeEZRVUZ2UWl4MVFrRkJjRUlzUlVGQk5rTXNRMEZCUXl4MVFrRkJPVU03UVVGRFJEczdRVUZGUkN4TlFVRkpOVU1zVFVGQlRXNUdMRWxCUVVsWkxFMUJRV1E3UVVGRFFTeE5RVUZKSzBJc1ZVRkJWWGRETEVkQlFXUXNSVUZEUlRzN1FVRkZSakZHTEZWQlFWRTRRaXhMUVVGU0xFTkJRV04yUWl4SFFVRmtMRVZCUVcxQ0swZ3NTMEZCYmtJc1JVRkJNRUp3Uml4TlFVRXhRaXhGUVVGclF6aEVMRmxCUVd4RExFVkJRV2RFTEVWQlFXaEVMRVZCUVc5RUxFTkJRWEJFTzBGQlEwUTdPMEZCUlVRNVJ5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFuZEdMR0ZCUVdwQ0xFZEJRV2xETEZWQlFWVjBRaXhMUVVGV0xFVkJRV2xDY0VZc1RVRkJha0lzUlVGQmVVSTBSQ3hSUVVGNlFpeEZRVUZ0UXp0QlFVTnNSVFpETEdWQlFXRXNTVUZCWWl4RlFVRnRRbkpDTEV0QlFXNUNMRVZCUVRCQ2NFWXNUVUZCTVVJc1JVRkJhME1zU1VGQmJFTXNSVUZCZDBNMFJDeFJRVUY0UXp0QlFVTkVMRU5CUmtRN08wRkJTVUUxUnl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW5sR0xHRkJRV3BDTEVkQlFXbERMRlZCUVZWMlFpeExRVUZXTEVWQlFXbENjRVlzVFVGQmFrSXNSVUZCZVVJMFJDeFJRVUY2UWl4RlFVRnRRenRCUVVOc1JUWkRMR1ZCUVdFc1NVRkJZaXhGUVVGdFFuSkNMRXRCUVc1Q0xFVkJRVEJDY0VZc1RVRkJNVUlzUlVGQmEwTXNTMEZCYkVNc1JVRkJlVU0wUkN4UlFVRjZRenRCUVVORUxFTkJSa1E3TzBGQlNVRTdRVUZEUVRWSExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ01FWXNTVUZCYWtJc1IwRkJkMElzVlVGQlZYaENMRXRCUVZZc1JVRkJhVUk1UkN4TFFVRnFRaXhGUVVGM1FrTXNSMEZCZUVJc1JVRkJOa0k3UVVGRGJrUXNUVUZCU1N4RFFVRkROa1FzUzBGQlRDeEZRVUZaUVN4UlFVRlJMRU5CUVZJN1FVRkRXaXhOUVVGSkxFTkJRVU01UkN4TFFVRk1MRVZCUVZsQkxGRkJRVkVzUTBGQlVqdEJRVU5hTEUxQlFVa3NRMEZCUTBNc1IwRkJUQ3hGUVVGVlFTeE5RVUZOTEV0QlFVdDBSQ3hOUVVGWU96dEJRVVZXTEUxQlFVa3NUMEZCVDIxSUxFdEJRVkFzUzBGQmFVSXNVVUZCY2tJc1JVRkJLMEk3UVVGRE4wSkJMRmxCUVZGQkxFMUJRVTE1UWl4VlFVRk9MRU5CUVdsQ0xFTkJRV3BDTEVOQlFWSTdRVUZEUkRzN1FVRkZSSEJJTEZOQlFVOHNUMEZCVHpKR0xFdEJRVkFzUzBGQmFVSXNVVUZCYWtJc1NVRkJOa0lzUTBGQlF6ZEZMRTFCUVUwMlJTeExRVUZPTEVOQlFYSkRMRVZCUVcxRUxIVkNRVUZ1UkR0QlFVTkJNMFlzVTBGQlR6aENMRTlCUVU5RUxFdEJRV1FzUlVGQmNVSXNZVUZCY2tJN08wRkJSVUU3UVVGRFFTeE5RVUZKUXl4UlFVRlJSQ3hMUVVGYUxFVkJRVzFDTzBGQlEyNUNMRTFCUVVrc1MwRkJTM0pFTEUxQlFVd3NTMEZCWjBJc1EwRkJjRUlzUlVGQmRVSTdPMEZCUlhaQ2QwSXNVMEZCVHpaQ0xGTkJRVk1zUTBGQlZDeEpRVUZqUVN4UlFVRlJMRXRCUVV0eVJDeE5RVUZzUXl4RlFVRXdReXh4UWtGQk1VTTdRVUZEUVhkQ0xGTkJRVTg0UWl4UFFVRlBMRU5CUVZBc1NVRkJXVUVzVDBGQlR5eExRVUZMZEVRc1RVRkJMMElzUlVGQmRVTXNiVUpCUVhaRE96dEJRVVZCTEU5QlFVc3NTVUZCU1Uwc1NVRkJTU3RETEV0QlFXSXNSVUZCYjBJdlF5eEpRVUZKWjBRc1IwRkJlRUlzUlVGQk5rSm9SQ3hIUVVFM1FpeEZRVUZyUXp0QlFVTm9ReXhUUVVGTFFTeERRVUZNTEVsQlFWVTJSeXhMUVVGV08wRkJRMFE3UVVGRFJpeERRWFJDUkRzN1FVRjNRa0Z3U1N4UFFVRlBhMFVzVTBGQlVDeERRVUZwUWpSR0xFOUJRV3BDTEVkQlFUSkNMRmxCUVZrN1FVRkRja01zVFVGQlNUbEVMRTFCUVUwc1JVRkJWanRCUVVOQkxFMUJRVWxTTEUxQlFVMHNTMEZCUzNaRkxFMUJRV1k3UVVGRFFTeFBRVUZMTEVsQlFVbE5MRWxCUVVrc1EwRkJZaXhGUVVGblFrRXNTVUZCU1dsRkxFZEJRWEJDTEVWQlFYbENha1VzUjBGQmVrSXNSVUZCT0VJN1FVRkROVUo1UlN4UlFVRkpla1VzUTBGQlNpeEpRVUZUTUVVc1RVRkJUU3hMUVVGTE1VVXNRMEZCVEN4RFFVRk9MRU5CUVZRN1FVRkRRU3hSUVVGSlFTeE5RVUZOZUVJc1VVRkJVVWNzYVVKQlFXeENMRVZCUVhGRE8wRkJRMjVET0VZc1ZVRkJTWHBGTEVsQlFVa3NRMEZCVWl4SlFVRmhMRXRCUVdJN1FVRkRRVHRCUVVORU8wRkJRMFk3UVVGRFJDeFRRVUZQTEdGQlFXRjVSU3hKUVVGSkswUXNTVUZCU2l4RFFVRlRMRWRCUVZRc1EwRkJZaXhIUVVFMlFpeEhRVUZ3UXp0QlFVTkVMRU5CV0VRN08wRkJZVUU3T3pzN1FVRkpRUzlLTEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDT0VZc1lVRkJha0lzUjBGQmFVTXNXVUZCV1R0QlFVTXpReXhOUVVGSkxFOUJRVTk0U2l4VlFVRlFMRXRCUVhOQ0xGZEJRVEZDTEVWQlFYVkRPMEZCUTNKRExGRkJRVWxTTEU5QlFVOUpMR1ZCUVZnc1JVRkJORUk3UVVGRE1VSXNZVUZCVVN4SlFVRkpTaXhOUVVGS0xFTkJRVmNzU1VGQldDeERRVUZFTEVOQlFXMUNhVXNzVFVGQk1VSTdRVUZEUkN4TFFVWkVMRTFCUlU4N1FVRkRUQ3hWUVVGSk5Vb3NUVUZCVFN4SlFVRkpSeXhWUVVGS0xFTkJRV1VzUzBGQlMxTXNUVUZCY0VJc1EwRkJWanRCUVVOQkxGZEJRVXNzU1VGQlNVMHNTVUZCU1N4RFFVRlNMRVZCUVZkcFJTeE5RVUZOYmtZc1NVRkJTVmtzVFVGQk1VSXNSVUZCYTBOTkxFbEJRVWxwUlN4SFFVRjBReXhGUVVFeVEycEZMRXRCUVVzc1EwRkJhRVE3UVVGRFJXeENMRmxCUVVsclFpeERRVUZLTEVsQlFWTXNTMEZCUzBFc1EwRkJUQ3hEUVVGVU8wRkJSRVlzVDBGRlFTeFBRVUZQYkVJc1NVRkJTVFJLTEUxQlFWZzdRVUZEUkR0QlFVTkdMRWRCVkVRc1RVRlRUenRCUVVOTUxGVkJRVTBzU1VGQlNUZEpMRXRCUVVvc1EwRkJWU3h2UkVGQlZpeERRVUZPTzBGQlEwUTdRVUZEUml4RFFXSkVPenRCUVdWQk8wRkJRMEU3TzBGQlJVRXNVMEZCVTBvc1ZVRkJWQ3hEUVVGeFFtdENMRWRCUVhKQ0xFVkJRVEJDTzBGQlEzaENMRTFCUVVsQkxFbEJRVWxuU1N4SlFVRlNMRVZCUVdNc1QwRkJUMmhKTEVsQlFVbG5TU3hKUVVGS0xFVkJRVkE3UVVGRFpDeFRRVUZQYUVrc1NVRkJTV2xKTEU5QlFVb3NRMEZCV1N4WlFVRmFMRVZCUVRCQ0xFVkJRVEZDTEVOQlFWQTdRVUZEUkRzN1FVRkZSQ3hKUVVGSlF5eExRVUZMY0Vzc1QwRkJUMnRGTEZOQlFXaENPenRCUVVWQk96czdRVUZIUVd4RkxFOUJRVTl4UWl4UlFVRlFMRWRCUVd0Q0xGVkJRVlZrTEVkQlFWWXNSVUZCWlR0QlFVTXZRa0VzVFVGQlNXVXNVMEZCU2l4SFFVRm5RaXhKUVVGb1FqczdRVUZGUVR0QlFVTkJaaXhOUVVGSk9Fb3NTVUZCU2l4SFFVRlhPVW9zU1VGQlNTdEdMRWRCUVdZN1FVRkRRUzlHTEUxQlFVbHBRaXhKUVVGS0xFZEJRVmRxUWl4SlFVRkphMGNzUjBGQlpqczdRVUZGUVR0QlFVTkJiRWNzVFVGQlNTdEdMRWRCUVVvc1IwRkJWVGhFTEVkQlFVYzVSQ3hIUVVGaU8wRkJRMEV2Uml4TlFVRkphMGNzUjBGQlNpeEhRVUZWTWtRc1IwRkJSek5FTEVkQlFXSTdPMEZCUlVGc1J5eE5RVUZKY1VJc1MwRkJTaXhIUVVGWmQwa3NSMEZCUjNoSkxFdEJRV1k3UVVGRFFYSkNMRTFCUVVrNFJDeFJRVUZLTEVkQlFXVXJSaXhIUVVGSEwwWXNVVUZCYkVJN1FVRkRRVGxFTEUxQlFVa3JTaXhqUVVGS0xFZEJRWEZDUml4SFFVRkhMMFlzVVVGQmVFSTdRVUZEUVRsRUxFMUJRVWwzUlN4TlFVRktMRWRCUVdGeFJpeEhRVUZIY2tZc1RVRkJhRUk3UVVGRFFYaEZMRTFCUVVselF5eEpRVUZLTEVkQlFWZDFTQ3hIUVVGSGRrZ3NTVUZCWkR0QlFVTkJkRU1zVFVGQlNUSkZMRXRCUVVvc1IwRkJXV3RHTEVkQlFVZHNSaXhMUVVGbU8wRkJRMEV6UlN4TlFVRkpiMElzVTBGQlNpeEhRVUZuUW5sSkxFZEJRVWQ2U1N4VFFVRnVRanRCUVVOQmNFSXNUVUZCU1hsSExGbEJRVW9zUjBGQmJVSnZSQ3hIUVVGSGNFUXNXVUZCZEVJN1FVRkRRWHBITEUxQlFVa3dSeXhaUVVGS0xFZEJRVzFDYlVRc1IwRkJSMjVFTEZsQlFYUkNPMEZCUTBFeFJ5eE5RVUZKTkVjc1dVRkJTaXhIUVVGdFFtbEVMRWRCUVVkcVJDeFpRVUYwUWp0QlFVTkJOVWNzVFVGQlNUWkhMRmxCUVVvc1IwRkJiVUpuUkN4SFFVRkhhRVFzV1VGQmRFSTdRVUZEUVRkSExFMUJRVWs0Unl4UlFVRktMRWRCUVdVclF5eEhRVUZITDBNc1VVRkJiRUk3UVVGRFFUbEhMRTFCUVVscFNDeFhRVUZLTEVkQlFXdENORU1zUjBGQlJ6VkRMRmRCUVhKQ08wRkJRMEZxU0N4TlFVRkphMGdzVjBGQlNpeEhRVUZyUWpKRExFZEJRVWN6UXl4WFFVRnlRanRCUVVOQmJFZ3NUVUZCU1c5SUxGZEJRVW9zUjBGQmEwSjVReXhIUVVGSGVrTXNWMEZCY2tJN1FVRkRRWEJJTEUxQlFVbHhTQ3hYUVVGS0xFZEJRV3RDZDBNc1IwRkJSM2hETEZkQlFYSkNPMEZCUTBGeVNDeE5RVUZKZDBnc1YwRkJTaXhIUVVGclFuRkRMRWRCUVVkeVF5eFhRVUZ5UWp0QlFVTkJlRWdzVFVGQlNYbElMRmRCUVVvc1IwRkJhMEp2UXl4SFFVRkhjRU1zVjBGQmNrSTdRVUZEUVhwSUxFMUJRVWt5U0N4WlFVRktMRWRCUVcxQ2EwTXNSMEZCUjJ4RExGbEJRWFJDTzBGQlEwRXpTQ3hOUVVGSk5FZ3NXVUZCU2l4SFFVRnRRbWxETEVkQlFVZHFReXhaUVVGMFFqdEJRVU5CTlVnc1RVRkJTVzlITEZWQlFVb3NSMEZCYVVKNVJDeEhRVUZIZWtRc1ZVRkJjRUk3UVVGRFFYQkhMRTFCUVVscFNTeGhRVUZLTEVkQlFXOUNORUlzUjBGQlJ6VkNMR0ZCUVhaQ08wRkJRMEZxU1N4TlFVRkphMGtzWVVGQlNpeEhRVUZ2UWpKQ0xFZEJRVWN6UWl4aFFVRjJRanRCUVVOQmJFa3NUVUZCU1c5SkxHRkJRVW9zUjBGQmIwSjVRaXhIUVVGSGVrSXNZVUZCZGtJN1FVRkRRWEJKTEUxQlFVbHhTU3hoUVVGS0xFZEJRVzlDZDBJc1IwRkJSM2hDTEdGQlFYWkNPMEZCUTBGeVNTeE5RVUZKYzBrc1UwRkJTaXhIUVVGblFuVkNMRWRCUVVkMlFpeFRRVUZ1UWp0QlFVTkJkRWtzVFVGQlNYbEpMRmxCUVVvc1IwRkJiVUp2UWl4SFFVRkhjRUlzV1VGQmRFSTdRVUZEUVhwSkxFMUJRVWt3U1N4WlFVRktMRWRCUVcxQ2JVSXNSMEZCUjI1Q0xGbEJRWFJDTzBGQlEwRXhTU3hOUVVGSk5Fa3NXVUZCU2l4SFFVRnRRbWxDTEVkQlFVZHFRaXhaUVVGMFFqdEJRVU5CTlVrc1RVRkJTVFpKTEZsQlFVb3NSMEZCYlVKblFpeEhRVUZIYUVJc1dVRkJkRUk3UVVGRFFUZEpMRTFCUVVsblNpeFpRVUZLTEVkQlFXMUNZU3hIUVVGSFlpeFpRVUYwUWp0QlFVTkJhRW9zVFVGQlNXbEtMRmxCUVVvc1IwRkJiVUpaTEVkQlFVZGFMRmxCUVhSQ08wRkJRMEZxU2l4TlFVRkpiVW9zWVVGQlNpeEhRVUZ2UWxVc1IwRkJSMVlzWVVGQmRrSTdRVUZEUVc1S0xFMUJRVWx2U2l4aFFVRktMRWRCUVc5Q1V5eEhRVUZIVkN4aFFVRjJRanRCUVVOQmNFb3NUVUZCU1hGS0xFbEJRVW9zUjBGQlYxRXNSMEZCUjFJc1NVRkJaRHRCUVVOQmNrb3NUVUZCU1hWS0xFOUJRVW9zUjBGQlkwMHNSMEZCUjA0c1QwRkJha0k3UVVGRFFYWktMRTFCUVVsNVNpeGhRVUZLTEVkQlFXOUNTU3hIUVVGSFNpeGhRVUYyUWpzN1FVRkZRU3hUUVVGUGVrb3NSMEZCVUR0QlFVTkVMRU5CYkVSRU96dEJRVzlFUVR0QlFVTkJMRk5CUVZNMFJpeExRVUZVTEVOQlFXZENiMFVzUzBGQmFFSXNSVUZCZFVJdlJTeEhRVUYyUWl4RlFVRTBRbWRHTEZsQlFUVkNMRVZCUVRCRE8wRkJRM2hETEUxQlFVa3NUMEZCVDBRc1MwRkJVQ3hMUVVGcFFpeFJRVUZ5UWl4RlFVRXJRaXhQUVVGUFF5eFpRVUZRTzBGQlF5OUNSQ3hWUVVGUkxFTkJRVU1zUTBGQlEwRXNTMEZCVml4RFFVWjNReXhEUVVWMFFqdEJRVU5zUWl4TlFVRkpRU3hUUVVGVEwwVXNSMEZCWWl4RlFVRnJRaXhQUVVGUFFTeEhRVUZRTzBGQlEyeENMRTFCUVVrclJTeFRRVUZUTEVOQlFXSXNSVUZCWjBJc1QwRkJUMEVzUzBGQlVEdEJRVU5vUWtFc1YwRkJVeTlGTEVkQlFWUTdRVUZEUVN4TlFVRkpLMFVzVTBGQlV5eERRVUZpTEVWQlFXZENMRTlCUVU5QkxFdEJRVkE3UVVGRGFFSXNVMEZCVHl4RFFVRlFPMEZCUTBRN08wRkJSVVFzVTBGQlUzSktMRTFCUVZRc1EwRkJhVUpFTEUxQlFXcENMRVZCUVhsQ08wRkJRM1pDTzBGQlEwRTdRVUZEUVR0QlFVTkJRU3hYUVVGVExFTkJRVU1zUTBGQlF6SkZMRXRCUVVzMlJTeEpRVUZNTEVOQlFWVXNRMEZCUTNoS0xFMUJRVmdzUTBGQldEdEJRVU5CTEZOQlFVOUJMRk5CUVZNc1EwRkJWQ3hIUVVGaExFTkJRV0lzUjBGQmFVSkJMRTFCUVhoQ08wRkJRMFE3TzBGQlJVUXNVMEZCVTNsQ0xFOUJRVlFzUTBGQmEwSTVRaXhQUVVGc1FpeEZRVUV5UWp0QlFVTjZRaXhUUVVGUExFTkJRVU54UlN4TlFVRk5ka01zVDBGQlRpeEpRVUZwUWl4VlFVRlZPVUlzVDBGQlZpeEZRVUZ0UWp0QlFVTXhReXhYUVVGUE9Fb3NUMEZCVDNoSExGTkJRVkFzUTBGQmFVSkhMRkZCUVdwQ0xFTkJRVEJDWXl4SlFVRXhRaXhEUVVFclFuWkZMRTlCUVM5Q0xFMUJRVFJETEdkQ1FVRnVSRHRCUVVORUxFZEJSazBzUlVGRlNrRXNUMEZHU1N4RFFVRlFPMEZCUjBRN08wRkJSVVFzVTBGQlUyRXNWVUZCVkN4RFFVRnhRbUlzVDBGQmNrSXNSVUZCT0VJN1FVRkROVUlzVTBGQlR6aENMRkZCUVZFNVFpeFBRVUZTTEV0QlFXOUNXaXhQUVVGUE1FSXNVVUZCVUN4RFFVRm5RbVFzVDBGQmFFSXNRMEZCY0VJc1NVRkRTRUVzVjBGQlZ5eFJRVUZQUVN4UFFVRlFMSGxEUVVGUFFTeFBRVUZRTEU5QlFXMUNMRkZCUVRsQ0xFbEJRMEVzVDBGQlQwRXNVVUZCVVVzc1RVRkJaaXhMUVVFd1FpeFJRVVk1UWp0QlFVZEVPenRCUVVWRUxGTkJRVk5uUml4TFFVRlVMRU5CUVdkQ01FVXNRMEZCYUVJc1JVRkJiVUk3UVVGRGFrSXNUVUZCU1VFc1NVRkJTU3hGUVVGU0xFVkJRVmtzVDBGQlR5eE5RVUZOUVN4RlFVRkZkRWNzVVVGQlJpeERRVUZYTEVWQlFWZ3NRMEZCWWp0QlFVTmFMRk5CUVU5elJ5eEZRVUZGZEVjc1VVRkJSaXhEUVVGWExFVkJRVmdzUTBGQlVEdEJRVU5FT3p0QlFVVkVMRk5CUVZOcVF5eFhRVUZVTEVOQlFYTkNSaXhIUVVGMFFpeEZRVUV5UWp0QlFVTjZRaXhOUVVGSk1Fa3NXVUZCV1N4RlFVRm9RanRCUVVOQkxFOUJRVXNzU1VGQlNYSktMRWxCUVVrc1EwRkJZaXhGUVVGblFrRXNTVUZCU1Zjc1NVRkJTV3BDTEUxQlFYaENMRVZCUVdkRFRTeEhRVUZvUXl4RlFVRnhRenRCUVVOdVF5eFJRVUZKVXl4SlFVRkpSU3hKUVVGSk1rZ3NWVUZCU2l4RFFVRmxkRWtzUTBGQlppeERRVUZTTzBGQlEwRXNVVUZCU1ZNc1MwRkJTeXhKUVVGVUxFVkJRMFUwU1N4VlFVRlZReXhKUVVGV0xFTkJRV1V6U1N4SlFVRkpNa2dzVlVGQlNpeERRVUZsZEVrc1EwRkJaaXhEUVVGbUxFVkJSRVlzUzBGRlN6dEJRVU5JTEZWQlFVa3JReXhSUVVGUkwwTXNRMEZCV2p0QlFVTkJMRlZCUVVsVExFdEJRVXNzVFVGQlRDeEpRVUZsUVN4TFFVRkxMRTFCUVhoQ0xFVkJRV2REVkR0QlFVTm9ReXhWUVVGSmRVb3NTVUZCU1VNc2JVSkJRVzFDTjBrc1NVRkJTV2RFTEV0QlFVb3NRMEZCVlZvc1MwRkJWaXhGUVVGcFFpOURMRWxCUVVVc1EwRkJia0lzUTBGQmJrSXNSVUZCTUVNclFpeE5RVUV4UXl4RFFVRnBSQ3hEUVVGcVJDeEZRVUZ2UkRCSUxFdEJRWEJFTEVOQlFUQkVMRWRCUVRGRUxFTkJRVkk3UVVGRFFTeFhRVUZMTEVsQlFVbDZReXhKUVVGSkxFTkJRV0lzUlVGQlowSkJMRWxCUVVsMVF5eEZRVUZGTjBvc1RVRkJkRUlzUlVGQk9FSnpTQ3hIUVVFNVFqdEJRVU5GY1VNc2EwSkJRVlZETEVsQlFWWXNRMEZCWlhoSUxGTkJRVk41U0N4RlFVRkZka01zUTBGQlJpeERRVUZVTEVWQlFXVXNSVUZCWml4RFFVRm1PMEZCUkVZN1FVRkZSRHRCUVVOR08wRkJRMFFzVTBGQlQzRkRMRk5CUVZBN1FVRkRSRHM3UVVGRlJDeFRRVUZUTDBjc1dVRkJWQ3hEUVVGMVFqTkNMRWRCUVhaQ0xFVkJRVFJDTzBGQlF6RkNMRTFCUVVrd1NTeFpRVUZaTEVWQlFXaENPMEZCUTBFc1QwRkJTeXhKUVVGSmNrb3NTVUZCU1N4RFFVRmlMRVZCUVdkQ1FTeEpRVUZKVnl4SlFVRkpha0lzVFVGQmVFSXNSVUZCWjBOTkxFZEJRV2hETEVWQlFYRkRPMEZCUTI1RE8wRkJRMEZ4U2l4alFVRlZReXhKUVVGV0xFTkJRV1V6U1N4SlFVRkpNa2dzVlVGQlNpeERRVUZsZEVrc1EwRkJaaXhKUVVGdlFpeEpRVUZ1UXp0QlFVTkVPMEZCUTBRc1UwRkJUM0ZLTEZOQlFWQTdRVUZEUkRzN1FVRkZSQ3hUUVVGVE0wY3NZMEZCVkN4RFFVRjVRaTlDTEVkQlFYcENMRVZCUVRoQ08wRkJRelZDTEUxQlFVa3JTU3hEUVVGS0xFVkJRVTlETEVWQlFWQXNSVUZCVjBNc1JVRkJXRHRCUVVOQkxFMUJRVWxRTEZsQlFWa3NSVUZCYUVJN1FVRkRRU3hQUVVGTExFbEJRVWx5U2l4SlFVRkpMRU5CUVdJc1JVRkJaMEpCTEVsQlFVbFhMRWxCUVVscVFpeE5RVUY0UWl4RlFVRm5RMDBzUjBGQmFFTXNSVUZCY1VNN1FVRkRia013U2l4UlFVRkpMMGtzU1VGQlNUSklMRlZCUVVvc1EwRkJaWFJKTEVOQlFXWXNRMEZCU2p0QlFVTkJNa29zVTBGQlMwUXNTMEZCU3l4RFFVRldPMEZCUTBGRkxGTkJRVXRHTEVsQlFVa3NSMEZCVkR0QlFVTkJUQ3hqUVVGVlF5eEpRVUZXTEVOQlFXVk5MRVZCUVdZN1FVRkRRVkFzWTBGQlZVTXNTVUZCVml4RFFVRmxTeXhGUVVGbU8wRkJRMFE3TzBGQlJVUXNVMEZCVDA0c1UwRkJVRHRCUVVORU96dEJRVVZFTEZOQlFWTjJTU3hoUVVGVUxFTkJRWGRDU0N4SFFVRjRRaXhGUVVFMlFqdEJRVU16UWl4VFFVRlBkRU1zVDBGQlQzZE1MRmRCUVZBc1EwRkJiVUpzU2l4SFFVRnVRaXhEUVVGUU8wRkJRMFE3TzBGQlJVUXNVMEZCVTNsQ0xGVkJRVlFzUTBGQmNVSXdTQ3hIUVVGeVFpeEZRVUV3UWtNc1IwRkJNVUlzUlVGQkswSjBTU3hOUVVFdlFpeEZRVUYxUXk5Q0xFMUJRWFpETEVWQlFTdERPMEZCUXpkRExFMUJRVWt3UWl4SFFVRktPMEZCUTBFc1QwRkJTeXhKUVVGSmNFSXNTVUZCU1N4RFFVRmlMRVZCUVdkQ1FTeEpRVUZKVGl4TlFVRndRaXhGUVVFMFFrMHNSMEZCTlVJc1JVRkJhVU03UVVGREwwSXNVVUZCUzBFc1NVRkJTWGxDTEUxQlFVb3NTVUZCWTNOSkxFbEJRVWx5U3l4TlFVRnVRaXhKUVVFclFrMHNTMEZCU3poS0xFbEJRVWx3U3l4TlFVRTFReXhGUVVORk8wRkJRMFp4U3l4UlFVRkpMMG9zU1VGQlNYbENMRTFCUVZJc1NVRkJhMEp4U1N4SlFVRkpPVW9zUTBGQlNpeERRVUZzUWp0QlFVTkVPMEZCUTBRc1UwRkJUMEVzUTBGQlVEdEJRVU5FT3p0QlFVVkVMRk5CUVZOMVJTeGpRVUZVTEVOQlFYbENOVVFzUjBGQmVrSXNSVUZCT0VJN1FVRkROVUlzVFVGQlNUdEJRVU5HTEZkQlFVOXhTaXh0UWtGQmJVSnlTaXhIUVVGdVFpeERRVUZRTzBGQlEwUXNSMEZHUkN4RFFVVkZMRTlCUVU5elNpeEhRVUZRTEVWQlFWazdRVUZEV2l4WFFVRlBNVW9zVDBGQlQybEZMRmxCUVZBc1EwRkJiMElzVFVGQmNFSXNRMEZCVUN4RFFVUlpMRU5CUTNWQ08wRkJRM0JETzBGQlEwWTdPMEZCUlVRN096czdPMEZCUzBFc1UwRkJVM05ETEZOQlFWUXNRMEZCYjBKRUxFdEJRWEJDTEVWQlFUSkNjVVFzUjBGQk0wSXNSVUZCWjBNN1FVRkRPVUpvU2l4VFFVRlBMRTlCUVU4eVJpeExRVUZRTEV0QlFXbENMRkZCUVhoQ0xFVkJRV3RETEhWRFFVRnNRenRCUVVOQk0wWXNVMEZCVHpKR0xGTkJRVk1zUTBGQmFFSXNSVUZCYlVJc01FUkJRVzVDTzBGQlEwRXpSaXhUUVVGUE1rWXNVMEZCVTNGRUxFZEJRV2hDTEVWQlFYRkNMRFpEUVVGeVFqdEJRVU5CYUVvc1UwRkJUMjFFTEV0QlFVczRSaXhMUVVGTUxFTkJRVmQwUkN4TFFVRllMRTFCUVhOQ1FTeExRVUUzUWl4RlFVRnZReXhyUTBGQmNFTTdRVUZEUkRzN1FVRkZSQ3hUUVVGVFZTeFRRVUZVTEVOQlFXOUNWaXhMUVVGd1FpeEZRVUV5UW5GRUxFZEJRVE5DTEVWQlFXZEROVVlzUjBGQmFFTXNSVUZCY1VNN1FVRkRia053UkN4VFFVRlBMRTlCUVU4eVJpeExRVUZRTEV0QlFXbENMRkZCUVhoQ0xFVkJRV3RETEhWRFFVRnNRenRCUVVOQk0wWXNVMEZCVHpKR0xGTkJRVk54UkN4SFFVRm9RaXhGUVVGeFFpeDVRMEZCY2tJN1FVRkRRV2hLTEZOQlFVOHlSaXhUUVVGVGRrTXNSMEZCYUVJc1JVRkJjVUlzTUVOQlFYSkNPMEZCUTBGd1JDeFRRVUZQYlVRc1MwRkJTemhHTEV0QlFVd3NRMEZCVjNSRUxFdEJRVmdzVFVGQmMwSkJMRXRCUVRkQ0xFVkJRVzlETEd0RFFVRndRenRCUVVORU96dEJRVVZFTEZOQlFWTnJRaXhaUVVGVUxFTkJRWFZDYkVJc1MwRkJka0lzUlVGQk9FSnhSQ3hIUVVFNVFpeEZRVUZ0UXpWR0xFZEJRVzVETEVWQlFYZERPMEZCUTNSRGNFUXNVMEZCVHl4UFFVRlBNa1lzUzBGQlVDeExRVUZwUWl4UlFVRjRRaXhGUVVGclF5eDFRMEZCYkVNN1FVRkRRVE5HTEZOQlFVOHlSaXhUUVVGVGNVUXNSMEZCYUVJc1JVRkJjVUlzZVVOQlFYSkNPMEZCUTBGb1NpeFRRVUZQTWtZc1UwRkJVM1pETEVkQlFXaENMRVZCUVhGQ0xEQkRRVUZ5UWp0QlFVTkVPenRCUVVWRUxGTkJRVk53UkN4TlFVRlVMRU5CUVdsQ2Ewb3NTVUZCYWtJc1JVRkJkVUpETEU5QlFYWkNMRVZCUVdkRE8wRkJRemxDTEUxQlFVa3NRMEZCUTBRc1NVRkJUQ3hGUVVGWExFMUJRVTBzU1VGQlNYWkxMRXRCUVVvc1EwRkJWWGRMTEZkQlFWY3NhMEpCUVhKQ0xFTkJRVTQ3UVVGRFdpSXNJbVpwYkdVaU9pSnBibVJsZUM1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaThxSVZ4dUlDb2dWR2hsSUdKMVptWmxjaUJ0YjJSMWJHVWdabkp2YlNCdWIyUmxMbXB6TENCbWIzSWdkR2hsSUdKeWIzZHpaWEl1WEc0Z0tseHVJQ29nUUdGMWRHaHZjaUFnSUVabGNtOXpjeUJCWW05MWEyaGhaR2xxWldnZ1BHWmxjbTl6YzBCbVpYSnZjM011YjNKblBpQThhSFIwY0RvdkwyWmxjbTl6Y3k1dmNtYytYRzRnS2lCQWJHbGpaVzV6WlNBZ1RVbFVYRzRnS2k5Y2JseHVkbUZ5SUdKaGMyVTJOQ0E5SUhKbGNYVnBjbVVvSjJKaGMyVTJOQzFxY3ljcFhHNTJZWElnYVdWbFpUYzFOQ0E5SUhKbGNYVnBjbVVvSjJsbFpXVTNOVFFuS1Z4dVhHNWxlSEJ2Y25SekxrSjFabVpsY2lBOUlFSjFabVpsY2x4dVpYaHdiM0owY3k1VGJHOTNRblZtWm1WeUlEMGdRblZtWm1WeVhHNWxlSEJ2Y25SekxrbE9VMUJGUTFSZlRVRllYMEpaVkVWVElEMGdOVEJjYmtKMVptWmxjaTV3YjI5c1UybDZaU0E5SURneE9USmNibHh1THlvcVhHNGdLaUJKWmlCZ1FuVm1abVZ5TGw5MWMyVlVlWEJsWkVGeWNtRjVjMkE2WEc0Z0tpQWdJRDA5UFNCMGNuVmxJQ0FnSUZWelpTQlZhVzUwT0VGeWNtRjVJR2x0Y0d4bGJXVnVkR0YwYVc5dUlDaG1ZWE4wWlhOMEtWeHVJQ29nSUNBOVBUMGdabUZzYzJVZ0lDQlZjMlVnVDJKcVpXTjBJR2x0Y0d4bGJXVnVkR0YwYVc5dUlDaGpiMjF3WVhScFlteGxJR1J2ZDI0Z2RHOGdTVVUyS1Z4dUlDb3ZYRzVDZFdabVpYSXVYM1Z6WlZSNWNHVmtRWEp5WVhseklEMGdLR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdMeThnUkdWMFpXTjBJR2xtSUdKeWIzZHpaWElnYzNWd2NHOXlkSE1nVkhsd1pXUWdRWEp5WVhsekxpQlRkWEJ3YjNKMFpXUWdZbkp2ZDNObGNuTWdZWEpsSUVsRklERXdLeXdnUm1seVpXWnZlQ0EwS3l4Y2JpQWdMeThnUTJoeWIyMWxJRGNyTENCVFlXWmhjbWtnTlM0eEt5d2dUM0JsY21FZ01URXVOaXNzSUdsUFV5QTBMaklyTGlCSlppQjBhR1VnWW5KdmQzTmxjaUJrYjJWeklHNXZkQ0J6ZFhCd2IzSjBJR0ZrWkdsdVoxeHVJQ0F2THlCd2NtOXdaWEowYVdWeklIUnZJR0JWYVc1ME9FRnljbUY1WUNCcGJuTjBZVzVqWlhNc0lIUm9aVzRnZEdoaGRDZHpJSFJvWlNCellXMWxJR0Z6SUc1dklHQlZhVzUwT0VGeWNtRjVZQ0J6ZFhCd2IzSjBYRzRnSUM4dklHSmxZMkYxYzJVZ2QyVWdibVZsWkNCMGJ5QmlaU0JoWW14bElIUnZJR0ZrWkNCaGJHd2dkR2hsSUc1dlpHVWdRblZtWm1WeUlFRlFTU0J0WlhSb2IyUnpMaUJVYUdseklHbHpJR0Z1SUdsemMzVmxYRzRnSUM4dklHbHVJRVpwY21WbWIzZ2dOQzB5T1M0Z1RtOTNJR1pwZUdWa09pQm9kSFJ3Y3pvdkwySjFaM3BwYkd4aExtMXZlbWxzYkdFdWIzSm5MM05vYjNkZlluVm5MbU5uYVQ5cFpEMDJPVFUwTXpoY2JpQWdkSEo1SUh0Y2JpQWdJQ0IyWVhJZ1luVm1JRDBnYm1WM0lFRnljbUY1UW5WbVptVnlLREFwWEc0Z0lDQWdkbUZ5SUdGeWNpQTlJRzVsZHlCVmFXNTBPRUZ5Y21GNUtHSjFaaWxjYmlBZ0lDQmhjbkl1Wm05dklEMGdablZ1WTNScGIyNGdLQ2tnZXlCeVpYUjFjbTRnTkRJZ2ZWeHVJQ0FnSUhKbGRIVnliaUEwTWlBOVBUMGdZWEp5TG1admJ5Z3BJQ1ltWEc0Z0lDQWdJQ0FnSUhSNWNHVnZaaUJoY25JdWMzVmlZWEp5WVhrZ1BUMDlJQ2RtZFc1amRHbHZiaWNnTHk4Z1EyaHliMjFsSURrdE1UQWdiR0ZqYXlCZ2MzVmlZWEp5WVhsZ1hHNGdJSDBnWTJGMFkyZ2dLR1VwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdabUZzYzJWY2JpQWdmVnh1ZlNrb0tWeHVYRzR2S2lwY2JpQXFJRU5zWVhOek9pQkNkV1ptWlhKY2JpQXFJRDA5UFQwOVBUMDlQVDA5UFQxY2JpQXFYRzRnS2lCVWFHVWdRblZtWm1WeUlHTnZibk4wY25WamRHOXlJSEpsZEhWeWJuTWdhVzV6ZEdGdVkyVnpJRzltSUdCVmFXNTBPRUZ5Y21GNVlDQjBhR0YwSUdGeVpTQmhkV2R0Wlc1MFpXUmNiaUFxSUhkcGRHZ2dablZ1WTNScGIyNGdjSEp2Y0dWeWRHbGxjeUJtYjNJZ1lXeHNJSFJvWlNCdWIyUmxJR0JDZFdabVpYSmdJRUZRU1NCbWRXNWpkR2x2Ym5NdUlGZGxJSFZ6WlZ4dUlDb2dZRlZwYm5RNFFYSnlZWGxnSUhOdklIUm9ZWFFnYzNGMVlYSmxJR0p5WVdOclpYUWdibTkwWVhScGIyNGdkMjl5YTNNZ1lYTWdaWGh3WldOMFpXUWdMUzBnYVhRZ2NtVjBkWEp1YzF4dUlDb2dZU0J6YVc1bmJHVWdiMk4wWlhRdVhHNGdLbHh1SUNvZ1Fua2dZWFZuYldWdWRHbHVaeUIwYUdVZ2FXNXpkR0Z1WTJWekxDQjNaU0JqWVc0Z1lYWnZhV1FnYlc5a2FXWjVhVzVuSUhSb1pTQmdWV2x1ZERoQmNuSmhlV0JjYmlBcUlIQnliM1J2ZEhsd1pTNWNiaUFxTDF4dVpuVnVZM1JwYjI0Z1FuVm1abVZ5SUNoemRXSnFaV04wTENCbGJtTnZaR2x1Wnl3Z2JtOWFaWEp2S1NCN1hHNGdJR2xtSUNnaEtIUm9hWE1nYVc1emRHRnVZMlZ2WmlCQ2RXWm1aWElwS1Z4dUlDQWdJSEpsZEhWeWJpQnVaWGNnUW5WbVptVnlLSE4xWW1wbFkzUXNJR1Z1WTI5a2FXNW5MQ0J1YjFwbGNtOHBYRzVjYmlBZ2RtRnlJSFI1Y0dVZ1BTQjBlWEJsYjJZZ2MzVmlhbVZqZEZ4dVhHNGdJQzh2SUZkdmNtdGhjbTkxYm1RNklHNXZaR1VuY3lCaVlYTmxOalFnYVcxd2JHVnRaVzUwWVhScGIyNGdZV3hzYjNkeklHWnZjaUJ1YjI0dGNHRmtaR1ZrSUhOMGNtbHVaM05jYmlBZ0x5OGdkMmhwYkdVZ1ltRnpaVFkwTFdweklHUnZaWE1nYm05MExseHVJQ0JwWmlBb1pXNWpiMlJwYm1jZ1BUMDlJQ2RpWVhObE5qUW5JQ1ltSUhSNWNHVWdQVDA5SUNkemRISnBibWNuS1NCN1hHNGdJQ0FnYzNWaWFtVmpkQ0E5SUhOMGNtbHVaM1J5YVcwb2MzVmlhbVZqZENsY2JpQWdJQ0IzYUdsc1pTQW9jM1ZpYW1WamRDNXNaVzVuZEdnZ0pTQTBJQ0U5UFNBd0tTQjdYRzRnSUNBZ0lDQnpkV0pxWldOMElEMGdjM1ZpYW1WamRDQXJJQ2M5SjF4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUM4dklFWnBibVFnZEdobElHeGxibWQwYUZ4dUlDQjJZWElnYkdWdVozUm9YRzRnSUdsbUlDaDBlWEJsSUQwOVBTQW5iblZ0WW1WeUp5bGNiaUFnSUNCc1pXNW5kR2dnUFNCamIyVnlZMlVvYzNWaWFtVmpkQ2xjYmlBZ1pXeHpaU0JwWmlBb2RIbHdaU0E5UFQwZ0ozTjBjbWx1WnljcFhHNGdJQ0FnYkdWdVozUm9JRDBnUW5WbVptVnlMbUo1ZEdWTVpXNW5kR2dvYzNWaWFtVmpkQ3dnWlc1amIyUnBibWNwWEc0Z0lHVnNjMlVnYVdZZ0tIUjVjR1VnUFQwOUlDZHZZbXBsWTNRbktWeHVJQ0FnSUd4bGJtZDBhQ0E5SUdOdlpYSmpaU2h6ZFdKcVpXTjBMbXhsYm1kMGFDa2dMeThnWVhOemRXMWxJSFJvWVhRZ2IySnFaV04wSUdseklHRnljbUY1TFd4cGEyVmNiaUFnWld4elpWeHVJQ0FnSUhSb2NtOTNJRzVsZHlCRmNuSnZjaWduUm1seWMzUWdZWEpuZFcxbGJuUWdibVZsWkhNZ2RHOGdZbVVnWVNCdWRXMWlaWElzSUdGeWNtRjVJRzl5SUhOMGNtbHVaeTRuS1Z4dVhHNGdJSFpoY2lCaWRXWmNiaUFnYVdZZ0tFSjFabVpsY2k1ZmRYTmxWSGx3WldSQmNuSmhlWE1wSUh0Y2JpQWdJQ0F2THlCUWNtVm1aWEp5WldRNklGSmxkSFZ5YmlCaGJpQmhkV2R0Wlc1MFpXUWdZRlZwYm5RNFFYSnlZWGxnSUdsdWMzUmhibU5sSUdadmNpQmlaWE4wSUhCbGNtWnZjbTFoYm1ObFhHNGdJQ0FnWW5WbUlEMGdRblZtWm1WeUxsOWhkV2R0Wlc1MEtHNWxkeUJWYVc1ME9FRnljbUY1S0d4bGJtZDBhQ2twWEc0Z0lIMGdaV3h6WlNCN1hHNGdJQ0FnTHk4Z1JtRnNiR0poWTJzNklGSmxkSFZ5YmlCVVNFbFRJR2x1YzNSaGJtTmxJRzltSUVKMVptWmxjaUFvWTNKbFlYUmxaQ0JpZVNCZ2JtVjNZQ2xjYmlBZ0lDQmlkV1lnUFNCMGFHbHpYRzRnSUNBZ1luVm1MbXhsYm1kMGFDQTlJR3hsYm1kMGFGeHVJQ0FnSUdKMVppNWZhWE5DZFdabVpYSWdQU0IwY25WbFhHNGdJSDFjYmx4dUlDQjJZWElnYVZ4dUlDQnBaaUFvUW5WbVptVnlMbDkxYzJWVWVYQmxaRUZ5Y21GNWN5QW1KaUIwZVhCbGIyWWdjM1ZpYW1WamRDNWllWFJsVEdWdVozUm9JRDA5UFNBbmJuVnRZbVZ5SnlrZ2UxeHVJQ0FnSUM4dklGTndaV1ZrSUc5d2RHbHRhWHBoZEdsdmJpQXRMU0IxYzJVZ2MyVjBJR2xtSUhkbEozSmxJR052Y0hscGJtY2dabkp2YlNCaElIUjVjR1ZrSUdGeWNtRjVYRzRnSUNBZ1luVm1MbDl6WlhRb2MzVmlhbVZqZENsY2JpQWdmU0JsYkhObElHbG1JQ2hwYzBGeWNtRjVhWE5vS0hOMVltcGxZM1FwS1NCN1hHNGdJQ0FnTHk4Z1ZISmxZWFFnWVhKeVlYa3RhWE5vSUc5aWFtVmpkSE1nWVhNZ1lTQmllWFJsSUdGeWNtRjVYRzRnSUNBZ1ptOXlJQ2hwSUQwZ01Ec2dhU0E4SUd4bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ0lDQnBaaUFvUW5WbVptVnlMbWx6UW5WbVptVnlLSE4xWW1wbFkzUXBLVnh1SUNBZ0lDQWdJQ0JpZFdaYmFWMGdQU0J6ZFdKcVpXTjBMbkpsWVdSVlNXNTBPQ2hwS1Z4dUlDQWdJQ0FnWld4elpWeHVJQ0FnSUNBZ0lDQmlkV1piYVYwZ1BTQnpkV0pxWldOMFcybGRYRzRnSUNBZ2ZWeHVJQ0I5SUdWc2MyVWdhV1lnS0hSNWNHVWdQVDA5SUNkemRISnBibWNuS1NCN1hHNGdJQ0FnWW5WbUxuZHlhWFJsS0hOMVltcGxZM1FzSURBc0lHVnVZMjlrYVc1bktWeHVJQ0I5SUdWc2MyVWdhV1lnS0hSNWNHVWdQVDA5SUNkdWRXMWlaWEluSUNZbUlDRkNkV1ptWlhJdVgzVnpaVlI1Y0dWa1FYSnlZWGx6SUNZbUlDRnViMXBsY204cElIdGNiaUFnSUNCbWIzSWdLR2tnUFNBd095QnBJRHdnYkdWdVozUm9PeUJwS3lzcElIdGNiaUFnSUNBZ0lHSjFabHRwWFNBOUlEQmNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQnlaWFIxY200Z1luVm1YRzU5WEc1Y2JpOHZJRk5VUVZSSlF5Qk5SVlJJVDBSVFhHNHZMeUE5UFQwOVBUMDlQVDA5UFQwOVBWeHVYRzVDZFdabVpYSXVhWE5GYm1OdlpHbHVaeUE5SUdaMWJtTjBhVzl1SUNobGJtTnZaR2x1WnlrZ2UxeHVJQ0J6ZDJsMFkyZ2dLRk4wY21sdVp5aGxibU52WkdsdVp5a3VkRzlNYjNkbGNrTmhjMlVvS1NrZ2UxeHVJQ0FnSUdOaGMyVWdKMmhsZUNjNlhHNGdJQ0FnWTJGelpTQW5kWFJtT0NjNlhHNGdJQ0FnWTJGelpTQW5kWFJtTFRnbk9seHVJQ0FnSUdOaGMyVWdKMkZ6WTJscEp6cGNiaUFnSUNCallYTmxJQ2RpYVc1aGNua25PbHh1SUNBZ0lHTmhjMlVnSjJKaGMyVTJOQ2M2WEc0Z0lDQWdZMkZ6WlNBbmNtRjNKenBjYmlBZ0lDQmpZWE5sSUNkMVkzTXlKenBjYmlBZ0lDQmpZWE5sSUNkMVkzTXRNaWM2WEc0Z0lDQWdZMkZ6WlNBbmRYUm1NVFpzWlNjNlhHNGdJQ0FnWTJGelpTQW5kWFJtTFRFMmJHVW5PbHh1SUNBZ0lDQWdjbVYwZFhKdUlIUnlkV1ZjYmlBZ0lDQmtaV1poZFd4ME9seHVJQ0FnSUNBZ2NtVjBkWEp1SUdaaGJITmxYRzRnSUgxY2JuMWNibHh1UW5WbVptVnlMbWx6UW5WbVptVnlJRDBnWm5WdVkzUnBiMjRnS0dJcElIdGNiaUFnY21WMGRYSnVJQ0VoS0dJZ0lUMDlJRzUxYkd3Z0ppWWdZaUFoUFQwZ2RXNWtaV1pwYm1Wa0lDWW1JR0l1WDJselFuVm1abVZ5S1Z4dWZWeHVYRzVDZFdabVpYSXVZbmwwWlV4bGJtZDBhQ0E5SUdaMWJtTjBhVzl1SUNoemRISXNJR1Z1WTI5a2FXNW5LU0I3WEc0Z0lIWmhjaUJ5WlhSY2JpQWdjM1J5SUQwZ2MzUnlJQ3NnSnlkY2JpQWdjM2RwZEdOb0lDaGxibU52WkdsdVp5QjhmQ0FuZFhSbU9DY3BJSHRjYmlBZ0lDQmpZWE5sSUNkb1pYZ25PbHh1SUNBZ0lDQWdjbVYwSUQwZ2MzUnlMbXhsYm1kMGFDQXZJREpjYmlBZ0lDQWdJR0p5WldGclhHNGdJQ0FnWTJGelpTQW5kWFJtT0NjNlhHNGdJQ0FnWTJGelpTQW5kWFJtTFRnbk9seHVJQ0FnSUNBZ2NtVjBJRDBnZFhSbU9GUnZRbmwwWlhNb2MzUnlLUzVzWlc1bmRHaGNiaUFnSUNBZ0lHSnlaV0ZyWEc0Z0lDQWdZMkZ6WlNBbllYTmphV2tuT2x4dUlDQWdJR05oYzJVZ0oySnBibUZ5ZVNjNlhHNGdJQ0FnWTJGelpTQW5jbUYzSnpwY2JpQWdJQ0FnSUhKbGRDQTlJSE4wY2k1c1pXNW5kR2hjYmlBZ0lDQWdJR0p5WldGclhHNGdJQ0FnWTJGelpTQW5ZbUZ6WlRZMEp6cGNiaUFnSUNBZ0lISmxkQ0E5SUdKaGMyVTJORlJ2UW5sMFpYTW9jM1J5S1M1c1pXNW5kR2hjYmlBZ0lDQWdJR0p5WldGclhHNGdJQ0FnWTJGelpTQW5kV056TWljNlhHNGdJQ0FnWTJGelpTQW5kV056TFRJbk9seHVJQ0FnSUdOaGMyVWdKM1YwWmpFMmJHVW5PbHh1SUNBZ0lHTmhjMlVnSjNWMFppMHhObXhsSnpwY2JpQWdJQ0FnSUhKbGRDQTlJSE4wY2k1c1pXNW5kR2dnS2lBeVhHNGdJQ0FnSUNCaWNtVmhhMXh1SUNBZ0lHUmxabUYxYkhRNlhHNGdJQ0FnSUNCMGFISnZkeUJ1WlhjZ1JYSnliM0lvSjFWdWEyNXZkMjRnWlc1amIyUnBibWNuS1Z4dUlDQjlYRzRnSUhKbGRIVnliaUJ5WlhSY2JuMWNibHh1UW5WbVptVnlMbU52Ym1OaGRDQTlJR1oxYm1OMGFXOXVJQ2hzYVhOMExDQjBiM1JoYkV4bGJtZDBhQ2tnZTF4dUlDQmhjM05sY25Rb2FYTkJjbkpoZVNoc2FYTjBLU3dnSjFWellXZGxPaUJDZFdabVpYSXVZMjl1WTJGMEtHeHBjM1FzSUZ0MGIzUmhiRXhsYm1kMGFGMHBYRnh1SnlBclhHNGdJQ0FnSUNBbmJHbHpkQ0J6YUc5MWJHUWdZbVVnWVc0Z1FYSnlZWGt1SnlsY2JseHVJQ0JwWmlBb2JHbHpkQzVzWlc1bmRHZ2dQVDA5SURBcElIdGNiaUFnSUNCeVpYUjFjbTRnYm1WM0lFSjFabVpsY2lnd0tWeHVJQ0I5SUdWc2MyVWdhV1lnS0d4cGMzUXViR1Z1WjNSb0lEMDlQU0F4S1NCN1hHNGdJQ0FnY21WMGRYSnVJR3hwYzNSYk1GMWNiaUFnZlZ4dVhHNGdJSFpoY2lCcFhHNGdJR2xtSUNoMGVYQmxiMllnZEc5MFlXeE1aVzVuZEdnZ0lUMDlJQ2R1ZFcxaVpYSW5LU0I3WEc0Z0lDQWdkRzkwWVd4TVpXNW5kR2dnUFNBd1hHNGdJQ0FnWm05eUlDaHBJRDBnTURzZ2FTQThJR3hwYzNRdWJHVnVaM1JvT3lCcEt5c3BJSHRjYmlBZ0lDQWdJSFJ2ZEdGc1RHVnVaM1JvSUNzOUlHeHBjM1JiYVYwdWJHVnVaM1JvWEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnZG1GeUlHSjFaaUE5SUc1bGR5QkNkV1ptWlhJb2RHOTBZV3hNWlc1bmRHZ3BYRzRnSUhaaGNpQndiM01nUFNBd1hHNGdJR1p2Y2lBb2FTQTlJREE3SUdrZ1BDQnNhWE4wTG14bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ2RtRnlJR2wwWlcwZ1BTQnNhWE4wVzJsZFhHNGdJQ0FnYVhSbGJTNWpiM0I1S0dKMVppd2djRzl6S1Z4dUlDQWdJSEJ2Y3lBclBTQnBkR1Z0TG14bGJtZDBhRnh1SUNCOVhHNGdJSEpsZEhWeWJpQmlkV1pjYm4xY2JseHVMeThnUWxWR1JrVlNJRWxPVTFSQlRrTkZJRTFGVkVoUFJGTmNiaTh2SUQwOVBUMDlQVDA5UFQwOVBUMDlQVDA5UFQwOVBUMDlYRzVjYm1aMWJtTjBhVzl1SUY5b1pYaFhjbWwwWlNBb1luVm1MQ0J6ZEhKcGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0tTQjdYRzRnSUc5bVpuTmxkQ0E5SUU1MWJXSmxjaWh2Wm1aelpYUXBJSHg4SURCY2JpQWdkbUZ5SUhKbGJXRnBibWx1WnlBOUlHSjFaaTVzWlc1bmRHZ2dMU0J2Wm1aelpYUmNiaUFnYVdZZ0tDRnNaVzVuZEdncElIdGNiaUFnSUNCc1pXNW5kR2dnUFNCeVpXMWhhVzVwYm1kY2JpQWdmU0JsYkhObElIdGNiaUFnSUNCc1pXNW5kR2dnUFNCT2RXMWlaWElvYkdWdVozUm9LVnh1SUNBZ0lHbG1JQ2hzWlc1bmRHZ2dQaUJ5WlcxaGFXNXBibWNwSUh0Y2JpQWdJQ0FnSUd4bGJtZDBhQ0E5SUhKbGJXRnBibWx1WjF4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUM4dklHMTFjM1FnWW1VZ1lXNGdaWFpsYmlCdWRXMWlaWElnYjJZZ1pHbG5hWFJ6WEc0Z0lIWmhjaUJ6ZEhKTVpXNGdQU0J6ZEhKcGJtY3ViR1Z1WjNSb1hHNGdJR0Z6YzJWeWRDaHpkSEpNWlc0Z0pTQXlJRDA5UFNBd0xDQW5TVzUyWVd4cFpDQm9aWGdnYzNSeWFXNW5KeWxjYmx4dUlDQnBaaUFvYkdWdVozUm9JRDRnYzNSeVRHVnVJQzhnTWlrZ2UxeHVJQ0FnSUd4bGJtZDBhQ0E5SUhOMGNreGxiaUF2SURKY2JpQWdmVnh1SUNCbWIzSWdLSFpoY2lCcElEMGdNRHNnYVNBOElHeGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdkbUZ5SUdKNWRHVWdQU0J3WVhKelpVbHVkQ2h6ZEhKcGJtY3VjM1ZpYzNSeUtHa2dLaUF5TENBeUtTd2dNVFlwWEc0Z0lDQWdZWE56WlhKMEtDRnBjMDVoVGloaWVYUmxLU3dnSjBsdWRtRnNhV1FnYUdWNElITjBjbWx1WnljcFhHNGdJQ0FnWW5WbVcyOW1abk5sZENBcklHbGRJRDBnWW5sMFpWeHVJQ0I5WEc0Z0lFSjFabVpsY2k1ZlkyaGhjbk5YY21sMGRHVnVJRDBnYVNBcUlESmNiaUFnY21WMGRYSnVJR2xjYm4xY2JseHVablZ1WTNScGIyNGdYM1YwWmpoWGNtbDBaU0FvWW5WbUxDQnpkSEpwYm1jc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1NCN1hHNGdJSFpoY2lCamFHRnljMWR5YVhSMFpXNGdQU0JDZFdabVpYSXVYMk5vWVhKelYzSnBkSFJsYmlBOVhHNGdJQ0FnWW14cGRFSjFabVpsY2loMWRHWTRWRzlDZVhSbGN5aHpkSEpwYm1jcExDQmlkV1lzSUc5bVpuTmxkQ3dnYkdWdVozUm9LVnh1SUNCeVpYUjFjbTRnWTJoaGNuTlhjbWwwZEdWdVhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5aGMyTnBhVmR5YVhSbElDaGlkV1lzSUhOMGNtbHVaeXdnYjJabWMyVjBMQ0JzWlc1bmRHZ3BJSHRjYmlBZ2RtRnlJR05vWVhKelYzSnBkSFJsYmlBOUlFSjFabVpsY2k1ZlkyaGhjbk5YY21sMGRHVnVJRDFjYmlBZ0lDQmliR2wwUW5WbVptVnlLR0Z6WTJscFZHOUNlWFJsY3loemRISnBibWNwTENCaWRXWXNJRzltWm5ObGRDd2diR1Z1WjNSb0tWeHVJQ0J5WlhSMWNtNGdZMmhoY25OWGNtbDBkR1Z1WEc1OVhHNWNibVoxYm1OMGFXOXVJRjlpYVc1aGNubFhjbWwwWlNBb1luVm1MQ0J6ZEhKcGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0tTQjdYRzRnSUhKbGRIVnliaUJmWVhOamFXbFhjbWwwWlNoaWRXWXNJSE4wY21sdVp5d2diMlptYzJWMExDQnNaVzVuZEdncFhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5aVlYTmxOalJYY21sMFpTQW9ZblZtTENCemRISnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9LU0I3WEc0Z0lIWmhjaUJqYUdGeWMxZHlhWFIwWlc0Z1BTQkNkV1ptWlhJdVgyTm9ZWEp6VjNKcGRIUmxiaUE5WEc0Z0lDQWdZbXhwZEVKMVptWmxjaWhpWVhObE5qUlViMEo1ZEdWektITjBjbWx1Wnlrc0lHSjFaaXdnYjJabWMyVjBMQ0JzWlc1bmRHZ3BYRzRnSUhKbGRIVnliaUJqYUdGeWMxZHlhWFIwWlc1Y2JuMWNibHh1Wm5WdVkzUnBiMjRnWDNWMFpqRTJiR1ZYY21sMFpTQW9ZblZtTENCemRISnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9LU0I3WEc0Z0lIWmhjaUJqYUdGeWMxZHlhWFIwWlc0Z1BTQkNkV1ptWlhJdVgyTm9ZWEp6VjNKcGRIUmxiaUE5WEc0Z0lDQWdZbXhwZEVKMVptWmxjaWgxZEdZeE5teGxWRzlDZVhSbGN5aHpkSEpwYm1jcExDQmlkV1lzSUc5bVpuTmxkQ3dnYkdWdVozUm9LVnh1SUNCeVpYUjFjbTRnWTJoaGNuTlhjbWwwZEdWdVhHNTlYRzVjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1ZDNKcGRHVWdQU0JtZFc1amRHbHZiaUFvYzNSeWFXNW5MQ0J2Wm1aelpYUXNJR3hsYm1kMGFDd2daVzVqYjJScGJtY3BJSHRjYmlBZ0x5OGdVM1Z3Y0c5eWRDQmliM1JvSUNoemRISnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9MQ0JsYm1OdlpHbHVaeWxjYmlBZ0x5OGdZVzVrSUhSb1pTQnNaV2RoWTNrZ0tITjBjbWx1Wnl3Z1pXNWpiMlJwYm1jc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1Z4dUlDQnBaaUFvYVhOR2FXNXBkR1VvYjJabWMyVjBLU2tnZTF4dUlDQWdJR2xtSUNnaGFYTkdhVzVwZEdVb2JHVnVaM1JvS1NrZ2UxeHVJQ0FnSUNBZ1pXNWpiMlJwYm1jZ1BTQnNaVzVuZEdoY2JpQWdJQ0FnSUd4bGJtZDBhQ0E5SUhWdVpHVm1hVzVsWkZ4dUlDQWdJSDFjYmlBZ2ZTQmxiSE5sSUhzZ0lDOHZJR3hsWjJGamVWeHVJQ0FnSUhaaGNpQnpkMkZ3SUQwZ1pXNWpiMlJwYm1kY2JpQWdJQ0JsYm1OdlpHbHVaeUE5SUc5bVpuTmxkRnh1SUNBZ0lHOW1abk5sZENBOUlHeGxibWQwYUZ4dUlDQWdJR3hsYm1kMGFDQTlJSE4zWVhCY2JpQWdmVnh1WEc0Z0lHOW1abk5sZENBOUlFNTFiV0psY2lodlptWnpaWFFwSUh4OElEQmNiaUFnZG1GeUlISmxiV0ZwYm1sdVp5QTlJSFJvYVhNdWJHVnVaM1JvSUMwZ2IyWm1jMlYwWEc0Z0lHbG1JQ2doYkdWdVozUm9LU0I3WEc0Z0lDQWdiR1Z1WjNSb0lEMGdjbVZ0WVdsdWFXNW5YRzRnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdiR1Z1WjNSb0lEMGdUblZ0WW1WeUtHeGxibWQwYUNsY2JpQWdJQ0JwWmlBb2JHVnVaM1JvSUQ0Z2NtVnRZV2x1YVc1bktTQjdYRzRnSUNBZ0lDQnNaVzVuZEdnZ1BTQnlaVzFoYVc1cGJtZGNiaUFnSUNCOVhHNGdJSDFjYmlBZ1pXNWpiMlJwYm1jZ1BTQlRkSEpwYm1jb1pXNWpiMlJwYm1jZ2ZId2dKM1YwWmpnbktTNTBiMHh2ZDJWeVEyRnpaU2dwWEc1Y2JpQWdkbUZ5SUhKbGRGeHVJQ0J6ZDJsMFkyZ2dLR1Z1WTI5a2FXNW5LU0I3WEc0Z0lDQWdZMkZ6WlNBbmFHVjRKenBjYmlBZ0lDQWdJSEpsZENBOUlGOW9aWGhYY21sMFpTaDBhR2x6TENCemRISnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9LVnh1SUNBZ0lDQWdZbkpsWVd0Y2JpQWdJQ0JqWVhObElDZDFkR1k0SnpwY2JpQWdJQ0JqWVhObElDZDFkR1l0T0NjNlhHNGdJQ0FnSUNCeVpYUWdQU0JmZFhSbU9GZHlhWFJsS0hSb2FYTXNJSE4wY21sdVp5d2diMlptYzJWMExDQnNaVzVuZEdncFhHNGdJQ0FnSUNCaWNtVmhhMXh1SUNBZ0lHTmhjMlVnSjJGelkybHBKenBjYmlBZ0lDQWdJSEpsZENBOUlGOWhjMk5wYVZkeWFYUmxLSFJvYVhNc0lITjBjbWx1Wnl3Z2IyWm1jMlYwTENCc1pXNW5kR2dwWEc0Z0lDQWdJQ0JpY21WaGExeHVJQ0FnSUdOaGMyVWdKMkpwYm1GeWVTYzZYRzRnSUNBZ0lDQnlaWFFnUFNCZlltbHVZWEo1VjNKcGRHVW9kR2hwY3l3Z2MzUnlhVzVuTENCdlptWnpaWFFzSUd4bGJtZDBhQ2xjYmlBZ0lDQWdJR0p5WldGclhHNGdJQ0FnWTJGelpTQW5ZbUZ6WlRZMEp6cGNiaUFnSUNBZ0lISmxkQ0E5SUY5aVlYTmxOalJYY21sMFpTaDBhR2x6TENCemRISnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9LVnh1SUNBZ0lDQWdZbkpsWVd0Y2JpQWdJQ0JqWVhObElDZDFZM015SnpwY2JpQWdJQ0JqWVhObElDZDFZM010TWljNlhHNGdJQ0FnWTJGelpTQW5kWFJtTVRac1pTYzZYRzRnSUNBZ1kyRnpaU0FuZFhSbUxURTJiR1VuT2x4dUlDQWdJQ0FnY21WMElEMGdYM1YwWmpFMmJHVlhjbWwwWlNoMGFHbHpMQ0J6ZEhKcGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0tWeHVJQ0FnSUNBZ1luSmxZV3RjYmlBZ0lDQmtaV1poZFd4ME9seHVJQ0FnSUNBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0NkVmJtdHViM2R1SUdWdVkyOWthVzVuSnlsY2JpQWdmVnh1SUNCeVpYUjFjbTRnY21WMFhHNTlYRzVjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1ZEc5VGRISnBibWNnUFNCbWRXNWpkR2x2YmlBb1pXNWpiMlJwYm1jc0lITjBZWEowTENCbGJtUXBJSHRjYmlBZ2RtRnlJSE5sYkdZZ1BTQjBhR2x6WEc1Y2JpQWdaVzVqYjJScGJtY2dQU0JUZEhKcGJtY29aVzVqYjJScGJtY2dmSHdnSjNWMFpqZ25LUzUwYjB4dmQyVnlRMkZ6WlNncFhHNGdJSE4wWVhKMElEMGdUblZ0WW1WeUtITjBZWEowS1NCOGZDQXdYRzRnSUdWdVpDQTlJQ2hsYm1RZ0lUMDlJSFZ1WkdWbWFXNWxaQ2xjYmlBZ0lDQS9JRTUxYldKbGNpaGxibVFwWEc0Z0lDQWdPaUJsYm1RZ1BTQnpaV3htTG14bGJtZDBhRnh1WEc0Z0lDOHZJRVpoYzNSd1lYUm9JR1Z0Y0hSNUlITjBjbWx1WjNOY2JpQWdhV1lnS0dWdVpDQTlQVDBnYzNSaGNuUXBYRzRnSUNBZ2NtVjBkWEp1SUNjblhHNWNiaUFnZG1GeUlISmxkRnh1SUNCemQybDBZMmdnS0dWdVkyOWthVzVuS1NCN1hHNGdJQ0FnWTJGelpTQW5hR1Y0SnpwY2JpQWdJQ0FnSUhKbGRDQTlJRjlvWlhoVGJHbGpaU2h6Wld4bUxDQnpkR0Z5ZEN3Z1pXNWtLVnh1SUNBZ0lDQWdZbkpsWVd0Y2JpQWdJQ0JqWVhObElDZDFkR1k0SnpwY2JpQWdJQ0JqWVhObElDZDFkR1l0T0NjNlhHNGdJQ0FnSUNCeVpYUWdQU0JmZFhSbU9GTnNhV05sS0hObGJHWXNJSE4wWVhKMExDQmxibVFwWEc0Z0lDQWdJQ0JpY21WaGExeHVJQ0FnSUdOaGMyVWdKMkZ6WTJscEp6cGNiaUFnSUNBZ0lISmxkQ0E5SUY5aGMyTnBhVk5zYVdObEtITmxiR1lzSUhOMFlYSjBMQ0JsYm1RcFhHNGdJQ0FnSUNCaWNtVmhhMXh1SUNBZ0lHTmhjMlVnSjJKcGJtRnllU2M2WEc0Z0lDQWdJQ0J5WlhRZ1BTQmZZbWx1WVhKNVUyeHBZMlVvYzJWc1ppd2djM1JoY25Rc0lHVnVaQ2xjYmlBZ0lDQWdJR0p5WldGclhHNGdJQ0FnWTJGelpTQW5ZbUZ6WlRZMEp6cGNiaUFnSUNBZ0lISmxkQ0E5SUY5aVlYTmxOalJUYkdsalpTaHpaV3htTENCemRHRnlkQ3dnWlc1a0tWeHVJQ0FnSUNBZ1luSmxZV3RjYmlBZ0lDQmpZWE5sSUNkMVkzTXlKenBjYmlBZ0lDQmpZWE5sSUNkMVkzTXRNaWM2WEc0Z0lDQWdZMkZ6WlNBbmRYUm1NVFpzWlNjNlhHNGdJQ0FnWTJGelpTQW5kWFJtTFRFMmJHVW5PbHh1SUNBZ0lDQWdjbVYwSUQwZ1gzVjBaakUyYkdWVGJHbGpaU2h6Wld4bUxDQnpkR0Z5ZEN3Z1pXNWtLVnh1SUNBZ0lDQWdZbkpsWVd0Y2JpQWdJQ0JrWldaaGRXeDBPbHh1SUNBZ0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZFZibXR1YjNkdUlHVnVZMjlrYVc1bkp5bGNiaUFnZlZ4dUlDQnlaWFIxY200Z2NtVjBYRzU5WEc1Y2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdWRHOUtVMDlPSUQwZ1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNCeVpYUjFjbTRnZTF4dUlDQWdJSFI1Y0dVNklDZENkV1ptWlhJbkxGeHVJQ0FnSUdSaGRHRTZJRUZ5Y21GNUxuQnliM1J2ZEhsd1pTNXpiR2xqWlM1allXeHNLSFJvYVhNdVgyRnljaUI4ZkNCMGFHbHpMQ0F3S1Z4dUlDQjlYRzU5WEc1Y2JpOHZJR052Y0hrb2RHRnlaMlYwUW5WbVptVnlMQ0IwWVhKblpYUlRkR0Z5ZEQwd0xDQnpiM1Z5WTJWVGRHRnlkRDB3TENCemIzVnlZMlZGYm1ROVluVm1abVZ5TG14bGJtZDBhQ2xjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1WTI5d2VTQTlJR1oxYm1OMGFXOXVJQ2gwWVhKblpYUXNJSFJoY21kbGRGOXpkR0Z5ZEN3Z2MzUmhjblFzSUdWdVpDa2dlMXh1SUNCMllYSWdjMjkxY21ObElEMGdkR2hwYzF4dVhHNGdJR2xtSUNnaGMzUmhjblFwSUhOMFlYSjBJRDBnTUZ4dUlDQnBaaUFvSVdWdVpDQW1KaUJsYm1RZ0lUMDlJREFwSUdWdVpDQTlJSFJvYVhNdWJHVnVaM1JvWEc0Z0lHbG1JQ2doZEdGeVoyVjBYM04wWVhKMEtTQjBZWEpuWlhSZmMzUmhjblFnUFNBd1hHNWNiaUFnTHk4Z1EyOXdlU0F3SUdKNWRHVnpPeUIzWlNkeVpTQmtiMjVsWEc0Z0lHbG1JQ2hsYm1RZ1BUMDlJSE4wWVhKMEtTQnlaWFIxY201Y2JpQWdhV1lnS0hSaGNtZGxkQzVzWlc1bmRHZ2dQVDA5SURBZ2ZId2djMjkxY21ObExteGxibWQwYUNBOVBUMGdNQ2tnY21WMGRYSnVYRzVjYmlBZ0x5OGdSbUYwWVd3Z1pYSnliM0lnWTI5dVpHbDBhVzl1YzF4dUlDQmhjM05sY25Rb1pXNWtJRDQ5SUhOMFlYSjBMQ0FuYzI5MWNtTmxSVzVrSUR3Z2MyOTFjbU5sVTNSaGNuUW5LVnh1SUNCaGMzTmxjblFvZEdGeVoyVjBYM04wWVhKMElENDlJREFnSmlZZ2RHRnlaMlYwWDNOMFlYSjBJRHdnZEdGeVoyVjBMbXhsYm1kMGFDeGNiaUFnSUNBZ0lDZDBZWEpuWlhSVGRHRnlkQ0J2ZFhRZ2IyWWdZbTkxYm1Sekp5bGNiaUFnWVhOelpYSjBLSE4wWVhKMElENDlJREFnSmlZZ2MzUmhjblFnUENCemIzVnlZMlV1YkdWdVozUm9MQ0FuYzI5MWNtTmxVM1JoY25RZ2IzVjBJRzltSUdKdmRXNWtjeWNwWEc0Z0lHRnpjMlZ5ZENobGJtUWdQajBnTUNBbUppQmxibVFnUEQwZ2MyOTFjbU5sTG14bGJtZDBhQ3dnSjNOdmRYSmpaVVZ1WkNCdmRYUWdiMllnWW05MWJtUnpKeWxjYmx4dUlDQXZMeUJCY21VZ2QyVWdiMjlpUDF4dUlDQnBaaUFvWlc1a0lENGdkR2hwY3k1c1pXNW5kR2dwWEc0Z0lDQWdaVzVrSUQwZ2RHaHBjeTVzWlc1bmRHaGNiaUFnYVdZZ0tIUmhjbWRsZEM1c1pXNW5kR2dnTFNCMFlYSm5aWFJmYzNSaGNuUWdQQ0JsYm1RZ0xTQnpkR0Z5ZENsY2JpQWdJQ0JsYm1RZ1BTQjBZWEpuWlhRdWJHVnVaM1JvSUMwZ2RHRnlaMlYwWDNOMFlYSjBJQ3NnYzNSaGNuUmNibHh1SUNCMllYSWdiR1Z1SUQwZ1pXNWtJQzBnYzNSaGNuUmNibHh1SUNCcFppQW9iR1Z1SUR3Z01UQXdJSHg4SUNGQ2RXWm1aWEl1WDNWelpWUjVjR1ZrUVhKeVlYbHpLU0I3WEc0Z0lDQWdabTl5SUNoMllYSWdhU0E5SURBN0lHa2dQQ0JzWlc0N0lHa3JLeWxjYmlBZ0lDQWdJSFJoY21kbGRGdHBJQ3NnZEdGeVoyVjBYM04wWVhKMFhTQTlJSFJvYVhOYmFTQXJJSE4wWVhKMFhWeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lIUmhjbWRsZEM1ZmMyVjBLSFJvYVhNdWMzVmlZWEp5WVhrb2MzUmhjblFzSUhOMFlYSjBJQ3NnYkdWdUtTd2dkR0Z5WjJWMFgzTjBZWEowS1Z4dUlDQjlYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOWlZWE5sTmpSVGJHbGpaU0FvWW5WbUxDQnpkR0Z5ZEN3Z1pXNWtLU0I3WEc0Z0lHbG1JQ2h6ZEdGeWRDQTlQVDBnTUNBbUppQmxibVFnUFQwOUlHSjFaaTVzWlc1bmRHZ3BJSHRjYmlBZ0lDQnlaWFIxY200Z1ltRnpaVFkwTG1aeWIyMUNlWFJsUVhKeVlYa29ZblZtS1Z4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUhKbGRIVnliaUJpWVhObE5qUXVabkp2YlVKNWRHVkJjbkpoZVNoaWRXWXVjMnhwWTJVb2MzUmhjblFzSUdWdVpDa3BYRzRnSUgxY2JuMWNibHh1Wm5WdVkzUnBiMjRnWDNWMFpqaFRiR2xqWlNBb1luVm1MQ0J6ZEdGeWRDd2daVzVrS1NCN1hHNGdJSFpoY2lCeVpYTWdQU0FuSjF4dUlDQjJZWElnZEcxd0lEMGdKeWRjYmlBZ1pXNWtJRDBnVFdGMGFDNXRhVzRvWW5WbUxteGxibWQwYUN3Z1pXNWtLVnh1WEc0Z0lHWnZjaUFvZG1GeUlHa2dQU0J6ZEdGeWREc2dhU0E4SUdWdVpEc2dhU3NyS1NCN1hHNGdJQ0FnYVdZZ0tHSjFabHRwWFNBOFBTQXdlRGRHS1NCN1hHNGdJQ0FnSUNCeVpYTWdLejBnWkdWamIyUmxWWFJtT0VOb1lYSW9kRzF3S1NBcklGTjBjbWx1Wnk1bWNtOXRRMmhoY2tOdlpHVW9ZblZtVzJsZEtWeHVJQ0FnSUNBZ2RHMXdJRDBnSnlkY2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdkRzF3SUNzOUlDY2xKeUFySUdKMVpsdHBYUzUwYjFOMGNtbHVaeWd4TmlsY2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCeVpYUjFjbTRnY21WeklDc2daR1ZqYjJSbFZYUm1PRU5vWVhJb2RHMXdLVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmZZWE5qYVdsVGJHbGpaU0FvWW5WbUxDQnpkR0Z5ZEN3Z1pXNWtLU0I3WEc0Z0lIWmhjaUJ5WlhRZ1BTQW5KMXh1SUNCbGJtUWdQU0JOWVhSb0xtMXBiaWhpZFdZdWJHVnVaM1JvTENCbGJtUXBYRzVjYmlBZ1ptOXlJQ2gyWVhJZ2FTQTlJSE4wWVhKME95QnBJRHdnWlc1a095QnBLeXNwWEc0Z0lDQWdjbVYwSUNzOUlGTjBjbWx1Wnk1bWNtOXRRMmhoY2tOdlpHVW9ZblZtVzJsZEtWeHVJQ0J5WlhSMWNtNGdjbVYwWEc1OVhHNWNibVoxYm1OMGFXOXVJRjlpYVc1aGNubFRiR2xqWlNBb1luVm1MQ0J6ZEdGeWRDd2daVzVrS1NCN1hHNGdJSEpsZEhWeWJpQmZZWE5qYVdsVGJHbGpaU2hpZFdZc0lITjBZWEowTENCbGJtUXBYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOW9aWGhUYkdsalpTQW9ZblZtTENCemRHRnlkQ3dnWlc1a0tTQjdYRzRnSUhaaGNpQnNaVzRnUFNCaWRXWXViR1Z1WjNSb1hHNWNiaUFnYVdZZ0tDRnpkR0Z5ZENCOGZDQnpkR0Z5ZENBOElEQXBJSE4wWVhKMElEMGdNRnh1SUNCcFppQW9JV1Z1WkNCOGZDQmxibVFnUENBd0lIeDhJR1Z1WkNBK0lHeGxiaWtnWlc1a0lEMGdiR1Z1WEc1Y2JpQWdkbUZ5SUc5MWRDQTlJQ2NuWEc0Z0lHWnZjaUFvZG1GeUlHa2dQU0J6ZEdGeWREc2dhU0E4SUdWdVpEc2dhU3NyS1NCN1hHNGdJQ0FnYjNWMElDczlJSFJ2U0dWNEtHSjFabHRwWFNsY2JpQWdmVnh1SUNCeVpYUjFjbTRnYjNWMFhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5MWRHWXhObXhsVTJ4cFkyVWdLR0oxWml3Z2MzUmhjblFzSUdWdVpDa2dlMXh1SUNCMllYSWdZbmwwWlhNZ1BTQmlkV1l1YzJ4cFkyVW9jM1JoY25Rc0lHVnVaQ2xjYmlBZ2RtRnlJSEpsY3lBOUlDY25YRzRnSUdadmNpQW9kbUZ5SUdrZ1BTQXdPeUJwSUR3Z1lubDBaWE11YkdWdVozUm9PeUJwSUNzOUlESXBJSHRjYmlBZ0lDQnlaWE1nS3owZ1UzUnlhVzVuTG1aeWIyMURhR0Z5UTI5a1pTaGllWFJsYzF0cFhTQXJJR0o1ZEdWelcya3JNVjBnS2lBeU5UWXBYRzRnSUgxY2JpQWdjbVYwZFhKdUlISmxjMXh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuTnNhV05sSUQwZ1puVnVZM1JwYjI0Z0tITjBZWEowTENCbGJtUXBJSHRjYmlBZ2RtRnlJR3hsYmlBOUlIUm9hWE11YkdWdVozUm9YRzRnSUhOMFlYSjBJRDBnWTJ4aGJYQW9jM1JoY25Rc0lHeGxiaXdnTUNsY2JpQWdaVzVrSUQwZ1kyeGhiWEFvWlc1a0xDQnNaVzRzSUd4bGJpbGNibHh1SUNCcFppQW9RblZtWm1WeUxsOTFjMlZVZVhCbFpFRnljbUY1Y3lrZ2UxeHVJQ0FnSUhKbGRIVnliaUJDZFdabVpYSXVYMkYxWjIxbGJuUW9kR2hwY3k1emRXSmhjbkpoZVNoemRHRnlkQ3dnWlc1a0tTbGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQjJZWElnYzJ4cFkyVk1aVzRnUFNCbGJtUWdMU0J6ZEdGeWRGeHVJQ0FnSUhaaGNpQnVaWGRDZFdZZ1BTQnVaWGNnUW5WbVptVnlLSE5zYVdObFRHVnVMQ0IxYm1SbFptbHVaV1FzSUhSeWRXVXBYRzRnSUNBZ1ptOXlJQ2gyWVhJZ2FTQTlJREE3SUdrZ1BDQnpiR2xqWlV4bGJqc2dhU3NyS1NCN1hHNGdJQ0FnSUNCdVpYZENkV1piYVYwZ1BTQjBhR2x6VzJrZ0t5QnpkR0Z5ZEYxY2JpQWdJQ0I5WEc0Z0lDQWdjbVYwZFhKdUlHNWxkMEoxWmx4dUlDQjlYRzU5WEc1Y2JpOHZJR0JuWlhSZ0lIZHBiR3dnWW1VZ2NtVnRiM1psWkNCcGJpQk9iMlJsSURBdU1UTXJYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbWRsZENBOUlHWjFibU4wYVc5dUlDaHZabVp6WlhRcElIdGNiaUFnWTI5dWMyOXNaUzVzYjJjb0p5NW5aWFFvS1NCcGN5QmtaWEJ5WldOaGRHVmtMaUJCWTJObGMzTWdkWE5wYm1jZ1lYSnlZWGtnYVc1a1pYaGxjeUJwYm5OMFpXRmtMaWNwWEc0Z0lISmxkSFZ5YmlCMGFHbHpMbkpsWVdSVlNXNTBPQ2h2Wm1aelpYUXBYRzU5WEc1Y2JpOHZJR0J6WlhSZ0lIZHBiR3dnWW1VZ2NtVnRiM1psWkNCcGJpQk9iMlJsSURBdU1UTXJYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbk5sZENBOUlHWjFibU4wYVc5dUlDaDJMQ0J2Wm1aelpYUXBJSHRjYmlBZ1kyOXVjMjlzWlM1c2IyY29KeTV6WlhRb0tTQnBjeUJrWlhCeVpXTmhkR1ZrTGlCQlkyTmxjM01nZFhOcGJtY2dZWEp5WVhrZ2FXNWtaWGhsY3lCcGJuTjBaV0ZrTGljcFhHNGdJSEpsZEhWeWJpQjBhR2x6TG5keWFYUmxWVWx1ZERnb2Rpd2diMlptYzJWMEtWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5KbFlXUlZTVzUwT0NBOUlHWjFibU4wYVc5dUlDaHZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUdsbUlDZ2hibTlCYzNObGNuUXBJSHRjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnYjJabWMyVjBJQ0U5UFNCdWRXeHNMQ0FuYldsemMybHVaeUJ2Wm1aelpYUW5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnUENCMGFHbHpMbXhsYm1kMGFDd2dKMVJ5ZVdsdVp5QjBieUJ5WldGa0lHSmxlVzl1WkNCaWRXWm1aWElnYkdWdVozUm9KeWxjYmlBZ2ZWeHVYRzRnSUdsbUlDaHZabVp6WlhRZ1BqMGdkR2hwY3k1c1pXNW5kR2dwWEc0Z0lDQWdjbVYwZFhKdVhHNWNiaUFnY21WMGRYSnVJSFJvYVhOYmIyWm1jMlYwWFZ4dWZWeHVYRzVtZFc1amRHbHZiaUJmY21WaFpGVkpiblF4TmlBb1luVm1MQ0J2Wm1aelpYUXNJR3hwZEhSc1pVVnVaR2xoYml3Z2JtOUJjM05sY25RcElIdGNiaUFnYVdZZ0tDRnViMEZ6YzJWeWRDa2dlMXh1SUNBZ0lHRnpjMlZ5ZENoMGVYQmxiMllnYkdsMGRHeGxSVzVrYVdGdUlEMDlQU0FuWW05dmJHVmhiaWNzSUNkdGFYTnphVzVuSUc5eUlHbHVkbUZzYVdRZ1pXNWthV0Z1SnlsY2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2IyWm1jMlYwSUNFOVBTQnVkV3hzTENBbmJXbHpjMmx1WnlCdlptWnpaWFFuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ0t5QXhJRHdnWW5WbUxteGxibWQwYUN3Z0oxUnllV2x1WnlCMGJ5QnlaV0ZrSUdKbGVXOXVaQ0JpZFdabVpYSWdiR1Z1WjNSb0p5bGNiaUFnZlZ4dVhHNGdJSFpoY2lCc1pXNGdQU0JpZFdZdWJHVnVaM1JvWEc0Z0lHbG1JQ2h2Wm1aelpYUWdQajBnYkdWdUtWeHVJQ0FnSUhKbGRIVnlibHh1WEc0Z0lIWmhjaUIyWVd4Y2JpQWdhV1lnS0d4cGRIUnNaVVZ1WkdsaGJpa2dlMXh1SUNBZ0lIWmhiQ0E5SUdKMVpsdHZabVp6WlhSZFhHNGdJQ0FnYVdZZ0tHOW1abk5sZENBcklERWdQQ0JzWlc0cFhHNGdJQ0FnSUNCMllXd2dmRDBnWW5WbVcyOW1abk5sZENBcklERmRJRHc4SURoY2JpQWdmU0JsYkhObElIdGNiaUFnSUNCMllXd2dQU0JpZFdaYmIyWm1jMlYwWFNBOFBDQTRYRzRnSUNBZ2FXWWdLRzltWm5ObGRDQXJJREVnUENCc1pXNHBYRzRnSUNBZ0lDQjJZV3dnZkQwZ1luVm1XMjltWm5ObGRDQXJJREZkWEc0Z0lIMWNiaUFnY21WMGRYSnVJSFpoYkZ4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbkpsWVdSVlNXNTBNVFpNUlNBOUlHWjFibU4wYVc5dUlDaHZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUhKbGRIVnliaUJmY21WaFpGVkpiblF4TmloMGFHbHpMQ0J2Wm1aelpYUXNJSFJ5ZFdVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5KbFlXUlZTVzUwTVRaQ1JTQTlJR1oxYm1OMGFXOXVJQ2h2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lISmxkSFZ5YmlCZmNtVmhaRlZKYm5ReE5paDBhR2x6TENCdlptWnpaWFFzSUdaaGJITmxMQ0J1YjBGemMyVnlkQ2xjYm4xY2JseHVablZ1WTNScGIyNGdYM0psWVdSVlNXNTBNeklnS0dKMVppd2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSUc1dlFYTnpaWEowS1NCN1hHNGdJR2xtSUNnaGJtOUJjM05sY25RcElIdGNiaUFnSUNCaGMzTmxjblFvZEhsd1pXOW1JR3hwZEhSc1pVVnVaR2xoYmlBOVBUMGdKMkp2YjJ4bFlXNG5MQ0FuYldsemMybHVaeUJ2Y2lCcGJuWmhiR2xrSUdWdVpHbGhiaWNwWEc0Z0lDQWdZWE56WlhKMEtHOW1abk5sZENBaFBUMGdkVzVrWldacGJtVmtJQ1ltSUc5bVpuTmxkQ0FoUFQwZ2JuVnNiQ3dnSjIxcGMzTnBibWNnYjJabWMyVjBKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNzZ015QThJR0oxWmk1c1pXNW5kR2dzSUNkVWNubHBibWNnZEc4Z2NtVmhaQ0JpWlhsdmJtUWdZblZtWm1WeUlHeGxibWQwYUNjcFhHNGdJSDFjYmx4dUlDQjJZWElnYkdWdUlEMGdZblZtTG14bGJtZDBhRnh1SUNCcFppQW9iMlptYzJWMElENDlJR3hsYmlsY2JpQWdJQ0J5WlhSMWNtNWNibHh1SUNCMllYSWdkbUZzWEc0Z0lHbG1JQ2hzYVhSMGJHVkZibVJwWVc0cElIdGNiaUFnSUNCcFppQW9iMlptYzJWMElDc2dNaUE4SUd4bGJpbGNiaUFnSUNBZ0lIWmhiQ0E5SUdKMVpsdHZabVp6WlhRZ0t5QXlYU0E4UENBeE5seHVJQ0FnSUdsbUlDaHZabVp6WlhRZ0t5QXhJRHdnYkdWdUtWeHVJQ0FnSUNBZ2RtRnNJSHc5SUdKMVpsdHZabVp6WlhRZ0t5QXhYU0E4UENBNFhHNGdJQ0FnZG1Gc0lIdzlJR0oxWmx0dlptWnpaWFJkWEc0Z0lDQWdhV1lnS0c5bVpuTmxkQ0FySURNZ1BDQnNaVzRwWEc0Z0lDQWdJQ0IyWVd3Z1BTQjJZV3dnS3lBb1luVm1XMjltWm5ObGRDQXJJRE5kSUR3OElESTBJRDQrUGlBd0tWeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lHbG1JQ2h2Wm1aelpYUWdLeUF4SUR3Z2JHVnVLVnh1SUNBZ0lDQWdkbUZzSUQwZ1luVm1XMjltWm5ObGRDQXJJREZkSUR3OElERTJYRzRnSUNBZ2FXWWdLRzltWm5ObGRDQXJJRElnUENCc1pXNHBYRzRnSUNBZ0lDQjJZV3dnZkQwZ1luVm1XMjltWm5ObGRDQXJJREpkSUR3OElEaGNiaUFnSUNCcFppQW9iMlptYzJWMElDc2dNeUE4SUd4bGJpbGNiaUFnSUNBZ0lIWmhiQ0I4UFNCaWRXWmJiMlptYzJWMElDc2dNMTFjYmlBZ0lDQjJZV3dnUFNCMllXd2dLeUFvWW5WbVcyOW1abk5sZEYwZ1BEd2dNalFnUGo0K0lEQXBYRzRnSUgxY2JpQWdjbVYwZFhKdUlIWmhiRnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuSmxZV1JWU1c1ME16Sk1SU0E5SUdaMWJtTjBhVzl1SUNodlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJSEpsZEhWeWJpQmZjbVZoWkZWSmJuUXpNaWgwYUdsekxDQnZabVp6WlhRc0lIUnlkV1VzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbkpsWVdSVlNXNTBNekpDUlNBOUlHWjFibU4wYVc5dUlDaHZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUhKbGRIVnliaUJmY21WaFpGVkpiblF6TWloMGFHbHpMQ0J2Wm1aelpYUXNJR1poYkhObExDQnViMEZ6YzJWeWRDbGNibjFjYmx4dVFuVm1abVZ5TG5CeWIzUnZkSGx3WlM1eVpXRmtTVzUwT0NBOUlHWjFibU4wYVc5dUlDaHZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUdsbUlDZ2hibTlCYzNObGNuUXBJSHRjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnYjJabWMyVjBJQ0U5UFNCdWRXeHNMRnh1SUNBZ0lDQWdJQ0FuYldsemMybHVaeUJ2Wm1aelpYUW5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnUENCMGFHbHpMbXhsYm1kMGFDd2dKMVJ5ZVdsdVp5QjBieUJ5WldGa0lHSmxlVzl1WkNCaWRXWm1aWElnYkdWdVozUm9KeWxjYmlBZ2ZWeHVYRzRnSUdsbUlDaHZabVp6WlhRZ1BqMGdkR2hwY3k1c1pXNW5kR2dwWEc0Z0lDQWdjbVYwZFhKdVhHNWNiaUFnZG1GeUlHNWxaeUE5SUhSb2FYTmJiMlptYzJWMFhTQW1JREI0T0RCY2JpQWdhV1lnS0c1bFp5bGNiaUFnSUNCeVpYUjFjbTRnS0RCNFptWWdMU0IwYUdselcyOW1abk5sZEYwZ0t5QXhLU0FxSUMweFhHNGdJR1ZzYzJWY2JpQWdJQ0J5WlhSMWNtNGdkR2hwYzF0dlptWnpaWFJkWEc1OVhHNWNibVoxYm1OMGFXOXVJRjl5WldGa1NXNTBNVFlnS0dKMVppd2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSUc1dlFYTnpaWEowS1NCN1hHNGdJR2xtSUNnaGJtOUJjM05sY25RcElIdGNiaUFnSUNCaGMzTmxjblFvZEhsd1pXOW1JR3hwZEhSc1pVVnVaR2xoYmlBOVBUMGdKMkp2YjJ4bFlXNG5MQ0FuYldsemMybHVaeUJ2Y2lCcGJuWmhiR2xrSUdWdVpHbGhiaWNwWEc0Z0lDQWdZWE56WlhKMEtHOW1abk5sZENBaFBUMGdkVzVrWldacGJtVmtJQ1ltSUc5bVpuTmxkQ0FoUFQwZ2JuVnNiQ3dnSjIxcGMzTnBibWNnYjJabWMyVjBKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNzZ01TQThJR0oxWmk1c1pXNW5kR2dzSUNkVWNubHBibWNnZEc4Z2NtVmhaQ0JpWlhsdmJtUWdZblZtWm1WeUlHeGxibWQwYUNjcFhHNGdJSDFjYmx4dUlDQjJZWElnYkdWdUlEMGdZblZtTG14bGJtZDBhRnh1SUNCcFppQW9iMlptYzJWMElENDlJR3hsYmlsY2JpQWdJQ0J5WlhSMWNtNWNibHh1SUNCMllYSWdkbUZzSUQwZ1gzSmxZV1JWU1c1ME1UWW9ZblZtTENCdlptWnpaWFFzSUd4cGRIUnNaVVZ1WkdsaGJpd2dkSEoxWlNsY2JpQWdkbUZ5SUc1bFp5QTlJSFpoYkNBbUlEQjRPREF3TUZ4dUlDQnBaaUFvYm1WbktWeHVJQ0FnSUhKbGRIVnliaUFvTUhobVptWm1JQzBnZG1Gc0lDc2dNU2tnS2lBdE1WeHVJQ0JsYkhObFhHNGdJQ0FnY21WMGRYSnVJSFpoYkZ4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbkpsWVdSSmJuUXhOa3hGSUQwZ1puVnVZM1JwYjI0Z0tHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnY21WMGRYSnVJRjl5WldGa1NXNTBNVFlvZEdocGN5d2diMlptYzJWMExDQjBjblZsTENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1UW5WbVptVnlMbkJ5YjNSdmRIbHdaUzV5WldGa1NXNTBNVFpDUlNBOUlHWjFibU4wYVc5dUlDaHZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUhKbGRIVnliaUJmY21WaFpFbHVkREUyS0hSb2FYTXNJRzltWm5ObGRDd2dabUZzYzJVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1bWRXNWpkR2x2YmlCZmNtVmhaRWx1ZERNeUlDaGlkV1lzSUc5bVpuTmxkQ3dnYkdsMGRHeGxSVzVrYVdGdUxDQnViMEZ6YzJWeWRDa2dlMXh1SUNCcFppQW9JVzV2UVhOelpYSjBLU0I3WEc0Z0lDQWdZWE56WlhKMEtIUjVjR1Z2WmlCc2FYUjBiR1ZGYm1ScFlXNGdQVDA5SUNkaWIyOXNaV0Z1Snl3Z0oyMXBjM05wYm1jZ2IzSWdhVzUyWVd4cFpDQmxibVJwWVc0bktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdJVDA5SUhWdVpHVm1hVzVsWkNBbUppQnZabVp6WlhRZ0lUMDlJRzUxYkd3c0lDZHRhWE56YVc1bklHOW1abk5sZENjcFhHNGdJQ0FnWVhOelpYSjBLRzltWm5ObGRDQXJJRE1nUENCaWRXWXViR1Z1WjNSb0xDQW5WSEo1YVc1bklIUnZJSEpsWVdRZ1ltVjViMjVrSUdKMVptWmxjaUJzWlc1bmRHZ25LVnh1SUNCOVhHNWNiaUFnZG1GeUlHeGxiaUE5SUdKMVppNXNaVzVuZEdoY2JpQWdhV1lnS0c5bVpuTmxkQ0ErUFNCc1pXNHBYRzRnSUNBZ2NtVjBkWEp1WEc1Y2JpQWdkbUZ5SUhaaGJDQTlJRjl5WldGa1ZVbHVkRE15S0dKMVppd2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSUhSeWRXVXBYRzRnSUhaaGNpQnVaV2NnUFNCMllXd2dKaUF3ZURnd01EQXdNREF3WEc0Z0lHbG1JQ2h1WldjcFhHNGdJQ0FnY21WMGRYSnVJQ2d3ZUdabVptWm1abVptSUMwZ2RtRnNJQ3NnTVNrZ0tpQXRNVnh1SUNCbGJITmxYRzRnSUNBZ2NtVjBkWEp1SUhaaGJGeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5KbFlXUkpiblF6TWt4RklEMGdablZ1WTNScGIyNGdLRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ2NtVjBkWEp1SUY5eVpXRmtTVzUwTXpJb2RHaHBjeXdnYjJabWMyVjBMQ0IwY25WbExDQnViMEZ6YzJWeWRDbGNibjFjYmx4dVFuVm1abVZ5TG5CeWIzUnZkSGx3WlM1eVpXRmtTVzUwTXpKQ1JTQTlJR1oxYm1OMGFXOXVJQ2h2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lISmxkSFZ5YmlCZmNtVmhaRWx1ZERNeUtIUm9hWE1zSUc5bVpuTmxkQ3dnWm1Gc2MyVXNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmZjbVZoWkVac2IyRjBJQ2hpZFdZc0lHOW1abk5sZEN3Z2JHbDBkR3hsUlc1a2FXRnVMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQnBaaUFvSVc1dlFYTnpaWEowS1NCN1hHNGdJQ0FnWVhOelpYSjBLSFI1Y0dWdlppQnNhWFIwYkdWRmJtUnBZVzRnUFQwOUlDZGliMjlzWldGdUp5d2dKMjFwYzNOcGJtY2diM0lnYVc1MllXeHBaQ0JsYm1ScFlXNG5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnS3lBeklEd2dZblZtTG14bGJtZDBhQ3dnSjFSeWVXbHVaeUIwYnlCeVpXRmtJR0psZVc5dVpDQmlkV1ptWlhJZ2JHVnVaM1JvSnlsY2JpQWdmVnh1WEc0Z0lISmxkSFZ5YmlCcFpXVmxOelUwTG5KbFlXUW9ZblZtTENCdlptWnpaWFFzSUd4cGRIUnNaVVZ1WkdsaGJpd2dNak1zSURRcFhHNTlYRzVjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1Y21WaFpFWnNiMkYwVEVVZ1BTQm1kVzVqZEdsdmJpQW9iMlptYzJWMExDQnViMEZ6YzJWeWRDa2dlMXh1SUNCeVpYUjFjbTRnWDNKbFlXUkdiRzloZENoMGFHbHpMQ0J2Wm1aelpYUXNJSFJ5ZFdVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5KbFlXUkdiRzloZEVKRklEMGdablZ1WTNScGIyNGdLRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ2NtVjBkWEp1SUY5eVpXRmtSbXh2WVhRb2RHaHBjeXdnYjJabWMyVjBMQ0JtWVd4elpTd2dibTlCYzNObGNuUXBYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOXlaV0ZrUkc5MVlteGxJQ2hpZFdZc0lHOW1abk5sZEN3Z2JHbDBkR3hsUlc1a2FXRnVMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQnBaaUFvSVc1dlFYTnpaWEowS1NCN1hHNGdJQ0FnWVhOelpYSjBLSFI1Y0dWdlppQnNhWFIwYkdWRmJtUnBZVzRnUFQwOUlDZGliMjlzWldGdUp5d2dKMjFwYzNOcGJtY2diM0lnYVc1MllXeHBaQ0JsYm1ScFlXNG5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnS3lBM0lEd2dZblZtTG14bGJtZDBhQ3dnSjFSeWVXbHVaeUIwYnlCeVpXRmtJR0psZVc5dVpDQmlkV1ptWlhJZ2JHVnVaM1JvSnlsY2JpQWdmVnh1WEc0Z0lISmxkSFZ5YmlCcFpXVmxOelUwTG5KbFlXUW9ZblZtTENCdlptWnpaWFFzSUd4cGRIUnNaVVZ1WkdsaGJpd2dOVElzSURncFhHNTlYRzVjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1Y21WaFpFUnZkV0pzWlV4RklEMGdablZ1WTNScGIyNGdLRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ2NtVjBkWEp1SUY5eVpXRmtSRzkxWW14bEtIUm9hWE1zSUc5bVpuTmxkQ3dnZEhKMVpTd2dibTlCYzNObGNuUXBYRzU5WEc1Y2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdWNtVmhaRVJ2ZFdKc1pVSkZJRDBnWm5WdVkzUnBiMjRnS0c5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdjbVYwZFhKdUlGOXlaV0ZrUkc5MVlteGxLSFJvYVhNc0lHOW1abk5sZEN3Z1ptRnNjMlVzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbmR5YVhSbFZVbHVkRGdnUFNCbWRXNWpkR2x2YmlBb2RtRnNkV1VzSUc5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdhV1lnS0NGdWIwRnpjMlZ5ZENrZ2UxeHVJQ0FnSUdGemMyVnlkQ2gyWVd4MVpTQWhQVDBnZFc1a1pXWnBibVZrSUNZbUlIWmhiSFZsSUNFOVBTQnVkV3hzTENBbmJXbHpjMmx1WnlCMllXeDFaU2NwWEc0Z0lDQWdZWE56WlhKMEtHOW1abk5sZENBaFBUMGdkVzVrWldacGJtVmtJQ1ltSUc5bVpuTmxkQ0FoUFQwZ2JuVnNiQ3dnSjIxcGMzTnBibWNnYjJabWMyVjBKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUR3Z2RHaHBjeTVzWlc1bmRHZ3NJQ2QwY25scGJtY2dkRzhnZDNKcGRHVWdZbVY1YjI1a0lHSjFabVpsY2lCc1pXNW5kR2duS1Z4dUlDQWdJSFpsY21sbWRXbHVkQ2gyWVd4MVpTd2dNSGhtWmlsY2JpQWdmVnh1WEc0Z0lHbG1JQ2h2Wm1aelpYUWdQajBnZEdocGN5NXNaVzVuZEdncElISmxkSFZ5Ymx4dVhHNGdJSFJvYVhOYmIyWm1jMlYwWFNBOUlIWmhiSFZsWEc1OVhHNWNibVoxYm1OMGFXOXVJRjkzY21sMFpWVkpiblF4TmlBb1luVm1MQ0IyWVd4MVpTd2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSUc1dlFYTnpaWEowS1NCN1hHNGdJR2xtSUNnaGJtOUJjM05sY25RcElIdGNiaUFnSUNCaGMzTmxjblFvZG1Gc2RXVWdJVDA5SUhWdVpHVm1hVzVsWkNBbUppQjJZV3gxWlNBaFBUMGdiblZzYkN3Z0oyMXBjM05wYm1jZ2RtRnNkV1VuS1Z4dUlDQWdJR0Z6YzJWeWRDaDBlWEJsYjJZZ2JHbDBkR3hsUlc1a2FXRnVJRDA5UFNBblltOXZiR1ZoYmljc0lDZHRhWE56YVc1bklHOXlJR2x1ZG1Gc2FXUWdaVzVrYVdGdUp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdiMlptYzJWMElDRTlQU0J1ZFd4c0xDQW5iV2x6YzJsdVp5QnZabVp6WlhRbktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdLeUF4SUR3Z1luVm1MbXhsYm1kMGFDd2dKM1J5ZVdsdVp5QjBieUIzY21sMFpTQmlaWGx2Ym1RZ1luVm1abVZ5SUd4bGJtZDBhQ2NwWEc0Z0lDQWdkbVZ5YVdaMWFXNTBLSFpoYkhWbExDQXdlR1ptWm1ZcFhHNGdJSDFjYmx4dUlDQjJZWElnYkdWdUlEMGdZblZtTG14bGJtZDBhRnh1SUNCcFppQW9iMlptYzJWMElENDlJR3hsYmlsY2JpQWdJQ0J5WlhSMWNtNWNibHh1SUNCbWIzSWdLSFpoY2lCcElEMGdNQ3dnYWlBOUlFMWhkR2d1YldsdUtHeGxiaUF0SUc5bVpuTmxkQ3dnTWlrN0lHa2dQQ0JxT3lCcEt5c3BJSHRjYmlBZ0lDQmlkV1piYjJabWMyVjBJQ3NnYVYwZ1BWeHVJQ0FnSUNBZ0lDQW9kbUZzZFdVZ0ppQW9NSGhtWmlBOFBDQW9PQ0FxSUNoc2FYUjBiR1ZGYm1ScFlXNGdQeUJwSURvZ01TQXRJR2twS1NrcElENCtQbHh1SUNBZ0lDQWdJQ0FnSUNBZ0tHeHBkSFJzWlVWdVpHbGhiaUEvSUdrZ09pQXhJQzBnYVNrZ0tpQTRYRzRnSUgxY2JuMWNibHh1UW5WbVptVnlMbkJ5YjNSdmRIbHdaUzUzY21sMFpWVkpiblF4Tmt4RklEMGdablZ1WTNScGIyNGdLSFpoYkhWbExDQnZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUY5M2NtbDBaVlZKYm5ReE5paDBhR2x6TENCMllXeDFaU3dnYjJabWMyVjBMQ0IwY25WbExDQnViMEZ6YzJWeWRDbGNibjFjYmx4dVFuVm1abVZ5TG5CeWIzUnZkSGx3WlM1M2NtbDBaVlZKYm5ReE5rSkZJRDBnWm5WdVkzUnBiMjRnS0haaGJIVmxMQ0J2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lGOTNjbWwwWlZWSmJuUXhOaWgwYUdsekxDQjJZV3gxWlN3Z2IyWm1jMlYwTENCbVlXeHpaU3dnYm05QmMzTmxjblFwWEc1OVhHNWNibVoxYm1OMGFXOXVJRjkzY21sMFpWVkpiblF6TWlBb1luVm1MQ0IyWVd4MVpTd2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSUc1dlFYTnpaWEowS1NCN1hHNGdJR2xtSUNnaGJtOUJjM05sY25RcElIdGNiaUFnSUNCaGMzTmxjblFvZG1Gc2RXVWdJVDA5SUhWdVpHVm1hVzVsWkNBbUppQjJZV3gxWlNBaFBUMGdiblZzYkN3Z0oyMXBjM05wYm1jZ2RtRnNkV1VuS1Z4dUlDQWdJR0Z6YzJWeWRDaDBlWEJsYjJZZ2JHbDBkR3hsUlc1a2FXRnVJRDA5UFNBblltOXZiR1ZoYmljc0lDZHRhWE56YVc1bklHOXlJR2x1ZG1Gc2FXUWdaVzVrYVdGdUp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdiMlptYzJWMElDRTlQU0J1ZFd4c0xDQW5iV2x6YzJsdVp5QnZabVp6WlhRbktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdLeUF6SUR3Z1luVm1MbXhsYm1kMGFDd2dKM1J5ZVdsdVp5QjBieUIzY21sMFpTQmlaWGx2Ym1RZ1luVm1abVZ5SUd4bGJtZDBhQ2NwWEc0Z0lDQWdkbVZ5YVdaMWFXNTBLSFpoYkhWbExDQXdlR1ptWm1abVptWm1LVnh1SUNCOVhHNWNiaUFnZG1GeUlHeGxiaUE5SUdKMVppNXNaVzVuZEdoY2JpQWdhV1lnS0c5bVpuTmxkQ0ErUFNCc1pXNHBYRzRnSUNBZ2NtVjBkWEp1WEc1Y2JpQWdabTl5SUNoMllYSWdhU0E5SURBc0lHb2dQU0JOWVhSb0xtMXBiaWhzWlc0Z0xTQnZabVp6WlhRc0lEUXBPeUJwSUR3Z2Fqc2dhU3NyS1NCN1hHNGdJQ0FnWW5WbVcyOW1abk5sZENBcklHbGRJRDFjYmlBZ0lDQWdJQ0FnS0haaGJIVmxJRDQrUGlBb2JHbDBkR3hsUlc1a2FXRnVJRDhnYVNBNklETWdMU0JwS1NBcUlEZ3BJQ1lnTUhobVpseHVJQ0I5WEc1OVhHNWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVkM0pwZEdWVlNXNTBNekpNUlNBOUlHWjFibU4wYVc5dUlDaDJZV3gxWlN3Z2IyWm1jMlYwTENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0JmZDNKcGRHVlZTVzUwTXpJb2RHaHBjeXdnZG1Gc2RXVXNJRzltWm5ObGRDd2dkSEoxWlN3Z2JtOUJjM05sY25RcFhHNTlYRzVjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1ZDNKcGRHVlZTVzUwTXpKQ1JTQTlJR1oxYm1OMGFXOXVJQ2gyWVd4MVpTd2diMlptYzJWMExDQnViMEZ6YzJWeWRDa2dlMXh1SUNCZmQzSnBkR1ZWU1c1ME16SW9kR2hwY3l3Z2RtRnNkV1VzSUc5bVpuTmxkQ3dnWm1Gc2MyVXNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuZHlhWFJsU1c1ME9DQTlJR1oxYm1OMGFXOXVJQ2gyWVd4MVpTd2diMlptYzJWMExDQnViMEZ6YzJWeWRDa2dlMXh1SUNCcFppQW9JVzV2UVhOelpYSjBLU0I3WEc0Z0lDQWdZWE56WlhKMEtIWmhiSFZsSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnZG1Gc2RXVWdJVDA5SUc1MWJHd3NJQ2R0YVhOemFXNW5JSFpoYkhWbEp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdiMlptYzJWMElDRTlQU0J1ZFd4c0xDQW5iV2x6YzJsdVp5QnZabVp6WlhRbktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdQQ0IwYUdsekxteGxibWQwYUN3Z0oxUnllV2x1WnlCMGJ5QjNjbWwwWlNCaVpYbHZibVFnWW5WbVptVnlJR3hsYm1kMGFDY3BYRzRnSUNBZ2RtVnlhV1p6YVc1MEtIWmhiSFZsTENBd2VEZG1MQ0F0TUhnNE1DbGNiaUFnZlZ4dVhHNGdJR2xtSUNodlptWnpaWFFnUGowZ2RHaHBjeTVzWlc1bmRHZ3BYRzRnSUNBZ2NtVjBkWEp1WEc1Y2JpQWdhV1lnS0haaGJIVmxJRDQ5SURBcFhHNGdJQ0FnZEdocGN5NTNjbWwwWlZWSmJuUTRLSFpoYkhWbExDQnZabVp6WlhRc0lHNXZRWE56WlhKMEtWeHVJQ0JsYkhObFhHNGdJQ0FnZEdocGN5NTNjbWwwWlZWSmJuUTRLREI0Wm1ZZ0t5QjJZV3gxWlNBcklERXNJRzltWm5ObGRDd2dibTlCYzNObGNuUXBYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOTNjbWwwWlVsdWRERTJJQ2hpZFdZc0lIWmhiSFZsTENCdlptWnpaWFFzSUd4cGRIUnNaVVZ1WkdsaGJpd2dibTlCYzNObGNuUXBJSHRjYmlBZ2FXWWdLQ0Z1YjBGemMyVnlkQ2tnZTF4dUlDQWdJR0Z6YzJWeWRDaDJZV3gxWlNBaFBUMGdkVzVrWldacGJtVmtJQ1ltSUhaaGJIVmxJQ0U5UFNCdWRXeHNMQ0FuYldsemMybHVaeUIyWVd4MVpTY3BYRzRnSUNBZ1lYTnpaWEowS0hSNWNHVnZaaUJzYVhSMGJHVkZibVJwWVc0Z1BUMDlJQ2RpYjI5c1pXRnVKeXdnSjIxcGMzTnBibWNnYjNJZ2FXNTJZV3hwWkNCbGJtUnBZVzRuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ0lUMDlJSFZ1WkdWbWFXNWxaQ0FtSmlCdlptWnpaWFFnSVQwOUlHNTFiR3dzSUNkdGFYTnphVzVuSUc5bVpuTmxkQ2NwWEc0Z0lDQWdZWE56WlhKMEtHOW1abk5sZENBcklERWdQQ0JpZFdZdWJHVnVaM1JvTENBblZISjVhVzVuSUhSdklIZHlhWFJsSUdKbGVXOXVaQ0JpZFdabVpYSWdiR1Z1WjNSb0p5bGNiaUFnSUNCMlpYSnBabk5wYm5Rb2RtRnNkV1VzSURCNE4yWm1aaXdnTFRCNE9EQXdNQ2xjYmlBZ2ZWeHVYRzRnSUhaaGNpQnNaVzRnUFNCaWRXWXViR1Z1WjNSb1hHNGdJR2xtSUNodlptWnpaWFFnUGowZ2JHVnVLVnh1SUNBZ0lISmxkSFZ5Ymx4dVhHNGdJR2xtSUNoMllXeDFaU0ErUFNBd0tWeHVJQ0FnSUY5M2NtbDBaVlZKYm5ReE5paGlkV1lzSUhaaGJIVmxMQ0J2Wm1aelpYUXNJR3hwZEhSc1pVVnVaR2xoYml3Z2JtOUJjM05sY25RcFhHNGdJR1ZzYzJWY2JpQWdJQ0JmZDNKcGRHVlZTVzUwTVRZb1luVm1MQ0F3ZUdabVptWWdLeUIyWVd4MVpTQXJJREVzSUc5bVpuTmxkQ3dnYkdsMGRHeGxSVzVrYVdGdUxDQnViMEZ6YzJWeWRDbGNibjFjYmx4dVFuVm1abVZ5TG5CeWIzUnZkSGx3WlM1M2NtbDBaVWx1ZERFMlRFVWdQU0JtZFc1amRHbHZiaUFvZG1Gc2RXVXNJRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ1gzZHlhWFJsU1c1ME1UWW9kR2hwY3l3Z2RtRnNkV1VzSUc5bVpuTmxkQ3dnZEhKMVpTd2dibTlCYzNObGNuUXBYRzU5WEc1Y2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdWQzSnBkR1ZKYm5ReE5rSkZJRDBnWm5WdVkzUnBiMjRnS0haaGJIVmxMQ0J2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lGOTNjbWwwWlVsdWRERTJLSFJvYVhNc0lIWmhiSFZsTENCdlptWnpaWFFzSUdaaGJITmxMQ0J1YjBGemMyVnlkQ2xjYm4xY2JseHVablZ1WTNScGIyNGdYM2R5YVhSbFNXNTBNeklnS0dKMVppd2dkbUZzZFdVc0lHOW1abk5sZEN3Z2JHbDBkR3hsUlc1a2FXRnVMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQnBaaUFvSVc1dlFYTnpaWEowS1NCN1hHNGdJQ0FnWVhOelpYSjBLSFpoYkhWbElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2RtRnNkV1VnSVQwOUlHNTFiR3dzSUNkdGFYTnphVzVuSUhaaGJIVmxKeWxjYmlBZ0lDQmhjM05sY25Rb2RIbHdaVzltSUd4cGRIUnNaVVZ1WkdsaGJpQTlQVDBnSjJKdmIyeGxZVzRuTENBbmJXbHpjMmx1WnlCdmNpQnBiblpoYkdsa0lHVnVaR2xoYmljcFhHNGdJQ0FnWVhOelpYSjBLRzltWm5ObGRDQWhQVDBnZFc1a1pXWnBibVZrSUNZbUlHOW1abk5sZENBaFBUMGdiblZzYkN3Z0oyMXBjM05wYm1jZ2IyWm1jMlYwSnlsY2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDc2dNeUE4SUdKMVppNXNaVzVuZEdnc0lDZFVjbmxwYm1jZ2RHOGdkM0pwZEdVZ1ltVjViMjVrSUdKMVptWmxjaUJzWlc1bmRHZ25LVnh1SUNBZ0lIWmxjbWxtYzJsdWRDaDJZV3gxWlN3Z01IZzNabVptWm1abVppd2dMVEI0T0RBd01EQXdNREFwWEc0Z0lIMWNibHh1SUNCMllYSWdiR1Z1SUQwZ1luVm1MbXhsYm1kMGFGeHVJQ0JwWmlBb2IyWm1jMlYwSUQ0OUlHeGxiaWxjYmlBZ0lDQnlaWFIxY201Y2JseHVJQ0JwWmlBb2RtRnNkV1VnUGowZ01DbGNiaUFnSUNCZmQzSnBkR1ZWU1c1ME16SW9ZblZtTENCMllXeDFaU3dnYjJabWMyVjBMQ0JzYVhSMGJHVkZibVJwWVc0c0lHNXZRWE56WlhKMEtWeHVJQ0JsYkhObFhHNGdJQ0FnWDNkeWFYUmxWVWx1ZERNeUtHSjFaaXdnTUhobVptWm1abVptWmlBcklIWmhiSFZsSUNzZ01Td2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbmR5YVhSbFNXNTBNekpNUlNBOUlHWjFibU4wYVc5dUlDaDJZV3gxWlN3Z2IyWm1jMlYwTENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0JmZDNKcGRHVkpiblF6TWloMGFHbHpMQ0IyWVd4MVpTd2diMlptYzJWMExDQjBjblZsTENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1UW5WbVptVnlMbkJ5YjNSdmRIbHdaUzUzY21sMFpVbHVkRE15UWtVZ1BTQm1kVzVqZEdsdmJpQW9kbUZzZFdVc0lHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnWDNkeWFYUmxTVzUwTXpJb2RHaHBjeXdnZG1Gc2RXVXNJRzltWm5ObGRDd2dabUZzYzJVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1bWRXNWpkR2x2YmlCZmQzSnBkR1ZHYkc5aGRDQW9ZblZtTENCMllXeDFaU3dnYjJabWMyVjBMQ0JzYVhSMGJHVkZibVJwWVc0c0lHNXZRWE56WlhKMEtTQjdYRzRnSUdsbUlDZ2hibTlCYzNObGNuUXBJSHRjYmlBZ0lDQmhjM05sY25Rb2RtRnNkV1VnSVQwOUlIVnVaR1ZtYVc1bFpDQW1KaUIyWVd4MVpTQWhQVDBnYm5Wc2JDd2dKMjFwYzNOcGJtY2dkbUZzZFdVbktWeHVJQ0FnSUdGemMyVnlkQ2gwZVhCbGIyWWdiR2wwZEd4bFJXNWthV0Z1SUQwOVBTQW5ZbTl2YkdWaGJpY3NJQ2R0YVhOemFXNW5JRzl5SUdsdWRtRnNhV1FnWlc1a2FXRnVKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnYjJabWMyVjBJQ0U5UFNCdWRXeHNMQ0FuYldsemMybHVaeUJ2Wm1aelpYUW5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnS3lBeklEd2dZblZtTG14bGJtZDBhQ3dnSjFSeWVXbHVaeUIwYnlCM2NtbDBaU0JpWlhsdmJtUWdZblZtWm1WeUlHeGxibWQwYUNjcFhHNGdJQ0FnZG1WeWFXWkpSVVZGTnpVMEtIWmhiSFZsTENBekxqUXdNamd5TXpRMk5qTTROVEk0T0RabEt6TTRMQ0F0TXk0ME1ESTRNak0wTmpZek9EVXlPRGcyWlNzek9DbGNiaUFnZlZ4dVhHNGdJSFpoY2lCc1pXNGdQU0JpZFdZdWJHVnVaM1JvWEc0Z0lHbG1JQ2h2Wm1aelpYUWdQajBnYkdWdUtWeHVJQ0FnSUhKbGRIVnlibHh1WEc0Z0lHbGxaV1UzTlRRdWQzSnBkR1VvWW5WbUxDQjJZV3gxWlN3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJREl6TENBMEtWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5keWFYUmxSbXh2WVhSTVJTQTlJR1oxYm1OMGFXOXVJQ2gyWVd4MVpTd2diMlptYzJWMExDQnViMEZ6YzJWeWRDa2dlMXh1SUNCZmQzSnBkR1ZHYkc5aGRDaDBhR2x6TENCMllXeDFaU3dnYjJabWMyVjBMQ0IwY25WbExDQnViMEZ6YzJWeWRDbGNibjFjYmx4dVFuVm1abVZ5TG5CeWIzUnZkSGx3WlM1M2NtbDBaVVpzYjJGMFFrVWdQU0JtZFc1amRHbHZiaUFvZG1Gc2RXVXNJRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ1gzZHlhWFJsUm14dllYUW9kR2hwY3l3Z2RtRnNkV1VzSUc5bVpuTmxkQ3dnWm1Gc2MyVXNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmZkM0pwZEdWRWIzVmliR1VnS0dKMVppd2dkbUZzZFdVc0lHOW1abk5sZEN3Z2JHbDBkR3hsUlc1a2FXRnVMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQnBaaUFvSVc1dlFYTnpaWEowS1NCN1hHNGdJQ0FnWVhOelpYSjBLSFpoYkhWbElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2RtRnNkV1VnSVQwOUlHNTFiR3dzSUNkdGFYTnphVzVuSUhaaGJIVmxKeWxjYmlBZ0lDQmhjM05sY25Rb2RIbHdaVzltSUd4cGRIUnNaVVZ1WkdsaGJpQTlQVDBnSjJKdmIyeGxZVzRuTENBbmJXbHpjMmx1WnlCdmNpQnBiblpoYkdsa0lHVnVaR2xoYmljcFhHNGdJQ0FnWVhOelpYSjBLRzltWm5ObGRDQWhQVDBnZFc1a1pXWnBibVZrSUNZbUlHOW1abk5sZENBaFBUMGdiblZzYkN3Z0oyMXBjM05wYm1jZ2IyWm1jMlYwSnlsY2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDc2dOeUE4SUdKMVppNXNaVzVuZEdnc1hHNGdJQ0FnSUNBZ0lDZFVjbmxwYm1jZ2RHOGdkM0pwZEdVZ1ltVjViMjVrSUdKMVptWmxjaUJzWlc1bmRHZ25LVnh1SUNBZ0lIWmxjbWxtU1VWRlJUYzFOQ2gyWVd4MVpTd2dNUzQzT1RjMk9UTXhNelE0TmpJek1UVTNSU3N6TURnc0lDMHhMamM1TnpZNU16RXpORGcyTWpNeE5UZEZLek13T0NsY2JpQWdmVnh1WEc0Z0lIWmhjaUJzWlc0Z1BTQmlkV1l1YkdWdVozUm9YRzRnSUdsbUlDaHZabVp6WlhRZ1BqMGdiR1Z1S1Z4dUlDQWdJSEpsZEhWeWJseHVYRzRnSUdsbFpXVTNOVFF1ZDNKcGRHVW9ZblZtTENCMllXeDFaU3dnYjJabWMyVjBMQ0JzYVhSMGJHVkZibVJwWVc0c0lEVXlMQ0E0S1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbmR5YVhSbFJHOTFZbXhsVEVVZ1BTQm1kVzVqZEdsdmJpQW9kbUZzZFdVc0lHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnWDNkeWFYUmxSRzkxWW14bEtIUm9hWE1zSUhaaGJIVmxMQ0J2Wm1aelpYUXNJSFJ5ZFdVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5keWFYUmxSRzkxWW14bFFrVWdQU0JtZFc1amRHbHZiaUFvZG1Gc2RXVXNJRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ1gzZHlhWFJsUkc5MVlteGxLSFJvYVhNc0lIWmhiSFZsTENCdlptWnpaWFFzSUdaaGJITmxMQ0J1YjBGemMyVnlkQ2xjYm4xY2JseHVMeThnWm1sc2JDaDJZV3gxWlN3Z2MzUmhjblE5TUN3Z1pXNWtQV0oxWm1abGNpNXNaVzVuZEdncFhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExtWnBiR3dnUFNCbWRXNWpkR2x2YmlBb2RtRnNkV1VzSUhOMFlYSjBMQ0JsYm1RcElIdGNiaUFnYVdZZ0tDRjJZV3gxWlNrZ2RtRnNkV1VnUFNBd1hHNGdJR2xtSUNnaGMzUmhjblFwSUhOMFlYSjBJRDBnTUZ4dUlDQnBaaUFvSVdWdVpDa2daVzVrSUQwZ2RHaHBjeTVzWlc1bmRHaGNibHh1SUNCcFppQW9kSGx3Wlc5bUlIWmhiSFZsSUQwOVBTQW5jM1J5YVc1bkp5a2dlMXh1SUNBZ0lIWmhiSFZsSUQwZ2RtRnNkV1V1WTJoaGNrTnZaR1ZCZENnd0tWeHVJQ0I5WEc1Y2JpQWdZWE56WlhKMEtIUjVjR1Z2WmlCMllXeDFaU0E5UFQwZ0oyNTFiV0psY2ljZ0ppWWdJV2x6VG1GT0tIWmhiSFZsS1N3Z0ozWmhiSFZsSUdseklHNXZkQ0JoSUc1MWJXSmxjaWNwWEc0Z0lHRnpjMlZ5ZENobGJtUWdQajBnYzNSaGNuUXNJQ2RsYm1RZ1BDQnpkR0Z5ZENjcFhHNWNiaUFnTHk4Z1JtbHNiQ0F3SUdKNWRHVnpPeUIzWlNkeVpTQmtiMjVsWEc0Z0lHbG1JQ2hsYm1RZ1BUMDlJSE4wWVhKMEtTQnlaWFIxY201Y2JpQWdhV1lnS0hSb2FYTXViR1Z1WjNSb0lEMDlQU0F3S1NCeVpYUjFjbTVjYmx4dUlDQmhjM05sY25Rb2MzUmhjblFnUGowZ01DQW1KaUJ6ZEdGeWRDQThJSFJvYVhNdWJHVnVaM1JvTENBbmMzUmhjblFnYjNWMElHOW1JR0p2ZFc1a2N5Y3BYRzRnSUdGemMyVnlkQ2hsYm1RZ1BqMGdNQ0FtSmlCbGJtUWdQRDBnZEdocGN5NXNaVzVuZEdnc0lDZGxibVFnYjNWMElHOW1JR0p2ZFc1a2N5Y3BYRzVjYmlBZ1ptOXlJQ2gyWVhJZ2FTQTlJSE4wWVhKME95QnBJRHdnWlc1a095QnBLeXNwSUh0Y2JpQWdJQ0IwYUdselcybGRJRDBnZG1Gc2RXVmNiaUFnZlZ4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbWx1YzNCbFkzUWdQU0JtZFc1amRHbHZiaUFvS1NCN1hHNGdJSFpoY2lCdmRYUWdQU0JiWFZ4dUlDQjJZWElnYkdWdUlEMGdkR2hwY3k1c1pXNW5kR2hjYmlBZ1ptOXlJQ2gyWVhJZ2FTQTlJREE3SUdrZ1BDQnNaVzQ3SUdrckt5a2dlMXh1SUNBZ0lHOTFkRnRwWFNBOUlIUnZTR1Y0S0hSb2FYTmJhVjBwWEc0Z0lDQWdhV1lnS0drZ1BUMDlJR1Y0Y0c5eWRITXVTVTVUVUVWRFZGOU5RVmhmUWxsVVJWTXBJSHRjYmlBZ0lDQWdJRzkxZEZ0cElDc2dNVjBnUFNBbkxpNHVKMXh1SUNBZ0lDQWdZbkpsWVd0Y2JpQWdJQ0I5WEc0Z0lIMWNiaUFnY21WMGRYSnVJQ2M4UW5WbVptVnlJQ2NnS3lCdmRYUXVhbTlwYmlnbklDY3BJQ3NnSno0blhHNTlYRzVjYmk4cUtseHVJQ29nUTNKbFlYUmxjeUJoSUc1bGR5QmdRWEp5WVhsQ2RXWm1aWEpnSUhkcGRHZ2dkR2hsSUNwamIzQnBaV1FxSUcxbGJXOXllU0J2WmlCMGFHVWdZblZtWm1WeUlHbHVjM1JoYm1ObExseHVJQ29nUVdSa1pXUWdhVzRnVG05a1pTQXdMakV5TGlCUGJteDVJR0YyWVdsc1lXSnNaU0JwYmlCaWNtOTNjMlZ5Y3lCMGFHRjBJSE4xY0hCdmNuUWdRWEp5WVhsQ2RXWm1aWEl1WEc0Z0tpOWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVkRzlCY25KaGVVSjFabVpsY2lBOUlHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ2FXWWdLSFI1Y0dWdlppQlZhVzUwT0VGeWNtRjVJQ0U5UFNBbmRXNWtaV1pwYm1Wa0p5a2dlMXh1SUNBZ0lHbG1JQ2hDZFdabVpYSXVYM1Z6WlZSNWNHVmtRWEp5WVhsektTQjdYRzRnSUNBZ0lDQnlaWFIxY200Z0tHNWxkeUJDZFdabVpYSW9kR2hwY3lrcExtSjFabVpsY2x4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQjJZWElnWW5WbUlEMGdibVYzSUZWcGJuUTRRWEp5WVhrb2RHaHBjeTVzWlc1bmRHZ3BYRzRnSUNBZ0lDQm1iM0lnS0haaGNpQnBJRDBnTUN3Z2JHVnVJRDBnWW5WbUxteGxibWQwYURzZ2FTQThJR3hsYmpzZ2FTQXJQU0F4S1Z4dUlDQWdJQ0FnSUNCaWRXWmJhVjBnUFNCMGFHbHpXMmxkWEc0Z0lDQWdJQ0J5WlhSMWNtNGdZblZtTG1KMVptWmxjbHh1SUNBZ0lIMWNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb0owSjFabVpsY2k1MGIwRnljbUY1UW5WbVptVnlJRzV2ZENCemRYQndiM0owWldRZ2FXNGdkR2hwY3lCaWNtOTNjMlZ5SnlsY2JpQWdmVnh1ZlZ4dVhHNHZMeUJJUlV4UVJWSWdSbFZPUTFSSlQwNVRYRzR2THlBOVBUMDlQVDA5UFQwOVBUMDlQVDA5WEc1Y2JtWjFibU4wYVc5dUlITjBjbWx1WjNSeWFXMGdLSE4wY2lrZ2UxeHVJQ0JwWmlBb2MzUnlMblJ5YVcwcElISmxkSFZ5YmlCemRISXVkSEpwYlNncFhHNGdJSEpsZEhWeWJpQnpkSEl1Y21Wd2JHRmpaU2d2WGx4Y2N5dDhYRnh6S3lRdlp5d2dKeWNwWEc1OVhHNWNiblpoY2lCQ1VDQTlJRUoxWm1abGNpNXdjbTkwYjNSNWNHVmNibHh1THlvcVhHNGdLaUJCZFdkdFpXNTBJR0VnVldsdWREaEJjbkpoZVNBcWFXNXpkR0Z1WTJVcUlDaHViM1FnZEdobElGVnBiblE0UVhKeVlYa2dZMnhoYzNNaEtTQjNhWFJvSUVKMVptWmxjaUJ0WlhSb2IyUnpYRzRnS2k5Y2JrSjFabVpsY2k1ZllYVm5iV1Z1ZENBOUlHWjFibU4wYVc5dUlDaGhjbklwSUh0Y2JpQWdZWEp5TGw5cGMwSjFabVpsY2lBOUlIUnlkV1ZjYmx4dUlDQXZMeUJ6WVhabElISmxabVZ5Wlc1alpTQjBieUJ2Y21sbmFXNWhiQ0JWYVc1ME9FRnljbUY1SUdkbGRDOXpaWFFnYldWMGFHOWtjeUJpWldadmNtVWdiM1psY25keWFYUnBibWRjYmlBZ1lYSnlMbDluWlhRZ1BTQmhjbkl1WjJWMFhHNGdJR0Z5Y2k1ZmMyVjBJRDBnWVhKeUxuTmxkRnh1WEc0Z0lDOHZJR1JsY0hKbFkyRjBaV1FzSUhkcGJHd2dZbVVnY21WdGIzWmxaQ0JwYmlCdWIyUmxJREF1TVRNclhHNGdJR0Z5Y2k1blpYUWdQU0JDVUM1blpYUmNiaUFnWVhKeUxuTmxkQ0E5SUVKUUxuTmxkRnh1WEc0Z0lHRnljaTUzY21sMFpTQTlJRUpRTG5keWFYUmxYRzRnSUdGeWNpNTBiMU4wY21sdVp5QTlJRUpRTG5SdlUzUnlhVzVuWEc0Z0lHRnljaTUwYjB4dlkyRnNaVk4wY21sdVp5QTlJRUpRTG5SdlUzUnlhVzVuWEc0Z0lHRnljaTUwYjBwVFQwNGdQU0JDVUM1MGIwcFRUMDVjYmlBZ1lYSnlMbU52Y0hrZ1BTQkNVQzVqYjNCNVhHNGdJR0Z5Y2k1emJHbGpaU0E5SUVKUUxuTnNhV05sWEc0Z0lHRnljaTV5WldGa1ZVbHVkRGdnUFNCQ1VDNXlaV0ZrVlVsdWREaGNiaUFnWVhKeUxuSmxZV1JWU1c1ME1UWk1SU0E5SUVKUUxuSmxZV1JWU1c1ME1UWk1SVnh1SUNCaGNuSXVjbVZoWkZWSmJuUXhOa0pGSUQwZ1FsQXVjbVZoWkZWSmJuUXhOa0pGWEc0Z0lHRnljaTV5WldGa1ZVbHVkRE15VEVVZ1BTQkNVQzV5WldGa1ZVbHVkRE15VEVWY2JpQWdZWEp5TG5KbFlXUlZTVzUwTXpKQ1JTQTlJRUpRTG5KbFlXUlZTVzUwTXpKQ1JWeHVJQ0JoY25JdWNtVmhaRWx1ZERnZ1BTQkNVQzV5WldGa1NXNTBPRnh1SUNCaGNuSXVjbVZoWkVsdWRERTJURVVnUFNCQ1VDNXlaV0ZrU1c1ME1UWk1SVnh1SUNCaGNuSXVjbVZoWkVsdWRERTJRa1VnUFNCQ1VDNXlaV0ZrU1c1ME1UWkNSVnh1SUNCaGNuSXVjbVZoWkVsdWRETXlURVVnUFNCQ1VDNXlaV0ZrU1c1ME16Sk1SVnh1SUNCaGNuSXVjbVZoWkVsdWRETXlRa1VnUFNCQ1VDNXlaV0ZrU1c1ME16SkNSVnh1SUNCaGNuSXVjbVZoWkVac2IyRjBURVVnUFNCQ1VDNXlaV0ZrUm14dllYUk1SVnh1SUNCaGNuSXVjbVZoWkVac2IyRjBRa1VnUFNCQ1VDNXlaV0ZrUm14dllYUkNSVnh1SUNCaGNuSXVjbVZoWkVSdmRXSnNaVXhGSUQwZ1FsQXVjbVZoWkVSdmRXSnNaVXhGWEc0Z0lHRnljaTV5WldGa1JHOTFZbXhsUWtVZ1BTQkNVQzV5WldGa1JHOTFZbXhsUWtWY2JpQWdZWEp5TG5keWFYUmxWVWx1ZERnZ1BTQkNVQzUzY21sMFpWVkpiblE0WEc0Z0lHRnljaTUzY21sMFpWVkpiblF4Tmt4RklEMGdRbEF1ZDNKcGRHVlZTVzUwTVRaTVJWeHVJQ0JoY25JdWQzSnBkR1ZWU1c1ME1UWkNSU0E5SUVKUUxuZHlhWFJsVlVsdWRERTJRa1ZjYmlBZ1lYSnlMbmR5YVhSbFZVbHVkRE15VEVVZ1BTQkNVQzUzY21sMFpWVkpiblF6TWt4RlhHNGdJR0Z5Y2k1M2NtbDBaVlZKYm5Rek1rSkZJRDBnUWxBdWQzSnBkR1ZWU1c1ME16SkNSVnh1SUNCaGNuSXVkM0pwZEdWSmJuUTRJRDBnUWxBdWQzSnBkR1ZKYm5RNFhHNGdJR0Z5Y2k1M2NtbDBaVWx1ZERFMlRFVWdQU0JDVUM1M2NtbDBaVWx1ZERFMlRFVmNiaUFnWVhKeUxuZHlhWFJsU1c1ME1UWkNSU0E5SUVKUUxuZHlhWFJsU1c1ME1UWkNSVnh1SUNCaGNuSXVkM0pwZEdWSmJuUXpNa3hGSUQwZ1FsQXVkM0pwZEdWSmJuUXpNa3hGWEc0Z0lHRnljaTUzY21sMFpVbHVkRE15UWtVZ1BTQkNVQzUzY21sMFpVbHVkRE15UWtWY2JpQWdZWEp5TG5keWFYUmxSbXh2WVhSTVJTQTlJRUpRTG5keWFYUmxSbXh2WVhSTVJWeHVJQ0JoY25JdWQzSnBkR1ZHYkc5aGRFSkZJRDBnUWxBdWQzSnBkR1ZHYkc5aGRFSkZYRzRnSUdGeWNpNTNjbWwwWlVSdmRXSnNaVXhGSUQwZ1FsQXVkM0pwZEdWRWIzVmliR1ZNUlZ4dUlDQmhjbkl1ZDNKcGRHVkViM1ZpYkdWQ1JTQTlJRUpRTG5keWFYUmxSRzkxWW14bFFrVmNiaUFnWVhKeUxtWnBiR3dnUFNCQ1VDNW1hV3hzWEc0Z0lHRnljaTVwYm5Od1pXTjBJRDBnUWxBdWFXNXpjR1ZqZEZ4dUlDQmhjbkl1ZEc5QmNuSmhlVUoxWm1abGNpQTlJRUpRTG5SdlFYSnlZWGxDZFdabVpYSmNibHh1SUNCeVpYUjFjbTRnWVhKeVhHNTlYRzVjYmk4dklITnNhV05sS0hOMFlYSjBMQ0JsYm1RcFhHNW1kVzVqZEdsdmJpQmpiR0Z0Y0NBb2FXNWtaWGdzSUd4bGJpd2daR1ZtWVhWc2RGWmhiSFZsS1NCN1hHNGdJR2xtSUNoMGVYQmxiMllnYVc1a1pYZ2dJVDA5SUNkdWRXMWlaWEluS1NCeVpYUjFjbTRnWkdWbVlYVnNkRlpoYkhWbFhHNGdJR2x1WkdWNElEMGdmbjVwYm1SbGVEc2dJQzh2SUVOdlpYSmpaU0IwYnlCcGJuUmxaMlZ5TGx4dUlDQnBaaUFvYVc1a1pYZ2dQajBnYkdWdUtTQnlaWFIxY200Z2JHVnVYRzRnSUdsbUlDaHBibVJsZUNBK1BTQXdLU0J5WlhSMWNtNGdhVzVrWlhoY2JpQWdhVzVrWlhnZ0t6MGdiR1Z1WEc0Z0lHbG1JQ2hwYm1SbGVDQStQU0F3S1NCeVpYUjFjbTRnYVc1a1pYaGNiaUFnY21WMGRYSnVJREJjYm4xY2JseHVablZ1WTNScGIyNGdZMjlsY21ObElDaHNaVzVuZEdncElIdGNiaUFnTHk4Z1EyOWxjbU5sSUd4bGJtZDBhQ0IwYnlCaElHNTFiV0psY2lBb2NHOXpjMmxpYkhrZ1RtRk9LU3dnY205MWJtUWdkWEJjYmlBZ0x5OGdhVzRnWTJGelpTQnBkQ2R6SUdaeVlXTjBhVzl1WVd3Z0tHVXVaeTRnTVRJekxqUTFOaWtnZEdobGJpQmtieUJoWEc0Z0lDOHZJR1J2ZFdKc1pTQnVaV2RoZEdVZ2RHOGdZMjlsY21ObElHRWdUbUZPSUhSdklEQXVJRVZoYzNrc0lISnBaMmgwUDF4dUlDQnNaVzVuZEdnZ1BTQitmazFoZEdndVkyVnBiQ2dyYkdWdVozUm9LVnh1SUNCeVpYUjFjbTRnYkdWdVozUm9JRHdnTUNBL0lEQWdPaUJzWlc1bmRHaGNibjFjYmx4dVpuVnVZM1JwYjI0Z2FYTkJjbkpoZVNBb2MzVmlhbVZqZENrZ2UxeHVJQ0J5WlhSMWNtNGdLRUZ5Y21GNUxtbHpRWEp5WVhrZ2ZId2dablZ1WTNScGIyNGdLSE4xWW1wbFkzUXBJSHRjYmlBZ0lDQnlaWFIxY200Z1QySnFaV04wTG5CeWIzUnZkSGx3WlM1MGIxTjBjbWx1Wnk1allXeHNLSE4xWW1wbFkzUXBJRDA5UFNBblcyOWlhbVZqZENCQmNuSmhlVjBuWEc0Z0lIMHBLSE4xWW1wbFkzUXBYRzU5WEc1Y2JtWjFibU4wYVc5dUlHbHpRWEp5WVhscGMyZ2dLSE4xWW1wbFkzUXBJSHRjYmlBZ2NtVjBkWEp1SUdselFYSnlZWGtvYzNWaWFtVmpkQ2tnZkh3Z1FuVm1abVZ5TG1selFuVm1abVZ5S0hOMVltcGxZM1FwSUh4OFhHNGdJQ0FnSUNCemRXSnFaV04wSUNZbUlIUjVjR1Z2WmlCemRXSnFaV04wSUQwOVBTQW5iMkpxWldOMEp5QW1KbHh1SUNBZ0lDQWdkSGx3Wlc5bUlITjFZbXBsWTNRdWJHVnVaM1JvSUQwOVBTQW5iblZ0WW1WeUoxeHVmVnh1WEc1bWRXNWpkR2x2YmlCMGIwaGxlQ0FvYmlrZ2UxeHVJQ0JwWmlBb2JpQThJREUyS1NCeVpYUjFjbTRnSnpBbklDc2diaTUwYjFOMGNtbHVaeWd4TmlsY2JpQWdjbVYwZFhKdUlHNHVkRzlUZEhKcGJtY29NVFlwWEc1OVhHNWNibVoxYm1OMGFXOXVJSFYwWmpoVWIwSjVkR1Z6SUNoemRISXBJSHRjYmlBZ2RtRnlJR0o1ZEdWQmNuSmhlU0E5SUZ0ZFhHNGdJR1p2Y2lBb2RtRnlJR2tnUFNBd095QnBJRHdnYzNSeUxteGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdkbUZ5SUdJZ1BTQnpkSEl1WTJoaGNrTnZaR1ZCZENocEtWeHVJQ0FnSUdsbUlDaGlJRHc5SURCNE4wWXBYRzRnSUNBZ0lDQmllWFJsUVhKeVlYa3VjSFZ6YUNoemRISXVZMmhoY2tOdlpHVkJkQ2hwS1NsY2JpQWdJQ0JsYkhObElIdGNiaUFnSUNBZ0lIWmhjaUJ6ZEdGeWRDQTlJR2xjYmlBZ0lDQWdJR2xtSUNoaUlENDlJREI0UkRnd01DQW1KaUJpSUR3OUlEQjRSRVpHUmlrZ2FTc3JYRzRnSUNBZ0lDQjJZWElnYUNBOUlHVnVZMjlrWlZWU1NVTnZiWEJ2Ym1WdWRDaHpkSEl1YzJ4cFkyVW9jM1JoY25Rc0lHa3JNU2twTG5OMVluTjBjaWd4S1M1emNHeHBkQ2duSlNjcFhHNGdJQ0FnSUNCbWIzSWdLSFpoY2lCcUlEMGdNRHNnYWlBOElHZ3ViR1Z1WjNSb095QnFLeXNwWEc0Z0lDQWdJQ0FnSUdKNWRHVkJjbkpoZVM1d2RYTm9LSEJoY25ObFNXNTBLR2hiYWwwc0lERTJLU2xjYmlBZ0lDQjlYRzRnSUgxY2JpQWdjbVYwZFhKdUlHSjVkR1ZCY25KaGVWeHVmVnh1WEc1bWRXNWpkR2x2YmlCaGMyTnBhVlJ2UW5sMFpYTWdLSE4wY2lrZ2UxeHVJQ0IyWVhJZ1lubDBaVUZ5Y21GNUlEMGdXMTFjYmlBZ1ptOXlJQ2gyWVhJZ2FTQTlJREE3SUdrZ1BDQnpkSEl1YkdWdVozUm9PeUJwS3lzcElIdGNiaUFnSUNBdkx5Qk9iMlJsSjNNZ1kyOWtaU0J6WldWdGN5QjBieUJpWlNCa2IybHVaeUIwYUdseklHRnVaQ0J1YjNRZ0ppQXdlRGRHTGk1Y2JpQWdJQ0JpZVhSbFFYSnlZWGt1Y0hWemFDaHpkSEl1WTJoaGNrTnZaR1ZCZENocEtTQW1JREI0UmtZcFhHNGdJSDFjYmlBZ2NtVjBkWEp1SUdKNWRHVkJjbkpoZVZ4dWZWeHVYRzVtZFc1amRHbHZiaUIxZEdZeE5teGxWRzlDZVhSbGN5QW9jM1J5S1NCN1hHNGdJSFpoY2lCakxDQm9hU3dnYkc5Y2JpQWdkbUZ5SUdKNWRHVkJjbkpoZVNBOUlGdGRYRzRnSUdadmNpQW9kbUZ5SUdrZ1BTQXdPeUJwSUR3Z2MzUnlMbXhsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnWXlBOUlITjBjaTVqYUdGeVEyOWtaVUYwS0drcFhHNGdJQ0FnYUdrZ1BTQmpJRDQrSURoY2JpQWdJQ0JzYnlBOUlHTWdKU0F5TlRaY2JpQWdJQ0JpZVhSbFFYSnlZWGt1Y0hWemFDaHNieWxjYmlBZ0lDQmllWFJsUVhKeVlYa3VjSFZ6YUNob2FTbGNiaUFnZlZ4dVhHNGdJSEpsZEhWeWJpQmllWFJsUVhKeVlYbGNibjFjYmx4dVpuVnVZM1JwYjI0Z1ltRnpaVFkwVkc5Q2VYUmxjeUFvYzNSeUtTQjdYRzRnSUhKbGRIVnliaUJpWVhObE5qUXVkRzlDZVhSbFFYSnlZWGtvYzNSeUtWeHVmVnh1WEc1bWRXNWpkR2x2YmlCaWJHbDBRblZtWm1WeUlDaHpjbU1zSUdSemRDd2diMlptYzJWMExDQnNaVzVuZEdncElIdGNiaUFnZG1GeUlIQnZjMXh1SUNCbWIzSWdLSFpoY2lCcElEMGdNRHNnYVNBOElHeGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdhV1lnS0NocElDc2diMlptYzJWMElENDlJR1J6ZEM1c1pXNW5kR2dwSUh4OElDaHBJRDQ5SUhOeVl5NXNaVzVuZEdncEtWeHVJQ0FnSUNBZ1luSmxZV3RjYmlBZ0lDQmtjM1JiYVNBcklHOW1abk5sZEYwZ1BTQnpjbU5iYVYxY2JpQWdmVnh1SUNCeVpYUjFjbTRnYVZ4dWZWeHVYRzVtZFc1amRHbHZiaUJrWldOdlpHVlZkR1k0UTJoaGNpQW9jM1J5S1NCN1hHNGdJSFJ5ZVNCN1hHNGdJQ0FnY21WMGRYSnVJR1JsWTI5a1pWVlNTVU52YlhCdmJtVnVkQ2h6ZEhJcFhHNGdJSDBnWTJGMFkyZ2dLR1Z5Y2lrZ2UxeHVJQ0FnSUhKbGRIVnliaUJUZEhKcGJtY3Vabkp2YlVOb1lYSkRiMlJsS0RCNFJrWkdSQ2tnTHk4Z1ZWUkdJRGdnYVc1MllXeHBaQ0JqYUdGeVhHNGdJSDFjYm4xY2JseHVMeXBjYmlBcUlGZGxJR2hoZG1VZ2RHOGdiV0ZyWlNCemRYSmxJSFJvWVhRZ2RHaGxJSFpoYkhWbElHbHpJR0VnZG1Gc2FXUWdhVzUwWldkbGNpNGdWR2hwY3lCdFpXRnVjeUIwYUdGMElHbDBYRzRnS2lCcGN5QnViMjR0Ym1WbllYUnBkbVV1SUVsMElHaGhjeUJ1YnlCbWNtRmpkR2x2Ym1Gc0lHTnZiWEJ2Ym1WdWRDQmhibVFnZEdoaGRDQnBkQ0JrYjJWeklHNXZkRnh1SUNvZ1pYaGpaV1ZrSUhSb1pTQnRZWGhwYlhWdElHRnNiRzkzWldRZ2RtRnNkV1V1WEc0Z0tpOWNibVoxYm1OMGFXOXVJSFpsY21sbWRXbHVkQ0FvZG1Gc2RXVXNJRzFoZUNrZ2UxeHVJQ0JoYzNObGNuUW9kSGx3Wlc5bUlIWmhiSFZsSUQwOVBTQW5iblZ0WW1WeUp5d2dKMk5oYm01dmRDQjNjbWwwWlNCaElHNXZiaTF1ZFcxaVpYSWdZWE1nWVNCdWRXMWlaWEluS1Z4dUlDQmhjM05sY25Rb2RtRnNkV1VnUGowZ01Dd2dKM053WldOcFptbGxaQ0JoSUc1bFoyRjBhWFpsSUhaaGJIVmxJR1p2Y2lCM2NtbDBhVzVuSUdGdUlIVnVjMmxuYm1Wa0lIWmhiSFZsSnlsY2JpQWdZWE56WlhKMEtIWmhiSFZsSUR3OUlHMWhlQ3dnSjNaaGJIVmxJR2x6SUd4aGNtZGxjaUIwYUdGdUlHMWhlR2x0ZFcwZ2RtRnNkV1VnWm05eUlIUjVjR1VuS1Z4dUlDQmhjM05sY25Rb1RXRjBhQzVtYkc5dmNpaDJZV3gxWlNrZ1BUMDlJSFpoYkhWbExDQW5kbUZzZFdVZ2FHRnpJR0VnWm5KaFkzUnBiMjVoYkNCamIyMXdiMjVsYm5RbktWeHVmVnh1WEc1bWRXNWpkR2x2YmlCMlpYSnBabk5wYm5RZ0tIWmhiSFZsTENCdFlYZ3NJRzFwYmlrZ2UxeHVJQ0JoYzNObGNuUW9kSGx3Wlc5bUlIWmhiSFZsSUQwOVBTQW5iblZ0WW1WeUp5d2dKMk5oYm01dmRDQjNjbWwwWlNCaElHNXZiaTF1ZFcxaVpYSWdZWE1nWVNCdWRXMWlaWEluS1Z4dUlDQmhjM05sY25Rb2RtRnNkV1VnUEQwZ2JXRjRMQ0FuZG1Gc2RXVWdiR0Z5WjJWeUlIUm9ZVzRnYldGNGFXMTFiU0JoYkd4dmQyVmtJSFpoYkhWbEp5bGNiaUFnWVhOelpYSjBLSFpoYkhWbElENDlJRzFwYml3Z0ozWmhiSFZsSUhOdFlXeHNaWElnZEdoaGJpQnRhVzVwYlhWdElHRnNiRzkzWldRZ2RtRnNkV1VuS1Z4dUlDQmhjM05sY25Rb1RXRjBhQzVtYkc5dmNpaDJZV3gxWlNrZ1BUMDlJSFpoYkhWbExDQW5kbUZzZFdVZ2FHRnpJR0VnWm5KaFkzUnBiMjVoYkNCamIyMXdiMjVsYm5RbktWeHVmVnh1WEc1bWRXNWpkR2x2YmlCMlpYSnBaa2xGUlVVM05UUWdLSFpoYkhWbExDQnRZWGdzSUcxcGJpa2dlMXh1SUNCaGMzTmxjblFvZEhsd1pXOW1JSFpoYkhWbElEMDlQU0FuYm5WdFltVnlKeXdnSjJOaGJtNXZkQ0IzY21sMFpTQmhJRzV2YmkxdWRXMWlaWElnWVhNZ1lTQnVkVzFpWlhJbktWeHVJQ0JoYzNObGNuUW9kbUZzZFdVZ1BEMGdiV0Y0TENBbmRtRnNkV1VnYkdGeVoyVnlJSFJvWVc0Z2JXRjRhVzExYlNCaGJHeHZkMlZrSUhaaGJIVmxKeWxjYmlBZ1lYTnpaWEowS0haaGJIVmxJRDQ5SUcxcGJpd2dKM1poYkhWbElITnRZV3hzWlhJZ2RHaGhiaUJ0YVc1cGJYVnRJR0ZzYkc5M1pXUWdkbUZzZFdVbktWeHVmVnh1WEc1bWRXNWpkR2x2YmlCaGMzTmxjblFnS0hSbGMzUXNJRzFsYzNOaFoyVXBJSHRjYmlBZ2FXWWdLQ0YwWlhOMEtTQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb2JXVnpjMkZuWlNCOGZDQW5SbUZwYkdWa0lHRnpjMlZ5ZEdsdmJpY3BYRzU5WEc0aVhYMD1cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXGJ1ZmZlclxcXFxpbmRleC5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxidWZmZXJcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG07XG4gIHZhciBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxO1xuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMTtcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxO1xuICB2YXIgbkJpdHMgPSAtNztcbiAgdmFyIGkgPSBpc0xFID8gbkJ5dGVzIC0gMSA6IDA7XG4gIHZhciBkID0gaXNMRSA/IC0xIDogMTtcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV07XG5cbiAgaSArPSBkO1xuXG4gIGUgPSBzICYgKDEgPDwgLW5CaXRzKSAtIDE7XG4gIHMgPj49IC1uQml0cztcbiAgbkJpdHMgKz0gZUxlbjtcbiAgZm9yICg7IG5CaXRzID4gMDsgZSA9IGUgKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgxIDw8IC1uQml0cykgLSAxO1xuICBlID4+PSAtbkJpdHM7XG4gIG5CaXRzICs9IG1MZW47XG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSBtICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzO1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6IChzID8gLTEgOiAxKSAqIEluZmluaXR5O1xuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbik7XG4gICAgZSA9IGUgLSBlQmlhcztcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKTtcbn07XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbiAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sIGM7XG4gIHZhciBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxO1xuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMTtcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxO1xuICB2YXIgcnQgPSBtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMDtcbiAgdmFyIGkgPSBpc0xFID8gMCA6IG5CeXRlcyAtIDE7XG4gIHZhciBkID0gaXNMRSA/IDEgOiAtMTtcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgdmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCA/IDEgOiAwO1xuXG4gIHZhbHVlID0gTWF0aC5hYnModmFsdWUpO1xuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwO1xuICAgIGUgPSBlTWF4O1xuICB9IGVsc2Uge1xuICAgIGUgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbHVlKSAvIE1hdGguTE4yKTtcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS07XG4gICAgICBjICo9IDI7XG4gICAgfVxuICAgIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgdmFsdWUgKz0gcnQgLyBjO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcyk7XG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrO1xuICAgICAgYyAvPSAyO1xuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDA7XG4gICAgICBlID0gZU1heDtcbiAgICB9IGVsc2UgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICBtID0gKHZhbHVlICogYyAtIDEpICogTWF0aC5wb3coMiwgbUxlbik7XG4gICAgICBlID0gZSArIGVCaWFzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBNYXRoLnBvdygyLCBlQmlhcyAtIDEpICogTWF0aC5wb3coMiwgbUxlbik7XG4gICAgICBlID0gMDtcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KSB7fVxuXG4gIGUgPSBlIDw8IG1MZW4gfCBtO1xuICBlTGVuICs9IG1MZW47XG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCkge31cblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjg7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1sdVpHVjRMbXB6SWwwc0ltNWhiV1Z6SWpwYkltVjRjRzl5ZEhNaUxDSnlaV0ZrSWl3aVluVm1abVZ5SWl3aWIyWm1jMlYwSWl3aWFYTk1SU0lzSW0xTVpXNGlMQ0p1UW5sMFpYTWlMQ0psSWl3aWJTSXNJbVZNWlc0aUxDSmxUV0Y0SWl3aVpVSnBZWE1pTENKdVFtbDBjeUlzSW1raUxDSmtJaXdpY3lJc0lrNWhUaUlzSWtsdVptbHVhWFI1SWl3aVRXRjBhQ0lzSW5CdmR5SXNJbmR5YVhSbElpd2lkbUZzZFdVaUxDSmpJaXdpY25RaUxDSmhZbk1pTENKcGMwNWhUaUlzSW1ac2IyOXlJaXdpYkc5bklpd2lURTR5SWwwc0ltMWhjSEJwYm1keklqb2lPenRCUVVGQlFTeFJRVUZSUXl4SlFVRlNMRWRCUVdVc1ZVRkJWVU1zVFVGQlZpeEZRVUZyUWtNc1RVRkJiRUlzUlVGQk1FSkRMRWxCUVRGQ0xFVkJRV2REUXl4SlFVRm9ReXhGUVVGelEwTXNUVUZCZEVNc1JVRkJPRU03UVVGRE0wUXNUVUZCU1VNc1EwRkJTaXhGUVVGUFF5eERRVUZRTzBGQlEwRXNUVUZCU1VNc1QwRkJUMGdzVTBGQlV5eERRVUZVTEVkQlFXRkVMRWxCUVdJc1IwRkJiMElzUTBGQkwwSTdRVUZEUVN4TlFVRkpTeXhQUVVGUExFTkJRVU1zUzBGQlMwUXNTVUZCVGl4SlFVRmpMRU5CUVhwQ08wRkJRMEVzVFVGQlNVVXNVVUZCVVVRc1VVRkJVU3hEUVVGd1FqdEJRVU5CTEUxQlFVbEZMRkZCUVZFc1EwRkJReXhEUVVGaU8wRkJRMEVzVFVGQlNVTXNTVUZCU1ZRc1QwRkJVVVVzVTBGQlV5eERRVUZxUWl4SFFVRnpRaXhEUVVFNVFqdEJRVU5CTEUxQlFVbFJMRWxCUVVsV0xFOUJRVThzUTBGQlF5eERRVUZTTEVkQlFWa3NRMEZCY0VJN1FVRkRRU3hOUVVGSlZ5eEpRVUZKWWl4UFFVRlBReXhUUVVGVFZTeERRVUZvUWl4RFFVRlNPenRCUVVWQlFTeFBRVUZMUXl4RFFVRk1PenRCUVVWQlVDeE5RVUZKVVN4SlFVRkxMRU5CUVVNc1MwRkJUU3hEUVVGRFNDeExRVUZTTEVsQlFXdENMRU5CUVROQ08wRkJRMEZITEZGQlFVOHNRMEZCUTBnc1MwRkJVanRCUVVOQlFTeFhRVUZUU0N4SlFVRlVPMEZCUTBFc1UwRkJUMGNzVVVGQlVTeERRVUZtTEVWQlFXdENUQ3hKUVVGSlFTeEpRVUZKTEVkQlFVb3NSMEZCVlV3c1QwRkJUME1zVTBGQlUxVXNRMEZCYUVJc1EwRkJaQ3hGUVVGclEwRXNTMEZCUzBNc1EwRkJka01zUlVGQk1FTkdMRk5CUVZNc1EwRkJja1VzUlVGQmQwVXNRMEZCUlRzN1FVRkZNVVZLTEUxQlFVbEVMRWxCUVVzc1EwRkJReXhMUVVGTkxFTkJRVU5MTEV0QlFWSXNTVUZCYTBJc1EwRkJNMEk3UVVGRFFVd3NVVUZCVHl4RFFVRkRTeXhMUVVGU08wRkJRMEZCTEZkQlFWTlFMRWxCUVZRN1FVRkRRU3hUUVVGUFR5eFJRVUZSTEVOQlFXWXNSVUZCYTBKS0xFbEJRVWxCTEVsQlFVa3NSMEZCU2l4SFFVRlZUaXhQUVVGUFF5eFRRVUZUVlN4RFFVRm9RaXhEUVVGa0xFVkJRV3REUVN4TFFVRkxReXhEUVVGMlF5eEZRVUV3UTBZc1UwRkJVeXhEUVVGeVJTeEZRVUYzUlN4RFFVRkZPenRCUVVVeFJTeE5RVUZKVEN4TlFVRk5MRU5CUVZZc1JVRkJZVHRCUVVOWVFTeFJRVUZKTEVsQlFVbEpMRXRCUVZJN1FVRkRSQ3hIUVVaRUxFMUJSVThzU1VGQlNVb3NUVUZCVFVjc1NVRkJWaXhGUVVGblFqdEJRVU55UWl4WFFVRlBSaXhKUVVGSlVTeEhRVUZLTEVkQlFWY3NRMEZCUTBRc1NVRkJTU3hEUVVGRExFTkJRVXdzUjBGQlV5eERRVUZXTEVsQlFXVkZMRkZCUVdwRE8wRkJRMFFzUjBGR1RTeE5RVVZCTzBGQlEweFVMRkZCUVVsQkxFbEJRVWxWTEV0QlFVdERMRWRCUVV3c1EwRkJVeXhEUVVGVUxFVkJRVmxrTEVsQlFWb3NRMEZCVWp0QlFVTkJSU3hSUVVGSlFTeEpRVUZKU1N4TFFVRlNPMEZCUTBRN1FVRkRSQ3hUUVVGUExFTkJRVU5KTEVsQlFVa3NRMEZCUXl4RFFVRk1MRWRCUVZNc1EwRkJWaXhKUVVGbFVDeERRVUZtTEVkQlFXMUNWU3hMUVVGTFF5eEhRVUZNTEVOQlFWTXNRMEZCVkN4RlFVRlpXaXhKUVVGSlJpeEpRVUZvUWl4RFFVRXhRanRCUVVORUxFTkJMMEpFT3p0QlFXbERRVXdzVVVGQlVXOUNMRXRCUVZJc1IwRkJaMElzVlVGQlZXeENMRTFCUVZZc1JVRkJhMEp0UWl4TFFVRnNRaXhGUVVGNVFteENMRTFCUVhwQ0xFVkJRV2xEUXl4SlFVRnFReXhGUVVGMVEwTXNTVUZCZGtNc1JVRkJOa05ETEUxQlFUZERMRVZCUVhGRU8wRkJRMjVGTEUxQlFVbERMRU5CUVVvc1JVRkJUME1zUTBGQlVDeEZRVUZWWXl4RFFVRldPMEZCUTBFc1RVRkJTV0lzVDBGQlQwZ3NVMEZCVXl4RFFVRlVMRWRCUVdGRUxFbEJRV0lzUjBGQmIwSXNRMEZCTDBJN1FVRkRRU3hOUVVGSlN5eFBRVUZQTEVOQlFVTXNTMEZCUzBRc1NVRkJUaXhKUVVGakxFTkJRWHBDTzBGQlEwRXNUVUZCU1VVc1VVRkJVVVFzVVVGQlVTeERRVUZ3UWp0QlFVTkJMRTFCUVVsaExFdEJRVTFzUWl4VFFVRlRMRVZCUVZRc1IwRkJZMkVzUzBGQlMwTXNSMEZCVEN4RFFVRlRMRU5CUVZRc1JVRkJXU3hEUVVGRExFVkJRV0lzU1VGQmJVSkVMRXRCUVV0RExFZEJRVXdzUTBGQlV5eERRVUZVTEVWQlFWa3NRMEZCUXl4RlFVRmlMRU5CUVdwRExFZEJRVzlFTEVOQlFUbEVPMEZCUTBFc1RVRkJTVTRzU1VGQlNWUXNUMEZCVHl4RFFVRlFMRWRCUVZsRkxGTkJRVk1zUTBGQk4wSTdRVUZEUVN4TlFVRkpVU3hKUVVGSlZpeFBRVUZQTEVOQlFWQXNSMEZCVnl4RFFVRkRMRU5CUVhCQ08wRkJRMEVzVFVGQlNWY3NTVUZCU1Uwc1VVRkJVU3hEUVVGU0xFbEJRV05CTEZWQlFWVXNRMEZCVml4SlFVRmxMRWxCUVVsQkxFdEJRVW9zUjBGQldTeERRVUY2UXl4SFFVRTRReXhEUVVFNVF5eEhRVUZyUkN4RFFVRXhSRHM3UVVGRlFVRXNWVUZCVVVnc1MwRkJTMDBzUjBGQlRDeERRVUZUU0N4TFFVRlVMRU5CUVZJN08wRkJSVUVzVFVGQlNVa3NUVUZCVFVvc1MwRkJUaXhMUVVGblFrRXNWVUZCVlVvc1VVRkJPVUlzUlVGQmQwTTdRVUZEZEVOVUxGRkJRVWxwUWl4TlFVRk5TaXhMUVVGT0xFbEJRV1VzUTBGQlppeEhRVUZ0UWl4RFFVRjJRanRCUVVOQlpDeFJRVUZKUnl4SlFVRktPMEZCUTBRc1IwRklSQ3hOUVVkUE8wRkJRMHhJTEZGQlFVbFhMRXRCUVV0UkxFdEJRVXdzUTBGQlYxSXNTMEZCUzFNc1IwRkJUQ3hEUVVGVFRpeExRVUZVTEVsQlFXdENTQ3hMUVVGTFZTeEhRVUZzUXl4RFFVRktPMEZCUTBFc1VVRkJTVkFzVTBGQlUwTXNTVUZCU1Vvc1MwRkJTME1zUjBGQlRDeERRVUZUTEVOQlFWUXNSVUZCV1N4RFFVRkRXaXhEUVVGaUxFTkJRV0lzU1VGQlowTXNRMEZCY0VNc1JVRkJkVU03UVVGRGNrTkJPMEZCUTBGbExGZEJRVXNzUTBGQlREdEJRVU5FTzBGQlEwUXNVVUZCU1dZc1NVRkJTVWtzUzBGQlNpeEpRVUZoTEVOQlFXcENMRVZCUVc5Q08wRkJRMnhDVlN4bFFVRlRSU3hMUVVGTFJDeERRVUZrTzBGQlEwUXNTMEZHUkN4TlFVVlBPMEZCUTB4RUxHVkJRVk5GTEV0QlFVdE1MRXRCUVV0RExFZEJRVXdzUTBGQlV5eERRVUZVTEVWQlFWa3NTVUZCU1ZJc1MwRkJhRUlzUTBGQlpEdEJRVU5FTzBGQlEwUXNVVUZCU1ZVc1VVRkJVVU1zUTBGQlVpeEpRVUZoTEVOQlFXcENMRVZCUVc5Q08wRkJRMnhDWmp0QlFVTkJaU3hYUVVGTExFTkJRVXc3UVVGRFJEczdRVUZGUkN4UlFVRkpaaXhKUVVGSlNTeExRVUZLTEVsQlFXRkVMRWxCUVdwQ0xFVkJRWFZDTzBGQlEzSkNSaXhWUVVGSkxFTkJRVW83UVVGRFFVUXNWVUZCU1Vjc1NVRkJTanRCUVVORUxFdEJTRVFzVFVGSFR5eEpRVUZKU0N4SlFVRkpTU3hMUVVGS0xFbEJRV0VzUTBGQmFrSXNSVUZCYjBJN1FVRkRla0pJTEZWQlFVa3NRMEZCUTJFc1VVRkJVVU1zUTBGQlVpeEhRVUZaTEVOQlFXSXNTVUZCYTBKS0xFdEJRVXRETEVkQlFVd3NRMEZCVXl4RFFVRlVMRVZCUVZsa0xFbEJRVm9zUTBGQmRFSTdRVUZEUVVVc1ZVRkJTVUVzU1VGQlNVa3NTMEZCVWp0QlFVTkVMRXRCU0Uwc1RVRkhRVHRCUVVOTVNDeFZRVUZKWVN4UlFVRlJTQ3hMUVVGTFF5eEhRVUZNTEVOQlFWTXNRMEZCVkN4RlFVRlpVaXhSUVVGUkxFTkJRWEJDTEVOQlFWSXNSMEZCYVVOUExFdEJRVXRETEVkQlFVd3NRMEZCVXl4RFFVRlVMRVZCUVZsa0xFbEJRVm9zUTBGQmNrTTdRVUZEUVVVc1ZVRkJTU3hEUVVGS08wRkJRMFE3UVVGRFJqczdRVUZGUkN4VFFVRlBSaXhSUVVGUkxFTkJRV1lzUlVGQmEwSklMRTlCUVU5RExGTkJRVk5WTEVOQlFXaENMRWxCUVhGQ1RDeEpRVUZKTEVsQlFYcENMRVZCUVN0Q1N5eExRVUZMUXl4RFFVRndReXhGUVVGMVEwNHNTMEZCU3l4SFFVRTFReXhGUVVGcFJFZ3NVVUZCVVN4RFFVRXpSU3hGUVVFNFJTeERRVUZGT3p0QlFVVm9Sa1VzVFVGQlMwRXNTMEZCUzBZc1NVRkJUaXhIUVVGalJ5eERRVUZzUWp0QlFVTkJReXhWUVVGUlNpeEpRVUZTTzBGQlEwRXNVMEZCVDBrc1QwRkJUeXhEUVVGa0xFVkJRV2xDVUN4UFFVRlBReXhUUVVGVFZTeERRVUZvUWl4SlFVRnhRazRzU1VGQlNTeEpRVUY2UWl4RlFVRXJRazBzUzBGQlMwTXNRMEZCY0VNc1JVRkJkVU5RTEV0QlFVc3NSMEZCTlVNc1JVRkJhVVJGTEZGQlFWRXNRMEZCTVVVc1JVRkJOa1VzUTBGQlJUczdRVUZGTDBWUUxGTkJRVTlETEZOQlFWTlZMRU5CUVZRc1IwRkJZVU1zUTBGQmNFSXNTMEZCTUVKRExFbEJRVWtzUjBGQk9VSTdRVUZEUkN4RFFXeEVSQ0lzSW1acGJHVWlPaUpwYm1SbGVDNXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSW1WNGNHOXlkSE11Y21WaFpDQTlJR1oxYm1OMGFXOXVJQ2hpZFdabVpYSXNJRzltWm5ObGRDd2dhWE5NUlN3Z2JVeGxiaXdnYmtKNWRHVnpLU0I3WEc0Z0lIWmhjaUJsTENCdFhHNGdJSFpoY2lCbFRHVnVJRDBnYmtKNWRHVnpJQ29nT0NBdElHMU1aVzRnTFNBeFhHNGdJSFpoY2lCbFRXRjRJRDBnS0RFZ1BEd2daVXhsYmlrZ0xTQXhYRzRnSUhaaGNpQmxRbWxoY3lBOUlHVk5ZWGdnUGo0Z01WeHVJQ0IyWVhJZ2JrSnBkSE1nUFNBdE4xeHVJQ0IyWVhJZ2FTQTlJR2x6VEVVZ1B5QW9ia0o1ZEdWeklDMGdNU2tnT2lBd1hHNGdJSFpoY2lCa0lEMGdhWE5NUlNBL0lDMHhJRG9nTVZ4dUlDQjJZWElnY3lBOUlHSjFabVpsY2x0dlptWnpaWFFnS3lCcFhWeHVYRzRnSUdrZ0t6MGdaRnh1WEc0Z0lHVWdQU0J6SUNZZ0tDZ3hJRHc4SUNndGJrSnBkSE1wS1NBdElERXBYRzRnSUhNZ1BqNDlJQ2d0YmtKcGRITXBYRzRnSUc1Q2FYUnpJQ3M5SUdWTVpXNWNiaUFnWm05eUlDZzdJRzVDYVhSeklENGdNRHNnWlNBOUlHVWdLaUF5TlRZZ0t5QmlkV1ptWlhKYmIyWm1jMlYwSUNzZ2FWMHNJR2tnS3owZ1pDd2dia0pwZEhNZ0xUMGdPQ2tnZTMxY2JseHVJQ0J0SUQwZ1pTQW1JQ2dvTVNBOFBDQW9MVzVDYVhSektTa2dMU0F4S1Z4dUlDQmxJRDQrUFNBb0xXNUNhWFJ6S1Z4dUlDQnVRbWwwY3lBclBTQnRUR1Z1WEc0Z0lHWnZjaUFvT3lCdVFtbDBjeUErSURBN0lHMGdQU0J0SUNvZ01qVTJJQ3NnWW5WbVptVnlXMjltWm5ObGRDQXJJR2xkTENCcElDczlJR1FzSUc1Q2FYUnpJQzA5SURncElIdDlYRzVjYmlBZ2FXWWdLR1VnUFQwOUlEQXBJSHRjYmlBZ0lDQmxJRDBnTVNBdElHVkNhV0Z6WEc0Z0lIMGdaV3h6WlNCcFppQW9aU0E5UFQwZ1pVMWhlQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQnRJRDhnVG1GT0lEb2dLQ2h6SUQ4Z0xURWdPaUF4S1NBcUlFbHVabWx1YVhSNUtWeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lHMGdQU0J0SUNzZ1RXRjBhQzV3YjNjb01pd2diVXhsYmlsY2JpQWdJQ0JsSUQwZ1pTQXRJR1ZDYVdGelhHNGdJSDFjYmlBZ2NtVjBkWEp1SUNoeklEOGdMVEVnT2lBeEtTQXFJRzBnS2lCTllYUm9MbkJ2ZHlneUxDQmxJQzBnYlV4bGJpbGNibjFjYmx4dVpYaHdiM0owY3k1M2NtbDBaU0E5SUdaMWJtTjBhVzl1SUNoaWRXWm1aWElzSUhaaGJIVmxMQ0J2Wm1aelpYUXNJR2x6VEVVc0lHMU1aVzRzSUc1Q2VYUmxjeWtnZTF4dUlDQjJZWElnWlN3Z2JTd2dZMXh1SUNCMllYSWdaVXhsYmlBOUlHNUNlWFJsY3lBcUlEZ2dMU0J0VEdWdUlDMGdNVnh1SUNCMllYSWdaVTFoZUNBOUlDZ3hJRHc4SUdWTVpXNHBJQzBnTVZ4dUlDQjJZWElnWlVKcFlYTWdQU0JsVFdGNElENCtJREZjYmlBZ2RtRnlJSEowSUQwZ0tHMU1aVzRnUFQwOUlESXpJRDhnVFdGMGFDNXdiM2NvTWl3Z0xUSTBLU0F0SUUxaGRHZ3VjRzkzS0RJc0lDMDNOeWtnT2lBd0tWeHVJQ0IyWVhJZ2FTQTlJR2x6VEVVZ1B5QXdJRG9nS0c1Q2VYUmxjeUF0SURFcFhHNGdJSFpoY2lCa0lEMGdhWE5NUlNBL0lERWdPaUF0TVZ4dUlDQjJZWElnY3lBOUlIWmhiSFZsSUR3Z01DQjhmQ0FvZG1Gc2RXVWdQVDA5SURBZ0ppWWdNU0F2SUhaaGJIVmxJRHdnTUNrZ1B5QXhJRG9nTUZ4dVhHNGdJSFpoYkhWbElEMGdUV0YwYUM1aFluTW9kbUZzZFdVcFhHNWNiaUFnYVdZZ0tHbHpUbUZPS0haaGJIVmxLU0I4ZkNCMllXeDFaU0E5UFQwZ1NXNW1hVzVwZEhrcElIdGNiaUFnSUNCdElEMGdhWE5PWVU0b2RtRnNkV1VwSUQ4Z01TQTZJREJjYmlBZ0lDQmxJRDBnWlUxaGVGeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lHVWdQU0JOWVhSb0xtWnNiMjl5S0UxaGRHZ3ViRzluS0haaGJIVmxLU0F2SUUxaGRHZ3VURTR5S1Z4dUlDQWdJR2xtSUNoMllXeDFaU0FxSUNoaklEMGdUV0YwYUM1d2IzY29NaXdnTFdVcEtTQThJREVwSUh0Y2JpQWdJQ0FnSUdVdExWeHVJQ0FnSUNBZ1l5QXFQU0F5WEc0Z0lDQWdmVnh1SUNBZ0lHbG1JQ2hsSUNzZ1pVSnBZWE1nUGowZ01Ta2dlMXh1SUNBZ0lDQWdkbUZzZFdVZ0t6MGdjblFnTHlCalhHNGdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJSFpoYkhWbElDczlJSEowSUNvZ1RXRjBhQzV3YjNjb01pd2dNU0F0SUdWQ2FXRnpLVnh1SUNBZ0lIMWNiaUFnSUNCcFppQW9kbUZzZFdVZ0tpQmpJRDQ5SURJcElIdGNiaUFnSUNBZ0lHVXJLMXh1SUNBZ0lDQWdZeUF2UFNBeVhHNGdJQ0FnZlZ4dVhHNGdJQ0FnYVdZZ0tHVWdLeUJsUW1saGN5QStQU0JsVFdGNEtTQjdYRzRnSUNBZ0lDQnRJRDBnTUZ4dUlDQWdJQ0FnWlNBOUlHVk5ZWGhjYmlBZ0lDQjlJR1ZzYzJVZ2FXWWdLR1VnS3lCbFFtbGhjeUErUFNBeEtTQjdYRzRnSUNBZ0lDQnRJRDBnS0haaGJIVmxJQ29nWXlBdElERXBJQ29nVFdGMGFDNXdiM2NvTWl3Z2JVeGxiaWxjYmlBZ0lDQWdJR1VnUFNCbElDc2daVUpwWVhOY2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdiU0E5SUhaaGJIVmxJQ29nVFdGMGFDNXdiM2NvTWl3Z1pVSnBZWE1nTFNBeEtTQXFJRTFoZEdndWNHOTNLRElzSUcxTVpXNHBYRzRnSUNBZ0lDQmxJRDBnTUZ4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUdadmNpQW9PeUJ0VEdWdUlENDlJRGc3SUdKMVptWmxjbHR2Wm1aelpYUWdLeUJwWFNBOUlHMGdKaUF3ZUdabUxDQnBJQ3M5SUdRc0lHMGdMejBnTWpVMkxDQnRUR1Z1SUMwOUlEZ3BJSHQ5WEc1Y2JpQWdaU0E5SUNobElEdzhJRzFNWlc0cElId2diVnh1SUNCbFRHVnVJQ3M5SUcxTVpXNWNiaUFnWm05eUlDZzdJR1ZNWlc0Z1BpQXdPeUJpZFdabVpYSmJiMlptYzJWMElDc2dhVjBnUFNCbElDWWdNSGhtWml3Z2FTQXJQU0JrTENCbElDODlJREkxTml3Z1pVeGxiaUF0UFNBNEtTQjdmVnh1WEc0Z0lHSjFabVpsY2x0dlptWnpaWFFnS3lCcElDMGdaRjBnZkQwZ2N5QXFJREV5T0Z4dWZWeHVJbDE5XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxpZWVlNzU0XFxcXGluZGV4LmpzXCIsXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXGllZWU3NTRcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XG5cbi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhblNldEltbWVkaWF0ZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5zZXRJbW1lZGlhdGU7XG4gICAgdmFyIGNhblBvc3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cucG9zdE1lc3NhZ2UgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXI7XG5cbiAgICBpZiAoY2FuU2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZikge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKGNhblBvc3QpIHtcbiAgICAgICAgdmFyIHF1ZXVlID0gW107XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gZXYuc291cmNlO1xuICAgICAgICAgICAgaWYgKChzb3VyY2UgPT09IHdpbmRvdyB8fCBzb3VyY2UgPT09IG51bGwpICYmIGV2LmRhdGEgPT09ICdwcm9jZXNzLXRpY2snKSB7XG4gICAgICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZuID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICAgICAgcXVldWUucHVzaChmbik7XG4gICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoJ3Byb2Nlc3MtdGljaycsICcqJyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgIH07XG59KCk7XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAnLyc7XG59O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltSnliM2R6WlhJdWFuTWlYU3dpYm1GdFpYTWlPbHNpY0hKdlkyVnpjeUlzSW0xdlpIVnNaU0lzSW1WNGNHOXlkSE1pTENKdVpYaDBWR2xqYXlJc0ltTmhibE5sZEVsdGJXVmthV0YwWlNJc0luZHBibVJ2ZHlJc0luTmxkRWx0YldWa2FXRjBaU0lzSW1OaGJsQnZjM1FpTENKd2IzTjBUV1Z6YzJGblpTSXNJbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSWlMQ0ptSWl3aWNYVmxkV1VpTENKbGRpSXNJbk52ZFhKalpTSXNJbVJoZEdFaUxDSnpkRzl3VUhKdmNHRm5ZWFJwYjI0aUxDSnNaVzVuZEdnaUxDSm1iaUlzSW5Ob2FXWjBJaXdpY0hWemFDSXNJbk5sZEZScGJXVnZkWFFpTENKMGFYUnNaU0lzSW1KeWIzZHpaWElpTENKbGJuWWlMQ0poY21kMklpd2libTl2Y0NJc0ltOXVJaXdpWVdSa1RHbHpkR1Z1WlhJaUxDSnZibU5sSWl3aWIyWm1JaXdpY21WdGIzWmxUR2x6ZEdWdVpYSWlMQ0p5WlcxdmRtVkJiR3hNYVhOMFpXNWxjbk1pTENKbGJXbDBJaXdpWW1sdVpHbHVaeUlzSW01aGJXVWlMQ0pGY25KdmNpSXNJbU4zWkNJc0ltTm9aR2x5SWl3aVpHbHlJbDBzSW0xaGNIQnBibWR6SWpvaU96dEJRVUZCT3p0QlFVVkJMRWxCUVVsQkxGVkJRVlZETEU5QlFVOURMRTlCUVZBc1IwRkJhVUlzUlVGQkwwSTdPMEZCUlVGR0xGRkJRVkZITEZGQlFWSXNSMEZCYjBJc1dVRkJXVHRCUVVNMVFpeFJRVUZKUXl4clFrRkJhMElzVDBGQlQwTXNUVUZCVUN4TFFVRnJRaXhYUVVGc1FpeEpRVU51UWtFc1QwRkJUME1zV1VGRVZqdEJRVVZCTEZGQlFVbERMRlZCUVZVc1QwRkJUMFlzVFVGQlVDeExRVUZyUWl4WFFVRnNRaXhKUVVOWVFTeFBRVUZQUnl4WFFVUkpMRWxCUTFkSUxFOUJRVTlKTEdkQ1FVUm9RenM3UVVGSlFTeFJRVUZKVEN4bFFVRktMRVZCUVhGQ08wRkJRMnBDTEdWQlFVOHNWVUZCVlUwc1EwRkJWaXhGUVVGaE8wRkJRVVVzYlVKQlFVOU1MRTlCUVU5RExGbEJRVkFzUTBGQmIwSkpMRU5CUVhCQ0xFTkJRVkE3UVVGQkswSXNVMEZCY2tRN1FVRkRTRHM3UVVGRlJDeFJRVUZKU0N4UFFVRktMRVZCUVdFN1FVRkRWQ3haUVVGSlNTeFJRVUZSTEVWQlFWbzdRVUZEUVU0c1pVRkJUMGtzWjBKQlFWQXNRMEZCZDBJc1UwRkJlRUlzUlVGQmJVTXNWVUZCVlVjc1JVRkJWaXhGUVVGak8wRkJRemRETEdkQ1FVRkpReXhUUVVGVFJDeEhRVUZIUXl4TlFVRm9RanRCUVVOQkxHZENRVUZKTEVOQlFVTkJMRmRCUVZkU0xFMUJRVmdzU1VGQmNVSlJMRmRCUVZjc1NVRkJha01zUzBGQk1FTkVMRWRCUVVkRkxFbEJRVWdzUzBGQldTeGpRVUV4UkN4RlFVRXdSVHRCUVVOMFJVWXNiVUpCUVVkSExHVkJRVWc3UVVGRFFTeHZRa0ZCU1Vvc1RVRkJUVXNzVFVGQlRpeEhRVUZsTEVOQlFXNUNMRVZCUVhOQ08wRkJRMnhDTEhkQ1FVRkpReXhMUVVGTFRpeE5RVUZOVHl4TFFVRk9MRVZCUVZRN1FVRkRRVVE3UVVGRFNEdEJRVU5LTzBGQlEwb3NVMEZVUkN4RlFWTkhMRWxCVkVnN08wRkJWMEVzWlVGQlR5eFRRVUZUWkN4UlFVRlVMRU5CUVd0Q1l5eEZRVUZzUWl4RlFVRnpRanRCUVVONlFrNHNhMEpCUVUxUkxFbEJRVTRzUTBGQlYwWXNSVUZCV0R0QlFVTkJXaXh0UWtGQlQwY3NWMEZCVUN4RFFVRnRRaXhqUVVGdVFpeEZRVUZ0UXl4SFFVRnVRenRCUVVOSUxGTkJTRVE3UVVGSlNEczdRVUZGUkN4WFFVRlBMRk5CUVZOTUxGRkJRVlFzUTBGQmEwSmpMRVZCUVd4Q0xFVkJRWE5DTzBGQlEzcENSeXh0UWtGQlYwZ3NSVUZCV0N4RlFVRmxMRU5CUVdZN1FVRkRTQ3hMUVVaRU8wRkJSMGdzUTBGcVEydENMRVZCUVc1Q096dEJRVzFEUVdwQ0xGRkJRVkZ4UWl4TFFVRlNMRWRCUVdkQ0xGTkJRV2hDTzBGQlEwRnlRaXhSUVVGUmMwSXNUMEZCVWl4SFFVRnJRaXhKUVVGc1FqdEJRVU5CZEVJc1VVRkJVWFZDTEVkQlFWSXNSMEZCWXl4RlFVRmtPMEZCUTBGMlFpeFJRVUZSZDBJc1NVRkJVaXhIUVVGbExFVkJRV1k3TzBGQlJVRXNVMEZCVTBNc1NVRkJWQ3hIUVVGblFpeERRVUZGT3p0QlFVVnNRbnBDTEZGQlFWRXdRaXhGUVVGU0xFZEJRV0ZFTEVsQlFXSTdRVUZEUVhwQ0xGRkJRVkV5UWl4WFFVRlNMRWRCUVhOQ1JpeEpRVUYwUWp0QlFVTkJla0lzVVVGQlVUUkNMRWxCUVZJc1IwRkJaVWdzU1VGQlpqdEJRVU5CZWtJc1VVRkJVVFpDTEVkQlFWSXNSMEZCWTBvc1NVRkJaRHRCUVVOQmVrSXNVVUZCVVRoQ0xHTkJRVklzUjBGQmVVSk1MRWxCUVhwQ08wRkJRMEY2UWl4UlFVRlJLMElzYTBKQlFWSXNSMEZCTmtKT0xFbEJRVGRDTzBGQlEwRjZRaXhSUVVGUlowTXNTVUZCVWl4SFFVRmxVQ3hKUVVGbU96dEJRVVZCZWtJc1VVRkJVV2xETEU5QlFWSXNSMEZCYTBJc1ZVRkJWVU1zU1VGQlZpeEZRVUZuUWp0QlFVTTVRaXhWUVVGTkxFbEJRVWxETEV0QlFVb3NRMEZCVlN4clEwRkJWaXhEUVVGT08wRkJRMGdzUTBGR1JEczdRVUZKUVR0QlFVTkJia01zVVVGQlVXOURMRWRCUVZJc1IwRkJZeXhaUVVGWk8wRkJRVVVzVjBGQlR5eEhRVUZRTzBGQlFWa3NRMEZCZUVNN1FVRkRRWEJETEZGQlFWRnhReXhMUVVGU0xFZEJRV2RDTEZWQlFWVkRMRWRCUVZZc1JVRkJaVHRCUVVNelFpeFZRVUZOTEVsQlFVbElMRXRCUVVvc1EwRkJWU3huUTBGQlZpeERRVUZPTzBGQlEwZ3NRMEZHUkNJc0ltWnBiR1VpT2lKaWNtOTNjMlZ5TG1weklpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lMeThnYzJocGJTQm1iM0lnZFhOcGJtY2djSEp2WTJWemN5QnBiaUJpY205M2MyVnlYRzVjYm5aaGNpQndjbTlqWlhOeklEMGdiVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQjdmVHRjYmx4dWNISnZZMlZ6Y3k1dVpYaDBWR2xqYXlBOUlDaG1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lDQWdkbUZ5SUdOaGJsTmxkRWx0YldWa2FXRjBaU0E5SUhSNWNHVnZaaUIzYVc1a2IzY2dJVDA5SUNkMWJtUmxabWx1WldRblhHNGdJQ0FnSmlZZ2QybHVaRzkzTG5ObGRFbHRiV1ZrYVdGMFpUdGNiaUFnSUNCMllYSWdZMkZ1VUc5emRDQTlJSFI1Y0dWdlppQjNhVzVrYjNjZ0lUMDlJQ2QxYm1SbFptbHVaV1FuWEc0Z0lDQWdKaVlnZDJsdVpHOTNMbkJ2YzNSTlpYTnpZV2RsSUNZbUlIZHBibVJ2ZHk1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5WEc0Z0lDQWdPMXh1WEc0Z0lDQWdhV1lnS0dOaGJsTmxkRWx0YldWa2FXRjBaU2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnWm5WdVkzUnBiMjRnS0dZcElIc2djbVYwZFhKdUlIZHBibVJ2ZHk1elpYUkpiVzFsWkdsaGRHVW9aaWtnZlR0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0JwWmlBb1kyRnVVRzl6ZENrZ2UxeHVJQ0FnSUNBZ0lDQjJZWElnY1hWbGRXVWdQU0JiWFR0Y2JpQWdJQ0FnSUNBZ2QybHVaRzkzTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSjIxbGMzTmhaMlVuTENCbWRXNWpkR2x2YmlBb1pYWXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJ6YjNWeVkyVWdQU0JsZGk1emIzVnlZMlU3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvS0hOdmRYSmpaU0E5UFQwZ2QybHVaRzkzSUh4OElITnZkWEpqWlNBOVBUMGdiblZzYkNrZ0ppWWdaWFl1WkdGMFlTQTlQVDBnSjNCeWIyTmxjM010ZEdsamF5Y3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JsZGk1emRHOXdVSEp2Y0dGbllYUnBiMjRvS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9jWFZsZFdVdWJHVnVaM1JvSUQ0Z01Da2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMllYSWdabTRnUFNCeGRXVjFaUzV6YUdsbWRDZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbWJpZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdmU3dnZEhKMVpTazdYRzVjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJR1oxYm1OMGFXOXVJRzVsZUhSVWFXTnJLR1p1S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J4ZFdWMVpTNXdkWE5vS0dadUtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUhkcGJtUnZkeTV3YjNOMFRXVnpjMkZuWlNnbmNISnZZMlZ6Y3kxMGFXTnJKeXdnSnlvbktUdGNiaUFnSUNBZ0lDQWdmVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQnlaWFIxY200Z1puVnVZM1JwYjI0Z2JtVjRkRlJwWTJzb1ptNHBJSHRjYmlBZ0lDQWdJQ0FnYzJWMFZHbHRaVzkxZENobWJpd2dNQ2s3WEc0Z0lDQWdmVHRjYm4wcEtDazdYRzVjYm5CeWIyTmxjM011ZEdsMGJHVWdQU0FuWW5KdmQzTmxjaWM3WEc1d2NtOWpaWE56TG1KeWIzZHpaWElnUFNCMGNuVmxPMXh1Y0hKdlkyVnpjeTVsYm5ZZ1BTQjdmVHRjYm5CeWIyTmxjM011WVhKbmRpQTlJRnRkTzF4dVhHNW1kVzVqZEdsdmJpQnViMjl3S0NrZ2UzMWNibHh1Y0hKdlkyVnpjeTV2YmlBOUlHNXZiM0E3WEc1d2NtOWpaWE56TG1Ga1pFeHBjM1JsYm1WeUlEMGdibTl2Y0R0Y2JuQnliMk5sYzNNdWIyNWpaU0E5SUc1dmIzQTdYRzV3Y205alpYTnpMbTltWmlBOUlHNXZiM0E3WEc1d2NtOWpaWE56TG5KbGJXOTJaVXhwYzNSbGJtVnlJRDBnYm05dmNEdGNibkJ5YjJObGMzTXVjbVZ0YjNabFFXeHNUR2x6ZEdWdVpYSnpJRDBnYm05dmNEdGNibkJ5YjJObGMzTXVaVzFwZENBOUlHNXZiM0E3WEc1Y2JuQnliMk5sYzNNdVltbHVaR2x1WnlBOUlHWjFibU4wYVc5dUlDaHVZVzFsS1NCN1hHNGdJQ0FnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2R3Y205alpYTnpMbUpwYm1ScGJtY2dhWE1nYm05MElITjFjSEJ2Y25SbFpDY3BPMXh1ZlZ4dVhHNHZMeUJVVDBSUEtITm9kSGxzYldGdUtWeHVjSEp2WTJWemN5NWpkMlFnUFNCbWRXNWpkR2x2YmlBb0tTQjdJSEpsZEhWeWJpQW5MeWNnZlR0Y2JuQnliMk5sYzNNdVkyaGthWElnUFNCbWRXNWpkR2x2YmlBb1pHbHlLU0I3WEc0Z0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZHdjbTlqWlhOekxtTm9aR2x5SUdseklHNXZkQ0J6ZFhCd2IzSjBaV1FuS1R0Y2JuMDdYRzRpWFgwPVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxccHJvY2Vzc1xcXFxicm93c2VyLmpzXCIsXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXHByb2Nlc3NcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBGSUVMRF9XSURUSCA9IHdpbmRvdy5pbm5lcldpZHRoICogMC44O1xudmFyIEZJRUxEX0hFSUdIVCA9IDYwMDtcblxudmFyIEJvbnVzID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBCb251cyhjdHgsIHdpZHRoLCBoZWlnaHQsIGNvbG9yLCB4LCB5LCBldmVudEJ1cykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCb251cyk7XG5cbiAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuXG4gICAgdGhpcy5ldmVudEJ1cyA9IGV2ZW50QnVzO1xuXG4gICAgdGhpcy5zcGVlZCA9IDA7XG4gICAgdGhpcy5hbmdsZSA9IDA7XG4gICAgdGhpcy5tb3ZlQW5nbGUgPSAwO1xuXG4gICAgdGhpcy5pbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcHBsZScpO1xuXG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuXG4gICAgdGhpcy54MSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUpO1xuICAgIHRoaXMueTEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1KTtcblxuICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcignZ2FtZTpsb2dnZXInLCAnQm9udXMgaGFzIGFwcGVhcmVkJyk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQm9udXMsIFt7XG4gICAga2V5OiAndXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlKGN0eCkge1xuICAgICAgLy8gY3R4LnNhdmUoKTtcbiAgICAgIC8vIGN0eC50cmFuc2xhdGUodGhpcy54LCB0aGlzLnkpO1xuICAgICAgLy8gY3R4LnJvdGF0ZSh0aGlzLmFuZ2xlKTtcbiAgICAgIC8vIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgLy8gY3R4LmZpbGxSZWN0KHRoaXMud2lkdGggLyAtMiwgdGhpcy5oZWlnaHQgLyAtMiwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgLy8gY3R4LnJlc3RvcmUoKTtcbiAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ25ld1BvcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG5ld1BvcyhvcHRpb25zKSB7XG4gICAgICAvLyB0aGlzLm1vdmVBbmdsZSA9IDA7XG4gICAgICAvLyB0aGlzLnNwZWVkID0gMDtcbiAgICAgIC8vIG9wdGlvbnMubGVmdCAmJiAodGhpcy5tb3ZlQW5nbGUgPSAtNSk7XG4gICAgICAvLyBvcHRpb25zLnJpZ2h0ICYmICh0aGlzLm1vdmVBbmdsZSA9IDUpO1xuICAgICAgLy8gb3B0aW9ucy51cCAmJiAodGhpcy5zcGVlZCA9IDUpO1xuICAgICAgLy8gb3B0aW9ucy5kb3duICYmICh0aGlzLnNwZWVkID0gLTUpO1xuICAgICAgLy9cbiAgICAgIC8vIHRoaXMuYW5nbGUgKz0gdGhpcy5tb3ZlQW5nbGUgKiBNYXRoLlBJIC8gMTgwO1xuICAgICAgLy8gdGhpcy54ICs9IHRoaXMuc3BlZWQgKiBNYXRoLnNpbih0aGlzLmFuZ2xlKTtcbiAgICAgIC8vIHRoaXMueSAtPSB0aGlzLnNwZWVkICogTWF0aC5jb3ModGhpcy5hbmdsZSk7XG5cbiAgICAgIC8vIGlmIChvcHRpb25zLm5ld1gpIHtcbiAgICAgIC8vICAgdGhpcy54ID0gb3B0aW9ucy5uZXdYO1xuICAgICAgLy8gICB0aGlzLnkgPSBvcHRpb25zLm5ld1k7XG4gICAgICAvLyB9IGVsc2Uge1xuICAgICAgLy8gICB0aGlzLnggKz0gdGhpcy54MTtcbiAgICAgIC8vICAgdGhpcy55ICs9IHRoaXMueTE7XG4gICAgICAvLyB9XG5cblxuICAgICAgaWYgKHRoaXMueCA+IEZJRUxEX1dJRFRIKSB7XG4gICAgICAgIHRoaXMueCA9IDA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMueCA8IDApIHtcbiAgICAgICAgdGhpcy54ID0gRklFTERfV0lEVEg7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy55ID4gRklFTERfSEVJR0hUKSB7XG4gICAgICAgIHRoaXMueSA9IDA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMueSA8IDApIHtcbiAgICAgICAgdGhpcy55ID0gRklFTERfSEVJR0hUO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEJvbnVzO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBCb251cztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklrSnZiblZ6TG1weklsMHNJbTVoYldWeklqcGJJa1pKUlV4RVgxZEpSRlJJSWl3aWQybHVaRzkzSWl3aWFXNXVaWEpYYVdSMGFDSXNJa1pKUlV4RVgwaEZTVWRJVkNJc0lrSnZiblZ6SWl3aVkzUjRJaXdpZDJsa2RHZ2lMQ0pvWldsbmFIUWlMQ0pqYjJ4dmNpSXNJbmdpTENKNUlpd2laWFpsYm5SQ2RYTWlMQ0p6Y0dWbFpDSXNJbUZ1WjJ4bElpd2liVzkyWlVGdVoyeGxJaXdpYVcxaFoyVWlMQ0prYjJOMWJXVnVkQ0lzSW5GMVpYSjVVMlZzWldOMGIzSWlMQ0o0TVNJc0lrMWhkR2dpTENKbWJHOXZjaUlzSW5KaGJtUnZiU0lzSW5reElpd2lkSEpwWjJkbGNpSXNJbVJ5WVhkSmJXRm5aU0lzSW05d2RHbHZibk1pWFN3aWJXRndjR2x1WjNNaU9pSTdPenM3T3pzN096czdRVUZCUVN4SlFVRkpRU3hqUVVGalF5eFBRVUZQUXl4VlFVRlFMRWRCUVc5Q0xFZEJRWFJETzBGQlEwRXNTVUZCU1VNc1pVRkJaU3hIUVVGdVFqczdTVUZGVFVNc1N6dEJRVU5LTEdsQ1FVRlpReXhIUVVGYUxFVkJRV2xDUXl4TFFVRnFRaXhGUVVGM1FrTXNUVUZCZUVJc1JVRkJaME5ETEV0QlFXaERMRVZCUVhWRFF5eERRVUYyUXl4RlFVRXdRME1zUTBGQk1VTXNSVUZCTmtORExGRkJRVGRETEVWQlFYVkVPMEZCUVVFN08wRkJRM0pFTEZOQlFVdE9MRWRCUVV3c1IwRkJWMEVzUjBGQldEdEJRVU5CTEZOQlFVdERMRXRCUVV3c1IwRkJZVUVzUzBGQllqdEJRVU5CTEZOQlFVdERMRTFCUVV3c1IwRkJZMEVzVFVGQlpEdEJRVU5CTEZOQlFVdERMRXRCUVV3c1IwRkJZVUVzUzBGQllqczdRVUZGUVN4VFFVRkxSeXhSUVVGTUxFZEJRV2RDUVN4UlFVRm9RanM3UVVGRlFTeFRRVUZMUXl4TFFVRk1MRWRCUVdFc1EwRkJZanRCUVVOQkxGTkJRVXRETEV0QlFVd3NSMEZCWVN4RFFVRmlPMEZCUTBFc1UwRkJTME1zVTBGQlRDeEhRVUZwUWl4RFFVRnFRanM3UVVGRlFTeFRRVUZMUXl4TFFVRk1MRWRCUVdGRExGTkJRVk5ETEdGQlFWUXNRMEZCZFVJc1VVRkJka0lzUTBGQllqczdRVUZGUVN4VFFVRkxVaXhEUVVGTUxFZEJRVk5CTEVOQlFWUTdRVUZEUVN4VFFVRkxReXhEUVVGTUxFZEJRVk5CTEVOQlFWUTdPMEZCUlVFc1UwRkJTMUVzUlVGQlRDeEhRVUZWUXl4TFFVRkxReXhMUVVGTUxFTkJRVmRFTEV0QlFVdEZMRTFCUVV3c1MwRkJaMElzUTBGQk0wSXNRMEZCVmp0QlFVTkJMRk5CUVV0RExFVkJRVXdzUjBGQlZVZ3NTMEZCUzBNc1MwRkJUQ3hEUVVGWFJDeExRVUZMUlN4TlFVRk1MRXRCUVdkQ0xFTkJRVE5DTEVOQlFWWTdPMEZCUlVFc1UwRkJTMVlzVVVGQlRDeERRVUZqV1N4UFFVRmtMRU5CUVhOQ0xHRkJRWFJDTEVWQlFYRkRMRzlDUVVGeVF6dEJRVU5FT3pzN096SkNRVVZOYkVJc1J5eEZRVUZMTzBGQlExWTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEZCTEZWQlFVbHRRaXhUUVVGS0xFTkJRV01zUzBGQlMxUXNTMEZCYmtJc1JVRkJNRUlzUzBGQlMwNHNRMEZCTDBJc1JVRkJhME1zUzBGQlMwTXNRMEZCZGtNc1JVRkJNRU1zUzBGQlMwb3NTMEZCTDBNc1JVRkJjMFFzUzBGQlMwTXNUVUZCTTBRN1FVRkRRU3hoUVVGUExFbEJRVkE3UVVGRFJEczdPekpDUVVWTmEwSXNUeXhGUVVGVE8wRkJRMlE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3T3p0QlFVZEJMRlZCUVVrc1MwRkJTMmhDTEVOQlFVd3NSMEZCVTFRc1YwRkJZaXhGUVVFd1FqdEJRVU40UWl4aFFVRkxVeXhEUVVGTUxFZEJRVk1zUTBGQlZEdEJRVU5FTEU5QlJrUXNUVUZGVHl4SlFVRkpMRXRCUVV0QkxFTkJRVXdzUjBGQlV5eERRVUZpTEVWQlFXZENPMEZCUTNKQ0xHRkJRVXRCTEVOQlFVd3NSMEZCVTFRc1YwRkJWRHRCUVVORU8wRkJRMFFzVlVGQlNTeExRVUZMVlN4RFFVRk1MRWRCUVZOUUxGbEJRV0lzUlVGQk1rSTdRVUZEZWtJc1lVRkJTMDhzUTBGQlRDeEhRVUZUTEVOQlFWUTdRVUZEUkN4UFFVWkVMRTFCUlU4c1NVRkJTU3hMUVVGTFFTeERRVUZNTEVkQlFWTXNRMEZCWWl4RlFVRm5RanRCUVVOeVFpeGhRVUZMUVN4RFFVRk1MRWRCUVZOUUxGbEJRVlE3UVVGRFJEdEJRVU5FTEdGQlFVOHNTVUZCVUR0QlFVTkVPenM3T3pzN2EwSkJSMWxETEVzaUxDSm1hV3hsSWpvaVFtOXVkWE11YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SjJZWElnUmtsRlRFUmZWMGxFVkVnZ1BTQjNhVzVrYjNjdWFXNXVaWEpYYVdSMGFDQXFJREF1T0R0Y2NseHVkbUZ5SUVaSlJVeEVYMGhGU1VkSVZDQTlJRFl3TUR0Y2NseHVYSEpjYm1Oc1lYTnpJRUp2Ym5WeklIdGNjbHh1SUNCamIyNXpkSEoxWTNSdmNpaGpkSGdzSUhkcFpIUm9MQ0JvWldsbmFIUXNJR052Ykc5eUxDQjRMQ0I1TENCbGRtVnVkRUoxY3lrZ2UxeHlYRzRnSUNBZ2RHaHBjeTVqZEhnZ1BTQmpkSGc3WEhKY2JpQWdJQ0IwYUdsekxuZHBaSFJvSUQwZ2QybGtkR2c3WEhKY2JpQWdJQ0IwYUdsekxtaGxhV2RvZENBOUlHaGxhV2RvZER0Y2NseHVJQ0FnSUhSb2FYTXVZMjlzYjNJZ1BTQmpiMnh2Y2p0Y2NseHVYSEpjYmlBZ0lDQjBhR2x6TG1WMlpXNTBRblZ6SUQwZ1pYWmxiblJDZFhNN1hISmNibHh5WEc0Z0lDQWdkR2hwY3k1emNHVmxaQ0E5SURBN1hISmNiaUFnSUNCMGFHbHpMbUZ1WjJ4bElEMGdNRHRjY2x4dUlDQWdJSFJvYVhNdWJXOTJaVUZ1WjJ4bElEMGdNRHRjY2x4dVhISmNiaUFnSUNCMGFHbHpMbWx0WVdkbElEMGdaRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2lnbkxtRndjR3hsSnlrN1hISmNibHh5WEc0Z0lDQWdkR2hwY3k1NElEMGdlRHRjY2x4dUlDQWdJSFJvYVhNdWVTQTlJSGs3WEhKY2JseHlYRzRnSUNBZ2RHaHBjeTU0TVNBOUlFMWhkR2d1Wm14dmIzSW9UV0YwYUM1eVlXNWtiMjBvS1NBcUlEVXBPMXh5WEc0Z0lDQWdkR2hwY3k1NU1TQTlJRTFoZEdndVpteHZiM0lvVFdGMGFDNXlZVzVrYjIwb0tTQXFJRFVwTzF4eVhHNWNjbHh1SUNBZ0lIUm9hWE11WlhabGJuUkNkWE11ZEhKcFoyZGxjaWduWjJGdFpUcHNiMmRuWlhJbkxDQW5RbTl1ZFhNZ2FHRnpJR0Z3Y0dWaGNtVmtKeWs3WEhKY2JpQWdmVnh5WEc1Y2NseHVJQ0IxY0dSaGRHVW9ZM1I0S1NCN1hISmNiaUFnSUNBdkx5QmpkSGd1YzJGMlpTZ3BPMXh5WEc0Z0lDQWdMeThnWTNSNExuUnlZVzV6YkdGMFpTaDBhR2x6TG5nc0lIUm9hWE11ZVNrN1hISmNiaUFnSUNBdkx5QmpkSGd1Y205MFlYUmxLSFJvYVhNdVlXNW5iR1VwTzF4eVhHNGdJQ0FnTHk4Z1kzUjRMbVpwYkd4VGRIbHNaU0E5SUhSb2FYTXVZMjlzYjNJN1hISmNiaUFnSUNBdkx5QmpkSGd1Wm1sc2JGSmxZM1FvZEdocGN5NTNhV1IwYUNBdklDMHlMQ0IwYUdsekxtaGxhV2RvZENBdklDMHlMQ0IwYUdsekxuZHBaSFJvTENCMGFHbHpMbWhsYVdkb2RDazdYSEpjYmlBZ0lDQXZMeUJqZEhndWNtVnpkRzl5WlNncE8xeHlYRzRnSUNBZ1kzUjRMbVJ5WVhkSmJXRm5aU2gwYUdsekxtbHRZV2RsTENCMGFHbHpMbmdzSUhSb2FYTXVlU3dnZEdocGN5NTNhV1IwYUN3Z2RHaHBjeTVvWldsbmFIUXBPMXh5WEc0Z0lDQWdjbVYwZFhKdUlIUm9hWE03WEhKY2JpQWdmVnh5WEc1Y2NseHVJQ0J1WlhkUWIzTW9iM0IwYVc5dWN5a2dlMXh5WEc0Z0lDQWdMeThnZEdocGN5NXRiM1psUVc1bmJHVWdQU0F3TzF4eVhHNGdJQ0FnTHk4Z2RHaHBjeTV6Y0dWbFpDQTlJREE3WEhKY2JpQWdJQ0F2THlCdmNIUnBiMjV6TG14bFpuUWdKaVlnS0hSb2FYTXViVzkyWlVGdVoyeGxJRDBnTFRVcE8xeHlYRzRnSUNBZ0x5OGdiM0IwYVc5dWN5NXlhV2RvZENBbUppQW9kR2hwY3k1dGIzWmxRVzVuYkdVZ1BTQTFLVHRjY2x4dUlDQWdJQzh2SUc5d2RHbHZibk11ZFhBZ0ppWWdLSFJvYVhNdWMzQmxaV1FnUFNBMUtUdGNjbHh1SUNBZ0lDOHZJRzl3ZEdsdmJuTXVaRzkzYmlBbUppQW9kR2hwY3k1emNHVmxaQ0E5SUMwMUtUdGNjbHh1SUNBZ0lDOHZYSEpjYmlBZ0lDQXZMeUIwYUdsekxtRnVaMnhsSUNzOUlIUm9hWE11Ylc5MlpVRnVaMnhsSUNvZ1RXRjBhQzVRU1NBdklERTRNRHRjY2x4dUlDQWdJQzh2SUhSb2FYTXVlQ0FyUFNCMGFHbHpMbk53WldWa0lDb2dUV0YwYUM1emFXNG9kR2hwY3k1aGJtZHNaU2s3WEhKY2JpQWdJQ0F2THlCMGFHbHpMbmtnTFQwZ2RHaHBjeTV6Y0dWbFpDQXFJRTFoZEdndVkyOXpLSFJvYVhNdVlXNW5iR1VwTzF4eVhHNWNjbHh1SUNBZ0lDOHZJR2xtSUNodmNIUnBiMjV6TG01bGQxZ3BJSHRjY2x4dUlDQWdJQzh2SUNBZ2RHaHBjeTU0SUQwZ2IzQjBhVzl1Y3k1dVpYZFlPMXh5WEc0Z0lDQWdMeThnSUNCMGFHbHpMbmtnUFNCdmNIUnBiMjV6TG01bGQxazdYSEpjYmlBZ0lDQXZMeUI5SUdWc2MyVWdlMXh5WEc0Z0lDQWdMeThnSUNCMGFHbHpMbmdnS3owZ2RHaHBjeTU0TVR0Y2NseHVJQ0FnSUM4dklDQWdkR2hwY3k1NUlDczlJSFJvYVhNdWVURTdYSEpjYmlBZ0lDQXZMeUI5WEhKY2JseHlYRzVjY2x4dUlDQWdJR2xtSUNoMGFHbHpMbmdnUGlCR1NVVk1SRjlYU1VSVVNDa2dlMXh5WEc0Z0lDQWdJQ0IwYUdsekxuZ2dQU0F3TzF4eVhHNGdJQ0FnZlNCbGJITmxJR2xtSUNoMGFHbHpMbmdnUENBd0tTQjdYSEpjYmlBZ0lDQWdJSFJvYVhNdWVDQTlJRVpKUlV4RVgxZEpSRlJJTzF4eVhHNGdJQ0FnZlZ4eVhHNGdJQ0FnYVdZZ0tIUm9hWE11ZVNBK0lFWkpSVXhFWDBoRlNVZElWQ2tnZTF4eVhHNGdJQ0FnSUNCMGFHbHpMbmtnUFNBd08xeHlYRzRnSUNBZ2ZTQmxiSE5sSUdsbUlDaDBhR2x6TG5rZ1BDQXdLU0I3WEhKY2JpQWdJQ0FnSUhSb2FYTXVlU0E5SUVaSlJVeEVYMGhGU1VkSVZEdGNjbHh1SUNBZ0lIMWNjbHh1SUNBZ0lISmxkSFZ5YmlCMGFHbHpPMXh5WEc0Z0lIMWNjbHh1ZlZ4eVhHNWNjbHh1Wlhod2IzSjBJR1JsWm1GMWJIUWdRbTl1ZFhNN1hISmNiaUpkZlE9PVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9jb21wb25lbnRzXFxcXEJvbnVzLmpzXCIsXCIvY29tcG9uZW50c1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEZJRUxEX1dJRFRIID0gd2luZG93LmlubmVyV2lkdGggKiAwLjg7XG52YXIgRklFTERfSEVJR0hUID0gNjAwO1xuXG52YXIgRW5lbXkgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEVuZW15KGN0eCwgd2lkdGgsIGhlaWdodCwgY29sb3IsIHgsIHkpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRW5lbXkpO1xuXG4gICAgdGhpcy5jdHggPSBjdHg7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcblxuICAgIHRoaXMuc3BlZWQgPSAwO1xuICAgIHRoaXMuYW5nbGUgPSAwO1xuICAgIHRoaXMubW92ZUFuZ2xlID0gMDtcblxuICAgIHRoaXMuaW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYW5pbWFsLWNyYWInKTtcblxuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcblxuICAgIHRoaXMueDEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1KTtcbiAgICB0aGlzLnkxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNSk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoRW5lbXksIFt7XG4gICAga2V5OiAndXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlKGN0eCkge1xuICAgICAgLy8gY3R4LnNhdmUoKTtcbiAgICAgIC8vIGN0eC50cmFuc2xhdGUodGhpcy54LCB0aGlzLnkpO1xuICAgICAgLy8gY3R4LnJvdGF0ZSh0aGlzLmFuZ2xlKTtcbiAgICAgIC8vIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgLy8gY3R4LmZpbGxSZWN0KHRoaXMud2lkdGggLyAtMiwgdGhpcy5oZWlnaHQgLyAtMiwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgLy8gY3R4LnJlc3RvcmUoKTtcblxuICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnbmV3UG9zJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbmV3UG9zKG9wdGlvbnMpIHtcbiAgICAgIC8vIHRoaXMubW92ZUFuZ2xlID0gMDtcbiAgICAgIC8vIHRoaXMuc3BlZWQgPSAwO1xuICAgICAgLy8gb3B0aW9ucy5sZWZ0ICYmICh0aGlzLm1vdmVBbmdsZSA9IC01KTtcbiAgICAgIC8vIG9wdGlvbnMucmlnaHQgJiYgKHRoaXMubW92ZUFuZ2xlID0gNSk7XG4gICAgICAvLyBvcHRpb25zLnVwICYmICh0aGlzLnNwZWVkID0gNSk7XG4gICAgICAvLyBvcHRpb25zLmRvd24gJiYgKHRoaXMuc3BlZWQgPSAtNSk7XG4gICAgICAvL1xuICAgICAgLy8gdGhpcy5hbmdsZSArPSB0aGlzLm1vdmVBbmdsZSAqIE1hdGguUEkgLyAxODA7XG4gICAgICAvLyB0aGlzLnggKz0gdGhpcy5zcGVlZCAqIE1hdGguc2luKHRoaXMuYW5nbGUpO1xuICAgICAgLy8gdGhpcy55IC09IHRoaXMuc3BlZWQgKiBNYXRoLmNvcyh0aGlzLmFuZ2xlKTtcblxuICAgICAgdGhpcy54ICs9IHRoaXMueDE7XG4gICAgICB0aGlzLnkgKz0gdGhpcy55MTtcblxuICAgICAgaWYgKHRoaXMueCA+IEZJRUxEX1dJRFRIKSB7XG4gICAgICAgIHRoaXMueCA9IDA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMueCA8IDApIHtcbiAgICAgICAgdGhpcy54ID0gRklFTERfV0lEVEg7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy55ID4gRklFTERfSEVJR0hUKSB7XG4gICAgICAgIHRoaXMueSA9IDA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMueSA8IDApIHtcbiAgICAgICAgdGhpcy55ID0gRklFTERfSEVJR0hUO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEVuZW15O1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBFbmVteTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklrVnVaVzE1TG1weklsMHNJbTVoYldWeklqcGJJa1pKUlV4RVgxZEpSRlJJSWl3aWQybHVaRzkzSWl3aWFXNXVaWEpYYVdSMGFDSXNJa1pKUlV4RVgwaEZTVWRJVkNJc0lrVnVaVzE1SWl3aVkzUjRJaXdpZDJsa2RHZ2lMQ0pvWldsbmFIUWlMQ0pqYjJ4dmNpSXNJbmdpTENKNUlpd2ljM0JsWldRaUxDSmhibWRzWlNJc0ltMXZkbVZCYm1kc1pTSXNJbWx0WVdkbElpd2laRzlqZFcxbGJuUWlMQ0p4ZFdWeWVWTmxiR1ZqZEc5eUlpd2llREVpTENKTllYUm9JaXdpWm14dmIzSWlMQ0p5WVc1a2IyMGlMQ0o1TVNJc0ltUnlZWGRKYldGblpTSXNJbTl3ZEdsdmJuTWlYU3dpYldGd2NHbHVaM01pT2lJN096czdPenM3T3pzN1FVRkJRU3hKUVVGSlFTeGpRVUZqUXl4UFFVRlBReXhWUVVGUUxFZEJRVzlDTEVkQlFYUkRPMEZCUTBFc1NVRkJTVU1zWlVGQlpTeEhRVUZ1UWpzN1NVRkZUVU1zU3p0QlFVTktMR2xDUVVGWlF5eEhRVUZhTEVWQlFXbENReXhMUVVGcVFpeEZRVUYzUWtNc1RVRkJlRUlzUlVGQlowTkRMRXRCUVdoRExFVkJRWFZEUXl4RFFVRjJReXhGUVVFd1EwTXNRMEZCTVVNc1JVRkJOa003UVVGQlFUczdRVUZETTBNc1UwRkJTMHdzUjBGQlRDeEhRVUZYUVN4SFFVRllPMEZCUTBFc1UwRkJTME1zUzBGQlRDeEhRVUZoUVN4TFFVRmlPMEZCUTBFc1UwRkJTME1zVFVGQlRDeEhRVUZqUVN4TlFVRmtPMEZCUTBFc1UwRkJTME1zUzBGQlRDeEhRVUZoUVN4TFFVRmlPenRCUVVWQkxGTkJRVXRITEV0QlFVd3NSMEZCWVN4RFFVRmlPMEZCUTBFc1UwRkJTME1zUzBGQlRDeEhRVUZoTEVOQlFXSTdRVUZEUVN4VFFVRkxReXhUUVVGTUxFZEJRV2xDTEVOQlFXcENPenRCUVVWQkxGTkJRVXRETEV0QlFVd3NSMEZCWVVNc1UwRkJVME1zWVVGQlZDeERRVUYxUWl4alFVRjJRaXhEUVVGaU96dEJRVVZCTEZOQlFVdFFMRU5CUVV3c1IwRkJVMEVzUTBGQlZEdEJRVU5CTEZOQlFVdERMRU5CUVV3c1IwRkJVMEVzUTBGQlZEczdRVUZGUVN4VFFVRkxUeXhGUVVGTUxFZEJRVlZETEV0QlFVdERMRXRCUVV3c1EwRkJWMFFzUzBGQlMwVXNUVUZCVEN4TFFVRm5RaXhEUVVFelFpeERRVUZXTzBGQlEwRXNVMEZCUzBNc1JVRkJUQ3hIUVVGVlNDeExRVUZMUXl4TFFVRk1MRU5CUVZkRUxFdEJRVXRGTEUxQlFVd3NTMEZCWjBJc1EwRkJNMElzUTBGQlZqdEJRVU5FT3pzN096SkNRVVZOWml4SExFVkJRVXM3UVVGRFZqdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUZCTEZWQlFVbHBRaXhUUVVGS0xFTkJRV01zUzBGQlMxSXNTMEZCYmtJc1JVRkJNRUlzUzBGQlMwd3NRMEZCTDBJc1JVRkJhME1zUzBGQlMwTXNRMEZCZGtNc1JVRkJNRU1zUzBGQlMwb3NTMEZCTDBNc1JVRkJjMFFzUzBGQlMwTXNUVUZCTTBRN1FVRkRRU3hoUVVGUExFbEJRVkE3UVVGRFJEczdPekpDUVVWTlowSXNUeXhGUVVGVE8wRkJRMlE3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRXNWMEZCUzJRc1EwRkJUQ3hKUVVGVkxFdEJRVXRSTEVWQlFXWTdRVUZEUVN4WFFVRkxVQ3hEUVVGTUxFbEJRVlVzUzBGQlMxY3NSVUZCWmpzN1FVRkZRU3hWUVVGSkxFdEJRVXRhTEVOQlFVd3NSMEZCVTFRc1YwRkJZaXhGUVVFd1FqdEJRVU40UWl4aFFVRkxVeXhEUVVGTUxFZEJRVk1zUTBGQlZEdEJRVU5FTEU5QlJrUXNUVUZGVHl4SlFVRkpMRXRCUVV0QkxFTkJRVXdzUjBGQlV5eERRVUZpTEVWQlFXZENPMEZCUTNKQ0xHRkJRVXRCTEVOQlFVd3NSMEZCVTFRc1YwRkJWRHRCUVVORU8wRkJRMFFzVlVGQlNTeExRVUZMVlN4RFFVRk1MRWRCUVZOUUxGbEJRV0lzUlVGQk1rSTdRVUZEZWtJc1lVRkJTMDhzUTBGQlRDeEhRVUZUTEVOQlFWUTdRVUZEUkN4UFFVWkVMRTFCUlU4c1NVRkJTU3hMUVVGTFFTeERRVUZNTEVkQlFWTXNRMEZCWWl4RlFVRm5RanRCUVVOeVFpeGhRVUZMUVN4RFFVRk1MRWRCUVZOUUxGbEJRVlE3UVVGRFJEdEJRVU5FTEdGQlFVOHNTVUZCVUR0QlFVTkVPenM3T3pzN2EwSkJSMWxETEVzaUxDSm1hV3hsSWpvaVJXNWxiWGt1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SjJZWElnUmtsRlRFUmZWMGxFVkVnZ1BTQjNhVzVrYjNjdWFXNXVaWEpYYVdSMGFDQXFJREF1T0R0Y2NseHVkbUZ5SUVaSlJVeEVYMGhGU1VkSVZDQTlJRFl3TUR0Y2NseHVYSEpjYm1Oc1lYTnpJRVZ1WlcxNUlIdGNjbHh1SUNCamIyNXpkSEoxWTNSdmNpaGpkSGdzSUhkcFpIUm9MQ0JvWldsbmFIUXNJR052Ykc5eUxDQjRMQ0I1S1NCN1hISmNiaUFnSUNCMGFHbHpMbU4wZUNBOUlHTjBlRHRjY2x4dUlDQWdJSFJvYVhNdWQybGtkR2dnUFNCM2FXUjBhRHRjY2x4dUlDQWdJSFJvYVhNdWFHVnBaMmgwSUQwZ2FHVnBaMmgwTzF4eVhHNGdJQ0FnZEdocGN5NWpiMnh2Y2lBOUlHTnZiRzl5TzF4eVhHNWNjbHh1SUNBZ0lIUm9hWE11YzNCbFpXUWdQU0F3TzF4eVhHNGdJQ0FnZEdocGN5NWhibWRzWlNBOUlEQTdYSEpjYmlBZ0lDQjBhR2x6TG0xdmRtVkJibWRzWlNBOUlEQTdYSEpjYmx4eVhHNGdJQ0FnZEdocGN5NXBiV0ZuWlNBOUlHUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvSnk1aGJtbHRZV3d0WTNKaFlpY3BPMXh5WEc1Y2NseHVJQ0FnSUhSb2FYTXVlQ0E5SUhnN1hISmNiaUFnSUNCMGFHbHpMbmtnUFNCNU8xeHlYRzVjY2x4dUlDQWdJSFJvYVhNdWVERWdQU0JOWVhSb0xtWnNiMjl5S0UxaGRHZ3VjbUZ1Wkc5dEtDa2dLaUExS1R0Y2NseHVJQ0FnSUhSb2FYTXVlVEVnUFNCTllYUm9MbVpzYjI5eUtFMWhkR2d1Y21GdVpHOXRLQ2tnS2lBMUtUdGNjbHh1SUNCOVhISmNibHh5WEc0Z0lIVndaR0YwWlNoamRIZ3BJSHRjY2x4dUlDQWdJQzh2SUdOMGVDNXpZWFpsS0NrN1hISmNiaUFnSUNBdkx5QmpkSGd1ZEhKaGJuTnNZWFJsS0hSb2FYTXVlQ3dnZEdocGN5NTVLVHRjY2x4dUlDQWdJQzh2SUdOMGVDNXliM1JoZEdVb2RHaHBjeTVoYm1kc1pTazdYSEpjYmlBZ0lDQXZMeUJqZEhndVptbHNiRk4wZVd4bElEMGdkR2hwY3k1amIyeHZjanRjY2x4dUlDQWdJQzh2SUdOMGVDNW1hV3hzVW1WamRDaDBhR2x6TG5kcFpIUm9JQzhnTFRJc0lIUm9hWE11YUdWcFoyaDBJQzhnTFRJc0lIUm9hWE11ZDJsa2RHZ3NJSFJvYVhNdWFHVnBaMmgwS1R0Y2NseHVJQ0FnSUM4dklHTjBlQzV5WlhOMGIzSmxLQ2s3WEhKY2JseHlYRzRnSUNBZ1kzUjRMbVJ5WVhkSmJXRm5aU2gwYUdsekxtbHRZV2RsTENCMGFHbHpMbmdzSUhSb2FYTXVlU3dnZEdocGN5NTNhV1IwYUN3Z2RHaHBjeTVvWldsbmFIUXBPMXh5WEc0Z0lDQWdjbVYwZFhKdUlIUm9hWE03WEhKY2JpQWdmVnh5WEc1Y2NseHVJQ0J1WlhkUWIzTW9iM0IwYVc5dWN5a2dlMXh5WEc0Z0lDQWdMeThnZEdocGN5NXRiM1psUVc1bmJHVWdQU0F3TzF4eVhHNGdJQ0FnTHk4Z2RHaHBjeTV6Y0dWbFpDQTlJREE3WEhKY2JpQWdJQ0F2THlCdmNIUnBiMjV6TG14bFpuUWdKaVlnS0hSb2FYTXViVzkyWlVGdVoyeGxJRDBnTFRVcE8xeHlYRzRnSUNBZ0x5OGdiM0IwYVc5dWN5NXlhV2RvZENBbUppQW9kR2hwY3k1dGIzWmxRVzVuYkdVZ1BTQTFLVHRjY2x4dUlDQWdJQzh2SUc5d2RHbHZibk11ZFhBZ0ppWWdLSFJvYVhNdWMzQmxaV1FnUFNBMUtUdGNjbHh1SUNBZ0lDOHZJRzl3ZEdsdmJuTXVaRzkzYmlBbUppQW9kR2hwY3k1emNHVmxaQ0E5SUMwMUtUdGNjbHh1SUNBZ0lDOHZYSEpjYmlBZ0lDQXZMeUIwYUdsekxtRnVaMnhsSUNzOUlIUm9hWE11Ylc5MlpVRnVaMnhsSUNvZ1RXRjBhQzVRU1NBdklERTRNRHRjY2x4dUlDQWdJQzh2SUhSb2FYTXVlQ0FyUFNCMGFHbHpMbk53WldWa0lDb2dUV0YwYUM1emFXNG9kR2hwY3k1aGJtZHNaU2s3WEhKY2JpQWdJQ0F2THlCMGFHbHpMbmtnTFQwZ2RHaHBjeTV6Y0dWbFpDQXFJRTFoZEdndVkyOXpLSFJvYVhNdVlXNW5iR1VwTzF4eVhHNWNjbHh1SUNBZ0lIUm9hWE11ZUNBclBTQjBhR2x6TG5neE8xeHlYRzRnSUNBZ2RHaHBjeTU1SUNzOUlIUm9hWE11ZVRFN1hISmNibHh5WEc0Z0lDQWdhV1lnS0hSb2FYTXVlQ0ErSUVaSlJVeEVYMWRKUkZSSUtTQjdYSEpjYmlBZ0lDQWdJSFJvYVhNdWVDQTlJREE3WEhKY2JpQWdJQ0I5SUdWc2MyVWdhV1lnS0hSb2FYTXVlQ0E4SURBcElIdGNjbHh1SUNBZ0lDQWdkR2hwY3k1NElEMGdSa2xGVEVSZlYwbEVWRWc3WEhKY2JpQWdJQ0I5WEhKY2JpQWdJQ0JwWmlBb2RHaHBjeTU1SUQ0Z1JrbEZURVJmU0VWSlIwaFVLU0I3WEhKY2JpQWdJQ0FnSUhSb2FYTXVlU0E5SURBN1hISmNiaUFnSUNCOUlHVnNjMlVnYVdZZ0tIUm9hWE11ZVNBOElEQXBJSHRjY2x4dUlDQWdJQ0FnZEdocGN5NTVJRDBnUmtsRlRFUmZTRVZKUjBoVU8xeHlYRzRnSUNBZ2ZWeHlYRzRnSUNBZ2NtVjBkWEp1SUhSb2FYTTdYSEpjYmlBZ2ZWeHlYRzU5WEhKY2JseHlYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQkZibVZ0ZVR0Y2NseHVJbDE5XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL2NvbXBvbmVudHNcXFxcRW5lbXkuanNcIixcIi9jb21wb25lbnRzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgRklFTERfV0lEVEggPSB3aW5kb3cuaW5uZXJXaWR0aCAqIDAuODtcbnZhciBGSUVMRF9IRUlHSFQgPSA2MDA7XG5cbnZhciBFbmVteTIgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEVuZW15MihjdHgsIHdpZHRoLCBoZWlnaHQsIGNvbG9yLCB4LCB5KSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEVuZW15Mik7XG5cbiAgICB0aGlzLmN0eCA9IGN0eDtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xuXG4gICAgdGhpcy5zcGVlZCA9IDA7XG4gICAgdGhpcy5hbmdsZSA9IDA7XG4gICAgdGhpcy5tb3ZlQW5nbGUgPSAwO1xuXG4gICAgdGhpcy5hbmdyeSA9IGZhbHNlO1xuXG4gICAgdGhpcy5pbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbmltYWwtd2FzcCcpO1xuXG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuXG4gICAgdGhpcy54MSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUpO1xuICAgIHRoaXMueTEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1KTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhFbmVteTIsIFt7XG4gICAga2V5OiAndXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlKGN0eCkge1xuICAgICAgLy8gY3R4LnNhdmUoKTtcbiAgICAgIC8vIGN0eC50cmFuc2xhdGUodGhpcy54LCB0aGlzLnkpO1xuICAgICAgLy8gY3R4LnJvdGF0ZSh0aGlzLmFuZ2xlKTtcbiAgICAgIC8vIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xuICAgICAgLy8gY3R4LmZpbGxSZWN0KHRoaXMud2lkdGggLyAtMiwgdGhpcy5oZWlnaHQgLyAtMiwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgLy8gY3R4LnJlc3RvcmUoKTtcblxuICAgICAgaWYgKHRoaXMuYW5ncnkpIHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYW5pbWFsLXdhc3AtMicpLCB0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICduZXdQb3MnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBuZXdQb3Mob3B0aW9ucykge1xuICAgICAgLy8gdGhpcy5tb3ZlQW5nbGUgPSAwO1xuICAgICAgLy8gdGhpcy5zcGVlZCA9IDA7XG4gICAgICAvLyBvcHRpb25zLmxlZnQgJiYgKHRoaXMubW92ZUFuZ2xlID0gLTUpO1xuICAgICAgLy8gb3B0aW9ucy5yaWdodCAmJiAodGhpcy5tb3ZlQW5nbGUgPSA1KTtcbiAgICAgIC8vIG9wdGlvbnMudXAgJiYgKHRoaXMuc3BlZWQgPSA1KTtcbiAgICAgIC8vIG9wdGlvbnMuZG93biAmJiAodGhpcy5zcGVlZCA9IC01KTtcbiAgICAgIC8vXG4gICAgICAvLyB0aGlzLmFuZ2xlICs9IHRoaXMubW92ZUFuZ2xlICogTWF0aC5QSSAvIDE4MDtcbiAgICAgIC8vIHRoaXMueCArPSB0aGlzLnNwZWVkICogTWF0aC5zaW4odGhpcy5hbmdsZSk7XG4gICAgICAvLyB0aGlzLnkgLT0gdGhpcy5zcGVlZCAqIE1hdGguY29zKHRoaXMuYW5nbGUpO1xuXG4gICAgICBpZiAob3B0aW9ucy5uZXdYKSB7XG4gICAgICAgIHRoaXMueCA9IG9wdGlvbnMubmV3WDtcbiAgICAgICAgdGhpcy55ID0gb3B0aW9ucy5uZXdZO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMueDE7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnkxO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy54ID4gRklFTERfV0lEVEgpIHtcbiAgICAgICAgdGhpcy54ID0gMDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy54IDwgMCkge1xuICAgICAgICB0aGlzLnggPSBGSUVMRF9XSURUSDtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnkgPiBGSUVMRF9IRUlHSFQpIHtcbiAgICAgICAgdGhpcy55ID0gMDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy55IDwgMCkge1xuICAgICAgICB0aGlzLnkgPSBGSUVMRF9IRUlHSFQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRW5lbXkyO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBFbmVteTI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJa1Z1WlcxNU1pNXFjeUpkTENKdVlXMWxjeUk2V3lKR1NVVk1SRjlYU1VSVVNDSXNJbmRwYm1SdmR5SXNJbWx1Ym1WeVYybGtkR2dpTENKR1NVVk1SRjlJUlVsSFNGUWlMQ0pGYm1WdGVUSWlMQ0pqZEhnaUxDSjNhV1IwYUNJc0ltaGxhV2RvZENJc0ltTnZiRzl5SWl3aWVDSXNJbmtpTENKemNHVmxaQ0lzSW1GdVoyeGxJaXdpYlc5MlpVRnVaMnhsSWl3aVlXNW5jbmtpTENKcGJXRm5aU0lzSW1SdlkzVnRaVzUwSWl3aWNYVmxjbmxUWld4bFkzUnZjaUlzSW5neElpd2lUV0YwYUNJc0ltWnNiMjl5SWl3aWNtRnVaRzl0SWl3aWVURWlMQ0prY21GM1NXMWhaMlVpTENKdmNIUnBiMjV6SWl3aWJtVjNXQ0lzSW01bGQxa2lYU3dpYldGd2NHbHVaM01pT2lJN096czdPenM3T3pzN1FVRkJRU3hKUVVGSlFTeGpRVUZqUXl4UFFVRlBReXhWUVVGUUxFZEJRVzlDTEVkQlFYUkRPMEZCUTBFc1NVRkJTVU1zWlVGQlpTeEhRVUZ1UWpzN1NVRkZUVU1zVFR0QlFVTktMR3RDUVVGWlF5eEhRVUZhTEVWQlFXbENReXhMUVVGcVFpeEZRVUYzUWtNc1RVRkJlRUlzUlVGQlowTkRMRXRCUVdoRExFVkJRWFZEUXl4RFFVRjJReXhGUVVFd1EwTXNRMEZCTVVNc1JVRkJOa003UVVGQlFUczdRVUZETTBNc1UwRkJTMHdzUjBGQlRDeEhRVUZYUVN4SFFVRllPMEZCUTBFc1UwRkJTME1zUzBGQlRDeEhRVUZoUVN4TFFVRmlPMEZCUTBFc1UwRkJTME1zVFVGQlRDeEhRVUZqUVN4TlFVRmtPMEZCUTBFc1UwRkJTME1zUzBGQlRDeEhRVUZoUVN4TFFVRmlPenRCUVVWQkxGTkJRVXRITEV0QlFVd3NSMEZCWVN4RFFVRmlPMEZCUTBFc1UwRkJTME1zUzBGQlRDeEhRVUZoTEVOQlFXSTdRVUZEUVN4VFFVRkxReXhUUVVGTUxFZEJRV2xDTEVOQlFXcENPenRCUVVWQkxGTkJRVXRETEV0QlFVd3NSMEZCWVN4TFFVRmlPenRCUVVWQkxGTkJRVXRETEV0QlFVd3NSMEZCWVVNc1UwRkJVME1zWVVGQlZDeERRVUYxUWl4alFVRjJRaXhEUVVGaU96dEJRVVZCTEZOQlFVdFNMRU5CUVV3c1IwRkJVMEVzUTBGQlZEdEJRVU5CTEZOQlFVdERMRU5CUVV3c1IwRkJVMEVzUTBGQlZEczdRVUZGUVN4VFFVRkxVU3hGUVVGTUxFZEJRVlZETEV0QlFVdERMRXRCUVV3c1EwRkJWMFFzUzBGQlMwVXNUVUZCVEN4TFFVRm5RaXhEUVVFelFpeERRVUZXTzBGQlEwRXNVMEZCUzBNc1JVRkJUQ3hIUVVGVlNDeExRVUZMUXl4TFFVRk1MRU5CUVZkRUxFdEJRVXRGTEUxQlFVd3NTMEZCWjBJc1EwRkJNMElzUTBGQlZqdEJRVU5FT3pzN096SkNRVVZOYUVJc1J5eEZRVUZMTzBGQlExWTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRVVZCTEZWQlFVa3NTMEZCUzFNc1MwRkJWQ3hGUVVGblFqdEJRVU5rVkN4WlFVRkphMElzVTBGQlNpeERRVUZqVUN4VFFVRlRReXhoUVVGVUxFTkJRWFZDTEdkQ1FVRjJRaXhEUVVGa0xFVkJRWGRFTEV0QlFVdFNMRU5CUVRkRUxFVkJRV2RGTEV0QlFVdERMRU5CUVhKRkxFVkJRWGRGTEV0QlFVdEtMRXRCUVRkRkxFVkJRVzlHTEV0QlFVdERMRTFCUVhwR08wRkJSVVFzVDBGSVJDeE5RVWRQTzBGQlEweEdMRmxCUVVsclFpeFRRVUZLTEVOQlFXTXNTMEZCUzFJc1MwRkJia0lzUlVGQk1FSXNTMEZCUzA0c1EwRkJMMElzUlVGQmEwTXNTMEZCUzBNc1EwRkJka01zUlVGQk1FTXNTMEZCUzBvc1MwRkJMME1zUlVGQmMwUXNTMEZCUzBNc1RVRkJNMFE3UVVGRlJEczdRVUZIUkN4aFFVRlBMRWxCUVZBN1FVRkRSRHM3T3pKQ1FVVk5hVUlzVHl4RlFVRlRPMEZCUTJRN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUVzVlVGQlNVRXNVVUZCVVVNc1NVRkJXaXhGUVVGclFqdEJRVU5vUWl4aFFVRkxhRUlzUTBGQlRDeEhRVUZUWlN4UlFVRlJReXhKUVVGcVFqdEJRVU5CTEdGQlFVdG1MRU5CUVV3c1IwRkJVMk1zVVVGQlVVVXNTVUZCYWtJN1FVRkRSQ3hQUVVoRUxFMUJSMDg3UVVGRFRDeGhRVUZMYWtJc1EwRkJUQ3hKUVVGVkxFdEJRVXRUTEVWQlFXWTdRVUZEUVN4aFFVRkxVaXhEUVVGTUxFbEJRVlVzUzBGQlMxa3NSVUZCWmp0QlFVTkVPenRCUVVkRUxGVkJRVWtzUzBGQlMySXNRMEZCVEN4SFFVRlRWQ3hYUVVGaUxFVkJRVEJDTzBGQlEzaENMR0ZCUVV0VExFTkJRVXdzUjBGQlV5eERRVUZVTzBGQlEwUXNUMEZHUkN4TlFVVlBMRWxCUVVrc1MwRkJTMEVzUTBGQlRDeEhRVUZUTEVOQlFXSXNSVUZCWjBJN1FVRkRja0lzWVVGQlMwRXNRMEZCVEN4SFFVRlRWQ3hYUVVGVU8wRkJRMFE3UVVGRFJDeFZRVUZKTEV0QlFVdFZMRU5CUVV3c1IwRkJVMUFzV1VGQllpeEZRVUV5UWp0QlFVTjZRaXhoUVVGTFR5eERRVUZNTEVkQlFWTXNRMEZCVkR0QlFVTkVMRTlCUmtRc1RVRkZUeXhKUVVGSkxFdEJRVXRCTEVOQlFVd3NSMEZCVXl4RFFVRmlMRVZCUVdkQ08wRkJRM0pDTEdGQlFVdEJMRU5CUVV3c1IwRkJVMUFzV1VGQlZEdEJRVU5FTzBGQlEwUXNZVUZCVHl4SlFVRlFPMEZCUTBRN096czdPenRyUWtGSFdVTXNUU0lzSW1acGJHVWlPaUpGYm1WdGVUSXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lKMllYSWdSa2xGVEVSZlYwbEVWRWdnUFNCM2FXNWtiM2N1YVc1dVpYSlhhV1IwYUNBcUlEQXVPRHRjY2x4dWRtRnlJRVpKUlV4RVgwaEZTVWRJVkNBOUlEWXdNRHRjY2x4dVhISmNibU5zWVhOeklFVnVaVzE1TWlCN1hISmNiaUFnWTI5dWMzUnlkV04wYjNJb1kzUjRMQ0IzYVdSMGFDd2dhR1ZwWjJoMExDQmpiMnh2Y2l3Z2VDd2dlU2tnZTF4eVhHNGdJQ0FnZEdocGN5NWpkSGdnUFNCamRIZzdYSEpjYmlBZ0lDQjBhR2x6TG5kcFpIUm9JRDBnZDJsa2RHZzdYSEpjYmlBZ0lDQjBhR2x6TG1obGFXZG9kQ0E5SUdobGFXZG9kRHRjY2x4dUlDQWdJSFJvYVhNdVkyOXNiM0lnUFNCamIyeHZjanRjY2x4dVhISmNiaUFnSUNCMGFHbHpMbk53WldWa0lEMGdNRHRjY2x4dUlDQWdJSFJvYVhNdVlXNW5iR1VnUFNBd08xeHlYRzRnSUNBZ2RHaHBjeTV0YjNabFFXNW5iR1VnUFNBd08xeHlYRzVjY2x4dUlDQWdJSFJvYVhNdVlXNW5jbmtnUFNCbVlXeHpaVHRjY2x4dVhISmNiaUFnSUNCMGFHbHpMbWx0WVdkbElEMGdaRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2lnbkxtRnVhVzFoYkMxM1lYTndKeWs3WEhKY2JseHlYRzRnSUNBZ2RHaHBjeTU0SUQwZ2VEdGNjbHh1SUNBZ0lIUm9hWE11ZVNBOUlIazdYSEpjYmx4eVhHNGdJQ0FnZEdocGN5NTRNU0E5SUUxaGRHZ3VabXh2YjNJb1RXRjBhQzV5WVc1a2IyMG9LU0FxSURVcE8xeHlYRzRnSUNBZ2RHaHBjeTU1TVNBOUlFMWhkR2d1Wm14dmIzSW9UV0YwYUM1eVlXNWtiMjBvS1NBcUlEVXBPMXh5WEc0Z0lIMWNjbHh1WEhKY2JpQWdkWEJrWVhSbEtHTjBlQ2tnZTF4eVhHNGdJQ0FnTHk4Z1kzUjRMbk5oZG1Vb0tUdGNjbHh1SUNBZ0lDOHZJR04wZUM1MGNtRnVjMnhoZEdVb2RHaHBjeTU0TENCMGFHbHpMbmtwTzF4eVhHNGdJQ0FnTHk4Z1kzUjRMbkp2ZEdGMFpTaDBhR2x6TG1GdVoyeGxLVHRjY2x4dUlDQWdJQzh2SUdOMGVDNW1hV3hzVTNSNWJHVWdQU0IwYUdsekxtTnZiRzl5TzF4eVhHNGdJQ0FnTHk4Z1kzUjRMbVpwYkd4U1pXTjBLSFJvYVhNdWQybGtkR2dnTHlBdE1pd2dkR2hwY3k1b1pXbG5hSFFnTHlBdE1pd2dkR2hwY3k1M2FXUjBhQ3dnZEdocGN5NW9aV2xuYUhRcE8xeHlYRzRnSUNBZ0x5OGdZM1I0TG5KbGMzUnZjbVVvS1R0Y2NseHVYSEpjYmlBZ0lDQnBaaUFvZEdocGN5NWhibWR5ZVNrZ2UxeHlYRzRnSUNBZ0lDQmpkSGd1WkhKaGQwbHRZV2RsS0dSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9KeTVoYm1sdFlXd3RkMkZ6Y0MweUp5a3NJSFJvYVhNdWVDd2dkR2hwY3k1NUxDQjBhR2x6TG5kcFpIUm9MQ0IwYUdsekxtaGxhV2RvZENrN1hISmNibHh5WEc0Z0lDQWdmU0JsYkhObElIdGNjbHh1SUNBZ0lDQWdZM1I0TG1SeVlYZEpiV0ZuWlNoMGFHbHpMbWx0WVdkbExDQjBhR2x6TG5nc0lIUm9hWE11ZVN3Z2RHaHBjeTUzYVdSMGFDd2dkR2hwY3k1b1pXbG5hSFFwTzF4eVhHNWNjbHh1SUNBZ0lIMWNjbHh1WEhKY2JseHlYRzRnSUNBZ2NtVjBkWEp1SUhSb2FYTTdYSEpjYmlBZ2ZWeHlYRzVjY2x4dUlDQnVaWGRRYjNNb2IzQjBhVzl1Y3lrZ2UxeHlYRzRnSUNBZ0x5OGdkR2hwY3k1dGIzWmxRVzVuYkdVZ1BTQXdPMXh5WEc0Z0lDQWdMeThnZEdocGN5NXpjR1ZsWkNBOUlEQTdYSEpjYmlBZ0lDQXZMeUJ2Y0hScGIyNXpMbXhsWm5RZ0ppWWdLSFJvYVhNdWJXOTJaVUZ1WjJ4bElEMGdMVFVwTzF4eVhHNGdJQ0FnTHk4Z2IzQjBhVzl1Y3k1eWFXZG9kQ0FtSmlBb2RHaHBjeTV0YjNabFFXNW5iR1VnUFNBMUtUdGNjbHh1SUNBZ0lDOHZJRzl3ZEdsdmJuTXVkWEFnSmlZZ0tIUm9hWE11YzNCbFpXUWdQU0ExS1R0Y2NseHVJQ0FnSUM4dklHOXdkR2x2Ym5NdVpHOTNiaUFtSmlBb2RHaHBjeTV6Y0dWbFpDQTlJQzAxS1R0Y2NseHVJQ0FnSUM4dlhISmNiaUFnSUNBdkx5QjBhR2x6TG1GdVoyeGxJQ3M5SUhSb2FYTXViVzkyWlVGdVoyeGxJQ29nVFdGMGFDNVFTU0F2SURFNE1EdGNjbHh1SUNBZ0lDOHZJSFJvYVhNdWVDQXJQU0IwYUdsekxuTndaV1ZrSUNvZ1RXRjBhQzV6YVc0b2RHaHBjeTVoYm1kc1pTazdYSEpjYmlBZ0lDQXZMeUIwYUdsekxua2dMVDBnZEdocGN5NXpjR1ZsWkNBcUlFMWhkR2d1WTI5ektIUm9hWE11WVc1bmJHVXBPMXh5WEc1Y2NseHVJQ0FnSUdsbUlDaHZjSFJwYjI1ekxtNWxkMWdwSUh0Y2NseHVJQ0FnSUNBZ2RHaHBjeTU0SUQwZ2IzQjBhVzl1Y3k1dVpYZFlPMXh5WEc0Z0lDQWdJQ0IwYUdsekxua2dQU0J2Y0hScGIyNXpMbTVsZDFrN1hISmNiaUFnSUNCOUlHVnNjMlVnZTF4eVhHNGdJQ0FnSUNCMGFHbHpMbmdnS3owZ2RHaHBjeTU0TVR0Y2NseHVJQ0FnSUNBZ2RHaHBjeTU1SUNzOUlIUm9hWE11ZVRFN1hISmNiaUFnSUNCOVhISmNibHh5WEc1Y2NseHVJQ0FnSUdsbUlDaDBhR2x6TG5nZ1BpQkdTVVZNUkY5WFNVUlVTQ2tnZTF4eVhHNGdJQ0FnSUNCMGFHbHpMbmdnUFNBd08xeHlYRzRnSUNBZ2ZTQmxiSE5sSUdsbUlDaDBhR2x6TG5nZ1BDQXdLU0I3WEhKY2JpQWdJQ0FnSUhSb2FYTXVlQ0E5SUVaSlJVeEVYMWRKUkZSSU8xeHlYRzRnSUNBZ2ZWeHlYRzRnSUNBZ2FXWWdLSFJvYVhNdWVTQStJRVpKUlV4RVgwaEZTVWRJVkNrZ2UxeHlYRzRnSUNBZ0lDQjBhR2x6TG5rZ1BTQXdPMXh5WEc0Z0lDQWdmU0JsYkhObElHbG1JQ2gwYUdsekxua2dQQ0F3S1NCN1hISmNiaUFnSUNBZ0lIUm9hWE11ZVNBOUlFWkpSVXhFWDBoRlNVZElWRHRjY2x4dUlDQWdJSDFjY2x4dUlDQWdJSEpsZEhWeWJpQjBhR2x6TzF4eVhHNGdJSDFjY2x4dWZWeHlYRzVjY2x4dVpYaHdiM0owSUdSbFptRjFiSFFnUlc1bGJYa3lPMXh5WEc0aVhYMD1cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvY29tcG9uZW50c1xcXFxFbmVteTIuanNcIixcIi9jb21wb25lbnRzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgR2FtZUZpZWxkID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBHYW1lRmllbGQoZWxlbWVudCwgd2lkdGgsIGhlaWdodCwgUGxheWVyLCBFbmVteSwgZXZlbnRCdXMsIEVuZW15MiwgQm9udXMpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEdhbWVGaWVsZCk7XG5cbiAgICB0aGlzLmNhbnZhcyA9IGVsZW1lbnQ7XG4gICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgdGhpcy5ldmVudEJ1cyA9IGV2ZW50QnVzO1xuXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuXG4gICAgdGhpcy5wZXJzb24gPSBuZXcgUGxheWVyKHRoaXMuY3R4LCA1MCwgNTAsICdvcmFuZ2UnLCA1MCwgNTAsIGV2ZW50QnVzKTtcbiAgICB0aGlzLmVuZW15ID0gW107XG4gICAgdGhpcy5lbmVteTIgPSBbXTtcbiAgICB0aGlzLmJvbnVzID0gW107XG5cbiAgICB0aGlzLmVuZW15SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5lbmVteS5wdXNoKG5ldyBFbmVteShfdGhpcy5jdHgsIDQwLCA0MCwgJ3JlZCcsIDEwLCAxMCwgZXZlbnRCdXMpKTtcbiAgICB9LCAxNTAwKTtcblxuICAgIHRoaXMuZW5lbXlJbnRlcnZhbDIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5lbmVteTIucHVzaChuZXcgRW5lbXkyKF90aGlzLmN0eCwgNTAsIDUwLCAncmdiKDEyNCwgMTAzLCAyMjcpJywgMTAsIDEwLCBldmVudEJ1cykpO1xuICAgIH0sIDI1MDApO1xuXG4gICAgdGhpcy5ib251c0ludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgX3RoaXMuYm9udXMucHVzaChuZXcgQm9udXMoX3RoaXMuY3R4LCAyNSwgMjUsICdyZ2IoMTczLCAyMjcsIDEwMyknLCBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiBfdGhpcy53aWR0aCksIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIF90aGlzLmhlaWdodCksIGV2ZW50QnVzKSk7XG4gICAgfSwgNzAwMCk7XG5cbiAgICB0aGlzLnN0YXJ0KCk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoR2FtZUZpZWxkLCBbe1xuICAgIGtleTogJ3N0YXJ0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG4gICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMud2lkdGg7XG5cbiAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcignZ2FtZTpsb2dnZXItY2xlYXInKTtcbiAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcignZ2FtZTpsb2dnZXInLCBbJ0dhbWUgc3RhcnRlZCEgR29vZCBsdWNrIDspJywgJ2dhbWUtc3RhdHVzJ10pO1xuXG4gICAgICB2YXIgbnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNSArIDEpO1xuICAgICAgdGhpcy5pbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncm91bmQtJyArIG51bSk7XG5cbiAgICAgIHRoaXMuZnJhbWVObyA9IDA7XG4gICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwodGhpcy51cGRhdGVTdGF0ZS5iaW5kKHRoaXMpLCAyMCk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgX3RoaXMyLmtleXMgPSBfdGhpczIua2V5cyB8fCBbXTtcbiAgICAgICAgX3RoaXMyLmtleXNbZS5rZXlDb2RlXSA9IGUudHlwZSA9PT0gXCJrZXlkb3duXCI7XG4gICAgICB9KTtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIF90aGlzMi5rZXlzW2Uua2V5Q29kZV0gPSBlLnR5cGUgPT09IFwia2V5ZG93blwiO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcignZ2FtZTpzdGFydCcpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3N0b3AnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBzdG9wKCkge1xuICAgICAgY29uc29sZS5sb2coJ2dhbWUgc3RvcHBlZCcpO1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5lbmVteUludGVydmFsKTtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5ib251c0ludGVydmFsKTtcbiAgICAgIHRoaXMuZXZlbnRCdXMudHJpZ2dlcignZ2FtZTpsb2dnZXInLCBbJ0dhbWUgaGFzIGZpbmlzaGVkJywgJ2dhbWUtc3RhdHVzJ10pO1xuICAgICAgdGhpcy5ldmVudEJ1cy50cmlnZ2VyKCdnYW1lOmZpbmlzaGVkJyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY2xlYXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjbGVhcigpIHtcbiAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd1cGRhdGVTdGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVN0YXRlKCkge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuZW5lbXkyKTtcblxuXG4gICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuXG4gICAgICB0aGlzLnBlcnNvbi5uZXdQb3Moe1xuICAgICAgICByaWdodDogdGhpcy5rZXlzICYmIHRoaXMua2V5c1szOV0sXG4gICAgICAgIGxlZnQ6IHRoaXMua2V5cyAmJiB0aGlzLmtleXNbMzddLFxuICAgICAgICB1cDogdGhpcy5rZXlzICYmIHRoaXMua2V5c1szOF0sXG4gICAgICAgIGRvd246IHRoaXMua2V5cyAmJiB0aGlzLmtleXNbNDBdXG4gICAgICB9KS51cGRhdGUodGhpcy5jdHgpO1xuXG4gICAgICB0aGlzLmVuZW15Lm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICB2YXIgZGlzdFggPSBNYXRoLmFicyhpdGVtLnggLSBfdGhpczMucGVyc29uLngpO1xuICAgICAgICB2YXIgZGlzdFkgPSBNYXRoLmFicyhpdGVtLnkgLSBfdGhpczMucGVyc29uLnkpO1xuXG4gICAgICAgIGlmIChkaXN0WCA8IDIwICYmIGRpc3RZIDwgMjApIHtcblxuICAgICAgICAgIGlmIChfdGhpczMucGVyc29uLmhhc1Bvd2VyKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBfdGhpczMuZW5lbXkuaW5kZXhPZihpdGVtKTtcbiAgICAgICAgICAgIF90aGlzMy5lbmVteS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIF90aGlzMy5wZXJzb24uY29sb3IgPT09ICdvcmFuZ2UnID8gX3RoaXMzLnBlcnNvbi5jb2xvciA9ICdwdXJwbGUnIDogbnVsbDtcblxuICAgICAgICAgIF90aGlzMy5zdG9wKCk7XG5cbiAgICAgICAgICBpZiAoX3RoaXMzLnBlcnNvbi5jb2xvciA9PT0gJ3B1cnBsZScpIHtcbiAgICAgICAgICAgIF90aGlzMy5wZXJzb24uY29sb3IgPSAnZ3JlZW4nO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpczMucGVyc29uLmNvbG9yID0gJ3B1cnBsZSc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGl0ZW0ubmV3UG9zKHt9KS51cGRhdGUoX3RoaXMzLmN0eCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5lbmVteTIubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHZhciBkaXN0WCA9IE1hdGguYWJzKGl0ZW0ueCAtIF90aGlzMy5wZXJzb24ueCk7XG4gICAgICAgIHZhciBkaXN0WSA9IE1hdGguYWJzKGl0ZW0ueSAtIF90aGlzMy5wZXJzb24ueSk7XG5cbiAgICAgICAgaWYgKGRpc3RYIDwgMTAwICYmIGRpc3RZIDwgMTAwKSB7XG4gICAgICAgICAgLy8gaXRlbS5jb2xvciA9ICdyZ2IoMjAxLCAzMiwgNzMpJztcblxuICAgICAgICAgIGl0ZW0uYW5ncnkgPSB0cnVlO1xuXG4gICAgICAgICAgaXRlbS5uZXdQb3Moe1xuICAgICAgICAgICAgbmV3WDogaXRlbS54IC0gX3RoaXMzLnBlcnNvbi54ICsgMyA+IGRpc3RYICYmICFfdGhpczMucGVyc29uLmhhc1Bvd2VyID8gaXRlbS54IC0gMyA6IGl0ZW0ueCArIDMsXG4gICAgICAgICAgICBuZXdZOiBpdGVtLnkgLSBfdGhpczMucGVyc29uLnkgKyAzID4gZGlzdFggJiYgIV90aGlzMy5wZXJzb24uaGFzUG93ZXIgPyBpdGVtLnkgLSAzIDogaXRlbS55ICsgM1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGl0ZW0uY29sb3IgPSAncmdiKDEyNCwgMTAzLCAyMjcpJztcbiAgICAgICAgICBpdGVtLmFuZ3J5ID0gZmFsc2U7XG4gICAgICAgICAgaXRlbS5uZXdQb3Moe30pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRpc3RYIDwgMjAgJiYgZGlzdFkgPCAyMCkge1xuICAgICAgICAgIGlmIChfdGhpczMucGVyc29uLmhhc1Bvd2VyKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBfdGhpczMuZW5lbXkyLmluZGV4T2YoaXRlbSk7XG4gICAgICAgICAgICBfdGhpczMuZW5lbXkyLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgX3RoaXMzLnBlcnNvbi5jb2xvciA9PT0gJ29yYW5nZScgPyBfdGhpczMucGVyc29uLmNvbG9yID0gJ3B1cnBsZScgOiBudWxsO1xuXG4gICAgICAgICAgX3RoaXMzLnN0b3AoKTtcblxuICAgICAgICAgIGlmIChfdGhpczMucGVyc29uLmNvbG9yID09PSAncHVycGxlJykge1xuICAgICAgICAgICAgX3RoaXMzLnBlcnNvbi5jb2xvciA9ICdncmVlbic7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzMy5wZXJzb24uY29sb3IgPSAncHVycGxlJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaXRlbS51cGRhdGUoX3RoaXMzLmN0eCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5ib251cy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgdmFyIGRpc3RYID0gTWF0aC5hYnMoaXRlbS54IC0gX3RoaXMzLnBlcnNvbi54KTtcbiAgICAgICAgdmFyIGRpc3RZID0gTWF0aC5hYnMoaXRlbS55IC0gX3RoaXMzLnBlcnNvbi55KTtcblxuICAgICAgICAvLyBjb25zb2xlLmxvZyhkaXN0WCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRpc3RZKTtcblxuICAgICAgICBpZiAoZGlzdFggPCAyMCAmJiBkaXN0WSA8IDIwKSB7XG4gICAgICAgICAgaWYgKCFfdGhpczMucGVyc29uLmhhc1Bvd2VyKSB7XG4gICAgICAgICAgICBfdGhpczMucGVyc29uLnBvd2VyKCk7XG4gICAgICAgICAgICBfdGhpczMuZXZlbnRCdXMudHJpZ2dlcignZ2FtZTpwb3dlcicpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBpbmRleCA9IF90aGlzMy5ib251cy5pbmRleE9mKGl0ZW0pO1xuICAgICAgICAgIF90aGlzMy5ib251cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gICB0aGlzLnBlcnNvbi5jb2xvciA9PT0gJ29yYW5nZScgPyB0aGlzLnBlcnNvbi5jb2xvciA9ICdwdXJwbGUnIDogbnVsbFxuICAgICAgICAvL1xuICAgICAgICAvLyAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgIGlmICh0aGlzLnBlcnNvbi5jb2xvciA9PT0gJ3B1cnBsZScpIHtcbiAgICAgICAgLy8gICAgIHRoaXMucGVyc29uLmNvbG9yID0gJ2dyZWVuJztcbiAgICAgICAgLy8gICB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgdGhpcy5wZXJzb24uY29sb3IgPSAncHVycGxlJztcbiAgICAgICAgLy8gICB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIH1cbiAgICAgICAgaXRlbS5uZXdQb3Moe30pLnVwZGF0ZShfdGhpczMuY3R4KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGNoZWNrQ29vcmRzKHBsYXllckNvb3JkcywgKVxuXG4gIH1dKTtcblxuICByZXR1cm4gR2FtZUZpZWxkO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBHYW1lRmllbGQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJa2RoYldWR2FXVnNaQzVxY3lKZExDSnVZVzFsY3lJNld5SkhZVzFsUm1sbGJHUWlMQ0psYkdWdFpXNTBJaXdpZDJsa2RHZ2lMQ0pvWldsbmFIUWlMQ0pRYkdGNVpYSWlMQ0pGYm1WdGVTSXNJbVYyWlc1MFFuVnpJaXdpUlc1bGJYa3lJaXdpUW05dWRYTWlMQ0pqWVc1MllYTWlMQ0pqZEhnaUxDSm5aWFJEYjI1MFpYaDBJaXdpY0dWeWMyOXVJaXdpWlc1bGJYa2lMQ0psYm1WdGVUSWlMQ0ppYjI1MWN5SXNJbVZ1WlcxNVNXNTBaWEoyWVd3aUxDSnpaWFJKYm5SbGNuWmhiQ0lzSW5CMWMyZ2lMQ0psYm1WdGVVbHVkR1Z5ZG1Gc01pSXNJbUp2Ym5WelNXNTBaWEoyWVd3aUxDSk5ZWFJvSWl3aWNtOTFibVFpTENKeVlXNWtiMjBpTENKemRHRnlkQ0lzSW5SeWFXZG5aWElpTENKdWRXMGlMQ0ptYkc5dmNpSXNJbWx0WVdkbElpd2laRzlqZFcxbGJuUWlMQ0p4ZFdWeWVWTmxiR1ZqZEc5eUlpd2labkpoYldWT2J5SXNJbWx1ZEdWeWRtRnNJaXdpZFhCa1lYUmxVM1JoZEdVaUxDSmlhVzVrSWl3aWQybHVaRzkzSWl3aVlXUmtSWFpsYm5STWFYTjBaVzVsY2lJc0ltVWlMQ0p3Y21WMlpXNTBSR1ZtWVhWc2RDSXNJbXRsZVhNaUxDSnJaWGxEYjJSbElpd2lkSGx3WlNJc0ltTnZibk52YkdVaUxDSnNiMmNpTENKamJHVmhja2x1ZEdWeWRtRnNJaXdpWTJ4bFlYSlNaV04wSWl3aVkyeGxZWElpTENKa2NtRjNTVzFoWjJVaUxDSnVaWGRRYjNNaUxDSnlhV2RvZENJc0lteGxablFpTENKMWNDSXNJbVJ2ZDI0aUxDSjFjR1JoZEdVaUxDSnRZWEFpTENKa2FYTjBXQ0lzSW1GaWN5SXNJbWwwWlcwaUxDSjRJaXdpWkdsemRGa2lMQ0o1SWl3aWFHRnpVRzkzWlhJaUxDSnBibVJsZUNJc0ltbHVaR1Y0VDJZaUxDSnpjR3hwWTJVaUxDSmpiMnh2Y2lJc0luTjBiM0FpTENKaGJtZHllU0lzSW01bGQxZ2lMQ0p1WlhkWklpd2ljRzkzWlhJaVhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN096czdPenM3U1VGQlRVRXNVenRCUVVOS0xIRkNRVUZaUXl4UFFVRmFMRVZCUVhGQ1F5eExRVUZ5UWl4RlFVRTBRa01zVFVGQk5VSXNSVUZCYjBORExFMUJRWEJETEVWQlFUUkRReXhMUVVFMVF5eEZRVUZ0UkVNc1VVRkJia1FzUlVGQk5rUkRMRTFCUVRkRUxFVkJRWEZGUXl4TFFVRnlSU3hGUVVFMFJUdEJRVUZCT3p0QlFVRkJPenRCUVVNeFJTeFRRVUZMUXl4TlFVRk1MRWRCUVdOU0xFOUJRV1E3UVVGRFFTeFRRVUZMVXl4SFFVRk1MRWRCUVZjc1MwRkJTMFFzVFVGQlRDeERRVUZaUlN4VlFVRmFMRU5CUVhWQ0xFbEJRWFpDTEVOQlFWZzdPMEZCUlVFc1UwRkJTMHdzVVVGQlRDeEhRVUZuUWtFc1VVRkJhRUk3TzBGQlJVRXNVMEZCUzBnc1RVRkJUQ3hIUVVGalFTeE5RVUZrTzBGQlEwRXNVMEZCUzBRc1MwRkJUQ3hIUVVGaFFTeExRVUZpT3p0QlFVVkJMRk5CUVV0VkxFMUJRVXdzUjBGQll5eEpRVUZKVWl4TlFVRktMRU5CUVZjc1MwRkJTMDBzUjBGQmFFSXNSVUZCY1VJc1JVRkJja0lzUlVGQmVVSXNSVUZCZWtJc1JVRkJOa0lzVVVGQk4wSXNSVUZCZFVNc1JVRkJka01zUlVGQk1rTXNSVUZCTTBNc1JVRkJLME5LTEZGQlFTOURMRU5CUVdRN1FVRkRRU3hUUVVGTFR5eExRVUZNTEVkQlFXRXNSVUZCWWp0QlFVTkJMRk5CUVV0RExFMUJRVXdzUjBGQll5eEZRVUZrTzBGQlEwRXNVMEZCUzBNc1MwRkJUQ3hIUVVGaExFVkJRV0k3TzBGQlJVRXNVMEZCUzBNc1lVRkJUQ3hIUVVGeFFrTXNXVUZCV1N4WlFVRk5PMEZCUTNKRExGbEJRVXRLTEV0QlFVd3NRMEZCVjBzc1NVRkJXQ3hEUVVGblFpeEpRVUZKWWl4TFFVRktMRU5CUVZVc1RVRkJTMHNzUjBGQlppeEZRVUZ2UWl4RlFVRndRaXhGUVVGM1FpeEZRVUY0UWl4RlFVRTBRaXhMUVVFMVFpeEZRVUZ0UXl4RlFVRnVReXhGUVVGMVF5eEZRVUYyUXl4RlFVRXlRMG9zVVVGQk0wTXNRMEZCYUVJN1FVRkRSQ3hMUVVadlFpeEZRVVZzUWl4SlFVWnJRaXhEUVVGeVFqczdRVUZKUVN4VFFVRkxZU3hqUVVGTUxFZEJRWE5DUml4WlFVRlpMRmxCUVUwN1FVRkRkRU1zV1VGQlMwZ3NUVUZCVEN4RFFVRlpTU3hKUVVGYUxFTkJRV2xDTEVsQlFVbFlMRTFCUVVvc1EwRkJWeXhOUVVGTFJ5eEhRVUZvUWl4RlFVRnhRaXhGUVVGeVFpeEZRVUY1UWl4RlFVRjZRaXhGUVVFMlFpeHZRa0ZCTjBJc1JVRkJiVVFzUlVGQmJrUXNSVUZCZFVRc1JVRkJka1FzUlVGQk1rUktMRkZCUVRORUxFTkJRV3BDTzBGQlEwUXNTMEZHY1VJc1JVRkZia0lzU1VGR2JVSXNRMEZCZEVJN08wRkJTVUVzVTBGQlMyTXNZVUZCVEN4SFFVRnhRa2dzV1VGQldTeFpRVUZOTzBGQlEzSkRMRmxCUVV0R0xFdEJRVXdzUTBGQlYwY3NTVUZCV0N4RFFVRm5RaXhKUVVGSlZpeExRVUZLTEVOQlFWVXNUVUZCUzBVc1IwRkJaaXhGUVVGdlFpeEZRVUZ3UWl4RlFVRjNRaXhGUVVGNFFpeEZRVUUwUWl4dlFrRkJOVUlzUlVGQmEwUlhMRXRCUVV0RExFdEJRVXdzUTBGQlYwUXNTMEZCUzBVc1RVRkJUQ3hMUVVGblFpeE5RVUZMY2tJc1MwRkJhRU1zUTBGQmJFUXNSVUZCTUVadFFpeExRVUZMUXl4TFFVRk1MRU5CUVZkRUxFdEJRVXRGTEUxQlFVd3NTMEZCWjBJc1RVRkJTM0JDTEUxQlFXaERMRU5CUVRGR0xFVkJRVzFKUnl4UlFVRnVTU3hEUVVGb1FqdEJRVU5FTEV0QlJtOUNMRVZCUld4Q0xFbEJSbXRDTEVOQlFYSkNPenRCUVVsQkxGTkJRVXRyUWl4TFFVRk1PMEZCUTBRN096czdORUpCUlU4N1FVRkJRVHM3UVVGRFRpeFhRVUZMWml4TlFVRk1MRU5CUVZsT0xFMUJRVm9zUjBGQmNVSXNTMEZCUzBFc1RVRkJNVUk3UVVGRFFTeFhRVUZMVFN4TlFVRk1MRU5CUVZsUUxFdEJRVm9zUjBGQmIwSXNTMEZCUzBFc1MwRkJla0k3TzBGQlJVRXNWMEZCUzBrc1VVRkJUQ3hEUVVGamJVSXNUMEZCWkN4RFFVRnpRaXh0UWtGQmRFSTdRVUZEUVN4WFFVRkxia0lzVVVGQlRDeERRVUZqYlVJc1QwRkJaQ3hEUVVGelFpeGhRVUYwUWl4RlFVRnhReXhEUVVGRExEUkNRVUZFTEVWQlFTdENMR0ZCUVM5Q0xFTkJRWEpET3p0QlFVVkJMRlZCUVVsRExFMUJRVTFNTEV0QlFVdE5MRXRCUVV3c1EwRkJWMDRzUzBGQlMwVXNUVUZCVEN4TFFVRm5RaXhEUVVGb1FpeEhRVUZ2UWl4RFFVRXZRaXhEUVVGV08wRkJRMEVzVjBGQlMwc3NTMEZCVEN4SFFVRmhReXhUUVVGVFF5eGhRVUZVTEVOQlFYVkNMR0ZCUVdGS0xFZEJRWEJETEVOQlFXSTdPMEZCUzBFc1YwRkJTMHNzVDBGQlRDeEhRVUZsTEVOQlFXWTdRVUZEUVN4WFFVRkxReXhSUVVGTUxFZEJRV2RDWml4WlFVRlpMRXRCUVV0blFpeFhRVUZNTEVOQlFXbENReXhKUVVGcVFpeERRVUZ6UWl4SlFVRjBRaXhEUVVGYUxFVkJRWGxETEVWQlFYcERMRU5CUVdoQ08wRkJRMEZETEdGQlFVOURMR2RDUVVGUUxFTkJRWGRDTEZOQlFYaENMRVZCUVcxRExGVkJRVU5ETEVOQlFVUXNSVUZCVHp0QlFVTjRRMEVzVlVGQlJVTXNZMEZCUmp0QlFVTkJMR1ZCUVV0RExFbEJRVXdzUjBGQllTeFBRVUZMUVN4SlFVRk1MRWxCUVdFc1JVRkJNVUk3UVVGRFFTeGxRVUZMUVN4SlFVRk1MRU5CUVZWR0xFVkJRVVZITEU5QlFWb3NTVUZCZDBKSUxFVkJRVVZKTEVsQlFVWXNTMEZCVnl4VFFVRnVRenRCUVVORUxFOUJTa1E3UVVGTFFVNHNZVUZCVDBNc1owSkJRVkFzUTBGQmQwSXNUMEZCZUVJc1JVRkJhVU1zVlVGQlEwTXNRMEZCUkN4RlFVRlBPMEZCUTNSRExHVkJRVXRGTEVsQlFVd3NRMEZCVlVZc1JVRkJSVWNzVDBGQldpeEpRVUYzUWtnc1JVRkJSVWtzU1VGQlJpeExRVUZYTEZOQlFXNURPMEZCUTBRc1QwRkdSRHM3UVVGTFFTeFhRVUZMYmtNc1VVRkJUQ3hEUVVGamJVSXNUMEZCWkN4RFFVRnpRaXhaUVVGMFFqdEJRVU5FT3pzN01rSkJSVTA3UVVGRFRHbENMR05CUVZGRExFZEJRVklzUTBGQldTeGpRVUZhTzBGQlEwRkRMRzlDUVVGakxFdEJRVXRhTEZGQlFXNUNPMEZCUTBGWkxHOUNRVUZqTEV0QlFVczFRaXhoUVVGdVFqdEJRVU5CTkVJc2IwSkJRV01zUzBGQlMzaENMR0ZCUVc1Q08wRkJRMEVzVjBGQlMyUXNVVUZCVEN4RFFVRmpiVUlzVDBGQlpDeERRVUZ6UWl4aFFVRjBRaXhGUVVGeFF5eERRVUZETEcxQ1FVRkVMRVZCUVhOQ0xHRkJRWFJDTEVOQlFYSkRPMEZCUTBFc1YwRkJTMjVDTEZGQlFVd3NRMEZCWTIxQ0xFOUJRV1FzUTBGQmMwSXNaVUZCZEVJN1FVRkRSRHM3T3pSQ1FVVlBPMEZCUTA0c1YwRkJTMllzUjBGQlRDeERRVUZUYlVNc1UwRkJWQ3hEUVVGdFFpeERRVUZ1UWl4RlFVRnpRaXhEUVVGMFFpeEZRVUY1UWl4TFFVRkxjRU1zVFVGQlRDeERRVUZaVUN4TFFVRnlReXhGUVVFMFF5eExRVUZMVHl4TlFVRk1MRU5CUVZsT0xFMUJRWGhFTzBGQlEwUTdPenRyUTBGRllUdEJRVUZCT3p0QlFVTmFMRmRCUVVzeVF5eExRVUZNTzBGQlEwRTdPenRCUVVsQkxGZEJRVXR3UXl4SFFVRk1MRU5CUVZOeFF5eFRRVUZVTEVOQlFXMUNMRXRCUVV0dVFpeExRVUY0UWl4RlFVRXJRaXhEUVVFdlFpeEZRVUZyUXl4RFFVRnNReXhGUVVGeFF5eExRVUZMTVVJc1MwRkJNVU1zUlVGQmFVUXNTMEZCUzBNc1RVRkJkRVE3TzBGQlJVRXNWMEZEUjFNc1RVRkVTQ3hEUVVWSGIwTXNUVUZHU0N4RFFVVlZPMEZCUTA1RExHVkJRVThzUzBGQlMxWXNTVUZCVEN4SlFVRmhMRXRCUVV0QkxFbEJRVXdzUTBGQlZTeEZRVUZXTEVOQlJHUTdRVUZGVGxjc1kwRkJUU3hMUVVGTFdDeEpRVUZNTEVsQlFXRXNTMEZCUzBFc1NVRkJUQ3hEUVVGVkxFVkJRVllzUTBGR1lqdEJRVWRPV1N4WlFVRkpMRXRCUVV0YUxFbEJRVXdzU1VGQllTeExRVUZMUVN4SlFVRk1MRU5CUVZVc1JVRkJWaXhEUVVoWU8wRkJTVTVoTEdOQlFVMHNTMEZCUzJJc1NVRkJUQ3hKUVVGaExFdEJRVXRCTEVsQlFVd3NRMEZCVlN4RlFVRldPMEZCU21Jc1QwRkdWaXhGUVZGSFl5eE5RVkpJTEVOQlVWVXNTMEZCU3pORExFZEJVbVk3TzBGQlZVRXNWMEZCUzBjc1MwRkJUQ3hEUVVGWGVVTXNSMEZCV0N4RFFVRmxMR2RDUVVGUk8wRkJRM0pDTEZsQlFVbERMRkZCUVZGc1F5eExRVUZMYlVNc1IwRkJUQ3hEUVVGVFF5eExRVUZMUXl4RFFVRk1MRWRCUVZNc1QwRkJTemxETEUxQlFVd3NRMEZCV1RoRExFTkJRVGxDTEVOQlFWbzdRVUZEUVN4WlFVRkpReXhSUVVGUmRFTXNTMEZCUzIxRExFZEJRVXdzUTBGQlUwTXNTMEZCUzBjc1EwRkJUQ3hIUVVGVExFOUJRVXRvUkN4TlFVRk1MRU5CUVZsblJDeERRVUU1UWl4RFFVRmFPenRCUVVWQkxGbEJRVWxNTEZGQlFWRXNSVUZCVWl4SlFVRmpTU3hSUVVGUkxFVkJRVEZDTEVWQlFUaENPenRCUVVVMVFpeGpRVUZKTEU5QlFVc3ZReXhOUVVGTUxFTkJRVmxwUkN4UlFVRm9RaXhGUVVFd1FqdEJRVU40UWl4blFrRkJUVU1zVVVGQlVTeFBRVUZMYWtRc1MwRkJUQ3hEUVVGWGEwUXNUMEZCV0N4RFFVRnRRazRzU1VGQmJrSXNRMEZCWkR0QlFVTkJMRzFDUVVGTE5VTXNTMEZCVEN4RFFVRlhiVVFzVFVGQldDeERRVUZyUWtZc1MwRkJiRUlzUlVGQmVVSXNRMEZCZWtJN1FVRkRRVHRCUVVORU96dEJRVVZFTEdsQ1FVRkxiRVFzVFVGQlRDeERRVUZaY1VRc1MwRkJXaXhMUVVGelFpeFJRVUYwUWl4SFFVRnBReXhQUVVGTGNrUXNUVUZCVEN4RFFVRlpjVVFzUzBGQldpeEhRVUZ2UWl4UlFVRnlSQ3hIUVVGblJTeEpRVUZvUlRzN1FVRkZRU3hwUWtGQlMwTXNTVUZCVERzN1FVRkZRU3hqUVVGSkxFOUJRVXQwUkN4TlFVRk1MRU5CUVZseFJDeExRVUZhTEV0QlFYTkNMRkZCUVRGQ0xFVkJRVzlETzBGQlEyeERMRzFDUVVGTGNrUXNUVUZCVEN4RFFVRlpjVVFzUzBGQldpeEhRVUZ2UWl4UFFVRndRanRCUVVORUxGZEJSa1FzVFVGRlR6dEJRVU5NTEcxQ1FVRkxja1FzVFVGQlRDeERRVUZaY1VRc1MwRkJXaXhIUVVGdlFpeFJRVUZ3UWp0QlFVTkVPMEZCUlVZN1FVRkRSRklzWVVGQlMxUXNUVUZCVEN4RFFVRlpMRVZCUVZvc1JVRkJaMEpMTEUxQlFXaENMRU5CUVhWQ0xFOUJRVXN6UXl4SFFVRTFRanRCUVVORUxFOUJlRUpFT3p0QlFUQkNRU3hYUVVGTFNTeE5RVUZNTEVOQlFWbDNReXhIUVVGYUxFTkJRV2RDTEdkQ1FVRlJPMEZCUTNSQ0xGbEJRVWxETEZGQlFWRnNReXhMUVVGTGJVTXNSMEZCVEN4RFFVRlRReXhMUVVGTFF5eERRVUZNTEVkQlFWTXNUMEZCU3psRExFMUJRVXdzUTBGQldUaERMRU5CUVRsQ0xFTkJRVm83UVVGRFFTeFpRVUZKUXl4UlFVRlJkRU1zUzBGQlMyMURMRWRCUVV3c1EwRkJVME1zUzBGQlMwY3NRMEZCVEN4SFFVRlRMRTlCUVV0b1JDeE5RVUZNTEVOQlFWbG5SQ3hEUVVFNVFpeERRVUZhT3p0QlFVVkJMRmxCUVVsTUxGRkJRVkVzUjBGQlVpeEpRVUZsU1N4UlFVRlJMRWRCUVROQ0xFVkJRV2RETzBGQlF6bENPenRCUVVWQlJpeGxRVUZMVlN4TFFVRk1MRWRCUVdFc1NVRkJZanM3UVVGRlFWWXNaVUZCUzFRc1RVRkJUQ3hEUVVGWk8wRkJRMVp2UWl4clFrRkJUVmdzUzBGQlMwTXNRMEZCVEN4SFFVRlRMRTlCUVVzNVF5eE5RVUZNTEVOQlFWazRReXhEUVVGeVFpeEhRVUY1UWl4RFFVRjZRaXhIUVVFMlFrZ3NTMEZCTjBJc1NVRkJjME1zUTBGQlF5eFBRVUZMTTBNc1RVRkJUQ3hEUVVGWmFVUXNVVUZCYmtRc1IwRkJPRVJLTEV0QlFVdERMRU5CUVV3c1IwRkJVU3hEUVVGMFJTeEhRVUV3UlVRc1MwRkJTME1zUTBGQlRDeEhRVUZUTEVOQlJDOUZPMEZCUlZaWExHdENRVUZOV2l4TFFVRkxSeXhEUVVGTUxFZEJRVk1zVDBGQlMyaEVMRTFCUVV3c1EwRkJXV2RFTEVOQlFYSkNMRWRCUVhsQ0xFTkJRWHBDTEVkQlFUWkNUQ3hMUVVFM1FpeEpRVUZ6UXl4RFFVRkRMRTlCUVVzelF5eE5RVUZNTEVOQlFWbHBSQ3hSUVVGdVJDeEhRVUU0UkVvc1MwRkJTMGNzUTBGQlRDeEhRVUZSTEVOQlFYUkZMRWRCUVRCRlNDeExRVUZMUnl4RFFVRk1MRWRCUVZNN1FVRkdMMFVzVjBGQldqdEJRVTFFTEZOQldFUXNUVUZYVHp0QlFVTk1PMEZCUTBGSUxHVkJRVXRWTEV0QlFVd3NSMEZCWVN4TFFVRmlPMEZCUTBGV0xHVkJRVXRVTEUxQlFVd3NRMEZCV1N4RlFVRmFPMEZCUTBRN08wRkJSVVFzV1VGQlNVOHNVVUZCVVN4RlFVRlNMRWxCUVdOSkxGRkJRVkVzUlVGQk1VSXNSVUZCT0VJN1FVRkROVUlzWTBGQlNTeFBRVUZMTDBNc1RVRkJUQ3hEUVVGWmFVUXNVVUZCYUVJc1JVRkJNRUk3UVVGRGVFSXNaMEpCUVUxRExGRkJRVkVzVDBGQlMyaEVMRTFCUVV3c1EwRkJXV2xFTEU5QlFWb3NRMEZCYjBKT0xFbEJRWEJDTEVOQlFXUTdRVUZEUVN4dFFrRkJTek5ETEUxQlFVd3NRMEZCV1d0RUxFMUJRVm9zUTBGQmJVSkdMRXRCUVc1Q0xFVkJRVEJDTEVOQlFURkNPMEZCUTBFN1FVRkRSRHM3UVVGSFJDeHBRa0ZCUzJ4RUxFMUJRVXdzUTBGQldYRkVMRXRCUVZvc1MwRkJjMElzVVVGQmRFSXNSMEZCYVVNc1QwRkJTM0pFTEUxQlFVd3NRMEZCV1hGRUxFdEJRVm9zUjBGQmIwSXNVVUZCY2tRc1IwRkJaMFVzU1VGQmFFVTdPMEZCUlVFc2FVSkJRVXRETEVsQlFVdzdPMEZCUlVFc1kwRkJTU3hQUVVGTGRFUXNUVUZCVEN4RFFVRlpjVVFzUzBGQldpeExRVUZ6UWl4UlFVRXhRaXhGUVVGdlF6dEJRVU5zUXl4dFFrRkJTM0pFTEUxQlFVd3NRMEZCV1hGRUxFdEJRVm9zUjBGQmIwSXNUMEZCY0VJN1FVRkRSQ3hYUVVaRUxFMUJSVTg3UVVGRFRDeHRRa0ZCUzNKRUxFMUJRVXdzUTBGQldYRkVMRXRCUVZvc1IwRkJiMElzVVVGQmNFSTdRVUZEUkR0QlFVVkdPMEZCUTBSU0xHRkJRVXRLTEUxQlFVd3NRMEZCV1N4UFFVRkxNME1zUjBGQmFrSTdRVUZEUkN4UFFYcERSRHM3UVVFMFEwRXNWMEZCUzBzc1MwRkJUQ3hEUVVGWGRVTXNSMEZCV0N4RFFVRmxMR2RDUVVGUk8wRkJRM0pDTEZsQlFVbERMRkZCUVZGc1F5eExRVUZMYlVNc1IwRkJUQ3hEUVVGVFF5eExRVUZMUXl4RFFVRk1MRWRCUVZNc1QwRkJTemxETEUxQlFVd3NRMEZCV1RoRExFTkJRVGxDTEVOQlFWbzdRVUZEUVN4WlFVRkpReXhSUVVGUmRFTXNTMEZCUzIxRExFZEJRVXdzUTBGQlUwTXNTMEZCUzBjc1EwRkJUQ3hIUVVGVExFOUJRVXRvUkN4TlFVRk1MRU5CUVZsblJDeERRVUU1UWl4RFFVRmFPenRCUVVWQk8wRkJRMEU3TzBGQlJVRXNXVUZCU1V3c1VVRkJVU3hGUVVGU0xFbEJRV05KTEZGQlFWRXNSVUZCTVVJc1JVRkJPRUk3UVVGRE5VSXNZMEZCU1N4RFFVRkRMRTlCUVVzdlF5eE5RVUZNTEVOQlFWbHBSQ3hSUVVGcVFpeEZRVUV5UWp0QlFVTjZRaXh0UWtGQlMycEVMRTFCUVV3c1EwRkJXVEJFTEV0QlFWbzdRVUZEUVN4dFFrRkJTMmhGTEZGQlFVd3NRMEZCWTIxQ0xFOUJRV1FzUTBGQmMwSXNXVUZCZEVJN1FVRkRSRHM3UVVGRlJDeGpRVUZOY1VNc1VVRkJVU3hQUVVGTEwwTXNTMEZCVEN4RFFVRlhaMFFzVDBGQldDeERRVUZ0UWs0c1NVRkJia0lzUTBGQlpEdEJRVU5CTEdsQ1FVRkxNVU1zUzBGQlRDeERRVUZYYVVRc1RVRkJXQ3hEUVVGclFrWXNTMEZCYkVJc1JVRkJlVUlzUTBGQmVrSTdRVUZEUkRzN1FVRkZSRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEZNTEdGQlFVdFVMRTFCUVV3c1EwRkJXU3hGUVVGYUxFVkJRV2RDU3l4TlFVRm9RaXhEUVVGMVFpeFBRVUZMTTBNc1IwRkJOVUk3UVVGRFJDeFBRVGRDUkR0QlFUaENSRHM3UVVGSFJEczdPenM3T3p0clFrRkhZVllzVXlJc0ltWnBiR1VpT2lKSFlXMWxSbWxsYkdRdWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUpqYkdGemN5QkhZVzFsUm1sbGJHUWdlMXh5WEc0Z0lHTnZibk4wY25WamRHOXlLR1ZzWlcxbGJuUXNJSGRwWkhSb0xDQm9aV2xuYUhRc0lGQnNZWGxsY2l3Z1JXNWxiWGtzSUdWMlpXNTBRblZ6TENCRmJtVnRlVElzSUVKdmJuVnpLU0I3WEhKY2JpQWdJQ0IwYUdsekxtTmhiblpoY3lBOUlHVnNaVzFsYm5RN1hISmNiaUFnSUNCMGFHbHpMbU4wZUNBOUlIUm9hWE11WTJGdWRtRnpMbWRsZEVOdmJuUmxlSFFvSnpKa0p5azdYSEpjYmx4eVhHNGdJQ0FnZEdocGN5NWxkbVZ1ZEVKMWN5QTlJR1YyWlc1MFFuVnpPMXh5WEc1Y2NseHVJQ0FnSUhSb2FYTXVhR1ZwWjJoMElEMGdhR1ZwWjJoME8xeHlYRzRnSUNBZ2RHaHBjeTUzYVdSMGFDQTlJSGRwWkhSb08xeHlYRzVjY2x4dUlDQWdJSFJvYVhNdWNHVnljMjl1SUQwZ2JtVjNJRkJzWVhsbGNpaDBhR2x6TG1OMGVDd2dOVEFzSURVd0xDQW5iM0poYm1kbEp5d2dOVEFzSURVd0xDQmxkbVZ1ZEVKMWN5azdYSEpjYmlBZ0lDQjBhR2x6TG1WdVpXMTVJRDBnVzEwN1hISmNiaUFnSUNCMGFHbHpMbVZ1WlcxNU1pQTlJRnRkTzF4eVhHNGdJQ0FnZEdocGN5NWliMjUxY3lBOUlGdGRPMXh5WEc1Y2NseHVJQ0FnSUhSb2FYTXVaVzVsYlhsSmJuUmxjblpoYkNBOUlITmxkRWx1ZEdWeWRtRnNLQ2dwSUQwK0lIdGNjbHh1SUNBZ0lDQWdkR2hwY3k1bGJtVnRlUzV3ZFhOb0tHNWxkeUJGYm1WdGVTaDBhR2x6TG1OMGVDd2dOREFzSURRd0xDQW5jbVZrSnl3Z01UQXNJREV3TENCbGRtVnVkRUoxY3lrcE8xeHlYRzRnSUNBZ2ZTd2dNVFV3TUNsY2NseHVYSEpjYmlBZ0lDQjBhR2x6TG1WdVpXMTVTVzUwWlhKMllXd3lJRDBnYzJWMFNXNTBaWEoyWVd3b0tDa2dQVDRnZTF4eVhHNGdJQ0FnSUNCMGFHbHpMbVZ1WlcxNU1pNXdkWE5vS0c1bGR5QkZibVZ0ZVRJb2RHaHBjeTVqZEhnc0lEVXdMQ0ExTUN3Z0ozSm5ZaWd4TWpRc0lERXdNeXdnTWpJM0tTY3NJREV3TENBeE1Dd2daWFpsYm5SQ2RYTXBLVHRjY2x4dUlDQWdJSDBzSURJMU1EQXBYSEpjYmx4eVhHNGdJQ0FnZEdocGN5NWliMjUxYzBsdWRHVnlkbUZzSUQwZ2MyVjBTVzUwWlhKMllXd29LQ2tnUFQ0Z2UxeHlYRzRnSUNBZ0lDQjBhR2x6TG1KdmJuVnpMbkIxYzJnb2JtVjNJRUp2Ym5WektIUm9hWE11WTNSNExDQXlOU3dnTWpVc0lDZHlaMklvTVRjekxDQXlNamNzSURFd015a25MQ0JOWVhSb0xuSnZkVzVrS0UxaGRHZ3VjbUZ1Wkc5dEtDa2dLaUIwYUdsekxuZHBaSFJvS1N3Z1RXRjBhQzV5YjNWdVpDaE5ZWFJvTG5KaGJtUnZiU2dwSUNvZ2RHaHBjeTVvWldsbmFIUXBMQ0JsZG1WdWRFSjFjeWtwTzF4eVhHNGdJQ0FnZlN3Z056QXdNQ2xjY2x4dVhISmNiaUFnSUNCMGFHbHpMbk4wWVhKMEtDazdYSEpjYmlBZ2ZWeHlYRzVjY2x4dUlDQnpkR0Z5ZENncElIdGNjbHh1SUNBZ0lIUm9hWE11WTJGdWRtRnpMbWhsYVdkb2RDQTlJSFJvYVhNdWFHVnBaMmgwTzF4eVhHNGdJQ0FnZEdocGN5NWpZVzUyWVhNdWQybGtkR2dnUFNCMGFHbHpMbmRwWkhSb08xeHlYRzVjY2x4dUlDQWdJSFJvYVhNdVpYWmxiblJDZFhNdWRISnBaMmRsY2lnbloyRnRaVHBzYjJkblpYSXRZMnhsWVhJbktUdGNjbHh1SUNBZ0lIUm9hWE11WlhabGJuUkNkWE11ZEhKcFoyZGxjaWduWjJGdFpUcHNiMmRuWlhJbkxDQmJKMGRoYldVZ2MzUmhjblJsWkNFZ1IyOXZaQ0JzZFdOcklEc3BKeXdnSjJkaGJXVXRjM1JoZEhWekoxMHBPMXh5WEc1Y2NseHVJQ0FnSUd4bGRDQnVkVzBnUFNCTllYUm9MbVpzYjI5eUtFMWhkR2d1Y21GdVpHOXRLQ2tnS2lBMUlDc2dNU2s3WEhKY2JpQWdJQ0IwYUdsekxtbHRZV2RsSUQwZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWduTG1keWIzVnVaQzBuSUNzZ2JuVnRLVHRjY2x4dVhISmNibHh5WEc1Y2NseHVYSEpjYmlBZ0lDQjBhR2x6TG1aeVlXMWxUbThnUFNBd08xeHlYRzRnSUNBZ2RHaHBjeTVwYm5SbGNuWmhiQ0E5SUhObGRFbHVkR1Z5ZG1Gc0tIUm9hWE11ZFhCa1lYUmxVM1JoZEdVdVltbHVaQ2gwYUdsektTd2dNakFwTzF4eVhHNGdJQ0FnZDJsdVpHOTNMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9KMnRsZVdSdmQyNG5MQ0FvWlNrZ1BUNGdlMXh5WEc0Z0lDQWdJQ0JsTG5CeVpYWmxiblJFWldaaGRXeDBLQ2s3WEhKY2JpQWdJQ0FnSUhSb2FYTXVhMlY1Y3lBOUlDaDBhR2x6TG10bGVYTWdmSHdnVzEwcE8xeHlYRzRnSUNBZ0lDQjBhR2x6TG10bGVYTmJaUzVyWlhsRGIyUmxYU0E5SUNobExuUjVjR1VnUFQwOUlGd2lhMlY1Wkc5M2Jsd2lLVHRjY2x4dUlDQWdJSDBwWEhKY2JpQWdJQ0IzYVc1a2IzY3VZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25hMlY1ZFhBbkxDQW9aU2tnUFQ0Z2UxeHlYRzRnSUNBZ0lDQjBhR2x6TG10bGVYTmJaUzVyWlhsRGIyUmxYU0E5SUNobExuUjVjR1VnUFQwOUlGd2lhMlY1Wkc5M2Jsd2lLVHRjY2x4dUlDQWdJSDBwWEhKY2JseHlYRzVjY2x4dUlDQWdJSFJvYVhNdVpYWmxiblJDZFhNdWRISnBaMmRsY2lnbloyRnRaVHB6ZEdGeWRDY3BPMXh5WEc0Z0lIMWNjbHh1WEhKY2JpQWdjM1J2Y0NncElIdGNjbHh1SUNBZ0lHTnZibk52YkdVdWJHOW5LQ2RuWVcxbElITjBiM0J3WldRbktUdGNjbHh1SUNBZ0lHTnNaV0Z5U1c1MFpYSjJZV3dvZEdocGN5NXBiblJsY25aaGJDazdYSEpjYmlBZ0lDQmpiR1ZoY2tsdWRHVnlkbUZzS0hSb2FYTXVaVzVsYlhsSmJuUmxjblpoYkNrN1hISmNiaUFnSUNCamJHVmhja2x1ZEdWeWRtRnNLSFJvYVhNdVltOXVkWE5KYm5SbGNuWmhiQ2s3WEhKY2JpQWdJQ0IwYUdsekxtVjJaVzUwUW5WekxuUnlhV2RuWlhJb0oyZGhiV1U2Ykc5bloyVnlKeXdnV3lkSFlXMWxJR2hoY3lCbWFXNXBjMmhsWkNjc0lDZG5ZVzFsTFhOMFlYUjFjeWRkS1R0Y2NseHVJQ0FnSUhSb2FYTXVaWFpsYm5SQ2RYTXVkSEpwWjJkbGNpZ25aMkZ0WlRwbWFXNXBjMmhsWkNjcE8xeHlYRzRnSUgxY2NseHVYSEpjYmlBZ1kyeGxZWElvS1NCN1hISmNiaUFnSUNCMGFHbHpMbU4wZUM1amJHVmhjbEpsWTNRb01Dd2dNQ3dnZEdocGN5NWpZVzUyWVhNdWQybGtkR2dzSUhSb2FYTXVZMkZ1ZG1GekxtaGxhV2RvZENrN1hISmNiaUFnZlZ4eVhHNWNjbHh1SUNCMWNHUmhkR1ZUZEdGMFpTZ3BJSHRjY2x4dUlDQWdJSFJvYVhNdVkyeGxZWElvS1R0Y2NseHVJQ0FnSUM4dklHTnZibk52YkdVdWJHOW5LSFJvYVhNdVpXNWxiWGt5S1R0Y2NseHVYSEpjYmx4eVhHNWNjbHh1SUNBZ0lIUm9hWE11WTNSNExtUnlZWGRKYldGblpTaDBhR2x6TG1sdFlXZGxMQ0F3TENBd0xDQjBhR2x6TG5kcFpIUm9MQ0IwYUdsekxtaGxhV2RvZENrN1hISmNibHh5WEc0Z0lDQWdkR2hwYzF4eVhHNGdJQ0FnSUNBdWNHVnljMjl1WEhKY2JpQWdJQ0FnSUM1dVpYZFFiM01vZTF4eVhHNGdJQ0FnSUNBZ0lISnBaMmgwT2lCMGFHbHpMbXRsZVhNZ0ppWWdkR2hwY3k1clpYbHpXek01WFN4Y2NseHVJQ0FnSUNBZ0lDQnNaV1owT2lCMGFHbHpMbXRsZVhNZ0ppWWdkR2hwY3k1clpYbHpXek0zWFN4Y2NseHVJQ0FnSUNBZ0lDQjFjRG9nZEdocGN5NXJaWGx6SUNZbUlIUm9hWE11YTJWNWMxc3pPRjBzWEhKY2JpQWdJQ0FnSUNBZ1pHOTNiam9nZEdocGN5NXJaWGx6SUNZbUlIUm9hWE11YTJWNWMxczBNRjBzWEhKY2JpQWdJQ0FnSUgwcFhISmNiaUFnSUNBZ0lDNTFjR1JoZEdVb2RHaHBjeTVqZEhncE8xeHlYRzVjY2x4dUlDQWdJSFJvYVhNdVpXNWxiWGt1YldGd0tHbDBaVzBnUFQ0Z2UxeHlYRzRnSUNBZ0lDQnNaWFFnWkdsemRGZ2dQU0JOWVhSb0xtRmljeWhwZEdWdExuZ2dMU0IwYUdsekxuQmxjbk52Ymk1NEtUdGNjbHh1SUNBZ0lDQWdiR1YwSUdScGMzUlpJRDBnVFdGMGFDNWhZbk1vYVhSbGJTNTVJQzBnZEdocGN5NXdaWEp6YjI0dWVTazdYSEpjYmx4eVhHNGdJQ0FnSUNCcFppQW9aR2x6ZEZnZ1BDQXlNQ0FtSmlCa2FYTjBXU0E4SURJd0tTQjdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lHbG1JQ2gwYUdsekxuQmxjbk52Ymk1b1lYTlFiM2RsY2lrZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnWTI5dWMzUWdhVzVrWlhnZ1BTQjBhR2x6TG1WdVpXMTVMbWx1WkdWNFQyWW9hWFJsYlNrN1hISmNiaUFnSUNBZ0lDQWdJQ0IwYUdsekxtVnVaVzE1TG5Od2JHbGpaU2hwYm1SbGVDd2dNU2s3WEhKY2JpQWdJQ0FnSUNBZ0lDQnlaWFIxY200N1hISmNiaUFnSUNBZ0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUNBZ0lDQjBhR2x6TG5CbGNuTnZiaTVqYjJ4dmNpQTlQVDBnSjI5eVlXNW5aU2NnUHlCMGFHbHpMbkJsY25OdmJpNWpiMnh2Y2lBOUlDZHdkWEp3YkdVbklEb2diblZzYkZ4eVhHNWNjbHh1SUNBZ0lDQWdJQ0IwYUdsekxuTjBiM0FvS1R0Y2NseHVYSEpjYmlBZ0lDQWdJQ0FnYVdZZ0tIUm9hWE11Y0dWeWMyOXVMbU52Ykc5eUlEMDlQU0FuY0hWeWNHeGxKeWtnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdkR2hwY3k1d1pYSnpiMjR1WTI5c2IzSWdQU0FuWjNKbFpXNG5PMXh5WEc0Z0lDQWdJQ0FnSUgwZ1pXeHpaU0I3WEhKY2JpQWdJQ0FnSUNBZ0lDQjBhR2x6TG5CbGNuTnZiaTVqYjJ4dmNpQTlJQ2R3ZFhKd2JHVW5PMXh5WEc0Z0lDQWdJQ0FnSUgxY2NseHVYSEpjYmlBZ0lDQWdJSDFjY2x4dUlDQWdJQ0FnYVhSbGJTNXVaWGRRYjNNb2UzMHBMblZ3WkdGMFpTaDBhR2x6TG1OMGVDazdYSEpjYmlBZ0lDQjlLVHRjY2x4dVhISmNiaUFnSUNCMGFHbHpMbVZ1WlcxNU1pNXRZWEFvYVhSbGJTQTlQaUI3WEhKY2JpQWdJQ0FnSUd4bGRDQmthWE4wV0NBOUlFMWhkR2d1WVdKektHbDBaVzB1ZUNBdElIUm9hWE11Y0dWeWMyOXVMbmdwTzF4eVhHNGdJQ0FnSUNCc1pYUWdaR2x6ZEZrZ1BTQk5ZWFJvTG1GaWN5aHBkR1Z0TG5rZ0xTQjBhR2x6TG5CbGNuTnZiaTU1S1R0Y2NseHVYSEpjYmlBZ0lDQWdJR2xtSUNoa2FYTjBXQ0E4SURFd01DQW1KaUJrYVhOMFdTQThJREV3TUNrZ2UxeHlYRzRnSUNBZ0lDQWdJQzh2SUdsMFpXMHVZMjlzYjNJZ1BTQW5jbWRpS0RJd01Td2dNeklzSURjektTYzdYSEpjYmx4eVhHNGdJQ0FnSUNBZ0lHbDBaVzB1WVc1bmNua2dQU0IwY25WbE8xeHlYRzVjY2x4dUlDQWdJQ0FnSUNCcGRHVnRMbTVsZDFCdmN5aDdYSEpjYmlBZ0lDQWdJQ0FnSUNCdVpYZFlPaUJwZEdWdExuZ2dMU0IwYUdsekxuQmxjbk52Ymk1NElDc2dNeUErSUdScGMzUllJQ1ltSUNGMGFHbHpMbkJsY25OdmJpNW9ZWE5RYjNkbGNpQS9JR2wwWlcwdWVDQXRNeUE2SUdsMFpXMHVlQ0FySURNc1hISmNiaUFnSUNBZ0lDQWdJQ0J1WlhkWk9pQnBkR1Z0TG5rZ0xTQjBhR2x6TG5CbGNuTnZiaTU1SUNzZ015QStJR1JwYzNSWUlDWW1JQ0YwYUdsekxuQmxjbk52Ymk1b1lYTlFiM2RsY2lBL0lHbDBaVzB1ZVNBdE15QTZJR2wwWlcwdWVTQXJJRE1zWEhKY2JpQWdJQ0FnSUNBZ2ZTazdYSEpjYmx4eVhHNWNjbHh1SUNBZ0lDQWdmU0JsYkhObElIdGNjbHh1SUNBZ0lDQWdJQ0F2THlCcGRHVnRMbU52Ykc5eUlEMGdKM0puWWlneE1qUXNJREV3TXl3Z01qSTNLU2M3WEhKY2JpQWdJQ0FnSUNBZ2FYUmxiUzVoYm1keWVTQTlJR1poYkhObE8xeHlYRzRnSUNBZ0lDQWdJR2wwWlcwdWJtVjNVRzl6S0h0OUtUdGNjbHh1SUNBZ0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUNBZ2FXWWdLR1JwYzNSWUlEd2dNakFnSmlZZ1pHbHpkRmtnUENBeU1Da2dlMXh5WEc0Z0lDQWdJQ0FnSUdsbUlDaDBhR2x6TG5CbGNuTnZiaTVvWVhOUWIzZGxjaWtnZTF4eVhHNGdJQ0FnSUNBZ0lDQWdZMjl1YzNRZ2FXNWtaWGdnUFNCMGFHbHpMbVZ1WlcxNU1pNXBibVJsZUU5bUtHbDBaVzBwTzF4eVhHNGdJQ0FnSUNBZ0lDQWdkR2hwY3k1bGJtVnRlVEl1YzNCc2FXTmxLR2x1WkdWNExDQXhLVHRjY2x4dUlDQWdJQ0FnSUNBZ0lISmxkSFZ5Ymp0Y2NseHVJQ0FnSUNBZ0lDQjlYSEpjYmx4eVhHNWNjbHh1SUNBZ0lDQWdJQ0IwYUdsekxuQmxjbk52Ymk1amIyeHZjaUE5UFQwZ0oyOXlZVzVuWlNjZ1B5QjBhR2x6TG5CbGNuTnZiaTVqYjJ4dmNpQTlJQ2R3ZFhKd2JHVW5JRG9nYm5Wc2JGeHlYRzVjY2x4dUlDQWdJQ0FnSUNCMGFHbHpMbk4wYjNBb0tUdGNjbHh1WEhKY2JpQWdJQ0FnSUNBZ2FXWWdLSFJvYVhNdWNHVnljMjl1TG1OdmJHOXlJRDA5UFNBbmNIVnljR3hsSnlrZ2UxeHlYRzRnSUNBZ0lDQWdJQ0FnZEdocGN5NXdaWEp6YjI0dVkyOXNiM0lnUFNBblozSmxaVzRuTzF4eVhHNGdJQ0FnSUNBZ0lIMGdaV3h6WlNCN1hISmNiaUFnSUNBZ0lDQWdJQ0IwYUdsekxuQmxjbk52Ymk1amIyeHZjaUE5SUNkd2RYSndiR1VuTzF4eVhHNGdJQ0FnSUNBZ0lIMWNjbHh1WEhKY2JpQWdJQ0FnSUgxY2NseHVJQ0FnSUNBZ2FYUmxiUzUxY0dSaGRHVW9kR2hwY3k1amRIZ3BPMXh5WEc0Z0lDQWdmU2xjY2x4dVhISmNibHh5WEc0Z0lDQWdkR2hwY3k1aWIyNTFjeTV0WVhBb2FYUmxiU0E5UGlCN1hISmNiaUFnSUNBZ0lHeGxkQ0JrYVhOMFdDQTlJRTFoZEdndVlXSnpLR2wwWlcwdWVDQXRJSFJvYVhNdWNHVnljMjl1TG5ncE8xeHlYRzRnSUNBZ0lDQnNaWFFnWkdsemRGa2dQU0JOWVhSb0xtRmljeWhwZEdWdExua2dMU0IwYUdsekxuQmxjbk52Ymk1NUtUdGNjbHh1WEhKY2JpQWdJQ0FnSUM4dklHTnZibk52YkdVdWJHOW5LR1JwYzNSWUtUdGNjbHh1SUNBZ0lDQWdMeThnWTI5dWMyOXNaUzVzYjJjb1pHbHpkRmtwTzF4eVhHNWNjbHh1SUNBZ0lDQWdhV1lnS0dScGMzUllJRHdnTWpBZ0ppWWdaR2x6ZEZrZ1BDQXlNQ2tnZTF4eVhHNGdJQ0FnSUNBZ0lHbG1JQ2doZEdocGN5NXdaWEp6YjI0dWFHRnpVRzkzWlhJcElIdGNjbHh1SUNBZ0lDQWdJQ0FnSUhSb2FYTXVjR1Z5YzI5dUxuQnZkMlZ5S0NrN1hISmNiaUFnSUNBZ0lDQWdJQ0IwYUdsekxtVjJaVzUwUW5WekxuUnlhV2RuWlhJb0oyZGhiV1U2Y0c5M1pYSW5LVHRjY2x4dUlDQWdJQ0FnSUNCOVhISmNibHh5WEc0Z0lDQWdJQ0FnSUdOdmJuTjBJR2x1WkdWNElEMGdkR2hwY3k1aWIyNTFjeTVwYm1SbGVFOW1LR2wwWlcwcE8xeHlYRzRnSUNBZ0lDQWdJSFJvYVhNdVltOXVkWE11YzNCc2FXTmxLR2x1WkdWNExDQXhLVHRjY2x4dUlDQWdJQ0FnZlZ4eVhHNWNjbHh1SUNBZ0lDQWdMeThnSUNCMGFHbHpMbkJsY25OdmJpNWpiMnh2Y2lBOVBUMGdKMjl5WVc1blpTY2dQeUIwYUdsekxuQmxjbk52Ymk1amIyeHZjaUE5SUNkd2RYSndiR1VuSURvZ2JuVnNiRnh5WEc0Z0lDQWdJQ0F2TDF4eVhHNGdJQ0FnSUNBdkx5QWdJSFJvYVhNdWMzUnZjQ2dwTzF4eVhHNGdJQ0FnSUNBdkwxeHlYRzRnSUNBZ0lDQXZMeUFnSUdsbUlDaDBhR2x6TG5CbGNuTnZiaTVqYjJ4dmNpQTlQVDBnSjNCMWNuQnNaU2NwSUh0Y2NseHVJQ0FnSUNBZ0x5OGdJQ0FnSUhSb2FYTXVjR1Z5YzI5dUxtTnZiRzl5SUQwZ0oyZHlaV1Z1Snp0Y2NseHVJQ0FnSUNBZ0x5OGdJQ0I5SUdWc2MyVWdlMXh5WEc0Z0lDQWdJQ0F2THlBZ0lDQWdkR2hwY3k1d1pYSnpiMjR1WTI5c2IzSWdQU0FuY0hWeWNHeGxKenRjY2x4dUlDQWdJQ0FnTHk4Z0lDQjlYSEpjYmlBZ0lDQWdJQzh2WEhKY2JpQWdJQ0FnSUM4dklIMWNjbHh1SUNBZ0lDQWdhWFJsYlM1dVpYZFFiM01vZTMwcExuVndaR0YwWlNoMGFHbHpMbU4wZUNrN1hISmNiaUFnSUNCOUtUdGNjbHh1SUNCOVhISmNibHh5WEc1Y2NseHVJQ0F2THlCamFHVmphME52YjNKa2N5aHdiR0Y1WlhKRGIyOXlaSE1zSUNsY2NseHVmVnh5WEc1Y2NseHVaWGh3YjNKMElHUmxabUYxYkhRZ1IyRnRaVVpwWld4a08xeHlYRzRpWFgwPVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9jb21wb25lbnRzXFxcXEdhbWVGaWVsZC5qc1wiLFwiL2NvbXBvbmVudHNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBMb2dnZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIExvZ2dlcihlbGVtZW50LCBldmVudEJ1cykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBMb2dnZXIpO1xuXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLmV2ZW50QnVzID0gZXZlbnRCdXM7XG5cbiAgICB0aGlzLmhhbmRsZU5ld0V2ZW50ID0gdGhpcy5oYW5kbGVOZXdFdmVudC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2xlYXIgPSB0aGlzLmNsZWFyLmJpbmQodGhpcyk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoTG9nZ2VyLCBbe1xuICAgIGtleTogJ2hhbmRsZU5ld0V2ZW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlTmV3RXZlbnQoZXZlbnQsIGNsYXNzTmFtZSkge1xuICAgICAgdmFyIGxvZ2dlclVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XG5cbiAgICAgIGxvZ2dlclVsLmlubmVySFRNTCArPSAnPGxpIGNsYXNzPScgKyAoY2xhc3NOYW1lIHx8ICcnKSArICc+JyArIGV2ZW50ICsgJzwvbGk+JztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjbGVhcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgICAgdmFyIGxvZ2dlclVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XG4gICAgICBsb2dnZXJVbC5pbm5lckhUTUwgPSAnJztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXJMb2dnZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXJMb2dnZXIoKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuaW5uZXJIVE1MICs9ICdcXG4gICAgICA8dWw+PC91bD5cXG4gICAgJztcblxuICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2xvZ2dlcicpO1xuXG4gICAgICB0aGlzLmV2ZW50QnVzLm9uKCdnYW1lOmxvZ2dlcicsIHRoaXMuaGFuZGxlTmV3RXZlbnQpO1xuICAgICAgdGhpcy5ldmVudEJ1cy5vbignZ2FtZTpsb2dnZXItY2xlYXInLCB0aGlzLmNsZWFyKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gTG9nZ2VyO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBMb2dnZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJa3h2WjJkbGNpNXFjeUpkTENKdVlXMWxjeUk2V3lKTWIyZG5aWElpTENKbGJHVnRaVzUwSWl3aVpYWmxiblJDZFhNaUxDSm9ZVzVrYkdWT1pYZEZkbVZ1ZENJc0ltSnBibVFpTENKamJHVmhjaUlzSW1WMlpXNTBJaXdpWTJ4aGMzTk9ZVzFsSWl3aWJHOW5aMlZ5Vld3aUxDSnhkV1Z5ZVZObGJHVmpkRzl5SWl3aWFXNXVaWEpJVkUxTUlpd2lZMnhoYzNOTWFYTjBJaXdpWVdSa0lpd2liMjRpWFN3aWJXRndjR2x1WjNNaU9pSTdPenM3T3pzN096czdTVUZCVFVFc1RUdEJRVU5LTEd0Q1FVRlpReXhQUVVGYUxFVkJRWEZDUXl4UlFVRnlRaXhGUVVFclFqdEJRVUZCT3p0QlFVTTNRaXhUUVVGTFJDeFBRVUZNTEVkQlFXVkJMRTlCUVdZN1FVRkRRU3hUUVVGTFF5eFJRVUZNTEVkQlFXZENRU3hSUVVGb1FqczdRVUZGUVN4VFFVRkxReXhqUVVGTUxFZEJRWE5DTEV0QlFVdEJMR05CUVV3c1EwRkJiMEpETEVsQlFYQkNMRU5CUVhsQ0xFbEJRWHBDTEVOQlFYUkNPMEZCUTBFc1UwRkJTME1zUzBGQlRDeEhRVUZoTEV0QlFVdEJMRXRCUVV3c1EwRkJWMFFzU1VGQldDeERRVUZuUWl4SlFVRm9RaXhEUVVGaU8wRkJRMFE3T3pzN2JVTkJSV05GTEVzc1JVRkJUME1zVXl4RlFVRlhPMEZCUXk5Q0xGVkJRVTFETEZkQlFWY3NTMEZCUzFBc1QwRkJUQ3hEUVVGaFVTeGhRVUZpTEVOQlFUSkNMRWxCUVROQ0xFTkJRV3BDT3p0QlFVVkJSQ3hsUVVGVFJTeFRRVUZVTEc5Q1FVRnRRMGdzWVVGQllTeEZRVUZvUkN4VlFVRnpSRVFzUzBGQmRFUTdRVUZEUkRzN096UkNRVVZQTzBGQlEwNHNWVUZCVFVVc1YwRkJWeXhMUVVGTFVDeFBRVUZNTEVOQlFXRlJMR0ZCUVdJc1EwRkJNa0lzU1VGQk0wSXNRMEZCYWtJN1FVRkRRVVFzWlVGQlUwVXNVMEZCVkN4SFFVRnhRaXhGUVVGeVFqdEJRVU5FT3pzN2JVTkJSV003UVVGRFlpeFhRVUZMVkN4UFFVRk1MRU5CUVdGVExGTkJRV0k3TzBGQlNVRXNWMEZCUzFRc1QwRkJUQ3hEUVVGaFZTeFRRVUZpTEVOQlFYVkNReXhIUVVGMlFpeERRVUV5UWl4UlFVRXpRanM3UVVGRlFTeFhRVUZMVml4UlFVRk1MRU5CUVdOWExFVkJRV1FzUTBGQmFVSXNZVUZCYWtJc1JVRkJaME1zUzBGQlMxWXNZMEZCY2tNN1FVRkRRU3hYUVVGTFJDeFJRVUZNTEVOQlFXTlhMRVZCUVdRc1EwRkJhVUlzYlVKQlFXcENMRVZCUVhORExFdEJRVXRTTEV0QlFUTkRPMEZCUTBRN096czdPenRyUWtGSFdVd3NUU0lzSW1acGJHVWlPaUpNYjJkblpYSXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lKamJHRnpjeUJNYjJkblpYSWdlMXh5WEc0Z0lHTnZibk4wY25WamRHOXlLR1ZzWlcxbGJuUXNJR1YyWlc1MFFuVnpLU0I3WEhKY2JpQWdJQ0IwYUdsekxtVnNaVzFsYm5RZ1BTQmxiR1Z0Wlc1ME8xeHlYRzRnSUNBZ2RHaHBjeTVsZG1WdWRFSjFjeUE5SUdWMlpXNTBRblZ6TzF4eVhHNWNjbHh1SUNBZ0lIUm9hWE11YUdGdVpHeGxUbVYzUlhabGJuUWdQU0IwYUdsekxtaGhibVJzWlU1bGQwVjJaVzUwTG1KcGJtUW9kR2hwY3lrN1hISmNiaUFnSUNCMGFHbHpMbU5zWldGeUlEMGdkR2hwY3k1amJHVmhjaTVpYVc1a0tIUm9hWE1wTzF4eVhHNGdJSDFjY2x4dVhISmNiaUFnYUdGdVpHeGxUbVYzUlhabGJuUW9aWFpsYm5Rc0lHTnNZWE56VG1GdFpTa2dlMXh5WEc0Z0lDQWdZMjl1YzNRZ2JHOW5aMlZ5Vld3Z1BTQjBhR2x6TG1Wc1pXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNpZ25kV3duS1R0Y2NseHVYSEpjYmlBZ0lDQnNiMmRuWlhKVmJDNXBibTVsY2toVVRVd2dLejBnWUR4c2FTQmpiR0Z6Y3owa2UyTnNZWE56VG1GdFpTQjhmQ0FuSjMwK0pIdGxkbVZ1ZEgwOEwyeHBQbUE3WEhKY2JpQWdmVnh5WEc1Y2NseHVJQ0JqYkdWaGNpZ3BJSHRjY2x4dUlDQWdJR052Ym5OMElHeHZaMmRsY2xWc0lEMGdkR2hwY3k1bGJHVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9KM1ZzSnlrN1hISmNiaUFnSUNCc2IyZG5aWEpWYkM1cGJtNWxja2hVVFV3Z1BTQW5KenRjY2x4dUlDQjlYSEpjYmx4eVhHNGdJSEpsYm1SbGNreHZaMmRsY2lncElIdGNjbHh1SUNBZ0lIUm9hWE11Wld4bGJXVnVkQzVwYm01bGNraFVUVXdnS3owZ1lGeHlYRzRnSUNBZ0lDQThkV3crUEM5MWJENWNjbHh1SUNBZ0lHQTdYSEpjYmx4eVhHNGdJQ0FnZEdocGN5NWxiR1Z0Wlc1MExtTnNZWE56VEdsemRDNWhaR1FvSjJ4dloyZGxjaWNwTzF4eVhHNWNjbHh1SUNBZ0lIUm9hWE11WlhabGJuUkNkWE11YjI0b0oyZGhiV1U2Ykc5bloyVnlKeXdnZEdocGN5NW9ZVzVrYkdWT1pYZEZkbVZ1ZENrN1hISmNiaUFnSUNCMGFHbHpMbVYyWlc1MFFuVnpMbTl1S0NkbllXMWxPbXh2WjJkbGNpMWpiR1ZoY2ljc0lIUm9hWE11WTJ4bFlYSXBYSEpjYmlBZ2ZWeHlYRzU5WEhKY2JseHlYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQk1iMmRuWlhJN1hISmNiaUpkZlE9PVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9jb21wb25lbnRzXFxcXExvZ2dlci5qc1wiLFwiL2NvbXBvbmVudHNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIE1lbnUgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIE1lbnUoZWxlbWVudCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBNZW51KTtcblxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoTWVudSwgW3tcbiAgICBrZXk6IFwicmVuZGVyTWVudVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXJNZW51KCkge1xuICAgICAgdGhpcy5lbGVtZW50LmlubmVySFRNTCA9IFwiXFxuICAgICAgPHVsPlxcbiAgICAgICAgPGxpPjxhIGhyZWY9XFxcIiNcXFwiPkhvbWU8L2E+PC9saT5cXG4gICAgICAgIDxsaT48YSBocmVmPVxcXCIjZ2FtZVxcXCI+R2FtZTwvYT48L2xpPlxcbiAgICAgICAgPGxpPjxhIGhyZWY9XFxcIiNzdGF0c1xcXCI+U3RhdGlzdGljczwvYT48L2xpPlxcbiAgICAgIDwvdWw+XFxuICAgIFwiO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBNZW51O1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBNZW51O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWsxbGJuVXVhbk1pWFN3aWJtRnRaWE1pT2xzaVRXVnVkU0lzSW1Wc1pXMWxiblFpTENKcGJtNWxja2hVVFV3aVhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN096czdPenM3U1VGQlRVRXNTVHRCUVVOS0xHZENRVUZaUXl4UFFVRmFMRVZCUVhGQ08wRkJRVUU3TzBGQlEyNUNMRk5CUVV0QkxFOUJRVXdzUjBGQlpVRXNUMEZCWmp0QlFVTkVPenM3TzJsRFFVVlpPMEZCUTFnc1YwRkJTMEVzVDBGQlRDeERRVUZoUXl4VFFVRmlPMEZCVDBRN096czdPenRyUWtGSFdVWXNTU0lzSW1acGJHVWlPaUpOWlc1MUxtcHpJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpWTJ4aGMzTWdUV1Z1ZFNCN1hISmNiaUFnWTI5dWMzUnlkV04wYjNJb1pXeGxiV1Z1ZENrZ2UxeHlYRzRnSUNBZ2RHaHBjeTVsYkdWdFpXNTBJRDBnWld4bGJXVnVkRHRjY2x4dUlDQjlYSEpjYmx4eVhHNGdJSEpsYm1SbGNrMWxiblVvS1NCN1hISmNiaUFnSUNCMGFHbHpMbVZzWlcxbGJuUXVhVzV1WlhKSVZFMU1JRDBnWUZ4eVhHNGdJQ0FnSUNBOGRXdytYSEpjYmlBZ0lDQWdJQ0FnUEd4cFBqeGhJR2h5WldZOVhDSWpYQ0krU0c5dFpUd3ZZVDQ4TDJ4cFBseHlYRzRnSUNBZ0lDQWdJRHhzYVQ0OFlTQm9jbVZtUFZ3aUkyZGhiV1ZjSWo1SFlXMWxQQzloUGp3dmJHaytYSEpjYmlBZ0lDQWdJQ0FnUEd4cFBqeGhJR2h5WldZOVhDSWpjM1JoZEhOY0lqNVRkR0YwYVhOMGFXTnpQQzloUGp3dmJHaytYSEpjYmlBZ0lDQWdJRHd2ZFd3K1hISmNiaUFnSUNCZ1hISmNiaUFnZlZ4eVhHNTlYSEpjYmx4eVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCTlpXNTFPMXh5WEc0aVhYMD1cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvY29tcG9uZW50c1xcXFxNZW51LmpzXCIsXCIvY29tcG9uZW50c1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEZJRUxEX1dJRFRIID0gd2luZG93LmlubmVyV2lkdGggKiAwLjg7XG52YXIgRklFTERfSEVJR0hUID0gNjAwO1xuXG52YXIgUGxheWVyID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBQbGF5ZXIoY3R4LCB3aWR0aCwgaGVpZ2h0LCBjb2xvciwgeCwgeSwgZXZlbnRCdXMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUGxheWVyKTtcblxuICAgIHRoaXMuY3R4ID0gY3R4O1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG5cbiAgICB0aGlzLmV2ZW50QnVzID0gZXZlbnRCdXM7XG5cbiAgICB0aGlzLnNwZWVkID0gMDtcbiAgICB0aGlzLmFuZ2xlID0gMDtcbiAgICB0aGlzLm1vdmVBbmdsZSA9IDA7XG5cbiAgICB0aGlzLmltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFuaW1hbC10dXJ0bGUnKTtcblxuICAgIHRoaXMuaGFzUG93ZXIgPSBmYWxzZTtcblxuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhQbGF5ZXIsIFt7XG4gICAga2V5OiAncG93ZXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwb3dlcigpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIC8vIHRoaXMuY29sb3IgPSAncmdiKDI0NCwgMTM5LCAxMzkpJztcbiAgICAgIGlmICh0aGlzLmhhc1Bvd2VyKSByZXR1cm47XG4gICAgICB0aGlzLmhlaWdodCArPSAxMDtcbiAgICAgIHRoaXMud2lkdGggKz0gMTA7XG4gICAgICB0aGlzLnNwZWVkICs9IDEwO1xuXG4gICAgICB0aGlzLmV2ZW50QnVzLnRyaWdnZXIoJ2dhbWU6bG9nZ2VyJywgWydZb3UgaGF2ZSBwb3dlciBmb3IgMTAgc2VjIScsICdib251cyddKTtcblxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIF90aGlzLmV2ZW50QnVzLnRyaWdnZXIoJ2dhbWU6bG9nZ2VyJywgWyczIHNlY29uZHMgYW5kIHBvd2VyIHdpbGwgZ29uZScsICdib251cyddKTtcbiAgICAgIH0sIDEwMDAgKiA3KTtcblxuICAgICAgdGhpcy5oYXNQb3dlciA9IHRydWU7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMuaGFzUG93ZXIgPSBmYWxzZTtcbiAgICAgICAgX3RoaXMuY29sb3IgPSAnb3JhbmdlJztcbiAgICAgICAgX3RoaXMuaGVpZ2h0IC09IDEwO1xuICAgICAgICBfdGhpcy53aWR0aCAtPSAxMDtcbiAgICAgICAgX3RoaXMuc3BlZWQgLT0gMTA7XG4gICAgICB9LCAxMDAwMCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAndXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlKGN0eCkge1xuXG4gICAgICAvLyBjdHguc2F2ZSgpO1xuICAgICAgLy9cbiAgICAgIC8vIGN0eC50cmFuc2xhdGUodGhpcy54LCB0aGlzLnkpO1xuXG4gICAgICAvLyAvLyBjdHgucm90YXRlKHRoaXMuYW5nbGUpO1xuICAgICAgLy8gLy8gY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAvLyBjdHguZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIDEwLCAxMCk7XG4gICAgICAvLyBjdHgucmVzdG9yZSgpO1xuXG4gICAgICBjdHguc2F2ZSgpO1xuICAgICAgY3R4LnRyYW5zbGF0ZSh0aGlzLngsIHRoaXMueSk7XG4gICAgICAvLyBjdHgucm90YXRlKHRoaXMuYW5nbGUpO1xuICAgICAgY3R4LnJvdGF0ZSh0aGlzLmFuZ2xlIC0gTWF0aC5QSSAvIDIpO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XG4gICAgICAvLyBjdHguZmlsbFJlY3QodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgIGlmICh0aGlzLmhhc1Bvd2VyKSB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFuaW1hbC10dXJ0bGUtMicpLCB0aGlzLndpZHRoIC8gLTIgKyAxMCwgdGhpcy5oZWlnaHQgLyAtMiArIDEwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMud2lkdGggLyAtMiArIDEwLCB0aGlzLmhlaWdodCAvIC0yICsgMTAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgIH1cbiAgICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ25ld1BvcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG5ld1BvcyhvcHRpb25zKSB7XG4gICAgICB0aGlzLm1vdmVBbmdsZSA9IDA7XG4gICAgICBpZiAodGhpcy5oYXNQb3dlcikge1xuICAgICAgICB0aGlzLnNwZWVkID0gNTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3BlZWQgPSAwO1xuICAgICAgfVxuICAgICAgb3B0aW9ucy5sZWZ0ICYmICh0aGlzLm1vdmVBbmdsZSA9IC01KTtcbiAgICAgIG9wdGlvbnMucmlnaHQgJiYgKHRoaXMubW92ZUFuZ2xlID0gNSk7XG4gICAgICBvcHRpb25zLnVwICYmICh0aGlzLnNwZWVkICs9IDUpO1xuICAgICAgb3B0aW9ucy5kb3duICYmICh0aGlzLnNwZWVkICs9IC01KTtcblxuICAgICAgdGhpcy5hbmdsZSArPSB0aGlzLm1vdmVBbmdsZSAqIE1hdGguUEkgLyAxODA7XG4gICAgICB0aGlzLnggKz0gdGhpcy5zcGVlZCAqIE1hdGguc2luKHRoaXMuYW5nbGUpO1xuICAgICAgdGhpcy55IC09IHRoaXMuc3BlZWQgKiBNYXRoLmNvcyh0aGlzLmFuZ2xlKTtcblxuICAgICAgaWYgKHRoaXMueCA+IEZJRUxEX1dJRFRIKSB7XG4gICAgICAgIHRoaXMueCA9IDA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMueCA8IDApIHtcbiAgICAgICAgdGhpcy54ID0gRklFTERfV0lEVEg7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy55ID4gRklFTERfSEVJR0hUKSB7XG4gICAgICAgIHRoaXMueSA9IDA7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMueSA8IDApIHtcbiAgICAgICAgdGhpcy55ID0gRklFTERfSEVJR0hUO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFBsYXllcjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gUGxheWVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWxCc1lYbGxjaTVxY3lKZExDSnVZVzFsY3lJNld5SkdTVVZNUkY5WFNVUlVTQ0lzSW5kcGJtUnZkeUlzSW1sdWJtVnlWMmxrZEdnaUxDSkdTVVZNUkY5SVJVbEhTRlFpTENKUWJHRjVaWElpTENKamRIZ2lMQ0ozYVdSMGFDSXNJbWhsYVdkb2RDSXNJbU52Ykc5eUlpd2llQ0lzSW5raUxDSmxkbVZ1ZEVKMWN5SXNJbk53WldWa0lpd2lZVzVuYkdVaUxDSnRiM1psUVc1bmJHVWlMQ0pwYldGblpTSXNJbVJ2WTNWdFpXNTBJaXdpY1hWbGNubFRaV3hsWTNSdmNpSXNJbWhoYzFCdmQyVnlJaXdpZEhKcFoyZGxjaUlzSW5ObGRGUnBiV1Z2ZFhRaUxDSnpZWFpsSWl3aWRISmhibk5zWVhSbElpd2ljbTkwWVhSbElpd2lUV0YwYUNJc0lsQkpJaXdpWm1sc2JGTjBlV3hsSWl3aVpISmhkMGx0WVdkbElpd2ljbVZ6ZEc5eVpTSXNJbTl3ZEdsdmJuTWlMQ0pzWldaMElpd2ljbWxuYUhRaUxDSjFjQ0lzSW1SdmQyNGlMQ0p6YVc0aUxDSmpiM01pWFN3aWJXRndjR2x1WjNNaU9pSTdPenM3T3pzN096czdRVUZCUVN4SlFVRkpRU3hqUVVGalF5eFBRVUZQUXl4VlFVRlFMRWRCUVc5Q0xFZEJRWFJETzBGQlEwRXNTVUZCU1VNc1pVRkJaU3hIUVVGdVFqczdTVUZGVFVNc1RUdEJRVU5LTEd0Q1FVRlpReXhIUVVGYUxFVkJRV2xDUXl4TFFVRnFRaXhGUVVGM1FrTXNUVUZCZUVJc1JVRkJaME5ETEV0QlFXaERMRVZCUVhWRFF5eERRVUYyUXl4RlFVRXdRME1zUTBGQk1VTXNSVUZCTmtORExGRkJRVGRETEVWQlFYVkVPMEZCUVVFN08wRkJRM0pFTEZOQlFVdE9MRWRCUVV3c1IwRkJWMEVzUjBGQldEdEJRVU5CTEZOQlFVdERMRXRCUVV3c1IwRkJZVUVzUzBGQllqdEJRVU5CTEZOQlFVdERMRTFCUVV3c1IwRkJZMEVzVFVGQlpEdEJRVU5CTEZOQlFVdERMRXRCUVV3c1IwRkJZVUVzUzBGQllqczdRVUZGUVN4VFFVRkxSeXhSUVVGTUxFZEJRV2RDUVN4UlFVRm9RanM3UVVGRlFTeFRRVUZMUXl4TFFVRk1MRWRCUVdFc1EwRkJZanRCUVVOQkxGTkJRVXRETEV0QlFVd3NSMEZCWVN4RFFVRmlPMEZCUTBFc1UwRkJTME1zVTBGQlRDeEhRVUZwUWl4RFFVRnFRanM3UVVGRlFTeFRRVUZMUXl4TFFVRk1MRWRCUVdGRExGTkJRVk5ETEdGQlFWUXNRMEZCZFVJc1owSkJRWFpDTEVOQlFXSTdPMEZCUlVFc1UwRkJTME1zVVVGQlRDeEhRVUZuUWl4TFFVRm9RanM3UVVGRlFTeFRRVUZMVkN4RFFVRk1MRWRCUVZOQkxFTkJRVlE3UVVGRFFTeFRRVUZMUXl4RFFVRk1MRWRCUVZOQkxFTkJRVlE3UVVGRFJEczdPenMwUWtGRlR6dEJRVUZCT3p0QlFVTk9PMEZCUTBFc1ZVRkJTU3hMUVVGTFVTeFJRVUZVTEVWQlFXMUNPMEZCUTI1Q0xGZEJRVXRZTEUxQlFVd3NTVUZCWlN4RlFVRm1PMEZCUTBFc1YwRkJTMFFzUzBGQlRDeEpRVUZqTEVWQlFXUTdRVUZEUVN4WFFVRkxUU3hMUVVGTUxFbEJRV01zUlVGQlpEczdRVUZGUVN4WFFVRkxSQ3hSUVVGTUxFTkJRV05STEU5QlFXUXNRMEZCYzBJc1lVRkJkRUlzUlVGQmNVTXNRMEZCUXl3MFFrRkJSQ3hGUVVFclFpeFBRVUV2UWl4RFFVRnlRenM3UVVGRlFVTXNhVUpCUVZjc1dVRkJUVHRCUVVObUxHTkJRVXRVTEZGQlFVd3NRMEZCWTFFc1QwRkJaQ3hEUVVGelFpeGhRVUYwUWl4RlFVRnhReXhEUVVGRExDdENRVUZFTEVWQlFXdERMRTlCUVd4RExFTkJRWEpETzBGQlEwUXNUMEZHUkN4RlFVVkhMRTlCUVVzc1EwRkdVanM3UVVGSlFTeFhRVUZMUkN4UlFVRk1MRWRCUVdkQ0xFbEJRV2hDTzBGQlEwRkZMR2xDUVVGWExGbEJRVTA3UVVGRFppeGpRVUZMUml4UlFVRk1MRWRCUVdkQ0xFdEJRV2hDTzBGQlEwRXNZMEZCUzFZc1MwRkJUQ3hIUVVGaExGRkJRV0k3UVVGRFFTeGpRVUZMUkN4TlFVRk1MRWxCUVdVc1JVRkJaanRCUVVOQkxHTkJRVXRFTEV0QlFVd3NTVUZCWXl4RlFVRmtPMEZCUTBFc1kwRkJTMDBzUzBGQlRDeEpRVUZqTEVWQlFXUTdRVUZIUkN4UFFWSkVMRVZCVVVjc1MwRlNTRHRCUVZORU96czdNa0pCUlUxUUxFY3NSVUZCU3pzN1FVRkhWanRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkJSVUZCTEZWQlFVbG5RaXhKUVVGS08wRkJRMEZvUWl4VlFVRkphVUlzVTBGQlNpeERRVUZqTEV0QlFVdGlMRU5CUVc1Q0xFVkJRWE5DTEV0QlFVdERMRU5CUVROQ08wRkJRMEU3UVVGRFFVd3NWVUZCU1d0Q0xFMUJRVW9zUTBGQlZ5eExRVUZMVml4TFFVRk1MRWRCUVdGWExFdEJRVXRETEVWQlFVd3NSMEZCVlN4RFFVRnNRenRCUVVOQmNFSXNWVUZCU1hGQ0xGTkJRVW9zUjBGQlowSXNTMEZCUzJ4Q0xFdEJRWEpDTzBGQlEwRTdRVUZEUVN4VlFVRkpMRXRCUVV0VkxGRkJRVlFzUlVGQmJVSTdRVUZEYWtKaUxGbEJRVWx6UWl4VFFVRktMRU5CUVdOWUxGTkJRVk5ETEdGQlFWUXNRMEZCZFVJc2EwSkJRWFpDTEVOQlFXUXNSVUZCTUVRc1MwRkJTMWdzUzBGQlRDeEhRVUZoTEVOQlFVTXNRMEZCWkN4SFFVRnJRaXhGUVVFMVJTeEZRVUZuUml4TFFVRkxReXhOUVVGTUxFZEJRV01zUTBGQlF5eERRVUZtTEVkQlFXMUNMRVZCUVc1SExFVkJRWFZITEV0QlFVdEVMRXRCUVRWSExFVkJRVzFJTEV0QlFVdERMRTFCUVhoSU8wRkJRMFFzVDBGR1JDeE5RVVZQTzBGQlEweEdMRmxCUVVselFpeFRRVUZLTEVOQlFXTXNTMEZCUzFvc1MwRkJia0lzUlVGQk1FSXNTMEZCUzFRc1MwRkJUQ3hIUVVGaExFTkJRVU1zUTBGQlpDeEhRVUZyUWl4RlFVRTFReXhGUVVGblJDeExRVUZMUXl4TlFVRk1MRWRCUVdNc1EwRkJReXhEUVVGbUxFZEJRVzFDTEVWQlFXNUZMRVZCUVhWRkxFdEJRVXRFTEV0QlFUVkZMRVZCUVcxR0xFdEJRVXRETEUxQlFYaEdPMEZCUlVRN1FVRkRSRVlzVlVGQlNYVkNMRTlCUVVvN08wRkJSMEVzWVVGQlR5eEpRVUZRTzBGQlEwUTdPenN5UWtGRlRVTXNUeXhGUVVGVE8wRkJRMlFzVjBGQlMyWXNVMEZCVEN4SFFVRnBRaXhEUVVGcVFqdEJRVU5CTEZWQlFVa3NTMEZCUzBrc1VVRkJWQ3hGUVVGdFFqdEJRVU5xUWl4aFFVRkxUaXhMUVVGTUxFZEJRV0VzUTBGQllqdEJRVU5FTEU5QlJrUXNUVUZGVHp0QlFVTk1MR0ZCUVV0QkxFdEJRVXdzUjBGQllTeERRVUZpTzBGQlEwUTdRVUZEUkdsQ0xHTkJRVkZETEVsQlFWSXNTMEZCYVVJc1MwRkJTMmhDTEZOQlFVd3NSMEZCYVVJc1EwRkJReXhEUVVGdVF6dEJRVU5CWlN4alFVRlJSU3hMUVVGU0xFdEJRV3RDTEV0QlFVdHFRaXhUUVVGTUxFZEJRV2xDTEVOQlFXNURPMEZCUTBGbExHTkJRVkZITEVWQlFWSXNTMEZCWlN4TFFVRkxjRUlzUzBGQlRDeEpRVUZqTEVOQlFUZENPMEZCUTBGcFFpeGpRVUZSU1N4SlFVRlNMRXRCUVdsQ0xFdEJRVXR5UWl4TFFVRk1MRWxCUVdNc1EwRkJReXhEUVVGb1F6czdRVUZKUVN4WFFVRkxReXhMUVVGTUxFbEJRV01zUzBGQlMwTXNVMEZCVEN4SFFVRnBRbFVzUzBGQlMwTXNSVUZCZEVJc1IwRkJNa0lzUjBGQmVrTTdRVUZEUVN4WFFVRkxhRUlzUTBGQlRDeEpRVUZWTEV0QlFVdEhMRXRCUVV3c1IwRkJZVmtzUzBGQlMxVXNSMEZCVEN4RFFVRlRMRXRCUVV0eVFpeExRVUZrTEVOQlFYWkNPMEZCUTBFc1YwRkJTMGdzUTBGQlRDeEpRVUZWTEV0QlFVdEZMRXRCUVV3c1IwRkJZVmtzUzBGQlMxY3NSMEZCVEN4RFFVRlRMRXRCUVV0MFFpeExRVUZrTEVOQlFYWkNPenRCUVVWQkxGVkJRVWtzUzBGQlMwb3NRMEZCVEN4SFFVRlRWQ3hYUVVGaUxFVkJRVEJDTzBGQlEzaENMR0ZCUVV0VExFTkJRVXdzUjBGQlV5eERRVUZVTzBGQlEwUXNUMEZHUkN4TlFVVlBMRWxCUVVrc1MwRkJTMEVzUTBGQlRDeEhRVUZUTEVOQlFXSXNSVUZCWjBJN1FVRkRja0lzWVVGQlMwRXNRMEZCVEN4SFFVRlRWQ3hYUVVGVU8wRkJRMFE3UVVGRFJDeFZRVUZKTEV0QlFVdFZMRU5CUVV3c1IwRkJVMUFzV1VGQllpeEZRVUV5UWp0QlFVTjZRaXhoUVVGTFR5eERRVUZNTEVkQlFWTXNRMEZCVkR0QlFVTkVMRTlCUmtRc1RVRkZUeXhKUVVGSkxFdEJRVXRCTEVOQlFVd3NSMEZCVXl4RFFVRmlMRVZCUVdkQ08wRkJRM0pDTEdGQlFVdEJMRU5CUVV3c1IwRkJVMUFzV1VGQlZEdEJRVU5FTzBGQlEwUXNZVUZCVHl4SlFVRlFPMEZCUTBRN096czdPenRyUWtGSFdVTXNUU0lzSW1acGJHVWlPaUpRYkdGNVpYSXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lKMllYSWdSa2xGVEVSZlYwbEVWRWdnUFNCM2FXNWtiM2N1YVc1dVpYSlhhV1IwYUNBcUlEQXVPRHRjY2x4dWRtRnlJRVpKUlV4RVgwaEZTVWRJVkNBOUlEWXdNRHRjY2x4dVhISmNibU5zWVhOeklGQnNZWGxsY2lCN1hISmNiaUFnWTI5dWMzUnlkV04wYjNJb1kzUjRMQ0IzYVdSMGFDd2dhR1ZwWjJoMExDQmpiMnh2Y2l3Z2VDd2dlU3dnWlhabGJuUkNkWE1wSUh0Y2NseHVJQ0FnSUhSb2FYTXVZM1I0SUQwZ1kzUjRPMXh5WEc0Z0lDQWdkR2hwY3k1M2FXUjBhQ0E5SUhkcFpIUm9PMXh5WEc0Z0lDQWdkR2hwY3k1b1pXbG5hSFFnUFNCb1pXbG5hSFE3WEhKY2JpQWdJQ0IwYUdsekxtTnZiRzl5SUQwZ1kyOXNiM0k3WEhKY2JseHlYRzRnSUNBZ2RHaHBjeTVsZG1WdWRFSjFjeUE5SUdWMlpXNTBRblZ6TzF4eVhHNWNjbHh1SUNBZ0lIUm9hWE11YzNCbFpXUWdQU0F3TzF4eVhHNGdJQ0FnZEdocGN5NWhibWRzWlNBOUlEQTdYSEpjYmlBZ0lDQjBhR2x6TG0xdmRtVkJibWRzWlNBOUlEQTdYSEpjYmx4eVhHNGdJQ0FnZEdocGN5NXBiV0ZuWlNBOUlHUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvSnk1aGJtbHRZV3d0ZEhWeWRHeGxKeWs3WEhKY2JseHlYRzRnSUNBZ2RHaHBjeTVvWVhOUWIzZGxjaUE5SUdaaGJITmxPMXh5WEc1Y2NseHVJQ0FnSUhSb2FYTXVlQ0E5SUhnN1hISmNiaUFnSUNCMGFHbHpMbmtnUFNCNU8xeHlYRzRnSUgxY2NseHVYSEpjYmlBZ2NHOTNaWElvS1NCN1hISmNiaUFnSUNBdkx5QjBhR2x6TG1OdmJHOXlJRDBnSjNKbllpZ3lORFFzSURFek9Td2dNVE01S1NjN1hISmNiaUFnSUNCcFppQW9kR2hwY3k1b1lYTlFiM2RsY2lrZ2NtVjBkWEp1TzF4eVhHNGdJQ0FnZEdocGN5NW9aV2xuYUhRZ0t6MGdNVEE3WEhKY2JpQWdJQ0IwYUdsekxuZHBaSFJvSUNzOUlERXdPMXh5WEc0Z0lDQWdkR2hwY3k1emNHVmxaQ0FyUFNBeE1EdGNjbHh1WEhKY2JpQWdJQ0IwYUdsekxtVjJaVzUwUW5WekxuUnlhV2RuWlhJb0oyZGhiV1U2Ykc5bloyVnlKeXdnV3lkWmIzVWdhR0YyWlNCd2IzZGxjaUJtYjNJZ01UQWdjMlZqSVNjc0lDZGliMjUxY3lkZEtUdGNjbHh1WEhKY2JpQWdJQ0J6WlhSVWFXMWxiM1YwS0NncElEMCtJSHRjY2x4dUlDQWdJQ0FnZEdocGN5NWxkbVZ1ZEVKMWN5NTBjbWxuWjJWeUtDZG5ZVzFsT214dloyZGxjaWNzSUZzbk15QnpaV052Ym1SeklHRnVaQ0J3YjNkbGNpQjNhV3hzSUdkdmJtVW5MQ0FuWW05dWRYTW5YU2s3WEhKY2JpQWdJQ0I5TENBeE1EQXdLamNwTzF4eVhHNWNjbHh1SUNBZ0lIUm9hWE11YUdGelVHOTNaWElnUFNCMGNuVmxPMXh5WEc0Z0lDQWdjMlYwVkdsdFpXOTFkQ2dvS1NBOVBpQjdYSEpjYmlBZ0lDQWdJSFJvYVhNdWFHRnpVRzkzWlhJZ1BTQm1ZV3h6WlR0Y2NseHVJQ0FnSUNBZ2RHaHBjeTVqYjJ4dmNpQTlJQ2R2Y21GdVoyVW5PMXh5WEc0Z0lDQWdJQ0IwYUdsekxtaGxhV2RvZENBdFBTQXhNRHRjY2x4dUlDQWdJQ0FnZEdocGN5NTNhV1IwYUNBdFBTQXhNRHRjY2x4dUlDQWdJQ0FnZEdocGN5NXpjR1ZsWkNBdFBTQXhNRHRjY2x4dVhISmNibHh5WEc0Z0lDQWdmU3dnTVRBd01EQXBPMXh5WEc0Z0lIMWNjbHh1WEhKY2JpQWdkWEJrWVhSbEtHTjBlQ2tnZTF4eVhHNWNjbHh1WEhKY2JpQWdJQ0F2THlCamRIZ3VjMkYyWlNncE8xeHlYRzRnSUNBZ0x5OWNjbHh1SUNBZ0lDOHZJR04wZUM1MGNtRnVjMnhoZEdVb2RHaHBjeTU0TENCMGFHbHpMbmtwTzF4eVhHNWNjbHh1SUNBZ0lDOHZJQzh2SUdOMGVDNXliM1JoZEdVb2RHaHBjeTVoYm1kc1pTazdYSEpjYmlBZ0lDQXZMeUF2THlCamRIZ3VabWxzYkZOMGVXeGxJRDBnZEdocGN5NWpiMnh2Y2p0Y2NseHVJQ0FnSUM4dklHTjBlQzVtYVd4c1VtVmpkQ2gwYUdsekxuZ3NJSFJvYVhNdWVTd2dNVEFzSURFd0tUdGNjbHh1SUNBZ0lDOHZJR04wZUM1eVpYTjBiM0psS0NrN1hISmNibHh5WEc0Z0lDQWdZM1I0TG5OaGRtVW9LVHRjY2x4dUlDQWdJR04wZUM1MGNtRnVjMnhoZEdVb2RHaHBjeTU0TENCMGFHbHpMbmtwTzF4eVhHNGdJQ0FnTHk4Z1kzUjRMbkp2ZEdGMFpTaDBhR2x6TG1GdVoyeGxLVHRjY2x4dUlDQWdJR04wZUM1eWIzUmhkR1VvZEdocGN5NWhibWRzWlNBdElFMWhkR2d1VUVrZ0x5QXlLVHRjY2x4dUlDQWdJR04wZUM1bWFXeHNVM1I1YkdVZ1BTQjBhR2x6TG1OdmJHOXlPMXh5WEc0Z0lDQWdMeThnWTNSNExtWnBiR3hTWldOMEtIUm9hWE11ZDJsa2RHZ3NJSFJvYVhNdWFHVnBaMmgwTENCMGFHbHpMbmRwWkhSb0xDQjBhR2x6TG1obGFXZG9kQ2s3WEhKY2JpQWdJQ0JwWmlBb2RHaHBjeTVvWVhOUWIzZGxjaWtnZTF4eVhHNGdJQ0FnSUNCamRIZ3VaSEpoZDBsdFlXZGxLR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb0p5NWhibWx0WVd3dGRIVnlkR3hsTFRJbktTd2dkR2hwY3k1M2FXUjBhQ0F2SUMweUlDc2dNVEFzSUhSb2FYTXVhR1ZwWjJoMElDOGdMVElnS3lBeE1Dd2dkR2hwY3k1M2FXUjBhQ3dnZEdocGN5NW9aV2xuYUhRcE8xeHlYRzRnSUNBZ2ZTQmxiSE5sSUh0Y2NseHVJQ0FnSUNBZ1kzUjRMbVJ5WVhkSmJXRm5aU2gwYUdsekxtbHRZV2RsTENCMGFHbHpMbmRwWkhSb0lDOGdMVElnS3lBeE1Dd2dkR2hwY3k1b1pXbG5hSFFnTHlBdE1pQXJJREV3TENCMGFHbHpMbmRwWkhSb0xDQjBhR2x6TG1obGFXZG9kQ2s3WEhKY2JseHlYRzRnSUNBZ2ZWeHlYRzRnSUNBZ1kzUjRMbkpsYzNSdmNtVW9LVHRjY2x4dVhISmNibHh5WEc0Z0lDQWdjbVYwZFhKdUlIUm9hWE03WEhKY2JpQWdmVnh5WEc1Y2NseHVJQ0J1WlhkUWIzTW9iM0IwYVc5dWN5a2dlMXh5WEc0Z0lDQWdkR2hwY3k1dGIzWmxRVzVuYkdVZ1BTQXdPMXh5WEc0Z0lDQWdhV1lnS0hSb2FYTXVhR0Z6VUc5M1pYSXBJSHRjY2x4dUlDQWdJQ0FnZEdocGN5NXpjR1ZsWkNBOUlEVTdYSEpjYmlBZ0lDQjlJR1ZzYzJVZ2UxeHlYRzRnSUNBZ0lDQjBhR2x6TG5Od1pXVmtJRDBnTUR0Y2NseHVJQ0FnSUgxY2NseHVJQ0FnSUc5d2RHbHZibk11YkdWbWRDQW1KaUFvZEdocGN5NXRiM1psUVc1bmJHVWdQU0F0TlNrN1hISmNiaUFnSUNCdmNIUnBiMjV6TG5KcFoyaDBJQ1ltSUNoMGFHbHpMbTF2ZG1WQmJtZHNaU0E5SURVcE8xeHlYRzRnSUNBZ2IzQjBhVzl1Y3k1MWNDQW1KaUFvZEdocGN5NXpjR1ZsWkNBclBTQTFLVHRjY2x4dUlDQWdJRzl3ZEdsdmJuTXVaRzkzYmlBbUppQW9kR2hwY3k1emNHVmxaQ0FyUFNBdE5TazdYSEpjYmx4eVhHNWNjbHh1WEhKY2JpQWdJQ0IwYUdsekxtRnVaMnhsSUNzOUlIUm9hWE11Ylc5MlpVRnVaMnhsSUNvZ1RXRjBhQzVRU1NBdklERTRNRHRjY2x4dUlDQWdJSFJvYVhNdWVDQXJQU0IwYUdsekxuTndaV1ZrSUNvZ1RXRjBhQzV6YVc0b2RHaHBjeTVoYm1kc1pTazdYSEpjYmlBZ0lDQjBhR2x6TG5rZ0xUMGdkR2hwY3k1emNHVmxaQ0FxSUUxaGRHZ3VZMjl6S0hSb2FYTXVZVzVuYkdVcE8xeHlYRzVjY2x4dUlDQWdJR2xtSUNoMGFHbHpMbmdnUGlCR1NVVk1SRjlYU1VSVVNDa2dlMXh5WEc0Z0lDQWdJQ0IwYUdsekxuZ2dQU0F3TzF4eVhHNGdJQ0FnZlNCbGJITmxJR2xtSUNoMGFHbHpMbmdnUENBd0tTQjdYSEpjYmlBZ0lDQWdJSFJvYVhNdWVDQTlJRVpKUlV4RVgxZEpSRlJJTzF4eVhHNGdJQ0FnZlZ4eVhHNGdJQ0FnYVdZZ0tIUm9hWE11ZVNBK0lFWkpSVXhFWDBoRlNVZElWQ2tnZTF4eVhHNGdJQ0FnSUNCMGFHbHpMbmtnUFNBd08xeHlYRzRnSUNBZ2ZTQmxiSE5sSUdsbUlDaDBhR2x6TG5rZ1BDQXdLU0I3WEhKY2JpQWdJQ0FnSUhSb2FYTXVlU0E5SUVaSlJVeEVYMGhGU1VkSVZEdGNjbHh1SUNBZ0lIMWNjbHh1SUNBZ0lISmxkSFZ5YmlCMGFHbHpPMXh5WEc0Z0lIMWNjbHh1ZlZ4eVhHNWNjbHh1Wlhod2IzSjBJR1JsWm1GMWJIUWdVR3hoZVdWeU8xeHlYRzRpWFgwPVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9jb21wb25lbnRzXFxcXFBsYXllci5qc1wiLFwiL2NvbXBvbmVudHNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBQb3dlckxpbmUgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFBvd2VyTGluZShlbGVtZW50LCBldmVudEJ1cykge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQb3dlckxpbmUpO1xuXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLmV2ZW50QnVzID0gZXZlbnRCdXM7XG5cbiAgICB0aGlzLmFjdGl2YXRlID0gdGhpcy5hY3RpdmF0ZS5iaW5kKHRoaXMpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFBvd2VyTGluZSwgW3tcbiAgICBrZXk6ICdhY3RpdmF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xuICAgICAgdmFyIHByb2dyZXNzQmFyID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzcy1iYXInKTtcblxuICAgICAgdmFyIHdpZHRoID0gMTAwO1xuICAgICAgcHJvZ3Jlc3NCYXIuc3R5bGUud2lkdGggPSB3aWR0aCArICclJztcblxuICAgICAgdmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICBwcm9ncmVzc0Jhci5zdHlsZS53aWR0aCA9IHdpZHRoICsgJyUnO1xuICAgICAgICAvLyB3aWR0aCA9PT0gMTAwID8gd2lkdGggLT0gMjAgOiB3aWR0aCAtPSAxMDtcbiAgICAgICAgd2lkdGggLT0gMTA7XG4gICAgICB9LCAxMDAwKTtcblxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xuICAgICAgfSwgMTAwMCAqIDEwKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdyZW5kZXJQb3dlckxpbmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXJQb3dlckxpbmUoKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuaW5uZXJIVE1MID0gJ1xcbiAgICAgIDxoMz5Qb3dlciBsaW5lPC9oMz5cXG4gICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3NcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcy1iYXIgcHJvZ3Jlc3MtYmFyLXdhcm5pbmdcIiByb2xlPVwicHJvZ3Jlc3NiYXJcIlxcbiAgICAgICAgICAgIGFyaWEtdmFsdWVub3c9XCI2MFwiXFxuICAgICAgICAgICAgYXJpYS12YWx1ZW1pbj1cIjBcIiBhcmlhLXZhbHVlbWF4PVwiMTAwXCI+PC9kaXY+XFxuXFxuICAgICAgPC9kaXY+XFxuICAgICc7XG5cbiAgICAgIHRoaXMuZXZlbnRCdXMub24oJ2dhbWU6cG93ZXInLCB0aGlzLmFjdGl2YXRlKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gUG93ZXJMaW5lO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBQb3dlckxpbmU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbEJ2ZDJWeVRHbHVaUzVxY3lKZExDSnVZVzFsY3lJNld5SlFiM2RsY2t4cGJtVWlMQ0psYkdWdFpXNTBJaXdpWlhabGJuUkNkWE1pTENKaFkzUnBkbUYwWlNJc0ltSnBibVFpTENKd2NtOW5jbVZ6YzBKaGNpSXNJbkYxWlhKNVUyVnNaV04wYjNJaUxDSjNhV1IwYUNJc0luTjBlV3hsSWl3aWRHbHRaWElpTENKelpYUkpiblJsY25aaGJDSXNJbk5sZEZScGJXVnZkWFFpTENKamJHVmhja2x1ZEdWeWRtRnNJaXdpYVc1dVpYSklWRTFNSWl3aWIyNGlYU3dpYldGd2NHbHVaM01pT2lJN096czdPenM3T3pzN1NVRkJUVUVzVXp0QlFVTktMSEZDUVVGWlF5eFBRVUZhTEVWQlFYRkNReXhSUVVGeVFpeEZRVUVyUWp0QlFVRkJPenRCUVVNM1FpeFRRVUZMUkN4UFFVRk1MRWRCUVdWQkxFOUJRV1k3UVVGRFFTeFRRVUZMUXl4UlFVRk1MRWRCUVdkQ1FTeFJRVUZvUWpzN1FVRkZRU3hUUVVGTFF5eFJRVUZNTEVkQlFXZENMRXRCUVV0QkxGRkJRVXdzUTBGQlkwTXNTVUZCWkN4RFFVRnRRaXhKUVVGdVFpeERRVUZvUWp0QlFVTkVPenM3T3l0Q1FVVlZPMEZCUTFRc1ZVRkJUVU1zWTBGQll5eExRVUZMU2l4UFFVRk1MRU5CUVdGTExHRkJRV0lzUTBGQk1rSXNaVUZCTTBJc1EwRkJjRUk3TzBGQlJVRXNWVUZCU1VNc1VVRkJVU3hIUVVGYU8wRkJRMEZHTEd0Q1FVRlpSeXhMUVVGYUxFTkJRV3RDUkN4TFFVRnNRaXhIUVVFd1FrRXNVVUZCVVN4SFFVRnNRenM3UVVGRlFTeFZRVUZOUlN4UlFVRlJReXhaUVVGWkxGbEJRVTA3UVVGRE9VSk1MRzlDUVVGWlJ5eExRVUZhTEVOQlFXdENSQ3hMUVVGc1FpeEhRVUV3UWtFc1VVRkJVU3hIUVVGc1F6dEJRVU5CTzBGQlEwRkJMR2xDUVVGVExFVkJRVlE3UVVGRFJDeFBRVXBoTEVWQlNWZ3NTVUZLVnl4RFFVRmtPenRCUVUxQlNTeHBRa0ZCVnl4WlFVRk5PMEZCUTJaRExITkNRVUZqU0N4TFFVRmtPMEZCUTBRc1QwRkdSQ3hGUVVWSExFOUJRVXNzUlVGR1VqdEJRVWRFT3pzN2MwTkJSV2xDTzBGQlEyaENMRmRCUVV0U0xFOUJRVXdzUTBGQllWa3NVMEZCWWpzN1FVRlZRU3hYUVVGTFdDeFJRVUZNTEVOQlFXTlpMRVZCUVdRc1EwRkJhVUlzV1VGQmFrSXNSVUZCSzBJc1MwRkJTMWdzVVVGQmNFTTdRVUZEUkRzN096czdPMnRDUVVkWlNDeFRJaXdpWm1sc1pTSTZJbEJ2ZDJWeVRHbHVaUzVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYkltTnNZWE56SUZCdmQyVnlUR2x1WlNCN1hISmNiaUFnWTI5dWMzUnlkV04wYjNJb1pXeGxiV1Z1ZEN3Z1pYWmxiblJDZFhNcElIdGNjbHh1SUNBZ0lIUm9hWE11Wld4bGJXVnVkQ0E5SUdWc1pXMWxiblE3WEhKY2JpQWdJQ0IwYUdsekxtVjJaVzUwUW5WeklEMGdaWFpsYm5SQ2RYTTdYSEpjYmx4eVhHNGdJQ0FnZEdocGN5NWhZM1JwZG1GMFpTQTlJSFJvYVhNdVlXTjBhWFpoZEdVdVltbHVaQ2gwYUdsektUdGNjbHh1SUNCOVhISmNibHh5WEc0Z0lHRmpkR2wyWVhSbEtDa2dlMXh5WEc0Z0lDQWdZMjl1YzNRZ2NISnZaM0psYzNOQ1lYSWdQU0IwYUdsekxtVnNaVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWduTG5CeWIyZHlaWE56TFdKaGNpY3BPMXh5WEc1Y2NseHVJQ0FnSUd4bGRDQjNhV1IwYUNBOUlERXdNRHRjY2x4dUlDQWdJSEJ5YjJkeVpYTnpRbUZ5TG5OMGVXeGxMbmRwWkhSb0lEMGdkMmxrZEdnZ0t5QW5KU2M3WEhKY2JseHlYRzRnSUNBZ1kyOXVjM1FnZEdsdFpYSWdQU0J6WlhSSmJuUmxjblpoYkNnb0tTQTlQaUI3WEhKY2JpQWdJQ0FnSUhCeWIyZHlaWE56UW1GeUxuTjBlV3hsTG5kcFpIUm9JRDBnZDJsa2RHZ2dLeUFuSlNjN1hISmNiaUFnSUNBZ0lDOHZJSGRwWkhSb0lEMDlQU0F4TURBZ1B5QjNhV1IwYUNBdFBTQXlNQ0E2SUhkcFpIUm9JQzA5SURFd08xeHlYRzRnSUNBZ0lDQjNhV1IwYUNBdFBTQXhNRHRjY2x4dUlDQWdJSDBzSURFd01EQXBPMXh5WEc1Y2NseHVJQ0FnSUhObGRGUnBiV1Z2ZFhRb0tDa2dQVDRnZTF4eVhHNGdJQ0FnSUNCamJHVmhja2x1ZEdWeWRtRnNLSFJwYldWeUtUdGNjbHh1SUNBZ0lIMHNJREV3TURBcU1UQXBPMXh5WEc0Z0lIMWNjbHh1WEhKY2JpQWdjbVZ1WkdWeVVHOTNaWEpNYVc1bEtDa2dlMXh5WEc0Z0lDQWdkR2hwY3k1bGJHVnRaVzUwTG1sdWJtVnlTRlJOVENBOUlHQmNjbHh1SUNBZ0lDQWdQR2d6UGxCdmQyVnlJR3hwYm1VOEwyZ3pQbHh5WEc0Z0lDQWdJQ0E4WkdsMklHTnNZWE56UFZ3aWNISnZaM0psYzNOY0lqNWNjbHh1SUNBZ0lDQWdJQ0E4WkdsMklHTnNZWE56UFZ3aWNISnZaM0psYzNNdFltRnlJSEJ5YjJkeVpYTnpMV0poY2kxM1lYSnVhVzVuWENJZ2NtOXNaVDFjSW5CeWIyZHlaWE56WW1GeVhDSmNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ1lYSnBZUzEyWVd4MVpXNXZkejFjSWpZd1hDSmNjbHh1SUNBZ0lDQWdJQ0FnSUNBZ1lYSnBZUzEyWVd4MVpXMXBiajFjSWpCY0lpQmhjbWxoTFhaaGJIVmxiV0Y0UFZ3aU1UQXdYQ0krUEM5a2FYWStYSEpjYmx4eVhHNGdJQ0FnSUNBOEwyUnBkajVjY2x4dUlDQWdJR0E3WEhKY2JseHlYRzRnSUNBZ2RHaHBjeTVsZG1WdWRFSjFjeTV2YmlnbloyRnRaVHB3YjNkbGNpY3NJSFJvYVhNdVlXTjBhWFpoZEdVcE8xeHlYRzRnSUgxY2NseHVmVnh5WEc1Y2NseHVaWGh3YjNKMElHUmxabUYxYkhRZ1VHOTNaWEpNYVc1bE8xeHlYRzRpWFgwPVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9jb21wb25lbnRzXFxcXFBvd2VyTGluZS5qc1wiLFwiL2NvbXBvbmVudHNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBTdGF0aXN0aWNzID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTdGF0aXN0aWNzKGVsZW1lbnQsIGV2ZW50QnVzKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFN0YXRpc3RpY3MpO1xuXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLmV2ZW50QnVzID0gZXZlbnRCdXM7XG4gICAgdGhpcy5kYXRhID0gW107XG5cbiAgICB0aGlzLnVwZGF0ZVN0YXRzID0gdGhpcy51cGRhdGVTdGF0cy5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5ldmVudEJ1cy5vbignc3RhdHM6dXBkYXRlJywgdGhpcy51cGRhdGVTdGF0cyk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoU3RhdGlzdGljcywgW3tcbiAgICBrZXk6ICd1cGRhdGVTdGF0cycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZVN0YXRzKG5ld1N0YXRzKSB7XG4gICAgICBjb25zb2xlLmxvZyhuZXdTdGF0cyk7XG4gICAgICB0aGlzLmRhdGEgPSBuZXdTdGF0cztcblxuICAgICAgdGhpcy5yZW5kZXJTdGF0aXN0aWNzKCk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAncmVuZGVyU3RhdGlzdGljcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlclN0YXRpc3RpY3MoKSB7XG4gICAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbGlzdC1ncm91cCcpO1xuICAgICAgdGhpcy5lbGVtZW50LmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAvLyBkZWJ1Z2dlcjtcblxuICAgICAgaWYgKCF0aGlzLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5pbm5lckhUTUwgPSAnPGxpPllvdSBoYXZlblxcJ3QgZ290IGFueSBzdGF0aXN0aWNzPC9saT4nO1xuICAgICAgICByZXR1cm47XG4gICAgICB9O1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmVsZW1lbnQuaW5uZXJIVE1MICs9ICc8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj4nICsgdGhpcy5kYXRhW2ldICsgJzwvbGk+JztcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gU3RhdGlzdGljcztcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gU3RhdGlzdGljcztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklsTjBZWFJwYzNScFkzTXVhbk1pWFN3aWJtRnRaWE1pT2xzaVUzUmhkR2x6ZEdsamN5SXNJbVZzWlcxbGJuUWlMQ0psZG1WdWRFSjFjeUlzSW1SaGRHRWlMQ0oxY0dSaGRHVlRkR0YwY3lJc0ltSnBibVFpTENKdmJpSXNJbTVsZDFOMFlYUnpJaXdpWTI5dWMyOXNaU0lzSW14dlp5SXNJbkpsYm1SbGNsTjBZWFJwYzNScFkzTWlMQ0pqYkdGemMweHBjM1FpTENKaFpHUWlMQ0pwYm01bGNraFVUVXdpTENKc1pXNW5kR2dpTENKcElsMHNJbTFoY0hCcGJtZHpJam9pT3pzN096czdPenM3TzBsQlFVMUJMRlU3UVVGRFNpeHpRa0ZCV1VNc1QwRkJXaXhGUVVGeFFrTXNVVUZCY2tJc1JVRkJLMEk3UVVGQlFUczdRVUZETjBJc1UwRkJTMFFzVDBGQlRDeEhRVUZsUVN4UFFVRm1PMEZCUTBFc1UwRkJTME1zVVVGQlRDeEhRVUZuUWtFc1VVRkJhRUk3UVVGRFFTeFRRVUZMUXl4SlFVRk1MRWRCUVZrc1JVRkJXanM3UVVGRlFTeFRRVUZMUXl4WFFVRk1MRWRCUVcxQ0xFdEJRVXRCTEZkQlFVd3NRMEZCYVVKRExFbEJRV3BDTEVOQlFYTkNMRWxCUVhSQ0xFTkJRVzVDT3p0QlFVVkJMRk5CUVV0SUxGRkJRVXdzUTBGQlkwa3NSVUZCWkN4RFFVRnBRaXhqUVVGcVFpeEZRVUZwUXl4TFFVRkxSaXhYUVVGMFF6dEJRVU5FT3pzN08yZERRVVZYUnl4UkxFVkJRVlU3UVVGRGNFSkRMR05CUVZGRExFZEJRVklzUTBGQldVWXNVVUZCV2p0QlFVTkJMRmRCUVV0S0xFbEJRVXdzUjBGQldVa3NVVUZCV2pzN1FVRkZRU3hYUVVGTFJ5eG5Ra0ZCVER0QlFVTkVPenM3ZFVOQlJXdENPMEZCUTJwQ0xGZEJRVXRVTEU5QlFVd3NRMEZCWVZVc1UwRkJZaXhEUVVGMVFrTXNSMEZCZGtJc1EwRkJNa0lzV1VGQk0wSTdRVUZEUVN4WFFVRkxXQ3hQUVVGTUxFTkJRV0ZaTEZOQlFXSXNSMEZCZVVJc1JVRkJla0k3TzBGQlJVRTdPMEZCUlVFc1ZVRkJTU3hEUVVGRExFdEJRVXRXTEVsQlFVd3NRMEZCVlZjc1RVRkJaaXhGUVVGMVFqdEJRVU55UWl4aFFVRkxZaXhQUVVGTUxFTkJRV0ZaTEZOQlFXSXNSMEZCZVVJc01FTkJRWHBDTzBGQlEwRTdRVUZEUkRzN1FVRkZSQ3hYUVVGTExFbEJRVWxGTEVsQlFVa3NRMEZCWWl4RlFVRm5Ra0VzU1VGQlNTeExRVUZMV2l4SlFVRk1MRU5CUVZWWExFMUJRVGxDTEVWQlFYTkRReXhIUVVGMFF5eEZRVUV5UXp0QlFVTjZReXhoUVVGTFpDeFBRVUZNTEVOQlFXRlpMRk5CUVdJc2NVTkJRWGxFTEV0QlFVdFdMRWxCUVV3c1EwRkJWVmtzUTBGQlZpeERRVUY2UkR0QlFVTkVPMEZCUTBZN096czdPenRyUWtGSldXWXNWU0lzSW1acGJHVWlPaUpUZEdGMGFYTjBhV056TG1weklpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lZMnhoYzNNZ1UzUmhkR2x6ZEdsamN5QjdYSEpjYmlBZ1kyOXVjM1J5ZFdOMGIzSW9aV3hsYldWdWRDd2daWFpsYm5SQ2RYTXBJSHRjY2x4dUlDQWdJSFJvYVhNdVpXeGxiV1Z1ZENBOUlHVnNaVzFsYm5RN1hISmNiaUFnSUNCMGFHbHpMbVYyWlc1MFFuVnpJRDBnWlhabGJuUkNkWE03WEhKY2JpQWdJQ0IwYUdsekxtUmhkR0VnUFNCYlhUdGNjbHh1WEhKY2JpQWdJQ0IwYUdsekxuVndaR0YwWlZOMFlYUnpJRDBnZEdocGN5NTFjR1JoZEdWVGRHRjBjeTVpYVc1a0tIUm9hWE1wTzF4eVhHNWNjbHh1SUNBZ0lIUm9hWE11WlhabGJuUkNkWE11YjI0b0ozTjBZWFJ6T25Wd1pHRjBaU2NzSUhSb2FYTXVkWEJrWVhSbFUzUmhkSE1wTzF4eVhHNGdJSDFjY2x4dVhISmNiaUFnZFhCa1lYUmxVM1JoZEhNb2JtVjNVM1JoZEhNcElIdGNjbHh1SUNBZ0lHTnZibk52YkdVdWJHOW5LRzVsZDFOMFlYUnpLVHRjY2x4dUlDQWdJSFJvYVhNdVpHRjBZU0E5SUc1bGQxTjBZWFJ6TzF4eVhHNWNjbHh1SUNBZ0lIUm9hWE11Y21WdVpHVnlVM1JoZEdsemRHbGpjeWdwTzF4eVhHNGdJSDFjY2x4dVhISmNiaUFnY21WdVpHVnlVM1JoZEdsemRHbGpjeWdwSUh0Y2NseHVJQ0FnSUhSb2FYTXVaV3hsYldWdWRDNWpiR0Z6YzB4cGMzUXVZV1JrS0Nkc2FYTjBMV2R5YjNWd0p5azdYSEpjYmlBZ0lDQjBhR2x6TG1Wc1pXMWxiblF1YVc1dVpYSklWRTFNSUQwZ0p5YzdYSEpjYmx4eVhHNGdJQ0FnTHk4Z1pHVmlkV2RuWlhJN1hISmNibHh5WEc0Z0lDQWdhV1lnS0NGMGFHbHpMbVJoZEdFdWJHVnVaM1JvS1NCN1hISmNiaUFnSUNBZ0lIUm9hWE11Wld4bGJXVnVkQzVwYm01bGNraFVUVXdnUFNBblBHeHBQbGx2ZFNCb1lYWmxibHhjSjNRZ1oyOTBJR0Z1ZVNCemRHRjBhWE4wYVdOelBDOXNhVDRuTzF4eVhHNGdJQ0FnSUNCeVpYUjFjbTQ3WEhKY2JpQWdJQ0I5TzF4eVhHNWNjbHh1SUNBZ0lHWnZjaUFvZG1GeUlHa2dQU0F3T3lCcElEd2dkR2hwY3k1a1lYUmhMbXhsYm1kMGFEc2dhU3NyS1NCN1hISmNiaUFnSUNBZ0lIUm9hWE11Wld4bGJXVnVkQzVwYm01bGNraFVUVXdnS3owZ1lEeHNhU0JqYkdGemN6MWNJbXhwYzNRdFozSnZkWEF0YVhSbGJWd2lQaVI3ZEdocGN5NWtZWFJoVzJsZGZUd3ZiR2srWUZ4eVhHNGdJQ0FnZlZ4eVhHNGdJSDFjY2x4dWZWeHlYRzVjY2x4dVhISmNibVY0Y0c5eWRDQmtaV1poZFd4MElGTjBZWFJwYzNScFkzTTdYSEpjYmlKZGZRPT1cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvY29tcG9uZW50c1xcXFxTdGF0aXN0aWNzLmpzXCIsXCIvY29tcG9uZW50c1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLy8gaW1wb3J0IHsgc2F2ZVRvU3RvcmFnZSB9IGZyb20gJy4uL3V0aWxzL2hlbHBlcnMnO1xuXG52YXIgVGltZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFRpbWVyKGVsZW1lbnQsIGV2ZW50QnVzKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBUaW1lcik7XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgIHRoaXMuZXZlbnRCdXMgPSBldmVudEJ1cztcblxuICAgIHRoaXMudGltZSA9IDA7XG5cbiAgICB0aGlzLnJ1blRpbWVyID0gdGhpcy5ydW5UaW1lci5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5ldmVudEJ1cy5vbignZ2FtZTpzdGFydCcsIHRoaXMucnVuVGltZXIpO1xuICAgIHRoaXMuZXZlbnRCdXMub24oJ2dhbWU6ZmluaXNoZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjbGVhckludGVydmFsKF90aGlzLnRpbWVyKTtcbiAgICAgIF90aGlzLmV2ZW50QnVzLnRyaWdnZXIoJ2dhbWU6bG9nZ2VyJywgWydDb25ncmF0cywgeW91IGhhdmUgJyArIChfdGhpcy50aW1lIC8gMTAwKS50b0ZpeGVkKDIpICsgJyBzZWNvbmRzLCB3YW50IHBsYXkgYWdhaW4/JywgJ2dhbWUtZmluaXNoZWQnXSk7XG4gICAgICAvLyBzYXZlVG9TdG9yYWdlKHRoaXMudGltZSAvIDEwMCwgbG9jYWxTdG9yYWdlKTtcbiAgICAgIF90aGlzLnRpbWUgPSAwO1xuICAgIH0pO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFRpbWVyLCBbe1xuICAgIGtleTogJ3J1blRpbWVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcnVuVGltZXIoKSB7XG4gICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgdmFyIHRpbWVyQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZWxlbWVudCk7XG4gICAgICB0aW1lckJsb2NrLmlubmVySFRNTCA9ICcnO1xuICAgICAgdGhpcy50aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMyLnRpbWUgKz0gMTtcbiAgICAgICAgdGltZXJCbG9jay5pbm5lckhUTUwgPSAoX3RoaXMyLnRpbWUgLyAxMDApLnRvRml4ZWQoMik7XG4gICAgICB9LCAxMCk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFRpbWVyO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBUaW1lcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklsUnBiV1Z5TG1weklsMHNJbTVoYldWeklqcGJJbFJwYldWeUlpd2laV3hsYldWdWRDSXNJbVYyWlc1MFFuVnpJaXdpZEdsdFpTSXNJbkoxYmxScGJXVnlJaXdpWW1sdVpDSXNJbTl1SWl3aVkyeGxZWEpKYm5SbGNuWmhiQ0lzSW5ScGJXVnlJaXdpZEhKcFoyZGxjaUlzSW5SdlJtbDRaV1FpTENKMGFXMWxja0pzYjJOcklpd2laRzlqZFcxbGJuUWlMQ0p4ZFdWeWVWTmxiR1ZqZEc5eUlpd2lhVzV1WlhKSVZFMU1JaXdpYzJWMFNXNTBaWEoyWVd3aVhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN096czdPenM3UVVGQlFUczdTVUZGVFVFc1N6dEJRVU5LTEdsQ1FVRlpReXhQUVVGYUxFVkJRWEZDUXl4UlFVRnlRaXhGUVVFclFqdEJRVUZCT3p0QlFVRkJPenRCUVVNM1FpeFRRVUZMUkN4UFFVRk1MRWRCUVdWQkxFOUJRV1k3UVVGRFFTeFRRVUZMUXl4UlFVRk1MRWRCUVdkQ1FTeFJRVUZvUWpzN1FVRkZRU3hUUVVGTFF5eEpRVUZNTEVkQlFWa3NRMEZCV2pzN1FVRkZRU3hUUVVGTFF5eFJRVUZNTEVkQlFXZENMRXRCUVV0QkxGRkJRVXdzUTBGQlkwTXNTVUZCWkN4RFFVRnRRaXhKUVVGdVFpeERRVUZvUWpzN1FVRkZRU3hUUVVGTFNDeFJRVUZNTEVOQlFXTkpMRVZCUVdRc1EwRkJhVUlzV1VGQmFrSXNSVUZCSzBJc1MwRkJTMFlzVVVGQmNFTTdRVUZEUVN4VFFVRkxSaXhSUVVGTUxFTkJRV05KTEVWQlFXUXNRMEZCYVVJc1pVRkJha0lzUlVGQmEwTXNXVUZCVFR0QlFVTjBRME1zYjBKQlFXTXNUVUZCUzBNc1MwRkJia0k3UVVGRFFTeFpRVUZMVGl4UlFVRk1MRU5CUVdOUExFOUJRV1FzUTBGQmMwSXNZVUZCZEVJc1JVRkJjVU1zZVVKQlFYVkNMRU5CUVVNc1RVRkJTMDRzU1VGQlRDeEhRVUZaTEVkQlFXSXNSVUZCYTBKUExFOUJRV3hDTEVOQlFUQkNMRU5CUVRGQ0xFTkJRWFpDTEdsRFFVRnBSaXhsUVVGcVJpeERRVUZ5UXp0QlFVTkJPMEZCUTBFc1dVRkJTMUFzU1VGQlRDeEhRVUZaTEVOQlFWbzdRVUZEUkN4TFFVeEVPMEZCVFVRN096czdLMEpCUlZVN1FVRkJRVHM3UVVGRFZDeFZRVUZOVVN4aFFVRmhReXhUUVVGVFF5eGhRVUZVTEVOQlFYVkNMRXRCUVV0YUxFOUJRVFZDTEVOQlFXNUNPMEZCUTBGVkxHbENRVUZYUnl4VFFVRllMRWRCUVhWQ0xFVkJRWFpDTzBGQlEwRXNWMEZCUzA0c1MwRkJUQ3hIUVVGaFR5eFpRVUZaTEZsQlFVMDdRVUZETjBJc1pVRkJTMW9zU1VGQlRDeEpRVUZoTEVOQlFXSTdRVUZEUVZFc2JVSkJRVmRITEZOQlFWZ3NSMEZCZFVJc1EwRkJReXhQUVVGTFdDeEpRVUZNTEVkQlFWa3NSMEZCWWl4RlFVRnJRazhzVDBGQmJFSXNRMEZCTUVJc1EwRkJNVUlzUTBGQmRrSTdRVUZEUkN4UFFVaFpMRVZCUjFZc1JVRklWU3hEUVVGaU8wRkJTVVE3T3pzN096dHJRa0ZIV1ZZc1N5SXNJbVpwYkdVaU9pSlVhVzFsY2k1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaTh2SUdsdGNHOXlkQ0I3SUhOaGRtVlViMU4wYjNKaFoyVWdmU0JtY205dElDY3VMaTkxZEdsc2N5OW9aV3h3WlhKekp6dGNjbHh1WEhKY2JtTnNZWE56SUZScGJXVnlJSHRjY2x4dUlDQmpiMjV6ZEhKMVkzUnZjaWhsYkdWdFpXNTBMQ0JsZG1WdWRFSjFjeWtnZTF4eVhHNGdJQ0FnZEdocGN5NWxiR1Z0Wlc1MElEMGdaV3hsYldWdWREdGNjbHh1SUNBZ0lIUm9hWE11WlhabGJuUkNkWE1nUFNCbGRtVnVkRUoxY3p0Y2NseHVYSEpjYmlBZ0lDQjBhR2x6TG5ScGJXVWdQU0F3TzF4eVhHNWNjbHh1SUNBZ0lIUm9hWE11Y25WdVZHbHRaWElnUFNCMGFHbHpMbkoxYmxScGJXVnlMbUpwYm1Rb2RHaHBjeWs3WEhKY2JseHlYRzRnSUNBZ2RHaHBjeTVsZG1WdWRFSjFjeTV2YmlnbloyRnRaVHB6ZEdGeWRDY3NJSFJvYVhNdWNuVnVWR2x0WlhJcE8xeHlYRzRnSUNBZ2RHaHBjeTVsZG1WdWRFSjFjeTV2YmlnbloyRnRaVHBtYVc1cGMyaGxaQ2NzSUNncElEMCtJSHRjY2x4dUlDQWdJQ0FnWTJ4bFlYSkpiblJsY25aaGJDaDBhR2x6TG5ScGJXVnlLVHRjY2x4dUlDQWdJQ0FnZEdocGN5NWxkbVZ1ZEVKMWN5NTBjbWxuWjJWeUtDZG5ZVzFsT214dloyZGxjaWNzSUZ0Z1EyOXVaM0poZEhNc0lIbHZkU0JvWVhabElDUjdLSFJvYVhNdWRHbHRaU0F2SURFd01Da3VkRzlHYVhobFpDZ3lLWDBnYzJWamIyNWtjeXdnZDJGdWRDQndiR0Y1SUdGbllXbHVQMkFzSUNkbllXMWxMV1pwYm1semFHVmtKMTBwTzF4eVhHNGdJQ0FnSUNBdkx5QnpZWFpsVkc5VGRHOXlZV2RsS0hSb2FYTXVkR2x0WlNBdklERXdNQ3dnYkc5allXeFRkRzl5WVdkbEtUdGNjbHh1SUNBZ0lDQWdkR2hwY3k1MGFXMWxJRDBnTUR0Y2NseHVJQ0FnSUgwcE8xeHlYRzRnSUgxY2NseHVYSEpjYmlBZ2NuVnVWR2x0WlhJb0tTQjdYSEpjYmlBZ0lDQmpiMjV6ZENCMGFXMWxja0pzYjJOcklEMGdaRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2loMGFHbHpMbVZzWlcxbGJuUXBPMXh5WEc0Z0lDQWdkR2x0WlhKQ2JHOWpheTVwYm01bGNraFVUVXdnUFNBbkp6dGNjbHh1SUNBZ0lIUm9hWE11ZEdsdFpYSWdQU0J6WlhSSmJuUmxjblpoYkNnb0tTQTlQaUI3WEhKY2JpQWdJQ0FnSUhSb2FYTXVkR2x0WlNBclBTQXhPMXh5WEc0Z0lDQWdJQ0IwYVcxbGNrSnNiMk5yTG1sdWJtVnlTRlJOVENBOUlDaDBhR2x6TG5ScGJXVWdMeUF4TURBcExuUnZSbWw0WldRb01pazdYSEpjYmlBZ0lDQjlMQ0F4TUNrN1hISmNiaUFnZlZ4eVhHNTlYSEpjYmx4eVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCVWFXMWxjanRjY2x4dUlsMTlcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvY29tcG9uZW50c1xcXFxUaW1lci5qc1wiLFwiL2NvbXBvbmVudHNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBfaW5kZXggPSByZXF1aXJlKCcuL3JvdXRlcy9pbmRleCcpO1xuXG52YXIgX2dhbWUgPSByZXF1aXJlKCcuL3JvdXRlcy9nYW1lJyk7XG5cbnZhciBfc3RhdHMgPSByZXF1aXJlKCcuL3JvdXRlcy9zdGF0cycpO1xuXG52YXIgX3JvdXRlciA9IHJlcXVpcmUoJy4vdXRpbHMvcm91dGVyJyk7XG5cbnZhciBfcm91dGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JvdXRlcik7XG5cbnZhciBfRXZlbnRCdXMgPSByZXF1aXJlKCcuL3V0aWxzL0V2ZW50QnVzJyk7XG5cbnZhciBfRXZlbnRCdXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfRXZlbnRCdXMpO1xuXG52YXIgX01lbnUgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvTWVudScpO1xuXG52YXIgX01lbnUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfTWVudSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciByb3V0ZXMgPSBbX2luZGV4LmluZGV4LCBfZ2FtZS5nYW1lLCBfc3RhdHMuc3RhdHNdO1xuXG52YXIgZXZlbnRCdXMgPSBuZXcgX0V2ZW50QnVzMi5kZWZhdWx0KCk7XG5cbm5ldyBfcm91dGVyMi5kZWZhdWx0KHsgcm91dGVzOiByb3V0ZXMsIGV2ZW50QnVzOiBldmVudEJ1cyB9KTtcblxudmFyIG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpO1xubmV3IF9NZW51Mi5kZWZhdWx0KG1lbnUpLnJlbmRlck1lbnUoKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltWmhhMlZmWWpZME56bGhPVGd1YW5NaVhTd2libUZ0WlhNaU9sc2ljbTkxZEdWeklpd2laWFpsYm5SQ2RYTWlMQ0p0Wlc1MUlpd2laRzlqZFcxbGJuUWlMQ0p4ZFdWeWVWTmxiR1ZqZEc5eUlpd2ljbVZ1WkdWeVRXVnVkU0pkTENKdFlYQndhVzVuY3lJNklqczdRVUZCUVRzN1FVRkRRVHM3UVVGRFFUczdRVUZGUVRzN096dEJRVU5CT3pzN08wRkJSVUU3T3pzN096dEJRVVZCTEVsQlFVMUJMRk5CUVZNc2QwTkJRV1k3TzBGQlJVRXNTVUZCVFVNc1YwRkJWeXgzUWtGQmFrSTdPMEZCUlVFc2NVSkJRVmNzUlVGQlEwUXNZMEZCUkN4RlFVRlRReXhyUWtGQlZDeEZRVUZZT3p0QlFVVkJMRWxCUVUxRExFOUJRVTlETEZOQlFWTkRMR0ZCUVZRc1EwRkJkVUlzVDBGQmRrSXNRMEZCWWp0QlFVTkJMRzFDUVVGVFJpeEpRVUZVTEVWQlFXVkhMRlZCUVdZaUxDSm1hV3hsSWpvaVptRnJaVjlpTmpRM09XRTVPQzVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYkltbHRjRzl5ZENCN0lHbHVaR1Y0SUgwZ1puSnZiU0FuTGk5eWIzVjBaWE12YVc1a1pYZ25PMXh5WEc1cGJYQnZjblFnZXlCbllXMWxJSDBnWm5KdmJTQW5MaTl5YjNWMFpYTXZaMkZ0WlNjN1hISmNibWx0Y0c5eWRDQjdJSE4wWVhSeklIMGdabkp2YlNBbkxpOXliM1YwWlhNdmMzUmhkSE1uTzF4eVhHNWNjbHh1YVcxd2IzSjBJRkp2ZFhSbGNpQm1jbTl0SUNjdUwzVjBhV3h6TDNKdmRYUmxjaWM3WEhKY2JtbHRjRzl5ZENCRmRtVnVkRUoxY3lCbWNtOXRJQ2N1TDNWMGFXeHpMMFYyWlc1MFFuVnpKenRjY2x4dVhISmNibWx0Y0c5eWRDQk5aVzUxSUdaeWIyMGdKeTR2WTI5dGNHOXVaVzUwY3k5TlpXNTFKenRjY2x4dVhISmNibU52Ym5OMElISnZkWFJsY3lBOUlGdHBibVJsZUN3Z1oyRnRaU3dnYzNSaGRITmRPMXh5WEc1Y2NseHVZMjl1YzNRZ1pYWmxiblJDZFhNZ1BTQnVaWGNnUlhabGJuUkNkWE1vS1R0Y2NseHVYSEpjYm01bGR5QlNiM1YwWlhJb2UzSnZkWFJsY3l3Z1pYWmxiblJDZFhOOUtUdGNjbHh1WEhKY2JtTnZibk4wSUcxbGJuVWdQU0JrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eUtDY3ViV1Z1ZFNjcE8xeHlYRzV1WlhjZ1RXVnVkU2h0Wlc1MUtTNXlaVzVrWlhKTlpXNTFLQ2s3SWwxOVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9mYWtlX2I2NDc5YTk4LmpzXCIsXCIvXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmdhbWUgPSB1bmRlZmluZWQ7XG5cbnZhciBfR2FtZUZpZWxkID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9HYW1lRmllbGQnKTtcblxudmFyIF9HYW1lRmllbGQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfR2FtZUZpZWxkKTtcblxudmFyIF9QbGF5ZXIgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL1BsYXllcicpO1xuXG52YXIgX1BsYXllcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9QbGF5ZXIpO1xuXG52YXIgX0VuZW15ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9FbmVteScpO1xuXG52YXIgX0VuZW15MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0VuZW15KTtcblxudmFyIF9FbmVteTMgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL0VuZW15MicpO1xuXG52YXIgX0VuZW15NCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0VuZW15Myk7XG5cbnZhciBfQm9udXMgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL0JvbnVzJyk7XG5cbnZhciBfQm9udXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQm9udXMpO1xuXG52YXIgX1Bvd2VyTGluZSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvUG93ZXJMaW5lJyk7XG5cbnZhciBfUG93ZXJMaW5lMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1Bvd2VyTGluZSk7XG5cbnZhciBfVGltZXIgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL1RpbWVyJyk7XG5cbnZhciBfVGltZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVGltZXIpO1xuXG52YXIgX0xvZ2dlciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvTG9nZ2VyJyk7XG5cbnZhciBfTG9nZ2VyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0xvZ2dlcik7XG5cbnZhciBfaGVscGVycyA9IHJlcXVpcmUoJy4uL3V0aWxzL2hlbHBlcnMnKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGdhbWVPYmogPSB7fTtcblxudmFyIGdhbWUgPSB7XG4gICAgbmFtZTogJ2dhbWUnLFxuICAgIG1hdGNoOiAnZ2FtZScsXG4gICAgb25FbnRlcjogZnVuY3Rpb24gb25FbnRlcih1cmwsIGV2ZW50QnVzKSB7XG4gICAgICAgIHZhciBtYWluQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpO1xuICAgICAgICBtYWluQmxvY2suY2xhc3NMaXN0LnJlbW92ZSgnd2VsY29tZScsICdzdGF0aXN0aWNzJyk7XG4gICAgICAgIG1haW5CbG9jay5jbGFzc0xpc3QuYWRkKCdnYW1lJyk7XG5cbiAgICAgICAgbWFpbkJsb2NrLmlubmVySFRNTCA9ICdcXG4gICAgICA8aDI+R2FtZTwvaDI+XFxuICAgICc7XG5cbiAgICAgICAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBidXR0b24uaW5uZXJUZXh0ID0gJ1N0YXJ0IGdhbWUhJztcbiAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdidG4tc3VjY2VzcycpO1xuXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnRCdXMudHJpZ2dlcignZ2FtZTpuZXcnKTtcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuXG4gICAgICAgICAgICBnYW1lT2JqID0gbmV3IF9HYW1lRmllbGQyLmRlZmF1bHQoY2FudmFzLCB3aW5kb3cuaW5uZXJXaWR0aCAqIDAuOCwgNjAwLCBfUGxheWVyMi5kZWZhdWx0LCBfRW5lbXkyLmRlZmF1bHQsIGV2ZW50QnVzLCBfRW5lbXk0LmRlZmF1bHQsIF9Cb251czIuZGVmYXVsdCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBsb2dnZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbG9nZ2VyLmNsYXNzTGlzdC5hZGQoJ2NvbC1tZC0yJyk7XG5cbiAgICAgICAgdmFyIHRpbWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRpbWVyLmNsYXNzTGlzdC5hZGQoJ3RpbWVyJyk7XG4gICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgY2FudmFzLmNsYXNzTGlzdC5hZGQoJ2NvbC1tZC0xMCcpO1xuXG4gICAgICAgIHZhciBwb3dlckxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgICBuZXcgX1Bvd2VyTGluZTIuZGVmYXVsdChwb3dlckxpbmUsIGV2ZW50QnVzKS5yZW5kZXJQb3dlckxpbmUoKTtcblxuICAgICAgICB2YXIgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHJvdy5jbGFzc0xpc3QuYWRkKCdyb3cnKTtcblxuICAgICAgICBsb2dnZXIuYXBwZW5kKHRpbWVyKTtcblxuICAgICAgICByb3cuYXBwZW5kKGNhbnZhcywgbG9nZ2VyKTtcblxuICAgICAgICBtYWluQmxvY2suYXBwZW5kKGJ1dHRvbiwgcG93ZXJMaW5lLCByb3cpO1xuICAgICAgICBuZXcgX0xvZ2dlcjIuZGVmYXVsdChsb2dnZXIsIGV2ZW50QnVzKS5yZW5kZXJMb2dnZXIoKTtcblxuICAgICAgICBuZXcgX1RpbWVyMi5kZWZhdWx0KCcudGltZXInLCBldmVudEJ1cyk7XG5cbiAgICAgICAgZXZlbnRCdXMub24oJ2dhbWU6ZmluaXNoZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBidXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICgwLCBfaGVscGVycy5zYXZlVG9TdG9yYWdlKSgnc29tZSBkYXRhJywgbG9jYWxTdG9yYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBvbkxlYXZlOiBmdW5jdGlvbiBvbkxlYXZlKCkge31cbn07XG5cbmV4cG9ydHMuZ2FtZSA9IGdhbWU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbWRoYldVdWFuTWlYU3dpYm1GdFpYTWlPbHNpWjJGdFpVOWlhaUlzSW1kaGJXVWlMQ0p1WVcxbElpd2liV0YwWTJnaUxDSnZia1Z1ZEdWeUlpd2lkWEpzSWl3aVpYWmxiblJDZFhNaUxDSnRZV2x1UW14dlkyc2lMQ0prYjJOMWJXVnVkQ0lzSW5GMVpYSjVVMlZzWldOMGIzSWlMQ0pqYkdGemMweHBjM1FpTENKeVpXMXZkbVVpTENKaFpHUWlMQ0pwYm01bGNraFVUVXdpTENKaWRYUjBiMjRpTENKamNtVmhkR1ZGYkdWdFpXNTBJaXdpYVc1dVpYSlVaWGgwSWl3aVlXUmtSWFpsYm5STWFYTjBaVzVsY2lJc0ltVjJaVzUwSWl3aWRISnBaMmRsY2lJc0luUmhjbWRsZENJc0ltTmhiblpoY3lJc0luZHBibVJ2ZHlJc0ltbHVibVZ5VjJsa2RHZ2lMQ0pzYjJkblpYSWlMQ0owYVcxbGNpSXNJbkJ2ZDJWeVRHbHVaU0lzSW5KbGJtUmxjbEJ2ZDJWeVRHbHVaU0lzSW5KdmR5SXNJbUZ3Y0dWdVpDSXNJbkpsYm1SbGNreHZaMmRsY2lJc0ltOXVJaXdpYkc5allXeFRkRzl5WVdkbElpd2liMjVNWldGMlpTSmRMQ0p0WVhCd2FXNW5jeUk2SWpzN096czdPenRCUVVGQk96czdPMEZCUlVFN096czdRVUZEUVRzN096dEJRVU5CT3pzN08wRkJRMEU3T3pzN1FVRkZRVHM3T3p0QlFVVkJPenM3TzBGQlEwRTdPenM3UVVGSFFUczdPenRCUVVWQkxFbEJRVWxCTEZWQlFWVXNSVUZCWkRzN1FVRkZRU3hKUVVGTlF5eFBRVUZQTzBGQlExaERMRlZCUVUwc1RVRkVTenRCUVVWWVF5eFhRVUZQTEUxQlJrazdRVUZIV0VNc1YwRklWeXh0UWtGSFNFTXNSMEZJUnl4RlFVZEZReXhSUVVoR0xFVkJSMWs3UVVGRGNrSXNXVUZCVFVNc1dVRkJXVU1zVTBGQlUwTXNZVUZCVkN4RFFVRjFRaXhQUVVGMlFpeERRVUZzUWp0QlFVTkJSaXhyUWtGQlZVY3NVMEZCVml4RFFVRnZRa01zVFVGQmNFSXNRMEZCTWtJc1UwRkJNMElzUlVGQmMwTXNXVUZCZEVNN1FVRkRRVW9zYTBKQlFWVkhMRk5CUVZZc1EwRkJiMEpGTEVkQlFYQkNMRU5CUVhkQ0xFMUJRWGhDT3p0QlFVVkJUQ3hyUWtGQlZVMHNVMEZCVmpzN1FVRkpRU3haUVVGTlF5eFRRVUZUVGl4VFFVRlRUeXhoUVVGVUxFTkJRWFZDTEZGQlFYWkNMRU5CUVdZN1FVRkRRVVFzWlVGQlQwVXNVMEZCVUN4SFFVRnRRaXhoUVVGdVFqdEJRVU5CUml4bFFVRlBTaXhUUVVGUUxFTkJRV2xDUlN4SFFVRnFRaXhEUVVGeFFpeExRVUZ5UWl4RlFVRTBRaXhoUVVFMVFqczdRVUZGUVVVc1pVRkJUMGNzWjBKQlFWQXNRMEZCZDBJc1QwRkJlRUlzUlVGQmFVTXNWVUZCUTBNc1MwRkJSQ3hGUVVGWE8wRkJRekZEV2l4eFFrRkJVMkVzVDBGQlZDeERRVUZwUWl4VlFVRnFRanRCUVVOQlJDeHJRa0ZCVFVVc1RVRkJUaXhEUVVGaFZpeFRRVUZpTEVOQlFYVkNSU3hIUVVGMlFpeERRVUV5UWl4VlFVRXpRanM3UVVGSFFWb3NjMEpCUVZVc2QwSkJRV054UWl4TlFVRmtMRVZCUVhOQ1F5eFBRVUZQUXl4VlFVRlFMRWRCUVc5Q0xFZEJRVEZETEVWQlFTdERMRWRCUVM5RExIRkRRVUZ0UldwQ0xGRkJRVzVGTEcxRFFVRldPMEZCUTBRc1UwRk9SRHM3UVVGUlFTeFpRVUZOYTBJc1UwRkJVMmhDTEZOQlFWTlBMR0ZCUVZRc1EwRkJkVUlzUzBGQmRrSXNRMEZCWmp0QlFVTkJVeXhsUVVGUFpDeFRRVUZRTEVOQlFXbENSU3hIUVVGcVFpeERRVUZ4UWl4VlFVRnlRanM3UVVGRlFTeFpRVUZOWVN4UlFVRlJha0lzVTBGQlUwOHNZVUZCVkN4RFFVRjFRaXhMUVVGMlFpeERRVUZrTzBGQlEwRlZMR05CUVUxbUxGTkJRVTRzUTBGQlowSkZMRWRCUVdoQ0xFTkJRVzlDTEU5QlFYQkNPMEZCUTBFc1dVRkJUVk1zVTBGQlUySXNVMEZCVTA4c1lVRkJWQ3hEUVVGMVFpeFJRVUYyUWl4RFFVRm1PMEZCUTBGTkxHVkJRVTlZTEZOQlFWQXNRMEZCYVVKRkxFZEJRV3BDTEVOQlFYRkNMRmRCUVhKQ096dEJRVVZCTEZsQlFVMWpMRmxCUVZsc1FpeFRRVUZUVHl4aFFVRlVMRU5CUVhWQ0xFdEJRWFpDTEVOQlFXeENPenRCUVVWQkxHZERRVUZqVnl4VFFVRmtMRVZCUVhsQ2NFSXNVVUZCZWtJc1JVRkJiVU54UWl4bFFVRnVRenM3UVVGSFFTeFpRVUZOUXl4TlFVRk5jRUlzVTBGQlUwOHNZVUZCVkN4RFFVRjFRaXhMUVVGMlFpeERRVUZhTzBGQlEwRmhMRmxCUVVsc1FpeFRRVUZLTEVOQlFXTkZMRWRCUVdRc1EwRkJhMElzUzBGQmJFSTdPMEZCUlVGWkxHVkJRVTlMTEUxQlFWQXNRMEZCWTBvc1MwRkJaRHM3UVVGRlFVY3NXVUZCU1VNc1RVRkJTaXhEUVVGWFVpeE5RVUZZTEVWQlFXMUNSeXhOUVVGdVFqczdRVUZGUVdwQ0xHdENRVUZWYzBJc1RVRkJWaXhEUVVGcFFtWXNUVUZCYWtJc1JVRkJlVUpaTEZOQlFYcENMRVZCUVc5RFJTeEhRVUZ3UXp0QlFVTkJMRFpDUVVGWFNpeE5RVUZZTEVWQlFXMUNiRUlzVVVGQmJrSXNSVUZCTmtKM1FpeFpRVUUzUWpzN1FVRkhRU3cwUWtGQlZTeFJRVUZXTEVWQlFXOUNlRUlzVVVGQmNFSTdPMEZCUjBGQkxHbENRVUZUZVVJc1JVRkJWQ3hEUVVGWkxHVkJRVm9zUlVGQk5rSXNXVUZCVFR0QlFVTnFRMnBDTEcxQ1FVRlBTaXhUUVVGUUxFTkJRV2xDUXl4TlFVRnFRaXhEUVVGM1FpeFZRVUY0UWp0QlFVTkJMSGREUVVGakxGZEJRV1FzUlVGQk1rSnhRaXhaUVVFelFqdEJRVU5FTEZOQlNFUTdRVUZKUkN4TFFYWkVWVHRCUVhkRVdFTXNWMEY0UkZjc2NVSkJkMFJFTEVOQlFVVTdRVUY0UkVRc1EwRkJZanM3VVVFeVJGTm9ReXhKTEVkQlFVRkJMRWtpTENKbWFXeGxJam9pWjJGdFpTNXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSW1sdGNHOXlkQ0JIWVcxbFJtbGxiR1FnWm5KdmJTQW5MaTR2WTI5dGNHOXVaVzUwY3k5SFlXMWxSbWxsYkdRbk8xeHlYRzVjY2x4dWFXMXdiM0owSUZCc1lYbGxjaUJtY205dElDY3VMaTlqYjIxd2IyNWxiblJ6TDFCc1lYbGxjaWM3WEhKY2JtbHRjRzl5ZENCRmJtVnRlU0JtY205dElDY3VMaTlqYjIxd2IyNWxiblJ6TDBWdVpXMTVKenRjY2x4dWFXMXdiM0owSUVWdVpXMTVNaUJtY205dElDY3VMaTlqYjIxd2IyNWxiblJ6TDBWdVpXMTVNaWM3WEhKY2JtbHRjRzl5ZENCQ2IyNTFjeUJtY205dElDY3VMaTlqYjIxd2IyNWxiblJ6TDBKdmJuVnpKenRjY2x4dVhISmNibWx0Y0c5eWRDQlFiM2RsY2t4cGJtVWdabkp2YlNBbkxpNHZZMjl0Y0c5dVpXNTBjeTlRYjNkbGNreHBibVVuTzF4eVhHNWNjbHh1YVcxd2IzSjBJRlJwYldWeUlHWnliMjBnSnk0dUwyTnZiWEJ2Ym1WdWRITXZWR2x0WlhJbk8xeHlYRzVwYlhCdmNuUWdURzluWjJWeUlHWnliMjBnSnk0dUwyTnZiWEJ2Ym1WdWRITXZURzluWjJWeUp6dGNjbHh1WEhKY2JseHlYRzVwYlhCdmNuUWdleUJ6WVhabFZHOVRkRzl5WVdkbElIMGdabkp2YlNBbkxpNHZkWFJwYkhNdmFHVnNjR1Z5Y3ljN1hISmNibHh5WEc1c1pYUWdaMkZ0WlU5aWFpQTlJSHQ5TzF4eVhHNWNjbHh1WTI5dWMzUWdaMkZ0WlNBOUlIdGNjbHh1SUNCdVlXMWxPaUFuWjJGdFpTY3NYSEpjYmlBZ2JXRjBZMmc2SUNkbllXMWxKeXhjY2x4dUlDQnZia1Z1ZEdWeUtIVnliQ3dnWlhabGJuUkNkWE1wSUh0Y2NseHVJQ0FnSUdOdmJuTjBJRzFoYVc1Q2JHOWpheUE5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9KeTV0WVdsdUp5azdYSEpjYmlBZ0lDQnRZV2x1UW14dlkyc3VZMnhoYzNOTWFYTjBMbkpsYlc5MlpTZ25kMlZzWTI5dFpTY3NJQ2R6ZEdGMGFYTjBhV056SnlrN1hISmNiaUFnSUNCdFlXbHVRbXh2WTJzdVkyeGhjM05NYVhOMExtRmtaQ2duWjJGdFpTY3BPMXh5WEc1Y2NseHVJQ0FnSUcxaGFXNUNiRzlqYXk1cGJtNWxja2hVVFV3Z1BTQmdYSEpjYmlBZ0lDQWdJRHhvTWo1SFlXMWxQQzlvTWo1Y2NseHVJQ0FnSUdCY2NseHVYSEpjYmlBZ0lDQmpiMjV6ZENCaWRYUjBiMjRnUFNCa2IyTjFiV1Z1ZEM1amNtVmhkR1ZGYkdWdFpXNTBLQ2RpZFhSMGIyNG5LVHRjY2x4dUlDQWdJR0oxZEhSdmJpNXBibTVsY2xSbGVIUWdQU0FuVTNSaGNuUWdaMkZ0WlNFbk8xeHlYRzRnSUNBZ1luVjBkRzl1TG1Oc1lYTnpUR2x6ZEM1aFpHUW9KMkowYmljc0lDZGlkRzR0YzNWalkyVnpjeWNwTzF4eVhHNWNjbHh1SUNBZ0lHSjFkSFJ2Ymk1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5S0NkamJHbGpheWNzSUNobGRtVnVkQ2tnUFQ0Z2UxeHlYRzRnSUNBZ0lDQmxkbVZ1ZEVKMWN5NTBjbWxuWjJWeUtDZG5ZVzFsT201bGR5Y3BPMXh5WEc0Z0lDQWdJQ0JsZG1WdWRDNTBZWEpuWlhRdVkyeGhjM05NYVhOMExtRmtaQ2duWkdsellXSnNaV1FuS1R0Y2NseHVYSEpjYmx4eVhHNGdJQ0FnSUNCbllXMWxUMkpxSUQwZ2JtVjNJRWRoYldWR2FXVnNaQ2hqWVc1MllYTXNJSGRwYm1SdmR5NXBibTVsY2xkcFpIUm9JQ29nTUM0NExDQTJNREFzSUZCc1lYbGxjaXdnUlc1bGJYa3NJR1YyWlc1MFFuVnpMQ0JGYm1WdGVUSXNJRUp2Ym5WektUdGNjbHh1SUNBZ0lIMHBPMXh5WEc1Y2NseHVJQ0FnSUdOdmJuTjBJR3h2WjJkbGNpQTlJR1J2WTNWdFpXNTBMbU55WldGMFpVVnNaVzFsYm5Rb0oyUnBkaWNwTzF4eVhHNGdJQ0FnYkc5bloyVnlMbU5zWVhOelRHbHpkQzVoWkdRb0oyTnZiQzF0WkMweUp5azdYSEpjYmx4eVhHNGdJQ0FnWTI5dWMzUWdkR2x0WlhJZ1BTQmtiMk4xYldWdWRDNWpjbVZoZEdWRmJHVnRaVzUwS0Nka2FYWW5LVHRjY2x4dUlDQWdJSFJwYldWeUxtTnNZWE56VEdsemRDNWhaR1FvSjNScGJXVnlKeWs3WEhKY2JpQWdJQ0JqYjI1emRDQmpZVzUyWVhNZ1BTQmtiMk4xYldWdWRDNWpjbVZoZEdWRmJHVnRaVzUwS0NkallXNTJZWE1uS1R0Y2NseHVJQ0FnSUdOaGJuWmhjeTVqYkdGemMweHBjM1F1WVdSa0tDZGpiMnd0YldRdE1UQW5LVHRjY2x4dVhISmNiaUFnSUNCamIyNXpkQ0J3YjNkbGNreHBibVVnUFNCa2IyTjFiV1Z1ZEM1amNtVmhkR1ZGYkdWdFpXNTBLQ2RrYVhZbktUdGNjbHh1WEhKY2JpQWdJQ0J1WlhjZ1VHOTNaWEpNYVc1bEtIQnZkMlZ5VEdsdVpTd2daWFpsYm5SQ2RYTXBMbkpsYm1SbGNsQnZkMlZ5VEdsdVpTZ3BPMXh5WEc1Y2NseHVYSEpjYmlBZ0lDQmpiMjV6ZENCeWIzY2dQU0JrYjJOMWJXVnVkQzVqY21WaGRHVkZiR1Z0Wlc1MEtDZGthWFluS1R0Y2NseHVJQ0FnSUhKdmR5NWpiR0Z6YzB4cGMzUXVZV1JrS0NkeWIzY25LVHRjY2x4dVhISmNiaUFnSUNCc2IyZG5aWEl1WVhCd1pXNWtLSFJwYldWeUtWeHlYRzVjY2x4dUlDQWdJSEp2ZHk1aGNIQmxibVFvWTJGdWRtRnpMQ0JzYjJkblpYSXBPMXh5WEc1Y2NseHVJQ0FnSUcxaGFXNUNiRzlqYXk1aGNIQmxibVFvWW5WMGRHOXVMQ0J3YjNkbGNreHBibVVzSUhKdmR5azdYSEpjYmlBZ0lDQnVaWGNnVEc5bloyVnlLR3h2WjJkbGNpd2daWFpsYm5SQ2RYTXBMbkpsYm1SbGNreHZaMmRsY2lncE8xeHlYRzVjY2x4dVhISmNiaUFnSUNCdVpYY2dWR2x0WlhJb0p5NTBhVzFsY2ljc0lHVjJaVzUwUW5WektUdGNjbHh1WEhKY2JseHlYRzRnSUNBZ1pYWmxiblJDZFhNdWIyNG9KMmRoYldVNlptbHVhWE5vWldRbkxDQW9LU0E5UGlCN1hISmNiaUFnSUNBZ0lHSjFkSFJ2Ymk1amJHRnpjMHhwYzNRdWNtVnRiM1psS0Nka2FYTmhZbXhsWkNjcE8xeHlYRzRnSUNBZ0lDQnpZWFpsVkc5VGRHOXlZV2RsS0NkemIyMWxJR1JoZEdFbkxDQnNiMk5oYkZOMGIzSmhaMlVwTzF4eVhHNGdJQ0FnZlNsY2NseHVJQ0I5TEZ4eVhHNGdJRzl1VEdWaGRtVW9LU0I3ZlZ4eVhHNTlPMXh5WEc1Y2NseHVaWGh3YjNKMElIc2daMkZ0WlNCOU8xeHlYRzRpWFgwPVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9yb3V0ZXNcXFxcZ2FtZS5qc1wiLFwiL3JvdXRlc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBpbmRleCA9IHtcbiAgbmFtZTogJ2luZGV4JyxcbiAgbWF0Y2g6ICcnLFxuICBvbkVudGVyOiBmdW5jdGlvbiBvbkVudGVyKCkge1xuICAgIHZhciBtYWluQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpO1xuICAgIG1haW5CbG9jay5jbGFzc0xpc3QucmVtb3ZlKCdnYW1lJywgJ3N0YXRpc3RpY3MnKTtcbiAgICBtYWluQmxvY2suY2xhc3NMaXN0LmFkZCgnd2VsY29tZScpO1xuXG4gICAgbWFpbkJsb2NrLmlubmVySFRNTCA9ICdcXG4gICAgICA8aDI+SGVsbG8sIHdlbGNvbWUgdG8gZ2FtZSE8L2gyPlxcbiAgICAgIDxhIGhyZWY9XCIjZ2FtZVwiIGNsYXNzPVwiYnRuIGJ0bi13YXJuaW5nXCI+UGxheSE8L2E+XFxuICAgICc7XG4gIH1cbn07XG5cbmV4cG9ydHMuaW5kZXggPSBpbmRleDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltbHVaR1Y0TG1weklsMHNJbTVoYldWeklqcGJJbWx1WkdWNElpd2libUZ0WlNJc0ltMWhkR05vSWl3aWIyNUZiblJsY2lJc0ltMWhhVzVDYkc5amF5SXNJbVJ2WTNWdFpXNTBJaXdpY1hWbGNubFRaV3hsWTNSdmNpSXNJbU5zWVhOelRHbHpkQ0lzSW5KbGJXOTJaU0lzSW1Ga1pDSXNJbWx1Ym1WeVNGUk5UQ0pkTENKdFlYQndhVzVuY3lJNklqczdPenM3UVVGQlFTeEpRVUZOUVN4UlFVRlJPMEZCUTFwRExGRkJRVTBzVDBGRVRUdEJRVVZhUXl4VFFVRlBMRVZCUmtzN1FVRkhXa01zVTBGSVdTeHhRa0ZIUmp0QlFVTlNMRkZCUVUxRExGbEJRVmxETEZOQlFWTkRMR0ZCUVZRc1EwRkJkVUlzVDBGQmRrSXNRMEZCYkVJN1FVRkRRVVlzWTBGQlZVY3NVMEZCVml4RFFVRnZRa01zVFVGQmNFSXNRMEZCTWtJc1RVRkJNMElzUlVGQmJVTXNXVUZCYmtNN1FVRkRRVW9zWTBGQlZVY3NVMEZCVml4RFFVRnZRa1VzUjBGQmNFSXNRMEZCZDBJc1UwRkJlRUk3TzBGQlJVRk1MR05CUVZWTkxGTkJRVlk3UVVGSlJEdEJRVnBYTEVOQlFXUTdPMUZCWlZOV0xFc3NSMEZCUVVFc1N5SXNJbVpwYkdVaU9pSnBibVJsZUM1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJbU52Ym5OMElHbHVaR1Y0SUQwZ2UxeHlYRzRnSUc1aGJXVTZJQ2RwYm1SbGVDY3NYSEpjYmlBZ2JXRjBZMmc2SUNjbkxGeHlYRzRnSUc5dVJXNTBaWElvS1NCN1hISmNiaUFnSUNCamIyNXpkQ0J0WVdsdVFteHZZMnNnUFNCa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLQ2N1YldGcGJpY3BPMXh5WEc0Z0lDQWdiV0ZwYmtKc2IyTnJMbU5zWVhOelRHbHpkQzV5WlcxdmRtVW9KMmRoYldVbkxDQW5jM1JoZEdsemRHbGpjeWNwTzF4eVhHNGdJQ0FnYldGcGJrSnNiMk5yTG1Oc1lYTnpUR2x6ZEM1aFpHUW9KM2RsYkdOdmJXVW5LVHRjY2x4dVhISmNiaUFnSUNCdFlXbHVRbXh2WTJzdWFXNXVaWEpJVkUxTUlEMGdZRnh5WEc0Z0lDQWdJQ0E4YURJK1NHVnNiRzhzSUhkbGJHTnZiV1VnZEc4Z1oyRnRaU0U4TDJneVBseHlYRzRnSUNBZ0lDQThZU0JvY21WbVBWd2lJMmRoYldWY0lpQmpiR0Z6Y3oxY0ltSjBiaUJpZEc0dGQyRnlibWx1WjF3aVBsQnNZWGtoUEM5aFBseHlYRzRnSUNBZ1lGeHlYRzRnSUgxY2NseHVmVnh5WEc1Y2NseHVaWGh3YjNKMElIc2dhVzVrWlhnZ2ZUdGNjbHh1SWwxOVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9yb3V0ZXNcXFxcaW5kZXguanNcIixcIi9yb3V0ZXNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuc3RhdHMgPSB1bmRlZmluZWQ7XG5cbnZhciBfaGVscGVycyA9IHJlcXVpcmUoJy4uL3V0aWxzL2hlbHBlcnMnKTtcblxudmFyIF9TdGF0aXN0aWNzID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9TdGF0aXN0aWNzJyk7XG5cbnZhciBfU3RhdGlzdGljczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TdGF0aXN0aWNzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIHN0YXRzID0ge1xuICAgIG5hbWU6ICdzdGF0cycsXG4gICAgbWF0Y2g6ICdzdGF0cycsXG4gICAgb25FbnRlcjogZnVuY3Rpb24gb25FbnRlcih1cmwsIGV2ZW50QnVzKSB7XG4gICAgICAgIHZhciBtYWluQmxvY2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpO1xuICAgICAgICBtYWluQmxvY2suY2xhc3NMaXN0LnJlbW92ZSgnZ2FtZScsICd3ZWxjb21lJyk7XG4gICAgICAgIG1haW5CbG9jay5jbGFzc0xpc3QuYWRkKCdzdGF0aXN0aWNzJyk7XG5cbiAgICAgICAgbWFpbkJsb2NrLmlubmVySFRNTCA9ICdcXG4gICAgICA8aDI+R2FtZXMgc3RhdGlzdGljczwvaDI+XFxuICAgICc7XG5cbiAgICAgICAgdmFyIHN0YXRzVWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgICBuZXcgX1N0YXRpc3RpY3MyLmRlZmF1bHQoc3RhdHNVbCwgZXZlbnRCdXMpLnJlbmRlclN0YXRpc3RpY3MoKTtcblxuICAgICAgICB2YXIgc3RvcmFnZURhdGEgPSAoMCwgX2hlbHBlcnMubG9hZEZyb21TdG9yYWdlKShsb2NhbFN0b3JhZ2UpO1xuICAgICAgICBldmVudEJ1cy50cmlnZ2VyKCdzdGF0czp1cGRhdGUnLCBzdG9yYWdlRGF0YSk7XG5cbiAgICAgICAgdmFyIGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBkZWxldGVCdXR0b24uaW5uZXJUZXh0ID0gJ0NsZWFyIHN0YXRzJztcbiAgICAgICAgZGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J0bicsICdidG4tZGFuZ2VyJyk7XG5cbiAgICAgICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgKDAsIF9oZWxwZXJzLmRlbGV0ZUZyb21TdG9yYWdlKSgnZ2FtZS1zdGF0cycsIGxvY2FsU3RvcmFnZSk7XG4gICAgICAgICAgICBldmVudEJ1cy50cmlnZ2VyKCdzdGF0czp1cGRhdGUnLCBbXSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG1haW5CbG9jay5hcHBlbmQoZGVsZXRlQnV0dG9uLCBzdGF0c1VsKTtcbiAgICB9XG59O1xuXG5leHBvcnRzLnN0YXRzID0gc3RhdHM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbk4wWVhSekxtcHpJbDBzSW01aGJXVnpJanBiSW5OMFlYUnpJaXdpYm1GdFpTSXNJbTFoZEdOb0lpd2liMjVGYm5SbGNpSXNJblZ5YkNJc0ltVjJaVzUwUW5Weklpd2liV0ZwYmtKc2IyTnJJaXdpWkc5amRXMWxiblFpTENKeGRXVnllVk5sYkdWamRHOXlJaXdpWTJ4aGMzTk1hWE4wSWl3aWNtVnRiM1psSWl3aVlXUmtJaXdpYVc1dVpYSklWRTFNSWl3aWMzUmhkSE5WYkNJc0ltTnlaV0YwWlVWc1pXMWxiblFpTENKeVpXNWtaWEpUZEdGMGFYTjBhV056SWl3aWMzUnZjbUZuWlVSaGRHRWlMQ0pzYjJOaGJGTjBiM0poWjJVaUxDSjBjbWxuWjJWeUlpd2laR1ZzWlhSbFFuVjBkRzl1SWl3aWFXNXVaWEpVWlhoMElpd2lZV1JrUlhabGJuUk1hWE4wWlc1bGNpSXNJbUZ3Y0dWdVpDSmRMQ0p0WVhCd2FXNW5jeUk2SWpzN096czdPenRCUVVGQk96dEJRVVZCT3pzN096czdRVUZGUVN4SlFVRk5RU3hSUVVGUk8wRkJRMXBETEZWQlFVMHNUMEZFVFR0QlFVVmFReXhYUVVGUExFOUJSa3M3UVVGSFdrTXNWMEZJV1N4dFFrRkhTa01zUjBGSVNTeEZRVWREUXl4UlFVaEVMRVZCUjFjN1FVRkRja0lzV1VGQlRVTXNXVUZCV1VNc1UwRkJVME1zWVVGQlZDeERRVUYxUWl4UFFVRjJRaXhEUVVGc1FqdEJRVU5CUml4clFrRkJWVWNzVTBGQlZpeERRVUZ2UWtNc1RVRkJjRUlzUTBGQk1rSXNUVUZCTTBJc1JVRkJiVU1zVTBGQmJrTTdRVUZEUVVvc2EwSkJRVlZITEZOQlFWWXNRMEZCYjBKRkxFZEJRWEJDTEVOQlFYZENMRmxCUVhoQ096dEJRVVZCVEN4clFrRkJWVTBzVTBGQlZqczdRVUZKUVN4WlFVRk5ReXhWUVVGVlRpeFRRVUZUVHl4aFFVRlVMRU5CUVhWQ0xFbEJRWFpDTEVOQlFXaENPMEZCUTBFc2FVTkJRV1ZFTEU5QlFXWXNSVUZCZDBKU0xGRkJRWGhDTEVWQlFXdERWU3huUWtGQmJFTTdPMEZCUlVFc1dVRkJUVU1zWTBGQll5dzRRa0ZCWjBKRExGbEJRV2hDTEVOQlFYQkNPMEZCUTBGYUxHbENRVUZUWVN4UFFVRlVMRU5CUVdsQ0xHTkJRV3BDTEVWQlFXbERSaXhYUVVGcVF6czdRVUZGUVN4WlFVRk5SeXhsUVVGbFdpeFRRVUZUVHl4aFFVRlVMRU5CUVhWQ0xGRkJRWFpDTEVOQlFYSkNPMEZCUTBGTExIRkNRVUZoUXl4VFFVRmlMRWRCUVhsQ0xHRkJRWHBDTzBGQlEwRkVMSEZDUVVGaFZpeFRRVUZpTEVOQlFYVkNSU3hIUVVGMlFpeERRVUV5UWl4TFFVRXpRaXhGUVVGclF5eFpRVUZzUXpzN1FVRkZRVkVzY1VKQlFXRkZMR2RDUVVGaUxFTkJRVGhDTEU5QlFUbENMRVZCUVhWRExGbEJRVTA3UVVGRE0wTXNORU5CUVd0Q0xGbEJRV3hDTEVWQlFXZERTaXhaUVVGb1F6dEJRVU5CV2l4eFFrRkJVMkVzVDBGQlZDeERRVUZwUWl4alFVRnFRaXhGUVVGcFF5eEZRVUZxUXp0QlFVTkVMRk5CU0VRN08wRkJTMEZhTEd0Q1FVRlZaMElzVFVGQlZpeERRVUZwUWtnc1dVRkJha0lzUlVGQkswSk9MRTlCUVM5Q08wRkJRMFE3UVVFMVFsY3NRMEZCWkRzN1VVRXJRbE5pTEVzc1IwRkJRVUVzU3lJc0ltWnBiR1VpT2lKemRHRjBjeTVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYkltbHRjRzl5ZENCN0lHeHZZV1JHY205dFUzUnZjbUZuWlN3Z1pHVnNaWFJsUm5KdmJWTjBiM0poWjJVZ2ZTQm1jbTl0SUNjdUxpOTFkR2xzY3k5b1pXeHdaWEp6Snp0Y2NseHVYSEpjYm1sdGNHOXlkQ0JUZEdGMGFYTjBhV056SUdaeWIyMGdKeTR1TDJOdmJYQnZibVZ1ZEhNdlUzUmhkR2x6ZEdsamN5YzdYSEpjYmx4eVhHNWpiMjV6ZENCemRHRjBjeUE5SUh0Y2NseHVJQ0J1WVcxbE9pQW5jM1JoZEhNbkxGeHlYRzRnSUcxaGRHTm9PaUFuYzNSaGRITW5MRnh5WEc0Z0lHOXVSVzUwWlhJb2RYSnNMQ0JsZG1WdWRFSjFjeWtnZTF4eVhHNGdJQ0FnWTI5dWMzUWdiV0ZwYmtKc2IyTnJJRDBnWkc5amRXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNpZ25MbTFoYVc0bktUdGNjbHh1SUNBZ0lHMWhhVzVDYkc5amF5NWpiR0Z6YzB4cGMzUXVjbVZ0YjNabEtDZG5ZVzFsSnl3Z0ozZGxiR052YldVbktUdGNjbHh1SUNBZ0lHMWhhVzVDYkc5amF5NWpiR0Z6YzB4cGMzUXVZV1JrS0NkemRHRjBhWE4wYVdOekp5azdYSEpjYmx4eVhHNGdJQ0FnYldGcGJrSnNiMk5yTG1sdWJtVnlTRlJOVENBOUlHQmNjbHh1SUNBZ0lDQWdQR2d5UGtkaGJXVnpJSE4wWVhScGMzUnBZM004TDJneVBseHlYRzRnSUNBZ1lGeHlYRzVjY2x4dUlDQWdJR052Ym5OMElITjBZWFJ6Vld3Z1BTQmtiMk4xYldWdWRDNWpjbVZoZEdWRmJHVnRaVzUwS0NkMWJDY3BPMXh5WEc0Z0lDQWdibVYzSUZOMFlYUnBjM1JwWTNNb2MzUmhkSE5WYkN3Z1pYWmxiblJDZFhNcExuSmxibVJsY2xOMFlYUnBjM1JwWTNNb0tUdGNjbHh1WEhKY2JpQWdJQ0JqYjI1emRDQnpkRzl5WVdkbFJHRjBZU0E5SUd4dllXUkdjbTl0VTNSdmNtRm5aU2hzYjJOaGJGTjBiM0poWjJVcE8xeHlYRzRnSUNBZ1pYWmxiblJDZFhNdWRISnBaMmRsY2lnbmMzUmhkSE02ZFhCa1lYUmxKeXdnYzNSdmNtRm5aVVJoZEdFcE8xeHlYRzVjY2x4dUlDQWdJR052Ym5OMElHUmxiR1YwWlVKMWRIUnZiaUE5SUdSdlkzVnRaVzUwTG1OeVpXRjBaVVZzWlcxbGJuUW9KMkoxZEhSdmJpY3BPMXh5WEc0Z0lDQWdaR1ZzWlhSbFFuVjBkRzl1TG1sdWJtVnlWR1Y0ZENBOUlDZERiR1ZoY2lCemRHRjBjeWM3WEhKY2JpQWdJQ0JrWld4bGRHVkNkWFIwYjI0dVkyeGhjM05NYVhOMExtRmtaQ2duWW5SdUp5d2dKMkowYmkxa1lXNW5aWEluS1R0Y2NseHVYSEpjYmlBZ0lDQmtaV3hsZEdWQ2RYUjBiMjR1WVdSa1JYWmxiblJNYVhOMFpXNWxjaWduWTJ4cFkyc25MQ0FvS1NBOVBpQjdYSEpjYmlBZ0lDQWdJR1JsYkdWMFpVWnliMjFUZEc5eVlXZGxLQ2RuWVcxbExYTjBZWFJ6Snl3Z2JHOWpZV3hUZEc5eVlXZGxLVHRjY2x4dUlDQWdJQ0FnWlhabGJuUkNkWE11ZEhKcFoyZGxjaWduYzNSaGRITTZkWEJrWVhSbEp5d2dXMTBwTzF4eVhHNGdJQ0FnZlNrN1hISmNibHh5WEc0Z0lDQWdiV0ZwYmtKc2IyTnJMbUZ3Y0dWdVpDaGtaV3hsZEdWQ2RYUjBiMjRzSUhOMFlYUnpWV3dwTzF4eVhHNGdJSDFjY2x4dWZUdGNjbHh1WEhKY2JtVjRjRzl5ZENCN0lITjBZWFJ6SUgwN1hISmNiaUpkZlE9PVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9yb3V0ZXNcXFxcc3RhdHMuanNcIixcIi9yb3V0ZXNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfSBlbHNlIHsgcmV0dXJuIEFycmF5LmZyb20oYXJyKTsgfSB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBFdmVudEJ1cyA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRXZlbnRCdXMoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEV2ZW50QnVzKTtcblxuICAgIHRoaXMubGlzdGVuZXJzID0ge307XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoRXZlbnRCdXMsIFt7XG4gICAga2V5OiBcIm9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uKG5hbWUsIGZ1bmMpIHtcbiAgICAgIGlmICghdGhpcy5saXN0ZW5lcnNbbmFtZV0pIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNbbmFtZV0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5saXN0ZW5lcnNbbmFtZV0ucHVzaChmdW5jKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwib2ZmXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9mZihuYW1lLCBmdW5jKSB7XG4gICAgICBpZiAoIXRoaXMubGlzdGVuZXJzW25hbWVdKSByZXR1cm47XG5cbiAgICAgIHZhciBpbmRleCA9IHRoaXMubGlzdGVuZXJzW25hbWVdLmluZGV4T2YoZnVuYyk7XG4gICAgICB0aGlzLmxpc3RlbmVyc1tuYW1lXS5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICBpZiAodGhpcy5saXN0ZW5lcnNbbmFtZV0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmxpc3RlbmVyc1tuYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwidHJpZ2dlclwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiB0cmlnZ2VyKG5hbWUsIGRhdGEpIHtcbiAgICAgIGlmICghdGhpcy5saXN0ZW5lcnNbbmFtZV0pIHJldHVybjtcblxuICAgICAgdGhpcy5saXN0ZW5lcnNbbmFtZV0ubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpICYmIGRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgIC8vINC/0LDRhdC+0LTRgyDRgtCw0Log0L3QtSDQutCw0YLQuNGCXG4gICAgICAgICAgaXRlbS5hcHBseSh1bmRlZmluZWQsIF90b0NvbnN1bWFibGVBcnJheShkYXRhKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbShkYXRhKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcIm9uY2VcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25jZShuYW1lLCBmdW5jKSB7XG4gICAgICAvLyDQv9GA0L7QsdC+0LLQsNC7INGH0LXRgNC10LcgbmV3IEZ1bmN0aW9uINCy0YvQt9GL0LLQsNGC0Ywg0YTRg9C90LrRhtC40Y4g0YEg0YLQsNC60LjQvCDQttC1INC90LDQt9Cy0LDQvdC40LXQvFxuICAgICAgLy8g0Lgg0L/QvtGC0L7QvCDRg9C00LDQu9GP0YLRjCDQsiDQvdC10LksINC90LUg0L/QvtC70YPRh9C40LvQvtGB0YxcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRXZlbnRCdXM7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEV2ZW50QnVzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWtWMlpXNTBRblZ6TG1weklsMHNJbTVoYldWeklqcGJJa1YyWlc1MFFuVnpJaXdpYkdsemRHVnVaWEp6SWl3aWJtRnRaU0lzSW1aMWJtTWlMQ0p3ZFhOb0lpd2lhVzVrWlhnaUxDSnBibVJsZUU5bUlpd2ljM0JzYVdObElpd2liR1Z1WjNSb0lpd2laR0YwWVNJc0ltMWhjQ0lzSWtGeWNtRjVJaXdpYVhOQmNuSmhlU0lzSW1sMFpXMGlYU3dpYldGd2NHbHVaM01pT2lJN096czdPenM3T3pzN096dEpRVUZOUVN4Uk8wRkJRMG9zYzBKQlFXTTdRVUZCUVRzN1FVRkRXaXhUUVVGTFF5eFRRVUZNTEVkQlFXbENMRVZCUVdwQ08wRkJRMFE3T3pzN2RVSkJSVVZETEVrc1JVRkJUVU1zU1N4RlFVRk5PMEZCUTJJc1ZVRkJTU3hEUVVGRExFdEJRVXRHTEZOQlFVd3NRMEZCWlVNc1NVRkJaaXhEUVVGTUxFVkJRVEpDTzBGQlEzcENMR0ZCUVV0RUxGTkJRVXdzUTBGQlpVTXNTVUZCWml4SlFVRjFRaXhGUVVGMlFqdEJRVU5FT3p0QlFVVkVMRmRCUVV0RUxGTkJRVXdzUTBGQlpVTXNTVUZCWml4RlFVRnhRa1VzU1VGQmNrSXNRMEZCTUVKRUxFbEJRVEZDTzBGQlEwUTdPenQzUWtGRlIwUXNTU3hGUVVGTlF5eEpMRVZCUVUwN1FVRkRaQ3hWUVVGSkxFTkJRVU1zUzBGQlMwWXNVMEZCVEN4RFFVRmxReXhKUVVGbUxFTkJRVXdzUlVGQk1rSTdPMEZCUlROQ0xGVkJRVTFITEZGQlFWRXNTMEZCUzBvc1UwRkJUQ3hEUVVGbFF5eEpRVUZtTEVWQlFYRkNTU3hQUVVGeVFpeERRVUUyUWtnc1NVRkJOMElzUTBGQlpEdEJRVU5CTEZkQlFVdEdMRk5CUVV3c1EwRkJaVU1zU1VGQlppeEZRVUZ4UWtzc1RVRkJja0lzUTBGQk5FSkdMRXRCUVRWQ0xFVkJRVzFETEVOQlFXNURPenRCUVVWQkxGVkJRVWtzUzBGQlMwb3NVMEZCVEN4RFFVRmxReXhKUVVGbUxFVkJRWEZDVFN4TlFVRnlRaXhMUVVGblF5eERRVUZ3UXl4RlFVRjFRenRCUVVOeVF5eGxRVUZQTEV0QlFVdFFMRk5CUVV3c1EwRkJaVU1zU1VGQlppeERRVUZRTzBGQlEwUTdRVUZEUmpzN096UkNRVVZQUVN4SkxFVkJRVTFQTEVrc1JVRkJUVHRCUVVOc1FpeFZRVUZKTEVOQlFVTXNTMEZCUzFJc1UwRkJUQ3hEUVVGbFF5eEpRVUZtTEVOQlFVd3NSVUZCTWtJN08wRkJSVE5DTEZkQlFVdEVMRk5CUVV3c1EwRkJaVU1zU1VGQlppeEZRVUZ4UWxFc1IwRkJja0lzUTBGQmVVSXNaMEpCUVZFN1FVRkRMMElzV1VGQlNVTXNUVUZCVFVNc1QwRkJUaXhEUVVGalNDeEpRVUZrTEV0QlFYVkNRU3hMUVVGTFJDeE5RVUZNTEVkQlFXTXNRMEZCZWtNc1JVRkJORU03UVVGRE1VTTdRVUZEUVVzc2JVUkJRVkZLTEVsQlFWSTdRVUZEUkN4VFFVaEVMRTFCUjA4N1FVRkRURWtzWlVGQlMwb3NTVUZCVER0QlFVTkVPMEZCUTBZc1QwRlFSRHRCUVZGRU96czdlVUpCUlVsUUxFa3NSVUZCVFVNc1NTeEZRVUZOTzBGQlEyWTdRVUZEUVR0QlFVTkVPenM3T3pzN2EwSkJSMWxJTEZFaUxDSm1hV3hsSWpvaVJYWmxiblJDZFhNdWFuTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUpqYkdGemN5QkZkbVZ1ZEVKMWN5QjdYSEpjYmlBZ1kyOXVjM1J5ZFdOMGIzSW9LU0I3WEhKY2JpQWdJQ0IwYUdsekxteHBjM1JsYm1WeWN5QTlJSHQ5TzF4eVhHNGdJSDFjY2x4dVhISmNiaUFnYjI0b2JtRnRaU3dnWm5WdVl5a2dlMXh5WEc0Z0lDQWdhV1lnS0NGMGFHbHpMbXhwYzNSbGJtVnljMXR1WVcxbFhTa2dlMXh5WEc0Z0lDQWdJQ0IwYUdsekxteHBjM1JsYm1WeWMxdHVZVzFsWFNBOUlGdGRPMXh5WEc0Z0lDQWdmVnh5WEc1Y2NseHVJQ0FnSUhSb2FYTXViR2x6ZEdWdVpYSnpXMjVoYldWZExuQjFjMmdvWm5WdVl5azdYSEpjYmlBZ2ZWeHlYRzVjY2x4dUlDQnZabVlvYm1GdFpTd2dablZ1WXlrZ2UxeHlYRzRnSUNBZ2FXWWdLQ0YwYUdsekxteHBjM1JsYm1WeWMxdHVZVzFsWFNrZ2NtVjBkWEp1TzF4eVhHNWNjbHh1SUNBZ0lHTnZibk4wSUdsdVpHVjRJRDBnZEdocGN5NXNhWE4wWlc1bGNuTmJibUZ0WlYwdWFXNWtaWGhQWmlobWRXNWpLVHRjY2x4dUlDQWdJSFJvYVhNdWJHbHpkR1Z1WlhKelcyNWhiV1ZkTG5Od2JHbGpaU2hwYm1SbGVDd2dNU2s3WEhKY2JseHlYRzRnSUNBZ2FXWWdLSFJvYVhNdWJHbHpkR1Z1WlhKelcyNWhiV1ZkTG14bGJtZDBhQ0E5UFQwZ01Da2dlMXh5WEc0Z0lDQWdJQ0JrWld4bGRHVWdkR2hwY3k1c2FYTjBaVzVsY25OYmJtRnRaVjA3WEhKY2JpQWdJQ0I5WEhKY2JpQWdmVnh5WEc1Y2NseHVJQ0IwY21sbloyVnlLRzVoYldVc0lHUmhkR0VwSUh0Y2NseHVJQ0FnSUdsbUlDZ2hkR2hwY3k1c2FYTjBaVzVsY25OYmJtRnRaVjBwSUhKbGRIVnlianRjY2x4dVhISmNiaUFnSUNCMGFHbHpMbXhwYzNSbGJtVnljMXR1WVcxbFhTNXRZWEFvYVhSbGJTQTlQaUI3WEhKY2JpQWdJQ0FnSUdsbUlDaEJjbkpoZVM1cGMwRnljbUY1S0dSaGRHRXBJQ1ltSUdSaGRHRXViR1Z1WjNSb0lENGdNQ2tnZTF4eVhHNGdJQ0FnSUNBZ0lDOHZJTkMvMExEUmhkQyswTFRSZ3lEUmd0Q3cwTG9nMEwzUXRTRFF1dEN3MFlMUXVOR0NYSEpjYmlBZ0lDQWdJQ0FnYVhSbGJTZ3VMaTVrWVhSaEtUdGNjbHh1SUNBZ0lDQWdmU0JsYkhObElIdGNjbHh1SUNBZ0lDQWdJQ0JwZEdWdEtHUmhkR0VwTzF4eVhHNGdJQ0FnSUNCOVhISmNiaUFnSUNCOUtUdGNjbHh1SUNCOVhISmNibHh5WEc0Z0lHOXVZMlVvYm1GdFpTd2dablZ1WXlrZ2UxeHlYRzRnSUNBZ0x5OGcwTC9SZ05DKzBMSFF2dEN5MExEUXV5RFJoOUMxMFlEUXRkQzNJRzVsZHlCR2RXNWpkR2x2YmlEUXN0R0wwTGZSaTlDeTBMRFJndEdNSU5HRTBZUFF2ZEM2MFliUXVOR09JTkdCSU5HQzBMRFF1dEM0MEx3ZzBMYlF0U0RRdmRDdzBMZlFzdEN3MEwzUXVOQzEwTHhjY2x4dUlDQWdJQzh2SU5DNElOQy8wTDdSZ3RDKzBMd2cwWVBRdE5DdzBMdlJqOUdDMFl3ZzBMSWcwTDNRdGRDNUxDRFF2ZEMxSU5DLzBMN1F1OUdEMFlmUXVOQzcwTDdSZ2RHTVhISmNiaUFnZlZ4eVhHNTlYSEpjYmx4eVhHNWxlSEJ2Y25RZ1pHVm1ZWFZzZENCRmRtVnVkRUoxY3p0Y2NseHVJbDE5XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL3V0aWxzXFxcXEV2ZW50QnVzLmpzXCIsXCIvdXRpbHNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgbG9hZEZyb21TdG9yYWdlID0gZXhwb3J0cy5sb2FkRnJvbVN0b3JhZ2UgPSBmdW5jdGlvbiBsb2FkRnJvbVN0b3JhZ2Uoc3RvcmFnZSkge1xuICB2YXIgZGF0YSA9IEpTT04ucGFyc2Uoc3RvcmFnZS5nZXRJdGVtKCdnYW1lLXN0YXRzJykpO1xuICByZXR1cm4gZGF0YSB8fCBbXTtcbn07XG5cbnZhciBzYXZlVG9TdG9yYWdlID0gZXhwb3J0cy5zYXZlVG9TdG9yYWdlID0gZnVuY3Rpb24gc2F2ZVRvU3RvcmFnZShkYXRhLCBzdG9yYWdlKSB7XG4gIHZhciBwcmV2RGF0YSA9IGxvYWRGcm9tU3RvcmFnZShzdG9yYWdlKTtcbiAgcHJldkRhdGEucHVzaChkYXRhKTtcbiAgc3RvcmFnZS5zZXRJdGVtKCdnYW1lLXN0YXRzJywgSlNPTi5zdHJpbmdpZnkocHJldkRhdGEpKTtcbn07XG5cbnZhciBkZWxldGVGcm9tU3RvcmFnZSA9IGV4cG9ydHMuZGVsZXRlRnJvbVN0b3JhZ2UgPSBmdW5jdGlvbiBkZWxldGVGcm9tU3RvcmFnZShuYW1lLCBzdG9yYWdlKSB7XG4gIHN0b3JhZ2UucmVtb3ZlSXRlbShuYW1lKTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbWhsYkhCbGNuTXVhbk1pWFN3aWJtRnRaWE1pT2xzaWJHOWhaRVp5YjIxVGRHOXlZV2RsSWl3aWMzUnZjbUZuWlNJc0ltUmhkR0VpTENKS1UwOU9JaXdpY0dGeWMyVWlMQ0puWlhSSmRHVnRJaXdpYzJGMlpWUnZVM1J2Y21GblpTSXNJbkJ5WlhaRVlYUmhJaXdpY0hWemFDSXNJbk5sZEVsMFpXMGlMQ0p6ZEhKcGJtZHBabmtpTENKa1pXeGxkR1ZHY205dFUzUnZjbUZuWlNJc0ltNWhiV1VpTENKeVpXMXZkbVZKZEdWdElsMHNJbTFoY0hCcGJtZHpJam9pT3pzN096dEJRVU5QTEVsQlFVMUJMRFJEUVVGclFpeFRRVUZzUWtFc1pVRkJhMElzUTBGQlEwTXNUMEZCUkN4RlFVRmhPMEZCUXpGRExFMUJRVTFETEU5QlFVOURMRXRCUVV0RExFdEJRVXdzUTBGQlYwZ3NVVUZCVVVrc1QwRkJVaXhEUVVGblFpeFpRVUZvUWl4RFFVRllMRU5CUVdJN1FVRkRRU3hUUVVGUFNDeFJRVUZSTEVWQlFXWTdRVUZEUkN4RFFVaE5PenRCUVV0QkxFbEJRVTFKTEhkRFFVRm5RaXhUUVVGb1FrRXNZVUZCWjBJc1EwRkJRMG9zU1VGQlJDeEZRVUZQUkN4UFFVRlFMRVZCUVcxQ08wRkJRemxETEUxQlFVMU5MRmRCUVZkUUxHZENRVUZuUWtNc1QwRkJhRUlzUTBGQmFrSTdRVUZEUVUwc1YwRkJVME1zU1VGQlZDeERRVUZqVGl4SlFVRmtPMEZCUTBGRUxGVkJRVkZSTEU5QlFWSXNRMEZCWjBJc1dVRkJhRUlzUlVGQk9FSk9MRXRCUVV0UExGTkJRVXdzUTBGQlpVZ3NVVUZCWml4RFFVRTVRanRCUVVORUxFTkJTazA3TzBGQlRVRXNTVUZCVFVrc1owUkJRVzlDTEZOQlFYQkNRU3hwUWtGQmIwSXNRMEZCUTBNc1NVRkJSQ3hGUVVGUFdDeFBRVUZRTEVWQlFXMUNPMEZCUTJ4RVFTeFZRVUZSV1N4VlFVRlNMRU5CUVcxQ1JDeEpRVUZ1UWp0QlFVTkVMRU5CUmswaUxDSm1hV3hsSWpvaWFHVnNjR1Z5Y3k1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJbHh5WEc1bGVIQnZjblFnWTI5dWMzUWdiRzloWkVaeWIyMVRkRzl5WVdkbElEMGdLSE4wYjNKaFoyVXBJRDArSUh0Y2NseHVJQ0JqYjI1emRDQmtZWFJoSUQwZ1NsTlBUaTV3WVhKelpTaHpkRzl5WVdkbExtZGxkRWwwWlcwb0oyZGhiV1V0YzNSaGRITW5LU2s3WEhKY2JpQWdjbVYwZFhKdUlHUmhkR0VnZkh3Z1cxMDdYSEpjYm4xY2NseHVYSEpjYm1WNGNHOXlkQ0JqYjI1emRDQnpZWFpsVkc5VGRHOXlZV2RsSUQwZ0tHUmhkR0VzSUhOMGIzSmhaMlVwSUQwK0lIdGNjbHh1SUNCamIyNXpkQ0J3Y21WMlJHRjBZU0E5SUd4dllXUkdjbTl0VTNSdmNtRm5aU2h6ZEc5eVlXZGxLVHRjY2x4dUlDQndjbVYyUkdGMFlTNXdkWE5vS0dSaGRHRXBPMXh5WEc0Z0lITjBiM0poWjJVdWMyVjBTWFJsYlNnbloyRnRaUzF6ZEdGMGN5Y3NJRXBUVDA0dWMzUnlhVzVuYVdaNUtIQnlaWFpFWVhSaEtTazdYSEpjYm4xY2NseHVYSEpjYm1WNGNHOXlkQ0JqYjI1emRDQmtaV3hsZEdWR2NtOXRVM1J2Y21GblpTQTlJQ2h1WVcxbExDQnpkRzl5WVdkbEtTQTlQaUI3WEhKY2JpQWdjM1J2Y21GblpTNXlaVzF2ZG1WSmRHVnRLRzVoYldVcE8xeHlYRzU5WEhKY2JpSmRmUT09XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL3V0aWxzXFxcXGhlbHBlcnMuanNcIixcIi91dGlsc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuLy8g0YHQvNGL0YHQuyDQv9C+0L3Rj9C7LCDQv9C+0YLQvtC8INC90LDQv9C40YjRgyDRgdCy0L7QuVxuXG52YXIgUm91dGVyID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBSb3V0ZXIoY29uZmlnKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJvdXRlcik7XG5cbiAgICB0aGlzLmV2ZW50QnVzID0gY29uZmlnLmV2ZW50QnVzO1xuICAgIHRoaXMucm91dGVzID0gY29uZmlnLnJvdXRlcyB8fCBbXTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFJvdXRlciwgW3tcbiAgICBrZXk6ICdpbml0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICAgIGNvbnNvbGUubG9nKCctLS0+IHJvdXRlciBpbml0Jyk7XG4gICAgICAvLyAxLiDQn9C+0LTQv9C40YHQsNGC0YwgdGhpcy5oYW5kbGVVcmwg0L3QsCDQuNC30LzQtdC90LXQvdC40Y8gdXJsXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzLmhhbmRsZVVybCh3aW5kb3cubG9jYXRpb24uaGFzaCk7XG4gICAgICB9KTtcbiAgICAgIC8vIDIuINCS0YvQv9C+0LvQvdC40YLRjCB0aGlzLmhhbmRsZVVybFxuICAgICAgdGhpcy5oYW5kbGVVcmwod2luZG93LmxvY2F0aW9uLmhhc2gpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2ZpbmRQcmV2aW91c0FjdGl2ZVJvdXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZmluZFByZXZpb3VzQWN0aXZlUm91dGUoKSB7XG4gICAgICBjb25zb2xlLmxvZygnLS0tPiByb3V0ZXIgZmluZFByZXZpb3VzQWN0aXZlUm91dGU6ICcgKyAodGhpcy5jdXJyZW50Um91dGUgfHwge30pLm5hbWUpO1xuICAgICAgLy8g0J3QsNC50YLQuCDRgNC+0YPRgiDRgSDQutC+0YLQvtGA0L7Qs9C+INGD0YXQvtC00LjQvFxuICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFJvdXRlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2ZpbmROZXdBY3RpdmVSb3V0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZpbmROZXdBY3RpdmVSb3V0ZSh1cmwpIHtcbiAgICAgIC8vINCd0LDQudGC0Lgg0YDQvtGD0YIg0L3QsCDQutC+0YLQvtGA0YvQuSDQv9C10YDQtdGF0L7QtNC40LxcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucm91dGVzKTtcbiAgICAgIHZhciByb3V0ZSA9IHRoaXMucm91dGVzLmZpbmQoZnVuY3Rpb24gKHJvdXRlSXRlbSkge1xuICAgICAgICBpZiAodHlwZW9mIHJvdXRlSXRlbS5tYXRjaCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICByZXR1cm4gdXJsID09PSByb3V0ZUl0ZW0ubWF0Y2g7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJvdXRlSXRlbS5tYXRjaCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJldHVybiByb3V0ZUl0ZW0ubWF0Y2godXJsKTtcbiAgICAgICAgfSBlbHNlIGlmIChyb3V0ZUl0ZW0ubWF0Y2ggaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgICByZXR1cm4gdXJsLm1hdGNoKHJvdXRlSXRlbS5tYXRjaCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjb25zb2xlLmxvZygnLS0tPiByb3V0ZXIgZmluZE5ld0FjdGl2ZVJvdXRlOiAnICsgdXJsICsgJyAtLSAnICsgKHJvdXRlIHx8IHt9KS5uYW1lKTtcbiAgICAgIHJldHVybiByb3V0ZTtcbiAgICB9XG4gICAgLy8gZ2V0Um91dGVQYXJhbXMocm91dGUsIHVybCkge1xuICAgIC8vIFx0IHZhciBwYXJhbXMgPSB1cmwubWF0Y2gocm91dGUubWF0Y2gpIHx8IFtdO1xuICAgIC8vICAgIHBhcmFtcy5zaGlmdCgpO1xuICAgIC8vICAgIHJldHVybiBwYXJhbXM7XG4gICAgLy8gfSxcblxuICB9LCB7XG4gICAga2V5OiAnaGFuZGxlVXJsJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlVXJsKHVybCkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHVybCA9IHVybC5zbGljZSgxKTtcbiAgICAgIC8vINCd0LDQudGC0Lgg0YLQtdC60YPRidC40Lkg0YDQvtGD0YJcbiAgICAgIHZhciBwcmV2aW91c1JvdXRlID0gdGhpcy5maW5kUHJldmlvdXNBY3RpdmVSb3V0ZSgpO1xuICAgICAgLy8g0J3QsNC50YLQuCDQvdC+0LLRi9C5INGA0L7Rg9GCXG4gICAgICB2YXIgbmV3Um91dGUgPSB0aGlzLmZpbmROZXdBY3RpdmVSb3V0ZSh1cmwpO1xuICAgICAgLy8gY29uc29sZS5sb2cobmV3Um91dGUpO1xuICAgICAgLy8gY29uc29sZS5sb2codXJsKTtcblxuICAgICAgLy8gbGV0IHJvdXRlUGFyYW1zID0gdGhpcy5nZXRSb3V0ZVBhcmFtcyhuZXdSb3V0ZSwgdXJsKTtcblxuICAgICAgLy8g0JXRgdC70Lgg0LXRgdGC0Ywg0YDQvtGD0YIg0YEg0LrQvtGC0L7RgNC+0LPQviDRg9GF0L7QtNC40LwgLSDQstGL0L/QvtC70L3QuNGC0Ywg0LXQs9C+IC5vbkxlYXZlXG4gICAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHByZXZpb3VzUm91dGUgJiYgcHJldmlvdXNSb3V0ZS5vbkxlYXZlICYmIHByZXZpb3VzUm91dGUub25MZWF2ZSh3aW5kb3cubG9jYXRpb24uaGFzaCwgX3RoaXMyLmV2ZW50QnVzKTtcbiAgICAgIH0pXG4gICAgICAvLyDQn9C+0YHQu9C1INGN0YLQvtCz0L4g0LLRi9C/0L7Qu9C90LjRgtGMIC5vbkJlZm9yZUVudGVyINC00LvRjyDQvdC+0LLQvtCz0L4g0LDQutGC0LjQstC90L7Qs9C+INGA0L7Rg9GC0LBcbiAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ld1JvdXRlICYmIG5ld1JvdXRlLm9uQmVmb3JlRW50ZXIgJiYgbmV3Um91dGUub25CZWZvcmVFbnRlcih3aW5kb3cubG9jYXRpb24uaGFzaCwgX3RoaXMyLmV2ZW50QnVzKTtcbiAgICAgIH0pXG4gICAgICAvLyDQn9C+0YHQu9C1INGN0YLQvtCz0L4g0LLRi9C/0L7Qu9C90LjRgtGMIC5vbkVudGVyINC00LvRjyDQvdC+0LPQvtCy0L7Qs9C+INCw0LrRgtC40LLQvdC+0LPQviDRgNC+0YPRgtCwICgg0YLQvtC70YzQutC+INC10YHQu9C4INGBIC5vbkJlZm9yZUVudGVyINCy0YHQtSDQvtC6KVxuXG4gICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXdSb3V0ZSAmJiBuZXdSb3V0ZS5vbkVudGVyICYmIG5ld1JvdXRlLm9uRW50ZXIod2luZG93LmxvY2F0aW9uLmhhc2gsIF90aGlzMi5ldmVudEJ1cyk7XG4gICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3RoaXMyLmN1cnJlbnRSb3V0ZSA9IG5ld1JvdXRlO1xuICAgICAgICAvLyB0aGlzLmN1cnJlbnRSb3V0ZVBhcmFtcyA9IHJvdXRlUGFyYW1zO1xuICAgICAgfSk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFJvdXRlcjtcbn0oKTtcblxuO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBSb3V0ZXI7XG5cbi8vIGNsYXNzIFJvdXRlciB7XG4vLyAgIGNvbnN0cnVjdG9yKHJvdXRlcywgZXZlbnRCdXMpIHtcbi8vICAgICB0aGlzLmV2ZW50QnVzID0gZXZlbnRCdXM7XG4vLyAgICAgdGhpcy5yb3V0ZXMgPSByb3V0ZXM7XG4vL1xuLy8gICAgIHRoaXMuaGFuZGxlSGFzaENoYW5nZSA9IHRoaXMuaGFuZGxlSGFzaENoYW5nZS5iaW5kKHRoaXMpO1xuLy8gICB9XG4vL1xuLy9cbi8vICAgaW5pdCgpIHtcbi8vICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIHRoaXMuaGFuZGxlSGFzaENoYW5nZSk7XG4vLyAgICAgdGhpcy5oYW5kbGVIYXNoQ2hhbmdlKCk7XG4vLyAgIH1cbi8vXG4vLyAgIGZpbmRQcmV2aW91c0FjdGl2ZVJvdXRlKCkge1xuLy9cbi8vICAgfVxuLy9cbi8vICAgZmluZE5ld0FjdGl2ZVJvdXRlKCkge1xuLy9cbi8vICAgfVxuLy9cbi8vXG4vLyAgIGhhbmRsZUhhc2hDaGFuZ2UoKSB7XG4vLyAgICAgY29uc3QgbGFzdFJvdXRlID0gd2luZG93LmxvY2F0aW9uLm9sZFVybDtcbi8vICAgICBjb25zdCBuZXdSb3V0ZSA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuLy9cbi8vXG4vL1xuLy8gICAgIC8vIGxhc3Qgcm91dGUgb25MZWF2ZVxuLy8gICAgIHRoaXMucm91dGVzW2xhc3RSb3V0ZV0ub25MZWF2ZSh0aGlzLmV2ZW50QnVzKVxuLy8gICAgICAgLnRoZW4oKCkgPT4ge1xuLy8gICAgICAgICAvLyBuZXcgcm91dGUgYmVmb3JlRW50ZXJcbi8vICAgICAgICAgcmV0dXJuIHRoaXMucm91dGVzW25ld1JvdXRlXS5vbkJlZm9yZUVudGVyKHRoaXMuZXZlbnRCdXMpO1xuLy8gICAgICAgfSlcbi8vICAgICAgIC50aGVuKCgpID0+IHtcbi8vICAgICAgICAgLy8gbmV3IHJvdXRlIG9uRW50ZXJcbi8vICAgICAgICAgcmV0dXJuIHRoaXMucm91dGVzW25ld1JvdXRlXS5vbkVudGVyKHRoaXMuZXZlbnRCdXMpO1xuLy8gICAgICAgfSlcbi8vICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbi8vICAgICAgIH0pXG4vLyAgIH1cbi8vIH1cbi8vXG4vLyBleHBvcnQgZGVmYXVsdCBSb3V0ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbkp2ZFhSbGNpNXFjeUpkTENKdVlXMWxjeUk2V3lKU2IzVjBaWElpTENKamIyNW1hV2NpTENKbGRtVnVkRUoxY3lJc0luSnZkWFJsY3lJc0ltbHVhWFFpTENKamIyNXpiMnhsSWl3aWJHOW5JaXdpZDJsdVpHOTNJaXdpWVdSa1JYWmxiblJNYVhOMFpXNWxjaUlzSW1oaGJtUnNaVlZ5YkNJc0lteHZZMkYwYVc5dUlpd2lhR0Z6YUNJc0ltTjFjbkpsYm5SU2IzVjBaU0lzSW01aGJXVWlMQ0oxY213aUxDSnliM1YwWlNJc0ltWnBibVFpTENKeWIzVjBaVWwwWlcwaUxDSnRZWFJqYUNJc0lsSmxaMFY0Y0NJc0luTnNhV05sSWl3aWNISmxkbWx2ZFhOU2IzVjBaU0lzSW1acGJtUlFjbVYyYVc5MWMwRmpkR2wyWlZKdmRYUmxJaXdpYm1WM1VtOTFkR1VpTENKbWFXNWtUbVYzUVdOMGFYWmxVbTkxZEdVaUxDSlFjbTl0YVhObElpd2ljbVZ6YjJ4MlpTSXNJblJvWlc0aUxDSnZia3hsWVhabElpd2liMjVDWldadmNtVkZiblJsY2lJc0ltOXVSVzUwWlhJaVhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN096czdPenM3UVVGRFFUczdTVUZGVFVFc1RUdEJRVU5LTEd0Q1FVRlpReXhOUVVGYUxFVkJRVzlDTzBGQlFVRTdPMEZCUTJ4Q0xGTkJRVXRETEZGQlFVd3NSMEZCWjBKRUxFOUJRVTlETEZGQlFYWkNPMEZCUTBFc1UwRkJTME1zVFVGQlRDeEhRVUZqUml4UFFVRlBSU3hOUVVGUUxFbEJRV2xDTEVWQlFTOUNPenRCUVVWQkxGTkJRVXRETEVsQlFVdzdRVUZEUkRzN096c3lRa0ZGVFR0QlFVRkJPenRCUVVOTVF5eGpRVUZSUXl4SFFVRlNMRU5CUVZrc2EwSkJRVm83UVVGRFFUdEJRVU5CUXl4aFFVRlBReXhuUWtGQlVDeERRVUYzUWl4WlFVRjRRaXhGUVVGelF6dEJRVUZCTEdWQlFVMHNUVUZCUzBNc1UwRkJUQ3hEUVVGbFJpeFBRVUZQUnl4UlFVRlFMRU5CUVdkQ1F5eEpRVUV2UWl4RFFVRk9PMEZCUVVFc1QwRkJkRU03UVVGRFFUdEJRVU5CTEZkQlFVdEdMRk5CUVV3c1EwRkJaVVlzVDBGQlQwY3NVVUZCVUN4RFFVRm5Ra01zU1VGQkwwSTdRVUZEUkRzN096aERRVVY1UWp0QlFVTjRRazRzWTBGQlVVTXNSMEZCVWl3eVEwRkJiMFFzUTBGQlF5eExRVUZMVFN4WlFVRk1MRWxCUVhGQ0xFVkJRWFJDTEVWQlFUQkNReXhKUVVFNVJUdEJRVU5CTzBGQlEwRXNZVUZCVHl4TFFVRkxSQ3haUVVGYU8wRkJRMFE3T3p0MVEwRkZhMEpGTEVjc1JVRkJTenRCUVVOMFFqdEJRVU5CTzBGQlEwRXNWVUZCU1VNc1VVRkJVU3hMUVVGTFdpeE5RVUZNTEVOQlFWbGhMRWxCUVZvc1EwRkJhVUlzVlVGQlEwTXNVMEZCUkN4RlFVRmxPMEZCUXpGRExGbEJRVWtzVDBGQlQwRXNWVUZCVlVNc1MwRkJha0lzUzBGQk1rSXNVVUZCTDBJc1JVRkJlVU03UVVGRGRrTXNhVUpCUVU5S0xGRkJRVkZITEZWQlFWVkRMRXRCUVhwQ08wRkJRMFFzVTBGR1JDeE5RVVZQTEVsQlFVa3NUMEZCVDBRc1ZVRkJWVU1zUzBGQmFrSXNTMEZCTWtJc1ZVRkJMMElzUlVGQk1rTTdRVUZEYUVRc2FVSkJRVTlFTEZWQlFWVkRMRXRCUVZZc1EwRkJaMEpLTEVkQlFXaENMRU5CUVZBN1FVRkRSQ3hUUVVaTkxFMUJSVUVzU1VGQlNVY3NWVUZCVlVNc1MwRkJWaXhaUVVFeVFrTXNUVUZCTDBJc1JVRkJkVU03UVVGRE5VTXNhVUpCUVU5TUxFbEJRVWxKTEV0QlFVb3NRMEZCVlVRc1ZVRkJWVU1zUzBGQmNFSXNRMEZCVUR0QlFVTkVPMEZCUTBZc1QwRlNWeXhEUVVGYU96dEJRVlZCWWl4alFVRlJReXhIUVVGU0xITkRRVUVyUTFFc1IwRkJMME1zV1VGQmVVUXNRMEZCUTBNc1UwRkJVeXhGUVVGV0xFVkJRV05HTEVsQlFYWkZPMEZCUTBFc1lVRkJUMFVzUzBGQlVEdEJRVU5FTzBGQlEwUTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3T3pzNFFrRkRWVVFzUnl4RlFVRkxPMEZCUVVFN08wRkJRMkpCTEZsQlFVMUJMRWxCUVVsTkxFdEJRVW9zUTBGQlZTeERRVUZXTEVOQlFVNDdRVUZEUVR0QlFVTkJMRlZCUVVsRExHZENRVUZuUWl4TFFVRkxReXgxUWtGQlRDeEZRVUZ3UWp0QlFVTkJPMEZCUTBFc1ZVRkJTVU1zVjBGQlZ5eExRVUZMUXl4clFrRkJUQ3hEUVVGM1FsWXNSMEZCZUVJc1EwRkJaanRCUVVOQk8wRkJRMEU3TzBGQlJVRTdPMEZCUlVFN1FVRkRRVmNzWTBGQlVVTXNUMEZCVWl4SFFVTkhReXhKUVVSSUxFTkJRMUU3UVVGQlFTeGxRVUZOVGl4cFFrRkJhVUpCTEdOQlFXTlBMRTlCUVM5Q0xFbEJRVEJEVUN4alFVRmpUeXhQUVVGa0xFTkJRWE5DY2tJc1QwRkJUMGNzVVVGQlVDeERRVUZuUWtNc1NVRkJkRU1zUlVGQk5FTXNUMEZCUzFRc1VVRkJha1FzUTBGQmFFUTdRVUZCUVN4UFFVUlNPMEZCUlVVN1FVRkdSaXhQUVVkSGVVSXNTVUZJU0N4RFFVZFJPMEZCUVVFc1pVRkJUVW9zV1VGQldVRXNVMEZCVTAwc1lVRkJja0lzU1VGQmMwTk9MRk5CUVZOTkxHRkJRVlFzUTBGQmRVSjBRaXhQUVVGUFJ5eFJRVUZRTEVOQlFXZENReXhKUVVGMlF5eEZRVUUyUXl4UFFVRkxWQ3hSUVVGc1JDeERRVUUxUXp0QlFVRkJMRTlCU0ZJN1FVRkpSVHM3UVVGS1JpeFBRVTFIZVVJc1NVRk9TQ3hEUVUxUk8wRkJRVUVzWlVGQlRVb3NXVUZCV1VFc1UwRkJVMDhzVDBGQmNrSXNTVUZCWjBOUUxGTkJRVk5QTEU5QlFWUXNRMEZCYVVKMlFpeFBRVUZQUnl4UlFVRlFMRU5CUVdkQ1F5eEpRVUZxUXl4RlFVRjFReXhQUVVGTFZDeFJRVUUxUXl4RFFVRjBRenRCUVVGQkxFOUJUbElzUlVGUFIzbENMRWxCVUVnc1EwRlBVU3haUVVGTk8wRkJRMVlzWlVGQlMyWXNXVUZCVEN4SFFVRnZRbGNzVVVGQmNFSTdRVUZEUVR0QlFVTklMRTlCVmtRN1FVRlhSRHM3T3pzN08wRkJRMFk3TzJ0Q1FVVmpka0lzVFRzN1FVRkpaanRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU0lzSW1acGJHVWlPaUp5YjNWMFpYSXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lKY2NseHVMeThnMFlIUXZOR0wwWUhRdXlEUXY5QyswTDNSajlDN0xDRFF2OUMrMFlMUXZ0QzhJTkM5MExEUXY5QzQwWWpSZ3lEUmdkQ3kwTDdRdVZ4eVhHNWNjbHh1WTJ4aGMzTWdVbTkxZEdWeUlIdGNjbHh1SUNCamIyNXpkSEoxWTNSdmNpaGpiMjVtYVdjcElIdGNjbHh1SUNBZ0lIUm9hWE11WlhabGJuUkNkWE1nUFNCamIyNW1hV2N1WlhabGJuUkNkWE03WEhKY2JpQWdJQ0IwYUdsekxuSnZkWFJsY3lBOUlHTnZibVpwWnk1eWIzVjBaWE1nZkh3Z1cxMDdYSEpjYmx4eVhHNGdJQ0FnZEdocGN5NXBibWwwS0NrN1hISmNiaUFnZlZ4eVhHNWNjbHh1SUNCcGJtbDBLQ2tnZTF4eVhHNGdJQ0FnWTI5dWMyOXNaUzVzYjJjb0p5MHRMVDRnY205MWRHVnlJR2x1YVhRbktUdGNjbHh1SUNBZ0lDOHZJREV1SU5DZjBMN1F0TkMvMExqUmdkQ3cwWUxSakNCMGFHbHpMbWhoYm1Sc1pWVnliQ0RRdmRDd0lOQzQwTGZRdk5DMTBMM1F0ZEM5MExqUmp5QjFjbXhjY2x4dUlDQWdJSGRwYm1SdmR5NWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZG9ZWE5vWTJoaGJtZGxKeXdnS0NrZ1BUNGdkR2hwY3k1b1lXNWtiR1ZWY213b2QybHVaRzkzTG14dlkyRjBhVzl1TG1oaGMyZ3BLVHRjY2x4dUlDQWdJQzh2SURJdUlOQ1MwWXZRdjlDKzBMdlF2ZEM0MFlMUmpDQjBhR2x6TG1oaGJtUnNaVlZ5YkZ4eVhHNGdJQ0FnZEdocGN5NW9ZVzVrYkdWVmNtd29kMmx1Wkc5M0xteHZZMkYwYVc5dUxtaGhjMmdwTzF4eVhHNGdJSDFjY2x4dVhISmNiaUFnWm1sdVpGQnlaWFpwYjNWelFXTjBhWFpsVW05MWRHVW9LU0I3WEhKY2JpQWdJQ0JqYjI1emIyeGxMbXh2WnloZ0xTMHRQaUJ5YjNWMFpYSWdabWx1WkZCeVpYWnBiM1Z6UVdOMGFYWmxVbTkxZEdVNklDUjdLSFJvYVhNdVkzVnljbVZ1ZEZKdmRYUmxJSHg4SUh0OUtTNXVZVzFsZldBcE8xeHlYRzRnSUNBZ0x5OGcwSjNRc05DNTBZTFF1Q0RSZ05DKzBZUFJnaURSZ1NEUXV0QyswWUxRdnRHQTBMN1FzOUMrSU5HRDBZWFF2dEMwMExqUXZGeHlYRzRnSUNBZ2NtVjBkWEp1SUhSb2FYTXVZM1Z5Y21WdWRGSnZkWFJsTzF4eVhHNGdJSDFjY2x4dVhISmNiaUFnWm1sdVpFNWxkMEZqZEdsMlpWSnZkWFJsS0hWeWJDa2dlMXh5WEc0Z0lDQWdMeThnMEozUXNOQzUwWUxRdUNEUmdOQyswWVBSZ2lEUXZkQ3dJTkM2MEw3Umd0QyswWURSaTlDNUlOQy8wTFhSZ05DMTBZWFF2dEMwMExqUXZGeHlYRzRnSUNBZ0x5OGdZMjl1YzI5c1pTNXNiMmNvZEdocGN5NXliM1YwWlhNcE8xeHlYRzRnSUNBZ2JHVjBJSEp2ZFhSbElEMGdkR2hwY3k1eWIzVjBaWE11Wm1sdVpDZ29jbTkxZEdWSmRHVnRLU0E5UGlCN1hISmNiaUFnSUNBZ0lHbG1JQ2gwZVhCbGIyWWdjbTkxZEdWSmRHVnRMbTFoZEdOb0lEMDlQU0FuYzNSeWFXNW5KeWtnZTF4eVhHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCMWNtd2dQVDA5SUhKdmRYUmxTWFJsYlM1dFlYUmphRHRjY2x4dUlDQWdJQ0FnZlNCbGJITmxJR2xtSUNoMGVYQmxiMllnY205MWRHVkpkR1Z0TG0xaGRHTm9JRDA5UFNBblpuVnVZM1JwYjI0bktTQjdYSEpjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSEp2ZFhSbFNYUmxiUzV0WVhSamFDaDFjbXdwTzF4eVhHNGdJQ0FnSUNCOUlHVnNjMlVnYVdZZ0tISnZkWFJsU1hSbGJTNXRZWFJqYUNCcGJuTjBZVzVqWlc5bUlGSmxaMFY0Y0NrZ2UxeHlYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQjFjbXd1YldGMFkyZ29jbTkxZEdWSmRHVnRMbTFoZEdOb0tUdGNjbHh1SUNBZ0lDQWdmVnh5WEc0Z0lDQWdmU2s3WEhKY2JseHlYRzRnSUNBZ1kyOXVjMjlzWlM1c2IyY29ZQzB0TFQ0Z2NtOTFkR1Z5SUdacGJtUk9aWGRCWTNScGRtVlNiM1YwWlRvZ0pIdDFjbXg5SUMwdElDUjdLSEp2ZFhSbElIeDhJSHQ5S1M1dVlXMWxmV0FwTzF4eVhHNGdJQ0FnY21WMGRYSnVJSEp2ZFhSbE8xeHlYRzRnSUgxY2NseHVJQ0F2THlCblpYUlNiM1YwWlZCaGNtRnRjeWh5YjNWMFpTd2dkWEpzS1NCN1hISmNiaUFnTHk4Z1hIUWdkbUZ5SUhCaGNtRnRjeUE5SUhWeWJDNXRZWFJqYUNoeWIzVjBaUzV0WVhSamFDa2dmSHdnVzEwN1hISmNiaUFnTHk4Z0lDQWdjR0Z5WVcxekxuTm9hV1owS0NrN1hISmNiaUFnTHk4Z0lDQWdjbVYwZFhKdUlIQmhjbUZ0Y3p0Y2NseHVJQ0F2THlCOUxGeHlYRzRnSUdoaGJtUnNaVlZ5YkNoMWNtd3BJSHRjY2x4dUlDQWdJSFZ5YkNBOUlIVnliQzV6YkdsalpTZ3hLVHRjY2x4dUlDQWdJQzh2SU5DZDBMRFF1ZEdDMExnZzBZTFF0ZEM2MFlQUmlkQzQwTGtnMFlEUXZ0R0QwWUpjY2x4dUlDQWdJR3hsZENCd2NtVjJhVzkxYzFKdmRYUmxJRDBnZEdocGN5NW1hVzVrVUhKbGRtbHZkWE5CWTNScGRtVlNiM1YwWlNncE8xeHlYRzRnSUNBZ0x5OGcwSjNRc05DNTBZTFF1Q0RRdmRDKzBMTFJpOUM1SU5HQTBMN1JnOUdDWEhKY2JpQWdJQ0JzWlhRZ2JtVjNVbTkxZEdVZ1BTQjBhR2x6TG1acGJtUk9aWGRCWTNScGRtVlNiM1YwWlNoMWNtd3BPMXh5WEc0Z0lDQWdMeThnWTI5dWMyOXNaUzVzYjJjb2JtVjNVbTkxZEdVcE8xeHlYRzRnSUNBZ0x5OGdZMjl1YzI5c1pTNXNiMmNvZFhKc0tUdGNjbHh1WEhKY2JpQWdJQ0F2THlCc1pYUWdjbTkxZEdWUVlYSmhiWE1nUFNCMGFHbHpMbWRsZEZKdmRYUmxVR0Z5WVcxektHNWxkMUp2ZFhSbExDQjFjbXdwTzF4eVhHNWNjbHh1SUNBZ0lDOHZJTkNWMFlIUXU5QzRJTkMxMFlIUmd0R01JTkdBMEw3Umc5R0NJTkdCSU5DNjBMN1JndEMrMFlEUXZ0Q3owTDRnMFlQUmhkQyswTFRRdU5DOElDMGcwTExSaTlDLzBMN1F1OUM5MExqUmd0R01JTkMxMExQUXZpQXViMjVNWldGMlpWeHlYRzRnSUNBZ1VISnZiV2x6WlM1eVpYTnZiSFpsS0NsY2NseHVJQ0FnSUNBZ0xuUm9aVzRvS0NrZ1BUNGdjSEpsZG1sdmRYTlNiM1YwWlNBbUppQndjbVYyYVc5MWMxSnZkWFJsTG05dVRHVmhkbVVnSmlZZ2NISmxkbWx2ZFhOU2IzVjBaUzV2Ymt4bFlYWmxLSGRwYm1SdmR5NXNiMk5oZEdsdmJpNW9ZWE5vTENCMGFHbHpMbVYyWlc1MFFuVnpLU2xjY2x4dUlDQWdJQ0FnTHk4ZzBKL1F2dEdCMEx2UXRTRFJqZEdDMEw3UXM5QytJTkN5MFl2UXY5QyswTHZRdmRDNDBZTFJqQ0F1YjI1Q1pXWnZjbVZGYm5SbGNpRFF0TkM3MFk4ZzBMM1F2dEN5MEw3UXM5QytJTkN3MExyUmd0QzQwTExRdmRDKzBMUFF2aURSZ05DKzBZUFJndEN3WEhKY2JpQWdJQ0FnSUM1MGFHVnVLQ2dwSUQwK0lHNWxkMUp2ZFhSbElDWW1JRzVsZDFKdmRYUmxMbTl1UW1WbWIzSmxSVzUwWlhJZ0ppWWdibVYzVW05MWRHVXViMjVDWldadmNtVkZiblJsY2loM2FXNWtiM2N1Ykc5allYUnBiMjR1YUdGemFDd2dkR2hwY3k1bGRtVnVkRUoxY3lrcFhISmNiaUFnSUNBZ0lDOHZJTkNmMEw3UmdkQzcwTFVnMFkzUmd0QyswTFBRdmlEUXN0R0wwTC9RdnRDNzBMM1F1TkdDMFl3Z0xtOXVSVzUwWlhJZzBMVFF1OUdQSU5DOTBMN1FzOUMrMExMUXZ0Q3owTDRnMExEUXV0R0MwTGpRc3RDOTBMN1FzOUMrSU5HQTBMN1JnOUdDMExBZ0tDRFJndEMrMEx2UmpOQzYwTDRnMExYUmdkQzcwTGdnMFlFZ0xtOXVRbVZtYjNKbFJXNTBaWElnMExMUmdkQzFJTkMrMExvcFhISmNibHh5WEc0Z0lDQWdJQ0F1ZEdobGJpZ29LU0E5UGlCdVpYZFNiM1YwWlNBbUppQnVaWGRTYjNWMFpTNXZia1Z1ZEdWeUlDWW1JRzVsZDFKdmRYUmxMbTl1Ulc1MFpYSW9kMmx1Wkc5M0xteHZZMkYwYVc5dUxtaGhjMmdzSUhSb2FYTXVaWFpsYm5SQ2RYTXBLVnh5WEc0Z0lDQWdJQ0F1ZEdobGJpZ29LU0E5UGlCN1hISmNiaUFnSUNBZ0lGeDBYSFIwYUdsekxtTjFjbkpsYm5SU2IzVjBaU0E5SUc1bGQxSnZkWFJsTzF4eVhHNGdJQ0FnSUNCY2RGeDBMeThnZEdocGN5NWpkWEp5Wlc1MFVtOTFkR1ZRWVhKaGJYTWdQU0J5YjNWMFpWQmhjbUZ0Y3p0Y2NseHVJQ0FnSUgwcE8xeHlYRzRnSUgxY2NseHVmVHRjY2x4dVhISmNibVY0Y0c5eWRDQmtaV1poZFd4MElGSnZkWFJsY2p0Y2NseHVYSEpjYmx4eVhHNWNjbHh1THk4Z1kyeGhjM01nVW05MWRHVnlJSHRjY2x4dUx5OGdJQ0JqYjI1emRISjFZM1J2Y2loeWIzVjBaWE1zSUdWMlpXNTBRblZ6S1NCN1hISmNiaTh2SUNBZ0lDQjBhR2x6TG1WMlpXNTBRblZ6SUQwZ1pYWmxiblJDZFhNN1hISmNiaTh2SUNBZ0lDQjBhR2x6TG5KdmRYUmxjeUE5SUhKdmRYUmxjenRjY2x4dUx5OWNjbHh1THk4Z0lDQWdJSFJvYVhNdWFHRnVaR3hsU0dGemFFTm9ZVzVuWlNBOUlIUm9hWE11YUdGdVpHeGxTR0Z6YUVOb1lXNW5aUzVpYVc1a0tIUm9hWE1wTzF4eVhHNHZMeUFnSUgxY2NseHVMeTljY2x4dUx5OWNjbHh1THk4Z0lDQnBibWwwS0NrZ2UxeHlYRzR2THlBZ0lDQWdkMmx1Wkc5M0xtRmtaRVYyWlc1MFRHbHpkR1Z1WlhJb0oyaGhjMmhqYUdGdVoyVW5MQ0IwYUdsekxtaGhibVJzWlVoaGMyaERhR0Z1WjJVcE8xeHlYRzR2THlBZ0lDQWdkR2hwY3k1b1lXNWtiR1ZJWVhOb1EyaGhibWRsS0NrN1hISmNiaTh2SUNBZ2ZWeHlYRzR2TDF4eVhHNHZMeUFnSUdacGJtUlFjbVYyYVc5MWMwRmpkR2wyWlZKdmRYUmxLQ2tnZTF4eVhHNHZMMXh5WEc0dkx5QWdJSDFjY2x4dUx5OWNjbHh1THk4Z0lDQm1hVzVrVG1WM1FXTjBhWFpsVW05MWRHVW9LU0I3WEhKY2JpOHZYSEpjYmk4dklDQWdmVnh5WEc0dkwxeHlYRzR2TDF4eVhHNHZMeUFnSUdoaGJtUnNaVWhoYzJoRGFHRnVaMlVvS1NCN1hISmNiaTh2SUNBZ0lDQmpiMjV6ZENCc1lYTjBVbTkxZEdVZ1BTQjNhVzVrYjNjdWJHOWpZWFJwYjI0dWIyeGtWWEpzTzF4eVhHNHZMeUFnSUNBZ1kyOXVjM1FnYm1WM1VtOTFkR1VnUFNCM2FXNWtiM2N1Ykc5allYUnBiMjR1YUdGemFEdGNjbHh1THk5Y2NseHVMeTljY2x4dUx5OWNjbHh1THk4Z0lDQWdJQzh2SUd4aGMzUWdjbTkxZEdVZ2IyNU1aV0YyWlZ4eVhHNHZMeUFnSUNBZ2RHaHBjeTV5YjNWMFpYTmJiR0Z6ZEZKdmRYUmxYUzV2Ymt4bFlYWmxLSFJvYVhNdVpYWmxiblJDZFhNcFhISmNiaTh2SUNBZ0lDQWdJQzUwYUdWdUtDZ3BJRDArSUh0Y2NseHVMeThnSUNBZ0lDQWdJQ0F2THlCdVpYY2djbTkxZEdVZ1ltVm1iM0psUlc1MFpYSmNjbHh1THk4Z0lDQWdJQ0FnSUNCeVpYUjFjbTRnZEdocGN5NXliM1YwWlhOYmJtVjNVbTkxZEdWZExtOXVRbVZtYjNKbFJXNTBaWElvZEdocGN5NWxkbVZ1ZEVKMWN5azdYSEpjYmk4dklDQWdJQ0FnSUgwcFhISmNiaTh2SUNBZ0lDQWdJQzUwYUdWdUtDZ3BJRDArSUh0Y2NseHVMeThnSUNBZ0lDQWdJQ0F2THlCdVpYY2djbTkxZEdVZ2IyNUZiblJsY2x4eVhHNHZMeUFnSUNBZ0lDQWdJSEpsZEhWeWJpQjBhR2x6TG5KdmRYUmxjMXR1WlhkU2IzVjBaVjB1YjI1RmJuUmxjaWgwYUdsekxtVjJaVzUwUW5WektUdGNjbHh1THk4Z0lDQWdJQ0FnZlNsY2NseHVMeThnSUNBZ0lDQWdMbU5oZEdOb0tHVnljbTl5SUQwK0lIdGNjbHh1THk4Z0lDQWdJQ0FnSUNCamIyNXpiMnhsTG14dlp5aGxjbkp2Y2lrN1hISmNiaTh2SUNBZ0lDQWdJSDBwWEhKY2JpOHZJQ0FnZlZ4eVhHNHZMeUI5WEhKY2JpOHZYSEpjYmk4dklHVjRjRzl5ZENCa1pXWmhkV3gwSUZKdmRYUmxjanRjY2x4dUlsMTlcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvdXRpbHNcXFxccm91dGVyLmpzXCIsXCIvdXRpbHNcIikiXX0=
