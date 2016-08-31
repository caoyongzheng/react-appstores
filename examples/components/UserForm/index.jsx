import React, { PropTypes } from 'react'
import UserFormView from '../views/UserFormView/UserFormView'
import { Connector } from '../../../src'

function UserForm() {
  return (
    <Connector
      component={UserFormView}
      setActions={({ UserForm: { setUsername, setPassword } }) => (
        { setUsername, setPassword }
      )}
      setProps={({ UserForm: { username, password } }) => (
        { username, password }
      )}
      connects={{ UserForm: ['username', 'password'] }}
    />
  )
}

export default UserForm
