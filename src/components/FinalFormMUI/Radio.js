import * as React from 'react'

import { FormControlLabel, Radio } from '@material-ui/core'

import { getMUIComponentProps } from './helpers/getMUIComponentProps'

export default class extends React.Component {
  static displayName = 'C(FinalFormNUI/Radio)'

  render() {
    const {
      form, label, type, debug,
      input: { name, onChange, checked, ...restInputProps },
    } = this.props

    if (debug) {
      console.group(`🏁 [${form}]${name}(${this.props.input.value})) @Checkbox`)
      console.log('input', this.props.input)
      console.log('meta', this.props.meta)
      console.log('MUIProps', this.props.MUIProps)
      console.groupEnd()
    }

    return (
      <FormControlLabel
        label={label}
        {...getMUIComponentProps(
          'Root', this.props
        )}
        {...getMUIComponentProps(
          'FormControlLabel', this.props
        )}
        control={
          <Radio
            type={type}
            {...getMUIComponentProps(
              'Radio', this.props
            )}
            inputProps={restInputProps}
            checked={checked}
            name={name}
            onChange={onChange}
          />
        }
      />
    )
  }
}