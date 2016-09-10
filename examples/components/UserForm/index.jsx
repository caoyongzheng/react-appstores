import React, { PropTypes } from 'react'
import UserFormView from '../views/UserFormView/UserFormView'
import { Connector } from '../../../src'

function UserForm() {
  return (
    <Connector
      component={UserFormView}
      connects={{ UserFormStore: ['username', 'password'] }}
      setProps={({ UserFormStore }) => ({
        username: UserFormStore.state.username,
        password: UserFormStore.state.password,
        setUsername: UserFormStore.actions.setUsername,
        setPassword: UserFormStore.actions.setPassword,
      })}
    />
  )
}

export default UserForm
