export function setUsername(username) {
  this.dispatch({
    type: 'SetUsername',
    state: { username },
  })
}

export function setPassword(password) {
  this.dispatch({
    type: 'SetPassword',
    state: { password },
  })
}
