import React, { PropTypes } from 'react'

class DispatchListener extends React.Component {
  componentWillMount() {
    const { name, type, handle } = this.props
    this.name = name
    function handler(props) {
      if (props.type === type || type === '*') {
        handle(props)
      }
    }
    this.id = this.context.storeSet.addDispatchListener(
      this.name,
      handler,
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
  type: PropTypes.string,
  handler: PropTypes.func.isRequired,
}
export default DispatchListener
