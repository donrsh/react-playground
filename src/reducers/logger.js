import { handleActions } from 'redux-actions' 

import actions from 'actions/creators/logger'

export default handleActions({
  [actions.pushLogger] (state, action) {
    const { log } = action.payload
    return {
      ...state,
      logs: state.logs.concat(log),
      lastLogged: new Date().getTime()
    }
  },

  [actions.clearLogger] (state, action) {
    return {
      logs: [],
      lastLogged: null
    }
  }
}, {})
