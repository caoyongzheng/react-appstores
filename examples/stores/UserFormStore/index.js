import { Store } from '../../../src'
import { setUsername, setPassword } from './actions'

export default new Store({
  actions: { setUsername, setPassword },
  state: {
    username: '',
    password: '',
  },
})
