import React, { PropTypes } from 'react'
import UserFormView from '../views/UserFormView/UserFormView'
import { Connector } from '../../../src'

function UserForm() {
  return (
    <Connector
      component={UserFormView}
      connects={{ UserForm: ['username', 'password'] }}
      setProps={(states, actions) => ({
        username: states.UserForm.username,
        password: states.UserForm.password,
        setUsername: actions.UserForm.setUsername,
        setPassword: actions.UserForm.setPassword,
      })}
    />
  )
}

export default UserForm
