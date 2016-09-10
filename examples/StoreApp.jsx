import React from 'react'
import { storeSet, StoreSetProvider, DispatchListener } from '../src'
import UserForm from './components/UserForm'
import UserFormStore from './stores/UserFormStore'

class StoreApp extends React.Component {
  constructor(props) {
    super(props)
    storeSet.addStore('UserFormStore', UserFormStore)
  }
  handler = ({ state }) => {
    console.log(`the "SetUsername" action of "UserFormStore" has been called, the new username is ${state.username}`)
  }
  render() {
    return (
      <StoreSetProvider storeSet={storeSet}>
        <div>
          <DispatchListener name={'UserFormStore'} type={'SetUsername'} handler={this.handler} />
          <UserForm />
        </div>
      </StoreSetProvider>
    )
  }
}

export default StoreApp
