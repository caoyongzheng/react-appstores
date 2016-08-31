import React, { PropTypes } from 'react'

class UserFormView extends React.Component {
  state = {}
  render() {
    const { username, password, setUsername, setPassword } = this.props
    return (
      <form>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
      </form>
    )
  }
}
UserFormView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
}
export default UserFormView
