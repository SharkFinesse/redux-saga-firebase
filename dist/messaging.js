'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _reduxSaga = require('redux-saga');

var _effects = require('redux-saga/effects');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(syncMessages),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(syncToken);

function channel() {
  if (this._messageChannel) return this._messageChannel;

  var messaging = this.app.messaging();

  var channel = (0, _reduxSaga.eventChannel)(function (emit) {
    var unsubscribe = messaging.onMessage(emit);

    return unsubscribe;
  });

  this._messageChannel = channel;
  return channel;
}

function syncMessages(options) {
  var channel;
  return _regenerator2.default.wrap(function syncMessages$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.call)(this.messaging.channel);

        case 2:
          channel = _context.sent;
          _context.next = 5;
          return (0, _effects.fork)(_utils.syncChannel, channel, options);

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

function tokenRefreshChannel() {
  if (this._tokenRefreshChannel) return this._tokenRefreshChannel;
  var messaging = this.app.messaging();

  var channel = (0, _reduxSaga.eventChannel)(function (emit) {
    var unsubscribe = messaging.onTokenRefresh(function () {
      messaging.getToken().then(emit);
    });

    return unsubscribe;
  });

  this._tokenRefreshChannel = channel;
  return channel;
}

function syncToken(options) {
  var channel;
  return _regenerator2.default.wrap(function syncToken$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.call)(this.messaging.tokenRefreshChannel);

        case 2:
          channel = _context2.sent;
          _context2.next = 5;
          return (0, _effects.fork)(_utils.syncChannel, channel, options);

        case 5:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

exports.default = {
  channel: channel,
  syncMessages: syncMessages,
  syncToken: syncToken,
  tokenRefreshChannel: tokenRefreshChannel
};