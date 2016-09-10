'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Connector = function (_React$Component) {
  _inherits(Connector, _React$Component);

  function Connector() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Connector);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Connector.__proto__ || Object.getPrototypeOf(Connector)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      update: 0
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Connector, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var _props = this.props;
      var setProps = _props.setProps;
      var connects = _props.connects;
      var _context$storeSet = this.context.storeSet;
      var stores = _context$storeSet.stores;
      var connectors = _context$storeSet.connectors;

      this.id = _lodash2.default.uniqueId('connector_');
      connectors[this.id] = {
        update: function update() {
          return _this2.setState({ update: _this2.state.update + 1 });
        },
        connects: connects || {}
      };
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.context.storeSet.connectors[this.id]) {
        delete this.context.storeSet.connectors[this.id];
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var component = _props2.component;
      var children = _props2.children;
      var props = _props2.props;
      var setProps = _props2.setProps;
      var stores = this.context.storeSet.stores;

      if (component) {
        return _react2.default.createElement(component, _extends({}, props, this.actions, setProps(stores)));
      }
      if (children) {
        return _react2.default.cloneElement(children, _extends({}, props, this.actions, setProps(states, actions)));
      }
      return null;
    }
  }]);

  return Connector;
}(_react2.default.Component);

Connector.contextTypes = {
  storeSet: _react.PropTypes.object.isRequired
};
Connector.defaulProps = {
  setProps: function setProps() {},
  connects: {},
  props: {}
};
Connector.propTypes = {
  setActions: _react.PropTypes.func,
  setProps: _react.PropTypes.func.isRequired,
  connects: _react.PropTypes.object,
  component: _react.PropTypes.func,
  children: _react.PropTypes.element,
  props: _react.PropTypes.object
};
exports.default = Connector;
//# sourceMappingURL=Connector.js.map