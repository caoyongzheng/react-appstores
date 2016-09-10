import React from 'react'
import { storeSet, StoreSetProvider } from '../src'
import UserForm from './components/UserForm'
import UserFormStore from './stores/UserFormStore'

class StoreApp extends React.Component {
  constructor(props) {
    super(props)
    storeSet.addStore('UserForm', UserFormStore)
  }
  render() {
    return (
      <StoreSetProvider storeSet={storeSet}>
        <UserForm />
      </StoreSetProvider>
    )
  }
}

export default StoreApp
