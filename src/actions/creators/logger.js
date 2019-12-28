import { createActions } from 'redux-actions'

export default createActions({
  PUSH_LOGGER: (loggerId, log) => ({ loggerId, log }),
  CLEAR_LOGGER: loggerId => ({ loggerId }),
})
