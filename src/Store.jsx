class Store {
  constructor({ actionFactory, state }) {
    this.actionFactory = actionFactory || (() => {})
    this.state = state || {}
  }
}

export default Store
