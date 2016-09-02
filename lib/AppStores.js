'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppStores = function AppStores(_ref) {
  var _this = this;

  var stores = _ref.stores;

  _classCallCheck(this, AppStores);

  this.getStoreState = function (storeName) {
    return _this.appstates[storeName];
  };

  this.dispatch = function (storeName, _ref2) {
    var type = _ref2.type;
    var state = _ref2.state;

    var preStates = {};
    var listeners = [];
    _lodash2.default.forEach(_this.dispatchListeners, function (l) {
      if (l.storeName === storeName && l.type === type) {
        listeners.push(l);
      }
    });
    if (listeners.length > 0) {
      _lodash2.default.merge(preStates, _this.appstates);
    }
    _this.setStoreState(storeName, state);

    // 更新状态到连接器中
    var keys = _lodash2.default.keys(state);
    _lodash2.default.forEach(_this.connectors, function (connector) {
      var update = connector.update;
      var connects = connector.connects;
      // 如果该连接器的连接列表中，有当前storeName且

      if (_lodash2.default.intersection(connects[storeName], keys).length > 0) {
        update();
      }
    });

    // 回调函数
    if (listeners.length) {
      _lodash2.default.forEach(listeners, function (l) {
        l.handle({ type: type, storeName: storeName, preStates: preStates, states: _this.appstates });
      });
    }
  };

  this.addDispatchListener = function (listener) {
    var key = _lodash2.default.uniqueId('listener_');
    _this.dispatchListeners[key] = listener;
    return key;
  };

  this.removeDispatchListener = function (key) {
    if (_this.dispatchListeners[key]) {
      delete _this.dispatchListeners[key];
    }
  };

  this.setStoreState = function (storeName, state) {
    var storestate = _this.appstates[storeName];
    if (storestate) {
      var keys = _lodash2.default.keys(state);
      _lodash2.default.forEach(keys, function (k) {
        storestate[k] = state[k];
      });
    }
  };

  this.addStore = function (storeName, store) {
    _this.stores[storeName] = store;

    var state = store.state;
    var actionFactory = store.actionFactory;
    // 初始化appstates

    _this.appstates[storeName] = {};
    _lodash2.default.merge(_this.appstates[storeName], state);
    // 初始化appactions
    _this.appactions[storeName] = {};
    _lodash2.default.merge(_this.appactions[storeName], actionFactory({
      getState: function getState() {
        return _this.getStoreState(storeName);
      },
      dispatch: function dispatch(value) {
        return _this.dispatch(storeName, value);
      }
    }));
  };

  this.delStore = function (storeName) {
    if (_this.appstates[storeName]) {
      delete _this.appstates[storeName];
    }
    if (_this.appstates[storeName]) {
      delete _this.appstates[storeName];
    }
    if (_this.appactions[storeName]) {
      delete _this.appactions[storeName];
    }
  };

  this.stores = stores;
  this.connectors = {}; // 所有连接器
  this.appstates = {}; // 所有状态
  this.appactions = {}; // 所有动作
  this.dispatchListeners = {}; // 分发事件监听器

  // 初始化appstates和appactions
  _lodash2.default.forEach(stores, function (store, storeName) {
    _this.addStore(storeName, store);
  });
};

exports.default = AppStores;
//# sourceMappingURL=AppStores.js.map