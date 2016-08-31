"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = function Store(_ref) {
  var actionFactory = _ref.actionFactory;
  var state = _ref.state;

  _classCallCheck(this, Store);

  this.actionFactory = actionFactory || function () {};
  this.state = state || {};
};

exports.default = Store;
//# sourceMappingURL=Store.js.map