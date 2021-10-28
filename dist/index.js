"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.get = get;
exports.set = set;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function set(url, options) {
  /* Constructing Parameters passed */
  if (!url && !options) {
    return '';
  }

  if (url) {
    if ((0, _typeof2["default"])(url) === 'object') {
      options = url;
      url = '';
    }
  } else {
    url = '';
  }

  if (!options) {
    options = {};
  }

  if (!url && options && options.url) {
    url = options.url;
  }
  /* Removing last slash if present */


  url = url.replace(/(.*)\/$/, "$1");
  /* Supplying options */

  if (options) {
    var qs = [];
    var temp = get(url);
    options.query = _objectSpread(_objectSpread({}, temp || {}), options.query);

    if (options.query) {
      url = url.replace(/(.*)\/$/, "$1");

      for (var key in options.query) {
        if (options.query[key] !== undefined && options.query[key] !== null) {
          qs.push("".concat(key, "=").concat(encodeURIComponent(String(options.query[key]).trim())));
        }
      }
    }

    url = url.replace(/(.*)\?.*$/, "$1");
    return "".concat(url).concat(qs.length > 0 ? "?".concat(qs.join('&')) : '');
    ;
  }
}

function get(url, key) {
  try {
    var extra = url.match(/.*\?(.*)$/);

    if (extra) {
      if (extra[1]) {
        var obj = {};
        var params = extra[1].split('&');

        if (params && params.length > 0) {
          for (var i = 0; i < params.length; i++) {
            var temp = params[i].split('=');
            obj[temp[0]] = decodeURIComponent(temp[1] || true);
          }
        }

        if (key) {
          return obj[key];
        }

        return obj;
      }
    }
  } catch (e) {
    console.log(e);
  }

  return undefined;
}

var _default = {
  set: set,
  get: get
};
exports["default"] = _default;