import React from 'react'
import { getIn } from 'final-form'
import { FormSpy } from 'react-final-form'
import * as R from 'ramda'

class OnBlurValidation extends React.Component {
  state = {
    withError: {},
    validatingFields: [],
  }

  get validating() {
    return this.state.validatingFields.length > 0
  }

  componentWillReceiveProps(nextProps) {
    const field = this.props.active
    if (field && field !== nextProps.active) {
      // blur occurred
      const { rules, values } = nextProps
      const { setFieldData } = nextProps.form.mutators

      const rule = rules[field]
      if (rule) {
        const value = getIn(values, field)
        let isSync = false
        const setError = error => {
          setFieldData(field, {
            validating: false,
            error,
          })

          isSync = true
          this.setState(
            R.evolve({
              withError: R.assoc(field, !!error),
              validatingFields: R.without(field),
            }),
          )
        }

        rule(value, setError)

        if (!isSync) {
          setFieldData(field, { validating: true })
          this.setState(
            R.evolve({
              validatingFields: R.append(field),
            }),
          )
        }
      }
    }
  }

  render() {
    const { withError } = this.state
    const hasErrors = Object.keys(withError).some(key => withError[key])

    return this.props.render({
      hasErrors,
      validating: this.validating,
    })
  }
}

// Make a HOC
export default props => (
  <FormSpy
    {...props}
    subscription={{ active: true, values: true }}
    component={OnBlurValidation}
  />
)
