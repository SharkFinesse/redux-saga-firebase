'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isDev = function isDev() {
  return process.env.NODE_ENV !== 'production';
};

function assert(condition, message) {
  if (isDev() && !condition) throw Error(message);
}

exports.default = assert;