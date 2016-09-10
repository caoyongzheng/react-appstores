'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StoreSet = function StoreSet() {
  var _this = this;

  _classCallCheck(this, StoreSet);

  this.addStore = function (name, store) {
    var stores = _this.stores;
    // check the name whether exist,if exist,then thow err.

    if (stores[name]) {
      throw 'the store "' + name + '" is already exist, can\'t add again';
    }

    if (_lodash2.default.isEmpty(store)) {
      throw 'the store "' + name + '" can\'t be empty';
    }
    store.name = name;
    store.storeSetDispatch = _this.dispatch;
    stores[name] = store;
  };

  this.getStore = function (name) {
    return _this.stores[name];
  };

  this.delStore = function (name) {
    var stores = _this.stores;

    if (stores[name]) {
      delete stores[name];
    }
  };

  this.dispatch = function (name, _ref) {
    var type = _ref.type;
    var state = _ref.state;
    var stores = _this.stores;
    var connectors = _this.connectors;
    var dispatchListeners = _this.dispatchListeners;

    if (stores[name]) {
      (function () {
        var store = stores[name];
        var newKeys = _lodash2.default.keys(state);
        var preState = {};
        if (dispatchListeners[name]) {
          _lodash2.default.merge(preState, stores[name].state);
        }

        // update the store state
        _lodash2.default.forEach(state, function (v, k) {
          store.state[k] = v;
        });

        // notify the connectors to update
        _lodash2.default.forEach(connectors, function (c) {
          var update = c.update;
          var connects = c.connects;

          if (_lodash2.default.intersection(connects[name], newKeys).length > 0) {
            update();
          }
        });

        // dispatch callBack
        if (dispatchListeners[name]) {
          _lodash2.default.forEach(dispatchListeners[name], function (h) {
            return h({ name: name, type: type, preState: preState, state: store.state });
          });
        }
      })();
    }
  };

  this.addDispatchListener = function (name, listener) {
    var key = _lodash2.default.uniqueId('listener_' + name + '_');
    if (!_this.dispatchListeners[name]) {
      _this.dispatchListeners[name] = {};
    }
    _this.dispatchListeners[name][key] = listener;
    return key;
  };

  this.removeDispatchListener = function (name, key) {
    if (_this.dispatchListeners[name] && _this.dispatchListeners[name][key]) {
      delete _this.dispatchListeners[name][key];
    }
  };

  this.stores = {};
  this.connectors = {}; // 所有连接器
  this.dispatchListeners = {}; // 分发事件监听函数
};

exports.default = StoreSet;
//# sourceMappingURL=StoreSet.js.map