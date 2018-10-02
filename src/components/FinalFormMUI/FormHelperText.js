import * as React from 'react'
import { FormHelperText } from '@material-ui/core'

import { getMUIComponentProps } from './helpers/getMUIComponentProps'

export default class extends React.Component {
  static displayName = 'C(FinalFormMUI/FormHelperText)'

  get showError () {
    const { error, touched } = this.props.meta
    return Boolean(touched && error)
  }

  render() {
    const {
      form, debug,
      input: { name }
    } = this.props

    if (debug) {
      console.group(`🏁 [${form}]${name} @FormHelperText`)
      console.log('input', this.props.input)
      console.log('meta', this.props.meta)
      console.log('MUIProps', this.props.MUIProps)
      console.groupEnd()
    }

    return (
      <FormHelperText
        {...getMUIComponentProps('FormHelperText', this.props)}
        error={this.showError}
      />
    )
  }
}