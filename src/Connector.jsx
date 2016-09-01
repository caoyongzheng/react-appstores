import React, { PropTypes } from 'react'
import _ from 'lodash'

class Connector extends React.Component {
  componentWillMount() {
    const { setActions, setProps, connects } = this.props
    const { appstates, appactions, connectors } = this.context.appstores
    this.state = setProps ? setProps(appstates) : {}
    this.actions = setActions ? setActions(appactions) : {}
    this.id = _.uniqueId('connector_')
    this.updates = 0
    connectors[this.id] = {
      update: () => {
        this.setState(setProps(appstates))
        this.updates++
      },
      connects,
    }
  }
  componentWillUnmount() {
    if (this.context.appstores.connectors[this.id]) {
      delete this.context.appstores.connectors[this.id]
    }
  }
  render() {
    const { component, children, props } = this.props
    if (component) {
      return React.createElement(component, { ...props, ...this.actions, ...this.state })
    }
    if (children) {
      return React.cloneElement(children, { ...props, ...this.actions, ...this.state })
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
  setProps: PropTypes.func,
  connects: PropTypes.object,
  component: PropTypes.func,
  children: PropTypes.element,
  props: PropTypes.object,
}
export default Connector
