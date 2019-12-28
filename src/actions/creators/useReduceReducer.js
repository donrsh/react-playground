import { createActions } from 'redux-actions'

export default createActions({
  INJECT_NUMBER: n => ({ n }),
  INJECT_STRING: s => ({ s }),
})
