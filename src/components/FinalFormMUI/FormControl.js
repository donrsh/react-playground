import * as React from 'react'

import { FormControl } from '@material-ui/core'

export default class extends React.Component {
  static displayName = 'C(FinalFormMUI/FormControl)'

  get error () {
    const { type } = this.props.fieldConfig

    const renderProps = type === 'array' ? 
      this.props.fieldArrayRenderProps :
      this.props.fieldRenderProps  

    const { 
      error, touched, submitError, dirtySinceLastSubmit,
      data: { error: dataError, validating } = {}
    } = renderProps.meta
    
    return Boolean(validating === false && dataError) ||
      Boolean(touched && error) ||
      Boolean(!dirtySinceLastSubmit && submitError)
  }

  render() {
    const {
      children,
      fieldConfig: { form, name }
    } = this.props

    return (
      <FormControl
        data-form={form}
        data-field={name}
        error={this.error}
        children={children}
      />
    )
  }
}