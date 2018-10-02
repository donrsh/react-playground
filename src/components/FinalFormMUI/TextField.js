import * as React from 'react'
import { TextField } from '@material-ui/core'

import { getMUIComponentProps } from './helpers/getMUIComponentProps'

export default class extends React.Component {
  static displayName = 'C(FinalFormMUI/TextField)'

  get showError () {
    const { error, touched } = this.props.meta
    return Boolean(touched && error)
  }

  render() {
    const {
      form, label, type, debug, children,
      input: { name, onChange, value, ...restInputProps }
    } = this.props

    if (debug) {
      console.group(`🏁 [${form}]${name} @TextField`)
      console.log('input', this.props.input)
      console.log('meta', this.props.meta)
      console.log('MUIProps', this.props.MUIProps)
      console.groupEnd()
    }

    return (
      <TextField
        label={label}
        type={type}
        {...getMUIComponentProps('TextField', this.props)}
        inputProps={restInputProps}
        value={value}
        name={name}
        onChange={onChange}
        error={this.showError}
        children={children}
      />
    )
  }
}