import React, { PropTypes } from 'react'

class DispatchListener extends React.Component {
  componentWillMount() {
    const { storeName, type, handle } = this.props
    this.id = this.context.appstores.addDispatchListener({
      storeName,
      type,
      handle,
    })
  }
  componentWillUnmount() {
    this.context.appstores.removeDispatchListener(this.id)
  }
  render() {
    const { children } = this.props
    return children || null
  }
}
DispatchListener.contextTypes = {
  appstores: PropTypes.object.isRequired,
}
DispatchListener.propTypes = {
  storeName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handle: PropTypes.func.isRequired,
}
export default DispatchListener
