import _ from 'lodash'

class AppStores {
  constructor({ stores }) {
    this.stores = stores || {}
    this.connectors = {}  // 所有连接器
    this.states = {} // 所有状态
    this.actions = {} // 所有动作
    this.dispatchListeners = {} // 分发事件监听器

     // 初始化states和actions
    _.forEach(stores, (store, storeName) => {
      this.addStore(storeName, store)
    })
  }
  getStoreState = (storeName) => this.states[storeName]
  dispatch = (storeName, { type, state }) => {
    const preStates = {}
    const listeners = []
    _.forEach(this.dispatchListeners, (l) => {
      if (l.storeName === storeName && l.type === type) {
        listeners.push(l)
      }
    })
    if (listeners.length > 0) {
      _.merge(preStates, this.states)
    }
    this.setStoreState(storeName, state)

    // 更新状态到连接器中
    const keys = _.keys(state)
    _.forEach(this.connectors, (connector) => {
      const { update, connects } = connector
      // 如果该连接器的连接列表中，有当前storeName且
      if (_.intersection(connects[storeName], keys).length > 0) {
        update()
      }
    })

    // 回调函数
    if (listeners.length) {
      _.forEach(listeners, (l) => {
        l.handle({ type, storeName, preStates, states: this.states })
      })
    }
  }
  addDispatchListener = (listener) => {
    const key = _.uniqueId('listener_')
    this.dispatchListeners[key] = listener
    return key
  }
  removeDispatchListener = (key) => {
    if (this.dispatchListeners[key]) {
      delete this.dispatchListeners[key]
    }
  }
  setStoreState = (storeName, state) => {
    const storestate = this.states[storeName]
    if (storestate) {
      const keys = _.keys(state)
      _.forEach(keys, (k) => {
        storestate[k] = state[k]
      })
    }
  }
  addStore = (storeName, store) => {
    this.stores[storeName] = store

    const { state, actionFactory } = store
    // 初始化states
    this.states[storeName] = {}
    _.merge(this.states[storeName], state)
    // 初始化actions
    this.actions[storeName] = {}
    _.merge(this.actions[storeName], actionFactory({
      getState: () => this.getStoreState(storeName),
      dispatch: (value) => this.dispatch(storeName, value),
    }))
  }
  delStore = (storeName) => {
    if (this.states[storeName]) {
      delete this.states[storeName]
    }
    if (this.states[storeName]) {
      delete this.states[storeName]
    }
    if (this.actions[storeName]) {
      delete this.actions[storeName]
    }
  }
}

export default AppStores
