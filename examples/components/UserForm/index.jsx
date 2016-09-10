import React, { PropTypes } from 'react'
import UserFormView from '../views/UserFormView/UserFormView'
import { Connector } from '../../../src'

function UserForm() {
  return (
    <Connector
      component={UserFormView}
      connects={{ UserForm: ['username', 'password'] }}
      setProps={({ UserForm }) => ({
        username: UserForm.state.username,
        password: UserForm.state.password,
        setUsername: UserForm.actions.setUsername,
        setPassword: UserForm.actions.setPassword,
      })}
    />
  )
}

export default UserForm
