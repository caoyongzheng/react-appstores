import React, { PropTypes } from 'react'

class AppStoresProvider extends React.Component {
  getChildContext = () => ({ appstores: this.props.appstores })
  render() {
    return this.props.children
  }
}
AppStoresProvider.childContextTypes = {
  appstores: PropTypes.object.isRequired,
}
AppStoresProvider.propTypes = {
  appstores: PropTypes.object.isRequired,
  children: PropTypes.element,
}
export default AppStoresProvider
