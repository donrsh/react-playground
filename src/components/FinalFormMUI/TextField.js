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
    console.group(this.constructor.displayName)
    console.log('props', this.props)
    console.groupEnd()

    const {
      label, type, children,
      input: { name, onChange, value, ...restInputProps }
    } = this.props

    return (
      <TextField
        label={label}
        type={type}
        {...getMUIComponentProps('TextField', this.props)}
        inputProps={restInputProps}
        value={value}
        name={name}
        onChange={e => console.log(e) || onChange(e)}
        error={this.showError}
        children={children}
      />
    )
  }
}