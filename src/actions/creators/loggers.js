import { createActions } from 'redux-actions'

export default createActions({
  CREATE_A_LOGGER: key => ({ key }),
  DELETE_A_LOGGER: key => ({ key }),
})
