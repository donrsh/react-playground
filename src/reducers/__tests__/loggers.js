import loggersReducers from 'reducers/loggers'
import loggersActions from 'actions/creators/loggers'
import loggerReducers from 'reducers/logger'
import loggerActions from 'actions/creators/logger'
import { exampleLoggersState } from 'reduxStates/loggers'

const filePath = 'reducers/loggers'

describe(filePath, () => {
  it('`PUSH_LOGGER` action', () => {
    const loggerId = 'g36'
    const newLog = 'BAS!!!'
    const nextState = loggersReducers(
      exampleLoggersState,
      loggerActions.pushLogger(loggerId, newLog)
    )

    const logs = nextState[loggerId].logs
    expect(logs[logs.length - 1])
      .toBe(newLog)
  })
})