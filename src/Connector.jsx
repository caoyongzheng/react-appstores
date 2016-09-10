import React, { PropTypes } from 'react'
import _ from 'lodash'

class Connector extends React.Component {
  state = {
    update: 0,
  }
  componentWillMount() {
    const { setProps, connects } = this.props
    const { stores, connectors } = this.context.storeSet
    this.id = _.uniqueId('connector_')
    connectors[this.id] = {
      update: () => this.setState({ update: this.state.update + 1 }),
      connects: connects || {},
    }
  }
  componentWillUnmount() {
    if (this.context.storeSet.connectors[this.id]) {
      delete this.context.storeSet.connectors[this.id]
    }
  }
  render() {
    const { component, children, props, setProps } = this.props
    const { stores } = this.context.storeSet
    if (component) {
      return React.createElement(
        component,
        { ...props, ...this.actions, ...setProps(stores) },
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
  storeSet: PropTypes.object.isRequired,
}
Connector.defaulProps = {
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
