import * as R from 'ramda'

export const createFormLogger = (formName) => (
  formState, values
) => {
  console.group(`🏁📋 ${formName}`)
  console.log('formState', formState)
  console.log('values', 
    R.map(R.prop('lastFieldState'), values)
  )
  console.groupEnd()
}