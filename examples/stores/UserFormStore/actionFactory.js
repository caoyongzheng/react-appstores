export default function actionFactory({ dispatch, getState }) {
  function setUsername(username) {
    dispatch({
      type: 'SetUsername',
      state: { username },
    })
  }
  function setPassword(password) {
    dispatch({
      type: 'SetPassword',
      state: { password },
    })
  }

  return { setUsername, setPassword }
}
