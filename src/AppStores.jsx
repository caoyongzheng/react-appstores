import _ from 'lodash'

class AppStores {
  constructor({ stores }) {
    this.stores = stores
    this.connectors = {}  // 所有连接器
    this.appstates = {} // 所有状态
    this.appactions = {} // 所有动作

     // 初始化appstates和appactions
    _.forEach(stores, (store, storeName) => {
      const { state, actionFactory } = store
      // 初始化appstates
      this.appstates[storeName] = state
      // 初始化appactions
      this.appactions[storeName] = {}
      _.merge(this.appactions[storeName], actionFactory({
        getState: () => this.getStoreState(storeName),
        dispatch: (value) => this.dispatch(storeName, value),
      }))
    })
  }
  getStoreState = (storeName) => this.appstates[storeName]
  dispatch = (storeName, { type, state }) => {
    const preStates = {}
    if (this.didDispatch) {
      _.merge(preStates, this.appstates)
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
    if (this.didDispatch) {
      this.didDispatch({ type, storeName, preStates, states: this.appstates })
    }
  }
  setStoreState = (storeName, state) => {
    const storestate = this.appstates[storeName]
    if (storestate) {
      const keys = _.keys(state)
      _.forEach(keys, (k) => {
        storestate[k] = state[k]
      })
    }
  }
}

export default AppStores
