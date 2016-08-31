import React from 'react'
import { AppStores, AppStoresProvider } from '../src'
import UserForm from './components/UserForm'
import UserFormStore from './stores/UserFormStore'

class StoreApp extends React.Component {
  constructor(props) {
    super(props)
    this.appstores = new AppStores({
      stores: {
        UserForm: UserFormStore,
      },
    })
  }
  render() {
    return (
      <AppStoresProvider appstores={this.appstores}>
        <UserForm />
      </AppStoresProvider>
    )
  }
}

export default StoreApp
