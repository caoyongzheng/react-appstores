import { Store } from '../../../src'
import actionFactory from './actionFactory'

export default new Store({
  actionFactory,
  state: {
    username: '',
    password: '',
  },
})
