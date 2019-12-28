import { combineReducers, bindActionCreators } from 'redux'
import { handleActions } from 'redux-actions'
import reduceReducers from 'reduce-reducers'

import * as state from 'reduxStates/useReduceReducer'
import actions from 'actions/creators/useReduceReducer'
import reduceReducer from 'reduce-reducers'

const numberFragInitState = state.numberFrag.init()
const stringFragInitState = state.stringFrag.init()

export const numberFragReducer = handleActions(
  {
    [actions.injectNumber](state, action) {
      const { n } = action.payload
      return {
        ...state,
        numberSum: state.numberSum + n,
        numberProduct: state.numberProduct * n,
      }
    },
  },
  numberFragInitState,
)

export const stringFragReducer = handleActions(
  {
    [actions.injectString](state, action) {
      const { s } = action.payload
      return {
        ...state,
        stringSum: state.stringSum + s,
      }
    },
  },
  stringFragInitState,
)

export default reduceReducers(numberFragReducer, stringFragReducer)
