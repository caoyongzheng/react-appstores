import _ from 'lodash'

export default class StoreSet {
  constructor() {
    this.stores = {}
    this.connectors = {}  // 所有连接器
    this.dispatchListeners = {} // 分发事件监听函数
  }
  addStore = (name, store) => {
    const { stores } = this
    // check the name whether exist,if exist,then thow err.
    if (stores[name]) {
      throw `the store "${name}" is already exist, can't add again`
    }

    if (_.isEmpty(store)) {
      throw `the store "${name}" can't be empty`
    }
    store.name = name
    store.storeSetDispatch = this.dispatch
    stores[name] = store
  }
  getStore = (name) => this.stores[name]
  delStore = (name) => {
    const { stores } = this
    if (stores[name]) {
      delete stores[name]
    }
  }
  dispatch = (name, { type, state }) => {
    const { stores, connectors, dispatchListeners } = this
    if (stores[name]) {
      const store = stores[name]
      const newKeys = _.keys(state)
      const preState = {}
      if (dispatchListeners[name]) {
        _.merge(preState, stores[name].state)
      }

      // update the store state
      _.forEach(state, (v, k) => {
        store.state[k] = v
      })

      // notify the connectors to update
      _.forEach(connectors, (c) => {
        const { update, connects } = c
        if (_.intersection(connects[name], newKeys).length > 0) {
          update()
        }
      })

      // dispatch callBack
      if (dispatchListeners[name]) {
        _.forEach(dispatchListeners[name], (h) => h({ name, type, preState, state: store.state }))
      }
    }
  }
  addDispatchListener = (name, listener) => {
    const key = _.uniqueId(`listener_${name}_`)
    if (!this.dispatchListeners[name]) {
      this.dispatchListeners[name] = {}
    }
    this.dispatchListeners[name][key] = listener
    return key
  }
  removeDispatchListener = (name, key) => {
    if (this.dispatchListeners[name] && this.dispatchListeners[name][key]) {
      delete this.dispatchListeners[name][key]
    }
  }
}
