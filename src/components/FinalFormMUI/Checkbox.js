import * as React from 'react'
import * as RA from 'ramda-adjunct'

import { FormControlLabel, Checkbox } from '@material-ui/core'

import { getMUIComponentProps } from './helpers/getMUIComponentProps'

export default class extends React.Component {
  static displayName = 'C(FinalFormNUI/Checkbox)'

  render() {
    const {
      form, label, type, debug,
      input: { name, onChange, checked, value, ...restInputProps },
    } = this.props

    if (debug) {
      console.group(`🏁 [${form}]${name}${
        RA.isBoolean(value) ? '' : `(${value})`
      } @Checkbox`)
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
          <Checkbox
            {...getMUIComponentProps(
              'Checkbox', this.props
            )}
            inputProps={restInputProps}
            checked={checked}
            name={name}
            type={type}
            onChange={onChange}
          />
        }
      />

      
    )
  }
}