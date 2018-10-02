import * as React from 'react'

import { FormControlLabel, Checkbox } from '@material-ui/core'

import { getMUIComponentProps } from './helpers/getMUIComponentProps'

export default class extends React.Component {
  static displayName = 'C(FinalFormNUI/Checkbox)'

  render() {
    console.group(this.constructor.displayName)
    console.log('props', this.props)
    console.groupEnd()

    const {
      label, type,
      input: { name, onChange, checked, ...restInputProps },
    } = this.props


    return (
      <FormControlLabel
        label={label}
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