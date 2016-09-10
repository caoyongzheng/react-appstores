import _ from 'lodash'

class Store {
  constructor({ actions, state }) {
    this.actions = {}
    this.state = state || {}

    const { getState, dispatch } = this
    _.forEach(actions, (a, k) => {
      this.actions[k] = a.bind(this)
    })
  }
  getState = () => this.state
  dispatch = (action) => {
    if (this.storeSetDispatch) {
      this.storeSetDispatch(this.name, action)
    }
  }
}

export default Store
