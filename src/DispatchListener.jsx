import React, { PropTypes } from 'react'

class DispatchListener extends React.Component {
  componentWillMount() {
    const { name, type, handler } = this.props
    this.name = name
    this.id = this.context.storeSet.addDispatchListener(
      this.name,
      (action) => {
        if (action.type === type) {
          handler(action)
        }
      },
    )
  }
  componentWillUnmount() {
    this.context.storeSet.removeDispatchListener(this.name, this.id)
  }
  render() {
    const { children } = this.props
    return children || null
  }
}
DispatchListener.contextTypes = {
  storeSet: PropTypes.object.isRequired,
}
DispatchListener.defaultProps = {
  type: '*'
}
DispatchListener.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
}
export default DispatchListener
