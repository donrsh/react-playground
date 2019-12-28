export default (keyFromAction, force = false) => reducerForValue => (
  state,
  action,
) => {
  const stateKey = action.payload[keyFromAction]
  const subState = state[stateKey]

  if (!subState && force === false) return state

  return {
    ...state,
    [stateKey]: reducerForValue(subState, action),
  }
}

/* expect state shape: {
  [stateKey]: subState
} */
