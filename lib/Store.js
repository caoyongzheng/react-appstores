'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = function Store(_ref) {
  var _this = this;

  var actions = _ref.actions;
  var state = _ref.state;

  _classCallCheck(this, Store);

  this.getState = function () {
    return _this.state;
  };

  this.dispatch = function (action) {
    if (_this.storeSetDispatch) {
      _this.storeSetDispatch(_this.name, action);
    }
  };

  this.actions = {};
  this.state = state || {};

  var getState = this.getState;
  var dispatch = this.dispatch;

  _lodash2.default.forEach(actions, function (a, k) {
    _this.actions[k] = a.bind(_this);
  });
};

exports.default = Store;
//# sourceMappingURL=Store.js.map