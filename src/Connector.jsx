import React, { PropTypes } from 'react'
import _ from 'lodash'



class Connector extends React.Component {
  state = {
    update: 0,
  }
  componentWillMount() {
    const { setActions, setProps, connects } = this.props
    const { states, actions, connectors } = this.context.appstores
    this.actions = setActions ? setActions(actions) : {}
    this.id = _.uniqueId('connector_')
    connectors[this.id] = {
      update: () => this.setState({ update: this.state.update + 1 }),
      connects: connects || {},
    }
  }
  componentWillUnmount() {
    if (this.context.appstores.connectors[this.id]) {
      delete this.context.appstores.connectors[this.id]
    }
  }
  render() {
    const { component, children, props, setProps } = this.props
    const { states, actions } = this.context.appstores
    if (component) {
      return React.createElement(
        component,
        { ...props, ...this.actions, ...setProps(states, actions) },
      )
    }
    if (children) {
      return React.cloneElement(
        children,
        { ...props, ...this.actions, ...setProps(states, actions) }
      )
    }
    return null
  }
}
Connector.contextTypes = {
  appstores: PropTypes.object.isRequired,
}
Connector.defaulProps = {
  setActions: () => {},
  setProps: () => {},
  connects: {},
  props: {},
}
Connector.propTypes = {
  setActions: PropTypes.func,
  setProps: PropTypes.func.isRequired,
  connects: PropTypes.object,
  component: PropTypes.func,
  children: PropTypes.element,
  props: PropTypes.object,
}
export default Connector
