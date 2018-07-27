import reducer, { numberFragReducer, stringFragReducer } from '../useReduceReducer'
import * as state from 'reduxStates/useReduceReducer'
import actions from 'actions/creators/useReduceReducer'

const filePath = 'reducers/useReduceReducer'
describe(filePath, () => {
  it('neh', () => {
    const initState = state.numberFrag.init()
    const injectedNumber = 10
    const action = actions.injectNumber(injectedNumber)
    const resultState = numberFragReducer(initState, action)
    const expectedState = {
      numberSum: initState.numberSum + injectedNumber,
      numberProduct: initState.numberProduct * injectedNumber,
    }

    expect(resultState).toEqual(expectedState)    
  })

  it('`INJECT_NUMBER` action', () => {
    const initState = {
      ...state.numberFrag.init(),
      ...state.stringFrag.init()
    }

    const injectedNumber = 10
    const action = actions.injectNumber(injectedNumber)
    const resultState = reducer(initState, action)

    const expectedState = {
      numberSum: initState.numberSum + injectedNumber,
      numberProduct: initState.numberProduct * injectedNumber,
      ...state.stringFrag.init()
    }

    expect(resultState).toEqual(expectedState)
  })

  it('`INJECT_STRING` action', () => {
    const initState = {
      ...state.numberFrag.init(),
      ...state.stringFrag.init()
    }

    const injectedString = 'hello'
    const action = actions.injectString(injectedString)
    const resultState = reducer(initState, action)

    const expectedState = {
      ...state.numberFrag.init(),
      stringSum: initState.stringSum + injectedString
    }

    expect(resultState).toEqual(expectedState)
  })
})