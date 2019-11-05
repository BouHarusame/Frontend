const defaultState = {
  list: [
    '1.学习',
    '2.学习'
  ],
  value: ''
}
export default (state = defaultState, action) => {
  console.log(action)
  if (action.type === 'changeInput') {
    let newState = JSON.parse(JSON.stringify(state))
    newState.value = action.value
    return newState
  }
  return state
}