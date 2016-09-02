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
    _classCallCheck(this, Connector);

    return _possibleConstructorReturn(this, (Connector.__proto__ || Object.getPrototypeOf(Connector)).apply(this, arguments));
  }

  _createClass(Connector, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var _props = this.props;
      var setActions = _props.setActions;
      var setProps = _props.setProps;
      var connects = _props.connects;
      var _context$appstores = this.context.appstores;
      var states = _context$appstores.states;
      var appactions = _context$appstores.appactions;
      var connectors = _context$appstores.connectors;

      this.state = setProps ? setProps(states) : {};
      this.actions = setActions ? setActions(appactions) : {};
      this.id = _lodash2.default.uniqueId('connector_');
      this.updates = 0;
      connectors[this.id] = {
        update: function update() {
          _this2.setState(setProps(states));
          _this2.updates++;
        },
        connects: connects
      };
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.context.appstores.connectors[this.id]) {
        delete this.context.appstores.connectors[this.id];
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var component = _props2.component;
      var children = _props2.children;
      var props = _props2.props;

      if (component) {
        return _react2.default.createElement(component, _extends({}, props, this.actions, this.state));
      }
      if (children) {
        return _react2.default.cloneElement(children, _extends({}, props, this.actions, this.state));
      }
      return null;
    }
  }]);

  return Connector;
}(_react2.default.Component);

Connector.contextTypes = {
  appstores: _react.PropTypes.object.isRequired
};
Connector.defaulProps = {
  setActions: function setActions() {},
  setProps: function setProps() {},
  connects: {},
  props: {}
};
Connector.propTypes = {
  setActions: _react.PropTypes.func,
  setProps: _react.PropTypes.func,
  connects: _react.PropTypes.object,
  component: _react.PropTypes.func,
  children: _react.PropTypes.element,
  props: _react.PropTypes.object
};
exports.default = Connector;
//# sourceMappingURL=Connector.js.map