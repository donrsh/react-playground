import { handleActions } from 'redux-actions'
import rr from 'reduce-reducers'

import byKeyHor from './hors/byKey'
import actions from 'actions/creators/loggers'
import loggerReducer from './logger'
import { createSingleLogger } from 'reduxStates/logger'

export default rr(
  handleActions(
    {
      [actions.addALogger](state, action) {
        const { key } = action.payload

        return {
          ...state,
          [key]: createSingleLogger(),
        }
      },

      [actions.deleteALogger](state, action) {
        const { key } = action.payload

        return {
          ...state,
          [key]: undefined,
        }
      },
    },
    {},
  ),
  byKeyHor('loggerId')(loggerReducer),
)
