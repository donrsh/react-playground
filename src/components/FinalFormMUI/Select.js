import * as React from 'react'
import { Select, InputLabel, FormControl } from '@material-ui/core'

export default class extends React.Component {
  static displayName = 'C(FinalFormMUI/TextField)'

  get showError () {
    const { error, touched } = this.props.meta
    return Boolean(touched && error)
  }

  render() {
    console.group(this.constructor.displayName)
    console.log('props', this.props)
    console.groupEnd()

    const {
      label, type, MUIProps,
      input: { name, onChange, value, ...restInputProps }, 
      meta,
    } = this.props

    return (
      <TextField
        label={label}
        type={type}
        {...MUIProps.TextField}
        inputProps={restInputProps}
        value={value}
        name={name}
        onChange={onChange}
        error={this.showError}
      />
    )
  }
}