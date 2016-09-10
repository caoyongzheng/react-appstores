import React, { PropTypes, Children } from 'react'

class StoreSetProvider extends React.Component {
  getChildContext = () => ({ storeSet: this.props.storeSet })
  render() {
    return Children.only(this.props.children)
  }
}
StoreSetProvider.childContextTypes = {
  storeSet: PropTypes.object.isRequired,
}
StoreSetProvider.propTypes = {
  storeSet: PropTypes.object.isRequired,
  children: PropTypes.element,
}
export default StoreSetProvider
